# Tasks: Sun* Kudos - Live Board

**Frame**: `MaZUn5xHXZ-sun-kudos-live-board`
**Prerequisites**: plan.md (reviewed 2 passes), spec.md (reviewed 3 passes), design-style.md (reviewed 3 passes)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1–US11)
- **|**: File path affected by this task

---

## Phase 1: Setup (Design Tokens + i18n)

**Purpose**: Extend existing project with missing design tokens and translation keys so all components can reference them.

- [x] T001 Add missing CSS design tokens to globals.css: `--color-bg-card: #FFF8E1`, `--color-bg-sidebar: #00070C`, `--color-text-hashtag: #D4271D`, `--color-heart-active: #FF4D4D`, `--color-border-highlight: #FFEA9E`, `--color-accent-gold-40: rgba(255,234,158,0.40)`, `--color-overlay-spotlight: rgba(0,0,0,0.7)`, `--color-avatar-fallback: #EEE` | app/globals.css
- [x] T002 [P] Add Vietnamese translation keys (~30 keys): section titles, stat labels, button text ("Mở Secret Box", "Copy Link", "Xem chi tiết"), empty states ("Hiện tại chưa có Kudos nào.", "Chưa có dữ liệu"), tooltips, toast messages | lib/i18n/locales/vi.ts
- [x] T003 [P] Add matching English translation keys for all new keys | lib/i18n/locales/en.ts
- [x] T004 [P] Add new translation key union types for type-safety | lib/i18n/types.ts

---

## Phase 2: Foundation (Types, Icons, Shared Components, Services, Hooks)

**Purpose**: All infrastructure required by user stories. Icons, types, shared sub-components, data services, and hooks.

**CRITICAL**: No user story work can begin until this phase is complete.

### Types

- [x] T005 Add `kudo_likes` table type (id, kudo_id, user_id, is_special_day, hearts_awarded, created_at) and `secret_boxes` table type (id, user_id, is_opened, prize_id, opened_at) to Database interface. Add `like_count` column to kudos Row/Insert/Update. | types/database.ts
- [x] T006 [P] Create `types/kudo-feed.ts` with all Live Board types: `KudoPost` (Kudo + sender/receiver profiles + like_count + user_liked), `UserStats` (kudos_received, kudos_sent, hearts_received, secret_boxes_opened, secret_boxes_unopened), `LeaderboardEntry` (id, name, avatar_url, prize_description), `SpotlightNode` (id, name, kudo_count), `FilterState` (hashtag: string | null, department: string | null) | types/kudo-feed.ts

### Icons (all parallelizable)

- [x] T007 [P] Create HeartIcon component with `filled` prop for active/inactive states (20x20, #999/#FF4D4D) | components/icons/heart-icon.tsx
- [x] T008 [P] Create SearchIcon component (24x24, accepts className for color) | components/icons/search-icon.tsx
- [x] T009 [P] Create ChevronLeftIcon component (24x24) | components/icons/chevron-left-icon.tsx
- [x] T010 [P] Create StarIcon component (12x12, gold #FFEA9E) | components/icons/star-icon.tsx
- [x] T011 [P] Create GiftIcon component (20x20) | components/icons/gift-icon.tsx
- [x] T012 [P] Create ExternalIcon component (16x16, for "Xem chi tiết") | components/icons/external-icon.tsx
- [x] T013 [P] Create CopyIcon component (16x16, for "Copy Link") | components/icons/copy-icon.tsx

### Shared UI

- [x] T014 Create reusable Avatar component: 64px default size, 1.869px white border, rounded-full, #EEE fallback bg, `next/image` for optimization, accepts `size` prop for responsive (32px mobile). Server Component. | components/ui/avatar.tsx

### Shared Card Sub-components (all parallelizable — used by both Highlight and Feed cards)

- [x] T015 [P] Create SafeHtml component: accepts `html` string, sanitizes via DOMPurify (`lib/utils/sanitize.ts`), renders with `dangerouslySetInnerHTML`. Centralized XSS-safe pattern. | components/sun-kudos/safe-html.tsx
- [x] T016 [P] Create GoldDivider component: 1px height, full width, `bg-[#FFEA9E]`. Server Component. | components/sun-kudos/gold-divider.tsx
- [x] T017 [P] Create UserInfo component: Avatar + name (16px/700) + department/badge (14px/700 #999) + star rating (StarIcon, tooltip with rating logic). Client component (hover/click for profile). Props: `user: KudoUser, starRating: number`. | components/sun-kudos/user-info.tsx
- [x] T018 [P] Create ContentArea component: timestamp (16px/700 #999, format HH:mm - MM/DD/YYYY) + category label (16px/700 #00101A) + SafeHtml message body (20px/700, justified) with line-clamp prop (3 for Highlight, 5 for Feed). Client component. | components/sun-kudos/content-area.tsx
- [x] T019 [P] Create HashtagList component: flex row, 16px/700 #D4271D, gap 8px, 1-line overflow with "...", click-to-filter (calls onHashtagClick callback). Client component. | components/sun-kudos/hashtag-list.tsx
- [x] T020 [P] Create ImageGallery component: flex row, gap 16px, max 5 thumbnails (88x88, rounded-[18px], border 1px #998C5F), `next/image`, click opens full-size. Client component. | components/sun-kudos/image-gallery.tsx
- [x] T021 [P] Create ActionBar component: HeartIcon + like count + CopyIcon "Copy Link" button. Accepts `variant` prop ("highlight" | "feed"): highlight adds ExternalIcon "Xem chi tiết". Heart count uses 24px for highlight, 16px for feed. Client component. Props: `kudoId, likeCount, isLiked, isOwnKudo, onLikeToggle, onCopyLink, variant`. | components/sun-kudos/action-bar.tsx

### Services (all parallelizable)

- [x] T022 [P] Create kudo-feed-service.ts with server-side functions: `fetchKudos(filters, cursor, limit=10)` — cursor-based pagination, JOIN profiles for sender/receiver, filterable by hashtag+department, returns KudoPost[]; `fetchHighlightKudos(filters)` — top 5 by like_count; `fetchKudosCount()` — total count for Spotlight; `fetchUserStats(userId)` — 5 stats; `fetchLeaderboard()` — top 10 gift recipients; `fetchSpotlightData()` — all recipient names + kudo counts | lib/services/kudo-feed-service.ts
- [x] T023 [P] Create kudo-like-service.ts: `toggleLike(kudoId, userId)` — insert/delete in kudo_likes + update denormalized like_count on kudos table within transaction; `getUserLikedKudoIds(userId)` — returns Set<string> of kudo IDs user has liked | lib/services/kudo-like-service.ts
- [x] T024 [P] Create department-service.ts: `getDepartments()` — returns all departments ordered by name | lib/services/department-service.ts

### Server Actions

- [x] T025 Create server actions: `toggleKudoLikeAction(kudoId)` — validates auth, calls toggleLike, returns `{ liked, newCount }`; `openSecretBoxAction()` — validates auth + eligibility, marks box opened, returns prize info | app/(main)/sun-kudos/actions.ts

### Hooks (all parallelizable)

- [x] T026 [P] Create useIntersectionObserver hook: generic hook, returns ref + isIntersecting. Options: threshold, rootMargin. Cleanup on unmount. | hooks/use-intersection-observer.ts
- [x] T027 [P] Create useKudosFeed hook: accepts (filters, initialKudos). State: kudos[], cursor, hasMore, isLoading. Uses `lib/supabase/client.ts` (browser client) for client-side pagination. Intersection Observer on sentinel div. On filter change: reset via key prop (parent responsibility). | hooks/use-kudos-feed.ts
- [x] T028 [P] Create useHighlightKudos hook: accepts (kudos[]). State: currentSlide (0 to kudos.length-1). Methods: next(), prev(), goTo(index). Computed: canGoNext, canGoPrev. | hooks/use-highlight-kudos.ts
- [x] T029 [P] Create useKudoLike hook: accepts (kudoId, initialLiked, initialCount, isOwnKudo). Optimistic toggle with 300ms debounce. Calls toggleKudoLikeAction server action. On failure: revert + error toast via Sonner. Returns { isLiked, count, toggle, isDisabled }. | hooks/use-kudo-like.ts
- [x] T030 [P] Create useKudosFilter hook: reads useSearchParams() for `hashtag` and `department`. Write: router.push with updated params. Clear: remove param. Returns { filters, setHashtag, setDepartment, clearFilters }. | hooks/use-kudos-filter.ts

### Barrel Export

- [x] T031 Create barrel export for all sun-kudos components | components/sun-kudos/index.ts

**Checkpoint**: Foundation complete — all types, icons, shared components, services, and hooks are ready. User story implementation can begin.

---

## Phase 3: User Story 9 - Send New Kudo + Search via KV CTAs (Priority: P1) MVP

**Goal**: KV Banner renders with two pill CTA buttons. Recognition CTA opens WriteKudoModal. Search CTA navigates to search.

**Independent Test**: Load /sun-kudos page, see KV hero banner with KUDOS logo. Click recognition CTA → Write Kudo modal opens. Click search CTA → search action triggers.

- [x] T032 [P] [US9] Create KudoCTAField component: pill button (738px, h-72, rounded-[68px], bg gold/10%, border 1px #998C5F), PenIcon 24x24 white, placeholder text 16px/700 white. Client component — onClick opens WriteKudoModal. | components/sun-kudos/kudo-cta-field.tsx
- [x] T033 [P] [US9] Create SunnerSearchField component: pill button (381px, h-72, same style as CTA), SearchIcon 24x24 white, placeholder "Tìm kiếm profile Sunner". Client component — onClick navigates/opens search. | components/sun-kudos/sunner-search-field.tsx
- [x] T034 [US9] Create KVBanner component (Server): hero section wrapping title "Hệ thống ghi nhận và cảm ơn" (36px/700 #FFEA9E), KUDOS logo (SVN-Gotham 139.78px), KudoCTAField + SunnerSearchField in a flex row. Background: KV image with gradient overlay. | components/sun-kudos/kv-banner.tsx
- [x] T035 [US9] Wire up page.tsx: Server Component reads searchParams, fetches userId. Renders `<SunKudosClient>` with userId. For now, client.tsx renders only `<KVBanner>` + `<WriteKudoModal>`. | app/(main)/sun-kudos/page.tsx, app/(main)/sun-kudos/client.tsx

**Checkpoint**: US9 complete — KV Banner with CTAs renders and Write Kudo modal opens.

---

## Phase 4: User Story 2 - Highlight Kudos Carousel (Priority: P1)

**Goal**: Highlight section renders with section header, filter buttons, center-focus carousel (top 5), arrows, and pagination.

**Independent Test**: See "HIGHLIGHT KUDOS" section with 5 cards in carousel. Navigate with arrows. Page indicator updates. Boundary arrows disabled.

- [x] T036 [P] [US2] Create SectionHeader component (Server): subtitle "Sun* Annual Awards 2025" (24px/700 #FFF) + title (57px/700 #FFEA9E, ls: -0.25px) + optional right-side children slot for filters. | components/sun-kudos/section-header.tsx
- [x] T037 [P] [US2] Create FilterDropdownButton component (Client): h-36, 14px/700 white, bg white/10%, border 1px #998C5F, rounded-lg, ChevronDownIcon. Active state: bg #FFEA9E, color #00101A. onClick opens dropdown (dropdown content is out of scope — separate spec). | components/sun-kudos/filter-dropdown-button.tsx
- [x] T038 [US2] Create HighlightKudoCard component (Client): 528px width, 4px gold border, rounded-2xl, bg #FFF8E1, padding 24px 24px 16px 24px. Renders: two UserInfo blocks with arrow between, GoldDivider, ContentArea (3-line clamp in ContentQuoteBox bg gold/40% border gold r-12px p-16px-24px), HashtagList, ActionBar (highlight variant with "Xem chi tiết"). | components/sun-kudos/highlight-kudo-card.tsx
- [x] T039 [US2] Create HighlightCarousel component (Client): uses useHighlightKudos hook. Center-focus layout: active card scale(1) opacity(1) z-2, adjacent scale(0.9) opacity(0.5) z-1. Left/right arrows (48x48 circle, bg white/15%, ChevronLeft/RightIcon). Pagination below: ChevronLeftIcon + "N/M" (28px/700 #999) + ChevronRightIcon, gap 32px. Handles 0–5 cards. Transition: transform 400ms ease-in-out. | components/sun-kudos/highlight-carousel.tsx
- [x] T040 [US2] Extend page.tsx: fetch `highlightKudos` via fetchHighlightKudos(filters), `hashtags` via getHashtags(), `departments` via getDepartments(). Pass to client.tsx. Client renders KVBanner + SectionHeader + FilterDropdownButtons + HighlightCarousel. | app/(main)/sun-kudos/page.tsx, app/(main)/sun-kudos/client.tsx

**Checkpoint**: US2 complete — Highlight carousel renders with navigation, cards show kudo content.

---

## Phase 5: User Story 1 - Browse All Kudos Feed (Priority: P1)

**Goal**: "ALL KUDOS" section renders with infinite-scroll feed of Kudo post cards.

**Independent Test**: Scroll to "ALL KUDOS" section. See Kudo cards with sender/receiver, message, images, hashtags, heart count. Scroll to bottom → more cards load. Empty state shows when no kudos.

- [x] T041 [US1] Create KudoPostCard component (Client): 680px width, rounded-3xl (24px), bg #FFF8E1, border 1px #998C5F, padding 40px 40px 16px 40px. Renders: two UserInfo blocks with arrow, GoldDivider, ContentArea (5-line clamp, NO quote box), ImageGallery, HashtagList, ActionBar (feed variant — no "Xem chi tiết"). | components/sun-kudos/kudo-post-card.tsx
- [x] T042 [US1] Create KudosFeed component (Client): uses useKudosFeed hook with initialKudos. Renders KudoPostCard list in flex-col gap-24px. Sentinel div at bottom for Intersection Observer. Shows spinner while loading more. Empty state: i18n "Hiện tại chưa có Kudos nào." | components/sun-kudos/kudos-feed.tsx
- [x] T043 [US1] Create AllKudosSection component (Server): SectionHeader ("ALL KUDOS") + two-column flex layout — left: KudosFeed (w-[680px]), right: sidebar slot (w-[422px]), gap 80px with flex-shrink on sidebar. Responsive: stacks vertically below lg breakpoint. | components/sun-kudos/all-kudos-section.tsx
- [x] T044 [US1] Extend page.tsx: fetch `initialKudos` via fetchKudos(filters, null, 10), `userLikedKudoIds` via getUserLikedKudoIds(userId). Pass to client.tsx. Client renders AllKudosSection with KudosFeed. Use `key={hashtag-department}` on KudosFeed for filter reset. | app/(main)/sun-kudos/page.tsx, app/(main)/sun-kudos/client.tsx

**Checkpoint**: US1 complete — Infinite scroll feed renders and loads more on scroll.

---

## Phase 6: User Story 6 - Personal Stats + Secret Box (Priority: P1)

**Goal**: Right sidebar shows 5 personal stats and "Mở Secret Box" button.

**Independent Test**: View sidebar with correct stat values. Click "Mở Secret Box" → dialog opens (linked frame, behavior out of scope).

- [x] T045 [US6] Create StatsPanel component (Server): bg #00070C, border 1px #998C5F, rounded-[17px], p-24px. 5 stat rows (22px/700 white label + 32px/700 #FFEA9E value). Divider (1px #2E3940) between hearts and secret boxes. "Mở Secret Box" button (h-60, bg #FFEA9E, rounded-lg, 22px/700 #00101A, GiftIcon). Button onClick calls openSecretBoxAction. Disabled state: bg #D4CCA8 color #999. | components/sun-kudos/stats-panel.tsx
- [x] T046 [US6] Extend page.tsx: fetch `userStats` via fetchUserStats(userId). Pass to client.tsx. Client renders StatsPanel in sidebar slot of AllKudosSection. | app/(main)/sun-kudos/page.tsx, app/(main)/sun-kudos/client.tsx

**Checkpoint**: US6 complete — Stats sidebar shows personalized data, Secret Box button works.

---

## Phase 7: User Story 3 - Like/Unlike a Kudo (Priority: P1)

**Goal**: Heart button toggles like state on any Kudo card (Highlight and Feed). Optimistic UI with server reconciliation.

**Independent Test**: Click grey heart → turns red, count increments. Click red heart → turns grey, count decrements. Own kudo heart is disabled. Rapid clicks debounced.

- [x] T047 [US3] Integrate useKudoLike hook into ActionBar component: each ActionBar instance receives kudoId, initialLiked (from userLikedKudoIds set), initialCount (from kudo.like_count), isOwnKudo (senderId === userId). HeartIcon toggles filled prop. Count displays next to heart. Disabled state: heart #CCCCCC cursor-not-allowed. Error: Sonner toast on failure + revert. | components/sun-kudos/action-bar.tsx
- [x] T048 [US3] Pass `userId` and `userLikedKudoIds` props through to HighlightKudoCard and KudoPostCard so ActionBar can determine isLiked and isOwnKudo per card. | components/sun-kudos/highlight-kudo-card.tsx, components/sun-kudos/kudo-post-card.tsx

**Checkpoint**: US3 complete — Like toggle works on all cards with optimistic UI.

---

## Phase 8: User Story 4 - Filter by Hashtag and Department (Priority: P1)

**Goal**: Clicking filter dropdowns filters both Highlight and All Kudos simultaneously. Hashtag clicks on cards also filter.

**Independent Test**: Click "Hashtag" dropdown → select tag → both sections filter. URL updates with ?hashtag=X. Browser back restores previous state. Click hashtag on a card → same filtering. Carousel resets to slide 1.

- [x] T049 [US4] Integrate useKudosFilter hook into client.tsx: read current filters from URL. Pass filters to HighlightCarousel and KudosFeed via key prop (`key={filters.hashtag}-${filters.department}`). On filter change, page.tsx re-renders with filtered data (Next.js App Router behavior). | app/(main)/sun-kudos/client.tsx
- [x] T050 [US4] Wire FilterDropdownButton to useKudosFilter: Hashtag button calls setHashtag(selected), Department button calls setDepartment(selected). Active state: show selected value, gold bg. Clear: deselect option calls clearFilters. | components/sun-kudos/filter-dropdown-button.tsx
- [x] T051 [US4] Wire HashtagList onHashtagClick to useKudosFilter.setHashtag: clicking a hashtag tag on any card sets the global hashtag filter, updating URL and refreshing both sections. | components/sun-kudos/hashtag-list.tsx

**Checkpoint**: US4 complete — Filters work across both sections via URL params.

---

## Phase 9: User Story 5 + 8 + 10 - Copy Link, Leaderboard, Profile Nav (Priority: P2)

**Goal**: Copy Link shows toast. Leaderboard renders in sidebar. Avatar/name clicks navigate to profile.

**Independent Test**: Click "Copy Link" → URL copied + toast "Link copied — ready to share!". Sidebar shows "10 SUNNER NHẬN QUÀ MỚI NHẤT" list. Click avatar → profile page. Hover avatar → preview popup placeholder.

### Copy Link (US5)

- [x] T052 [US5] Implement Copy Link in ActionBar: navigator.clipboard.writeText(kudoUrl). On success: Sonner toast("Link copied — ready to share!"). CopyIcon + "Copy Link" text (16px/700 #00101A). Hover: color #FFEA9E, underline. | components/sun-kudos/action-bar.tsx

### Leaderboard (US8)

- [x] T053 [P] [US8] Create LeaderboardItem component (Client): flex row gap-8px. Avatar (64px, white border), name (22px/700 #FFEA9E), prize description (16px/700 #FFF). Click → navigate to profile. Hover → profile preview placeholder. | components/sun-kudos/leaderboard-item.tsx
- [x] T054 [US8] Create Leaderboard component (Server): bg #00070C, border 1px #998C5F, rounded-[17px], padding 24px 16px 24px 24px. Title "10 SUNNER NHẬN QUÀ MỚI NHẤT" (22px/700 #FFEA9E). List of LeaderboardItems, gap 8px, custom scrollbar (2px #999). Empty state: i18n "Chưa có dữ liệu". | components/sun-kudos/leaderboard.tsx
- [x] T055 [US8] Extend page.tsx: fetch `leaderboardData` via fetchLeaderboard(). Pass to client.tsx. Client renders Leaderboard below StatsPanel in sidebar. | app/(main)/sun-kudos/page.tsx, app/(main)/sun-kudos/client.tsx

### Profile Navigation (US10)

- [x] T056 [US10] Implement profile navigation in UserInfo: onClick avatar/name → `router.push(/profile/${userId})`. onMouseEnter with 300ms delay → show profile preview (placeholder div with "Profile preview — separate spec"). Star rating tooltip: hover shows i18n text explaining 1/2/3 star logic. | components/sun-kudos/user-info.tsx

**Checkpoint**: US5 + US8 + US10 complete — Copy link works, leaderboard renders, profile nav functional.

---

## Phase 10: User Story 7 + 11 - Spotlight Board (Priority: P2/P3)

**Goal**: Spotlight Board renders with total count, searchable name cloud, pan/zoom controls.

**Independent Test**: See "SPOTLIGHT BOARD" section with "388 KUDOS" count. Names displayed at varying sizes/opacities. Type in search → matching names highlight. Pan/Zoom button toggles mode.

- [x] T057 [US7] Create SpotlightBoard component (Client): container 100% width, h-[548px], rounded-[47px], border 1px #998C5F, overflow hidden. Dark overlay (linear-gradient 70% black). Header bar: total count "N KUDOS" (36px/700 white) + search input (219px pill, 0.682px border) + pan/zoom button (36x36 bg white/10%). | components/sun-kudos/spotlight-board.tsx
- [x] T058 [US7] Implement Spotlight name rendering: CSS grid/absolute positioning. Map SpotlightNode[] to positioned text elements. Font-size: min 8px to max 24px based on kudo_count. Opacity rows (0.1, 0.3, 0.5, 0.7, 1.0 top-to-bottom). Click name → navigate to kudo detail. Hover → tooltip with name + time. | components/sun-kudos/spotlight-board.tsx
- [x] T059 [US11] Implement Spotlight search: debounced input (300ms, max 100 chars). Matching names get highlighted (full opacity + scale up). Non-matching fade further. | components/sun-kudos/spotlight-board.tsx
- [x] T060 [US7] Implement pan/zoom: CSS overflow auto + transform scale on container. Pan/Zoom button toggles mode. Hover tooltip "Pan/Zoom". | components/sun-kudos/spotlight-board.tsx
- [x] T061 [US7] Extend page.tsx: fetch `spotlightData` via fetchSpotlightData(), `kudosCount` via fetchKudosCount(). Pass to client.tsx. Client renders SectionHeader ("SPOTLIGHT BOARD") + SpotlightBoard between Highlight and All Kudos sections. | app/(main)/sun-kudos/page.tsx, app/(main)/sun-kudos/client.tsx

**Checkpoint**: US7 + US11 complete — Spotlight Board renders with search and interaction.

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Production-ready with loading states, error handling, empty states, responsive design, accessibility, and animations.

### Loading & Error States

- [x] T062 [P] Update loading.tsx: skeleton UI matching Live Board layout — KV banner skeleton, carousel card skeletons (3 rectangles), spotlight placeholder, feed card skeletons (3 cards), sidebar stat rows skeleton. | app/(main)/sun-kudos/loading.tsx
- [x] T063 [P] Verify error.tsx: error boundary shows "Something went wrong" with retry button. Confirm it catches server-side fetch failures in page.tsx. | app/(main)/sun-kudos/error.tsx
- [x] T064 Implement inline loading states: infinite scroll spinner at feed bottom, filter change overlay (opacity fade on carousel + feed during re-render). | components/sun-kudos/kudos-feed.tsx

### Empty States

- [x] T065 Add empty state rendering to all data-dependent components: KudosFeed ("Hiện tại chưa có Kudos nào."), HighlightCarousel (same), SpotlightBoard (placeholder graphic), Leaderboard ("Chưa có dữ liệu"). All text via i18n keys. | components/sun-kudos/kudos-feed.tsx, components/sun-kudos/highlight-carousel.tsx, components/sun-kudos/spotlight-board.tsx, components/sun-kudos/leaderboard.tsx

### Responsive Design

- [x] T066 Implement mobile responsive (< 640px): page padding 16px, section titles 28px (from 57px), single-card carousel (no side cards, arrows 36x36), stacked feed+sidebar layout, card padding 16px, avatars 32x32, image thumbs 60x60, CTA fields 100% width, footer flex-wrap. | All components in components/sun-kudos/
- [x] T067 [P] Implement tablet responsive (640px–1023px): page padding 48px, CTA 400px, partial side cards in carousel, sidebar below feed at md / two-column at lg, image thumbs 64x64. | All components in components/sun-kudos/

### Accessibility

- [x] T068 Add ARIA attributes: carousel `role="region"` + `aria-label="Highlight Kudos carousel"`, arrow buttons `aria-label="Previous/Next slide"`, page indicator `aria-live="polite"`, heart buttons `aria-label="Like/Unlike"` + `aria-pressed`, filter dropdowns ARIA listbox pattern, infinite scroll sentinel `aria-live="polite"`, toast `role="status"`, images `alt` text, decorative icons `aria-hidden="true"`, focus indicators (2px solid #FFEA9E). | All interactive components
- [x] T069 [P] Add keyboard navigation: carousel arrows respond to Left/Right keys, filter dropdowns operable with Enter/Space/Arrow, tab order follows visual order, Esc closes dropdowns. Add skip navigation link before header. | components/sun-kudos/highlight-carousel.tsx, components/sun-kudos/filter-dropdown-button.tsx, app/(main)/sun-kudos/client.tsx

### Animations

- [x] T070 Add CSS transitions: carousel slide (transform+opacity 400ms ease-in-out), carousel card scale (300ms ease-out), heart toggle (color+scale-bounce 200ms), filter dropdown (opacity+translateY 200ms), toast slide-in (200ms) + auto-dismiss (3s), card hover (box-shadow 150ms), copy link hover (color 100ms), image thumbnail hover (opacity+scale 150ms), profile preview (opacity+scale 200ms, 300ms delay), page indicator update (opacity 100ms). | All interactive components

### CSS Edge Cases

- [x] T071 Implement CSS edge cases: long usernames `truncate` (text-overflow ellipsis + overflow hidden), sidebar independent scroll (`overflow-y-auto` + `sticky top-[100px]` + `max-h-[calc(100vh-120px)]`), two-column fit (`flex-shrink` on sidebar for 30px overflow). Anonymous kudo display: conditional sender info showing anonymous_name or "Ẩn danh" with generic avatar. | components/sun-kudos/user-info.tsx, components/sun-kudos/all-kudos-section.tsx, components/sun-kudos/kudo-post-card.tsx

**Checkpoint**: All features polished, responsive, accessible, and production-ready.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ─────┐
                      ├──► Phase 2 (Foundation) ─────┐
Phase 1 completes ────┘                              │
                                                      ├──► Phase 3 (US9: KV Banner)
                                                      │        │
                                                      │        ▼
                                                      ├──► Phase 4 (US2: Carousel)
                                                      │        │
                                                      │        ▼
                                                      ├──► Phase 5 (US1: Feed) ──────► Phase 6 (US6: Stats)
                                                      │        │
                                                      │        ▼
                                                      ├──► Phase 7 (US3: Like) ──────► Phase 8 (US4: Filter)
                                                      │
                                                      ├──► Phase 9 (US5+US8+US10)
                                                      │
                                                      └──► Phase 10 (US7+US11: Spotlight)
                                                      
All Phases ──────────────────────────────────────────────► Phase 11 (Polish)
```

### Critical Path

1. **Phase 1 + 2** (Foundation) → **Phase 4** (Carousel, builds shared card components) → **Phase 5** (Feed, reuses shared components) → **Phase 7** (Like, integrates with cards) → **Phase 8** (Filter, connects sections)

### Parallel Opportunities

- **Phase 1**: T002, T003, T004 can all run in parallel
- **Phase 2**: T007–T013 (icons), T015–T021 (shared components), T022–T024 (services), T026–T030 (hooks) are all parallelizable
- **After Foundation**: Phase 3 (US9) and Phase 10 (US7) can start in parallel (independent sections)
- **Phase 9**: US5, US8, US10 are independent of each other
- **Phase 11**: T062, T063, T067, T069 are parallelizable

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Foundation)
2. Complete Phase 3 (US9: KV Banner — minimal visible output)
3. Complete Phase 4 (US2: Highlight Carousel — showpiece)
4. **STOP AND VALIDATE**: Carousel renders with real data, WriteKudoModal opens
5. Complete Phase 5 (US1: Feed — core content)
6. Complete Phase 6 (US6: Stats sidebar)
7. **STOP AND VALIDATE**: Full page renders with feed + sidebar
8. Deploy MVP

### Incremental Delivery

1. Foundation → US9 (KV) → US2 (Carousel) → **Deploy v1** (top half of page)
2. US1 (Feed) → US6 (Stats) → US3 (Like) → US4 (Filter) → **Deploy v2** (full page)
3. US5 + US8 + US10 → **Deploy v3** (interactions)
4. US7 + US11 (Spotlight) → **Deploy v4** (spotlight)
5. Polish → **Deploy v5** (production-ready)

---

## Notes

- Commit after each task or logical group of parallel tasks
- Run `vitest run` before moving to next phase
- Update spec.md if requirements change during implementation
- Mark tasks complete as you go: `[x]`
- All components use `useLanguage()` for user-visible text — no hardcoded strings
- Server Components (RSC) by default — add `"use client"` only per the classification table in plan.md
- Existing `WriteKudoModal` is fully built — just wire it to KudoCTAField onClick
- `page.tsx` reads `searchParams` prop and re-executes on every filter change (Next.js App Router behavior)
- Use `key` prop on KudosFeed and HighlightCarousel derived from active filters to force state reset on filter change
