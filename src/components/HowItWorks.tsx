"use client";

import Link from "next/link";
import { useRef, useState, type RefObject } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import StepsLeftGlassCard from "@/components/StepsLeftGlassCard";
import StepsLeftStepStack, { type StepStackItem } from "@/components/StepsLeftStepStack";
import StorySectionHeader from "@/components/StorySectionHeader";
import StoryLeftLayout from "@/components/StoryLeftLayout";
import StoryStickySection from "@/components/StoryStickySection";
import { howItWorksSteps } from "@/lib/data";
import { STORY_CHAPTERS } from "@/lib/storySpine";
import {
  RESPEC_CARDS_DROP_SCROLL,
  RESPEC_STEP_SCROLL_START,
  howItWorksRevealedCount,
} from "@/lib/stepsMotion";

const chapter = STORY_CHAPTERS.howItWorks;
const headingLine1 = "From booking";
const headingLine2 = "to bay.";

const stepItems: StepStackItem[] = howItWorksSteps.map((step) => ({
  number: step.number,
  title: step.title,
  description: step.description,
}));

export default function HowItWorks() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  if (reduceMotion) {
    return <HowItWorksStatic />;
  }

  return <HowItWorksScroll sectionRef={sectionRef} />;
}

type ScrollProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

function HowItWorksScroll({ sectionRef }: ScrollProps) {
  const [stepsVisible, setStepsVisible] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [glassReady, setGlassReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setStepsVisible(progress >= RESPEC_STEP_SCROLL_START);
    setGlassReady(progress >= RESPEC_CARDS_DROP_SCROLL);
    setRevealedCount(howItWorksRevealedCount(progress));
  });

  return (
    <StoryStickySection
      id="how-it-works"
      sectionRef={sectionRef}
      heightVh={200}
      ariaLabelledBy="how-it-works-heading"
    >
      <StoryLeftLayout>
        <div className="story-section-stack">
          <StorySectionHeader
            chapter={chapter.chapter}
            beat={chapter.beat}
            eyebrow={chapter.eyebrow}
            heading={
              <>
                <span className="block">{headingLine1}</span>
                <span className="block">{headingLine2}</span>
              </>
            }
            storyLine={chapter.storyLine}
            headingId="how-it-works-heading"
          />

          {!glassReady && !stepsVisible ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="#book" className="btn-primary inline-flex">
                Check Availability
              </Link>
            </motion.div>
          ) : null}

          <StepsLeftStepStack
            items={stepItems}
            revealedCount={revealedCount}
            visible={stepsVisible && !glassReady}
          />

          <StepsLeftGlassCard items={stepItems} active={glassReady} />
        </div>
      </StoryLeftLayout>
    </StoryStickySection>
  );
}

function HowItWorksStatic() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative overflow-x-hidden py-24 sm:py-28 lg:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <StoryLeftLayout>
          <div className="story-section-stack">
            <StorySectionHeader
              chapter={chapter.chapter}
              beat={chapter.beat}
              eyebrow={chapter.eyebrow}
              heading={
                <>
                  <span className="block">{headingLine1}</span>
                  <span className="block">{headingLine2}</span>
                </>
              }
              storyLine={chapter.storyLine}
              headingId="how-it-works-heading"
            />
            <StepsLeftStepStack items={stepItems} revealedCount={3} visible />
            <StepsLeftGlassCard items={stepItems} active />
          </div>
        </StoryLeftLayout>
      </div>
    </section>
  );
}
