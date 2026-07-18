import AgencyHubLayout from "@/components/AgencyHubLayout";

export default function HubMGAs() {
  return (
    <AgencyHubLayout>
      <div className="hub-page-shell">
        <section className="hub-section">
          <div className="hub-section-header">
            <span className="hub-eyebrow">MANAGING GENERAL AGENTS</span>
            <div className="hub-tick"></div>
          </div>
          <h2 className="hub-page-title">MGAs</h2>
          <p className="hub-page-desc">Browse and manage relationships with Managing General Agents — their programs, appetites, and submission guidelines.</p>
        </section>

        <div className="hub-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          <p>MGA data will be added here. Check back soon.</p>
        </div>
      </div>
    </AgencyHubLayout>
  );
}
