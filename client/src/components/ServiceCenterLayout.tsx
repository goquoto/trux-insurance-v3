import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

const LOGO_DARK = "/manus-storage/trux-logo-dark_ea3120b2.png";

type NavItem = { label: string; path: string; icon: React.ReactNode };

const navItems: NavItem[] = [
  { label: "Service Center", path: "/service-center", icon: <HomeIcon /> },
  { label: "Policy Change", path: "/service-center/policy-change", icon: <PolicyIcon /> },
  { label: "Request Certificate", path: "/service-center/certificate", icon: <CertIcon /> },
  { label: "Submit a Claim", path: "/service-center/claim", icon: <ClaimIcon /> },
  { label: "Account Review", path: "/service-center/appointment", icon: <CalendarIcon /> },
  { label: "Billing & Payments", path: "/service-center/carriers", icon: <BillingIcon /> },
];

function HomeIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function PolicyIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
}
function CertIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}
function ClaimIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
}
function CalendarIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function BillingIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
}

function getPageTitle(path: string): string {
  if (path === "/service-center") return "Customer Service Center";
  if (path.includes("/policy-change")) return "Policy Change Request";
  if (path.includes("/certificate")) return "Request Certificate";
  if (path.includes("/claim")) return "Submit a Claim";
  if (path.includes("/appointment")) return "Account Review";
  if (path.includes("/carriers")) return "Billing & Payments";
  return "Service Center";
}

export default function ServiceCenterLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const pageTitle = getPageTitle(location);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/portal/login';
  };

  // Auth guard: redirect unauthenticated users
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="w-8 h-8 border-2 border-[var(--hair)] border-t-[var(--ink)] rounded-full animate-spin" />
      </div>
    );
  }
  if (!user || (user as any).accountStatus !== 'approved') {
    if (typeof window !== 'undefined') {
      window.location.href = '/portal/login';
    }
    return null;
  }

  const isActive = (path: string) => {
    if (path === "/service-center") return location === "/service-center";
    return location.startsWith(path);
  };

  return (
    <div className="sc-layout">
      {/* Header */}
      <header className="sc-header">
        <div className="sc-header-left">
          <button className="sc-mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <Link href="/service-center">
            <img src={LOGO_DARK} alt="Trux Insurance Services" className="sc-logo" />
          </Link>
          <span className="sc-header-divider">|</span>
          <span className="sc-header-title">Service Center</span>
        </div>
        <div className="sc-header-right">
          <a href="tel:3312401101" className="sc-phone-link">(331) 240-1101</a>
          <Link href="/" className="sc-back-link">← Website</Link>
          {user && (
            <div className="sc-user-info">
              <span className="sc-user-name">{(user as any).name || (user as any).email || 'User'}</span>
              <button onClick={handleLogout} className="sc-logout-btn">Sign Out</button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <nav className="sc-mobile-nav">
          {navItems.map(item => (
            <Link key={item.path} href={item.path} className={`sc-mobile-nav-item ${isActive(item.path) ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      )}

      {/* Desktop nav bar */}
      <nav className="sc-nav">
        {navItems.map(item => (
          <Link key={item.path} href={item.path} className={`sc-nav-item ${isActive(item.path) ? 'active' : ''}`}>
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Breadcrumb */}
      <div className="sc-breadcrumb">
        <Link href="/service-center">Home</Link>
        {location !== "/service-center" && (
          <>
            <span className="sc-breadcrumb-sep">/</span>
            <span>{pageTitle}</span>
          </>
        )}
      </div>

      {/* Main content */}
      <main className="sc-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="sc-footer">
        <p>TRUX Insurance Services — Customer Service Center</p>
        <p className="sc-footer-disclaimer">Please keep in mind that coverage cannot be bound by email, voicemail, or fax. Coverage will only be bound with written notification from our office.</p>
        <p className="sc-footer-contact">1 Tiffany Pointe #7-G2, Bloomingdale, IL 60108 · (331) 240-1101</p>
      </footer>
    </div>
  );
}
