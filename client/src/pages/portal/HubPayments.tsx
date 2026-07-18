import AgencyHubLayout from "@/components/AgencyHubLayout";

export default function HubPayments() {
  return (
    <AgencyHubLayout>
      <div className="hub-page-shell">
        <section className="hub-section">
          <div className="hub-section-header">
            <span className="hub-eyebrow">PAYMENT OPTIONS</span>
            <div className="hub-tick"></div>
          </div>
          <h2 className="hub-page-title">Payment Options</h2>
          <p className="hub-page-desc">Payment methods, billing procedures, and premium finance options for clients.</p>
        </section>

        <div className="hub-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          <p>Payment options and billing information will be added here. Check back soon.</p>
        </div>
      </div>
    </AgencyHubLayout>
  );
}
