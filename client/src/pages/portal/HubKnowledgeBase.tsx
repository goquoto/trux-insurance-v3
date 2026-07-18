import { useState, useMemo } from "react";
import { Link, useSearch } from "wouter";
import AgencyHubLayout from "@/components/AgencyHubLayout";
import { kbArticles, getAllCategories } from "@/data/kbArticles";

export default function HubKnowledgeBase() {
  const searchParams = useSearch();
  const params = new URLSearchParams(searchParams);
  const catParam = params.get("cat") || "";
  const [selectedCat, setSelectedCat] = useState(catParam);
  const [search, setSearch] = useState("");
  const allCategories = useMemo(() => getAllCategories(), []);

  const filtered = useMemo(() => {
    return kbArticles.filter(a => {
      if (selectedCat && !a.categories.includes(selectedCat)) return false;
      if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.excerpt.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [selectedCat, search]);

  return (
    <AgencyHubLayout>
      <div className="hub-kb-page">
        <div className="hub-kb-sidebar">
          <input
            type="text"
            placeholder="Filter categories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="hub-filter-search"
          />
          <button className={`hub-cat-btn ${!selectedCat ? "active" : ""}`} onClick={() => setSelectedCat("")}>
            All Resources <span className="hub-filter-count">({kbArticles.length})</span>
          </button>
          {allCategories.map(cat => {
            const count = kbArticles.filter(a => a.categories.includes(cat)).length;
            return (
              <button key={cat} className={`hub-cat-btn ${selectedCat === cat ? "active" : ""}`} onClick={() => setSelectedCat(cat)}>
                {cat} <span className="hub-filter-count">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="hub-kb-results">
          <div className="hub-kb-header">
            <h2>{selectedCat || "All Resources"}</h2>
            <span>{filtered.length} article{filtered.length !== 1 ? "s" : ""}</span>
          </div>
          <div className="hub-articles-list">
            {filtered.map(article => (
              <Link key={article.slug} href={`/portal/kb/${article.slug}`}>
                <div className="hub-article-card">
                  <div className="hub-article-header">
                    <h4>{article.title}</h4>
                    <span className={`hub-badge ${article.status}`}>
                      {article.status === "verified" ? "✓ Verified" : "Draft — review"}
                    </span>
                  </div>
                  <p className="hub-article-excerpt">{article.excerpt}</p>
                  <div className="hub-article-meta">
                    <span>{article.author} · Updated {article.updatedAt}</span>
                    <div className="hub-article-tags">
                      {article.categories.map(c => (
                        <span key={c} className="hub-tag">{c}</span>
                      ))}
                    </div>
                  </div>
                  <span className="hub-read-more">Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AgencyHubLayout>
  );
}
