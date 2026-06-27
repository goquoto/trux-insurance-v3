import { Link, useParams } from "wouter";
import Layout from "@/components/Layout";

interface CoverageData {
  title: string;
  eyebrow: string;
  subtitle: string;
  description: string[];
  specs: { label: string; value: string }[];
  endorsements: { included: string[]; excluded: string[] };
  related: { slug: string; title: string }[];
}

const coverageData: Record<string, CoverageData> = {
  "auto-liability": {
    title: "Commercial Auto Liability",
    eyebrow: "Auto Liability",
    subtitle: "The coverage your authority is built on — and the filings, limits, and broadening endorsements that make it a real program.",
    description: [
      "Commercial Auto Liability responds when your operation is legally responsible for bodily injury or property damage arising out of a covered vehicle. For motor carriers it's the line your MCS-90 and state filings attach to, and the foundation underwriters price the rest of your account against.",
      "A strong AL program includes limits that satisfy your authority, hired and non-owned coverage for vehicles you don't own, and blanket endorsements that keep certificates flowing without constant policy changes.",
    ],
    specs: [
      { label: "Typical limit", value: "$1M CSL" },
      { label: "Who it's for", value: "All authorities" },
      { label: "Pairs with", value: "PD · Cargo · GL" },
      { label: "Rating basis", value: "Mileage or scheduled" },
      { label: "Filings", value: "MCS-90 as required" },
    ],
    endorsements: {
      included: ["Broadened pollution (CA 9948) where required", "Trailer interchange / non-owned trailer", "Hired & Non-Owned Auto"],
      excluded: ["Punitive damages (where state-permitted)", "Radius restriction", "Driver exclusions per guidelines"],
    },
    related: [
      { slug: "physical-damage", title: "Physical Damage" },
      { slug: "cargo", title: "Motor Truck Cargo" },
      { slug: "general-liability", title: "General Liability" },
      { slug: "trailer-interchange", title: "Trailer Interchange" },
      { slug: "excess-umbrella", title: "Excess / Umbrella" },
    ],
  },
  "physical-damage": {
    title: "Physical Damage",
    eyebrow: "Physical Damage",
    subtitle: "Comprehensive and collision protection for your power units and trailers — keeping your equipment on the road.",
    description: [
      "Physical Damage coverage protects your trucks and trailers against loss from collision, comprehensive perils (fire, theft, vandalism, weather), and sometimes additional causes of loss like mechanical breakdown.",
      "Valuation options include agreed value, stated amount, and actual cash value. The right choice depends on the age and condition of your equipment and how quickly you need to be back on the road after a total loss.",
    ],
    specs: [
      { label: "Valuation", value: "Agreed / Stated / ACV" },
      { label: "Deductibles", value: "$1,000 – $5,000" },
      { label: "Who it's for", value: "All equipment owners" },
      { label: "Pairs with", value: "AL · Cargo · TI" },
      { label: "Rating basis", value: "Vehicle value" },
    ],
    endorsements: {
      included: ["Towing & labor", "Rental reimbursement", "Gap coverage"],
      excluded: ["Wear and tear", "Mechanical breakdown (unless endorsed)", "Intentional damage"],
    },
    related: [
      { slug: "auto-liability", title: "Commercial Auto Liability" },
      { slug: "cargo", title: "Motor Truck Cargo" },
      { slug: "trailer-interchange", title: "Trailer Interchange" },
    ],
  },
  "cargo": {
    title: "Motor Truck Cargo",
    eyebrow: "Cargo",
    subtitle: "Protects the freight you haul against loss or damage in transit — the shipper's peace of mind and your contractual obligation.",
    description: [
      "Motor Truck Cargo insurance covers the goods you transport for others against physical loss or damage while in your care, custody, and control. Most broker and shipper contracts require a minimum of $100,000 in cargo coverage, and many require $250,000 or more.",
      "Coverage can be tailored for general commodities, refrigerated goods, hazmat, household goods, and high-value freight. Endorsements address loading/unloading, debris removal, and earned freight charges.",
    ],
    specs: [
      { label: "Typical limit", value: "$100K – $250K" },
      { label: "Who it's for", value: "For-hire carriers" },
      { label: "Pairs with", value: "AL · PD · Reefer" },
      { label: "Rating basis", value: "Commodity & radius" },
      { label: "Deductible", value: "$1,000 – $5,000" },
    ],
    endorsements: {
      included: ["Refrigeration breakdown", "Loading/unloading", "Debris removal"],
      excluded: ["Mysterious disappearance", "Inherent vice", "Shipper-packed containers (unless endorsed)"],
    },
    related: [
      { slug: "auto-liability", title: "Commercial Auto Liability" },
      { slug: "physical-damage", title: "Physical Damage" },
      { slug: "pollution-liability", title: "Pollution Liability" },
    ],
  },
  "general-liability": {
    title: "General Liability",
    eyebrow: "General Liability",
    subtitle: "Premises and operations coverage for your terminal, yard, and office.",
    description: [
      "Commercial General Liability covers third-party bodily injury and property damage arising from your premises, operations, and products/completed operations. For trucking companies, this typically covers your terminal, yard, office, and loading dock exposures.",
      "CGL is often required by landlords, shippers, and brokers in addition to your auto liability coverage.",
    ],
    specs: [
      { label: "Typical limit", value: "$1M / $2M" },
      { label: "Who it's for", value: "All operations" },
      { label: "Pairs with", value: "AL · Umbrella" },
      { label: "Rating basis", value: "Payroll / revenue" },
      { label: "Deductible", value: "Varies" },
    ],
    endorsements: {
      included: ["Additional insured", "Waiver of subrogation", "Primary & non-contributory"],
      excluded: ["Auto liability (separate policy)", "Professional services", "Pollution (separate policy)"],
    },
    related: [
      { slug: "auto-liability", title: "Commercial Auto Liability" },
      { slug: "excess-umbrella", title: "Excess / Umbrella" },
      { slug: "workers-compensation", title: "Workers' Compensation" },
    ],
  },
  "non-trucking": {
    title: "Non-Trucking Liability",
    eyebrow: "Non-Trucking",
    subtitle: "Also called bobtail or deadhead coverage — protects you when the truck is not under dispatch.",
    description: [
      "Non-Trucking Liability (NTL) provides liability coverage for owner-operators when their truck is being used for non-business purposes or when not under dispatch from a motor carrier. This fills the gap between the motor carrier's primary auto liability and your personal use of the vehicle.",
      "If you're leased to a carrier, their insurance covers you while under dispatch. NTL covers you during personal use — driving home, running errands, or deadheading without a load assignment.",
    ],
    specs: [
      { label: "Typical limit", value: "$1M CSL" },
      { label: "Who it's for", value: "Leased owner-operators" },
      { label: "Pairs with", value: "PD · OA" },
      { label: "Rating basis", value: "Per unit" },
      { label: "Deductible", value: "N/A" },
    ],
    endorsements: {
      included: ["Medical payments", "Uninsured motorist"],
      excluded: ["While under dispatch", "Business use", "Hauling freight"],
    },
    related: [
      { slug: "auto-liability", title: "Commercial Auto Liability" },
      { slug: "physical-damage", title: "Physical Damage" },
      { slug: "occupational-accident", title: "Occupational Accident" },
    ],
  },
  "trailer-interchange": {
    title: "Trailer Interchange",
    eyebrow: "Trailer Interchange",
    subtitle: "Physical damage coverage for trailers you pull under a trailer interchange agreement.",
    description: [
      "Trailer Interchange coverage provides physical damage protection for trailers that are not owned by you but are in your possession under a written trailer interchange agreement. This is commonly required in intermodal and drayage operations.",
      "Without this coverage, you would be personally liable for damage to trailers belonging to others while they are in your care, custody, and control under the interchange agreement.",
    ],
    specs: [
      { label: "Typical limit", value: "$50K – $100K per trailer" },
      { label: "Who it's for", value: "Intermodal / drayage" },
      { label: "Pairs with", value: "AL · PD · Cargo" },
      { label: "Rating basis", value: "Number of trailers" },
      { label: "Deductible", value: "$1,000 – $2,500" },
    ],
    endorsements: {
      included: ["Broadened perils", "Refrigeration units"],
      excluded: ["Wear and tear", "Mechanical breakdown", "Pre-existing damage"],
    },
    related: [
      { slug: "auto-liability", title: "Commercial Auto Liability" },
      { slug: "physical-damage", title: "Physical Damage" },
      { slug: "cargo", title: "Motor Truck Cargo" },
    ],
  },
  "occupational-accident": {
    title: "Occupational Accident",
    eyebrow: "Occupational Accident",
    subtitle: "Accident and disability benefits for owner-operators and independent contractors.",
    description: [
      "Occupational Accident insurance provides accident medical expense, disability income, and accidental death benefits to independent contractors and owner-operators who are not eligible for workers' compensation coverage.",
      "Many motor carriers require their leased owner-operators to carry OA coverage as a condition of their lease agreement. It protects both the driver and the carrier from catastrophic injury costs.",
    ],
    specs: [
      { label: "Medical limit", value: "$500K – $1M" },
      { label: "Who it's for", value: "Independent contractors" },
      { label: "Pairs with", value: "NTL · PD" },
      { label: "Rating basis", value: "Per driver" },
      { label: "Disability", value: "Weekly benefit" },
    ],
    endorsements: {
      included: ["Passenger coverage", "Non-occupational coverage"],
      excluded: ["Pre-existing conditions", "Intentional acts", "Drug/alcohol related"],
    },
    related: [
      { slug: "non-trucking", title: "Non-Trucking Liability" },
      { slug: "workers-compensation", title: "Workers' Compensation" },
      { slug: "physical-damage", title: "Physical Damage" },
    ],
  },
  "workers-compensation": {
    title: "Workers' Compensation",
    eyebrow: "Workers' Comp",
    subtitle: "Statutory coverage for employee injuries on the job — required in nearly every state.",
    description: [
      "Workers' Compensation provides medical benefits, disability income, and death benefits to employees who are injured or become ill as a result of their employment. It is required by law in nearly every state for businesses with employees.",
      "For trucking companies, workers' comp covers drivers, mechanics, dispatchers, and office staff. Rates are based on payroll and classification codes specific to the trucking industry.",
    ],
    specs: [
      { label: "Coverage", value: "Statutory limits" },
      { label: "Who it's for", value: "All employers" },
      { label: "Pairs with", value: "GL · Umbrella" },
      { label: "Rating basis", value: "Payroll by class" },
      { label: "Experience mod", value: "Affects premium" },
    ],
    endorsements: {
      included: ["Employers liability", "Voluntary compensation", "All-states coverage"],
      excluded: ["Independent contractors", "Sole proprietors (in most states)", "Intentional acts"],
    },
    related: [
      { slug: "general-liability", title: "General Liability" },
      { slug: "occupational-accident", title: "Occupational Accident" },
      { slug: "excess-umbrella", title: "Excess / Umbrella" },
    ],
  },
  "excess-umbrella": {
    title: "Excess / Umbrella",
    eyebrow: "Excess / Umbrella",
    subtitle: "Additional limits above your primary policies — often required by shippers and brokers.",
    description: [
      "Excess and Umbrella liability provides additional limits above your primary auto liability, general liability, and employers liability policies. Many shippers, brokers, and contracts require $2M, $5M, or even $10M in total limits.",
      "An umbrella policy can also provide broader coverage than the underlying policies in some cases, filling gaps that the primary policies don't cover.",
    ],
    specs: [
      { label: "Typical limit", value: "$2M – $10M" },
      { label: "Who it's for", value: "All carriers" },
      { label: "Pairs with", value: "AL · GL · WC" },
      { label: "Rating basis", value: "Underlying exposure" },
      { label: "Retention", value: "$0 – $10,000" },
    ],
    endorsements: {
      included: ["Follow-form coverage", "Defense costs outside limits"],
      excluded: ["Punitive damages (some states)", "Criminal acts", "Contractual liability (some)"],
    },
    related: [
      { slug: "auto-liability", title: "Commercial Auto Liability" },
      { slug: "general-liability", title: "General Liability" },
      { slug: "workers-compensation", title: "Workers' Compensation" },
    ],
  },
  "pollution-liability": {
    title: "Pollution Liability",
    eyebrow: "Pollution",
    subtitle: "Coverage for environmental cleanup costs and third-party damages from a pollution event.",
    description: [
      "Pollution Liability coverage responds to environmental cleanup costs and third-party bodily injury or property damage resulting from a pollution condition caused by your trucking operations.",
      "Standard auto liability policies exclude pollution events. If you haul hazardous materials or operate in environmentally sensitive areas, this coverage fills a critical gap.",
    ],
    specs: [
      { label: "Typical limit", value: "$1M / $2M" },
      { label: "Who it's for", value: "Hazmat haulers" },
      { label: "Pairs with", value: "AL · Cargo · GL" },
      { label: "Rating basis", value: "Commodity & radius" },
      { label: "Deductible", value: "$5,000 – $25,000" },
    ],
    endorsements: {
      included: ["Transportation pollution", "Loading/unloading", "Emergency response"],
      excluded: ["Known conditions", "Intentional discharge", "Nuclear/radioactive"],
    },
    related: [
      { slug: "auto-liability", title: "Commercial Auto Liability" },
      { slug: "cargo", title: "Motor Truck Cargo" },
      { slug: "general-liability", title: "General Liability" },
    ],
  },
};

export default function CoverageDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "auto-liability";
  const coverage = coverageData[slug];

  if (!coverage) {
    return (
      <Layout>
        <section className="section">
          <div className="container text-center">
            <h1>Coverage not found</h1>
            <p className="mt-4">
              <Link href="/coverages" className="text-purple">← Back to all coverages</Link>
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-paper-2 border-b border-[var(--hair)]">
        <div className="container py-3">
          <nav className="font-sans text-[13px] text-taupe">
            <Link href="/coverages" className="hover:text-purple no-underline text-taupe">Coverages</Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{coverage.title}</span>
          </nav>
        </div>
      </div>

      {/* Page header */}
      <section className="py-16 bg-paper-2">
        <div className="container">
          <span className="eyebrow">{coverage.eyebrow}</span>
          <div className="tick mt-4"></div>
          <h1 className="mt-4 mb-4">{coverage.title}</h1>
          <p className="lead max-w-2xl">{coverage.subtitle}</p>
        </div>
      </section>

      <hr className="hairline" />

      {/* Content */}
      <section className="section bg-paper">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              {coverage.description.map((para, i) => (
                <p key={i} className="font-sans text-[16px] text-muted-custom leading-relaxed mb-6">
                  {para}
                </p>
              ))}

              {/* Spec table */}
              <h3 className="mt-10 mb-4">What a strong program includes</h3>
              <div className="border-t-2 border-ink">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--hair)]">
                      <th className="font-sans text-[12px] uppercase tracking-wider text-ink py-3 text-left font-semibold">Specification</th>
                      <th className="font-sans text-[12px] uppercase tracking-wider text-ink py-3 text-left font-semibold">Your Coverage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coverage.specs.map((spec) => (
                      <tr key={spec.label} className="border-b border-[var(--hair)]">
                        <td className="font-sans text-[14px] font-medium text-ink py-3">{spec.label}</td>
                        <td className="font-sans text-[14px] text-muted-custom py-3">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Endorsements */}
              <h3 className="mt-10 mb-4">Included &amp; excluded endorsements</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {coverage.endorsements.included.map((e) => (
                  <span key={e} className="font-sans text-[13px] text-muted-custom bg-sand px-3 py-1">
                    + {e}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {coverage.endorsements.excluded.map((e) => (
                  <span key={e} className="font-sans text-[13px] text-[var(--warn)] bg-paper-2 px-3 py-1">
                    − {e}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* At a glance */}
              <div className="pull-quote mb-8">
                <h4 className="font-serif text-[18px] text-ink mb-4">At a glance</h4>
                {coverage.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between items-center py-2 border-b border-[var(--hair)]">
                    <span className="font-sans text-[13px] text-muted-custom">{spec.label}</span>
                    <span className="font-sans text-[13px] font-medium text-ink">{spec.value}</span>
                  </div>
                ))}
                <Link href="/quote" className="btn-solid w-full text-center mt-6">
                  Quote {coverage.eyebrow}
                </Link>
              </div>

              {/* Related coverages */}
              <h4 className="font-serif text-[18px] text-ink mb-4">Related coverages</h4>
              <div className="flex flex-wrap gap-2">
                {coverage.related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/coverages/${rel.slug}`}
                    className="font-sans text-[13px] text-muted-custom border border-[var(--hair)] px-3 py-1.5 hover:border-purple hover:text-purple no-underline transition-colors"
                  >
                    {rel.title}
                  </Link>
                ))}
              </div>
            </div>
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
