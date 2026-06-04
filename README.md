## Cursor Enforcement Rules

All development in this repository MUST follow:

/docs/CURSOR_RULES.md

When generating or modifying code:
- Do not expand scope.
- Do not introduce new architecture patterns.
- Keep implementations minimal.
- Break large features into smaller working steps.
- Avoid overengineering.

Before completing any major feature:
- Confirm build passes.
- Confirm TypeScript strict mode passes.
- Confirm no unused code.
- Confirm no feature drift.

--------------------------------------------------

# RedRose Airport Parking

Premium animated landing page for RedRose Airport Parking — built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Brand

- **Deep Red:** `#8B001D`
- **Charcoal:** `#1A1A1D`
- **Medium Grey:** `#6B6F76`
- **Off-White:** `#F2F2F2`
- **Fonts:** Montserrat (headings), Raleway (body)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, SEO metadata
│   ├── page.tsx            # Homepage composition
│   └── globals.css         # Brand theme & animations
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── BookingCard.tsx
│   ├── TrustBar.tsx
│   ├── HowItWorks.tsx
│   ├── WhyChooseUs.tsx
│   ├── Services.tsx
│   ├── AnimatedStory.tsx
│   ├── FinalCTA.tsx
│   ├── Footer.tsx
│   └── CinematicIntroPlaceholder.tsx  # Ready for future 3D intro
└── lib/
    ├── data.ts             # Content arrays
    └── motion.ts           # Shared Framer Motion variants
```

## Phase 2 — 3D Intro

`CinematicIntroPlaceholder.tsx` is structured to be replaced with a React Three Fiber cinematic intro. Do not install Three.js until that phase begins.

## Booking

The booking form is frontend-only. Clicking **Check Availability** shows: *"Booking system coming soon."* Backend integration will be added in a future phase.
