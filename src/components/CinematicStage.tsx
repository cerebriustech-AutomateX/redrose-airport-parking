"use client";

import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import HeroSequenceCanvas from "@/components/HeroSequenceCanvas";
import { HERO_STATIC_FRAME } from "@/lib/heroSequence";

/**
 * Fixed cinematic backdrop. Left edge only gets a readability gradient;
 * the right stays sharp for car, route, bay, and signage.
 */
export default function CinematicStage({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    progressRef.current = value;
  });

  const introVeilOpacity = useTransform(scrollYProgress, [0, 0.12, 0.28], [0.18, 0.1, 0]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const showScrollBackdrop = !reduceMotion;

  return (
    <div ref={stageRef} className="relative">
      {showScrollBackdrop && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div
            className={`cinematic-backdrop-zoom absolute inset-0 ${isMobile ? "cinematic-backdrop-zoom--mobile" : ""}`}
          >
            <HeroSequenceCanvas progressRef={progressRef} />
          </div>
          <div
            className={`cinematic-edge-vignette absolute inset-0 ${isMobile ? "cinematic-edge-vignette--mobile" : ""}`}
            aria-hidden="true"
          />
          <motion.div
            style={{ opacity: introVeilOpacity }}
            className={`cinematic-left-readability absolute inset-0 ${isMobile ? "cinematic-left-readability--mobile" : ""}`}
            aria-hidden="true"
          />
        </div>
      )}

      {reduceMotion && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#1A1A1D]">
          <Image
            src={HERO_STATIC_FRAME}
            alt=""
            fill
            priority
            sizes="100vw"
            className="cinematic-mobile-bg object-contain object-[68%_46%]"
          />
          <div className="cinematic-left-readability cinematic-left-readability--mobile absolute inset-0" aria-hidden="true" />
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
