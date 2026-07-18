import PortalLayout from "@/components/PortalLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Users, Search } from "lucide-react";

export default function PortalCustomers() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect non-staff/admin
  if (user?.role !== "staff" && user?.role !== "admin") {
    return (
      <PortalLayout>
        <div className="border border-[var(--hair)] bg-[var(--paper)] p-12 text-center">
          <p className="font-sans text-[14px] text-[var(--warn)]">Access denied. Staff or admin role required.</p>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.22em] mb-1">
              Customer Management
            </p>
            <h1 className="font-serif text-[24px] font-medium text-[var(--head)]">
              Customers
            </h1>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-[400px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--taupe)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customers by name or email..."
              className="form-input w-full pl-9 text-[13px]"
            />
          </div>
        </div>

        {/* Empty state */}
        <div className="border border-[var(--hair)] bg-[var(--paper)] p-12 text-center">
          <Users size={32} className="text-[var(--taupe)] mx-auto mb-4" />
          <h3 className="font-serif text-[18px] font-medium text-[var(--head)] mb-2">
            Customer Directory Coming Soon
          </h3>
          <p className="font-sans text-[13px] text-[var(--muted)] max-w-md mx-auto">
            View and manage all customer accounts, their policies, claims history, and contact information from this centralized directory.
          </p>
        </div>
      </div>
    </PortalLayout>
  );
}
