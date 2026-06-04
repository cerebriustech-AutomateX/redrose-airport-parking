"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  stepsShowcaseCardImageAtIndex,
  stepsShowcaseCardInnerAtIndex,
  stepsShowcaseCardItem,
} from "@/lib/stepsMotion";

export type StepsShowcaseCardProps = {
  stepNumber: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
  stageIndex?: number;
  variants?: Variants;
  /** Parent carousel handles slide motion — skip outer variants */
  carousel?: boolean;
};

export function StepsShowcaseCard({
  stepNumber,
  titleLine1,
  titleLine2,
  description,
  imageSrc,
  imageAlt,
  imageClassName = "object-cover",
  stageIndex = 0,
  variants,
  carousel = false,
}: StepsShowcaseCardProps) {
  const innerVariants = carousel
    ? stepsShowcaseCardInnerAtIndex(0)
    : stepsShowcaseCardInnerAtIndex(stageIndex);
  const imageVariants = carousel
    ? stepsShowcaseCardImageAtIndex(0)
    : stepsShowcaseCardImageAtIndex(stageIndex);

  const card = (
    <>
      <motion.div
        variants={innerVariants}
        initial={carousel ? "hidden" : undefined}
        animate={carousel ? "visible" : undefined}
        className="flex h-full flex-col gap-2"
      >
        <motion.div
          variants={stepsShowcaseCardItem}
          className="flex items-center justify-between p-2"
        >
          <span className="font-[family-name:var(--font-montserrat)] text-[10px] font-bold tracking-[0.2em] text-[#8B001D]">
            {stepNumber}
          </span>
          <motion.div
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#8B001D]"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 15px rgba(139, 0, 29, 0.55)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.h3
            variants={stepsShowcaseCardItem}
            className="steps-showcase-title text-center text-3xl font-bold sm:text-4xl"
          >
            {titleLine1}
            <br />
            {titleLine2}
          </motion.h3>

          <motion.div variants={imageVariants} className="relative">
            <div
              className="absolute inset-0 z-0 rounded-2xl opacity-40"
              aria-hidden="true"
              style={{
                background: `radial-gradient(ellipse 80% 70% at 50% 45%, rgba(139, 0, 29, 0.22) 0%, transparent 72%)`,
              }}
            />
            <motion.div
              className="relative z-10 p-1.5"
              whileHover={{ scale: 1.02 }}
              transition={{ ease: "easeInOut" }}
            >
              <div className="relative h-32 w-full overflow-hidden rounded-2xl shadow-lg sm:h-36">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  quality={92}
                  sizes="280px"
                  className={imageClassName}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.p
            variants={stepsShowcaseCardItem}
            className="mx-auto max-w-[18rem] text-center text-xs font-light leading-relaxed text-neutral-400"
          >
            {description}
          </motion.p>
        </div>
      </motion.div>
    </>
  );

  const cardClassName =
    "steps-showcase-card flex w-full max-w-[17rem] flex-col gap-2 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#141416]/95 p-2 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.55)] sm:max-w-[18rem]";

  if (carousel) {
    return <article className={cardClassName}>{card}</article>;
  }

  return (
    <motion.article
      variants={variants}
      className={cardClassName}
      whileHover={{
        scale: 1.01,
        boxShadow: "0 35px 60px -15px rgba(0,0,0,0.7)",
        borderColor: "rgba(139, 0, 29, 0.35)",
      }}
    >
      {card}
    </motion.article>
  );
}

export default StepsShowcaseCard;
