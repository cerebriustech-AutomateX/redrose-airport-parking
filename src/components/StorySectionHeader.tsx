"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedWords, AnimatedLine } from "@/components/AnimatedText";
import StoryRouteAccent from "@/components/StoryRouteAccent";
import { softLine, softLineStagger, viewOnce } from "@/lib/motion";

type StorySectionHeaderProps = {
  chapter?: string;
  beat?: string;
  eyebrow: string;
  heading: ReactNode;
  storyLine: string;
  headingId?: string;
  className?: string;
};

/** Shared story chapter label + section intro — keeps every beat aligned and readable. */
export default function StorySectionHeader({
  chapter,
  beat,
  eyebrow,
  heading,
  storyLine,
  headingId,
  className = "",
}: StorySectionHeaderProps) {
  const reduceMotion = useReducedMotion();
  const chapterLabel =
    chapter && beat ? (
      <p className="story-chapter-label">
        <span className="story-chapter-num">Chapter {chapter}</span>
        <span className="story-chapter-sep" aria-hidden="true">
          ·
        </span>
        <span className="story-chapter-beat">{beat}</span>
      </p>
    ) : null;

  if (reduceMotion) {
    return (
      <header className={className}>
        {chapterLabel}
        <p className={`steps-section-eyebrow ${chapterLabel ? "mt-3" : ""}`}>
          {eyebrow}
        </p>
        <h2 id={headingId} className="steps-section-heading mt-4">
          {heading}
        </h2>
        <p className="steps-section-subcopy text-pretty mt-4 max-w-md">
          {storyLine}
        </p>
        <StoryRouteAccent static className="mt-5" />
      </header>
    );
  }

  return (
    <motion.header
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewOnce}
      variants={softLineStagger}
    >
      {chapterLabel ? (
        <motion.div variants={softLine}>{chapterLabel}</motion.div>
      ) : null}

      <AnimatedWords
        text={eyebrow}
        className={`steps-section-eyebrow block ${chapterLabel ? "mt-3" : ""}`}
      />

      <motion.h2
        id={headingId}
        className="steps-section-heading mt-4"
        variants={softLine}
      >
        {heading}
      </motion.h2>

      <AnimatedWords
        text={storyLine}
        className="steps-section-subcopy text-pretty mt-4 block max-w-md"
      />

      <AnimatedLine className="mt-5">
        <StoryRouteAccent static />
      </AnimatedLine>
    </motion.header>
  );
}
