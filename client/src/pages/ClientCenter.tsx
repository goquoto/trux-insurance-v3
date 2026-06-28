import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FileText, Settings, CreditCard, ExternalLink } from "lucide-react";

export default function ClientCenter() {
  return (
    <Layout>
      <SEO
        title="Client Center"
        description="Access your Trux Insurance client portals — download certificates, submit policy changes, or make a payment online."
        canonical="/client-center"
      />
      <Breadcrumbs items={[{ label: "Client Center" }]} />

      {/* Page header */}
      <section className="py-16 bg-paper-2">
        <div className="container">
          <span className="eyebrow">Client Center</span>
          <div className="tick mt-4"></div>
          <h1 className="mt-4 mb-4">Manage your account online.</h1>
          <p className="lead max-w-2xl">
            Access your insurance portals below — download certificates, submit policy changes, or make a payment. Available 24/7.
          </p>
        </div>
      </section>

      <hr className="hairline" />

      {/* Portal cards */}
      <section className="section bg-paper">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">

            {/* Certificates */}
            <a
              href="https://identity.nowcerts.com/Account/Login?ReturnUrl=%2FAccount%2FLoginRedirectUrl"
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-[var(--hair)] p-8 text-center transition-all hover:border-purple hover:shadow-sm"
            >
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center bg-paper-2 group-hover:bg-purple/5 transition-colors">
                <FileText size={28} className="text-purple" />
              </div>
              <h3 className="text-[18px] font-serif font-medium text-ink mb-2">Certificates</h3>
              <p className="font-sans text-[14px] text-muted-custom mb-4 leading-relaxed">
                Download, email, or print your Certificate of Insurance instantly.
              </p>
              <span className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-purple">
                Open Portal <ExternalLink size={12} />
              </span>
            </a>

            {/* Policy Changes */}
            <a
              href="https://support.truxins.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-[var(--hair)] p-8 text-center transition-all hover:border-purple hover:shadow-sm"
            >
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center bg-paper-2 group-hover:bg-purple/5 transition-colors">
                <Settings size={28} className="text-purple" />
              </div>
              <h3 className="text-[18px] font-serif font-medium text-ink mb-2">Policy Changes</h3>
              <p className="font-sans text-[14px] text-muted-custom mb-4 leading-relaxed">
                Add vehicles, update drivers, change your radius, or request any policy modification.
              </p>
              <span className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-purple">
                Open Portal <ExternalLink size={12} />
              </span>
            </a>

            {/* Payments */}
            <a
              href="https://truxins.epaypolicy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-[var(--hair)] p-8 text-center transition-all hover:border-purple hover:shadow-sm"
            >
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center bg-paper-2 group-hover:bg-purple/5 transition-colors">
                <CreditCard size={28} className="text-purple" />
              </div>
              <h3 className="text-[18px] font-serif font-medium text-ink mb-2">Make a Payment</h3>
              <p className="font-sans text-[14px] text-muted-custom mb-4 leading-relaxed">
                Pay your premium online securely via ePayPolicy.
              </p>
              <span className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-purple">
                Open Portal <ExternalLink size={12} />
              </span>
            </a>

          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Help section */}
      <section className="py-12 bg-paper-2">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-[24px] font-serif font-medium text-ink mb-4">Need help?</h2>
            <p className="font-sans text-[15px] text-muted-custom mb-6 leading-relaxed">
              Our service team is available Monday–Friday, 9–5 CT. Call, email, or submit a request through the policy changes portal above.
            </p>
            <div className="flex flex-wrap justify-center gap-6 font-sans text-[14px]">
              <a href="tel:3312401101" className="text-purple font-medium hover:underline">
                (331) 240-1101
              </a>
              <a href="mailto:service@truxins.com" className="text-purple font-medium hover:underline">
                service@truxins.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
