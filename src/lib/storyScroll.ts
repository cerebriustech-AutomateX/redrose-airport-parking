/** Scroll-linked story beat opacity — enter, hold, exit without overlap clutter. */
export function storyBeatOpacity(
  progress: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number,
): number {
  if (progress < enterStart || progress > exitEnd) return 0;
  if (progress < enterEnd) {
    const range = enterEnd - enterStart || 0.001;
    return (progress - enterStart) / range;
  }
  if (progress <= exitStart) return 1;
  const range = exitEnd - exitStart || 0.001;
  return 1 - (progress - exitStart) / range;
}

const SECTION_EXIT_START = 0.92;
const SECTION_EXIT_END = 0.99;

/** Fade in once, stay visible through the pinned section, exit only at the end. */
export function storyEnterHold(
  progress: number,
  enterStart: number,
  enterEnd: number,
  exitStart = SECTION_EXIT_START,
  exitEnd = SECTION_EXIT_END,
): number {
  if (progress < enterStart) return 0;
  if (progress < enterEnd) {
    const range = enterEnd - enterStart || 0.001;
    return (progress - enterStart) / range;
  }
  if (progress <= exitStart) return 1;
  if (progress > exitEnd) return 0;
  const range = exitEnd - exitStart || 0.001;
  return 1 - (progress - exitStart) / range;
}

/** Y motion paired with storyEnterHold — rises in, holds, lifts out at section end. */
export function storyEnterHoldOffset(
  progress: number,
  enterStart: number,
  enterEnd: number,
  distance = 18,
  exitStart = SECTION_EXIT_START,
  exitEnd = SECTION_EXIT_END,
): number {
  const opacity = storyEnterHold(
    progress,
    enterStart,
    enterEnd,
    exitStart,
    exitEnd,
  );
  if (opacity <= 0) return distance;
  if (progress < enterEnd) return distance * (1 - opacity);
  if (progress <= exitStart) return 0;
  return -distance * 0.5 * (1 - opacity);
}

/** Map scroll progress to a discrete step index — evenly spaced beats. */
export function storyStepIndex(
  progress: number,
  rangeStart: number,
  rangeEnd: number,
  count: number,
): number {
  if (count <= 1) return 0;
  if (progress < rangeStart) return 0;
  if (progress >= rangeEnd) return count - 1;
  const t = (progress - rangeStart) / (rangeEnd - rangeStart || 0.001);
  const idx = Math.floor(t * count);
  return Math.min(count - 1, Math.max(0, idx));
}

/** Y offset paired with beat opacity — rises in, lifts out. */
export function storyBeatOffset(
  progress: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number,
  distance = 18,
): number {
  const opacity = storyBeatOpacity(
    progress,
    enterStart,
    enterEnd,
    exitStart,
    exitEnd,
  );
  if (opacity <= 0) return distance;
  if (progress < enterEnd) return distance * (1 - opacity);
  if (progress <= exitStart) return 0;
  return -distance * 0.6 * (1 - opacity);
}
