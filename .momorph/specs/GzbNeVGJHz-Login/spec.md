# Feature Specification: Login

**Frame ID**: `GzbNeVGJHz`
**Frame Name**: `Login`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-16
**Status**: Draft

---

## Overview

The Login screen is the entry point to the Sun Annual Awards 2025 (SAA 2025) web application. It presents a visually rich hero section with the event branding ("ROOT FURTHER") and a single Google OAuth login button. The screen serves as both a landing page and authentication gateway for Sun* employees.

---

## User Scenarios & Testing

### User Story 1 - Google OAuth Login (Priority: P1)

**As a** Sun* employee
**I want to** log in with my Google account
**So that** I can access the SAA 2025 platform and participate in the event

**Why this priority**: Core authentication is the fundamental requirement — no other feature works without it.

**Independent Test**: Navigate to login page, click "LOGIN With Google", complete Google auth, verify redirect to homepage.

**Acceptance Scenarios**:

**Scenario 1: Successful first-time login**
- **Given**: User is not logged in and has a valid Sun* Google account
- **When**: User clicks "LOGIN With Google" and completes Google authentication
- **Then**: A new profile is created in the system, and the user is redirected to the homepage

**Scenario 2: Successful returning login**
- **Given**: User has previously logged in and has an existing profile
- **When**: User clicks "LOGIN With Google" and completes Google authentication
- **Then**: User is authenticated with existing profile and redirected to the homepage

**Scenario 3: Login button loading state**
- **Given**: User is on the login page
- **When**: User clicks "LOGIN With Google"
- **Then**: The button immediately becomes disabled, shows a loading spinner, and prevents double-click

**Scenario 4: Authenticated user redirect**
- **Given**: User is already authenticated with a valid session
- **When**: User navigates to the login page URL
- **Then**: User is automatically redirected to the homepage (login page is not displayed)

---

### User Story 2 - Language Selection (Priority: P2)

**As a** Sun* employee
**I want to** switch the display language
**So that** I can use the application in my preferred language (Vietnamese or English)

**Why this priority**: Enhances usability for a multilingual workforce, but not blocking for core functionality.

**Independent Test**: Click language selector, verify dropdown appears, select a different language, verify UI updates.

**Acceptance Scenarios**:

**Scenario 1: Open language dropdown**
- **Given**: User is on the login page
- **When**: User clicks the "VN" language selector in the header
- **Then**: A dropdown menu appears with available languages (VN, EN)

**Scenario 2: Switch language**
- **Given**: Language dropdown is open
- **When**: User selects a different language
- **Then**: The page content updates to the selected language and the selector displays the new language code

---

### User Story 3 - Responsive Login Experience (Priority: P2)

**As a** Sun* employee using a mobile device
**I want to** access the login page on any screen size
**So that** I can log in from my phone or tablet

**Why this priority**: Constitution mandates responsive design; mobile access is essential for an internal event.

**Independent Test**: Open login page on mobile viewport (375px), tablet (768px), and desktop (1440px) — verify layout, readability, and button tap target.

**Acceptance Scenarios**:

**Scenario 1: Mobile layout**
- **Given**: User accesses the login page on a mobile device (< 640px)
- **When**: The page loads
- **Then**: The hero text is readable, the login button spans full width, and the touch target is at least 44x44px

**Scenario 2: Desktop layout**
- **Given**: User accesses the login page on a desktop (>= 1024px)
- **When**: The page loads
- **Then**: The layout matches the Figma design at 1440px width with proper spacing

---

### Edge Cases

- What happens when Google OAuth fails (user cancels, network error)?
- What happens if the user's Google account is not a Sun* domain account?
- What happens if the Supabase Auth service is temporarily unavailable?

---

## UI/UX Requirements

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Header | 662:14391 | Fixed top bar with logo and language selector | Sticky on scroll |
| Logo | I662:14391;186:2166 | SAA 2025 logo, top-left | None (static) |
| Language Selector | I662:14391;186:1601 | "VN" with flag icon and chevron | Click: opens dropdown |
| Key Visual Background | 662:14388 | Full-screen artwork image | None (decorative) |
| Gradient Overlays | 662:14392, 662:14390 | Left and bottom gradient fades | None (decorative) |
| ROOT FURTHER Logo | 662:14395 | Event branding title image | None (static) |
| Hero Text | 662:14753 | Two-line call-to-action text | None (static) |
| Login Button | 662:14425 | "LOGIN With Google" with Google icon | Click: initiates OAuth |
| Footer | 662:14447 | Copyright text at bottom | None (static) |

**Visual Specifications**: See [design-style.md](./design-style.md) for colors, typography, spacing, and component state details.

### Navigation Flow

- **From**: Direct URL (root `/` or `/login`), or redirect from any protected route
- **To**: Homepage (`/`) after successful authentication
- **Triggers**: Clicking "LOGIN With Google" button → Google OAuth → callback → redirect

### Visual Requirements

- Responsive breakpoints: mobile (< 640px), tablet (640-1023px), desktop (>= 1024px)
- Key visual image must load with `priority` for optimal LCP
- Gradient overlays create depth and ensure text readability over the background
- Header uses semi-transparent background (80% opacity) with potential backdrop-blur

### Accessibility Requirements

- Login button MUST have `aria-label` for screen readers
- Language selector MUST be keyboard-navigable (Tab, Enter, Escape)
- Sufficient color contrast: white text (#FFFFFF) on dark background (#00101A) exceeds WCAG AAA (21:1 ratio)
- Focus indicators MUST be visible on all interactive elements
- Page MUST have proper heading structure and landmark regions

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST authenticate users via Google OAuth using Supabase Auth
- **FR-002**: System MUST create a `profiles` record on first login (via database trigger)
- **FR-003**: System MUST redirect authenticated users away from the login page to the homepage
- **FR-004**: System MUST redirect unauthenticated users to the login page when accessing protected routes
- **FR-005**: Login button MUST disable immediately after click to prevent duplicate auth requests
- **FR-006**: System MUST display a loading state on the button during authentication
- **FR-007**: Language selector MUST allow switching between Vietnamese (VN) and English (EN)
- **FR-008**: Selected language MUST persist across sessions (stored in profile or cookie)

### Technical Requirements

- **TR-001**: Authentication MUST use `@supabase/ssr` for server-side client creation (per Constitution)
- **TR-002**: Session tokens MUST be stored in HTTP-only cookies — never localStorage (per Constitution IV)
- **TR-003**: Login page route MUST be under `app/(auth)/login/page.tsx` (per Constitution folder structure)
- **TR-004**: OAuth callback MUST be handled at `app/(auth)/callback/route.ts`
- **TR-005**: Key visual image MUST use `next/image` with `priority` attribute for LCP optimization (per Constitution II)
- **TR-006**: Fonts (Montserrat, Montserrat Alternates) MUST be loaded via `next/font/google`

### Key Entities

- **Profile**: Extends `auth.users` — id (UUID), full_name, avatar_url, department_id, role, locale
- **auth.users**: Managed by Supabase Auth — email, raw_user_meta_data (Google profile)

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Supabase Auth `/auth/v1/authorize` | GET | Initiate Google OAuth flow | Exists (Supabase built-in) |
| `/auth/callback` | GET | Handle OAuth callback, exchange code for session | New (route handler) |
| Supabase Auth `/auth/v1/token` | POST | Refresh session token | Exists (Supabase built-in) |

**Note**: No custom API endpoints are needed for login. Supabase Auth handles the entire OAuth flow. The only new code is the callback route handler.

---

## State Management

### Local Component State

| State | Type | Default | Purpose |
|-------|------|---------|---------|
| `isLoading` | boolean | false | Login button loading state |
| `isLangDropdownOpen` | boolean | false | Language dropdown visibility |

### Global State

- **Session/Auth**: Managed by Supabase Auth client — accessible via `supabase.auth.getSession()` on server, `supabase.auth.onAuthStateChange()` on client
- **Locale**: Stored in profile (`locale` column) or browser cookie; used by i18n system

### Cache Requirements

- No data fetching on the login page (static content + auth action only)
- Key visual image should be cached by CDN / Next.js image optimization

---

## Constitution Compliance Check

- [x] **I. Clean Code**: Login page is a single-responsibility route under `app/(auth)/login/`
- [x] **II. Next.js Best Practices**: Uses App Router, Server Components for static parts, `"use client"` only for login button interaction
- [x] **III. Responsive**: Mobile-first design with Tailwind breakpoints (sm/md/lg/xl)
- [x] **IV. OWASP Security**: Supabase Auth with HTTP-only cookies, no client-side token storage
- [x] **V. TDD**: Tests for auth flow, redirect logic, and button state transitions

---

## Out of Scope

- Email/password login (Google OAuth only per design)
- User registration form (auto-created via Supabase trigger)
- Password reset/forgot password flows
- Admin login (same Google OAuth, role-based routing handled post-login)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] Supabase project configured with Google OAuth provider
- [ ] Database schema applied (`.momorph/contexts/database-schema.sql`)
- [ ] Environment variables set: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, Google OAuth credentials

---

## Notes

- The login screen doubles as the landing page — unauthenticated users see this first
- The "ROOT FURTHER" branding is an image, not text — it cannot be translated
- The hero background artwork is a key part of the event identity and should load with high priority
- Footer text "Bản quyền thuộc vè Sun* © 2025" contains a typo in the Figma design ("vè" should be "về") — confirm with design team
