# Component Architecture — FitTrack

## Principles

1. **Feature folders** — Components grouped by domain (`landing/`, `auth/`, `dashboard/`, `ui/`, `shared/`)
2. **Small, focused files** — Each section/step is its own component (~50–150 lines)
3. **Props-driven UI** — Variants via `class-variance-authority` on `Button`; composition via Radix `Slot`
4. **Colocated validation** — Zod schemas in `lib/schemas.ts`, consumed by React Hook Form resolvers

## Reusable Patterns

### `ui/` — Design System Primitives

| Component | Purpose |
|-----------|---------|
| `Button` | CVA variants: default, outline, ghost, accent; sizes sm/default/lg/icon |
| `Card` | Header, title, description, content slots |
| `Input` | `error` prop toggles destructive border |
| `Progress` | Radix progress for onboarding bar |
| `Switch`, `Slider`, `Avatar` | Form controls for profile step |

### `shared/`

| Component | Pattern |
|-----------|---------|
| `ScrollReveal` | Framer `useInView` + fade/slide — used across landing sections |
| `ThemeToggle` | Zustand + `document.documentElement.classList` |
| `LanguageSwitcher` | i18next `changeLanguage` + localStorage |
| `ProtectedRoute` | Auth guard for `/dashboard` |

### State (Zustand)

| Store | Responsibility |
|-------|----------------|
| `authStore` | User profile, `persist` to localStorage |
| `themeStore` | light/dark, synced to `<html class="dark">` |
| `onboardingStore` | Current step index (ephemeral) |

### Auth Flow Composition

`AuthPage` orchestrates steps; each `StepN*.tsx` is a self-contained form that calls `onSubmit` with validated data. Parent handles navigation, persistence, and confetti on complete.

### Landing Composition

`LandingPage` is a thin layout shell importing section components. No business logic in the page — sections own their content and animations.

## Extension Points

- Add API layer: replace `setUser`/`updateUser` with fetch calls in step submit handlers
- Add Storybook: stories for `ui/Button`, `ui/Card`, and `StepIndicator`
- Code-split dashboard: `React.lazy(() => import('@/pages/DashboardPage'))`
