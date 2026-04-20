# Tasks: Homepage SAA

**Frame**: `i87tDx10uM-homepage-saa`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path
```

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this belongs to (US1, US2, etc.)
- **|**: File path affected by this task

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Download assets, configure fonts, extend theme, create types and hooks.

- [x] T001 Download Figma media assets (hero bg, award thumbnails, kudos bg, logos) to `public/images/` via `get_media_files` tool | public/images/
- [ ] T002 Source and add custom font files Digital Numbers and SVN-Gotham | public/fonts/DigitalNumbers-Regular.ttf, public/fonts/SVN-Gotham.ttf
- [ ] T003 Update root layout — add `localFont` imports for Digital Numbers and SVN-Gotham; add `Montserrat_Alternates` from `next/font/google`; expose CSS variables `--font-digital-numbers`, `--font-svn-gotham`, `--font-montserrat-alternates` | app/layout.tsx
- [x] T004 Extend globals.css — add all design tokens from design-style.md (colors: `--color-text-gold: #FFEA9E`, `--color-header-bg: rgba(16,20,23,0.80)`, `--color-divider: #2E3940`, `--color-border: #998C5F`, `--color-notification-badge: #D4271D`, `--color-kudos-card-bg: #0F0F0F`, `--color-kudos-decorative: #DBD1C1`, `--color-glow: #FAE287`, `--color-secondary-btn-bg: rgba(255,234,158,0.10)`; gradients, shadows, effects). Map all to Tailwind theme via `@theme inline` block | app/globals.css
- [x] T005 [P] Create AwardCategory interface (`id`, `name`, `slug`, `description`, `thumbnailUrl`, `displayOrder`) | types/awards.ts
- [x] T006 [P] Create EventConfig interface (`datetime`, `venue`, `livestreamNote`) | types/events.ts
- [x] T007 Create static `AWARD_CATEGORIES` array — 6 items with names, slugs, descriptions, thumbnail paths from `public/images/awards/`. This is the fallback data source until the API is ready (TR-007) | lib/data/awards.ts
- [x] T008 [P] Add environment variables `EVENT_VENUE` and `EVENT_LIVESTREAM_NOTE` to `.env.local` and document all homepage env vars in `.env.local.example` | .env.local, .env.local.example
- [ ] T009 [TDD] Write tests for `useCountdown` hook — test: calculates remaining days/hours/minutes from `EVENT_START_DATE`, zero-pads values to 2 digits, returns `isExpired=true` when past target date, returns all zeros when env var is missing, cleans up interval on unmount | hooks/__tests__/use-countdown.test.ts
- [x] T010 Implement `useCountdown` hook to pass T009 tests — `setInterval` every 60s, parse ISO-8601 date, compute diff, return `{ days, hours, minutes, isExpired }` | hooks/use-countdown.ts
- [ ] T011 [P] [TDD] Write tests for `useClickOutside` hook — test: calls callback when clicking outside ref element, does NOT call callback on inside click, cleans up listener on unmount | hooks/__tests__/use-click-outside.test.ts
- [x] T012 [P] Implement `useClickOutside` hook to pass T011 tests — extract pattern from existing `LanguageSelector`, accept `ref` and `callback` params | hooks/use-click-outside.ts

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Establish `(main)` route group and route-level files. BLOCKS all user story work.

**Depends on**: Phase 1 complete

- [x] T013 Delete the placeholder redirect page | app/page.tsx (DELETE)
- [x] T014 Create `(main)` route group layout — Server Component composing `<MainHeader>` + `<main id="main-content">{children}</main>` + `<MainFooter>`. Fetch user session via `lib/supabase/server.ts` and pass `user`/`isAdmin` props to header components. Export route-group `metadata`. WidgetButton will be added in Phase 9 | app/(main)/layout.tsx
- [x] T015 Create homepage stub page — Server Component rendering a placeholder. Export page-specific `metadata: { title: 'Homepage \| SAA 2025', description: 'Sun* Annual Awards 2025 - ROOT FURTHER' }` | app/(main)/page.tsx
- [x] T016 [P] Create route-level loading skeleton — dark background with pulsing placeholder shapes | app/(main)/loading.tsx
- [x] T017 [P] Create route-level error boundary — error message + retry button, styled per dark theme | app/(main)/error.tsx
- [x] T018 [P] Create route-level 404 page | app/(main)/not-found.tsx
- [x] T019 [P] Create icon components: `BellIcon` (24x24 SVG), `ArrowRightIcon` (24x24 SVG), `UserIcon` (24x24 SVG), `HamburgerIcon` (24x24 SVG), `PenIcon` (24x24 SVG), `SaaSmallIcon` (20x18 SVG) — follow existing icon pattern from `components/icons/google-icon.tsx` | components/icons/bell-icon.tsx, arrow-right-icon.tsx, user-icon.tsx, hamburger-icon.tsx, pen-icon.tsx, saa-small-icon.tsx
- [x] T020 Update icons barrel export with all new icons | components/icons/index.ts

**Checkpoint**: Route group established — user story implementation can now begin

---

## Phase 3: US3 - Navigate via Header & CTA Buttons (Priority: P1) 🎯 MVP

**Goal**: Full header and footer navigation with correct active states. Users can navigate between all main sections.

**Independent Test**: Verify header nav links show correct active state, footer links navigate correctly, all elements keyboard-accessible with `#FFEA9E` focus outline.

### Tests (US3)

- [ ] T021 [TDD] [US3] Write NavLink test — renders selected state (gold `#FFEA9E` text, border-bottom), renders normal state (white text), renders correct `href`, applies focus outline | components/ui/__tests__/nav-link.test.tsx
- [ ] T022 [TDD] [US3] Write MainHeader test — renders SAA logo, renders 3 nav links ("About SAA 2025", "Awards Information", "Sun* Kudos"), shows correct active state based on mocked `usePathname` | components/ui/__tests__/main-header.test.tsx
- [ ] T023 [TDD] [US3] Write MainFooter test — renders logo (69x64px), renders 4 nav links (including "Tieu chuan chung"), renders copyright "Ban quyen thuoc ve Sun* © 2025" with Montserrat Alternates font | components/ui/__tests__/main-footer.test.tsx

### Implementation (US3)

- [x] T024 [US3] Build NavLink component — accepts `href`, `label`, `active` props. Renders `<Link>` with 3 visual states per design-style.md: Normal (white text, transparent bg, 4px radius), Hover (`bg-white/10`), Selected (gold `#FFEA9E` text, `border-bottom: 1px solid #FFEA9E`, text-shadow golden glow). Focus: `2px solid #FFEA9E` outline. Font: Montserrat 16px/24px 700 | components/ui/nav-link.tsx
- [x] T025 [US3] Build NavLinks client wrapper — `"use client"` using `usePathname()` to determine active route. Renders 3 NavLink components: "About SAA 2025" → `/`, "Awards Information" → `/awards-information`, "Sun* Kudos" → `/sun-kudos`. Hidden on mobile (`hidden sm:flex`), replaced by hamburger | components/ui/nav-links.tsx
- [x] T026 [US3] Build MainHeader — **Server Component** shell. Layout: Logo (left, 52x48px), NavLinks client wrapper (center, gap 64px from logo), right group (gap 16px): LanguageSelector, NotificationBell, ProfileDropdown. Sticky `top-0 z-50`, bg `rgba(16,20,23,0.80)`, height 80px, padding `12px 144px`. HamburgerIcon visible only on mobile | components/ui/main-header.tsx
- [x] T027 [US3] Build MainFooter — **Server Component**. Layout: flex justify-between items-center. Logo (69x64px), 4 NavLinks row (gap 48px): "About SAA 2025", "Awards Information", "Sun* Kudos", "Tieu chuan chung". Copyright: Montserrat Alternates 16px/24px 700. `border-top: 1px solid #2E3940`, padding `40px 90px`. Footer link states: same as header nav (hover bg-white/10, active gold bg + text-shadow) | components/ui/main-footer.tsx
- [x] T028 [US3] Update UI barrel export — add MainHeader, MainFooter, NavLink, NavLinks | components/ui/index.ts
- [x] T029 [US3] Wire MainHeader and MainFooter into layout — replace stub content in `app/(main)/layout.tsx` with actual `<MainHeader>` (passing user/isAdmin/unreadCount props) and `<MainFooter>` | app/(main)/layout.tsx
- [ ] T030 [US3] Verify: header shows correct active state for `/`, nav links navigate, footer links work, keyboard Tab reaches all interactive elements, `#FFEA9E` focus outline visible

**Checkpoint**: Navigation complete — header and footer functional on all `(main)` pages

---

## Phase 4: US1 - View Homepage & Event Countdown (Priority: P1) 🎯 MVP

**Goal**: Hero banner with live countdown timer, event info, and CTA buttons. This is the first thing users see.

**Independent Test**: Navigate to homepage, see "ROOT FURTHER" banner, countdown updates every 60s, event date/venue shown, CTA buttons navigate to correct pages.

### Tests (US1)

- [ ] T031 [TDD] [US1] Write CountdownTimer test — renders 6 digit cards (2 per unit), shows "Coming soon" label when `isExpired=false`, hides "Coming soon" when `isExpired=true`, has `aria-live="polite"` region, renders unit labels "DAYS"/"HOURS"/"MINUTES", uses `suppressHydrationWarning` | components/homepage/__tests__/countdown-timer.test.tsx

### Implementation (US1)

- [x] T032 [P] [US1] Build DigitCard — Server Component, pure visual. Props: `digit: string`. Frosted-glass card: `51.2x81.92px`, `border-radius: 8px`, `border: 0.5px solid #FFEA9E`, background gradient (white 0% → white/10 100%), `opacity: 0.5`, `backdrop-filter: blur(16.64px)`. Digit text: Digital Numbers font `49.15px`, white | components/homepage/digit-card.tsx
- [x] T033 [US1] Build CountdownTimer — `"use client"`. Uses `useCountdown` hook. Renders: "Coming soon" label (Montserrat 24px/32px 700, gold `#FFEA9E`, hidden when expired). Timer row (flex, gap 40px): 3 units, each with 2 DigitCards + unit label. `suppressHydrationWarning` on digit elements. `aria-live="polite"` with descriptive `aria-label` | components/homepage/countdown-timer.tsx
- [x] T034 [P] [US1] Build EventInfo — Server Component. Reads `process.env.EVENT_START_DATE`, `EVENT_VENUE`, `EVENT_LIVESTREAM_NOTE`. Renders: info row (flex, gap 60px) with "Thoi gian:" label (16px 700 white) + formatted date value (24px 700 gold), "Dia diem:" label + venue value. Livestream note below (16px 700 white) | components/homepage/event-info.tsx
- [x] T035 [P] [US1] Build CTAButtons — Two `<Link>` elements. Primary "ABOUT AWARDS" → `/awards-information`: gold bg `#FFEA9E`, dark text `#00101A`, 276x60px, radius 8px, Montserrat 22px/28px 700, ArrowRightIcon. Secondary "ABOUT KUDOS" → `/sun-kudos`: bg `rgba(255,234,158,0.10)`, border `1px solid #998C5F`, white text. **Hover swaps styles** between primary/secondary via CSS transition 200ms. Gap 40px between buttons | components/homepage/cta-buttons.tsx
- [x] T036 [US1] Build HeroSection — Server Component composing: background image via `next/image` (priority, fill, `object-cover`), gradient overlay (`linear-gradient(12deg, #00101A 23.7%, rgba(0,18,29,0.46) 38.34%, rgba(0,19,32,0) 48.92%)`), ROOT FURTHER logo (451x200px), CountdownTimer, EventInfo, CTAButtons. Content padded `144px` horizontal, `96px` vertical, gap `40px` | components/homepage/hero-section.tsx
- [x] T037 [US1] Create homepage barrel export | components/homepage/index.ts
- [x] T038 [US1] Integrate HeroSection into homepage page — add as first section in `app/(main)/page.tsx` | app/(main)/page.tsx
- [ ] T039 [US1] Verify: countdown shows correct remaining time, updates every 60s, "Coming soon" visible, CTA buttons link to `/awards-information` and `/sun-kudos`

**Checkpoint**: Hero section with countdown is live — core MVP visible

---

## Phase 5: US2 - Navigate to Award Categories (Priority: P1) 🎯 MVP

**Goal**: 6 award category cards in a responsive grid. Clicking navigates to Awards Information page with hash anchor.

**Independent Test**: Scroll to awards section, see 6 cards in 3-col grid (desktop), hover shows lift+glow, click navigates to `/awards-information#slug`.

### Tests (US2)

- [ ] T040 [TDD] [US2] Write AwardCard test — renders thumbnail with alt text, renders title (24px 400 gold), renders description (max 2 lines with `line-clamp-2` class), links to `/awards-information#${slug}`, renders "Chi tiet" with ArrowRightIcon, has `focus-within` outline | components/homepage/__tests__/award-card.test.tsx

### Implementation (US2)

- [x] T041 [US2] Build AwardCard — Accepts `AwardCategory` props. Whole card wrapped in `<Link href="/awards-information#${slug}">`. Thumbnail: `next/image` (aspect-ratio 1/1, `border-radius: 24px`, `border: 1px solid #FFEA9E`, `box-shadow: golden-glow`, `mix-blend-mode: screen`). Title: Montserrat 24px/32px 400, gold. Description: 16px/24px 400, white, `line-clamp-2`. "Chi tiet" link: 16px/24px 500, white, ArrowRightIcon 24x24, padding `16px 0`. Hover: `translateY(-4px)`, enhanced glow shadow. Focus-within: `2px solid #FFEA9E` outline | components/homepage/award-card.tsx
- [x] T042 [US2] Build AwardsSection — Section with: divider (`1px solid #2E3940`), caption "Sun* annual awards 2025" (24px 700 white), title "He thong giai thuong" (57px/64px 700 gold, letter-spacing -0.25px), description (16px/24px 400 white). Grid: `repeat(3, 1fr)` desktop, `repeat(2, 1fr)` mobile/tablet, gap `80px`. Import data from `lib/data/awards.ts`. Empty state: show header without cards (do NOT hide section). Container width `1224px`, section-to-grid gap `80px` | components/homepage/awards-section.tsx
- [x] T043 [US2] Integrate AwardsSection into homepage — add after HeroSection in `app/(main)/page.tsx` (temporary position — AboutContent will be inserted before it in Phase 7) | app/(main)/page.tsx
- [ ] T044 [US2] Verify: 6 cards render with correct data, hover lift + glow works, click navigates with `#slug` hash, grid adapts at breakpoints (3-col/2-col)

**Checkpoint**: Full MVP — hero + awards visible and navigable

---

## Phase 6: US5 - Use Account & Utility Features (Priority: P2)

**Goal**: Notification bell with badge and profile dropdown with sign out capability.

**Independent Test**: Click bell → panel toggles, unread badge visible. Click avatar → dropdown with Profile/Sign out/Admin Dashboard (admin only). Sign out works.

- [x] T045 [P] [US5] Build NotificationBell — `"use client"`. Accept `unreadCount` prop (number). 40x40px button with BellIcon (24x24). Show red badge dot (`8px circle #D4271D`, positioned top-right) when `unreadCount > 0`. Click toggles `isOpen` state (panel is out of scope — render placeholder). Hover: `bg-white/10, radius 4px`. Focus: `2px solid #FFEA9E` outline | components/ui/notification-bell.tsx
- [x] T046 [P] [US5] Build ProfileDropdown — `"use client"`. Accept `user` (email, avatar) and `isAdmin` (boolean) props. 40x40px button with UserIcon, `border: 1px solid #998C5F, radius 4px`. Uses `useClickOutside` hook. Dropdown: dark bg `#0B0F12`, border `white/10`, rounded-lg. Items: "Profile" → `/profile`, "Admin Dashboard" → `/admin` (only if `isAdmin`), "Sign out" → calls `supabase.auth.signOut()` via `lib/supabase/client.ts` then `router.push('/login')`. Hover border: `#FFEA9E`. Focus: `2px solid #FFEA9E` outline | components/ui/profile-dropdown.tsx
- [x] T047 [US5] Wire NotificationBell and ProfileDropdown into MainHeader — pass `unreadCount={0}`, `user`, `isAdmin` props from layout's Supabase session data | components/ui/main-header.tsx, app/(main)/layout.tsx
- [ ] T048 [US5] Verify: bell toggles panel state, badge dot shows/hides based on count, profile dropdown opens/closes, admin option conditional, sign out redirects to `/login`

**Checkpoint**: Account features complete

---

## Phase 7: US4 - View Sun* Kudos Promotion & About Content (Priority: P2)

**Goal**: About Content section and Sun* Kudos promotion card visible on homepage.

**Independent Test**: Scroll past hero to see "Root Further" description, then awards, then Kudos card with "Chi tiet" button navigating to `/sun-kudos`.

- [x] T049 [P] [US4] Build AboutContent — Server Component. Container: max-width `1152px`, padding `120px 104px`, `border-radius: 8px`, centered. ROOT FURTHER logo (small version via `next/image`). Body text: Vietnamese paragraphs (Montserrat 24px/32px 700, white, `text-align: justify`). Quote: "A tree with deep roots fears no storm" (20px/32px 700 italic, white, centered). Content hardcoded — to be extracted to locale files when i18n is implemented | components/homepage/about-content.tsx
- [x] T050 [P] [US4] Build KudosSection — Card: max-width `1120px`, height `500px`, `border-radius: 16px`, bg `#0F0F0F` + background illustration image. Content area (457px): badge "DIEM MOI CUA SAA 2025" (14px/20px 700, white, uppercase), subtitle "Phong trao ghi nhan" (24px/32px 700, white), title "Sun* Kudos" (57px/64px 700, gold, ls -0.25px), description (16px/24px 700, white, justify), CTA button "Chi tiet" → `/sun-kudos` (127x56px, gold bg, `radius: 4px`, 16px 700 dark text, ArrowRightIcon). Decorative "KUDOS" text (SVN-Gotham 96px, `#DBD1C1`, ls -0.13em) positioned right side | components/homepage/kudos-section.tsx
- [x] T051 [US4] Integrate AboutContent and KudosSection into homepage in final composition order: `<HeroSection>` → `<AboutContent>` → `<AwardsSection>` → `<KudosSection>`. Add `120px` vertical gap between major sections | app/(main)/page.tsx
- [ ] T052 [US4] Verify: all 4 sections render in correct visual order, 120px spacing, Kudos "Chi tiet" navigates to `/sun-kudos`, decorative KUDOS text renders in SVN-Gotham font

**Checkpoint**: All homepage content sections complete

---

## Phase 8: US7 - Responsive Layout Across Devices (Priority: P2)

**Goal**: Homepage adapts to mobile, tablet, and desktop. Full accessibility compliance.

**Independent Test**: Resize viewport — mobile (<640px): hamburger menu, 2-col awards, stacked CTA. Tablet (640-1023px): 2-col awards, smaller gaps. Desktop (>=1024px): full spec. Lighthouse a11y >= 90.

- [ ] T053 [US7] Build MobileMenu — `"use client"`. Slide-out drawer triggered by HamburgerIcon in header. Contains: close button, 3 NavLink items, LanguageSelector. Uses `useClickOutside` to close. Locks body scroll when open (`overflow: hidden` on body). Animates: `opacity` + `transform` (150ms ease-out). Dark bg `#0B0F12` | components/ui/mobile-menu.tsx
- [ ] T054 [US7] Apply mobile responsive styles (<640px) — Header: padding `12px 16px`, hide NavLinks, show HamburgerIcon (40x37px logo). Hero: padding `48px 16px`, ROOT FURTHER logo max-width 280px, stack vertically. Countdown: gap 16px, digit cards 38x60px, digit font 36px. CTA: flex-col, full-width, gap 16px. Event info: flex-col, gap 4px. About: padding `48px 16px`, body font 16px. Awards grid: `repeat(2, 1fr)`, gap 24px. Section titles: 32px/40px. Kudos: flex-col, height auto, full-width. Footer: flex-col, padding `24px 16px`, center-align, gap 24px. Widget: 80x48px | All component files (responsive Tailwind classes)
- [ ] T055 [US7] Apply tablet responsive styles (640-1023px) — Header: padding `12px 48px`, nav gap 24px. Hero: padding `64px 48px`. Awards grid: `repeat(2, 1fr)`, gap 40px. Section titles: 40px/48px. Kudos: full-width card, content 50%. Footer: padding `32px 48px` | All component files (responsive Tailwind classes)
- [ ] T056 [US7] Add accessibility enhancements — Skip navigation link (`<a href="#main-content" className="sr-only focus:not-sr-only">`) in layout. Global focus style: `outline: 2px solid #FFEA9E; outline-offset: 2px` on all interactive elements. Award cards: semantic `<a>` with `aria-label` including award name. Countdown: `aria-live="polite"` with descriptive label. All images: proper `alt` text. Touch targets: verify >= 44x44px on mobile | app/(main)/layout.tsx, all interactive components
- [ ] T057 [US7] Run Lighthouse accessibility audit — target score >= 90. Fix any issues found

**Checkpoint**: Responsive and accessible

---

## Phase 9: US6 - Use Widget Quick Action Button (Priority: P3)

**Goal**: Floating gold button fixed at bottom-right corner.

**Independent Test**: Button visible on all main pages, click toggles open state.

### Tests (US6)

- [ ] T058 [TDD] [US6] Write WidgetButton test — renders with `position: fixed`, bottom-right placement, has PenIcon + SaaSmallIcon with `/` separator, toggles open state on click, has golden glow shadow | components/ui/__tests__/widget-button.test.tsx

### Implementation (US6)

- [ ] T059 [US6] Build WidgetButton — `"use client"`. `106x64px`, `border-radius: 100px`, bg `#FFEA9E`, padding 16px, gap 8px. PenIcon (24x24) + "/" separator + SaaSmallIcon (20x18). `position: fixed; bottom: 24px; right: 19px; z-index: 50`. Box-shadow: golden glow. Hover: `scale(1.05)`, enhanced shadow. Focus: `2px solid #FFEA9E, offset 4px`. Active: `scale(0.98)`. Click toggles `isOpen` state (menu out of scope — placeholder) | components/ui/widget-button.tsx
- [ ] T060 [US6] Add WidgetButton to layout — place in `app/(main)/layout.tsx` after MainFooter | app/(main)/layout.tsx

**Checkpoint**: Widget button functional

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Loading/error states, visual polish, integration tests.

- [ ] T061 [P] Add loading states — skeleton cards for awards grid (6 shimmer placeholder cards on dark bg), blur placeholder for hero image via `next/image placeholder="blur"` | app/(main)/loading.tsx, components/homepage/awards-section.tsx
- [ ] T062 [P] Add error states — awards section: show "Could not load awards" message + retry button when data fetch fails. Notification badge: fail silently (hide dot). Images: `onError` handler shows dark fallback with award name text overlay | components/homepage/awards-section.tsx, components/ui/notification-bell.tsx, components/homepage/award-card.tsx
- [ ] T063 Visual polish — verify all spacing, colors, typography against design-style.md. Check: 80px card grid gap, 120px section gaps, 40px CTA gap, correct font weights, golden glow shadow values | All component files
- [ ] T064 [P] Cross-browser testing — verify Chrome, Firefox, Safari. Check: backdrop-filter blur (countdown digits), mix-blend-mode screen (award images), CSS transitions (button hover swap), grid layout | Manual verification
- [ ] T065 Write integration tests — (a) Homepage renders all 4 sections in correct order (hero, about, awards, kudos). (b) Header link click navigates to correct URL, footer link click navigates. (c) Countdown + env var: changing `EVENT_START_DATE` changes displayed time. (d) Profile dropdown shows "Admin Dashboard" when `isAdmin=true`, hides when `false` | components/homepage/__tests__/homepage-integration.test.tsx, components/ui/__tests__/navigation-integration.test.tsx

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)          → No dependencies — start immediately
Phase 2 (Foundation)     → Depends on Phase 1
Phase 3 (US3 Navigation) → Depends on Phase 2 — BLOCKS all other user stories
Phase 4 (US1 Hero)       → Depends on Phase 3 (needs header/footer in layout)
Phase 5 (US2 Awards)     → Depends on Phase 3
Phase 6 (US5 Account)    → Depends on Phase 3 (fills header slots)
Phase 7 (US4 Kudos)      → Depends on Phase 3
Phase 8 (US7 Responsive) → Depends on Phases 4, 5, 6, 7 (all sections must exist)
Phase 9 (US6 Widget)     → Depends on Phase 2 only (independent of content phases)
Phase 10 (Polish)        → Depends on all previous phases
```

### Parallel Opportunities After Phase 3

Once Phase 3 (Navigation) completes, these can run in parallel:

```
┌─────────────────┐
│ Phase 3: US3    │ ← Foundation complete
│ (Navigation)    │
└────────┬────────┘
         │
    ┌────┴────────────────────┬──────────────┐
    ▼                         ▼              ▼
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│Phase 4  │  │Phase 5  │  │Phase 6  │  │Phase 7  │
│US1 Hero │  │US2 Award│  │US5 Acct │  │US4 Kudos│
└────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘
     └────────────┴────────────┴─────────────┘
                         │
                    ┌────┴────┐
                    ▼         ▼
              ┌─────────┐ ┌─────────┐
              │Phase 8  │ │Phase 9  │
              │US7 Resp │ │US6 Widgt│
              └────┬────┘ └────┬────┘
                   └──────────┘
                        │
                   ┌────┴────┐
                   │Phase 10 │
                   │ Polish  │
                   └─────────┘
```

### Within Each User Story Phase

- TDD tests MUST be written and FAIL before implementation
- Pure visual components (DigitCard, etc.) can be built in parallel [P]
- Composition components (HeroSection, etc.) depend on their children
- Integration into `page.tsx` is always the last step in the phase
- Verify step confirms the story works independently

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (Setup) + Phase 2 (Foundation) + Phase 3 (US3 Navigation)
2. Complete Phase 4 (US1 Hero + Countdown)
3. Complete Phase 5 (US2 Awards)
4. **STOP and VALIDATE**: Homepage has header, hero with countdown, awards grid, footer
5. Deploy MVP if ready

### Incremental Delivery

1. Setup + Foundation + Navigation → Deploy (bare layout with header/footer)
2. Add US1 Hero → Deploy (countdown visible)
3. Add US2 Awards → Deploy (full MVP)
4. Add US5 Account + US4 Kudos/About → Deploy (full content)
5. Add US7 Responsive + US6 Widget → Deploy (polish)
6. Integration tests + visual polish → Final deploy

---

## Notes

- Commit after each phase or logical group of tasks (use conventional commits: `feat(02): homepage hero section`)
- Run `npm test` before moving to next phase — all tests must pass
- The plan specifies TDD for hooks and key components. Test files are marked `[TDD]` and must be written BEFORE their implementation task
- Static award data in `lib/data/awards.ts` is temporary — swap to API fetch when backend is ready
- All component styling uses design tokens from `design-style.md` — reference that file for exact values
- The existing `components/ui/header.tsx` and `footer.tsx` are NOT modified — they serve the auth layout
