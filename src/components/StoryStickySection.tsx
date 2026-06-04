"use client";

import { ReactNode, RefObject } from "react";

type StoryStickySectionProps = {
  id?: string;
  sectionRef: RefObject<HTMLElement | null>;
  heightVh: number;
  ariaLabelledBy?: string;
  children: ReactNode;
};

/** Pinned story section with 3D stage wrapper and enough scroll runway. */
export default function StoryStickySection({
  id,
  sectionRef,
  heightVh,
  ariaLabelledBy,
  children,
}: StoryStickySectionProps) {
  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={ariaLabelledBy}
      className="relative overflow-x-hidden"
      style={{ height: `${heightVh}vh` }}
    >
      <div className="story-scene-stage sticky top-0 flex min-h-[100dvh] items-start overflow-x-hidden pt-36 pb-16 sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24">
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
          {children}
        </div>
      </div>
    </section>
  );
}
