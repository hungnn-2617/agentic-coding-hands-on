# Tasks: Language Dropdown & i18n Integration

**Frame**: `hUyaaugye2-dropdown-ngon-ngu`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [x] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, etc.)
- **|**: File path affected by this task

---

## Phase 1: Setup (Types & Translation Files)

**Purpose**: Create i18n type system and translation data files — no runtime code yet.

- [x] T001 Define `Locale`, `TranslationKey`, `Translations`, and `TranslationParams` types | lib/i18n/types.ts
- [x] T002 [P] Create Vietnamese translation file with all ~60 keys from spec translation tables | lib/i18n/locales/vi.ts
- [x] T003 [P] Create English translation file with all ~60 keys (use `[EN_PENDING]` for About Content + Kudos description) | lib/i18n/locales/en.ts

---

## Phase 2: Foundation (i18n Context & Provider)

**Purpose**: Core i18n infrastructure required by ALL user stories. TDD — tests first.

**CRITICAL**: No user story work can begin until this phase is complete.

### Tests (TDD Red Phase)

- [x] T004 Write `useLanguage` hook tests: default locale `'vi'`, `setLocale('en')` changes `t()` output, `t(key)` simple lookup, `t(key, params)` interpolation with `{varName}` replacement, VN fallback for missing EN key, error when called outside provider, cookie read/write | lib/i18n/__tests__/use-language.test.tsx
- [x] T005 [P] Write translation completeness tests: every key in `vi.ts` exists in `en.ts` and vice versa, no empty string values | lib/i18n/__tests__/translations.test.ts

### Implementation (TDD Green Phase)

- [x] T006 Implement `LanguageProvider` context, `t()` function with interpolation (`string.replace(/\{(\w+)\}/g, ...)`), `HtmlLangUpdater` component, and `useLanguage` hook | lib/i18n/index.tsx
- [x] T007 Create hook re-export file: `export { useLanguage } from '@/lib/i18n'` | hooks/use-language.ts
- [x] T008 Integrate `LanguageProvider` into root layout: wrap `{children}`, add `<HtmlLangUpdater />` inside `<body>`, keep `<html lang="vi">` as static SSR default | app/layout.tsx

**Checkpoint**: Run `vitest` — T004 and T005 tests must pass. Foundation ready.

---

## Phase 3: US1 + US2 + US5 — Dropdown Visual Redesign & Language Switching 🎯 MVP

**Goal**: Restyled `LanguageSelector` matches Figma design, switches language via context, shows selected highlight, hover states, and keyboard navigation.

**Independent Test**: Open dropdown → VN has golden highlight → click EN → dropdown closes → trigger shows EN flag → all `t()` consumers show English text.

### Tests (TDD Red Phase)

- [x] T009 Update `LanguageSelector` tests: wrap in `<LanguageProvider>`, test trigger opens/closes panel, click option calls `setLocale`, selected item has `bg-[rgba(255,234,158,0.2)]` class, unselected is `bg-transparent`, Arrow Down/Up moves focus (roving tabindex), Enter selects, Escape closes, aria-labels use `t()` | components/ui/__tests__/language-selector.test.tsx

### Implementation (TDD Green Phase)

- [x] T010 [US1] Refactor `LanguageSelector`: replace `useState(currentLocale)` with `useLanguage()` from `@/hooks/use-language`, remove local cookie writing, restyle dropdown panel per design-style.md (positioning: `absolute right-0 mt-2 z-50`, container: `bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5`, selected: `bg-[rgba(255,234,158,0.2)] rounded-sm h-14`, unselected: `bg-transparent h-14`, hover: `hover:bg-white/10` / `hover:bg-[rgba(255,234,158,0.3)]`, active: `active:bg-[rgba(255,234,158,0.4)]`, focus: `focus-visible:outline-2 focus-visible:outline-[#FFEA9E]`, text: `font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white`), add open/close animation (opacity + translateY 150ms ease-out), replace aria-labels with `t()`, add Arrow key navigation with roving tabindex pattern | components/ui/language-selector.tsx

**Checkpoint**: Dropdown opens, shows correct styles, switches language, persists to cookie. Run tests — T009 passes.

---

## Phase 4: US3 — Login Page Language Switching

**Goal**: All text on the Login page updates immediately when language is switched.

**Independent Test**: On Login page, switch VN→EN → hero text, button loading text, error messages, and footer copyright all show English equivalents. Switch back → Vietnamese restored.

- [x] T011 [P] [US3] Add `"use client"`, import `useLanguage`, replace 2 hero text lines with `t('login.hero.line1')` and `t('login.hero.line2')` | components/login/login-hero.tsx
- [x] T012 [P] [US3] Import `useLanguage`, replace loading text `t('login.button.loading')`, button text `t('login.button.text')`, and 2 error messages with `t('login.error.supabase')` / `t('login.error.generic')` | components/login/login-button.tsx
- [x] T013 [P] [US3] Add `"use client"`, import `useLanguage`, replace copyright text with `t('common.footer.copyright')` | components/ui/footer.tsx
- [x] T014 [US3] Update existing `LoginButton` test: wrap renders in `<LanguageProvider>` so `t()` calls resolve. Existing Vietnamese assertions still pass (default locale is `'vi'`). | components/login/__tests__/login-button.test.tsx

**Checkpoint**: Login page renders correctly in VN and EN. Switch language — all text updates instantly.

---

## Phase 5: US4 (Part 1) — Homepage Header & Hero Language Switching

**Goal**: Header navigation, countdown timer, event info, and CTA buttons update when language is switched.

**Independent Test**: On Homepage, switch VN→EN → nav labels, countdown unit labels, event labels, CTA buttons show English. Switch back → Vietnamese restored.

- [x] T015 [P] [US4] Replace hardcoded `NAV_ITEMS` labels with `t('nav.about')`, `t('nav.awards')`, `t('nav.kudos')` — compute array inside component body | components/ui/nav-links.tsx
- [x] T016 [P] [US4] Replace "Profile"→`t('profile.profile')`, "Sign out"→`t('profile.signOut')`, "Admin Dashboard"→`t('profile.adminDashboard')`, aria-label→`t('profile.ariaLabel')` | components/ui/profile-dropdown.tsx
- [x] T017 [P] [US4] Replace "No notifications"→`t('notification.empty')`, aria-label→`t('notification.ariaLabel')` with interpolation for unread count `t('notification.unread', { count })` | components/ui/notification-bell.tsx
- [x] T018 [P] [US4] Replace "Coming soon"→`t('countdown.comingSoon')`, "Days"/"Hours"/"Minutes"→`t('countdown.days')`/etc., aria-label→`t('countdown.ariaLabel', { days, hours, minutes })` | components/homepage/countdown-timer.tsx
- [x] T019 [P] [US4] Add `"use client"`, import `useLanguage`, replace "Thời gian:"→`t('event.time')`, "Địa điểm:"→`t('event.venue')` | components/homepage/event-info.tsx
- [x] T020 [P] [US4] Add `"use client"`, import `useLanguage`, replace "ABOUT AWARDS"→`t('cta.aboutAwards')`, "ABOUT KUDOS"→`t('cta.aboutKudos')` | components/homepage/cta-buttons.tsx

**Checkpoint**: Header nav, countdown, event info, and CTA buttons all switch language correctly.

---

## Phase 6: US4 (Part 2) — Homepage Content Sections Language Switching

**Goal**: Awards section, award cards, about content, Kudos section, and main footer update when language is switched.

**Independent Test**: On Homepage, switch VN→EN → awards section header, card descriptions, "Chi tiết" links, about content, Kudos section, and footer links all show English. Switch back → Vietnamese restored.

### Award Data

- [x] T021 [P] [US4] Add `descriptionEn?: string` to `AwardCategory` interface | types/awards.ts
- [x] T022 [P] [US4] Add `descriptionEn` values to all 6 award entries | lib/data/awards.ts

### Content Components

- [x] T023 [P] [US4] Add `"use client"`, import `useLanguage`, replace "Sun* annual awards 2025"→`t('awards.caption')`, "Hệ thống giải thưởng"→`t('awards.title')`, description→`t('awards.description')`, empty state→`t('awards.emptyState')` | components/homepage/awards-section.tsx
- [x] T024 [P] [US4] Add `"use client"`, import `useLanguage`, replace "Chi tiết"→`t('awards.detail')`, use `locale === 'en' ? award.descriptionEn ?? award.description : award.description` for description text | components/homepage/award-card.tsx
- [x] T025 [P] [US4] Add `"use client"`, import `useLanguage`, replace 5 paragraphs with `t('about.paragraph1')` through `t('about.paragraph5')`, quote→`t('about.quote')`, subtitle→`t('about.quoteSubtitle')` | components/homepage/about-content.tsx
- [x] T026 [P] [US4] Add `"use client"`, import `useLanguage`, replace "ĐIỂM MỚI CỦA SAA 2025"→`t('kudos.badge')`, "Phong trào ghi nhận"→`t('kudos.subtitle')`, description→`t('kudos.description')`, "Chi tiết"→`t('kudos.detailButton')` | components/homepage/kudos-section.tsx
- [x] T027 [P] [US4] Add `"use client"`, import `useLanguage`, replace footer link labels with `t('footer.about')`, `t('footer.awards')`, `t('footer.kudos')`, `t('footer.standards')`, copyright→`t('common.footer.copyright')` — compute `FOOTER_LINKS` array inside component body | components/ui/main-footer.tsx

**Checkpoint**: Full Homepage renders correctly in VN and EN. All sections switch language.

---

## Phase 7: US6 + US7 — Persistence & Accessibility Polish

**Goal**: Language preference persists across refresh and navigation. HTML `lang` attribute updates. Full keyboard accessibility.

**Independent Test**:
- US6: Select EN → refresh page → still EN. Select EN on Login → log in → Homepage shows EN.
- US7: Switch to EN → `<html lang="en">`. Switch back → `<html lang="vi">`.

- [x] T028 [US6] Verify cookie persistence: select EN → refresh → still EN. Select EN on Login → log in via OAuth → Homepage shows EN. Fix any issues with cookie `path=/` or `max-age`. | (verification — no file changes expected)
- [x] T029 [US7] Verify `<html lang>` updates: switch EN → inspect `document.documentElement.lang === 'en'`. Switch back → `'vi'`. `HtmlLangUpdater` from Phase 2 handles this — verify it works. | (verification — no file changes expected)
- [x] T030 Final accessibility audit: keyboard navigation through dropdown (Tab, Enter, Space, Escape, Arrow keys), screen reader announces selected language and available options, focus indicators visible on all interactive elements per design-style.md focus state specs | components/ui/language-selector.tsx

**Checkpoint**: All user stories complete. Language switching works end-to-end across Login and Homepage.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)         → No dependencies — start immediately
Phase 2 (Foundation)    → Depends on Phase 1 — BLOCKS all user stories
Phase 3 (US1+US2+US5)   → Depends on Phase 2 — MVP milestone
Phase 4 (US3)           → Depends on Phase 2 (can parallel with Phase 3)
Phase 5 (US4 Part 1)    → Depends on Phase 2 (can parallel with Phase 3/4)
Phase 6 (US4 Part 2)    → Depends on Phase 2 (can parallel with Phase 3/4/5)
Phase 7 (US6+US7)       → Depends on ALL previous phases
```

### Within Each Phase

1. Tests FIRST (TDD Red) → fail
2. Implementation (TDD Green) → make tests pass
3. Verify checkpoint before moving on

### Parallel Opportunities

**Within Phase 1**: T002 and T003 (vi.ts / en.ts) can run in parallel.
**Within Phase 3**: T009 tests first, then T010 implementation.
**Within Phase 4**: T011, T012, T013 can all run in parallel (different files). T014 after.
**Within Phase 5**: T015–T020 can all run in parallel (different files, all already-client components).
**Within Phase 6**: T021–T027 can all run in parallel (different files).
**Cross-phase**: Once Phase 2 completes, Phases 3–6 can run in parallel if team has capacity (they touch different files).

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (foundation)
2. Complete Phase 3 (dropdown redesign — US1+US2+US5)
3. **STOP and VALIDATE**: Dropdown works, shows Figma styles, switches locale, persists cookie
4. Deploy if ready — language switching works on the dropdown level

### Incremental Delivery

1. Phase 1 + 2 → Foundation ready
2. Phase 3 → Dropdown MVP → Test
3. Phase 4 → Login page i18n → Test
4. Phase 5 + 6 → Homepage i18n → Test
5. Phase 7 → Final polish → Full test

---

## Notes

- Commit after each phase or logical group of parallel tasks
- Run `vitest` before moving to next phase
- All `t()` imports come from `@/hooks/use-language` (NOT directly from `@/lib/i18n`)
- Components getting `"use client"` directive: `login-hero.tsx`, `footer.tsx`, `event-info.tsx`, `cta-buttons.tsx`, `about-content.tsx`, `awards-section.tsx`, `award-card.tsx`, `kudos-section.tsx`, `main-footer.tsx`
- Components already `"use client"` (no directive change needed): `language-selector.tsx`, `login-button.tsx`, `countdown-timer.tsx`, `nav-links.tsx`, `profile-dropdown.tsx`, `notification-bell.tsx`
- Mark tasks complete as you go: `[x]`
