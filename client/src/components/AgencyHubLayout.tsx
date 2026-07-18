import { useState } from "react";
import { Link, useLocation } from "wouter";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const mainNav: NavItem[] = [
  { label: "Dashboard", path: "/portal", icon: <DashboardIcon /> },
  { label: "Carrier Directory", path: "/portal/carriers", icon: <CarrierIcon /> },
  { label: "Knowledge Base", path: "/portal/kb", icon: <KBIcon /> },
  { label: "Workflows", path: "/portal/kb?cat=Workflow", icon: <WorkflowIcon /> },
];

const peopleNav: NavItem[] = [
  { label: "Onboarding / Training", path: "/portal/training", icon: <TrainingIcon /> },
  { label: "Team Directory", path: "/portal/team", icon: <TeamIcon /> },
];

const opsNav: NavItem[] = [
  { label: "Intake Forms", path: "/portal/forms", icon: <FormsIcon /> },
  { label: "Standards", path: "/portal/standards", icon: <StandardsIcon /> },
  { label: "Payment Options", path: "/portal/kb/payment-options", icon: <PaymentIcon /> },
];

function DashboardIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
}
function CarrierIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"/><path d="M3 21h18"/><path d="M9 7h1"/><path d="M9 11h1"/><path d="M9 15h1"/><path d="M14 7h1"/><path d="M14 11h1"/><path d="M14 15h1"/></svg>;
}
function KBIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>;
}
function WorkflowIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
}
function TrainingIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>;
}
function TeamIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
}
function FormsIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
}
function StandardsIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}
function PaymentIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
}

function getPageTitle(path: string): string {
  if (path === "/portal") return "Dashboard";
  if (path.startsWith("/portal/carriers")) return "Carrier Directory";
  if (path.startsWith("/portal/kb")) return "Knowledge Base / SOPs";
  if (path.startsWith("/portal/training")) return "Onboarding / Training";
  if (path.startsWith("/portal/team")) return "Team Directory";
  if (path.startsWith("/portal/forms")) return "Intake Forms";
  if (path.startsWith("/portal/standards")) return "Standards & Best Practices";
  return "Agency Hub";
}

export default function AgencyHubLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pageTitle = getPageTitle(location);

  const isActive = (path: string) => {
    if (path === "/portal") return location === "/portal";
    if (path.includes("?")) return location.startsWith(path.split("?")[0]) && location.includes(path.split("?")[1]?.split("=")[1] || "");
    return location.startsWith(path);
  };

  return (
    <div className="hub-layout">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="hub-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`hub-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="hub-sidebar-logo">
          <div className="hub-logo-text">
            <span className="hub-logo-trux">TRUX</span>
            <svg className="hub-logo-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6bff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div className="hub-logo-tagline">INSURANCE SERVICES</div>
          <div className="hub-logo-pill">AGENCY HUB</div>
        </div>

        <nav className="hub-nav">
          <div className="hub-nav-section">
            <span className="hub-nav-label">MAIN</span>
            {mainNav.map(item => (
              <Link key={item.path} href={item.path} onClick={() => setSidebarOpen(false)}>
                <div className={`hub-nav-item ${isActive(item.path) ? "active" : ""}`}>
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="hub-nav-section">
            <span className="hub-nav-label">PEOPLE & TRAINING</span>
            {peopleNav.map(item => (
              <Link key={item.path} href={item.path} onClick={() => setSidebarOpen(false)}>
                <div className={`hub-nav-item ${isActive(item.path) ? "active" : ""}`}>
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="hub-nav-section">
            <span className="hub-nav-label">OPERATIONS</span>
            {opsNav.map(item => (
              <Link key={item.path} href={item.path} onClick={() => setSidebarOpen(false)}>
                <div className={`hub-nav-item ${isActive(item.path) ? "active" : ""}`}>
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </nav>

        <div className="hub-sidebar-footer">
          <p>1 Tiffany Pointe #7-G2</p>
          <p>Bloomingdale, IL 60108</p>
          <p>331-240-1101</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="hub-main">
        {/* Header */}
        <header className="hub-header">
          <button className="hub-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <h1 className="hub-header-title">{pageTitle}</h1>
          <div className="hub-header-right">
            <Link href="/" className="hub-back-link">← Back to Website</Link>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="hub-breadcrumb">
          <Link href="/portal">Home</Link>
          {location !== "/portal" && (
            <>
              <span className="hub-breadcrumb-sep">/</span>
              <span>{pageTitle}</span>
            </>
          )}
        </div>

        {/* Content */}
        <main className="hub-content">
          {children}
        </main>

        {/* Footer */}
        <footer className="hub-footer">
          <span>TRUX Insurance Services — internal agency hub · For employee use only</span>
          <div className="hub-footer-links">
            <Link href="/portal/kb/payment-options">Payment Options</Link>
            <Link href="/portal/standards">Standards</Link>
            <Link href="/portal/training">Training</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
