# GSAP — Repository-wide instructions for GitHub Copilot

When writing or suggesting code in this repository:

## Stack
- **Framework:** Next.js 14 (App Router) + TypeScript + React 18
- **Styling:** Tailwind CSS v3 — use utility classes, refer to `tailwind.config.js` for theme tokens
- **Animation:** GSAP for complex transitions; use `useGSAP` from `@gsap/react` with proper cleanup
- **3D:** React Three Fiber + Three.js — lazy-load via `next/dynamic` with `ssr: false`
- **Testing:** Jest + React Testing Library

## GSAP Conventions
- Import: `import { gsap } from "gsap"` and named plugin imports
- Register plugins once: `gsap.registerPlugin(ScrollTrigger)`
- In React: always use `useGSAP()` hook with `scope` for cleanup
- Prefer `autoAlpha` over `opacity`
- Prefer transform aliases (`x`, `y`, `scale`, `rotation`) over CSS `transform`
- Use `timeline()` for multi-step sequences with position parameter
- Never put ScrollTrigger on a tween inside a timeline — put it on the timeline

## Performance
- Animate only `transform` and `opacity` — never `width`, `height`, `top`, `left`
- Respect `prefers-reduced-motion` via the `useMotion()` hook
- Use `will-change: transform` sparingly
- Lazy-load Three.js scenes with `next/dynamic`

## Code Style
- No emojis in code or markup
- Use `min-h-[100dvh]` instead of `h-screen`
- Use CSS Grid over flexbox math for layouts
- Labels above inputs, helper text optional
- All interactive elements must be keyboard-accessible with visible focus rings
