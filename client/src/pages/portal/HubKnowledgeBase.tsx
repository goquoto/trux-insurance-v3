import AgencyHubLayout from "@/components/AgencyHubLayout";

export default function HubKnowledgeBase() {
  return (
    <AgencyHubLayout>
      <div className="hub-page-shell">
        <section className="hub-section">
          <div className="hub-section-header">
            <span className="hub-eyebrow">KNOWLEDGE BASE</span>
            <div className="hub-tick"></div>
          </div>
          <h2 className="hub-page-title">Knowledge Base</h2>
          <p className="hub-page-desc">SOPs, workflows, underwriting guides, and reference articles for the team.</p>
        </section>

        <div className="hub-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="9" y1="7" x2="16" y2="7"/><line x1="9" y1="11" x2="16" y2="11"/><line x1="9" y1="15" x2="13" y2="15"/></svg>
          <p>Knowledge base articles will be added here. Check back soon.</p>
        </div>
      </div>
    </AgencyHubLayout>
  );
}
