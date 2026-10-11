# Atharv Chaudhari — AI/ML Engineering Portfolio

A responsive, midnight-blue Next.js portfolio with animated CSS artwork, project case studies, client-side engineering simulations, experience/education, and a clearly separated Future Observatory.

## Requirements

- Node.js 20.9 or later
- npm
- A Vercel account for hosting

## Run locally

1. Extract the ZIP.
2. Open a terminal in the extracted `atharv-ai-portfolio` folder.
3. Run:

```bash
npm install
npm run dev
```

4. Open `http://localhost:3000`.

To test a production build locally:

```bash
npm run build
npm run start
```

## Deploy to Vercel

### Option A — GitHub import (recommended)

1. Extract the ZIP.
2. Create a new GitHub repository and upload the **contents** of this folder (so `package.json` and `app/` are at repository root).
3. In Vercel, choose **Add New → Project** and import that repository.
4. Keep the framework preset as **Next.js**. Vercel should detect the build settings automatically.
5. Click **Deploy**.

### Option B — Vercel CLI

From the project root:

```bash
npm install
npx vercel
```

Follow the prompts to link the project. For a production deployment, run:

```bash
npx vercel --prod
```

## Before publishing

- The résumé page is included at `/resume` and can be printed or saved as PDF from the browser. Verify its contents against your latest résumé before publishing.
- The GitHub links point to `https://github.com/Atharv-Chaudhari`; add direct project repository links where public sharing is permitted.
- Verify the LinkedIn URL, email address, project names, certification titles, dates and reported metrics.
- Confirm all client work is approved for public disclosure. Do not publish client names, private architecture, source code, credentials, or internal screenshots without permission.
- The metrics shown are based on résumé/profile statements and are not independently verified by this template. Keep the context alongside each number or remove it if it cannot be substantiated.
- The Systems Lab contains local simulations and illustrative evaluation scores. It does not call a live AI model or production infrastructure.
- The Future Observatory is explicitly framed as interests and future exploration, not as completed quantum or robotics projects.

## What is included

- `app/page.tsx` — main portfolio and interactions
- `app/resume/page.tsx` — print-friendly résumé page
- `app/globals.css` — responsive UI system, theme variables, motion and layouts
- `app/layout.tsx` — page metadata and document shell
- `public/favicon.svg` — custom AC favicon

## Editing content

Project descriptions and skills are defined near the top of `app/page.tsx` in the `projects`, `categories`, `capabilities`, and `milestones` arrays. The design is componentized in a single client page for easy initial deployment and iteration.

## Notes

- No API keys or database are required for the included experience.
- The light/dark toggle preference is saved in local browser storage.
- `Ctrl/⌘ + K` opens the command palette on desktop.
- Google Fonts are loaded from Google Fonts; a system-font fallback is defined.
