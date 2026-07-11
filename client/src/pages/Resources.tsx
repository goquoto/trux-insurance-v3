import { useState, useMemo } from "react";
import { trpc } from "../lib/trpc";
import { Link } from "wouter";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { blogArticles } from "../data/blogArticles";
import { Search, LayoutGrid, List, ChevronLeft, ChevronRight, Mail, CheckCircle } from "lucide-react";

// Category images for article cards
const CATEGORY_IMAGES: Record<string, string> = {
  "Regulatory & Compliance": "/manus-storage/resource-regulatory-compliance_93e17c88.png",
  "Insurance Education": "/manus-storage/resource-insurance-education_32994b06.png",
  "Cost & Rate Drivers": "/manus-storage/resource-cost-rate-drivers_37a61aa3.png",
  "Freight Fraud & Cargo Theft": "/manus-storage/resource-freight-fraud_741cacd7.png",
  "Cross-Border & International": "/manus-storage/resource-cross-border_769338c3.png",
  "Safety & Driver Management": "/manus-storage/resource-safety-management_0aae5328.png",
  "Market & Economic Outlook": "/manus-storage/resource-market-outlook_2da18698.png",
  "Education": "/manus-storage/resource-insurance-education_32994b06.png",
  "Coverage": "/manus-storage/resource-regulatory-compliance_93e17c88.png",
  "Risk": "/manus-storage/resource-cost-rate-drivers_37a61aa3.png",
  "Compliance": "/manus-storage/resource-regulatory-compliance_93e17c88.png",
  "Claims": "/manus-storage/resource-freight-fraud_741cacd7.png",
  "Cost Savings": "/manus-storage/resource-cost-rate-drivers_37a61aa3.png",
  "Safety": "/manus-storage/resource-safety-management_0aae5328.png",
};

// Resource categories
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

// Map blog categories to resource categories
function mapCategory(blogCat: string): string {
  const map: Record<string, string> = {
    "Education": "Insurance Education",
    "Coverage": "Insurance Education",
    "Risk": "Cost & Rate Drivers",
    "Compliance": "Regulatory & Compliance",
    "Claims": "Freight Fraud & Cargo Theft",
    "Cost Savings": "Cost & Rate Drivers",
    "Safety": "Safety & Driver Management",
  };
  return map[blogCat] || blogCat;
}

const ITEMS_PER_PAGE = 9;

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success" | "error" | "loading">("idle");
  const [newsletterError, setNewsletterError] = useState("");
  const newsletterMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setNewsletterStatus("success");
        setNewsletterEmail("");
      } else {
        setNewsletterStatus("error");
        setNewsletterError("Unable to subscribe at this time. Please try again later.");
      }
    },
    onError: (err) => {
      setNewsletterStatus("error");
      setNewsletterError(err.message || "Something went wrong. Please try again.");
    },
  });

  const filteredArticles = useMemo(() => {
    let articles = [...blogArticles];
    if (activeCategory !== "All") {
      articles = articles.filter(a => mapCategory(a.category) === activeCategory);
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

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const featuredArticles = filteredArticles.slice(0, 2);
  const gridArticles = currentPage === 1
    ? paginatedArticles.slice(2)
    : paginatedArticles;

  return (
    <Layout>
      <SEO
        title="Resources | Trux Insurance Services"
        description="Expert guides on compliance, coverage, cost management, and safety — written for carriers who move freight, not paperwork."
        keywords="trucking insurance resources, FMCSA compliance, cargo insurance guide, trucking safety"
      />

      {/* Hero */}
      <section className="relative bg-[var(--sand)] border-b border-[var(--hair)] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/manus-storage/resources-hero-banner_3d6c8f7e.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative py-16 md:py-24 text-center">
          <p className="eyebrow mb-3">RESOURCES & TOOLS</p>
          <h1 className="font-serif text-[36px] md:text-[56px] font-medium text-head leading-[1.15] mb-4">
            Resources
          </h1>
          <p className="font-sans text-[16px] text-muted-custom leading-[1.7] max-w-[520px] mx-auto">
            Expert guides on compliance, coverage, cost management, and safety — written for carriers who move freight, not paperwork.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="border-b border-[var(--hair)] bg-paper">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
            <div className="relative flex-1 max-w-[320px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--taupe)]" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-4 py-2.5 text-[14px] font-sans border border-[var(--hair)] bg-paper focus:border-[var(--tick)] focus:outline-none"
              />
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 border transition-colors ${viewMode === "grid" ? "border-ink bg-ink text-white" : "border-[var(--hair)] text-muted-custom hover:border-ink"}`}
                aria-label="Grid view"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 border transition-colors ${viewMode === "list" ? "border-ink bg-ink text-white" : "border-[var(--hair)] text-muted-custom hover:border-ink"}`}
                aria-label="List view"
              >
                <List size={16} />
              </button>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {RESOURCE_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                className={`whitespace-nowrap px-3 py-1.5 text-[12px] font-sans font-medium border transition-colors ${
                  activeCategory === cat
                    ? "bg-ink text-white border-ink"
                    : "border-[var(--hair)] text-muted-custom hover:border-[var(--tick)] hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-paper-2">
        <div className="container py-10 md:py-14">
          {/* Featured (only on page 1 with grid view) */}
          {currentPage === 1 && viewMode === "grid" && featuredArticles.length >= 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {featuredArticles.map(article => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group block bg-paper border border-[var(--hair)] overflow-hidden hover:border-[var(--tick)] transition-colors no-underline"
                >
                  <div className="h-[160px] overflow-hidden bg-[var(--sand)]">
                    <img
                      src={CATEGORY_IMAGES[article.category] || CATEGORY_IMAGES["Education"]}
                      alt=""
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                  </div>
                  <div className="p-5">
                    <p className="eyebrow mb-2">{mapCategory(article.category).toUpperCase()}</p>
                    <h3 className="font-serif text-[20px] font-medium text-head leading-[1.3] mb-2 group-hover:text-ink transition-colors">
                      {article.title}
                    </h3>
                    <p className="font-sans text-[14px] text-muted-custom leading-[1.6] line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[12px] text-[var(--taupe)]">{article.publishDate}</span>
                      <span className="font-sans text-[13px] font-medium text-ink group-hover:underline">Read Article</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Grid view */}
          {viewMode === "grid" && gridArticles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridArticles.map(article => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group block bg-paper border border-[var(--hair)] overflow-hidden hover:border-[var(--tick)] transition-colors no-underline"
                >
                  <div className="h-[100px] overflow-hidden bg-[var(--sand)]">
                    <img
                      src={CATEGORY_IMAGES[article.category] || CATEGORY_IMAGES["Education"]}
                      alt=""
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--taupe)] mb-1.5">
                      {mapCategory(article.category)}
                    </p>
                    <h3 className="font-serif text-[16px] font-medium text-head leading-[1.3] mb-2 group-hover:text-ink transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[11px] text-[var(--taupe)]">{article.publishDate}</span>
                      <span className="font-sans text-[12px] font-medium text-ink">Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* List view */}
          {viewMode === "list" && paginatedArticles.length > 0 && (
            <div className="space-y-0">
              {paginatedArticles.map(article => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group flex items-start gap-4 py-4 border-b border-[var(--hair)] hover:bg-[var(--sand)] transition-colors no-underline px-2"
                >
                  <div className="w-[80px] h-[56px] flex-shrink-0 overflow-hidden bg-[var(--sand)]">
                    <img
                      src={CATEGORY_IMAGES[article.category] || CATEGORY_IMAGES["Education"]}
                      alt=""
                      className="w-full h-full object-cover opacity-50"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--taupe)] mb-0.5">
                      {mapCategory(article.category)} · {article.readTime}
                    </p>
                    <h3 className="font-serif text-[16px] font-medium text-head leading-[1.3] group-hover:text-ink transition-colors truncate">
                      {article.title}
                    </h3>
                    <p className="font-sans text-[13px] text-muted-custom leading-[1.5] truncate mt-0.5">
                      {article.excerpt}
                    </p>
                  </div>
                  <span className="font-sans text-[11px] text-[var(--taupe)] whitespace-nowrap mt-1">{article.publishDate}</span>
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
              { label: "VIN Check", href: "/resources/vin-check", desc: "Decode any VIN instantly against the NHTSA federal database.", image: "/manus-storage/resource-vin-check-tool_f04aa753.png" },
              { label: "Trucking Insurance", href: "/coverages", desc: "All lines of coverage for motor carriers in one place.", image: "/manus-storage/resource-insurance-education_32994b06.png" },
              { label: "High-Risk Truck Insurance", href: "/resources/high-risk-insurance", desc: "Solutions for carriers with challenging loss history.", image: "/manus-storage/resource-cost-rate-drivers_37a61aa3.png" },
              { label: "Workers' Compensation", href: "/coverages/workers-compensation", desc: "Statutory coverage for employee injuries on the job.", image: "/manus-storage/resource-safety-management_0aae5328.png" },
              { label: "Glossary of Terms", href: "/resources/glossary", desc: "Insurance terminology explained in plain language.", image: "/manus-storage/resource-glossary-terms_ec38b66e.png" },
              { label: "Trucking Equipment", href: "/vehicles-we-cover", desc: "Coverage by vehicle type — from day cabs to reefers.", image: "/manus-storage/resource-market-outlook_2da18698.png" },
              { label: "Commercial Truck Insurance Quotes", href: "/quote", desc: "Get a tailored quote for your fleet in minutes.", image: "/manus-storage/resource-quote-application_e4079ccc.png" },
              { label: "New Venture Trucking Insurance", href: "/resources/new-venture-insurance", desc: "Coverage for carriers with less than 2 years of authority.", image: "/manus-storage/resource-regulatory-compliance_93e17c88.png" },
              { label: "Owner-Operator Insurance", href: "/resources/owner-operator-insurance", desc: "Tailored programs for single-truck operators.", image: "/manus-storage/resource-freight-fraud_741cacd7.png" },
              { label: "Towing Insurance", href: "/resources/towing-insurance", desc: "Specialized coverage for tow truck operators.", image: "/manus-storage/resource-cross-border_769338c3.png" },
              { label: "Truck Fleet Insurance", href: "/resources/fleet-insurance", desc: "Programs for fleets of 10+ power units.", image: "/manus-storage/resource-market-outlook_2da18698.png" },
              { label: "Quote Application", href: "/quote", desc: "Full trucking insurance application form.", image: "/manus-storage/resource-quote-application_e4079ccc.png" },
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
                <CheckCircle size={18} className="text-[#4a9a6b]" />
                <p className="font-sans text-[15px] text-ink font-medium">You're subscribed! Check your inbox for a welcome email.</p>
              </div>
            ) : (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail.trim()) {
                      setNewsletterStatus("loading");
                      setNewsletterError("");
                      newsletterMutation.mutate({ email: newsletterEmail.trim() });
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
                    disabled={newsletterStatus === "loading"}
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === "loading"}
                    className="px-6 py-3 bg-ink text-white font-sans text-[13px] font-medium uppercase tracking-[0.08em] hover:bg-head transition-colors whitespace-nowrap disabled:opacity-60"
                  >
                    {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
                {newsletterStatus === "error" && (
                  <p className="font-sans text-[12px] text-[var(--warn)] mt-2">{newsletterError}</p>
                )}
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
