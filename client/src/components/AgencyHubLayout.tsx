import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

// Logo URLs (white for dark sidebar, dark for light mode header)
const LOGO_WHITE = "/manus-storage/trux-logo-white_f250e47b.png";
const LOGO_DARK = "/manus-storage/trux-logo-dark_ea3120b2.png";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const mainNav: NavItem[] = [
  { label: "Dashboard", path: "/portal", icon: <DashIcon /> },
  { label: "Team Directory", path: "/portal/team", icon: <TeamIcon /> },
];

// SVG Icons — thin line style matching truxins.net
function DashIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
}
function TeamIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
}
function BellIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>;
}
function SunIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
}
function MoonIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>;
}

function getPageTitle(path: string): string {
  if (path === "/portal") return "Dashboard";
  if (path.startsWith("/portal/team")) return "Team Directory";
  return "Agency Hub";
}

export default function AgencyHubLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, loading } = useAuth();
  const pageTitle = getPageTitle(location);

  // Auth guard: redirect unauthenticated or unapproved users
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="w-8 h-8 border-2 border-[var(--hair)] border-t-[var(--ink)] rounded-full animate-spin" />
      </div>
    );
  }
  if (!user || (user as any).accountStatus !== 'approved') {
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/portal/login';
    }
    return null;
  }
  // Only staff and admin can access the hub
  if ((user as any).role === 'user') {
    if (typeof window !== 'undefined') {
      window.location.href = '/portal/login';
    }
    return null;
  }

  const isActive = (path: string) => {
    if (path === "/portal") return location === "/portal";
    return location.startsWith(path);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("hub-dark", !darkMode);
  };

  return (
    <div className={`hub-layout ${darkMode ? "hub-dark" : "hub-light"}`}>
      {/* Mobile overlay */}
      {sidebarOpen && <div className="hub-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`hub-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="hub-sidebar-logo">
          <Link href="/portal">
            <img src={LOGO_WHITE} alt="Trux Insurance Services" className="hub-logo-img" />
          </Link>
          <div className="hub-logo-pill">AGENCY HUB</div>
        </div>

        <nav className="hub-nav">
          <div className="hub-nav-section">
            <span className="hub-nav-label">NAVIGATION</span>
            {mainNav.map(item => (
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
          <p className="hub-sidebar-footer-addr">1 Tiffany Pointe #7-G2</p>
          <p className="hub-sidebar-footer-addr">Bloomingdale, IL 60108</p>
          <p className="hub-sidebar-footer-phone">331-240-1101</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="hub-main">
        {/* Header */}
        <header className="hub-header">
          <div className="hub-header-left">
            <button className="hub-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <img src={darkMode ? LOGO_WHITE : LOGO_DARK} alt="Trux" className="hub-header-logo" />
          </div>
          <div className="hub-header-right">
            <button className="hub-icon-btn" onClick={toggleDarkMode} aria-label="Toggle dark mode" title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <button className="hub-icon-btn" aria-label="Notifications">
              <BellIcon />
            </button>
            <Link href="/" className="hub-back-link">← Website</Link>
            {user && (
              <div className="hub-user-badge">
                <span className="hub-user-avatar">{user.name?.charAt(0) || "U"}</span>
                <span className="hub-user-name">{user.name || "User"}</span>
              </div>
            )}
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="hub-breadcrumb">
          <Link href="/portal">Home</Link>
          {location !== "/portal" && (
            <>
              <span className="hub-breadcrumb-sep">·</span>
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
          <span>TRUX Insurance Services — Internal Agency Hub · For authorized personnel only</span>
        </footer>
      </div>
    </div>
  );
}
