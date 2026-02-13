"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="relative aspect-square w-full max-w-md mx-auto group">
      {/* Main container with hover effect */}
      <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
        {/* Grid Background using the same style as your layout */}
        <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid-cyan"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="#00D1FF"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-cyan)" />
          </svg>
        </div>

        {/* Gradient Ring with glow effect */}
        <div className="absolute inset-0 rounded-full blur-[1px]">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-[#0047FF] to-[#00D1FF] p-[3px]">
            <div className="w-full h-full rounded-full bg-transparent" />
          </div>
        </div>

        {/* Inner ring for depth */}
        <div className="absolute inset-0 rounded-full blur-sm opacity-70">
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#0047FF] to-[#00D1FF] p-[2px]">
            <div className="w-full h-full rounded-full bg-transparent" />
          </div>
        </div>

        {/* Image container with sticker effect */}
        <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-white shadow-2xl shadow-[#0047FF]/15">
          <Image
            src="/Hero1.png"
            alt="Aklilu - Graphic Designer"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Rest of your stars... */}
        {/* Large star - Top Right */}
        <div className="absolute -top-6 -right-6">
          <Sparkles
            size={40}
            strokeWidth={1.5}
            className="text-transparent fill-[#00D1FF] drop-shadow-[0_0_8px_rgba(0,209,255,0.8)]"
            style={{
              background: "linear-gradient(135deg, #0047FF, #00D1FF)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          />
        </div>

        {/* Medium star - Bottom Left */}
        <div className="absolute -bottom-6 -left-6">
          <Sparkles
            size={32}
            strokeWidth={1.5}
            className="text-transparent fill-[#00D1FF] drop-shadow-[0_0_8px_rgba(0,209,255,0.8)]"
            style={{
              background: "linear-gradient(135deg, #0047FF, #00D1FF)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          />
        </div>

        {/* Small star - Bottom Center */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          <Sparkles
            size={20}
            strokeWidth={1.5}
            className="text-transparent fill-[#00D1FF] drop-shadow-[0_0_8px_rgba(0,209,255,0.8)]"
            style={{
              background: "linear-gradient(135deg, #0047FF, #00D1FF)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          />
        </div>

        {/* Small star - Top Left */}
        <div className="absolute -top-3 -left-3">
          <Sparkles
            size={20}
            strokeWidth={1.5}
            className="text-transparent fill-[#00D1FF] drop-shadow-[0_0_8px_rgba(0,209,255,0.8)]"
            style={{
              background: "linear-gradient(135deg, #0047FF, #00D1FF)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          />
        </div>
      </div>
    </div>
  );
}
