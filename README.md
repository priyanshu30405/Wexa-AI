# FitTrack

**A premium fitness & wellness platform** — landing page, 5-step onboarding, and interactive dashboard. Built as the frontend assessment submission for the **Jr Frontend Developer** role at **Wexa AI**.

<p align="center">
  <a href="#live-demo">Live Demo</a> ·
  <a href="#features">Features</a> ·
  <a href="#getting-started">Setup</a> ·
  <a href="#design-decisions">Design</a> ·
  <a href="./fittrack/COMPONENTS.md">Architecture</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind v4" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Framer_Motion-animations-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

---

## Live Demo

| | Link |
|---|------|
| **Production** | _Add your Vercel/Netlify URL here after deploy_ |
| **Repository** | [github.com/priyanshu30405/Wexa-AI](https://github.com/priyanshu30405/Wexa-AI) |

> **Deploy on Vercel:** Use the repo root (Root Directory = empty). Root `vercel.json` builds `fittrack/` automatically. Do **not** set Root Directory to `fittrack` if using the root config.

---

## Preview

<p align="center">
  <img src="./fittrack/docs/screenshots/landing-desktop.png" alt="FitTrack landing page — hero with workout, nutrition, and progress preview cards" width="900" />
  <br />
  <em>Landing page — hero section with live product preview (Workouts, Nutrition, Progress)</em>
</p>

<details>
<summary>More screenshots (optional — add PNGs to <code>fittrack/docs/screenshots/</code>)</summary>

<br />

| Landing (mobile) | Auth flow | Dashboard |
|------------------|-----------|-----------|
| ![Mobile](./fittrack/docs/screenshots/landing-mobile.png) | ![Auth](./fittrack/docs/screenshots/auth-step1.png) | ![Dashboard](./fittrack/docs/screenshots/dashboard-home.png) |

</details>

---

## About the project

FitTrack is a fictional fitness SaaS product focused on **UI/UX polish**, **responsive design**, and **clean frontend architecture**. The app uses **mock data** and **localStorage** (via Zustand persist) — no backend is required for the assessment.

### What you can try

1. **Landing** — scroll sections, **Watch Demo** video modal, pricing, dark mode, EN/हि language toggle  
2. **Sign up** — 5-step onboarding with validation, Google demo sign-in, confetti on completion  
3. **Dashboard** — stats, workouts, log meals, progress charts, settings, mobile bottom nav  

---

## Features

### Landing page

| Section | Highlights |
|---------|------------|
| **Navbar** | Sticky; transparent → solid on scroll; mobile slide-in drawer |
| **Hero** | Animated gradient; **Get Started Free** + **Watch Demo** (video modal); product preview cards with real mock UI |
| **Social proof** | Brand trust strip |
| **Features** | 4 cards with icons and hover effects |
| **How it works** | 3-step flow (Sign up → Set goals → Track progress) |
| **Testimonials** | Review grid with ratings |
| **Pricing** | Free / Pro / Elite — **Popular** badge on Pro |
| **CTA** | Email capture on gradient background |
| **Footer** | Links, social icons, newsletter |

### 5-step onboarding (`/auth`)

| Step | Details |
|------|---------|
| 1 | Full name, email, password strength bar, confirm password, **Sign up with Google** (account picker) |
| 2 | Date of birth, gender pills, height/weight sliders, kg/lbs toggle |
| 3 | Select 1–3 fitness goals (visual cards + checkmarks) |
| 4 | Activity level (radio cards); **Skip for now** |
| 5 | Avatar upload (drag & drop), username, bio, notification toggles → **Welcome + confetti** |

- Progress bar: **Step X of 5** with animated fill  
- Slide transitions between steps (Framer Motion)  
- Real-time validation (React Hook Form + Zod); Continue disabled until valid  

### Dashboard (`/dashboard`)

| Route | Content |
|-------|---------|
| `/dashboard` | Stats row, quick actions, today’s workout, weekly activity chart |
| `/dashboard/workouts` | Workout plans, start/end session |
| `/dashboard/nutrition` | Log meals form + daily calorie list |
| `/dashboard/progress` | Goal progress bars, chart, milestones |
| `/dashboard/settings` | Profile, notifications, theme, language, log out |

- **Desktop:** sidebar navigation  
- **Mobile:** bottom tab bar  

### Bonus features

- Dark / light theme (persisted)  
- Scroll-triggered section animations (`useInView`)  
- **i18n:** English + Hindi  

---

## Tech stack

| Layer | Tools |
|-------|--------|
| **Core** | React 19, TypeScript, Vite 8 |
| **Styling** | Tailwind CSS v4, CSS variables, Plus Jakarta Sans |
| **UI** | Shadcn-style components (Radix UI primitives, CVA) |
| **Animation** | Framer Motion, canvas-confetti |
| **Forms** | React Hook Form, Zod, `@hookform/resolvers` |
| **Routing** | React Router v7 |
| **State** | Zustand + persist (auth, theme) |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **i18n** | i18next, react-i18next |

---

## Getting started

### Prerequisites

- **Node.js** 20 or later  
- **npm** 10 or later  

### Install & run

```bash
git clone https://github.com/priyanshu30405/Wexa-AI.git
cd Wexa-AI/fittrack

npm install
npm run dev
```

Open **http://localhost:5173** (or the port Vite prints in the terminal).

### Other scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Project structure

```
Wexa-AI/
├── README.md                 # This file (shown on GitHub)
└── fittrack/                 # React application
    ├── public/
    ├── docs/screenshots/     # README images
    ├── src/
    │   ├── components/       # ui, landing, auth, dashboard, shared
    │   ├── pages/
    │   ├── store/
    │   ├── i18n/
    │   └── lib/
    ├── COMPONENTS.md
    ├── vercel.json
    └── package.json
```

Detailed patterns → **[fittrack/COMPONENTS.md](./fittrack/COMPONENTS.md)**

---

## Design decisions

| Topic | Choice | Rationale |
|-------|--------|-----------|
| **Typography** | Plus Jakarta Sans | Modern SaaS feel, strong hierarchy |
| **Color** | Emerald primary + amber accent | Energy, health, and trust |
| **Layout** | Mobile-first breakpoints | 375px / 768px / 1440px+ |
| **Motion** | Subtle scroll + step transitions | Polish without distraction |
| **Data** | Zustand + `localStorage` | Mock data per assessment guidelines |
| **Google auth** | Demo account picker | No OAuth keys; realistic UX |
| **Accessibility** | Focus rings, ARIA labels, inline errors | Meets a11y criteria |

---

## Assessment checklist

| Requirement | Status |
|-------------|--------|
| Landing page (all sections, responsive, animations) | Done |
| 5-step auth flow (progress, validation, mobile-friendly) | Done |
| Component architecture & reusable UI | Done |
| Dashboard with mock data | Done |
| React + Vite + Tailwind + Shadcn-style UI | Done |
| Framer Motion + form validation (RHF + Zod) | Done |
| i18n (English + second language) | Done (Hindi) |
| Dark mode | Done |
| Component documentation | [COMPONENTS.md](./fittrack/COMPONENTS.md) |
| Public GitHub repo | Done |
| Live deploy (Vercel/Netlify) | Add URL in [Live Demo](#live-demo) |
| Screenshots in README | `landing-desktop.png` included |

---

## Deployment

### Vercel (recommended)

1. Import [this repository](https://github.com/priyanshu30405/Wexa-AI) on Vercel.  
2. **Root Directory:** leave **empty** (repository root).  
3. Vercel reads root `vercel.json` → builds `fittrack/` → output `fittrack/dist`.  
4. Redeploy after pushing config fixes, then add the URL to [Live Demo](#live-demo) above.

**If you see 404:** Settings → General → Root Directory must be empty, then **Redeploy**.

---

## Author

**Priyanshu Raj**  
Jr Frontend Developer Assessment — **Wexa AI**

---

<p align="center">
  <sub>Built with care for pixel-perfect UI, smooth interactions, and maintainable code.</sub>
</p>
