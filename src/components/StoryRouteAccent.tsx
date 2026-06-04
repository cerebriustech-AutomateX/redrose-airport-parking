"use client";

import { motion, type MotionValue } from "framer-motion";

type StoryRouteAccentProps = {
  progress?: MotionValue<number>;
  opacity?: MotionValue<number>;
  className?: string;
  static?: boolean;
};

/** Thin RedRose route accent — sits inside left panels, not over the cinematic zone. */
export default function StoryRouteAccent({
  progress,
  opacity,
  className = "",
  static: isStatic = false,
}: StoryRouteAccentProps) {
  if (isStatic) {
    return (
      <div className={className} aria-hidden="true">
        <svg viewBox="0 0 320 24" className="h-5 w-full max-w-xs" fill="none">
          <path
            d="M 4 12 C 80 4, 140 20, 220 10 S 300 14, 316 12"
            stroke="#8B001D"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      </div>
    );
  }

  return (
    <motion.div
      style={opacity !== undefined ? { opacity } : undefined}
      className={className}
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 24" className="h-5 w-full max-w-xs" fill="none">
        {progress && (
          <motion.path
            d="M 4 12 C 80 4, 140 20, 220 10 S 300 14, 316 12"
            stroke="#8B001D"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={0.85}
            style={{ pathLength: progress }}
          />
        )}
      </svg>
    </motion.div>
  );
}
