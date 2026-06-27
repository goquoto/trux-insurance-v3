import { useState } from "react";
import Layout from "@/components/Layout";
import { toast } from "sonner";

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

export default function Quote() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    dot: "",
    state: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Quote request received! An agent will contact you shortly.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Layout>
      {/* Page header */}
      <section className="section bg-paper-2">
        <div className="container">
          <span className="eyebrow">Get Insurance</span>
          <div className="tick mt-4"></div>
          <h1 className="mt-4 mb-4">Get a fast quote.</h1>
          <p className="lead max-w-2xl">
            Fill out the form below and one of our agents will contact you with competitive quotes from A-rated trucking markets. It takes under a minute.
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
              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label" htmlFor="dot">DOT # *</label>
                    <input
                      type="text"
                      id="dot"
                      name="dot"
                      required
                      className="form-input"
                      value={formData.dot}
                      onChange={handleChange}
                      placeholder="Enter DOT number or 'not filed'"
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="state">State *</label>
                    <select
                      id="state"
                      name="state"
                      required
                      className="form-input"
                      value={formData.state}
                      onChange={handleChange}
                    >
                      <option value="">Select your state</option>
                      {US_STATES.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
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
                    placeholder="Tell us about your operation — number of trucks, types of freight, current coverage, etc."
                  />
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button type="submit" className="btn-solid">
                    Get a Fast Quote
                  </button>
                  <a href="https://truxins.com/trucking-insurance-quote/" className="btn-ghost">
                    Full Application →
                  </a>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div>
              <div className="pull-quote mb-8">
                <h4 className="font-serif text-[18px] text-ink mb-3">Why get a quote from Trux?</h4>
                <ul className="space-y-3">
                  {[
                    "Competitive rates from A-rated markets",
                    "Specialized in trucking — it's all we do",
                    "New authorities welcome",
                    "Fast turnaround — most quotes same day",
                    "No obligation, no pressure",
                  ].map((item, i) => (
                    <li key={i} className="font-sans text-[14px] text-muted-custom flex items-start gap-2">
                      <span className="text-purple mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-[var(--hair)] p-6">
                <h4 className="font-serif text-[18px] text-ink mb-3">Prefer to talk?</h4>
                <p className="font-sans text-[14px] text-muted-custom mb-4">
                  Call us directly and speak with a trucking insurance specialist.
                </p>
                <a href="tel:3312401101" className="font-sans text-[20px] font-medium text-purple">
                  (331) 240-1101
                </a>
                <p className="font-sans text-[13px] text-taupe mt-2">
                  Mon–Fri 8:00 AM – 5:00 PM CT
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
