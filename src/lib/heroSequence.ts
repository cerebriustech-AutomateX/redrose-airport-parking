/** High-quality frames extracted from the 1K cinematic MP4 (12 fps, 120 frames). */
export const HERO_SEQUENCE = {
  basePath: "/hero/cinematic/frames",
  frameCount: 120,
  frameWidth: 1920,
  frameHeight: 1080,
  preloadCount: 20,
  lazyBatchSize: 20,
  backgroundColor: "#1A1A1D",
} as const;

/** Source MP4 used to generate the frame sequence (kept for reference / future re-export). */
export const CINEMATIC_VIDEO = {
  path: "/hero/cinematic/Airport_parking_service_animation_202606040258.mp4",
  frameWidth: 1920,
  frameHeight: 1080,
  durationSeconds: 10,
} as const;

export const HERO_FRAME_COUNT = HERO_SEQUENCE.frameCount;

export function getHeroFramePath(sequenceIndex: number): string {
  const clamped = Math.min(
    Math.max(sequenceIndex, 0),
    HERO_FRAME_COUNT - 1,
  );
  const padded = String(clamped + 1).padStart(3, "0");
  return `${HERO_SEQUENCE.basePath}/frame-${padded}.jpg`;
}

/** Linear scroll -> frame. Progress 1 always lands on the last frame. */
export function progressToFrameIndex(progress: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  if (clamped >= 1) return HERO_FRAME_COUNT - 1;
  return Math.min(
    HERO_FRAME_COUNT - 1,
    Math.floor(clamped * HERO_FRAME_COUNT),
  );
}

export const HERO_STATIC_FRAME = getHeroFramePath(0);
export const HERO_FINAL_FRAME = getHeroFramePath(HERO_FRAME_COUNT - 1);

/** Scroll distance while canvas is pinned — longer = more room for the full story */
export const SCROLL_SECTION_HEIGHT_VH = 420;

export type StoryAlignment = "left" | "right" | "center";

export type StoryBeat = {
  id: string;
  start: number;
  peak: number;
  end: number;
  align: StoryAlignment;
  eyebrow?: string;
  headline: string;
  lines: string[];
};

export const STORY_BEATS: StoryBeat[] = [
  {
    id: "route",
    start: 0.18,
    peak: 0.3,
    end: 0.42,
    align: "left",
    eyebrow: "Step One - Arrive",
    headline: "Follow the route with confidence.",
    lines: ["Clear directions guide you from arrival to your parking bay."],
  },
  {
    id: "guide",
    start: 0.4,
    peak: 0.5,
    end: 0.6,
    align: "right",
    eyebrow: "Step Two - Park",
    headline: "Glide straight into your bay.",
    lines: ["No circling, no stress. Your space is ready and waiting."],
  },
  {
    id: "secure",
    start: 0.58,
    peak: 0.68,
    end: 0.78,
    align: "left",
    eyebrow: "Step Three - Secure",
    headline: "Parked with care while you travel.",
    lines: ["Calm lighting, clear bays, a polished arrival experience."],
  },
  {
    id: "access",
    start: 0.76,
    peak: 0.84,
    end: 0.92,
    align: "right",
    eyebrow: "Step Four - Depart",
    headline: "Straight on to departures.",
    lines: ["A clearer path from parking to terminal, every time."],
  },
];

export function beatOpacity(
  progress: number,
  start: number,
  peak: number,
  end: number,
): number {
  if (progress < start || progress > end) return 0;
  if (progress <= peak) {
    const range = peak - start || 0.001;
    return (progress - start) / range;
  }
  const range = end - peak || 0.001;
  return 1 - (progress - peak) / range;
}

export function showBookingCard(progress: number): boolean {
  return progress < 0.22;
}

export function introCopyOpacity(progress: number): number {
  if (progress >= 0.17) return 0;
  if (progress <= 0.11) return 1;
  return 1 - (progress - 0.11) / 0.06;
}

export function ctaCopyOpacity(progress: number): number {
  if (progress < 0.9) return 0;
  if (progress <= 0.95) return (progress - 0.9) / 0.05;
  return 1;
}
