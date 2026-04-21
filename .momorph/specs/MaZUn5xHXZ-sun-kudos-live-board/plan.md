# Implementation Plan: Sun* Kudos - Live Board

**Frame**: `MaZUn5xHXZ-sun-kudos-live-board`
**Date**: 2026-04-20
**Spec**: `specs/MaZUn5xHXZ-sun-kudos-live-board/spec.md`

---

## Summary

The Sun* Kudos - Live Board is the main kudos feed page featuring a KV hero banner, highlight kudos carousel, interactive spotlight board, infinite-scroll feed with sidebar stats, and leaderboards. The existing codebase already has the page route (`app/(main)/sun-kudos/`), Write Kudo modal, shared header/footer, Supabase integration, and many design tokens. This plan extends the existing placeholder page into the full live board by building new components, adding missing database tables (`kudo_likes`, `secret_boxes`), and creating new data-fetching services.

---

## Technical Context

**Language/Framework**: TypeScript 5 / Next.js 16 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, Supabase (@supabase/ssr), TipTap, Sonner
**Database**: Supabase (PostgreSQL) with RLS
**Testing**: Vitest + @testing-library/react
**State Management**: React useState/useReducer + URL search params (filters)
**API Style**: Next.js Server Actions + Supabase client queries

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case files, PascalCase components, `use` prefix hooks)
- [x] Uses approved libraries and patterns (Next.js App Router, Server Components by default, `"use client"` only when needed)
- [x] Adheres to folder structure guidelines (`components/sun-kudos/`, `hooks/`, `types/`, `lib/services/`)
- [x] Meets security requirements (DOMPurify for XSS, Supabase RLS, server-side validation)
- [x] Follows testing standards (Vitest, co-located `__tests__/`, TDD flow)

**Violations**: None — all features use approved patterns.

**New Library Justification**:

| Library | Purpose | Justification |
|---|---|---|
| None required | Custom carousel | CSS transforms + React state are sufficient for 5-card carousel; avoids bundle bloat |

> **Note on Spotlight Board**: The spec mentions D3.js or react-force-graph, but given the Figma shows a static-looking board with names at varying opacities, a simpler CSS/SVG implementation may suffice for MVP. Full interactive canvas can be a Phase 2 enhancement. This avoids adding a heavy library dependency.

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based under `components/sun-kudos/`. Shared primitives in `components/ui/`.
- **Server vs Client split**:
  - `page.tsx` (Server): Fetches initial data (first page of kudos, highlights, user stats, leaderboard, spotlight count)
  - `client.tsx` (Client): Hydrates with interactive features (carousel, filters, likes, infinite scroll)
- **Data Fetching**:
  - **Initial load**: Server Components with `async/await` Supabase queries
  - **Infinite scroll**: Client-side Supabase calls triggered by Intersection Observer
  - **Filters**: URL search params (`?hashtag=&department=`) — enables sharing and browser history
  - **Like toggle**: Optimistic update via client-side state + server action reconciliation
  - **Stats/Leaderboard**: Server-fetched, passed as props
- **Styling**: Tailwind utility classes using existing CSS variables from `globals.css`. Extend with new tokens as needed.
- **i18n**: All user-visible text uses `useLanguage()` hook with translation keys. New keys added to `vi.ts` + `en.ts`. No hardcoded Vietnamese strings in components.
- **Rich text rendering**: Kudo message content is sanitized HTML. Render using `dangerouslySetInnerHTML` with DOMPurify sanitization via existing `lib/utils/sanitize.ts`. Wrap in a dedicated `<SafeHtml />` component to centralize this pattern and satisfy Constitution XSS rule.
- **Pagination**: Cursor-based (using `created_at` + `id` as cursor) — avoids duplicate entries when new kudos are added during pagination. Better than offset for real-time content feeds.
- **`like_count` strategy**: Denormalized column on `kudos` table, updated by Supabase trigger (or within `toggleLike` service as a transaction). Enables fast sorting for highlights without JOIN/COUNT on every read.

### RSC vs "use client" Component Classification

Per Constitution: "Default to RSC. Only add `"use client"` when the component requires browser APIs, event handlers, or React hooks."

| Component | Type | Reason |
|---|---|---|
| `page.tsx` | Server | Async data fetching for initial load |
| `client.tsx` | Client | Root client component, manages WriteKudoModal state |
| `kv-banner.tsx` | Server | Pure display (title, logo), wraps client CTA buttons |
| `kudo-cta-field.tsx` | Client | onClick handler opens WriteKudoModal |
| `sunner-search-field.tsx` | Client | onClick handler navigates/opens search |
| `section-header.tsx` | Server | Pure display (subtitle, title, children slot for filters) |
| `highlight-carousel.tsx` | Client | useState for currentSlide, event handlers for navigation |
| `highlight-kudo-card.tsx` | Client | Heart toggle, copy link, Xem chi tiet click |
| `spotlight-board.tsx` | Client | Search state, pan/zoom interaction |
| `all-kudos-section.tsx` | Server | Layout wrapper (flex row), passes data to children |
| `kudos-feed.tsx` | Client | Infinite scroll, Intersection Observer, filter reaction |
| `kudo-post-card.tsx` | Client | Heart toggle, copy link, hashtag click, image click |
| `user-info.tsx` | Client | Hover profile preview, click profile navigation |
| `action-bar.tsx` | Client | Heart toggle state, copy to clipboard |
| `hashtag-list.tsx` | Client | Click-to-filter interaction |
| `image-gallery.tsx` | Client | Click-to-fullsize interaction |
| `gold-divider.tsx` | Server | Pure display (1px gold line) |
| `content-area.tsx` | Client | Contains SafeHtml (dangerouslySetInnerHTML) |
| `safe-html.tsx` | Server* | Pure render (dangerouslySetInnerHTML is valid in RSC), but always used inside Client parent — bundled with client regardless |
| `stats-panel.tsx` | Server | Pure display (receives data as props), wraps client Open Gift button |
| `leaderboard.tsx` | Server | Pure display (receives data as props) |
| `leaderboard-item.tsx` | Client | Hover profile preview, click navigation |
| `filter-dropdown-button.tsx` | Client | Dropdown open/close state, selection handler |
| `avatar.tsx` | Server | Pure display (img with fallback) |

### Backend Approach

- **API Design**: Next.js Server Actions (not API routes) for mutations (like toggle, secret box open). Supabase direct queries for reads via server components.
- **Data Access**: Direct Supabase client via `lib/supabase/server.ts` (server) and `lib/supabase/client.ts` (client for infinite scroll)
- **Validation**: Zod-free — use simple guard functions (consistent with existing `kudo-service.ts` pattern)

### Integration Points

- **Existing Services**: `kudo-service.ts` (createKudo), `hashtag-service.ts` (getHashtags), `user-service.ts` (searchUsers)
- **Shared Components**: `WriteKudoModal`, `Header/MainHeader`, `Footer/MainFooter`, `FloatingActionButton`, `LanguageSelector`, `NotificationBell`, `ProfileDropdown`
- **Existing Icons**: `PenIcon`, `ArrowRightIcon`, `ChevronRightIcon`, `ChevronDownIcon`, `CloseIcon`, `LinkIcon`, `BellIcon`, `UserIcon`
- **Toast**: Sonner (already installed and configured)

---

## Project Structure

### Documentation

```text
.momorph/specs/MaZUn5xHXZ-sun-kudos-live-board/
├── spec.md              # Feature specification (reviewed, 3 passes)
├── design-style.md      # Design style document (reviewed, 3 passes)
├── plan.md              # This file
├── tasks.md             # Task breakdown (next step)
└── assets/
    └── frame.png        # Figma frame screenshot
```

### New Files

| File | Purpose |
|---|---|
| **Types** | |
| `types/kudo-feed.ts` | Types for Live Board: KudoPost, KudoLike, UserStats, LeaderboardEntry, SpotlightNode, FilterState |
| **Services** | |
| `lib/services/kudo-feed-service.ts` | Server-side: fetchKudos (paginated), fetchHighlightKudos, fetchKudosCount, fetchUserStats, fetchLeaderboard |
| `lib/services/kudo-like-service.ts` | Server-side: toggleLike, getUserLikes |
| `lib/services/department-service.ts` | Server-side: getDepartments |
| **Server Actions** | |
| `app/(main)/sun-kudos/actions.ts` | Server actions: toggleKudoLike, openSecretBox |
| **Components — Sun Kudos** | |
| `components/sun-kudos/kv-banner.tsx` | Hero banner with title, KUDOS logo, CTA buttons |
| `components/sun-kudos/kudo-cta-field.tsx` | Recognition CTA pill button |
| `components/sun-kudos/sunner-search-field.tsx` | Search Sunner CTA pill button |
| `components/sun-kudos/section-header.tsx` | Reusable section header (subtitle + title + optional filters) |
| `components/sun-kudos/highlight-carousel.tsx` | Carousel container with arrows and pagination |
| `components/sun-kudos/highlight-kudo-card.tsx` | Individual highlight kudo card (528px, gold border) |
| `components/sun-kudos/spotlight-board.tsx` | Spotlight word cloud section |
| `components/sun-kudos/all-kudos-section.tsx` | Two-column layout wrapper (feed + sidebar) |
| `components/sun-kudos/kudos-feed.tsx` | Infinite scroll feed container |
| `components/sun-kudos/kudo-post-card.tsx` | Individual All Kudos card (680px) |
| `components/sun-kudos/user-info.tsx` | Shared: Avatar + name + department + stars (used in both Highlight and Feed cards) |
| `components/sun-kudos/action-bar.tsx` | Shared: Heart button + like count + Copy Link (+ Xem chi tiet for Highlight variant) |
| `components/sun-kudos/hashtag-list.tsx` | Shared: Clickable hashtag tags row (max 5, 1-line overflow) |
| `components/sun-kudos/image-gallery.tsx` | Shared: Horizontal thumbnail row (max 5 images, 88x88) |
| `components/sun-kudos/content-area.tsx` | Shared: SafeHtml kudo message + timestamp + category label |
| `components/sun-kudos/gold-divider.tsx` | Shared: 1px gold (#FFEA9E) horizontal divider |
| `components/sun-kudos/safe-html.tsx` | DOMPurify-sanitized dangerouslySetInnerHTML wrapper (centralized XSS-safe HTML rendering) |
| `components/sun-kudos/index.ts` | Barrel export for all sun-kudos components |
| `components/sun-kudos/stats-panel.tsx` | Sidebar stats card (5 stats + open gift button) |
| `components/sun-kudos/leaderboard.tsx` | "10 Sunner nhan qua moi nhat" list |
| `components/sun-kudos/leaderboard-item.tsx` | Individual leaderboard entry |
| `components/sun-kudos/filter-dropdown-button.tsx` | Hashtag/Department filter dropdown trigger |
| **Components — UI (shared)** | |
| `components/ui/avatar.tsx` | Reusable avatar (64px, white border, fallback) |
| `components/ui/toast-provider.tsx` | Sonner toast provider (if not already configured) |
| **Icons (new)** | |
| `components/icons/heart-icon.tsx` | Heart outline/filled (20x20) |
| `components/icons/search-icon.tsx` | Magnifying glass (24x24) |
| `components/icons/chevron-left-icon.tsx` | Chevron left (24x24) for carousel |
| `components/icons/star-icon.tsx` | Star filled (12x12) for rating |
| `components/icons/gift-icon.tsx` | Gift box (20x20) for open gift button |
| `components/icons/external-icon.tsx` | External/edit (16x16) for Xem chi tiet |
| `components/icons/copy-icon.tsx` | Copy/link (16x16) for Copy Link |
| **Hooks** | |
| `hooks/use-kudos-feed.ts` | Infinite scroll: pagination, loading, append. Uses `lib/supabase/client.ts` (browser client) for client-side page fetches. |
| `hooks/use-highlight-kudos.ts` | Carousel state: current slide, navigation |
| `hooks/use-kudo-like.ts` | Optimistic like toggle with debounce |
| `hooks/use-kudos-filter.ts` | URL search param filter state management |
| `hooks/use-intersection-observer.ts` | Generic intersection observer for infinite scroll |

### Modified Files

| File | Changes |
|---|---|
| `app/(main)/sun-kudos/page.tsx` | Replace placeholder — Server Component. Reads `searchParams` prop for active filters (`hashtag`, `department`). Fetches (all filtered by active params): `highlightKudos` (top 5), `initialKudos` (first page, 10 items), `userStats` (5 metrics), `leaderboardData` (top 10), `spotlightData` (all recipients), `userLikedKudoIds` (Set), `kudosCount` (total), `hashtags` (filter options), `departments` (filter options). Passes all + `userId` as props to `<SunKudosClient />`. Re-executes on every searchParams change (filter change triggers fresh server fetch). |
| `app/(main)/sun-kudos/client.tsx` | Replace placeholder — Client Component receiving all server-fetched data as props. Renders: `<KVBanner />`, `<SectionHeader />` + `<HighlightCarousel />`, `<SpotlightBoard />`, `<AllKudosSection />` (feed + sidebar). Manages: WriteKudoModal open state, filter state (URL params). Props interface: `{ userId, highlightKudos, initialKudos, userStats, leaderboardData, spotlightData, userLikedKudoIds, kudosCount, hashtags, departments }`. |
| `app/(main)/sun-kudos/loading.tsx` | Update skeleton UI to match Live Board layout |
| `app/(main)/sun-kudos/error.tsx` | Verify error boundary works for new components |
| `types/database.ts` | Add `kudo_likes` and `secret_boxes` table types |
| `types/kudo.ts` | Add `like_count` to Kudo interface (if missing) |
| `app/globals.css` | Add missing design tokens: `--color-bg-card: #FFF8E1`, `--color-bg-sidebar: #00070C`, `--color-text-hashtag: #D4271D`, `--color-heart-active: #FF4D4D`, `--color-border-highlight: #FFEA9E`, `--color-accent-gold-40: rgba(255,234,158,0.40)` |
| `lib/i18n/locales/vi.ts` | Add ~30 new translation keys: section titles ("HIGHLIGHT KUDOS", "SPOTLIGHT BOARD", "ALL KUDOS"), stat labels, button text ("Mở Secret Box", "Copy Link", "Xem chi tiết"), empty states, tooltips, toast messages |
| `lib/i18n/locales/en.ts` | Add matching English translations for all new keys |
| `lib/i18n/types.ts` | Add new key union types for type-safety |

### Dependencies

| Package | Version | Purpose |
|---|---|---|
| *No new packages required* | - | Custom carousel via CSS transforms; Spotlight via CSS grid/absolute positioning |

> **Decision**: No carousel or visualization library. The highlight carousel is exactly 5 cards with a center-focus pattern — this is straightforward with CSS transforms and React state. The Spotlight Board MVP will use CSS-positioned name labels with varying opacity/size. This keeps the bundle lean and avoids Constitution violations (no unapproved libraries).

---

## Implementation Strategy

### Phase Breakdown

#### Phase 0: Foundation (Types, Tokens, Database, Icons)
**Goal**: All infrastructure in place so component work is unblocked.

1. **Database types** — Add `kudo_likes` and `secret_boxes` to `types/database.ts`
2. **Feed types** — Create `types/kudo-feed.ts` with all Live Board types
3. **Design tokens** — Add missing CSS variables to `globals.css` (card bg, sidebar bg, hashtag color, etc.)
4. **Icon components** — Create all 7 new icons (heart, search, chevron-left, star, gift, external, copy)
5. **Avatar component** — Create shared `components/ui/avatar.tsx` (64px, white border, fallback bg)

#### Phase 1: Data Layer (Services, Actions, Hooks)
**Goal**: All data fetching and mutations work end-to-end.

1. **kudo-feed-service.ts** — Server-side service: `fetchKudos` (cursor-based pagination, filterable by hashtag + department), `fetchHighlightKudos` (top 5 by like count, filterable), `fetchKudosCount` (total for Spotlight header), `fetchUserStats` (5 stats for sidebar), `fetchLeaderboard` (top 10 gift recipients), `fetchSpotlightData` (all recipient names + kudo counts for Spotlight Board)
2. **kudo-like-service.ts** — Server-side: `toggleLike` (insert/delete in `kudo_likes`, update denormalized `like_count` on `kudos`), `getUserLikedKudoIds` (set of kudo IDs current user has liked)
3. **department-service.ts** — Server-side: `getDepartments`
4. **Server actions** — `actions.ts`: `toggleKudoLikeAction` (validates auth, calls toggleLike, returns updated count), `openSecretBoxAction` (validates auth + eligibility, marks box opened)
5. **Hooks** — `use-kudos-feed`, `use-highlight-kudos`, `use-kudo-like`, `use-kudos-filter`, `use-intersection-observer`
6. **i18n keys** — Add all new translation keys to `lib/i18n/locales/vi.ts` and `lib/i18n/locales/en.ts` for section titles, stats labels, empty states, button text, tooltips

#### Phase 2: Core UI — KV Banner + Highlight Carousel (US2, US9)
**Goal**: Top half of page renders with carousel navigation.

1. **KV Banner** — Hero section with title, KUDOS logo, two CTA pill buttons
2. **Section Header** — Reusable subtitle + title + optional right content (filters)
3. **Highlight Carousel** — 5-card center-focus carousel with arrows, pagination, active/inactive card states
4. **Highlight Kudo Card** — Full card with sender/receiver info, content quote box, hashtags, action bar
5. **Filter Dropdown Button** — Trigger buttons for Hashtag/Department dropdowns
6. **Wire up page.tsx** — Server-fetch highlight kudos, render KV + carousel

#### Phase 3: All Kudos Feed + Sidebar (US1, US3, US5, US6, US8)
**Goal**: Bottom half renders with infinite scroll and stats.

1. **Kudo Post Card** — 680px card with all sub-components (user info, content, images, hashtags, actions)
2. **Shared Card Sub-components** — Build the 7 split files: `user-info.tsx`, `action-bar.tsx`, `hashtag-list.tsx`, `image-gallery.tsx`, `content-area.tsx` (with `safe-html.tsx`), `gold-divider.tsx`. Used by both Highlight and Feed cards.
3. **Kudos Feed** — Infinite scroll container with Intersection Observer trigger
4. **Stats Panel** — Sidebar stats card (5 stats + "Mo Secret Box" button)
5. **Leaderboard** — "10 Sunner nhan qua moi nhat" list with items
6. **All Kudos Section** — Two-column layout (680px feed + 80px gap + 422px sidebar)
7. **Wire up page.tsx** — Server-fetch feed, stats, leaderboard; connect infinite scroll

#### Phase 4: Interactions (US3, US4, US5, US10)
**Goal**: All interactive features work.

1. **Heart/Like toggle** — Optimistic UI with debounce, server action reconciliation, disabled for own kudos
2. **Copy Link** — Clipboard write + Sonner toast "Link copied -- ready to share!"
3. **Filter integration** — URL params, filter both sections simultaneously, reset carousel
4. **Hashtag click** — Card hashtag click sets filter
5. **Profile navigation** — Avatar/name click -> profile page, hover -> preview popup (placeholder, separate spec)
6. **Star rating tooltip** — Hover tooltip with rating logic explanation

#### Phase 5: Spotlight Board (US7, US11)
**Goal**: Spotlight section renders with interactivity.

1. **Spotlight Board container** — Dark background with border radius 47.14px, overlay
2. **Spotlight header** — "388 KUDOS" count, search field, pan/zoom button
3. **Name rendering** — CSS-positioned names with varying opacity rows
4. **Search** — Debounced search highlighting matching names
5. **Pan/Zoom** — Basic scroll/zoom interaction (CSS transform-based)

#### Phase 6: Polish & Responsive (US All)
**Goal**: Production-ready.

1. **Loading states** — Skeleton UI for all sections (page load, infinite scroll, filter change)
2. **Error states** — Error boundaries, retry buttons, toast notifications
3. **Empty states** — "Hien tai chua co Kudos nao." and "Chua co du lieu" (use i18n keys, not hardcoded)
4. **Responsive** — Mobile (< 640px), Tablet (640px-1023px), Desktop (>= 1024px) per design-style.md responsive table
5. **Accessibility** — Keyboard nav, ARIA labels, focus management, skip nav
6. **Animations** — Carousel transitions, heart toggle bounce, toast slide-in
7. **CSS edge cases** — Long usernames: `text-overflow: ellipsis` + `overflow: hidden` on name elements. Sidebar independent scroll: `overflow-y: auto` + `position: sticky` + `max-h-[calc(100vh-120px)]`. Two-column fit: `flex-shrink` on sidebar to handle 30px overflow.

---

## Key Technical Approach Details

### Carousel Implementation (No Library)

```
State: currentSlide (0-4)
Layout: flex container, overflow hidden
Cards: absolute positioned, CSS transforms
  - Active (center): scale(1), opacity(1), z-index: 2
  - Adjacent: scale(0.9), opacity(0.5), z-index: 1
  - Hidden: translateX off-screen
Transition: transform 400ms ease-in-out, opacity 300ms ease-out
Navigation: Prev/Next buttons update currentSlide
Pagination: Separate controls sync with same state
```

### Infinite Scroll Pattern (Cursor-Based)

```
Hook: useKudosFeed(filters, initialKudos)
  - State: kudos[] (initialized from server props), cursor (last item's created_at+id), hasMore, isLoading
  - Intersection Observer on sentinel <div> at bottom of feed
  - On intersect & hasMore & !isLoading:
    1. Set isLoading = true
    2. Fetch next 10 items from Supabase: .lt('created_at', cursor).order('created_at', desc).limit(10)
    3. Append to kudos[], update cursor to last item
    4. hasMore = (result.length === 10)
    5. isLoading = false
  - On filter change: reset kudos to [], cursor to null, refetch from start
  - No dedup needed: cursor-based avoids duplicate entries even when new kudos appear at top
  - Error: set isLoading = false, show retry button (keep existing items)
```

### Filter State via URL Params

```
Hook: useKudosFilter()
  - Read: useSearchParams() to get current hashtag & department
  - Write: router.push with updated search params (preserves history)
  - Clear: Remove param from URL to clear filter

Data Flow on Filter Change:
  1. User clicks filter → useKudosFilter calls router.push(?hashtag=X&department=Y)
  2. Next.js App Router detects searchParams change → re-executes page.tsx (Server Component)
  3. page.tsx reads searchParams prop → passes to fetchHighlightKudos(filters) and fetchKudos(filters)
  4. Fresh filtered data flows to client.tsx as new props
  5. React Suspense: old UI stays visible during server fetch, then transitions seamlessly
  6. Carousel and Feed components receive new initialData props
  
Key: Components that depend on server-fetched filtered data MUST use a `key` prop
derived from the active filters to force state reset on filter change:
  <HighlightCarousel key={`${hashtag}-${department}`} kudos={highlightKudos} />
  <KudosFeed key={`${hashtag}-${department}`} initialKudos={initialKudos} />
This ensures carousel resets to slide 0 and feed clears accumulated pages.
```

### Like Toggle with Optimistic Update

```
Hook: useKudoLike(kudoId, initialLiked, initialCount)
  - Immediate UI update (toggle heart color, increment/decrement count)
  - Call server action toggleKudoLikeAction(kudoId)
  - On failure: revert UI, show error toast
  - Debounce: 300ms to prevent rapid toggling
  - Disabled: if kudoId sender === current user
```

### Spotlight Board MVP

```
Approach: CSS grid / absolute positioning (no D3)
  - Fetch all recipient names + Kudo counts
  - Calculate font-size based on count (min 8px, max 24px)
  - Position names in a grid with varying opacity rows
  - Search: filter/highlight names matching query
  - Pan/Zoom: CSS overflow: auto + transform: scale() on container
  - Full interactive canvas is a Phase 2 enhancement
```

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Spotlight Board complexity | Medium | Medium | MVP with CSS positioning instead of D3; full interactive version in Phase 2 |
| Carousel edge cases (< 5 items, responsive) | Low | Medium | Test with 0, 1, 3, 5 items; responsive shows single card on mobile |
| Infinite scroll performance with many images | Medium | Low | Use `next/image` with lazy loading; limit initial batch to 10 items |
| Filter state sync between carousel and feed | Low | High | Single source of truth in URL params; both components read from same source |
| `kudo_likes` table not yet in Supabase | High | High | Add to database.ts types immediately; coordinate with backend to create table + RLS policies |
| Heart count race conditions | Low | Medium | Optimistic UI + server reconciliation; debounce 300ms |

### Estimated Complexity

- **Frontend**: High (many components, carousel, infinite scroll, filters, spotlight)
- **Backend**: Medium (new services, server actions, 2 new tables)
- **Testing**: Medium (component tests, hook tests, integration tests for like toggle)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: Carousel navigation, filter -> feed update, like toggle -> count update
- [x] **External dependencies**: Supabase queries (kudos, likes, stats)
- [x] **Data layer**: CRUD for kudo_likes, read for kudos/stats/leaderboard
- [x] **User workflows**: Browse feed, like kudo, filter by hashtag, copy link

### Test Categories

| Category | Applicable? | Key Scenarios |
|---|---|---|
| UI <-> Logic | Yes | Carousel nav, filter state sync, like toggle, infinite scroll trigger |
| App <-> Data Layer | Yes | Fetch kudos paginated, toggle like, fetch stats, fetch leaderboard |
| Cross-platform | Yes | Responsive layout at 3 breakpoints |

### Test Environment

- **Environment type**: Local (Vitest + JSDOM)
- **Test data strategy**: Mock Supabase responses with factories
- **Isolation approach**: Fresh state per test, mock Supabase client

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|---|---|---|
| Supabase queries | Mock | Constitution mandates mocking external services in unit tests |
| Sonner toast | Mock | Verify calls without DOM side effects |
| next/navigation | Mock | useSearchParams, useRouter for filter tests |
| Intersection Observer | Mock | Simulate scroll trigger for infinite scroll |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Page renders all 4 sections with initial data
   - [x] Carousel navigates forward/backward, page indicator updates
   - [x] Heart click toggles icon color and count
   - [x] Copy Link writes to clipboard and shows toast
   - [x] Infinite scroll loads next page on sentinel intersection
   - [x] Filter selection updates both carousel and feed

2. **Error Handling**
   - [x] API failure on page load shows error boundary
   - [x] Infinite scroll failure shows retry button
   - [x] Like toggle failure reverts optimistic update

3. **Edge Cases**
   - [x] Empty feed shows "Hien tai chua co Kudos nao."
   - [x] Carousel with fewer than 5 items adapts pagination
   - [x] Own Kudo has disabled heart button
   - [x] Anonymous Kudo shows anonymous name instead of sender

### Coverage Goals

| Area | Target | Priority |
|---|---|---|
| Core hooks (useKudosFeed, useKudoLike, useKudosFilter) | 90%+ | High |
| Component rendering (cards, carousel, sidebar) | 80%+ | High |
| Error/empty states | 80%+ | Medium |
| Responsive behavior | Manual testing | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved (3 review passes)
- [x] `design-style.md` approved (3 review passes)
- [x] Existing codebase analyzed (services, types, components)
- [ ] `kudo_likes` table created in Supabase with RLS policies
- [ ] `secret_boxes` table created in Supabase with RLS policies
- [ ] `like_count` column added to `kudos` table (denormalized count) or use count query

### External Dependencies

- Supabase project configured with `kudo_likes` and `secret_boxes` tables
- Supabase RLS policies for like toggle (user can only toggle own likes)
- `profiles` table with `star_rating` column or computed view
- Supabase Storage configured for kudo images (already in place for Write Kudo)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** Phase 0 (Foundation) — types, tokens, icons
4. **Coordinate** with backend: ensure `kudo_likes` and `secret_boxes` tables + RLS are created

---

## Notes

- The existing `app/(main)/sun-kudos/client.tsx` will be **replaced entirely** — it's currently a placeholder with just a title and Write Kudo button. The Write Kudo modal integration will be preserved.
- The existing `WriteKudoModal` component is already fully built and will be wired to the KV Banner CTA field.
- **No new npm packages** are required. Carousel uses CSS transforms, Spotlight uses CSS positioning. This keeps the bundle lean and avoids Constitution compliance issues.
- The **Sonner** toast library is already configured and will be used for "Copy Link" feedback.
- The **DOMPurify** sanitization is already configured (`lib/utils/sanitize.ts`) and will be used for rendering kudo content.
- Phase 5 (Spotlight Board) is intentionally scoped as an MVP with CSS positioning. A full D3.js interactive version can be added later if the basic version doesn't meet engagement requirements.
- The two-column layout total (680+80+422=1182px) exceeds the 1152px content area by 30px. Implementation should use `flex-shrink` or adjust padding. Test at 1440px viewport to verify fit.

### Open Questions from Spec (Carried Forward)

- **Q1**: Sidebar description mentions TWO leaderboards. Only "10 SUNNER NHAN QUA MOI NHAT" has design items. Planning for one leaderboard; the second can be added later.
- **Q2**: Search Sunner CTA — no linked Figma frame. Planning as click -> navigate to a search/profile page (or open search modal). Exact behavior TBD.
- **Q3**: Two-column width overflow — will implement with `flex-shrink` and test at desktop viewport.
