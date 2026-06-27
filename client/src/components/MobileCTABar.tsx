import { Phone } from "lucide-react";
import { Link } from "wouter";

export default function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#1A1A1A] border-t border-[var(--purple)] shadow-lg">
      <div className="flex items-stretch">
        <a
          href="tel:3312401101"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-white no-underline font-sans text-[14px] font-medium border-r border-white/10"
        >
          <Phone size={16} className="text-[var(--purple-light)]" />
          Call Now
        </a>
        <Link
          href="/quote"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[var(--purple)] text-white no-underline font-sans text-[14px] font-medium"
        >
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
