import { useParams, Link } from "wouter";
import AgencyHubLayout from "@/components/AgencyHubLayout";
import { kbArticles } from "@/data/kbArticles";

export default function HubArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = kbArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <AgencyHubLayout>
        <div className="hub-article-not-found">
          <h2>Article not found</h2>
          <Link href="/portal/kb">← Back to Knowledge Base</Link>
        </div>
      </AgencyHubLayout>
    );
  }

  return (
    <AgencyHubLayout>
      <div className="hub-article-page">
        <Link href="/portal/kb" className="hub-back-link">← Back to Knowledge Base</Link>

        <div className="hub-article-detail">
          <div className="hub-article-detail-header">
            <div className="hub-article-detail-meta">
              <span className={`hub-badge ${article.status}`}>
                {article.status === "verified" ? "✓ Verified" : "Draft — review"}
              </span>
              <span className="hub-article-author">By {article.author}</span>
              <span className="hub-article-date">Updated {article.updatedAt}</span>
            </div>
            <h1>{article.title}</h1>
            <div className="hub-article-tags">
              {article.categories.map(c => (
                <span key={c} className="hub-tag">{c}</span>
              ))}
            </div>
          </div>

          <div className="hub-article-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(article.body) }} />
        </div>
      </div>
    </AgencyHubLayout>
  );
}

// Simple markdown renderer (no external deps)
function renderMarkdown(md: string): string {
  let html = md;
  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Code blocks
  html = html.replace(/```[\s\S]*?```/g, (match) => {
    const code = match.replace(/```\w*\n?/, '').replace(/\n?```$/, '');
    return `<pre><code>${code}</code></pre>`;
  });
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  // Checkboxes
  html = html.replace(/^- \[x\] (.+)$/gm, '<div class="hub-check done">✓ $1</div>');
  html = html.replace(/^- \[ \] (.+)$/gm, '<div class="hub-check">☐ $1</div>');
  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr>');
  // Tables
  html = html.replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g, (_, header, rows) => {
    const ths = header.split('|').map((h: string) => `<th>${h.trim()}</th>`).join('');
    const trs = rows.trim().split('\n').map((row: string) => {
      const tds = row.split('|').filter((c: string) => c.trim()).map((c: string) => `<td>${c.trim()}</td>`).join('');
      return `<tr>${tds}</tr>`;
    }).join('');
    return `<table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`;
  });
  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p>');
  html = `<p>${html}</p>`;
  html = html.replace(/<p><(h[1-3]|blockquote|ul|ol|pre|hr|table|div)/g, '<$1');
  html = html.replace(/<\/(h[1-3]|blockquote|ul|ol|pre|table|div)><\/p>/g, '</$1>');
  return html;
}
