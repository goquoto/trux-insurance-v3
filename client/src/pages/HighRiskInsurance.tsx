import { Link } from "wouter";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";

export default function HighRiskInsurance() {
  return (
    <Layout>
      <SEO
        title="High-Risk Truck Insurance | Trux Insurance Services"
        description="Specialized insurance solutions for carriers with challenging loss history, new ventures, or non-standard risks. We find coverage when others can't."
        keywords="high risk trucking insurance, non-standard trucking insurance, hard to insure trucking"
      />
      <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "High-Risk Truck Insurance" }]} />

      {/* Hero */}
      <section className="section bg-[var(--sand)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
              <span className="eyebrow">SPECIALTY COVERAGE</span>
              <h1 className="mt-3 font-serif text-[36px] md:text-[48px] font-medium text-[var(--head)] leading-[1.15]">
                High-Risk Truck Insurance
              </h1>
              <p className="mt-4 font-sans text-[16px] text-[var(--muted)] leading-[1.7] max-w-[600px]">
                Solutions for carriers with challenging loss history, new authority, safety violations, or non-standard risks. We specialize in finding coverage when standard markets decline.
              </p>
            </div>
            <div className="hidden md:block">
              <img
                src="/manus-storage/tool-high-risk-insurance_95bf0445.png"
                alt="Pencil sketch of a truck navigating a challenging mountain road, representing high-risk trucking scenarios"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Makes a Carrier High-Risk */}
      <section className="section border-b border-[var(--hair)]">
        <div className="container">
          <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
          <h2 className="font-serif text-[28px] md:text-[34px] font-medium text-[var(--head)] leading-[1.2] mb-6">
            What makes a carrier "high-risk"?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px]">
            <div>
              <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7] mb-4">
                Standard insurance markets evaluate carriers based on loss history, safety scores, driver experience, and operational profile. When any of these factors fall outside preferred guidelines, carriers are classified as non-standard or high-risk.
              </p>
              <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7]">
                This doesn't mean you can't get coverage — it means you need an agency that understands surplus lines markets and knows which carriers write non-standard trucking risks.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-serif text-[18px] font-medium text-[var(--head)]">Common high-risk factors</h3>
              {[
                "Multiple at-fault accidents in the past 3 years",
                "Poor CSA scores or BASIC alerts",
                "New authority (less than 2 years operating)",
                "Prior policy cancellations or lapses",
                "Hauling hazmat, oversized, or high-value cargo",
                "High driver turnover or inexperienced drivers",
                "Out-of-service violations or conditional safety rating",
                "Operating in litigation-heavy states",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 border-b border-[var(--hair)] pb-3">
                  <span className="text-[var(--tick)] mt-0.5">·</span>
                  <p className="font-sans text-[14px] text-[var(--muted)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="section bg-[var(--paper-2)]">
        <div className="container">
          <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
          <h2 className="font-serif text-[28px] md:text-[34px] font-medium text-[var(--head)] leading-[1.2] mb-8">
            How Trux helps high-risk carriers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Surplus lines access",
                desc: "We work with non-admitted carriers and surplus lines markets that specifically write high-risk trucking — markets most agencies don't have access to.",
              },
              {
                num: "02",
                title: "Loss mitigation strategy",
                desc: "We help you build a corrective action plan — driver training, telematics, safety protocols — that demonstrates improvement to underwriters.",
              },
              {
                num: "03",
                title: "Phased re-entry",
                desc: "We create a 12-24 month roadmap to transition from non-standard to preferred markets as your loss history improves and CSA scores come down.",
              },
            ].map((item) => (
              <div key={item.num}>
                <span className="font-serif text-[32px] text-[var(--hair)] font-medium">{item.num}</span>
                <h3 className="font-serif text-[18px] font-medium text-[var(--head)] mt-2 mb-3">{item.title}</h3>
                <p className="font-sans text-[14px] text-[var(--muted)] leading-[1.7]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Options */}
      <section className="section border-b border-[var(--hair)]">
        <div className="container">
          <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
          <h2 className="font-serif text-[28px] md:text-[34px] font-medium text-[var(--head)] leading-[1.2] mb-6">
            Coverage we place for high-risk carriers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 max-w-[900px]">
            {[
              "Auto Liability (including $1M+ limits)",
              "Physical Damage",
              "Motor Truck Cargo",
              "General Liability",
              "Workers' Compensation",
              "Non-Trucking Liability",
              "Trailer Interchange",
              "Occupational Accident",
              "Umbrella / Excess Liability",
            ].map((item) => (
              <div key={item} className="border-b border-[var(--hair)] pb-3">
                <p className="font-sans text-[14px] text-[var(--muted)] flex items-start gap-2">
                  <span className="text-[var(--tick)] mt-0.5">·</span> {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[var(--sand)] border-l-4 border-[var(--ink)]">
        <div className="container text-center">
          <h2 className="font-serif text-[24px] md:text-[30px] font-medium text-[var(--head)] leading-[1.2] mb-3">
            Declined by your current agent?
          </h2>
          <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7] mb-6 max-w-[500px] mx-auto">
            We've placed coverage for carriers other agencies turned away. Let us review your situation — no obligation.
          </p>
          <Link href="/quote" className="btn-solid inline-block no-underline">
            Get a Quote
          </Link>
        </div>
      </section>
    </Layout>
  );
}
