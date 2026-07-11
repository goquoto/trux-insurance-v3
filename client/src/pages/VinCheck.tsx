import { useState, useCallback } from "react";
import { Link } from "wouter";
import Layout from "../components/Layout";
import Breadcrumbs from "../components/Breadcrumbs";
import SEO from "../components/SEO";
import { Search, Copy, ExternalLink, CheckCircle, AlertTriangle, XCircle, Loader2 } from "lucide-react";

// VIN validation utilities
function normalizeVin(vin: string): string {
  return vin.replace(/\s/g, "").toUpperCase();
}

function containsForbiddenLetters(vin: string): string | null {
  if (/[IOQ]/.test(vin)) {
    return "VINs never contain I, O, or Q — check for 1s and 0s.";
  }
  return null;
}

function checkDigitValid(vin: string): boolean | null {
  if (vin.length !== 17) return null;
  const transliteration: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
    J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9,
    S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
  };
  const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    const char = vin[i];
    const value = /\d/.test(char) ? parseInt(char) : (transliteration[char] ?? 0);
    sum += value * weights[i];
  }
  const remainder = sum % 11;
  const checkChar = remainder === 10 ? "X" : String(remainder);
  return checkChar === vin[8];
}

interface DecodedField {
  label: string;
  value: string;
}

interface DecodeResult {
  vin: string;
  status: "verified" | "warning" | "failed";
  errorCode: string;
  errorText: string;
  suggestedVIN: string;
  title: string;
  subtitle: string;
  fields: DecodedField[];
}

// Fields to display in order
const DISPLAY_FIELDS = [
  "ModelYear", "Make", "Model", "Series", "VehicleType", "BodyClass",
  "GVWR", "GCWR", "Axles", "TrailerType", "TrailerBodyType", "TrailerLength",
  "EngineManufacturer", "EngineModel", "DisplacementL", "EngineCylinders",
  "EngineHP", "FuelTypePrimary", "BrakeSystemType", "DriveType",
  "Manufacturer", "PlantCity", "PlantState", "PlantCountry",
];

// Human-readable labels
const FIELD_LABELS: Record<string, string> = {
  ModelYear: "Model Year", Make: "Make", Model: "Model", Series: "Series",
  VehicleType: "Vehicle Type", BodyClass: "Body Class", GVWR: "GVWR",
  GCWR: "GCWR", Axles: "Axles", TrailerType: "Trailer Type",
  TrailerBodyType: "Trailer Body Type", TrailerLength: "Trailer Length",
  EngineManufacturer: "Engine Manufacturer", EngineModel: "Engine Model",
  DisplacementL: "Displacement (L)", EngineCylinders: "Cylinders",
  EngineHP: "Horsepower", FuelTypePrimary: "Fuel Type",
  BrakeSystemType: "Brake System", DriveType: "Drive Type",
  Manufacturer: "Manufacturer", PlantCity: "Plant City",
  PlantState: "Plant State", PlantCountry: "Plant Country",
};

export default function VinCheck() {
  const [vinInput, setVinInput] = useState("");
  const [yearInput, setYearInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DecodeResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const normalizedVin = normalizeVin(vinInput);
  const checkDigit = normalizedVin.length === 17 ? checkDigitValid(normalizedVin) : null;

  const decodeVin = useCallback(async (vin?: string) => {
    const vinToUse = vin || normalizedVin;
    if (!vinToUse) return;

    // Validate
    const forbidden = containsForbiddenLetters(vinToUse);
    if (forbidden) {
      setValidationError(forbidden);
      return;
    }
    setValidationError(null);
    setLoading(true);
    setResult(null);

    try {
      const yearParam = yearInput ? `&modelyear=${yearInput}` : "";
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vinToUse}?format=json${yearParam}`
      );
      const data = await response.json();
      const raw = data.Results?.[0];

      if (!raw) {
        setValidationError("No results returned from NHTSA. Please check the VIN.");
        setLoading(false);
        return;
      }

      // Parse error code
      const errorCode = (raw.ErrorCode || "").split(",")[0].trim();
      const errorText = raw.ErrorText || "";
      const suggestedVIN = raw.SuggestedVIN || "";

      // Determine status
      let status: "verified" | "warning" | "failed" = "warning";
      if (errorCode === "0") status = "verified";
      else if (errorCode === "1" || errorCode === "11") status = "failed";

      // Extract fields
      const fields: DecodedField[] = [];
      for (const key of DISPLAY_FIELDS) {
        const val = raw[key];
        if (val && val !== "" && val !== "Not Applicable" && val !== "0") {
          fields.push({ label: FIELD_LABELS[key] || key, value: val });
        }
      }

      const title = [raw.ModelYear, raw.Make, raw.Model].filter(Boolean).join(" ") || "Unknown Vehicle";
      const subtitle = [raw.VehicleType, raw.BodyClass].filter(v => v && v !== "Not Applicable").join(" · ");

      setResult({
        vin: vinToUse,
        status,
        errorCode,
        errorText,
        suggestedVIN,
        title,
        subtitle: subtitle ? `${subtitle} · VIN ${vinToUse}` : `VIN ${vinToUse}`,
        fields,
      });
    } catch {
      setValidationError("NHTSA temporarily unavailable — try again.");
    } finally {
      setLoading(false);
    }
  }, [normalizedVin, yearInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    decodeVin();
  };

  const handleUseSuggested = () => {
    if (result?.suggestedVIN) {
      setVinInput(result.suggestedVIN);
      decodeVin(result.suggestedVIN);
    }
  };

  const copyResults = () => {
    if (!result) return;
    const text = result.fields.map(f => `${f.label}: ${f.value}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // VIN segment coloring
  function getSegmentColor(index: number): string {
    if (index < 3) return "bg-blue-500"; // WMI
    if (index < 8) return "bg-[var(--tick)]"; // Descriptor
    if (index === 8) { // Check digit
      if (normalizedVin.length === 17) {
        return checkDigit ? "bg-green-500" : "bg-[var(--warn)]";
      }
      return "bg-gray-300";
    }
    return "bg-purple-500"; // Serial
  }

  return (
    <Layout>
      <SEO
        title="VIN Check — Free VIN Decoder for Trucks & Trailers"
        description="Decode any VIN instantly against the official NHTSA federal database. Verify trucks, tractors, trailers, and commercial vehicles. Free, no registration required."
        keywords="VIN check, VIN decoder, truck VIN lookup, NHTSA VIN, trailer VIN, commercial vehicle VIN"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: "VIN Check", url: "/resources/vin-check" }
        ]}
      />
      <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "VIN Check" }]} />

      {/* Hero */}
      <section className="bg-[var(--sand)] border-b border-[var(--hair)]">
        <div className="container py-14 md:py-20">
          <div className="max-w-[720px]">
            <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
            <p className="eyebrow mb-3">FREE TOOL</p>
            <h1 className="font-serif text-[32px] md:text-[46px] font-medium text-head leading-[1.15] tracking-[-0.01em] mb-4">
              VIN Check & <em className="italic">Decoder</em>
            </h1>
            <p className="font-sans text-[16px] text-muted-custom leading-[1.7] max-w-[560px]">
              Decode any VIN instantly against the official NHTSA federal database. Works for trucks, tractors, trailers, buses, cars, and incomplete vehicles. Free, no registration required.
            </p>
          </div>
        </div>
      </section>

      {/* VIN Input */}
      <section className="bg-paper border-b border-[var(--hair)]">
        <div className="container py-10 md:py-14">
          <form onSubmit={handleSubmit} className="max-w-[700px]">
            <label className="block font-sans text-[13px] font-medium text-ink mb-2 uppercase tracking-[0.05em]">
              Vehicle Identification Number (VIN)
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={vinInput}
                onChange={(e) => {
                  setVinInput(e.target.value.toUpperCase().replace(/\s/g, ""));
                  setValidationError(null);
                }}
                placeholder="Enter 17-character VIN"
                maxLength={17}
                className="flex-1 px-4 py-3 text-[16px] font-mono border border-[var(--hair)] bg-paper focus:border-[var(--tick)] focus:outline-none tracking-[0.1em] uppercase"
              />
              <input
                type="text"
                value={yearInput}
                onChange={(e) => setYearInput(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="Year (optional)"
                maxLength={4}
                className="w-full sm:w-[120px] px-4 py-3 text-[14px] font-sans border border-[var(--hair)] bg-paper focus:border-[var(--tick)] focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !normalizedVin}
                className="px-6 py-3 bg-ink text-white font-sans text-[13px] font-medium uppercase tracking-[0.08em] hover:bg-head transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                Verify
              </button>
            </div>

            {/* VIN Strip */}
            {normalizedVin.length > 0 && (
              <div className="mt-6">
                <div className="flex gap-1">
                  {Array.from({ length: 17 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-10 flex items-center justify-center text-[13px] font-mono font-medium border border-[var(--hair)] ${
                        i < normalizedVin.length ? "text-ink bg-paper" : "text-[var(--taupe)] bg-paper-2"
                      }`}
                    >
                      {normalizedVin[i] || "·"}
                      <div className={`absolute bottom-0 left-0 right-0 h-[3px] ${getSegmentColor(i)}`} />
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11px] font-sans text-[var(--taupe)]">
                  <span><span className="inline-block w-2 h-2 bg-blue-500 mr-1" />1–3 · WMI — manufacturer & country</span>
                  <span><span className="inline-block w-2 h-2 bg-[var(--tick)] mr-1" />4–8 · Descriptor — model, body, engine</span>
                  <span><span className="inline-block w-2 h-2 bg-gray-300 mr-1" />9 · Check digit</span>
                  <span><span className="inline-block w-2 h-2 bg-purple-500 mr-1" />10–17 · Serial — year, plant & unit</span>
                </div>
              </div>
            )}

            {/* Validation error */}
            {validationError && (
              <div className="mt-4 p-3 border border-[var(--warn)] bg-red-50 text-[var(--warn)] font-sans text-[13px]">
                {validationError}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Results */}
      {result && (
        <section className="bg-paper-2">
          <div className="container py-10 md:py-14">
            {/* Status Banner */}
            <div className={`p-4 mb-8 border-l-4 ${
              result.status === "verified" ? "border-green-500 bg-green-50" :
              result.status === "failed" ? "border-[var(--warn)] bg-red-50" :
              "border-amber-500 bg-amber-50"
            }`}>
              <div className="flex items-start gap-3">
                {result.status === "verified" && <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5" />}
                {result.status === "failed" && <XCircle size={20} className="text-[var(--warn)] shrink-0 mt-0.5" />}
                {result.status === "warning" && <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />}
                <div>
                  <p className="font-sans text-[14px] font-medium text-ink">
                    {result.status === "verified" && "VIN verified — clean decode against the federal database."}
                    {result.status === "failed" && "VIN failed verification."}
                    {result.status === "warning" && "Decoded with warnings."}
                  </p>
                  {result.errorText && result.errorText !== "0" && (
                    <p className="font-sans text-[12px] text-muted-custom mt-1">{result.errorText}</p>
                  )}
                  {result.suggestedVIN && (
                    <div className="mt-2">
                      <span className="font-sans text-[13px] text-muted-custom">Did you mean </span>
                      <button
                        onClick={handleUseSuggested}
                        className="font-mono text-[13px] text-ink font-medium underline hover:text-[var(--purple)]"
                      >
                        {result.suggestedVIN}
                      </button>
                      <span className="font-sans text-[13px] text-muted-custom">?</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Result Card */}
            {result.fields.length > 0 && (
              <div className="bg-paper border border-[var(--hair)] p-6 md:p-8">
                <h2 className="font-serif text-[24px] md:text-[28px] font-medium text-head mb-1">
                  {result.title}
                </h2>
                <p className="font-sans text-[13px] text-[var(--taupe)] mb-6">{result.subtitle}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.fields.map(field => (
                    <div key={field.label} className="border-b border-[var(--hair)] pb-3">
                      <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-[var(--taupe)] mb-1">
                        {field.label}
                      </p>
                      <p className="font-sans text-[15px] text-ink font-medium">
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[var(--hair)]">
                  <button
                    onClick={copyResults}
                    className="flex items-center gap-2 px-4 py-2 border border-[var(--hair)] font-sans text-[13px] text-ink hover:bg-[var(--sand)] transition-colors"
                  >
                    <Copy size={14} />
                    {copied ? "Copied!" : "Copy Results"}
                  </button>
                  <a
                    href={`https://vpic.nhtsa.dot.gov/decoder/Decoder?VIN=${result.vin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-[var(--hair)] font-sans text-[13px] text-ink hover:bg-[var(--sand)] transition-colors no-underline"
                  >
                    <ExternalLink size={14} />
                    Open on NHTSA
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* About this tool */}
      <section className="bg-paper border-t border-[var(--hair)]">
        <div className="container py-12 md:py-16">
          <div className="max-w-[700px]">
            <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
            <h2 className="font-serif text-[24px] md:text-[30px] font-medium text-head leading-[1.2] mb-4">
              About this tool
            </h2>
            <div className="font-sans text-[15px] text-muted-custom leading-[1.8] space-y-4">
              <p>
                This VIN decoder queries the official <strong className="text-ink">NHTSA vPIC database</strong> — the same federal database used by law enforcement, insurance companies, and dealers. It works for all vehicle types: trucks, tractors, trailers, buses, motorcycles, and passenger vehicles.
              </p>
              <p>
                The 17-character VIN encodes the manufacturer (positions 1–3), vehicle descriptor (4–8), a check digit (position 9), and the vehicle identifier sequence including model year, plant, and serial number (10–17).
              </p>
              <p>
                For commercial trucking insurance purposes, VIN verification confirms the year, make, model, GVWR, and body class of each unit on your schedule — critical for accurate rating and avoiding coverage disputes at claim time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--sand)] border-t border-[var(--hair)]">
        <div className="container py-14 md:py-18 text-center">
          <h2 className="font-serif text-[26px] md:text-[32px] font-medium text-head leading-[1.2] mb-4">
            Need insurance for your fleet?
          </h2>
          <p className="font-sans text-[15px] text-muted-custom leading-[1.7] max-w-[480px] mx-auto mb-8">
            We insure commercial trucks across 22 states. Get a quote tailored to your equipment and operation.
          </p>
          <Link
            href="/quote"
            className="inline-block bg-ink text-white font-sans text-[14px] font-medium px-8 py-3.5 hover:bg-head transition-colors no-underline uppercase tracking-[0.08em]"
          >
            Get a Quote
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-[var(--hair)] bg-paper-2">
        <div className="container py-8">
          <p className="font-sans text-[11px] text-[var(--taupe)] leading-[1.7] max-w-[800px]">
            <strong className="font-medium text-muted-custom">Disclaimer:</strong> This tool queries the NHTSA vPIC database for informational purposes only. VIN decode results are provided "as-is" from the federal database. Coverage descriptions are general summaries and do not constitute policy language. Actual coverage varies by state, carrier, and individual policy terms. Please consult a licensed insurance agent at Trux Insurance Services for specific coverage details and quotes.
          </p>
        </div>
      </section>
    </Layout>
  );
}
