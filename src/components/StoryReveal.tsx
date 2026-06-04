"use client";

import Link from "next/link";
import StepsPassVisual from "@/components/StepsPassVisual";
import StoryFeatureGlass, {
  type StoryFeatureItem,
} from "@/components/StoryFeatureGlass";
import StoryLeftLayout from "@/components/StoryLeftLayout";
import StoryRouteAccent from "@/components/StoryRouteAccent";

type StoryRevealProps = {
  eyebrow?: string;
  headline: string;
  headlineLines?: readonly [string, string];
  subcopy?: string;
  ctaLabel?: string;
  ctaHref?: string;
  align?: "left" | "center";
  features?: readonly StoryFeatureItem[];
  panelEyebrow?: string;
  panelTitle?: string;
  panelFooterLabel?: string;
  panelFooterValue?: string;
  passActiveStep?: number;
  showPassCard?: boolean;
};

function defaultHeadlineLines(headline: string): [string, string] {
  const match = headline.match(/^(.+?\s)(to\s+.+\.?)$/i);
  if (match) return [match[1].trim(), match[2].trim()];

  const period = headline.indexOf(". ");
  if (period > 0) {
    return [headline.slice(0, period + 1).trim(), headline.slice(period + 2).trim()];
  }

  const words = headline.split(" ");
  if (words.length <= 3) return [headline, ""];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

/** Transit story beat — copy + glass detail + pass on the left; cinematic pass stays clear on the right. */
export default function StoryReveal({
  eyebrow,
  headline,
  headlineLines,
  subcopy,
  ctaLabel,
  ctaHref = "#hero-book",
  align = "left",
  features,
  panelEyebrow = "At your bay",
  panelTitle = "Everything confirmed before you travel",
  panelFooterLabel,
  panelFooterValue,
  passActiveStep = 1,
  showPassCard = true,
}: StoryRevealProps) {
  const lines = headlineLines ?? defaultHeadlineLines(headline);
  const positionClass =
    align === "center" ? "lg:max-w-lg lg:mx-auto lg:text-left" : "max-w-xl";

  return (
    <section
      className="relative flex min-h-[84svh] items-start overflow-x-hidden pt-28 pb-24 sm:min-h-[88svh] sm:pt-32 sm:pb-28 lg:min-h-[92svh] lg:pt-36 lg:pb-32"
      aria-label={headline}
    >
      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <StoryLeftLayout>
          <div className={positionClass}>
            {eyebrow && (
              <p className="font-(family-name:--font-montserrat) text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B001D]">
                {eyebrow}
              </p>
            )}

            <h2 className="hero-heading mt-4 space-y-1 font-(family-name:--font-montserrat) text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl">
              <span className="block">{lines[0]}</span>
              {lines[1] && <span className="block">{lines[1]}</span>}
            </h2>

            {subcopy && (
              <p className="text-body-muted text-pretty mt-5 text-base leading-relaxed sm:text-lg">
                {subcopy}
              </p>
            )}

            <StoryRouteAccent static className="mt-7" />

            {showPassCard ? (
              <StepsPassVisual
                activeStep={passActiveStep}
                side="left"
                className="mt-8 max-w-[17.5rem]"
              />
            ) : null}

            {features && features.length > 0 ? (
              <StoryFeatureGlass
                className="mt-8"
                eyebrow={panelEyebrow}
                title={panelTitle}
                features={features}
                footerLabel={panelFooterLabel}
                footerValue={panelFooterValue}
              />
            ) : null}

            {ctaLabel && (
              <Link href={ctaHref} className="btn-primary mt-8 inline-flex">
                {ctaLabel}
              </Link>
            )}
          </div>
        </StoryLeftLayout>
      </div>
    </section>
  );
}
