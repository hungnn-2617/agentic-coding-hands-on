# Implementation Plan: Language Dropdown & i18n Integration

**Frame**: `hUyaaugye2-dropdown-ngon-ngu`
**Date**: 2026-04-17
**Spec**: `specs/hUyaaugye2-dropdown-ngon-ngu/spec.md`

---

## Summary

Build a client-side i18n system with a `LanguageProvider` context, translation files (VN/EN), and a restyled `LanguageSelector` dropdown matching the Figma design. Retrofit all existing components on Login and Homepage pages to use `t()` translation calls, enabling instant language switching without page reload.

---

## Technical Context

**Language/Framework**: TypeScript 5.x / Next.js 16 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, Supabase SSR
**Database**: Supabase PostgreSQL (has `profiles.locale` column — not used in this phase)
**Testing**: Vitest + @testing-library/react (jsdom)
**State Management**: React Context API (new — no context exists in codebase yet)
**API Style**: N/A — fully client-side feature

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

| Principle | Requirement | Plan Compliance | Notes |
|-----------|-------------|-----------------|-------|
| I. Clean Code | kebab-case files, PascalCase components, `use` prefix hooks | PASS | `use-language.ts`, `LanguageProvider`, `useLanguage` |
| I. Clean Code | `@/*` path alias imports | PASS | All new files use `@/lib/i18n`, `@/hooks/use-language` |
| I. Clean Code | Hooks in `hooks/` directory | PASS | `hooks/use-language.ts` re-exports from `lib/i18n/` |
| I. Clean Code | No dead code or unused imports | PASS | Removed local state and cookie logic from LanguageSelector |
| II. Next.js (App Router) | `"use client"` only where needed | PASS | Only added where component uses hooks/event handlers |
| II. Next.js (App Router) | `next/image` for images | N/A | No image changes in this feature |
| III. Responsive | Mobile-first, 44px touch targets | PASS | Dropdown item height 56px ≥ 44px minimum |
| IV. Security (OWASP) | No XSS, input validation | PASS | No user input; cookie stores `'vi'`/`'en'` only, validated on read |
| IV. Security | Secrets in env vars only | N/A | No secrets involved |
| V. TDD | Tests written before implementation | PASS | Each phase writes tests first, then implementation (Red-Green-Refactor) |
| V. TDD | Tests co-located in `__tests__/` | PASS | `lib/i18n/__tests__/`, `components/ui/__tests__/` |
| Folder Structure | `lib/` for utilities, `hooks/` for hooks, `components/ui/` for shared UI | PASS | i18n infra in `lib/i18n/`, hook in `hooks/`, selector in `components/ui/` |

**Violations**: None. No new npm packages needed.

---

## Architecture Decisions

### i18n Approach: Custom Lightweight Context (no library)

**Why not `next-intl` or `i18next`?**
- Only 2 locales (VN, EN) with ~60 static translation keys
- No server-side rendering of locale-specific content needed (spec says client-side only)
- No locale-based routing (`/en/`, `/vi/`) required
- Adding a library would introduce unnecessary complexity for this scope
- Constitution prefers no global state library unless complexity demands it

**Chosen approach**:
- `LanguageProvider` context in `lib/i18n/index.tsx`
- `useLanguage()` hook in `hooks/use-language.ts` (re-exports from `lib/i18n/` — constitution mandates hooks in `hooks/` directory)
- Static TS translation files (`lib/i18n/locales/vi.ts`, `lib/i18n/locales/en.ts`)
- Type-safe translation keys via `TranslationKey` type
- `t(key)` for simple lookups, `t(key, params)` for interpolation (e.g., `t('countdown.ariaLabel', { days: '05' })` replaces `{days}` in the string)
- Cookie persistence (`locale` cookie, max-age 1 year)

### Frontend Approach

- **Component Structure**: Update existing components in-place. No new page components.
- **Styling Strategy**: Tailwind utilities matching design-style.md tokens. Update `LanguageSelector` dropdown panel styles.
- **Data Fetching**: N/A — translations are static bundled TS files.
- **Server Component Strategy**: Components that are currently Server Components and need `t()` will be converted to Client Components using `"use client"`. This is acceptable because:
  - The i18n context requires client-side React state
  - The affected components render static content (no async data fetching that benefits from RSC)
  - `EventInfo` reads env vars — these are `NEXT_PUBLIC_*` so they work in client components too

### Integration Points

- **Existing `LanguageSelector`** (`components/ui/language-selector.tsx`): Refactor to use context `setLocale()` instead of local state. Restyle dropdown panel to match Figma.
- **Root Layout** (`app/layout.tsx`): Wrap children with `LanguageProvider`. Dynamize `<html lang>`.
- **Login Header** (`components/ui/header.tsx`): No changes — already passes `LanguageSelector` as children.
- **Main Header** (`components/ui/main-header.tsx`): No changes — already renders `LanguageSelector`.
- **Award Data** (`lib/data/awards.ts`): Add `descriptionEn` field to each award entry.
- **Award Type** (`types/awards.ts`): Add optional `descriptionEn` field.

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/hUyaaugye2-dropdown-ngon-ngu/
├── spec.md              # Feature specification
├── design-style.md      # Visual specs
├── plan.md              # This file
├── tasks.md             # Task breakdown (next step)
└── assets/
    └── frame.png        # Figma screenshot
```

### New Files

| File | Purpose |
|------|---------|
| `lib/i18n/index.tsx` | `LanguageProvider` context, `LanguageContext`, `t()` function, `HtmlLangUpdater` client component |
| `lib/i18n/types.ts` | `Locale` type, `TranslationKey` type, `Translations` interface |
| `lib/i18n/locales/vi.ts` | Vietnamese translation strings (default locale) |
| `lib/i18n/locales/en.ts` | English translation strings |
| `hooks/use-language.ts` | `useLanguage()` hook — re-exports from `lib/i18n/` (per constitution: hooks in `hooks/` directory) |
| `lib/i18n/__tests__/use-language.test.tsx` | Unit tests for the `useLanguage` hook and `LanguageProvider` |
| `lib/i18n/__tests__/translations.test.ts` | Translation completeness test — verifies all keys in `vi.ts` exist in `en.ts` and vice versa |

### Modified Files

| File | Changes |
|------|---------|
| `app/layout.tsx` | Wrap children with `<LanguageProvider>`. Make `<html lang>` dynamic via a client wrapper. |
| `components/ui/language-selector.tsx` | Replace local state with `useLanguage()` context. Restyle dropdown to Figma specs (gold border, dark bg, selected highlight). |
| `components/ui/language-selector.test.tsx` | Update tests for context-based behavior. |
| `components/login/login-hero.tsx` | Add `"use client"`, replace hardcoded text with `t()`. |
| `components/login/login-button.tsx` | Replace hardcoded loading/error text with `t()`. Already client. |
| `components/login/__tests__/login-button.test.tsx` | Wrap renders in `<LanguageProvider>`. Existing tests assert Vietnamese strings ("Đang đăng nhập...") — these continue to pass since default locale is `'vi'`. |
| `components/ui/footer.tsx` | Add `"use client"`, replace copyright text with `t()`. |
| `components/homepage/countdown-timer.tsx` | Replace labels ("Coming soon", "Days"/"Hours"/"Minutes") with `t()`. Already client. |
| `components/homepage/event-info.tsx` | Add `"use client"`, replace "Thời gian:"/"Địa điểm:" with `t()`. |
| `components/homepage/cta-buttons.tsx` | Add `"use client"`, replace button labels with `t()`. |
| `components/homepage/about-content.tsx` | Add `"use client"`, replace paragraphs/quote with `t()`. |
| `components/homepage/awards-section.tsx` | Add `"use client"`, replace section header text with `t()`. |
| `components/homepage/award-card.tsx` | Add `"use client"`, replace "Chi tiết" with `t()`. Use `descriptionEn` based on locale. |
| `components/homepage/kudos-section.tsx` | Add `"use client"`, replace badge/subtitle/description/button with `t()`. |
| `components/ui/nav-links.tsx` | Replace hardcoded labels with `t()`. Already client. |
| `components/ui/main-footer.tsx` | Add `"use client"`, replace link labels/copyright with `t()`. |
| `components/ui/profile-dropdown.tsx` | Replace "Profile"/"Sign out"/"Admin Dashboard" with `t()`. Already client. |
| `components/ui/notification-bell.tsx` | Replace "No notifications" and aria-label with `t()`. Already client. |
| `types/awards.ts` | Add optional `descriptionEn` field to `AwardCategory` interface. |
| `lib/data/awards.ts` | Add `descriptionEn` values to each award entry. |

### Dependencies

No new npm packages needed.

---

## Implementation Strategy

### Phase 1: i18n Foundation (US1 core — context + translations)

Build the i18n infrastructure that everything else depends on. Per constitution TDD principle, **write tests first** in each sub-step.

**1.1. Types** (`lib/i18n/types.ts`)
- Define `Locale = 'vi' | 'en'`
- Define `TranslationKey` type (union of all dot-notation keys from spec translation tables)
- Define `Translations` as `Record<TranslationKey, string>`
- Define `TranslationParams` as `Record<string, string | number>` for interpolation

**1.2. Translation Files** (`lib/i18n/locales/vi.ts`, `en.ts`)
- Create flat key-value objects with all ~60 translation keys from spec
- Vietnamese file has complete strings
- English file uses `[EN_PENDING]` placeholder for About Content paragraphs and Kudos description
- Strings with variables use `{varName}` syntax: e.g., `"{days} ngày, {hours} giờ, {minutes} phút cho đến sự kiện"`

**1.3. Tests FIRST** (`lib/i18n/__tests__/use-language.test.tsx`)
- Write these tests before implementing the provider (TDD Red phase):
  - Test default locale is `'vi'` when no cookie set
  - Test `setLocale('en')` changes locale and `t()` returns English strings
  - Test `t(key)` simple lookup returns correct string for current locale
  - Test `t(key, params)` interpolation: `t('countdown.ariaLabel', { days: '05', hours: '12', minutes: '30' })` → replaces `{days}`, `{hours}`, `{minutes}` in the template string
  - Test fallback: when EN translation is missing for a key, `t()` returns the Vietnamese string
  - Test `useLanguage()` called outside `<LanguageProvider>` throws descriptive error
  - Test cookie persistence: `setLocale('en')` → cookie `locale=en` written with `path=/`
  - Test cookie read: render with `locale=en` cookie → initial locale is `'en'`

**1.4. Translation Completeness Tests** (`lib/i18n/__tests__/translations.test.ts`)
- Verify every key in `vi.ts` exists in `en.ts` (and vice versa)
- Verify no values are empty strings
- This ensures developers don't forget to add keys to both files

**1.5. Language Provider Implementation** (`lib/i18n/index.tsx`) — make tests pass (TDD Green phase)
- `LanguageContext` with `{ locale, t, setLocale }`
- `LanguageProvider` component:
  - Reads `locale` cookie on mount (via `useEffect` — not during SSR)
  - `setLocale(locale)` writes cookie + updates state + triggers re-render
  - `t(key)` looks up current locale's translation, falls back to `vi` if missing
  - `t(key, params)` additionally replaces `{paramName}` placeholders with values from `params` object: `string.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? ''))`
- `HtmlLangUpdater` component (exported from same file): runs `useEffect` to sync `document.documentElement.lang` with current locale
- **Note**: `useLanguage()` hook is defined here but re-exported through `hooks/use-language.ts` for constitution compliance

**1.6. Hook Re-export** (`hooks/use-language.ts`)
- Single line re-export: `export { useLanguage } from '@/lib/i18n'`
- All components import from `@/hooks/use-language` (per constitution hook discovery pattern)

**1.7. Root Layout Integration** (`app/layout.tsx`)
- Wrap `{children}` with `<LanguageProvider>`
- Add `<HtmlLangUpdater />` as a child of `LanguageProvider` inside `<body>`
- Keep `<html lang="vi">` as static SSR default — `HtmlLangUpdater` will update it client-side

### Phase 2: Dropdown Visual Redesign (US1 + US2 + US5)

Update the existing `LanguageSelector` component to match Figma and use context. Per TDD, write/update tests first.

**2.1. Update Tests FIRST** (`components/ui/__tests__/language-selector.test.tsx`)
- Wrap component in `<LanguageProvider>` for all tests
- Test: clicking trigger opens dropdown panel
- Test: clicking outside closes dropdown
- Test: clicking a language option calls `setLocale` and closes dropdown
- Test: selected item has golden highlight class (`bg-[rgba(255,234,158,0.2)]`)
- Test: unselected item has transparent background
- Test: keyboard — Arrow Down/Up moves focus between items
- Test: keyboard — Enter selects focused item
- Test: keyboard — Escape closes dropdown
- Test: aria-labels use `t()` translations (verify "Select language" in EN context)

**2.2. Refactor `LanguageSelector`** (`components/ui/language-selector.tsx`) — make tests pass
- Replace `useState(currentLocale)` with `useLanguage()` hook (imported from `@/hooks/use-language`)
- Remove local cookie writing (now handled by context `setLocale`)
- Restyle dropdown panel per design-style.md:
  - **Positioning**: `absolute right-0 mt-2 z-50` (from design-style.md Dropdown Panel Positioning section)
  - **Container**: `bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 flex flex-col items-start`
  - **Selected item**: `bg-[rgba(255,234,158,0.2)] rounded-sm h-14 flex items-center`
  - **Unselected item**: `bg-transparent h-14 flex items-center`
  - **Item inner**: `flex items-center gap-1 p-4 rounded` (flag icon + language code)
  - **Hover states**: `hover:bg-white/10` (unselected), `hover:bg-[rgba(255,234,158,0.3)]` (selected)
  - **Active**: `active:bg-[rgba(255,234,158,0.4)]`
  - **Focus**: `focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2`
  - **Text**: `font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white`
- Add open/close animation: opacity 0→1 + translateY(-4px→0) over 150ms ease-out
- Replace aria-label strings with `t('common.languageSelector.ariaLabel')` and `t('common.languageSelector.listAriaLabel')`
- **Add Arrow key navigation** (NEW — spec TR-004 requires this, existing implementation only has Enter/Space/Escape):
  - ArrowDown: move focus to next language option (wrap to first if at end)
  - ArrowUp: move focus to previous language option (wrap to last if at start)
  - Use `roving tabindex` pattern: focused item gets `tabIndex={0}`, others get `tabIndex={-1}`
  - Enter/Space on focused item: select it
  - Escape: close dropdown, return focus to trigger

### Phase 3: Login Page Integration (US3)

Apply i18n to all Login page components.

**3.1. `LoginHero`** (`components/login/login-hero.tsx`)
- Add `"use client"` directive
- Import `useLanguage` from `@/hooks/use-language`
- Replace 2 hardcoded hero text lines with `t('login.hero.line1')`, `t('login.hero.line2')`

**3.2. `LoginButton`** (`components/login/login-button.tsx`)
- Import `useLanguage` from `@/hooks/use-language` (already client)
- Replace loading text, 2 error messages with `t()` calls

**3.3. `Footer`** (`components/ui/footer.tsx`)
- Add `"use client"` directive
- Replace copyright text with `t('common.footer.copyright')`

**3.4. Verify** Login page renders correctly in both locales. Test switching on Login page.

### Phase 4: Homepage Integration (US4) — Header & Hero

Apply i18n to Homepage header navigation and hero section.

**4.1. `NavLinks`** (`components/ui/nav-links.tsx`)
- Replace hardcoded label strings in `NAV_ITEMS` array with `t()` calls (already client)
- Nav items array becomes dynamic — computed inside the component using `t()`

**4.2. `ProfileDropdown`** (`components/ui/profile-dropdown.tsx`)
- Replace "Profile", "Sign out", "Admin Dashboard", aria-label with `t()` (already client)

**4.3. `NotificationBell`** (`components/ui/notification-bell.tsx`)
- Replace "No notifications", aria-label with `t()` (already client)

**4.4. `CountdownTimer`** (`components/homepage/countdown-timer.tsx`)
- Replace "Coming soon", "Days"/"Hours"/"Minutes", aria-label with `t()` (already client)

**4.5. `EventInfo`** (`components/homepage/event-info.tsx`)
- Add `"use client"` directive
- Replace "Thời gian:"/"Địa điểm:" labels with `t()`

**4.6. `CTAButtons`** (`components/homepage/cta-buttons.tsx`)
- Add `"use client"` directive
- Replace "ABOUT AWARDS"/"ABOUT KUDOS" with `t()`

### Phase 5: Homepage Integration (US4) — Content Sections

Apply i18n to Homepage content sections.

**5.1. Award Data Localization**
- Update `types/awards.ts`: Add `descriptionEn?: string` to `AwardCategory`
- Update `lib/data/awards.ts`: Add `descriptionEn` to each of the 6 award entries

**5.2. `AwardsSection`** (`components/homepage/awards-section.tsx`)
- Add `"use client"` directive
- Replace section header text ("Sun* annual awards 2025", "Hệ thống giải thưởng", description) with `t()`
- Replace empty state message with `t()`

**5.3. `AwardCard`** (`components/homepage/award-card.tsx`)
- Add `"use client"` directive
- Replace "Chi tiết" with `t('awards.detail')`
- Use `locale === 'en' ? award.descriptionEn ?? award.description : award.description` for description

**5.4. `AboutContent`** (`components/homepage/about-content.tsx`)
- Add `"use client"` directive
- Replace 5 paragraphs + quote + subtitle with `t()` calls
- EN translations use `[EN_PENDING]` placeholder initially

**5.5. `KudosSection`** (`components/homepage/kudos-section.tsx`)
- Add `"use client"` directive
- Replace badge, subtitle, description, button text with `t()` calls

**5.6. `MainFooter`** (`components/ui/main-footer.tsx`)
- Add `"use client"` directive
- Replace link labels and copyright with `t()` calls
- Footer links array becomes dynamic

### Phase 6: Persistence & Accessibility (US6 + US7)

**6.1. Verify cookie persistence**
- `setLocale()` already writes cookie in Phase 1
- Verify: select EN → refresh → still EN
- Verify: select EN on Login → log in → Homepage shows EN

**6.2. HTML `lang` attribute**
- `HtmlLangUpdater` component from Phase 1 handles this
- Verify: switch to EN → `<html lang="en">`, switch back → `<html lang="vi">`

**6.3. Final accessibility audit**
- Keyboard navigation through dropdown (Tab, Enter, Space, Escape, Arrow keys)
- Screen reader announces selected language
- Focus indicators visible on all interactive elements

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Converting Server Components to Client increases bundle size | Medium | Low | The affected components render static text — minimal JS overhead. No async data fetching lost. |
| About Content EN translations unavailable | High | Low | Use `[EN_PENDING]` placeholder. Feature works fully — just shows placeholder for 5 paragraphs. |
| Cookie not persisting across auth redirect (Login → callback → Homepage) | Low | Medium | Cookie is set with `path=/` and `max-age=31536000`. OAuth redirect stays on same domain. Test explicitly. |
| Hydration mismatch on initial render (server renders `vi`, client reads cookie for `en`) | Medium | Medium | Use `useEffect` to read cookie (not during SSR). Accept brief flash of VN → EN on first load. Alternatively, read cookie in middleware and pass as a data attribute on `<html>`. |
| Existing tests break after adding `"use client"` and `t()` | Medium | Low | Update test wrappers to include `<LanguageProvider>`. Most tests use `render()` which can wrap. |

### Estimated Complexity

- **Frontend**: Medium — 20 files modified, but changes per file are mechanical (replace string → `t()` call)
- **Backend**: None
- **Testing**: Low-Medium — update existing test wrappers + new tests for i18n hook

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: LanguageProvider → LanguageSelector → all consuming components
- [ ] **External dependencies**: None (client-side only)
- [ ] **Data layer**: Not in this phase (cookie only)
- [x] **User workflows**: Switch language on Login, switch on Homepage, persist across navigation

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Dropdown toggle → context update → all `t()` consumers re-render |
| Service ↔ Service | No | N/A |
| App ↔ External API | No | N/A |
| App ↔ Data Layer | No | Cookie read/write only |
| Cross-platform | Yes | Touch targets on mobile (56px item height ≥ 44px min) |

### Test Environment

- **Environment type**: Local (jsdom via Vitest)
- **Test data strategy**: Mock cookie via `document.cookie`, test both locales
- **Isolation approach**: Fresh render per test, clear cookies in `beforeEach`

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Cookie API | Real (jsdom supports `document.cookie`) | No complex mocking needed |
| Translation files | Real (import actual vi.ts/en.ts) | Verifies actual strings |
| React Context | Real (wrap in `<LanguageProvider>`) | Tests real integration |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Default locale is VN, all text renders in Vietnamese
   - [x] Click EN in dropdown → all visible text switches to English
   - [x] Click VN back → all text reverts to Vietnamese
   - [x] Refresh page → locale persisted from cookie

2. **Error Handling**
   - [x] Missing translation key → falls back to Vietnamese string
   - [x] Invalid cookie value → defaults to VN
   - [x] `useLanguage()` called outside provider → throws helpful error

3. **Edge Cases**
   - [x] Rapid toggle VN↔EN → no stale renders
   - [x] `<html lang>` updates on every switch
   - [x] Login page footer and Homepage footer both use `common.footer.copyright` key correctly

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| i18n hook + provider | 95%+ | High |
| LanguageSelector component | 90%+ | High |
| Translation completeness (all keys exist in both locales) | 100% | High |
| Individual component `t()` integration | 70%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved
- [x] Codebase research completed (see Summary above)
- [ ] EN translations for About Content paragraphs and Kudos description (can proceed with `[EN_PENDING]`)

### External Dependencies

- None. Fully client-side, no new npm packages.

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown from this plan
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following phase order (Phase 1 → 2 → 3 → 4 → 5 → 6)

---

## Notes

- **No npm packages added**. The i18n system is ~150 lines of custom code (context + hook + types). This is simpler and lighter than any library for 2 locales and ~60 keys.
- **Hydration strategy**: The `LanguageProvider` reads the cookie in `useEffect` (client-only). On first server render, `<html lang="vi">` is always used. On hydration, if cookie says `en`, a quick update happens. This may cause a brief flash of Vietnamese content. If this is unacceptable, we can read the cookie in middleware and set a `data-locale` attribute on `<html>` for the client to read synchronously.
- **Future-proofing**: The `Locale` type, `TranslationKey` type, and translation file structure make it straightforward to add more locales or keys later without architectural changes.
- **About Content**: 5 long paragraphs need official English translations from the content team. The plan uses `[EN_PENDING]` markers so development is not blocked.
- **Award descriptions**: Using `descriptionEn` field on the data model (not translation files) because award data may come from an API in the future. Keeping localized content with the entity is more natural than splitting it into translation files.
- **Profiles.locale column**: The Supabase database already has a `locale` field on the `profiles` table. Syncing the cookie preference to this column is out of scope for this phase but can be added as a follow-up by calling `supabase.from('profiles').update({ locale })` after `setLocale()`.
