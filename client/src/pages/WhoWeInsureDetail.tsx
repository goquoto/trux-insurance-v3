import { useParams, Link } from "wouter";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";

interface OperationData {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  coveragesNeeded: string[];
  challenges: { title: string; text: string }[];
  whyTrux: string;
  faq: { question: string; answer: string }[];
}

const operationData: Record<string, OperationData> = {
  "owner-operators": {
    title: "Owner-Operator Insurance",
    subtitle: "Built for single-truck authorities who need lean, complete protection.",
    image: "/manus-storage/insure-owner-operator_edd0dcb1.png",
    description: "As an owner-operator, your truck is your business. A single accident, cargo claim, or downtime event can wipe out months of revenue. You need insurance that covers your specific exposures without the bloated premiums designed for large fleets. At Trux, we build owner-operator programs from the ground up — matching your authority type, commodity, lanes, and equipment to the right markets at the right price.",
    coveragesNeeded: [
      "Auto Liability (required by FMCSA — $750K minimum for general freight, $1M for hazmat)",
      "Physical Damage (comp + collision for your power unit)",
      "Motor Truck Cargo ($100K–$250K typical for general commodities)",
      "Non-Trucking Liability (bobtail coverage when not under dispatch)",
      "Occupational Accident (medical + disability if you're an independent contractor)",
      "Trailer Interchange (if pulling broker or shipper trailers)",
    ],
    challenges: [
      { title: "New Authority Penalties", text: "Carriers under 2 years face limited market access and higher rates. We work with markets that specialize in new ventures and can get you covered from day one." },
      { title: "Tight Cash Flow", text: "We offer monthly payment plans and work with premium finance companies so you're not fronting a full annual premium before your first load." },
      { title: "Lease-On Confusion", text: "Whether you're leased to a carrier or running under your own authority, we clarify exactly what the motor carrier's policy covers — and what gaps you need to fill." },
    ],
    whyTrux: "We don't treat owner-operators as small-fleet afterthoughts. You get a dedicated agent who understands single-truck economics, responds to certificate requests within hours, and fights for the best rate at every renewal.",
    faq: [
      { question: "How much does owner-operator insurance cost?", answer: "Typical annual premiums range from $8,000 to $18,000 depending on your authority age, driving record, equipment value, commodity type, and operating radius. New authorities (under 2 years) generally pay more due to limited loss history." },
      { question: "Do I need my own insurance if I'm leased to a carrier?", answer: "It depends on the lease agreement. Most carriers provide primary auto liability and cargo, but you'll typically need your own physical damage, non-trucking liability, and occupational accident coverage. We review your lease to identify exact gaps." },
      { question: "Can I get insured with a new authority?", answer: "Yes. While many markets won't write new ventures, we work with several carriers that specialize in new authorities. You'll need a clean MVR, CDL experience (typically 2+ years), and a clear business plan." },
      { question: "What's the difference between bobtail and non-trucking liability?", answer: "They're often used interchangeably, but technically non-trucking liability covers personal use of your truck when not under dispatch. Bobtail specifically covers driving without a trailer. Most policies we write combine both under a single non-trucking form." },
    ],
  },
  "small-fleets": {
    title: "Small Fleet Insurance (2–15 Trucks)",
    subtitle: "Scalable programs that grow with your operation.",
    image: "/manus-storage/insure-small-fleet_b8797816.png",
    description: "Small fleets face a unique challenge: you're too big for owner-operator programs but too small to self-insure or command the deepest discounts. You need coverage that scales as you add trucks, hire drivers, and expand into new lanes — without re-quoting your entire program every time. Trux builds small-fleet programs with built-in flexibility, volume pricing that kicks in early, and a single point of contact for your entire operation.",
    coveragesNeeded: [
      "Auto Liability (fleet-rated, with scheduled vehicles)",
      "Physical Damage (blanket or scheduled, with agreed-value options)",
      "Motor Truck Cargo (fleet-wide with commodity-specific sublimits)",
      "General Liability (premises + operations for your yard/office)",
      "Workers' Compensation or Occupational Accident (depending on driver classification)",
      "Hired & Non-Owned Auto (for drivers using personal vehicles on company business)",
      "Umbrella / Excess Liability (additional limits above primary)",
    ],
    challenges: [
      { title: "Driver Turnover", text: "Adding and removing drivers mid-term is a constant. We set up your policy for easy driver changes with same-day certificate issuance." },
      { title: "Mixed Equipment", text: "Day cabs, sleepers, straight trucks, trailers — we schedule everything under one program instead of piecing together separate policies." },
      { title: "Growth Planning", text: "We structure your program so adding trucks doesn't trigger a full re-underwrite. Predictable costs let you plan expansion with confidence." },
    ],
    whyTrux: "We manage dozens of small fleets and understand the operational rhythm — seasonal volume changes, driver additions, equipment upgrades. Your program is built to flex without surprises.",
    faq: [
      { question: "At what fleet size do I get better rates?", answer: "Most markets offer meaningful discounts starting at 5 power units, with additional breaks at 10 and 15. However, your loss history and driver quality matter more than unit count alone." },
      { question: "Can I add a truck mid-policy?", answer: "Yes. We add vehicles same-day in most cases. You'll pay pro-rated premium for the remaining policy term, and we issue updated certificates immediately." },
      { question: "Do I need workers' comp if my drivers are independent contractors?", answer: "If drivers are truly 1099 independent contractors (not misclassified employees), you can use Occupational Accident coverage instead. However, many states are tightening IC classification rules — we help you understand your exposure." },
      { question: "What happens to my rates if I have a claim?", answer: "A single claim won't necessarily spike your rates, but frequency matters. We work with you on loss control and driver training to keep your experience mod favorable at renewal." },
    ],
  },
  "large-fleets": {
    title: "Large Fleet Insurance (15+ Trucks)",
    subtitle: "Enterprise programs with layered limits and dedicated support.",
    image: "/manus-storage/insure-large-fleet_d445808f.png",
    description: "Large fleet operations demand sophisticated insurance programs — layered liability towers, fleet-wide deductibles, formal safety programs, and dedicated claims handling. You need a broker who can negotiate directly with underwriters, structure excess layers efficiently, and provide the risk management support that keeps your CSA scores clean and your premiums under control. Trux handles programs from 15 trucks to 200+, placing coverage across multiple A-rated carriers for optimal pricing and capacity.",
    coveragesNeeded: [
      "Primary Auto Liability ($1M–$2M with excess/umbrella layers to $5M+)",
      "Physical Damage (fleet blanket with large deductible options)",
      "Motor Truck Cargo (high-limit with commodity scheduling)",
      "General Liability + Umbrella (layered tower structure)",
      "Workers' Compensation (experience-rated, with safety program credits)",
      "Hired & Non-Owned Auto",
      "Cyber Liability (for ELD/TMS data exposure)",
      "Employment Practices Liability",
      "Directors & Officers (if incorporated)",
    ],
    challenges: [
      { title: "Rate Negotiation", text: "With 15+ units, you have leverage. We go to market annually with a full submission package and negotiate aggressively on your behalf." },
      { title: "Claims Management", text: "We coordinate with adjusters, monitor reserves, and push for timely closures. Open claims drag on your experience mod — we don't let them linger." },
      { title: "Compliance & CSA", text: "We monitor your SAFER scores and help address inspection issues before they affect insurability. Clean scores = better markets = lower premiums." },
    ],
    whyTrux: "We bring the same market access and negotiating power that the mega-brokers offer — but with the responsiveness and personal attention of a specialist agency. Your account gets a dedicated team, not a rotating call center.",
    faq: [
      { question: "Can you handle multi-state fleet programs?", answer: "Yes. We place coverage across all 22 states where we're licensed and coordinate with partner agencies for states outside our footprint. Your fleet gets one cohesive program regardless of where trucks are domiciled." },
      { question: "Do you offer loss control services?", answer: "We connect you with carrier-provided loss control resources including driver training programs, safety audits, and telematics integration guidance. Some carriers offer premium credits for implementing their recommended programs." },
      { question: "How do large deductible programs work?", answer: "Large deductible programs (typically $25K–$100K per occurrence) reduce your premium significantly in exchange for retaining more risk. They work best for fleets with strong safety records and cash reserves to handle smaller claims internally." },
      { question: "What's the renewal process for a large fleet?", answer: "We start 90 days before renewal — gathering updated loss runs, driver lists, equipment schedules, and financials. We submit to multiple markets simultaneously and present you with competing options, not just your incumbent's offer." },
    ],
  },
  "flatbed-haulers": {
    title: "Flatbed Hauler Insurance",
    subtitle: "Open-deck specialists need coverage as specialized as their loads.",
    image: "/manus-storage/insure-flatbed_715b14b5.png",
    description: "Flatbed operations face exposures that enclosed-trailer carriers never encounter: load securement failures, shifting cargo, wind damage to uncovered freight, and the liability of hauling oversize and overweight loads on public roads. Your cargo coverage needs to address these specific risks, and your liability limits need to account for the high-value commodities flatbeds typically carry — steel, lumber, machinery, and construction materials. Trux understands flatbed operations inside and out.",
    coveragesNeeded: [
      "Auto Liability (with oversize/overweight endorsements where needed)",
      "Physical Damage (including tarps and securement equipment)",
      "Motor Truck Cargo (with specific coverage for shifting, falling, and wind damage)",
      "General Liability (job-site delivery exposure)",
      "Excess Liability (high-value loads demand higher limits)",
      "Trailer Interchange (if pulling broker trailers)",
    ],
    challenges: [
      { title: "Cargo Securement Claims", text: "Improperly secured loads are the #1 claim type for flatbeds. We ensure your cargo policy covers securement failures and work with you on driver training to reduce frequency." },
      { title: "High-Value Commodities", text: "Steel coils, heavy machinery, and construction equipment can exceed standard cargo limits. We structure sublimits by commodity type to ensure adequate coverage." },
      { title: "Oversize/Overweight Permits", text: "Operating under special permits creates additional liability exposure. We make sure your policy doesn't exclude permitted oversize loads." },
    ],
    whyTrux: "We've insured flatbed operations hauling everything from rebar to wind turbine blades. We know which markets write open-deck risks competitively and which exclusions to watch for in cargo forms.",
    faq: [
      { question: "Does standard cargo insurance cover load securement failures?", answer: "Not always. Some cargo forms exclude losses caused by improper securement. We specifically verify that your policy covers shifting, falling, and blowing cargo — the most common flatbed loss scenarios." },
      { question: "Do I need special coverage for oversize loads?", answer: "Yes. Standard auto liability policies may exclude or limit coverage for loads requiring special permits. We add endorsements that specifically cover oversize/overweight operations." },
      { question: "Are tarps and securement equipment covered?", answer: "Under physical damage coverage, yes — but there may be sublimits. We typically schedule tarps, chains, binders, and straps as covered equipment with adequate limits." },
      { question: "What cargo limits do flatbed haulers typically carry?", answer: "Most flatbed operators carry $100K–$250K in cargo coverage, but steel haulers and machinery movers often need $500K+. We match your limit to your highest-value typical load." },
    ],
  },
  "reefer-carriers": {
    title: "Refrigerated Carrier Insurance",
    subtitle: "Cold-chain coverage for temperature-sensitive freight.",
    image: "/manus-storage/insure-reefer_3975e1ae.png",
    description: "Refrigerated carriers face a unique and expensive exposure: a single reefer unit failure can destroy an entire trailer of perishable goods worth $50,000–$200,000+. Standard cargo policies often exclude or limit coverage for spoilage and temperature deviation. You need a program specifically designed for cold-chain logistics — covering mechanical breakdown, temperature excursion, contamination, and the consequential damages that follow a spoilage event. Trux places reefer programs with markets that understand these risks.",
    coveragesNeeded: [
      "Auto Liability",
      "Physical Damage (including the reefer unit itself)",
      "Motor Truck Cargo with Reefer Breakdown endorsement",
      "Spoilage / Temperature Deviation coverage",
      "Contamination coverage (cross-contamination between loads)",
      "General Liability",
      "Equipment Breakdown (for the refrigeration unit)",
    ],
    challenges: [
      { title: "Spoilage Claims", text: "Reefer breakdown is the most expensive single-event claim in trucking. We ensure your cargo form explicitly covers mechanical failure of the refrigeration unit — not just external temperature events." },
      { title: "Compliance Documentation", text: "Temperature logging and pre-trip inspections are critical for defending claims. We advise on documentation practices that protect you when a shipper alleges temperature deviation." },
      { title: "High Cargo Values", text: "Pharmaceutical, seafood, and specialty food loads can exceed $200K per trailer. We structure limits and deductibles appropriate to your commodity mix." },
    ],
    whyTrux: "We know which cargo forms actually cover reefer breakdown (many don't) and which markets offer competitive rates for temperature-controlled operations. No surprises at claim time.",
    faq: [
      { question: "Does standard cargo insurance cover spoilage?", answer: "Usually not adequately. Most standard cargo forms exclude or severely sublimit spoilage losses. You need a specific reefer breakdown/spoilage endorsement that covers mechanical failure of the refrigeration unit." },
      { question: "What if the shipper claims my reefer failed but my logs show proper temperature?", answer: "This is why documentation matters. Continuous temperature monitoring with GPS-linked data provides defensible evidence. We advise all reefer clients to maintain electronic temperature logs for every load." },
      { question: "How much cargo coverage do reefer carriers need?", answer: "It depends on your commodity. General produce haulers typically carry $100K–$150K. Pharmaceutical, seafood, or specialty food carriers may need $250K–$500K. We match your limit to your highest-value typical load." },
      { question: "Is my reefer unit covered under physical damage?", answer: "The reefer unit should be scheduled as part of your trailer's physical damage coverage. We ensure the stated value includes the refrigeration unit, not just the trailer shell." },
    ],
  },
  "dump-trucks": {
    title: "Dump Truck & Aggregate Insurance",
    subtitle: "Construction-site coverage for single trucks through full fleets.",
    image: "/manus-storage/insure-dump-truck_1481bd4e.png",
    description: "Dump truck operations live at the intersection of trucking and construction — and the insurance needs to cover both worlds. You face highway liability, job-site property damage, gravel-scatter claims, and the unique exposures of operating heavy equipment in active construction zones. Whether you run a single tri-axle or a fleet of end-dumps and belly-dumps, Trux builds programs that cover your full operational exposure without construction-industry pricing surprises.",
    coveragesNeeded: [
      "Auto Liability (with construction-zone endorsements)",
      "Physical Damage (heavy equipment valuation)",
      "General Liability (job-site operations, completed operations)",
      "Motor Truck Cargo (aggregate/material hauling)",
      "Workers' Compensation (construction class codes)",
      "Umbrella / Excess Liability",
      "Inland Marine (for ancillary equipment — loaders, conveyors)",
    ],
    challenges: [
      { title: "Job-Site Liability", text: "Operating on active construction sites creates premises liability exposure beyond standard trucking. We ensure your GL policy covers job-site operations and completed operations." },
      { title: "Gravel-Scatter Claims", text: "Windshield damage claims from loose aggregate are frequent and expensive in aggregate. We structure your program to handle this high-frequency, low-severity exposure efficiently." },
      { title: "Seasonal Operations", text: "Many dump operations are seasonal. We work with markets that offer lay-up credits during winter months so you're not paying full premium on parked equipment." },
    ],
    whyTrux: "We understand that dump trucks aren't just 'trucks' — they're construction equipment that happens to drive on public roads. We place coverage with markets that rate dump operations fairly, not as high-risk outliers.",
    faq: [
      { question: "Do I need both trucking and construction insurance?", answer: "Typically yes. Your auto liability covers highway operations, but you need general liability with construction-specific endorsements for job-site work. We package both under one program for simplicity." },
      { question: "How are dump trucks rated differently from OTR trucks?", answer: "Dump trucks are typically rated by radius (local vs. intermediate), gross vehicle weight, and whether they operate on public roads only or also on job sites. Local-only operations generally get better rates than those with highway exposure." },
      { question: "Can I get lay-up credits in the off-season?", answer: "Yes, many carriers offer lay-up provisions that reduce your premium during months when equipment is parked. You maintain comprehensive coverage but suspend collision and liability. We build this into your program structure." },
      { question: "What about my loader or other equipment?", answer: "Ancillary equipment like front-end loaders, conveyors, and screening plants are covered under inland marine or contractor's equipment policies — separate from your truck insurance. We can package everything together." },
    ],
  },
  "hazmat-carriers": {
    title: "Hazmat Carrier Insurance",
    subtitle: "Elevated limits and pollution coverage for hazardous materials transport.",
    image: "/manus-storage/insure-hazmat_16fc6906.png",
    description: "Hauling hazardous materials — whether fuel, chemicals, explosives, or radioactive materials — requires insurance programs that most agencies can't place. FMCSA mandates $1M–$5M in liability depending on the commodity, and you need pollution liability, environmental cleanup coverage, and markets willing to write hazmat risks at competitive rates. Trux works with the limited number of carriers that actively underwrite hazmat operations and negotiates coverage that meets regulatory requirements without excessive pricing.",
    coveragesNeeded: [
      "Auto Liability ($1M–$5M depending on commodity class)",
      "Pollution Liability / Environmental Cleanup",
      "Motor Truck Cargo (hazmat-specific forms)",
      "Physical Damage",
      "General Liability with Pollution extension",
      "Umbrella / Excess Liability (high-limit towers)",
      "Workers' Compensation (hazmat class codes)",
    ],
    challenges: [
      { title: "Limited Markets", text: "Few carriers write hazmat risks. We maintain relationships with the specialized markets that do — and know exactly what underwriting information they need to quote competitively." },
      { title: "Regulatory Compliance", text: "FMCSA requires different minimum limits based on commodity type. We ensure your limits meet or exceed requirements for every commodity you're authorized to haul." },
      { title: "Pollution Exposure", text: "A spill or release event can generate cleanup costs in the millions. Standard auto liability doesn't cover environmental remediation — you need dedicated pollution coverage." },
    ],
    whyTrux: "Hazmat placement requires deep market knowledge and strong carrier relationships. We've placed coverage for fuel haulers, chemical tankers, and dry-van hazmat operations — and we know which markets offer the best terms for each commodity class.",
    faq: [
      { question: "What liability limits does FMCSA require for hazmat?", answer: "It depends on the commodity: $1M for most hazmat, $5M for certain highly hazardous materials (poison gas, radioactive materials, large-quantity explosives). Many shippers require $2M–$5M regardless of the FMCSA minimum." },
      { question: "Is pollution liability included in my auto policy?", answer: "No. Standard auto liability policies exclude pollution and environmental cleanup costs. You need a separate pollution liability policy or a specific endorsement that covers cleanup, remediation, and third-party bodily injury from a release event." },
      { question: "Can I haul both hazmat and non-hazmat loads on the same policy?", answer: "Yes. We structure policies that cover your full operation — hazmat and non-hazmat loads — under one program. The hazmat exposure is rated separately but doesn't require a separate policy." },
      { question: "What happens if I have a spill?", answer: "Your pollution liability policy covers cleanup costs, third-party property damage, and bodily injury claims from the release. We also help you develop a spill response plan and connect you with environmental response contractors." },
    ],
  },
  "hotshot-trucking": {
    title: "Hot-Shot Trucking Insurance",
    subtitle: "Expedited freight coverage for gooseneck and non-CDL operations.",
    image: "/manus-storage/insure-hotshot_1c612c76.png",
    description: "Hot-shot trucking — running expedited freight on gooseneck trailers behind heavy-duty pickups — falls into an insurance gray zone that confuses most agencies. Your dually isn't a personal vehicle, but it's not a traditional Class 8 tractor either. You need commercial auto coverage that recognizes your equipment as a business unit, cargo coverage for the high-value expedited freight you haul, and an agent who understands the non-CDL trucking space. Trux writes hot-shot programs that cover your full operation without forcing you into traditional trucking rates.",
    coveragesNeeded: [
      "Commercial Auto Liability (business use of pickup + trailer)",
      "Physical Damage (truck + gooseneck trailer)",
      "Motor Truck Cargo ($50K–$150K typical for hot-shot)",
      "Non-Trucking Liability (if leased to a carrier)",
      "General Liability (if operating under own authority)",
      "Occupational Accident (for independent contractors)",
    ],
    challenges: [
      { title: "Equipment Classification", text: "Many carriers don't know how to rate a pickup-and-gooseneck combo. We work with markets that specifically underwrite hot-shot equipment and rate it appropriately — not as a Class 8 tractor." },
      { title: "Authority vs. Lease-On", text: "Hot-shot operators frequently switch between running under their own authority and leasing onto carriers. We structure coverage that works in both scenarios." },
      { title: "Cargo Valuation", text: "Hot-shot loads are often high-value, time-sensitive freight. We ensure your cargo limits match the value of what you're actually hauling — not a generic minimum." },
    ],
    whyTrux: "We've written hundreds of hot-shot policies and know exactly which markets understand the non-CDL trucking space. You won't get bounced between personal auto and commercial trucking departments — we place you correctly from day one.",
    faq: [
      { question: "Do I need a CDL for hot-shot trucking insurance?", answer: "Not necessarily. If your GVWR is under 26,001 lbs, you don't need a CDL — but you still need commercial auto insurance. We write policies for both CDL and non-CDL hot-shot operations." },
      { question: "Can I use my personal pickup for hot-shot?", answer: "You need commercial auto coverage on the vehicle. Personal auto policies exclude business use, especially for-hire freight hauling. We convert your pickup to a commercial policy that still allows personal use." },
      { question: "How much does hot-shot insurance cost?", answer: "Typical annual premiums range from $5,000 to $12,000 for a single truck-and-trailer combo, depending on your authority age, driving record, cargo type, and operating radius." },
      { question: "What cargo limits do hot-shot carriers need?", answer: "Most hot-shot operators carry $50K–$100K in cargo coverage. If you haul machinery, oil field equipment, or other high-value freight, you may need $150K–$250K. We match your limit to your typical load values." },
    ],
  },
  "intermodal-drayage": {
    title: "Intermodal & Drayage Insurance",
    subtitle: "Container hauling coverage for port and rail operations.",
    image: "/manus-storage/insure-intermodal_333e5443.png",
    description: "Intermodal drayage — moving shipping containers between ports, rail yards, and warehouses — creates unique insurance challenges. You're pulling equipment you don't own (steamship line containers), operating in congested port environments, and facing trailer-interchange liability gaps that standard trucking policies don't address. Trux builds drayage programs that cover the specific exposures of container operations, including interchange agreements, port liability, and chassis coverage.",
    coveragesNeeded: [
      "Auto Liability",
      "Physical Damage (for owned chassis and tractors)",
      "Trailer Interchange (critical for drayage — covers containers/chassis in your possession)",
      "Motor Truck Cargo",
      "General Liability",
      "Workers' Compensation",
      "Equipment Floater (for leased chassis)",
    ],
    challenges: [
      { title: "Trailer Interchange Gaps", text: "You're responsible for containers and chassis in your possession under interchange agreements. Standard physical damage doesn't cover non-owned equipment — you need specific trailer interchange coverage." },
      { title: "Port & Terminal Liability", text: "Operating in port environments with cranes, container stacks, and heavy equipment creates additional liability exposure beyond highway operations." },
      { title: "Chassis Damage", text: "Leased and pool chassis are frequently damaged during container operations. Without proper coverage, you're paying out-of-pocket for chassis repairs that aren't your fault." },
    ],
    whyTrux: "We understand the intermodal ecosystem — interchange agreements, chassis pools, port operations, and the specific coverage gaps that drayage carriers face. We build programs that close every gap.",
    faq: [
      { question: "What is trailer interchange coverage?", answer: "Trailer interchange covers physical damage to containers and chassis in your possession under a written interchange agreement. It's essentially 'borrowed equipment' coverage — critical for drayage operators who pull containers they don't own." },
      { question: "Do I need cargo coverage for drayage?", answer: "Yes. Even though you're moving sealed containers, you're liable for cargo damage that occurs during transit. If a container falls, is damaged in an accident, or cargo shifts due to your driving, you're responsible." },
      { question: "How is drayage insurance different from OTR trucking?", answer: "Drayage has shorter hauls but higher frequency, port/terminal exposure, interchange liability for non-owned equipment, and chassis-specific coverage needs. Rates are typically lower per-mile but the coverage structure is more complex." },
      { question: "What limits do I need for trailer interchange?", answer: "Most interchange agreements require $30K–$50K per container/chassis. If you're hauling high-value containers (electronics, pharmaceuticals), you may need higher limits. We review your interchange agreements to determine the right amount." },
    ],
  },
};

export default function WhoWeInsureDetail() {
  const { slug } = useParams<{ slug: string }>();
  const data = operationData[slug || ""];

  if (!data) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-[36px] mb-4">Operation Type Not Found</h1>
          <p className="text-muted-custom mb-8">The operation type you're looking for doesn't exist.</p>
          <Link href="/who-we-insure" className="btn-solid">View All Operation Types</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={data.title}
        description={data.subtitle + " " + data.description.slice(0, 120)}
        type="service"
        serviceName={data.title}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Who We Insure", url: "/who-we-insure" },
          { name: data.title, url: `/who-we-insure/${slug}` },
        ]}
        faq={data.faq}
      />
      <Breadcrumbs items={[
        { label: "Who We Insure", href: "/who-we-insure" },
        { label: data.title },
      ]} />

      {/* Hero */}
      <section className="py-12 md:py-20 border-b border-[var(--hair)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow">WHO WE INSURE</p>
              <div className="tick" />
              <h1 className="text-[32px] md:text-[46px] leading-[1.15] tracking-[-0.01em] mb-4">
                {data.title}
              </h1>
              <p className="font-serif text-[18px] italic text-[var(--taupe)] mb-6">
                {data.subtitle}
              </p>
              <p className="font-sans text-[16px] text-muted-custom leading-relaxed mb-8">
                {data.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/quote" className="btn-solid">Get a Quote</Link>
                <a href="tel:3312401101" className="btn-ghost">Call (331) 240-1101</a>
              </div>
            </div>
            <div>
              <img
                src={data.image}
                alt={`Color pencil illustration for ${data.title}`}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Coverages Needed */}
      <section className="py-12 md:py-16 bg-sand">
        <div className="container">
          <p className="eyebrow">COVERAGES NEEDED</p>
          <div className="tick" />
          <h2 className="text-[26px] md:text-[32px] mb-8">What coverage do you need?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.coveragesNeeded.map((coverage, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-[var(--hair)]">
                <span className="text-purple font-serif font-medium text-[18px] leading-none mt-0.5">✓</span>
                <span className="font-sans text-[15px] text-muted-custom leading-relaxed">{coverage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-12 md:py-16 border-b border-[var(--hair)]">
        <div className="container">
          <p className="eyebrow">CHALLENGES WE SOLVE</p>
          <div className="tick" />
          <h2 className="text-[26px] md:text-[32px] mb-8">Common challenges — and how we handle them</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.challenges.map((challenge, i) => (
              <div key={i} className="border-t-2 border-[var(--purple)] pt-6">
                <h3 className="font-serif text-[19px] font-medium mb-3">{challenge.title}</h3>
                <p className="font-sans text-[15px] text-muted-custom leading-relaxed">{challenge.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trux */}
      <section className="py-12 md:py-16 border-b border-[var(--hair)]">
        <div className="container">
          <div className="max-w-3xl border-l-[5px] border-[var(--purple)] pl-8 py-4">
            <p className="eyebrow mb-4">WHY TRUX</p>
            <p className="font-serif text-[19px] italic text-[var(--taupe)] leading-relaxed">
              "{data.whyTrux}"
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-0">
        <div className="container">
          <FAQSection items={data.faq} title={`${data.title} — FAQ`} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[var(--purple)] text-white">
        <div className="container text-center">
          <h2 className="text-[28px] md:text-[36px] text-white mb-4">
            Ready to get covered?
          </h2>
          <p className="font-sans text-[17px] text-white/80 mb-8 max-w-xl mx-auto">
            Get a custom quote for your operation in minutes. No obligation, no pressure — just straightforward pricing from a trucking specialist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote" className="btn-solid bg-white text-[var(--purple)] hover:bg-white/90 border-white">
              Start Your Quote
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
