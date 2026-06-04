export type StoryLayer3D = {
  opacity: number;
  y: number;
  scale: number;
  rotateX: number;
  rotateY: number;
  blur: number;
  z: number;
};

type LayerConfig = {
  yDist: number;
  scaleFrom: number;
  rotateXFrom: number;
  rotateYFrom: number;
  blurFrom: number;
  zFrom: number;
};

const DEFAULT_LAYER: LayerConfig = {
  yDist: 52,
  scaleFrom: 0.9,
  rotateXFrom: 12,
  rotateYFrom: -8,
  blurFrom: 8,
  zFrom: -48,
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** 3D settle-in, hold through pinned scroll, lift out at section end. */
export function storyLayer3D(
  progress: number,
  enterEnd: number,
  exitStart = 0.9,
  exitEnd = 1,
  config: Partial<LayerConfig> & { fadeIn?: boolean } = {},
): StoryLayer3D {
  const { fadeIn = false, ...layerConfig } = config;
  const c = { ...DEFAULT_LAYER, ...layerConfig };

  if (progress >= exitStart) {
    const t = easeOutCubic(
      Math.min(1, (progress - exitStart) / (exitEnd - exitStart || 0.001)),
    );
    return {
      opacity: 1 - t,
      y: -t * 42,
      scale: 1 - t * 0.045,
      rotateX: -t * 7,
      rotateY: t * 5,
      blur: t * 6,
      z: t * 36,
    };
  }

  if (progress >= enterEnd) {
    return {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      blur: 0,
      z: 0,
    };
  }

  const t = easeOutCubic(Math.max(0, progress / (enterEnd || 0.001)));
  return {
    opacity: fadeIn ? t : 1,
    y: (1 - t) * c.yDist,
    scale: c.scaleFrom + t * (1 - c.scaleFrom),
    rotateX: (1 - t) * c.rotateXFrom,
    rotateY: (1 - t) * c.rotateYFrom,
    blur: (1 - t) * c.blurFrom,
    z: (1 - t) * c.zFrom,
  };
}

/** Continuous depth drift while scrolling through a pinned beat range. */
export function storyDepthDrift(
  progress: number,
  rangeStart: number,
  rangeEnd: number,
  rotateYRange: readonly [number, number] = [-3, 3],
  yRange: readonly [number, number] = [8, -8],
): { rotateY: number; y: number; scale: number } {
  if (progress < rangeStart) {
    return { rotateY: rotateYRange[0], y: yRange[0], scale: 0.98 };
  }
  if (progress > rangeEnd) {
    return { rotateY: rotateYRange[1], y: yRange[1], scale: 0.995 };
  }
  const t =
    (progress - rangeStart) / (rangeEnd - rangeStart || 0.001);
  const e = easeOutCubic(t);
  return {
    rotateY: rotateYRange[0] + (rotateYRange[1] - rotateYRange[0]) * e,
    y: yRange[0] + (yRange[1] - yRange[0]) * e,
    scale: 0.98 + Math.sin(t * Math.PI) * 0.025,
  };
}

/** Remap section scroll into 0–1 beat progress for StorySceneLayer. */
export function storyBeatProgress(
  p: number,
  enterStart: number,
  enterEnd: number,
  holdEnd: number,
  exitEnd: number,
): number {
  if (p < enterStart) return 0;
  if (p < enterEnd) {
    const t = (p - enterStart) / (enterEnd - enterStart || 0.001);
    return t * enterEnd;
  }
  if (p <= holdEnd) return Math.max(enterEnd + 0.001, 0.2);
  if (p > exitEnd) return 1;
  const t = (p - holdEnd) / (exitEnd - holdEnd || 0.001);
  return 0.9 + t * 0.1;
}
export function storyScrollHeight(cardCount: number, mobile = false): number {
  const base = mobile ? 180 : 200;
  const perCard = mobile ? 38 : 45;
  return base + cardCount * perCard;
}
