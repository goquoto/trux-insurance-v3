import PortalLayout from "@/components/PortalLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { UserCog, Search, Shield, Users as UsersIcon } from "lucide-react";

export default function PortalUsers() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  // Hooks must be called unconditionally
  const usersQuery = trpc.portal.listUsers.useQuery(undefined, {
    retry: false,
    enabled: user?.role === "admin",
  });
  const updateRoleMutation = trpc.portal.updateUserRole.useMutation({
    onSuccess: () => {
      usersQuery.refetch();
    },
  });

  if (user?.role !== "admin") {
    return (
      <PortalLayout>
        <div className="border border-[var(--hair)] bg-[var(--paper)] p-12 text-center">
          <p className="font-sans text-[14px] text-[var(--warn)]">Access denied. Admin role required.</p>
        </div>
      </PortalLayout>
    );
  }

  const allUsers = usersQuery.data || [];
  const filteredUsers = allUsers.filter((u: any) => {
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesSearch =
      !searchQuery ||
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <PortalLayout>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.22em] mb-1">
              Administration
            </p>
            <h1 className="font-serif text-[24px] font-medium text-[var(--head)]">
              User Management
            </h1>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-[320px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--taupe)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="form-input w-full pl-9 text-[13px]"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="form-input w-auto text-[13px] font-sans"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="user">Customer</option>
          </select>
        </div>

        {/* Users table */}
        {usersQuery.isLoading ? (
          <div className="border border-[var(--hair)] bg-[var(--paper)] p-8 text-center">
            <div className="w-6 h-6 border-2 border-[var(--hair)] border-t-[var(--ink)] rounded-full animate-spin mx-auto mb-3" />
            <p className="font-sans text-[13px] text-[var(--taupe)]">Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="border border-[var(--hair)] bg-[var(--paper)] p-8 text-center">
            <UsersIcon size={24} className="text-[var(--taupe)] mx-auto mb-3" />
            <p className="font-sans text-[14px] text-[var(--muted)]">No users found</p>
          </div>
        ) : (
          <div className="border border-[var(--hair)] bg-[var(--paper)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--hair)] bg-[var(--paper-2)]">
                    <th className="text-left font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em] px-4 py-3">Name</th>
                    <th className="text-left font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em] px-4 py-3">Email</th>
                    <th className="text-left font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em] px-4 py-3">Role</th>
                    <th className="text-left font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em] px-4 py-3">Last Sign In</th>
                    <th className="text-left font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em] px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u: any) => (
                    <tr key={u.id} className="border-b border-[var(--hair)] hover:bg-[var(--paper-2)] transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-sans text-[13px] font-medium text-[var(--head)]">{u.name || "—"}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-sans text-[13px] text-[var(--muted)]">{u.email || "—"}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 font-sans text-[11px] font-medium uppercase tracking-[0.05em] px-2 py-0.5 ${
                          u.role === "admin" ? "bg-[var(--ink)] text-white" :
                          u.role === "staff" ? "bg-[var(--sand)] text-[var(--head)]" :
                          "bg-[var(--paper-2)] text-[var(--taupe)]"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-sans text-[12px] text-[var(--taupe)]">
                          {u.lastSignedIn ? new Date(u.lastSignedIn).toLocaleDateString() : "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={u.role}
                          onChange={(e) => {
                            if (e.target.value !== u.role) {
                              updateRoleMutation.mutate({ userId: u.id, role: e.target.value as "user" | "staff" | "admin" });
                            }
                          }}
                          className="form-input text-[12px] py-1 px-2 w-auto"
                          disabled={u.openId === user?.openId}
                        >
                          <option value="user">Customer</option>
                          <option value="staff">Staff</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p className="font-sans text-[11px] text-[var(--taupe)] mt-4">
          {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""} total
        </p>
      </div>
    </PortalLayout>
  );
}
