import { useState, useMemo } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { Search } from "lucide-react";

const GLOSSARY_TERMS = [
  { term: "Additional Insured", definition: "A person or entity added to an insurance policy that is not the named insured. Common in trucking when brokers or shippers require coverage extension." },
  { term: "Auto Liability", definition: "Coverage that pays for bodily injury and property damage you cause to others while operating a commercial vehicle. Required by FMCSA for interstate carriers." },
  { term: "BASIC", definition: "Behavior Analysis and Safety Improvement Category. The seven categories in FMCSA's CSA program: Unsafe Driving, Hours-of-Service, Driver Fitness, Controlled Substances, Vehicle Maintenance, Hazmat, and Crash Indicator." },
  { term: "Bobtail Insurance", definition: "Coverage for a tractor operating without a trailer attached, typically when the driver is not under dispatch. Different from non-trucking liability." },
  { term: "Broker Bond (BMC-84)", definition: "A $75,000 surety bond required by FMCSA for licensed freight brokers. Protects carriers and shippers if the broker fails to pay." },
  { term: "Cargo Insurance", definition: "Coverage that protects the freight you're hauling against loss or damage from accidents, theft, or other covered perils while in transit." },
  { term: "Certificate of Insurance (COI)", definition: "A document proving you carry specific insurance coverages and limits. Shippers and brokers typically require a COI before tendering freight." },
  { term: "Claims-Made Policy", definition: "A policy that covers claims reported during the policy period, regardless of when the incident occurred. Compare with occurrence-based policies." },
  { term: "CMV", definition: "Commercial Motor Vehicle. Any vehicle used in commerce with a GVWR of 10,001+ lbs, designed to transport 16+ passengers, or used to transport hazardous materials." },
  { term: "Contingent Cargo", definition: "Coverage purchased by freight brokers to protect cargo when the carrier's own cargo policy is insufficient or doesn't respond." },
  { term: "CSA Score", definition: "Compliance, Safety, Accountability. FMCSA's system that quantifies carrier safety performance using inspection and crash data across seven BASICs." },
  { term: "Deadhead", definition: "Operating a truck without a load, typically returning to a terminal or traveling to pick up the next load. Some policies exclude deadhead miles." },
  { term: "Deductible", definition: "The amount you pay out of pocket before insurance kicks in. Higher deductibles typically mean lower premiums." },
  { term: "DOT Number", definition: "A unique identifier assigned by FMCSA to carriers operating in interstate commerce. Required for vehicles over 10,001 lbs GVWR." },
  { term: "ELD", definition: "Electronic Logging Device. Federally mandated device that records hours of service (HOS) for CMV drivers, replacing paper logbooks." },
  { term: "Endorsement", definition: "A written amendment to an insurance policy that adds, removes, or modifies coverage. Also called a rider." },
  { term: "Excess Liability", definition: "Coverage that sits above your primary liability policy, providing additional limits. Kicks in after the underlying policy limit is exhausted." },
  { term: "FMCSA", definition: "Federal Motor Carrier Safety Administration. The federal agency that regulates interstate trucking, including insurance requirements, safety standards, and carrier registration." },
  { term: "General Liability", definition: "Coverage for bodily injury or property damage claims arising from your business operations (not vehicle-related). Covers slip-and-falls at your terminal, advertising injury, etc." },
  { term: "GVWR", definition: "Gross Vehicle Weight Rating. The maximum allowable total weight of a vehicle including cargo, passengers, fuel, and the vehicle itself." },
  { term: "Hired Auto", definition: "Coverage for vehicles you rent, lease, or borrow for business use that aren't listed on your policy." },
  { term: "Interchange Agreement", definition: "A written agreement between a trucker and a trailer owner (usually a railroad or shipping line) allowing the trucker to use the trailer. Requires trailer interchange coverage." },
  { term: "Loss Ratio", definition: "The ratio of claims paid to premiums collected. A 60% loss ratio means $0.60 in claims for every $1.00 in premium. High loss ratios lead to rate increases." },
  { term: "MC Number", definition: "Motor Carrier number. Operating authority issued by FMCSA that authorizes for-hire carriers to transport regulated commodities in interstate commerce." },
  { term: "MCS-90", definition: "An endorsement required by FMCSA on all for-hire carrier policies. Guarantees the insurer will pay liability claims even if the policy would otherwise not cover them." },
  { term: "Named Insured", definition: "The person or entity specifically named on the insurance policy declarations page as the policyholder." },
  { term: "Non-Trucking Liability (NTL)", definition: "Coverage for owner-operators when using their truck for personal purposes while not under dispatch. Also called bobtail coverage, though technically different." },
  { term: "Nuclear Verdict", definition: "A jury award exceeding $10 million in a trucking accident lawsuit. These verdicts have driven up insurance costs industry-wide." },
  { term: "Occupational Accident (Occ/Acc)", definition: "Coverage for independent contractors (owner-operators) who aren't eligible for workers' compensation. Covers medical expenses and lost income from work injuries." },
  { term: "Owner-Operator", definition: "A truck driver who owns their own equipment and operates as an independent contractor, either under their own authority or leased to a carrier." },
  { term: "Physical Damage", definition: "Coverage for damage to your own truck and trailer from collision, fire, theft, vandalism, or weather. Includes comprehensive and collision components." },
  { term: "Premium", definition: "The amount you pay for insurance coverage, typically quoted annually but payable monthly or quarterly." },
  { term: "Primary Liability", definition: "The first layer of liability coverage that responds to a claim. Required minimum is $750,000 for general freight carriers (FMCSA)." },
  { term: "Radius", definition: "The geographic operating area defined in your policy. Local (0-50 mi), intermediate (51-200 mi), or long-haul (200+ mi). Operating outside your radius may void coverage." },
  { term: "Subrogation", definition: "The process where your insurance company recovers money from the at-fault party after paying your claim." },
  { term: "Surplus Lines", definition: "Insurance placed with non-admitted carriers (not licensed in the state) for risks that standard markets won't write. Common for high-risk trucking." },
  { term: "Trailer Interchange", definition: "Coverage for physical damage to trailers you're pulling under a written interchange agreement with the trailer owner." },
  { term: "Umbrella Policy", definition: "Excess liability coverage that sits above multiple underlying policies (auto, GL, employers liability) and may provide broader coverage than the underlying policies." },
  { term: "Underwriting", definition: "The process insurers use to evaluate risk and determine whether to offer coverage, and at what price and terms." },
  { term: "Workers' Compensation", definition: "Statutory coverage that pays medical expenses and lost wages for employees injured on the job. Required in most states for carriers with W-2 employees." },
];

export default function Glossary() {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    let terms = GLOSSARY_TERMS;
    if (search) {
      const q = search.toLowerCase();
      terms = terms.filter(t => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q));
    }
    if (activeLetter) {
      terms = terms.filter(t => t.term[0].toUpperCase() === activeLetter);
    }
    return terms;
  }, [search, activeLetter]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const usedLetters = new Set(GLOSSARY_TERMS.map(t => t.term[0].toUpperCase()));

  return (
    <Layout>
      <SEO
        title="Glossary of Trucking Insurance Terms | Trux Insurance Services"
        description="Plain-language definitions of commercial trucking insurance terms — from auto liability to workers' comp. Understand your policy without the jargon."
        keywords="trucking insurance glossary, commercial truck insurance terms, FMCSA insurance definitions"
      />
      <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: "Glossary of Terms" }]} />

      {/* Hero */}
      <section className="section bg-[var(--sand)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
              <span className="eyebrow">REFERENCE</span>
              <h1 className="mt-3 font-serif text-[36px] md:text-[48px] font-medium text-[var(--head)] leading-[1.15]">
                Glossary of Terms
              </h1>
              <p className="mt-4 font-sans text-[16px] text-[var(--muted)] leading-[1.7] max-w-[560px]">
                Insurance terminology explained in plain language. No jargon, no legalese — just clear definitions for the terms that matter to your operation.
              </p>
            </div>
            <div className="hidden md:block">
              <img
                src="/manus-storage/tool-glossary_68446d25.png"
                alt="Pencil sketch of an open reference book with magnifying glass, representing insurance terminology research"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search + Alphabet */}
      <section className="section">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-[400px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--taupe)]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search terms..."
                className="form-input pl-10 w-full"
              />
            </div>
          </div>

          {/* Alphabet nav */}
          <div className="flex flex-wrap gap-1 mb-8">
            <button
              onClick={() => setActiveLetter(null)}
              className={`w-8 h-8 flex items-center justify-center font-sans text-[12px] font-medium border ${!activeLetter ? 'bg-[var(--ink)] text-white border-[var(--ink)]' : 'border-[var(--hair)] text-[var(--muted)] hover:border-[var(--ink)]'}`}
            >
              All
            </button>
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter === activeLetter ? null : letter)}
                disabled={!usedLetters.has(letter)}
                className={`w-8 h-8 flex items-center justify-center font-sans text-[12px] font-medium border transition-colors ${
                  letter === activeLetter
                    ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                    : usedLetters.has(letter)
                    ? 'border-[var(--hair)] text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]'
                    : 'border-[var(--hair)] text-[var(--hair)] cursor-not-allowed'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Terms */}
          <div className="space-y-0">
            {filteredTerms.map((item) => (
              <div key={item.term} className="border-b border-[var(--hair)] py-5">
                <h3 className="font-serif text-[18px] font-medium text-[var(--head)] mb-2">{item.term}</h3>
                <p className="font-sans text-[14px] text-[var(--muted)] leading-[1.7]">{item.definition}</p>
              </div>
            ))}
            {filteredTerms.length === 0 && (
              <p className="font-sans text-[14px] text-[var(--taupe)] py-8 text-center">
                No terms found matching "{search}"{activeLetter ? ` starting with "${activeLetter}"` : ""}.
              </p>
            )}
          </div>

          <p className="font-sans text-[12px] text-[var(--taupe)] mt-8">
            Showing {filteredTerms.length} of {GLOSSARY_TERMS.length} terms
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[var(--sand)] border-l-4 border-[var(--ink)]">
        <div className="container text-center">
          <h2 className="font-serif text-[24px] md:text-[30px] font-medium text-[var(--head)] leading-[1.2] mb-3">
            Have a question about your coverage?
          </h2>
          <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7] mb-6 max-w-[500px] mx-auto">
            Our team speaks plain English — not insurance jargon. Call us and we'll explain exactly what your policy covers.
          </p>
          <a href="tel:3312401101" className="btn-solid inline-block no-underline">
            Call (331) 240-1101
          </a>
        </div>
      </section>
    </Layout>
  );
}
