import AgencyHubLayout from "@/components/AgencyHubLayout";

export default function HubTraining() {
  return (
    <AgencyHubLayout>
      <div className="hub-page-shell">
        <section className="hub-section">
          <div className="hub-section-header">
            <span className="hub-eyebrow">ONBOARDING & TRAINING</span>
            <div className="hub-tick"></div>
          </div>
          <h2 className="hub-page-title">Onboarding & Training</h2>
          <p className="hub-page-desc">New hire onboarding steps, training curriculum, and continuing education resources.</p>
        </section>

        <div className="hub-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg>
          <p>Training content and onboarding steps will be added here. Check back soon.</p>
        </div>
      </div>
    </AgencyHubLayout>
  );
}
