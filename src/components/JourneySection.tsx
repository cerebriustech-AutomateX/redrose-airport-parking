"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import BookingCard from "@/components/BookingCard";
import { HERO_STATIC_FRAME } from "@/lib/heroSequence";

function HeroIntroCopy() {
  return (
    <div className="hero-intro-copy">
      <span className="hero-intro-accent" aria-hidden="true" />
      <h1 className="hero-intro-title">
        <span className="hero-intro-title-line">Airport Parking</span>
        <span className="hero-intro-title-muted">made simple.</span>
      </h1>
      <p className="hero-intro-lead text-pretty">
        Secure parking for Manchester Airport. Book in minutes and arrive with
        confidence.
      </p>
    </div>
  );
}

/** Opening hero — static layout, no entrance animation. */
export default function JourneySection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (isMobile) {
    return <MobileHero />;
  }

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] items-center overflow-x-hidden py-24 lg:py-24"
    >
      <div className="hero-readability-gradient pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-14 xl:gap-16">
          <HeroIntroCopy />
          <div className="w-full lg:justify-self-end">
            <BookingCard id="hero-book" variant="intro" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileHero() {
  return (
    <section id="home" className="relative overflow-x-hidden pt-24 pb-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src={HERO_STATIC_FRAME}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1D]/75 via-[#1A1A1D]/55 to-[#1A1A1D]/90" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <HeroIntroCopy />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="#hero-book" className="btn-primary">
            Check Availability
          </Link>
          <Link href="#how-it-works" className="btn-secondary">
            How It Works
          </Link>
        </div>
        <div className="mt-10">
          <BookingCard id="hero-book" variant="intro" />
        </div>
      </div>
    </section>
  );
}
