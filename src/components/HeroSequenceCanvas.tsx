"use client";

import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import {
  HERO_FRAME_COUNT,
  HERO_SEQUENCE,
  getHeroFramePath,
  progressToFrameIndex,
} from "@/lib/heroSequence";

type CanvasSize = { width: number; height: number; dpr: number };

/** Center-framed — never upscale past native resolution on large displays. */
const FOCUS_X = 0.5;
/** Slightly low bias keeps upper-right UI clear of the fixed header. */
const FOCUS_Y = 0.54;
/** Nudge the frame down so top-edge UI is not clipped by the header. */
const HEADER_SAFE_RATIO = 0.048;

function drawCover(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
) {
  const iw = image.naturalWidth;
  const ih = image.naturalHeight;
  if (iw <= 0 || ih <= 0) return;

  const imageRatio = iw / ih;
  const canvasRatio = width / height;

  // Large viewports: contain at native size (sharp, no artificial zoom).
  // Smaller viewports: standard cover so the frame still fills the screen.
  const useNativeContain = width >= iw && height >= ih;

  let drawWidth: number;
  let drawHeight: number;
  let offsetX: number;
  let offsetY: number;

  if (useNativeContain) {
    const scale = Math.min(width / iw, height / ih, 1);
    drawWidth = iw * scale;
    drawHeight = ih * scale;
    offsetX = (width - drawWidth) * FOCUS_X;
    offsetY = (height - drawHeight) * FOCUS_Y;
  } else if (imageRatio > canvasRatio) {
    drawHeight = height;
    drawWidth = height * imageRatio;
    if (drawWidth > iw) {
      drawWidth = iw;
      drawHeight = iw / imageRatio;
    }
    offsetX = (width - drawWidth) * FOCUS_X;
    offsetY = (height - drawHeight) * FOCUS_Y;
  } else {
    drawWidth = width;
    drawHeight = width / imageRatio;
    if (drawHeight > ih) {
      drawHeight = ih;
      drawWidth = ih * imageRatio;
    }
    offsetX = (width - drawWidth) * FOCUS_X;
    offsetY = (height - drawHeight) * FOCUS_Y;
  }

  offsetY += height * HEADER_SAFE_RATIO;

  ctx.drawImage(
    image,
    Math.round(offsetX),
    Math.round(offsetY),
    Math.round(drawWidth),
    Math.round(drawHeight),
  );
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load frame: ${src}`));
    image.src = src;
  });
}

type HeroSequenceCanvasProps = {
  progressRef: MutableRefObject<number>;
  className?: string;
};

/**
 * Scroll-scrubbed frame sequence from the 1K video export.
 * Each scroll step maps directly to a frame for tight mouse/wheel control.
 */
export default function HeroSequenceCanvas({
  progressRef,
  className = "",
}: HeroSequenceCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(
    Array.from({ length: HERO_FRAME_COUNT }, () => null),
  );
  const sizeRef = useRef<CanvasSize>({ width: 0, height: 0, dpr: 1 });
  const displayedIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const applyCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return false;

    const rect = container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return false;

    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    const frameRatio = HERO_SEQUENCE.frameWidth / HERO_SEQUENCE.frameHeight;
    const viewRatio = width / height;
    const drawWidthCss =
      viewRatio > frameRatio ? height * frameRatio : width;

    const deviceCap = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2);
    const sourceCap = HERO_SEQUENCE.frameWidth / Math.max(drawWidthCss, 1);
    const dpr = Math.min(deviceCap, Math.max(1, sourceCap));

    if (
      sizeRef.current.width === width &&
      sizeRef.current.height === height &&
      Math.abs(sizeRef.current.dpr - dpr) < 0.001
    ) {
      return true;
    }

    sizeRef.current = { width, height, dpr };
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    return true;
  }, []);

  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const image = framesRef.current[index];
      if (!canvas || !applyCanvasSize()) return;

      const { width, height, dpr } = sizeRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = HERO_SEQUENCE.backgroundColor;
      ctx.fillRect(0, 0, width, height);

      if (!image) return;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      drawCover(ctx, image, width, height);
      displayedIndexRef.current = index;
    },
    [applyCanvasSize],
  );

  const resolveLoadedIndex = useCallback((index: number) => {
    const frames = framesRef.current;
    if (frames[index]) return index;
    for (let i = index; i >= 0; i -= 1) {
      if (frames[i]) return i;
    }
    for (let i = index + 1; i < HERO_FRAME_COUNT; i += 1) {
      if (frames[i]) return i;
    }
    return -1;
  }, []);

  useEffect(() => {
    let cancelled = false;
    const frames = framesRef.current;

    const preloadAll = async () => {
      const initialCount = Math.min(
        HERO_SEQUENCE.preloadCount,
        HERO_FRAME_COUNT,
      );

      await Promise.all(
        Array.from({ length: initialCount }, async (_, index) => {
          try {
            frames[index] = await loadImage(getHeroFramePath(index));
          } catch {
            // Continue loading.
          }
        }),
      );

      if (!cancelled) {
        renderFrame(0);
      }

      for (
        let batchStart = initialCount;
        batchStart < HERO_FRAME_COUNT;
        batchStart += HERO_SEQUENCE.lazyBatchSize
      ) {
        if (cancelled) return;

        const batchEnd = Math.min(
          batchStart + HERO_SEQUENCE.lazyBatchSize,
          HERO_FRAME_COUNT,
        );

        await Promise.all(
          Array.from({ length: batchEnd - batchStart }, async (_, offset) => {
            const index = batchStart + offset;
            if (frames[index]) return;
            try {
              frames[index] = await loadImage(getHeroFramePath(index));
            } catch {
              // Skip failed frame.
            }
          }),
        );
      }
    };

    preloadAll();

    const resizeObserver = new ResizeObserver(() => {
      const loaded = resolveLoadedIndex(displayedIndexRef.current);
      if (loaded >= 0) renderFrame(loaded);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Direct scroll -> frame mapping (no video seek lag, no easing delay).
    const loop = () => {
      const target = progressToFrameIndex(
        reduceMotion ? 1 : (progressRef.current ?? 0),
      );

      if (target !== displayedIndexRef.current) {
        const loaded = resolveLoadedIndex(target);
        if (loaded >= 0) renderFrame(loaded);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [progressRef, renderFrame, resolveLoadedIndex, reduceMotion]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 h-full w-full overflow-hidden ${className}`}
      style={{ backgroundColor: HERO_SEQUENCE.backgroundColor }}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full max-w-full"
      />
    </div>
  );
}
