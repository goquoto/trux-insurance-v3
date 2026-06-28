/**
 * SEO Prerender Middleware
 * 
 * Injects page-specific H1, meta tags, JSON-LD structured data, and key content
 * into the HTML shell BEFORE sending to the browser. This ensures search engines
 * see the critical SEO content in the raw HTML without needing JavaScript.
 */

interface PageSEO {
  title: string;
  description: string;
  canonical: string;
  h1: string;
  schemas: object[];
  keywords?: string;
  breadcrumbs?: { name: string; url: string }[];
  preContent?: string; // Key text content for crawlers
}

const BASE_URL = "https://truxins.net";

// Organization schema used on every page
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "name": "Trux Insurance Services",
  "url": BASE_URL,
  "logo": `${BASE_URL}/manus-storage/trux-logo-dark_9f1c7375.png`,
  "telephone": "+1-331-240-1101",
  "tollFree": "+1-331-240-1101",
  "faxNumber": "+1-331-240-1055",
  "email": "info@truxins.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1 Tiffany Pt Suite G2",
    "addressLocality": "Bloomingdale",
    "addressRegion": "IL",
    "postalCode": "60108",
    "addressCountry": "US"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "17:00"
  },
  "areaServed": [
    "Arizona", "Colorado", "Florida", "Georgia", "Illinois", "Indiana", "Iowa",
    "Kentucky", "Michigan", "Minnesota", "Mississippi", "Missouri", "Nevada",
    "North Carolina", "Ohio", "Pennsylvania", "South Carolina", "Tennessee",
    "Texas", "Virginia", "Wisconsin"
  ],
  "description": "Commercial trucking insurance specialists serving motor carriers in 21 states. Auto liability, cargo, physical damage, general liability, and more.",
  "sameAs": [],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "50",
    "bestRating": "5"
  }
};

function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`
    }))
  };
}

// Coverage page titles and descriptions
const coveragePages: Record<string, { title: string; description: string }> = {
  "auto-liability": { title: "Auto Liability Insurance", description: "Primary auto liability coverage for motor carriers. FMCSA-required $750K-$1M limits. Covers bodily injury and property damage to third parties." },
  "physical-damage": { title: "Physical Damage Insurance", description: "Comprehensive and collision coverage for your trucks and trailers. Protect your equipment investment against accidents, theft, fire, and weather." },
  "cargo": { title: "Cargo Insurance", description: "Motor truck cargo coverage protecting the freight you haul. Covers loss or damage to customer goods in transit." },
  "general-liability": { title: "General Liability Insurance", description: "Commercial general liability for trucking operations. Covers bodily injury and property damage at shipper facilities, truck stops, and your premises." },
  "non-trucking": { title: "Non-Trucking Liability Insurance", description: "Bobtail and non-trucking liability coverage for owner-operators leased to carriers. Covers personal use when not under dispatch." },
  "trailer-interchange": { title: "Trailer Interchange Insurance", description: "Coverage for trailers in your possession under interchange agreements. Protects against damage to equipment you don't own." },
  "occupational-accident": { title: "Occupational Accident Insurance", description: "Accident and injury coverage for independent contractors and owner-operators not eligible for workers' compensation." },
  "workers-compensation": { title: "Workers' Compensation Insurance", description: "Workers' comp coverage for trucking company employees. Covers medical expenses and lost wages for work-related injuries." },
  "excess-umbrella": { title: "Excess & Umbrella Insurance", description: "Additional liability limits above your primary policies. Critical protection against nuclear verdicts and catastrophic claims." },
  "pollution-liability": { title: "Pollution Liability Insurance", description: "Environmental liability coverage for fuel spills, hazmat releases, and pollution cleanup costs during transport." },
  "freight-broker-bonds": { title: "Freight Broker Bonds & Insurance", description: "BMC-84 surety bonds and contingent cargo/liability coverage for freight brokers and intermediaries." },
  "cyber-coverage": { title: "Cyber Liability Insurance", description: "Cyber insurance for trucking companies. Covers data breaches, ransomware, ELD hacking, and business interruption from cyber events." },
  "crime-coverage": { title: "Crime Insurance", description: "Commercial crime coverage protecting against employee theft, fraud, forgery, and social engineering attacks." },
  "contractors": { title: "Contractors Insurance", description: "Insurance solutions for trucking contractors including general liability, equipment coverage, and professional liability." },
  "personal-lines": { title: "Personal Lines Insurance", description: "Personal auto, home, and umbrella insurance for trucking professionals and their families." },
};

// State pages
const stateNames: Record<string, string> = {
  "illinois": "Illinois", "texas": "Texas", "florida": "Florida", "georgia": "Georgia",
  "ohio": "Ohio", "indiana": "Indiana", "michigan": "Michigan", "pennsylvania": "Pennsylvania",
  "tennessee": "Tennessee", "missouri": "Missouri", "arizona": "Arizona", "colorado": "Colorado",
  "iowa": "Iowa", "kentucky": "Kentucky", "minnesota": "Minnesota", "mississippi": "Mississippi",
  "nevada": "Nevada", "north-carolina": "North Carolina", "south-carolina": "South Carolina",
  "virginia": "Virginia", "wisconsin": "Wisconsin"
};

// Who we insure pages
const whoWeInsurePages: Record<string, { title: string; description: string }> = {
  "owner-operators": { title: "Owner-Operator Insurance", description: "Insurance packages built for independent owner-operators. Primary liability, physical damage, cargo, occupational accident, and non-trucking liability." },
  "small-fleets": { title: "Small Fleet Insurance (2-10 Trucks)", description: "Competitive insurance programs for small fleets. Volume discounts, fleet safety credits, and dedicated account management." },
  "large-fleets": { title: "Large Fleet Insurance (10+ Trucks)", description: "Enterprise fleet insurance with loss-sensitive programs, dedicated claims handling, and risk management support." },
  "flatbed-haulers": { title: "Flatbed Hauler Insurance", description: "Specialized coverage for flatbed operations including load securement liability, oversized/overweight permits, and equipment floaters." },
  "reefer-carriers": { title: "Refrigerated Carrier Insurance", description: "Insurance for temperature-controlled carriers including reefer breakdown, spoilage coverage, and pharmaceutical transport." },
  "dump-trucks": { title: "Dump Truck Insurance", description: "Coverage for dump truck operations including aggregate hauling, construction site liability, and hired equipment." },
  "hazmat-carriers": { title: "Hazmat Carrier Insurance", description: "Specialized insurance for hazardous materials carriers. $1M-$5M liability limits, pollution coverage, and MCS-90 endorsements." },
  "hotshot-trucking": { title: "Hotshot Trucking Insurance", description: "Insurance for hotshot carriers using Class 3-5 trucks and gooseneck trailers. Expedited freight coverage at competitive rates." },
  "intermodal-drayage": { title: "Intermodal Drayage Insurance", description: "Coverage for container drayage operations including trailer interchange, port liability, and chassis damage." },
};

function getPageSEO(path: string): PageSEO | null {
  // Home
  if (path === "/" || path === "") {
    return {
      title: "Commercial Trucking Insurance — Trux Insurance Services",
      description: "Trucking insurance specialists in 21 states. Auto liability, cargo, physical damage, and more for owner-operators and fleets.",
      canonical: BASE_URL,
      h1: "Every mile covered — by people who only do trucking.",
      keywords: "trucking insurance, commercial truck insurance, auto liability, cargo insurance, physical damage, owner operator insurance, fleet insurance, trucking company insurance, motor carrier insurance",
      schemas: [orgSchema],
      breadcrumbs: [{ name: "Home", url: "/" }],
      preContent: "Trux Insurance Services places commercial trucking and fleet coverage across 21 states — auto liability, cargo, physical damage, trailer interchange and more. We market your account once, to the carriers that fit your risk, and stand behind it at claim time and renewal. 5.0 Google rating. New authorities welcome. 10+ years experience."
    };
  }

  // Coverages index
  if (path === "/coverages") {
    return {
      title: "Trucking Insurance Coverages — Trux Insurance Services",
      description: "Complete commercial trucking insurance coverages: auto liability, physical damage, cargo, general liability, workers' comp, excess/umbrella, and specialty lines.",
      canonical: `${BASE_URL}/coverages`,
      h1: "Coverages we place",
      schemas: [orgSchema, breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Coverages", url: "/coverages" }])],
      breadcrumbs: [{ name: "Home", url: "/" }, { name: "Coverages", url: "/coverages" }],
      preContent: "Auto Liability, Physical Damage, Cargo, General Liability, Non-Trucking Liability, Trailer Interchange, Occupational Accident, Workers' Compensation, Excess & Umbrella, Pollution Liability, Freight Broker Bonds, Cyber Coverage, Crime Coverage."
    };
  }

  // Coverage detail pages
  const coverageMatch = path.match(/^\/coverages\/([a-z-]+)$/);
  if (coverageMatch) {
    const slug = coverageMatch[1];
    const coverage = coveragePages[slug];
    if (coverage) {
      return {
        title: `${coverage.title} for Trucking — Trux Insurance Services`,
        description: coverage.description,
        canonical: `${BASE_URL}/coverages/${slug}`,
        h1: coverage.title,
        schemas: [
          orgSchema,
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Coverages", url: "/coverages" }, { name: coverage.title, url: `/coverages/${slug}` }]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": coverage.title,
            "provider": { "@type": "InsuranceAgency", "name": "Trux Insurance Services" },
            "areaServed": { "@type": "Country", "name": "United States" },
            "description": coverage.description
          }
        ],
        breadcrumbs: [{ name: "Home", url: "/" }, { name: "Coverages", url: "/coverages" }, { name: coverage.title, url: `/coverages/${slug}` }],
      };
    }
  }

  // Who we insure index
  if (path === "/who-we-insure") {
    return {
      title: "Who We Insure — Trucking Operations — Trux Insurance Services",
      description: "We insure owner-operators, small fleets, large fleets, flatbed haulers, reefer carriers, dump trucks, hazmat carriers, hotshot trucking, and intermodal drayage.",
      canonical: `${BASE_URL}/who-we-insure`,
      h1: "Who we insure",
      schemas: [orgSchema, breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Who We Insure", url: "/who-we-insure" }])],
      breadcrumbs: [{ name: "Home", url: "/" }, { name: "Who We Insure", url: "/who-we-insure" }],
      preContent: "Owner-Operators, Small Fleets (2-10 Trucks), Large Fleets (10+ Trucks), Flatbed Haulers, Refrigerated Carriers, Dump Trucks, Hazmat Carriers, Hotshot Trucking, Intermodal Drayage."
    };
  }

  // Who we insure detail
  const whoMatch = path.match(/^\/who-we-insure\/([a-z-]+)$/);
  if (whoMatch) {
    const slug = whoMatch[1];
    const page = whoWeInsurePages[slug];
    if (page) {
      return {
        title: `${page.title} — Trux Insurance Services`,
        description: page.description,
        canonical: `${BASE_URL}/who-we-insure/${slug}`,
        h1: page.title,
        schemas: [
          orgSchema,
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Who We Insure", url: "/who-we-insure" }, { name: page.title, url: `/who-we-insure/${slug}` }]),
        ],
        breadcrumbs: [{ name: "Home", url: "/" }, { name: "Who We Insure", url: "/who-we-insure" }, { name: page.title, url: `/who-we-insure/${slug}` }],
      };
    }
  }

  // State pages
  const stateMatch = path.match(/^\/states\/([a-z-]+)$/);
  if (stateMatch) {
    const slug = stateMatch[1];
    const stateName = stateNames[slug];
    if (stateName) {
      return {
        title: `${stateName} Trucking Insurance — Trux Insurance Services`,
        description: `Commercial trucking insurance in ${stateName}. Auto liability, cargo, physical damage, and full coverage packages for motor carriers operating in ${stateName}.`,
        canonical: `${BASE_URL}/states/${slug}`,
        h1: `${stateName} Trucking Insurance`,
        schemas: [
          orgSchema,
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "States", url: "/coverages" }, { name: stateName, url: `/states/${slug}` }]),
        ],
        breadcrumbs: [{ name: "Home", url: "/" }, { name: "States", url: "/coverages" }, { name: stateName, url: `/states/${slug}` }],
      };
    }
  }

  // About
  if (path === "/about") {
    return {
      title: "About Trux Insurance Services — Trucking Insurance Specialists",
      description: "10+ years insuring motor carriers exclusively. Learn about our team, our approach, and why we only do trucking insurance.",
      canonical: `${BASE_URL}/about`,
      h1: "About Trux Insurance Services",
      schemas: [orgSchema, breadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about" }])],
      breadcrumbs: [{ name: "Home", url: "/" }, { name: "About", url: "/about" }],
      preContent: "Trux Insurance Services has been insuring motor carriers exclusively for over 10 years. We're not a general agency that happens to write some trucking — commercial trucking is the only thing we do."
    };
  }

  // Service & Claims
  if (path === "/service") {
    return {
      title: "Service & Claims — Trux Insurance Services",
      description: "Policy service, certificate requests, claims reporting, billing, and compliance filings. Reach our service team directly.",
      canonical: `${BASE_URL}/service`,
      h1: "Service & Claims",
      schemas: [orgSchema, breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Service & Claims", url: "/service" }])],
      breadcrumbs: [{ name: "Home", url: "/" }, { name: "Service & Claims", url: "/service" }],
    };
  }

  // Quote
  if (path === "/quote") {
    return {
      title: "Get a Trucking Insurance Quote — Trux Insurance Services",
      description: "Get a commercial trucking insurance quote in minutes. Tell us about your operation and we'll market it to the carriers that fit your risk.",
      canonical: `${BASE_URL}/quote`,
      h1: "Get a Quote",
      schemas: [orgSchema, breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Get a Quote", url: "/quote" }])],
      breadcrumbs: [{ name: "Home", url: "/" }, { name: "Get a Quote", url: "/quote" }],
    };
  }

  // Contact
  if (path === "/contact") {
    return {
      title: "Contact Trux Insurance Services",
      description: "Contact Trux Insurance Services in Bloomingdale, IL. Phone (331) 240-1101, toll-free (331) 240-1101. Monday–Friday 9am–5pm CT.",
      canonical: `${BASE_URL}/contact`,
      h1: "Contact Us",
      schemas: [orgSchema, breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }])],
      breadcrumbs: [{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }],
    };
  }

  // Blog index
  if (path === "/blog") {
    return {
      title: "Trucking Insurance Blog — Insights & Resources — Trux Insurance Services",
      description: "Coverage guides, market intelligence, and compliance updates for motor carriers. Written for owners who move freight, not paperwork.",
      canonical: `${BASE_URL}/blog`,
      h1: "Trucking Insurance Insights",
      schemas: [orgSchema, breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }])],
      breadcrumbs: [{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }],
    };
  }

  // Blog articles (generic — title injected from slug)
  const blogMatch = path.match(/^\/blog\/([a-z0-9-]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return {
      title: `${title} — Trux Insurance Blog`,
      description: `Read about ${title.toLowerCase()} in our trucking insurance blog. Expert insights for motor carriers.`,
      canonical: `${BASE_URL}/blog/${slug}`,
      h1: title,
      schemas: [
        orgSchema,
        breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }, { name: title, url: `/blog/${slug}` }]),
      ],
      breadcrumbs: [{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }, { name: title, url: `/blog/${slug}` }],
    };
  }

  // Cost page
  if (path === "/cost") {
    return {
      title: "Trucking Insurance Cost — How Much Does It Cost? — Trux Insurance Services",
      description: "How much does commercial trucking insurance cost? Factors that affect your premium, average rates, and how to get the best price for your operation.",
      canonical: `${BASE_URL}/cost`,
      h1: "How Much Does Trucking Insurance Cost?",
      schemas: [orgSchema, breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Cost", url: "/cost" }])],
      breadcrumbs: [{ name: "Home", url: "/" }, { name: "Cost", url: "/cost" }],
    };
  }

  return null;
}

/**
 * Injects SEO content into the HTML template before sending to the browser.
 * This runs on the server so crawlers see the content without JavaScript.
 */
export function injectSEO(html: string, requestPath: string): string {
  const seo = getPageSEO(requestPath);
  if (!seo) return html;

  // Replace <title> tag
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(seo.title)}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeAttr(seo.description)}" />`
  );

  // Add keywords meta tag if present
  if (seo.keywords) {
    const keywordsTag = `<meta name="keywords" content="${escapeAttr(seo.keywords)}" />`;
    html = html.replace("</head>", `${keywordsTag}\n  </head>`);
  }

  // Add canonical link before </head>
  const canonicalTag = `<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`;
  
  // Add Open Graph tags
  const ogTags = `
    <meta property="og:title" content="${escapeAttr(seo.title)}" />
    <meta property="og:description" content="${escapeAttr(seo.description)}" />
    <meta property="og:url" content="${escapeAttr(seo.canonical)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Trux Insurance Services" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeAttr(seo.title)}" />
    <meta name="twitter:description" content="${escapeAttr(seo.description)}" />
  `;

  // Add JSON-LD schemas
  const schemaScripts = seo.schemas.map(s => 
    `<script type="application/ld+json">${JSON.stringify(s)}</script>`
  ).join("\n    ");

  // Inject all into <head>
  html = html.replace(
    "</head>",
    `${canonicalTag}\n    ${ogTags}\n    ${schemaScripts}\n  </head>`
  );

  // Inject hidden SEO content (H1 + pre-content) into the body for crawlers
  // This is visually hidden but present in the raw HTML
  const seoContent = `
    <div id="seo-prerender" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;">
      <h1>${escapeHtml(seo.h1)}</h1>
      ${seo.preContent ? `<p>${escapeHtml(seo.preContent)}</p>` : ""}
      ${seo.breadcrumbs ? `<nav aria-label="Breadcrumb"><ol>${seo.breadcrumbs.map(b => `<li><a href="${escapeAttr(b.url)}">${escapeHtml(b.name)}</a></li>`).join("")}</ol></nav>` : ""}
    </div>`;

  html = html.replace(
    '<div id="root"></div>',
    `${seoContent}\n    <div id="root"></div>`
  );

  return html;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function escapeAttr(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
