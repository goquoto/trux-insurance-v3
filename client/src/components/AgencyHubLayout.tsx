import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

// Logo URLs (white for dark sidebar, dark for light mode header)
const LOGO_WHITE = "/manus-storage/trux-logo-white_f250e47b.png";
const LOGO_DARK = "/manus-storage/trux-logo-dark_ea3120b2.png";
const LOGO_ICON = "/manus-storage/Profile-02_797a7735.jpg";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const mainNav: NavItem[] = [
  { label: "Dashboard", path: "/portal", icon: <DashIcon /> },
  { label: "Submissions", path: "/portal/submissions", icon: <SubmissionsIcon /> },
  { label: "Carrier Directory", path: "/portal/carriers", icon: <CarrierIcon /> },
  { label: "MGAs", path: "/portal/mgas", icon: <MGAIcon /> },
  { label: "Knowledge Base", path: "/portal/kb", icon: <KBIcon /> },
  { label: "Workflows", path: "/portal/workflows", icon: <WorkflowIcon /> },
];

const peopleNav: NavItem[] = [
  { label: "Onboarding", path: "/portal/training", icon: <TrainingIcon /> },
  { label: "Team Directory", path: "/portal/team", icon: <TeamIcon /> },
  { label: "Users", path: "/portal/users", icon: <UsersIcon /> },
];

const opsNav: NavItem[] = [
  { label: "Intake", path: "/portal/intake", icon: <FormsIcon /> },
  { label: "Standards", path: "/portal/standards", icon: <StandardsIcon /> },
  { label: "Payment Options", path: "/portal/payments", icon: <PaymentsIcon /> },
];

// SVG Icons — thin line style matching truxins.net
function DashIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
}
function CarrierIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
}
function MGAIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>;
}
function KBIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>;
}
function WorkflowIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
}
function TrainingIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg>;
}
function TeamIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
}
function FormsIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
}
function SubmissionsIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
}
function StandardsIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}
function PaymentsIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
}
function UsersIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6"/><path d="M23 11h-6"/></svg>;
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
  if (path.startsWith("/portal/carriers")) return "Carrier Directory";
  if (path.startsWith("/portal/mgas")) return "MGAs";
  if (path.startsWith("/portal/submissions")) return "Submissions";
  if (path.startsWith("/portal/kb")) return "Knowledge Base";
  if (path.startsWith("/portal/workflows")) return "Workflows";
  if (path.startsWith("/portal/training")) return "Onboarding & Training";
  if (path.startsWith("/portal/team")) return "Team Directory";
  if (path.startsWith("/portal/intake")) return "Intake";
  if (path.startsWith("/portal/forms")) return "Intake Forms";
  if (path.startsWith("/portal/standards")) return "Standards";
  if (path.startsWith("/portal/payments")) return "Payment Options";
  if (path.startsWith("/portal/users")) return "Users";
  return "Agency Hub";
}

export default function AgencyHubLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try { return localStorage.getItem('hub-sidebar-collapsed') === 'true'; } catch { return false; }
  });
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, loading, logout } = useAuth();
  const pageTitle = getPageTitle(location);

  // Fetch pending users count for notification bell
  const { data: pendingUsers = [] } = trpc.portal.pendingUsers.useQuery(undefined, {
    enabled: !!user && ((user as any).role === 'admin' || (user as any).role === 'staff'),
    refetchInterval: 30000, // refresh every 30s
  });
  const pendingCount = (pendingUsers as any[]).length;

  const toggleSidebarCollapse = () => {
    const next = !sidebarCollapsed;
    setSidebarCollapsed(next);
    try { localStorage.setItem('hub-sidebar-collapsed', String(next)); } catch {}
  };

  // Close user menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/portal/login';
  };

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
  if ((user as any).role === 'customer') {
    if (typeof window !== 'undefined') {
      window.location.href = '/service-center';
    }
    return null;
  }
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
      <aside className={`hub-sidebar ${sidebarOpen ? "open" : ""} ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="hub-sidebar-logo">
          <Link href="/portal">
            {sidebarCollapsed
              ? <img src={LOGO_ICON} alt="Trux" className="hub-logo-icon" />
              : <span className="hub-logo-text">TRUX <span className="hub-logo-sub">INSURANCE SERVICES</span></span>
            }
          </Link>
          {!sidebarCollapsed && <div className="hub-logo-pill">AGENCY HUB</div>}
        </div>

        <nav className="hub-nav">
          <div className="hub-nav-section">
            <span className="hub-nav-label">MAIN</span>
            {mainNav.map(item => (
              <Link key={item.path} href={item.path} onClick={() => setSidebarOpen(false)}>
                <div className={`hub-nav-item ${isActive(item.path) ? "active" : ""}`} title={sidebarCollapsed ? item.label : undefined}>
                  {item.icon}
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </div>
              </Link>
            ))}
          </div>
          <div className="hub-nav-section">
            {!sidebarCollapsed && <span className="hub-nav-label">PEOPLE & TRAINING</span>}
            {peopleNav.map(item => (
              <Link key={item.path} href={item.path} onClick={() => setSidebarOpen(false)}>
                <div className={`hub-nav-item ${isActive(item.path) ? "active" : ""}`} title={sidebarCollapsed ? item.label : undefined}>
                  {item.icon}
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </div>
              </Link>
            ))}
          </div>
          <div className="hub-nav-section">
            {!sidebarCollapsed && <span className="hub-nav-label">OPERATIONS</span>}
            {opsNav.map(item => (
              <Link key={item.path} href={item.path} onClick={() => setSidebarOpen(false)}>
                <div className={`hub-nav-item ${isActive(item.path) ? "active" : ""}`} title={sidebarCollapsed ? item.label : undefined}>
                  {item.icon}
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </div>
              </Link>
            ))}
          </div>
        </nav>

        {!sidebarCollapsed && (
          <div className="hub-sidebar-footer">
            <p className="hub-sidebar-footer-addr">1 Tiffany Pointe #7-G2</p>
            <p className="hub-sidebar-footer-addr">Bloomingdale, IL 60108</p>
            <p className="hub-sidebar-footer-phone">331-240-1101</p>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          className="hub-sidebar-collapse-btn"
          onClick={toggleSidebarCollapse}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"/></svg>
          }
        </button>
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
            <Link href="/portal/users" className="hub-icon-btn hub-bell-btn" aria-label="Notifications">
              <BellIcon />
              {pendingCount > 0 && <span className="hub-bell-badge">{pendingCount}</span>}
            </Link>
            <Link href="/" className="hub-back-link">← Website</Link>
            {user && (
              <div className="hub-user-badge" ref={userMenuRef} style={{ position: 'relative' }}>
                <button
                  className="hub-user-badge-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-expanded={userMenuOpen}
                  aria-label="User menu"
                >
                  <span className="hub-user-avatar">{user.name?.charAt(0) || "U"}</span>
                  <span className="hub-user-name">{user.name || "User"}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {userMenuOpen && (
                  <div className="hub-user-dropdown">
                    <div className="hub-user-dropdown-info">
                      <strong>{user.name}</strong>
                      <span>{(user as any).role || 'user'}</span>
                    </div>
                    <div className="hub-user-dropdown-divider" />
                    <button className="hub-user-dropdown-item" onClick={handleLogout}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      Sign Out
                    </button>
                  </div>
                )}
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
