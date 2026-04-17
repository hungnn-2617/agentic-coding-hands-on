# Tasks: Hệ thống giải (Prize System)

**Frame**: `zFYDgyj_pD-he-thong-giai`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3, US4, US6)
- **|**: File path affected by this task

---

## Phase 1: Setup (Asset Preparation)

**Purpose**: Download all required assets from Figma and prepare project structure

- [x] T001 Create `public/images/awards-information/` directory for prize system assets
- [ ] T002 [P] Download 6 award images (336x336px) from Figma using MoMorph `get_media_files` tool to `public/images/awards-information/` (top-talent.png, top-project.png, top-project-leader.png, best-manager.png, signature-2025.png, mvp.png)
- [ ] T003 [P] Download hero keyvisual image from Figma to `public/images/awards-information/keyvisual.png`
- [ ] T004 [P] Download Sun* Kudos illustration from Figma to `public/images/awards-information/kudos-illustration.png`
- [ ] T005 [P] Obtain SVN-Gotham font file (.woff2) and place in `public/fonts/svn-gotham.woff2`
- [x] T006 Create `components/awards-information/` directory structure

---

## Phase 2: Foundation (Types, Data, i18n, Font)

**Purpose**: Extend existing data model and i18n — BLOCKS all user story work

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Extend `AwardCategory` interface with prize system fields (`fullDescription`, `fullDescriptionEn`, `imageUrl`, `prizeCount`, `prizeUnit`, `prizeUnitEn`, `prizeValues`) | `types/awards.ts`
- [x] T008 Extend `AWARD_CATEGORIES` static data with bilingual prize data for all 6 awards (counts, units vi/en, values with labelEn, full descriptions vi/en). Special case: Signature 2025 has dual `prizeValues`. | `lib/data/awards.ts`
- [x] T009 [P] Add 11 new `TranslationKey` union members prefixed with `prizePage.*` (`prizePage.subtitle`, `prizePage.title`, `prizePage.sidebar.ariaLabel`, `prizePage.prizeCount.label`, `prizePage.prizeValue.label`, `prizePage.orDivider`, `prizePage.kudos.badge`, `prizePage.kudos.label`, `prizePage.kudos.title`, `prizePage.kudos.description`, `prizePage.kudos.cta`) | `lib/i18n/types.ts`
- [x] T010 [P] Add Vietnamese translations for all `prizePage.*` keys per plan.md i18n Strategy table | `lib/i18n/locales/vi.ts`
- [x] T011 [P] Add English translations for all `prizePage.*` keys. Use `[EN_PENDING]` prefix for long descriptions if content team hasn't provided official text | `lib/i18n/locales/en.ts`
- [ ] T012 Register SVN-Gotham font via `next/font/local`, expose as CSS variable `--font-svn-gotham`, add to `<html>` className | `app/layout.tsx`

**Checkpoint**: Foundation ready — types compile, data loads, translations resolve, font renders

---

## Phase 3: User Story 1 — View Award Categories (Priority: P1) MVP

**Goal**: Display all 6 award categories with correct bilingual data — hero, title, 6 award cards with alternating layout, glassmorphism, and proper typography.

**Independent Test**: Load `/awards-information`, verify all 6 awards display with correct names, descriptions, prize counts, and values. Switch language to English and verify content updates.

### Components (US1)

- [x] T013 [P] [US1] Create `PrizeHeroSection` (RSC) — full-width hero keyvisual banner with `next/image` priority loading + gradient overlay via CSS pseudo-element. Reference design-style.md KeyVisual section (w:1440, h:547px). | `components/awards-information/prize-hero-section.tsx`
- [x] T014 [P] [US1] Create `PrizeTitleSection` (`'use client'`) — uses `t('prizePage.subtitle')` and `t('prizePage.title')`. Center-aligned, responsive font sizes (57px desktop → 32px mobile). Gold color #FFEA9E for title. | `components/awards-information/prize-title-section.tsx`
- [x] T015 [P] [US1] Create `AwardImage` (child of client) — 336x336px, `next/image`, rounded-3xl (24px), gold border (1px #FFEA9E), golden glow shadow (`0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287`), `mix-blend-mode: screen`. Props: `imageUrl`, `altText`. | `components/awards-information/award-image.tsx`
- [x] T016 [P] [US1] Create `OrDivider` (child of client) — receives `text` prop ("Hoặc"/"Or"). Flex row: `[line flex-1 h-px bg-#2E3940] — [text 14px/700 #2E3940] — [line]`. Gap 8px. Only rendered when `prizeValues.length > 1`. | `components/awards-information/or-divider.tsx`
- [x] T017 [US1] Create `AwardContentPanel` (child of client) — glassmorphism panel (backdrop-filter: blur(32px), bg: rgba(255,255,255,0.05), rounded-2xl 16px, padding 32px, gap 32px). Receives translated props: `title`, `description`, `countLabel`, `count`, `unit`, `valueLabel`, `values[]`, `orDividerText`. Uses `@supports` fallback for backdrop-filter. Typography per design-style.md Content Typography table. | `components/awards-information/award-content-panel.tsx`
- [x] T018 [US1] Create `AwardDetailCard` (child of client) — receives resolved props. Flex row (gap 40px), `flex-row-reverse` when `isReversed`. Contains `AwardImage` + `AwardContentPanel`. Has `id={slug}` for scroll-spy. Section divider (1px #2E3940) after card, gap 80px between cards. | `components/awards-information/award-detail-card.tsx`
- [x] T019 [US1] Create `PrizeContentSection` (`'use client'`) — imports `AWARD_CATEGORIES` from `@/lib/data/awards`. Uses `useLanguage()` for locale + `t()`. Maps award data to `AwardDetailCard` with locale-resolved content (`locale === 'en' ? award.fullDescriptionEn : award.fullDescription`). Flex row layout: sidebar (178px) + cards list (flex-1), gap 80px. | `components/awards-information/prize-content-section.tsx`
- [x] T020 [US1] Create barrel export `index.ts` — export all components from the feature directory | `components/awards-information/index.ts`
- [x] T021 [US1] Create page `app/(main)/awards-information/page.tsx` (RSC) — export metadata (`title: 'Award Information | SAA 2025'`). Compose: `PrizeHeroSection` → `PrizeTitleSection` → `PrizeContentSection` → (SunKudosPromo placeholder). Wrap content in container with padding 96px 144px desktop, gap 120px between sections. | `app/(main)/awards-information/page.tsx`

### Tests (US1)

- [ ] T022 [US1] Write tests for `PrizeContentSection` — renders all 6 award cards with correct data, alternating layout (odd=picture-left, even=picture-right), i18n locale switching updates descriptions/units | `components/awards-information/__tests__/prize-content-section.test.tsx`
- [ ] T023 [P] [US1] Write tests for `AwardContentPanel` — renders prize count/value, Signature 2025 shows dual values with "Hoặc" divider, regular cards show single value | `components/awards-information/__tests__/award-content-panel.test.tsx`

**Checkpoint**: US1 complete — page loads with 6 award cards, bilingual content, alternating layout, glassmorphism

---

## Phase 4: User Story 2 — Sidebar Navigation + Scroll-Spy (Priority: P1)

**Goal**: Sticky sidebar with 6 menu items, smooth-scroll on click, scroll-spy active state tracking, URL hash sync.

**Independent Test**: Click each sidebar item — page scrolls to correct section. Scroll manually — active sidebar item updates. Load `/awards-information#best-manager` — page auto-scrolls.

### Hook (US2)

- [x] T024 [US2] Create `useScrollSpy` hook — accepts `sectionIds: string[]`, uses `IntersectionObserver` with `threshold: 0.3` and `rootMargin: '-104px 0px 0px 0px'` (header offset). Returns `activeSectionId`. Updates `window.location.hash` via `history.replaceState`. Reads hash on mount for deep linking. Respects `prefers-reduced-motion` media query. | `hooks/use-scroll-spy.ts`

### Components (US2)

- [x] T025 [US2] Create `PrizeSidebar` (`'use client'`) — sticky (top: 104px), 178px wide, `align-self: flex-start`. Uses `useScrollSpy` hook. Renders 6 `<a href="#slug">` items. Active: gold #FFEA9E + underline + icon. Inactive: white #FFF. Wrapped in `<nav aria-label={t('prizePage.sidebar.ariaLabel')}>`. Active item: `aria-current="true"`. On click: `element.scrollIntoView({ behavior })` with reduced-motion check. Font: 14px/700 Montserrat, tracking 0.25px, gap 16px between items. | `components/awards-information/prize-sidebar.tsx`
- [x] T026 [US2] Integrate `PrizeSidebar` into `PrizeContentSection` — render sidebar alongside award cards in flex row layout. Pass `sectionIds` from `AWARD_CATEGORIES.map(a => a.slug)`. Mobile: sidebar becomes horizontal scroll tabs above cards (Phase 6). | `components/awards-information/prize-content-section.tsx`

### Tests (US2)

- [ ] T027 [US2] Write tests for `useScrollSpy` — mock IntersectionObserver, test active section detection on intersection callback, test hash update via `history.replaceState`, test initial hash read on mount, test `prefers-reduced-motion` disables smooth scroll | `hooks/__tests__/use-scroll-spy.test.ts`
- [ ] T028 [P] [US2] Write tests for `PrizeSidebar` — renders 6 menu items, active item has `aria-current="true"`, click triggers scroll, `<nav>` has `aria-label` | `components/awards-information/__tests__/prize-sidebar.test.tsx`

**Checkpoint**: US2 complete — sidebar scroll-spy works, hash deep linking works

---

## Phase 5: User Story 3 — Sun* Kudos Promotional Card (Priority: P2)

**Goal**: Sun* Kudos promotional section with CTA linking to Kudos page, full i18n, SVN-Gotham decorative text.

**Independent Test**: Verify SunKudos card renders with label, title, description, CTA button. Click CTA navigates to `/sun-kudos`. Switch language — text updates.

### Components (US3)

- [x] T029 [US3] Create `SunKudosPromo` (`'use client'`) — uses `t('prizePage.kudos.*')` keys. Flex-row layout (content 470px left, illustration 272x219px right). Dark bg #0F0F0F, rounded-2xl, overflow hidden, position relative. Content: label (14px), title (57px/700), description (16px/700), gold CTA button. Decorative "KUDOS" text absolute-positioned (SVN-Gotham 96px, #DBD1C1). CTA: `<Link href="/sun-kudos">` with ArrowRightIcon, gold bg #FFEA9E, text #00101A, rounded, hover: translateY(-1px) + shadow, focus: gold outline. | `components/awards-information/sun-kudos-promo.tsx`
- [x] T030 [US3] Integrate `SunKudosPromo` into page — replace placeholder in `page.tsx`. Position after `PrizeContentSection`, within the main content container with 120px gap. | `app/(main)/awards-information/page.tsx`

### Tests (US3)

- [ ] T031 [US3] Write tests for `SunKudosPromo` — renders label/title/description from `t()`, CTA button links to `/sun-kudos`, i18n text switches on locale change, decorative "KUDOS" text renders | `components/awards-information/__tests__/sun-kudos-promo.test.tsx`

**Checkpoint**: US3 complete — Kudos card renders with i18n, CTA navigates correctly

---

## Phase 6: User Story 4 — Responsive Design (Priority: P2)

**Goal**: Mobile-first responsive layout across all breakpoints per design-style.md Responsive Specifications.

**Independent Test**: Resize viewport to mobile (<640px), tablet (640-1023px), desktop (>=1024px). Verify layout adapts correctly at each breakpoint without horizontal scroll.

### Responsive Implementation (US4)

- [ ] T032 [US4] Add mobile responsive styles to `PrizeHeroSection` — scale hero image, adjust gradient overlay | `components/awards-information/prize-hero-section.tsx`
- [ ] T033 [P] [US4] Add mobile/tablet responsive styles to `PrizeTitleSection` — font-size 32px mobile, 40px tablet, 57px desktop | `components/awards-information/prize-title-section.tsx`
- [ ] T034 [US4] Add mobile/tablet responsive styles to `PrizeContentSection` — mobile: flex-col (sidebar above cards), tablet: flex-col with horizontal tab bar, desktop: flex-row. Adjust padding: 16px mobile, 24px 48px tablet, 96px 144px desktop. | `components/awards-information/prize-content-section.tsx`
- [ ] T035 [P] [US4] Add mobile/tablet responsive styles to `PrizeSidebar` — mobile: horizontal scroll tabs (flex-row, overflow-x-auto), tablet: horizontal tab bar, desktop: sticky vertical sidebar (178px) | `components/awards-information/prize-sidebar.tsx`
- [ ] T036 [US4] Add mobile/tablet responsive styles to `AwardDetailCard` — mobile: flex-col (picture on top, content below, gap 24px), picture max-w-336px centered. Tablet: picture 240px, content fill. Desktop: flex-row, gap 40px. | `components/awards-information/award-detail-card.tsx`
- [ ] T037 [P] [US4] Add mobile/tablet responsive styles to `AwardContentPanel` — mobile: width 100%, font-size adjustments (prize value 24px instead of 36px). Desktop: 480px fixed width. | `components/awards-information/award-content-panel.tsx`
- [ ] T038 [P] [US4] Add mobile/tablet responsive styles to `SunKudosPromo` — mobile: flex-col stack (illustration below or hidden), tablet: side-by-side tighter. Desktop: full row layout. | `components/awards-information/sun-kudos-promo.tsx`
- [ ] T039 [US4] Add responsive styles to page container in `page.tsx` — adjust section gaps: 64px mobile, 80px tablet, 120px desktop | `app/(main)/awards-information/page.tsx`

**Checkpoint**: US4 complete — layout works across all breakpoints

---

## Phase 7: User Story 6 — Accessibility + Edge Cases (Priority: P2)

**Goal**: WCAG AA compliance, keyboard navigation, focus indicators, image fallbacks, print stylesheet, empty data handling.

**Independent Test**: Tab through page with keyboard — all interactive elements reachable with visible gold focus indicators. Run Lighthouse Accessibility audit >= 90.

### Accessibility (US6)

- [ ] T040 [US6] Add semantic HTML landmarks — wrap award card list in `<section>`, each card in `<article>`. Verify `<nav>` on sidebar (already from T025). Ensure all `id` attributes for sections. | `components/awards-information/prize-content-section.tsx`
- [ ] T041 [P] [US6] Add focus indicators to all interactive elements — gold outline (2px solid #FFEA9E, offset 2px) on sidebar items, CTA button. Use `focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2` | `components/awards-information/prize-sidebar.tsx`, `components/awards-information/sun-kudos-promo.tsx`
- [ ] T042 [P] [US6] Add image fallback for failed award images — CSS `object-fit: cover` + `onError` handler showing themed placeholder (dark bg + gold border + award name text) maintaining 336x336px | `components/awards-information/award-image.tsx`
- [ ] T043 [P] [US6] Add empty data guard — if `award.prizeValues?.length === 0`, render fallback text "Thông tin sẽ được cập nhật" / "Information will be updated" instead of prize section. Sidebar still shows item. | `components/awards-information/award-content-panel.tsx`
- [ ] T044 [P] [US6] Add print stylesheet — `@media print` overrides: remove glassmorphism (solid bg), black text on white bg, hide decorative elements, ensure readable layout | `app/globals.css` or inline in components
- [ ] T045 [US6] Verify keyboard navigation flow — Tab order: header nav → sidebar items → CTA button → footer. Enter on sidebar item triggers scroll. Ensure `prefers-reduced-motion` is respected in `useScrollSpy`. | Manual verification + update `hooks/use-scroll-spy.ts` if needed

**Checkpoint**: US6 complete — Lighthouse Accessibility >= 90, keyboard navigation works

---

## Phase 8: Design-Style Corrections & Polish

**Purpose**: Fix design-style deviations found in plan review (pass 4) + final refinements

### Design-Style Corrections (from plan review 2026-04-17)

- [x] T046a [P] Add `prizePage.kudos.badge` i18n key — add to `TranslationKey` type, add Vietnamese "ĐIỂM MỚI CỦA SAA 2025" to `vi.ts`, add English "NEW IN SAA 2025" to `en.ts` | `lib/i18n/types.ts`, `lib/i18n/locales/vi.ts`, `lib/i18n/locales/en.ts`
- [x] T046b Fix `SunKudosPromo` — add badge label rendering `t('prizePage.kudos.badge')` as 14px text above subtitle. Change subtitle "Phong trào ghi nhận" from text-sm (14px) to text-2xl (24px). Change title "Sun* Kudos" color from `text-white` to `text-[#FFEA9E]` (gold). Reference design-style.md SunKudos Card Content Typography table. | `components/awards-information/sun-kudos-promo.tsx`
- [x] T046c [P] Fix `AwardContentPanel` — change award title color from `text-white` to `text-[#FFEA9E]` (gold). Change "Số lượng giải thưởng:" and "Giá trị giải thưởng:" label colors from `text-white` to `text-[#FFEA9E]` (gold). Reference design-style.md Content Typography table. | `components/awards-information/award-content-panel.tsx`

### General Polish

- [ ] T047 [P] Verify all `next/image` components have proper `sizes` attribute for responsive loading. First award image uses `priority`, rest use lazy loading. | All award-image usages
- [ ] T048 [P] Run ESLint (`npm run lint`) — fix any errors across all new/modified files | All files
- [ ] T049 [P] Run TypeScript check (`npx tsc --noEmit`) — fix any type errors | All files
- [ ] T050 Run full test suite (`npm run test:run`) — verify all tests pass | All test files
- [ ] T051 Run `next build` — verify production build succeeds with no errors | Build output
- [ ] T052 Visual QA — compare rendered page against Figma design screenshot at desktop (1440px), verify pixel-level accuracy for colors, typography, spacing, glassmorphism, golden glow, alternating layouts | Browser at localhost:3000/awards-information
- [ ] T053 Test language switching — toggle VN/EN, verify all UI labels (including kudos badge "ĐIỂM MỚI CỦA SAA 2025"→"NEW IN SAA 2025") and award content update correctly without page reload | Browser test

**Checkpoint**: Feature complete — all phases pass, production build succeeds

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ─────┐
                      ├──→ Phase 2 (Foundation) ──→ Phase 3 (US1) ──→ Phase 4 (US2)
                      │                                                     │
                      │                             Phase 5 (US3) ←────────┘
                      │                                  │
                      │                             Phase 6 (US4) ──→ Phase 7 (US6)
                      │                                                     │
                      └─────────────────────────────────────────── Phase 8 (Polish)
```

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundation)**: Depends on Phase 1 — BLOCKS all user stories
- **Phase 3 (US1)**: Depends on Phase 2 — core page must exist before sidebar/kudos
- **Phase 4 (US2)**: Depends on Phase 3 — sidebar needs award card sections to scroll to
- **Phase 5 (US3)**: Depends on Phase 4 — integrates into page after content section
- **Phase 6 (US4)**: Depends on Phase 5 — responsive applied to all components
- **Phase 7 (US6)**: Depends on Phase 6 — accessibility applied to final responsive layout
- **Phase 8 (Polish)**: Depends on Phase 7 — final validation

### Within Each User Story

- Components marked [P] can run in parallel within the same phase
- Non-[P] components depend on previous tasks (e.g., T019 depends on T015-T018)
- Tests depend on the component they test being created first
- Integration tasks (T026, T030) depend on both the component and the target it integrates into

### Parallel Opportunities

**Phase 1**: T002, T003, T004, T005 can all run in parallel (independent file downloads)
**Phase 2**: T009, T010, T011 can run in parallel (different files). T007 must complete before T008.
**Phase 3**: T013, T014, T015, T016 can run in parallel (independent components). T017 depends on T016. T018 depends on T015+T017. T019 depends on T018.
**Phase 6**: T033, T035, T037, T038 can run in parallel (different files)
**Phase 7**: T041, T042, T043, T044 can run in parallel (different files)
**Phase 8**: T046, T047, T048 can run in parallel

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation)
2. Complete Phase 3 (US1 — Award Cards)
3. **STOP and VALIDATE**: Load page, verify 6 awards display correctly in both languages
4. Continue Phase 4 (US2 — Sidebar) → Phase 5 (US3 — Kudos)
5. Deploy core feature

### Incremental Delivery

1. **Phase 1+2**: Setup + Foundation → verify types compile, data loads
2. **Phase 3 (US1)**: Award Cards → test → verify content displays
3. **Phase 4 (US2)**: Sidebar → test → verify scroll-spy works
4. **Phase 5 (US3)**: Kudos Card → test → verify CTA navigates
5. **Phase 6 (US4)**: Responsive → visual test at all breakpoints
6. **Phase 7 (US6)**: Accessibility → Lighthouse audit
7. **Phase 8**: Polish → final build + QA

---

## Summary

| Metric | Value |
|---|---|
| **Total tasks** | 55 |
| **Phase 1 (Setup)** | 6 tasks |
| **Phase 2 (Foundation)** | 6 tasks |
| **Phase 3 (US1 — Award Cards)** | 11 tasks (9 components + 2 tests) |
| **Phase 4 (US2 — Sidebar)** | 5 tasks (1 hook + 2 components + 2 tests) |
| **Phase 5 (US3 — Kudos)** | 3 tasks (1 component + 1 integration + 1 test) |
| **Phase 6 (US4 — Responsive)** | 8 tasks |
| **Phase 7 (US6 — Accessibility)** | 6 tasks |
| **Phase 8 (Corrections + Polish)** | 10 tasks (3 design-style corrections + 7 polish) |
| **Parallel opportunities** | 26 tasks marked [P] |
| **New files created** | 15 |
| **Existing files modified** | 6 |
| **Test files** | 5 |
| **MVP scope** | Phase 1+2+3 (23 tasks) |
| **Tasks completed** | ~21 (Phase 1-5 mostly done, Phase 6-8 pending) |

---

## Notes

- Commit after each task or logical group of related tasks
- Run tests before moving to next phase
- Update this file with `[x]` as tasks are completed
- Reference `design-style.md` for exact pixel values, colors, typography during implementation
- Reference `plan.md` i18n Strategy section for translation key values and locale resolution pattern
- All components use Tailwind utilities + existing CSS variables from `globals.css`
- Follow the homepage component pattern for `'use client'` / RSC boundaries
