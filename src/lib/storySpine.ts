/** Site story spine — each chapter maps to a scroll beat in the cinematic backdrop. */
export const STORY_CHAPTERS = {
  howItWorks: {
    chapter: "01",
    beat: "Booking confirmed",
    eyebrow: "How It Works",
    storyLine:
      "Your pass is ready. Follow three clear steps from booking to your bay.",
  },
  whyChooseUs: {
    chapter: "02",
    beat: "At your secure bay",
    eyebrow: "Why Choose Us",
    storyLine:
      "Premium bays, clear signage, and organised parking before you travel.",
  },
  services: {
    chapter: "03",
    beat: "Choose your experience",
    eyebrow: "Services",
    storyLine:
      "Park & Ride or Meet & Greet at Manchester Airport — with clear procedures and support when you travel.",
  },
  cta: {
    chapter: "04",
    beat: "Ready for takeoff",
    eyebrow: "Book Now",
    storyLine:
      "Reserve your space and start your journey with confidence.",
  },
} as const;
