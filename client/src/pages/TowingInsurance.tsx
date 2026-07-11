import { Link } from "wouter";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";

export default function TowingInsurance() {
  return (
    <Layout>
      <SEO
        title="Towing Insurance | Trux Insurance Services"
        description="Specialized coverage for tow truck operators — from light-duty roadside to heavy-duty recovery. Garage keepers, on-hook, and auto liability tailored for towing."
        keywords="towing insurance, tow truck insurance, wrecker insurance, garage keepers insurance"
      />
      <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Towing Insurance" }]} />

      <section className="section bg-[var(--sand)]">
        <div className="container">
          <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
          <span className="eyebrow">SPECIALTY COVERAGE</span>
          <h1 className="mt-3 font-serif text-[36px] md:text-[48px] font-medium text-[var(--head)] leading-[1.15]">
            Towing Insurance
          </h1>
          <p className="mt-4 font-sans text-[16px] text-[var(--muted)] leading-[1.7] max-w-[600px]">
            Specialized coverage for tow truck operators. From light-duty roadside assistance to heavy-duty recovery, we understand the unique risks towing companies face.
          </p>
        </div>
      </section>

      <section className="section border-b border-[var(--hair)]">
        <div className="container">
          <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
          <h2 className="font-serif text-[28px] md:text-[34px] font-medium text-[var(--head)] leading-[1.2] mb-6">
            Coverage for towing operations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px]">
            {[
              { title: "Auto Liability", desc: "Covers bodily injury and property damage caused by your tow trucks. Higher limits often needed due to the nature of towing operations on busy roads." },
              { title: "On-Hook / Cargo", desc: "Covers damage to vehicles while being towed or transported on your equipment. Essential — standard cargo policies don't cover vehicles in your care." },
              { title: "Garage Keepers", desc: "Protects vehicles stored at your lot or facility against theft, vandalism, fire, and weather damage while in your custody." },
              { title: "Garagekeepers Legal Liability", desc: "Covers your legal liability for damage to customers' vehicles while in your care, custody, or control at your facility." },
              { title: "Physical Damage", desc: "Comprehensive and collision coverage for your tow trucks, flatbeds, and recovery equipment — often high-value specialized vehicles." },
              { title: "General Liability", desc: "Covers third-party claims from your business operations — slip-and-falls at your lot, damage to property during recovery operations." },
              { title: "Workers' Compensation", desc: "Towing is one of the most dangerous occupations. Workers' comp covers your employees' medical bills and lost wages from on-the-job injuries." },
              { title: "Umbrella / Excess", desc: "Additional liability limits above your primary policies. Recommended given the high-risk nature of roadside towing operations." },
            ].map((item) => (
              <div key={item.title} className="border-b border-[var(--hair)] pb-4">
                <h3 className="font-serif text-[17px] font-medium text-[var(--head)] mb-2">{item.title}</h3>
                <p className="font-sans text-[14px] text-[var(--muted)] leading-[1.7]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--paper-2)]">
        <div className="container">
          <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
          <h2 className="font-serif text-[28px] md:text-[34px] font-medium text-[var(--head)] leading-[1.2] mb-8">
            Types of towing operations we cover
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Light-duty towing (cars, pickups)",
              "Medium-duty towing (box trucks, RVs)",
              "Heavy-duty towing (semis, buses)",
              "Roadside assistance / service calls",
              "Accident recovery & scene cleanup",
              "Repossession operations",
              "Vehicle storage facilities",
              "Police rotation / municipal contracts",
              "Long-distance vehicle transport",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 border-b border-[var(--hair)] pb-3">
                <span className="text-[var(--tick)]">·</span>
                <p className="font-sans text-[14px] text-[var(--muted)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--sand)] border-l-4 border-[var(--ink)]">
        <div className="container text-center">
          <h2 className="font-serif text-[24px] md:text-[30px] font-medium text-[var(--head)] leading-[1.2] mb-3">
            Need towing insurance?
          </h2>
          <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7] mb-6 max-w-[500px] mx-auto">
            We work with carriers that understand towing risks. Get a quote tailored to your specific operation.
          </p>
          <Link href="/quote" className="btn-solid inline-block no-underline">
            Get a Quote
          </Link>
        </div>
      </section>
    </Layout>
  );
}
