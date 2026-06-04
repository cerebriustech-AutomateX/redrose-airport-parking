"use client";

import { ReactNode, RefObject, useEffect, useState } from "react";

type StoryStickySectionProps = {
  id?: string;
  sectionRef: RefObject<HTMLElement | null>;
  heightVh: number;
  /** Shorter scroll runway on phones — keeps story readable without excessive pinning */
  mobileHeightVh?: number;
  ariaLabelledBy?: string;
  children: ReactNode;
};

/** Pinned story section with 3D stage wrapper and enough scroll runway. */
export default function StoryStickySection({
  id,
  sectionRef,
  heightVh,
  mobileHeightVh,
  ariaLabelledBy,
  children,
}: StoryStickySectionProps) {
  const [resolvedHeightVh, setResolvedHeightVh] = useState(heightVh);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () =>
      setResolvedHeightVh(media.matches ? (mobileHeightVh ?? heightVh) : heightVh);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [heightVh, mobileHeightVh]);

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={ariaLabelledBy}
      className="relative overflow-x-hidden"
      style={{ height: `${resolvedHeightVh}vh` }}
    >
      <div className="story-scene-stage sticky top-0 flex min-h-[100dvh] items-start overflow-x-hidden pt-28 pb-12 sm:pt-40 sm:pb-16 lg:pt-48 lg:pb-24">
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
          {children}
        </div>
      </div>
    </section>
  );
}
