import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const navLinks = [
  { label: "Coverages", href: "/coverages" },
  { label: "Who We Insure", href: "/who-we-insure" },
  { label: "About", href: "/about" },
  { label: "Service & Claims", href: "/service" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

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
          <div className="lg:hidden absolute top-[78px] left-0 right-0 bg-paper border-b border-[var(--hair)] shadow-sm z-40">
            <nav className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-[16px] text-ink no-underline py-2 border-b border-[var(--hair)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a href="tel:3312401101" className="font-sans text-[16px] text-purple no-underline py-2 flex items-center gap-2">
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
