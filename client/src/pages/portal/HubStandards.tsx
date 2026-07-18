import AgencyHubLayout from "@/components/AgencyHubLayout";

export default function HubStandards() {
  return (
    <AgencyHubLayout>
      <div className="hub-page-shell">
        <section className="hub-section">
          <div className="hub-section-header">
            <span className="hub-eyebrow">STANDARDS & BEST PRACTICES</span>
            <div className="hub-tick"></div>
          </div>
          <h2 className="hub-page-title">Standards & Best Practices</h2>
          <p className="hub-page-desc">Quality standards, turnaround time targets, peer review requirements, and agency best practices.</p>
        </section>

        <div className="hub-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          <p>Standards and best practices documentation will be added here. Check back soon.</p>
        </div>
      </div>
    </AgencyHubLayout>
  );
}
