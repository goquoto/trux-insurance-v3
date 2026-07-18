import PortalLayout from "@/components/PortalLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { Shield, Plus } from "lucide-react";
import { Link } from "wouter";

export default function PortalPolicies() {
  const { user } = useAuth();
  const isStaffOrAdmin = user?.role === "staff" || user?.role === "admin";

  return (
    <PortalLayout>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.22em] mb-1">
              {isStaffOrAdmin ? "All Policies" : "My Policies"}
            </p>
            <h1 className="font-serif text-[24px] font-medium text-[var(--head)]">
              Policies
            </h1>
          </div>
        </div>

        {/* Empty state */}
        <div className="border border-[var(--hair)] bg-[var(--paper)] p-12 text-center">
          <Shield size={32} className="text-[var(--taupe)] mx-auto mb-4" />
          <h3 className="font-serif text-[18px] font-medium text-[var(--head)] mb-2">
            Policy Management Coming Soon
          </h3>
          <p className="font-sans text-[13px] text-[var(--muted)] max-w-md mx-auto mb-6">
            {isStaffOrAdmin
              ? "This section will display all active policies, renewals, endorsements, and policy documents."
              : "Your active policies, coverage details, and renewal dates will appear here once your first policy is issued."}
          </p>
          {!isStaffOrAdmin && (
            <Link href="/quote" className="btn-ghost inline-block no-underline">
              Get a Quote
            </Link>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
