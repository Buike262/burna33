import { useState } from "react";
import { motion } from "framer-motion";

export interface Section {
  id: string;
  name: string;
  tier: "general" | "vip" | "platinum";
  seats: number;
  available: number;
  path: string;
}

const sections: Section[] = [
  // Front rows (Platinum)
  { id: "P1", name: "Platinum Center", tier: "platinum", seats: 40, available: 12, path: "M 180 200 Q 300 180 420 200 L 400 230 Q 300 215 200 230 Z" },
  { id: "P2", name: "Platinum Left", tier: "platinum", seats: 20, available: 8, path: "M 120 220 L 180 200 L 200 230 L 140 245 Z" },
  { id: "P3", name: "Platinum Right", tier: "platinum", seats: 20, available: 5, path: "M 420 200 L 480 220 L 460 245 L 400 230 Z" },
  // Mid rows (VIP)
  { id: "V1", name: "VIP Center", tier: "vip", seats: 80, available: 34, path: "M 160 260 Q 300 240 440 260 L 460 310 Q 300 285 140 310 Z" },
  { id: "V2", name: "VIP Left", tier: "vip", seats: 50, available: 22, path: "M 80 270 L 160 260 L 140 310 L 70 320 Z" },
  { id: "V3", name: "VIP Right", tier: "vip", seats: 50, available: 18, path: "M 440 260 L 520 270 L 530 320 L 460 310 Z" },
  // Back rows (General)
  { id: "G1", name: "General Center", tier: "general", seats: 200, available: 120, path: "M 120 330 Q 300 305 480 330 L 500 400 Q 300 370 100 400 Z" },
  { id: "G2", name: "General Left", tier: "general", seats: 100, available: 76, path: "M 50 340 L 120 330 L 100 400 L 40 410 Z" },
  { id: "G3", name: "General Right", tier: "general", seats: 100, available: 61, path: "M 480 330 L 550 340 L 560 410 L 500 400 Z" },
  { id: "G4", name: "General Balcony", tier: "general", seats: 150, available: 98, path: "M 60 430 Q 300 410 540 430 L 550 470 Q 300 445 50 470 Z" },
];

const tierColors: Record<string, { fill: string; hover: string; label: string }> = {
  platinum: { fill: "hsl(40 90% 55% / 0.35)", hover: "hsl(40 90% 55% / 0.6)", label: "Platinum" },
  vip: { fill: "hsl(25 100% 50% / 0.3)", hover: "hsl(25 100% 50% / 0.55)", label: "VIP" },
  general: { fill: "hsl(0 0% 50% / 0.2)", hover: "hsl(0 0% 50% / 0.4)", label: "General" },
};

interface SeatMapProps {
  onSelect: (section: Section) => void;
  selectedId: string | null;
}

const SeatMap = ({ onSelect, selectedId }: SeatMapProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex justify-center gap-4 mb-4">
        {Object.entries(tierColors).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="w-3 h-3 rounded-sm" style={{ background: val.fill }} />
            {val.label}
          </div>
        ))}
      </div>

      <svg viewBox="0 0 600 500" className="w-full max-w-lg mx-auto">
        {/* Stage */}
        <defs>
          <linearGradient id="stageGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(40 90% 55%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(25 100% 50%)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path d="M 200 120 Q 300 100 400 120 L 380 150 Q 300 135 220 150 Z" fill="url(#stageGrad)" />
        <text x="300" y="140" textAnchor="middle" className="fill-primary-foreground text-[11px] font-bold">STAGE</text>

        {/* Sections */}
        {sections.map((section) => {
          const colors = tierColors[section.tier];
          const isHovered = hoveredId === section.id;
          const isSelected = selectedId === section.id;
          const availability = Math.round((section.available / section.seats) * 100);

          return (
            <g
              key={section.id}
              onMouseEnter={() => setHoveredId(section.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelect(section)}
              className="cursor-pointer"
            >
              <motion.path
                d={section.path}
                fill={isSelected ? colors.hover : isHovered ? colors.hover : colors.fill}
                stroke={isSelected ? "hsl(40 90% 55%)" : isHovered ? "hsl(40 90% 55% / 0.6)" : "hsl(0 0% 100% / 0.1)"}
                strokeWidth={isSelected ? 2 : 1}
                animate={{ opacity: isHovered || isSelected ? 1 : 0.85 }}
                transition={{ duration: 0.2 }}
              />
              {/* Tooltip on hover */}
              {isHovered && (
                <foreignObject x="170" y="60" width="260" height="56">
                  <div className="bg-card border border-border rounded-lg px-3 py-2 text-center shadow-xl">
                    <p className="text-foreground text-xs font-bold">{section.name}</p>
                    <p className="text-muted-foreground text-[10px]">
                      {section.available} of {section.seats} seats · {availability}% available
                    </p>
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>

      {/* Selected info */}
      {selectedId && (() => {
        const s = sections.find((s) => s.id === selectedId);
        if (!s) return null;
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-3 mt-3 text-center"
          >
            <p className="text-foreground font-bold text-sm">{s.name}</p>
            <p className="text-muted-foreground text-xs">{s.available} seats available</p>
          </motion.div>
        );
      })()}
    </div>
  );
};

export { sections };
export default SeatMap;
