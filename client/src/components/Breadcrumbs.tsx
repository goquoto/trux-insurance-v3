import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-[var(--hair)] bg-paper">
      <div className="container py-3">
        <ol className="flex items-center gap-1.5 text-[13px] font-sans text-muted-custom list-none m-0 p-0">
          <li>
            <Link href="/" className="no-underline text-muted-custom hover:text-ink transition-colors">
              Home
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight size={12} className="text-[var(--hair)]" />
              {item.href ? (
                <Link href={item.href} className="no-underline text-muted-custom hover:text-ink transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-ink font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
