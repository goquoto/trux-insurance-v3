import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLocation, Link } from "wouter";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Shield,
  AlertCircle,
  Award,
  CreditCard,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Building2,
  UserCog,
} from "lucide-react";

type NavItem = {
  icon: React.ElementType;
  label: string;
  path: string;
};

const customerNav: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/portal" },
  { icon: FileText, label: "My Quotes", path: "/portal/quotes" },
  { icon: Shield, label: "My Policies", path: "/portal/policies" },
  { icon: AlertCircle, label: "Claims", path: "/portal/claims" },
  { icon: Award, label: "Certificates", path: "/portal/certificates" },
  { icon: CreditCard, label: "Billing", path: "/portal/billing" },
];

const staffNav: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/portal" },
  { icon: Users, label: "Customers", path: "/portal/customers" },
  { icon: ClipboardList, label: "Quotes", path: "/portal/quotes" },
  { icon: Shield, label: "Policies", path: "/portal/policies" },
  { icon: AlertCircle, label: "Claims", path: "/portal/claims" },
  { icon: Award, label: "Certificates", path: "/portal/certificates" },
  { icon: CreditCard, label: "Billing", path: "/portal/billing" },
];

const adminNav: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/portal" },
  { icon: Users, label: "Customers", path: "/portal/customers" },
  { icon: ClipboardList, label: "Quotes", path: "/portal/quotes" },
  { icon: Shield, label: "Policies", path: "/portal/policies" },
  { icon: AlertCircle, label: "Claims", path: "/portal/claims" },
  { icon: Award, label: "Certificates", path: "/portal/certificates" },
  { icon: CreditCard, label: "Billing", path: "/portal/billing" },
  { icon: BarChart3, label: "Analytics", path: "/portal/analytics" },
  { icon: UserCog, label: "User Management", path: "/portal/users" },
  { icon: Settings, label: "Settings", path: "/portal/settings" },
];

function getNavForRole(role: string | undefined): NavItem[] {
  switch (role) {
    case "admin":
      return adminNav;
    case "staff":
      return staffNav;
    default:
      return customerNav;
  }
}

function getRoleLabel(role: string | undefined): string {
  switch (role) {
    case "admin":
      return "Administrator";
    case "staff":
      return "Staff";
    default:
      return "Customer";
  }
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--paper)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--hair)] border-t-[var(--ink)] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[var(--paper)] flex items-center justify-center">
        <div className="max-w-md w-full px-6 text-center">
          <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center border border-[var(--hair)]">
            <Building2 size={24} className="text-[var(--taupe)]" />
          </div>
          <h1 className="font-serif text-[28px] font-medium text-[var(--head)] mb-3">
            Agency Portal
          </h1>
          <p className="font-sans text-[15px] text-[var(--muted)] mb-8 leading-relaxed">
            Sign in to access your insurance dashboard, manage policies, and track claims.
          </p>
          <a
            href={getLoginUrl("/portal")}
            className="btn-solid inline-block no-underline px-8 py-3"
          >
            Sign In
          </a>
          <p className="font-sans text-[12px] text-[var(--taupe)] mt-6">
            <Link href="/" className="underline hover:text-[var(--muted)]">
              Return to truxins.net
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const navItems = getNavForRole(user.role);
  const roleLabel = getRoleLabel(user.role);

  return (
    <div className="min-h-screen bg-[var(--paper-2)] flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-[var(--paper)] border-r border-[var(--hair)] fixed inset-y-0 left-0 z-30">
        {/* Logo */}
        <div className="h-[64px] flex items-center px-5 border-b border-[var(--hair)]">
          <Link href="/portal" className="flex items-center gap-2 no-underline">
            <span className="font-serif text-[18px] font-medium text-[var(--head)] tracking-[-0.01em]">
              TRUX
            </span>
            <span className="font-sans text-[10px] font-medium text-[var(--taupe)] uppercase tracking-[0.15em]">
              Portal
            </span>
          </Link>
        </div>

        {/* Role badge */}
        <div className="px-5 py-3 border-b border-[var(--hair)]">
          <span className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.15em]">
            {roleLabel}
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {navItems.map((item) => {
            const isActive = location === item.path || (item.path !== "/portal" && location.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 mb-0.5 no-underline transition-colors ${
                  isActive
                    ? "bg-[var(--sand)] text-[var(--head)]"
                    : "text-[var(--muted)] hover:bg-[var(--paper-2)] hover:text-[var(--head)]"
                }`}
              >
                <item.icon size={16} className={isActive ? "text-[var(--head)]" : "text-[var(--taupe)]"} />
                <span className="font-sans text-[13px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="border-t border-[var(--hair)] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-[var(--sand)] flex items-center justify-center flex-shrink-0">
              <span className="font-sans text-[12px] font-medium text-[var(--head)]">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-sans text-[13px] font-medium text-[var(--head)] truncate">
                {user.name || "User"}
              </p>
              <p className="font-sans text-[11px] text-[var(--taupe)] truncate">
                {user.email || ""}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 font-sans text-[12px] text-[var(--taupe)] hover:text-[var(--warn)] transition-colors"
          >
            <LogOut size={13} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-[56px] bg-[var(--paper)] border-b border-[var(--hair)] flex items-center justify-between px-4 z-40">
        <Link href="/portal" className="flex items-center gap-2 no-underline">
          <span className="font-serif text-[16px] font-medium text-[var(--head)]">TRUX</span>
          <span className="font-sans text-[9px] font-medium text-[var(--taupe)] uppercase tracking-[0.15em]">Portal</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-9 h-9 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[var(--paper)]">
          <div className="h-[56px] flex items-center justify-between px-4 border-b border-[var(--hair)]">
            <span className="font-serif text-[16px] font-medium text-[var(--head)]">TRUX Portal</span>
            <button onClick={() => setMobileOpen(false)} className="w-9 h-9 flex items-center justify-center">
              <X size={20} />
            </button>
          </div>
          <div className="px-3 py-2 border-b border-[var(--hair)]">
            <span className="font-sans text-[11px] font-medium text-[var(--taupe)] uppercase tracking-[0.15em]">
              {roleLabel} — {user.name || "User"}
            </span>
          </div>
          <nav className="p-3">
            {navItems.map((item) => {
              const isActive = location === item.path || (item.path !== "/portal" && location.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-3 py-3 no-underline ${
                    isActive ? "bg-[var(--sand)] text-[var(--head)]" : "text-[var(--muted)]"
                  }`}
                >
                  <item.icon size={18} />
                  <span className="font-sans text-[14px] font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--hair)]">
            <button
              onClick={logout}
              className="flex items-center gap-2 font-sans text-[13px] text-[var(--warn)]"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-[260px] pt-[56px] lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
