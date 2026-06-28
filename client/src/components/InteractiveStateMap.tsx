import { useLocation } from "wouter";
import { useState } from "react";

// Simplified but recognizable SVG paths for US states (viewBox 0 0 960 600)
const STATE_PATHS: Record<string, { d: string; slug: string; name: string; labelX: number; labelY: number }> = {
  AZ: {
    slug: "arizona",
    name: "Arizona",
    labelX: 168, labelY: 410,
    d: "M103,335 L135,335 L140,355 L145,380 L148,420 L150,450 L155,470 L100,470 L95,460 L88,450 L85,440 L90,430 L95,420 L100,410 L103,400 L103,335 Z"
  },
  CO: {
    slug: "colorado",
    name: "Colorado",
    labelX: 270, labelY: 340,
    d: "M225,295 L320,295 L320,380 L225,380 Z"
  },
  FL: {
    slug: "florida",
    name: "Florida",
    labelX: 730, labelY: 510,
    d: "M670,460 L700,455 L720,455 L740,460 L755,465 L760,470 L755,480 L745,490 L740,500 L738,510 L735,520 L730,530 L720,540 L710,545 L700,540 L695,530 L690,520 L688,510 L685,500 L680,490 L675,480 L670,470 L670,460 Z"
  },
  GA: {
    slug: "georgia",
    name: "Georgia",
    labelX: 700, labelY: 430,
    d: "M680,380 L720,380 L725,390 L730,400 L732,415 L730,430 L725,445 L720,455 L700,455 L680,460 L670,460 L665,450 L665,440 L668,420 L670,400 L675,390 L680,380 Z"
  },
  IL: {
    slug: "illinois",
    name: "Illinois",
    labelX: 580, labelY: 340,
    d: "M565,260 L590,260 L595,270 L598,285 L600,300 L600,320 L598,340 L595,360 L590,375 L585,385 L580,390 L575,385 L570,375 L568,360 L565,340 L563,320 L563,300 L563,280 L565,260 Z"
  },
  IN: {
    slug: "indiana",
    name: "Indiana",
    labelX: 620, labelY: 330,
    d: "M600,275 L630,275 L633,290 L635,310 L635,330 L633,350 L630,365 L625,375 L615,375 L605,370 L600,360 L598,340 L598,320 L598,300 L600,275 Z"
  },
  IA: {
    slug: "iowa",
    name: "Iowa",
    labelX: 510, labelY: 270,
    d: "M470,240 L550,240 L555,250 L555,265 L553,280 L548,290 L540,295 L520,295 L500,293 L480,290 L470,285 L468,270 L470,240 Z"
  },
  KY: {
    slug: "kentucky",
    name: "Kentucky",
    labelX: 650, labelY: 375,
    d: "M580,365 L600,360 L620,365 L640,365 L660,368 L680,370 L700,375 L700,385 L695,395 L680,395 L660,392 L640,390 L620,388 L600,385 L585,385 L580,380 L580,365 Z"
  },
  MI: {
    slug: "michigan",
    name: "Michigan",
    labelX: 635, labelY: 235,
    d: "M595,180 L610,175 L625,178 L640,185 L650,195 L658,210 L660,225 L658,240 L650,250 L640,258 L630,260 L620,258 L610,252 L600,245 L595,235 L593,220 L593,200 L595,180 Z"
  },
  MN: {
    slug: "minnesota",
    name: "Minnesota",
    labelX: 490, labelY: 175,
    d: "M470,120 L530,120 L535,130 L538,150 L538,170 L535,190 L530,205 L520,215 L510,220 L495,222 L480,220 L470,215 L465,205 L463,190 L463,170 L465,150 L468,130 L470,120 Z"
  },
  MS: {
    slug: "mississippi",
    name: "Mississippi",
    labelX: 620, labelY: 445,
    d: "M600,400 L625,400 L630,415 L632,430 L632,450 L630,465 L625,480 L618,488 L610,490 L602,488 L598,480 L596,465 L596,445 L596,430 L598,415 L600,400 Z"
  },
  MO: {
    slug: "missouri",
    name: "Missouri",
    labelX: 530, labelY: 360,
    d: "M500,310 L560,310 L565,320 L568,340 L568,360 L565,375 L558,385 L548,390 L535,392 L520,390 L508,385 L500,375 L498,360 L498,340 L500,310 Z"
  },
  NV: {
    slug: "nevada",
    name: "Nevada",
    labelX: 120, labelY: 340,
    d: "M90,250 L130,250 L135,270 L138,295 L140,320 L140,350 L138,375 L135,395 L103,395 L100,380 L95,360 L92,340 L90,320 L88,295 L88,270 L90,250 Z"
  },
  NC: {
    slug: "north-carolina",
    name: "North Carolina",
    labelX: 740, labelY: 395,
    d: "M680,380 L700,375 L720,372 L740,370 L760,372 L780,378 L790,385 L785,395 L775,400 L760,402 L740,400 L720,398 L700,395 L680,395 L680,380 Z"
  },
  OH: {
    slug: "ohio",
    name: "Ohio",
    labelX: 660, labelY: 310,
    d: "M635,270 L665,265 L672,275 L678,290 L680,310 L678,330 L675,345 L670,358 L660,365 L650,365 L640,360 L635,350 L633,335 L633,315 L633,295 L635,270 Z"
  },
  PA: {
    slug: "pennsylvania",
    name: "Pennsylvania",
    labelX: 730, labelY: 275,
    d: "M685,250 L760,250 L765,260 L765,275 L762,290 L755,298 L740,300 L720,298 L700,295 L688,290 L685,280 L685,265 L685,250 Z"
  },
  SC: {
    slug: "south-carolina",
    name: "South Carolina",
    labelX: 725, labelY: 425,
    d: "M680,400 L700,398 L720,400 L740,405 L750,415 L748,425 L740,435 L725,440 L710,442 L695,440 L680,435 L670,425 L668,415 L670,405 L680,400 Z"
  },
  TN: {
    slug: "tennessee",
    name: "Tennessee",
    labelX: 640, labelY: 400,
    d: "M580,390 L600,388 L620,390 L640,392 L660,395 L680,398 L680,408 L675,415 L660,415 L640,413 L620,410 L600,408 L585,405 L580,400 L580,390 Z"
  },
  TX: {
    slug: "texas",
    name: "Texas",
    labelX: 360, labelY: 470,
    d: "M290,420 L340,415 L380,418 L410,420 L430,425 L440,435 L445,450 L440,470 L430,490 L415,510 L400,525 L380,535 L360,540 L340,535 L320,525 L305,510 L295,495 L288,480 L285,465 L285,450 L288,435 L290,420 Z"
  },
  VA: {
    slug: "virginia",
    name: "Virginia",
    labelX: 730, labelY: 350,
    d: "M680,330 L700,328 L720,330 L740,335 L760,340 L780,348 L790,355 L785,365 L775,370 L760,372 L740,370 L720,368 L700,365 L680,368 L680,355 L680,340 L680,330 Z"
  },
  WI: {
    slug: "wisconsin",
    name: "Wisconsin",
    labelX: 555, labelY: 210,
    d: "M540,160 L570,158 L580,165 L588,178 L590,195 L588,210 L583,225 L575,235 L565,240 L555,240 L545,238 L538,230 L535,220 L533,205 L535,190 L538,175 L540,160 Z"
  },
};

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
    <div className="w-full">
      <svg
        viewBox="60 100 780 480"
        className="w-full h-auto"
        style={{ maxWidth: "900px", margin: "0 auto" }}
        role="img"
        aria-label="Interactive map of US states where Trux Insurance Services is licensed"
      >
        {/* US outline background (simplified continental) */}
        <path
          d="M80,180 L180,140 L280,130 L380,125 L480,120 L580,125 L680,135 L780,160 L830,200 L840,250 L835,300 L820,350 L800,400 L780,440 L750,470 L700,490 L650,500 L600,505 L550,500 L500,495 L450,500 L400,510 L350,530 L300,540 L250,530 L200,510 L150,480 L110,440 L90,400 L80,350 L75,300 L78,240 L80,180 Z"
          fill="var(--paper-2)"
          stroke="var(--hair)"
          strokeWidth="1"
        />

        {/* State shapes */}
        {Object.entries(STATE_PATHS).map(([code, state]) => {
          const isHighlighted = highlightedState === state.name;
          const isHovered = hoveredState === code;

          return (
            <g key={code} style={{ cursor: "pointer" }}>
              <path
                d={state.d}
                fill={isHighlighted ? "var(--ink)" : isHovered ? "var(--tick)" : "var(--sand)"}
                stroke={isHighlighted ? "var(--ink)" : isHovered ? "var(--head)" : "var(--hair)"}
                strokeWidth={isHovered || isHighlighted ? 2 : 1}
                className="transition-all duration-200"
                onMouseEnter={() => setHoveredState(code)}
                onMouseLeave={() => setHoveredState(null)}
                onClick={() => handleStateClick(state.slug)}
              />

              {/* State label */}
              {showLabels && (
                <text
                  x={state.labelX}
                  y={state.labelY}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="Poppins, sans-serif"
                  fontWeight={isHovered || isHighlighted ? "600" : "500"}
                  fill={isHighlighted ? "white" : isHovered ? "var(--ink)" : "var(--muted)"}
                  className="pointer-events-none transition-colors duration-200"
                  style={{ userSelect: "none" }}
                >
                  {code}
                </text>
              )}

              {/* Tooltip */}
              {isHovered && <title>{state.name} — Click for details</title>}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-[13px]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 bg-[var(--sand)] border border-[var(--hair)]"></div>
          <span className="text-[var(--muted)]">Licensed state</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 bg-[var(--tick)] border border-[var(--head)]"></div>
          <span className="text-[var(--muted)]">Hover</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 bg-[var(--paper-2)] border border-[var(--hair)]"></div>
          <span className="text-[var(--muted)]">Not yet available</span>
        </div>
      </div>

      {/* Click instruction */}
      <p className="mt-3 text-center text-[13px] text-[var(--taupe)] italic">
        Click any highlighted state to view coverage details and get a quote.
      </p>
    </div>
  );
}
