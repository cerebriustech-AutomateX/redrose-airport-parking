"use client";

import Link from "next/link";
import BookingCard from "@/components/BookingCard";
import {
  STORY_BEATS,
  beatOpacity,
  ctaCopyOpacity,
  introCopyOpacity,
} from "@/lib/heroSequence";

type StoryBeatOverlayProps = {
  progress: number;
};

export default function StoryBeatOverlay({ progress }: StoryBeatOverlayProps) {
  const introOpacity = introCopyOpacity(progress);
  const ctaOpacity = ctaCopyOpacity(progress);
  const introInteractive = introOpacity > 0.4;

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {/* Left scrim keeps copy legible over the moving sequence */}
      <div
        className="absolute inset-y-0 left-0 w-[min(100%,46%)] bg-gradient-to-r from-[#1A1A1D] via-[#1A1A1D]/80 to-transparent"
        aria-hidden="true"
      />

      {/* INTRO: headline + subcopy + booking card in one clean column */}
      <div
        className="absolute inset-0 flex items-center"
        style={{
          opacity: introOpacity,
          visibility: introOpacity > 0.02 ? "visible" : "hidden",
        }}
      >
        <div className="mx-auto flex h-full w-full max-w-7xl items-center px-6 pt-24 lg:px-8">
          <div
            className={`flex w-full max-w-md flex-col gap-6 ${
              introInteractive ? "pointer-events-auto" : ""
            }`}
          >
            <div>
              <h1 className="hero-heading text-balance font-[family-name:var(--font-montserrat)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
                Airport Parking Made Simple
              </h1>
              <p className="text-pretty mt-4 max-w-sm text-base leading-relaxed text-[#6B6F76] sm:text-lg">
                Secure, convenient parking for Manchester Airport travellers.
              </p>
            </div>

            <BookingCard id="hero-book" />
          </div>
        </div>
      </div>

      {/* MID-SCROLL STORY BEATS */}
      {STORY_BEATS.map((beat) => {
        const opacity = beatOpacity(progress, beat.start, beat.peak, beat.end);
        if (opacity <= 0.01) return null;

        const isRight = beat.align === "right";

        return (
          <div
            key={beat.id}
            className={`absolute top-1/2 max-w-sm -translate-y-1/2 px-6 lg:px-8 ${
              isRight
                ? "right-0 text-right lg:right-12 lg:max-w-md"
                : "left-0 lg:left-12"
            }`}
            style={{ opacity }}
          >
            {beat.eyebrow && (
              <p className="font-[family-name:var(--font-montserrat)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B001D]">
                {beat.eyebrow}
              </p>
            )}
            <h2
              className={`hero-heading text-balance font-[family-name:var(--font-montserrat)] text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl ${
                beat.eyebrow ? "mt-3" : ""
              }`}
            >
              {beat.headline}
            </h2>
            {beat.lines.map((line) => (
              <p
                key={line}
                className="text-pretty mt-4 text-base leading-relaxed text-[#6B6F76]"
              >
                {line}
              </p>
            ))}
          </div>
        );
      })}

      {/* END CTA — text + button only (booking lives in the intro) */}
      <div
        className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center px-6"
        style={{
          opacity: ctaOpacity,
          visibility: ctaOpacity > 0.02 ? "visible" : "hidden",
        }}
      >
        <div
          className={`max-w-xl text-center ${
            ctaOpacity > 0.4 ? "pointer-events-auto" : ""
          }`}
        >
          <h2 className="hero-heading text-balance font-[family-name:var(--font-montserrat)] text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Ready to book your parking?
          </h2>
          <p className="text-pretty mx-auto mt-4 max-w-md text-base text-[#6B6F76] sm:text-lg">
            Reserve your space and start your journey with confidence.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="#book" className="btn-primary">
              Check Availability
            </Link>
            <Link href="#services" className="btn-secondary">
              See Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
