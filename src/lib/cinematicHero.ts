export const CINEMATIC_HERO = {
  baseImage: "/hero/cinematic/cinematic-hero-base.png",
  durationMs: 14000,
  leftContentRatio: 0.4,
  brandRed: "#8B001D",
  charcoal: "#1A1A1D",
  grey: "#6B6F76",
  offWhite: "#F2F2F2",
} as const;

/** Normalised timeline keyframes (0–1). */
export const CINEMATIC_TIMELINE = {
  routeDrawEnd: 0.18,
  carEnterStart: 0.1,
  carParkEnd: 0.52,
  bayGlowStart: 0.42,
  roseRevealStart: 0.5,
  terminalGlowStart: 0.58,
  holdStart: 0.82,
} as const;

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
