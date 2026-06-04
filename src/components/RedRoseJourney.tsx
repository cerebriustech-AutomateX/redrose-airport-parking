"use client";

import Link from "next/link";
import StoryDeck, { type StoryDeckItem } from "@/components/StoryDeck";
import StoryLeftLayout from "@/components/StoryLeftLayout";
import StoryRouteAccent from "@/components/StoryRouteAccent";

const eyebrow = "The RedRose Journey";

const headlineLines = ["From Booking", "To Takeoff."] as const;

const journeyCards: StoryDeckItem[] = [
  {
    number: "01",
    title: "Search",
    description: "Choose your airport, dates, and vehicle.",
  },
  {
    number: "02",
    title: "Book",
    description: "Reserve your parking before you travel.",
  },
  {
    number: "03",
    title: "Arrive",
    description: "Follow clear instructions to your parking point.",
  },
  {
    number: "04",
    title: "Park & Travel",
    description: "Continue to the terminal with confidence.",
  },
];

/** Static journey section — no scroll-driven animation. */
export default function RedRoseJourney() {
  return (
    <section
      id="redrose-journey"
      aria-labelledby="redrose-journey-heading"
      className="relative overflow-x-hidden py-20 sm:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <StoryLeftLayout>
          <p className="font-[family-name:var(--font-montserrat)] text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8B001D]">
            {eyebrow}
          </p>
          <h2 id="redrose-journey-heading" className="mt-5 space-y-1">
            <span className="hero-heading block font-[family-name:var(--font-montserrat)] text-3xl font-bold uppercase leading-[1.02] tracking-tight sm:text-4xl lg:text-[2.65rem]">
              {headlineLines[0]}
            </span>
            <span className="hero-heading-red block font-[family-name:var(--font-montserrat)] text-3xl font-bold uppercase leading-[1.02] tracking-tight sm:text-4xl lg:text-[2.65rem]">
              {headlineLines[1]}
            </span>
          </h2>
          <StoryRouteAccent static className="mt-7" />
          <StoryDeck items={journeyCards} activeIndex={0} className="mt-6" />
          <div className="mt-5">
            <p className="font-[family-name:var(--font-montserrat)] text-xs font-medium tracking-wide text-body-muted">
              Ready to park stress-free?
            </p>
            <Link href="#hero-book" className="btn-primary mt-4 inline-flex items-center gap-2">
              Check Availability
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </StoryLeftLayout>
      </div>
    </section>
  );
}
