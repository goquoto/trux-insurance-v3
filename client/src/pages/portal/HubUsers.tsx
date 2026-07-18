import { useState, useMemo } from "react";
import AgencyHubLayout from "@/components/AgencyHubLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

type UserRecord = {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  loginMethod: string | null;
  role: "user" | "staff" | "admin";
  accountStatus: "pending" | "approved" | "rejected";
  createdAt: Date;
  lastSignedIn: Date;
  [key: string]: any;
};

type Tab = "team" | "customers";

export default function HubUsers() {
  const [activeTab, setActiveTab] = useState<Tab>("team");
  const [view, setView] = useState<"list" | "grid">("list");
  const { user: currentUser } = useAuth();
  const isAdmin = (currentUser as any)?.role === "admin";

  const { data: allUsers = [], refetch } = trpc.portal.listUsers.useQuery();
  const approveUser = trpc.portal.approveUser.useMutation({ onSuccess: () => refetch() });
  const rejectUser = trpc.portal.rejectUser.useMutation({ onSuccess: () => refetch() });
  const updateRole = trpc.portal.updateUserRole.useMutation({ onSuccess: () => refetch() });

  // Split users into Team (@truxins.com) and Customers (everyone else)
  const teamUsers = useMemo(() => {
    return (allUsers as UserRecord[]).filter(u => 
      u.email?.endsWith("@truxins.com") || u.loginMethod?.toLowerCase().includes("microsoft")
    );
  }, [allUsers]);

  const customerUsers = useMemo(() => {
    return (allUsers as UserRecord[]).filter(u => 
      !u.email?.endsWith("@truxins.com") && !u.loginMethod?.toLowerCase().includes("microsoft")
    );
  }, [allUsers]);

  const displayedUsers = activeTab === "team" ? teamUsers : customerUsers;
  const pendingCount = customerUsers.filter(u => u.accountStatus === "pending").length;

  const handleApprove = (userId: number) => {
    approveUser.mutate({ userId });
  };

  const handleReject = (userId: number) => {
    if (confirm("Are you sure you want to reject this user?")) {
      rejectUser.mutate({ userId });
    }
  };

  const handleRoleChange = (userId: number, newRole: "user" | "staff" | "admin") => {
    updateRole.mutate({ userId, role: newRole });
  };

  const formatDate = (d: any) => {
    try {
      const date = d instanceof Date ? d : new Date(d);
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch { return "—"; }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved": return "hub-status-badge fulltime";
      case "pending": return "hub-status-badge contractor";
      case "rejected": return "hub-status-badge rejected";
      default: return "hub-status-badge";
    }
  };

  return (
    <AgencyHubLayout>
      <div className="hub-users-page">
        {/* Tab bar */}
        <div className="hub-users-tabs">
          <button
            className={`hub-users-tab ${activeTab === "team" ? "active" : ""}`}
            onClick={() => setActiveTab("team")}
          >
            Team ({teamUsers.length})
          </button>
          <button
            className={`hub-users-tab ${activeTab === "customers" ? "active" : ""}`}
            onClick={() => setActiveTab("customers")}
          >
            Customers ({customerUsers.length})
            {pendingCount > 0 && <span className="hub-users-badge">{pendingCount}</span>}
          </button>
          <div style={{ flex: 1 }} />
          <div className="hub-view-toggle">
            <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>List</button>
            <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>Tiles</button>
          </div>
        </div>

        {/* Tab description */}
        <p className="hub-users-desc">
          {activeTab === "team"
            ? "Team members with @truxins.com Microsoft accounts. Auto-approved on sign-in."
            : "External users who signed up. Require admin approval before accessing the hub."}
        </p>

        {displayedUsers.length === 0 ? (
          <div className="hub-empty-state">
            <p>No {activeTab === "team" ? "team members" : "customers"} yet.</p>
          </div>
        ) : view === "list" ? (
          <div className="hub-team-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Provider</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Last Active</th>
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {displayedUsers.map((u: UserRecord) => (
                  <tr key={u.id}>
                    <td className="hub-team-name">{u.name || "—"}</td>
                    <td>{u.email || "—"}</td>
                    <td>{u.loginMethod || "OAuth"}</td>
                    <td>
                      <span className={getStatusBadge(u.accountStatus)}>
                        {u.accountStatus}
                      </span>
                    </td>
                    <td>
                      {isAdmin ? (
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                          className="hub-role-select"
                        >
                          <option value="user">User</option>
                          <option value="staff">Staff</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <span className="hub-role-label">{u.role}</span>
                      )}
                    </td>
                    <td>{formatDate(u.createdAt)}</td>
                    <td>{formatDate(u.lastSignedIn)}</td>
                    {isAdmin && (
                      <td className="hub-users-actions">
                        {u.accountStatus === "pending" && (
                          <>
                            <button className="hub-btn-approve" onClick={() => handleApprove(u.id)}>Approve</button>
                            <button className="hub-btn-reject" onClick={() => handleReject(u.id)}>Reject</button>
                          </>
                        )}
                        {u.accountStatus === "rejected" && (
                          <button className="hub-btn-approve" onClick={() => handleApprove(u.id)}>Re-approve</button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="hub-team-grid">
            {displayedUsers.map((u: UserRecord) => (
              <div key={u.id} className="hub-team-card">
                <div className="hub-team-card-avatar">
                  {u.name?.split(" ").map(n => n[0]).join("") || "?"}
                </div>
                <h4>{u.name || "Unknown"}</h4>
                <p className="hub-team-card-title">{u.email || "—"}</p>
                <p className="hub-team-card-dept">{u.loginMethod || "OAuth"}</p>
                <div className="hub-team-card-meta">
                  <span className={getStatusBadge(u.accountStatus)}>{u.accountStatus}</span>
                  <span>{u.role}</span>
                </div>
                {isAdmin && u.accountStatus === "pending" && (
                  <div className="hub-users-card-actions">
                    <button className="hub-btn-approve" onClick={() => handleApprove(u.id)}>Approve</button>
                    <button className="hub-btn-reject" onClick={() => handleReject(u.id)}>Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AgencyHubLayout>
  );
}
