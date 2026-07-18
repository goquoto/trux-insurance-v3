import { Link } from "wouter";
import AgencyHubLayout from "@/components/AgencyHubLayout";

const turnaroundTimes = [
  { task: "Certificate of Insurance (COI)", standard: "Same day, within 2 hours" },
  { task: "Change requests (before 3 PM CT)", standard: "Same day" },
  { task: "Claims (FNOL reporting)", standard: "Same day — no exceptions" },
  { task: "Trucking submission to underwriter", standard: "Within 48 hours of complete info" },
  { task: "Client callbacks", standard: "Same business day" },
  { task: "Email responses", standard: "Within 1 business day" },
  { task: "Renewal outreach", standard: "60 days before expiration" },
  { task: "Past-due follow-up", standard: "Same day as notice received" },
];

const coreRules = [
  { rule: "If it isn't logged, it didn't happen", detail: "Document every client interaction, carrier communication, and policy action the same day it occurs." },
  { rule: "No verbal binding", detail: "All binding must follow the written Binding Procedures SOP with proper carrier authorization." },
  { rule: "VINs — copy, never retype", detail: "Manual transcription errors cause coverage gaps and claims denials." },
  { rule: "Never promise coverage", detail: "Say: 'I'll get this reported to the carrier and they'll review the claim under your policy terms.'" },
  { rule: "Down payment cannot be waived", detail: "Coverage begins once the down payment is received — this condition cannot be waived." },
  { rule: "Never store credit card numbers", detail: "Not in email, not in notes, not in AMS, nowhere. Direct clients to the secure payment portal." },
  { rule: "Never share login credentials", detail: "Every team member must have their own login for each carrier portal and system." },
  { rule: "Verify endorsements match requests", detail: "Check effective dates, coverages, limits, and premium on every endorsement received." },
];

const peerReviewItems = [
  "New business binds",
  "Finance agreements",
  "Any transaction over $10,000 in premium",
  "Reinstatements after lapse",
];

export default function HubStandards() {
  return (
    <AgencyHubLayout>
      <div className="hub-standards-page">
        {/* Turnaround Times */}
        <section className="hub-section">
          <h2>Turnaround Time Standards</h2>
          <p className="hub-section-desc">These are commitments, not suggestions. Every team member is expected to meet these consistently.</p>
          <div className="hub-standards-table">
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Standard</th>
                </tr>
              </thead>
              <tbody>
                {turnaroundTimes.map(t => (
                  <tr key={t.task}>
                    <td>{t.task}</td>
                    <td className="hub-standard-value">{t.standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Core Rules */}
        <section className="hub-section">
          <h2>Core Rules</h2>
          <p className="hub-section-desc">Non-negotiable principles that protect clients, the agency, and you.</p>
          <div className="hub-rules-list">
            {coreRules.map((r, i) => (
              <div key={i} className="hub-rule-card">
                <h4>{r.rule}</h4>
                <p>{r.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Peer Review */}
        <section className="hub-section">
          <h2>Peer Review Requirements</h2>
          <p className="hub-section-desc">The following require a second set of eyes before processing:</p>
          <ul className="hub-peer-review-list">
            {peerReviewItems.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Related SOPs */}
        <section className="hub-section">
          <h2>Related SOPs</h2>
          <div className="hub-quicklinks-grid">
            <div className="hub-quicklink-card">
              <h4>Agency Standards</h4>
              <ul>
                <li><Link href="/portal/kb/company-guidelines">Company Guidelines</Link></li>
                <li><Link href="/portal/kb/code-of-ethics">Code of Ethics</Link></li>
                <li><Link href="/portal/kb/quality-standards">Quality Standards</Link></li>
                <li><Link href="/portal/kb/data-security">Data Security Practices</Link></li>
              </ul>
            </div>
            <div className="hub-quicklink-card">
              <h4>Workflows</h4>
              <ul>
                <li><Link href="/portal/kb/binding-procedures">Binding Procedures</Link></li>
                <li><Link href="/portal/kb/renewals-workflow">Renewals Workflow</Link></li>
                <li><Link href="/portal/kb/change-request-pipeline">Change Request Pipeline</Link></li>
                <li><Link href="/portal/kb/reinstatements">Processing Reinstatements</Link></li>
              </ul>
            </div>
            <div className="hub-quicklink-card">
              <h4>Communication</h4>
              <ul>
                <li><Link href="/portal/kb/email-standards">Client Email Standards</Link></li>
                <li><Link href="/portal/kb/voicemail-scripts">Voicemail & OOO Scripts</Link></li>
                <li><Link href="/portal/kb/coi-issuance">COI Issuance</Link></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </AgencyHubLayout>
  );
}
