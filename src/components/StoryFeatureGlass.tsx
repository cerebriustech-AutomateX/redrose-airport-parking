"use client";

import { motion, useReducedMotion } from "framer-motion";

export type StoryFeatureItem = {
  title: string;
  detail: string;
};

type StoryFeatureGlassProps = {
  eyebrow: string;
  title: string;
  features: readonly StoryFeatureItem[];
  footerLabel?: string;
  footerValue?: string;
  className?: string;
};

/** Left-rail glass panel — fills story beats with useful detail, not empty space. */
export default function StoryFeatureGlass({
  eyebrow,
  title,
  features,
  footerLabel,
  footerValue,
  className = "",
}: StoryFeatureGlassProps) {
  const reduceMotion = useReducedMotion();

  const panel = (
    <div className={`story-panel-glass p-6 sm:p-7 ${className}`}>
      <span className="story-panel-accent" aria-hidden="true" />

      <p className="font-(family-name:--font-montserrat) text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B001D]">
        {eyebrow}
      </p>
      <h3 className="mt-3 font-(family-name:--font-montserrat) text-lg font-semibold leading-snug tracking-tight text-[#F2F2F2] sm:text-xl">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {features.map((feature) => (
          <li
            key={feature.title}
            className="rounded-xl border border-white/8 bg-white/4 px-3.5 py-3"
          >
            <p className="font-(family-name:--font-montserrat) text-sm font-semibold text-[#F2F2F2]">
              {feature.title}
            </p>
            <p className="text-body-muted mt-1 text-sm leading-relaxed">
              {feature.detail}
            </p>
          </li>
        ))}
      </ul>

      {footerLabel && footerValue ? (
        <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3">
          <span className="text-sm text-white/45">{footerLabel}</span>
          <span className="font-(family-name:--font-montserrat) text-sm font-semibold text-[#F2F2F2]">
            {footerValue}
          </span>
        </div>
      ) : null}
    </div>
  );

  if (reduceMotion) {
    return panel;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      {panel}
    </motion.div>
  );
}
