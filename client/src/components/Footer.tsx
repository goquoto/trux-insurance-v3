import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="bg-paper border-t border-[var(--hair)]">
      <div className="container section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div>
            <div className="mb-4">
              <img
                src={theme === "dark" ? "/manus-storage/trux-logo-white_4e37a255.png" : "/manus-storage/trux-logo-dark_9f1c7375.png"}
                alt="Trux Insurance Services"
                className="h-[32px] w-auto"
              />
            </div>
            <address className="not-italic font-sans text-[14px] text-muted-custom leading-relaxed">
              1 Tiffany Pt Suite G2<br />
              Bloomingdale, IL 60108<br /><br />
              Phone: <a href="tel:3312401101" className="text-purple">(331) 240-1101</a><br />
              Toll-free: <a href="tel:18773508789" className="text-purple">1-877-350-8789</a><br />
              Fax: 331-240-1055<br />
              <a href="mailto:info@truxins.com" className="text-purple">info@truxins.com</a>
            </address>
          </div>

          {/* Get Insurance */}
          <div>
            <h4 className="font-sans text-[13px] font-semibold uppercase tracking-[0.15em] text-ink mb-4">
              Get Insurance
            </h4>
            <ul className="space-y-2">
              <li><Link href="/quote" className="font-sans text-[14px] text-muted-custom hover:text-purple no-underline">Trucking Quick Quote</Link></li>
              <li><Link href="/quote" className="font-sans text-[14px] text-muted-custom hover:text-purple no-underline">Trucking Application</Link></li>
              <li><Link href="/coverages" className="font-sans text-[14px] text-muted-custom hover:text-purple no-underline">Types of Coverage</Link></li>
            </ul>
          </div>

          {/* For Clients */}
          <div>
            <h4 className="font-sans text-[13px] font-semibold uppercase tracking-[0.15em] text-ink mb-4">
              For Clients
            </h4>
            <ul className="space-y-2">
              <li><Link href="/client-center" className="font-sans text-[14px] text-muted-custom hover:text-purple no-underline">Client Center</Link></li>
              <li><Link href="/service" className="font-sans text-[14px] text-muted-custom hover:text-purple no-underline">Policy Service</Link></li>
              <li><a href="https://identity.nowcerts.com/Account/Login?ReturnUrl=%2FAccount%2FLoginRedirectUrl" target="_blank" rel="noopener noreferrer" className="font-sans text-[14px] text-muted-custom hover:text-purple no-underline">Request a Certificate</a></li>
              <li><a href="https://truxins.com/claim/" className="font-sans text-[14px] text-muted-custom hover:text-purple no-underline">Report a Claim</a></li>
              <li><a href="https://truxins.com/pay/" className="font-sans text-[14px] text-muted-custom hover:text-purple no-underline">Make a Payment</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-sans text-[13px] font-semibold uppercase tracking-[0.15em] text-ink mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="font-sans text-[14px] text-muted-custom hover:text-purple no-underline">About Us</Link></li>
              <li><Link href="/blog" className="font-sans text-[14px] text-muted-custom hover:text-purple no-underline">Blog</Link></li>
              <li><Link href="/contact" className="font-sans text-[14px] text-muted-custom hover:text-purple no-underline">Contact</Link></li>
              <li><a href="https://truxins.com/partners/" className="font-sans text-[14px] text-muted-custom hover:text-purple no-underline">Partners</a></li>
              <li><a href="https://truxins.com/faqs/" className="font-sans text-[14px] text-muted-custom hover:text-purple no-underline">FAQs</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--hair)]">
        <div className="container py-6">
          <p className="font-sans text-[12px] text-taupe leading-relaxed mb-3">
            &copy; {new Date().getFullYear()} Trux Insurance Services. All rights reserved.
          </p>
          <p className="font-sans text-[11px] text-taupe leading-relaxed">
            DISCLAIMER: Informational statements regarding insurance coverage are for general description purposes only and do not amend, modify, or supplement any insurance policy. Read your policy or consult with your agent for details. Your eligibility for particular products and services is subject to final underwriting and acceptance by the insurance company providing such products or services.
          </p>
        </div>
      </div>

      {/* Fraud disclaimer */}
      <div className="bg-sand">
        <div className="container py-6">
          <h5 className="font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-ink mb-2">
            Insurance Fraud Statement
          </h5>
          <p className="font-sans text-[11px] text-muted-custom leading-relaxed">
            Fraud is a crime. If your application contains purposefully misleading, absent, or inaccurate information, you could be charged with fraud. Your insurance carrier could potentially void your policy, or you could face civil or criminal charges or penalties. Any person who knowingly and with intent to defraud any insurance company or other person, files an application for insurance or statement of claim containing any materially false information or conceals, for the purpose of misleading, information concerning any fact material thereto, commits a fraudulent act, which is a crime.
          </p>
        </div>
      </div>
    </footer>
  );
}
