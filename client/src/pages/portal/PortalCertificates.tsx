import PortalLayout from "@/components/PortalLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { Award } from "lucide-react";

export default function PortalCertificates() {
  const { user } = useAuth();
  const isStaffOrAdmin = user?.role === "staff" || user?.role === "admin";

  return (
    <PortalLayout>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.22em] mb-1">
              {isStaffOrAdmin ? "Certificate Management" : "My Certificates"}
            </p>
            <h1 className="font-serif text-[24px] font-medium text-[var(--head)]">
              Certificates
            </h1>
          </div>
          <a
            href="https://app.nowcerts.com/trux-insurance-services/certificate-request"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid inline-block no-underline text-center"
          >
            Request Certificate
          </a>
        </div>

        {/* Empty state */}
        <div className="border border-[var(--hair)] bg-[var(--paper)] p-12 text-center">
          <Award size={32} className="text-[var(--taupe)] mx-auto mb-4" />
          <h3 className="font-serif text-[18px] font-medium text-[var(--head)] mb-2">
            Certificate History Coming Soon
          </h3>
          <p className="font-sans text-[13px] text-[var(--muted)] max-w-md mx-auto mb-6">
            {isStaffOrAdmin
              ? "Issue, track, and manage certificates of insurance for all clients from this dashboard."
              : "View your certificate history and download copies. For immediate certificate requests, use the button above."}
          </p>
          <p className="font-sans text-[12px] text-[var(--taupe)]">
            Certificates are currently managed through NowCerts. Click "Request Certificate" above to submit a request.
          </p>
        </div>
      </div>
    </PortalLayout>
  );
}
