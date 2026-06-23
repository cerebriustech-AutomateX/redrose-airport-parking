"use client";

import { motion, useReducedMotion } from "framer-motion";
import BookingCard from "@/components/BookingCard";
import StoryLeftLayout from "@/components/StoryLeftLayout";
import StorySectionHeader from "@/components/StorySectionHeader";
import { fadeUp, viewOnce } from "@/lib/motion";
import { STORY_CHAPTERS } from "@/lib/storySpine";

const chapter = STORY_CHAPTERS.cta;

export default function FinalCTA() {
  const reduceMotion = useReducedMotion();
  const viewport = reduceMotion ? { once: true, margin: "-60px" as const } : viewOnce;

  return (
    <section id="book" className="relative overflow-x-hidden py-20 sm:py-28 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <StoryLeftLayout>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            className="story-section-stack"
          >
            <StorySectionHeader
              chapter={chapter.chapter}
              beat={chapter.beat}
              eyebrow={chapter.eyebrow}
              heading="Ready to book your airport parking?"
              storyLine={chapter.storyLine}
              headingId="book-heading"
            />

            <BookingCard id="book-form" />
          </motion.div>
        </StoryLeftLayout>
      </div>
    </section>
  );
}
