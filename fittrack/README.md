# FitTrack — Fitness & Wellness Platform

A premium frontend assessment project for **Wexa AI** (Jr Frontend Developer). FitTrack features a polished landing page, a 5-step onboarding/auth flow, and a post-login dashboard with mock data.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)

## Live Demo

> Deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) and add your URL here before submitting.

```bash
# Quick deploy (Vercel CLI)
npm i -g vercel
vercel
```

## Screenshots

Add screenshots to `/docs/screenshots/` before submission:

1. Landing page — desktop
2. Landing page — mobile (375px)
3. Auth flow — step 1 & step 3
4. Dashboard — desktop

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| UI | Shadcn-style components (Radix primitives) |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Routing | React Router v7 |
| State | Zustand (persisted auth & theme) |
| Charts | Recharts |
| i18n | i18next (English + Hindi) |
| Icons | Lucide React |

## Features

### Landing Page (Must Have)
- Sticky navbar (transparent → solid on scroll) + mobile slide-in drawer
- Hero with animated gradient background & CTAs
- Social proof, features, how-it-works (3 steps)
- Testimonials grid, pricing (Free / Pro / Elite), email CTA, footer

### 5-Step Auth Flow (Must Have)
1. Create account — password strength, Google button, validation
2. Personal details — DOB, gender pills, height/weight sliders + kg/lbs toggle
3. Fitness goals — select 1–3 visual cards
4. Activity level — radio-style cards + skip
5. Profile setup — avatar upload, username, bio, notification toggles + confetti success

### Dashboard (Should Have)
- Welcome header with avatar
- Stats cards, today's workout checklist, weekly bar chart
- Quick actions, sidebar (desktop) + bottom tab bar (mobile)

### Bonus
- Dark mode toggle with smooth theme transitions
- Scroll-triggered animations (Framer Motion `inView`)
- i18n: English + Hindi

## Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### Installation

```bash
cd fittrack
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable primitives (Button, Card, Input…)
│   ├── landing/      # Landing page sections
│   ├── auth/         # Onboarding step components
│   ├── dashboard/    # Dashboard widgets
│   └── shared/       # Theme toggle, i18n, scroll reveal
├── pages/            # Route-level pages
├── store/            # Zustand stores (auth, theme, onboarding)
├── i18n/             # Translations (en, hi)
└── lib/              # Utils, schemas, constants
```

See [COMPONENTS.md](./COMPONENTS.md) for architecture notes.

## Design Decisions

- **Typography:** Plus Jakarta Sans for a modern, friendly SaaS feel
- **Colors:** Emerald primary (`#10b981`) with amber accent — energetic but trustworthy
- **Motion:** Subtle Framer Motion on scroll and step transitions; confetti on onboarding complete
- **Data:** Mock stats + `localStorage` persistence via Zustand — no backend required
- **Accessibility:** ARIA labels on icon buttons, focus rings, semantic form labels, inline validation errors

## Deployment (Vercel)

1. Push this repo to GitHub (public)
2. Import project in Vercel → root directory: `fittrack`
3. Build command: `npm run build` | Output: `dist`
4. Add `vercel.json` rewrite for SPA routing (included)

## Author

**Priyanshu Raj** — Wexa AI Jr Frontend Developer Assessment
