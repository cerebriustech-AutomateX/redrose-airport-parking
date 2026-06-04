"use client";

import { motion } from "framer-motion";
import { stepsEase } from "@/lib/stepsMotion";

export type StepStackItem = {
  number: string;
  title: string;
  description: string;
};

type StepsLeftStepStackProps = {
  items: readonly StepStackItem[];
  /** How many steps have been revealed (1 → 2 → 3 as you scroll). */
  revealedCount: number;
  visible: boolean;
  className?: string;
};

/** Vertical step stack — each step fades in below the last and stays visible. */
export default function StepsLeftStepStack({
  items,
  revealedCount,
  visible,
  className = "",
}: StepsLeftStepStackProps) {
  if (!visible || revealedCount <= 0) {
    return null;
  }

  const shown = items.slice(0, Math.min(revealedCount, items.length));

  return (
    <div className={`mt-6 w-full max-w-lg ${className}`}>
      <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
        {shown.map((item) => (
          <motion.article
            key={item.number}
            className="story-panel-glass relative p-6 sm:p-7"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: stepsEase }}
          >
            <span className="story-panel-accent" aria-hidden="true" />

            <div className="flex items-center gap-3">
              <span className="text-[0.8125rem] font-semibold tracking-[0.18em] text-[#8B001D] font-(family-name:--font-montserrat)">
                STEP {item.number}
              </span>
              <span className="h-px flex-1 bg-linear-to-r from-[#8B001D]/35 to-transparent" />
            </div>

            <h3 className="mt-4 text-[1.5rem] font-bold leading-tight tracking-tight text-white/95 sm:text-[1.625rem] font-(family-name:--font-montserrat)">
              {item.title}
            </h3>

            <p className="mt-4 text-[1rem] leading-relaxed text-white/55 sm:text-[1.0625rem]">
              {item.description}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
