import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

const PORTALS = [
  {
    title: "Policy Service Portal",
    description: "View policy details, request changes, download ID cards, and manage your account.",
    url: "https://support.truxins.com",
    cta: "Access Policy Portal",
    features: ["View policy documents", "Request endorsements", "Download ID cards", "Update contact info"],
  },
  {
    title: "Request a Certificate",
    description: "Generate certificates of insurance instantly for shippers, brokers, and facilities.",
    url: "https://app.nowcerts.com/trux-insurance-services/certificate-request",
    cta: "Request Certificate",
    features: ["Instant certificate generation", "Email directly to holders", "Track certificate history", "Bulk requests available"],
  },
  {
    title: "Make a Payment",
    description: "Pay your premium online securely. Accepts credit card, debit card, and ACH/eCheck.",
    url: "https://truxins.epaypolicy.com",
    cta: "Make a Payment",
    features: ["Credit/debit card accepted", "ACH/eCheck available", "Instant confirmation", "Payment history"],
  },
  {
    title: "Report a Claim",
    description: "File a claim or report an incident. Available 24/7 for emergency claims.",
    url: "/service",
    cta: "Report a Claim",
    features: ["24/7 emergency claims line", "Online claim submission", "Track claim status", "Upload documentation"],
    internal: true,
  },
];

export default function ClientLoginHub() {
  return (
    <Layout>
      <SEO
        title="Client Login | Policy Service, Certificates, Payments | Trux"
        description="Access your Trux Insurance client portals. View policies, request certificates, make payments, and report claims."
        canonical="/client-login"
      />
      <Breadcrumbs items={[{ label: "Client Login" }]} />

      {/* Hero */}
      <section className="py-16 bg-paper-2">
        <div className="container">
          <span className="eyebrow">Client Access</span>
          <div className="tick mt-4"></div>
          <h1 className="mt-4 mb-4">Client portals</h1>
          <p className="lead max-w-2xl">
            Access your policy, request certificates, make payments, and report claims — all in one place.
          </p>
        </div>
      </section>

      <hr className="hairline" />

      {/* Portal Grid */}
      <section className="section bg-paper">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTALS.map((portal) => (
              <div key={portal.title} className="border border-[var(--hair)] p-8 flex flex-col">
                <h3 className="font-serif text-[20px] text-ink mb-3">{portal.title}</h3>
                <p className="font-sans text-[14px] text-muted-custom mb-6">{portal.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {portal.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-2 items-center">
                      <span className="text-purple text-[10px]">●</span>
                      <span className="font-sans text-[13px] text-ink">{feature}</span>
                    </li>
                  ))}
                </ul>
                {portal.internal ? (
                  <a href={portal.url} className="btn-solid no-underline text-center">
                    {portal.cta}
                  </a>
                ) : (
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-solid no-underline text-center"
                  >
                    {portal.cta} ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Help Section */}
      <section className="section bg-sand">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="mb-6">Need help?</h2>
              <p className="font-sans text-[16px] text-muted-custom mb-6 leading-relaxed">
                If you're having trouble accessing your account or need assistance with any portal, our team is here to help.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <span className="text-ink font-bold">·</span>
                  <div>
                    <span className="font-sans text-[14px] text-ink font-medium">Phone: </span>
                    <a href="tel:3312401101" className="font-sans text-[14px] text-purple">(331) 240-1101</a>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-ink font-bold">·</span>
                  <div>
                    <span className="font-sans text-[14px] text-ink font-medium">Toll-Free: </span>
                    <a href="tel:3312401101" className="font-sans text-[14px] text-purple">(331) 240-1101</a>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-ink font-bold">·</span>
                  <div>
                    <span className="font-sans text-[14px] text-ink font-medium">Email: </span>
                    <a href="mailto:info@truxins.com" className="font-sans text-[14px] text-purple">info@truxins.com</a>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-ink font-bold">·</span>
                  <div>
                    <span className="font-sans text-[14px] text-ink font-medium">Hours: </span>
                    <span className="font-sans text-[14px] text-muted-custom">Mon–Fri 9:00 AM – 5:00 PM CT</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 border border-[var(--hair)]">
              <h3 className="font-serif text-[18px] text-ink mb-4">Quick links</h3>
              <div className="space-y-3">
                <a href="tel:3312401101" className="block font-sans text-[14px] text-purple hover:underline">
                  Emergency claims line (24/7) →
                </a>
                <a href="mailto:certs@truxins.com" className="block font-sans text-[14px] text-purple hover:underline">
                  Rush certificate request →
                </a>
                <a href="mailto:info@truxins.com" className="block font-sans text-[14px] text-purple hover:underline">
                  General inquiry →
                </a>
                <a href="/contact" className="block font-sans text-[14px] text-purple hover:underline">
                  Office location & directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
