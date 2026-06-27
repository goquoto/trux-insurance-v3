import { Link } from "wouter";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";

const costFactors = [
  { factor: "Authority Age", description: "New authorities (under 2 years) pay 30–60% more than established carriers due to limited loss history.", impact: "High" },
  { factor: "Driving Record (MVR)", description: "Clean MVRs get the best rates. Violations, accidents, and suspensions can double your premium.", impact: "High" },
  { factor: "Equipment Value", description: "Newer, more expensive trucks cost more to insure for physical damage. A 2024 Peterbilt costs more than a 2015 Freightliner.", impact: "Medium" },
  { factor: "Commodity Type", description: "Hazmat, high-value goods, and refrigerated cargo cost more to insure than general dry freight.", impact: "Medium" },
  { factor: "Operating Radius", description: "Long-haul OTR operations pay more than local/regional due to increased highway exposure.", impact: "Medium" },
  { factor: "Fleet Size", description: "Larger fleets (5+ trucks) get volume discounts. Single trucks pay the highest per-unit rates.", impact: "Medium" },
  { factor: "Loss History", description: "Claims in the past 3–5 years directly impact your renewal rates. Frequency matters more than severity.", impact: "High" },
  { factor: "State of Domicile", description: "Some states have higher litigation costs and minimum requirements, affecting base rates.", impact: "Low–Medium" },
];

const typicalCosts = [
  { type: "Owner-Operator (1 truck, general freight)", range: "$8,000 – $18,000/year", notes: "Varies widely by authority age and MVR" },
  { type: "Small Fleet (5 trucks, dry van)", range: "$40,000 – $75,000/year", notes: "Per-truck cost decreases with fleet size" },
  { type: "Large Fleet (20+ trucks)", range: "$150,000 – $400,000+/year", notes: "Depends on limits, deductibles, and loss history" },
  { type: "Hot-Shot (pickup + gooseneck)", range: "$5,000 – $12,000/year", notes: "Lower equipment value = lower PD premium" },
  { type: "Dump Truck (single unit, local)", range: "$6,000 – $14,000/year", notes: "Local radius helps; job-site GL adds cost" },
  { type: "Hazmat Tanker", range: "$15,000 – $35,000/year per unit", notes: "Higher limits required = higher premium" },
];

const costFAQ = [
  { question: "Why is trucking insurance so expensive?", answer: "Commercial trucking involves high-value equipment, serious injury potential, and significant cargo exposure. The average truck accident claim exceeds $150,000, and nuclear verdicts (jury awards over $10M) have increased 300% in the past decade. Insurers price this risk accordingly." },
  { question: "How can I lower my trucking insurance cost?", answer: "The most effective strategies are: maintain clean MVRs for all drivers, build claims-free history over time, increase deductibles if you have cash reserves, install dash cams and telematics, complete safety training programs, and shop your policy at renewal with a specialist broker like Trux." },
  { question: "Why do new authorities pay more?", answer: "New authorities have no loss history for underwriters to evaluate. Statistically, carriers in their first 2 years have higher claim frequency. As you build clean history, rates decrease significantly — often 20–40% by year 3." },
  { question: "Is it cheaper to be leased to a carrier or run my own authority?", answer: "Leasing is typically cheaper for insurance because the carrier provides primary liability and cargo. You only need physical damage, non-trucking liability, and occupational accident. However, you earn less per mile. Running your own authority costs more for insurance but offers higher revenue potential." },
  { question: "How often should I shop my insurance?", answer: "We recommend marketing your account every 2–3 years, or immediately after a rate increase exceeding 15%. However, switching carriers annually can actually hurt you — underwriters prefer to see policy stability." },
  { question: "Do dash cameras lower my insurance cost?", answer: "Yes. Many carriers offer 5–15% discounts for forward-facing dash cams, and some offer additional discounts for driver-facing cameras. Beyond the discount, cameras help defend against fraudulent claims — which keeps your loss history clean." },
  { question: "What's the minimum insurance required by FMCSA?", answer: "For-hire carriers hauling general freight need minimum $750,000 in auto liability. Hazmat carriers need $1M–$5M depending on commodity. Household goods movers need $750K. These are minimums — most shippers and brokers require $1M regardless." },
  { question: "Can I get monthly payments on my trucking insurance?", answer: "Yes. We work with premium finance companies that offer 9–10 monthly installments after a down payment (typically 20–25%). This spreads your annual premium across the year instead of requiring full payment upfront." },
];

export default function Cost() {
  return (
    <Layout>
      <SEO
        title="Trucking Insurance Cost — What to Expect"
        description="How much does trucking insurance cost? Typical premiums range from $8,000 to $18,000 per year for owner-operators. Learn what factors affect your rate and how to save."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Trucking Insurance Cost", url: "/cost" },
        ]}
        faq={costFAQ}
      />
      <Breadcrumbs items={[{ label: "Trucking Insurance Cost" }]} />

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-[var(--hair)]">
        <div className="container">
          <p className="eyebrow">PRICING</p>
          <div className="tick" />
          <h1 className="text-[36px] md:text-[52px] leading-[1.15] tracking-[-0.01em] mb-6">
            How much does trucking insurance <em>actually</em> cost?
          </h1>
          <p className="font-sans text-[17px] text-muted-custom leading-relaxed max-w-2xl">
            There's no single answer — your premium depends on your authority age, driving record, equipment, commodities, and operating radius. Here's what real operators pay and what drives the price.
          </p>
        </div>
      </section>

      {/* Typical Costs Table */}
      <section className="py-12 md:py-16 bg-sand">
        <div className="container">
          <p className="eyebrow">TYPICAL ANNUAL PREMIUMS</p>
          <div className="tick" />
          <h2 className="text-[26px] md:text-[34px] mb-8">What operators typically pay</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--hair)]">
                  <th className="text-left font-sans text-[13px] font-medium uppercase tracking-wider text-muted-custom py-3 pr-4">Operation Type</th>
                  <th className="text-left font-sans text-[13px] font-medium uppercase tracking-wider text-muted-custom py-3 pr-4">Annual Range</th>
                  <th className="text-left font-sans text-[13px] font-medium uppercase tracking-wider text-muted-custom py-3 hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {typicalCosts.map((row, i) => (
                  <tr key={i} className="border-b border-[var(--hair)]">
                    <td className="font-sans text-[15px] text-ink py-4 pr-4 font-medium">{row.type}</td>
                    <td className="font-serif text-[17px] text-purple py-4 pr-4 font-medium">{row.range}</td>
                    <td className="font-sans text-[14px] text-muted-custom py-4 hidden md:table-cell">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-sans text-[13px] text-muted-custom mt-4 italic">
            * These ranges represent typical premiums for carriers with clean records and 2+ years of authority. New authorities and carriers with claims history may pay more.
          </p>
        </div>
      </section>

      {/* Cost Factors */}
      <section className="py-12 md:py-16 border-b border-[var(--hair)]">
        <div className="container">
          <p className="eyebrow">RATING FACTORS</p>
          <div className="tick" />
          <h2 className="text-[26px] md:text-[34px] mb-8">What affects your premium</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {costFactors.map((item, i) => (
              <div key={i} className="border-b border-[var(--hair)] pb-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-[18px] font-medium">{item.factor}</h3>
                  <span className={`font-sans text-[12px] font-medium uppercase tracking-wider px-2 py-0.5 ${
                    item.impact === "High" ? "bg-[var(--purple)]/10 text-purple" : "bg-[var(--sand)] text-muted-custom"
                  }`}>
                    {item.impact} Impact
                  </span>
                </div>
                <p className="font-sans text-[15px] text-muted-custom leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Save */}
      <section className="py-12 md:py-16 border-b border-[var(--hair)]">
        <div className="container">
          <p className="eyebrow">SAVE ON PREMIUMS</p>
          <div className="tick" />
          <h2 className="text-[26px] md:text-[34px] mb-8">How to lower your trucking insurance cost</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Clean MVRs", text: "Keep all drivers' records clean. One serious violation can increase your premium 20–40%." },
              { title: "Dash Cameras", text: "Forward-facing cameras earn 5–15% discounts and defend against fraudulent claims." },
              { title: "Higher Deductibles", text: "Increasing your deductible from $1K to $2.5K or $5K can save 10–20% on physical damage." },
              { title: "Safety Programs", text: "Documented driver training and safety meetings show underwriters you're managing risk." },
              { title: "Build History", text: "Every claims-free year improves your experience. Rates drop significantly after year 3." },
              { title: "Work with a Specialist", text: "A trucking-focused broker (like Trux) knows which markets offer the best rates for your specific operation." },
            ].map((tip, i) => (
              <div key={i} className="border-t-2 border-[var(--purple)] pt-5">
                <h3 className="font-serif text-[18px] font-medium mb-2">{tip.title}</h3>
                <p className="font-sans text-[15px] text-muted-custom leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-0">
        <div className="container">
          <FAQSection items={costFAQ} title="Trucking Insurance Cost — FAQ" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[var(--purple)] text-white">
        <div className="container text-center">
          <h2 className="text-[28px] md:text-[36px] text-white mb-4">
            Get your actual quote — not a range.
          </h2>
          <p className="font-sans text-[17px] text-white/80 mb-8 max-w-xl mx-auto">
            These are industry averages. Your actual premium depends on your specific operation. Get a personalized quote in minutes — no obligation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote" className="btn-solid bg-white text-[var(--purple)] hover:bg-white/90 border-white">
              Get Your Quote
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
