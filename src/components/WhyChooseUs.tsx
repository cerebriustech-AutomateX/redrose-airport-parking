"use client";

import { useRef, useState, type RefObject } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import StoryDeck, { type StoryDeckItem } from "@/components/StoryDeck";
import StoryLeftLayout from "@/components/StoryLeftLayout";
import StorySectionHeader from "@/components/StorySectionHeader";
import StoryStickySection from "@/components/StoryStickySection";
import { whyChooseCards } from "@/lib/data";
import { STORY_CHAPTERS } from "@/lib/storySpine";
import { storyStepIndex } from "@/lib/storyScroll";
import { WHY_CHOOSE_STEP_END, WHY_CHOOSE_STEP_START } from "@/lib/whyChooseMotion";

const chapter = STORY_CHAPTERS.whyChooseUs;

const deckItems: StoryDeckItem[] = whyChooseCards.map((card, index) => ({
  number: String(index + 1).padStart(2, "0"),
  title: card.title,
  description: card.description,
}));

export default function WhyChooseUs() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  if (reduceMotion) {
    return <WhyChooseUsStatic />;
  }

  return (
    <WhyChooseUsScroll
      sectionRef={sectionRef}
      activeCard={activeCard}
      setActiveCard={setActiveCard}
    />
  );
}

function WhyChooseUsStatic() {
  return (
    <section id="why-choose-us" className="relative overflow-x-hidden py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <StoryLeftLayout>
          <WhyChooseContent activeCard={0} />
        </StoryLeftLayout>
      </div>
    </section>
  );
}

type ScrollProps = {
  sectionRef: RefObject<HTMLElement | null>;
  activeCard: number;
  setActiveCard: (index: number) => void;
};

function WhyChooseUsScroll({ sectionRef, activeCard, setActiveCard }: ScrollProps) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const idx = storyStepIndex(
      progress,
      WHY_CHOOSE_STEP_START,
      WHY_CHOOSE_STEP_END,
      deckItems.length,
    );
    setActiveCard(idx);
  });

  return (
    <StoryStickySection
      id="why-choose-us"
      sectionRef={sectionRef}
      heightVh={220}
      mobileHeightVh={145}
      ariaLabelledBy="why-choose-us-heading"
    >
      <StoryLeftLayout>
        <WhyChooseContent activeCard={activeCard} />
      </StoryLeftLayout>
    </StoryStickySection>
  );
}

function WhyChooseContent({ activeCard }: { activeCard: number }) {
  return (
    <div className="story-section-stack">
      <StorySectionHeader
        chapter={chapter.chapter}
        beat={chapter.beat}
        eyebrow={chapter.eyebrow}
        heading="Parking built around peace of mind."
        storyLine={chapter.storyLine}
        headingId="why-choose-us-heading"
      />

      <StoryDeck
        items={deckItems}
        activeIndex={activeCard}
        panelClassName="story-panel-glass--why-choose"
        showContent
      />
    </div>
  );
}
