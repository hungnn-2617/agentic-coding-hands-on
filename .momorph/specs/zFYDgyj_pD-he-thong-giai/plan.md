# Implementation Plan: Hệ thống giải (Prize System)

**Frame**: `zFYDgyj_pD-he-thong-giai`
**Date**: 2026-04-17
**Reviewed**: 2026-04-17 (4 passes — i18n strategy, spec coverage, consistency, plan review)
**Spec**: `specs/zFYDgyj_pD-he-thong-giai/spec.md`

---

## Summary

Build the Prize System page (`/awards-information`) — a read-only informational page showcasing 6 SAA 2025 award categories with hero keyvisual, sticky sidebar navigation with scroll-spy, alternating-layout award cards with glassmorphism effects, and a Sun* Kudos promotional section. **Full multi-language (vi/en) support** is required, using the existing `useLanguage()` hook for UI labels and data-level `En` suffix fields for award-specific content. The page root is an RSC (for metadata), but content sections are `"use client"` because they consume the i18n context — consistent with the homepage pattern.

---

## Technical Context

**Language/Framework**: TypeScript 5.x / Next.js 16.x (App Router)
**Primary Dependencies**: React 19.x, Tailwind CSS 4.x
**Database**: N/A (static data, no DB queries)
**Testing**: Vitest + @testing-library/react
**State Management**: Local client state (IntersectionObserver for scroll-spy)
**API Style**: N/A (static data in `lib/data/awards.ts`)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case files, PascalCase components, `@/` imports)
- [x] Uses approved libraries and patterns (Tailwind, next/image, next/font)
- [x] Adheres to folder structure guidelines (`app/(main)/`, `components/`, `hooks/`, `types/`, `lib/`)
- [x] Meets security requirements (no user input, no data mutations, RSC by default)
- [x] Follows testing standards (Vitest, co-located tests)

**Violations**: None

**Notes**:
- SVN-Gotham font for decorative "KUDOS" text is not in the approved stack (Montserrat/Montserrat Alternates). This is a **local font** added specifically for this design element. Load via `next/font/local` — consistent with constitution principle II (Next.js best practices).

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based directory `components/awards-information/` with focused components per section
- **Styling Strategy**: Tailwind utilities with existing CSS variables from `globals.css`. No new dependencies.
- **Data Fetching**: No fetching — static data from `lib/data/awards.ts` (extended with prize info). Page is a React Server Component.
- **Client Boundary**: Most content components need `"use client"` because they call `useLanguage()` for i18n. This matches the homepage pattern where `AwardsSection`, `AwardCard`, `KudosSection`, `AboutContent`, `CtaButtons` are all `'use client'`. Only `PrizeHeroSection` (pure image, no text) can remain RSC.

### i18n Strategy (Multi-Language)

The existing i18n system uses a **React Context + hook pattern** (`LanguageProvider` → `useLanguage()`). This means any component rendering translated text **must** be a `"use client"` component. The strategy follows two tiers:

**Tier 1 — UI Labels (via `t()` translation keys)**:
Short, reusable labels that appear in translations files (`vi.ts` / `en.ts`).

| Key | Vietnamese | English |
|---|---|---|
| `prizePage.subtitle` | `Sun* Annual Awards 2025` | `Sun* Annual Awards 2025` |
| `prizePage.title` | `Hệ thống giải thưởng SAA 2025` | `SAA 2025 Award System` |
| `prizePage.sidebar.ariaLabel` | `Danh mục giải thưởng` | `Award Categories` |
| `prizePage.prizeCount.label` | `Số lượng giải thưởng:` | `Number of prizes:` |
| `prizePage.prizeValue.label` | `Giá trị giải thưởng:` | `Prize value:` |
| `prizePage.orDivider` | `Hoặc` | `Or` |
| `prizePage.kudos.badge` | `ĐIỂM MỚI CỦA SAA 2025` | `NEW IN SAA 2025` |
| `prizePage.kudos.label` | `Phong trào ghi nhận` | `Recognition Movement` |
| `prizePage.kudos.title` | `Sun* Kudos` | `Sun* Kudos` |
| `prizePage.kudos.description` | *(full Vietnamese text)* | *(full English text)* |
| `prizePage.kudos.cta` | `Chi tiết` | `Details` |

**Tier 2 — Award-specific content (via data-level `En` suffix)**:
Long, unique-per-award content stored in `lib/data/awards.ts`. Components select the right locale:
```typescript
const { locale } = useLanguage();
const description = locale === 'en'
  ? (award.fullDescriptionEn ?? award.fullDescription)
  : award.fullDescription;
```

This applies to: `fullDescription`, `prizeUnit`, `prizeValues[].label` (e.g., "cho mỗi giải thưởng"/"per prize", "cho giải cá nhân"/"for individual prize", "cho giải tập thể"/"for team prize").

**Component → Client/Server classification**:

| Component | RSC or Client | Why |
|---|---|---|
| `page.tsx` | RSC | Exports metadata, composes sections |
| `PrizeHeroSection` | RSC | Pure image, no translated text |
| `PrizeTitleSection` | **Client** | Uses `t('prizePage.title')` |
| `PrizeSidebar` | **Client** | Uses `t()` + `useScrollSpy` + IntersectionObserver |
| `PrizeContentSection` | **Client** | Uses `useLanguage()` for locale, resolves bilingual data, passes translated props down |
| `AwardDetailCard` | Child of client | Receives translated props from `PrizeContentSection` |
| `AwardContentPanel` | Child of client | Receives translated props (no own `useLanguage`) |
| `AwardImage` | Child of client | Pure display, no translations |
| `OrDivider` | Child of client | Receives translated "Hoặc" / "Or" as prop |
| `SunKudosPromo` | **Client** | Uses `t('prizePage.kudos.*')` |

### Key Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Page route | `app/(main)/awards-information/page.tsx` | Matches `(main)` layout group with shared header/footer. URL slug matches nav link pattern. |
| Data source | Extend `lib/data/awards.ts` + `types/awards.ts` | Award data already exists. Add prize fields. Keeps static, no API needed. |
| Scroll-spy | Custom `useScrollSpy` hook with IntersectionObserver | No dependency needed. Constitution prefers no unnecessary libraries. Lightweight. |
| Alternating layout | `flex-direction: row-reverse` on even cards | Simpler than CSS order — one prop flip per card based on index. |
| SVN-Gotham font | `next/font/local` with font file in `public/fonts/` | Only used for decorative "KUDOS" text in SunKudos card. Minimal impact. |
| Glassmorphism fallback | `@supports` CSS query | Solid dark background as fallback for browsers without `backdrop-filter`. |
| i18n — UI labels | Add 11 new keys to `vi.ts`/`en.ts` via `t()` hook | Short reusable labels (page title, sidebar, card labels, kudos section). Follows existing pattern. |
| i18n — Award content | Data-level `En` suffix fields in `AwardCategory` | Long unique descriptions per award. Same pattern as existing `description`/`descriptionEn`. |
| i18n — Client boundary | Most content sections are `'use client'` | Required by `useLanguage()` hook (React Context). Matches homepage pattern exactly. |

### Integration Points

- **Shared Components**: `<MainHeader />`, `<MainFooter />` via `(main)/layout.tsx` — no changes needed
- **Existing Data**: `AWARD_CATEGORIES` in `lib/data/awards.ts` — extend, don't replace
- **Existing Types**: `AwardCategory` in `types/awards.ts` — add prize fields
- **Existing i18n**: Add keys to `vi.ts` / `en.ts` — follow existing pattern
- **Existing Icons**: Reuse `ArrowRightIcon` from `components/icons/`
- **Navigation**: Header nav already links to "Award Information" — just needs the route to exist

---

## Project Structure

### Documentation

```text
.momorph/specs/zFYDgyj_pD-he-thong-giai/
├── spec.md              # Feature specification ✅
├── design-style.md      # Design specifications ✅
├── plan.md              # This file ✅
├── tasks.md             # Task breakdown (next step)
└── assets/              # Screenshots
```

### New Files

| File | Purpose | Client/Server |
|---|---|---|
| `app/(main)/awards-information/page.tsx` | Page component — metadata + section composition | RSC |
| `components/awards-information/index.ts` | Barrel export | — |
| `components/awards-information/prize-hero-section.tsx` | Hero keyvisual banner (pure image, no text) | RSC |
| `components/awards-information/prize-title-section.tsx` | "Hệ thống giải thưởng SAA 2025" heading with `t()` | `'use client'` |
| `components/awards-information/prize-sidebar.tsx` | Sticky sidebar nav with scroll-spy, `t()` for labels + aria | `'use client'` |
| `components/awards-information/prize-content-section.tsx` | Wrapper: sidebar + award cards list, handles data mapping + locale | `'use client'` |
| `components/awards-information/award-detail-card.tsx` | Single award card with image + content + alternating layout | Child of client |
| `components/awards-information/award-content-panel.tsx` | Glassmorphism content panel with typography | Child of client |
| `components/awards-information/award-image.tsx` | Award image with golden glow effect | Child of client |
| `components/awards-information/or-divider.tsx` | "Hoặc"/"Or" divider for Signature 2025 dual values | Child of client |
| `components/awards-information/sun-kudos-promo.tsx` | Sun* Kudos promotional card with `t()` for text | `'use client'` |
| `hooks/use-scroll-spy.ts` | IntersectionObserver-based scroll-spy hook | Client hook |
| `public/fonts/svn-gotham.woff2` | SVN-Gotham font file for "KUDOS" decorative text | — |
| `public/images/awards-information/keyvisual.png` | Prize System hero keyvisual image | — |
| `public/images/awards-information/kudos-illustration.png` | Sun* Kudos illustration | — |

### Modified Files

| File | Changes |
|---|---|
| `types/awards.ts` | Add `fullDescription`, `fullDescriptionEn`, `imageUrl`, `prizeCount`, `prizeUnit`, `prizeUnitEn`, `prizeValues` (with `labelEn`) fields to `AwardCategory`. All new fields are additive — existing homepage usage is unaffected. |
| `lib/data/awards.ts` | Add prize data to all 6 categories: full Vietnamese + English descriptions, prize counts, units (vi/en), values with bilingual labels. |
| `lib/i18n/types.ts` | Add 11 new `TranslationKey` union members prefixed with `prizePage.*`: `subtitle`, `title`, `sidebar.ariaLabel`, `prizeCount.label`, `prizeValue.label`, `orDivider`, `kudos.badge`, `kudos.label`, `kudos.title`, `kudos.description`, `kudos.cta`. |
| `lib/i18n/locales/vi.ts` | Add Vietnamese translations for all `prizePage.*` keys including page title, sidebar labels, card labels, kudos section text. |
| `lib/i18n/locales/en.ts` | Add English translations for all `prizePage.*` keys. Mark long award descriptions with `[EN_PENDING]` if content team hasn't provided official translations yet. |
| `app/layout.tsx` | Register SVN-Gotham via `next/font/local` and expose as CSS variable `--font-svn-gotham`. |

### Dependencies

| Package | Version | Purpose |
|---|---|---|
| — | — | No new dependencies required |

---

## Implementation Strategy

### Phase 0: Asset Preparation

- Download **6 award images** from Figma (full-size, 336x336px) to `public/images/awards-information/`:
  - `top-talent.png`
  - `top-project.png`
  - `top-project-leader.png`
  - `best-manager.png`
  - `signature-2025.png`
  - `mvp.png`
- Download hero keyvisual image to `public/images/awards-information/keyvisual.png`
- Download Sun* Kudos illustration to `public/images/awards-information/kudos-illustration.png`
- **ROOT FURTHER logo**: Reuse existing `public/images/root-further-logo.png` from homepage — no separate download needed
- Obtain SVN-Gotham font file (.woff2) and place in `public/fonts/`
- Verify all images are optimized (WebP preferred, fallback PNG)

### Phase 1: Foundation — Types, Data, Translations, Font

**Goal**: Extend existing data model and i18n to fully support prize information in both Vietnamese and English.

1. **Extend `types/awards.ts`**: Add prize fields to `AwardCategory` interface
   ```typescript
   export interface AwardCategory {
     // existing fields (unchanged)...
     id: string;
     name: string;
     slug: string;
     description: string;
     descriptionEn?: string;
     thumbnailUrl: string;
     displayOrder: number;
     // NEW: Prize System fields
     fullDescription: string;
     fullDescriptionEn?: string;
     imageUrl: string;
     prizeCount: number;
     prizeUnit: string;
     prizeUnitEn?: string;
     prizeValues: Array<{
       amount: string;
       label: string;
       labelEn?: string;
     }>;
   }
   ```

2. **Extend `lib/data/awards.ts`**: Add bilingual prize data for all 6 categories:
   ```typescript
   {
     id: '1',
     name: 'Top Talent',
     slug: 'top-talent',
     // existing short description (for homepage)
     description: 'Vinh danh top cá nhân xuất sắc...',
     descriptionEn: 'Honoring top outstanding individuals...',
     thumbnailUrl: '/images/awards/top-talent.png',
     displayOrder: 1,
     // NEW: Prize System detailed data
     fullDescription: 'Giải thưởng Top Talent vinh danh những cá nhân...(full paragraph)',
     fullDescriptionEn: 'The Top Talent award honors individuals...(full paragraph)',
     imageUrl: '/images/awards-information/top-talent.png',
     prizeCount: 10,
     prizeUnit: 'Đơn vị',
     prizeUnitEn: 'Units',
     prizeValues: [
       { amount: '7.000.000 VNĐ', label: 'cho mỗi giải thưởng', labelEn: 'per prize' }
     ],
   }
   ```
   **Special case — Signature 2025**: Has dual `prizeValues`:
   ```typescript
   prizeValues: [
     { amount: '5.000.000 VNĐ', label: 'cho giải cá nhân', labelEn: 'for individual prize' },
     { amount: '8.000.000 VNĐ', label: 'cho giải tập thể', labelEn: 'for team prize' },
   ]
   ```

3. **Add i18n translation keys** (`lib/i18n/types.ts`, `vi.ts`, `en.ts`):

   Add to `TranslationKey` union type:
   ```typescript
   // Prize System Page
   | 'prizePage.subtitle'
   | 'prizePage.title'
   | 'prizePage.sidebar.ariaLabel'
   | 'prizePage.prizeCount.label'
   | 'prizePage.prizeValue.label'
   | 'prizePage.orDivider'
   | 'prizePage.kudos.badge'
   | 'prizePage.kudos.label'
   | 'prizePage.kudos.title'
   | 'prizePage.kudos.description'
   | 'prizePage.kudos.cta'
   ```

   Add translations to `vi.ts`:
   ```typescript
   'prizePage.kudos.badge': 'ĐIỂM MỚI CỦA SAA 2025',
   'prizePage.subtitle': 'Sun* Annual Awards 2025',
   'prizePage.title': 'Hệ thống giải thưởng SAA 2025',
   'prizePage.sidebar.ariaLabel': 'Danh mục giải thưởng',
   'prizePage.prizeCount.label': 'Số lượng giải thưởng:',
   'prizePage.prizeValue.label': 'Giá trị giải thưởng:',
   'prizePage.orDivider': 'Hoặc',
   'prizePage.kudos.label': 'Phong trào ghi nhận',
   'prizePage.kudos.title': 'Sun* Kudos',
   'prizePage.kudos.description': '...(full Vietnamese text)',
   'prizePage.kudos.cta': 'Chi tiết',
   ```

   Add matching translations to `en.ts`:
   ```typescript
   'prizePage.kudos.badge': 'NEW IN SAA 2025',
   'prizePage.subtitle': 'Sun* Annual Awards 2025',
   'prizePage.title': 'SAA 2025 Award System',
   'prizePage.sidebar.ariaLabel': 'Award Categories',
   'prizePage.prizeCount.label': 'Number of prizes:',
   'prizePage.prizeValue.label': 'Prize value:',
   'prizePage.orDivider': 'Or',
   'prizePage.kudos.label': 'Recognition Movement',
   'prizePage.kudos.title': 'Sun* Kudos',
   'prizePage.kudos.description': '[EN_PENDING] ...(English text)',
   'prizePage.kudos.cta': 'Details',
   ```

4. **Add SVN-Gotham font**: Register via `next/font/local` in `app/layout.tsx`:
   ```typescript
   import localFont from 'next/font/local';
   const svnGotham = localFont({
     src: '../public/fonts/svn-gotham.woff2',
     variable: '--font-svn-gotham',
     display: 'swap',
   });
   // Add to <html> className: `${svnGotham.variable}`
   ```

### Phase 2: Core Page + Award Cards (US1 — P1)

**Goal**: Display all 6 award categories with correct data in both languages. This is the core value of the page.

1. **Create page**: `app/(main)/awards-information/page.tsx` (RSC)
   - Exports metadata (static, not locale-aware — matches homepage pattern)
   - Imports and composes: `PrizeHeroSection`, `PrizeTitleSection`, `PrizeContentSection`, `SunKudosPromo`
   - Does NOT pass data as props — client components import `AWARD_CATEGORIES` directly (matches homepage pattern where `AwardsSection` imports data itself)
   - Also creates `components/awards-information/index.ts` barrel export for clean imports
   - **ROOT FURTHER logo overlay**: Renders `next/image` with `root-further-logo.png` (reused from homepage) between hero and main content, positioned with `absolute` + `translate-y-1/2` to overlap the hero bottom edge. Responsive sizing: 200px (mobile) → 280px (sm) → 338px (lg).

2. **Create `PrizeHeroSection`** (RSC): Hero keyvisual with gradient overlay
   - Full-width banner, `next/image` with priority loading
   - Gradient overlay via CSS pseudo-element
   - No text → no i18n needed → stays RSC

3. **Create `PrizeTitleSection`** (`'use client'`): Page heading section
   - Uses `t('prizePage.subtitle')` and `t('prizePage.title')`
   - Center-aligned text, responsive font sizes (57px → 32px mobile)

4. **Create `PrizeContentSection`** (`'use client'`): Main content wrapper
   - Imports `AWARD_CATEGORIES` directly from `@/lib/data/awards`
   - Uses `useLanguage()` to get `locale` and `t()`
   - Renders `PrizeSidebar` + award cards list side-by-side (desktop) or stacked (mobile)
   - Maps `AWARD_CATEGORIES` → `AwardDetailCard` with locale-resolved content:
     ```typescript
     const description = locale === 'en'
       ? (award.fullDescriptionEn ?? award.fullDescription)
       : award.fullDescription;
     const prizeUnit = locale === 'en'
       ? (award.prizeUnitEn ?? award.prizeUnit)
       : award.prizeUnit;
     ```
   - Passes resolved strings down to child components as props (children don't need own `useLanguage`)

5. **Create `AwardDetailCard`** (child of client): Award card with alternating layout
   - Props: resolved `title`, `description`, `prizeUnit`, `prizeValues`, `imageUrl`, `isReversed`, `slug`
   - Flex row with `flex-row-reverse` for even cards
   - Contains `AwardImage` + `AwardContentPanel`
   - `id={slug}` for anchor/scroll-spy targeting
   - Section divider between cards

6. **Create `AwardImage`** (child of client): Award picture with golden glow
   - 336x336px, rounded-3xl, gold border, glow shadow
   - `next/image`, `mix-blend-mode: screen`
   - `alt` text: award name (same in both languages — brand names)

7. **Create `AwardContentPanel`** (child of client): Glassmorphism content panel
   - Receives translated props: `title`, `description`, `countLabel`, `count`, `unit`, `valueLabel`, `values`
   - Backdrop blur(32px) + semi-transparent bg
   - `@supports` fallback for backdrop-filter

8. **Create `OrDivider`** (child of client): Divider for Signature 2025
   - Receives `text` prop (translated "Hoặc" / "Or" from parent)
   - Flex row with two lines and centered text
   - Only rendered when `prizeValues.length > 1`

### Phase 3: Sidebar Navigation + Scroll-Spy (US2 — P1)

**Goal**: Sticky sidebar with smooth-scroll and scroll-spy.

1. **Create `useScrollSpy` hook**:
   - Accept array of section IDs
   - Use `IntersectionObserver` with `threshold` and `rootMargin` (offset for sticky header)
   - Return `activeSectionId`
   - Respect `prefers-reduced-motion`
   - Update URL hash on section change

2. **Create `PrizeSidebar`** (`"use client"`):
   - Sticky positioned (top: 104px), 178px wide
   - Renders 6 menu items as `<a href="#slug">` elements
   - Active item: gold color + underline + icon indicator
   - On click: smooth-scroll to target section (instant if reduced-motion)
   - Uses `useScrollSpy` hook for active state
   - Wrapped in `<nav aria-label={t('prizePage.sidebar.ariaLabel')}>` — i18n-aware aria label
   - Active item has `aria-current="true"`
   - Award names are brand names (same in both languages) — no locale-switching needed for menu text
   - **Sidebar boundary**: CSS `position: sticky` naturally stops when the parent flex container (`PrizeContentSection`'s row layout) ends. The sidebar is inside the flex-row parent that contains sidebar + award cards. Once the user scrolls past the last award card and the parent container scrolls out of view, the sidebar detaches. The SunKudos section is **outside** this parent — no overlap possible by design.

3. **Add section IDs**: Each award card section gets `id={award.slug}` for anchor targeting

4. **URL hash sync**: `useScrollSpy` pushes `#slug` to URL on section change, reads hash on mount for deep linking

### Phase 4: Sun* Kudos Card + Polish (US3 — P2)

**Goal**: Kudos promotional section with full i18n and visual polish.

1. **Create `SunKudosPromo`** (`'use client'`): Promotional card
   - Uses `t('prizePage.kudos.badge')`, `t('prizePage.kudos.label')`, `t('prizePage.kudos.title')`, `t('prizePage.kudos.description')`, `t('prizePage.kudos.cta')`
   - Badge label "ĐIỂM MỚI CỦA SAA 2025" (14px) above the subtitle "Phong trào ghi nhận" (24px)
   - Flex-row layout: content left, illustration right, decorative "KUDOS" absolute
   - Gold CTA button linking to Sun* Kudos page (`/sun-kudos`)
   - SVN-Gotham font (`font-[family-name:var(--font-svn-gotham)]`) for decorative text
   - Dark card background (#0F0F0F), rounded-2xl

2. **CTA Button**: Reuse or extend existing Button component
   - Gold variant: bg #FFEA9E, text #00101A
   - Hover: translateY(-1px), shadow
   - Focus: gold outline
   - Arrow right icon
   - Text from `t('prizePage.kudos.cta')` — "Chi tiết" / "Details"

### Phase 5: Responsive Design (US4 — P2)

**Goal**: Mobile-first responsive layout across all breakpoints.

1. **Mobile (< 640px)**:
   - Sidebar → horizontal scroll tabs above cards
   - Award cards → vertical stack (picture on top, content below)
   - Title: 32px font-size
   - SunKudos card: vertical stack
   - Footer: column layout

2. **Tablet (640px - 1023px)**:
   - Sidebar → horizontal tab bar
   - Award cards → smaller picture (240px), content fills remaining
   - SunKudos: side-by-side but tighter

3. **Desktop (>= 1024px)**:
   - Full Figma layout: sidebar left, cards right
   - Match design pixel-perfect

### Phase 6: Accessibility + Edge Cases (US6 — P2)

**Goal**: WCAG AA compliance and edge case handling.

1. **Semantic HTML**: `<nav>`, `<section>`, `<article>` landmarks
2. **ARIA**: `aria-label` on sidebar nav, `aria-current` on active item
3. **Focus indicators**: Gold outline (2px, offset 2px) on all interactive elements
4. **Keyboard navigation**: Tab order through sidebar items, Enter to scroll
5. **Reduced motion**: `prefers-reduced-motion: reduce` → instant scroll
6. **Image fallback**: CSS fallback for failed award images (dark bg + gold border + text)
7. **Print stylesheet**: `@media print` overrides — remove glassmorphism, black text on white
8. **Hash deep linking**: Read `window.location.hash` on mount, scroll to section
9. **Empty data handling**: If `AWARD_CATEGORIES` has a category with missing prize data, the card should render with a fallback text (e.g., "Thông tin sẽ được cập nhật" / "Information will be updated"). Sidebar still shows the item. Guard: `award.prizeValues?.length > 0` before rendering prize section.

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| SVN-Gotham font unavailable/licensing | Medium | Low | Only used for decorative text. Fallback to Montserrat bold with letter-spacing. |
| `backdrop-filter` browser support | Low | Medium | `@supports` query with solid dark background fallback. Safari needs `-webkit-` prefix (already in design-style). |
| Scroll-spy accuracy with varying card heights | Medium | Medium | Use `rootMargin` on IntersectionObserver to offset header. Test with all cards visible. Threshold 0.3-0.5. |
| Award images heavy (6 x 336px) | Low | Medium | Use `next/image` with proper `sizes` attribute, lazy loading for below-fold cards, priority for first card. |
| Mobile sidebar UX complexity | Medium | Low | Start with horizontal scroll tabs (simpler). Can iterate to dropdown if scroll tabs feel cramped. |
| English translations missing/pending | High | Medium | Award descriptions in English may not be finalized by content team. Use `[EN_PENDING]` prefix pattern (already used in en.ts). Placeholder English text is acceptable for initial implementation. |
| Client component bundle size | Low | Low | Most sections become `'use client'` for i18n. Mitigate by keeping children as non-`'use client'` (they get included in parent bundle but don't add extra context boundaries). |

### Estimated Complexity

- **Frontend**: Medium (scroll-spy logic, alternating layout, glassmorphism, responsive)
- **Backend**: None
- **Testing**: Medium (scroll-spy behavior, responsive layout, accessibility)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: Sidebar click → scroll → active state update
- [ ] **External dependencies**: None (no API calls)
- [ ] **Data layer**: None (static data)
- [x] **User workflows**: Page load → browse awards → click sidebar → navigate to Kudos

### Test Categories

| Category | Applicable? | Key Scenarios |
|---|---|---|
| UI ↔ Logic | Yes | Sidebar scroll-spy, hash deep linking, smooth scroll |
| Service ↔ Service | No | — |
| App ↔ External API | No | — |
| App ↔ Data Layer | No | — |
| Cross-platform | Yes | Responsive layout across mobile/tablet/desktop |

### Test Environment

- **Environment type**: Local (Vitest + jsdom for unit, browser for visual)
- **Test data strategy**: Static award data from `lib/data/awards.ts`
- **Isolation approach**: Component-level testing, mock IntersectionObserver for scroll-spy

### Test Scenarios Outline

1. **Happy Path**
   - [x] All 6 award cards render with correct data (name, count, value)
   - [x] Sidebar displays 6 items matching award categories
   - [x] Award cards alternate layout (odd=picture-left, even=picture-right)
   - [x] Signature 2025 card shows dual prize values with "Hoặc" divider
   - [x] CTA button renders and links to Sun* Kudos page

2. **Scroll-Spy**
   - [x] Active sidebar item updates when scrolling to a new section
   - [x] Clicking sidebar item smooth-scrolls to correct section
   - [x] URL hash updates when active section changes
   - [x] Page auto-scrolls to section matching URL hash on load

3. **Accessibility**
   - [x] Sidebar nav has `aria-label`
   - [x] Active item has `aria-current="true"`
   - [x] All interactive elements keyboard-navigable
   - [x] Focus indicators visible on all interactive elements
   - [x] Images have descriptive `alt` text

4. **i18n / Multi-Language**
   - [x] Switching locale to English updates all UI labels (page title, sidebar aria-label, card labels)
   - [x] Award descriptions render English text when locale is `en`
   - [x] Award names (brand names) remain the same in both languages
   - [x] Prize units switch to English equivalents when locale is `en`
   - [x] "Hoặc" divider text changes to "Or" when locale is `en`
   - [x] SunKudos section text translates correctly (badge "ĐIỂM MỚI CỦA SAA 2025" → "NEW IN SAA 2025", label, title, description, CTA)

5. **Edge Cases**
   - [x] Image load failure shows fallback placeholder
   - [x] `prefers-reduced-motion: reduce` disables smooth scroll
   - [x] Page renders correctly without JavaScript (SSR content intact)

### Test File Locations (per constitution — co-located)

| Test File | Tests |
|---|---|
| `components/awards-information/__tests__/prize-content-section.test.tsx` | Award data rendering, alternating layout, i18n locale switching |
| `components/awards-information/__tests__/award-content-panel.test.tsx` | Prize count/value display, "Hoặc" divider for Signature 2025 |
| `components/awards-information/__tests__/sun-kudos-promo.test.tsx` | CTA button, i18n text, link href |
| `hooks/__tests__/use-scroll-spy.test.ts` | IntersectionObserver mock, active section detection, hash update, reduced motion |
| `components/awards-information/__tests__/prize-sidebar.test.tsx` | Menu items, active state, click→scroll, aria attributes |

### Tooling & Framework

- **Test framework**: Vitest + @testing-library/react
- **Supporting tools**: Mock IntersectionObserver, mock `window.scrollTo`, mock `useLanguage` for locale switching
- **CI integration**: `npm run test:run` in CI pipeline

### Coverage Goals

| Area | Target | Priority |
|---|---|---|
| Award data rendering | 95%+ | High |
| Scroll-spy hook | 90%+ | High |
| i18n locale switching | 90%+ | High |
| Responsive layout | Visual testing | Medium |
| Accessibility | Lighthouse audit >= 90 | High |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved (3-pass review complete)
- [x] `design-style.md` complete with all design tokens
- [ ] Award images downloaded from Figma (Phase 0)
- [ ] SVN-Gotham font file obtained (Phase 0)

### External Dependencies

- SVN-Gotham font file (.woff2) — need to source this local font
- Award badge images (6 images) — download from Figma via MoMorph tools

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown from this plan
2. **Review** tasks.md for parallelization opportunities
3. **Begin** Phase 0 (asset preparation) — can run in parallel with Phase 1

---

## Notes

- The page shares the `(main)` layout with header/footer already in place — no layout changes needed
- Existing `AwardCategory` type and `AWARD_CATEGORIES` data will be extended, not replaced — backward compatible with homepage usage
- The homepage `AwardsSection` and `AwardCard` components are **not reused** for this page — they have different layouts (grid vs alternating cards). New components are purpose-built for the prize detail layout.
- The homepage `KudosSection` could potentially be reused, but the prize page version has a different layout (row vs. stack) and additional decorative elements. Creating a new `SunKudosPromo` is cleaner.
- All CSS variables needed already exist in `globals.css` — no new tokens needed
- The `(main)/layout.tsx` already includes skip-to-content link and main landmark — accessibility foundation is in place

### i18n Implementation Pattern Reference

The **existing homepage codebase** establishes the i18n pattern this page must follow:

```
Homepage pattern (reference):
├── page.tsx (RSC) ← metadata only
├── HeroSection (RSC) ← pure image, no t()
├── AboutContent ('use client') ← uses useLanguage() for t()
├── AwardsSection ('use client') ← uses useLanguage()
│   └── AwardCard ('use client') ← uses useLanguage() for locale-aware description
├── KudosSection ('use client') ← uses useLanguage()
└── CtaButtons ('use client') ← uses useLanguage()

Prize System page (follows same pattern):
├── page.tsx (RSC) ← metadata only
├── PrizeHeroSection (RSC) ← pure image, no t()
├── PrizeTitleSection ('use client') ← uses t('prizePage.title')
├── PrizeContentSection ('use client') ← uses useLanguage() for locale + t()
│   ├── PrizeSidebar ('use client') ← uses t() for aria + useScrollSpy
│   └── AwardDetailCard (child) ← receives translated props
│       ├── AwardImage (child) ← pure display
│       ├── AwardContentPanel (child) ← receives translated props
│       └── OrDivider (child) ← receives translated text prop
└── SunKudosPromo ('use client') ← uses t('prizePage.kudos.badge'), t('prizePage.kudos.*')
```

Key principle: components that call `useLanguage()` or `t()` MUST be `'use client'`. Child components that only receive translated strings as props do NOT need their own `'use client'` directive — they are automatically included in the parent's client bundle.
