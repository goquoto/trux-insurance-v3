import { Link } from "wouter";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

const operationTypes = [
  {
    slug: "owner-operators",
    title: "Owner-Operators",
    description: "Single-truck authorities running under their own MC. We build lean policies that protect your rig, your cargo, and your livelihood — without fleet-sized premiums.",
    image: "/manus-storage/insure-owner-operator_edd0dcb1.png",
  },
  {
    slug: "small-fleets",
    title: "Small Fleets (2–15 Trucks)",
    description: "Growing operations that need scalable coverage. We structure programs that flex as you add power units, with volume discounts that kick in early.",
    image: "/manus-storage/insure-small-fleet_b8797816.png",
  },
  {
    slug: "large-fleets",
    title: "Large Fleets (15+ Trucks)",
    description: "Enterprise-level programs with layered limits, fleet-wide deductibles, and dedicated loss-control support. We negotiate directly with underwriters for the best terms.",
    image: "/manus-storage/insure-large-fleet_d445808f.png",
  },
  {
    slug: "flatbed-haulers",
    title: "Flatbed Haulers",
    description: "Open-deck specialists hauling steel, lumber, machinery, and oversize loads. We understand securement liability and the unique cargo exposures flatbeds face.",
    image: "/manus-storage/insure-flatbed_715b14b5.png",
  },
  {
    slug: "reefer-carriers",
    title: "Refrigerated (Reefer) Carriers",
    description: "Temperature-controlled freight demands specialized cargo coverage for spoilage, breakdown, and contamination. We write policies that address every cold-chain risk.",
    image: "/manus-storage/insure-reefer_3975e1ae.png",
  },
  {
    slug: "dump-trucks",
    title: "Dump Trucks & Aggregates",
    description: "Construction-site operations with unique exposures — from job-site liability to gravel-scatter damage. We cover single dumps through full fleets.",
    image: "/manus-storage/insure-dump-truck_1481bd4e.png",
  },
  {
    slug: "hazmat-carriers",
    title: "Hazmat Carriers",
    description: "Tankers and dry-van operators hauling hazardous materials need elevated limits and pollution liability. We place coverage with markets that understand hazmat risk.",
    image: "/manus-storage/insure-hazmat_16fc6906.png",
  },
  {
    slug: "hotshot-trucking",
    title: "Hot-Shot Trucking",
    description: "Expedited freight on gooseneck trailers behind heavy-duty pickups. We write non-standard policies that cover your dually and trailer as a commercial unit.",
    image: "/manus-storage/insure-hotshot_1c612c76.png",
  },
  {
    slug: "intermodal-drayage",
    title: "Intermodal & Drayage",
    description: "Container haulers moving freight between ports, rail yards, and warehouses. We handle trailer-interchange gaps and the unique liability of drayage operations.",
    image: "/manus-storage/insure-intermodal_333e5443.png",
  },
];

export default function WhoWeInsure() {
  return (
    <Layout>
      <SEO
        title="Who We Insure — Trucking Operations We Cover"
        description="Trux Insurance Services insures owner-operators, small fleets, large fleets, flatbed haulers, reefer carriers, dump trucks, hazmat carriers, hot-shot trucking, and intermodal drayage operations."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Who We Insure", url: "/who-we-insure" },
        ]}
      />
      <Breadcrumbs items={[{ label: "Who We Insure" }]} />

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-[var(--hair)]">
        <div className="container">
          <p className="eyebrow">WHO WE INSURE</p>
          <div className="tick" />
          <h1 className="text-[36px] md:text-[52px] leading-[1.15] tracking-[-0.01em] mb-6">
            Every type of trucking operation — <em>covered by specialists.</em>
          </h1>
          <p className="font-sans text-[17px] text-muted-custom leading-relaxed max-w-2xl">
            From single owner-operators to 100-truck fleets, from dry van to hazmat tankers — we build insurance programs tailored to how you actually operate. No generic policies. No one-size-fits-all.
          </p>
        </div>
      </section>

      {/* Operation Type Cards */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {operationTypes.map((op) => (
              <Link
                key={op.slug}
                href={`/who-we-insure/${op.slug}`}
                className="group block no-underline border border-[var(--hair)] hover:border-[var(--purple)] transition-colors"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={op.image}
                    alt={`Color pencil illustration of ${op.title}`}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-[20px] font-serif font-medium mb-3 text-ink group-hover:text-purple transition-colors">
                    {op.title}
                  </h2>
                  <p className="font-sans text-[15px] text-muted-custom leading-relaxed mb-4">
                    {op.description}
                  </p>
                  <span className="font-sans text-[14px] font-medium text-purple">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[var(--purple)] text-white">
        <div className="container text-center">
          <h2 className="text-[28px] md:text-[38px] text-white mb-4">
            Don't see your operation type?
          </h2>
          <p className="font-sans text-[17px] text-white/80 mb-8 max-w-xl mx-auto">
            We insure nearly every for-hire and private trucking operation. Call us — if it has wheels and hauls freight, we can probably cover it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote" className="btn-solid bg-white text-[var(--purple)] hover:bg-white/90 border-white">
              Get a Quote
            </Link>
            <a href="tel:3312401101" className="font-sans text-[15px] text-white no-underline font-medium">
              Or call (331) 240-1101
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
