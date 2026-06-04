"use client";

import { Fragment, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  heroAccentReveal,
  heroWord,
  heroWordStagger,
  softLine,
  softLineStagger,
  softWord,
  softWordStagger,
  viewOnce,
} from "@/lib/motion";

type WordVariant = "hero" | "soft";

const wordPacks = {
  hero: { word: heroWord, stagger: heroWordStagger },
  soft: { word: softWord, stagger: softWordStagger },
} as const;

type AnimatedWordsProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  variant?: WordVariant;
  /** mount = hero on load; inView = sections as you scroll */
  mode?: "mount" | "inView";
  delay?: number;
};

export function AnimatedWords({
  text,
  className = "",
  wordClassName = "",
  variant = "soft",
  mode = "inView",
  delay = 0,
}: AnimatedWordsProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const { word: wordVariant } = wordPacks[variant];
  const words = text.trim().split(/\s+/);
  const motionProps =
    mode === "mount"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: viewOnce,
        };

  const baseDelay =
    variant === "hero"
      ? (heroWordStagger.visible.transition?.delayChildren ?? 0)
      : (softWordStagger.visible.transition?.delayChildren ?? 0);
  const staggerChildren =
    variant === "hero"
      ? (heroWordStagger.visible.transition?.staggerChildren ?? 0.09)
      : (softWordStagger.visible.transition?.staggerChildren ?? 0.045);

  return (
    <motion.span
      className={className}
      {...motionProps}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren: baseDelay + delay,
          },
        },
      }}
    >
      {words.map((token, index) => (
        <Fragment key={`${token}-${index}`}>
          <motion.span
            variants={wordVariant}
            className={`text-reveal-word ${wordClassName}`.trim()}
          >
            {token}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}

type AnimatedAccentProps = {
  className?: string;
  mode?: "mount" | "inView";
};

export function AnimatedAccent({
  className = "hero-intro-accent origin-left",
  mode = "mount",
}: AnimatedAccentProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <span className={className} aria-hidden="true" />;
  }

  const motionProps =
    mode === "mount"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: viewOnce,
        };

  return (
    <motion.span
      {...motionProps}
      variants={heroAccentReveal}
      className={className}
      aria-hidden="true"
    />
  );
}

type AnimatedBlockProps = {
  children: ReactNode;
  className?: string;
};

/** Fade a whole block (headings with spans, labels, etc.) */
export function AnimatedBlock({ children, className = "" }: AnimatedBlockProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewOnce}
      variants={softLine}
    >
      {children}
    </motion.div>
  );
}

type AnimatedTextGroupProps = {
  children: ReactNode;
  className?: string;
};

/** Stagger several child lines (each child should use variants={softLine}) */
export function AnimatedTextGroup({
  children,
  className = "",
}: AnimatedTextGroupProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewOnce}
      variants={softLineStagger}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedLine({
  children,
  className = "",
}: AnimatedBlockProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={softLine}>
      {children}
    </motion.div>
  );
}
