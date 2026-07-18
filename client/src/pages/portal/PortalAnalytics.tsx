import PortalLayout from "@/components/PortalLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { BarChart3 } from "lucide-react";

export default function PortalAnalytics() {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return (
      <PortalLayout>
        <div className="border border-[var(--hair)] bg-[var(--paper)] p-12 text-center">
          <p className="font-sans text-[14px] text-[var(--warn)]">Access denied. Admin role required.</p>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div>
        <div className="mb-6">
          <p className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.22em] mb-1">
            Agency Analytics
          </p>
          <h1 className="font-serif text-[24px] font-medium text-[var(--head)]">
            Analytics
          </h1>
        </div>

        {/* Placeholder metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="border border-[var(--hair)] bg-[var(--paper)] p-5">
            <p className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em] mb-2">Quotes This Month</p>
            <p className="font-serif text-[28px] font-medium text-[var(--head)]">—</p>
          </div>
          <div className="border border-[var(--hair)] bg-[var(--paper)] p-5">
            <p className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em] mb-2">Conversion Rate</p>
            <p className="font-serif text-[28px] font-medium text-[var(--head)]">—</p>
          </div>
          <div className="border border-[var(--hair)] bg-[var(--paper)] p-5">
            <p className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em] mb-2">Active Policies</p>
            <p className="font-serif text-[28px] font-medium text-[var(--head)]">—</p>
          </div>
          <div className="border border-[var(--hair)] bg-[var(--paper)] p-5">
            <p className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em] mb-2">Open Claims</p>
            <p className="font-serif text-[28px] font-medium text-[var(--head)]">—</p>
          </div>
        </div>

        {/* Chart placeholder */}
        <div className="border border-[var(--hair)] bg-[var(--paper)] p-12 text-center">
          <BarChart3 size={32} className="text-[var(--taupe)] mx-auto mb-4" />
          <h3 className="font-serif text-[18px] font-medium text-[var(--head)] mb-2">
            Analytics Dashboard Coming Soon
          </h3>
          <p className="font-sans text-[13px] text-[var(--muted)] max-w-md mx-auto">
            Quote volume trends, conversion funnels, policy retention rates, claims frequency, and revenue reports will be available here.
          </p>
        </div>
      </div>
    </PortalLayout>
  );
}
