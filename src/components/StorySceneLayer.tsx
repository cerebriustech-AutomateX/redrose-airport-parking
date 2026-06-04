"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { storyLayer3D } from "@/lib/storyMotion3d";

type StorySceneLayerProps = {
  progress: MotionValue<number>;
  enterEnd?: number;
  exitStart?: number;
  fadeIn?: boolean;
  depth?: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * Single storytelling layer — 3D settle, hold, lift. Parent needs `.story-scene-stage`.
 */
export default function StorySceneLayer({
  progress,
  enterEnd = 0.12,
  exitStart = 0.9,
  fadeIn = false,
  depth = 1,
  className = "",
  children,
}: StorySceneLayerProps) {
  const layerOpts = { fadeIn };

  const opacity = useTransform(progress, (p) =>
    storyLayer3D(p, enterEnd, exitStart, 1, layerOpts).opacity,
  );
  const y = useTransform(
    progress,
    (p) => storyLayer3D(p, enterEnd, exitStart, 1, layerOpts).y * depth,
  );
  const scale = useTransform(progress, (p) =>
    storyLayer3D(p, enterEnd, exitStart, 1, layerOpts).scale,
  );
  const rotateX = useTransform(progress, (p) =>
    storyLayer3D(p, enterEnd, exitStart, 1, layerOpts).rotateX,
  );
  const rotateY = useTransform(progress, (p) =>
    storyLayer3D(p, enterEnd, exitStart, 1, layerOpts).rotateY,
  );
  const z = useTransform(progress, (p) =>
    storyLayer3D(p, enterEnd, exitStart, 1, layerOpts).z,
  );
  const filter = useTransform(progress, (p) => {
    const blur = storyLayer3D(p, enterEnd, exitStart, 1, layerOpts).blur;
    return blur > 0.1 ? `blur(${blur}px)` : "none";
  });

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        rotateX,
        rotateY,
        z,
        filter,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
