"use client";

/*
 * CinematicIntroPlaceholder
 *
 * This component is a temporary premium animated background layer.
 * It is intentionally structured so we can swap it for a React Three Fiber /
 * Three.js cinematic intro later without restructuring the page layout.
 *
 * Future 3D concept (Phase 2):
 * - Airport parking entrance scene
 * - Car arrival sequence
 * - RedRose sign reveal
 * - Floating booking card transition into the hero booking UI
 *
 * Do not install Three.js / R3F in this phase.
 */

export default function CinematicIntroPlaceholder() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Deep charcoal gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f11] via-redrose-charcoal to-[#121214]" />

      {/* Moving ambient light layers */}
      <div className="absolute -left-1/4 top-0 h-[70%] w-[70%] rounded-full bg-redrose-red/20 blur-[120px] animate-glow-drift" />
      <div className="absolute -right-1/4 bottom-0 h-[60%] w-[60%] rounded-full bg-redrose-red/10 blur-[100px] animate-glow-drift-reverse" />

      {/* Subtle diagonal shimmer */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -inset-full h-[200%] w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      </div>

      {/* Logo space reserved for future 3D sign reveal */}

      {/* Bottom fade into page content */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-redrose-charcoal to-transparent" />
    </div>
  );
}
