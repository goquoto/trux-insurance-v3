export interface VehicleDetail {
  name: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  overview: string;
  whoNeedsIt: string[];
  commonClaims: string[];
  coveragesIncluded: string[];
  endorsements: string[];
  faq: { q: string; a: string }[];
  relatedVehicles: string[];
  states: string[];
}

export const vehicleDetails: Record<string, VehicleDetail> = {
  "18-wheelers": {
    name: "18 Wheelers",
    slug: "18-wheelers",
    category: "Long Haul",
    image: "/manus-storage/vehicle-18-wheeler_50e1411c.png",
    description: "Full coverage for 18-wheeler operations — auto liability, physical damage, cargo, and non-trucking liability for long-haul and regional drivers.",
    overview: "18-wheelers are the backbone of American freight transportation, hauling everything from consumer goods to industrial materials across thousands of miles. These Class 8 vehicles require specialized insurance programs that account for high-value equipment, long-distance exposure, multi-state operations, and the unique risks of over-the-road trucking. At Trux Insurance Services, we build comprehensive coverage packages for owner-operators running a single 18-wheeler and fleets managing dozens of tractor-trailer combinations. Our markets understand the difference between a clean-record driver hauling dry freight on I-80 and a new authority running reefer loads through mountain passes — and they price accordingly.",
    whoNeedsIt: [
      "Owner-operators with their own authority",
      "Small fleets (2–10 power units)",
      "Mid-size fleets (11–50 power units)",
      "Long-haul carriers running 48 states",
      "Regional carriers with dedicated lanes",
      "Lease-purchase operators",
      "New authorities (less than 2 years)"
    ],
    commonClaims: [
      "Rear-end collisions in highway traffic",
      "Jackknife accidents in adverse weather",
      "Cargo shifting and load securement failures",
      "Tire blowouts causing loss of control",
      "Backing accidents at docks and truck stops",
      "Underride accidents with smaller vehicles"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($750K–$1M+)",
      "Auto Physical Damage (Comp & Collision)",
      "Motor Truck Cargo ($100K–$250K)",
      "Non-Trucking / Bobtail Liability",
      "Trailer Interchange",
      "Uninsured/Underinsured Motorist",
      "Medical Payments",
      "Hired & Non-Owned Auto"
    ],
    endorsements: [
      "Broadened Pollution (CA 9948)",
      "Blanket Additional Insured",
      "Blanket Waiver of Subrogation",
      "30-Day Notice of Cancellation",
      "Towing & Labor ($5K–$10K)",
      "Downtime Coverage",
      "Rental Reimbursement"
    ],
    faq: [
      { q: "What does 18-wheeler insurance cost?", a: "Premiums vary based on driving record, years of experience, cargo type, radius, and equipment value. New authorities typically pay $12,000–$18,000/year for a single unit; experienced operators with clean records can see $8,000–$14,000/year. We shop multiple markets to find the best rate for your specific risk profile." },
      { q: "Do you insure new authorities?", a: "Yes. We work with several markets that accept new authorities (less than 2 years operating). Requirements typically include CDL experience of 2+ years, clean MVR, and completion of a safety orientation program." },
      { q: "What liability limits do I need?", a: "FMCSA requires a minimum of $750,000 for general freight. Brokers increasingly require $1,000,000. We recommend $1M as the standard and can add excess/umbrella coverage for higher limits." },
      { q: "Can I get coverage while under a lease?", a: "Yes. If you're leased to a carrier, you typically need non-trucking (bobtail) liability and physical damage. If you have your own authority, you need the full commercial auto package." }
    ],
    relatedVehicles: ["big-rigs", "semi-trucks", "dry-vans", "reefer-trailers"],
    states: ["illinois", "texas", "florida", "georgia", "ohio", "indiana", "tennessee", "pennsylvania"]
  },
  "big-rigs": {
    name: "Big Rigs",
    slug: "big-rigs",
    category: "Long Haul",
    image: "/manus-storage/vehicle-18-wheeler_50e1411c.png",
    description: "Comprehensive insurance programs designed for big rig truck drivers and fleet owners, including liability, cargo, and physical damage coverage.",
    overview: "Big rigs — the colloquial term for Class 8 tractor-trailers — represent the largest and most powerful vehicles on American highways. Whether you're pulling a 53-foot dry van, a flatbed loaded with steel, or a tanker full of fuel, your big rig needs insurance that matches the scale of your operation. We specialize in placing big rig coverage with A-rated carriers who understand the trucking industry. Our programs cover everything from the tractor and trailer to the cargo you haul, with options for owner-operators, small fleets, and growing companies alike.",
    whoNeedsIt: [
      "Independent owner-operators",
      "Small to mid-size fleet owners",
      "Long-haul and regional carriers",
      "Intermodal drayage operators",
      "Dedicated contract carriers",
      "Lease-purchase drivers transitioning to ownership"
    ],
    commonClaims: [
      "Multi-vehicle highway accidents",
      "Cargo damage from improper loading",
      "Theft of tractor or trailer",
      "Weather-related accidents (ice, fog, wind)",
      "Fatigue-related incidents",
      "Intersection collisions in urban areas"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($750K–$1M+)",
      "Physical Damage (Comprehensive & Collision)",
      "Motor Truck Cargo",
      "Non-Trucking Liability",
      "Trailer Interchange",
      "General Liability",
      "Occupational Accident"
    ],
    endorsements: [
      "Blanket Additional Insured",
      "Blanket Waiver of Subrogation",
      "Broadened Pollution",
      "Towing & Labor",
      "Rental Reimbursement",
      "Gap Coverage"
    ],
    faq: [
      { q: "What's the difference between big rig and 18-wheeler insurance?", a: "They're essentially the same — both refer to Class 8 tractor-trailer combinations. The coverage requirements are identical regardless of what you call the vehicle." },
      { q: "How do I lower my big rig insurance premiums?", a: "Maintain a clean driving record, install ELD/telematics, take defensive driving courses, increase deductibles, and bundle multiple coverages. We also find that carriers with 3+ years of clean experience see significantly better rates." },
      { q: "Do I need cargo insurance if I'm leased to a carrier?", a: "Typically no — the carrier's cargo policy covers freight while you're dispatched under their authority. However, you still need non-trucking liability and physical damage for your tractor." }
    ],
    relatedVehicles: ["18-wheelers", "semi-trucks", "flatbeds", "dry-vans"],
    states: ["texas", "illinois", "georgia", "ohio", "florida", "indiana", "tennessee"]
  },
  "box-trucks": {
    name: "Box Trucks",
    slug: "box-trucks",
    category: "Specialty",
    image: "/manus-storage/vehicle-box-truck_570f8e1f.png",
    description: "Custom insurance policies for box truck operations — from local delivery to regional freight. Liability, cargo, and physical damage coverage.",
    overview: "Box trucks (also called straight trucks or cube vans) are the workhorses of last-mile delivery, local freight, and small business logistics. Ranging from 10-foot vans to 26-foot straight trucks, these vehicles operate in high-density urban environments where accident frequency is elevated. Insurance for box trucks must account for frequent stops, tight maneuvering, and the diverse cargo they carry — from furniture and appliances to restaurant supplies and e-commerce packages. We place box truck coverage for single-vehicle operations up to large delivery fleets, with markets that understand the unique risk profile of urban and suburban commercial driving.",
    whoNeedsIt: [
      "Local delivery companies",
      "Moving and storage operators",
      "Furniture delivery services",
      "Restaurant and food distributors",
      "E-commerce fulfillment fleets",
      "Contractors and tradespeople",
      "Catering companies"
    ],
    commonClaims: [
      "Low-clearance bridge strikes",
      "Backing accidents in residential areas",
      "Pedestrian incidents in urban zones",
      "Cargo damage from shifting loads",
      "Side-swipe accidents in tight streets",
      "Theft of vehicle or contents"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($500K–$1M)",
      "Physical Damage (Comp & Collision)",
      "Cargo Coverage ($25K–$100K)",
      "General Liability",
      "Hired & Non-Owned Auto",
      "Uninsured Motorist",
      "Medical Payments"
    ],
    endorsements: [
      "Loading & Unloading Coverage",
      "Blanket Additional Insured",
      "Rental Reimbursement",
      "Towing & Labor",
      "Employee Dishonesty"
    ],
    faq: [
      { q: "Do I need a CDL to drive a box truck?", a: "Most box trucks under 26,001 lbs GVWR do not require a CDL. However, if you're hauling hazmat or carrying 16+ passengers, a CDL is required regardless of weight. Insurance requirements may differ based on CDL status." },
      { q: "How much does box truck insurance cost?", a: "Box truck insurance typically ranges from $4,000–$10,000/year per vehicle depending on radius, cargo type, driver experience, and claims history. Local operations with experienced drivers see the lowest rates." },
      { q: "Can I insure a rented box truck?", a: "Yes — Hired & Non-Owned Auto coverage protects you when using rented or borrowed vehicles for business purposes. This is especially important for moving companies that rent additional trucks during peak season." }
    ],
    relatedVehicles: ["straight-truck", "household-movers", "freight-trucks", "dry-vans"],
    states: ["illinois", "texas", "florida", "ohio", "georgia", "michigan", "pennsylvania"]
  },
  "car-haulers": {
    name: "Car Haulers",
    slug: "car-haulers",
    category: "Specialty",
    image: "/manus-storage/vehicle-car-hauler_2768f725.png",
    description: "Specialized coverage for car hauler operations including auto liability, cargo (vehicle transport), physical damage, and trailer interchange.",
    overview: "Car hauling is one of the most specialized segments of the trucking industry, requiring unique insurance coverage that standard trucking policies don't adequately address. Auto transport carriers face distinct risks: the cargo itself is high-value (often $200K+ per load), damage can occur during loading/unloading, and the open-air exposure creates weather and road debris risks. We work with markets that specialize in auto transport insurance, understanding the difference between open and enclosed carriers, dealer-to-dealer runs, auction transport, and consumer vehicle shipping. Our programs cover the full spectrum from single-truck owner-operators to multi-unit auto transport fleets.",
    whoNeedsIt: [
      "Auto transport owner-operators",
      "Car hauling fleet companies",
      "Dealer-to-dealer transport services",
      "Auction vehicle movers",
      "Enclosed luxury/exotic car carriers",
      "Motorcycle and specialty vehicle transporters"
    ],
    commonClaims: [
      "Vehicle damage during loading/unloading",
      "Road debris damage to transported vehicles",
      "Hydraulic ramp failures",
      "Weather damage (hail, wind) to open loads",
      "Theft of transported vehicles",
      "Chain/strap failure causing vehicle falls"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($750K–$1M)",
      "Physical Damage (Tractor & Trailer)",
      "Cargo Coverage ($150K–$500K per load)",
      "On-Hook / In-Transit Coverage",
      "General Liability",
      "Trailer Interchange"
    ],
    endorsements: [
      "Increased Cargo Limits for Exotic Vehicles",
      "Loading/Unloading Coverage Extension",
      "Blanket Additional Insured",
      "Towing & Labor",
      "Rental Reimbursement"
    ],
    faq: [
      { q: "How much cargo coverage do I need for car hauling?", a: "Standard open carriers should carry $150K–$250K per load. Enclosed carriers hauling luxury or exotic vehicles need $500K–$1M+. Your cargo limit should cover the maximum value of vehicles on your trailer at any given time." },
      { q: "Does my cargo insurance cover damage during loading?", a: "Yes — most car hauler cargo policies include loading and unloading coverage. However, confirm this with your specific policy, as some exclude damage that occurs while vehicles are on ramps." },
      { q: "Do I need special insurance for enclosed transport?", a: "Enclosed carriers typically need higher cargo limits due to the higher value of vehicles transported. The auto liability and physical damage portions are similar to open carriers." }
    ],
    relatedVehicles: ["flatbeds", "lowboy", "hotshot", "18-wheelers"],
    states: ["texas", "florida", "georgia", "illinois", "ohio", "north-carolina", "tennessee"]
  },
  "cement-trucks": {
    name: "Cement Trucks",
    slug: "cement-trucks",
    category: "Construction",
    image: "/manus-storage/vehicle-concrete-mixer_a67be6ce.png",
    description: "Commercial vehicle insurance for cement truck and concrete mixer operations — covering liability, physical damage, and specialized equipment.",
    overview: "Cement trucks and concrete mixers operate in one of the most demanding environments in commercial trucking. These heavy vehicles navigate construction sites, residential neighborhoods, and congested urban areas while carrying loads that can exceed 40,000 pounds. The rotating drum, chutes, and hydraulic systems add mechanical complexity and unique liability exposure. Insurance for cement trucks must account for both on-road and on-site risks, including property damage from spills, third-party injuries at job sites, and the high cost of specialized equipment repair. We place cement truck coverage with markets that understand construction-class vehicles and price based on actual operational risk rather than generic trucking models.",
    whoNeedsIt: [
      "Ready-mix concrete companies",
      "Independent cement truck operators",
      "Construction material suppliers",
      "Concrete pumping services",
      "Municipal and government contractors"
    ],
    commonClaims: [
      "Rollover accidents (high center of gravity)",
      "Concrete spills on roadways and properties",
      "Drum and chute mechanical failures",
      "On-site property damage",
      "Third-party injuries at construction sites",
      "Backing accidents at job sites"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($1M)",
      "Physical Damage (Specialized Equipment)",
      "General Liability",
      "Workers' Compensation",
      "Inland Marine (Equipment)",
      "Umbrella/Excess Liability"
    ],
    endorsements: [
      "Pollution Liability (concrete spills)",
      "Blanket Additional Insured",
      "Waiver of Subrogation",
      "Completed Operations",
      "Equipment Breakdown"
    ],
    faq: [
      { q: "Why is cement truck insurance more expensive?", a: "Cement trucks have higher claim severity due to their weight, high center of gravity (rollover risk), and operation in congested construction zones. The specialized drum and hydraulic equipment also costs more to repair or replace." },
      { q: "Do I need general liability in addition to auto liability?", a: "Yes — auto liability covers accidents while driving, but general liability covers third-party injuries and property damage at job sites, which is where many cement truck claims originate." },
      { q: "What about pollution coverage for concrete spills?", a: "Standard auto policies exclude pollution. A broadened pollution endorsement or separate pollution liability policy covers cleanup costs and third-party damages from concrete or cement spills." }
    ],
    relatedVehicles: ["dump-trucks", "personal-use-dump-trucks", "farm-dump-trucks", "garbage-trucks"],
    states: ["illinois", "texas", "ohio", "georgia", "florida", "indiana", "michigan"]
  },
  "commercial-fleets": {
    name: "Commercial Fleets",
    slug: "commercial-fleets",
    category: "Fleet",
    image: "/manus-storage/vehicle-double-trailer_fdb9a752.png",
    description: "Fleet insurance programs for 2–200+ trucks. Volume discounts, centralized management, and coverage tailored to your operation's risk profile.",
    overview: "Managing insurance for a commercial fleet requires a fundamentally different approach than insuring individual trucks. Fleet programs offer volume pricing, centralized certificate management, streamlined claims handling, and the ability to add/remove units without rewriting the entire policy. At Trux Insurance Services, we build fleet programs that scale with your business — whether you're running 3 trucks or 300. Our markets offer experience-rated programs where your loss history directly impacts your premium, rewarding safe operations with meaningful savings. We handle the complexity of multi-state filings, driver management, and equipment schedules so you can focus on running your business.",
    whoNeedsIt: [
      "Growing carriers (2–10 trucks)",
      "Mid-size fleets (11–50 trucks)",
      "Large fleets (50–200+ trucks)",
      "Multi-state operations",
      "Companies with mixed vehicle types",
      "Carriers with dedicated contracts"
    ],
    commonClaims: [
      "Multi-vehicle incidents",
      "Driver turnover-related accidents",
      "Cargo claims across multiple loads",
      "Maintenance-related mechanical failures",
      "Subrogation from third-party claims",
      "Workers' compensation injuries"
    ],
    coveragesIncluded: [
      "Fleet Auto Liability ($1M+)",
      "Fleet Physical Damage",
      "Blanket Cargo Coverage",
      "General Liability",
      "Workers' Compensation",
      "Umbrella/Excess ($2M–$10M)",
      "Hired & Non-Owned Auto"
    ],
    endorsements: [
      "Fleet-wide Blanket Additional Insured",
      "Blanket Waiver of Subrogation",
      "30-Day Notice of Cancellation",
      "Broadened Pollution",
      "Employee Dishonesty",
      "Cyber Liability"
    ],
    faq: [
      { q: "How many trucks do I need for fleet pricing?", a: "Most markets consider 3+ power units a fleet. However, the best volume discounts typically start at 5–10 units. We can structure programs for as few as 2 trucks if they're under the same authority." },
      { q: "Can I add and remove trucks during the policy term?", a: "Yes — fleet policies allow you to add or remove units throughout the year. We handle the endorsements and pro-rated premium adjustments. Most changes take effect within 24–48 hours." },
      { q: "Do all my drivers need to be listed on the policy?", a: "Yes — all drivers operating under your authority must be listed and approved by the insurance carrier. We help manage driver additions, MVR reviews, and exclusions when necessary." }
    ],
    relatedVehicles: ["18-wheelers", "semi-trucks", "flatbeds", "dry-vans"],
    states: ["illinois", "texas", "florida", "georgia", "ohio", "indiana", "tennessee", "michigan"]
  },
  "dry-vans": {
    name: "Dry Vans",
    slug: "dry-vans",
    category: "Long Haul",
    image: "/manus-storage/vehicle-18-wheeler_50e1411c.png",
    description: "Insurance for dry van semi-trailer operations hauling general freight. Auto liability, cargo coverage, physical damage, and trailer interchange.",
    overview: "Dry van trailers are the most common trailer type on American highways, hauling everything from packaged consumer goods to industrial supplies. These enclosed 53-foot trailers protect cargo from weather and theft while providing maximum versatility for general freight operations. Insurance for dry van operations must account for the diverse cargo types, multi-state routing, and the frequency of loading dock incidents. We place dry van coverage with markets that offer competitive rates for experienced operators and programs designed for new authorities building their business.",
    whoNeedsIt: [
      "General freight carriers",
      "LTL (less-than-truckload) operators",
      "Dedicated contract carriers",
      "E-commerce logistics providers",
      "Regional distribution carriers",
      "Owner-operators pulling dry vans"
    ],
    commonClaims: [
      "Cargo theft (especially electronics, consumer goods)",
      "Water damage from trailer seal failures",
      "Loading dock accidents",
      "Rear-end collisions",
      "Cargo shifting during transit",
      "Trailer door damage"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($750K–$1M)",
      "Physical Damage (Tractor & Trailer)",
      "Motor Truck Cargo ($100K–$250K)",
      "Trailer Interchange",
      "Non-Trucking Liability",
      "General Liability"
    ],
    endorsements: [
      "Theft Coverage Enhancement",
      "Blanket Additional Insured",
      "Refrigeration Breakdown (if reefer-capable)",
      "Towing & Labor",
      "Rental Reimbursement"
    ],
    faq: [
      { q: "What cargo limits do I need for dry van freight?", a: "Most brokers require $100K cargo coverage. We recommend $100K–$250K depending on the value of freight you typically haul. High-value loads (electronics, pharmaceuticals) may require higher limits." },
      { q: "Does trailer interchange cover my borrowed trailer?", a: "Yes — trailer interchange coverage protects trailers you're pulling under a written interchange agreement. This is essential for owner-operators who pull trailers owned by shippers or carriers." },
      { q: "How does dry van insurance differ from reefer?", a: "Dry van insurance is typically less expensive because there's no refrigeration equipment to cover and no spoilage risk. Reefer operations add mechanical breakdown and temperature-sensitive cargo coverage." }
    ],
    relatedVehicles: ["18-wheelers", "semi-trucks", "reefer-trailers", "freight-trucks"],
    states: ["illinois", "texas", "ohio", "indiana", "georgia", "florida", "tennessee", "missouri"]
  },
  "dump-trucks": {
    name: "Dump Trucks",
    slug: "dump-trucks",
    category: "Construction",
    image: "/manus-storage/vehicle-dump-truck_ec579d65.png",
    description: "Protecting dump truck drivers and construction haulers with liability, physical damage, and general liability coverage for on-site and road operations.",
    overview: "Dump trucks operate in a dual environment — public roads and private construction sites — creating a unique insurance challenge. On the road, they face standard trucking risks amplified by heavy loads and frequent stops. On job sites, they encounter uneven terrain, overhead hazards, and proximity to workers and equipment. Insurance for dump trucks must bridge both worlds with commercial auto liability for road operations and general liability for job site exposure. We work with markets that specialize in construction-class vehicles and understand the seasonal nature of many dump truck operations, offering flexible programs that adjust to your work volume.",
    whoNeedsIt: [
      "Independent dump truck operators",
      "Construction material haulers",
      "Excavation and grading contractors",
      "Sand, gravel, and aggregate haulers",
      "Municipal and government subcontractors",
      "Landscaping companies with dump trucks"
    ],
    commonClaims: [
      "Spilled loads on public roads",
      "Raised-bed contact with overhead wires/bridges",
      "Rollover on uneven job site terrain",
      "Third-party injuries at construction sites",
      "Property damage from flying debris",
      "Hydraulic system failures"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($1M)",
      "Physical Damage",
      "General Liability ($1M/$2M)",
      "Workers' Compensation",
      "Inland Marine (Equipment)",
      "Umbrella/Excess Liability"
    ],
    endorsements: [
      "Pollution Liability",
      "Blanket Additional Insured",
      "Waiver of Subrogation",
      "Completed Operations",
      "Hired & Non-Owned Auto"
    ],
    faq: [
      { q: "Do I need both auto and general liability?", a: "Yes — auto liability covers road accidents while general liability covers job site incidents. Most construction contracts require both, plus workers' compensation if you have employees." },
      { q: "What about seasonal operations?", a: "Many dump truck operators work seasonally. We can structure policies with lay-up periods or adjusted coverage during off-seasons to reduce premiums while maintaining required minimums." },
      { q: "Does my insurance cover the material I'm hauling?", a: "Standard auto liability doesn't cover cargo. If you're hauling materials you own or are responsible for, you need motor truck cargo coverage. If the material belongs to the job site owner, their property policy may cover it." }
    ],
    relatedVehicles: ["cement-trucks", "farm-dump-trucks", "personal-use-dump-trucks", "flatbeds"],
    states: ["illinois", "texas", "ohio", "georgia", "florida", "indiana", "michigan", "tennessee"]
  },
  "farm-dump-trucks": {
    name: "Farm Dump Trucks",
    slug: "farm-dump-trucks",
    category: "Agricultural",
    image: "/manus-storage/vehicle-dump-truck_ec579d65.png",
    description: "Specialized coverage for agricultural dump truck operations — including seasonal use, farm-to-market routes, and mixed commercial/farm use.",
    overview: "Farm dump trucks occupy a unique space in commercial vehicle insurance — they often operate under agricultural exemptions but still need commercial coverage when hauling for hire or traveling on public roads beyond farm-to-market distances. These vehicles haul grain, produce, soil, fertilizer, and other agricultural materials, often on a seasonal basis that creates coverage gaps if not properly managed. We understand the distinction between farm-use and commercial-use dump trucks and can structure policies that cover both scenarios, ensuring you're protected whether you're hauling your own harvest to the elevator or contracting for a neighbor's operation.",
    whoNeedsIt: [
      "Farmers with commercial dump trucks",
      "Agricultural hauling contractors",
      "Grain elevator operators",
      "Seasonal harvest haulers",
      "Farm-to-market transport operators",
      "Mixed-use farm/commercial operators"
    ],
    commonClaims: [
      "Road accidents on rural highways",
      "Grain spills on public roads",
      "Equipment damage from field conditions",
      "Seasonal rust and weather damage",
      "Collisions with farm equipment",
      "Overweight citations and fines"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability",
      "Physical Damage",
      "Cargo Coverage (Agricultural Products)",
      "General Liability",
      "Seasonal Coverage Options"
    ],
    endorsements: [
      "Farm-Use Extension",
      "Seasonal Lay-Up Credit",
      "Pollution Liability (fertilizer/chemical spills)",
      "Hired & Non-Owned Auto"
    ],
    faq: [
      { q: "Do I need commercial insurance for my farm dump truck?", a: "If you're hauling for hire (being paid to transport someone else's material) or traveling beyond farm-to-market distances, you need commercial coverage. Farm-use-only vehicles may qualify for agricultural rates." },
      { q: "Can I get seasonal coverage?", a: "Yes — we can structure policies with seasonal adjustments or lay-up periods during months when the truck isn't in use, reducing your annual premium while maintaining year-round liability coverage." }
    ],
    relatedVehicles: ["dump-trucks", "hopper-trailers", "personal-use-dump-trucks", "flatbeds"],
    states: ["illinois", "iowa", "indiana", "ohio", "minnesota", "missouri", "wisconsin"]
  },
  "flatbeds": {
    name: "Flatbeds",
    slug: "flatbeds",
    category: "Specialty",
    image: "/manus-storage/vehicle-flatbed_5d44f487.png",
    description: "Insurance for flatbed truck operators hauling oversized loads, construction materials, and machinery. Includes cargo, liability, and physical damage.",
    overview: "Flatbed trucking is among the most skilled and highest-risk segments of the industry. Operators haul oversized loads, heavy machinery, construction materials, and industrial equipment — all exposed to weather, road debris, and the constant challenge of proper load securement. Insurance for flatbed operations must account for the higher cargo values, the increased liability from unsecured or shifting loads, and the physical demands that lead to higher injury rates during tarping and strapping. We work with markets that specialize in flatbed coverage and understand the difference between a step-deck hauling lumber and a lowboy carrying a D8 bulldozer.",
    whoNeedsIt: [
      "Flatbed owner-operators",
      "Heavy haul carriers",
      "Construction material haulers",
      "Steel and metal transporters",
      "Machinery and equipment movers",
      "Lumber and building supply carriers"
    ],
    commonClaims: [
      "Load securement failures (shifting cargo)",
      "Tarping injuries (falls from trailer)",
      "Oversized load contact with bridges/signs",
      "Weather damage to exposed cargo",
      "Chain/strap breakage",
      "Third-party property damage from fallen cargo"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($750K–$1M)",
      "Physical Damage (Tractor & Trailer)",
      "Motor Truck Cargo ($100K–$500K)",
      "General Liability",
      "Occupational Accident",
      "Excess/Umbrella Liability"
    ],
    endorsements: [
      "Oversized Load Coverage",
      "Tarping Equipment Coverage",
      "Blanket Additional Insured",
      "Broadened Pollution",
      "Towing & Labor (Heavy Duty)"
    ],
    faq: [
      { q: "Why is flatbed insurance more expensive than dry van?", a: "Flatbed operations have higher claim frequency and severity due to load securement risks, exposed cargo, and the physical demands of tarping. Cargo values are often higher (machinery, steel), and oversized loads create additional liability exposure." },
      { q: "What cargo limits do I need for flatbed hauling?", a: "It depends on what you haul. General construction materials: $100K–$150K. Steel and metals: $150K–$250K. Heavy machinery: $250K–$500K+. We match your cargo limits to the actual value of loads you typically carry." },
      { q: "Does my policy cover oversized/overweight loads?", a: "Standard policies may have exclusions for permitted loads. We can add endorsements for oversized and overweight operations, including escort vehicle requirements and special routing." }
    ],
    relatedVehicles: ["18-wheelers", "lowboy", "hotshot", "car-haulers"],
    states: ["texas", "illinois", "ohio", "georgia", "indiana", "pennsylvania", "tennessee", "michigan"]
  },
  "food-trucks": {
    name: "Food Trucks",
    slug: "food-trucks",
    category: "Specialty",
    image: "/manus-storage/vehicle-food-truck_c1431b9b.png",
    description: "Combined commercial auto and general liability coverage for food truck operations — protecting your vehicle, equipment, and customers.",
    overview: "Food trucks combine the risks of a commercial vehicle with those of a restaurant — creating a unique insurance need that standard trucking or restaurant policies don't fully address. Your food truck needs commercial auto coverage for road operations, general liability for customer interactions, and property coverage for the specialized cooking equipment inside. Many food truck operators also need coverage for events, festivals, and commissary operations. We work with markets that understand the food truck business model and can build comprehensive packages that satisfy both DOT requirements and event venue insurance demands.",
    whoNeedsIt: [
      "Food truck owner-operators",
      "Mobile catering companies",
      "Food truck fleet operators",
      "Festival and event food vendors",
      "Corporate catering trucks",
      "Ice cream and dessert trucks"
    ],
    commonClaims: [
      "Customer slip-and-fall injuries",
      "Foodborne illness claims",
      "Cooking equipment fires",
      "Vehicle accidents while driving to events",
      "Property damage at event venues",
      "Equipment theft"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability",
      "General Liability ($1M/$2M)",
      "Property Coverage (Equipment & Inventory)",
      "Products Liability (Food)",
      "Workers' Compensation",
      "Business Interruption"
    ],
    endorsements: [
      "Event/Festival Coverage",
      "Spoilage Coverage",
      "Equipment Breakdown",
      "Hired & Non-Owned Auto",
      "Liquor Liability (if applicable)"
    ],
    faq: [
      { q: "What insurance do I need to operate at events?", a: "Most event venues require $1M general liability with the venue named as additional insured. Some require $2M aggregate. We can provide certificates of insurance for each event with the venue listed." },
      { q: "Does my policy cover food spoilage?", a: "With a spoilage endorsement, yes. This covers loss of perishable inventory due to equipment breakdown, power failure, or refrigeration malfunction. Standard policies don't include this automatically." },
      { q: "How much does food truck insurance cost?", a: "A comprehensive food truck package typically runs $3,000–$8,000/year depending on your menu (deep frying increases risk), revenue, number of events, and claims history." }
    ],
    relatedVehicles: ["box-trucks", "straight-truck", "household-movers"],
    states: ["illinois", "texas", "florida", "georgia", "ohio", "michigan", "minnesota"]
  },
  "freight-trucks": {
    name: "Freight Trucks",
    slug: "freight-trucks",
    category: "Long Haul",
    image: "/manus-storage/vehicle-straight-truck_7dac0152.png",
    description: "Comprehensive freight truck insurance for single operators and growing fleets — auto liability, cargo, physical damage, and bobtail coverage.",
    overview: "Freight trucks encompass the broad category of commercial vehicles used to transport goods for compensation. Whether you're running a single straight truck on local routes or managing a fleet of tractor-trailers across multiple states, your freight operation needs insurance that matches your specific risk profile. We specialize in freight truck coverage for motor carriers of all sizes, with programs that grow with your business from a single unit to a full fleet. Our markets offer competitive rates for experienced operators and accessible programs for new authorities entering the freight industry.",
    whoNeedsIt: [
      "New freight carriers (startup operations)",
      "Growing carriers adding units",
      "LTL freight operators",
      "Expedited freight carriers",
      "Regional freight haulers",
      "Intermodal freight operators"
    ],
    commonClaims: [
      "Highway accidents during long-haul runs",
      "Cargo damage from improper loading",
      "Theft of high-value freight",
      "Weather-related incidents",
      "Fatigue-related accidents",
      "Loading dock collisions"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($750K–$1M)",
      "Physical Damage",
      "Motor Truck Cargo",
      "Non-Trucking / Bobtail",
      "General Liability",
      "Trailer Interchange"
    ],
    endorsements: [
      "Blanket Additional Insured",
      "Broadened Pollution",
      "Towing & Labor",
      "Rental Reimbursement",
      "Downtime Coverage"
    ],
    faq: [
      { q: "What's the minimum insurance I need to haul freight?", a: "FMCSA requires $750,000 auto liability for general freight carriers (BMC-91). You'll also need cargo coverage (typically $100K minimum) and may need additional coverages depending on what you haul and who you haul for." },
      { q: "Can I start with one truck and add more later?", a: "Absolutely. We structure policies that allow you to add units throughout the year. Many of our clients started with a single truck and grew to 10, 20, or 50+ units while keeping the same program." }
    ],
    relatedVehicles: ["18-wheelers", "dry-vans", "box-trucks", "semi-trucks"],
    states: ["illinois", "texas", "florida", "georgia", "ohio", "indiana", "tennessee", "missouri"]
  },
  "fuel-haulers": {
    name: "Fuel Haulers",
    slug: "fuel-haulers",
    category: "Hazmat",
    image: "/manus-storage/vehicle-hazmat_c99780dc.png",
    description: "High-risk coverage for fuel and hazmat hauling operations. Includes pollution liability, MCS-90 endorsement, and specialized cargo coverage.",
    overview: "Fuel hauling represents one of the highest-risk segments in commercial trucking. Transporting gasoline, diesel, jet fuel, and other petroleum products creates catastrophic loss potential from spills, fires, and explosions. Insurance for fuel haulers must include robust pollution liability, MCS-90 endorsements for hazmat, and cargo coverage designed for liquid petroleum products. The regulatory environment is strict, and carriers must maintain specific insurance minimums to keep their hazmat endorsements active. We work with the limited number of markets willing to insure fuel hauling operations, securing coverage that meets DOT requirements while managing premium costs.",
    whoNeedsIt: [
      "Petroleum transport companies",
      "Fuel delivery services",
      "Gas station supply carriers",
      "Aviation fuel haulers",
      "Heating oil delivery companies",
      "Bulk fuel distributors"
    ],
    commonClaims: [
      "Fuel spills during delivery",
      "Tank ruptures from accidents",
      "Environmental contamination",
      "Fire and explosion incidents",
      "Overfill incidents at delivery sites",
      "Cross-contamination of fuel products"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($1M–$5M)",
      "Physical Damage (Specialized Tanker)",
      "Pollution Liability ($1M–$5M)",
      "Motor Truck Cargo (Petroleum)",
      "MCS-90 Endorsement",
      "Umbrella/Excess ($5M–$10M)"
    ],
    endorsements: [
      "Broadened Pollution (CA 9948)",
      "Environmental Cleanup Coverage",
      "Business Interruption (Spill Response)",
      "Blanket Additional Insured",
      "Third-Party Pollution Liability"
    ],
    faq: [
      { q: "What liability limits do fuel haulers need?", a: "FMCSA requires $1,000,000 minimum for hazmat carriers (including fuel). However, most fuel companies carry $5M+ in combined liability and pollution coverage due to the catastrophic loss potential of fuel spills and fires." },
      { q: "What is the MCS-90 endorsement?", a: "MCS-90 is a federal endorsement that guarantees the public will be compensated for environmental damage caused by hazmat carriers, even if the carrier's policy doesn't otherwise cover the loss. It's required for all hazmat-endorsed carriers." },
      { q: "Why is fuel hauler insurance so expensive?", a: "The catastrophic loss potential is enormous — a single fuel spill can cost millions in cleanup, environmental remediation, and third-party damages. Few markets insure fuel haulers, and those that do price for the worst-case scenario." }
    ],
    relatedVehicles: ["tanker-trucks", "hazmat", "18-wheelers", "commercial-fleets"],
    states: ["texas", "illinois", "ohio", "georgia", "florida", "indiana", "pennsylvania"]
  },
  "garbage-trucks": {
    name: "Garbage Trucks",
    slug: "garbage-trucks",
    category: "Specialty",
    image: "/manus-storage/vehicle-garbage-truck_0de58343.png",
    description: "Commercial insurance for waste collection and garbage truck operations — covering liability, physical damage, and workers' compensation.",
    overview: "Garbage trucks and waste collection vehicles operate in uniquely hazardous conditions — frequent stops in residential areas, workers on foot near moving vehicles, hydraulic compaction systems, and exposure to potentially hazardous waste materials. Insurance for waste haulers must address both the vehicle risks and the environmental liability that comes with handling and transporting waste. We work with markets that specialize in waste industry coverage, understanding the difference between residential collection, commercial dumpster service, roll-off container operations, and transfer station hauling.",
    whoNeedsIt: [
      "Residential waste collection companies",
      "Commercial dumpster services",
      "Roll-off container operators",
      "Recycling collection companies",
      "Transfer station haulers",
      "Municipal waste contractors"
    ],
    commonClaims: [
      "Worker injuries during collection",
      "Pedestrian/cyclist accidents",
      "Property damage (mailboxes, fences, cars)",
      "Hydraulic system failures",
      "Environmental contamination",
      "Vehicle fires from hazardous waste"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($1M)",
      "Physical Damage",
      "General Liability ($1M/$2M)",
      "Workers' Compensation",
      "Pollution Liability",
      "Umbrella/Excess Liability"
    ],
    endorsements: [
      "Environmental Impairment Liability",
      "Blanket Additional Insured",
      "Hired & Non-Owned Auto",
      "Employee Benefits Liability",
      "Equipment Breakdown"
    ],
    faq: [
      { q: "Do I need pollution coverage for garbage trucks?", a: "Yes — waste collection creates environmental exposure from leaking fluids, hazardous materials mixed with regular waste, and potential contamination at disposal sites. Pollution liability is essential for waste haulers." },
      { q: "What about workers' comp for my collection crew?", a: "Workers' compensation is critical for waste collection — it's one of the most dangerous occupations in America. Your crew faces risks from traffic, heavy lifting, sharp objects, and hazardous materials every day." }
    ],
    relatedVehicles: ["waste-haulers", "dump-trucks", "cement-trucks", "box-trucks"],
    states: ["illinois", "texas", "florida", "ohio", "georgia", "michigan", "indiana"]
  },
  "gooseneck-trailers": {
    name: "Gooseneck Trailers",
    slug: "gooseneck-trailers",
    category: "Specialty",
    image: "/manus-storage/vehicle-hotshot_28901d59.png",
    description: "Coverage for gooseneck trailer operations including physical damage, cargo, and liability — whether hauling equipment, livestock, or materials.",
    overview: "Gooseneck trailers are versatile hauling platforms used across agriculture, construction, and general freight. Connected to the truck bed via a gooseneck hitch, these trailers offer superior stability and higher weight capacity than bumper-pull alternatives. Insurance for gooseneck operations varies significantly based on what you're hauling — livestock, equipment, vehicles, or general materials — and whether you're operating for hire or hauling your own goods. We match your gooseneck operation with the right coverage structure, whether that's a full commercial trucking policy or a more targeted program for specific hauling needs.",
    whoNeedsIt: [
      "Hotshot operators with gooseneck flatbeds",
      "Livestock haulers",
      "Equipment transport operators",
      "Agricultural haulers",
      "Construction material movers",
      "Horse and livestock transporters"
    ],
    commonClaims: [
      "Hitch failures and trailer disconnection",
      "Livestock injuries during transport",
      "Equipment damage from shifting loads",
      "Jackknife accidents",
      "Tire blowouts on loaded trailers",
      "Loading ramp injuries"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability",
      "Physical Damage (Truck & Trailer)",
      "Cargo Coverage",
      "Livestock Mortality (if applicable)",
      "General Liability",
      "Hired & Non-Owned Auto"
    ],
    endorsements: [
      "Livestock Coverage Extension",
      "Equipment Floater",
      "Blanket Additional Insured",
      "Towing & Labor"
    ],
    faq: [
      { q: "Do I need commercial insurance for my gooseneck?", a: "If you're hauling for hire (being paid to transport goods), yes. If you're hauling your own materials for your own business, you may still need commercial coverage depending on the weight and use." },
      { q: "What about livestock coverage?", a: "Standard cargo policies don't cover live animals. You need a specific livestock mortality endorsement or a policy designed for animal transport. This covers death or injury to animals during transit." }
    ],
    relatedVehicles: ["hotshot", "flatbeds", "car-haulers", "livestock"],
    states: ["texas", "illinois", "ohio", "indiana", "iowa", "missouri", "kentucky"]
  },
  "hopper-trailers": {
    name: "Hopper Trailers",
    slug: "hopper-trailers",
    category: "Agricultural",
    image: "/manus-storage/vehicle-grain-hopper_d49f8dd7.png",
    description: "Insurance for hopper trailer and grain hauling operations. Covers cargo (bulk commodities), liability, and physical damage for agricultural transport.",
    overview: "Hopper trailers — both bottom-dump and pneumatic — are essential for transporting bulk agricultural commodities, construction aggregates, and industrial materials. These specialized trailers require insurance that accounts for the high volume of material transported, seasonal demand fluctuations, and the unique risks of bulk commodity hauling. Whether you're hauling grain from harvest to elevator, sand to construction sites, or plastic pellets to manufacturing plants, your hopper operation needs coverage that matches your specific commodity and routing. We work with markets familiar with agricultural and bulk hauling to build programs that protect your equipment and cargo.",
    whoNeedsIt: [
      "Grain haulers and harvest operators",
      "Sand and gravel transporters",
      "Feed and fertilizer haulers",
      "Plastic pellet and chemical transporters",
      "Construction aggregate haulers",
      "Seasonal agricultural carriers"
    ],
    commonClaims: [
      "Grain spills from hopper doors",
      "Overweight violations and fines",
      "Commodity contamination",
      "Trailer structural failures",
      "Pneumatic system malfunctions",
      "Road accidents with loaded trailers"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability",
      "Physical Damage (Tractor & Hopper)",
      "Motor Truck Cargo (Bulk Commodities)",
      "General Liability",
      "Pollution Liability (if chemical/fertilizer)"
    ],
    endorsements: [
      "Contamination Coverage",
      "Seasonal Coverage Adjustments",
      "Blanket Additional Insured",
      "Equipment Breakdown"
    ],
    faq: [
      { q: "What cargo coverage do I need for grain hauling?", a: "Cargo limits for grain hauling typically range from $100K–$200K per load depending on commodity prices. During harvest season when prices are high, you may want to increase limits temporarily." },
      { q: "Do I need pollution coverage for fertilizer hauling?", a: "Yes — fertilizer spills can cause environmental damage and cleanup costs. If you haul any chemical or fertilizer products, pollution liability is strongly recommended." }
    ],
    relatedVehicles: ["farm-dump-trucks", "flatbeds", "tanker-trucks", "18-wheelers"],
    states: ["illinois", "iowa", "indiana", "ohio", "minnesota", "missouri", "wisconsin", "kentucky"]
  },
  "household-movers": {
    name: "Household Movers",
    slug: "household-movers",
    category: "Specialty",
    image: "/manus-storage/vehicle-moving-van_8271e775.png",
    description: "Specialized moving company insurance — protecting your trucks, your crew, and your customers' belongings during local and long-distance moves.",
    overview: "Moving companies face a unique combination of risks: heavy lifting injuries, damage to customers' personal property, navigation of tight residential spaces, and the emotional stakes of handling people's most valued possessions. Insurance for household movers must cover the vehicle, the cargo (customers' belongings), workers' compensation for your crew, and general liability for property damage at pickup and delivery locations. We build comprehensive moving company programs that satisfy DOT requirements for interstate movers and state regulations for local operations, while protecting your business from the claims that are inherent in the moving industry.",
    whoNeedsIt: [
      "Local moving companies",
      "Long-distance/interstate movers",
      "Corporate relocation services",
      "Specialty item movers (pianos, antiques)",
      "Storage and moving companies",
      "Labor-only moving services"
    ],
    commonClaims: [
      "Damage to customers' furniture and belongings",
      "Worker injuries from heavy lifting",
      "Property damage at pickup/delivery (walls, floors, doors)",
      "Vehicle accidents with loaded trucks",
      "Lost or missing items",
      "Stairway and elevator damage"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability",
      "Physical Damage",
      "Cargo/Valuation Coverage (Customers' Goods)",
      "General Liability ($1M/$2M)",
      "Workers' Compensation",
      "Hired & Non-Owned Auto"
    ],
    endorsements: [
      "Full Value Protection (Cargo)",
      "Blanket Additional Insured",
      "Storage Coverage",
      "Employee Dishonesty",
      "Rental Reimbursement"
    ],
    faq: [
      { q: "What's the difference between released value and full value protection?", a: "Released value is the minimum coverage ($0.60/lb per item) — it's free but barely covers anything. Full value protection means the mover is liable for the full replacement value of damaged items. Most reputable movers offer full value protection." },
      { q: "Do I need interstate authority to move across state lines?", a: "Yes — interstate movers must register with FMCSA and maintain minimum insurance levels ($750K auto liability, $5K cargo per vehicle, $10K per occurrence). We handle the filings and ensure your coverage meets federal requirements." }
    ],
    relatedVehicles: ["box-trucks", "straight-truck", "commercial-fleets", "freight-trucks"],
    states: ["illinois", "texas", "florida", "georgia", "ohio", "michigan", "virginia", "north-carolina"]
  },
  "limousines": {
    name: "Limousines",
    slug: "limousines",
    category: "Passenger",
    image: "/manus-storage/vehicle-straight-truck_7dac0152.png",
    description: "Commercial auto coverage for limousine and livery services — including passenger liability, physical damage, and hired/non-owned auto.",
    overview: "Limousine and livery services carry passengers — making liability exposure significantly higher than freight operations. A single accident can result in multiple injury claims, and the high-profile nature of limousine services means claims are often pursued aggressively. Insurance for limousines must include robust passenger liability, physical damage for expensive vehicles, and coverage for the unique risks of chauffeured transportation. We work with markets that specialize in passenger-carrying vehicles and understand the regulatory requirements that vary by state and municipality.",
    whoNeedsIt: [
      "Limousine service companies",
      "Executive car services",
      "Airport shuttle operators",
      "Wedding and event transportation",
      "Party bus operators",
      "Corporate transportation providers"
    ],
    commonClaims: [
      "Passenger injury claims",
      "Multi-passenger accidents",
      "Property damage to high-value vehicles",
      "Slip-and-fall entering/exiting vehicle",
      "Alcohol-related incidents",
      "Third-party vehicle damage"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($1M–$5M)",
      "Physical Damage (High-Value Vehicles)",
      "Passenger Liability",
      "General Liability",
      "Hired & Non-Owned Auto",
      "Uninsured/Underinsured Motorist"
    ],
    endorsements: [
      "Liquor Liability",
      "Event Coverage",
      "Gap Coverage",
      "Rental Reimbursement"
    ],
    faq: [
      { q: "What liability limits do limousine services need?", a: "Requirements vary by state and municipality, but most jurisdictions require $1M–$1.5M minimum. Many corporate contracts require $5M. We recommend carrying the highest limits you can afford given the passenger injury exposure." },
      { q: "Does my policy cover alcohol-related incidents?", a: "Standard auto liability covers accidents regardless of passenger behavior. However, if you serve alcohol in the vehicle, you may need a separate liquor liability endorsement to cover claims related to intoxicated passengers." }
    ],
    relatedVehicles: ["box-trucks", "commercial-fleets", "straight-truck"],
    states: ["illinois", "texas", "florida", "georgia", "ohio", "virginia", "north-carolina"]
  },
  "logging-trucks": {
    name: "Logging Trucks",
    slug: "logging-trucks",
    category: "Specialty",
    image: "/manus-storage/vehicle-logging-truck_42047660.png",
    description: "High-risk coverage for logging truck operations — including oversize/overweight loads, rural road exposure, and specialized cargo coverage.",
    overview: "Logging trucks operate in some of the most challenging conditions in commercial trucking — steep mountain grades, unpaved forest roads, extreme weather, and loads that can shift catastrophically. The combination of heavy, irregularly shaped cargo, remote locations, and demanding terrain makes logging one of the highest-risk trucking operations. Insurance for logging trucks must account for these elevated risks with appropriate liability limits, specialized cargo coverage for timber, and physical damage coverage that reflects the harsh operating environment. We work with the limited number of markets willing to insure logging operations, securing coverage that keeps your trucks legal and your business protected.",
    whoNeedsIt: [
      "Logging company truck operators",
      "Independent log haulers",
      "Timber transport contractors",
      "Pulpwood haulers",
      "Chip van operators",
      "Forest products transporters"
    ],
    commonClaims: [
      "Load shifts and log spills",
      "Rollover on mountain grades",
      "Brake failures on steep descents",
      "Road surface failures (soft shoulders)",
      "Bunk and stake failures",
      "Third-party vehicle damage from fallen logs"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($1M)",
      "Physical Damage (Heavy-Duty Equipment)",
      "Cargo Coverage (Timber/Logs)",
      "General Liability",
      "Workers' Compensation",
      "Umbrella/Excess"
    ],
    endorsements: [
      "Oversize/Overweight Load Coverage",
      "Off-Road Coverage Extension",
      "Pollution Liability",
      "Equipment Breakdown"
    ],
    faq: [
      { q: "Why is logging truck insurance so expensive?", a: "Logging has one of the highest claim frequencies and severities in trucking due to the combination of heavy loads, steep terrain, rural roads, and the catastrophic potential of log spills. Few markets insure logging operations, which further limits competition." },
      { q: "Does my policy cover off-road operations?", a: "Standard commercial auto policies may exclude off-road operations. We add off-road extensions to cover your truck while operating on logging roads, forest service roads, and private timber land." }
    ],
    relatedVehicles: ["flatbeds", "dump-trucks", "18-wheelers", "lowboy"],
    states: ["wisconsin", "michigan", "minnesota", "georgia", "virginia", "north-carolina", "south-carolina"]
  },
  "mobile-home-movers": {
    name: "Mobile Home Movers",
    slug: "mobile-home-movers",
    category: "Specialty",
    image: "/manus-storage/vehicle-oversized_915b9e40.png",
    description: "Insurance for mobile home and manufactured housing transport — covering oversized load liability, cargo damage, and escort requirements.",
    overview: "Mobile home and manufactured housing transport is a highly specialized operation requiring oversized load permits, escort vehicles, and careful route planning. These wide loads create significant liability exposure on public roads, and the cargo itself — often valued at $50,000–$200,000+ — requires specialized coverage that standard trucking policies don't provide. Insurance for mobile home movers must address the unique risks of transporting structures that are wider than standard lanes, taller than standard clearances, and more fragile than typical freight. We work with markets that understand manufactured housing transport and can provide the coverage your operation needs.",
    whoNeedsIt: [
      "Mobile home transport companies",
      "Manufactured housing dealers",
      "Modular building movers",
      "Tiny home transporters",
      "Park model RV movers",
      "Construction trailer movers"
    ],
    commonClaims: [
      "Structural damage during transport",
      "Contact with overhead utilities/bridges",
      "Third-party property damage (wide load)",
      "Wind damage to transported structures",
      "Foundation/setup damage",
      "Escort vehicle accidents"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($1M)",
      "Physical Damage",
      "Cargo Coverage (Manufactured Housing)",
      "General Liability",
      "Oversized Load Liability",
      "Escort Vehicle Coverage"
    ],
    endorsements: [
      "Increased Cargo Limits",
      "Setup/Installation Coverage",
      "Blanket Additional Insured",
      "Pollution Liability"
    ],
    faq: [
      { q: "What cargo limits do I need for mobile homes?", a: "Cargo limits should match the value of the most expensive unit you transport. Single-wide homes: $75K–$150K. Double-wide homes: $150K–$300K. Custom or luxury manufactured homes may require $300K+." },
      { q: "Does my insurance cover the escort vehicles?", a: "Escort vehicles can be covered under your commercial auto policy if they're owned by your company, or under hired & non-owned auto if you contract escort services. Confirm this coverage is in place before every move." }
    ],
    relatedVehicles: ["flatbeds", "lowboy", "car-haulers", "commercial-fleets"],
    states: ["texas", "florida", "georgia", "north-carolina", "south-carolina", "tennessee", "indiana"]
  },
  "personal-use-dump-trucks": {
    name: "Personal Use Dump Trucks",
    slug: "personal-use-dump-trucks",
    category: "Construction",
    image: "/manus-storage/vehicle-dump-truck_ec579d65.png",
    description: "Coverage for dump trucks used for personal or non-commercial purposes — liability, physical damage, and optional cargo coverage.",
    overview: "Not all dump trucks operate commercially. Many are used for personal property maintenance, small-scale landscaping, or occasional hauling that doesn't constitute a for-hire operation. However, personal auto policies typically exclude vehicles over certain weight thresholds, leaving dump truck owners in a coverage gap. We offer programs for personal-use dump trucks that provide appropriate liability and physical damage coverage without the full commercial trucking requirements — while ensuring you're properly covered if your use ever crosses into commercial territory.",
    whoNeedsIt: [
      "Property owners with dump trucks",
      "Hobby farmers",
      "Landscaping enthusiasts",
      "Rural property maintenance",
      "Occasional hauling (not for hire)"
    ],
    commonClaims: [
      "Road accidents during personal use",
      "Property damage on private land",
      "Raised-bed contact with structures",
      "Hydraulic system failures",
      "Third-party injuries on property"
    ],
    coveragesIncluded: [
      "Liability Coverage",
      "Physical Damage (Comp & Collision)",
      "Uninsured Motorist",
      "Medical Payments"
    ],
    endorsements: [
      "Occasional Commercial Use",
      "Property Coverage Extension",
      "Towing & Labor"
    ],
    faq: [
      { q: "Can I use personal auto insurance for my dump truck?", a: "Most personal auto policies exclude vehicles over 10,000–14,000 lbs GVWR. Dump trucks typically exceed this threshold and require either a commercial policy or a specialized personal-use commercial vehicle policy." },
      { q: "What if I occasionally haul for a neighbor?", a: "If you receive any compensation for hauling, you're technically operating commercially and need commercial coverage. We can add an occasional commercial use endorsement to cover these situations." }
    ],
    relatedVehicles: ["dump-trucks", "farm-dump-trucks", "cement-trucks"],
    states: ["illinois", "texas", "ohio", "indiana", "michigan", "missouri", "kentucky"]
  },
  "reefer-trailers": {
    name: "Reefer Trailers",
    slug: "reefer-trailers",
    category: "Long Haul",
    image: "/manus-storage/vehicle-reefer_e62249e6.png",
    description: "Refrigerated trailer insurance for temperature-controlled cargo. Covers mechanical breakdown, spoilage, cargo loss, and standard trucking liability.",
    overview: "Refrigerated trailers (reefers) transport temperature-sensitive cargo — produce, meat, dairy, pharmaceuticals, and other perishables — where a mechanical failure or temperature excursion can destroy an entire load worth $50,000–$200,000+. Insurance for reefer operations must go beyond standard trucking coverage to include refrigeration breakdown, spoilage coverage, and cargo limits that reflect the high value of temperature-controlled freight. We work with markets that understand the reefer segment and price based on your specific commodity mix, maintenance practices, and temperature monitoring capabilities.",
    whoNeedsIt: [
      "Produce haulers",
      "Meat and dairy transporters",
      "Frozen food carriers",
      "Pharmaceutical cold-chain operators",
      "Floral and nursery transporters",
      "Seafood haulers"
    ],
    commonClaims: [
      "Refrigeration unit mechanical failure",
      "Temperature excursion (cargo spoilage)",
      "Fuel contamination of cargo",
      "Door seal failures",
      "Pre-cool failures before loading",
      "Reefer unit theft"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($750K–$1M)",
      "Physical Damage (Tractor & Reefer Trailer)",
      "Motor Truck Cargo ($100K–$250K)",
      "Refrigeration Breakdown Coverage",
      "Spoilage Coverage",
      "Trailer Interchange"
    ],
    endorsements: [
      "Reefer Reimbursement",
      "Increased Cargo Limits (Perishables)",
      "Blanket Additional Insured",
      "Temperature Recording Device Discount",
      "Towing & Labor"
    ],
    faq: [
      { q: "What's the difference between cargo coverage and spoilage coverage?", a: "Cargo coverage protects against theft, damage from accidents, and similar losses. Spoilage coverage specifically covers loss of perishable cargo due to refrigeration breakdown or temperature excursion — a risk unique to reefer operations." },
      { q: "How can I reduce my reefer insurance costs?", a: "Install GPS temperature monitoring, maintain detailed pre-trip inspection records for the reefer unit, keep maintenance logs current, and demonstrate a clean claims history. Some markets offer discounts for continuous temperature recording devices." },
      { q: "What cargo limits do I need for produce?", a: "Produce loads typically range from $50K–$150K in value. We recommend $100K–$200K cargo limits for produce haulers. High-value loads (pharmaceuticals, seafood) may require $250K+." }
    ],
    relatedVehicles: ["18-wheelers", "dry-vans", "semi-trucks", "freight-trucks"],
    states: ["florida", "texas", "georgia", "illinois", "ohio", "indiana", "michigan", "tennessee"]
  },
  "semi-trucks": {
    name: "Semi Trucks",
    slug: "semi-trucks",
    category: "Long Haul",
    image: "/manus-storage/vehicle-bobtail_5686bcc9.png",
    description: "Complete semi-truck insurance packages — auto liability, physical damage, cargo, non-trucking liability, and trailer interchange for owner-operators and fleets.",
    overview: "Semi trucks — the tractor units that pull various trailer types — are the core asset of any trucking operation. Whether you own a single day cab for local drayage or a fleet of sleeper cabs running coast-to-coast, your semi truck insurance needs to protect your investment and keep you legal on the road. We build semi truck insurance packages that cover every scenario: pulling your own trailer, pulling someone else's trailer under interchange, bobtailing between loads, and personal use during off-duty time. Our programs work for owner-operators, small fleets, and growing companies, with markets that reward safe driving and operational experience.",
    whoNeedsIt: [
      "Owner-operators (single truck)",
      "Small fleet owners (2–10 trucks)",
      "Lease-purchase operators",
      "Day cab drayage operators",
      "Sleeper cab long-haul drivers",
      "New CDL holders starting their business"
    ],
    commonClaims: [
      "Rear-end collisions in traffic",
      "Jackknife accidents",
      "Tire blowouts at highway speed",
      "Backing accidents at docks/truck stops",
      "Engine and drivetrain failures",
      "Theft of tractor unit"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($750K–$1M)",
      "Physical Damage (Comp & Collision)",
      "Non-Trucking / Bobtail Liability",
      "Trailer Interchange",
      "Motor Truck Cargo",
      "Uninsured/Underinsured Motorist",
      "Medical Payments"
    ],
    endorsements: [
      "Towing & Labor ($5K–$15K)",
      "Rental Reimbursement / Downtime",
      "Gap Coverage",
      "Blanket Additional Insured",
      "Broadened Pollution"
    ],
    faq: [
      { q: "What's the difference between bobtail and non-trucking liability?", a: "They're often used interchangeably, but technically: non-trucking liability covers you during personal use when not under dispatch. Bobtail liability covers you when driving without a trailer (bobtailing) between loads. Most policies combine both." },
      { q: "How much physical damage coverage do I need?", a: "Physical damage should cover the actual cash value or agreed value of your tractor. A 2020 Peterbilt 579 might be insured for $80K–$120K. We recommend agreed value policies to avoid depreciation disputes at claim time." },
      { q: "Can I get insurance with a new CDL?", a: "Yes, but options are limited and premiums are higher. Most markets require 1–2 years of CDL experience. We have programs for new CDL holders, though rates improve significantly after 2 years of clean driving." }
    ],
    relatedVehicles: ["18-wheelers", "big-rigs", "dry-vans", "flatbeds"],
    states: ["illinois", "texas", "florida", "georgia", "ohio", "indiana", "tennessee", "pennsylvania"]
  },
  "tow-trucks": {
    name: "Tow Trucks",
    slug: "tow-trucks",
    category: "Specialty",
    image: "/manus-storage/vehicle-tow-truck_73dc31eb.png",
    description: "Specialized tow truck insurance covering on-hook liability, garage keepers, auto liability, and physical damage for towing and recovery operations.",
    overview: "Tow truck operations face a unique combination of risks that standard commercial auto policies don't adequately address. You're responsible for other people's vehicles while they're on your hook, in your yard, or on your flatbed. You operate in emergency conditions — roadside, at accident scenes, in adverse weather — where the risk of secondary accidents is elevated. Insurance for tow trucks must include on-hook liability (covering vehicles in your care), garage keepers coverage (for vehicles stored at your facility), and robust auto liability for the inherently dangerous nature of roadside operations. We work with markets that specialize in towing and recovery insurance.",
    whoNeedsIt: [
      "Light-duty tow truck operators",
      "Medium-duty wrecker services",
      "Heavy-duty recovery operators",
      "Flatbed tow truck companies",
      "Roadside assistance providers",
      "Impound and storage facilities"
    ],
    commonClaims: [
      "Damage to towed vehicles (on-hook)",
      "Secondary accidents at roadside scenes",
      "Damage to vehicles in storage (garage keepers)",
      "Worker injuries during hookup/recovery",
      "Property damage during recovery operations",
      "Winch and cable failures"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($1M)",
      "Physical Damage (Tow Truck & Equipment)",
      "On-Hook / In-Tow Liability ($100K–$500K)",
      "Garage Keepers Coverage",
      "General Liability",
      "Workers' Compensation"
    ],
    endorsements: [
      "Heavy Recovery Equipment Coverage",
      "Blanket Additional Insured",
      "Pollutant Cleanup (Accident Scenes)",
      "False Arrest / Wrongful Repossession"
    ],
    faq: [
      { q: "What is on-hook coverage?", a: "On-hook (or in-tow) coverage protects vehicles while they're being towed by your truck. If you damage a customer's vehicle during towing — whether from your equipment, an accident, or operator error — on-hook coverage pays for the repair or replacement." },
      { q: "Do I need garage keepers coverage?", a: "If you store vehicles at your facility (impound lot, repair shop, holding yard), yes. Garage keepers coverage protects vehicles in your care, custody, and control against theft, vandalism, fire, and weather damage." },
      { q: "How much does tow truck insurance cost?", a: "Light-duty tow trucks: $6,000–$12,000/year. Medium-duty wreckers: $10,000–$18,000/year. Heavy-duty recovery: $15,000–$30,000+/year. Costs depend on your radius, services offered, claims history, and storage operations." }
    ],
    relatedVehicles: ["flatbeds", "commercial-fleets", "box-trucks", "straight-truck"],
    states: ["illinois", "texas", "florida", "ohio", "georgia", "michigan", "indiana", "pennsylvania"]
  },
  "tanker-trucks": {
    name: "Tanker Trucks",
    slug: "tanker-trucks",
    category: "Hazmat",
    image: "/manus-storage/vehicle-tanker_1b5bc9ca.png",
    description: "Coverage for liquid and dry bulk tanker operations — including hazmat endorsements, pollution liability, and specialized cargo coverage.",
    overview: "Tanker trucks transport liquids and dry bulk materials — from water and milk to chemicals and petroleum products. The insurance requirements vary dramatically based on what you're hauling: food-grade tankers carrying milk have very different risk profiles than chemical tankers carrying corrosive materials. All tanker operations share common risks: rollover (liquid surge), spills, and the specialized equipment costs. We work with markets across the tanker spectrum, from food-grade and water hauling to full hazmat chemical transport, building programs that match your specific commodity and regulatory requirements.",
    whoNeedsIt: [
      "Chemical transport companies",
      "Water haulers",
      "Milk and food-grade tanker operators",
      "Petroleum product haulers",
      "Dry bulk (cement, flour, plastic) carriers",
      "Waste liquid transporters"
    ],
    commonClaims: [
      "Rollover from liquid surge",
      "Chemical spills and environmental damage",
      "Tank ruptures from accidents",
      "Cross-contamination between loads",
      "Valve and fitting failures",
      "Overpressure incidents"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($1M–$5M)",
      "Physical Damage (Specialized Tanker)",
      "Cargo Coverage (Liquid/Bulk)",
      "Pollution Liability",
      "MCS-90 Endorsement (if hazmat)",
      "Umbrella/Excess Liability"
    ],
    endorsements: [
      "Environmental Cleanup Coverage",
      "Broadened Pollution (CA 9948)",
      "Business Interruption",
      "Blanket Additional Insured",
      "Tank Testing/Certification Coverage"
    ],
    faq: [
      { q: "Do all tanker trucks need hazmat insurance?", a: "No — only tankers hauling hazardous materials (as defined by DOT) need hazmat-level coverage. Water tankers, milk tankers, and food-grade operations have standard commercial trucking requirements. Chemical and petroleum tankers need the full hazmat package." },
      { q: "Why do tankers have higher rollover risk?", a: "Liquid cargo creates 'surge' — the liquid shifts during turns, lane changes, and braking, raising the center of gravity and creating destabilizing forces. Partially loaded tankers are the most dangerous because the liquid has more room to move." },
      { q: "What pollution limits do I need?", a: "For non-hazmat liquids: $100K–$500K. For hazmat/chemicals: $1M–$5M minimum. Environmental cleanup costs can be astronomical — a single chemical spill can cost millions in remediation." }
    ],
    relatedVehicles: ["fuel-haulers", "hazmat", "18-wheelers", "commercial-fleets"],
    states: ["texas", "illinois", "ohio", "georgia", "florida", "indiana", "pennsylvania", "louisiana"]
  },
  "waste-haulers": {
    name: "Waste Haulers",
    slug: "waste-haulers",
    category: "Specialty",
    image: "/manus-storage/vehicle-garbage-truck_0de58343.png",
    description: "Insurance programs for waste hauling and recycling operations — covering commercial auto, general liability, and environmental exposure.",
    overview: "Waste hauling encompasses a broad range of operations — from residential curbside collection to industrial waste transport, roll-off container service, and hazardous waste removal. Each segment carries distinct risks and insurance requirements. The common thread is environmental liability: waste materials can contaminate soil and groundwater, creating long-tail claims that surface years after the hauling occurred. We build waste hauler programs that address both the immediate operational risks (accidents, injuries, property damage) and the long-term environmental exposure that makes this industry uniquely challenging to insure.",
    whoNeedsIt: [
      "Roll-off container companies",
      "Industrial waste haulers",
      "Recycling collection services",
      "Hazardous waste transporters",
      "Construction debris haulers",
      "Medical waste carriers"
    ],
    commonClaims: [
      "Environmental contamination",
      "Worker injuries during collection",
      "Property damage from containers",
      "Vehicle accidents with loaded trucks",
      "Illegal dumping liability",
      "Third-party exposure claims"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($1M)",
      "Physical Damage",
      "General Liability ($1M/$2M)",
      "Pollution Liability ($1M–$5M)",
      "Workers' Compensation",
      "Umbrella/Excess"
    ],
    endorsements: [
      "Environmental Impairment Liability",
      "Professional Liability (Waste Consulting)",
      "Blanket Additional Insured",
      "Hired & Non-Owned Auto"
    ],
    faq: [
      { q: "What's the difference between garbage trucks and waste haulers?", a: "Garbage trucks typically refer to residential collection vehicles. Waste haulers is a broader term covering roll-off containers, industrial waste, hazardous materials, and specialized waste streams. Insurance requirements increase with the hazard level of materials transported." },
      { q: "Do I need environmental insurance?", a: "Yes — all waste haulers should carry pollution/environmental liability. Even non-hazardous waste can cause contamination if improperly handled. Environmental claims can surface years later, making this coverage essential for long-term protection." }
    ],
    relatedVehicles: ["garbage-trucks", "dump-trucks", "tanker-trucks", "commercial-fleets"],
    states: ["illinois", "texas", "florida", "ohio", "georgia", "michigan", "indiana"]
  },
  "intermodal-containers": {
    name: "Intermodal / Containers",
    slug: "intermodal-containers",
    category: "Long Haul",
    image: "/manus-storage/vehicle-intermodal_892c8afc.png",
    description: "Coverage for intermodal container and chassis operations — including trailer interchange, port drayage liability, and cargo coverage.",
    overview: "Intermodal container transport — moving shipping containers between ports, rail yards, and final destinations — is a specialized segment with unique insurance challenges. Drayage operators navigate congested port areas, deal with chassis they don't own (interchange agreements), and handle cargo that's been sealed at origin with unknown contents. Insurance for intermodal operations must address trailer interchange exposure (you're responsible for chassis damage), the high-frequency/low-speed accident environment of port operations, and cargo coverage for containerized freight. We work with markets that understand the intermodal segment and its distinct risk profile.",
    whoNeedsIt: [
      "Port drayage operators",
      "Intermodal trucking companies",
      "Container transport services",
      "Rail-to-truck transfer carriers",
      "Chassis pool operators",
      "Last-mile container delivery"
    ],
    commonClaims: [
      "Chassis damage (interchange liability)",
      "Container drops and falls",
      "Port area accidents (low-speed, high-frequency)",
      "Cargo damage from container handling",
      "Twist-lock failures",
      "Overweight container violations"
    ],
    coveragesIncluded: [
      "Commercial Auto Liability ($750K–$1M)",
      "Physical Damage (Tractor)",
      "Trailer Interchange (Chassis Coverage)",
      "Motor Truck Cargo",
      "General Liability",
      "Non-Trucking Liability"
    ],
    endorsements: [
      "Increased Interchange Limits",
      "Container Damage Coverage",
      "Blanket Additional Insured",
      "Port/Terminal Coverage Extension"
    ],
    faq: [
      { q: "What is trailer interchange coverage?", a: "Trailer interchange covers damage to chassis and containers you're pulling under a written interchange agreement. Since drayage operators rarely own the chassis they pull, this coverage is essential — you're financially responsible for damage to equipment in your possession." },
      { q: "Do I need cargo coverage for sealed containers?", a: "Yes — even though you didn't load the container, you're responsible for the cargo while it's in your possession. Cargo coverage protects you if the container is damaged, stolen, or involved in an accident during your portion of the transport." }
    ],
    relatedVehicles: ["18-wheelers", "semi-trucks", "dry-vans", "commercial-fleets"],
    states: ["illinois", "texas", "florida", "georgia", "ohio", "virginia", "south-carolina", "north-carolina"]
  }
};

// Helper to get image for a vehicle by slug (with fallback)
export function getVehicleImage(slug: string): string {
  return vehicleDetails[slug]?.image || "/manus-storage/vehicle-18-wheeler_9c23ce62.png";
}

// Get all vehicle slugs
export function getAllVehicleSlugs(): string[] {
  return Object.keys(vehicleDetails);
}
