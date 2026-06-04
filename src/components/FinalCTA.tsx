"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AnimatedWords } from "@/components/AnimatedText";
import StoryLeftLayout from "@/components/StoryLeftLayout";
import StorySectionHeader from "@/components/StorySectionHeader";
import { fadeUp, viewOnce } from "@/lib/motion";
import { STORY_CHAPTERS } from "@/lib/storySpine";

const chapter = STORY_CHAPTERS.cta;

export default function FinalCTA() {
  const [notice, setNotice] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const viewport = reduceMotion ? { once: true, margin: "-60px" as const } : viewOnce;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice("Booking system coming soon.");
  };

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

            <div className="story-panel-glass p-6 sm:p-7">
              <span className="story-panel-accent" aria-hidden="true" />

              <form onSubmit={handleSubmit}>
                <motion.button
                  type="submit"
                  className="btn-primary min-w-[220px]"
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  <AnimatedWords text="Check Availability" mode="inView" />
                </motion.button>

                <AnimatePresence>
                  {notice && (
                    <motion.p
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      className="mt-5 text-sm text-[#F2F2F2]/90"
                      role="status"
                    >
                      <AnimatedWords text={notice} mode="mount" />
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </StoryLeftLayout>
      </div>
    </section>
  );
}
