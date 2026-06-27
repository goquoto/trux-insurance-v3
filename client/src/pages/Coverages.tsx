import { Link } from "wouter";
import Layout from "@/components/Layout";

const coverages: { slug: string; title: string; desc: string; image: string; comingSoon?: boolean }[] = [
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
    image: "/manus-storage/coverage-physical-damage_391231f1.png",
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
    image: "/manus-storage/coverage-general-liability_201703ff.png",
  },
  {
    slug: "non-trucking",
    title: "Non-Trucking Liability",
    desc: "Also called bobtail or deadhead coverage — protects you when the truck is not under dispatch or load.",
    image: "/manus-storage/coverage-non-trucking_9bc1fc78.png",
  },
  {
    slug: "trailer-interchange",
    title: "Trailer Interchange",
    desc: "Physical damage coverage for trailers you pull under a trailer interchange agreement — required by most intermodal contracts.",
    image: "/manus-storage/coverage-trailer-interchange_709da492.png",
  },
  {
    slug: "occupational-accident",
    title: "Occupational Accident",
    desc: "Accident and disability benefits for owner-operators and independent contractors who aren't covered by workers' comp.",
    image: "/manus-storage/coverage-occupational-accident_d07390f2.png",
  },
  {
    slug: "workers-compensation",
    title: "Workers' Compensation",
    desc: "Statutory coverage for employee injuries on the job — medical, disability, and death benefits as required by state law.",
    image: "/manus-storage/coverage-workers-comp_88cc6f4a.png",
  },
  {
    slug: "excess-umbrella",
    title: "Excess / Umbrella",
    desc: "Additional limits above your primary auto liability, general liability, and employers liability — often required by shippers and brokers.",
    image: "/manus-storage/coverage-excess-umbrella_10be31ef.png",
  },
  {
    slug: "pollution-liability",
    title: "Pollution Liability",
    desc: "Coverage for environmental cleanup costs and third-party bodily injury or property damage from a pollution event during transit.",
    image: "/manus-storage/coverage-pollution-liability_f2d70e4e.png",
  },
  {
    slug: "freight-broker-bonds",
    title: "Freight Broker Bonds",
    desc: "BMC-84 surety bonds and trust fund agreements required by the FMCSA for licensed freight brokers and freight forwarders.",
    image: "/manus-storage/coverage-freight-broker_a28e33e2.png",
  },
  {
    slug: "personal-lines",
    title: "Personal Lines",
    desc: "Home, auto, umbrella, and recreational vehicle coverage for you and your family — coming soon to Trux.",
    image: "/manus-storage/coverage-personal-lines_c1c25da6.png",
    comingSoon: true,
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
                className={`group block border border-[var(--hair)] hover:border-[var(--purple)] transition-colors no-underline relative ${cov.comingSoon ? 'opacity-90' : ''}`}
              >
                {cov.comingSoon && (
                  <div className="absolute top-3 right-3 z-10 bg-[var(--purple)] text-white font-sans text-[11px] font-medium tracking-wider uppercase px-3 py-1">
                    Coming Soon
                  </div>
                )}
                <div className="h-[200px] flex items-center justify-center overflow-hidden">
                  <img
                    src={cov.image}
                    alt={`Color pencil sketch illustration for ${cov.title}`}
                    className={`w-full h-full object-cover transition-opacity ${cov.comingSoon ? 'opacity-60' : 'opacity-90 group-hover:opacity-100'}`}
                  />
                </div>
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
      <section className="section bg-[#1A1A1A] text-center">
        <div className="container">
          <span className="eyebrow text-[#9E9A95]">Let's get you covered</span>
          <h2 className="mt-4 mb-8 text-white">
            Every mile covered — <em className="italic">by people who only do trucking.</em>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://truxins.com/trucking-insurance-quote/" className="btn-solid">
              Start Trucking Application
            </a>
            <Link href="/quote" className="btn-ghost border-white text-white hover:bg-white hover:text-[#1A1A1A]">
              Get a Fast Quote
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
