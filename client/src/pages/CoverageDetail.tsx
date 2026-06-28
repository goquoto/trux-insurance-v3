import { Link, useParams } from "wouter";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import TrustSignals from "@/components/TrustSignals";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";

interface CoverageData {
  title: string;
  eyebrow: string;
  subtitle: string;
  image: string;
  description: string[];
  whyItMatters: string;
  specs: { label: string; value: string }[];
  endorsements: { included: string[]; excluded: string[] };
  related: { slug: string; title: string }[];
  faq?: { question: string; answer: string }[];
}

const coverageData: Record<string, CoverageData> = {
  "auto-liability": {
    title: "Commercial Auto Liability",
    eyebrow: "Auto Liability",
    image: "/manus-storage/coverage-auto_467c2d30.png",
    subtitle: "The coverage your authority is built on — and the filings, limits, and broadening endorsements that make it a real program.",
    description: [
      "Commercial Auto Liability responds when your operation is legally responsible for bodily injury or property damage arising out of a covered vehicle. For motor carriers it's the line your MCS-90 and state filings attach to, and the foundation underwriters price the rest of your account against.",
      "A strong AL program includes limits that satisfy your authority, hired and non-owned coverage for vehicles you don't own, and blanket endorsements that keep certificates flowing without constant policy changes.",
      "At Trux, we work with specialist trucking markets that understand the nuances of motor carrier liability — from radius endorsements to scheduled vs. blanket coverage. We structure your program so that adding or removing units doesn't require a policy rewrite, and your certificates go out the same day they're requested.",
      "Whether you're running local P&D, regional LTL, or long-haul OTR, the auto liability program is the foundation everything else is built on. We make sure that foundation is solid, competitively priced, and backed by carriers who pay claims without a fight.",
    ],
    whyItMatters: "Without proper auto liability coverage, your authority cannot operate legally. It's not just a regulatory requirement — it's the financial backstop that protects your business, your drivers, and the public every time a truck leaves the yard.",
    specs: [
      { label: "Typical limit", value: "$1M CSL" },
      { label: "Who it's for", value: "All authorities" },
      { label: "Pairs with", value: "PD · Cargo · GL" },
      { label: "Rating basis", value: "Mileage or scheduled" },
      { label: "Filings", value: "MCS-90 as required" },
    ],
    endorsements: {
      included: ["Broadened pollution (CA 9948) where required", "Trailer interchange / non-owned trailer", "Hired & Non-Owned Auto", "MCS-90 endorsement", "Blanket additional insured"],
      excluded: ["Punitive damages (where state-permitted)", "Radius restriction", "Driver exclusions per guidelines"],
    },
    related: [
      { slug: "physical-damage", title: "Physical Damage" },
      { slug: "cargo", title: "Motor Truck Cargo" },
      { slug: "general-liability", title: "General Liability" },
      { slug: "trailer-interchange", title: "Trailer Interchange" },
      { slug: "excess-umbrella", title: "Excess / Umbrella" },
    ],
    faq: [
      { question: "What does commercial auto liability cover?", answer: "It covers bodily injury and property damage to third parties caused by your commercial vehicle. This includes medical expenses, legal defense costs, and settlements when your operation is found at fault in an accident." },
      { question: "What limits do I need for my authority?", answer: "Most for-hire motor carriers need a minimum of $750,000 CSL (Combined Single Limit) per FMCSA requirements. However, many brokers and shippers require $1,000,000. Hazmat carriers typically need $5,000,000." },
      { question: "What is an MCS-90 endorsement?", answer: "The MCS-90 is a federal endorsement required on all for-hire motor carrier policies. It guarantees the public will be compensated for bodily injury or property damage, even if the policy would otherwise not cover the loss." },
      { question: "How is my premium calculated?", answer: "Premiums are based on factors including your authority age, driving record (MVR), number of units, radius of operation, commodities hauled, and claims history. New authorities typically pay more until they establish a clean track record." },
    ],
  },
  "physical-damage": {
    title: "Physical Damage",
    eyebrow: "Physical Damage",
    image: "/manus-storage/coverage-physical-damage_391231f1.png",
    subtitle: "Comprehensive and collision protection for your power units and trailers — keeping your equipment on the road and your investment protected.",
    description: [
      "Physical Damage coverage protects your trucks and trailers against loss from collision, comprehensive perils (fire, theft, vandalism, weather), and sometimes additional causes of loss like mechanical breakdown.",
      "Valuation options include agreed value, stated amount, and actual cash value. The right choice depends on the age and condition of your equipment and how quickly you need to be back on the road after a total loss.",
      "For newer equipment, agreed value coverage ensures you receive the full insured amount without depreciation arguments. For older units, actual cash value may be more cost-effective while still providing meaningful protection against catastrophic loss.",
      "We also structure deductible options strategically — higher deductibles on older units to keep premiums manageable, lower deductibles on newer equipment where out-of-pocket costs would be more painful. Every fleet is different, and cookie-cutter programs leave money on the table.",
    ],
    whyItMatters: "Your trucks are your livelihood. A single total loss without proper physical damage coverage can put an owner-operator out of business overnight. Even for larger fleets, uninsured equipment losses erode margins and strain cash flow at the worst possible time.",
    specs: [
      { label: "Valuation", value: "Agreed / Stated / ACV" },
      { label: "Deductibles", value: "$1,000 – $5,000" },
      { label: "Who it's for", value: "All equipment owners" },
      { label: "Pairs with", value: "AL · Cargo · TI" },
      { label: "Rating basis", value: "Vehicle value" },
    ],
    endorsements: {
      included: ["Towing & labor", "Rental reimbursement", "Gap coverage", "Downtime coverage"],
      excluded: ["Wear and tear", "Mechanical breakdown (unless endorsed)", "Intentional damage"],
    },
    related: [
      { slug: "auto-liability", title: "Commercial Auto Liability" },
      { slug: "cargo", title: "Motor Truck Cargo" },
      { slug: "trailer-interchange", title: "Trailer Interchange" },
    ],
    faq: [
      { question: "What's the difference between comprehensive and collision?", answer: "Collision covers damage from hitting another vehicle or object. Comprehensive covers everything else — theft, fire, vandalism, weather, and animal strikes. Most lenders require both if you're financing equipment." },
      { question: "Do I need physical damage on older trucks?", answer: "It depends on the truck's value and your financial ability to replace it. If losing a truck would shut down your operation, PD coverage is worth carrying regardless of age. We can help you determine the break-even point." },
      { question: "How are PD premiums calculated?", answer: "Premiums are based on the stated value of your equipment, deductible chosen, driver experience, garaging location, and claims history. Higher deductibles significantly reduce premiums for established operators." },
    ],
  },
  "cargo": {
    title: "Motor Truck Cargo",
    eyebrow: "Cargo",
    image: "/manus-storage/coverage-cargo_81a9b72c.png",
    subtitle: "Protects the freight you haul against loss or damage in transit — the shipper's peace of mind and your contractual obligation.",
    description: [
      "Motor Truck Cargo insurance covers the goods you transport for others against physical loss or damage while in your care, custody, and control. Most broker and shipper contracts require a minimum of $100,000 in cargo coverage, and many require $250,000 or more.",
      "Coverage can be tailored for general commodities, refrigerated goods, hazmat, household goods, and high-value freight. Endorsements address loading/unloading, debris removal, and earned freight charges.",
      "Refrigerated cargo requires special attention — reefer breakdown endorsements cover spoilage when the refrigeration unit fails, and temperature-deviation coverage protects against load rejection at delivery. These endorsements are essential for produce, pharmaceutical, and food-service haulers.",
      "We also help carriers navigate the complexities of shipper-specific requirements. Some shippers require named-perils coverage, others want all-risk. Some demand $500,000 limits for high-value electronics. We match your cargo program to the freight you actually haul and the contracts you actually sign.",
    ],
    whyItMatters: "Cargo claims are the fastest way to lose a shipper relationship. When freight is damaged or lost, the carrier is responsible. Proper cargo coverage means you can settle claims quickly, maintain your reputation, and keep the loads coming.",
    specs: [
      { label: "Typical limit", value: "$100K – $250K" },
      { label: "Who it's for", value: "For-hire carriers" },
      { label: "Pairs with", value: "AL · PD · Reefer" },
      { label: "Rating basis", value: "Commodity & radius" },
      { label: "Deductible", value: "$1,000 – $5,000" },
    ],
    endorsements: {
      included: ["Refrigeration breakdown", "Loading/unloading", "Debris removal", "Earned freight charges"],
      excluded: ["Mysterious disappearance", "Inherent vice", "Shipper-packed containers (unless endorsed)"],
    },
    related: [
      { slug: "auto-liability", title: "Commercial Auto Liability" },
      { slug: "physical-damage", title: "Physical Damage" },
      { slug: "pollution-liability", title: "Pollution Liability" },
    ],
    faq: [
      { question: "What commodities does cargo insurance cover?", answer: "Standard cargo policies cover general commodities like dry goods, building materials, and consumer products. Specialized endorsements are needed for refrigerated goods, hazmat, household goods, electronics, and high-value freight." },
      { question: "How much cargo coverage do I need?", answer: "Most brokers require $100,000 minimum. Many shippers require $250,000 or more for high-value freight. Your limit should match the maximum value of any single load you haul, plus consider earned freight charges." },
      { question: "What's not covered by cargo insurance?", answer: "Standard exclusions include mysterious disappearance, inherent vice (natural spoilage), shipper-packed containers, and losses due to improper loading by the shipper. Many exclusions can be bought back with endorsements." },
    ],
  },
  "general-liability": {
    title: "General Liability",
    eyebrow: "General Liability",
    image: "/manus-storage/coverage-general-liability_201703ff.png",
    subtitle: "Premises and operations coverage for your terminal, yard, and office — protecting against third-party claims that arise off the road.",
    description: [
      "Commercial General Liability covers third-party bodily injury and property damage arising from your premises, operations, and products/completed operations. For trucking companies, this typically covers your terminal, yard, office, and loading dock exposures.",
      "CGL is often required by landlords, shippers, and brokers in addition to your auto liability coverage. It responds to slip-and-fall injuries at your facility, damage to property you're working on or near, and advertising injury claims.",
      "Many trucking operations overlook general liability because they focus on the trucks. But a visitor injured at your terminal, a forklift that damages a customer's dock, or a loading crew that drops a pallet on someone's foot — these are all GL claims, not auto claims.",
      "We pair your GL with your auto liability and umbrella to ensure there are no gaps between policies. Consistent carriers, consistent effective dates, and consistent additional insured language make certificate requests simple and keep your operations compliant.",
    ],
    whyItMatters: "Your auto policy stops at the truck. Everything that happens at your terminal, yard, office, or loading dock falls under general liability. Without it, a single premises injury could expose your business to uninsured litigation costs.",
    specs: [
      { label: "Typical limit", value: "$1M / $2M" },
      { label: "Who it's for", value: "All operations" },
      { label: "Pairs with", value: "AL · Umbrella" },
      { label: "Rating basis", value: "Payroll / revenue" },
      { label: "Deductible", value: "Varies" },
    ],
    endorsements: {
      included: ["Additional insured", "Waiver of subrogation", "Primary & non-contributory", "Blanket AI"],
      excluded: ["Auto liability (separate policy)", "Professional services", "Pollution (separate policy)"],
    },
    related: [
      { slug: "auto-liability", title: "Commercial Auto Liability" },
      { slug: "excess-umbrella", title: "Excess / Umbrella" },
      { slug: "workers-compensation", title: "Workers' Compensation" },
    ],
    faq: [
      { question: "Do trucking companies need general liability?", answer: "Yes. GL covers premises liability (slip-and-fall at your yard), completed operations, and personal/advertising injury. It's separate from auto liability and required by many contracts and lease agreements." },
      { question: "What's the difference between GL and auto liability?", answer: "Auto liability covers incidents involving your vehicles on the road. GL covers everything else — injuries at your terminal, damage during loading/unloading operations, and advertising claims. Most carriers need both." },
      { question: "How much GL coverage do I need?", answer: "Standard limits are $1M per occurrence / $2M aggregate. Some contracts require higher limits, which can be achieved with an umbrella policy rather than increasing the base GL limit." },
    ],
  },
  "non-trucking": {
    title: "Non-Trucking Liability",
    eyebrow: "Non-Trucking",
    image: "/manus-storage/coverage-non-trucking_9bc1fc78.png",
    subtitle: "Also called bobtail or deadhead coverage — protects you when the truck is not under dispatch from a motor carrier.",
    description: [
      "Non-Trucking Liability (NTL) provides liability coverage for owner-operators when their truck is being used for non-business purposes or when not under dispatch from a motor carrier. This fills the gap between the motor carrier's primary auto liability and your personal use of the vehicle.",
      "If you're leased to a carrier, their insurance covers you while under dispatch. NTL covers you during personal use — driving home, running errands, or deadheading without a load assignment.",
      "The distinction between 'under dispatch' and 'not under dispatch' is critical and often misunderstood. Many owner-operators assume they're covered at all times by the motor carrier's policy, but that coverage typically ends the moment you complete your last delivery and are released from dispatch.",
      "We help owner-operators understand exactly when their NTL coverage applies and ensure there are no gaps between the carrier's policy and their personal coverage. A single accident while bobtailing home without coverage can result in personal financial devastation.",
    ],
    whyItMatters: "As a leased owner-operator, you're only covered by the motor carrier's insurance while under dispatch. Every mile you drive off-dispatch — heading home, running personal errands, or deadheading — is uninsured without NTL coverage.",
    specs: [
      { label: "Typical limit", value: "$1M CSL" },
      { label: "Who it's for", value: "Leased owner-operators" },
      { label: "Pairs with", value: "PD · OA" },
      { label: "Rating basis", value: "Per unit" },
      { label: "Deductible", value: "N/A" },
    ],
    endorsements: {
      included: ["Medical payments", "Uninsured motorist", "Underinsured motorist"],
      excluded: ["While under dispatch", "Business use", "Hauling freight"],
    },
    related: [
      { slug: "auto-liability", title: "Commercial Auto Liability" },
      { slug: "physical-damage", title: "Physical Damage" },
      { slug: "occupational-accident", title: "Occupational Accident" },
    ],
    faq: [
      { question: "What is non-trucking liability insurance?", answer: "NTL (also called bobtail insurance) covers owner-operators when their truck is not under dispatch from a motor carrier. It fills the gap between the carrier's insurance and personal use of the vehicle." },
      { question: "When does NTL coverage apply?", answer: "It applies when you're driving your truck for non-business purposes — heading home after a delivery, running personal errands, or deadheading without a load assignment. It does NOT apply while under dispatch." },
      { question: "Is bobtail the same as non-trucking liability?", answer: "They're often used interchangeably, but technically bobtail refers specifically to driving without a trailer. NTL is broader — it covers any non-dispatch use of the vehicle, whether bobtailing or pulling an empty trailer." },
    ],
  },
  "trailer-interchange": {
    title: "Trailer Interchange",
    eyebrow: "Trailer Interchange",
    image: "/manus-storage/coverage-trailer-interchange_709da492.png",
    subtitle: "Physical damage coverage for trailers you pull under a trailer interchange agreement — required by most intermodal contracts.",
    description: [
      "Trailer Interchange coverage provides physical damage protection for trailers that are not owned by you but are in your possession under a written trailer interchange agreement. This is commonly required in intermodal and drayage operations.",
      "Without this coverage, you would be personally liable for damage to trailers belonging to others while they are in your care, custody, and control under the interchange agreement.",
      "Intermodal operations involve constant trailer swaps — chassis from the port, containers from the rail yard, trailers from partner carriers. Each of these units represents someone else's property in your care. A single fire, theft, or collision could mean replacing a $50,000 to $100,000 trailer out of pocket.",
      "We work with markets that understand intermodal operations and can provide coverage that matches the actual trailer values and volume you handle. Whether you're pulling 5 interchange trailers or 500, the program scales to fit your operation.",
    ],
    whyItMatters: "In intermodal and drayage operations, you're constantly pulling equipment that belongs to others. One stolen chassis or one fire in a container yard could cost you $50,000 to $100,000 without trailer interchange coverage.",
    specs: [
      { label: "Typical limit", value: "$50K – $100K per trailer" },
      { label: "Who it's for", value: "Intermodal / drayage" },
      { label: "Pairs with", value: "AL · PD · Cargo" },
      { label: "Rating basis", value: "Number of trailers" },
      { label: "Deductible", value: "$1,000 – $2,500" },
    ],
    endorsements: {
      included: ["Broadened perils", "Refrigeration units", "Chassis coverage"],
      excluded: ["Wear and tear", "Mechanical breakdown", "Pre-existing damage"],
    },
    related: [
      { slug: "auto-liability", title: "Commercial Auto Liability" },
      { slug: "physical-damage", title: "Physical Damage" },
      { slug: "cargo", title: "Motor Truck Cargo" },
    ],
    faq: [
      { question: "What is trailer interchange insurance?", answer: "It covers physical damage to trailers you pull under a written trailer interchange agreement with another party (typically a rail yard or shipper). Without it, you're personally liable for damage to trailers you don't own." },
      { question: "Do I need this if I only pull my own trailers?", answer: "No. Trailer interchange is specifically for trailers pulled under an interchange agreement. If you only pull your own trailers, standard physical damage coverage is sufficient." },
      { question: "What does a trailer interchange agreement require?", answer: "The agreement typically requires you to carry physical damage coverage on the interchanged trailer, return it in the same condition, and report any damage immediately. Your TI policy satisfies the insurance requirement." },
    ],
  },
  "occupational-accident": {
    title: "Occupational Accident",
    eyebrow: "Occupational Accident",
    image: "/manus-storage/coverage-occupational-accident_d07390f2.png",
    subtitle: "Accident and disability benefits for owner-operators and independent contractors who aren't eligible for workers' compensation.",
    description: [
      "Occupational Accident insurance provides accident medical expense, disability income, and accidental death benefits to independent contractors and owner-operators who are not eligible for workers' compensation coverage.",
      "Many motor carriers require their leased owner-operators to carry OA coverage as a condition of their lease agreement. It protects both the driver and the carrier from catastrophic injury costs.",
      "Unlike workers' compensation, OA coverage is designed specifically for the independent contractor relationship. It provides similar benefits — medical expenses, temporary and permanent disability, accidental death — without creating an employer-employee relationship that could trigger misclassification issues.",
      "We offer OA programs with medical limits from $500,000 to $1,000,000, weekly disability benefits, and accidental death coverage. Many programs also include passenger coverage and non-occupational accident riders for 24-hour protection.",
    ],
    whyItMatters: "Independent contractors and owner-operators fall outside workers' comp. Without OA coverage, a serious injury means no medical coverage, no disability income, and no death benefit for your family — all while your truck sits idle and payments keep coming due.",
    specs: [
      { label: "Medical limit", value: "$500K – $1M" },
      { label: "Who it's for", value: "Independent contractors" },
      { label: "Pairs with", value: "NTL · PD" },
      { label: "Rating basis", value: "Per driver" },
      { label: "Disability", value: "Weekly benefit" },
    ],
    endorsements: {
      included: ["Passenger coverage", "Non-occupational coverage", "24-hour accident"],
      excluded: ["Pre-existing conditions", "Intentional acts", "Drug/alcohol related"],
    },
    related: [
      { slug: "non-trucking", title: "Non-Trucking Liability" },
      { slug: "workers-compensation", title: "Workers' Compensation" },
      { slug: "physical-damage", title: "Physical Damage" },
    ],
    faq: [
      { question: "What's the difference between OA and workers' comp?", answer: "Workers' comp is for employees. OA is for independent contractors and owner-operators who aren't eligible for workers' comp. OA provides similar benefits (medical, disability, death) without creating an employment relationship." },
      { question: "Is occupational accident required?", answer: "It's not required by law, but most motor carriers require leased owner-operators to carry OA as a condition of their lease agreement. It protects both the driver and the carrier from catastrophic injury costs." },
      { question: "What benefits does OA provide?", answer: "Typical OA policies include accident medical expense ($500K-$1M), temporary total disability (weekly benefit), permanent disability, and accidental death & dismemberment. Many also include passenger coverage." },
    ],
  },
  "workers-compensation": {
    title: "Workers' Compensation",
    eyebrow: "Workers' Comp",
    image: "/manus-storage/coverage-workers-comp_88cc6f4a.png",
    subtitle: "Statutory coverage for employee injuries on the job — required in nearly every state for businesses with employees.",
    description: [
      "Workers' Compensation provides medical benefits, disability income, and death benefits to employees who are injured or become ill as a result of their employment. It is required by law in nearly every state for businesses with employees.",
      "For trucking companies, workers' comp covers drivers, mechanics, dispatchers, and office staff. Rates are based on payroll and classification codes specific to the trucking industry.",
      "Trucking workers' comp is notoriously difficult to place. High claim frequency, expensive injuries, and multi-state exposure make it one of the hardest lines to underwrite. We work with specialist markets that understand trucking class codes and can offer competitive rates even for accounts with loss history.",
      "Experience modification factors play a huge role in trucking workers' comp pricing. We help you understand your mod, implement return-to-work programs, and manage claims proactively to keep your mod trending downward over time.",
    ],
    whyItMatters: "State law requires workers' comp for employees in nearly every jurisdiction. Beyond compliance, it protects your business from employee injury lawsuits and ensures your team receives proper medical care and wage replacement when injuries occur.",
    specs: [
      { label: "Coverage", value: "Statutory limits" },
      { label: "Who it's for", value: "All employers" },
      { label: "Pairs with", value: "GL · Umbrella" },
      { label: "Rating basis", value: "Payroll by class" },
      { label: "Experience mod", value: "Affects premium" },
    ],
    endorsements: {
      included: ["Employers liability", "Voluntary compensation", "All-states coverage", "USL&H where needed"],
      excluded: ["Independent contractors", "Sole proprietors (in most states)", "Intentional acts"],
    },
    related: [
      { slug: "general-liability", title: "General Liability" },
      { slug: "occupational-accident", title: "Occupational Accident" },
      { slug: "excess-umbrella", title: "Excess / Umbrella" },
    ],
    faq: [
      { question: "Do I need workers' comp if all my drivers are independent contractors?", answer: "If they're truly independent contractors (1099), you don't need workers' comp for them — but you should require them to carry Occupational Accident coverage. If you have ANY W-2 employees (dispatchers, mechanics, office staff), you need WC." },
      { question: "What is an experience modification factor?", answer: "Your 'mod' is a multiplier based on your claims history vs. industry average. A mod below 1.0 means fewer claims than average (lower premium). Above 1.0 means more claims (higher premium). It takes 3 years of data to calculate." },
      { question: "How can I reduce my workers' comp costs?", answer: "Implement a safety program, establish a return-to-work program for injured employees, report claims immediately, and manage claims proactively. Over time, these actions lower your experience mod and reduce premiums significantly." },
    ],
  },
  "excess-umbrella": {
    title: "Excess / Umbrella",
    eyebrow: "Excess / Umbrella",
    image: "/manus-storage/coverage-excess-umbrella_10be31ef.png",
    subtitle: "Additional limits above your primary policies — often required by shippers, brokers, and contractual obligations.",
    description: [
      "Excess and Umbrella liability provides additional limits above your primary auto liability, general liability, and employers liability policies. Many shippers, brokers, and contracts require $2M, $5M, or even $10M in total limits.",
      "An umbrella policy can also provide broader coverage than the underlying policies in some cases, filling gaps that the primary policies don't cover.",
      "In today's litigation environment, trucking verdicts regularly exceed $1M primary limits. Nuclear verdicts — jury awards of $10M, $20M, or more — are becoming increasingly common in trucking cases. Adequate excess limits are no longer optional; they're essential for business survival.",
      "We structure excess programs that stack properly over your underlying policies, with consistent carriers where possible to avoid coverage disputes between layers. Whether you need $2M for a broker contract or $10M for a major shipper, we can build the tower.",
    ],
    whyItMatters: "Trucking jury verdicts regularly exceed primary policy limits. A single catastrophic accident without adequate excess coverage could bankrupt your operation. Shippers and brokers increasingly require $5M or more in total limits just to haul their freight.",
    specs: [
      { label: "Typical limit", value: "$2M – $10M" },
      { label: "Who it's for", value: "All carriers" },
      { label: "Pairs with", value: "AL · GL · WC" },
      { label: "Rating basis", value: "Underlying exposure" },
      { label: "Retention", value: "$0 – $10,000" },
    ],
    endorsements: {
      included: ["Follow-form coverage", "Defense costs outside limits", "Drop-down coverage"],
      excluded: ["Punitive damages (some states)", "Criminal acts", "Contractual liability (some)"],
    },
    related: [
      { slug: "auto-liability", title: "Commercial Auto Liability" },
      { slug: "general-liability", title: "General Liability" },
      { slug: "workers-compensation", title: "Workers' Compensation" },
    ],
    faq: [
      { question: "What is a nuclear verdict and why should I worry?", answer: "Nuclear verdicts are jury awards exceeding $10M in trucking accident cases. They've become increasingly common as plaintiff attorneys use 'reptile theory' tactics. Adequate excess limits ($5M-$10M+) are your only protection against financial ruin." },
      { question: "How much excess coverage do I need?", answer: "It depends on your operation size, commodities hauled, and contractual requirements. Most carriers need at least $2M-$5M. Large fleets or hazmat haulers should consider $10M+. Your broker contracts often dictate minimum requirements." },
      { question: "What's the difference between excess and umbrella?", answer: "An umbrella provides broader coverage than underlying policies and may cover claims excluded by primary policies. Excess follows the exact terms of the underlying policy. In trucking, both terms are often used interchangeably for additional limits." },
    ],
  },
  "pollution-liability": {
    title: "Pollution Liability",
    eyebrow: "Pollution",
    image: "/manus-storage/coverage-pollution-liability_f2d70e4e.png",
    subtitle: "Coverage for environmental cleanup costs and third-party damages from a pollution event during transit.",
    description: [
      "Pollution Liability coverage responds to environmental cleanup costs and third-party bodily injury or property damage resulting from a pollution condition caused by your trucking operations.",
      "Standard auto liability policies exclude pollution events. If you haul hazardous materials or operate in environmentally sensitive areas, this coverage fills a critical gap.",
      "Even carriers who don't haul hazmat can face pollution claims. A diesel fuel spill from a ruptured saddle tank, hydraulic fluid contaminating a waterway, or cargo that turns out to contain undisclosed hazardous materials — these scenarios trigger the pollution exclusion on your standard auto policy.",
      "We work with environmental markets that understand transportation pollution exposures. Coverage can be structured for sudden and accidental events, gradual pollution conditions, or both. Limits and deductibles are tailored to the specific commodities you haul and the routes you travel.",
    ],
    whyItMatters: "Environmental cleanup costs can reach hundreds of thousands of dollars for a single spill. Your standard auto liability policy excludes pollution events. Without dedicated pollution coverage, you're personally liable for every dollar of cleanup, remediation, and third-party damage.",
    specs: [
      { label: "Typical limit", value: "$1M / $2M" },
      { label: "Who it's for", value: "Hazmat haulers" },
      { label: "Pairs with", value: "AL · Cargo · GL" },
      { label: "Rating basis", value: "Commodity & radius" },
      { label: "Deductible", value: "$5,000 – $25,000" },
    ],
    endorsements: {
      included: ["Transportation pollution", "Loading/unloading", "Emergency response", "Third-party disposal sites"],
      excluded: ["Known conditions", "Intentional discharge", "Nuclear/radioactive"],
    },
    related: [
      { slug: "auto-liability", title: "Commercial Auto Liability" },
      { slug: "cargo", title: "Motor Truck Cargo" },
      { slug: "general-liability", title: "General Liability" },
    ],
    faq: [
      { question: "Do I need pollution coverage if I don't haul hazmat?", answer: "Potentially yes. Even non-hazmat carriers face pollution exposure from diesel fuel spills, hydraulic fluid leaks, or undisclosed hazardous cargo. Your standard auto policy excludes ALL pollution events regardless of the source." },
      { question: "What triggers the pollution exclusion on my auto policy?", answer: "Any release of pollutants — including diesel fuel, oil, hydraulic fluid, or cargo contents — into the environment. Even a ruptured fuel tank from a routine accident can trigger the exclusion and leave you uninsured for cleanup costs." },
      { question: "How much does pollution coverage cost?", answer: "For non-hazmat carriers, basic sudden & accidental coverage is relatively affordable ($1,500-$5,000/year). Hazmat haulers pay more based on commodities, limits, and routes. The cost is minimal compared to potential cleanup liability." },
    ],
  },
  "freight-broker-bonds": {
    title: "Freight Broker Bonds",
    eyebrow: "Surety Bonds",
    image: "/manus-storage/coverage-freight-broker_a28e33e2.png",
    subtitle: "BMC-84 surety bonds and trust fund agreements required by the FMCSA for licensed freight brokers and freight forwarders.",
    description: [
      "Every licensed freight broker and freight forwarder in the United States must maintain a BMC-84 surety bond or BMC-85 trust fund agreement in the amount of $75,000. This financial instrument guarantees that shippers and carriers will be paid for services rendered, even if the broker defaults on its obligations.",
      "The bond is filed directly with the FMCSA and remains active for the life of your broker authority. If it lapses or is cancelled, your authority is automatically revoked — making it one of the most critical compliance requirements for any brokerage operation.",
      "At Trux, we place freight broker bonds with surety companies that understand the transportation industry. Our bonds are competitively priced, issued quickly, and backed by carriers with strong financial ratings. We handle the FMCSA filing process and monitor your bond status to ensure continuous compliance.",
      "Whether you're a new broker applying for authority or an established operation looking for better rates at renewal, we can help you secure the bond you need without tying up capital in a trust fund arrangement.",
    ],
    whyItMatters: "Without an active BMC-84 bond or BMC-85 trust, your freight broker authority cannot operate. It's the financial guarantee that shippers and carriers rely on — and the FMCSA enforces it strictly.",
    specs: [
      { label: "Bond amount", value: "$75,000" },
      { label: "Who it's for", value: "Freight brokers & forwarders" },
      { label: "Filing", value: "BMC-84 with FMCSA" },
      { label: "Term", value: "Continuous until cancelled" },
      { label: "Alternative", value: "BMC-85 trust fund" },
    ],
    endorsements: {
      included: ["FMCSA electronic filing", "Continuous bond monitoring", "Renewal reminders", "Quick issuance (24–48 hrs)"],
      excluded: ["Brokers with prior bond claims", "Authorities under investigation", "Inactive authorities"],
    },
    related: [
      { slug: "general-liability", title: "General Liability" },
      { slug: "excess-umbrella", title: "Excess / Umbrella" },
      { slug: "auto-liability", title: "Commercial Auto Liability" },
    ],
    faq: [
      { question: "How much does a freight broker bond cost?", answer: "Premium is typically 1-10% of the $75,000 bond amount ($750-$7,500/year), depending on your personal credit score, business financials, and claims history. Strong credit scores qualify for the lowest rates." },
      { question: "What happens if my bond lapses?", answer: "The FMCSA will revoke your broker authority. You cannot legally operate as a freight broker without an active BMC-84 bond or BMC-85 trust. Reinstatement requires a new bond filing and can take weeks." },
      { question: "What's the difference between a bond and a trust?", answer: "A BMC-84 bond is purchased from a surety company (annual premium, no capital tied up). A BMC-85 trust requires depositing $75,000 in a trust account (your money is locked up but no annual premium). Most brokers choose the bond." },
    ],
  },
  "cyber-coverage": {
    title: "Cyber Coverage",
    eyebrow: "Cyber Liability",
    image: "/manus-storage/coverage-cyber_001b3a0b.png",
    subtitle: "Protection against data breaches, ransomware attacks, and electronic theft \u2014 critical for carriers managing ELDs, dispatch systems, and customer data.",
    description: [
      "Modern trucking operations run on technology \u2014 electronic logging devices, GPS tracking, dispatch software, load boards, and customer portals. A single cyber event can shut down your operation, expose sensitive shipper data, and trigger regulatory penalties that dwarf the cost of the coverage itself.",
      "Cyber liability insurance responds to data breaches, ransomware attacks, social engineering fraud, and system failures. It covers the cost of forensic investigation, notification to affected parties, credit monitoring, legal defense, regulatory fines, and business interruption while your systems are restored.",
      "For motor carriers, the risk is real and growing. Threat actors target transportation companies because they handle high-value freight data, maintain customer payment information, and operate under tight delivery timelines that make them more likely to pay ransom demands quickly.",
      "At Trux, we place cyber coverage with carriers who understand the transportation sector\u2019s unique exposure. We help you assess your risk, implement basic security hygiene that satisfies underwriting requirements, and structure limits that match your actual data exposure \u2014 not a generic one-size-fits-all policy.",
    ],
    whyItMatters: "A single ransomware attack can cost a mid-size carrier $200,000\u2013$500,000 in downtime, recovery, and liability. Cyber coverage is no longer optional \u2014 it\u2019s as essential as cargo insurance for any carrier that touches technology.",
    specs: [
      { label: "Typical limit", value: "$1M\u2013$5M" },
      { label: "Who it\u2019s for", value: "All carriers with digital systems" },
      { label: "Pairs with", value: "Crime \u00b7 GL \u00b7 Excess" },
      { label: "Key triggers", value: "Breach \u00b7 Ransomware \u00b7 Fraud" },
      { label: "Retention", value: "$5K\u2013$25K typical" },
    ],
    endorsements: {
      included: ["Data breach response", "Ransomware / extortion", "Business interruption", "Social engineering fraud", "Regulatory defense & fines", "Media liability"],
      excluded: ["Unencrypted portable devices (some markets)", "Prior known incidents", "Infrastructure failure (utility outage)"],
    },
    related: [
      { slug: "crime-coverage", title: "Crime Coverage" },
      { slug: "general-liability", title: "General Liability" },
      { slug: "excess-umbrella", title: "Excess / Umbrella" },
    ],
    faq: [
      { question: "What cyber risks do trucking companies face?", answer: "Ransomware attacks on dispatch systems, ELD hacking, phishing scams targeting accounting staff, data breaches of customer/shipper information, and social engineering fraud (fake vendor payment requests) are the most common threats." },
      { question: "Does my general liability cover cyber events?", answer: "No. GL policies have broad technology and data exclusions. Cyber liability is a standalone coverage that specifically addresses data breaches, network security failures, and electronic crime. You need both GL and cyber." },
      { question: "How much cyber coverage do I need?", answer: "For most mid-size carriers, $1M-$2M is adequate. Consider the cost of business interruption (what does a week of downtime cost?), notification expenses, and regulatory fines. Larger operations with sensitive data should consider $5M+." },
    ],
  },
  "crime-coverage": {
    title: "Crime Coverage",
    eyebrow: "Commercial Crime",
    image: "/manus-storage/coverage-crime_8f4d6dff.png",
    subtitle: "Employee dishonesty, theft, forgery, and fraud protection \u2014 safeguards your business against internal and external criminal acts.",
    description: [
      "Commercial crime insurance protects your trucking operation against financial losses caused by criminal acts \u2014 whether committed by employees, vendors, or outside parties. It covers employee theft, forgery, computer fraud, funds transfer fraud, and money/securities losses.",
      "For motor carriers, crime exposure is significant. Drivers handle cash collections, office staff process payments, and dispatch personnel have access to financial systems. A single dishonest employee can cause losses that threaten the viability of a small fleet.",
      "Crime coverage fills gaps that general liability and cyber policies don\u2019t address. While GL covers third-party claims and cyber covers data breaches, crime insurance responds to direct financial loss from theft and fraud \u2014 including employee embezzlement that may go undetected for months.",
      "At Trux, we structure crime programs that match your actual exposure \u2014 considering the number of employees with financial access, your cash handling procedures, and your internal controls. We work with carriers who understand transportation operations and price accordingly.",
    ],
    whyItMatters: "Employee theft and fraud account for billions in annual losses across all industries. For trucking companies with distributed workforces and cash-handling exposure, crime coverage provides the financial safety net when internal controls fail.",
    specs: [
      { label: "Typical limit", value: "$250K\u2013$1M" },
      { label: "Who it\u2019s for", value: "Carriers with employees handling funds" },
      { label: "Pairs with", value: "Cyber \u00b7 GL \u00b7 Umbrella" },
      { label: "Key coverages", value: "Theft \u00b7 Forgery \u00b7 Fraud" },
      { label: "Retention", value: "$2,500\u2013$10K typical" },
    ],
    endorsements: {
      included: ["Employee dishonesty", "Forgery or alteration", "Computer & funds transfer fraud", "Money & securities (inside/outside)", "Client property"],
      excluded: ["Inventory shortages (without proof of theft)", "Indirect or consequential loss", "Government seizure or confiscation"],
    },
    related: [
      { slug: "cyber-coverage", title: "Cyber Coverage" },
      { slug: "general-liability", title: "General Liability" },
      { slug: "freight-broker-bonds", title: "Freight Broker Bonds" },
    ],
    faq: [
      { question: "What's the difference between crime and cyber insurance?", answer: "Crime covers direct financial theft (employee embezzlement, forgery, funds transfer fraud). Cyber covers data breaches, ransomware, and network security failures. There's some overlap in social engineering, but they address different core risks." },
      { question: "Does crime insurance cover cargo theft?", answer: "No. Cargo theft by third parties is covered by your motor truck cargo policy. Crime insurance covers theft by your own employees and fraud by outside parties targeting your financial accounts — not physical freight." },
      { question: "How do I know if I need crime coverage?", answer: "If you have employees who handle money, process payments, manage bank accounts, or have access to financial systems, you have crime exposure. The more employees with financial access, the higher your risk and the more important the coverage." },
    ],
  },
  "contractors": {
    title: "Contractors",
    eyebrow: "Coming Soon",
    image: "/manus-storage/coverage-contractors_82070c37.png",
    subtitle: "General liability, builders risk, tools & equipment, and commercial auto coverage tailored for construction contractors \u2014 coming soon to Trux.",
    description: [
      "Trux is expanding beyond trucking to serve the construction contractors who build America\u2019s infrastructure. We\u2019re developing a full-service contractors program that includes general liability, commercial auto, builders risk, inland marine (tools & equipment), and workers\u2019 compensation.",
      "Our contractors program will serve general contractors, subcontractors, artisan trades, and specialty contractors. Whether you\u2019re framing houses, pouring foundations, running electrical, or managing large commercial projects, we\u2019ll have markets that understand your specific trade classification.",
      "We\u2019re building relationships with carriers who specialize in construction risk \u2014 markets that understand completed operations exposure, additional insured requirements, and the certificate demands of general contractors and project owners.",
      "If you\u2019re a contractor looking for coverage, or a trucking client who also has a construction operation, contact our office to be added to the early access list. We\u2019ll notify you as soon as the program launches.",
    ],
    whyItMatters: "Construction contractors face unique risks that require specialized markets and experienced agents. Trux is bringing the same focused expertise we\u2019ve built in trucking to the construction industry \u2014 one trade at a time.",
    specs: [
      { label: "Status", value: "Coming Soon" },
      { label: "Lines planned", value: "GL \u00b7 Auto \u00b7 WC \u00b7 Builders Risk" },
      { label: "Trades", value: "GC \u00b7 Subs \u00b7 Artisan" },
      { label: "Availability", value: "Notify me" },
      { label: "Bundling", value: "With trucking program" },
    ],
    endorsements: {
      included: ["General Liability (GL)", "Commercial Auto", "Workers\u2019 Compensation", "Builders Risk", "Inland Marine (Tools & Equipment)"],
      excluded: ["Not yet available", "Contact us for early access"],
    },
    related: [
      { slug: "general-liability", title: "General Liability" },
      { slug: "workers-compensation", title: "Workers\u2019 Compensation" },
      { slug: "auto-liability", title: "Commercial Auto Liability" },
    ],
    faq: [
      { question: "When will contractors coverage be available?", answer: "We're actively building carrier relationships and expect to launch the contractors program soon. Contact our office to join the early access list and be notified as soon as coverage becomes available." },
      { question: "What trades will you cover?", answer: "We plan to serve general contractors, subcontractors, and artisan trades including electrical, plumbing, HVAC, framing, concrete, roofing, and specialty contractors. Our program will be tailored to each trade's unique risk profile." },
      { question: "Can I bundle contractors with my trucking insurance?", answer: "Absolutely. Many of our trucking clients also have construction operations. Bundling both programs under one agency gives you coordinated coverage, streamlined billing, and a single point of contact for all your insurance needs." },
    ],
  },
  "personal-lines": {
    title: "Personal Lines",
    eyebrow: "Coming Soon",
    image: "/manus-storage/coverage-personal-lines_c1c25da6.png",
    subtitle: "Home, auto, umbrella, and recreational vehicle coverage for you and your family — coming soon to Trux Insurance Services.",
    description: [
      "We know that trucking is more than a business — it's a lifestyle. That's why Trux is expanding into personal lines coverage to serve the families behind the fleets. Soon you'll be able to bundle your personal insurance with your commercial program under one agency relationship.",
      "Our personal lines offering will include homeowners and renters insurance, personal auto coverage, personal umbrella policies, and specialty coverage for recreational vehicles, boats, and collector cars. All placed with the same A-rated carriers and hands-on service you expect from Trux.",
      "By consolidating your personal and commercial insurance with one agency, you'll benefit from streamlined billing, coordinated renewals, and a single point of contact who understands your complete insurance picture. No more juggling multiple agents and policies.",
      "We're currently building relationships with personal lines carriers and developing the systems to serve you. If you'd like to be notified when personal lines coverage becomes available, contact our office and we'll add you to the early access list.",
    ],
    whyItMatters: "The people who move freight deserve the same level of expertise and advocacy for their personal insurance. One agency, one relationship, complete coverage — that's the Trux promise, expanding to cover every part of your life.",
    specs: [
      { label: "Status", value: "Coming Soon" },
      { label: "Lines planned", value: "Home · Auto · Umbrella" },
      { label: "Specialty", value: "RV · Boat · Collector" },
      { label: "Availability", value: "Notify me" },
      { label: "Bundling", value: "With commercial program" },
    ],
    endorsements: {
      included: ["Homeowners / Renters", "Personal Auto", "Personal Umbrella", "Recreational Vehicles", "Watercraft"],
      excluded: ["Not yet available", "Contact us for early access"],
    },
    related: [
      { slug: "auto-liability", title: "Commercial Auto Liability" },
      { slug: "excess-umbrella", title: "Excess / Umbrella" },
      { slug: "general-liability", title: "General Liability" },
    ],
    faq: [
      { question: "When will personal lines be available?", answer: "We're currently building carrier relationships and developing systems to serve personal lines clients. Contact our office to join the early access list and be the first to know when we launch." },
      { question: "What personal lines will you offer?", answer: "We plan to offer homeowners, renters, personal auto, personal umbrella, and specialty coverage for recreational vehicles, boats, and collector cars — all with the same hands-on service you expect from Trux." },
      { question: "Can I bundle personal and commercial insurance?", answer: "That's exactly the plan. By consolidating everything under one agency, you'll benefit from streamlined billing, coordinated renewals, and a single point of contact who understands your complete insurance picture." },
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
      <SEO
        title={`${coverage.title} Insurance`}
        description={coverage.subtitle}
        canonical={`/coverages/${slug}`}
        faq={coverage.faq}
        type="service"
        serviceName={`${coverage.title} Insurance`}
      />
      <Breadcrumbs items={[{ label: "Coverages", href: "/coverages" }, { label: coverage.title }]} />

      {/* Page header with image */}
      <section className="py-16 bg-paper-2">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="eyebrow">{coverage.eyebrow}</span>
              <div className="tick mt-4"></div>
              <h1 className="mt-4 mb-4">{coverage.title}</h1>
              <p className="lead max-w-2xl">{coverage.subtitle}</p>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={coverage.image}
                alt={`Color pencil sketch illustration for ${coverage.title}`}
                className="w-full max-h-[300px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Content */}
      <section className="section bg-paper">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Article body */}
              {coverage.description.map((para, i) => (
                <p key={i} className="font-sans text-[16px] text-muted-custom leading-relaxed mb-6">
                  {para}
                </p>
              ))}

              {/* Why it matters pull-quote */}
              <div className="pull-quote my-10">
                <h4 className="font-serif text-[18px] text-ink mb-3">Why it matters</h4>
                <p className="font-serif italic text-[17px] text-muted-custom leading-relaxed">
                  {coverage.whyItMatters}
                </p>
              </div>

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

              {/* FAQ Section */}
              {coverage.faq && coverage.faq.length > 0 && (
                <div className="mt-12">
                  <FAQSection items={coverage.faq} title="Frequently Asked Questions" />
                </div>
              )}
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
              <div className="flex flex-col gap-2">
                {coverage.related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/coverages/${rel.slug}`}
                    className="font-sans text-[13px] text-muted-custom border border-[var(--hair)] px-3 py-2 hover:border-purple hover:text-purple no-underline transition-colors"
                  >
                    → {rel.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-paper">
        <div className="container py-10">
          <TrustSignals />
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
