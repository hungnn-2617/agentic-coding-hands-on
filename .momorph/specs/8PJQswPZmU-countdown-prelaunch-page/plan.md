# Implementation Plan: Countdown - Prelaunch Page

**Frame**: `8PJQswPZmU-countdown-prelaunch-page`
**Date**: 2026-04-20
**Spec**: `specs/8PJQswPZmU-countdown-prelaunch-page/spec.md`

---

## Summary

Build a full-screen prelaunch countdown page at `/countdown` showing remaining Days, Hours, and Minutes until the event starts. The page uses server-synced time, glassmorphism digit cards with a self-hosted LED-style "Digital Numbers" font, and auto-redirects to the homepage when the countdown expires or event is already active. No header, no footer — standalone full-screen experience.

**Key technical approach:**
- Standalone route at `app/countdown/` (outside `(main)` route group — no header/footer)
- Server Component for initial data fetch + server-side redirect if event already active
- Client Component for real-time countdown with server-time offset (TR-001)
- New `usePrelaunchCountdown` hook (1s tick with clock offset, distinct from existing `useCountdown` which ticks every 60s and uses client clock)
- New `PrelaunchDigitCard` component (77x123px, opacity on background layer only — distinct from existing homepage `DigitCard` at 51x82px with opacity on entire card)
- Self-hosted "Digital Numbers" font loaded via `next/font/local`
- Mock-first API service — swap to real Supabase queries when backend is ready

---

## Technical Context

**Language/Framework**: TypeScript 5.x / Next.js 16.x (App Router)
**Primary Dependencies**: React 19.x, Tailwind CSS 4.x, Supabase SSR 0.10.x
**Database**: Supabase (PostgreSQL) — reads event configuration
**Testing**: Vitest 4.x + Testing Library (React, DOM, Jest-DOM)
**State Management**: React hooks (local state) + existing LanguageProvider (Context)
**API Style**: REST (predicted endpoints: `GET /prelaunch`, `GET /prelaunch/status`)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case files, PascalCase components, `@/*` path aliases)
- [x] Uses approved libraries and patterns (Next.js App Router, Tailwind, Supabase)
- [x] Adheres to folder structure guidelines (`app/`, `components/`, `hooks/`, `lib/`, `types/`)
- [x] Meets security requirements (auth via existing middleware, no client-exposed secrets)
- [x] Follows testing standards (Vitest + Testing Library, co-located tests)
- [x] Mobile-first responsive design (base → `sm:` → `md:` → `lg:`)
- [x] Default to React Server Components; `"use client"` only where needed (countdown timer)
- [x] Images use `next/image` for optimization
- [x] TypeScript strict mode

**Violations**: None

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based — all prelaunch components in `components/countdown-prelaunch/`
- **Styling Strategy**: Tailwind utilities (mobile-first) with inline `style` for `backdrop-filter` / glassmorphism (not expressible in Tailwind alone)
- **Data Fetching**: Server Component fetches initial prelaunch data, passes `serverTime` + `eventStartDate` to client component. Client hook handles 1s countdown ticks and 30s status polling.
- **Route Structure**: `app/countdown/page.tsx` — standalone route outside `(main)` group. Gets `LanguageProvider` from root layout automatically but NO header/footer.

### Why New Components Instead of Extending Existing

| Existing | Prelaunch Needs | Decision |
|----------|----------------|----------|
| `DigitCard` (51x82px, `opacity-50` on entire card, blur 16.64px) | 77x123px, opacity on background `::before` only, blur 25px | New `PrelaunchDigitCard` — different opacity layer prevents text dimming |
| `useCountdown` (env var, client clock, 60s tick) | Server-time offset, 1s tick, polling, redirect on expiry | New `usePrelaunchCountdown` — fundamentally different data source and update frequency |
| `CountdownTimer` (homepage embedded, gold text "Sắp diễn ra") | Full-screen standalone, white title, different layout | New `CountdownPageClient` — entirely different layout context |

### Backend Approach (Mock-First)

APIs (`GET /prelaunch`, `GET /prelaunch/status`) are predicted/new. Create a service abstraction in `lib/services/prelaunch.ts` that reads event config from `lib/constants.ts` (hardcoded constants, not env vars), and can be swapped to Supabase queries when backend tables are ready.

```typescript
// Mock-first pattern in lib/services/prelaunch.ts
import { EVENT_START_DATE, EVENT_NAME } from '@/lib/constants';

export async function fetchPrelaunchData(): Promise<PrelaunchResponse> {
  // TODO: Replace with Supabase query when backend is ready
  return {
    event_start_date: EVENT_START_DATE,
    server_time: new Date().toISOString(),
    event_status: /* derived from date */ 'prelaunch',
    event_name: EVENT_NAME,
  };
}
```

### Integration Points

| System | How Integrated | Notes |
|--------|----------------|-------|
| Auth (middleware.ts) | Reuse as-is | `/countdown` not in `publicRoutes` → automatically protected |
| i18n (LanguageProvider) | Reuse — add new keys | Root layout wraps all routes in `LanguageProvider` |
| Fonts (root layout) | Extend — add Digital Numbers | Add `next/font/local` alongside existing Montserrat |
| Theme (globals.css) | Reuse existing tokens | `--color-bg-page`, `--color-text-gold`, `--font-digital-numbers` already defined |
| Supabase (lib/supabase/) | Reuse server client | For eventual real API calls |

---

## Project Structure

### New Files

| File | Purpose |
|------|---------|
| `app/countdown/page.tsx` | Server component: fetch prelaunch data, redirect if event active, render client component |
| `app/countdown/layout.tsx` | Route metadata via `generateMetadata` (event name for SEO). No visual layout elements. |
| `app/countdown/loading.tsx` | Suspense skeleton: dark background + pulsing digit card placeholders |
| `app/countdown/error.tsx` | Error boundary: "Coming Soon" fallback with retry button |
| `components/countdown-prelaunch/countdown-page-client.tsx` | `"use client"` — main layout: bg image, gradient overlay, content container, countdown units |
| `components/countdown-prelaunch/prelaunch-digit-card.tsx` | Glassmorphism digit card (77x123px desktop, responsive). `::before` pseudo for background opacity. |
| `components/countdown-prelaunch/countdown-unit.tsx` | Time unit: 2 digit cards + label (DAYS / HOURS / MINUTES) |
| `components/countdown-prelaunch/coming-soon-fallback.tsx` | Error/empty fallback: "Coming Soon" with optional event date text |
| `hooks/use-prelaunch-countdown.ts` | Server-time-synced countdown: computes clock offset, 1s ticks, 30s polling, auto-redirect |
| `lib/services/prelaunch.ts` | Data access: `fetchPrelaunchData()`, `checkLaunchStatus()` — mock-first |
| `types/prelaunch.ts` | `PrelaunchResponse`, `PrelaunchStatusResponse` interfaces |
| `public/fonts/digital-numbers/DigitalNumbers-Regular.woff2` | Self-hosted LED display font |
| `public/images/prelaunch-bg.webp` | Background wave image (exported from Figma) |

### Modified Files

| File | Changes |
|------|---------|
| `app/layout.tsx` | Add `localFont` import for Digital Numbers; add `digitalNumbers.variable` to `<html>` className |
| `lib/i18n/types.ts` | Add 6 new keys to `TranslationKey` union: `'prelaunch.title'`, `'prelaunch.comingSoon'`, `'prelaunch.days'`, `'prelaunch.hours'`, `'prelaunch.minutes'`, `'prelaunch.ariaLabel'` |
| `lib/i18n/locales/vi.ts` | Add Vietnamese translations: `'prelaunch.title': 'Sự kiện sẽ bắt đầu sau'`, etc. |
| `lib/i18n/locales/en.ts` | Add English translations: `'prelaunch.title': 'The event will start in'`, etc. |
| `app/(main)/page.tsx` | Add prelaunch status check at top: `const data = await fetchPrelaunchData(); if (data.event_status === 'prelaunch') redirect('/countdown');` |

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| — | — | No new npm packages needed |

### Blocking Asset Dependencies

| Asset | Source | Status | Fallback |
|-------|--------|--------|----------|
| Digital Numbers font (.woff2) | Self-host from dafont.com / fontsquirrel (DS-Digital or Digital-7) | Not yet sourced | `'Courier New', monospace` via CSS variable fallback |
| Background wave image (.webp) | Export from Figma node `2268:35129` | Not yet exported | Solid `bg-[#00101A]` gradient-only background |

---

## Implementation Strategy

### Phase 0: Asset Preparation

- Source "Digital Numbers" font in .woff2 format (license-compatible for web)
- Export background wave image from Figma as optimized .webp
- Place in `public/fonts/digital-numbers/` and `public/images/`

### Phase 1: Foundation (Setup)

- Create `types/prelaunch.ts` — TypeScript interfaces for API responses
- Create `lib/services/prelaunch.ts` — mock-first data service
- Add Digital Numbers font to root layout via `next/font/local`
- Add i18n keys to `lib/i18n/types.ts`, `locales/vi.ts`, `locales/en.ts`

### Phase 2: Core Countdown Display (US1 — P1)

**Goal**: User sees a working countdown timer with correct remaining time.

- Create `hooks/use-prelaunch-countdown.ts` — server-time offset, 1s ticks
- Create `components/countdown-prelaunch/prelaunch-digit-card.tsx` — glassmorphism card
- Create `components/countdown-prelaunch/countdown-unit.tsx` — digits + label
- Create `components/countdown-prelaunch/countdown-page-client.tsx` — full layout
- Create `app/countdown/page.tsx` — server component entry point (includes `<noscript>` fallback with static event date)
- Create `app/countdown/layout.tsx` — metadata

> **TR-003 / TR-004**: `countdown-page-client.tsx` MUST use `<Image>` from `next/image` with `priority` for the background image (above-fold, skips lazy loading). This satisfies TR-003 (image optimization) and contributes to TR-004 (3s load budget) by enabling automatic format selection and responsive srcset.

**Independent Test**: Navigate to `/countdown` → timer displays correct remaining D/H/M.

### Phase 3: Redirect & Polling Logic (US2 — P1)

**Goal**: User is automatically redirected when countdown expires or event is already active.

- Server-side redirect in `app/countdown/page.tsx`: if `event_status !== 'prelaunch'` → `redirect('/')`
- Client-side redirect on countdown expiry: `useRouter().push('/')` when `isExpired === true`
- Add 30s polling for `GET /prelaunch/status` in `usePrelaunchCountdown` hook
- Handle 401 → redirect to `/login`, 404 → redirect to `/`
- **Incoming redirect**: Add prelaunch status check in `app/(main)/page.tsx` server component — call `fetchPrelaunchData()`, if `event_status === 'prelaunch'` → `redirect('/countdown')`. This covers: (a) post-login redirect (auth callback → `/` → prelaunch check → `/countdown`), and (b) direct homepage access during prelaunch.

**Independent Test**: Set event date to past → server redirects immediately. Set to near-future → countdown reaches zero → client redirects. Visit homepage during prelaunch → redirected to `/countdown`.

### Phase 4: Responsive Design (US3 — P2)

**Goal**: Countdown displays correctly on all screen sizes.

Apply mobile-first responsive classes from design-style.md:

| Breakpoint | Digit Card | Digit Text | Title | Unit Label | Digit Gap | Digit-Label Gap | Unit Gap |
|------------|-----------|------------|-------|------------|-----------|-----------------|----------|
| Base (<640px) | 48x77px | 40px | 20px | 14px | 8px | 8px | 16px |
| sm (640px) | 54x86px | 48px | 24px | 18px | 12px | 12px | 28px |
| md (768px) | 60x96px | 56px | 28px | 24px | 14px | 16px | 40px |
| lg (1024px+) | 77x123px | 73.73px | 36px | 36px | 21px | 21px | 60px |

> **Gap definitions**: Digit Gap = between two digit cards within a unit. Digit-Label Gap = between digit row and unit label (column gap). Unit Gap = between Days/Hours/Minutes blocks.

**Independent Test**: Resize 320px → 1512px → centered, readable, no overflow at all breakpoints.

### Phase 5: Internationalization (US4 — P3)

**Goal**: Title and labels display in the selected language.

- Wire title to `t('prelaunch.title')`
- Wire labels to `t('prelaunch.days')`, `t('prelaunch.hours')`, `t('prelaunch.minutes')`
- (Keys already added in Phase 1)

**Independent Test**: Toggle language → all text updates.

### Phase 6: Polish & Cross-Cutting Concerns

- **Loading state**: Skeleton in `app/countdown/loading.tsx` — dark bg + pulsing card placeholders
- **Error boundary**: `app/countdown/error.tsx` — render `ComingSoonFallback` with retry
- **Retry strategy**: Exponential backoff 5s → 10s → 20s → 40s, max 4 retries
- **`<noscript>` fallback**: Static message with event date/time
- **Accessibility**: `aria-live="polite"` on timer, semantic `<h1>` for title, `<time>` for countdown
- **Animation**: Digit flip/fade on value change (300ms `ease-in-out` via CSS `transition`)
- **Glassmorphism fallback**: `@supports not (backdrop-filter: blur(1px))` → solid `rgba(255,255,255,0.15)`
- **Analytics**: Fire `prelaunch_view`, `prelaunch_countdown_complete`, `prelaunch_redirect` events
- **SEO**: `generateMetadata` with event name in `app/countdown/layout.tsx`
- **Performance (TR-004)**: `<Image priority>` on background (skip lazy load), `next/font/local` with `display: 'swap'`, Server Component pre-fetches data — no client waterfall. Target: Lighthouse >= 90, load < 3s desktop / < 5s mobile 3G.

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Digital Numbers font unavailable / licensing | Medium | High | Use DS-Digital or Digital-7 as alternatives. CSS fallback `'Courier New', monospace` always available via `--font-digital-numbers` variable. |
| Background image not exported from Figma | Medium | High | Solid gradient fallback: `linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%)` on dark background. Mark image slot as placeholder. |
| Backend APIs not ready (`GET /prelaunch`) | High | Medium | Mock-first service reads from `lib/constants.ts`. Swap to Supabase query when backend delivers. |
| `backdrop-filter` unsupported | Low | Low | `@supports not` fallback documented in design-style.md. Graceful degradation to solid bg. |
| Clock drift between server and client | Low | Medium | TR-001 clock offset (`server_time - Date.now()`) re-syncs on each 30s poll cycle. |
| Days > 99 overflow (two digit cards) | Low | Low | Clamp display to 99 and log warning. Edge case documented in spec. |

### Estimated Complexity

- **Frontend**: Medium (glassmorphism, responsive across 4 breakpoints, font loading, server-time sync)
- **Backend**: Low (two simple GET endpoints, mock-first)
- **Testing**: Medium (timer logic with fake timers, redirect flows, responsive visual)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: Hook provides countdown values → components render digit cards
- [x] **External dependencies**: Supabase auth (mocked), prelaunch API (mocked)
- [x] **User workflows**: Load page → see countdown → countdown expires → auto-redirect

### Mocking Strategy

| Dependency | Strategy | Rationale |
|------------|----------|-----------|
| Supabase auth | Mock | Isolate auth logic from countdown behavior |
| Prelaunch API (`lib/services/prelaunch.ts`) | Mock | Backend not ready; control all response scenarios |
| `Date.now()` / timers | `vi.useFakeTimers()` | Deterministic countdown testing |
| `next/navigation` (`redirect`, `useRouter`) | Mock | Verify redirect calls without actual navigation |

### Test Scenarios

**Happy Path:**
- [ ] Page renders countdown with correct D/H/M from mock API response
- [ ] Timer ticks correctly at 1s intervals (fake timers advance 60s → minutes decrement)
- [ ] Midnight rollover: 1d 0h 0m → 0d 23h 59m
- [ ] Language switch updates title and unit labels

**Error Handling:**
- [ ] API 401 → redirect to `/login`
- [ ] API 404 → redirect to `/`
- [ ] API 500 → render "Coming Soon" fallback
- [ ] Network error → keep last countdown values, retry with backoff

**Edge Cases:**
- [ ] Event already past → server-side redirect (never renders countdown)
- [ ] Countdown reaches zero → client-side redirect to `/`
- [ ] Days > 99 → display clamped to 99
- [ ] `EVENT_START_DATE` constant is empty → fallback or redirect

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| `usePrelaunchCountdown` hook logic | 90%+ | High |
| Component rendering (digit card, unit, page) | 80%+ | High |
| Redirect flows (server + client) | 90%+ | High |
| Responsive layout | Visual / manual | Medium |
| Animation | Manual | Low |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed
- [x] `spec.md` reviewed and approved
- [x] `design-style.md` reviewed
- [ ] Digital Numbers font file sourced (.woff2)
- [ ] Background wave image exported from Figma (.webp)

### External Dependencies

- Backend API endpoints (`GET /prelaunch`, `GET /prelaunch/status`) — handled by mock-first approach; not blocking
- Figma background image asset — placeholder gradient fallback available; not blocking

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate detailed task breakdown
2. **Source assets** (Phase 0) — can proceed in parallel with Phase 1
3. **Begin** Phase 1 (foundation) immediately — no blockers
4. **Review** tasks.md for parallelization opportunities

---

## Notes

- The existing homepage `CountdownTimer`, `DigitCard`, and `useCountdown` serve a different design context. Creating separate prelaunch components avoids regressions on the homepage while allowing each to evolve independently.
- The `--font-digital-numbers` CSS variable is already referenced in `globals.css` `@theme inline` block but the font is not yet loaded. Adding `next/font/local` in the root layout completes this existing setup.
- Event configuration (date, venue, name) is defined in `lib/constants.ts` instead of env vars, making it simpler to manage and avoiding env-related issues.
- No new npm packages are required — the entire feature builds on existing Next.js, React, Tailwind, and Supabase infrastructure.
- **Global state gap**: The spec defines `eventStatus` in `appStore` (Write) for other screens to consume. The codebase currently has no global state store (no zustand/Redux). For this feature, the prelaunch status is checked server-side at the route level (homepage redirects to `/countdown` if prelaunch). If a global store is introduced later, `eventStatus` should be published there.
