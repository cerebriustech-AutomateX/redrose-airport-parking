"use client";

import { AnimatePresence, motion } from "framer-motion";
import StepsShowcaseCard from "@/components/StepsShowcaseCard";
import {
  stepsShowcaseCarouselTransition,
  stepsShowcaseCarouselVariants,
} from "@/lib/stepsMotion";

export type StepsShowcaseCarouselStep = {
  stepNumber: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
};

type StepsShowcaseCarouselProps = {
  steps: readonly StepsShowcaseCarouselStep[];
  activeIndex: number;
  className?: string;
};

const carouselVariants = stepsShowcaseCarouselVariants();

/** One card at a time on the left — each enters from the left and exits left. */
export default function StepsShowcaseCarousel({
  steps,
  activeIndex,
  className = "",
}: StepsShowcaseCarouselProps) {
  const clamped = Math.min(Math.max(activeIndex, 0), steps.length - 1);
  const active = steps[clamped];

  return (
    <div
      className={`relative mr-auto h-[22.5rem] w-full max-w-[17rem] overflow-hidden sm:max-w-[18rem] ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active.stepNumber}
          variants={carouselVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 flex items-start justify-start"
        >
          <StepsShowcaseCard
            stepNumber={active.stepNumber}
            titleLine1={active.titleLine1}
            titleLine2={active.titleLine2}
            description={active.description}
            imageSrc={active.imageSrc}
            imageAlt={active.imageAlt}
            imageClassName={active.imageClassName}
            carousel
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-start gap-2 pb-1">
        {steps.map((step, index) => (
          <motion.span
            key={step.stepNumber}
            animate={{
              width: index === clamped ? 22 : 6,
              opacity: index === clamped ? 1 : 0.35,
            }}
            transition={stepsShowcaseCarouselTransition}
            className="block h-1 rounded-full bg-[#8B001D]"
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
