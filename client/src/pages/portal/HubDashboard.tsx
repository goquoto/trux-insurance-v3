import AgencyHubLayout from "@/components/AgencyHubLayout";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { team } from "@/data/team";

function PendingApprovals() {
  const { data: users, isLoading } = trpc.portal.listUsers.useQuery();
  const utils = trpc.useUtils();
  const approveMutation = trpc.portal.approveUser.useMutation({
    onSuccess: () => utils.portal.listUsers.invalidate(),
  });
  const rejectMutation = trpc.portal.rejectUser.useMutation({
    onSuccess: () => utils.portal.listUsers.invalidate(),
  });

  const pendingUsers = users?.filter((u: any) => u.accountStatus === 'pending') || [];

  if (isLoading || pendingUsers.length === 0) return null;

  return (
    <section className="hub-section">
      <div className="hub-section-header">
        <span className="hub-eyebrow">PENDING APPROVALS</span>
        <div className="hub-tick"></div>
      </div>
      <div className="hub-pending-list">
        {pendingUsers.map((u: any) => (
          <div key={u.id} className="hub-pending-item">
            <div className="hub-pending-info">
              <span className="hub-pending-name">{u.name || u.email || 'Unknown'}</span>
              <span className="hub-pending-meta">
                {u.email && <span>{u.email}</span>}
                {u.authProvider && <span> · {u.authProvider}</span>}
                <span> · {new Date(u.createdAt).toLocaleDateString()}</span>
              </span>
            </div>
            <div className="hub-pending-actions">
              <button
                className="hub-btn-approve"
                onClick={() => approveMutation.mutate({ userId: u.id })}
                disabled={approveMutation.isPending}
              >
                Approve
              </button>
              <button
                className="hub-btn-reject"
                onClick={() => rejectMutation.mutate({ userId: u.id })}
                disabled={rejectMutation.isPending}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HubDashboard() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <AgencyHubLayout>
      <div className="hub-dashboard">
        {/* Welcome section */}
        <section className="hub-welcome">
          <h1 className="hub-welcome-title">Welcome back, <em>{firstName}</em>.</h1>
          <p className="hub-welcome-sub">Your agency hub for carrier info, team resources, and daily operations.</p>
        </section>

        {/* Pending Approvals - visible to staff/admin */}
        {((user as any)?.role === 'admin' || (user as any)?.role === 'staff') && <PendingApprovals />}

        {/* Quick actions */}
        <section className="hub-section">
          <div className="hub-section-header">
            <span className="hub-eyebrow">QUICK ACTIONS</span>
            <div className="hub-tick"></div>
          </div>
          <div className="hub-quick-grid">
            <Link href="/portal/team">
              <div className="hub-quick-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                <h3>Team Directory</h3>
                <p>View contacts and department info</p>
              </div>
            </Link>
            <a href="tel:3312401101">
              <div className="hub-quick-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                <h3>Call Office</h3>
                <p>(331) 240-1101</p>
              </div>
            </a>
            <a href="mailto:info@truxins.com">
              <div className="hub-quick-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <h3>Email Team</h3>
                <p>info@truxins.com</p>
              </div>
            </a>
            <Link href="/">
              <div className="hub-quick-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                <h3>Public Website</h3>
                <p>View truxins.net</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="hub-section">
          <div className="hub-section-header">
            <span className="hub-eyebrow">AT A GLANCE</span>
            <div className="hub-tick"></div>
          </div>
          <div className="hub-stats-row">
            <div className="hub-stat-card">
              <span className="hub-stat-number">{team.length}</span>
              <span className="hub-stat-label">Team Members</span>
            </div>
            <div className="hub-stat-card">
              <span className="hub-stat-number">22</span>
              <span className="hub-stat-label">States Licensed</span>
            </div>
            <div className="hub-stat-card">
              <span className="hub-stat-number">10+</span>
              <span className="hub-stat-label">Years Experience</span>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="hub-section">
          <div className="hub-section-header">
            <span className="hub-eyebrow">EXTERNAL RESOURCES</span>
            <div className="hub-tick"></div>
          </div>
          <div className="hub-quicklinks-grid">
            <div className="hub-quicklink-card">
              <h4>Regulatory</h4>
              <ul>
                <li><a href="https://safer.fmcsa.dot.gov/CompanySnapshot.aspx" target="_blank" rel="noopener noreferrer">FMCSA SAFER Company Snapshot</a></li>
                <li><a href="https://li-public.fmcsa.dot.gov" target="_blank" rel="noopener noreferrer">FMCSA Licensing & Insurance</a></li>
                <li><a href="https://msc.fema.gov/portal/home" target="_blank" rel="noopener noreferrer">FEMA Flood Property Search</a></li>
              </ul>
            </div>
            <div className="hub-quicklink-card">
              <h4>Lookups</h4>
              <ul>
                <li><a href="https://apps.ilsos.gov/businessentitysearch/" target="_blank" rel="noopener noreferrer">IL Business Name Search (SOS)</a></li>
                <li><a href="https://idfpr.illinois.gov/licenselookup/" target="_blank" rel="noopener noreferrer">Contractor License Search (IDFPR)</a></li>
                <li><a href="https://slai.org" target="_blank" rel="noopener noreferrer">IL Surplus Lines Association</a></li>
              </ul>
            </div>
            <div className="hub-quicklink-card">
              <h4>Internal</h4>
              <ul>
                <li><a href="https://truxins.net/pay" target="_blank" rel="noopener noreferrer">Pay Online</a></li>
                <li><a href="https://truxins.net" target="_blank" rel="noopener noreferrer">Trux Website</a></li>
                <li><a href="https://iwcc.illinois.gov" target="_blank" rel="noopener noreferrer">IL Workers Comp Commission</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Empty state for future content */}
        <section className="hub-section">
          <div className="hub-section-header">
            <span className="hub-eyebrow">RECENT ACTIVITY</span>
            <div className="hub-tick"></div>
          </div>
          <div className="hub-empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"><rect x="3" y="3" width="18" height="18" rx="0"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="12" y2="17"/></svg>
            <p>Activity feed will appear here as the hub grows.</p>
          </div>
        </section>
      </div>
    </AgencyHubLayout>
  );
}
