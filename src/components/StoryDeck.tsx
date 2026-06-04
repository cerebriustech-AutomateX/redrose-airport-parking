"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AnimatedWords } from "@/components/AnimatedText";
import { storyDeckCard } from "@/lib/motion";

export type StoryDeckItem = {
  number: string;
  title: string;
  description: string;
};

type StoryDeckProps = {
  items: readonly StoryDeckItem[];
  activeIndex: number;
  className?: string;
  panelClassName?: string;
  showContent?: boolean;
  showGhostLayers?: boolean;
};

function tabGridClass(count: number): string {
  if (count >= 4) return "story-deck-tabs";
  if (count === 3) return "story-deck-tabs story-deck-tabs--3";
  return "flex flex-wrap gap-x-3 gap-y-1.5";
}

/** Tabbed glass deck — text only, no images. */
export default function StoryDeck({
  items,
  activeIndex,
  className = "",
  panelClassName = "",
  showContent = true,
  showGhostLayers = true,
}: StoryDeckProps) {
  const clamped = Math.min(Math.max(activeIndex, 0), items.length - 1);
  const active = items[clamped];

  return (
    <div className={`story-panel-glass relative ${panelClassName} ${className}`}>
      <span className="story-panel-accent" aria-hidden="true" />

      {showGhostLayers ? (
        <div
          className="pointer-events-none absolute inset-x-5 top-5 h-14 sm:inset-x-6 sm:top-6"
          aria-hidden="true"
        >
          {items.map((item, index) => {
            if (index >= clamped) return null;
            const depth = clamped - index;
            if (depth > 2) return null;

            return (
              <motion.div
                key={item.number}
                animate={{
                  opacity: Math.min(0.28, 0.14 + (3 - depth) * 0.05),
                  y: (depth - 1) * -5,
                  scale: 0.98 - depth * 0.01,
                }}
                transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
                className="story-deck-ghost absolute inset-x-0 rounded-xl border border-white/[0.06] px-4 py-3"
                style={{ zIndex: index }}
              >
                <span className="font-(family-name:--font-montserrat) text-[9px] font-bold tracking-[0.18em] text-[#8B001D]/50">
                  {item.number}
                </span>
                <p className="mt-1 font-(family-name:--font-montserrat) text-[10px] uppercase tracking-wide text-[rgba(242,242,242,0.55)]">
                  {item.title}
                </p>
              </motion.div>
            );
          })}
        </div>
      ) : null}

      <motion.div
        className="relative z-10"
        initial={false}
        animate={{
          opacity: showContent ? 1 : 0,
          y: showContent ? 0 : 16,
        }}
        transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
      >
        {items.length > 1 ? (
          <div
            className={`mb-3 px-6 pt-5 sm:px-7 sm:pt-6 ${tabGridClass(items.length)}`}
          >
            {items.map((item, index) => (
              <motion.span
                key={item.number}
                animate={{
                  opacity: index === clamped ? 1 : index < clamped ? 0.38 : 0.24,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`font-(family-name:--font-montserrat) text-[9px] font-semibold uppercase tracking-[0.12em] ${
                  items.length >= 3 ? "story-deck-tab" : ""
                } ${
                  index === clamped ? "text-[#8B001D]" : "text-[rgba(242,242,242,0.45)]"
                }`}
              >
                {item.number} {item.title}
              </motion.span>
            ))}
          </div>
        ) : null}

        <div className="story-deck-body-slot relative px-6 pb-5 sm:px-7 sm:pb-6">
          <AnimatePresence mode="wait">
            <motion.article
              key={active.number}
              initial={storyDeckCard.initial}
              animate={storyDeckCard.animate}
              exit={storyDeckCard.exit}
              className="story-deck-card-active"
            >
              <span className="font-(family-name:--font-montserrat) text-[10px] font-bold tracking-[0.2em] text-[#8B001D]">
                {active.number}
              </span>
              <h3 className="mt-3 font-(family-name:--font-montserrat) text-lg font-semibold uppercase tracking-wide text-[#F2F2F2]">
                <AnimatedWords text={active.title} mode="mount" />
              </h3>
              <p className="text-body-muted text-pretty mt-3 text-sm leading-relaxed">
                <AnimatedWords
                  text={active.description}
                  mode="mount"
                  delay={0.08}
                />
              </p>
            </motion.article>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
