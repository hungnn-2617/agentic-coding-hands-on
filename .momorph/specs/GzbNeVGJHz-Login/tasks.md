# Tasks: Login

**Frame**: `GzbNeVGJHz-Login`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3)
- **|**: File path affected by this task

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, dependencies, assets, and theme configuration

- [x] T001 Install Supabase dependencies: `@supabase/supabase-js` and `@supabase/ssr` | package.json
- [x] T002 Install dev dependencies: `vitest`, `@testing-library/react`, `@vitejs/plugin-react`, `jsdom` | package.json
- [x] T003 Create `.env.local.example` with Supabase environment variable placeholders (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) | .env.local.example
- [x] T004 Ensure `.env.local` is listed in `.gitignore` | .gitignore
- [x] T005 Create Vitest config file with React plugin and jsdom environment | vitest.config.ts
- [x] T006 Download SAA 2025 logo from Figma media (node `I662:14391;178:1033;178:1030`) and save as PNG | public/images/saa-logo.png
- [x] T007 [P] Download ROOT FURTHER logo from Figma media (node `2939:9548`) and save as PNG | public/images/root-further-logo.png
- [x] T008 [P] Download login key visual background image from Figma frame and save as optimized JPG | public/images/login-keyvisual.jpg
- [x] T009 [P] Create Google icon component from Figma SVG (node `I662:14426;186:1766`) | components/icons/google-icon.tsx
- [x] T010 [P] Create Chevron Down icon component from Figma SVG (node `I662:14391;186:1696;186:1821;186:1441`) | components/icons/chevron-down-icon.tsx
- [x] T011 [P] Create VN Flag icon component from Figma SVG (node `I662:14391;186:1696;186:1821;186:1709`) | components/icons/flag-vn-icon.tsx
- [x] T012 Update root layout: replace Geist fonts with Montserrat and Montserrat Alternates via `next/font/google`; update metadata title to "SAA 2025" and description | app/layout.tsx
- [x] T013 Update globals.css: remove default Geist theme; add SAA theme CSS variables (`--color-bg-page: #00101A`, `--color-bg-header: #0B0F12`, `--color-bg-button-primary: #FFEA9E`, `--color-text-primary: #FFFFFF`, `--color-text-button: #00101A`, `--color-border-footer: #2E3940`) | app/globals.css
- [x] T014 Create Supabase generated types placeholder file with Database type interface | types/database.ts

**Checkpoint**: ✅ Project builds (`next build`), fonts load correctly, assets in `public/images/`, icon components render, Vitest runs.

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Supabase Auth plumbing and middleware — required by ALL user stories

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T015 Create browser Supabase client factory using `createBrowserClient` from `@supabase/ssr` | lib/supabase/client.ts
- [x] T016 [P] Create server Supabase client factory using `createServerClient` from `@supabase/ssr` with cookie read/write handlers | lib/supabase/server.ts
- [x] T017 [P] Create middleware Supabase client helper using `createServerClient` with Next.js `request`/`response` cookie handlers | lib/supabase/middleware.ts
- [x] T018 Create Next.js middleware: use `lib/supabase/middleware.ts` to check session via `supabase.auth.getUser()`; redirect unauthenticated users on protected routes to `/login`; redirect authenticated users on `/login` to `/`; define matcher config excluding static assets and API routes | middleware.ts
- [x] T019 Create OAuth callback route handler: extract `code` from URL search params; exchange code for session via `supabase.auth.exchangeCodeForSession(code)`; redirect to `/` on success; redirect to `/login` on missing code | app/(auth)/callback/route.ts
- [x] T020 Update root page to redirect unauthenticated users to `/login` (temporary until homepage is built) | app/page.tsx

**Checkpoint**: ✅ Middleware runs on all routes. Callback route exchanges auth code for session. Supabase clients instantiate without errors.

---

## Phase 3: User Story 1 — Google OAuth Login (Priority: P1) MVP

**Goal**: User can log in via Google OAuth and get redirected to homepage

**Independent Test**: Navigate to `/login`, click "LOGIN With Google", complete Google auth, verify redirect to `/`.

### Tests (US1)

- [x] T021 [US1] Write test: LoginButton renders with correct text and Google icon; clicking calls `signInWithOAuth` with `{ provider: 'google' }`; button disables and shows loading state after click | components/login/__tests__/login-button.test.tsx
- [x] T022 [P] [US1] Write test: Login page renders Header, LoginHero (with key visual and text), LoginButton, and Footer; authenticated user is redirected away (mock `redirect`) | app/(auth)/login/__tests__/page.test.tsx

### Implementation (US1)

- [x] T023 [P] [US1] Create Footer component (Server Component): copyright text "Bản quyền thuộc về Sun* © 2025"; full width, `px-[90px] py-10`, border-top `1px solid #2E3940`; font Montserrat Alternates 16/700 white | components/ui/footer.tsx
- [x] T024 [P] [US1] Create Header component (Server Component): flex row, `justify-between`, `items-center`, `px-36 py-3`, `bg-[#0B0F12]/80`; renders Logo image (52x48px via `next/image`) on left; accepts `children` slot on right for language selector | components/ui/header.tsx
- [x] T025 [US1] Create LoginHero component (Server Component): full-viewport section with key visual background (`next/image`, fill, priority); left gradient overlay (`bg-gradient-to-r from-[#00101A] via-[#00101A]/100 to-transparent`); bottom gradient overlay; ROOT FURTHER logo image (451x200); hero text block ("Bắt đầu hành trình..." and "Đăng nhập để khám phá!") Montserrat 20/700 white; accepts `children` slot for login button | components/login/login-hero.tsx
- [x] T026 [US1] Create LoginButton component (Client Component, `"use client"`): golden button (`bg-[#FFEA9E]`, `rounded-lg`, `px-6 py-4`); text "LOGIN With Google" Montserrat 22/700 `text-[#00101A]` with Google icon (24x24); onClick calls `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: '/auth/callback' } })`; manages `isLoading` state: disables button immediately on click, shows loading spinner, prevents double-click | components/login/login-button.tsx
- [x] T027 [US1] Create auth route group layout (Server Component): minimal wrapper, passes children through without shared nav | app/(auth)/layout.tsx
- [x] T028 [US1] Create Login page (Server Component): check session server-side via `createServerSupabaseClient()` and `supabase.auth.getUser()`; if authenticated, call `redirect('/')`; compose `<Header>`, `<LoginHero>` with `<LoginButton>`, `<Footer>`; export metadata `{ title: 'Login | SAA 2025', description: 'Đăng nhập Sun Annual Awards 2025' }` | app/(auth)/login/page.tsx

**Checkpoint**: ✅ User Story 1 complete. Full login flow works end-to-end. All tests passing.

---

## Phase 4: User Story 2 — Language Selection (Priority: P2)

**Goal**: User can switch display language between Vietnamese and English

**Independent Test**: Click language selector, verify dropdown opens with VN/EN options, select language, verify UI updates.

### Tests (US2)

- [x] T029 [US2] Write test: LanguageSelector renders current language "VN" with flag icon and chevron; clicking toggles dropdown open/closed; clicking outside closes dropdown; selecting an option updates display and closes dropdown | components/ui/__tests__/language-selector.test.tsx

### Implementation (US2)

- [x] T030 [US2] Create LanguageSelector component (Client Component, `"use client"`): button displays VN flag icon + "VN" text (Montserrat 16/700 white) + chevron-down icon; onClick toggles `isOpen` state; dropdown menu with VN and EN options; click outside closes via `useRef` + `useEffect` event listener; on select: update locale cookie and close dropdown; styled per design-style.md (`rounded`, `px-4`, gap `0.5`) | components/ui/language-selector.tsx
- [x] T031 [US2] Integrate LanguageSelector into Header component: render as right-side child; update Login page to pass `<LanguageSelector />` to Header | components/ui/header.tsx, app/(auth)/login/page.tsx

**Checkpoint**: ✅ User Stories 1 & 2 complete. Language selector works on login page. All tests passing.

---

## Phase 5: User Story 3 — Responsive Login Experience (Priority: P2)

**Goal**: Login page is fully responsive across mobile, tablet, and desktop

**Independent Test**: Open login page at 375px, 768px, 1024px, 1440px viewports — verify layout, readability, tap targets.

### Implementation (US3)

- [x] T032 [US3] Add responsive Tailwind classes to Header: mobile `px-4`, tablet `sm:px-12`, desktop `lg:px-36`; ensure logo and language selector stack correctly on small screens | components/ui/header.tsx
- [x] T033 [P] [US3] Add responsive Tailwind classes to LoginHero: mobile `px-4 py-12` with full-width content; tablet `sm:px-12 sm:py-16`; desktop `lg:px-36 lg:py-24`; ROOT FURTHER logo scales with `max-w-full` on mobile; hero text responsive `text-base sm:text-lg lg:text-xl` | components/login/login-hero.tsx
- [x] T034 [P] [US3] Add responsive Tailwind classes to LoginButton: mobile `w-full text-lg`; tablet+ `sm:w-auto sm:min-w-[305px] sm:text-[22px]`; ensure minimum touch target 44x44px on all breakpoints | components/login/login-button.tsx
- [x] T035 [P] [US3] Add responsive Tailwind classes to Footer: mobile `px-4 py-6 text-center text-sm`; tablet `sm:px-12`; desktop `lg:px-[90px] lg:py-10 lg:text-base` | components/ui/footer.tsx

**Checkpoint**: ✅ All user stories implementation complete. Page looks correct at all breakpoints.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Refinements affecting multiple stories

- [x] T036 [P] Add `backdrop-blur-md` to Header for glass-morphism effect complementing 80% opacity background | components/ui/header.tsx
- [x] T037 [P] Add hover/focus transitions to LoginButton: `transition-all duration-150 ease-in-out`; hover brightness increase + subtle shadow; focus visible outline `outline-2 outline-offset-2 outline-[#FFEA9E]` | components/login/login-button.tsx
- [x] T038 [P] Add hover transition to LanguageSelector: `transition-colors duration-150`; hover background highlight; cursor pointer | components/ui/language-selector.tsx
- [x] T039 [P] Add `aria-label` attributes: LoginButton "Sign in with Google"; LanguageSelector "Select language"; Header `<nav>` landmark; main content `<main>` landmark | components/login/login-button.tsx, components/ui/language-selector.tsx, components/ui/header.tsx
- [x] T040 Create loading.tsx for auth route group: simple centered spinner or skeleton matching dark theme | app/(auth)/loading.tsx
- [x] T041 [P] Create error.tsx for auth route group: error boundary with "Something went wrong" message and retry button on dark background | app/(auth)/error.tsx
- [x] T042 Run full test suite (`vitest run`), fix any failures, ensure all tests pass | (all test files)
- [x] T043 Run `next build` and verify zero errors; fix any type errors or build warnings | (project-wide)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: ✅ Complete
- **Foundation (Phase 2)**: ✅ Complete
- **US1 (Phase 3)**: ✅ Complete (all tests passing)
- **US2 (Phase 4)**: ✅ Complete (all tests passing)
- **US3 (Phase 5)**: ✅ Complete
- **Polish (Phase 6)**: ✅ Complete (all tests passing)

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD per Constitution V)
- Components before page composition
- Server components before client components (dependencies flow downward)
- Story complete before moving to next priority

### Parallel Opportunities

**Phase 1** (max parallel: 6):
- T006/T007/T008 (asset downloads) run in parallel
- T009/T010/T011 (icon components) run in parallel after downloads
- T012/T013/T014 (config files) run in parallel

**Phase 2** (max parallel: 3):
- T015/T016/T017 (Supabase clients) run in parallel
- T018/T019 depend on T017

**Phase 3** (max parallel: 4):
- T021/T022 (tests) run in parallel
- T023/T024 (Footer/Header) run in parallel
- T025/T026 depend on T009 (GoogleIcon)

**Phase 5** (max parallel: 4):
- T032/T033/T034/T035 all run in parallel (different files)

**Phase 6** (max parallel: 4):
- T036/T037/T038/T039 all run in parallel (different files)

---

## Implementation Strategy

### MVP First (Recommended)

1. ✅ Complete Phase 1 + 2
2. ✅ Complete Phase 3 (User Story 1 only)
3. **STOP and VALIDATE**: Test login flow end-to-end
4. Deploy if ready — users can log in

### Incremental Delivery

1. ✅ Setup + Foundation → commit
2. ✅ Add User Story 1 (Login) → Test → commit
3. ✅ Add User Story 2 (Language) → Test → commit
4. ✅ Add User Story 3 (Responsive) → Test → commit
5. ✅ Polish → Test → commit

---

## Notes

- Commit after each phase or logical group
- Run tests before moving to next phase
- Update spec.md if requirements change during implementation
- Mark tasks complete as you go: `[x]`
- The Supabase project must be configured with Google OAuth before Phase 2 testing can fully work — Phase 2 code can still be written and unit-tested with mocks

---

## Phase 7: UI Bug Fix — Figma vs Implementation Comparison

**Purpose**: Compare Figma design with actual UI using Playwright, fix all visual discrepancies

- [x] T044 [P] Fix SAA logo height in Header: change from 48px to 56px per design-style.md spec (Logo height: 56px) | components/ui/header.tsx
- [x] T045 [P] Import Montserrat Alternates font in root layout: add `Montserrat_Alternates` from `next/font/google` with weight 700, set CSS variable `--font-montserrat-alternates` | app/layout.tsx
- [x] T046 Fix Footer font family: change from Montserrat to Montserrat Alternates per design-style.md (Footer uses `font-family: 'Montserrat Alternates'` 16/700) | components/ui/footer.tsx

**Checkpoint**: ✅ All 3 UI bugs fixed. Verified via Playwright computed style evaluation. All 14 tests passing. Build succeeds.

---

## Summary

**Implementation Status**: ✅ Complete (46/46 tasks done)

**Test Status**: ✅ All 14 tests passing

**Build Status**: ✅ Passing (`next build` completes with zero errors)

**Files Created**:
- `lib/supabase/client.ts`, `server.ts`, `middleware.ts`
- `middleware.ts`
- `app/(auth)/callback/route.ts`, `layout.tsx`, `loading.tsx`, `error.tsx`
- `app/(auth)/login/page.tsx`
- `components/ui/header.tsx`, `footer.tsx`, `language-selector.tsx`
- `components/login/login-hero.tsx`, `login-button.tsx`
- `components/login/__tests__/login-button.test.tsx`
- `components/ui/__tests__/language-selector.test.tsx`
- `components/icons/*.tsx`
- `types/database.ts`
- `vitest.config.ts`, `vitest.setup.ts`
- `.env.local.example`
