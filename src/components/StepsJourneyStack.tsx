"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  RESPEC_JOURNEY_STACK,
  respecCardsContainer,
  respecJourneyCardVariant,
} from "@/lib/stepsMotion";

export type StepsJourneyStackItem = {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
};

type StepsJourneyStackProps = {
  items: readonly StepsJourneyStackItem[];
  /** Scroll gate — cards drop from the right only after left copy has played */
  active?: boolean;
  className?: string;
};

/** Stacked journey cards on the right — drop in from the right when active. */
export default function StepsJourneyStack({
  items,
  active = true,
  className = "",
}: StepsJourneyStackProps) {
  const reduceMotion = useReducedMotion();

  if (!active) {
    return null;
  }

  if (reduceMotion) {
    return (
      <div className={`steps-deck-layer steps-section-visual-rail ${className}`}>
        <div className="relative w-full max-w-[32rem]">
          {items.map((item, index) => {
            const pose = RESPEC_JOURNEY_STACK[index as 0 | 1 | 2] ?? RESPEC_JOURNEY_STACK[0];
            return (
              <article
                key={item.number}
                className={`steps-deck-card ${index === 0 ? "steps-deck-card--front" : ""}`}
                style={{
                  zIndex: pose.zIndex,
                  transform: `translate3d(${pose.x}px, ${pose.y}px, 0) scale(${pose.scale})`,
                  opacity: pose.opacity,
                }}
              >
                <JourneyCardContent item={item} isFront={index === 0} />
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`steps-section-visual-rail ${className}`}>
      <motion.div
        className="steps-deck-layer"
        variants={respecCardsContainer}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
      >
        {[...items].reverse().map((item) => {
          const index = items.findIndex((entry) => entry.number === item.number);
          const pose = RESPEC_JOURNEY_STACK[index as 0 | 1 | 2] ?? RESPEC_JOURNEY_STACK[0];
          const isFront = index === 0;

          return (
            <motion.article
              key={item.number}
              variants={respecJourneyCardVariant(index)}
              style={{ zIndex: pose.zIndex }}
              className={`steps-deck-card ${isFront ? "steps-deck-card--front" : ""}`}
            >
              <JourneyCardContent item={item} isFront={isFront} />
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
}

function JourneyCardContent({
  item,
  isFront,
}: {
  item: StepsJourneyStackItem;
  isFront: boolean;
}) {
  return (
    <>
      <span className="steps-deck-number">{item.number}</span>
      <h3
        className="steps-deck-title"
        style={{ opacity: isFront ? 1 : 0.82 }}
      >
        {item.title}
      </h3>

      <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.08] sm:mt-5">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          quality={92}
          sizes="(max-width: 1024px) 88vw, 420px"
          className={item.imageClassName ?? "object-cover"}
        />
      </div>

      <p
        className="steps-deck-body mt-4"
        style={{ opacity: isFront ? 1 : 0.58 }}
      >
        {item.description}
      </p>

      {isFront ? (
        <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <p className="text-sm font-medium text-white/85">
              Confirmed — your bay is reserved
            </p>
          </div>
          <p className="text-sm leading-relaxed text-white/55">
            Booking details and directions are sent before you travel. Need
            help? We&apos;re here if your plans change.
          </p>
        </div>
      ) : null}
    </>
  );
}
