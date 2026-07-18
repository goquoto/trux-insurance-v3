import PortalLayout from "@/components/PortalLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import {
  FileText,
  Shield,
  AlertCircle,
  Award,
  Users,
  ClipboardList,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <p className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.22em] mb-2">
          Welcome back
        </p>
        <h1 className="font-serif text-[28px] font-medium text-[var(--head)]">
          {user?.name || "Customer"}
        </h1>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Shield} label="Active Policies" value="—" />
        <StatCard icon={FileText} label="Open Quotes" value="—" />
        <StatCard icon={AlertCircle} label="Active Claims" value="—" />
        <StatCard icon={Award} label="Certificates" value="—" />
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="font-serif text-[18px] font-medium text-[var(--head)] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <QuickAction href="/portal/quotes" icon={FileText} label="View My Quotes" desc="Check status of pending quotes" />
          <QuickAction href="/portal/claims" icon={AlertCircle} label="Report a Claim" desc="File a new claim or check status" />
          <QuickAction href="/portal/certificates" icon={Award} label="Request Certificate" desc="Get a certificate of insurance" />
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div className="border border-[var(--hair)] bg-[var(--paper)] p-6">
        <h3 className="font-serif text-[16px] font-medium text-[var(--head)] mb-3">Recent Activity</h3>
        <p className="font-sans text-[13px] text-[var(--taupe)]">
          Your recent policy changes, claims updates, and certificate requests will appear here.
        </p>
      </div>
    </div>
  );
}

function StaffDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <p className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.22em] mb-2">
          Staff Dashboard
        </p>
        <h1 className="font-serif text-[28px] font-medium text-[var(--head)]">
          Good {getTimeOfDay()}, {user?.name?.split(" ")[0] || "Team"}
        </h1>
      </div>

      {/* Staff stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={ClipboardList} label="Pending Quotes" value="—" accent />
        <StatCard icon={AlertCircle} label="Open Claims" value="—" />
        <StatCard icon={Clock} label="Renewals Due (30d)" value="—" />
        <StatCard icon={Users} label="Active Customers" value="—" />
      </div>

      {/* Work queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="border border-[var(--hair)] bg-[var(--paper)] p-6">
          <h3 className="font-serif text-[16px] font-medium text-[var(--head)] mb-4">Quote Queue</h3>
          <p className="font-sans text-[13px] text-[var(--taupe)]">
            Pending quotes requiring review will appear here.
          </p>
          <Link href="/portal/quotes" className="font-sans text-[12px] text-[var(--head)] underline mt-3 inline-block">
            View all quotes →
          </Link>
        </div>
        <div className="border border-[var(--hair)] bg-[var(--paper)] p-6">
          <h3 className="font-serif text-[16px] font-medium text-[var(--head)] mb-4">Recent Claims</h3>
          <p className="font-sans text-[13px] text-[var(--taupe)]">
            Claims requiring attention will appear here.
          </p>
          <Link href="/portal/claims" className="font-sans text-[12px] text-[var(--head)] underline mt-3 inline-block">
            View all claims →
          </Link>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <p className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.22em] mb-2">
          Admin Dashboard
        </p>
        <h1 className="font-serif text-[28px] font-medium text-[var(--head)]">
          Agency Overview
        </h1>
      </div>

      {/* Admin stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={TrendingUp} label="Quotes This Month" value="—" accent />
        <StatCard icon={Shield} label="Policies In Force" value="—" />
        <StatCard icon={Users} label="Total Customers" value="—" />
        <StatCard icon={BarChart3} label="Revenue (MTD)" value="—" />
      </div>

      {/* Admin panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="border border-[var(--hair)] bg-[var(--paper)] p-6">
          <h3 className="font-serif text-[16px] font-medium text-[var(--head)] mb-3">User Management</h3>
          <p className="font-sans text-[13px] text-[var(--taupe)] mb-3">
            Manage staff and customer accounts, roles, and permissions.
          </p>
          <Link href="/portal/users" className="font-sans text-[12px] text-[var(--head)] underline">
            Manage users →
          </Link>
        </div>
        <div className="border border-[var(--hair)] bg-[var(--paper)] p-6">
          <h3 className="font-serif text-[16px] font-medium text-[var(--head)] mb-3">Analytics</h3>
          <p className="font-sans text-[13px] text-[var(--taupe)] mb-3">
            View quote conversion rates, policy metrics, and revenue trends.
          </p>
          <Link href="/portal/analytics" className="font-sans text-[12px] text-[var(--head)] underline">
            View analytics →
          </Link>
        </div>
        <div className="border border-[var(--hair)] bg-[var(--paper)] p-6">
          <h3 className="font-serif text-[16px] font-medium text-[var(--head)] mb-3">Settings</h3>
          <p className="font-sans text-[13px] text-[var(--taupe)] mb-3">
            Configure agency settings, email templates, and integrations.
          </p>
          <Link href="/portal/settings" className="font-sans text-[12px] text-[var(--head)] underline">
            Open settings →
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent }: { icon: React.ElementType; label: string; value: string; accent?: boolean }) {
  return (
    <div className={`border border-[var(--hair)] p-5 ${accent ? "bg-[var(--sand)]" : "bg-[var(--paper)]"}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className="text-[var(--taupe)]" />
        <span className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.1em]">
          {label}
        </span>
      </div>
      <p className="font-serif text-[24px] font-medium text-[var(--head)]">{value}</p>
    </div>
  );
}

function QuickAction({ href, icon: Icon, label, desc }: { href: string; icon: React.ElementType; label: string; desc: string }) {
  return (
    <Link href={href} className="border border-[var(--hair)] bg-[var(--paper)] p-4 no-underline hover:bg-[var(--paper-2)] transition-colors block">
      <div className="flex items-center gap-3">
        <Icon size={16} className="text-[var(--taupe)]" />
        <div>
          <p className="font-sans text-[13px] font-medium text-[var(--head)]">{label}</p>
          <p className="font-sans text-[11px] text-[var(--taupe)]">{desc}</p>
        </div>
      </div>
    </Link>
  );
}

function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

export default function PortalDashboard() {
  const { user } = useAuth();

  return (
    <PortalLayout>
      {user?.role === "admin" && <AdminDashboard />}
      {user?.role === "staff" && <StaffDashboard />}
      {(!user?.role || user.role === "user") && <CustomerDashboard />}
    </PortalLayout>
  );
}
