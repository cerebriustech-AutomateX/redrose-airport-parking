"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { storyCards } from "@/lib/data";
import { fadeUp } from "@/lib/motion";

export default function AnimatedStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative border-t border-white/5 bg-[#111113] py-24 sm:py-32">
      <div ref={containerRef} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
            >
              <h2 className="text-balance font-[family-name:var(--font-montserrat)] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                A Smoother Start To Every Journey
              </h2>
              <p className="text-pretty mt-6 max-w-md text-lg leading-relaxed text-redrose-grey">
                RedRose keeps the parking process simple, from the moment you
                book to the moment you return.
              </p>
            </motion.div>
          </div>

          <div className="relative space-y-6 pb-8 lg:space-y-8 lg:pb-[40vh]">
            {storyCards.map((card, index) => (
              <StoryCard
                key={card.title}
                card={card}
                index={index}
                total={storyCards.length}
                scrollYProgress={scrollYProgress}
                reduceMotion={!!reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type StoryCardProps = {
  card: (typeof storyCards)[number];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduceMotion: boolean;
};

function StoryCard({
  card,
  index,
  total,
  scrollYProgress,
  reduceMotion,
}: StoryCardProps) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.08, end - 0.05, end],
    reduceMotion ? [1, 1, 1, 1] : [0.35, 1, 1, 0.45],
  );

  const y = useTransform(
    scrollYProgress,
    [start, end],
    reduceMotion ? [0, 0] : [32 + index * 6, -12 - index * 3],
  );

  const scale = useTransform(
    scrollYProgress,
    [start, start + 0.1, end - 0.08],
    reduceMotion ? [1, 1, 1] : [0.96, 1, 1],
  );

  return (
    <motion.article
      style={{ opacity, y, scale }}
      className="glass-shell sticky top-28"
    >
      <div className="glass-inner p-8 sm:p-10">
        <h3 className="font-[family-name:var(--font-montserrat)] text-2xl font-semibold text-white sm:text-3xl">
          {card.title}
        </h3>
        <p className="text-pretty mt-4 max-w-md leading-relaxed text-redrose-grey">
          {card.description}
        </p>
      </div>
    </motion.article>
  );
}
