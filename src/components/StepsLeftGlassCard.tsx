"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { StoryDeckItem } from "@/components/StoryDeck";
import {
  respecLeftGlassCard,
  respecLeftGlassItem,
  respecLeftGlassStagger,
} from "@/lib/stepsMotion";

const passRows = [
  { label: "Booking", detail: "Confirmed" },
  { label: "Arrival", detail: "Bay assigned" },
  { label: "Travel", detail: "Trip ready" },
] as const;

type StepsLeftGlassCardProps = {
  items: readonly StoryDeckItem[];
  active?: boolean;
  className?: string;
};

/** Final pass summary — same glass system as StoryDeck. */
export default function StepsLeftGlassCard({
  items,
  active = true,
  className = "",
}: StepsLeftGlassCardProps) {
  if (!active) return null;

  return (
    <motion.div
      className={`story-panel-glass relative ${className}`}
      initial="hidden"
      animate="visible"
      variants={respecLeftGlassCard}
    >
      <span className="story-panel-accent" aria-hidden="true" />

      <motion.div
        variants={respecLeftGlassStagger}
        initial="hidden"
        animate="visible"
        className="px-6 py-5 sm:px-7 sm:py-6"
      >
        <motion.p className="steps-section-eyebrow" variants={respecLeftGlassItem}>
          You&apos;re all set
        </motion.p>

        <motion.h3
          className="mt-3 font-(family-name:--font-montserrat) text-xl font-bold tracking-tight text-[#F2F2F2] sm:text-[1.35rem]"
          variants={respecLeftGlassItem}
        >
          Your parking pass is ready
        </motion.h3>

        <motion.p
          className="steps-section-subcopy text-pretty mt-3 text-sm leading-relaxed"
          variants={respecLeftGlassItem}
        >
          Booking confirmed, bay assigned, and directions sent before you travel.
        </motion.p>

        <motion.ul className="mt-5 space-y-2" variants={respecLeftGlassItem}>
          {items.map((step) => (
            <li
              key={step.number}
              className="flex items-center gap-3 rounded-lg border border-white/8 bg-white/4 px-3 py-2.5"
            >
              <span className="font-(family-name:--font-montserrat) text-[10px] font-bold tracking-[0.16em] text-[#8B001D]">
                {step.number}
              </span>
              <span className="text-sm font-medium text-[#F2F2F2]">{step.title}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          className="story-deck-card-active mt-5"
          variants={respecLeftGlassItem}
        >
          <p className="font-(family-name:--font-montserrat) text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">
            Pass status
          </p>
          <div className="mt-3 space-y-2">
            {passRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="text-white/45">{row.label}</span>
                <span className="font-medium text-[#F2F2F2]">{row.detail}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-5 flex flex-wrap gap-3" variants={respecLeftGlassItem}>
          <Link href="#book" className="btn-primary inline-flex text-sm">
            Check Availability
          </Link>
          <Link href="#why-choose-us" className="btn-secondary inline-flex text-sm">
            Why RedRose
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
