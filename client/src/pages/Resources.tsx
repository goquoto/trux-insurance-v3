import { useState, useMemo } from "react";
import { Link } from "wouter";
import Layout from "../components/Layout";
import Breadcrumbs from "../components/Breadcrumbs";
import SEO from "../components/SEO";
import { blogArticles } from "../data/blogArticles";
import { Search, LayoutGrid, List, ChevronLeft, ChevronRight, Mail, CheckCircle } from "lucide-react";

// Category images for cards
const CATEGORY_IMAGES: Record<string, string> = {
  "Regulatory & Compliance": "/manus-storage/resource-regulatory-compliance_93e17c88.png",
  "Insurance Education": "/manus-storage/resource-insurance-education_32994b06.png",
  "Cost & Rate Drivers": "/manus-storage/resource-cost-rate-drivers_37a61aa3.png",
  "Freight Fraud & Cargo Theft": "/manus-storage/resource-freight-fraud_741cacd7.png",
  "Cross-Border & International": "/manus-storage/resource-cross-border_769338c3.png",
  "Safety & Driver Management": "/manus-storage/resource-safety-management_0aae5328.png",
  "Market & Economic Outlook": "/manus-storage/resource-market-outlook_2da18698.png",
};

// Tool images for the tools section
const TOOL_IMAGES: Record<string, string> = {
  "VIN Check": "/manus-storage/resource-vin-check-tool_f04aa753.png",
  "Glossary of Terms": "/manus-storage/resource-glossary-terms_ec38b66e.png",
  "Quote Application": "/manus-storage/resource-quote-application_e4079ccc.png",
  "Trucking Insurance": "/manus-storage/resource-insurance-education_32994b06.png",
  "Workers' Compensation": "/manus-storage/resource-safety-management_0aae5328.png",
  "Trucking Equipment": "/manus-storage/resource-market-outlook_2da18698.png",
};

// Resource categories mapped from existing blog categories
const RESOURCE_CATEGORIES = [
  "All",
  "Regulatory & Compliance",
  "Insurance Education",
  "Cost & Rate Drivers",
  "Freight Fraud & Cargo Theft",
  "Cross-Border & International",
  "Safety & Driver Management",
  "Market & Economic Outlook",
];

// Map existing blog categories to resource categories
function mapCategory(blogCategory: string): string {
  switch (blogCategory) {
    case "Compliance": return "Regulatory & Compliance";
    case "Education": return "Insurance Education";
    case "Coverage": return "Insurance Education";
    case "Cost Savings": return "Cost & Rate Drivers";
    case "Risk": return "Cost & Rate Drivers";
    case "Claims": return "Freight Fraud & Cargo Theft";
    case "Safety": return "Safety & Driver Management";
    default: return "Insurance Education";
  }
}

// Enrich articles with resource category
const resourceArticles = blogArticles.map(a => ({
  ...a,
  resourceCategory: mapCategory(a.category),
})).sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

const ARTICLES_PER_PAGE = 9;

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success">("idle");

  const filteredArticles = useMemo(() => {
    let articles = resourceArticles;
    if (activeCategory !== "All") {
      articles = articles.filter(a => a.resourceCategory === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      articles = articles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    }
    return articles;
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  // Featured articles are the first 2 (only on page 1 with no search)
  const showFeatured = currentPage === 1 && !searchQuery.trim();
  const featuredArticles = showFeatured ? paginatedArticles.slice(0, 2) : [];
  const gridArticles = showFeatured ? paginatedArticles.slice(2) : paginatedArticles;

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setCurrentPage(1);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }

  return (
    <Layout>
      <SEO
        title="Resources — Trucking Insurance Education & Tools"
        description="Expert guides, compliance updates, cost analysis, and tools for motor carriers, owner-operators, and freight brokers. Written by trucking insurance specialists."
        keywords="trucking insurance resources, FMCSA compliance, cargo insurance guide, trucking safety, VIN check"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" }
        ]}
      />
      <Breadcrumbs items={[{ label: "Resources" }]} />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[var(--sand)]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(/manus-storage/resources-hero-banner_64033139.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container relative py-20 md:py-28 text-center">
          <div className="max-w-[720px] mx-auto">
            <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4 mx-auto" />
            <p className="eyebrow mb-3">RESOURCES & TOOLS</p>
            <h1 className="font-serif text-[36px] md:text-[56px] font-medium text-head leading-[1.15] tracking-[-0.01em] mb-4">
              Resources
            </h1>
            <p className="font-sans text-[17px] text-muted-custom leading-[1.7] max-w-[560px] mx-auto">
              Expert guides on compliance, coverage, cost management, and safety — written for owners who move freight, not paperwork.
            </p>
          </div>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="border-b border-[var(--hair)] bg-paper sticky top-[78px] z-30">
        <div className="container py-4">
          {/* Search bar */}
          <div className="flex items-center gap-4 mb-3">
            <div className="relative flex-1 max-w-[400px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--taupe)]" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-9 pr-4 py-2 text-[14px] font-sans border border-[var(--hair)] bg-paper focus:border-[var(--tick)] focus:outline-none transition-colors"
              />
            </div>
            {/* View toggle */}
            <div className="flex items-center gap-1 shrink-0 ml-auto">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${viewMode === "grid" ? "text-ink" : "text-[var(--taupe)] hover:text-ink"}`}
                aria-label="Grid view"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${viewMode === "list" ? "text-ink" : "text-[var(--taupe)] hover:text-ink"}`}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {RESOURCE_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 text-[12px] font-sans font-medium whitespace-nowrap transition-colors border ${
                  activeCategory === cat
                    ? "bg-ink text-white border-ink"
                    : "bg-transparent text-muted-custom border-[var(--hair)] hover:border-ink hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles (2 large cards) */}
      {showFeatured && featuredArticles.length > 0 && (
        <section className="bg-paper">
          <div className="container py-10 md:py-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredArticles.map(article => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group block bg-[var(--sand)] border border-[var(--hair)] overflow-hidden hover:border-[var(--tick)] transition-colors no-underline"
                >
                  <div className="h-[140px] overflow-hidden bg-paper-2">
                    <img
                      src={CATEGORY_IMAGES[article.resourceCategory] || CATEGORY_IMAGES["Insurance Education"]}
                      alt=""
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                  </div>
                  <div className="p-8">
                  <span className="inline-block px-2 py-0.5 text-[10px] font-sans font-medium uppercase tracking-[0.22em] text-white bg-ink mb-4">
                    Featured
                  </span>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[var(--taupe)]">
                      {article.resourceCategory}
                    </span>
                    <span className="text-[11px] font-sans text-[var(--taupe)]">
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className="font-serif text-[22px] md:text-[26px] font-medium text-head leading-[1.25] mb-3 group-hover:text-ink transition-colors">
                    {article.title}
                  </h2>
                  <p className="font-sans text-[15px] text-muted-custom leading-[1.7] line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="mt-6 pt-4 border-t border-[var(--hair)] flex items-center justify-between">
                    <span className="text-[12px] font-sans text-[var(--taupe)]">
                      {new Date(article.publishDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="text-[13px] font-sans font-medium text-ink group-hover:translate-x-0.5 transition-transform">
                      Read Article →
                    </span>
                  </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Article Grid / List */}
      <section className="bg-paper-2">
        <div className="container py-10 md:py-14">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridArticles.map(article => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group block bg-paper border border-[var(--hair)] overflow-hidden hover:border-[var(--tick)] transition-colors no-underline"
                >
                  <div className="h-[100px] overflow-hidden bg-paper-2">
                    <img
                      src={CATEGORY_IMAGES[article.resourceCategory] || CATEGORY_IMAGES["Insurance Education"]}
                      alt=""
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                    />
                  </div>
                  <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[var(--taupe)]">
                      {article.resourceCategory}
                    </span>
                    <span className="text-[11px] font-sans text-[var(--taupe)]">
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-[19px] font-medium text-head leading-[1.3] mb-3 group-hover:text-ink transition-colors">
                    {article.title}
                  </h3>
                  <p className="font-sans text-[14px] text-muted-custom leading-[1.6] line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 pt-4 border-t border-[var(--hair)] flex items-center justify-between">
                    <span className="text-[12px] font-sans text-[var(--taupe)]">
                      {new Date(article.publishDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="text-[13px] font-sans font-medium text-ink group-hover:translate-x-0.5 transition-transform">
                      Read →
                    </span>
                  </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-[var(--hair)] border border-[var(--hair)] bg-paper">
              {gridArticles.map(article => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group flex items-start gap-6 p-5 md:p-6 hover:bg-[var(--sand)] transition-colors no-underline"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[var(--taupe)]">
                        {article.resourceCategory}
                      </span>
                      <span className="text-[11px] font-sans text-[var(--taupe)]">
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-serif text-[18px] md:text-[20px] font-medium text-head leading-[1.3] mb-2 group-hover:text-ink transition-colors">
                      {article.title}
                    </h3>
                    <p className="font-sans text-[14px] text-muted-custom leading-[1.6] line-clamp-2 hidden md:block">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-2 pt-1">
                    <span className="text-[12px] font-sans text-[var(--taupe)] whitespace-nowrap">
                      {new Date(article.publishDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                    <span className="text-[13px] font-sans font-medium text-ink group-hover:translate-x-0.5 transition-transform">
                      Read →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="font-serif text-[22px] text-head mb-2">No resources found</p>
              <p className="font-sans text-[14px] text-muted-custom">Try adjusting your search or filter criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-[var(--hair)] text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--sand)] transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 text-[13px] font-sans font-medium border transition-colors ${
                    currentPage === page
                      ? "bg-ink text-white border-ink"
                      : "border-[var(--hair)] text-muted-custom hover:border-ink hover:text-ink"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-[var(--hair)] text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--sand)] transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Tools & Quick Links */}
      <section className="border-t border-[var(--hair)] bg-paper">
        <div className="container py-12 md:py-16">
          <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
          <p className="eyebrow mb-3">TOOLS & QUICK LINKS</p>
          <h2 className="font-serif text-[28px] md:text-[36px] font-medium text-head leading-[1.2] mb-8">
            Insurance tools & resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "VIN Check", href: "/resources/vin-check", desc: "Decode any VIN instantly against the NHTSA federal database.", image: TOOL_IMAGES["VIN Check"] },
              { label: "Trucking Insurance", href: "/coverages", desc: "All lines of coverage for motor carriers in one place.", image: TOOL_IMAGES["Trucking Insurance"] },
              { label: "High-Risk Truck Insurance", href: "/coverages/auto-liability", desc: "Solutions for carriers with challenging loss history.", image: "/manus-storage/resource-cost-rate-drivers_37a61aa3.png" },
              { label: "Workers' Compensation", href: "/coverages/workers-compensation", desc: "Statutory coverage for employee injuries on the job.", image: TOOL_IMAGES["Workers' Compensation"] },
              { label: "Glossary of Terms", href: "/resources", desc: "Insurance terminology explained in plain language.", image: TOOL_IMAGES["Glossary of Terms"] },
              { label: "Trucking Equipment", href: "/vehicles-we-cover", desc: "Coverage by vehicle type — from day cabs to reefers.", image: TOOL_IMAGES["Trucking Equipment"] },
              { label: "Commercial Truck Insurance Quotes", href: "/quote", desc: "Get a tailored quote for your fleet in minutes.", image: TOOL_IMAGES["Quote Application"] },
              { label: "New Venture Trucking Insurance", href: "/who-we-insure/new-ventures", desc: "Coverage for carriers with less than 2 years of authority.", image: "/manus-storage/resource-regulatory-compliance_93e17c88.png" },
              { label: "Owner-Operator Insurance", href: "/who-we-insure/owner-operators", desc: "Tailored programs for single-truck operators.", image: "/manus-storage/resource-freight-fraud_741cacd7.png" },
              { label: "Towing Insurance", href: "/coverages/auto-liability", desc: "Specialized coverage for tow truck operators.", image: "/manus-storage/resource-cross-border_769338c3.png" },
              { label: "Truck Fleet Insurance", href: "/who-we-insure/large-fleets", desc: "Programs for fleets of 10+ power units.", image: "/manus-storage/resource-market-outlook_2da18698.png" },
              { label: "Quote Application", href: "/quote", desc: "Full trucking insurance application form.", image: TOOL_IMAGES["Quote Application"] },
            ].map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="group block bg-[var(--sand)] border border-[var(--hair)] overflow-hidden hover:border-[var(--tick)] transition-colors no-underline"
              >
                <div className="h-[80px] overflow-hidden">
                  <img
                    src={link.image}
                    alt=""
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-[16px] font-medium text-head leading-[1.3] mb-1 group-hover:text-ink transition-colors">
                    {link.label}
                  </h3>
                  <p className="font-sans text-[12px] text-muted-custom leading-[1.5] line-clamp-2">
                    {link.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-[var(--sand)] border-t border-[var(--hair)]">
        <div className="container py-14 md:py-18">
          <div className="max-w-[600px] mx-auto text-center">
            <Mail size={28} className="mx-auto mb-4 text-[var(--taupe)]" />
            <h2 className="font-serif text-[26px] md:text-[32px] font-medium text-head leading-[1.2] mb-3">
              Stay informed
            </h2>
            <p className="font-sans text-[15px] text-muted-custom leading-[1.7] mb-6">
              Get compliance updates, market insights, and coverage tips delivered to your inbox. No spam — just useful information for motor carriers.
            </p>
            {newsletterStatus === "success" ? (
              <div className="flex items-center justify-center gap-2 py-4">
                <CheckCircle size={18} className="text-green-600" />
                <p className="font-sans text-[15px] text-ink font-medium">You're subscribed! Check your inbox for a confirmation.</p>
              </div>
            ) : (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail.trim()) {
                      setNewsletterStatus("success");
                      setNewsletterEmail("");
                    }
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-[440px] mx-auto"
                >
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 text-[14px] font-sans border border-[var(--hair)] bg-paper focus:border-[var(--tick)] focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-ink text-white font-sans text-[13px] font-medium uppercase tracking-[0.08em] hover:bg-head transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="font-sans text-[11px] text-[var(--taupe)] mt-3">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--hair)] bg-paper">
        <div className="container py-14 md:py-18 text-center">
          <h2 className="font-serif text-[28px] md:text-[36px] font-medium text-head leading-[1.2] mb-4">
            Have a question about your coverage?
          </h2>
          <p className="font-sans text-[16px] text-muted-custom leading-[1.7] max-w-[480px] mx-auto mb-8">
            Our team specializes exclusively in commercial trucking insurance. We're happy to answer questions — no obligation.
          </p>
          <Link
            href="/quote"
            className="inline-block bg-ink text-white font-sans text-[14px] font-medium px-8 py-3.5 hover:bg-head transition-colors no-underline uppercase tracking-[0.08em]"
          >
            Get a Quote
          </Link>
        </div>
      </section>

      {/* Insurance Disclaimer */}
      <section className="border-t border-[var(--hair)] bg-paper-2">
        <div className="container py-8">
          <p className="font-sans text-[11px] text-[var(--taupe)] leading-[1.7] max-w-[800px]">
            <strong className="font-medium text-muted-custom">Insurance Disclaimer:</strong> Coverage descriptions are general summaries only and do not constitute policy language. Actual coverage varies by state, carrier, and individual policy terms and conditions. Not all coverages are available in all states. Please consult a licensed insurance agent at Trux Insurance Services for specific coverage details, eligibility, and quotes tailored to your operation. The information provided on this page is for educational purposes only and should not be construed as legal or insurance advice.
          </p>
        </div>
      </section>
    </Layout>
  );
}
