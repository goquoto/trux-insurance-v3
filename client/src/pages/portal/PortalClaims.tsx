import PortalLayout from "@/components/PortalLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function PortalClaims() {
  const { user } = useAuth();
  const isStaffOrAdmin = user?.role === "staff" || user?.role === "admin";

  return (
    <PortalLayout>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.22em] mb-1">
              {isStaffOrAdmin ? "All Claims" : "My Claims"}
            </p>
            <h1 className="font-serif text-[24px] font-medium text-[var(--head)]">
              Claims
            </h1>
          </div>
          {!isStaffOrAdmin && (
            <Link href="/service" className="btn-solid inline-block no-underline text-center">
              Report a Claim
            </Link>
          )}
        </div>

        {/* Empty state */}
        <div className="border border-[var(--hair)] bg-[var(--paper)] p-12 text-center">
          <AlertCircle size={32} className="text-[var(--taupe)] mx-auto mb-4" />
          <h3 className="font-serif text-[18px] font-medium text-[var(--head)] mb-2">
            Claims Tracking Coming Soon
          </h3>
          <p className="font-sans text-[13px] text-[var(--muted)] max-w-md mx-auto mb-6">
            {isStaffOrAdmin
              ? "This section will display all claims, their status, adjuster assignments, and resolution timelines."
              : "Track your claims status, upload documentation, and communicate with your claims adjuster here."}
          </p>
          <p className="font-sans text-[12px] text-[var(--taupe)]">
            To report a claim now, call <a href="tel:3312401101" className="underline">(331) 240-1101</a> or visit the{" "}
            <Link href="/service" className="underline">Service & Claims</Link> page.
          </p>
        </div>
      </div>
    </PortalLayout>
  );
}
