import PortalLayout from "@/components/PortalLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { Settings } from "lucide-react";

export default function PortalSettings() {
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
            Administration
          </p>
          <h1 className="font-serif text-[24px] font-medium text-[var(--head)]">
            Settings
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Agency Info */}
          <div className="border border-[var(--hair)] bg-[var(--paper)] p-6">
            <h3 className="font-serif text-[16px] font-medium text-[var(--head)] mb-4">Agency Information</h3>
            <div className="space-y-3">
              <div>
                <label className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em] block mb-1">Agency Name</label>
                <p className="font-sans text-[14px] text-[var(--head)]">Trux Insurance Services</p>
              </div>
              <div>
                <label className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em] block mb-1">Address</label>
                <p className="font-sans text-[14px] text-[var(--muted)]">1 Tiffany Pointe, Bloomingdale, IL 60108</p>
              </div>
              <div>
                <label className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em] block mb-1">Phone</label>
                <p className="font-sans text-[14px] text-[var(--muted)]">(331) 240-1101</p>
              </div>
            </div>
          </div>

          {/* Email Settings */}
          <div className="border border-[var(--hair)] bg-[var(--paper)] p-6">
            <h3 className="font-serif text-[16px] font-medium text-[var(--head)] mb-4">Email Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-[var(--hair)]">
                <span className="font-sans text-[13px] text-[var(--muted)]">New quote notifications</span>
                <span className="font-sans text-[12px] text-[#2E7D32]">Active</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[var(--hair)]">
                <span className="font-sans text-[13px] text-[var(--muted)]">Contact form alerts</span>
                <span className="font-sans text-[12px] text-[#2E7D32]">Active</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[var(--hair)]">
                <span className="font-sans text-[13px] text-[var(--muted)]">Newsletter welcome emails</span>
                <span className="font-sans text-[12px] text-[#2E7D32]">Active</span>
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div className="border border-[var(--hair)] bg-[var(--paper)] p-6">
            <h3 className="font-serif text-[16px] font-medium text-[var(--head)] mb-4">Integrations</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-[var(--hair)]">
                <span className="font-sans text-[13px] text-[var(--muted)]">NowCerts (AMS)</span>
                <span className="font-sans text-[12px] text-[var(--taupe)]">External</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[var(--hair)]">
                <span className="font-sans text-[13px] text-[var(--muted)]">ePayPolicy (Payments)</span>
                <span className="font-sans text-[12px] text-[var(--taupe)]">External</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[var(--hair)]">
                <span className="font-sans text-[13px] text-[var(--muted)]">Resend (Email)</span>
                <span className="font-sans text-[12px] text-[#2E7D32]">Connected</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-sans text-[13px] text-[var(--muted)]">Google Maps (Reviews)</span>
                <span className="font-sans text-[12px] text-[#2E7D32]">Connected</span>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="border border-[var(--hair)] bg-[var(--paper)] p-6">
            <h3 className="font-serif text-[16px] font-medium text-[var(--head)] mb-4">Security</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-[var(--hair)]">
                <span className="font-sans text-[13px] text-[var(--muted)]">Authentication</span>
                <span className="font-sans text-[12px] text-[#2E7D32]">OAuth 2.0</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[var(--hair)]">
                <span className="font-sans text-[13px] text-[var(--muted)]">Session duration</span>
                <span className="font-sans text-[12px] text-[var(--muted)]">1 year</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-sans text-[13px] text-[var(--muted)]">Role-based access</span>
                <span className="font-sans text-[12px] text-[#2E7D32]">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
