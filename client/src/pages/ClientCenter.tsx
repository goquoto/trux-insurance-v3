import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FileText, Settings, ExternalLink } from "lucide-react";
import { useState } from "react";

type Portal = "certificates" | "policy";

export default function ClientCenter() {
  const [activePortal, setActivePortal] = useState<Portal>("certificates");

  return (
    <Layout>
      <SEO
        title="Client Center"
        description="Access your Trux Insurance client portals — download certificates of insurance instantly via NowCerts or submit policy changes through our support portal."
        canonical="/client-center"
      />
      <Breadcrumbs items={[{ label: "Client Center" }]} />

      {/* Page header */}
      <section className="py-12 bg-paper-2">
        <div className="container">
          <span className="eyebrow">Client Center</span>
          <div className="tick mt-4"></div>
          <h1 className="mt-4 mb-4">Manage your account online.</h1>
          <p className="lead max-w-2xl">
            Access your insurance portals below — download certificates instantly or submit policy change requests. Available 24/7.
          </p>
        </div>
      </section>

      <hr className="hairline" />

      {/* Portal selector */}
      <section className="py-8 bg-paper">
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={() => setActivePortal("certificates")}
              className={`flex items-center gap-3 px-6 py-4 border transition-all text-left ${
                activePortal === "certificates"
                  ? "border-[var(--purple)] bg-purple/5"
                  : "border-[var(--hair)] hover:border-[var(--purple)]"
              }`}
            >
              <FileText size={24} className={activePortal === "certificates" ? "text-purple" : "text-muted-custom"} />
              <div>
                <h3 className={`text-[16px] font-sans font-medium ${activePortal === "certificates" ? "text-purple" : "text-ink"}`}>
                  Certificates Portal
                </h3>
                <p className="font-sans text-[13px] text-muted-custom mt-0.5">
                  Download, email, or print certificates of insurance
                </p>
              </div>
            </button>

            <button
              onClick={() => setActivePortal("policy")}
              className={`flex items-center gap-3 px-6 py-4 border transition-all text-left ${
                activePortal === "policy"
                  ? "border-[var(--purple)] bg-purple/5"
                  : "border-[var(--hair)] hover:border-[var(--purple)]"
              }`}
            >
              <Settings size={24} className={activePortal === "policy" ? "text-purple" : "text-muted-custom"} />
              <div>
                <h3 className={`text-[16px] font-sans font-medium ${activePortal === "policy" ? "text-purple" : "text-ink"}`}>
                  Policy Changes Portal
                </h3>
                <p className="font-sans text-[13px] text-muted-custom mt-0.5">
                  Submit policy changes, add vehicles, update information
                </p>
              </div>
            </button>
          </div>

          {/* Embedded portal */}
          <div className="border border-[var(--hair)] bg-white relative" style={{ minHeight: "700px" }}>
            {activePortal === "certificates" && (
              <iframe
                src="https://identity.nowcerts.com/Account/Login?ReturnUrl=%2FAccount%2FLoginRedirectUrl"
                title="NowCerts Certificates Portal"
                className="w-full border-0"
                style={{ height: "700px" }}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
              />
            )}
            {activePortal === "policy" && (
              <iframe
                src="https://support.truxins.com/"
                title="Policy Changes & Support Portal"
                className="w-full border-0"
                style={{ height: "700px" }}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
              />
            )}
          </div>

          {/* Fallback link */}
          <div className="mt-4 flex items-center gap-2 text-[13px] font-sans text-muted-custom">
            <ExternalLink size={14} />
            <span>Having trouble? Open the portal directly: </span>
            {activePortal === "certificates" ? (
              <a
                href="https://identity.nowcerts.com/Account/Login?ReturnUrl=%2FAccount%2FLoginRedirectUrl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple underline"
              >
                NowCerts Login
              </a>
            ) : (
              <a
                href="https://support.truxins.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple underline"
              >
                Support Portal
              </a>
            )}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Help section */}
      <section className="py-12 bg-paper-2">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            <div>
              <h3 className="text-[16px] font-sans font-medium text-ink mb-2">Need a certificate?</h3>
              <p className="font-sans text-[14px] text-muted-custom leading-relaxed">
                Log in to the Certificates Portal above to download, email, or print your Certificate of Insurance. Most certificates are available instantly.
              </p>
            </div>
            <div>
              <h3 className="text-[16px] font-sans font-medium text-ink mb-2">Need a policy change?</h3>
              <p className="font-sans text-[14px] text-muted-custom leading-relaxed">
                Use the Policy Changes Portal to add/remove vehicles, update drivers, change your radius, or request any other policy modification. We process most requests same day.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[var(--hair)]">
            <p className="font-sans text-[14px] text-muted-custom">
              Need help? Call <a href="tel:3312401101" className="text-purple font-medium">(331) 240-1101</a> or email{" "}
              <a href="mailto:service@truxins.com" className="text-purple font-medium">service@truxins.com</a> — Mon–Fri 9–5 CT.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
