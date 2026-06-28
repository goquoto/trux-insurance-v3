/**
 * XML Sitemap Generator
 * 
 * Generates a proper XML sitemap listing all real URLs on the site.
 * Served at /sitemap.xml
 */

import { type Express } from "express";

const BASE_URL = "https://truxins.net";

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

function getAllUrls(): SitemapEntry[] {
  const today = new Date().toISOString().split("T")[0];
  const entries: SitemapEntry[] = [];

  // Static pages
  const staticPages = [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    { path: "/coverages", priority: "0.9", changefreq: "weekly" },
    { path: "/who-we-insure", priority: "0.9", changefreq: "weekly" },
    { path: "/about", priority: "0.8", changefreq: "monthly" },
    { path: "/service", priority: "0.8", changefreq: "monthly" },
    { path: "/quote", priority: "0.9", changefreq: "monthly" },
    { path: "/contact", priority: "0.8", changefreq: "monthly" },
    { path: "/blog", priority: "0.8", changefreq: "weekly" },
    { path: "/cost", priority: "0.8", changefreq: "monthly" },
    { path: "/states", priority: "0.9", changefreq: "monthly" },
    { path: "/quick-quote", priority: "0.8", changefreq: "monthly" },
    { path: "/client-center", priority: "0.7", changefreq: "monthly" },
    { path: "/client-login", priority: "0.7", changefreq: "monthly" },
    { path: "/freight-broker-insurance", priority: "0.8", changefreq: "monthly" },
    { path: "/usage-based-solutions", priority: "0.8", changefreq: "monthly" },
    { path: "/safety", priority: "0.8", changefreq: "weekly" },
    { path: "/vehicles-we-cover", priority: "0.8", changefreq: "monthly" },
  ];

  for (const page of staticPages) {
    entries.push({
      loc: `${BASE_URL}${page.path}`,
      lastmod: today,
      changefreq: page.changefreq,
      priority: page.priority,
    });
  }

  // Coverage detail pages
  const coverageSlugs = [
    "auto-liability", "physical-damage", "cargo", "general-liability",
    "non-trucking", "trailer-interchange", "occupational-accident",
    "workers-compensation", "excess-umbrella", "pollution-liability",
    "freight-broker-bonds", "cyber-coverage", "crime-coverage",
    "contractors", "personal-lines"
  ];
  for (const slug of coverageSlugs) {
    entries.push({
      loc: `${BASE_URL}/coverages/${slug}`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.8",
    });
  }

  // Who we insure detail pages
  const whoSlugs = [
    "owner-operators", "small-fleets", "large-fleets", "flatbed-haulers",
    "reefer-carriers", "dump-trucks", "hazmat-carriers", "hotshot-trucking",
    "intermodal-drayage"
  ];
  for (const slug of whoSlugs) {
    entries.push({
      loc: `${BASE_URL}/who-we-insure/${slug}`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.7",
    });
  }

  // State pages
  const stateSlugs = [
    "illinois", "texas", "florida", "georgia", "ohio", "indiana",
    "michigan", "pennsylvania", "tennessee", "missouri", "arizona",
    "colorado", "iowa", "kentucky", "minnesota", "mississippi",
    "nevada", "north-carolina", "south-carolina", "virginia", "wisconsin"
  ];
  for (const slug of stateSlugs) {
    entries.push({
      loc: `${BASE_URL}/states/${slug}`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.7",
    });
  }

  // Blog articles
  const blogSlugs = [
    "primary-liability-cargo-physical-damage-what-every-fleet-owner-needs",
    "nuclear-verdicts-reshaping-trucking-liability",
    "what-are-loss-runs-why-they-control-your-premium",
    "5-ways-fleet-operators-cutting-insurance-costs",
    "dot-number-more-than-compliance-box",
    "owner-operator-vs-fleet-coverage-business-structure",
    "what-happens-after-trucking-accident-step-by-step",
    "eld-mandates-changed-trucking-insurance",
    "cargo-insurance-explained-whats-covered-whats-not",
    "how-to-read-certificate-of-insurance",
    "bobtail-non-trucking-liability-coverage-gap",
    "new-authority-insurance-checklist-first-90-days",
    "trailer-interchange-insurance-explained",
    "dashcam-impact-on-trucking-insurance-premiums",
    "hired-non-owned-auto-coverage-trucking",
    "understanding-trucking-insurance-audits",
    "motus-fmcsa-safety-fitness-determination-rule",
    "driver-fatigue-management-trucking-safety",
    "pre-trip-inspection-checklist-trucking",
    "distracted-driving-trucking-risks-law",
    "weather-related-trucking-accidents-safety",
    "backing-accidents-preventable-trucking"
  ];
  for (const slug of blogSlugs) {
    entries.push({
      loc: `${BASE_URL}/blog/${slug}`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.6",
    });
  }

  return entries;
}

export function registerSitemapRoute(app: Express) {
  app.get("/sitemap.xml", (_req, res) => {
    const entries = getAllUrls();
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    for (const entry of entries) {
      xml += `  <url>\n`;
      xml += `    <loc>${entry.loc}</loc>\n`;
      xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
      xml += `    <priority>${entry.priority}</priority>\n`;
      xml += `  </url>\n`;
    }
    
    xml += `</urlset>`;

    res.set("Content-Type", "application/xml");
    res.set("Cache-Control", "public, max-age=3600");
    res.send(xml);
  });

  // Also serve robots.txt dynamically to ensure it's always correct
  app.get("/robots.txt", (_req, res) => {
    const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /404

Sitemap: ${BASE_URL}/sitemap.xml
`;
    res.set("Content-Type", "text/plain");
    res.send(robots);
  });
}
