import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";

const LOGO_DARK = "/manus-storage/trux-logo-dark_ea3120b2.png";

export default function PortalLogin() {
  const { user } = useAuth();

  // If user is logged in but pending approval
  if (user && (user as any).accountStatus === "pending") {
    return (
      <div className="portal-login-page">
        <div className="portal-login-card">
          <img src={LOGO_DARK} alt="Trux Insurance Services" className="portal-login-logo" />
          <div className="portal-login-pill">AGENCY HUB</div>
          
          <div className="portal-pending-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--tick)" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <h2>Account Pending Approval</h2>
            <p>Your account has been created successfully. A manager or administrator will review and approve your access shortly.</p>
            <p className="portal-pending-note">You will receive a notification once your account is approved. If you need immediate access, please contact the office at <a href="tel:3312401101">(331) 240-1101</a>.</p>
          </div>

          <Link href="/" className="portal-back-link">← Back to Website</Link>
        </div>
      </div>
    );
  }

  // If user is logged in but rejected
  if (user && (user as any).accountStatus === "rejected") {
    return (
      <div className="portal-login-page">
        <div className="portal-login-card">
          <img src={LOGO_DARK} alt="Trux Insurance Services" className="portal-login-logo" />
          <div className="portal-login-pill">AGENCY HUB</div>
          
          <div className="portal-pending-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--warn)" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            <h2>Access Denied</h2>
            <p>Your account request was not approved. If you believe this is an error, please contact the office.</p>
          </div>

          <Link href="/" className="portal-back-link">← Back to Website</Link>
        </div>
      </div>
    );
  }

  // Not logged in — show login options
  const loginUrl = getLoginUrl("/portal");

  return (
    <div className="portal-login-page">
      <div className="portal-login-card">
        <img src={LOGO_DARK} alt="Trux Insurance Services" className="portal-login-logo" />
        <div className="portal-login-pill">AGENCY HUB</div>
        
        <h2 className="portal-login-title">Sign in to your account</h2>
        <p className="portal-login-subtitle">Staff members sign in with Microsoft. Customers can use any provider below.</p>

        <div className="portal-login-providers">
          <a href={loginUrl} className="portal-provider-btn portal-provider-microsoft">
            <svg width="18" height="18" viewBox="0 0 21 21"><rect x="1" y="1" width="9" height="9" fill="#f25022"/><rect x="11" y="1" width="9" height="9" fill="#7fba00"/><rect x="1" y="11" width="9" height="9" fill="#00a4ef"/><rect x="11" y="11" width="9" height="9" fill="#ffb900"/></svg>
            <span>Continue with Microsoft</span>
          </a>
          <a href={loginUrl} className="portal-provider-btn portal-provider-google">
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            <span>Continue with Google</span>
          </a>
          <a href={loginUrl} className="portal-provider-btn portal-provider-apple">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            <span>Continue with Apple</span>
          </a>
          <a href={loginUrl} className="portal-provider-btn portal-provider-email">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span>Continue with Email</span>
          </a>
        </div>

        <div className="portal-login-divider">
          <span>New accounts require approval</span>
        </div>

        <p className="portal-login-note">
          Staff accounts are approved by management. Customer accounts are reviewed within 24 hours. 
          For immediate assistance, call <a href="tel:3312401101">(331) 240-1101</a>.
        </p>

        <Link href="/" className="portal-back-link">← Back to Website</Link>
      </div>
    </div>
  );
}
