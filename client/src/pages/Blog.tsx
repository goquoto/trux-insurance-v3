import { useState } from "react";
import { Link } from "wouter";
import Layout from "../components/Layout";
import Breadcrumbs from "../components/Breadcrumbs";
import SEO from "../components/SEO";
import { blogArticles, blogCategories } from "../data/blogArticles";
import { LayoutGrid, List } from "lucide-react";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredArticles = activeCategory === "All"
    ? blogArticles
    : blogArticles.filter(a => a.category === activeCategory);

  return (
    <Layout>
      <SEO
        title="Blog — Trucking Insurance Insights"
        description="Coverage guides, market intelligence, and compliance updates for motor carriers. Written by trucking insurance specialists."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" }
        ]}
      />
      <Breadcrumbs items={[{ label: "Blog" }]} />

      {/* Hero */}
      <section className="bg-paper border-b border-[var(--hair)]">
        <div className="container py-16 md:py-24">
          <div className="max-w-[720px]">
            <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-4" />
            <p className="eyebrow mb-3">INSIGHTS &amp; RESOURCES</p>
            <h1 className="font-serif text-[36px] md:text-[52px] font-medium text-head leading-[1.15] tracking-[-0.01em] mb-4">
              Trucking Insurance <em className="italic">Insights</em>
            </h1>
            <p className="font-sans text-[17px] text-muted-custom leading-[1.7] max-w-[560px]">
              Coverage guides, market intelligence, and compliance updates — written for owners who move freight, not paperwork.
            </p>
          </div>
        </div>
      </section>

      {/* Filters + View Toggle */}
      <section className="border-b border-[var(--hair)] bg-paper sticky top-[78px] z-30">
        <div className="container py-4 flex items-center justify-between gap-4">
          {/* Category filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {blogCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-[13px] font-sans font-medium whitespace-nowrap transition-colors border ${
                  activeCategory === cat
                    ? "bg-ink text-white border-ink"
                    : "bg-transparent text-muted-custom border-[var(--hair)] hover:border-ink hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 shrink-0">
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
      </section>

      {/* Articles */}
      <section className="bg-paper-2">
        <div className="container py-12 md:py-16">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group block bg-paper border border-[var(--hair)] p-6 hover:border-[var(--tick)] transition-colors no-underline"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[var(--taupe)]">
                      {article.category}
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
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-[var(--hair)] border border-[var(--hair)] bg-paper">
              {filteredArticles.map(article => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group flex items-start gap-6 p-5 md:p-6 hover:bg-[var(--sand)] transition-colors no-underline"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[var(--taupe)]">
                        {article.category}
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

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="font-sans text-muted-custom">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--sand)] border-t border-[var(--hair)]">
        <div className="container py-16 md:py-20 text-center">
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
    </Layout>
  );
}
