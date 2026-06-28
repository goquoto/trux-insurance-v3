import { useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import Layout from "../components/Layout";
import Breadcrumbs from "../components/Breadcrumbs";
import SEO from "../components/SEO";
import TrustSignals from "../components/TrustSignals";
import { blogArticles } from "../data/blogArticles";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const article = blogArticles.find(a => a.slug === slug);

  useEffect(() => {
    if (!article) {
      setLocation("/blog");
    }
  }, [article, setLocation]);

  if (!article) {
    return null;
  }

  // Find related articles (same category, excluding current)
  const relatedArticles = blogArticles
    .filter(a => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  // If not enough related by category, fill with others
  const moreArticles = relatedArticles.length < 3
    ? [...relatedArticles, ...blogArticles.filter(a => a.slug !== article.slug && !relatedArticles.includes(a)).slice(0, 3 - relatedArticles.length)]
    : relatedArticles;

  return (
    <Layout>
      <SEO
        title={article.title}
        description={article.excerpt}
        type="article"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: article.title, url: `/blog/${article.slug}` }
        ]}
      />
      <Breadcrumbs items={[
        { label: "Blog", href: "/blog" },
        { label: article.title }
      ]} />

      {/* Article Header */}
      <section className="bg-paper border-b border-[var(--hair)]">
        <div className="container py-12 md:py-16">
          <div className="max-w-[740px]">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[var(--taupe)]">
                {article.category}
              </span>
              <span className="text-[11px] font-sans text-[var(--taupe)]">•</span>
              <span className="text-[11px] font-sans text-[var(--taupe)]">
                {article.readTime}
              </span>
            </div>
            <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-5" />
            <h1 className="font-serif text-[30px] md:text-[42px] font-medium text-head leading-[1.15] tracking-[-0.01em] mb-5">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-[13px] font-sans text-[var(--taupe)]">
              <span>{article.author}</span>
              <span>•</span>
              <time dateTime={article.publishDate}>
                {new Date(article.publishDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </time>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-paper">
        <div className="container py-12 md:py-16">
          <div className="max-w-[740px]">
            <div className="prose-trux">
              {renderMarkdownContent(article.content)}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-paper">
        <div className="container py-8 max-w-[740px]">
          <TrustSignals variant="compact" />
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-[var(--sand)] border-y border-[var(--hair)]">
        <div className="container py-12 md:py-16">
          <div className="max-w-[740px] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-serif text-[22px] font-medium text-head mb-2">
                Questions about your coverage?
              </h3>
              <p className="font-sans text-[15px] text-muted-custom">
                We specialize exclusively in commercial trucking insurance.
              </p>
            </div>
            <Link
              href="/quote"
              className="inline-block bg-ink text-white font-sans text-[14px] font-medium px-7 py-3 hover:bg-head transition-colors no-underline uppercase tracking-[0.08em] text-center shrink-0"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {moreArticles.length > 0 && (
        <section className="bg-paper-2">
          <div className="container py-12 md:py-16">
            <p className="eyebrow mb-3">KEEP READING</p>
            <div className="w-[46px] h-[2px] bg-[var(--tick)] mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {moreArticles.map(related => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group block bg-paper border border-[var(--hair)] p-5 hover:border-[var(--tick)] transition-colors no-underline"
                >
                  <span className="text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[var(--taupe)] mb-3 block">
                    {related.category}
                  </span>
                  <h4 className="font-serif text-[17px] font-medium text-head leading-[1.3] mb-2 group-hover:text-ink transition-colors">
                    {related.title}
                  </h4>
                  <span className="text-[12px] font-sans text-[var(--taupe)]">
                    {related.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

/**
 * Simple markdown-to-JSX renderer for article content.
 * Handles: headings (##), bold (**), lists (- ), paragraphs
 */
function renderMarkdownContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let currentList: string[] = [];
  let key = 0;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ");
      elements.push(
        <p key={key++} className="font-sans text-[16px] text-muted-custom leading-[1.8] mb-5" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(text) }} />
      );
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={key++} className="mb-5 pl-5 space-y-2">
          {currentList.map((item, i) => (
            <li key={i} className="font-sans text-[15px] text-muted-custom leading-[1.7] list-disc" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "") {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      const heading = trimmed.replace("## ", "");
      elements.push(
        <h2 key={key++} className="font-serif text-[24px] font-medium text-head leading-[1.3] mt-10 mb-4">
          {heading}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      const heading = trimmed.replace("### ", "");
      elements.push(
        <h3 key={key++} className="font-serif text-[19px] font-medium text-head leading-[1.3] mt-8 mb-3">
          {heading}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      flushParagraph();
      currentList.push(trimmed.replace(/^[-*]\s+/, ""));
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      flushParagraph();
      currentList.push(trimmed.replace(/^\d+\.\s+/, ""));
      continue;
    }

    currentParagraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return elements;
}

function formatInlineMarkdown(text: string): string {
  // Bold
  let result = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-medium text-head">$1</strong>');
  // Italic
  result = result.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Inline code
  result = result.replace(/`(.+?)`/g, '<code class="bg-[var(--sand)] px-1.5 py-0.5 text-[14px] font-mono">$1</code>');
  return result;
}
