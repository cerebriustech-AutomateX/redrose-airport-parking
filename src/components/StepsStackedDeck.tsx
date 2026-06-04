"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import {
  STACK_CYCLE_TRANSITION,
  STACK_ENTER,
  STACK_ENTER_TRANSITION,
  STACK_HOVER_TRANSITION,
  STEPS_AUTO_CYCLE_MS,
  TEXT_MUTE_BY_DEPTH,
  stackDepth,
  stackPose,
} from "@/lib/stepsMotion";

export type StepsStackedDeckItem = {
  number: string;
  title: string;
  description: string;
};

type StepsStackedDeckProps = {
  items: readonly StepsStackedDeckItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  className?: string;
  /** Parent section in view — syncs deck enter with pass drop */
  enterTriggered?: boolean;
};

export default function StepsStackedDeck({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  className = "",
  enterTriggered,
}: StepsStackedDeckProps) {
  const reduceMotion = useReducedMotion();
  const deckRef = useRef<HTMLDivElement>(null);
  const deckInView = useInView(deckRef, { once: true, amount: 0.35 });
  const isInView = enterTriggered ?? deckInView;
  const [internalIndex, setInternalIndex] = useState(0);
  const [enterDone, setEnterDone] = useState(false);
  const enterStartedRef = useRef(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const activeIndex =
    controlledIndex !== undefined
      ? Math.min(Math.max(controlledIndex, 0), items.length - 1)
      : internalIndex;

  const setActiveIndex = useCallback(
    (index: number) => {
      const next = Math.min(Math.max(index, 0), items.length - 1);
      if (controlledIndex === undefined) {
        setInternalIndex(next);
      }
      onActiveChange?.(next);
    },
    [controlledIndex, items.length, onActiveChange],
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      if (isInView) setEnterDone(true);
      return;
    }
    if (!isInView || enterStartedRef.current) return;

    enterStartedRef.current = true;
    const maxDelay = isMobile ? 0.46 : 0.62;
    const timer = window.setTimeout(
      () => setEnterDone(true),
      (maxDelay + STACK_ENTER_TRANSITION.duration) * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [isInView, isMobile, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || isMobile || isPaused || !enterDone) return;

    const timer = window.setInterval(() => {
      setActiveIndex((activeIndex + 1) % items.length);
    }, STEPS_AUTO_CYCLE_MS);

    return () => window.clearInterval(timer);
  }, [
    activeIndex,
    enterDone,
    isMobile,
    isPaused,
    items.length,
    reduceMotion,
    setActiveIndex,
  ]);

  const enterPreset = isMobile ? STACK_ENTER.mobile : STACK_ENTER.desktop;

  if (reduceMotion) {
    return (
      <div ref={deckRef} className={`steps-deck-layer ${className}`}>
        {items.map((item, index) => {
          const depth = stackDepth(index, activeIndex, items.length);
          const pose = stackPose(depth, isMobile);
          return (
            <article
              key={item.number}
              className={`steps-deck-card ${depth === 0 ? "steps-deck-card--front" : ""}`}
              style={{
                zIndex: pose.zIndex,
                transform: `translate3d(${pose.x}px, ${pose.y}px, 0) scale(${pose.scale})`,
                opacity: pose.opacity,
              }}
            >
              <span className="steps-deck-number">{item.number}</span>
              <h3 className="steps-deck-title">{item.title}</h3>
              <p className="steps-deck-body">{item.description}</p>
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={deckRef}
      className={`steps-deck-layer ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setHoveredIndex(null);
      }}
    >
      {items.map((item, index) => {
        const depth = stackDepth(index, activeIndex, items.length);
        const pose = stackPose(depth, isMobile);
        const enter = enterPreset[depth];
        const isHovered = enterDone && !isMobile && hoveredIndex === index;
        const textMute = TEXT_MUTE_BY_DEPTH[depth];
        const isFront = depth === 0;

        const target = {
          opacity: pose.opacity,
          y: pose.y + (isHovered ? -6 : 0),
          x: pose.x,
          scale: pose.scale * (isHovered ? 1.01 : 1),
        };

        const transition: Transition = !enterDone
          ? { ...STACK_ENTER_TRANSITION, delay: enter.delay }
          : isHovered
            ? STACK_HOVER_TRANSITION
            : STACK_CYCLE_TRANSITION;

        return (
          <motion.article
            key={item.number}
            role="button"
            tabIndex={0}
            aria-pressed={isFront}
            initial={enter.initial}
            animate={enterDone ? target : enter.animate}
            transition={transition}
            style={{ zIndex: isHovered ? 4 : pose.zIndex }}
            className={`steps-deck-card ${isFront ? "steps-deck-card--front" : ""} ${
              isHovered ? "steps-deck-card--hover" : ""
            }`}
            onMouseEnter={() => !isMobile && setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => !isMobile && setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActiveIndex(index);
              }
            }}
          >
            <span className="steps-deck-number">{item.number}</span>
            <h3
              className="steps-deck-title"
              style={{ opacity: textMute.title }}
            >
              {item.title}
            </h3>
            <p className="steps-deck-body" style={{ opacity: textMute.body }}>
              {item.description}
            </p>
          </motion.article>
        );
      })}
    </div>
  );
}
