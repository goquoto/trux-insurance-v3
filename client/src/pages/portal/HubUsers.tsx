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
  role: "user" | "staff" | "admin" | "customer";
  accountStatus: "pending" | "approved" | "rejected";
  createdAt: Date;
  lastSignedIn: Date;
  [key: string]: any;
};

type Tab = "team" | "customers";

export default function HubUsers() {
  const [activeTab, setActiveTab] = useState<Tab>("team");
  const [view, setView] = useState<"list" | "grid">("list");
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const { user: currentUser } = useAuth();
  const isAdmin = (currentUser as any)?.role === "admin";

  const { data: allUsers = [], refetch } = trpc.portal.listUsers.useQuery();
  const approveUser = trpc.portal.approveUser.useMutation({ onSuccess: () => refetch() });
  const rejectUser = trpc.portal.rejectUser.useMutation({ onSuccess: () => refetch() });
  const updateRole = trpc.portal.updateUserRole.useMutation({ onSuccess: () => refetch() });
  const updateUser = trpc.portal.updateUser.useMutation({ onSuccess: () => { refetch(); setEditingUser(null); } });

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

  const handleRoleChange = (userId: number, newRole: "user" | "staff" | "admin" | "customer") => {
    updateRole.mutate({ userId, role: newRole });
  };

  const handleEditUser = (u: UserRecord) => {
    setEditingUser(u);
    setEditName(u.name || "");
    setEditEmail(u.email || "");
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;
    updateUser.mutate({
      userId: editingUser.id,
      name: editName || undefined,
      email: editEmail || undefined,
    });
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
                          <option value="customer">Customer</option>
                        </select>
                      ) : (
                        <span className="hub-role-label">{u.role}</span>
                      )}
                    </td>
                    <td>{formatDate(u.createdAt)}</td>
                    <td>{formatDate(u.lastSignedIn)}</td>
                    {isAdmin && (
                      <td className="hub-users-actions">
                        <button className="hub-btn-edit" onClick={() => handleEditUser(u)} title="Edit user">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
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
                  {isAdmin ? (
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                      className="hub-role-select"
                    >
                      <option value="user">User</option>
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                      <option value="customer">Customer</option>
                    </select>
                  ) : (
                    <span>{u.role}</span>
                  )}
                </div>
                {isAdmin && (
                  <div className="hub-users-card-actions">
                    <button className="hub-btn-edit" onClick={() => handleEditUser(u)}>Edit</button>
                    {u.accountStatus === "pending" && (
                      <>
                        <button className="hub-btn-approve" onClick={() => handleApprove(u.id)}>Approve</button>
                        <button className="hub-btn-reject" onClick={() => handleReject(u.id)}>Reject</button>
                      </>
                    )}
                    {u.accountStatus === "rejected" && (
                      <button className="hub-btn-approve" onClick={() => handleApprove(u.id)}>Re-approve</button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Edit User Modal */}
        {editingUser && (
          <div className="hub-modal-overlay" onClick={() => setEditingUser(null)}>
            <div className="hub-modal" onClick={(e) => e.stopPropagation()}>
              <div className="hub-modal-header">
                <h3>Edit User</h3>
                <button className="hub-modal-close" onClick={() => setEditingUser(null)}>×</button>
              </div>
              <div className="hub-modal-body">
                <div className="hub-modal-field">
                  <label>Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Full name"
                    className="hub-modal-input"
                  />
                </div>
                <div className="hub-modal-field">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="Email address"
                    className="hub-modal-input"
                  />
                </div>
                <div className="hub-modal-field">
                  <label>Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => {
                      handleRoleChange(editingUser.id, e.target.value as any);
                      setEditingUser({ ...editingUser, role: e.target.value as any });
                    }}
                    className="hub-modal-input"
                  >
                    <option value="user">User</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                  </select>
                </div>
                <div className="hub-modal-field">
                  <label>Status</label>
                  <div className="hub-modal-status-row">
                    <span className={getStatusBadge(editingUser.accountStatus)}>
                      {editingUser.accountStatus}
                    </span>
                    {editingUser.accountStatus !== "approved" && (
                      <button className="hub-btn-approve" onClick={() => {
                        handleApprove(editingUser.id);
                        setEditingUser({ ...editingUser, accountStatus: "approved" });
                      }}>Approve</button>
                    )}
                    {editingUser.accountStatus === "approved" && (
                      <button className="hub-btn-reject" onClick={() => {
                        handleReject(editingUser.id);
                        setEditingUser({ ...editingUser, accountStatus: "rejected" });
                      }}>Revoke</button>
                    )}
                  </div>
                </div>
              </div>
              <div className="hub-modal-footer">
                <button className="hub-btn-cancel" onClick={() => setEditingUser(null)}>Cancel</button>
                <button className="hub-btn-save" onClick={handleSaveEdit} disabled={updateUser.isPending}>
                  {updateUser.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AgencyHubLayout>
  );
}
