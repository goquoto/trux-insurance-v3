import PortalLayout from "@/components/PortalLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { CreditCard } from "lucide-react";

export default function PortalBilling() {
  const { user } = useAuth();
  const isStaffOrAdmin = user?.role === "staff" || user?.role === "admin";

  return (
    <PortalLayout>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.22em] mb-1">
              {isStaffOrAdmin ? "Billing Management" : "My Billing"}
            </p>
            <h1 className="font-serif text-[24px] font-medium text-[var(--head)]">
              Billing & Payments
            </h1>
          </div>
          <a
            href="https://truxins.epaypolicy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid inline-block no-underline text-center"
          >
            Make a Payment
          </a>
        </div>

        {/* Empty state */}
        <div className="border border-[var(--hair)] bg-[var(--paper)] p-12 text-center">
          <CreditCard size={32} className="text-[var(--taupe)] mx-auto mb-4" />
          <h3 className="font-serif text-[18px] font-medium text-[var(--head)] mb-2">
            Billing Dashboard Coming Soon
          </h3>
          <p className="font-sans text-[13px] text-[var(--muted)] max-w-md mx-auto mb-6">
            {isStaffOrAdmin
              ? "View payment history, outstanding balances, and manage billing for all accounts."
              : "View your payment history, upcoming invoices, and manage your billing preferences."}
          </p>
          <p className="font-sans text-[12px] text-[var(--taupe)]">
            Payments are currently processed through ePayPolicy. Click "Make a Payment" above to pay online.
          </p>
        </div>
      </div>
    </PortalLayout>
  );
}
