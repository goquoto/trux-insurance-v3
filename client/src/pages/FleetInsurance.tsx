import { Link } from "wouter";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";

export default function FleetInsurance() {
  return (
    <Layout>
      <SEO
        title="Truck Fleet Insurance | Trux Insurance Services"
        description="Comprehensive insurance programs for fleets of 10+ power units. Volume pricing, dedicated account management, and custom risk management solutions."
        keywords="truck fleet insurance, fleet trucking insurance, commercial fleet coverage, multi-truck insurance"
      />
      <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Truck Fleet Insurance" }]} />

      <section className="section bg-[var(--sand)]">
        <div className="container">
          <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
          <span className="eyebrow">FLEET PROGRAMS</span>
          <h1 className="mt-3 font-serif text-[36px] md:text-[48px] font-medium text-[var(--head)] leading-[1.15]">
            Truck Fleet Insurance
          </h1>
          <p className="mt-4 font-sans text-[16px] text-[var(--muted)] leading-[1.7] max-w-[600px]">
            Programs for fleets of 10+ power units. Volume pricing, dedicated account management, and risk management solutions that reduce your total cost of risk.
          </p>
        </div>
      </section>

      <section className="section border-b border-[var(--hair)]">
        <div className="container">
          <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
          <h2 className="font-serif text-[28px] md:text-[34px] font-medium text-[var(--head)] leading-[1.2] mb-6">
            Fleet coverage built for scale
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px]">
            <div>
              <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7] mb-4">
                Fleet insurance isn't just individual truck policies multiplied. At 10+ units, you qualify for fleet-rated programs with volume discounts, composite rating, and custom deductible structures that reduce your per-unit cost.
              </p>
              <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7] mb-4">
                We structure fleet programs that balance premium cost against risk retention — higher deductibles where it makes sense, lower where exposure is concentrated, and umbrella limits sized to your actual liability profile.
              </p>
              <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7]">
                Every fleet gets a dedicated account manager who handles certificates, endorsements, driver additions, and claims advocacy — so your operations team isn't chasing paperwork.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-serif text-[18px] font-medium text-[var(--head)]">Fleet program benefits</h3>
              {[
                "Volume-rated pricing (10+ units)",
                "Composite rating vs. individual driver rating",
                "Custom deductible structures",
                "Dedicated account manager",
                "Same-day certificate issuance",
                "Monthly loss runs and claims reporting",
                "Driver qualification file support",
                "Annual coverage review and market check",
                "Claims advocacy and litigation management",
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

      <section className="section bg-[var(--paper-2)]">
        <div className="container">
          <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
          <h2 className="font-serif text-[28px] md:text-[34px] font-medium text-[var(--head)] leading-[1.2] mb-8">
            Coverage lines for fleets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Auto Liability", desc: "Fleet-rated primary liability with limits from $1M to $5M+. Composite rating means one good driver doesn't subsidize another's poor record." },
              { title: "Physical Damage", desc: "Comprehensive and collision for your entire fleet. Scheduled or blanket coverage with agreed-value or actual cash value options." },
              { title: "Motor Truck Cargo", desc: "Broad-form cargo coverage for your fleet's commodity mix. Single limit or per-unit scheduling available." },
              { title: "General Liability", desc: "Premises and operations coverage for your terminals, yards, and maintenance facilities." },
              { title: "Workers' Compensation", desc: "Experience-modified workers' comp for your driver workforce. We help manage your mod rate through claims management." },
              { title: "Umbrella / Excess", desc: "High-limit excess coverage sized to your fleet's exposure. $5M, $10M, or higher limits available for larger operations." },
            ].map((item) => (
              <div key={item.title} className="border-b border-[var(--hair)] pb-4">
                <h3 className="font-serif text-[17px] font-medium text-[var(--head)] mb-2">{item.title}</h3>
                <p className="font-sans text-[14px] text-[var(--muted)] leading-[1.7]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-b border-[var(--hair)]">
        <div className="container">
          <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
          <h2 className="font-serif text-[28px] md:text-[34px] font-medium text-[var(--head)] leading-[1.2] mb-8">
            Fleet sizes we serve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Small fleet (10–25 units)", desc: "Transition from individual policies to fleet-rated programs. First access to volume pricing and dedicated service." },
              { title: "Mid-size fleet (25–100 units)", desc: "Custom program design with loss-sensitive rating, higher deductible options, and formal safety program integration." },
              { title: "Large fleet (100+ units)", desc: "Fully customized programs with self-insured retentions, captive options, and enterprise risk management consulting." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-serif text-[18px] font-medium text-[var(--head)] mb-2">{item.title}</h3>
                <p className="font-sans text-[14px] text-[var(--muted)] leading-[1.7]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--sand)] border-l-4 border-[var(--ink)]">
        <div className="container text-center">
          <h2 className="font-serif text-[24px] md:text-[30px] font-medium text-[var(--head)] leading-[1.2] mb-3">
            Fleet insurance that scales with you
          </h2>
          <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7] mb-6 max-w-[500px] mx-auto">
            Whether you're running 10 trucks or 200, we build programs that reduce your total cost of risk — not just your premium.
          </p>
          <Link href="/quote" className="btn-solid inline-block no-underline">
            Request Fleet Quote
          </Link>
        </div>
      </section>
    </Layout>
  );
}
