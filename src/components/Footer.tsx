"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedWords } from "@/components/AnimatedText";
import { footerLegalLinks, footerQuickLinks } from "@/lib/data";
import { softLineStagger, viewOnce } from "@/lib/motion";

const FOOTER_TAGLINE =
  "Premium, secure and convenient airport parking designed to make your journey easier.";

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const content = (
    <>
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Image
            src="/images/redrose-logo.png"
            alt="RedRose Airport Parking"
            width={1024}
            height={682}
            className="h-16 w-auto max-w-full bg-transparent sm:h-20 lg:h-24"
          />
          <p className="mt-6 max-w-sm leading-relaxed text-redrose-grey">
            <AnimatedWords text={FOOTER_TAGLINE} />
          </p>
        </div>

        <div>
          <h3 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold uppercase tracking-wider text-white">
            <AnimatedWords text="Quick Links" />
          </h3>
          <ul className="mt-5 space-y-3">
            {footerQuickLinks.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-redrose-grey transition-colors hover:text-white"
                >
                  <AnimatedWords text={link.label} delay={index * 0.03} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold uppercase tracking-wider text-white">
            <AnimatedWords text="Contact" />
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-redrose-grey">
            <li>
              <AnimatedWords text="Email: info@redroseparking.co.uk" />
            </li>
            <li>
              <AnimatedWords text="Phone: 00000 000000" delay={0.05} />
            </li>
            <li>
              <AnimatedWords
                text="Location details coming soon"
                delay={0.1}
              />
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-redrose-grey">
          <AnimatedWords
            text={`© ${new Date().getFullYear()} RedRose Airport Parking. All rights reserved.`}
          />
        </p>
        <ul className="flex flex-wrap gap-6">
          {footerLegalLinks.map((link, index) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-xs text-redrose-grey transition-colors hover:text-white"
              >
                <AnimatedWords text={link.label} delay={index * 0.04} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <footer
      id="contact"
      className="border-t border-white/5 bg-[#0f0f11] pt-16 pb-10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {reduceMotion ? (
          content
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewOnce}
            variants={softLineStagger}
          >
            {content}
          </motion.div>
        )}
      </div>
    </footer>
  );
}
