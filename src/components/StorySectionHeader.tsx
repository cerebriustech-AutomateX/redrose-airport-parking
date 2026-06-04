"use client";

import { ReactNode } from "react";
import StoryRouteAccent from "@/components/StoryRouteAccent";

type StorySectionHeaderProps = {
  chapter: string;
  beat: string;
  eyebrow: string;
  heading: ReactNode;
  storyLine: string;
  headingId?: string;
  className?: string;
};

/** Shared story chapter label + section intro — keeps every beat aligned and readable. */
export default function StorySectionHeader({
  chapter,
  beat,
  eyebrow,
  heading,
  storyLine,
  headingId,
  className = "",
}: StorySectionHeaderProps) {
  return (
    <header className={className}>
      <p className="story-chapter-label">
        <span className="story-chapter-num">Chapter {chapter}</span>
        <span className="story-chapter-sep" aria-hidden="true">
          ·
        </span>
        <span className="story-chapter-beat">{beat}</span>
      </p>

      <p className="steps-section-eyebrow mt-3">{eyebrow}</p>

      <h2 id={headingId} className="steps-section-heading mt-4">
        {heading}
      </h2>

      <p className="steps-section-subcopy text-pretty mt-4 max-w-md">{storyLine}</p>

      <StoryRouteAccent static className="mt-5" />
    </header>
  );
}
