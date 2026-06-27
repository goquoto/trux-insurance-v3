import { useEffect } from "react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  breadcrumbs?: BreadcrumbItem[];
  faq?: FAQItem[];
  type?: "website" | "article" | "service";
  serviceName?: string;
}

export default function SEO({ title, description, canonical, breadcrumbs, faq, type = "website", serviceName }: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = `${title} | Trux Insurance Services`;

    // Set or update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Set canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    const canonicalUrl = canonical || window.location.origin + window.location.pathname;
    canonicalEl.setAttribute("href", canonicalUrl);

    // Remove existing schema scripts
    document.querySelectorAll('script[data-seo-schema]').forEach(el => el.remove());

    // Organization schema (site-wide)
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      "name": "Trux Insurance Services",
      "url": "https://truxins.net",
      "logo": "https://truxins.net/manus-storage/trux-logo-dark_9f1c7375.png",
      "telephone": "+1-331-240-1101",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1 Tiffany Pt Suite G2",
        "addressLocality": "Bloomingdale",
        "addressRegion": "IL",
        "postalCode": "60108",
        "addressCountry": "US"
      },
      "openingHours": "Mo-Fr 08:00-17:00",
      "areaServed": [
        "Arizona", "Colorado", "Florida", "Georgia", "Illinois", "Indiana", "Iowa",
        "Kentucky", "Michigan", "Minnesota", "Mississippi", "Missouri", "Nevada",
        "North Carolina", "Ohio", "Pennsylvania", "South Carolina", "Tennessee",
        "Texas", "Virginia", "Wisconsin"
      ],
      "description": "Commercial trucking insurance specialists serving motor carriers in 21 states."
    };
    addSchema(orgSchema);

    // Breadcrumb schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url.startsWith("http") ? item.url : `https://truxins.net${item.url}`
        }))
      };
      addSchema(breadcrumbSchema);
    }

    // FAQ schema
    if (faq && faq.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      };
      addSchema(faqSchema);
    }

    // Service schema
    if (type === "service" && serviceName) {
      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": serviceName,
        "provider": {
          "@type": "InsuranceAgency",
          "name": "Trux Insurance Services"
        },
        "areaServed": {
          "@type": "Country",
          "name": "United States"
        },
        "description": description
      };
      addSchema(serviceSchema);
    }

    return () => {
      // Cleanup schemas on unmount
      document.querySelectorAll('script[data-seo-schema]').forEach(el => el.remove());
    };
  }, [title, description, canonical, breadcrumbs, faq, type, serviceName]);

  return null;
}

function addSchema(schema: object) {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-seo-schema", "true");
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}
