import { useState } from "react";
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

export default function Quote() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    dot: "",
    state: "",
    truckCount: "",
    driverCount: "",
    yearsInBusiness: "",
    commodities: "",
    coverages: [] as string[],
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Quote request received! A trucking insurance specialist will contact you within 1 business day.");
    setStep(4); // success step
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCoverageToggle = (coverage: string) => {
    setFormData((prev) => ({
      ...prev,
      coverages: prev.coverages.includes(coverage)
        ? prev.coverages.filter((c) => c !== coverage)
        : [...prev.coverages, coverage],
    }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const isStep1Valid = formData.businessName && formData.contactName && formData.email && formData.phone;
  const isStep2Valid = formData.dot && formData.state;

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
                    Step {step} of 3: {step === 1 ? "Contact Information" : step === 2 ? "Operation Details" : "Coverage Needs"}
                  </p>
                </div>
              )}

              {/* Step 1: Contact Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="mb-6">Tell us about yourself</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label" htmlFor="businessName">Business Name *</label>
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
                    <div>
                      <label className="form-label" htmlFor="contactName">Contact Name *</label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        required
                        className="form-input"
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder="First and last name"
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

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStep1Valid}
                      className="btn-solid disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next: Operation Details →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Operation Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="mb-6">Tell us about your operation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label" htmlFor="dot">USDOT # *</label>
                      <input
                        type="text"
                        id="dot"
                        name="dot"
                        required
                        className="form-input"
                        value={formData.dot}
                        onChange={handleChange}
                        placeholder="Enter DOT number or 'new authority'"
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="state">Garaging State *</label>
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="form-label" htmlFor="truckCount">Number of Trucks</label>
                      <input
                        type="number"
                        id="truckCount"
                        name="truckCount"
                        className="form-input"
                        value={formData.truckCount}
                        onChange={handleChange}
                        placeholder="e.g. 5"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="driverCount">Number of Drivers</label>
                      <input
                        type="number"
                        id="driverCount"
                        name="driverCount"
                        className="form-input"
                        value={formData.driverCount}
                        onChange={handleChange}
                        placeholder="e.g. 7"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="yearsInBusiness">Years in Business</label>
                      <input
                        type="text"
                        id="yearsInBusiness"
                        name="yearsInBusiness"
                        className="form-input"
                        value={formData.yearsInBusiness}
                        onChange={handleChange}
                        placeholder="e.g. 3 or 'new'"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="commodities">Commodities Hauled</label>
                    <input
                      type="text"
                      id="commodities"
                      name="commodities"
                      className="form-input"
                      value={formData.commodities}
                      onChange={handleChange}
                      placeholder="e.g. General freight, refrigerated goods, flatbed loads"
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <button type="button" onClick={prevStep} className="btn-ghost">
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStep2Valid}
                      className="btn-solid disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next: Coverage Needs →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Coverage Needs */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="mb-6">What coverages do you need?</h3>
                  <p className="font-sans text-[14px] text-muted-custom mb-4">
                    Select all that apply. Not sure? No problem — our agents will recommend the right program for your operation.
                  </p>

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

                  <div>
                    <label className="form-label" htmlFor="message">Additional Information</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="form-input"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Anything else we should know — current carrier, renewal date, specific concerns, etc."
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <button type="button" onClick={prevStep} className="btn-ghost">
                      ← Back
                    </button>
                    <div className="flex gap-4">
                      <button type="submit" className="btn-solid">
                        Submit Quote Request
                      </button>
                    </div>
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

              {/* Full application link */}
              {step < 4 && (
                <div className="mt-10 pt-8 border-t border-[var(--hair)]">
                  <p className="font-sans text-[14px] text-muted-custom">
                    Need a full trucking application?{" "}
                    <a
                      href="https://truxins.com/trucking-insurance-quote/"
                      className="text-purple font-medium"
                    >
                      Complete the full application here →
                    </a>
                  </p>
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
                <Link href="/" className="font-sans text-[13px] text-purple">
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
