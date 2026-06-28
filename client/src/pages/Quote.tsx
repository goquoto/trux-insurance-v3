import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { toast } from "sonner";
import { Link } from "wouter";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming",
];

const LICENSED_STATES = [
  "Arizona", "Colorado", "Florida", "Georgia", "Illinois", "Indiana", "Iowa",
  "Kentucky", "Michigan", "Minnesota", "Mississippi", "Missouri", "Nevada",
  "North Carolina", "Ohio", "Pennsylvania", "South Carolina", "Tennessee",
  "Texas", "Virginia", "Wisconsin",
];

const COVERAGE_OPTIONS = [
  "Auto Liability",
  "Physical Damage",
  "Motor Truck Cargo",
  "General Liability",
  "Non-Trucking Liability",
  "Trailer Interchange",
  "Occupational Accident",
  "Workers Compensation",
  "Freight Broker Bond",
  "Cyber Coverage",
  "Crime Coverage",
];

const AUTHORITY_TYPES = [
  "Common Carrier",
  "Contract Carrier",
  "Private Carrier",
  "Exempt Carrier",
  "New Authority",
];

const OPERATING_RADIUS = [
  "0–50 miles",
  "51–200 miles",
  "200–500 miles",
  "500+ miles",
];

interface FormDataType {
  // Step 1
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  dot: string;
  state: string;
  powerUnits: string;
  
  // Step 2 (optional)
  authorityType: string;
  ein: string;
  yearsInBusiness: string;
  effectiveDate: string;
  operatingRadius: string[];
  annualMileage: string;
  annualRevenue: string;
  commodities: string;
  avgLoadValue: string;
  maxLoadValue: string;
  coverages: string[];
  desiredLimits: string;
  deductible: string;
  
  // Step 3 (optional)
  equipment: Array<{ year: string; make: string; vin: string; value: string; lienholder: string }>;
  drivers: Array<{ name: string; licenseNum: string; licenseState: string; dob: string; experience: string }>;
  files: File[];
}

export default function Quote() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    dot: "",
    state: "",
    powerUnits: "",
    authorityType: "",
    ein: "",
    yearsInBusiness: "",
    effectiveDate: "",
    operatingRadius: [],
    annualMileage: "",
    annualRevenue: "",
    commodities: "",
    avgLoadValue: "",
    maxLoadValue: "",
    coverages: [],
    desiredLimits: "",
    deductible: "",
    equipment: [],
    drivers: [],
    files: [],
  });

  // Load saved form data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("quoteFormData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      } catch (e) {
        console.error("Failed to load saved form data");
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("quoteFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverageToggle = (coverage: string) => {
    setFormData((prev) => ({
      ...prev,
      coverages: prev.coverages.includes(coverage)
        ? prev.coverages.filter((c) => c !== coverage)
        : [...prev.coverages, coverage],
    }));
  };

  const handleRadiusToggle = (radius: string) => {
    setFormData((prev) => ({
      ...prev,
      operatingRadius: prev.operatingRadius.includes(radius)
        ? prev.operatingRadius.filter((r) => r !== radius)
        : [...prev.operatingRadius, radius],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...newFiles].slice(0, 10), // Max 10 files
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleAddEquipment = () => {
    setFormData((prev) => ({
      ...prev,
      equipment: [...prev.equipment, { year: "", make: "", vin: "", value: "", lienholder: "" }],
    }));
  };

  const handleEquipmentChange = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      equipment: prev.equipment.map((e, i) => (i === index ? { ...e, [field]: value } : e)),
    }));
  };

  const handleAddDriver = () => {
    setFormData((prev) => ({
      ...prev,
      drivers: [...prev.drivers, { name: "", licenseNum: "", licenseState: "", dob: "", experience: "" }],
    }));
  };

  const handleDriverChange = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      drivers: prev.drivers.map((d, i) => (i === index ? { ...d, [field]: value } : d)),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Quote request received! A trucking insurance specialist will contact you within 1 business day.");
    localStorage.removeItem("quoteFormData");
    setStep(4); // success step
  };

  const handleSaveAndContinue = () => {
    toast.success("Your progress has been saved. You can resume anytime.");
    // Data is already saved to localStorage
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const isStep1Valid = formData.fullName && formData.businessName && formData.email && formData.phone && formData.dot && formData.state && formData.powerUnits;

  return (
    <Layout>
      <SEO
        title="Get a Trucking Insurance Quote"
        description="Request a free commercial trucking insurance quote from Trux. Auto liability, cargo, physical damage, and more — fast quotes from specialist markets."
        canonical="/quote"
      />
      <Breadcrumbs items={[{ label: "Get a Quote" }]} />
      {/* Page header */}
      <section className="py-16 bg-paper-2">
        <div className="container">
          <span className="eyebrow">Get Insurance</span>
          <div className="tick mt-4"></div>
          <h1 className="mt-4 mb-4">Get a fast quote.</h1>
          <p className="lead max-w-2xl">
            Fill out the form below and one of our agents will contact you with competitive quotes from A-rated trucking markets. Most quotes delivered same day.
          </p>
        </div>
      </section>

      <hr className="hairline" />

      {/* Form section */}
      <section className="section bg-paper">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              {/* Progress indicator */}
              {step < 4 && (
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-3">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 flex items-center justify-center font-sans text-[13px] font-medium transition-colors ${
                            s <= step
                              ? "bg-purple text-white"
                              : "bg-paper-2 text-taupe border border-[var(--hair)]"
                          }`}
                        >
                          {s < step ? "✓" : s}
                        </div>
                        {s < 3 && (
                          <div className={`w-12 h-[2px] ${s < step ? "bg-purple" : "bg-[var(--hair)]"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="font-sans text-[13px] text-taupe">
                    Step {step} of 3: {step === 1 ? "Get Started" : step === 2 ? "Your Operation" : "Equipment & Docs"}
                  </p>
                </div>
              )}

              {/* Step 1: Get Started */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="mb-6">Get started — takes ~3 minutes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label" htmlFor="fullName">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        className="form-input"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="First and last name"
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="businessName">Company Name *</label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        required
                        className="form-input"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Your trucking company name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label" htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="form-input"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="phone">Phone *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="form-input"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 555-5555"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label" htmlFor="dot">DOT / MC Number *</label>
                      <input
                        type="text"
                        id="dot"
                        name="dot"
                        required
                        className="form-input"
                        value={formData.dot}
                        onChange={handleChange}
                        placeholder="e.g. 1234567 or MC-123456"
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="state">Primary State *</label>
                      <select
                        id="state"
                        name="state"
                        required
                        className="form-input"
                        value={formData.state}
                        onChange={handleChange}
                      >
                        <option value="">Select your state</option>
                        <optgroup label="States We're Licensed In">
                          {LICENSED_STATES.map((state) => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Other States">
                          {US_STATES.filter((s) => !LICENSED_STATES.includes(s)).map((state) => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="powerUnits"># Power Units *</label>
                    <input
                      type="number"
                      id="powerUnits"
                      name="powerUnits"
                      required
                      className="form-input"
                      value={formData.powerUnits}
                      onChange={handleChange}
                      placeholder="e.g. 5"
                      min="1"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStep1Valid}
                      className="btn-solid disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Your Operation */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="mb-2">Your operation</h3>
                  <p className="font-sans text-[14px] text-muted-custom mb-6">
                    Optional — add detail for a faster, more accurate quote, or skip ahead.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label" htmlFor="authorityType">FMCSA Authority Type</label>
                      <select
                        id="authorityType"
                        name="authorityType"
                        className="form-input"
                        value={formData.authorityType}
                        onChange={handleChange}
                      >
                        <option value="">Select authority type</option>
                        {AUTHORITY_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="form-label" htmlFor="ein">EIN</label>
                      <input
                        type="text"
                        id="ein"
                        name="ein"
                        className="form-input"
                        value={formData.ein}
                        onChange={handleChange}
                        placeholder="XX-XXXXXXX"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="form-label" htmlFor="yearsInBusiness">Years in Business</label>
                      <input
                        type="number"
                        id="yearsInBusiness"
                        name="yearsInBusiness"
                        className="form-input"
                        value={formData.yearsInBusiness}
                        onChange={handleChange}
                        placeholder="e.g. 5"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="effectiveDate">Target Effective Date</label>
                      <input
                        type="date"
                        id="effectiveDate"
                        name="effectiveDate"
                        className="form-input"
                        value={formData.effectiveDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="annualMileage">Est. Annual Mileage</label>
                      <input
                        type="number"
                        id="annualMileage"
                        name="annualMileage"
                        className="form-input"
                        value={formData.annualMileage}
                        onChange={handleChange}
                        placeholder="e.g. 50000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label mb-3">Operating Radius</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {OPERATING_RADIUS.map((radius) => (
                        <label key={radius} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.operatingRadius.includes(radius)}
                            onChange={() => handleRadiusToggle(radius)}
                            className="w-4 h-4 accent-purple"
                          />
                          <span className="font-sans text-[14px] text-ink">{radius}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label" htmlFor="annualRevenue">Est. Annual Revenue</label>
                      <input
                        type="text"
                        id="annualRevenue"
                        name="annualRevenue"
                        className="form-input"
                        value={formData.annualRevenue}
                        onChange={handleChange}
                        placeholder="e.g. $500,000"
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="commodities">Primary Commodities Hauled</label>
                      <input
                        type="text"
                        id="commodities"
                        name="commodities"
                        className="form-input"
                        value={formData.commodities}
                        onChange={handleChange}
                        placeholder="e.g. General freight, refrigerated"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label" htmlFor="avgLoadValue">Avg. Load Value</label>
                      <input
                        type="text"
                        id="avgLoadValue"
                        name="avgLoadValue"
                        className="form-input"
                        value={formData.avgLoadValue}
                        onChange={handleChange}
                        placeholder="e.g. $5,000"
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="maxLoadValue">Max. Load Value</label>
                      <input
                        type="text"
                        id="maxLoadValue"
                        name="maxLoadValue"
                        className="form-input"
                        value={formData.maxLoadValue}
                        onChange={handleChange}
                        placeholder="e.g. $50,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label mb-3">Coverages Wanted</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {COVERAGE_OPTIONS.map((coverage) => (
                        <label
                          key={coverage}
                          className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${
                            formData.coverages.includes(coverage)
                              ? "border-purple bg-purple/5"
                              : "border-[var(--hair)] hover:border-purple/50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.coverages.includes(coverage)}
                            onChange={() => handleCoverageToggle(coverage)}
                            className="w-4 h-4 accent-purple"
                          />
                          <span className="font-sans text-[14px] text-ink">{coverage}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label" htmlFor="desiredLimits">Desired Limits</label>
                      <input
                        type="text"
                        id="desiredLimits"
                        name="desiredLimits"
                        className="form-input"
                        value={formData.desiredLimits}
                        onChange={handleChange}
                        placeholder="e.g. $1M/$2M"
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="deductible">Deductible</label>
                      <input
                        type="text"
                        id="deductible"
                        name="deductible"
                        className="form-input"
                        value={formData.deductible}
                        onChange={handleChange}
                        placeholder="e.g. $1,000"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button type="button" onClick={prevStep} className="btn-ghost">
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-solid"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Equipment & Docs */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="mb-2">Equipment, drivers & documents</h3>
                  <p className="font-sans text-[14px] text-muted-custom mb-6">
                    Optional — add detail for a faster, more accurate quote, or skip ahead.
                  </p>

                  {/* Equipment */}
                  <div>
                    <h4 className="font-serif text-[16px] text-ink mb-4">Tractors & Trailers</h4>
                    {formData.equipment.length === 0 ? (
                      <p className="font-sans text-[14px] text-muted-custom mb-4">No equipment added yet.</p>
                    ) : (
                      <div className="space-y-4 mb-4">
                        {formData.equipment.map((eq, idx) => (
                          <div key={idx} className="border border-[var(--hair)] p-4">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                              <input
                                type="number"
                                placeholder="Year"
                                value={eq.year}
                                onChange={(e) => handleEquipmentChange(idx, "year", e.target.value)}
                                className="form-input text-[13px]"
                              />
                              <input
                                type="text"
                                placeholder="Make"
                                value={eq.make}
                                onChange={(e) => handleEquipmentChange(idx, "make", e.target.value)}
                                className="form-input text-[13px]"
                              />
                              <input
                                type="text"
                                placeholder="VIN"
                                value={eq.vin}
                                onChange={(e) => handleEquipmentChange(idx, "vin", e.target.value)}
                                className="form-input text-[13px]"
                              />
                              <input
                                type="text"
                                placeholder="Value"
                                value={eq.value}
                                onChange={(e) => handleEquipmentChange(idx, "value", e.target.value)}
                                className="form-input text-[13px]"
                              />
                              <input
                                type="text"
                                placeholder="Lienholder"
                                value={eq.lienholder}
                                onChange={(e) => handleEquipmentChange(idx, "lienholder", e.target.value)}
                                className="form-input text-[13px]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={handleAddEquipment}
                      className="btn-ghost text-[14px]"
                    >
                      + Add Equipment
                    </button>
                  </div>

                  {/* Drivers */}
                  <div>
                    <h4 className="font-serif text-[16px] text-ink mb-4">Drivers</h4>
                    {formData.drivers.length === 0 ? (
                      <p className="font-sans text-[14px] text-muted-custom mb-4">No drivers added yet.</p>
                    ) : (
                      <div className="space-y-4 mb-4">
                        {formData.drivers.map((driver, idx) => (
                          <div key={idx} className="border border-[var(--hair)] p-4">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                              <input
                                type="text"
                                placeholder="Name"
                                value={driver.name}
                                onChange={(e) => handleDriverChange(idx, "name", e.target.value)}
                                className="form-input text-[13px]"
                              />
                              <input
                                type="text"
                                placeholder="License #"
                                value={driver.licenseNum}
                                onChange={(e) => handleDriverChange(idx, "licenseNum", e.target.value)}
                                className="form-input text-[13px]"
                              />
                              <select
                                value={driver.licenseState}
                                onChange={(e) => handleDriverChange(idx, "licenseState", e.target.value)}
                                className="form-input text-[13px]"
                              >
                                <option value="">State</option>
                                {US_STATES.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                              <input
                                type="date"
                                placeholder="DOB"
                                value={driver.dob}
                                onChange={(e) => handleDriverChange(idx, "dob", e.target.value)}
                                className="form-input text-[13px]"
                              />
                              <input
                                type="number"
                                placeholder="Years Exp."
                                value={driver.experience}
                                onChange={(e) => handleDriverChange(idx, "experience", e.target.value)}
                                className="form-input text-[13px]"
                                min="0"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={handleAddDriver}
                      className="btn-ghost text-[14px]"
                    >
                      + Add Driver
                    </button>
                  </div>

                  {/* File Upload */}
                  <div className="border border-[var(--hair)] p-6 bg-paper-2">
                    <h4 className="font-serif text-[16px] text-ink mb-2">Upload Loss Runs, IFTA, Driver/Vehicle Lists</h4>
                    <p className="font-sans text-[13px] text-muted-custom mb-4">
                      Already have loss runs? Attach them and skip the back-and-forth.
                    </p>
                    <div className="border-2 border-dashed border-[var(--hair)] p-6 text-center mb-4">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileUpload"
                        accept=".pdf,.jpg,.png,.xlsx,.xls,.csv,.doc,.docx"
                      />
                      <label htmlFor="fileUpload" className="cursor-pointer">
                        <p className="font-sans text-[14px] text-ink mb-2">Drag and drop or click to upload</p>
                        <p className="font-sans text-[12px] text-muted-custom">PDF, JPG, PNG, XLSX, XLS, CSV, DOC, DOCX — max 10 files, 25MB each</p>
                      </label>
                    </div>
                    {formData.files.length > 0 && (
                      <div className="space-y-2">
                        {formData.files.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-white border border-[var(--hair)]">
                            <span className="font-sans text-[13px] text-ink">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              className="text-warn hover:text-warn/80 font-sans text-[12px]"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between pt-4">
                    <button type="button" onClick={prevStep} className="btn-ghost">
                      ← Back
                    </button>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={handleSaveAndContinue}
                        className="btn-ghost"
                      >
                        Save & Continue Later
                      </button>
                      <button type="submit" className="btn-solid">
                        Submit
                      </button>
                    </div>
                  </div>

                  {/* Confidence line */}
                  <div className="mt-8 pt-6 border-t border-[var(--hair)]">
                    <p className="font-sans text-[13px] text-muted-custom text-center">
                      Takes ~3 minutes. A licensed agent reviews every submission.
                    </p>
                  </div>
                </form>
              )}

              {/* Step 4: Success */}
              {step === 4 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-purple/10 flex items-center justify-center mx-auto mb-6">
                    <span className="text-purple text-3xl">✓</span>
                  </div>
                  <h2 className="mb-4">Quote request received.</h2>
                  <p className="font-sans text-[16px] text-muted-custom max-w-lg mx-auto mb-8">
                    A trucking insurance specialist will review your information and contact you within 1 business day with competitive quotes from our A-rated markets.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/" className="btn-solid no-underline">
                      Back to Home
                    </Link>
                    <a href="tel:3312401101" className="btn-ghost no-underline">
                      Call (331) 240-1101
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              {/* Trust badges */}
              <div className="border border-[var(--hair)] p-6 mb-6">
                <h4 className="font-serif text-[18px] text-ink mb-4">Why Trux?</h4>
                <div className="space-y-4">
                  {[
                    { icon: "🛡️", text: "A-rated carriers only" },
                    { icon: "🚛", text: "Trucking-only specialists" },
                    { icon: "⚡", text: "Most quotes same day" },
                    { icon: "📋", text: "New authorities welcome" },
                    { icon: "💰", text: "Competitive premiums" },
                    { icon: "🏆", text: "10+ years experience" },
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-lg">{badge.icon}</span>
                      <span className="font-sans text-[14px] text-ink">{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phone CTA */}
              <div className="pull-quote mb-6">
                <h4 className="font-serif text-[18px] text-ink mb-3">Prefer to talk?</h4>
                <p className="font-sans text-[14px] text-muted-custom mb-4">
                  Call us directly and speak with a trucking insurance specialist — no phone trees, no bots.
                </p>
                <a href="tel:3312401101" className="font-sans text-[22px] font-medium text-purple">
                  (331) 240-1101
                </a>
                <p className="font-sans text-[13px] text-taupe mt-2">
                  Mon–Fri 9:00 AM – 5:00 PM CT
                </p>
              </div>

              {/* Licensed states note */}
              <div className="border border-[var(--hair)] p-6">
                <h4 className="font-serif text-[16px] text-ink mb-3">Licensed in 21 states</h4>
                <p className="font-sans text-[13px] text-muted-custom mb-3">
                  AZ · CO · FL · GA · IL · IN · IA · KY · MI · MN · MS · MO · NV · NC · OH · PA · SC · TN · TX · VA · WI
                </p>
                <Link href="/states" className="font-sans text-[13px] text-purple">
                  View state map →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
