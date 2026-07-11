import { Link } from "wouter";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";

export default function OwnerOperatorInsurance() {
  return (
    <Layout>
      <SEO
        title="Owner-Operator Insurance | Trux Insurance Services"
        description="Tailored insurance programs for single-truck operators. Whether you're leased on or running under your own authority, we build coverage around your operation."
        keywords="owner operator insurance, single truck insurance, independent trucker insurance"
      />
      <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Owner-Operator Insurance" }]} />

      <section className="section bg-[var(--sand)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
              <span className="eyebrow">SINGLE-TRUCK PROGRAMS</span>
              <h1 className="mt-3 font-serif text-[36px] md:text-[48px] font-medium text-[var(--head)] leading-[1.15]">
                Owner-Operator Insurance
              </h1>
              <p className="mt-4 font-sans text-[16px] text-[var(--muted)] leading-[1.7] max-w-[600px]">
                Tailored programs for single-truck operators. Whether you're leased on to a carrier or running under your own authority, we build coverage around how you actually operate.
              </p>
            </div>
            <div className="hidden md:block">
              <img
                src="/manus-storage/tool-owner-operator_1ed9b175.png"
                alt="Pencil sketch of an owner-operator standing proudly beside their truck, representing independent trucking"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section border-b border-[var(--hair)]">
        <div className="container">
          <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
          <h2 className="font-serif text-[28px] md:text-[34px] font-medium text-[var(--head)] leading-[1.2] mb-6">
            Coverage depends on how you operate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px]">
            <div className="border border-[var(--hair)] p-6">
              <h3 className="font-serif text-[20px] font-medium text-[var(--head)] mb-3">Leased to a carrier</h3>
              <p className="font-sans text-[14px] text-[var(--muted)] leading-[1.7] mb-4">
                When you're leased on, the motor carrier provides primary auto liability. But you still need coverage for gaps:
              </p>
              <div className="space-y-3">
                {[
                  "Physical Damage (your truck)",
                  "Non-Trucking Liability (personal use)",
                  "Occupational Accident (injury/disability)",
                  "Bobtail coverage (driving without trailer)",
                  "Downtime coverage (loss of income)",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 border-b border-[var(--hair)] pb-2">
                    <span className="text-[var(--tick)]">·</span>
                    <p className="font-sans text-[13px] text-[var(--muted)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-[var(--hair)] p-6">
              <h3 className="font-serif text-[20px] font-medium text-[var(--head)] mb-3">Own authority</h3>
              <p className="font-sans text-[14px] text-[var(--muted)] leading-[1.7] mb-4">
                Running under your own MC number means you need a full commercial policy — same as a fleet, but sized for one truck:
              </p>
              <div className="space-y-3">
                {[
                  "Auto Liability ($750K–$1M minimum)",
                  "Physical Damage (comp + collision)",
                  "Motor Truck Cargo",
                  "General Liability",
                  "Workers' Comp or Occ/Acc",
                  "Umbrella (if hauling high-value freight)",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 border-b border-[var(--hair)] pb-2">
                    <span className="text-[var(--tick)]">·</span>
                    <p className="font-sans text-[13px] text-[var(--muted)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--paper-2)]">
        <div className="container">
          <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
          <h2 className="font-serif text-[28px] md:text-[34px] font-medium text-[var(--head)] leading-[1.2] mb-8">
            Why owner-operators choose Trux
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "One-truck friendly", desc: "We don't treat single-truck operators as an afterthought. You get the same attention and market access as a 50-truck fleet." },
              { num: "02", title: "Flexible payment", desc: "Monthly payment plans with low down payments. We know cash flow matters when you're running one truck." },
              { num: "03", title: "Growth path", desc: "As you add trucks, we scale your coverage. No need to start over with a new agency when you grow from 1 to 5 to 20 units." },
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

      <section className="section bg-[var(--sand)] border-l-4 border-[var(--ink)]">
        <div className="container text-center">
          <h2 className="font-serif text-[24px] md:text-[30px] font-medium text-[var(--head)] leading-[1.2] mb-3">
            One truck. One call. Full coverage.
          </h2>
          <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7] mb-6 max-w-[500px] mx-auto">
            Tell us how you operate and we'll build a program that fits — no unnecessary coverage, no dangerous gaps.
          </p>
          <Link href="/quote" className="btn-solid inline-block no-underline">
            Get a Quote
          </Link>
        </div>
      </section>
    </Layout>
  );
}
