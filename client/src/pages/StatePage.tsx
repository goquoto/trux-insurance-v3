import { useParams, Link } from "wouter";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { stateContent } from "@/data/stateContentData";

interface LegacyStateData {
  name: string;
  abbr: string;
  description: string;
  minimumLimits: string;
  keyFacts: string[];
  faq: { question: string; answer: string }[];
}

// Legacy state data for states not yet in new format
const legacyStateData: Record<string, LegacyStateData> = {
  "indiana": {
    name: "Indiana",
    abbr: "IN",
    description: "Indiana calls itself the 'Crossroads of America' for good reason — more interstate highways intersect in Indiana than any other state. This makes it a natural home for trucking operations, and Trux insures carriers throughout the state from Indianapolis distribution hubs to northwest Indiana steel hauling and southern Indiana manufacturing freight.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Indiana follows federal minimums for intrastate carriers.",
    keyFacts: [
      "More interstate highway intersections than any other state",
      "Indianapolis — major distribution and logistics hub",
      "Northwest Indiana — heavy steel and manufacturing freight",
      "Moderate insurance rates compared to neighboring Illinois",
      "Strong manufacturing base drives consistent freight demand",
    ],
    faq: [
      { question: "Is Indiana cheaper than Illinois for trucking insurance?", answer: "Generally yes. Indiana has lower litigation costs and less traffic density than the Chicago metro area. Carriers domiciled in Indiana (even those running into Illinois) often get better base rates." },
      { question: "Do you cover steel hauling operations in NW Indiana?", answer: "Yes. We insure flatbed carriers hauling steel out of the Gary/Hammond/East Chicago steel mills with specialized cargo coverage for high-value metal commodities." },
    ],
  },
  // ... other legacy states would go here
};

export default function StatePage() {
  const { state } = useParams<{ state: string }>();
  const stateLower = state?.toLowerCase() || "";
  
  // Try new comprehensive data first, fall back to legacy data
  const data = stateContent[stateLower] || legacyStateData[stateLower];
  const isNewFormat = stateLower in stateContent;

  if (!data) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-[36px] mb-4">State Not Found</h1>
          <p className="text-muted-custom mb-8">We don't have a dedicated page for this state yet.</p>
          <Link href="/states" className="btn-solid">Back to States</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={`Trucking Insurance in ${data.name}`}
        description={isNewFormat ? data.headline : (data as any).description}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: `${data.name} Trucking Insurance`, url: `/states/${state}` },
        ]}
        faq={data.faq}
      />
      <Breadcrumbs items={[{ label: "States", href: "/states" }, { label: `${data.name} Trucking Insurance` }]} />

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-[var(--hair)]">
        <div className="container">
          <p className="eyebrow">LICENSED IN {data.abbr}</p>
          <div className="tick" />
          <h1 className="text-[36px] md:text-[48px] leading-[1.15] tracking-[-0.01em] mb-6">
            {isNewFormat ? data.headline : `Trucking Insurance in ${data.name}`}
          </h1>
          <p className="font-sans text-[17px] text-muted-custom leading-relaxed max-w-3xl">
            {isNewFormat ? data.intro : (data as any).description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link href="/quote" className="btn-solid">Get a {data.name} Quote</Link>
            <a href="tel:3312401101" className="btn-ghost">Call (331) 240-1101</a>
          </div>
        </div>
      </section>

      {/* Freight Hubs (New Format) */}
      {isNewFormat && "freightHubs" in data && (
        <section className="py-12 md:py-16 bg-sand">
          <div className="container">
            <p className="eyebrow">{data.abbr} FREIGHT HUBS</p>
            <div className="tick" />
            <h2 className="text-[26px] md:text-[32px] mb-8">Major freight hubs in {data.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data as any).freightHubs.map((hub: any, i: number) => (
                <div key={i} className="p-4 border border-[var(--hair)]">
                  <h3 className="font-serif text-[18px] font-medium text-ink mb-2">{hub.name}</h3>
                  <p className="font-sans text-[14px] text-muted-custom leading-relaxed">{hub.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Corridors (New Format) */}
      {isNewFormat && "corridors" in data && (
        <section className="py-12 md:py-16 border-b border-[var(--hair)]">
          <div className="container">
            <p className="eyebrow">{data.abbr} CORRIDORS</p>
            <div className="tick" />
            <h2 className="text-[26px] md:text-[32px] mb-8">Major freight corridors in {data.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data as any).corridors.map((corridor: any, i: number) => (
                <div key={i} className="p-4 border border-[var(--hair)]">
                  <h3 className="font-serif text-[18px] font-medium text-ink mb-2">{corridor.name}</h3>
                  <p className="font-sans text-[14px] text-muted-custom leading-relaxed">{corridor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regulations (New Format) */}
      {isNewFormat && "regulations" in data && (
        <section className="py-12 md:py-16 bg-sand">
          <div className="container">
            <p className="eyebrow">{data.abbr} REGULATIONS</p>
            <div className="tick" />
            <h2 className="text-[26px] md:text-[32px] mb-8">Insurance requirements in {data.name}</h2>
            <div className="space-y-6">
              <div className="p-4 border border-[var(--hair)]">
                <h3 className="font-serif text-[18px] font-medium text-ink mb-2">Interstate Carriers</h3>
                <p className="font-sans text-[14px] text-muted-custom leading-relaxed">{(data as any).regulations.interstate}</p>
              </div>
              <div className="p-4 border border-[var(--hair)]">
                <h3 className="font-serif text-[18px] font-medium text-ink mb-2">Intrastate Carriers</h3>
                <p className="font-sans text-[14px] text-muted-custom leading-relaxed">{(data as any).regulations.intrastate}</p>
              </div>
              <div className="p-4 border border-[var(--hair)]">
                <h3 className="font-serif text-[18px] font-medium text-ink mb-2">Regulatory Agency</h3>
                <p className="font-sans text-[14px] text-muted-custom leading-relaxed">{(data as any).regulations.stateAgency}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Endorsements (New Format) */}
      {isNewFormat && "endorsements" in data && (
        <section className="py-12 md:py-16 border-b border-[var(--hair)]">
          <div className="container">
            <p className="eyebrow">{data.abbr} ENDORSEMENTS</p>
            <div className="tick" />
            <h2 className="text-[26px] md:text-[32px] mb-8">Common endorsements for {data.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(data as any).endorsements.map((endorsement: string, i: number) => (
                <div key={i} className="flex items-center gap-2 py-3 px-4 border border-[var(--hair)]">
                  <span className="text-purple">✓</span>
                  <span className="font-sans text-[14px] text-ink">{endorsement}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Key Facts (Legacy Format) */}
      {!isNewFormat && "keyFacts" in data && (
        <section className="py-12 md:py-16 bg-sand">
          <div className="container">
            <p className="eyebrow">{data.abbr} TRUCKING FACTS</p>
            <div className="tick" />
            <h2 className="text-[26px] md:text-[32px] mb-8">What to know about trucking in {data.name}</h2>
            <div className="space-y-4">
              {(data as any).keyFacts.map((fact: string, i: number) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-[var(--hair)]">
                  <span className="text-purple font-serif font-medium text-[18px] leading-none mt-0.5">•</span>
                  <span className="font-sans text-[15px] text-muted-custom leading-relaxed">{fact}</span>
                </div>
              ))}
            </div>
            {!isNewFormat && "minimumLimits" in data && (
              <div className="mt-8 p-6 border-l-[5px] border-[var(--purple)]">
                <p className="font-sans text-[13px] font-medium uppercase tracking-wider text-muted-custom mb-2">Minimum Insurance Requirements</p>
                <p className="font-sans text-[15px] text-ink leading-relaxed">{(data as any).minimumLimits}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Coverages Available */}
      <section className="py-12 md:py-16 border-b border-[var(--hair)]">
        <div className="container">
          <p className="eyebrow">COVERAGES IN {data.abbr}</p>
          <div className="tick" />
          <h2 className="text-[26px] md:text-[32px] mb-8">Coverage we place in {data.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Auto Liability", slug: "auto-liability" },
              { name: "Physical Damage", slug: "physical-damage" },
              { name: "Motor Truck Cargo", slug: "cargo" },
              { name: "General Liability", slug: "general-liability" },
              { name: "Non-Trucking Liability", slug: "non-trucking-liability" },
              { name: "Occupational Accident", slug: "occupational-accident" },
              { name: "Workers' Compensation", slug: "workers-compensation" },
              { name: "Excess / Umbrella", slug: "excess-umbrella" },
              { name: "Trailer Interchange", slug: "trailer-interchange" },
            ].map((coverage) => (
              <Link
                key={coverage.slug}
                href={`/coverages/${coverage.slug}`}
                className="flex items-center gap-2 py-3 px-4 border border-[var(--hair)] no-underline text-ink hover:border-[var(--purple)] hover:text-purple transition-colors"
              >
                <span className="text-purple">→</span>
                <span className="font-sans text-[15px]">{coverage.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {data.faq.length > 0 && (
        <section className="py-0">
          <div className="container">
            <FAQSection items={data.faq} title={`${data.name} Trucking Insurance — FAQ`} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[var(--purple)] text-white">
        <div className="container text-center">
          <h2 className="text-[28px] md:text-[36px] text-white mb-4">
            Get covered in {data.name} today.
          </h2>
          <p className="font-sans text-[17px] text-white/80 mb-8 max-w-xl mx-auto">
            Trux is licensed in {data.name} and ready to quote your operation. No obligation — just straightforward pricing from a trucking insurance specialist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote" className="btn-solid bg-white text-[var(--purple)] hover:bg-white/90 border-white">
              Get Your {data.abbr} Quote
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
