"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import {
  CINEMATIC_HERO,
  CINEMATIC_TIMELINE,
  clamp01,
  easeInOutCubic,
  easeOutCubic,
  lerp,
} from "@/lib/cinematicHero";

type Point = { x: number; y: number };

function getRoutePoints(width: number, height: number): Point[] {
  const storyLeft = width * CINEMATIC_HERO.leftContentRatio;
  const storyWidth = width - storyLeft;

  return [
    { x: storyLeft + storyWidth * 0.98, y: height * 0.78 },
    { x: storyLeft + storyWidth * 0.72, y: height * 0.7 },
    { x: storyLeft + storyWidth * 0.52, y: height * 0.64 },
    { x: storyLeft + storyWidth * 0.38, y: height * 0.58 },
    { x: storyLeft + storyWidth * 0.55, y: height * 0.42 },
    { x: storyLeft + storyWidth * 0.88, y: height * 0.28 },
  ];
}

function pointOnPolyline(points: Point[], t: number): Point {
  if (points.length < 2) return points[0] ?? { x: 0, y: 0 };

  const segments = points.length - 1;
  const scaled = t * segments;
  const index = Math.min(Math.floor(scaled), segments - 1);
  const localT = scaled - index;

  return {
    x: lerp(points[index].x, points[index + 1].x, localT),
    y: lerp(points[index].y, points[index + 1].y, localT),
  };
}

function polylineLength(points: Point[]): number {
  let length = 0;
  for (let i = 1; i < points.length; i += 1) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    length += Math.hypot(dx, dy);
  }
  return length;
}

function drawRoute(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  progress: number,
) {
  const total = polylineLength(points);
  let drawn = 0;
  const target = total * progress;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i += 1) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    const segLen = Math.hypot(dx, dy);

    if (drawn + segLen >= target) {
      const remain = target - drawn;
      const ratio = remain / segLen;
      ctx.lineTo(
        points[i - 1].x + dx * ratio,
        points[i - 1].y + dy * ratio,
      );
      break;
    }

    ctx.lineTo(points[i].x, points[i].y);
    drawn += segLen;
  }

  ctx.strokeStyle = CINEMATIC_HERO.brandRed;
  ctx.lineWidth = 2.5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.shadowColor = "rgba(139, 0, 29, 0.45)";
  ctx.shadowBlur = 8;
  ctx.stroke();
  ctx.shadowBlur = 0;
}

function drawParkingBays(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  glow: number,
) {
  const storyLeft = width * CINEMATIC_HERO.leftContentRatio;
  const baseX = storyLeft + (width - storyLeft) * 0.34;
  const baseY = height * 0.68;

  ctx.save();
  ctx.globalAlpha = 0.25 + glow * 0.55;
  ctx.strokeStyle = CINEMATIC_HERO.offWhite;
  ctx.lineWidth = 1.2;

  for (let i = 0; i < 3; i += 1) {
    ctx.beginPath();
    ctx.moveTo(baseX + i * 34, baseY);
    ctx.lineTo(baseX + 18 + i * 34, baseY - 52);
    ctx.lineTo(baseX + 88 + i * 34, baseY - 58);
    ctx.lineTo(baseX + 104 + i * 34, baseY - 4);
    ctx.closePath();
    ctx.stroke();
  }

  if (glow > 0.05) {
    ctx.globalAlpha = glow * 0.35;
    ctx.strokeStyle = CINEMATIC_HERO.brandRed;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.restore();
}

function drawCar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  alpha: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;

  const bodyGradient = ctx.createLinearGradient(-48, -14, 48, 14);
  bodyGradient.addColorStop(0, "#2a2a2e");
  bodyGradient.addColorStop(0.5, "#1f1f23");
  bodyGradient.addColorStop(1, "#141418");

  ctx.fillStyle = bodyGradient;
  ctx.beginPath();
  ctx.roundRect(-52, -16, 104, 32, 8);
  ctx.fill();

  ctx.fillStyle = "rgba(242, 242, 242, 0.08)";
  ctx.beginPath();
  ctx.roundRect(-18, -22, 36, 18, 6);
  ctx.fill();

  ctx.fillStyle = "rgba(139, 0, 29, 0.35)";
  ctx.shadowColor = "rgba(139, 0, 29, 0.5)";
  ctx.shadowBlur = 12;
  ctx.fillRect(44, -8, 4, 16);
  ctx.shadowBlur = 0;

  ctx.restore();
}

function drawRoseMark(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  alpha: number,
) {
  if (alpha <= 0) return;

  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = alpha;
  ctx.scale(0.9, 0.9);

  ctx.fillStyle = CINEMATIC_HERO.brandRed;
  ctx.shadowColor = "rgba(139, 0, 29, 0.4)";
  ctx.shadowBlur = 10;

  for (let i = 0; i < 5; i += 1) {
    ctx.save();
    ctx.rotate((Math.PI * 2 * i) / 5);
    ctx.beginPath();
    ctx.ellipse(0, -10, 7, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.fillStyle = "#6b0018";
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = CINEMATIC_HERO.brandRed;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 4);
  ctx.lineTo(0, 14);
  ctx.stroke();

  ctx.restore();
}

function drawTerminalLights(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  pulse: number,
) {
  const storyLeft = width * CINEMATIC_HERO.leftContentRatio;
  const lights = [
    { x: 0.82, y: 0.22, r: 3 },
    { x: 0.76, y: 0.18, r: 2.2 },
    { x: 0.88, y: 0.26, r: 2.6 },
    { x: 0.7, y: 0.24, r: 2 },
    { x: 0.92, y: 0.2, r: 2.4 },
  ];

  for (const light of lights) {
    const x = storyLeft + (width - storyLeft) * light.x * 0.95;
    const y = height * light.y;
    const glow = ctx.createRadialGradient(x, y, 0, x, y, light.r * 8);
    glow.addColorStop(0, `rgba(242, 242, 242, ${0.35 + pulse * 0.15})`);
    glow.addColorStop(0.4, `rgba(139, 0, 29, ${0.08 + pulse * 0.06})`);
    glow.addColorStop(1, "rgba(26, 26, 29, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, light.r * 8, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawLeftVignette(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const gradient = ctx.createLinearGradient(0, 0, width * 0.55, 0);
  gradient.addColorStop(0, "rgba(26, 26, 29, 0.98)");
  gradient.addColorStop(0.32, "rgba(26, 26, 29, 0.92)");
  gradient.addColorStop(0.48, "rgba(26, 26, 29, 0.55)");
  gradient.addColorStop(0.62, "rgba(26, 26, 29, 0.12)");
  gradient.addColorStop(1, "rgba(26, 26, 29, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const vertical = ctx.createLinearGradient(0, 0, 0, height);
  vertical.addColorStop(0, "rgba(26, 26, 29, 0.35)");
  vertical.addColorStop(0.55, "rgba(26, 26, 29, 0)");
  vertical.addColorStop(1, "rgba(26, 26, 29, 0.75)");
  ctx.fillStyle = vertical;
  ctx.fillRect(0, 0, width, height);
}

function getTimelineProgress(elapsedMs: number): number {
  const loop = elapsedMs % CINEMATIC_HERO.durationMs;
  return loop / CINEMATIC_HERO.durationMs;
}

function computeSceneState(progress: number) {
  const routeProgress = easeOutCubic(
    clamp01(progress / CINEMATIC_TIMELINE.routeDrawEnd),
  );

  const carTravel = easeInOutCubic(
    clamp01(
      (progress - CINEMATIC_TIMELINE.carEnterStart) /
        (CINEMATIC_TIMELINE.carParkEnd - CINEMATIC_TIMELINE.carEnterStart),
    ),
  );

  const bayGlow = easeOutCubic(
    clamp01(
      (progress - CINEMATIC_TIMELINE.bayGlowStart) /
        (CINEMATIC_TIMELINE.holdStart - CINEMATIC_TIMELINE.bayGlowStart),
    ),
  );

  const roseAlpha = easeOutCubic(
    clamp01(
      (progress - CINEMATIC_TIMELINE.roseRevealStart) /
        (CINEMATIC_TIMELINE.holdStart - CINEMATIC_TIMELINE.roseRevealStart),
    ),
  );

  const baseReveal = easeOutCubic(
    clamp01((progress - 0.35) / 0.35),
  );

  const pushIn = 1 + progress * 0.055;
  const terminalPulse =
    progress >= CINEMATIC_TIMELINE.terminalGlowStart
      ? 0.5 + Math.sin(progress * Math.PI * 6) * 0.12
      : progress * 0.4;

  const carAlpha =
    progress > CINEMATIC_TIMELINE.carParkEnd - 0.06
      ? clamp01(1 - (progress - (CINEMATIC_TIMELINE.carParkEnd - 0.06)) / 0.08)
      : clamp01(carTravel * 1.2);

  return {
    routeProgress,
    carTravel,
    bayGlow,
    roseAlpha,
    baseReveal,
    pushIn,
    terminalPulse,
    carAlpha,
  };
}

export default function CinematicHeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseImageRef = useRef<HTMLImageElement | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const image = new Image();
    image.src = CINEMATIC_HERO.baseImage;
    image.onload = () => {
      baseImageRef.current = image;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let cancelled = false;

    const render = (timestamp: number) => {
      if (cancelled) return;

      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = reduceMotion
        ? CINEMATIC_TIMELINE.holdStart
        : getTimelineProgress(elapsed);

      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const state = computeSceneState(progress);
      const routePoints = getRoutePoints(width, height);

      ctx.fillStyle = CINEMATIC_HERO.charcoal;
      ctx.fillRect(0, 0, width, height);

      const baseImage = baseImageRef.current;
      if (baseImage?.complete) {
        ctx.save();
        ctx.globalAlpha = 0.35 + state.baseReveal * 0.65;

        const scale = state.pushIn;
        const drawW = width * scale;
        const drawH = height * scale;
        const offsetX = (width - drawW) * 0.08;
        const offsetY = (height - drawH) * 0.5;

        ctx.drawImage(baseImage, offsetX, offsetY, drawW, drawH);
        ctx.restore();
      }

      drawTerminalLights(ctx, width, height, state.terminalPulse);
      drawParkingBays(ctx, width, height, state.bayGlow);

      if (state.routeProgress > 0) {
        drawRoute(ctx, routePoints, state.routeProgress);
      }

      if (state.carAlpha > 0.01 && state.carTravel < 0.995) {
        const carPoint = pointOnPolyline(routePoints, state.carTravel * 0.55);
        const nextPoint = pointOnPolyline(
          routePoints,
          Math.min(state.carTravel * 0.55 + 0.02, 1),
        );
        const angle = Math.atan2(
          nextPoint.y - carPoint.y,
          nextPoint.x - carPoint.x,
        );
        drawCar(ctx, carPoint.x, carPoint.y, angle, state.carAlpha);
      }

      const bayAnchor = routePoints[2];
      drawRoseMark(ctx, bayAnchor.x - 36, bayAnchor.y - 48, state.roseAlpha);

      const rim = ctx.createRadialGradient(
        width * 0.78,
        height * 0.62,
        0,
        width * 0.78,
        height * 0.62,
        width * 0.35,
      );
      rim.addColorStop(0, "rgba(139, 0, 29, 0.12)");
      rim.addColorStop(1, "rgba(26, 26, 29, 0)");
      ctx.fillStyle = rim;
      ctx.fillRect(0, 0, width, height);

      drawLeftVignette(ctx, width, height);

      if (!reduceMotion) {
        rafRef.current = requestAnimationFrame(render);
      }
    };

    const start = () => {
      if (reduceMotion) {
        render(performance.now());
        return;
      }
      rafRef.current = requestAnimationFrame(render);
    };

    start();

    const resizeObserver = new ResizeObserver(() => {
      if (reduceMotion) render(performance.now());
    });
    resizeObserver.observe(container);

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full max-w-full" />
    </div>
  );
}
