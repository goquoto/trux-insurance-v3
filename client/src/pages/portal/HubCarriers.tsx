import AgencyHubLayout from "@/components/AgencyHubLayout";

export default function HubCarriers() {
  return (
    <AgencyHubLayout>
      <div className="hub-page-shell">
        <section className="hub-section">
          <div className="hub-section-header">
            <span className="hub-eyebrow">CARRIER DIRECTORY</span>
            <div className="hub-tick"></div>
          </div>
          <h2 className="hub-page-title">Carrier Directory</h2>
          <p className="hub-page-desc">Search and browse all carrier partners, their lines of business, market types, and AMS integration status.</p>
        </section>

        <div className="hub-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          <p>Carrier data will be added here. Check back soon.</p>
        </div>
      </div>
    </AgencyHubLayout>
  );
}
