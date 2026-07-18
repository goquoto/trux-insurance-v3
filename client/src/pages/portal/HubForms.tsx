import { Link } from "wouter";
import AgencyHubLayout from "@/components/AgencyHubLayout";

const forms = [
  {
    category: "New Business Intake",
    items: [
      { title: "Trucking / Commercial Auto Intake", description: "Full intake for new trucking accounts — DOT#, equipment, drivers, operations, coverages.", link: "/portal/kb/new-business-checklist" },
      { title: "Personal Lines Intake", description: "Home, auto, umbrella, specialty — standard personal lines intake questions.", link: "" },
      { title: "Workers Comp Intake", description: "Payroll, class codes, experience mod, loss history — workers comp submission data.", link: "" },
    ],
  },
  {
    category: "Claims",
    items: [
      { title: "First Notice of Loss (FNOL) Form", description: "Complete claim intake question set — insured info, loss details, vehicles, injuries, cargo.", link: "/portal/kb/claim-intake" },
      { title: "No-Loss Statement", description: "Client attestation of no losses during a coverage lapse period (for reinstatements).", link: "/portal/kb/reinstatements" },
    ],
  },
  {
    category: "Policy Changes",
    items: [
      { title: "Vehicle Add/Delete Request", description: "VIN, year/make/model, stated value, lienholder, coverages — for adding or removing units.", link: "/portal/kb/add-delete-vehicle" },
      { title: "Driver Add/Delete Request", description: "Name, CDL#, DOB, hire date, MVR consent — for adding or removing drivers.", link: "" },
      { title: "Address Change Request", description: "Mailing vs. garaging distinction, re-rating implications, downstream updates.", link: "/portal/kb/garaging-mailing-address" },
      { title: "General Change Request", description: "Coverage changes, limit adjustments, endorsement requests — catch-all form.", link: "/portal/kb/change-request-pipeline" },
    ],
  },
  {
    category: "Certificates & Filings",
    items: [
      { title: "COI Request Form", description: "Certificate holder name, address, requirements (AI, WOS, P&NC), delivery method.", link: "/portal/kb/coi-issuance" },
      { title: "AOR Letter Template", description: "Agent of Record change letter — insured signs on their letterhead.", link: "/portal/kb/aor-processing" },
    ],
  },
  {
    category: "Billing & Finance",
    items: [
      { title: "Payment Authorization", description: "ACH/credit card authorization for recurring or one-time payments.", link: "/portal/kb/payment-options" },
      { title: "Premium Finance Agreement", description: "Standard premium finance agreement template for financed policies.", link: "" },
    ],
  },
];

export default function HubForms() {
  return (
    <AgencyHubLayout>
      <div className="hub-forms-page">
        <p className="hub-section-desc">
          Standard intake forms and templates used across the agency. Each form links to its corresponding SOP for detailed procedures.
        </p>

        {forms.map(group => (
          <section key={group.category} className="hub-forms-group">
            <h2>{group.category}</h2>
            <div className="hub-forms-list">
              {group.items.map(item => (
                <div key={item.title} className="hub-form-card">
                  <div className="hub-form-card-content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="hub-form-card-actions">
                    {item.link ? (
                      <Link href={item.link} className="hub-form-link">View SOP →</Link>
                    ) : (
                      <span className="hub-form-coming">Coming soon</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AgencyHubLayout>
  );
}
