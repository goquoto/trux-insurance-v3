import { useParams, Link } from "wouter";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";

interface StateData {
  name: string;
  abbr: string;
  description: string;
  minimumLimits: string;
  keyFacts: string[];
  faq: { question: string; answer: string }[];
}

const stateData: Record<string, StateData> = {
  "illinois": {
    name: "Illinois",
    abbr: "IL",
    description: "As our home state, Illinois is where Trux Insurance Services was founded and where we have the deepest market relationships. We insure hundreds of carriers operating out of the Chicago metro area, the I-55 and I-80 corridors, and throughout downstate Illinois. Whether you're running local drayage out of the intermodal yards or long-haul OTR from a suburban terminal, we know the Illinois trucking landscape inside and out.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Illinois state minimum for intrastate is $100,000/$300,000 CSL.",
    keyFacts: [
      "Home state of Trux Insurance Services — deepest market access",
      "Major intermodal hub (Chicago) with heavy drayage activity",
      "I-80, I-55, I-57, I-74 corridors for OTR operations",
      "Illinois Commerce Commission regulates intrastate carriers",
      "Nuclear verdict state — juries award large damages in Cook County",
    ],
    faq: [
      { question: "What are Illinois trucking insurance requirements?", answer: "Interstate carriers need $750K minimum auto liability (FMCSA). Intrastate carriers regulated by the Illinois Commerce Commission need $100K/$300K CSL minimum. Most shippers and brokers require $1M regardless of the legal minimum." },
      { question: "Is Illinois expensive for trucking insurance?", answer: "Illinois is moderately expensive due to Cook County litigation risk and high traffic density in the Chicago metro. However, downstate operations with clean records can get competitive rates. We know which markets rate Illinois fairly." },
      { question: "Do you cover Chicago drayage operations?", answer: "Yes. We insure numerous drayage carriers operating out of the Chicago intermodal yards (BNSF Logistics Park, UP Global III/IV, CSX 59th St). We understand trailer interchange, port liability, and the unique exposures of container hauling." },
    ],
  },
  "texas": {
    name: "Texas",
    abbr: "TX",
    description: "Texas is the largest trucking state in the country — more registered carriers, more miles driven, and more freight moved than any other state. Trux insures carriers throughout Texas, from the Dallas-Fort Worth metroplex to the Houston port corridor, the I-35 NAFTA highway, and the Permian Basin oil fields. We understand Texas-specific exposures including border crossing operations, oil field trucking, and the state's unique regulatory environment.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Texas intrastate minimum is $500,000 CSL for general freight.",
    keyFacts: [
      "Largest trucking state by registered carriers and freight volume",
      "Major border crossing operations (Laredo, El Paso, McAllen)",
      "Permian Basin oil field trucking with specialized exposures",
      "I-35 NAFTA corridor — heavy cross-border freight",
      "Texas Department of Motor Vehicles regulates intrastate carriers",
      "Growing nuclear verdict risk in major metro counties",
    ],
    faq: [
      { question: "What are Texas trucking insurance requirements?", answer: "Interstate carriers need $750K minimum (FMCSA). Texas intrastate carriers need $500K CSL for general freight, $1M for hazmat. The Texas DMV requires proof of insurance for all registered carriers." },
      { question: "Do you cover border crossing operations?", answer: "Yes. We insure carriers that cross into Mexico regularly. We handle the additional liability exposure of cross-border operations and work with markets that understand NAFTA corridor risks." },
      { question: "Is oil field trucking covered?", answer: "Yes. We insure carriers hauling frac sand, water, crude oil, and equipment in the Permian Basin and Eagle Ford Shale. We understand the specialized exposures of energy-sector trucking." },
    ],
  },
  "florida": {
    name: "Florida",
    abbr: "FL",
    description: "Florida's trucking industry serves one of the largest consumer markets in the country, with heavy freight activity along the I-95 corridor, I-75, and the I-4 Central Florida corridor. Trux insures carriers throughout Florida — from Miami port drayage to Jacksonville distribution, Tampa Bay operations, and everything in between. We understand Florida's unique challenges including hurricane exposure, high uninsured motorist rates, and aggressive litigation environment.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Florida intrastate minimum varies by vehicle weight.",
    keyFacts: [
      "Third-largest state economy with massive consumer freight demand",
      "Port of Miami and Port Everglades — major drayage activity",
      "Hurricane exposure requires business interruption planning",
      "High uninsured/underinsured motorist rates increase claim frequency",
      "Aggressive litigation environment — high verdict potential",
      "Snowbird seasonal demand creates volume fluctuations",
    ],
    faq: [
      { question: "Is Florida expensive for trucking insurance?", answer: "Florida is one of the more expensive states due to high litigation costs, frequent uninsured motorist claims, and hurricane exposure. However, carriers with clean records and established history can still get competitive rates through the right markets." },
      { question: "Do I need hurricane coverage for my trucks?", answer: "Comprehensive coverage (part of physical damage) covers hurricane damage to your equipment. We also recommend business interruption planning for extended shutdowns during major storms." },
      { question: "Do you cover Miami port drayage?", answer: "Yes. We insure carriers operating out of PortMiami and Port Everglades with full drayage programs including trailer interchange, cargo, and port liability coverage." },
    ],
  },
  "georgia": {
    name: "Georgia",
    abbr: "GA",
    description: "Georgia is a major logistics hub anchored by the Port of Savannah — the fastest-growing container port in the country — and Atlanta's massive distribution network. Trux insures carriers throughout Georgia, from Savannah drayage operations to Atlanta metro distribution, I-75 corridor OTR, and agricultural hauling in south Georgia.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Georgia intrastate carriers follow federal minimums.",
    keyFacts: [
      "Port of Savannah — fastest-growing US container port",
      "Atlanta — major distribution and logistics hub",
      "I-75 and I-85 corridors for north-south freight",
      "Growing nuclear verdict risk in metro Atlanta courts",
      "Agricultural hauling in south Georgia (produce, poultry, cotton)",
    ],
    faq: [
      { question: "Do you cover Savannah port drayage?", answer: "Yes. We insure carriers operating out of the Port of Savannah with full intermodal programs including trailer interchange, container coverage, and port liability." },
      { question: "What about Atlanta metro operations?", answer: "We cover carriers operating in the Atlanta metro area including local delivery, LTL, and distribution center operations. We understand the high-traffic exposure of I-285 and I-75/I-85 operations." },
    ],
  },
  "ohio": {
    name: "Ohio",
    abbr: "OH",
    description: "Ohio sits at the crossroads of the Midwest freight network, with more interstate highway miles than almost any other state. Trux insures carriers throughout Ohio — from Cleveland and Columbus distribution operations to Cincinnati cross-border freight and the I-70/I-71/I-75 corridor operations that move goods between the Great Lakes and the Southeast.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Ohio PUCO regulates intrastate carriers.",
    keyFacts: [
      "Crossroads of Midwest freight — I-70, I-71, I-75, I-77 corridors",
      "Major distribution centers in Columbus metro",
      "Cleveland port operations on Lake Erie",
      "Ohio PUCO (Public Utilities Commission) regulates intrastate carriers",
      "Moderate litigation environment compared to neighboring states",
    ],
    faq: [
      { question: "What does Ohio PUCO require for insurance?", answer: "Ohio PUCO requires intrastate carriers to maintain minimum liability coverage and file proof of insurance. Interstate carriers follow FMCSA requirements. We handle all filing requirements for Ohio-domiciled carriers." },
      { question: "Is Ohio a good state for trucking insurance rates?", answer: "Ohio is moderate — not as expensive as Florida or Texas, but not the cheapest either. The state's central location and moderate litigation environment help keep rates reasonable for carriers with clean records." },
    ],
  },
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
  "michigan": {
    name: "Michigan",
    abbr: "MI",
    description: "Michigan's trucking industry is driven by the automotive supply chain, cross-border trade with Canada, and heavy manufacturing freight. Trux insures carriers throughout Michigan — from Detroit metro auto-parts hauling to Grand Rapids distribution, Upper Peninsula logging operations, and the Ambassador Bridge/Blue Water Bridge cross-border corridor.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Michigan's no-fault auto system creates unique coverage considerations.",
    keyFacts: [
      "Automotive supply chain drives heavy freight demand",
      "Cross-border operations with Canada (Ambassador Bridge, Blue Water Bridge)",
      "Michigan no-fault auto system affects claims handling",
      "Detroit metro — major manufacturing and distribution hub",
      "Upper Peninsula — logging and mining operations",
    ],
    faq: [
      { question: "How does Michigan's no-fault system affect trucking insurance?", answer: "Michigan's no-fault system means your own insurer pays your medical bills regardless of fault. For commercial trucking, this creates unique claims dynamics. We work with markets that understand Michigan no-fault and price it appropriately." },
      { question: "Do you cover cross-border operations to Canada?", answer: "Yes. We insure carriers that regularly cross into Ontario via the Ambassador Bridge or Blue Water Bridge. We handle the additional liability and cargo considerations of cross-border freight." },
    ],
  },
  "pennsylvania": {
    name: "Pennsylvania",
    abbr: "PA",
    description: "Pennsylvania is a critical freight corridor connecting the Northeast to the Midwest, with major operations along the I-76 (PA Turnpike), I-78, I-80, and I-81 corridors. Trux insures carriers throughout Pennsylvania — from Philadelphia port drayage to Pittsburgh manufacturing freight, Lehigh Valley distribution centers, and the I-81 corridor that serves as the East Coast's primary north-south freight artery.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Pennsylvania PUC regulates intrastate carriers with varying minimums.",
    keyFacts: [
      "I-81 corridor — primary East Coast north-south freight artery",
      "Lehigh Valley — massive distribution center concentration",
      "Philadelphia port operations and drayage",
      "PA Turnpike (I-76) connects Pittsburgh to Philadelphia",
      "Pennsylvania PUC regulates intrastate carriers",
    ],
    faq: [
      { question: "What does the Pennsylvania PUC require?", answer: "The PA PUC requires intrastate carriers to maintain minimum liability coverage and file proof of insurance. Requirements vary by vehicle type and weight. We handle all PUC filing requirements for PA-domiciled carriers." },
      { question: "Do you cover Lehigh Valley distribution operations?", answer: "Yes. The Lehigh Valley has become one of the largest distribution center clusters in the country. We insure carriers operating out of these facilities with programs designed for high-frequency local/regional operations." },
    ],
  },
  "tennessee": {
    name: "Tennessee",
    abbr: "TN",
    description: "Tennessee is a major logistics hub centered on Memphis (the FedEx hub and one of the largest freight airports in the world) and Nashville's growing distribution network. Trux insures carriers throughout Tennessee — from Memphis intermodal and air freight operations to Nashville metro distribution, Chattanooga manufacturing freight, and the I-40/I-65/I-24 corridor operations.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Tennessee follows federal minimums for intrastate carriers.",
    keyFacts: [
      "Memphis — FedEx hub, major intermodal and air freight center",
      "Nashville — rapidly growing distribution and logistics hub",
      "I-40 corridor connects Memphis to Nashville to Knoxville",
      "Moderate insurance rates and business-friendly environment",
      "Growing nuclear verdict risk in major metro counties",
    ],
    faq: [
      { question: "Is Tennessee a good state for trucking insurance rates?", answer: "Tennessee is moderate to favorable for trucking insurance. The state's business-friendly environment and moderate litigation costs help keep rates reasonable. Memphis-based carriers benefit from the concentration of freight activity." },
      { question: "Do you cover Memphis intermodal operations?", answer: "Yes. We insure carriers operating out of Memphis intermodal facilities with full drayage programs including trailer interchange and container coverage." },
    ],
  },
  "missouri": {
    name: "Missouri",
    abbr: "MO",
    description: "Missouri sits at the geographic center of the country, making it a natural hub for trucking operations serving both coasts. Trux insures carriers throughout Missouri — from Kansas City and St. Louis distribution operations to Springfield freight corridors and the I-70/I-44 highway network that connects the Midwest to the Southwest.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Missouri DOT regulates intrastate carriers.",
    keyFacts: [
      "Geographic center of the US — natural freight hub",
      "Kansas City and St. Louis — major distribution centers",
      "I-70 connects KC to St. Louis; I-44 connects to Southwest",
      "Moderate insurance rates and central location benefits",
      "Missouri DOT regulates intrastate carriers",
    ],
    faq: [
      { question: "Is Missouri a good state to domicile a trucking company?", answer: "Missouri offers moderate insurance rates, central geographic location, and reasonable regulatory requirements. Many carriers choose Missouri domicile for the combination of low operating costs and easy access to major freight lanes." },
    ],
  },
  "arizona": {
    name: "Arizona",
    abbr: "AZ",
    description: "Arizona's trucking industry is driven by cross-border trade with Mexico, construction/development freight in the Phoenix metro, and the I-10/I-40 corridors connecting California to the rest of the country. Trux insures carriers throughout Arizona with programs designed for desert operations, border crossing, and the unique exposures of Southwest trucking.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Arizona DOT regulates intrastate carriers.",
    keyFacts: [
      "Major border crossing operations (Nogales, San Luis)",
      "Phoenix metro — rapid growth drives construction freight",
      "I-10 and I-40 corridors for east-west freight",
      "Desert operations with extreme heat exposure",
      "Arizona DOT regulates intrastate carriers",
    ],
    faq: [
      { question: "Do you cover Arizona border crossing operations?", answer: "Yes. We insure carriers that cross into Mexico through Arizona ports of entry. We handle the additional liability and cargo considerations of cross-border operations." },
    ],
  },
  "colorado": {
    name: "Colorado",
    abbr: "CO",
    description: "Colorado's trucking industry serves the Rocky Mountain region with freight moving along the I-25 Front Range corridor and I-70 mountain passes. Trux insures carriers throughout Colorado — from Denver metro distribution to mountain freight operations and the unique challenges of high-altitude, winter-weather trucking.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Colorado PUC regulates intrastate carriers.",
    keyFacts: [
      "I-25 Front Range corridor (Fort Collins to Pueblo)",
      "I-70 mountain passes with extreme winter conditions",
      "Denver metro — major distribution hub for Rocky Mountain region",
      "Colorado PUC regulates intrastate carriers",
      "High-altitude and winter-weather exposure",
    ],
    faq: [
      { question: "Does winter mountain driving affect my insurance rates?", answer: "Carriers that regularly operate on I-70 mountain passes may face slightly higher rates due to increased accident risk in winter conditions. However, experienced mountain operators with clean records can still get competitive pricing." },
    ],
  },
  "iowa": {
    name: "Iowa",
    abbr: "IA",
    description: "Iowa is a major agricultural freight state with heavy grain, livestock, and food processing transportation. Trux insures carriers throughout Iowa — from Des Moines distribution operations to agricultural hauling across the state's extensive rural highway network.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Iowa DOT regulates intrastate carriers.",
    keyFacts: [
      "Major agricultural freight — grain, livestock, ethanol",
      "Des Moines — growing distribution and logistics hub",
      "I-80 corridor connects Omaha to Chicago through Iowa",
      "Favorable insurance rates due to rural operations",
      "Iowa DOT regulates intrastate carriers",
    ],
    faq: [
      { question: "Is Iowa a cheap state for trucking insurance?", answer: "Iowa is generally favorable for trucking insurance rates due to lower traffic density, moderate litigation costs, and rural operating environments. Agricultural haulers with clean records can get very competitive pricing." },
    ],
  },
  "kentucky": {
    name: "Kentucky",
    abbr: "KY",
    description: "Kentucky is a major freight corridor state with Louisville serving as a critical logistics hub (UPS Worldport) and the I-65/I-71/I-75 corridors carrying heavy north-south freight. Trux insures carriers throughout Kentucky with programs designed for the state's mix of distribution, manufacturing, and agricultural freight.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Kentucky Transportation Cabinet regulates intrastate carriers.",
    keyFacts: [
      "Louisville — UPS Worldport and major distribution hub",
      "I-65, I-71, I-75 corridors for north-south freight",
      "Manufacturing freight (automotive, bourbon, tobacco)",
      "Moderate insurance rates",
      "Kentucky Transportation Cabinet regulates intrastate carriers",
    ],
    faq: [
      { question: "Is Kentucky a good state for trucking insurance rates?", answer: "Kentucky offers moderate rates with a mix of urban (Louisville, Lexington) and rural operations. The state's central location and moderate litigation environment help keep rates reasonable." },
    ],
  },
  "minnesota": {
    name: "Minnesota",
    abbr: "MN",
    description: "Minnesota's trucking industry serves the Upper Midwest with heavy agricultural, manufacturing, and retail distribution freight. Trux insures carriers throughout Minnesota — from Minneapolis-St. Paul metro distribution to agricultural hauling across the state and cross-border operations with Canada.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Minnesota DOT regulates intrastate carriers.",
    keyFacts: [
      "Minneapolis-St. Paul — major retail and distribution hub",
      "Heavy agricultural freight (grain, sugar beets, livestock)",
      "Cross-border operations with Canada (Manitoba, Ontario)",
      "Severe winter weather creates seasonal challenges",
      "Minnesota DOT regulates intrastate carriers",
    ],
    faq: [
      { question: "Does Minnesota winter weather affect my rates?", answer: "Minnesota's severe winters can affect rates slightly, but experienced carriers with clean winter driving records are not penalized significantly. Markets understand that Minnesota carriers are accustomed to winter operations." },
    ],
  },
  "mississippi": {
    name: "Mississippi",
    abbr: "MS",
    description: "Mississippi's trucking industry supports agricultural freight, manufacturing, and Gulf Coast port operations. Trux insures carriers throughout Mississippi with competitive rates that reflect the state's favorable operating environment.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Mississippi PSC regulates intrastate carriers.",
    keyFacts: [
      "Agricultural freight (cotton, soybeans, poultry, catfish)",
      "Gulf Coast port operations (Gulfport, Pascagoula)",
      "I-55 corridor connects Memphis to New Orleans through Mississippi",
      "Generally favorable insurance rates",
      "Mississippi PSC regulates intrastate carriers",
    ],
    faq: [
      { question: "Is Mississippi a cheap state for trucking insurance?", answer: "Mississippi generally offers favorable rates due to lower traffic density and moderate litigation costs. However, Gulf Coast operations may face slightly higher rates due to hurricane exposure." },
    ],
  },
  "nevada": {
    name: "Nevada",
    abbr: "NV",
    description: "Nevada's trucking industry is driven by Las Vegas construction and hospitality freight, Reno distribution operations, and the I-80/I-15 corridors connecting California to the interior West. Trux insures carriers throughout Nevada with programs designed for desert operations and the state's unique freight mix.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Nevada DMV regulates intrastate carriers.",
    keyFacts: [
      "Las Vegas — construction, hospitality, and entertainment freight",
      "Reno — growing distribution hub for Northern California overflow",
      "I-15 corridor connects LA to Salt Lake City through Nevada",
      "I-80 corridor connects Reno to the East",
      "Desert operations with extreme heat exposure",
    ],
    faq: [
      { question: "Do you cover Las Vegas construction trucking?", answer: "Yes. We insure dump trucks, flatbeds, and material haulers serving the Las Vegas construction market with programs that include job-site liability and construction-specific endorsements." },
    ],
  },
  "north-carolina": {
    name: "North Carolina",
    abbr: "NC",
    description: "North Carolina is a growing logistics hub with major operations along the I-85/I-40 corridors, the Charlotte metro distribution network, and the Port of Wilmington. Trux insures carriers throughout North Carolina with competitive programs for the state's diverse freight mix.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). North Carolina Utilities Commission regulates intrastate carriers.",
    keyFacts: [
      "Charlotte — major distribution and financial services hub",
      "Research Triangle (Raleigh-Durham) — growing tech freight",
      "I-85 and I-40 corridors for east-west and north-south freight",
      "Port of Wilmington — container and bulk operations",
      "NC Utilities Commission regulates intrastate carriers",
    ],
    faq: [
      { question: "Is North Carolina a good state for trucking operations?", answer: "North Carolina offers moderate insurance rates, a growing economy, and strategic East Coast location. The state's business-friendly environment and moderate litigation costs make it attractive for carrier domicile." },
    ],
  },
  "south-carolina": {
    name: "South Carolina",
    abbr: "SC",
    description: "South Carolina's trucking industry is anchored by the Port of Charleston — one of the fastest-growing East Coast ports — and the state's booming manufacturing sector. Trux insures carriers throughout South Carolina with programs designed for port drayage, manufacturing freight, and I-95/I-26 corridor operations.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). South Carolina PSC regulates intrastate carriers.",
    keyFacts: [
      "Port of Charleston — fastest-growing East Coast container port",
      "BMW, Boeing, Volvo manufacturing drives freight demand",
      "I-95 corridor for north-south East Coast freight",
      "I-26 connects Charleston to the Upstate",
      "Moderate insurance rates and business-friendly environment",
    ],
    faq: [
      { question: "Do you cover Charleston port drayage?", answer: "Yes. We insure carriers operating out of the Port of Charleston with full intermodal programs including trailer interchange, container coverage, and port liability." },
    ],
  },
  "virginia": {
    name: "Virginia",
    abbr: "VA",
    description: "Virginia is a critical East Coast freight state with the Port of Virginia (Norfolk/Newport News), the I-81 corridor, and the Northern Virginia/DC metro distribution network. Trux insures carriers throughout Virginia with programs designed for port operations, government freight, and the state's diverse logistics landscape.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Virginia DMV regulates intrastate carriers.",
    keyFacts: [
      "Port of Virginia (Norfolk) — major East Coast container port",
      "I-81 corridor — primary north-south freight artery",
      "Northern Virginia/DC metro — government and defense freight",
      "I-64 connects Norfolk to Richmond to Charlottesville",
      "Virginia DMV regulates intrastate carriers",
    ],
    faq: [
      { question: "Do you cover government/defense freight operations?", answer: "Yes. We insure carriers hauling government and defense freight in the Northern Virginia/DC corridor. We understand the additional security and compliance requirements of government contracting." },
    ],
  },
  "wisconsin": {
    name: "Wisconsin",
    abbr: "WI",
    description: "Wisconsin's trucking industry serves the state's strong manufacturing, dairy, and agricultural sectors. Trux insures carriers throughout Wisconsin — from Milwaukee metro distribution to Green Bay manufacturing freight, agricultural hauling, and cross-border operations with Minnesota and Michigan.",
    minimumLimits: "$750,000 auto liability for interstate carriers (FMCSA). Wisconsin DOT regulates intrastate carriers.",
    keyFacts: [
      "Strong manufacturing freight (paper, machinery, food processing)",
      "Dairy and agricultural hauling (milk tankers, cheese, grain)",
      "Milwaukee — major distribution hub for Upper Midwest",
      "I-94 and I-43 corridors",
      "Wisconsin DOT regulates intrastate carriers",
    ],
    faq: [
      { question: "Do you cover dairy/food tanker operations?", answer: "Yes. We insure milk tankers and food-grade liquid haulers with specialized cargo coverage for contamination, spoilage, and temperature-sensitive commodities." },
    ],
  },
};

export default function StatePage() {
  const { state } = useParams<{ state: string }>();
  const data = stateData[state || ""];

  if (!data) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-[36px] mb-4">State Not Found</h1>
          <p className="text-muted-custom mb-8">We don't have a dedicated page for this state yet.</p>
          <Link href="/" className="btn-solid">Return Home</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={`Trucking Insurance in ${data.name} (${data.abbr})`}
        description={`Commercial trucking insurance in ${data.name}. Trux Insurance Services is licensed in ${data.abbr} and insures owner-operators, small fleets, and large carriers. Get a quote today.`}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: `${data.name} Trucking Insurance`, url: `/states/${state}` },
        ]}
        faq={data.faq}
      />
      <Breadcrumbs items={[{ label: `${data.name} Trucking Insurance` }]} />

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-[var(--hair)]">
        <div className="container">
          <p className="eyebrow">LICENSED IN {data.abbr}</p>
          <div className="tick" />
          <h1 className="text-[36px] md:text-[48px] leading-[1.15] tracking-[-0.01em] mb-6">
            Trucking Insurance in <em>{data.name}</em>
          </h1>
          <p className="font-sans text-[17px] text-muted-custom leading-relaxed max-w-3xl">
            {data.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link href="/quote" className="btn-solid">Get a {data.name} Quote</Link>
            <a href="tel:3312401101" className="btn-ghost">Call (331) 240-1101</a>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-12 md:py-16 bg-sand">
        <div className="container">
          <p className="eyebrow">{data.abbr} TRUCKING FACTS</p>
          <div className="tick" />
          <h2 className="text-[26px] md:text-[32px] mb-8">What to know about trucking in {data.name}</h2>
          <div className="space-y-4">
            {data.keyFacts.map((fact, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-[var(--hair)]">
                <span className="text-purple font-serif font-medium text-[18px] leading-none mt-0.5">•</span>
                <span className="font-sans text-[15px] text-muted-custom leading-relaxed">{fact}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 border-l-[5px] border-[var(--purple)]">
            <p className="font-sans text-[13px] font-medium uppercase tracking-wider text-muted-custom mb-2">Minimum Insurance Requirements</p>
            <p className="font-sans text-[15px] text-ink leading-relaxed">{data.minimumLimits}</p>
          </div>
        </div>
      </section>

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
