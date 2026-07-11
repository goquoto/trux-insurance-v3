import { Link } from "wouter";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";

export default function NewVentureInsurance() {
  return (
    <Layout>
      <SEO
        title="New Venture Trucking Insurance | Trux Insurance Services"
        description="Insurance for carriers with less than 2 years of authority. We help new trucking companies get proper coverage from day one."
        keywords="new venture trucking insurance, new authority insurance, startup trucking company insurance"
      />
      <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "New Venture Trucking Insurance" }]} />

      <section className="section bg-[var(--sand)]">
        <div className="container">
          <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
          <span className="eyebrow">NEW AUTHORITY</span>
          <h1 className="mt-3 font-serif text-[36px] md:text-[48px] font-medium text-[var(--head)] leading-[1.15]">
            New Venture Trucking Insurance
          </h1>
          <p className="mt-4 font-sans text-[16px] text-[var(--muted)] leading-[1.7] max-w-[600px]">
            Coverage for carriers with less than 2 years of operating authority. We help new trucking companies get proper insurance from day one — so you can focus on building your business.
          </p>
        </div>
      </section>

      <section className="section border-b border-[var(--hair)]">
        <div className="container">
          <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
          <h2 className="font-serif text-[28px] md:text-[34px] font-medium text-[var(--head)] leading-[1.2] mb-6">
            Starting a trucking company?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px]">
            <div>
              <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7] mb-4">
                Getting your MC authority is just the first step. Before you can haul your first load, you need insurance that meets FMCSA minimums — and most standard markets won't write a carrier with no operating history.
              </p>
              <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7] mb-4">
                That's where we come in. Trux works with carriers that specialize in new ventures, and we'll get you covered quickly so your authority goes active without delay.
              </p>
              <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7]">
                We also help you understand what coverage you actually need versus what's required — so you're not overpaying on day one, but you're not exposed either.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-serif text-[18px] font-medium text-[var(--head)]">What you'll need to get started</h3>
              {[
                "MC/DOT number (or pending application)",
                "Driver's license and MVR for all drivers",
                "Vehicle VINs and values",
                "Planned radius of operation",
                "Types of freight you'll haul",
                "Prior driving experience (CDL history)",
                "Business entity documentation (LLC, Corp)",
                "Planned number of units",
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
            Coverage for new ventures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Auto Liability", desc: "FMCSA-required coverage starting at $750,000 for general freight. We'll help you determine the right limit for your operation." },
              { title: "Physical Damage", desc: "Protect your truck investment from collision, theft, fire, and weather damage. Essential if you're financing equipment." },
              { title: "Motor Truck Cargo", desc: "Coverage for the freight you haul. Limits and commodity types are matched to your planned operations." },
              { title: "General Liability", desc: "Covers third-party claims from your business operations — not vehicle-related. Required by many facilities and brokers." },
              { title: "Workers' Comp / Occ Acc", desc: "Workers' comp for W-2 employees, or occupational accident coverage for owner-operators and 1099 drivers." },
              { title: "Non-Trucking Liability", desc: "Coverage for owner-operators when using the truck for personal purposes while not under dispatch." },
            ].map((item) => (
              <div key={item.title} className="border-b border-[var(--hair)] pb-4">
                <h3 className="font-serif text-[17px] font-medium text-[var(--head)] mb-2">{item.title}</h3>
                <p className="font-sans text-[14px] text-[var(--muted)] leading-[1.7]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--sand)] border-l-4 border-[var(--ink)]">
        <div className="container text-center">
          <h2 className="font-serif text-[24px] md:text-[30px] font-medium text-[var(--head)] leading-[1.2] mb-3">
            Ready to get your authority active?
          </h2>
          <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7] mb-6 max-w-[500px] mx-auto">
            Most new venture policies can be bound within 48 hours. Start your application today.
          </p>
          <Link href="/quote" className="btn-solid inline-block no-underline">
            Start Application
          </Link>
        </div>
      </section>
    </Layout>
  );
}
