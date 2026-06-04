# Cursor Development Rules

All development in this repository must follow these rules.

## Core Principles

1. **Minimize scope** — Use the simplest correct diff. Do not add or change unrelated code.
2. **Avoid over-engineering** — Do not over-abstract. No excessive error handling for unlikely edge cases.
3. **Use existing conventions** — Match naming, types, abstractions, and import style in surrounding code.
4. **Comments** — Only explain non-obvious business logic or deep technical details.
5. **Useful tests only** — Add tests when requested or when they add meaningful coverage.

## Project-Specific Rules

- Do not expand scope beyond the requested feature.
- Do not introduce new architecture patterns without approval.
- Keep implementations minimal and working.
- Break large features into smaller working steps.
- Avoid overengineering.

## Before Completing Any Major Feature

- Confirm build passes.
- Confirm TypeScript strict mode passes.
- Confirm no unused code.
- Confirm no feature drift.

## RedRose Airport Parking

- Maintain premium, dark, cinematic UI aligned with brand colours.
- Do not add fake booking functionality or overclaim services.
- Keep the site structured for future React Three Fiber / 3D intro integration.
- Do not install Three.js until explicitly requested for Phase 2.
