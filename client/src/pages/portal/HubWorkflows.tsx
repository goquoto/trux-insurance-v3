import AgencyHubLayout from "@/components/AgencyHubLayout";

export default function HubWorkflows() {
  return (
    <AgencyHubLayout>
      <div className="hub-page-shell">
        <section className="hub-section">
          <div className="hub-section-header">
            <span className="hub-eyebrow">WORKFLOWS</span>
            <div className="hub-tick"></div>
          </div>
          <h2 className="hub-page-title">Workflows</h2>
          <p className="hub-page-desc">Step-by-step workflows for quoting, binding, renewals, endorsements, claims, and certificates.</p>
        </section>

        <div className="hub-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          <p>Workflow guides will be added here. Check back soon.</p>
        </div>
      </div>
    </AgencyHubLayout>
  );
}
