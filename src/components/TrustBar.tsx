"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedWords } from "@/components/AnimatedText";
import { trustPoints } from "@/lib/data";
import { softLineStagger, viewOnce } from "@/lib/motion";

export default function TrustBar() {
  const reduceMotion = useReducedMotion();

  const list = (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
      {trustPoints.map((point, index) => (
        <li key={point} className="lg:px-6 lg:first:pl-0 lg:last:pr-0">
          <AnimatedWords
            text={point}
            className="font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wide text-[#F2F2F2] sm:text-[0.9375rem]"
            delay={index * 0.06}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="relative border-y border-white/[0.06] bg-[#1A1A1D]/40 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-7 lg:px-8">
        {reduceMotion ? (
          list
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewOnce}
            variants={softLineStagger}
          >
            {list}
          </motion.div>
        )}
      </div>
    </section>
  );
}
