// components/ui/floating-icons.tsx
"use client";

import { useEffect, useState } from "react";
import {
  PenTool,
  Layers,
  Type,
  Video,
  Camera,
  Sparkles,
  Palette,
  Move,
} from "lucide-react";

const icons = [
  { Icon: PenTool, color: "#0047FF", size: 24 },
  { Icon: Layers, color: "#00D1FF", size: 28 },
  { Icon: Type, color: "#9b87f5", size: 22 },
  { Icon: Video, color: "#f97316", size: 26 },
  { Icon: Camera, color: "#ec4899", size: 20 },
  { Icon: Palette, color: "#0047FF", size: 24 },
  { Icon: Sparkles, color: "#00D1FF", size: 22 },
  { Icon: Move, color: "#9b87f5", size: 26 },
];

export default function FloatingIcons() {
  const [positions, setPositions] = useState<
    Array<{ top: string; left: string; delay: string; duration: string }>
  >([]);

  useEffect(() => {
    // Generate random positions on client-side only
    const newPositions = icons.map(() => ({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 10 + 15}s`,
    }));
    setPositions(newPositions);
  }, []);

  if (positions.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {icons.map(({ Icon, color, size }, index) => (
        <div
          key={index}
          className="absolute animate-float opacity-20 dark:opacity-30"
          style={{
            top: positions[index]?.top,
            left: positions[index]?.left,
            animation: `float ${positions[index]?.duration} infinite ease-in-out`,
            animationDelay: positions[index]?.delay,
          }}
        >
          <Icon size={size} color={color} />
        </div>
      ))}
    </div>
  );
}
