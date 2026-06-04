"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import BookingCard from "@/components/BookingCard";
import { HERO_FINAL_FRAME } from "@/lib/heroSequence";
import { heroCard, storyLine, storyStagger } from "@/lib/motion";

/**
 * Hero intro with Respec-style staggered storytelling over the cinematic backdrop.
 */
export default function ScrollSequenceHero() {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (isMobile || reduceMotion) {
    return <MobileHeroFallback />;
  }

  return (
    <section
      id="home"
      className="relative flex min-h-[112svh] items-center overflow-x-hidden"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[min(100%,52%)]"
        style={{
          background:
            "linear-gradient(to right, #1A1A1D 0%, rgba(26,26,29,0.88) 42%, rgba(26,26,29,0) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-7xl items-center px-6 pt-24 lg:px-8">
        <motion.div
          variants={storyStagger}
          initial="hidden"
          animate="visible"
          className="flex w-full max-w-md flex-col gap-8"
        >
          <motion.div variants={storyLine} className="space-y-4">
            <h1 className="hero-heading text-balance font-[family-name:var(--font-montserrat)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Airport Parking Made Simple
            </h1>
            <p className="text-pretty max-w-sm text-base leading-relaxed text-[#b0b4ba] sm:text-lg">
              Secure, convenient parking for Manchester Airport travellers.
              Book in minutes and follow your journey from arrival to bay.
            </p>
          </motion.div>

          <motion.div variants={heroCard}>
            <BookingCard id="hero-book" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#6B6F76]">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-[#8B001D] to-transparent" />
      </motion.div>
    </section>
  );
}

function MobileHeroFallback() {
  return (
    <section
      id="home"
      className="relative overflow-x-hidden bg-[#1A1A1D] pt-24 pb-16"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-lg">
          <h1 className="hero-heading text-balance font-[family-name:var(--font-montserrat)] text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
            Airport Parking Made Simple
          </h1>
          <p className="text-pretty mt-5 text-lg leading-relaxed text-[#9a9ea4]">
            Secure, convenient parking for Manchester Airport travellers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#hero-book" className="btn-primary">
              Check Availability
            </Link>
            <Link href="#how-it-works" className="btn-secondary">
              How It Works
            </Link>
          </div>
          <div className="mt-10">
            <BookingCard id="hero-book" />
          </div>
        </div>

        <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl bg-[#1A1A1D]">
          <Image
            src={HERO_FINAL_FRAME}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
