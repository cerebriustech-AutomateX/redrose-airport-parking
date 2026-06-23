"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedWords } from "@/components/AnimatedText";
import { companyInfo, footerInfoLinks, footerQuickLinks } from "@/lib/data";
import { softLineStagger, viewOnce } from "@/lib/motion";

const FOOTER_TAGLINE =
  "Park & Ride and Meet & Greet parking at Manchester Airport — secure compounds, clear instructions, and operations support when you need it.";

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
            className="h-16 w-auto max-w-full bg-transparent sm:h-20"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-redrose-grey">
            <AnimatedWords text={FOOTER_TAGLINE} />
          </p>
        </div>

        <div>
          <h3 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold uppercase tracking-wider text-white">
            <AnimatedWords text="Quick Links" />
          </h3>
          <ul className="mt-4 space-y-2.5">
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
          <ul className="mt-4 space-y-2.5 text-sm text-redrose-grey">
            <li>
              <a
                href={`mailto:${companyInfo.email}`}
                className="transition-colors hover:text-white"
              >
                {companyInfo.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${companyInfo.operationsPhone}`}
                className="transition-colors hover:text-white"
              >
                {companyInfo.operationsPhoneDisplay}
              </a>
            </li>
            <li>{companyInfo.facilityPostcode}</li>
          </ul>
          <ul className="mt-5 space-y-2.5">
            {footerInfoLinks.map((link, index) => (
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
      </div>

      <div className="mt-10 border-t border-white/5 pt-6">
        <p className="text-xs text-redrose-grey">
          <AnimatedWords
            text={`© ${new Date().getFullYear()} RedRose Airport Parking. All rights reserved.`}
          />
        </p>
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
