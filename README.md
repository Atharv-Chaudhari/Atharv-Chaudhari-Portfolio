# Atharv Chaudhari — Cinematic Nature Portfolio

A Next.js + React Three Fiber personal portfolio with a cinematic exploration aesthetic:
lush jungle, waterfall, river, ruins, bridge, mountains, drifting leaves and subtle future-tech elements.

## Build-safe architecture

- Next.js 14
- React 18
- TypeScript
- React Three Fiber / Three.js
- Drei
- IntersectionObserver + CSS for scroll reveals
- **No GSAP / ScrollTrigger dependency**

The previous Vercel TypeScript failure came from importing `gsap/ScrollTrigger` without a declaration-resolvable module. This version removes that dependency completely.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## Deploy to Vercel

Import the project/repository into Vercel. The framework should be detected as Next.js automatically.

Build command:

```bash
npm run build
```

No environment variables are required for the current portfolio.
