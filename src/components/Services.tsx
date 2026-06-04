"use client";

import ServiceCard from "@/components/ServiceCard";
import StoryLeftLayout from "@/components/StoryLeftLayout";
import StorySectionHeader from "@/components/StorySectionHeader";
import { serviceCards } from "@/lib/data";
import { STORY_CHAPTERS } from "@/lib/storySpine";

const chapter = STORY_CHAPTERS.services;
const heading = "Airport parking, your way.";

const cards = serviceCards.map((service, index) => ({
  number: String(index + 1).padStart(2, "0"),
  title: service.title,
  description: service.description,
}));

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-x-hidden"
    >
      <div className="services-section-stage">
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
          <StoryLeftLayout>
            <div className="story-section-stack">
              <StorySectionHeader
                chapter={chapter.chapter}
                beat={chapter.beat}
                eyebrow={chapter.eyebrow}
                heading={heading}
                storyLine={chapter.storyLine}
                headingId="services-heading"
              />

              <div className="services-card-stack">
                {cards.map((item, index) => (
                  <ServiceCard key={item.number} item={item} index={index} />
                ))}
              </div>
            </div>
          </StoryLeftLayout>
        </div>
      </div>
    </section>
  );
}
