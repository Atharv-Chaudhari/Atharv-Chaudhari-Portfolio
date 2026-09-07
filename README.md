# Atharv Chaudhari — Cinematic Gameplay Portfolio V7

A cinematic expedition portfolio for Vercel.

## What changed
- Multiple distinct environments: jungle/waterfall, lost ruins, data archive, robotics frontier, horizon.
- Animated GIF overlays for waterfall spray, birds and fireflies.
- Lightweight 3D low-poly explorer character with an actual running cycle.
- 3D is used only for the character layer — not for every element.
- Keyboard/gameplay controls: A/D, arrows, M map, H HUD, Esc close.
- Distinct actions per chapter rather than repeated scroll buttons.
- Project artifacts open in an interactive archive.
- Responsive mobile expedition dock.
- Custom SVG favicon.
- No GSAP, no ScrollTrigger.
- Includes `@types/three` so the previous Vercel `three` declaration error is addressed.

## Run
```bash
npm install
npm run build
npm run start
```

Deploy the repository root to Vercel. The project uses Next.js 14.
