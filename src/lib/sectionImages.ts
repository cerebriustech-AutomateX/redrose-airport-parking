import { getHeroFramePath } from "@/lib/heroSequence";

/** Curated cinematic frames — dark/red story beats, consistent across glass cards. */
export const HOW_IT_WORKS_IMAGES = [
  {
    src: getHeroFramePath(18),
    alt: "Book airport parking online before you travel",
    className: "object-cover object-center",
  },
  {
    src: getHeroFramePath(52),
    alt: "Arrive and park in your reserved bay",
    className: "object-cover object-center",
  },
  {
    src: getHeroFramePath(88),
    alt: "Travel stress-free while your car stays secure",
    className: "object-cover object-center",
  },
] as const;

export const WHY_CHOOSE_IMAGES = [
  {
    src: getHeroFramePath(48),
    alt: "Secure CCTV-monitored parking bays",
    className: "object-cover object-center",
  },
  {
    src: getHeroFramePath(58),
    alt: "Convenient access to the terminal",
    className: "object-cover object-center",
  },
  {
    src: getHeroFramePath(68),
    alt: "Clear signage and wayfinding on arrival",
    className: "object-cover object-center",
  },
  {
    src: getHeroFramePath(78),
    alt: "Friendly support before and after your trip",
    className: "object-cover object-center",
  },
] as const;

export const SERVICE_IMAGES = [
  {
    src: getHeroFramePath(35),
    alt: "Standard airport parking bays",
    className: "object-cover object-center",
  },
  {
    src: getHeroFramePath(62),
    alt: "Park and ride transfer to the terminal",
    className: "object-cover object-center",
  },
  {
    src: getHeroFramePath(92),
    alt: "Premium meet and greet at departures",
    className: "object-cover object-center",
  },
] as const;
