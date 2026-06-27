import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQSection({ items, title = "Frequently Asked Questions" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 border-t border-[var(--hair)]">
      <div className="max-w-3xl">
        <p className="eyebrow">FAQ</p>
        <div className="tick" />
        <h2 className="text-[28px] md:text-[34px] mb-8">{title}</h2>

        <div className="space-y-0">
          {items.map((item, index) => (
            <div key={index} className="border-b border-[var(--hair)]">
              <button
                className="w-full flex items-center justify-between py-5 text-left bg-transparent border-0 cursor-pointer group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-serif text-[17px] md:text-[19px] font-medium text-ink pr-4 group-hover:text-purple transition-colors">
                  {item.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-muted-custom flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? "max-h-[500px] pb-5" : "max-h-0"
                }`}
              >
                <p className="font-sans text-[15px] text-muted-custom leading-relaxed m-0 pr-8">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
