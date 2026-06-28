import { Star, Shield, Clock, Award } from "lucide-react";

interface TrustSignalsProps {
  variant?: "horizontal" | "compact";
}

const signals = [
  { icon: Star, label: "5.0 Google Rating", sublabel: "50+ reviews" },
  { icon: Shield, label: "New Authorities Welcome", sublabel: "Day-one coverage" },
  { icon: Clock, label: "24/7 Certificate Portal", sublabel: "Instant access" },
  { icon: Award, label: "10+ Years Experience", sublabel: "Trucking only" },
];

export default function TrustSignals({ variant = "horizontal" }: TrustSignalsProps) {
  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center gap-4 py-4">
        {signals.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-[13px] font-sans text-muted-custom">
            <s.icon size={14} className="text-[var(--purple)]" />
            <span className="font-medium text-ink">{s.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-b border-[var(--hair)]">
      {signals.map((s, i) => (
        <div key={i} className="flex flex-col items-center text-center gap-2">
          <s.icon size={20} className="text-[var(--purple)]" />
          <span className="font-sans text-[14px] font-medium text-ink">{s.label}</span>
          <span className="font-sans text-[12px] text-muted-custom">{s.sublabel}</span>
        </div>
      ))}
    </div>
  );
}
