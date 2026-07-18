import { Link } from "wouter";
import AgencyHubLayout from "@/components/AgencyHubLayout";
import { carriers } from "@/data/carriers";
import { kbArticles } from "@/data/kbArticles";
import { team } from "@/data/team";

const heroTiles = [
  { label: "AGENCY HUB", title: "Welcome to the TRUX Agency Hub", subtitle: "Your daily operations home — SOPs, workflows, carrier reference, training, and standards, all in one place.", cta: "OPEN THE KNOWLEDGE BASE →", path: "/portal/kb", large: true },
  { label: "", title: "Carrier Directory", subtitle: `${carriers.length} carriers, brokers & vendors`, cta: "", path: "/portal/carriers", large: false },
  { label: "", title: "Onboarding & Training", subtitle: "New employee welcome · curriculum", cta: "", path: "/portal/training", large: false },
  { label: "", title: "Workflows", subtitle: "Pipelines, endorsements, renewals", cta: "", path: "/portal/kb?cat=Workflow", large: false },
  { label: "", title: "Payment Options", subtitle: "Client payment methods one-pager", cta: "", path: "/portal/kb/payment-options", large: false },
];

const quickLinks = [
  { group: "Quick Links", items: [
    { label: "FMCSA SAFER Company Snapshot", url: "https://safer.fmcsa.dot.gov/CompanySnapshot.aspx" },
    { label: "FEMA Flood Property Search", url: "https://msc.fema.gov/portal/home" },
    { label: "IL Surplus Lines Association", url: "https://slai.org" },
  ]},
  { group: "Lookups", items: [
    { label: "IL Business Name Search (SOS)", url: "https://apps.ilsos.gov/businessentitysearch/" },
    { label: "Contractor License Search (IDFPR)", url: "https://idfpr.illinois.gov/licenselookup/" },
    { label: "FMCSA Licensing & Insurance (Filings)", url: "https://li-public.fmcsa.dot.gov" },
  ]},
  { group: "Forms & Records", items: [
    { label: "IL Workers Comp Commission Forms", url: "https://iwcc.illinois.gov" },
    { label: "Pay Online", url: "https://truxins.com/pay" },
    { label: "Trux Website", url: "https://truxins.com" },
  ]},
];

export default function HubDashboard() {
  const latestArticles = [...kbArticles].slice(0, 5);
  const draftCount = kbArticles.filter(a => a.status === "draft").length;

  return (
    <AgencyHubLayout>
      <div className="hub-dashboard">
        {/* Hero Tiles */}
        <div className="hub-hero-grid">
          {heroTiles.map((tile, i) => (
            <Link key={i} href={tile.path}>
              <div className={`hub-hero-tile ${tile.large ? "large" : ""}`}>
                {tile.label && <span className="hub-hero-pill">{tile.label}</span>}
                <h3>{tile.title}</h3>
                {tile.subtitle && <p>{tile.subtitle}</p>}
                {tile.cta && <span className="hub-hero-cta">{tile.cta}</span>}
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Row */}
        <div className="hub-stats-row">
          <div className="hub-stat-card">
            <span className="hub-stat-number">{carriers.length}</span>
            <span className="hub-stat-label">Companies</span>
          </div>
          <div className="hub-stat-card">
            <span className="hub-stat-number">{kbArticles.length}</span>
            <span className="hub-stat-label">SOPs & Articles</span>
          </div>
          <div className="hub-stat-card">
            <span className="hub-stat-number">{team.length}</span>
            <span className="hub-stat-label">Team Members</span>
          </div>
          <div className="hub-stat-card">
            <span className="hub-stat-number">7</span>
            <span className="hub-stat-label">Onboarding Steps</span>
          </div>
        </div>

        {/* Quick Links */}
        <section className="hub-section">
          <h2>Quick Links</h2>
          <div className="hub-quicklinks-grid">
            {quickLinks.map(group => (
              <div key={group.group} className="hub-quicklink-card">
                <h4>{group.group}</h4>
                <ul>
                  {group.items.map(item => (
                    <li key={item.label}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Resources */}
        <section className="hub-section">
          <h2>Latest Resources</h2>
          <div className="hub-articles-list">
            {latestArticles.map(article => (
              <Link key={article.slug} href={`/portal/kb/${article.slug}`}>
                <div className="hub-article-card">
                  <div className="hub-article-header">
                    <h4>{article.title}</h4>
                    <span className={`hub-badge ${article.status}`}>
                      {article.status === "verified" ? "✓ Verified" : "Draft — review"}
                    </span>
                  </div>
                  <p className="hub-article-excerpt">{article.excerpt}</p>
                  <div className="hub-article-meta">
                    <span>{article.author}</span>
                    <div className="hub-article-tags">
                      {article.categories.map(c => (
                        <span key={c} className="hub-tag">{c}</span>
                      ))}
                    </div>
                  </div>
                  <span className="hub-read-more">Read more →</span>
                </div>
              </Link>
            ))}
          </div>
          <p className="hub-draft-note">{draftCount} articles are still drafts pending management review.</p>
        </section>
      </div>
    </AgencyHubLayout>
  );
}
