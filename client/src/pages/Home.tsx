import { Link } from "wouter";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Shield, FileText, AlertTriangle, CreditCard, Award } from "lucide-react";
export default function Home() {
  return (
    <Layout>
      <SEO
        title="Commercial Trucking Insurance"
        description="Trux Insurance Services — commercial trucking insurance specialists licensed in 21 states. Auto liability, cargo, physical damage, and more for owner-operators and fleets."
        canonical="/"
      />
      {/* Hero Section */}
      <section className="section bg-paper">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              <span className="eyebrow">Working exclusively with motor carriers</span>
              <div className="tick mt-4"></div>
              <h1 className="mt-4 mb-6">
                Every mile covered — <em className="font-serif italic">by people who only do trucking.</em>
              </h1>
              <p className="text-[17px] leading-relaxed mb-8 max-w-lg">
                Trux Insurance Services places commercial trucking and fleet coverage across 21 states — auto liability, cargo, physical damage, trailer interchange and more. We market your account once, to the carriers that fit your risk, and stand behind it at claim time and renewal.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <a href="/quote" className="btn-solid">
                  Start Trucking Application
                </a>
                <a href="/quick-quote" className="btn-ghost">
                  GET A FAST QUOTE
                </a>
              </div>
              {/* Trust line */}
              <div className="flex flex-wrap items-center gap-6 text-[13px] font-sans text-taupe">
                <span className="flex items-center gap-1.5">
                  <Award size={14} className="text-purple" />
                  5.0 Google rating
                </span>
                <span>New authorities eligible</span>
                <span>24/7 certificate portal</span>
              </div>
            </div>

            {/* Right: Truck illustration */}
            <div className="flex items-center justify-center">
              <video
                src="/manus-storage/hero-truck-animation-final_b1e281a5.mp4"
                autoPlay
                muted
                loop
                playsInline
                poster="/manus-storage/hero-truck-color_26cb969a.png"
                aria-label="Animated color pencil sketch of a classic Peterbilt semi-truck with purple accents"
                className="w-full h-auto max-w-[540px] object-contain bg-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Lines of Business / Coverages */}
      <section className="section bg-paper">
        <div className="container">
          <span className="eyebrow">Lines of Business</span>
          <div className="tick mt-4"></div>
          <h2 className="mt-4 mb-2">Whatever your authority requires.</h2>
          <p className="lead mb-12">If we don't write it in-house, we know who does.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Trucking & Auto */}
            <div>
              <h3 className="mb-4 text-ink">Trucking &amp; Auto</h3>
              <ul className="space-y-3">
                {[
                  { name: "Commercial Auto Liability", slug: "auto-liability" },
                  { name: "Auto Physical Damage", slug: "physical-damage" },
                  { name: "Motor Truck Cargo", slug: "cargo" },
                  { name: "General Liability", slug: "general-liability" },
                  { name: "Non-Trucking / Bobtail", slug: "non-trucking" },
                  { name: "Trailer Interchange", slug: "trailer-interchange" },
                  { name: "Excess / Umbrella", slug: "excess-umbrella" },
                  { name: "Contingent Auto & Cargo", slug: "cargo" },
                ].map((item) => (
                  <li key={item.name} className="font-sans text-[15px] text-muted-custom border-b border-[var(--hair)] pb-2 flex items-start gap-2">
                    <span className="text-purple mt-1">·</span>
                    <Link href={`/coverages/${item.slug}`} className="no-underline text-muted-custom hover:text-ink transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Workforce & Specialty */}
            <div>
              <h3 className="mb-4 text-ink">Workforce &amp; Specialty</h3>
              <ul className="space-y-3">
                {[
                  { name: "Workers' Compensation", slug: "workers-compensation" },
                  { name: "Occupational Accident", slug: "occupational-accident" },
                  { name: "Hired & Non-Owned Auto", slug: "non-trucking" },
                  { name: "Pollution Liability", slug: "pollution-liability" },
                  { name: "Cyber Liability", slug: "cyber-coverage" },
                  { name: "Crime Coverage", slug: "crime-coverage" },
                  { name: "Freight Broker Bonds", slug: "freight-broker-bonds" },
                  { name: "Contractors", slug: "contractors" },
                ].map((item) => (
                  <li key={item.name} className="font-sans text-[15px] text-muted-custom border-b border-[var(--hair)] pb-2 flex items-start gap-2">
                    <span className="text-purple mt-1">·</span>
                    <Link href={`/coverages/${item.slug}`} className="no-underline text-muted-custom hover:text-ink transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Endorsements & Broadening */}
            <div>
              <h3 className="mb-4 text-ink">Endorsements &amp; Broadening</h3>
              <ul className="space-y-3">
                {["Broadened Pollution (CA 9948)", "Blanket Additional Insured", "Blanket Waiver of Subrogation", "Blanket 30-Day Notice", "Reefer Reimbursement", "Driver Other Car", "Refrigeration Breakdown", "Towing & Labor"].map((item) => (
                  <li key={item} className="font-sans text-[15px] text-muted-custom border-b border-[var(--hair)] pb-2 flex items-start gap-2">
                    <span className="text-purple mt-1">·</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="lead mt-8 text-[15px]">
            We insure: owner-operators, small and mid-size fleets, local, regional, and long-haul — dump, straight, and tractor-trailer — that said, container &amp; intermodal, agricultural haulers, and new carriers.
          </p>

          <div className="mt-8">
            <Link href="/coverages" className="btn-ghost">
              View All Coverages
            </Link>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Why Trux */}
      <section className="section sand-band">
        <div className="container">
          <span className="eyebrow">Why Trux</span>
          <div className="tick mt-4"></div>
          <h2 className="mt-4 mb-12">Trucking insurance is the only thing we do.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <span className="serif-numeral">01</span>
              <h3 className="mt-2 mb-3">Specialized</h3>
              <p className="font-sans text-[15px] text-muted-custom">
                Motor carriers are all we insure — authority, filings, cargo, physical damage, and the underwriting you need measured against one familiar ground.
              </p>
            </div>
            <div>
              <span className="serif-numeral">02</span>
              <h3 className="mt-2 mb-3">Marketed once, the right way</h3>
              <p className="font-sans text-[15px] text-muted-custom">
                Shopping one account to the same carriers through several agents blocks your risk. We market your account once, to the carriers that fit your risk.
              </p>
            </div>
            <div>
              <span className="serif-numeral">03</span>
              <h3 className="mt-2 mb-3">Total cost of risk</h3>
              <p className="font-sans text-[15px] text-muted-custom">
                Coverage, compliance, and claims handling — not just a number. We show you what works for your trucking and make the case, then stand behind it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* A-Rated Markets */}
      <section className="section bg-paper">
        <div className="container">
          <span className="eyebrow">Markets</span>
          <div className="tick mt-4"></div>
          <h2 className="mt-4 mb-6">A-rated, specialist trucking markets.</h2>
          <p className="font-sans text-[16px] text-muted-custom max-w-2xl mb-8">
            We represent carriers with sound financial ratings from A.M. Best and Standard &amp; Poor's, with real commitments to the motor carrier industry — specialized programs, loss control systems, and claims procedures built around how fleets actually run.
          </p>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <span className="font-serif text-[32px] font-medium text-ink">A++</span>
              <p className="font-sans text-[12px] text-taupe uppercase tracking-wider mt-1">Superior</p>
            </div>
            <div className="text-center">
              <span className="font-serif text-[32px] font-medium text-ink">A</span>
              <p className="font-sans text-[12px] text-taupe uppercase tracking-wider mt-1">Excellent</p>
            </div>
            <div className="text-center">
              <span className="font-serif text-[32px] font-medium text-ink">A-</span>
              <p className="font-sans text-[12px] text-taupe uppercase tracking-wider mt-1">Excellent</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Licensed States Map */}
      <section className="section bg-paper">
        <div className="container">
          <span className="eyebrow">Where We Operate</span>
          <div className="tick mt-4"></div>
          <h2 className="mt-4 mb-4">Licensed in 21 states — and growing.</h2>
          <p className="font-sans text-[16px] text-muted-custom max-w-2xl mb-8">
            Trux Insurance Services is licensed to place commercial trucking coverage in the following states. If your authority operates in any of these states, we can help.
          </p>
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1">
              <img
                src="/manus-storage/us-state-map-abbreviations_0ad32b5b.png"
                alt="US map showing 21 states where Trux Insurance Services is licensed, highlighted in purple"
                className="w-full h-auto"
              />
            </div>
            <div className="lg:w-[320px]">
              <h3 className="text-[18px] mb-4">States licensed</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {[
                  { name: "Arizona", slug: "arizona" }, { name: "Colorado", slug: "colorado" },
                  { name: "Florida", slug: "florida" }, { name: "Georgia", slug: "georgia" },
                  { name: "Illinois", slug: "illinois" }, { name: "Indiana", slug: "indiana" },
                  { name: "Iowa", slug: "iowa" }, { name: "Kentucky", slug: "kentucky" },
                  { name: "Michigan", slug: "michigan" }, { name: "Minnesota", slug: "minnesota" },
                  { name: "Mississippi", slug: "mississippi" }, { name: "Missouri", slug: "missouri" },
                  { name: "Nevada", slug: "nevada" }, { name: "North Carolina", slug: "north-carolina" },
                  { name: "Ohio", slug: "ohio" }, { name: "Pennsylvania", slug: "pennsylvania" },
                  { name: "South Carolina", slug: "south-carolina" }, { name: "Tennessee", slug: "tennessee" },
                  { name: "Texas", slug: "texas" }, { name: "Virginia", slug: "virginia" },
                  { name: "Wisconsin", slug: "wisconsin" }
                ].map((state) => (
                  <Link key={state.slug} href={`/states/${state.slug}`} className="font-sans text-[14px] text-muted-custom border-b border-[var(--hair)] pb-1.5 flex items-center gap-1.5 no-underline hover:text-ink transition-colors">
                    <span className="text-purple text-[10px]">&#9632;</span> {state.name}
                  </Link>
                ))}
              </div>
              <p className="font-sans text-[13px] text-taupe mt-6 italic">
                Expanding to additional states — contact us if yours isn't listed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Client Center */}
      <section className="section sand-band">
        <div className="container">
          <span className="eyebrow">Client Center</span>
          <div className="tick mt-4"></div>
          <h2 className="mt-4 mb-12">Manage your policies, day or night.</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Policy Information", desc: "View your policies, coverages, and limits in one place.", icon: FileText },
              { num: "02", title: "Documents & ID Cards", desc: "Download policy documents and auto ID cards instantly.", icon: FileText },
              { num: "03", title: "Report a Claim", desc: "Start a claim and reach the carriers reporting line fast.", icon: AlertTriangle },
              { num: "04", title: "Certificates 24/7", desc: "Request and issue COIs from the self-service portal.", icon: Shield },
            ].map((item) => (
              <div key={item.num} className="bg-paper p-6 border border-[var(--hair)]">
                <span className="serif-numeral">{item.num}</span>
                <h3 className="mt-2 mb-2 text-[18px]">{item.title}</h3>
                <p className="font-sans text-[14px] text-muted-custom">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <a href="/client-center" className="btn-solid">
              Visit Client Center
            </a>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Referral Partners */}
      <section className="section bg-paper">
        <div className="container">
          <span className="eyebrow">Partners</span>
          <div className="tick mt-4"></div>
          <h2 className="mt-4 mb-8">The people who help your business roll.</h2>
          <p className="font-sans text-[15px] text-muted-custom mb-10 max-w-2xl">
            Trusted partners across factoring, ELD, compliance, and startups.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Bizee", desc: "LLC formation and business startup for new owner-operators." },
              { name: "Blue Ink Tech", desc: "ELD and compliance tools at a partner discount." },
              { name: "Motive", desc: "Fleet telematics and safety, discounted for clients." },
              { name: "RTS", desc: "Same-day freight factoring and fuel card savings." },
            ].map((partner) => (
              <div key={partner.name} className="border border-[var(--hair)] p-5 bg-paper-2">
                <h3 className="text-[16px] font-sans font-medium text-ink mb-2">{partner.name}</h3>
                <p className="font-sans text-[13px] text-muted-custom">{partner.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="section bg-[#1A1A1A] text-center">
        <div className="container">
          <div className="tick mx-auto" style={{ backgroundColor: "var(--purple)" }}></div>
          <span className="eyebrow text-[#9E9A95] mt-4 block">Let's get you covered</span>
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
