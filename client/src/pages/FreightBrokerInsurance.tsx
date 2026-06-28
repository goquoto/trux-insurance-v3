import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "wouter";

const BROKER_PRODUCTS = [
  {
    slug: "contingent-cargo",
    title: "Contingent Cargo Liability",
    description: "Covers cargo loss or damage when you're not the primary carrier.",
    icon: "📦",
  },
  {
    slug: "general-liability",
    title: "General Liability",
    description: "Protects against bodily injury and property damage claims at your facility.",
    icon: "🛡️",
  },
  {
    slug: "shippers-interest",
    title: "Shippers Interest",
    description: "Covers cargo you arrange but don't own or control.",
    icon: "🚚",
  },
  {
    slug: "errors-omissions",
    title: "Errors & Omissions (E&O)",
    description: "Professional liability for mistakes in your brokerage operations.",
    icon: "⚠️",
  },
  {
    slug: "broker-bonds",
    title: "Broker Bonds (BMC-84)",
    description: "FMCSA-required surety bond for freight broker authority.",
    icon: "📋",
  },
  {
    slug: "cyber",
    title: "Cyber Coverage",
    description: "Protects against data breaches, ransomware, and cyber liability.",
    icon: "🔒",
  },
];

export default function FreightBrokerInsurance() {
  return (
    <Layout>
      <SEO
        title="Freight Broker Insurance | Cargo Liability, E&O, Bonds | Trux"
        description="Comprehensive freight broker insurance including contingent cargo, general liability, E&O, broker bonds, and cyber coverage. Fast quotes from A-rated markets."
        canonical="/freight-broker-insurance"
      />
      <Breadcrumbs items={[{ label: "Freight Broker Insurance" }]} />

      {/* Hero */}
      <section className="py-16 bg-paper-2">
        <div className="container">
          <span className="eyebrow">Insurance for Brokers</span>
          <div className="tick mt-4"></div>
          <h1 className="mt-4 mb-4">Freight Broker Insurance</h1>
          <p className="lead max-w-2xl">
            Complete coverage for freight brokers — from cargo liability and E&O to FMCSA-required bonds. We specialize in the unique risks brokers face.
          </p>
        </div>
      </section>

      <hr className="hairline" />

      {/* Why Broker Insurance Matters */}
      <section className="section bg-paper">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="mb-6">Why freight broker insurance matters</h2>
              <p className="font-sans text-[16px] text-muted-custom mb-4 leading-relaxed">
                As a freight broker, you arrange shipments but don't own the cargo or operate the trucks. That unique position creates unique risks — and gaps in standard trucking insurance won't cover them.
              </p>
              <p className="font-sans text-[16px] text-muted-custom mb-4 leading-relaxed">
                Brokers face claims from shippers when cargo is damaged, from carriers when you make mistakes, and from regulators when you fail to maintain required bonds. A single cargo loss or E&O claim can exceed six figures.
              </p>
              <p className="font-sans text-[16px] text-muted-custom leading-relaxed">
                We build broker programs that cover the full spectrum of your operations — from the cargo you arrange to the mistakes you might make to the bonds regulators require.
              </p>
            </div>
            <div className="bg-sand p-8 border-l-[5px] border-ink">
              <h3 className="font-serif text-[20px] text-ink mb-4">What you need to know</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-ink font-bold">·</span>
                  <span className="font-sans text-[14px] text-ink"><strong>Broker bonds are mandatory.</strong> FMCSA requires a $75K surety bond (BMC-84) to hold broker authority.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ink font-bold">·</span>
                  <span className="font-sans text-[14px] text-ink"><strong>Cargo claims are common.</strong> Damage, loss, or delay claims from shippers are the #1 broker claim.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ink font-bold">·</span>
                  <span className="font-sans text-[14px] text-ink"><strong>E&O protects you.</strong> Errors in rate quotes, billing, or documentation can trigger costly claims.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ink font-bold">·</span>
                  <span className="font-sans text-[14px] text-ink"><strong>Cyber risk is growing.</strong> Brokers handle sensitive shipper and carrier data — breaches are increasingly targeted.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Coverage Grid */}
      <section className="section bg-paper-2">
        <div className="container">
          <h2 className="mb-12 text-center">Our broker insurance products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BROKER_PRODUCTS.map((product) => (
              <Link
                key={product.slug}
                href={`/freight-broker-insurance/${product.slug}`}
                className="group block p-6 border border-[var(--hair)] hover:border-purple hover:bg-paper transition-colors no-underline"
              >
                <div className="text-3xl mb-3">{product.icon}</div>
                <h3 className="font-serif text-[18px] text-ink mb-2 group-hover:text-purple transition-colors">
                  {product.title}
                </h3>
                <p className="font-sans text-[14px] text-muted-custom">{product.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Why Trux */}
      <section className="section bg-paper">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="mb-6">Why Trux for broker insurance</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-[16px] text-ink mb-2">Broker specialists</h3>
                  <p className="font-sans text-[14px] text-muted-custom">
                    We only work with trucking and logistics. We understand the unique risks brokers face — and we know which carriers will quote them.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-[16px] text-ink mb-2">A-rated markets</h3>
                  <p className="font-sans text-[14px] text-muted-custom">
                    We place broker business with specialty carriers that understand the segment. No standard commercial programs that don't fit.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-[16px] text-ink mb-2">Integrated programs</h3>
                  <p className="font-sans text-[14px] text-muted-custom">
                    We coordinate cargo, E&O, GL, and bonds into one coherent program. No gaps. No overlaps. One renewal.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-[16px] text-ink mb-2">Fast quotes</h3>
                  <p className="font-sans text-[14px] text-muted-custom">
                    Most broker quotes delivered same day. We know what carriers need and move fast.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-sand p-8">
              <h3 className="font-serif text-[20px] text-ink mb-6">Common broker questions</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-[14px] text-ink mb-2">Do I need all six coverages?</h4>
                  <p className="font-sans text-[13px] text-muted-custom">
                    Most brokers need cargo, E&O, GL, and bonds. Cyber is increasingly important if you handle shipper data. Contingent cargo depends on your carrier relationships.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-[14px] text-ink mb-2">What's the cost?</h4>
                  <p className="font-sans text-[13px] text-muted-custom">
                    Broker programs typically range $2K–$8K annually depending on revenue, claims history, and coverage limits. Get a quote to see your rate.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-[14px] text-ink mb-2">How long does placement take?</h4>
                  <p className="font-sans text-[13px] text-muted-custom">
                    Most placements close within 5–7 business days. Bonds can be issued immediately if you're approved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* CTA */}
      <section className="section bg-sand">
        <div className="container text-center">
          <h2 className="mb-4">Ready to get broker coverage?</h2>
          <p className="font-sans text-[16px] text-muted-custom max-w-2xl mx-auto mb-8">
            Get a quote in minutes. A Trux specialist will review your operation and recommend the right program.
          </p>
          <Link href="/quote" className="btn-solid no-underline inline-block">
            Get a Quote
          </Link>
        </div>
      </section>
    </Layout>
  );
}
