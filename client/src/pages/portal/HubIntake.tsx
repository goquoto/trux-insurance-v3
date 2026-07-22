import { useState, useMemo } from "react";
import AgencyHubLayout from "@/components/AgencyHubLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ApprovedCustomer {
  id: number;
  name: string | null;
  email: string | null;
  title: string | null;
}

// ─── Service Form Cards ───────────────────────────────────────────────────────
const SERVICE_FORMS = [
  { label: "Policy Change / General Request", path: "/service-center/policy-change", icon: "📋" },
  { label: "Certificate of Insurance", path: "/service-center/certificate", icon: "📄" },
  { label: "Commercial Claim", path: "/service-center/claim", icon: "⚠️" },
  { label: "Account Review", path: "/service-center/appointment", icon: "📊" },
];

// ─── Tab Types ────────────────────────────────────────────────────────────────
type IntakeTab = "contact" | "fast_quote" | "full_quote";

const COVERAGE_OPTIONS = [
  "Auto Liability",
  "Physical Damage",
  "Cargo",
  "General Liability",
  "Workers Comp",
  "Full Package",
];

export default function HubIntake() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<IntakeTab>("contact");
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  // Fetch approved customers for the "on behalf of" selector
  const { data: allUsers } = trpc.portal.listUsers.useQuery();
  const approvedCustomers: ApprovedCustomer[] = useMemo(() => {
    if (!allUsers) return [];
    return allUsers
      .filter((u: any) => u.accountStatus === "approved" && (u.role === "customer" || u.role === "user"))
      .map((u: any) => ({ id: u.id, name: u.name, email: u.email, title: u.title }));
  }, [allUsers]);

  const selectedCustomer = approvedCustomers.find(c => c.id === selectedCustomerId) || null;

  // ─── Contact Form State ───────────────────────────────────────────────────
  const [contactForm, setContactForm] = useState({
    name: "", email: "", phone: "", message: "",
  });

  // ─── Fast Quote Form State ────────────────────────────────────────────────
  const [fastQuoteForm, setFastQuoteForm] = useState({
    name: "", email: "", phone: "", usdot: "", numTrucks: "", coverageNeeded: "",
  });

  // ─── Full Quote Form State ────────────────────────────────────────────────
  const [fullQuoteForm, setFullQuoteForm] = useState({
    businessName: "", contactName: "", email: "", phone: "",
    usdot: "", mcNumber: "", garagingCityState: "", currentCarrier: "",
    effectiveDate: "", vehicles: "", drivers: "", notes: "",
  });

  // ─── USDOT Lookup ─────────────────────────────────────────────────────────
  const [dotLookupLoading, setDotLookupLoading] = useState(false);
  const [dotLookupResult, setDotLookupResult] = useState<{ legalName: string; cityState: string; active: boolean } | null>(null);

  const lookupUSDOT = async (dotNumber: string) => {
    if (!dotNumber.trim()) return;
    setDotLookupLoading(true);
    setDotLookupResult(null);
    try {
      const res = await fetch(`/api/fmcsa/lookup?dot=${encodeURIComponent(dotNumber.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setDotLookupResult(data);
        // Prefill business name
        if (data.legalName) {
          if (activeTab === "fast_quote") {
            setFastQuoteForm(f => ({ ...f, name: data.legalName }));
          } else if (activeTab === "full_quote") {
            setFullQuoteForm(f => ({ ...f, businessName: data.legalName, garagingCityState: data.cityState || f.garagingCityState }));
          }
        }
      } else if (res.status === 501) {
        // No FMCSA key — open SAFER in new tab
        window.open(`https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=${dotNumber.trim()}`, "_blank");
      }
    } catch {
      // Fallback: open SAFER
      window.open(`https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=${dotNumber.trim()}`, "_blank");
    } finally {
      setDotLookupLoading(false);
    }
  };

  // ─── Submission Handler ───────────────────────────────────────────────────
  const createSubmission = trpc.submissions.create.useMutation();

  const handleSubmit = async () => {
    setSubmitting(true);
    setSuccessRef(null);
    try {
      let data: Array<{ section: string; fields: Array<{ label: string; value: any }> }> = [];
      let type: "contact" | "fast_quote" | "full_quote" = activeTab;
      let customerEmail = selectedCustomer?.email || undefined;

      if (activeTab === "contact") {
        customerEmail = customerEmail || contactForm.email;
        data = [{
          section: "Contact",
          fields: [
            { label: "Name", value: contactForm.name },
            { label: "Email", value: contactForm.email },
            { label: "Phone", value: contactForm.phone },
            { label: "Message", value: contactForm.message },
          ],
        }];
      } else if (activeTab === "fast_quote") {
        customerEmail = customerEmail || fastQuoteForm.email;
        data = [{
          section: "Fast Quote",
          fields: [
            { label: "Name", value: fastQuoteForm.name },
            { label: "Email", value: fastQuoteForm.email },
            { label: "Phone", value: fastQuoteForm.phone },
            { label: "USDOT Number", value: fastQuoteForm.usdot },
            { label: "Number of Trucks", value: fastQuoteForm.numTrucks },
            { label: "Coverage Needed", value: fastQuoteForm.coverageNeeded },
          ],
        }];
      } else {
        customerEmail = customerEmail || fullQuoteForm.email;
        data = [{
          section: "Full Quote",
          fields: [
            { label: "Business Name", value: fullQuoteForm.businessName },
            { label: "Contact Name", value: fullQuoteForm.contactName },
            { label: "Email", value: fullQuoteForm.email },
            { label: "Phone", value: fullQuoteForm.phone },
            { label: "USDOT Number", value: fullQuoteForm.usdot },
            { label: "MC Number", value: fullQuoteForm.mcNumber },
            { label: "Garaging City/State", value: fullQuoteForm.garagingCityState },
            { label: "Current Carrier", value: fullQuoteForm.currentCarrier },
            { label: "Desired Effective Date", value: fullQuoteForm.effectiveDate },
            { label: "Vehicles", value: fullQuoteForm.vehicles },
            { label: "Drivers", value: fullQuoteForm.drivers },
            { label: "Notes", value: fullQuoteForm.notes },
          ],
        }];
      }

      const result = await createSubmission.mutateAsync({
        type,
        customerEmail: customerEmail || undefined,
        userId: selectedCustomerId || undefined,
        takenByUserId: (user as any)?.id || undefined,
        data,
      });

      setSuccessRef(result.ref);
      // Reset form
      if (activeTab === "contact") setContactForm({ name: "", email: "", phone: "", message: "" });
      if (activeTab === "fast_quote") setFastQuoteForm({ name: "", email: "", phone: "", usdot: "", numTrucks: "", coverageNeeded: "" });
      if (activeTab === "full_quote") setFullQuoteForm({ businessName: "", contactName: "", email: "", phone: "", usdot: "", mcNumber: "", garagingCityState: "", currentCarrier: "", effectiveDate: "", vehicles: "", drivers: "", notes: "" });
      setSelectedCustomerId(null);
      setDotLookupResult(null);
    } catch (err) {
      console.error("Intake submission failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Prefill when customer is selected
  const handleCustomerSelect = (id: number | null) => {
    setSelectedCustomerId(id);
    if (!id) return;
    const cust = approvedCustomers.find(c => c.id === id);
    if (!cust) return;
    const name = cust.name || "";
    const email = cust.email || "";
    const company = cust.title || "";

    if (activeTab === "contact") {
      setContactForm(f => ({ ...f, name, email }));
    } else if (activeTab === "fast_quote") {
      setFastQuoteForm(f => ({ ...f, name, email }));
    } else {
      setFullQuoteForm(f => ({ ...f, contactName: name, email, businessName: company }));
    }
  };

  // Today's date for min date picker
  const today = new Date().toISOString().split("T")[0];

  return (
    <AgencyHubLayout>
      <div className="hub-page-shell">
        {/* Header */}
        <section className="hub-section">
          <div className="hub-section-header">
            <span className="hub-eyebrow">OPERATIONS</span>
            <div className="hub-tick"></div>
          </div>
          <h2 className="hub-page-title">Intake</h2>
          <p className="hub-page-desc">Submit forms on behalf of customers or walk-in prospects. Service forms link to the customer-facing forms with agent attribution.</p>
        </section>

        {/* Service Form Cards */}
        <section className="intake-service-cards">
          <h3 className="intake-section-title">Service Center Forms</h3>
          <p className="intake-section-desc">Open these forms to submit on behalf of a customer. The Agent Intake panel will appear at the top.</p>
          <div className="intake-cards-grid">
            {SERVICE_FORMS.map(form => (
              <a
                key={form.path}
                href={`${form.path}?agent=true`}
                className="intake-card"
              >
                <span className="intake-card-icon">{form.icon}</span>
                <span className="intake-card-label">{form.label}</span>
                <span className="intake-card-arrow">→</span>
              </a>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="hub-divider" />

        {/* Quick Intake Forms */}
        <section className="intake-quick-forms">
          <h3 className="intake-section-title">Quick Intake</h3>
          <p className="intake-section-desc">Taking this over the phone? Select a customer or leave as "Walk-in / phone prospect."</p>

          {/* Customer Selector */}
          <div className="intake-customer-selector">
            <label className="intake-label">Submitting on behalf of</label>
            <select
              className="intake-select"
              value={selectedCustomerId || ""}
              onChange={e => handleCustomerSelect(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">Walk-in / phone prospect</option>
              {approvedCustomers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name || c.email} {c.title ? `(${c.title})` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Tabs */}
          <div className="intake-tabs">
            <button
              className={`intake-tab ${activeTab === "contact" ? "active" : ""}`}
              onClick={() => setActiveTab("contact")}
            >
              Contact
            </button>
            <button
              className={`intake-tab ${activeTab === "fast_quote" ? "active" : ""}`}
              onClick={() => setActiveTab("fast_quote")}
            >
              Fast Quote
            </button>
            <button
              className={`intake-tab ${activeTab === "full_quote" ? "active" : ""}`}
              onClick={() => setActiveTab("full_quote")}
            >
              Full Quote
            </button>
          </div>

          {/* Success Message */}
          {successRef && (
            <div className="intake-success">
              Submission created: <strong>{successRef}</strong>. It's now in the Submissions Inbox.
            </div>
          )}

          {/* Contact Form */}
          {activeTab === "contact" && (
            <div className="intake-form">
              <div className="intake-field">
                <label className="intake-label">Name *</label>
                <input className="intake-input" value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" />
              </div>
              <div className="intake-field">
                <label className="intake-label">Email *</label>
                <input className="intake-input" type="email" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} placeholder="email@example.com" />
              </div>
              <div className="intake-field">
                <label className="intake-label">Phone</label>
                <input className="intake-input" type="tel" value={contactForm.phone} onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))} placeholder="(555) 555-5555" />
              </div>
              <div className="intake-field">
                <label className="intake-label">Message *</label>
                <textarea className="intake-textarea" value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} placeholder="What can we help with?" rows={4} />
              </div>
              <button className="intake-submit" onClick={handleSubmit} disabled={submitting || !contactForm.name || !contactForm.email || !contactForm.message}>
                {submitting ? "Submitting…" : "Submit Contact"}
              </button>
            </div>
          )}

          {/* Fast Quote Form */}
          {activeTab === "fast_quote" && (
            <div className="intake-form">
              <div className="intake-field">
                <label className="intake-label">Name *</label>
                <input className="intake-input" value={fastQuoteForm.name} onChange={e => setFastQuoteForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name or business name" />
              </div>
              <div className="intake-field">
                <label className="intake-label">Email *</label>
                <input className="intake-input" type="email" value={fastQuoteForm.email} onChange={e => setFastQuoteForm(f => ({ ...f, email: e.target.value }))} placeholder="email@example.com" />
              </div>
              <div className="intake-field">
                <label className="intake-label">Phone *</label>
                <input className="intake-input" type="tel" value={fastQuoteForm.phone} onChange={e => setFastQuoteForm(f => ({ ...f, phone: e.target.value }))} placeholder="(555) 555-5555" />
              </div>
              <div className="intake-field intake-field-dot">
                <label className="intake-label">USDOT Number</label>
                <div className="intake-dot-row">
                  <input className="intake-input" value={fastQuoteForm.usdot} onChange={e => setFastQuoteForm(f => ({ ...f, usdot: e.target.value }))} placeholder="e.g. 1234567" />
                  <button className="intake-dot-btn" onClick={() => lookupUSDOT(fastQuoteForm.usdot)} disabled={dotLookupLoading || !fastQuoteForm.usdot.trim()}>
                    {dotLookupLoading ? "…" : "Look up"}
                  </button>
                </div>
                {dotLookupResult && (
                  <div className="intake-dot-result">
                    <span className={`intake-dot-status ${dotLookupResult.active ? "active" : "inactive"}`}>
                      {dotLookupResult.active ? "ACTIVE" : "INACTIVE"}
                    </span>
                    <span>{dotLookupResult.legalName} — {dotLookupResult.cityState}</span>
                  </div>
                )}
              </div>
              <div className="intake-field">
                <label className="intake-label">Number of Trucks</label>
                <input className="intake-input" type="number" min="1" value={fastQuoteForm.numTrucks} onChange={e => setFastQuoteForm(f => ({ ...f, numTrucks: e.target.value }))} placeholder="e.g. 5" />
              </div>
              <div className="intake-field">
                <label className="intake-label">Coverage Needed</label>
                <select className="intake-select" value={fastQuoteForm.coverageNeeded} onChange={e => setFastQuoteForm(f => ({ ...f, coverageNeeded: e.target.value }))}>
                  <option value="">Select coverage…</option>
                  {COVERAGE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <button className="intake-submit" onClick={handleSubmit} disabled={submitting || !fastQuoteForm.name || !fastQuoteForm.email || !fastQuoteForm.phone}>
                {submitting ? "Submitting…" : "Submit Fast Quote"}
              </button>
            </div>
          )}

          {/* Full Quote Form */}
          {activeTab === "full_quote" && (
            <div className="intake-form">
              <div className="intake-form-grid">
                <div className="intake-field">
                  <label className="intake-label">Business Name *</label>
                  <input className="intake-input" value={fullQuoteForm.businessName} onChange={e => setFullQuoteForm(f => ({ ...f, businessName: e.target.value }))} placeholder="Legal business name" />
                </div>
                <div className="intake-field">
                  <label className="intake-label">Contact Name *</label>
                  <input className="intake-input" value={fullQuoteForm.contactName} onChange={e => setFullQuoteForm(f => ({ ...f, contactName: e.target.value }))} placeholder="Full name" />
                </div>
                <div className="intake-field">
                  <label className="intake-label">Email *</label>
                  <input className="intake-input" type="email" value={fullQuoteForm.email} onChange={e => setFullQuoteForm(f => ({ ...f, email: e.target.value }))} placeholder="email@example.com" />
                </div>
                <div className="intake-field">
                  <label className="intake-label">Phone</label>
                  <input className="intake-input" type="tel" value={fullQuoteForm.phone} onChange={e => setFullQuoteForm(f => ({ ...f, phone: e.target.value }))} placeholder="(555) 555-5555" />
                </div>
                <div className="intake-field intake-field-dot">
                  <label className="intake-label">USDOT Number</label>
                  <div className="intake-dot-row">
                    <input className="intake-input" value={fullQuoteForm.usdot} onChange={e => setFullQuoteForm(f => ({ ...f, usdot: e.target.value }))} placeholder="e.g. 1234567" />
                    <button className="intake-dot-btn" onClick={() => lookupUSDOT(fullQuoteForm.usdot)} disabled={dotLookupLoading || !fullQuoteForm.usdot.trim()}>
                      {dotLookupLoading ? "…" : "Look up"}
                    </button>
                  </div>
                  {dotLookupResult && (
                    <div className="intake-dot-result">
                      <span className={`intake-dot-status ${dotLookupResult.active ? "active" : "inactive"}`}>
                        {dotLookupResult.active ? "ACTIVE" : "INACTIVE"}
                      </span>
                      <span>{dotLookupResult.legalName} — {dotLookupResult.cityState}</span>
                    </div>
                  )}
                </div>
                <div className="intake-field">
                  <label className="intake-label">MC Number</label>
                  <input className="intake-input" value={fullQuoteForm.mcNumber} onChange={e => setFullQuoteForm(f => ({ ...f, mcNumber: e.target.value }))} placeholder="MC-XXXXXXX" />
                </div>
                <div className="intake-field">
                  <label className="intake-label">Garaging City/State</label>
                  <input className="intake-input" value={fullQuoteForm.garagingCityState} onChange={e => setFullQuoteForm(f => ({ ...f, garagingCityState: e.target.value }))} placeholder="e.g. Chicago, IL" />
                </div>
                <div className="intake-field">
                  <label className="intake-label">Current Carrier</label>
                  <input className="intake-input" value={fullQuoteForm.currentCarrier} onChange={e => setFullQuoteForm(f => ({ ...f, currentCarrier: e.target.value }))} placeholder="Current insurance carrier" />
                </div>
                <div className="intake-field">
                  <label className="intake-label">Desired Effective Date</label>
                  <input className="intake-input" type="date" min={today} value={fullQuoteForm.effectiveDate} onChange={e => setFullQuoteForm(f => ({ ...f, effectiveDate: e.target.value }))} />
                </div>
              </div>
              <div className="intake-field">
                <label className="intake-label">Vehicles (Year/Make/Model/VIN/Value — one per line)</label>
                <textarea className="intake-textarea" value={fullQuoteForm.vehicles} onChange={e => setFullQuoteForm(f => ({ ...f, vehicles: e.target.value }))} placeholder="2022 Peterbilt 579 / 1XPWD40X1ED123456 / $145,000" rows={4} />
              </div>
              <div className="intake-field">
                <label className="intake-label">Drivers (Name/DOB/License#/State — one per line)</label>
                <textarea className="intake-textarea" value={fullQuoteForm.drivers} onChange={e => setFullQuoteForm(f => ({ ...f, drivers: e.target.value }))} placeholder="John Smith / 01-15-1985 / D1234567 / IL" rows={4} />
              </div>
              <div className="intake-field">
                <label className="intake-label">Notes</label>
                <textarea className="intake-textarea" value={fullQuoteForm.notes} onChange={e => setFullQuoteForm(f => ({ ...f, notes: e.target.value }))} placeholder="Additional notes or special requests" rows={3} />
              </div>
              <button className="intake-submit" onClick={handleSubmit} disabled={submitting || !fullQuoteForm.businessName || !fullQuoteForm.contactName || !fullQuoteForm.email}>
                {submitting ? "Submitting…" : "Submit Full Quote"}
              </button>
            </div>
          )}
        </section>
      </div>
    </AgencyHubLayout>
  );
}
