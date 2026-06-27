import { Link } from "wouter";
import Layout from "@/components/Layout";

const coverages = [
  {
    slug: "auto-liability",
    title: "Commercial Auto Liability",
    desc: "The coverage your authority is built on — filings, limits, and broadening endorsements that make it a real program.",
    image: "/manus-storage/coverage-auto_467c2d30.png",
  },
  {
    slug: "physical-damage",
    title: "Physical Damage",
    desc: "Comprehensive and collision protection for your power units and trailers — agreed value, stated amount, or actual cash value.",
  },
  {
    slug: "cargo",
    title: "Motor Truck Cargo",
    desc: "Protects the freight you haul against loss or damage in transit — from general commodities to refrigerated and hazmat loads.",
    image: "/manus-storage/coverage-cargo_81a9b72c.png",
  },
  {
    slug: "general-liability",
    title: "General Liability",
    desc: "Premises and operations coverage for your terminal, yard, and office — slip-and-fall, advertising injury, and products/completed operations.",
  },
  {
    slug: "non-trucking",
    title: "Non-Trucking Liability",
    desc: "Also called bobtail or deadhead coverage — protects you when the truck is not under dispatch or load.",
  },
  {
    slug: "trailer-interchange",
    title: "Trailer Interchange",
    desc: "Physical damage coverage for trailers you pull under a trailer interchange agreement — required by most intermodal contracts.",
  },
  {
    slug: "occupational-accident",
    title: "Occupational Accident",
    desc: "Accident and disability benefits for owner-operators and independent contractors who aren't covered by workers' comp.",
  },
  {
    slug: "workers-compensation",
    title: "Workers' Compensation",
    desc: "Statutory coverage for employee injuries on the job — medical, disability, and death benefits as required by state law.",
  },
  {
    slug: "excess-umbrella",
    title: "Excess / Umbrella",
    desc: "Additional limits above your primary auto liability, general liability, and employers liability — often required by shippers and brokers.",
  },
  {
    slug: "pollution-liability",
    title: "Pollution Liability",
    desc: "Coverage for environmental cleanup costs and third-party bodily injury or property damage from a pollution event during transit.",
  },
];

export default function Coverages() {
  return (
    <Layout>
      {/* Page header */}
      <section className="section bg-paper-2">
        <div className="container">
          <span className="eyebrow">Lines of Business</span>
          <div className="tick mt-4"></div>
          <h1 className="mt-4 mb-4">Coverages we place</h1>
          <p className="lead max-w-2xl">
            If we don't write it in-house, we know who does. Every line below is placed with A-rated, specialist trucking markets.
          </p>
        </div>
      </section>

      <hr className="hairline" />

      {/* Coverage cards grid */}
      <section className="section bg-paper">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coverages.map((cov) => (
              <Link
                key={cov.slug}
                href={`/coverages/${cov.slug}`}
                className="group block border border-[var(--hair)] hover:border-[var(--purple)] transition-colors no-underline"
              >
                {cov.image && (
                  <div className="bg-sand p-4 h-[180px] flex items-center justify-center overflow-hidden">
                    <img
                      src={cov.image}
                      alt={`Color pencil sketch illustration for ${cov.title}`}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                )}
                {!cov.image && (
                  <div className="bg-sand p-4 h-[180px] flex items-center justify-center">
                    <span className="font-serif text-[48px] text-[var(--hair)]">✦</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-[18px] mb-2 group-hover:text-purple transition-colors">{cov.title}</h3>
                  <p className="font-sans text-[14px] text-muted-custom leading-relaxed">{cov.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="section bg-ink text-center">
        <div className="container">
          <span className="eyebrow text-[var(--hair)]">Let's get you covered</span>
          <h2 className="mt-4 mb-8 text-white">
            Every mile covered — <em className="italic">by people who only do trucking.</em>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://truxins.com/trucking-insurance-quote/" className="btn-solid" style={{ backgroundColor: "var(--purple)" }}>
              Start Trucking Application
            </a>
            <Link href="/quote" className="btn-ghost border-white text-white hover:bg-white hover:text-ink">
              Get a Fast Quote
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
