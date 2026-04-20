# Tasks: Countdown - Prelaunch Page

**Frame**: `8PJQswPZmU-countdown-prelaunch-page`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)
**Generated**: 2026-04-20

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path
```

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks in this batch)
- **[Story]**: Which user story this belongs to (US1, US2, US3, US4)

---

## Phase 1: Setup (Asset Preparation)

**Purpose**: Source and place required assets before any code work begins.

- [x] T001 [P] Source Digital Numbers LED font (.woff2) and place at `public/fonts/digital-numbers/DigitalNumbers-Regular.woff2` — use DS-Digital or Digital-7 if "Digital Numbers" exact font is unavailable. Must be license-compatible for web use. If font cannot be sourced, create a placeholder note and proceed (fallback `'Courier New', monospace` is defined in CSS).
- [x] T002 [P] Export background wave image from Figma (node `2268:35129`) as optimized .webp and place at `public/images/prelaunch-bg.webp`. If Figma export is not available, create a 1x1 placeholder image and proceed (gradient-only fallback covers the visual).

**Checkpoint**: Assets in place (or placeholders documented). Code work can begin.

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Core types, services, font loading, and i18n keys that ALL user stories depend on.

**CRITICAL**: No user story work can begin until this phase is complete.

- [x] T003 [P] Create TypeScript interfaces for prelaunch API responses in `types/prelaunch.ts` — define `PrelaunchResponse` (`event_start_date: string`, `server_time: string`, `event_status: 'prelaunch' | 'active' | 'ended'`, `event_name: string`) and `PrelaunchStatusResponse` (`launched: boolean`). Follow existing pattern in `types/events.ts`.
- [x] T004 Create mock-first prelaunch data service in `lib/services/prelaunch.ts` — implement `fetchPrelaunchData(): Promise<PrelaunchResponse>` reading from `EVENT_START_DATE` env var (returns `server_time` as `new Date().toISOString()`, hardcoded `event_status: 'prelaunch'`). Implement `checkLaunchStatus(): Promise<PrelaunchStatusResponse>` returning `{ launched: false }`. Import types from `@/types/prelaunch`. Add `// TODO: Replace with Supabase query` comments.
- [x] T005 [P] Load Digital Numbers font via `next/font/local` in `app/layout.tsx` — import `localFont` from `next/font/local`, create `digitalNumbers` variable pointing to `public/fonts/digital-numbers/DigitalNumbers-Regular.woff2` with `variable: '--font-digital-numbers'`, `display: 'swap'`. Add `digitalNumbers.variable` to `<html>` className alongside existing `montserrat.variable`. If font file doesn't exist yet (placeholder), use a try-catch or conditional load pattern.
- [x] T006 [P] Add 6 prelaunch translation keys to `TranslationKey` union type in `lib/i18n/types.ts` — add: `'prelaunch.title'`, `'prelaunch.comingSoon'`, `'prelaunch.days'`, `'prelaunch.hours'`, `'prelaunch.minutes'`, `'prelaunch.ariaLabel'`. Place in a `// Prelaunch` comment group after the existing `// Countdown` group.
- [x] T007 [P] Add Vietnamese prelaunch translations in `lib/i18n/locales/vi.ts` — add: `'prelaunch.title': 'Sự kiện sẽ bắt đầu sau'`, `'prelaunch.comingSoon': 'Sắp diễn ra'`, `'prelaunch.days': 'Ngày'`, `'prelaunch.hours': 'Giờ'`, `'prelaunch.minutes': 'Phút'`, `'prelaunch.ariaLabel': '{days} ngày, {hours} giờ, {minutes} phút cho đến sự kiện'`.
- [x] T008 [P] Add English prelaunch translations in `lib/i18n/locales/en.ts` — add: `'prelaunch.title': 'The event will start in'`, `'prelaunch.comingSoon': 'Coming soon'`, `'prelaunch.days': 'Days'`, `'prelaunch.hours': 'Hours'`, `'prelaunch.minutes': 'Minutes'`, `'prelaunch.ariaLabel': '{days} days, {hours} hours, {minutes} minutes until event'`.

**Checkpoint**: Foundation ready — types exist, service callable, font loaded, i18n keys defined. User story implementation can begin.

---

## Phase 3: User Story 1 — View Event Countdown (Priority: P1) MVP

**Goal**: User visits `/countdown` and sees a working countdown timer with correct remaining Days, Hours, and Minutes displayed in glassmorphism digit cards on a full-screen dark background.

**Independent Test**: Navigate to `/countdown` → countdown timer displays correct remaining D/H/M matching the configured event start date. Background image + gradient overlay visible. LED-style digit font renders.

- [x] T009 [P] [US1] Create `PrelaunchDigitCard` component in `components/countdown-prelaunch/prelaunch-digit-card.tsx` — accepts `digit: string` prop. Renders a 77x123px card (lg breakpoint) with: `border-radius: 12px`, `border: 0.75px solid #FFEA9E`, `backdrop-filter: blur(25px)`. Background opacity 0.5 MUST be on a `::before` pseudo-element or inner `<div>` (NOT the card itself) so digit text stays fully opaque. Background gradient: `linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%)`. Digit text: `font-family: var(--font-digital-numbers)`, `font-size: 73.73px`, white, absolutely centered. Include `@supports not (backdrop-filter: blur(1px))` fallback with `background: rgba(255, 255, 255, 0.15)`. Use `suppressHydrationWarning` on digit text span (following existing DigitCard pattern).
- [x] T010 [P] [US1] Create `usePrelaunchCountdown` hook in `hooks/use-prelaunch-countdown.ts` — accepts `{ serverTime: string, eventStartDate: string }` props. On mount: compute `clockOffset = new Date(serverTime).getTime() - Date.now()`. Every 1s via `setInterval`: compute `remaining = new Date(eventStartDate).getTime() - (Date.now() + clockOffset)`, derive `days` (0-99, clamped), `hours` (0-23), `minutes` (0-59) as zero-padded strings. Return `{ days, hours, minutes, isExpired: boolean }`. Clean up interval on unmount. Mark `'use client'`.
- [x] T011 [P] [US1] Create countdown route layout in `app/countdown/layout.tsx` — export `generateMetadata` that returns `{ title: 'Countdown | SAA 2025', description: 'Event countdown' }`. Render `{children}` with no header/footer (standalone page). This file has no visual elements, only metadata.
- [x] T012 [US1] Create `CountdownUnit` component in `components/countdown-prelaunch/countdown-unit.tsx` — accepts `{ value: string, label: string }` props. Split `value` into 2 characters. Render: flex column, `gap: 21px` (digit-label gap). Inside: flex row with `gap: 21px` (digit gap) containing 2 `<PrelaunchDigitCard>` instances. Below: `<span>` with label text in Montserrat Bold 36px, white, uppercase. Mark `'use client'` if using hooks, otherwise keep as server component.
- [x] T013 [US1] Create `CountdownPageClient` component in `components/countdown-prelaunch/countdown-page-client.tsx` — `'use client'` component accepting `{ serverTime: string, eventStartDate: string }`. Uses `usePrelaunchCountdown` hook and `useLanguage` hook. Renders 3-layer layout: (1) `<Image>` from `next/image` with `src="/images/prelaunch-bg.webp"`, `fill`, `priority`, `className="object-cover"`, `alt=""`. (2) Gradient overlay `<div>` with `background: linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%)`. (3) Content section centered with title `<h1>` ("Sự kiện sẽ bắt đầu sau") and `<div role="timer" aria-live="polite">` containing 3 `<CountdownUnit>` instances (Days, Hours, Minutes) in a flex row with `gap: 60px`. Page container: `bg-[#00101A] relative min-h-screen flex items-center justify-center overflow-hidden`.
- [x] T014 [US1] Create countdown server page in `app/countdown/page.tsx` — async Server Component. Import `fetchPrelaunchData` from `@/lib/services/prelaunch`. Fetch data, extract `event_start_date`, `server_time`. Render `<CountdownPageClient serverTime={server_time} eventStartDate={event_start_date} />`. Add `<noscript>` tag with static message: "The event starts on {date}. Please enable JavaScript to see the countdown."

**Checkpoint**: User Story 1 complete — countdown displays and ticks correctly. Independently testable.

---

## Phase 4: User Story 2 — Countdown Reaches Zero (Priority: P1)

**Goal**: When countdown expires (or event already active), user is automatically redirected to the homepage. Users visiting the homepage during prelaunch are redirected to `/countdown`.

**Independent Test**: (1) Set `EVENT_START_DATE` to a past date → visiting `/countdown` server-redirects to `/`. (2) Set to near-future → watch countdown reach zero → client-side redirects to `/`. (3) Visit `/` during prelaunch → redirects to `/countdown`.

- [x] T015 [P] [US2] Add server-side redirect logic in `app/countdown/page.tsx` — after `fetchPrelaunchData()`, check: if `event_status !== 'prelaunch'` or `event_start_date` is in the past, call `redirect('/')` from `next/navigation`. This prevents rendering the countdown when the event is already active. Import `redirect` at top.
- [x] T016 [P] [US2] Add prelaunch redirect check in `app/(main)/page.tsx` — at the top of the `HomePage` server component (before rendering), import and call `fetchPrelaunchData()`. If `event_status === 'prelaunch'`, call `redirect('/countdown')`. This covers post-login redirect and direct homepage access during prelaunch.
- [x] T017 [US2] Add client-side auto-redirect on countdown expiry in `hooks/use-prelaunch-countdown.ts` — import `useRouter` from `next/navigation`. When `isExpired` becomes `true`, call `router.push('/')`. Use a `useEffect` that watches `isExpired`.
- [x] T018 [US2] Add 30s polling for launch status in `hooks/use-prelaunch-countdown.ts` — set up a second `setInterval` (30,000ms) that calls `checkLaunchStatus()` from `@/lib/services/prelaunch`. If response `launched === true`, set `isExpired = true` (triggers redirect from T017). On 401 response, redirect to `/login`. On 404, redirect to `/`. Clean up interval on unmount.

**Checkpoint**: User Story 2 complete — all redirect flows work. Event lifecycle (prelaunch → active) handled seamlessly.

---

## Phase 5: User Story 3 — Responsive Countdown Display (Priority: P2)

**Goal**: Countdown page is readable and visually correct on all devices from 320px to 1512px+.

**Independent Test**: Resize browser from 320px to 1512px and verify: countdown centered, digits readable, no horizontal overflow, background covers viewport at every breakpoint.

Responsive values reference (from design-style.md):

| Breakpoint | Digit Card | Digit Font | Title Font | Label Font | Digit Gap | Label Gap | Unit Gap |
|------------|-----------|------------|------------|------------|-----------|-----------|----------|
| Base | 48x77px | 40px | 20px | 14px | 8px | 8px | 16px |
| sm (640px) | 54x86px | 48px | 24px | 18px | 12px | 12px | 28px |
| md (768px) | 60x96px | 56px | 28px | 24px | 14px | 16px | 40px |
| lg (1024px) | 77x123px | 73.73px | 36px | 36px | 21px | 21px | 60px |

- [x] T019 [P] [US3] Apply mobile-first responsive styles to `PrelaunchDigitCard` in `components/countdown-prelaunch/prelaunch-digit-card.tsx` — base: `w-12 h-[77px]` + `text-[40px]`. Add: `sm:w-[54px] sm:h-[86px] sm:text-[48px]`, `md:w-15 md:h-24 md:text-[56px]`, `lg:w-[77px] lg:h-[123px] lg:text-[73.73px]`. Scale border to `border-[0.5px] sm:border-[0.6px] md:border-[0.65px] lg:border-[0.75px]`.
- [x] T020 [P] [US3] Apply responsive styles to `CountdownUnit` in `components/countdown-prelaunch/countdown-unit.tsx` — digit row gap: `gap-2 sm:gap-3 md:gap-3.5 lg:gap-[21px]`. Column gap (digit-label): `gap-2 sm:gap-3 md:gap-4 lg:gap-[21px]`. Unit label font: `text-sm sm:text-lg md:text-2xl lg:text-4xl`. Unit label font-weight: `font-bold`. Unit label: `uppercase`.
- [x] T021 [P] [US3] Apply responsive styles to `CountdownPageClient` in `components/countdown-prelaunch/countdown-page-client.tsx` — content padding: `px-6 py-12 sm:px-9 sm:py-15 md:px-12 md:py-18 lg:px-36 lg:py-24`. Title: `text-xl sm:text-2xl md:text-[28px] md:leading-9 lg:text-4xl`. Time container gap (between units): `gap-4 sm:gap-7 md:gap-10 lg:gap-15`. Title-content gap: `gap-4 sm:gap-4 md:gap-5 lg:gap-6`.

**Checkpoint**: User Story 3 complete — page looks correct on mobile, tablet, and desktop.

---

## Phase 6: User Story 4 — Internationalization Support (Priority: P3)

**Goal**: Title and unit labels display in the user's selected language.

**Independent Test**: Toggle language selector → title text changes from Vietnamese to English (and vice versa). Unit labels (DAYS/HOURS/MINUTES ↔ Ngày/Giờ/Phút) update accordingly.

- [x] T022 [P] [US4] Wire title text to i18n in `components/countdown-prelaunch/countdown-page-client.tsx` — replace hardcoded title string with `t('prelaunch.title')` from `useLanguage()` hook. The `useLanguage` import should already exist from US1.
- [x] T023 [P] [US4] Wire unit labels to i18n in `components/countdown-prelaunch/countdown-unit.tsx` — change `CountdownUnit` to accept `label` as the translation key result (already passed by parent). Verify that the parent `CountdownPageClient` passes `t('prelaunch.days')`, `t('prelaunch.hours')`, `t('prelaunch.minutes')` as the `label` prop. Also wire `aria-label` on the timer to `t('prelaunch.ariaLabel', { days, hours, minutes })`.

**Checkpoint**: User Story 4 complete — all user-facing text is translatable.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Loading states, error handling, accessibility, animation, analytics — affecting multiple stories.

- [x] T024 [P] Create loading skeleton in `app/countdown/loading.tsx` — render dark background (`bg-[#00101A] min-h-screen flex items-center justify-center`) with 6 pulsing placeholder cards (`animate-pulse bg-white/10 rounded-xl`) in 3 groups of 2, mimicking the countdown layout. Include a pulsing title placeholder above.
- [x] T025 [P] Create `ComingSoonFallback` component in `components/countdown-prelaunch/coming-soon-fallback.tsx` — displays centered "Coming Soon" message (translatable) with optional event date. Includes a "Try Again" button that calls `reset()` (passed as prop for error boundary compatibility). Same dark background styling as the main page.
- [x] T026 Create error boundary in `app/countdown/error.tsx` — `'use client'` component following Next.js error boundary pattern. Accepts `{ error, reset }` props. Renders `<ComingSoonFallback>` with `reset` callback. Log error to console in development.
- [x] T027 Add exponential backoff retry logic to `hooks/use-prelaunch-countdown.ts` — when initial `fetchPrelaunchData` fails or polling `checkLaunchStatus` fails, retry with backoff: 5s → 10s → 20s → 40s (max 4 retries). Track `retryCount` in state. After max retries, set `hasError = true` and stop retrying until next poll cycle (30s) or user-triggered refresh.
- [x] T028 Add `<noscript>` fallback improvement in `app/countdown/page.tsx` — ensure the `<noscript>` block renders a styled message (white text on dark bg) with the actual event date formatted for the default locale. Example: "Sự kiện sẽ bắt đầu vào ngày 01/05/2026 lúc 09:00. Vui lòng bật JavaScript để xem đồng hồ đếm ngược."
- [x] T029 [P] Enhance accessibility in `components/countdown-prelaunch/countdown-page-client.tsx` — ensure `<h1>` for title, `role="timer"` on countdown container, `aria-live="polite"` with `aria-atomic="true"`. Add `aria-label` with full countdown text using `t('prelaunch.ariaLabel', { days, hours, minutes })`. Throttle aria-live updates to every 60s (not every 1s tick) to avoid screen reader spam.
- [x] T030 [P] Add digit flip/fade animation to `components/countdown-prelaunch/prelaunch-digit-card.tsx` — add CSS `transition: transform 300ms ease-in-out, opacity 150ms ease-in` on the digit text. When digit value changes, trigger a brief scale or opacity animation. Use a `key={digit}` approach on the span to trigger React's unmount/mount animation, or use `useEffect` to toggle an `animate` class.
- [x] T031 [P] Verify glassmorphism CSS fallback in `components/countdown-prelaunch/prelaunch-digit-card.tsx` — confirm `@supports not (backdrop-filter: blur(1px))` rule from T009 works correctly. Test in a browser with backdrop-filter disabled. The fallback should show `background: rgba(255, 255, 255, 0.15)` with no blur.
- [x] T032 Add analytics events in `components/countdown-prelaunch/countdown-page-client.tsx` — fire `prelaunch_view` on component mount (with `{ event_id, remaining_time }`), `prelaunch_countdown_complete` when countdown reaches zero (with `{ event_id, user_id }`), `prelaunch_redirect` before redirect (with `{ event_id, destination: '/' }`). Use a generic analytics helper or `console.log` placeholder if no analytics library is configured yet.

**Checkpoint**: All polish complete — production-ready prelaunch countdown page.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)          → No dependencies — start immediately
    ↓
Phase 2 (Foundation)     → Depends on Phase 1 (font file needed for T005)
    ↓
Phase 3 (US1 - P1) MVP  → Depends on Phase 2 (types, service, i18n, font)
    ↓
Phase 4 (US2 - P1)      → Depends on Phase 3 (page.tsx and hook must exist)
    ↓
Phase 5 (US3 - P2)      → Depends on Phase 3 (components must exist to add responsive)
    ↓
Phase 6 (US4 - P3)      → Depends on Phase 3 + Phase 2 (components + i18n keys)
    ↓
Phase 7 (Polish)         → Depends on Phase 3 (core components must exist)
```

> **Note**: Phases 4, 5, 6 all depend on Phase 3 but are independent of EACH OTHER. They can proceed in parallel if team capacity allows.

### Parallel Opportunities Within Phases

**Phase 1**: T001 ∥ T002 (both asset sourcing, fully independent)

**Phase 2**: 
- Batch 1: T003 ∥ T005 ∥ T006 (types, font, i18n types — all independent)
- Batch 2: T004 (after T003), T007 ∥ T008 (after T006, parallel with each other)

**Phase 3 (US1)**:
- Batch 1: T009 ∥ T010 ∥ T011 (digit card, hook, layout — all independent)
- Batch 2: T012 (after T009 — imports DigitCard)
- Batch 3: T013 (after T009, T010, T012 — imports all)
- Batch 4: T014 (after T013 — server page renders client component)

**Phase 4 (US2)**: T015 ∥ T016 (different files), then T017 → T018 (same file, sequential)

**Phase 5 (US3)**: T019 ∥ T020 ∥ T021 (all different files, all independent)

**Phase 6 (US4)**: T022 ∥ T023 (different files)

**Phase 7 (Polish)**: T024 ∥ T025 first, then T026 (after T025). T027, T028 sequential. T029 ∥ T030 ∥ T031 parallel. T032 last.

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete **Phase 1 + Phase 2** (8 tasks) — foundation
2. Complete **Phase 3** (US1, 6 tasks) — core countdown display
3. **STOP AND VALIDATE**: Navigate to `/countdown`, verify timer works with correct D/H/M
4. Deploy MVP if ready

### Incremental Delivery

1. **Phase 1 + 2** → Foundation ready
2. **Phase 3** (US1) → Countdown displays → Test → Deploy
3. **Phase 4** (US2) → Redirects work → Test → Deploy
4. **Phase 5** (US3) → Responsive → Test → Deploy
5. **Phase 6** (US4) → i18n → Test → Deploy
6. **Phase 7** → Polish → Final test → Deploy

### Full Delivery

Complete all phases (32 tasks) for production-ready feature.

---

## Summary

| Metric | Value |
|--------|-------|
| **Total tasks** | 32 |
| **Phase 1 (Setup)** | 2 tasks |
| **Phase 2 (Foundation)** | 6 tasks |
| **Phase 3 (US1 - MVP)** | 6 tasks |
| **Phase 4 (US2)** | 4 tasks |
| **Phase 5 (US3)** | 3 tasks |
| **Phase 6 (US4)** | 2 tasks |
| **Phase 7 (Polish)** | 9 tasks |
| **Parallel opportunities** | 17 of 32 tasks marked [P] |
| **MVP scope** | Phase 1 + 2 + 3 = 14 tasks |

---

## Notes

- Commit after each completed task or logical group of tasks.
- Run `npm run lint` and `npx tsc --noEmit` after each phase to catch errors early.
- The constitution mandates TDD — write tests before implementation if following strict TDD. Test tasks are not included here but should follow the test scenarios defined in plan.md's Integration Testing Strategy section.
- Update spec.md if requirements change during implementation.
- Mark tasks complete as you go: `- [x]`
