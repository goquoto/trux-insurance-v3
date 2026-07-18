import { Link } from "wouter";
import AgencyHubLayout from "@/components/AgencyHubLayout";

const onboardingSteps = [
  { step: 1, title: "Welcome & Orientation", description: "Meet the team, tour the office (or virtual workspace), receive equipment and logins.", duration: "Day 1" },
  { step: 2, title: "Systems Access", description: "NowCerts AMS, AgencyZoom CRM, carrier portals, email, phone system, password manager setup.", duration: "Day 1–2" },
  { step: 3, title: "Read Core SOPs", description: "Company Guidelines, Code of Ethics, Data Security, Quality Standards — acknowledge in writing.", duration: "Day 2–3" },
  { step: 4, title: "Role-Specific Training", description: "Shadow your mentor for 1 week. Complete the curriculum track for your department.", duration: "Week 1–2" },
  { step: 5, title: "Carrier Portal Training", description: "Register on assigned carrier portals. Complete quoting exercises with test data.", duration: "Week 2–3" },
  { step: 6, title: "Supervised Live Work", description: "Handle real tasks with mentor review. Gradually increase independence.", duration: "Week 3–4" },
  { step: 7, title: "30-Day Check-In", description: "Review progress with manager. Set 60/90-day goals. Confirm all access and training complete.", duration: "Day 30" },
];

const curriculumTracks = [
  {
    title: "Sales & Production",
    audience: "Producers, Licensed Assistants",
    modules: [
      "New Business Submission Checklist (Trucking)",
      "Binding Procedures",
      "Renewals Workflow",
      "AOR Processing",
      "Carrier Directory & Portal Access",
      "Client Email Standards",
    ],
  },
  {
    title: "Policy Services",
    audience: "Policy Specialists, CSRs",
    modules: [
      "Change Request Pipeline",
      "Adding/Deleting Vehicles",
      "Garaging/Mailing Address Changes",
      "Issuing COIs",
      "Processing Reinstatements",
      "Quality Standards",
    ],
  },
  {
    title: "Billing & Accounting",
    audience: "Billing Specialists, Accounting",
    modules: [
      "Payment Options",
      "Past Due Payments Pipeline",
      "Processing Reinstatements",
      "Finance Company Procedures",
      "Data Security (PII handling)",
    ],
  },
  {
    title: "Claims",
    audience: "Claims Handlers, CSRs",
    modules: [
      "Claim Intake Questions & Procedures",
      "Claims Pipeline in AgencyZoom",
      "Client Communication Standards",
      "Voicemail & Email Scripts",
    ],
  },
  {
    title: "Front Desk & Client Support",
    audience: "CSRs, Receptionists",
    modules: [
      "Voicemail Scripts & OOO Templates",
      "Client Email Standards",
      "Claim Intake (basic triage)",
      "Payment Options (directing clients)",
      "Company Guidelines",
    ],
  },
];

export default function HubTraining() {
  return (
    <AgencyHubLayout>
      <div className="hub-training-page">
        {/* Onboarding Stepper */}
        <section className="hub-section">
          <h2>New Employee Onboarding</h2>
          <p className="hub-section-desc">Every new team member completes these 7 steps in their first 30 days.</p>
          <div className="hub-stepper">
            {onboardingSteps.map(step => (
              <div key={step.step} className="hub-step">
                <div className="hub-step-number">{step.step}</div>
                <div className="hub-step-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                  <span className="hub-step-duration">{step.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Curriculum Tracks */}
        <section className="hub-section">
          <h2>Curriculum Tracks</h2>
          <p className="hub-section-desc">Role-specific training paths. Each module links to the corresponding SOP in the Knowledge Base.</p>
          <div className="hub-curriculum-grid">
            {curriculumTracks.map(track => (
              <div key={track.title} className="hub-curriculum-card">
                <h3>{track.title}</h3>
                <p className="hub-curriculum-audience">{track.audience}</p>
                <ol className="hub-curriculum-modules">
                  {track.modules.map((mod, i) => (
                    <li key={i}>{mod}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="hub-section">
          <h2>Training Resources</h2>
          <div className="hub-quicklinks-grid">
            <div className="hub-quicklink-card">
              <h4>Required Reading</h4>
              <ul>
                <li><Link href="/portal/kb/company-guidelines">Company Guidelines</Link></li>
                <li><Link href="/portal/kb/code-of-ethics">Code of Ethics</Link></li>
                <li><Link href="/portal/kb/data-security">Data Security Practices</Link></li>
                <li><Link href="/portal/kb/quality-standards">Quality Standards</Link></li>
              </ul>
            </div>
            <div className="hub-quicklink-card">
              <h4>External Training</h4>
              <ul>
                <li><a href="https://www.insurancetrainingcenter.com" target="_blank" rel="noopener noreferrer">Insurance Training Center (CE)</a></li>
                <li><a href="https://www.kaplanfinancial.com" target="_blank" rel="noopener noreferrer">Kaplan Financial Education</a></li>
                <li><a href="https://www.fmcsa.dot.gov/registration" target="_blank" rel="noopener noreferrer">FMCSA Registration & Licensing</a></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </AgencyHubLayout>
  );
}
