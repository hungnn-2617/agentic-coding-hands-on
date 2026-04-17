# Implementation Plan: Homepage SAA

**Frame**: `i87tDx10uM-homepage-saa`
**Date**: 2026-04-17
**Spec**: `specs/i87tDx10uM-homepage-saa/spec.md`

---

## Summary

Build the Homepage SAA — the main authenticated landing page featuring a "ROOT FURTHER" hero with countdown timer, 6 award category cards in a responsive grid, a Sun* Kudos promotion section, and a floating widget button. The page is primarily a Server Component; only the countdown timer and interactive dropdowns/overlays require client-side hydration.

---

## Technical Context

**Language/Framework**: TypeScript 5.x (strict) / Next.js 16.x (App Router)
**Primary Dependencies**: React 19.x, Tailwind CSS 4.x, @supabase/ssr
**Database**: Supabase (PostgreSQL) — read-only on this page
**Testing**: Vitest 4.x + @testing-library/react 16.x
**State Management**: React useState for client-side UI toggles; Server Components for data fetching
**API Style**: REST (predicted endpoints, static fallback for initial phase)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case files, PascalCase components, `@/*` imports)
- [x] Uses approved libraries and patterns (no new production dependencies required)
- [x] Adheres to folder structure guidelines (`app/(main)/`, `components/`, `hooks/`, `types/`)
- [x] Meets security requirements (auth middleware, no client-exposed secrets)
- [x] Follows testing standards (Vitest unit tests, Red-Green-Refactor — tests integrated per phase, not deferred)

**Violations: None**

**Key alignment notes:**
- Constitution Principle II: Page is a Server Component by default. Only `CountdownTimer`, `LanguageSelector`, `NotificationBell`, `ProfileDropdown`, and `WidgetButton` use `"use client"`.
- Constitution Principle III: Mobile-first responsive via Tailwind `sm:`, `md:`, `lg:`, `xl:` breakpoints.
- Existing `NEXT_PUBLIC_EVENT_START_DATE` env var will be reused (spec called it `NEXT_PUBLIC_EVENT_DATETIME` but the codebase already uses `EVENT_START_DATE`).

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based — `components/homepage/` for page-specific components, `components/ui/` for reusable shared components (MainHeader, MainFooter, NavLink). Follows existing login page pattern.
- **Styling Strategy**: Tailwind utility classes. Extend `globals.css` with new design tokens from `design-style.md`. No CSS modules.
- **Data Fetching**: Server Components fetch award data via Supabase client. Static fallback data for initial implementation (TR-007). Countdown uses client-side `NEXT_PUBLIC_*` env vars.
- **Rendering**: Static sections (hero bg, about content, awards, kudos, footer) render as Server Components. Interactive elements wrapped in Client Component boundaries.

### Routing & Layout

- **Delete** `app/page.tsx` (placeholder redirect — middleware already handles auth).
- **Create** `app/(main)/layout.tsx` — Shared layout with `MainHeader` + `MainFooter` for all authenticated pages.
- **Create** `app/(main)/page.tsx` — Homepage, served at `/` for authenticated users.
- This establishes the `(main)` route group required by the constitution for future pages (Awards Information, Sun* Kudos, etc.).

### Shared vs Feature Components

| Component | Location | Reason |
|-----------|----------|--------|
| MainHeader | `components/ui/main-header.tsx` | Shared across all `(main)` pages |
| MainFooter | `components/ui/main-footer.tsx` | Shared across all `(main)` pages |
| NavLink | `components/ui/nav-link.tsx` | Reusable nav link with active/hover/normal states |
| NavLinks | `components/ui/nav-links.tsx` | Client wrapper using `usePathname` for active state detection |
| MobileMenu | `components/ui/mobile-menu.tsx` | Client slide-out drawer for mobile nav (<640px) |
| NotificationBell | `components/ui/notification-bell.tsx` | Shared header component |
| ProfileDropdown | `components/ui/profile-dropdown.tsx` | Shared header component |
| WidgetButton | `components/ui/widget-button.tsx` | Shared floating button across main pages |
| HeroSection | `components/homepage/hero-section.tsx` | Homepage-specific |
| CountdownTimer | `components/homepage/countdown-timer.tsx` | Homepage-specific (client) |
| AwardCard | `components/homepage/award-card.tsx` | Homepage-specific |
| KudosSection | `components/homepage/kudos-section.tsx` | Homepage-specific |

### Integration Points

- **Existing Services**: `lib/supabase/server.ts` for auth session + data fetching in Server Components. `lib/supabase/client.ts` needed in `ProfileDropdown` for `signOut()` call.
- **Shared Components**: Reuse existing `LanguageSelector` from `components/ui/`. Reuse existing icon pattern from `components/icons/`.
- **Existing Header/Footer**: Keep `components/ui/header.tsx` and `footer.tsx` untouched (used by login/auth layout). Create new `MainHeader`/`MainFooter` for `(main)`.

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/i87tDx10uM-homepage-saa/
├── spec.md              # Feature specification ✅
├── design-style.md      # Design style document ✅
├── plan.md              # This file ✅
├── tasks.md             # Task breakdown (next step)
└── assets/
    └── frame.png        # Figma screenshot ✅
```

### Source Code (affected areas)

```text
# New files
app/
├── (main)/
│   ├── layout.tsx               # Shared layout: MainHeader + content + MainFooter
│   ├── page.tsx                 # Homepage (replaces root page.tsx)
│   ├── loading.tsx              # Route-level loading skeleton
│   └── error.tsx                # Route-level error boundary

components/
├── ui/
│   ├── main-header.tsx          # Full navigation header for authenticated pages
│   ├── main-footer.tsx          # Footer with nav links + copyright
│   ├── nav-link.tsx             # Nav link with selected/hover/normal states
│   ├── nav-links.tsx            # Client wrapper for nav links (uses usePathname for active state)
│   ├── notification-bell.tsx    # Bell icon with unread badge (client)
│   ├── profile-dropdown.tsx     # Avatar with dropdown menu (client)
│   ├── widget-button.tsx        # Floating action button (client)
│   ├── mobile-menu.tsx          # Mobile slide-out nav drawer (client, <=640px)
│   └── __tests__/
│       ├── nav-link.test.tsx
│       ├── main-header.test.tsx
│       ├── main-footer.test.tsx
│       └── widget-button.test.tsx
├── homepage/
│   ├── hero-section.tsx         # Hero banner with bg image + gradient overlay
│   ├── countdown-timer.tsx      # Days/Hours/Minutes countdown (client)
│   ├── digit-card.tsx           # Single countdown digit card
│   ├── event-info.tsx           # Date, venue, livestream note
│   ├── cta-buttons.tsx          # ABOUT AWARDS + ABOUT KUDOS buttons
│   ├── about-content.tsx        # "Root Further" description block
│   ├── awards-section.tsx       # Awards header + grid container
│   ├── award-card.tsx           # Single award card (thumbnail + title + desc + link)
│   ├── kudos-section.tsx        # Sun* Kudos promotion card
│   ├── index.ts                 # Barrel exports
│   └── __tests__/
│       ├── countdown-timer.test.tsx
│       └── award-card.test.tsx
├── icons/
│   ├── bell-icon.tsx            # Notification bell
│   ├── arrow-right-icon.tsx     # Arrow for CTA buttons and detail links
│   ├── user-icon.tsx            # Profile avatar placeholder
│   ├── pen-icon.tsx             # Widget button pen icon
│   ├── saa-small-icon.tsx       # Widget button SAA icon
│   └── hamburger-icon.tsx       # Mobile menu icon

hooks/
├── use-countdown.ts             # Countdown timer logic (interval, zero-pad, isExpired)
├── use-click-outside.ts         # Close dropdown on outside click (extract from LanguageSelector)
└── __tests__/
    ├── use-countdown.test.ts
    └── use-click-outside.test.ts

lib/
└── data/
    └── awards.ts                # Static AwardCategory[] fallback data (6 items)

types/
├── awards.ts                    # AwardCategory interface
└── events.ts                    # EventConfig interface

# Modified files
app/
├── page.tsx                     # DELETE (replaced by (main)/page.tsx)
├── globals.css                  # EXTEND with new design tokens from design-style.md
├── layout.tsx                   # ADD localFont (Digital Numbers, SVN-Gotham), Montserrat Alternates

components/
├── icons/index.ts               # ADD exports: BellIcon, ArrowRightIcon, UserIcon, PenIcon, SaaSmallIcon, HamburgerIcon
├── ui/index.ts                  # ADD exports: MainHeader, MainFooter, NavLink, NavLinks, MobileMenu, NotificationBell, ProfileDropdown, WidgetButton

public/
├── fonts/
│   ├── DigitalNumbers-Regular.ttf   # Custom countdown font
│   └── SVN-Gotham.ttf              # Decorative "KUDOS" font
├── images/
│   ├── homepage-keyvisual.png       # Hero background
│   ├── root-further-logo-about.png  # About section logo
│   ├── awards/                      # Award thumbnails
│   │   ├── top-talent.png
│   │   ├── top-project.png
│   │   ├── top-project-leader.png
│   │   ├── best-manager.png
│   │   ├── signature-2025.png
│   │   └── mvp.png
│   ├── award-glow-ring.png          # Shared glow ring for award cards
│   └── kudos-section-bg.png         # Kudos section background

.env.local.example               # ADD new env vars documentation
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| (none) | - | No new production dependencies required |

**Note**: All required libraries (React 19, Next.js 16, Tailwind 4, Supabase SSR, Vitest, Testing Library) are already installed. Custom fonts are loaded as local files, not npm packages.

---

## Implementation Strategy

### Phase 0: Asset Preparation & Foundation

**Goal**: Download assets, set up fonts, extend theme, create types and hooks with tests.

1. Download Figma media assets via `get_media_files` URLs to `public/` directories
2. Source custom font files (Digital Numbers, SVN-Gotham) and place in `public/fonts/`
3. Update `app/layout.tsx` — add `localFont` imports for Digital Numbers and SVN-Gotham; add `Montserrat_Alternates` from next/font/google
4. Extend `app/globals.css` — add all design tokens from `design-style.md`:
   - Colors: `--color-text-gold`, `--color-header-bg`, `--color-divider`, `--color-border`, `--color-notification-badge`, `--color-kudos-card-bg`, `--color-kudos-decorative`, `--color-glow`
   - Map to Tailwind theme via `@theme inline` block
5. Create `types/awards.ts` — `AwardCategory` interface (id, name, slug, description, thumbnailUrl, displayOrder)
6. Create `types/events.ts` — `EventConfig` interface (datetime, venue, livestreamNote)
7. Create `lib/data/awards.ts` — static `AWARD_CATEGORIES: AwardCategory[]` array (6 items with names, slugs, descriptions, thumbnail paths). This is the fallback data source until the API is ready (TR-007).
8. **TDD**: Write `hooks/__tests__/use-countdown.test.ts` first — test: calculates remaining time, zero-pads values, returns isExpired=true when past, handles missing env var by returning all zeros
9. Create `hooks/use-countdown.ts` — implement to pass tests (interval every 60s, cleanup on unmount)
10. **TDD**: Write `hooks/__tests__/use-click-outside.test.ts` first — test: calls callback on outside click, ignores inside click
11. Create `hooks/use-click-outside.ts` — extract click-outside detection from existing `LanguageSelector` for reuse, implement to pass tests

**Environment variables** (add to `.env.local`):
```
NEXT_PUBLIC_EVENT_START_DATE=2025-12-26T18:30:00+07:00  # already exists
NEXT_PUBLIC_EVENT_VENUE=Âu Cơ Art Center                # NEW
NEXT_PUBLIC_EVENT_LIVESTREAM_NOTE=Tường thuật trực tiếp qua sóng Livestream  # NEW
```

### Phase 1: Route Group & Shared Layout (US3 - Navigation)

**Goal**: Establish the `(main)` route group with full header/footer navigation. This is the foundation all other pages will use.

1. Delete `app/page.tsx` (the redirect placeholder)
2. Create `app/(main)/layout.tsx` — Server Component composing `<MainHeader>` + `<main id="main-content">{children}</main>` + `<MainFooter>`. Export `metadata` for the route group. (WidgetButton added in Phase 4 after it's built.)
3. Create `app/(main)/page.tsx` — Stub homepage (authenticated-only, Server Component). Export page-specific `metadata: { title: 'Homepage | SAA 2025', description: 'Sun* Annual Awards 2025 - ROOT FURTHER' }`.
4. Create `app/(main)/loading.tsx` — Full-page skeleton loader
5. Create `app/(main)/error.tsx` — Error boundary with retry
6. Create `app/(main)/not-found.tsx` — 404 page for the main route group
7. Build icon components: `BellIcon`, `ArrowRightIcon`, `UserIcon`, `HamburgerIcon`. Update `components/icons/index.ts` barrel export.
8. **TDD**: Write `components/ui/__tests__/nav-link.test.tsx` — test: renders selected state with gold color + border-bottom, renders normal state with white text, renders correct href
9. Build `components/ui/nav-link.tsx` — accepts `href`, `active`, renders correct state per design-style.md
10. **TDD**: Write `components/ui/__tests__/main-header.test.tsx` — test: renders logo, 3 nav links, correct active state for current path
11. Build `components/ui/nav-links.tsx` — **Client Component** wrapper using `usePathname()` to determine active route. Renders 3 `<NavLink>` components (About SAA 2025 → `/`, Awards Information → `/awards-information`, Sun* Kudos → `/sun-kudos`). Sets `active` prop based on current pathname. On mobile, hidden (replaced by hamburger menu).
12. Build `components/ui/main-header.tsx` — **Server Component** shell composing: Logo (left), `<NavLinks />` client wrapper (center), and client component slots: LanguageSelector, NotificationBell, ProfileDropdown (right group). Does NOT use `usePathname` directly — that's inside the `NavLinks` client boundary.
13. Build `components/ui/notification-bell.tsx` — Client component with red badge dot. **Data source**: Accept `unreadCount` prop from server (initially hardcoded to 0 in layout; wired to `/api/notifications/unread-count` when API is ready). Click toggles open state (panel is out of scope — placeholder only).
14. Build `components/ui/profile-dropdown.tsx` — Client component using `useClickOutside` hook and `lib/supabase/client.ts`. Avatar icon, dropdown with Profile/Sign out/Admin Dashboard options. Accept `user` and `isAdmin` props from server layout. Sign out calls `supabase.auth.signOut()` then redirects to `/login`.
15. **TDD**: Write `components/ui/__tests__/main-footer.test.tsx` — test: renders logo, 4 nav links (including "Tieu chuan chung"), copyright text with Montserrat Alternates
16. Build `components/ui/main-footer.tsx` — Server Component with logo, 4 nav links, copyright text
17. Update `components/ui/index.ts` barrel export with new components (MainHeader, MainFooter, NavLink, NavLinks, NotificationBell, ProfileDropdown)
18. Verify: header shows correct active state for current route; footer links navigate correctly; all interactive elements keyboard-accessible with visible `#FFEA9E` focus outline

### Phase 2: Hero Section & Countdown (US1 - P1)

**Goal**: Build the hero banner with countdown timer, event info, and CTA buttons.

1. Build `components/homepage/digit-card.tsx` — Single frosted-glass digit card (Server Component, pure visual). Props: `digit: string`.
2. **TDD**: Write `components/homepage/__tests__/countdown-timer.test.tsx` — test: renders 6 digit cards (2 per unit), renders "Coming soon" when not expired, hides "Coming soon" when expired, has `aria-live="polite"`, renders correct unit labels
3. Build `components/homepage/countdown-timer.tsx` — Client Component using `useCountdown` hook. Renders "Coming soon" label + 3 digit pairs + unit labels. Uses `suppressHydrationWarning` on digit elements.
4. Build `components/homepage/event-info.tsx` — Server Component reading from env vars (`process.env.NEXT_PUBLIC_EVENT_START_DATE`, `process.env.NEXT_PUBLIC_EVENT_VENUE`, `process.env.NEXT_PUBLIC_EVENT_LIVESTREAM_NOTE`). Renders formatted date, venue, livestream note.
5. Build `components/homepage/cta-buttons.tsx` — Two `<Link>` elements styled as primary (gold) and secondary (outline) buttons with arrow icons. Hover swaps appearance per design-style.md.
6. Build `components/homepage/hero-section.tsx` — Composes background image (next/image with priority), gradient overlay (CSS pseudo-element), ROOT FURTHER logo, CountdownTimer, EventInfo, CTAButtons. Full-width section.
7. Create `components/homepage/index.ts` barrel export
8. Integrate `HeroSection` into `app/(main)/page.tsx`
9. Verify: countdown displays correctly and updates every 60s; CTA buttons navigate to `/awards-information` and `/sun-kudos` (404 is expected — pages not yet built)

### Phase 3: Awards Section (US2 - P1)

**Goal**: Build the award category cards with responsive grid and hash-based navigation.

1. **TDD**: Write `components/homepage/__tests__/award-card.test.tsx` — test: renders thumbnail with alt text, renders title and description, truncates long description at 2 lines (line-clamp class), links to `/awards-information#${slug}`, renders "Chi tiet" with arrow icon
2. Build `components/homepage/award-card.tsx` — Accepts `AwardCategory` data. Renders thumbnail (next/image with golden glow shadow), title, description (line-clamp-2), "Chi tiet" link. Entire card is a clickable `<Link>` to `/awards-information#${slug}`. Hover: translateY(-4px) + enhanced glow. Focus-within: 2px `#FFEA9E` outline.
3. Build `components/homepage/awards-section.tsx` — Section with divider, caption "Sun* annual awards 2025", title "He thong giai thuong", description, and responsive grid (3-col desktop, 2-col mobile/tablet). Imports data from `lib/data/awards.ts`. **Empty state**: if array is empty, show section header (divider + caption + title + description) without any cards — do NOT hide the entire section or show a generic error message.
4. Integrate `AwardsSection` into `app/(main)/page.tsx`
5. Verify: 6 cards render, hover effects work, click navigates with correct hash, responsive grid adapts at breakpoints

### Phase 4: Remaining Sections (US4, US6 - P2/P3)

**Goal**: Build the about content, Kudos promotion, and widget button.

1. Build `components/homepage/about-content.tsx` — Server Component. ROOT FURTHER logo (small), body text paragraphs (static Vietnamese content hardcoded in component — to be extracted to locale files when i18n is implemented per spec Q2), italic quote centered. Container with `border-radius: 8px`, padding `120px 104px`.
2. Build `components/homepage/kudos-section.tsx` — Card with dark bg `#0F0F0F` + bg illustration. Badge "DIEM MOI CUA SAA 2025", subtitle "Phong trao ghi nhan", title "Sun* Kudos", description, "Chi tiet" button linking to `/sun-kudos`. Decorative "KUDOS" text (SVN-Gotham font, `#DBD1C1`).
3. **TDD**: Write `components/ui/__tests__/widget-button.test.tsx` — test: renders with correct position (fixed bottom-right), has pen icon + SAA icon, toggles open state on click
4. Build `components/ui/widget-button.tsx` — Client Component. Fixed position bottom-right. Pill shape `106x64px`, gold bg, pen + SAA icons with `/` separator. Click handler toggles open state (menu out of scope — placeholder).
5. Integrate sections into `app/(main)/page.tsx` in final composition order (see Page Composition Order below)
6. Verify: all sections render in correct visual order with `120px` gaps between major sections

**Page Composition Order** in `app/(main)/page.tsx`:
```tsx
<>
  <HeroSection />           {/* Full-width hero with countdown */}
  <AboutContent />          {/* "Root Further" description block */}
  <AwardsSection />         {/* Awards header + 6-card grid */}
  <KudosSection />          {/* Sun* Kudos promotion card */}
</>
```
Note: Header, Footer, and WidgetButton are in the `(main)/layout.tsx`, not in `page.tsx`.

### Phase 5: Responsive & Accessibility (US7 - P2)

**Goal**: Ensure the page is fully responsive and accessible.

1. **Mobile (<640px)**: Build `components/ui/mobile-menu.tsx` — Client Component. Hamburger icon in header toggles a slide-out drawer (overlay from right or full-screen). Contains: 3 NavLink items, LanguageSelector, close button. Uses `useClickOutside` to close. Locks body scroll when open. Animates with `opacity` + `transform` (150ms ease-out). Header hides desktop nav links below `sm:` and shows `HamburgerIcon` button instead. Hero stacks vertically, CTA full-width stacked. Award grid 2-col with 24px gap. Footer stacks vertically. All per responsive spec values in design-style.md.
2. **Tablet (640-1023px)**: Header shows nav with smaller gaps (24px). Award grid 2-col with 40px gap. Footer maintains horizontal with reduced padding.
3. **Desktop (>=1024px)**: Full design spec dimensions.
4. **Accessibility audit**:
   - Skip navigation link at page top (`<a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>`)
   - All interactive elements focusable with visible `#FFEA9E` outline (`outline: 2px solid #FFEA9E; outline-offset: 2px`)
   - `aria-live="polite"` on countdown, `aria-label` with full time description
   - Award cards wrapped in semantic `<a>` tags with descriptive `aria-label`
   - `lang="vi"` on html element, updates on language switch
   - All images have alt text
   - Touch targets >= 44x44px on mobile
5. Run Lighthouse accessibility audit — target >= 90

### Phase 6: Final Polish & Integration Tests

**Goal**: Loading/error states, visual polish, and integration tests that span multiple components.

1. **Loading states**: Skeleton cards for awards grid (6 placeholder cards), blur placeholder for hero image via next/image `placeholder="blur"`
2. **Error states**: Awards section shows "Could not load awards" message + retry button when data fails. Notification badge fails silently (hides dot). Image `onError` handler shows dark fallback with award name text.
3. **Visual polish**: Verify all spacing, colors, typography against design-style.md. Cross-browser check (Chrome, Firefox, Safari).
4. **Integration tests** (complement the unit tests written in earlier phases):
   - Homepage renders all 4 sections in correct order
   - Full navigation flow: header link click → correct URL, footer link click → correct URL
   - Countdown + env var integration: changing `NEXT_PUBLIC_EVENT_START_DATE` changes displayed time
   - Profile dropdown shows "Admin Dashboard" when user role is admin, hides it otherwise

---

## Testing Strategy

### TDD Approach (Constitution Principle V)

Tests are written **before** implementation in each phase, not deferred. Each phase includes specific test files:

| Phase | Test Files | Focus |
|-------|-----------|-------|
| 0 | `hooks/__tests__/use-countdown.test.ts`, `use-click-outside.test.ts` | Hook logic |
| 1 | `ui/__tests__/nav-link.test.tsx`, `main-header.test.tsx`, `main-footer.test.tsx` | Navigation components |
| 2 | `homepage/__tests__/countdown-timer.test.tsx` | Countdown rendering |
| 3 | `homepage/__tests__/award-card.test.tsx` | Award card rendering + links |
| 4 | `ui/__tests__/widget-button.test.tsx` | Widget interaction |
| 6 | Integration tests spanning multiple components | End-to-end flows |

### Test Environment

- **Framework**: Vitest 4.x + @testing-library/react 16.x (already installed)
- **Environment**: jsdom (already configured in `vitest.config.ts`)
- **Test data**: Static fixtures from `lib/data/awards.ts`, mocked Supabase auth
- **Isolation**: Fresh render per test via Testing Library cleanup (existing pattern in `vitest.setup.ts`)

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase auth | Mock | Auth is external; mock `getUser()` to return test user |
| Environment vars | Real | Use `process.env` with test values in vitest.config |
| next/navigation | Mock | Mock `usePathname`, `useRouter` for nav state tests |
| next/image | Mock | Stub to `<img>` for faster tests |

### Test Scenarios

1. **Happy Path**
   - [x] Homepage renders all 4 sections in correct order (hero, about, awards, kudos)
   - [x] Countdown shows correct remaining time from env var
   - [x] All 6 award cards render with correct data from static fixtures
   - [x] Navigation links show correct active state based on pathname
   - [x] CTA buttons link to correct pages

2. **Error Handling**
   - [x] Countdown shows "00" when env var not set
   - [x] Awards section shows header with empty state message when data array is empty
   - [x] Image fallback renders when hero image fails to load

3. **Edge Cases**
   - [x] Countdown reaches zero → "Coming soon" label hidden
   - [x] Long award description → truncated at 2 lines (line-clamp-2 class present)
   - [x] Admin user → "Admin Dashboard" visible in profile dropdown
   - [x] Non-admin user → "Admin Dashboard" hidden

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Hooks (useCountdown, useClickOutside) | 95%+ | High |
| UI Components (NavLink, Header, Footer, WidgetButton) | 80%+ | High |
| Homepage Components (CountdownTimer, AwardCard) | 80%+ | High |
| Navigation/routing integration | 75%+ | Medium |
| Edge cases | 70%+ | Medium |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Custom fonts (Digital Numbers, SVN-Gotham) not available as web fonts | Medium | Medium | Source from font libraries or convert from design assets. Fallback to monospace/sans-serif. |
| Hero background image too large for fast LCP | Medium | High | Use next/image with priority, WebP format, appropriate sizing. Add blur placeholder. |
| Countdown timer hydration mismatch (server vs client time) | High | Low | Render "00:00:00" on server, hydrate on client. Use `suppressHydrationWarning` on digit elements. |
| Award data API not ready | Low | Low | Use static fallback data. Swap to API later without UI changes (TR-007). |
| Responsive layout without mobile Figma designs | Medium | Medium | Follow constitution breakpoints + design-style.md responsive spec. Visual QA at each breakpoint. |
| Existing header/footer components conflict | Low | Low | Creating new MainHeader/MainFooter. Existing components untouched for auth layout. |

### Estimated Complexity

- **Frontend**: **Medium-High** — Many components, responsive grid, frosted-glass countdown, state management for dropdowns
- **Backend**: **Low** — No new APIs for initial phase (static data + existing auth)
- **Testing**: **Medium** — Hooks, client component state, navigation states, responsive behavior

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [x] `design-style.md` complete with all design tokens
- [ ] Custom font files sourced (Digital Numbers, SVN-Gotham)
- [ ] Hero background image and award thumbnails downloaded from Figma

### External Dependencies

- Supabase project configured (already done)
- Google OAuth configured (already done)
- Award thumbnail images exported from Figma at appropriate resolution
- Font license verification for Digital Numbers and SVN-Gotham

---

## Open Questions (Carried from Spec)

- [ ] **Q1**: Real award descriptions for Signature 2025 and MVP (currently placeholder)
- [ ] **Q2**: About Content section text source — locale files or CMS?
- [ ] **Q3**: Countdown >99 days display — 3rd digit card or alternative?
- [ ] **Q4**: Mobile Figma designs for more accurate responsive implementation?
- [ ] **Q5**: Event info via env vars or `/api/event-config` endpoint?

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown from this plan
2. **Review** tasks.md for parallelization opportunities
3. **Begin** Phase 0 (Asset Preparation) — can start immediately
4. **Begin** Phase 1 (Route Group & Layout) — critical path for all subsequent phases
