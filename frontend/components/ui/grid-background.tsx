// components/ui/grid-background.tsx
import React from "react";

export default function GridBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      {/* Dark theme grid */}
      <div className="absolute inset-0 dark:block hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid-dark"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-dark)" />
        </svg>
      </div>

      {/* Light theme grid */}
      <div className="absolute inset-0 dark:hidden block">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid-light"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-light)" />
        </svg>
      </div>

      {/* Optional subtle dot pattern at intersections */}
      <div className="absolute inset-0 dark:block hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dots-dark"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.2)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-dark)" />
        </svg>
      </div>

      {/* Light theme dots */}
      <div className="absolute inset-0 dark:hidden block">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dots-light"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="0" cy="0" r="1.5" fill="rgba(0,0,0,0.15)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-light)" />
        </svg>
      </div>
    </div>
  );
}
