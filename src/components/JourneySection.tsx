"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import BookingCard from "@/components/BookingCard";
import { heroAccentReveal, heroWord } from "@/lib/motion";

const HERO_TITLE_LINE = "Airport Parking";
const HERO_TITLE_MUTED = "made simple.";
const HERO_LEAD =
  "Secure parking for Manchester Airport. Book in minutes and arrive with confidence.";

const HERO_STAGGER = 0.09;
const HERO_START_DELAY = 0.2;

function HeroIntroCopyStatic() {
  return (
    <div className="hero-intro-copy">
      <span className="hero-intro-accent" aria-hidden="true" />
      <h1 className="hero-intro-title">
        <span className="hero-intro-title-line">{HERO_TITLE_LINE}</span>
        <span className="hero-intro-title-muted">{HERO_TITLE_MUTED}</span>
      </h1>
      <p className="hero-intro-lead text-pretty">{HERO_LEAD}</p>
    </div>
  );
}

function HeroIntroWords({
  text,
  step,
}: {
  text: string;
  step: { current: number };
}) {
  const tokens = text.trim().split(/\s+/);

  return (
    <>
      {tokens.map((token, index) => {
        const delay = HERO_START_DELAY + step.current * HERO_STAGGER;
        step.current += 1;

        return (
          <Fragment key={`${token}-${index}`}>
            <motion.span
              className="hero-intro-word"
              initial={heroWord.hidden}
              animate={heroWord.visible}
              transition={{
                ...heroWord.visible.transition,
                delay,
              }}
            >
              {token}
            </motion.span>
            {index < tokens.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </>
  );
}

function HeroIntroCopy() {
  const reduceMotion = useReducedMotion();
  const step = { current: 0 };

  if (reduceMotion) {
    return <HeroIntroCopyStatic />;
  }

  const accentDelay = HERO_START_DELAY + step.current * HERO_STAGGER;
  step.current += 1;

  return (
    <div className="hero-intro-copy">
      <motion.span
        className="hero-intro-accent origin-left"
        aria-hidden="true"
        initial={heroAccentReveal.hidden}
        animate={heroAccentReveal.visible}
        transition={{
          ...heroAccentReveal.visible.transition,
          delay: accentDelay,
        }}
      />
      <h1 className="hero-intro-title">
        <span className="hero-intro-title-line">
          <HeroIntroWords text={HERO_TITLE_LINE} step={step} />
        </span>
        <span className="hero-intro-title-muted">
          <HeroIntroWords text={HERO_TITLE_MUTED} step={step} />
        </span>
      </h1>
      <p className="hero-intro-lead text-pretty">
        <HeroIntroWords text={HERO_LEAD} step={step} />
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
    <section id="home" className="relative overflow-x-hidden pt-20 pb-14 sm:pt-24 sm:pb-16">
      <div
        className="pointer-events-none absolute inset-0 hero-mobile-scrim"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
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
