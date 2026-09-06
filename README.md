# Atharv Chaudhari — Gameplay Portfolio V3

This version is intentionally cinematic rather than text-heavy. The portfolio is presented as an adventure-game journey: the jungle image is the world, the chapter HUD is the navigation, and a restrained React Three Fiber layer adds depth with ambient particles rather than filling the page with 3D objects.

## Fixed in V3
- No GSAP / ScrollTrigger, so the previous Vercel TypeScript error is removed.
- Sections have safe spacing and bottom clearance for the HUD.
- Desktop and mobile navigation are separate and reachable.
- Mobile chapter bar is horizontally scrollable.
- Project controls stay inside a dedicated discovery panel.
- Proper AC favicon / app icon.
- Reduced-motion support.
- Lightweight 3D particle layer only.

## Run
npm install
npm run dev

## Production
npm run build
npm start

## Vercel
Import the repository and use the default Next.js settings. No environment variables are required.
