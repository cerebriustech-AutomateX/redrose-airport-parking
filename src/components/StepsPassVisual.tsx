"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  stepsPassVisualLeftVariant,
  stepsPassVisualVariant,
} from "@/lib/stepsMotion";

type StepsPassVisualProps = {
  activeStep?: number;
  className?: string;
  animateIn?: boolean;
  /** Drop direction — use left in story sections so the cinematic pass stays clear on the right */
  side?: "left" | "right";
  /** When set, drop animation is driven by the parent section (synced with deck) */
  enterTriggered?: boolean;
};

const passRows = [
  { label: "Booking", detail: "Confirmed" },
  { label: "Arrival", detail: "Bay assigned" },
  { label: "Travel", detail: "Trip ready" },
] as const;

export default function StepsPassVisual({
  activeStep = 0,
  className = "",
  animateIn = true,
  side = "left",
  enterTriggered,
}: StepsPassVisualProps) {
  const reduceMotion = useReducedMotion();
  const clamped = Math.min(Math.max(activeStep, 0), passRows.length - 1);
  const shouldAnimate = enterTriggered ?? animateIn;
  const dropVariant =
    side === "left" ? stepsPassVisualLeftVariant : stepsPassVisualVariant;

  const card = (
    <div className="steps-pass-card">
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <Image
          src="/images/redrose-logo.png"
          alt=""
          width={88}
          height={112}
          className="h-14 w-auto shrink-0 opacity-95"
        />
        <div>
          <p className="font-[family-name:var(--font-montserrat)] text-[9px] font-semibold uppercase tracking-[0.22em] text-[rgba(242,242,242,0.45)]">
            RedRose
          </p>
          <p className="font-[family-name:var(--font-montserrat)] text-sm font-semibold tracking-wide text-[#F2F2F2]">
            Parking Pass
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {passRows.map((row, index) => (
          <div
            key={row.label}
            className={`steps-pass-row ${index === clamped ? "steps-pass-row--active" : ""}`}
            style={{ opacity: index === clamped ? 1 : 0.42 }}
          >
            <span className="steps-pass-row-label">{row.label}</span>
            <span className="steps-pass-row-value">{row.detail}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="steps-pass-chip" aria-hidden="true">
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
            <path d="M4 3h2l1.2 4.8a6 6 0 0011.6 0L20 3h-2l-1 4H5L4 3zm7 11a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </span>
        <span className="font-[family-name:var(--font-montserrat)] text-[9px] font-semibold uppercase tracking-[0.18em] text-[rgba(242,242,242,0.38)]">
          Valid for travel
        </span>
      </div>
    </div>
  );

  if (reduceMotion || !shouldAnimate) {
    return (
      <div className={`steps-pass-scene ${className}`} aria-hidden="true">
        {card}
      </div>
    );
  }

  if (enterTriggered !== undefined) {
    return (
      <div className={`steps-pass-scene ${className}`} aria-hidden="true">
        <motion.div
          initial={dropVariant.initial}
          animate={enterTriggered ? dropVariant.animate : dropVariant.initial}
        >
          {card}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className={`steps-pass-scene ${className}`}
      aria-hidden="true"
      initial={dropVariant.initial}
      whileInView={dropVariant.animate}
      viewport={{ once: true, amount: 0.35 }}
    >
      {card}
    </motion.div>
  );
}
