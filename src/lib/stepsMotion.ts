/** Three Simple Steps — precise Framer Motion tokens */
export const stepsEase = [0.22, 1, 0.36, 1] as const;

export const stepsSectionViewport = {
  once: true as const,
  amount: 0.35 as const,
};

export const stepsSectionContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.4, ease: stepsEase },
  },
};

export const stepsEyebrowVariant = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.05, ease: stepsEase },
  },
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: stepsEase },
  },
};

export const stepsHeadingVariant = {
  initial: { opacity: 0, y: 28, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, delay: 0.12, ease: stepsEase },
  },
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: stepsEase },
  },
};

export const stepsSubcopyVariant = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.26, ease: stepsEase },
  },
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: stepsEase },
  },
};

export const stepsPassVisualVariant = {
  initial: { opacity: 0, x: 24, y: 70, scale: 0.97 },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, delay: 0.62, ease: stepsEase },
  },
};

/** Left-rail pass — drops from the left to fill empty story columns */
export const stepsPassVisualLeftVariant = {
  initial: { opacity: 0, x: -32, y: 40, scale: 0.97 },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, delay: 0.2, ease: stepsEase },
  },
};

/** Front deck card and pass drop — kept in sync */
export const STEPS_PASS_DROP_DELAY = 0.62;
export const STEPS_PASS_DROP_DURATION = 0.75;

export const stepsRouteLineVariant = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, delay: 0.45, ease: stepsEase },
  },
};

export type StackDepth = 0 | 1 | 2;

export type StackPose = {
  y: number;
  x: number;
  scale: number;
  opacity: number;
  zIndex: number;
};

const DESKTOP_STACK: Record<StackDepth, StackPose> = {
  0: { y: 0, x: 0, scale: 1, opacity: 1, zIndex: 3 },
  1: { y: 36, x: 17, scale: 0.97, opacity: 0.78, zIndex: 2 },
  2: { y: 72, x: 34, scale: 0.94, opacity: 0.62, zIndex: 1 },
};

const MOBILE_STACK: Record<StackDepth, StackPose> = {
  0: { y: 0, x: 0, scale: 1, opacity: 1, zIndex: 3 },
  1: { y: 22, x: 0, scale: 0.97, opacity: 0.72, zIndex: 2 },
  2: { y: 44, x: 0, scale: 0.94, opacity: 0.55, zIndex: 1 },
};

export function stackDepth(index: number, activeIndex: number, total: number): StackDepth {
  return ((index - activeIndex + total) % total) as StackDepth;
}

export function stackPose(depth: StackDepth, mobile: boolean): StackPose {
  return mobile ? MOBILE_STACK[depth] : DESKTOP_STACK[depth];
}

/** First-build enter — back → middle → front */
export const STACK_ENTER = {
  desktop: {
    2: {
      initial: { opacity: 0, y: 105, x: 34, scale: 0.91 },
      animate: { opacity: 0.62, y: 72, x: 34, scale: 0.94 },
      delay: 0.35,
    },
    1: {
      initial: { opacity: 0, y: 88, x: 17, scale: 0.94 },
      animate: { opacity: 0.78, y: 36, x: 17, scale: 0.97 },
      delay: 0.48,
    },
    0: {
      initial: { opacity: 0, y: 70, x: 0, scale: 0.97 },
      animate: { opacity: 1, y: 0, x: 0, scale: 1 },
      delay: 0.62,
    },
  },
  mobile: {
    2: {
      initial: { opacity: 0, y: 24, x: 0, scale: 0.91 },
      animate: { opacity: 0.55, y: 44, x: 0, scale: 0.94 },
      delay: 0.3,
    },
    1: {
      initial: { opacity: 0, y: 20, x: 0, scale: 0.94 },
      animate: { opacity: 0.72, y: 22, x: 0, scale: 0.97 },
      delay: 0.38,
    },
    0: {
      initial: { opacity: 0, y: 16, x: 0, scale: 0.97 },
      animate: { opacity: 1, y: 0, x: 0, scale: 1 },
      delay: 0.46,
    },
  },
} as const;

export const STACK_ENTER_TRANSITION = {
  duration: 0.75,
  ease: stepsEase,
} as const;

export const STACK_CYCLE_TRANSITION = {
  duration: 0.65,
  ease: stepsEase,
} as const;

export const STACK_HOVER_TRANSITION = {
  duration: 0.28,
  ease: stepsEase,
} as const;

export const TEXT_MUTE_BY_DEPTH: Record<
  StackDepth,
  { title: number; body: number }
> = {
  0: { title: 1, body: 1 },
  1: { title: 0.82, body: 0.6 },
  2: { title: 0.78, body: 0.55 },
};

export const STEPS_AUTO_CYCLE_MS = 3500;

/** Showcase cards — section + staggered row */
export const stepsShowcaseViewport = {
  once: true as const,
  amount: 0.22 as const,
};

export const stepsShowcaseSection = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: stepsEase },
  },
};

export const stepsShowcaseHeaderStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export const stepsShowcaseCardsStagger = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.65 },
  },
};

/** Each card enters as the next stage — ~850ms apart */
export function stepsShowcaseCardAtIndex(index: number) {
  const cardDelay = index * 0.85;
  return {
    hidden: {
      opacity: 0,
      y: 64,
      scale: 0.9,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.92, delay: cardDelay, ease: stepsEase },
    },
  };
}

export const stepsShowcaseCard = stepsShowcaseCardAtIndex(0);

export function stepsShowcaseCardInnerAtIndex(index: number) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.22 + index * 0.06,
      },
    },
  };
}

export const stepsShowcaseCardInner = stepsShowcaseCardInnerAtIndex(0);

export const stepsShowcaseCardItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: stepsEase },
  },
};

export function stepsShowcaseCardImageAtIndex(index: number) {
  return {
    hidden: { opacity: 0, scale: 0.84, y: 18 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.72,
        delay: 0.12 + index * 0.08,
        ease: stepsEase,
      },
    },
  };
}

export const stepsShowcaseCardImage = stepsShowcaseCardImageAtIndex(0);

/** Single-card carousel — enter from left, exit to left */
export const stepsShowcaseCarouselTransition = {
  duration: 0.72,
  ease: stepsEase,
} as const;

export const stepsShowcaseCarouselExit = {
  duration: 0.58,
  ease: stepsEase,
} as const;

export function stepsShowcaseCarouselVariants() {
  return {
    enter: { opacity: 0, x: "-112%" },
    center: {
      opacity: 1,
      x: 0,
      transition: stepsShowcaseCarouselTransition,
    },
    exit: {
      opacity: 0,
      x: "-112%",
      transition: stepsShowcaseCarouselExit,
    },
  };
}

export const STEPS_SHOWCASE_SCROLL_START = 0.18;
export const STEPS_SHOWCASE_SCROLL_END = 0.82;

/** Re.Spec-style section reveal — calm, sequenced, no bounce */
export const respecSectionReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, ease: stepsEase },
  },
};

export const respecViewport = {
  once: true as const,
  amount: 0.28 as const,
  margin: "-8% 0px -6% 0px" as const,
};

export const respecEyebrow = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay: 0.05, ease: stepsEase },
  },
};

export const respecHeadlineLine1 = {
  hidden: { opacity: 0, y: 22, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, delay: 0.12, ease: stepsEase },
  },
};

export const respecHeadlineLine2 = {
  hidden: { opacity: 0, y: 22, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, delay: 0.24, ease: stepsEase },
  },
};

export const respecAccentLine = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.65, delay: 0.36, ease: stepsEase },
  },
};

export const respecSubcopy = {
  hidden: { opacity: 0, y: 16, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, delay: 0.45, ease: stepsEase },
  },
};

export const respecCTA = {
  hidden: { opacity: 0, y: 14, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay: 0.58, ease: stepsEase },
  },
};

export const respecCardsContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
};

export const RESPEC_LEFT_START_SCROLL = 0.03;
export const RESPEC_STEP_SCROLL_START = 0.1;
export const RESPEC_STEP_2_SCROLL = 0.26;
export const RESPEC_STEP_3_SCROLL = 0.42;
export const RESPEC_STEP_SCROLL_END = 0.58;
export const RESPEC_CARDS_DROP_SCROLL = 0.64;

export const respecGlassPayoff = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.12, ease: stepsEase },
  },
};

/** Left glass panel — drops in as the cinematic pass settles on the right */
export const respecLeftGlassCard = {
  hidden: { opacity: 0, x: -48, y: 32, scale: 0.96, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.78, delay: 0.1, ease: stepsEase },
  },
};

export const respecLeftGlassStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.28 },
  },
};

export const respecLeftGlassItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: stepsEase },
  },
};

/** How many left-rail steps are visible (stacked, 1 → 2 → 3). */
export function howItWorksRevealedCount(progress: number): number {
  if (progress < RESPEC_STEP_SCROLL_START) return 0;
  if (progress < RESPEC_STEP_2_SCROLL) return 1;
  if (progress < RESPEC_STEP_3_SCROLL) return 2;
  return 3;
}

/** Final stacked depth — anchored on the right, deeper cards sit left-behind */
export const RESPEC_JOURNEY_STACK: Record<
  0 | 1 | 2,
  { y: number; x: number; scale: number; opacity: number; zIndex: number }
> = {
  0: { y: 0, x: 0, scale: 1, opacity: 1, zIndex: 3 },
  1: { y: 28, x: -18, scale: 0.97, opacity: 0.76, zIndex: 2 },
  2: { y: 56, x: -36, scale: 0.94, opacity: 0.58, zIndex: 1 },
};

export function respecJourneyCardVariant(index: number) {
  const pose = RESPEC_JOURNEY_STACK[index as 0 | 1 | 2] ?? RESPEC_JOURNEY_STACK[0];

  return {
    hidden: {
      opacity: 0,
      y: pose.y + 28,
      x: pose.x + 112,
      scale: pose.scale * 0.94,
      filter: "blur(4px)",
    },
    visible: {
      opacity: pose.opacity,
      y: pose.y,
      x: pose.x,
      scale: pose.scale,
      filter: "blur(0px)",
      transition: { duration: 0.72, ease: stepsEase },
    },
  };
}

/** Left step cards — vertical fade with content stagger (enter up, exit up) */
export function respecStepCardVariants() {
  return {
    enter: { y: 24, opacity: 0 },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        y: { duration: 0.5, ease: stepsEase },
        opacity: { duration: 0.3, ease: stepsEase },
        staggerChildren: 0.07,
        delayChildren: 0,
      },
    },
    exit: {
      y: -16,
      opacity: 0,
      transition: { duration: 0.32, ease: stepsEase },
    },
  };
}

export const respecStepItemVariant = {
  enter: { opacity: 0, y: 10 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: stepsEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18, ease: stepsEase },
  },
};
