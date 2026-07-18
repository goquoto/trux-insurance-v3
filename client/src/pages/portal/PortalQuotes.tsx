import PortalLayout from "@/components/PortalLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Link } from "wouter";
import { FileText, Clock, CheckCircle2, XCircle, Eye, Search } from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Pending", color: "text-[var(--taupe)]", icon: Clock },
  under_review: { label: "Under Review", color: "text-[#B8860B]", icon: Eye },
  approved: { label: "Approved", color: "text-[#2E7D32]", icon: CheckCircle2 },
  issued: { label: "Issued", color: "text-[#1565C0]", icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "text-[var(--warn)]", icon: XCircle },
};

export default function PortalQuotes() {
  const { user } = useAuth();
  const isStaffOrAdmin = user?.role === "staff" || user?.role === "admin";
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Staff/admin see all quotes; customers see their own
  const quotesQuery = trpc.quotes.getAll.useQuery(undefined, {
    retry: false,
    enabled: isStaffOrAdmin,
  });

  const quotes = quotesQuery?.data || [];
  const filteredQuotes = quotes.filter((q: any) => {
    const matchesStatus = statusFilter === "all" || q.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      q.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.contactEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.dotNumber?.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <PortalLayout>
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.22em] mb-1">
              {isStaffOrAdmin ? "All Quotes" : "My Quotes"}
            </p>
            <h1 className="font-serif text-[24px] font-medium text-[var(--head)]">
              Quotes
            </h1>
          </div>
          {!isStaffOrAdmin && (
            <Link href="/quote" className="btn-solid inline-block no-underline text-center">
              Request New Quote
            </Link>
          )}
        </div>

        {/* Filters */}
        {isStaffOrAdmin && (
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1 max-w-[320px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--taupe)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by business, email, or DOT#"
                className="form-input w-full pl-9 text-[13px]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input w-auto text-[13px] font-sans"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="issued">Issued</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        )}

        {/* Quotes list */}
        {quotesQuery?.isLoading ? (
          <div className="border border-[var(--hair)] bg-[var(--paper)] p-8 text-center">
            <div className="w-6 h-6 border-2 border-[var(--hair)] border-t-[var(--ink)] rounded-full animate-spin mx-auto mb-3" />
            <p className="font-sans text-[13px] text-[var(--taupe)]">Loading quotes...</p>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="border border-[var(--hair)] bg-[var(--paper)] p-8 text-center">
            <FileText size={24} className="text-[var(--taupe)] mx-auto mb-3" />
            <p className="font-sans text-[14px] text-[var(--muted)] mb-1">No quotes found</p>
            <p className="font-sans text-[12px] text-[var(--taupe)]">
              {isStaffOrAdmin ? "No quotes match your filters." : "You haven't submitted any quotes yet."}
            </p>
          </div>
        ) : (
          <div className="border border-[var(--hair)] bg-[var(--paper)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--hair)] bg-[var(--paper-2)]">
                    <th className="text-left font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em] px-4 py-3">Business</th>
                    <th className="text-left font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em] px-4 py-3">Contact</th>
                    <th className="text-left font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em] px-4 py-3">State</th>
                    <th className="text-left font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em] px-4 py-3">Date</th>
                    <th className="text-left font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em] px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.map((quote: any) => {
                    const status = STATUS_CONFIG[quote.status] || STATUS_CONFIG.pending;
                    const StatusIcon = status.icon;
                    return (
                      <tr key={quote.id} className="border-b border-[var(--hair)] hover:bg-[var(--paper-2)] transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-sans text-[13px] font-medium text-[var(--head)]">{quote.businessName}</p>
                          {quote.dotNumber && (
                            <p className="font-sans text-[11px] text-[var(--taupe)]">DOT# {quote.dotNumber}</p>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-sans text-[13px] text-[var(--muted)]">
                            {quote.contactFirstName} {quote.contactLastName}
                          </p>
                          <p className="font-sans text-[11px] text-[var(--taupe)]">{quote.contactEmail}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-sans text-[13px] text-[var(--muted)]">{quote.policyState}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-sans text-[12px] text-[var(--taupe)]">
                            {new Date(quote.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`flex items-center gap-1.5 font-sans text-[12px] font-medium ${status.color}`}>
                            <StatusIcon size={12} />
                            {status.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
