import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import InteractiveStateMap from "@/components/InteractiveStateMap";
import { Link } from "wouter";

const LICENSED_STATES = [
  { name: "Arizona", abbr: "AZ", slug: "arizona" },
  { name: "Colorado", abbr: "CO", slug: "colorado" },
  { name: "Florida", abbr: "FL", slug: "florida" },
  { name: "Georgia", abbr: "GA", slug: "georgia" },
  { name: "Illinois", abbr: "IL", slug: "illinois" },
  { name: "Indiana", abbr: "IN", slug: "indiana" },
  { name: "Iowa", abbr: "IA", slug: "iowa" },
  { name: "Kentucky", abbr: "KY", slug: "kentucky" },
  { name: "Michigan", abbr: "MI", slug: "michigan" },
  { name: "Minnesota", abbr: "MN", slug: "minnesota" },
  { name: "Mississippi", abbr: "MS", slug: "mississippi" },
  { name: "Missouri", abbr: "MO", slug: "missouri" },
  { name: "Nevada", abbr: "NV", slug: "nevada" },
  { name: "North Carolina", abbr: "NC", slug: "north-carolina" },
  { name: "Ohio", abbr: "OH", slug: "ohio" },
  { name: "Pennsylvania", abbr: "PA", slug: "pennsylvania" },
  { name: "South Carolina", abbr: "SC", slug: "south-carolina" },
  { name: "Tennessee", abbr: "TN", slug: "tennessee" },
  { name: "Texas", abbr: "TX", slug: "texas" },
  { name: "Virginia", abbr: "VA", slug: "virginia" },
  { name: "Wisconsin", abbr: "WI", slug: "wisconsin" },
];

export default function StatesHub() {
  return (
    <Layout>
      <SEO
        title="Trucking Insurance by State"
        description="Trux Insurance Services is licensed in 21 states. Find state-specific coverage details, regulations, and get a quote for your state."
        canonical="/states"
      />
      <Breadcrumbs items={[{ label: "States" }]} />

      {/* Page header */}
      <section className="section bg-paper-2">
        <div className="container">
          <span className="eyebrow">Coverage by State</span>
          <div className="tick mt-4"></div>
          <h1 className="mt-4 mb-4">Trucking insurance across 21 states.</h1>
          <p className="lead max-w-2xl">
            Trux Insurance Services is licensed in 21 states across the country. Click your state to learn about coverage requirements, regulations, and get a quote.
          </p>
        </div>
      </section>

      <hr className="hairline" />

      {/* Interactive Map */}
      <section className="section bg-paper">
        <div className="container">
          <span className="eyebrow">Find Your State</span>
          <div className="tick mt-4"></div>
          <h2 className="mt-4 mb-8">Click the map or select below.</h2>
          <InteractiveStateMap />
        </div>
      </section>

      <hr className="hairline" />

      {/* States Grid */}
      <section className="section bg-paper-2">
        <div className="container">
          <span className="eyebrow">All Licensed States</span>
          <div className="tick mt-4"></div>
          <h2 className="mt-4 mb-8">State-specific coverage & quotes</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {LICENSED_STATES.map((state) => (
              <Link
                key={state.abbr}
                href={`/states/${state.slug}`}
                className="group border border-[var(--hair)] p-6 bg-white hover:bg-[var(--sand)] transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-[18px] font-medium text-[var(--head)] group-hover:text-[var(--ink)]">
                      {state.name}
                    </h3>
                    <p className="font-sans text-[14px] text-[var(--taupe)] mt-1">
                      {state.abbr}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-[var(--tick)] group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* CTA Band */}
      <section className="section bg-[#1A1A1A] text-center">
        <div className="container">
          <span className="eyebrow text-[#9E9A95]">Ready to get covered?</span>
          <h2 className="mt-4 mb-8 text-white">
            Get a quote in your state — <em className="italic">in minutes.</em>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/quote" className="btn-solid">
              Start Trucking Application
            </Link>
            <Link href="/quick-quote" className="btn-ghost border-white text-white hover:bg-white hover:text-[#1A1A1A]">
              Get a Fast Quote
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
