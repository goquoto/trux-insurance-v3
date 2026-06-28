import { useState } from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "wouter";

const VEHICLES = [
  {
    name: "18 Wheelers",
    slug: "18-wheelers",
    description: "Full coverage for 18-wheeler operations — auto liability, physical damage, cargo, and non-trucking liability for long-haul and regional drivers.",
    category: "Long Haul",
  },
  {
    name: "Big Rigs",
    slug: "big-rigs",
    description: "Comprehensive insurance programs designed for big rig truck drivers and fleet owners, including liability, cargo, and physical damage coverage.",
    category: "Long Haul",
  },
  {
    name: "Box Trucks",
    slug: "box-trucks",
    description: "Custom insurance policies for box truck operations — from local delivery to regional freight. Liability, cargo, and physical damage coverage.",
    category: "Specialty",
  },
  {
    name: "Car Haulers",
    slug: "car-haulers",
    description: "Specialized coverage for car hauler operations including auto liability, cargo (vehicle transport), physical damage, and trailer interchange.",
    category: "Specialty",
  },
  {
    name: "Cement Trucks",
    slug: "cement-trucks",
    description: "Commercial vehicle insurance for cement truck and concrete mixer operations — covering liability, physical damage, and specialized equipment.",
    category: "Construction",
  },
  {
    name: "Commercial Fleets",
    slug: "commercial-fleets",
    description: "Fleet insurance programs for 2–200+ trucks. Volume discounts, centralized management, and coverage tailored to your operation's risk profile.",
    category: "Fleet",
  },
  {
    name: "Dry Vans",
    slug: "dry-vans",
    description: "Insurance for dry van semi-trailer operations hauling general freight. Auto liability, cargo coverage, physical damage, and trailer interchange.",
    category: "Long Haul",
  },
  {
    name: "Dump Trucks",
    slug: "dump-trucks",
    description: "Protecting dump truck drivers and construction haulers with liability, physical damage, and general liability coverage for on-site and road operations.",
    category: "Construction",
  },
  {
    name: "Farm Dump Trucks",
    slug: "farm-dump-trucks",
    description: "Specialized coverage for agricultural dump truck operations — including seasonal use, farm-to-market routes, and mixed commercial/farm use.",
    category: "Agricultural",
  },
  {
    name: "Flatbeds",
    slug: "flatbeds",
    description: "Insurance for flatbed truck operators hauling oversized loads, construction materials, and machinery. Includes cargo, liability, and physical damage.",
    category: "Specialty",
  },
  {
    name: "Food Trucks",
    slug: "food-trucks",
    description: "Combined commercial auto and general liability coverage for food truck operations — protecting your vehicle, equipment, and customers.",
    category: "Specialty",
  },
  {
    name: "Freight Trucks",
    slug: "freight-trucks",
    description: "Comprehensive freight truck insurance for single operators and growing fleets — auto liability, cargo, physical damage, and bobtail coverage.",
    category: "Long Haul",
  },
  {
    name: "Fuel Haulers",
    slug: "fuel-haulers",
    description: "High-risk coverage for fuel and hazmat hauling operations. Includes pollution liability, MCS-90 endorsement, and specialized cargo coverage.",
    category: "Hazmat",
  },
  {
    name: "Garbage Trucks",
    slug: "garbage-trucks",
    description: "Commercial insurance for waste collection and garbage truck operations — covering liability, physical damage, and workers' compensation.",
    category: "Specialty",
  },
  {
    name: "Gooseneck Trailers",
    slug: "gooseneck-trailers",
    description: "Coverage for gooseneck trailer operations including physical damage, cargo, and liability — whether hauling equipment, livestock, or materials.",
    category: "Specialty",
  },
  {
    name: "Hopper Trailers",
    slug: "hopper-trailers",
    description: "Insurance for hopper trailer and grain hauling operations. Covers cargo (bulk commodities), liability, and physical damage for agricultural transport.",
    category: "Agricultural",
  },
  {
    name: "Household Movers",
    slug: "household-movers",
    description: "Specialized moving company insurance — protecting your trucks, your crew, and your customers' belongings during local and long-distance moves.",
    category: "Specialty",
  },
  {
    name: "Limousines",
    slug: "limousines",
    description: "Commercial auto coverage for limousine and livery services — including passenger liability, physical damage, and hired/non-owned auto.",
    category: "Passenger",
  },
  {
    name: "Logging Trucks",
    slug: "logging-trucks",
    description: "High-risk coverage for logging truck operations — including oversize/overweight loads, rural road exposure, and specialized cargo coverage.",
    category: "Specialty",
  },
  {
    name: "Mobile Home Movers",
    slug: "mobile-home-movers",
    description: "Insurance for mobile home and manufactured housing transport — covering oversized load liability, cargo damage, and escort requirements.",
    category: "Specialty",
  },
  {
    name: "Personal Use Dump Trucks",
    slug: "personal-use-dump-trucks",
    description: "Coverage for dump trucks used for personal or non-commercial purposes — liability, physical damage, and optional cargo coverage.",
    category: "Construction",
  },
  {
    name: "Reefer Trailers",
    slug: "reefer-trailers",
    description: "Refrigerated trailer insurance for temperature-controlled cargo. Covers mechanical breakdown, spoilage, cargo loss, and standard trucking liability.",
    category: "Long Haul",
  },
  {
    name: "Semi Trucks",
    slug: "semi-trucks",
    description: "Complete semi-truck insurance packages — auto liability, physical damage, cargo, non-trucking liability, and trailer interchange for owner-operators and fleets.",
    category: "Long Haul",
  },
  {
    name: "Tow Trucks",
    slug: "tow-trucks",
    description: "Specialized tow truck insurance covering on-hook liability, garage keepers, auto liability, and physical damage for towing and recovery operations.",
    category: "Specialty",
  },
  {
    name: "Tanker Trucks",
    slug: "tanker-trucks",
    description: "Coverage for liquid and dry bulk tanker operations — including hazmat endorsements, pollution liability, and specialized cargo coverage.",
    category: "Hazmat",
  },
  {
    name: "Waste Haulers",
    slug: "waste-haulers",
    description: "Insurance programs for waste hauling and recycling operations — covering commercial auto, general liability, and environmental exposure.",
    category: "Specialty",
  },
  {
    name: "Intermodal / Containers",
    slug: "intermodal-containers",
    description: "Coverage for intermodal container and chassis operations — including trailer interchange, port drayage liability, and cargo coverage.",
    category: "Long Haul",
  },
];

const CATEGORIES = ["All", "Long Haul", "Specialty", "Construction", "Agricultural", "Hazmat", "Fleet", "Passenger"];

export default function VehiclesWeCover() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredVehicles = activeCategory === "All"
    ? VEHICLES
    : VEHICLES.filter((v) => v.category === activeCategory);

  return (
    <Layout>
      <SEO
        title="Vehicles We Cover — Commercial Truck Insurance"
        description="Trux Insurance Services covers all types of commercial vehicles: 18 wheelers, flatbeds, dump trucks, reefers, tankers, tow trucks, and more. Get a quote today."
        canonical="/vehicles-we-cover"
      />
      <Breadcrumbs items={[{ label: "Insurance", href: "/coverages" }, { label: "Vehicles We Cover" }]} />

      {/* Hero */}
      <section className="py-16 bg-paper-2">
        <div className="container">
          <span className="eyebrow">Vehicles We Insure</span>
          <div className="tick mt-4"></div>
          <h1 className="mt-4 mb-4">You drive, we protect.</h1>
          <p className="lead max-w-2xl">
            We provide coverage for all types of commercial vehicles — from single owner-operator rigs to large specialized fleets. If it moves freight, we insure it.
          </p>
        </div>
      </section>

      <hr className="hairline" />

      {/* Filter + Grid */}
      <section className="section bg-paper">
        <div className="container">
          {/* Category filter */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-sans text-[13px] font-medium tracking-wide transition-colors ${
                  activeCategory === cat
                    ? "bg-[var(--ink)] text-white"
                    : "bg-paper-2 text-muted-custom border border-[var(--hair)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
                }`}
              >
                {cat}
              </button>
            ))}

            {/* View toggle */}
            <div className="ml-auto flex items-center gap-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${viewMode === "grid" ? "text-[var(--ink)]" : "text-[var(--taupe)]"}`}
                aria-label="Grid view"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="1" width="6" height="6" />
                  <rect x="11" y="1" width="6" height="6" />
                  <rect x="1" y="11" width="6" height="6" />
                  <rect x="11" y="11" width="6" height="6" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${viewMode === "list" ? "text-[var(--ink)]" : "text-[var(--taupe)]"}`}
                aria-label="List view"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="1" y1="3" x2="17" y2="3" />
                  <line x1="1" y1="9" x2="17" y2="9" />
                  <line x1="1" y1="15" x2="17" y2="15" />
                </svg>
              </button>
            </div>
          </div>

          <p className="font-sans text-[14px] text-muted-custom mb-8">
            Showing {filteredVehicles.length} vehicle type{filteredVehicles.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </p>

          {/* Grid view */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <Link
                  key={vehicle.slug}
                  href={`/vehicles-we-cover/${vehicle.slug}`}
                  className="group block border border-[var(--hair)] p-6 transition-all hover:border-[var(--ink)] hover:shadow-sm no-underline"
                >
                  <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--taupe)]">
                    {vehicle.category}
                  </span>
                  <h3 className="mt-2 mb-3 text-[18px] group-hover:text-[var(--purple)]">
                    {vehicle.name}
                  </h3>
                  <p className="font-sans text-[14px] text-muted-custom leading-relaxed line-clamp-3">
                    {vehicle.description}
                  </p>
                  <span className="inline-block mt-4 font-sans text-[13px] font-medium text-[var(--ink)] group-hover:text-[var(--purple)] transition-colors">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* List view */}
          {viewMode === "list" && (
            <div className="divide-y divide-[var(--hair)]">
              {filteredVehicles.map((vehicle) => (
                <Link
                  key={vehicle.slug}
                  href={`/vehicles-we-cover/${vehicle.slug}`}
                  className="group flex items-start gap-6 py-5 no-underline transition-colors hover:bg-paper-2 px-4 -mx-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-[17px] mb-0 group-hover:text-[var(--purple)]">
                        {vehicle.name}
                      </h3>
                      <span className="font-sans text-[11px] font-medium tracking-[0.15em] uppercase text-[var(--taupe)] bg-paper-2 px-2 py-0.5">
                        {vehicle.category}
                      </span>
                    </div>
                    <p className="font-sans text-[14px] text-muted-custom leading-relaxed mb-0">
                      {vehicle.description}
                    </p>
                  </div>
                  <span className="font-sans text-[13px] font-medium text-[var(--ink)] group-hover:text-[var(--purple)] transition-colors whitespace-nowrap mt-1">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <hr className="hairline" />

      {/* Don't see your vehicle? */}
      <section className="section bg-sand">
        <div className="container text-center">
          <h2 className="mb-4">Don't see your vehicle type?</h2>
          <p className="lead max-w-xl mx-auto mb-8">
            We insure nearly every type of commercial vehicle on the road. If your vehicle isn't listed above, call us — chances are we can cover it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:3312401101" className="btn-solid no-underline">
              Call (331) 240-1101
            </a>
            <Link href="/quote" className="btn-ghost no-underline">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Coverage types available */}
      <section className="section bg-paper">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="eyebrow">Coverage Available</span>
              <div className="tick mt-4"></div>
              <h2 className="mt-4 mb-6">What we cover for every vehicle</h2>
              <p className="font-sans text-[15px] text-muted-custom leading-relaxed mb-6">
                Regardless of your vehicle type, we can build a policy that includes the coverages your operation needs. Every quote is customized to your specific risk profile.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Auto Liability",
                "Physical Damage",
                "Motor Truck Cargo",
                "General Liability",
                "Non-Trucking Liability",
                "Trailer Interchange",
                "Occupational Accident",
                "Workers' Compensation",
                "Bobtail Coverage",
                "Pollution Liability",
                "On-Hook / Towing",
                "Hired & Non-Owned Auto",
              ].map((coverage) => (
                <div key={coverage} className="flex items-center gap-2 py-2 border-b border-[var(--hair)]">
                  <span className="text-[var(--purple)] font-medium">·</span>
                  <span className="font-sans text-[14px] text-[var(--head)]">{coverage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
