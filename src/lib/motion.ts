export const easeOut = [0.23, 1, 0.32, 1] as const;
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Respec-style clean fade up — slow, confident entrance */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeOutExpo },
  },
};

/** Hero / story line — one beat at a time */
export const storyLine = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: easeOutExpo },
  },
};

export const storyStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.18,
    },
  },
};

/** Premium card reveal */
export const cardReveal = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

export const heroCard = {
  hidden: { opacity: 0, y: 44, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: easeOutExpo },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: easeOutExpo },
  },
};

export const hoverLift = {
  y: -5,
  transition: { duration: 0.35, ease: easeOutExpo },
};

export const viewConfig = {
  once: true as const,
  margin: "-12% 0px -8% 0px" as const,
  amount: 0.4 as const,
};

export const viewOnce = {
  once: true as const,
  margin: "-80px" as const,
};

/** Story caption — slower, calmer than generic fadeUp */
export const storyCaptionEnter = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

/** How It Works — orchestrated section reveal */
export const stepsLineReveal = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.88, ease: easeOutExpo },
  },
};

export const stepsHeaderStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.06 },
  },
};

export const stepsGlassReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: easeOutExpo },
  },
};

export const stepsContentStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.18 },
  },
};

export const stepsCardReveal = {
  hidden: { opacity: 0, y: 32, x: 18 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const stepsCardsStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

export const stepsSectionStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
  },
};

/** Deck card swap — slide up, no blur */
export const storyDeckCard = {
  initial: { opacity: 0, y: 28, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    y: -18,
    scale: 0.99,
    transition: { duration: 0.38, ease: easeOutExpo },
  },
};

/** Pass / panel drop — pairs with deck step change */
export const storyPassDrop = {
  initial: { opacity: 0, y: -36, scale: 0.94, rotateX: 10 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.52, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    y: 24,
    scale: 0.96,
    rotateX: -4,
    transition: { duration: 0.4, ease: easeOutExpo },
  },
};

/** Steps deck — back card first, front card last */
export const stepsDeckStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

export const stepsDeckCardEnter = {
  hidden: { opacity: 0, y: 36, scale: 0.94 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.78,
      delay: index * 0.06,
      ease: easeOutExpo,
    },
  }),
};

export const stepsEyebrowReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: easeOutExpo },
  },
};
