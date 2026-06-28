import { useLocation } from "wouter";
import { useState } from "react";

// State coordinates for SVG map (simplified US map)
const LICENSED_STATES = [
  { code: "AZ", name: "Arizona", slug: "arizona", x: 15, y: 65 },
  { code: "CO", name: "Colorado", slug: "colorado", x: 28, y: 45 },
  { code: "FL", name: "Florida", slug: "florida", x: 78, y: 85 },
  { code: "GA", name: "Georgia", slug: "georgia", x: 72, y: 70 },
  { code: "IL", name: "Illinois", slug: "illinois", x: 60, y: 50 },
  { code: "IN", name: "Indiana", slug: "indiana", x: 62, y: 48 },
  { code: "IA", name: "Iowa", slug: "iowa", x: 50, y: 40 },
  { code: "KY", name: "Kentucky", slug: "kentucky", x: 65, y: 60 },
  { code: "MI", name: "Michigan", slug: "michigan", x: 65, y: 35 },
  { code: "MN", name: "Minnesota", slug: "minnesota", x: 55, y: 25 },
  { code: "MS", name: "Mississippi", slug: "mississippi", x: 60, y: 70 },
  { code: "MO", name: "Missouri", slug: "missouri", x: 50, y: 55 },
  { code: "NV", name: "Nevada", slug: "nevada", x: 10, y: 50 },
  { code: "NC", name: "North Carolina", slug: "north-carolina", x: 75, y: 65 },
  { code: "OH", name: "Ohio", slug: "ohio", x: 68, y: 50 },
  { code: "PA", name: "Pennsylvania", slug: "pennsylvania", x: 72, y: 45 },
  { code: "SC", name: "South Carolina", slug: "south-carolina", x: 73, y: 75 },
  { code: "TN", name: "Tennessee", slug: "tennessee", x: 62, y: 65 },
  { code: "TX", name: "Texas", slug: "texas", x: 38, y: 80 },
  { code: "VA", name: "Virginia", slug: "virginia", x: 72, y: 58 },
  { code: "WI", name: "Wisconsin", slug: "wisconsin", x: 58, y: 30 },
];

interface InteractiveStateMapProps {
  onStateClick?: (stateName: string) => void;
  highlightedState?: string;
  showLabels?: boolean;
}

export default function InteractiveStateMap({
  onStateClick,
  highlightedState,
  showLabels = true,
}: InteractiveStateMapProps) {
  const [, setLocation] = useLocation();
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const handleStateClick = (slug: string) => {
    if (onStateClick) {
      onStateClick(slug);
    } else {
      setLocation(`/states/${slug}`);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg border border-[var(--hair)] p-6">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto"
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        {/* Background */}
        <rect width="100" height="100" fill="var(--paper)" />

        {/* State circles */}
        {LICENSED_STATES.map((state) => {
          const isHighlighted = highlightedState === state.name;
          const isHovered = hoveredState === state.name;

          return (
            <g key={state.code}>
              {/* State circle */}
              <circle
                cx={state.x}
                cy={state.y}
                r={isHighlighted || isHovered ? 2.5 : 2}
                fill={isHighlighted ? "var(--ink)" : isHovered ? "var(--tick)" : "var(--sand)"}
                stroke={isHighlighted ? "var(--ink)" : "var(--hair)"}
                strokeWidth={0.5}
                className={`transition-all ${!isHighlighted && !isHovered ? "hover:fill-[var(--tick)]" : ""}`}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHoveredState(state.name)}
                onMouseLeave={() => setHoveredState(null)}
                onClick={() => handleStateClick(state.slug)}
              />

              {/* State label */}
              {showLabels && (
                <text
                  x={state.x}
                  y={state.y + 3.5}
                  textAnchor="middle"
                  fontSize="1.2"
                  fontFamily="Poppins, sans-serif"
                  fontWeight="500"
                  fill={isHighlighted ? "var(--ink)" : isHovered ? "var(--tick)" : "var(--muted)"}
                  className="pointer-events-none transition-colors"
                  style={{ userSelect: "none" }}
                >
                  {state.code}
                </text>
              )}

              {/* Tooltip on hover */}
              {isHovered && (
                <title>{state.name}</title>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[13px]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--sand)] border border-[var(--hair)]"></div>
          <span className="text-[var(--muted)]">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--tick)]"></div>
          <span className="text-[var(--muted)]">Hover</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--ink)]"></div>
          <span className="text-[var(--muted)]">Selected</span>
        </div>
      </div>

      {/* Click instruction */}
      <p className="mt-4 text-center text-[13px] text-[var(--taupe)]">
        Click any state to view coverage details and get a quote.
      </p>
    </div>
  );
}
