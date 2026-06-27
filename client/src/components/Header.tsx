import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Service & Claims", href: "/service" },
  { label: "Contact", href: "/contact" },
];

const coverageLinks = [
  { label: "All Coverages", href: "/coverages" },
  { label: "Auto Liability", href: "/coverages/auto-liability" },
  { label: "Physical Damage", href: "/coverages/physical-damage" },
  { label: "Motor Truck Cargo", href: "/coverages/cargo" },
  { label: "General Liability", href: "/coverages/general-liability" },
  { label: "Non-Trucking Liability", href: "/coverages/non-trucking" },
  { label: "Workers' Comp", href: "/coverages/workers-compensation" },
  { label: "Excess / Umbrella", href: "/coverages/excess-umbrella" },
];

const insureLinks = [
  { label: "All Operations", href: "/who-we-insure" },
  { label: "Owner-Operators", href: "/who-we-insure/owner-operators" },
  { label: "Small Fleets", href: "/who-we-insure/small-fleets" },
  { label: "Large Fleets", href: "/who-we-insure/large-fleets" },
  { label: "Reefer / Refrigerated", href: "/who-we-insure/reefer" },
  { label: "Flatbed", href: "/who-we-insure/flatbed" },
  { label: "Hazmat", href: "/who-we-insure/hazmat" },
  { label: "Hot-Shot", href: "/who-we-insure/hotshot" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileInsuranceOpen, setMobileInsuranceOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [location]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  const isInsurancePage = location.startsWith("/coverages") || location.startsWith("/who-we-insure");

  return (
    <>
      {/* Utility bar */}
      <div className="bg-[#1A1A1A] text-white py-2">
        <div className="container flex items-center justify-between">
          <span className="text-[13px] font-sans font-light hidden sm:block">
            Insuring motor carriers in <strong>21 states</strong> &middot; Mon–Fri 8–5 CT
          </span>
          <div className="flex items-center gap-4 text-[13px] font-sans">
            <a href="tel:3312401101" className="flex items-center gap-1 text-white hover:text-[var(--purple-light)] no-underline">
              <Phone size={12} />
              (331) 240-1101
            </a>
            <a href="https://truxins.com/certificate/" className="text-white hover:text-[var(--purple-light)] no-underline hidden sm:inline">
              Certificates
            </a>
            <a href="https://truxins.com/claim/" className="text-white hover:text-[var(--purple-light)] no-underline hidden sm:inline">
              Report a Claim
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-paper border-b border-[var(--hair)]" style={{ height: "78px" }}>
        <div className="container h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center no-underline">
            <img
              src={theme === "dark" ? "/manus-storage/trux-logo-white_4e37a255.png" : "/manus-storage/trux-logo-dark_9f1c7375.png"}
              alt="Trux Insurance Services"
              className="h-[40px] w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Insurance dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`font-sans text-[15px] font-normal no-underline transition-colors relative pb-1 flex items-center gap-1 bg-transparent border-none cursor-pointer ${
                  isInsurancePage
                    ? "text-ink after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[var(--purple)]"
                    : "text-muted-custom hover:text-ink"
                }`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                Insurance
                <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown mega-menu */}
              {dropdownOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-paper border border-[var(--hair)] shadow-lg z-50 min-w-[520px]"
                  style={{ transformOrigin: "top center" }}
                >
                  <div className="grid grid-cols-2 gap-0">
                    {/* Coverages column */}
                    <div className="p-6 border-r border-[var(--hair)]">
                      <span className="eyebrow text-[11px] tracking-[0.2em] text-taupe font-sans font-medium uppercase block mb-3">
                        Coverages
                      </span>
                      <div className="tick mb-3" style={{ width: "30px" }}></div>
                      <ul className="space-y-2 list-none p-0 m-0">
                        {coverageLinks.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className={`font-sans text-[14px] no-underline block py-1 transition-colors ${
                                link.href === "/coverages"
                                  ? "font-medium text-ink hover:text-purple"
                                  : "text-muted-custom hover:text-ink"
                              }`}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href="/coverages"
                            className="font-sans text-[13px] text-purple no-underline block pt-2 mt-1 border-t border-[var(--hair)] hover:underline"
                          >
                            View all coverages →
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Who We Insure column */}
                    <div className="p-6">
                      <span className="eyebrow text-[11px] tracking-[0.2em] text-taupe font-sans font-medium uppercase block mb-3">
                        Who We Insure
                      </span>
                      <div className="tick mb-3" style={{ width: "30px" }}></div>
                      <ul className="space-y-2 list-none p-0 m-0">
                        {insureLinks.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className={`font-sans text-[14px] no-underline block py-1 transition-colors ${
                                link.href === "/who-we-insure"
                                  ? "font-medium text-ink hover:text-purple"
                                  : "text-muted-custom hover:text-ink"
                              }`}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href="/who-we-insure"
                            className="font-sans text-[13px] text-purple no-underline block pt-2 mt-1 border-t border-[var(--hair)] hover:underline"
                          >
                            View all operations →
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Regular nav links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-[15px] font-normal no-underline transition-colors relative pb-1 ${
                  location === link.href
                    ? "text-ink after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[var(--purple)]"
                    : "text-muted-custom hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: phone + CTA + theme toggle */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:3312401101" className="font-sans text-[15px] font-medium text-ink no-underline flex items-center gap-1.5">
              <Phone size={15} className="text-purple" />
              (331) 240-1101
            </a>
            <Link href="/quote" className="btn-solid">
              Get a Quote
            </Link>
            {/* Theme toggle - at the end */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-none border border-[var(--hair)] hover:bg-sand transition-colors"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon size={16} className="text-muted-custom" /> : <Sun size={16} className="text-ink" />}
            </button>
          </div>

          {/* Mobile: menu button + theme toggle at the end */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              className="p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={24} className="text-ink" /> : <Menu size={24} className="text-ink" />}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 border border-[var(--hair)] hover:bg-sand transition-colors"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon size={18} className="text-muted-custom" /> : <Sun size={18} className="text-ink" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-[78px] left-0 right-0 bg-paper border-b border-[var(--hair)] shadow-sm z-40 max-h-[calc(100vh-78px)] overflow-y-auto">
            <nav className="container py-6 flex flex-col gap-1">
              {/* Insurance accordion */}
              <div className="border-b border-[var(--hair)]">
                <button
                  className="w-full flex items-center justify-between font-sans text-[16px] text-ink py-3 bg-transparent border-none cursor-pointer"
                  onClick={() => setMobileInsuranceOpen(!mobileInsuranceOpen)}
                  aria-expanded={mobileInsuranceOpen}
                >
                  Insurance
                  <ChevronDown size={16} className={`transition-transform duration-200 ${mobileInsuranceOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileInsuranceOpen && (
                  <div className="pb-4 pl-4">
                    <p className="font-sans text-[12px] uppercase tracking-[0.15em] text-taupe mb-2 mt-1">Coverages</p>
                    {coverageLinks.slice(0, 4).map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="font-sans text-[15px] text-muted-custom no-underline block py-1.5 hover:text-ink"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/coverages"
                      className="font-sans text-[13px] text-purple no-underline block py-1.5 mt-1"
                      onClick={() => setMobileOpen(false)}
                    >
                      All coverages →
                    </Link>

                    <p className="font-sans text-[12px] uppercase tracking-[0.15em] text-taupe mb-2 mt-4">Who We Insure</p>
                    {insureLinks.slice(0, 4).map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="font-sans text-[15px] text-muted-custom no-underline block py-1.5 hover:text-ink"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/who-we-insure"
                      className="font-sans text-[13px] text-purple no-underline block py-1.5 mt-1"
                      onClick={() => setMobileOpen(false)}
                    >
                      All operations →
                    </Link>
                  </div>
                )}
              </div>

              {/* Regular nav links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-[16px] text-ink no-underline py-3 border-b border-[var(--hair)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a href="tel:3312401101" className="font-sans text-[16px] text-purple no-underline py-3 flex items-center gap-2">
                <Phone size={16} />
                (331) 240-1101
              </a>
              <Link href="/quote" className="btn-solid text-center mt-2" onClick={() => setMobileOpen(false)}>
                Get a Quote
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
