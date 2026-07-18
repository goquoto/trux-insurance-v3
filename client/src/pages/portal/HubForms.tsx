import AgencyHubLayout from "@/components/AgencyHubLayout";

export default function HubForms() {
  return (
    <AgencyHubLayout>
      <div className="hub-page-shell">
        <section className="hub-section">
          <div className="hub-section-header">
            <span className="hub-eyebrow">INTAKE FORMS</span>
            <div className="hub-tick"></div>
          </div>
          <h2 className="hub-page-title">Intake Forms</h2>
          <p className="hub-page-desc">Standard intake forms, applications, and document templates for client onboarding.</p>
        </section>

        <div className="hub-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          <p>Form templates and intake documents will be added here. Check back soon.</p>
        </div>
      </div>
    </AgencyHubLayout>
  );
}
