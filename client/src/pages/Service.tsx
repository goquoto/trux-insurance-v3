import { Link } from "wouter";
import Layout from "@/components/Layout";
import { FileText, AlertTriangle, Settings, Car, CreditCard } from "lucide-react";

const services = [
  {
    title: "Request Certificate",
    desc: "Request and issue Certificates of Insurance from our 24/7 self-service portal. Most certificates are delivered same day.",
    href: "https://truxins.com/certificate/",
    icon: FileText,
    contact: "certificates@truxins.com",
  },
  {
    title: "Report a Claim",
    desc: "Start a claim and reach the carrier's reporting line fast. We'll guide you through the process and advocate on your behalf.",
    href: "https://truxins.com/claim/",
    icon: AlertTriangle,
    contact: "(331) 240-1101",
  },
  {
    title: "Policy Service",
    desc: "Request policy changes, add drivers or vehicles, update your information, or ask questions about your current coverage.",
    href: "https://truxins.com/service/",
    icon: Settings,
    contact: "service@truxins.com",
  },
  {
    title: "MVR Request",
    desc: "Request Motor Vehicle Records for your drivers. We normally get reports back same day or next business day.",
    href: "https://truxins.com/mvr-request/",
    icon: Car,
    contact: "mvr@truxins.com",
  },
  {
    title: "Make a Payment",
    desc: "Pay your premium online through our secure payment portal. Multiple payment options available.",
    href: "https://truxins.com/pay/",
    icon: CreditCard,
    contact: "(331) 240-1101",
  },
];

export default function Service() {
  return (
    <Layout>
      {/* Page header */}
      <section className="section bg-paper-2">
        <div className="container">
          <span className="eyebrow">Service & Claims</span>
          <div className="tick mt-4"></div>
          <h1 className="mt-4 mb-4">We're here when you need us.</h1>
          <p className="lead max-w-2xl">
            From certificates to claims, policy changes to payments — your service team is a phone call away. Mon–Fri 8–5 CT, or 24/7 through our self-service portal.
          </p>
        </div>
      </section>

      <hr className="hairline" />

      {/* Service cards */}
      <section className="section bg-paper">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <a
                  key={svc.title}
                  href={svc.href}
                  className="block border border-[var(--hair)] p-8 hover:border-[var(--purple)] transition-colors no-underline group"
                >
                  <Icon size={28} className="text-purple mb-4" />
                  <h3 className="text-[18px] mb-3 group-hover:text-purple transition-colors">{svc.title}</h3>
                  <p className="font-sans text-[14px] text-muted-custom leading-relaxed mb-4">{svc.desc}</p>
                  <span className="font-sans text-[13px] text-purple border-b border-[var(--purple)]">
                    {svc.contact}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Client Center CTA */}
      <section className="section sand-band">
        <div className="container text-center">
          <span className="eyebrow">Client Center</span>
          <div className="tick mt-4 mx-auto"></div>
          <h2 className="mt-4 mb-6">Manage your policies online.</h2>
          <p className="font-sans text-[16px] text-muted-custom max-w-xl mx-auto mb-8">
            Log in to view your policies, download documents, request changes, and more. Available 24/7.
          </p>
          <a href="https://truxins.com/client/" className="btn-solid">
            Visit Client Center
          </a>
        </div>
      </section>

      {/* Contact info */}
      <section className="section bg-paper">
        <div className="container">
          <span className="eyebrow">Who to call</span>
          <div className="tick mt-4"></div>
          <h2 className="mt-4 mb-8">Direct lines</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
            <div className="border-b border-[var(--hair)] pb-4">
              <h3 className="text-[16px] font-sans font-medium text-ink mb-1">Main Office</h3>
              <a href="tel:3312401101" className="font-sans text-[15px] text-purple">(331) 240-1101</a>
            </div>
            <div className="border-b border-[var(--hair)] pb-4">
              <h3 className="text-[16px] font-sans font-medium text-ink mb-1">Toll-Free</h3>
              <a href="tel:18773508789" className="font-sans text-[15px] text-purple">1-877-350-8789</a>
            </div>
            <div className="border-b border-[var(--hair)] pb-4">
              <h3 className="text-[16px] font-sans font-medium text-ink mb-1">Fax</h3>
              <span className="font-sans text-[15px] text-muted-custom">331-240-1055</span>
            </div>
            <div className="border-b border-[var(--hair)] pb-4">
              <h3 className="text-[16px] font-sans font-medium text-ink mb-1">Email</h3>
              <a href="mailto:info@truxins.com" className="font-sans text-[15px] text-purple">info@truxins.com</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
