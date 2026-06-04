"use client";

import { ReactNode } from "react";

type StoryLeftLayoutProps = {
  children: ReactNode;
  rightSlot?: ReactNode;
  className?: string;
};

/** Left storytelling rail — right side stays open for the cinematic pass. */
export default function StoryLeftLayout({
  children,
  rightSlot,
  className = "",
}: StoryLeftLayoutProps) {
  if (!rightSlot) {
    return (
      <div className={`overflow-x-hidden ${className}`}>
        <div className="story-left-rail relative z-10 w-full">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`grid overflow-x-hidden lg:grid-cols-[minmax(0,44%)_minmax(0,56%)] lg:items-start lg:gap-x-8 xl:gap-x-10 ${className}`}
    >
      <div className="story-left-rail relative z-10 w-full">{children}</div>
      <div className="story-cinematic-zone relative hidden min-h-[min(52vh,28rem)] items-center justify-end pt-10 lg:flex lg:pt-14">
        {rightSlot}
      </div>
    </div>
  );
}
