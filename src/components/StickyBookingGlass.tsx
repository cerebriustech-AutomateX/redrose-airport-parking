"use client";

import Image from "next/image";
import { LayoutGroup, motion } from "framer-motion";

type StickyBookingGlassProps = {
  activeStep?: number;
  className?: string;
};

const steps = [
  { label: "Booking", detail: "Reserve online" },
  { label: "Arrival", detail: "Guided to bay" },
  { label: "Travel", detail: "Trip confirmed" },
];

/**
 * Decorative frosted glass panel — sticky on the left while steps scroll.
 * Active row crossfades smoothly as each step card enters view.
 */
export default function StickyBookingGlass({
  activeStep = 0,
  className = "",
}: StickyBookingGlassProps) {
  const clamped = Math.min(Math.max(activeStep, 0), steps.length - 1);

  return (
    <div
      className={`pointer-events-none w-[280px] ${className}`}
      aria-hidden="true"
    >
      <div className="frost-panel">
        <div className="frost-panel-inner flex flex-col items-center gap-5 px-5 py-7">
          <Image
            src="/images/redrose-logo.png"
            alt=""
            width={1024}
            height={682}
            className="h-12 w-auto bg-transparent opacity-95"
          />

          <LayoutGroup>
            <div className="flex w-full flex-col gap-3">
              {steps.map((step, index) => {
                const isActive = index === clamped;
                return (
                  <motion.div
                    key={step.label}
                    animate={{
                      opacity: isActive ? 1 : 0.38,
                      y: isActive ? 0 : 1,
                      scale: isActive ? 1 : 0.985,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`frost-row relative w-full overflow-hidden ${
                      isActive ? "border-white/28 bg-white/[0.15]" : "border-white/10"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="steps-glass-highlight"
                        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-white/[0.06]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="frost-row-label relative">{step.label}</span>
                    <span className="frost-row-input relative text-sm">
                      {step.detail}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="mt-1 flex w-full items-center justify-between px-1">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-emerald-500/20 text-emerald-400/90">
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                <path d="M4 3h2l1.2 4.8a6 6 0 0011.6 0L20 3h-2l-1 4H5L4 3zm7 11a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-white/50">
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
