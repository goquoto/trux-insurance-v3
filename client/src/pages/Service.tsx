import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FileText, AlertTriangle, Settings, Car, CreditCard, RefreshCw, Edit } from "lucide-react";
import { Link } from "wouter";

const services = [
  {
    title: "Request Certificate",
    desc: "Request and issue Certificates of Insurance from our 24/7 self-service portal. Log in to NowCerts to download, email, or print certificates instantly.",
    href: "https://identity.nowcerts.com/Account/Login?ReturnUrl=%2FAccount%2FLoginRedirectUrl",
    icon: FileText,
    contact: "Self-Service Portal →",
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
    desc: "Request policy changes, add drivers or vehicles, update your information, or ask questions about your current coverage. Use our support portal for fast service.",
    href: "https://support.truxins.com/",
    icon: Settings,
    contact: "Support Portal →",
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
  {
    title: "Renewals",
    desc: "Your renewal process starts 60 days before expiration. We shop your account across our carrier panel to find the best rate and coverage combination — no action needed from you until we present options.",
    href: "mailto:renewals@truxins.com",
    icon: RefreshCw,
    contact: "renewals@truxins.com",
  },
  {
    title: "Request a Policy Change",
    desc: "Need to add a truck, swap a trailer, update your radius, or change a driver? Submit your change request and we'll process it within one business day.",
    href: "mailto:service@truxins.com",
    icon: Edit,
    contact: "service@truxins.com",
  },
];

export default function Service() {
  return (
    <Layout>
      <SEO
        title="Service & Claims"
        description="Request certificates, report claims, make payments, request policy changes, and manage renewals. Trux Insurance client service center — Mon–Fri 8–5 CT."
        canonical="/service"
        type="service"
        serviceName="Trux Insurance Client Service Center"
      />
      <Breadcrumbs items={[{ label: "Service & Claims" }]} />

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

      {/* Renewals info band */}
      <section className="section sand-band">
        <div className="container">
          <span className="eyebrow">Renewal Process</span>
          <div className="tick mt-4"></div>
          <h2 className="mt-4 mb-6">How renewals work at Trux</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <span className="font-serif text-[32px] text-purple font-medium">01</span>
              <h3 className="text-[16px] font-sans font-medium mt-2 mb-2">60 Days Out</h3>
              <p className="font-sans text-[14px] text-muted-custom leading-relaxed">
                We begin shopping your account across our carrier panel — comparing rates, coverage terms, and endorsement options.
              </p>
            </div>
            <div>
              <span className="font-serif text-[32px] text-purple font-medium">02</span>
              <h3 className="text-[16px] font-sans font-medium mt-2 mb-2">30 Days Out</h3>
              <p className="font-sans text-[14px] text-muted-custom leading-relaxed">
                We present your renewal options with a clear comparison of premium, deductibles, and coverage differences so you can make an informed decision.
              </p>
            </div>
            <div>
              <span className="font-serif text-[32px] text-purple font-medium">03</span>
              <h3 className="text-[16px] font-sans font-medium mt-2 mb-2">Bound & Filed</h3>
              <p className="font-sans text-[14px] text-muted-custom leading-relaxed">
                Once you approve, we bind coverage, file your MCS-90 and BMC-91, and issue certificates — all before your expiration date.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Policy Changes section */}
      <section className="section bg-paper">
        <div className="container max-w-3xl">
          <span className="eyebrow">Policy Changes</span>
          <div className="tick mt-4"></div>
          <h2 className="mt-4 mb-6">Common changes we handle daily</h2>
          <div className="space-y-4">
            {[
              { change: "Add or remove a power unit", time: "Same day" },
              { change: "Add or remove a trailer", time: "Same day" },
              { change: "Add or remove a driver", time: "1 business day" },
              { change: "Update your radius of operation", time: "1 business day" },
              { change: "Change your mailing or garaging address", time: "Same day" },
              { change: "Add a lender/lienholder", time: "Same day" },
              { change: "Increase or decrease limits", time: "1–2 business days" },
              { change: "Add an additional insured", time: "Same day" },
            ].map((item) => (
              <div key={item.change} className="flex justify-between items-center border-b border-[var(--hair)] pb-3">
                <span className="font-sans text-[15px] text-ink">{item.change}</span>
                <span className="font-sans text-[13px] text-purple font-medium">{item.time}</span>
              </div>
            ))}
          </div>
          <p className="font-sans text-[14px] text-muted-custom mt-6">
            Email <a href="mailto:service@truxins.com" className="text-purple">service@truxins.com</a> or call <a href="tel:3312401101" className="text-purple">(331) 240-1101</a> to request any change. We process most requests same day.
          </p>
        </div>
      </section>

      <hr className="hairline" />

      {/* Client Center CTA */}
      <section className="section bg-purple text-white">
        <div className="container text-center">
          <span className="eyebrow !text-white/70">Client Center</span>
          <div className="tick mt-4 mx-auto !bg-white/50"></div>
          <h2 className="mt-4 mb-6 !text-white">Manage your policies online.</h2>
          <p className="font-sans text-[16px] text-white/80 max-w-xl mx-auto mb-8">
            Access your account through our two client portals — one for certificates and one for policy changes and support.
          </p>
          <a href="/client-center" className="inline-block bg-white text-purple font-sans font-medium text-[14px] px-8 py-3 tracking-wider uppercase hover:bg-white/90 transition-colors">
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

          <div className="mt-12 text-center">
            <Link href="/quote" className="btn-solid">Get a Quote</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
