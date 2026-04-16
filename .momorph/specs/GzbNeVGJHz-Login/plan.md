# Implementation Plan: Login

**Frame**: `GzbNeVGJHz-Login`
**Date**: 2026-04-16
**Spec**: `specs/GzbNeVGJHz-Login/spec.md`

---

## Summary

Implement the Login screen for the SAA 2025 web application. This is the entry point — a full-viewport hero page with a "ROOT FURTHER" key visual and a single Google OAuth login button via Supabase Auth. The screen also includes a language selector (VN/EN) in the header and a copyright footer. This is the first feature to implement from a greenfield Next.js 16 project scaffold.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 16 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, @supabase/ssr, @supabase/supabase-js
**Database**: Supabase (PostgreSQL) — `profiles` table extends `auth.users`
**Testing**: Vitest + React Testing Library (unit/integration), Playwright (E2E)
**State Management**: Local `useState` only (no global state needed)
**API Style**: Supabase Auth SDK (no custom REST endpoints for login)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] **I. Clean Code**: kebab-case files, PascalCase components, `@/*` imports, single responsibility
- [x] **II. Next.js Best Practices**: App Router, Server Components by default, `"use client"` only for interactive parts, `next/image`, `next/font/google`
- [x] **III. Responsive Design**: Mobile-first Tailwind, breakpoints sm/md/lg/xl, 44px touch targets
- [x] **IV. OWASP Security**: Supabase Auth, HTTP-only cookies via `@supabase/ssr`, no client-side token storage
- [x] **V. TDD**: Tests for auth flow, redirect logic, button states, responsive layout

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| None | — | — |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based. Login page is self-contained under `app/(auth)/login/`. Shared UI primitives in `components/ui/`.
- **Styling Strategy**: Tailwind CSS 4 utility classes with custom theme colors defined in `globals.css`. Fonts via `next/font/google` (Montserrat, Montserrat Alternates).
- **Data Fetching**: No data fetching on the login page. Authentication is a client-side action (Supabase `signInWithOAuth`). Session check on the server side (redirect if already authenticated).
- **Rendering Split**:
  - **Server Component**: Login page layout, header, hero content, footer (static markup)
  - **Client Component**: `LoginButton` (onClick handler, loading state), `LanguageSelector` (dropdown toggle)

### Backend Approach

- **API Design**: No custom API endpoints. Supabase Auth handles the full OAuth flow. Only need a route handler at `/auth/callback` to exchange the auth code for a session.
- **Data Access**: Supabase server client via `@supabase/ssr` for session verification in middleware.
- **Middleware**: Next.js middleware to check auth state and redirect:
  - Unauthenticated accessing protected routes → redirect to `/login`
  - Authenticated accessing `/login` → redirect to `/`

### Integration Points

- **Supabase Auth**: Google OAuth provider (configured in Supabase dashboard)
- **Supabase Database**: `profiles` table with trigger on `auth.users` insert (from `database-schema.sql`)
- **Shared Components**: `Header` and `Footer` will be reused across the authenticated layout later

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/GzbNeVGJHz-Login/
├── spec.md              # Feature specification
├── plan.md              # This file
├── design-style.md      # Design specifications
└── assets/              # Screenshots
```

### New Files

| File | Purpose |
|------|---------|
| `app/(auth)/login/page.tsx` | Login page (Server Component) |
| `app/(auth)/callback/route.ts` | OAuth callback route handler |
| `app/(auth)/layout.tsx` | Auth route group layout (minimal, no header/footer from main) |
| `components/login/login-button.tsx` | Client component: Google login button with loading state |
| `components/login/login-hero.tsx` | Server component: hero section with key visual and text |
| `components/ui/language-selector.tsx` | Client component: language dropdown toggle |
| `components/ui/header.tsx` | Header component (logo + language selector) |
| `components/ui/footer.tsx` | Footer component (copyright) |
| `components/icons/google-icon.tsx` | Google logo icon component |
| `components/icons/chevron-down-icon.tsx` | Chevron down icon component |
| `lib/supabase/client.ts` | Browser Supabase client factory |
| `lib/supabase/server.ts` | Server Supabase client factory |
| `lib/supabase/middleware.ts` | Auth middleware helper |
| `middleware.ts` | Next.js middleware (auth redirect logic) |
| `types/database.ts` | Supabase generated TypeScript types (placeholder) |

### Modified Files

| File | Changes |
|------|---------|
| `app/layout.tsx` | Replace Geist fonts with Montserrat + Montserrat Alternates via `next/font/google`. Update metadata (title, description). Remove dark mode classes. |
| `app/page.tsx` | Replace default content with redirect to `/login` (or serve as authenticated homepage later) |
| `app/globals.css` | Add custom CSS variables for SAA theme colors. Remove default Geist theme. |
| `package.json` | Add Supabase dependencies |
| `.env.local` | Add Supabase environment variables (not committed) |
| `.gitignore` | Ensure `.env.local` is listed |

### Assets to Download

| Figma Node ID | File Name | Purpose |
|---------------|-----------|---------|
| `I662:14391;178:1033;178:1030` | `public/images/saa-logo.png` | SAA 2025 logo (header) |
| `2939:9548` | `public/images/root-further-logo.png` | ROOT FURTHER title image (hero) |
| `I662:14426;186:1766` | SVG in `components/icons/google-icon.tsx` | Google logo (login button) |
| `I662:14391;186:1696;186:1821;186:1709` | SVG in `components/icons/flag-vn-icon.tsx` | Vietnam flag (language selector) |
| `I662:14391;186:1696;186:1821;186:1441` | SVG in `components/icons/chevron-down-icon.tsx` | Chevron down (language selector) |
| Frame background | `public/images/login-keyvisual.jpg` | Hero background artwork |

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@supabase/supabase-js` | ^2 | Supabase client SDK |
| `@supabase/ssr` | ^0 | Server-side Supabase for Next.js (cookies) |
| `vitest` | ^3 | Unit test runner |
| `@testing-library/react` | ^16 | Component testing |
| `@vitejs/plugin-react` | ^4 | Vitest React support |

---

## Implementation Strategy

### Phase 0: Asset Preparation & Project Setup

**Goal**: Set up project foundation and download all required assets.

1. Install dependencies: `@supabase/supabase-js`, `@supabase/ssr`
2. Install dev dependencies: `vitest`, `@testing-library/react`, `@vitejs/plugin-react`
3. Download media assets from Figma using the URLs from `get_media_files`:
   - SAA Logo → `public/images/saa-logo.png`
   - ROOT FURTHER Logo → `public/images/root-further-logo.png`
   - Login key visual background → `public/images/login-keyvisual.jpg`
4. Create SVG icon components from downloaded SVGs (Google, VN flag, Chevron)
5. Update `app/layout.tsx`: replace Geist fonts with Montserrat + Montserrat Alternates
6. Update `app/globals.css`: add SAA theme CSS variables
7. Create `.env.local` template with Supabase variables
8. Update `.gitignore` for `.env.local`

**Checkpoint**: Project builds, fonts load correctly, assets in place.

### Phase 1: Foundation (Supabase Auth Infrastructure)

**Goal**: Set up the authentication plumbing. No UI yet.

1. Create `lib/supabase/client.ts` — browser client factory using `createBrowserClient`
2. Create `lib/supabase/server.ts` — server client factory using `createServerClient` with cookie handlers
3. Create `lib/supabase/middleware.ts` — helper to create Supabase client in middleware context
4. Create `middleware.ts` — Next.js middleware:
   - Check session via `supabase.auth.getUser()`
   - If unauthenticated + accessing protected route → redirect to `/login`
   - If authenticated + accessing `/login` → redirect to `/`
5. Create `app/(auth)/callback/route.ts` — OAuth callback handler:
   - Extract `code` from URL search params
   - Exchange code for session via `supabase.auth.exchangeCodeForSession(code)`
   - Redirect to `/`
6. Create `types/database.ts` — placeholder for Supabase generated types

**Checkpoint**: Middleware runs, callback route exists, Supabase clients work. Auth flow testable end-to-end if Supabase project is configured.

### Phase 2: Core Features — Login Page UI (US1: P1)

**Goal**: Build the login page with Google OAuth button. This is the MVP.

1. Create `app/(auth)/layout.tsx` — minimal layout (no shared header/footer from main app)
2. Create `components/ui/header.tsx` — Server Component with logo and language selector slot
3. Create `components/ui/footer.tsx` — Server Component with copyright text
4. Create `components/login/login-hero.tsx` — Server Component:
   - Key visual background with gradient overlays
   - ROOT FURTHER logo image
   - Hero text ("Bắt đầu hành trình..." / "Đăng nhập để khám phá!")
5. Create `components/login/login-button.tsx` — Client Component (`"use client"`):
   - onClick: call `supabase.auth.signInWithOAuth({ provider: 'google' })`
   - `isLoading` state: disable button, show spinner on click
   - Google icon + "LOGIN With Google" text
   - Styled per design-style.md (bg: #FFEA9E, Montserrat 22/700)
6. Create `app/(auth)/login/page.tsx` — Server Component:
   - Check session server-side; redirect if authenticated
   - Compose: Header + LoginHero (with LoginButton) + Footer
   - Export metadata: `{ title: 'Login | SAA 2025' }`
7. Update `app/page.tsx` — redirect to `/login` for now (will become homepage later)

**Checkpoint**: User can navigate to `/login`, see the full hero page, click "LOGIN With Google", complete OAuth, get redirected. Authenticated user hitting `/login` gets redirected away.

### Phase 3: Extended Features (US2: P2 — Language Selector)

**Goal**: Add language switching functionality.

1. Create `components/ui/language-selector.tsx` — Client Component:
   - Toggle dropdown on click
   - Display current language (VN flag + text + chevron)
   - Dropdown with VN/EN options
   - On select: update locale (cookie or profile), close dropdown
   - Click outside: close dropdown
2. Integrate into `components/ui/header.tsx`
3. Set up basic i18n infrastructure (JSON translation files or similar lightweight approach)

**Checkpoint**: Language selector opens, switches display. Persists selection.

### Phase 4: Responsive & Polish (US3: P2)

**Goal**: Ensure responsive layout and polish interactions.

1. Add responsive Tailwind classes to all components per design-style.md:
   - Mobile: full-width button, reduced padding, scaled logo
   - Tablet: intermediate spacing
   - Desktop: matches Figma 1440px reference
2. Add `backdrop-blur` to header for glass-morphism effect
3. Add hover transitions on login button (150ms ease-in-out)
4. Add focus indicators for keyboard navigation (visible outline)
5. Add `aria-label` attributes to interactive elements
6. Add `loading.tsx` for the auth route group
7. Add `error.tsx` for error boundary

**Checkpoint**: Page looks correct at 375px, 768px, 1024px, and 1440px viewports. All interactions smooth. Keyboard-navigable.

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: Login button click → OAuth initiation, Language dropdown toggle
- [x] **External dependencies**: Supabase Auth (mocked in unit tests)
- [ ] **Data layer**: N/A for login (no direct DB queries)
- [x] **User workflows**: Full login flow (E2E)

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | LoginButton loading state, LanguageSelector dropdown |
| App ↔ External API | Yes | Supabase Auth signInWithOAuth (mocked) |
| App ↔ Data Layer | No | — |
| Cross-platform | Yes | Responsive breakpoints |

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth | Mock | Unit tests must not hit external services (Constitution V) |
| next/navigation | Mock | Test redirects without real routing |
| next/image | Pass-through | Rendering test doesn't need real optimization |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Login page renders with all components visible
   - [x] Click login button → `signInWithOAuth` called with `{ provider: 'google' }`
   - [x] Button enters loading state after click (disabled + spinner)
   - [x] Authenticated user redirected away from `/login`
   - [x] OAuth callback exchanges code for session

2. **Error Handling**
   - [x] Supabase Auth error → button re-enables, error state
   - [x] Missing auth code in callback → redirect to `/login`

3. **Edge Cases**
   - [x] Double-click prevention (button disabled immediately)
   - [x] Language selector closes on outside click

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Auth flow (middleware, callback, login action) | 90%+ | High |
| UI components (LoginButton, LanguageSelector) | 80%+ | High |
| Responsive layout | Visual regression | Medium |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Supabase project not yet configured | High | High | Document required Supabase dashboard setup; provide `.env.local.example` |
| Key visual image large / slow LCP | Medium | Medium | Use `next/image` with `priority`, WebP format, appropriate sizing |
| Google OAuth redirect mismatch | Medium | High | Document exact redirect URL to configure in Supabase + Google Cloud Console |
| Font loading flash (FOUT) | Low | Low | Use `next/font/google` with `display: swap` and font preloading |

### Estimated Complexity

- **Frontend**: Low-Medium (static page + one OAuth action + one dropdown)
- **Backend**: Low (callback route handler + middleware only)
- **Testing**: Medium (auth mocking requires setup)

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved
- [x] `design-style.md` completed
- [ ] Supabase project created and Google OAuth provider configured
- [ ] Environment variables available (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- [ ] Database schema applied (at minimum `profiles` table + trigger)

### External Dependencies

- Supabase project with Google OAuth enabled
- Google Cloud Console: OAuth 2.0 credentials with authorized redirect URI
- Figma media assets (URLs available, need download)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order (Phase 0 → 1 → 2 → 3 → 4)

---

## Open Questions

- [ ] Should the login page be the root route (`/`) or a separate `/login` route? (Spec suggests root redirects to login for unauthenticated users)
- [ ] What happens when a non-Sun* Google account tries to log in? Should we restrict by email domain?
- [ ] Is the footer typo "vè" (should be "về") a known issue, or should we use the corrected text?
- [ ] Should language preference persist in a cookie (works pre-login) or only in the user's `profiles.locale` column (requires login)?

---

## Notes

- This is the first feature built on a fresh Next.js scaffold — Phase 0 establishes patterns for all future features
- The `middleware.ts` and Supabase client utilities created here will be reused by every authenticated route
- Header and Footer components should be designed for reuse in the `(main)` route group layout
- Commit after each logical group of changes per Constitution workflow
