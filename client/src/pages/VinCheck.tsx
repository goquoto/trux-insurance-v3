import { useState } from "react";
import { Link } from "wouter";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Breadcrumbs from "../components/Breadcrumbs";
import { Copy, Check, AlertTriangle, CheckCircle2, Download, List, Hash } from "lucide-react";

interface VinResult {
  make: string;
  model: string;
  modelYear: string;
  vehicleType: string;
  bodyClass: string;
  gvwr: string;
  fuelType: string;
  engineCylinders: string;
  driveType: string;
  doors: string;
  plantCountry: string;
  manufacturer: string;
  errorCode: string;
  errorText: string;
}

interface BulkVinResult {
  vin: string;
  result: VinResult | null;
  error: string;
  status: "pending" | "loading" | "success" | "error";
}

const VIN_SEGMENTS = [
  { start: 0, end: 3, label: "WMI", desc: "World Manufacturer ID" },
  { start: 3, end: 8, label: "VDS", desc: "Vehicle Descriptor" },
  { start: 8, end: 9, label: "Check", desc: "Check Digit" },
  { start: 9, end: 17, label: "VIS", desc: "Vehicle Identifier" },
];

function parseVinInput(raw: string): string[] {
  // Split by newlines, commas, spaces, tabs — then filter to valid 17-char VINs
  const tokens = raw
    .toUpperCase()
    .split(/[\n\r,;\t\s]+/)
    .map((t) => t.replace(/[^A-HJ-NPR-Z0-9]/g, ""))
    .filter((t) => t.length === 17);
  // Deduplicate
  return Array.from(new Set(tokens));
}

export default function VinCheck() {
  const [mode, setMode] = useState<"single" | "bulk">("single");

  // Single mode state
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VinResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Bulk mode state
  const [bulkInput, setBulkInput] = useState("");
  const [bulkResults, setBulkResults] = useState<BulkVinResult[]>([]);
  const [bulkLoading, setBulkLoading] = useState(false);

  const decodeVin = async () => {
    if (vin.length !== 17) {
      setError("A VIN must be exactly 17 characters.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`);
      const data = await res.json();
      const r = data.Results?.[0];
      if (!r) {
        setError("No results returned from NHTSA.");
        return;
      }
      setResult({
        make: r.Make || "",
        model: r.Model || "",
        modelYear: r.ModelYear || "",
        vehicleType: r.VehicleType || "",
        bodyClass: r.BodyClass || "",
        gvwr: r.GVWR || "",
        fuelType: r.FuelTypePrimary || "",
        engineCylinders: r.EngineCylinders || "",
        driveType: r.DriveType || "",
        doors: r.Doors || "",
        plantCountry: r.PlantCountry || "",
        manufacturer: r.Manufacturer || "",
        errorCode: r.ErrorCode || "0",
        errorText: r.ErrorText || "",
      });
    } catch {
      setError("Failed to connect to NHTSA. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const decodeBulk = async () => {
    const vins = parseVinInput(bulkInput);
    if (vins.length === 0) {
      return;
    }
    if (vins.length > 25) {
      setBulkResults([]);
      return;
    }

    setBulkLoading(true);
    const initial: BulkVinResult[] = vins.map((v) => ({
      vin: v,
      result: null,
      error: "",
      status: "pending",
    }));
    setBulkResults(initial);

    // Decode sequentially with a small delay to avoid rate-limiting
    const updated = [...initial];
    for (let i = 0; i < vins.length; i++) {
      updated[i] = { ...updated[i], status: "loading" };
      setBulkResults([...updated]);

      try {
        const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vins[i]}?format=json`);
        const data = await res.json();
        const r = data.Results?.[0];
        if (!r) {
          updated[i] = { ...updated[i], status: "error", error: "No results from NHTSA" };
        } else {
          updated[i] = {
            ...updated[i],
            status: "success",
            result: {
              make: r.Make || "",
              model: r.Model || "",
              modelYear: r.ModelYear || "",
              vehicleType: r.VehicleType || "",
              bodyClass: r.BodyClass || "",
              gvwr: r.GVWR || "",
              fuelType: r.FuelTypePrimary || "",
              engineCylinders: r.EngineCylinders || "",
              driveType: r.DriveType || "",
              doors: r.Doors || "",
              plantCountry: r.PlantCountry || "",
              manufacturer: r.Manufacturer || "",
              errorCode: r.ErrorCode || "0",
              errorText: r.ErrorText || "",
            },
          };
        }
      } catch {
        updated[i] = { ...updated[i], status: "error", error: "Connection failed" };
      }
      setBulkResults([...updated]);

      // Small delay between requests
      if (i < vins.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }
    setBulkLoading(false);
  };

  const exportBulkResults = () => {
    if (bulkResults.length === 0) return;
    const header = "VIN,Year,Make,Model,Type,Body Class,GVWR,Fuel,Status";
    const rows = bulkResults.map((br) => {
      if (br.result) {
        return `${br.vin},${br.result.modelYear},${br.result.make},${br.result.model},${br.result.vehicleType},${br.result.bodyClass},${br.result.gvwr},${br.result.fuelType},Decoded`;
      }
      return `${br.vin},,,,,,,,${br.error || "Failed"}`;
    });
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vin-bulk-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyVin = () => {
    navigator.clipboard.writeText(vin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportResults = () => {
    if (!result) return;
    const lines = [
      `VIN Decode Report — ${vin}`,
      `Generated: ${new Date().toLocaleDateString()}`,
      "",
      `Year: ${result.modelYear}`,
      `Make: ${result.make}`,
      `Model: ${result.model}`,
      `Type: ${result.vehicleType}`,
      `Body: ${result.bodyClass}`,
      `GVWR: ${result.gvwr}`,
      `Fuel: ${result.fuelType}`,
      `Engine: ${result.engineCylinders} cylinders`,
      `Drive: ${result.driveType}`,
      `Manufacturer: ${result.manufacturer}`,
      `Plant Country: ${result.plantCountry}`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vin-report-${vin}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasError = result && result.errorCode !== "0";
  const parsedVins = parseVinInput(bulkInput);

  return (
    <Layout>
      <SEO
        title="VIN Check — Free VIN Decoder | Trux Insurance Services"
        description="Decode any vehicle identification number (VIN) instantly using the NHTSA federal database. Free VIN lookup for trucks, trailers, and commercial vehicles."
        keywords="VIN check, VIN decoder, NHTSA VIN lookup, truck VIN, commercial vehicle VIN"
      />
      <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "VIN Check" }]} />

      {/* Hero */}
      <section className="section bg-[var(--sand)]">
        <div className="container">
          <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
          <span className="eyebrow">FREE TOOL</span>
          <h1 className="mt-3 font-serif text-[36px] md:text-[48px] font-medium text-[var(--head)] leading-[1.15]">
            VIN Check
          </h1>
          <p className="mt-4 font-sans text-[16px] text-[var(--muted)] leading-[1.7] max-w-[560px]">
            Decode any vehicle identification number instantly against the NHTSA federal database. Works for trucks, trailers, and all commercial vehicles.
          </p>
        </div>
      </section>

      {/* Mode Toggle */}
      <section className="border-b border-[var(--hair)]">
        <div className="container">
          <div className="flex gap-0">
            <button
              onClick={() => setMode("single")}
              className={`flex items-center gap-2 px-5 py-3.5 font-sans text-[14px] font-medium border-b-2 transition-colors ${
                mode === "single"
                  ? "border-[var(--ink)] text-[var(--ink)]"
                  : "border-transparent text-[var(--taupe)] hover:text-[var(--muted)]"
              }`}
            >
              <Hash size={14} />
              Single VIN
            </button>
            <button
              onClick={() => setMode("bulk")}
              className={`flex items-center gap-2 px-5 py-3.5 font-sans text-[14px] font-medium border-b-2 transition-colors ${
                mode === "bulk"
                  ? "border-[var(--ink)] text-[var(--ink)]"
                  : "border-transparent text-[var(--taupe)] hover:text-[var(--muted)]"
              }`}
            >
              <List size={14} />
              Multiple VINs
            </button>
          </div>
        </div>
      </section>

      {/* Single VIN Input */}
      {mode === "single" && (
        <>
          <section className="section">
            <div className="container">
              <div className="max-w-[640px]">
                <label className="font-sans text-[13px] font-medium text-[var(--head)] mb-2 block">
                  Enter a 17-character VIN
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={vin}
                    onChange={(e) => setVin(e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, "").slice(0, 17))}
                    placeholder="e.g. 1HGBH41JXMN109186"
                    className="form-input flex-1 font-mono tracking-[0.05em]"
                    maxLength={17}
                  />
                  <button
                    onClick={decodeVin}
                    disabled={loading || vin.length < 17}
                    className="btn-solid whitespace-nowrap disabled:opacity-40"
                  >
                    {loading ? "Decoding..." : "Verify"}
                  </button>
                </div>
                <p className="font-sans text-[12px] text-[var(--taupe)] mt-2">
                  {vin.length}/17 characters · Letters I, O, and Q are not used in VINs
                </p>
                {error && (
                  <p className="font-sans text-[13px] text-[var(--warn)] mt-2 flex items-center gap-1.5">
                    <AlertTriangle size={14} /> {error}
                  </p>
                )}
              </div>

              {/* VIN Segment Visualization */}
              {vin.length === 17 && (
                <div className="mt-6 max-w-[640px]">
                  <p className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.15em] mb-2">VIN Structure</p>
                  <div className="flex">
                    {VIN_SEGMENTS.map((seg) => (
                      <div key={seg.label} className="flex-1 text-center">
                        <div className="font-mono text-[14px] tracking-[0.1em] text-[var(--head)] border border-[var(--hair)] py-1.5 bg-[var(--sand)]">
                          {vin.slice(seg.start, seg.end)}
                        </div>
                        <p className="font-sans text-[10px] text-[var(--taupe)] mt-1">{seg.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Single Results */}
          {result && (
            <section className="section bg-[var(--paper-2)] border-t border-[var(--hair)]">
              <div className="container">
                {/* Status */}
                {hasError ? (
                  <div className="flex items-start gap-3 p-4 border border-[var(--hair)] bg-[var(--sand)] mb-6">
                    <AlertTriangle size={18} className="text-[var(--warn)] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-[13px] font-medium text-[var(--head)]">Decode completed with notes</p>
                      <p className="font-sans text-[12px] text-[var(--muted)] mt-0.5">{result.errorText}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 p-4 border border-[var(--hair)] bg-[var(--sand)] mb-6">
                    <CheckCircle2 size={18} className="text-[var(--head)] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-[13px] font-medium text-[var(--head)]">VIN decoded successfully</p>
                      <p className="font-sans text-[12px] text-[var(--muted)] mt-0.5">All fields validated against NHTSA records.</p>
                    </div>
                  </div>
                )}

                {/* Vehicle Summary */}
                <div className="border border-[var(--hair)] bg-[var(--paper)] p-6 mb-6">
                  <h2 className="font-serif text-[26px] font-medium text-[var(--head)] leading-[1.2] mb-1">
                    {result.modelYear} {result.make} {result.model}
                  </h2>
                  <p className="font-sans text-[13px] text-[var(--taupe)]">
                    {result.vehicleType} · {result.bodyClass} · VIN {vin}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button onClick={copyVin} className="btn-ghost text-[12px] py-1.5 px-3 flex items-center gap-1.5">
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      {copied ? "Copied" : "Copy VIN"}
                    </button>
                    <button onClick={exportResults} className="btn-ghost text-[12px] py-1.5 px-3 flex items-center gap-1.5">
                      <Download size={12} /> Export
                    </button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                  {[
                    { label: "Model Year", value: result.modelYear },
                    { label: "Make", value: result.make },
                    { label: "Model", value: result.model },
                    { label: "Vehicle Type", value: result.vehicleType },
                    { label: "Body Class", value: result.bodyClass },
                    { label: "GVWR", value: result.gvwr },
                    { label: "Fuel Type", value: result.fuelType },
                    { label: "Engine Cylinders", value: result.engineCylinders },
                    { label: "Drive Type", value: result.driveType },
                    { label: "Doors", value: result.doors },
                    { label: "Manufacturer", value: result.manufacturer },
                    { label: "Plant Country", value: result.plantCountry },
                  ].filter(item => item.value).map(item => (
                    <div key={item.label} className="border-b border-[var(--hair)] pb-3">
                      <p className="eyebrow mb-1">{item.label}</p>
                      <p className="font-sans text-[15px] font-medium text-[var(--head)]">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 p-6 bg-[var(--sand)] border-l-4 border-[var(--ink)]">
                  <p className="font-serif text-[18px] font-medium text-[var(--head)] mb-2">
                    Need insurance for this vehicle?
                  </p>
                  <p className="font-sans text-[14px] text-[var(--muted)] mb-4">
                    Get a quote tailored to your {result.vehicleType?.toLowerCase() || "vehicle"} — we specialize exclusively in commercial trucking.
                  </p>
                  <Link href="/quote" className="btn-solid inline-block no-underline">
                    Get a Quote
                  </Link>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Bulk VIN Mode */}
      {mode === "bulk" && (
        <>
          <section className="section">
            <div className="container">
              <div className="max-w-[720px]">
                <label className="font-sans text-[13px] font-medium text-[var(--head)] mb-2 block">
                  Paste multiple VINs (one per line, or separated by commas)
                </label>
                <textarea
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  placeholder={"1HGBH41JXMN109186\n3HSDJAPR5FN123456\n1XPWD40X1ED215307"}
                  className="form-input w-full font-mono tracking-[0.03em] text-[13px] leading-[1.8] resize-y"
                  rows={6}
                />
                <div className="flex items-center justify-between mt-3">
                  <p className="font-sans text-[12px] text-[var(--taupe)]">
                    {parsedVins.length} valid VIN{parsedVins.length !== 1 ? "s" : ""} detected · Max 25 per batch
                  </p>
                  <button
                    onClick={decodeBulk}
                    disabled={bulkLoading || parsedVins.length === 0 || parsedVins.length > 25}
                    className="btn-solid whitespace-nowrap disabled:opacity-40"
                  >
                    {bulkLoading ? `Decoding (${bulkResults.filter(r => r.status === "success" || r.status === "error").length}/${parsedVins.length})...` : `Check ${parsedVins.length} VIN${parsedVins.length !== 1 ? "s" : ""}`}
                  </button>
                </div>
                {parsedVins.length > 25 && (
                  <p className="font-sans text-[13px] text-[var(--warn)] mt-2 flex items-center gap-1.5">
                    <AlertTriangle size={14} /> Maximum 25 VINs per batch. Please reduce the list.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Bulk Results Table */}
          {bulkResults.length > 0 && (
            <section className="section bg-[var(--paper-2)] border-t border-[var(--hair)]">
              <div className="container">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-serif text-[22px] font-medium text-[var(--head)]">
                      Bulk Decode Results
                    </h2>
                    <p className="font-sans text-[13px] text-[var(--taupe)] mt-1">
                      {bulkResults.filter(r => r.status === "success").length} decoded · {bulkResults.filter(r => r.status === "error").length} failed · {bulkResults.filter(r => r.status === "pending" || r.status === "loading").length} pending
                    </p>
                  </div>
                  {bulkResults.some(r => r.status === "success") && (
                    <button onClick={exportBulkResults} className="btn-ghost text-[13px] flex items-center gap-1.5">
                      <Download size={14} /> Export CSV
                    </button>
                  )}
                </div>

                {/* Results table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--hair)]">
                        <th className="text-left font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.15em] py-2 pr-4">#</th>
                        <th className="text-left font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.15em] py-2 pr-4">VIN</th>
                        <th className="text-left font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.15em] py-2 pr-4">Year</th>
                        <th className="text-left font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.15em] py-2 pr-4">Make</th>
                        <th className="text-left font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.15em] py-2 pr-4">Model</th>
                        <th className="text-left font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.15em] py-2 pr-4">Type</th>
                        <th className="text-left font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.15em] py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkResults.map((br, idx) => (
                        <tr key={br.vin} className="border-b border-[var(--hair)]">
                          <td className="font-sans text-[13px] text-[var(--taupe)] py-3 pr-4">{idx + 1}</td>
                          <td className="font-mono text-[12px] text-[var(--head)] py-3 pr-4">{br.vin}</td>
                          <td className="font-sans text-[13px] text-[var(--muted)] py-3 pr-4">{br.result?.modelYear || "—"}</td>
                          <td className="font-sans text-[13px] text-[var(--muted)] py-3 pr-4">{br.result?.make || "—"}</td>
                          <td className="font-sans text-[13px] text-[var(--muted)] py-3 pr-4">{br.result?.model || "—"}</td>
                          <td className="font-sans text-[13px] text-[var(--muted)] py-3 pr-4">{br.result?.vehicleType || "—"}</td>
                          <td className="py-3">
                            {br.status === "pending" && (
                              <span className="font-sans text-[12px] text-[var(--taupe)]">Waiting</span>
                            )}
                            {br.status === "loading" && (
                              <span className="font-sans text-[12px] text-[var(--muted)]">Decoding...</span>
                            )}
                            {br.status === "success" && (
                              <span className="font-sans text-[12px] text-[var(--head)] flex items-center gap-1">
                                <CheckCircle2 size={12} /> Decoded
                              </span>
                            )}
                            {br.status === "error" && (
                              <span className="font-sans text-[12px] text-[var(--warn)] flex items-center gap-1">
                                <AlertTriangle size={12} /> {br.error}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* CTA */}
                <div className="mt-8 p-6 bg-[var(--sand)] border-l-4 border-[var(--ink)]">
                  <p className="font-serif text-[18px] font-medium text-[var(--head)] mb-2">
                    Need insurance for these vehicles?
                  </p>
                  <p className="font-sans text-[14px] text-[var(--muted)] mb-4">
                    Get a fleet quote — we specialize exclusively in commercial trucking and can cover your entire operation.
                  </p>
                  <Link href="/quote" className="btn-solid inline-block no-underline">
                    Get a Fleet Quote
                  </Link>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* What is a VIN */}
      <section className="section border-t border-[var(--hair)]">
        <div className="container">
          <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
          <h2 className="font-serif text-[24px] md:text-[30px] font-medium text-[var(--head)] leading-[1.2] mb-6">
            What is a VIN?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px]">
            <div>
              <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7] mb-4">
                A Vehicle Identification Number (VIN) is a unique 17-character code assigned to every motor vehicle when it's manufactured. It serves as the vehicle's fingerprint — no two vehicles in operation have the same VIN.
              </p>
              <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7]">
                For commercial trucking, the VIN is essential for insurance applications, DOT filings, title verification, and equipment scheduling on your policy.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-[17px] font-medium text-[var(--head)] mb-3">Where to find it</h3>
              <ul className="space-y-2">
                {["Driver's side dashboard (visible through windshield)", "Driver's side door jamb sticker", "Vehicle title and registration", "Insurance card or policy declarations"].map(item => (
                  <li key={item} className="font-sans text-[14px] text-[var(--muted)] flex items-start gap-2">
                    <span className="text-[var(--tick)] mt-1">·</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-[var(--hair)] bg-[var(--paper-2)] py-8">
        <div className="container">
          <p className="font-sans text-[11px] text-[var(--taupe)] leading-[1.7] max-w-[800px]">
            <strong className="font-medium text-[var(--muted)]">Disclaimer:</strong> This tool uses the NHTSA vPIC API to decode vehicle identification numbers. Results are provided for informational purposes only and may not reflect the current state of the vehicle. Always verify vehicle information through official channels before making insurance or purchasing decisions.
          </p>
        </div>
      </section>
    </Layout>
  );
}
