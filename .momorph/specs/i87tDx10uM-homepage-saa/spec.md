# Feature Specification: Homepage SAA

**Frame ID**: `i87tDx10uM`
**Frame Name**: `Homepage SAA`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-17
**Status**: Draft

---

## Overview

The Homepage SAA is the main landing page for the Sun* Annual Awards 2025 (SAA) application. It serves as the central hub introducing the "ROOT FURTHER" theme, providing event countdown information, showcasing the award categories, and promoting the Sun* Kudos initiative. Authenticated users land here after login and navigate to all other sections of the application from this page.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Homepage & Event Countdown (Priority: P1)

As a Sun* employee, I want to see the event countdown and key information on the homepage so that I know when the SAA 2025 ceremony will take place and can plan accordingly.

**Why this priority**: The countdown and event information are the primary purpose of the homepage before the event. This is the first thing users see and sets the context for the entire application.

**Independent Test**: Navigate to the homepage and verify the hero section displays correctly with countdown timer, event date/time, and venue information.

**Acceptance Scenarios**:

1. **Given** the user is authenticated and the event date is in the future, **When** they navigate to the homepage, **Then** they see the "ROOT FURTHER" hero banner with a real-time countdown showing days, hours, and minutes until the event, along with "Coming soon" label.
2. **Given** the event date/time has passed, **When** the user views the homepage, **Then** the "Coming soon" label is hidden and the countdown displays "00" for all units.
3. **Given** the user is on the homepage, **When** the countdown timer is running, **Then** the timer updates in real-time (every minute) with zero-padded two-digit values (e.g., "05" not "5").
4. **Given** the user is on the homepage, **When** they view the event info section, **Then** they see the event date ("26/12/2025"), venue ("Au Co Art Center"), and livestream note.

---

### User Story 2 - Navigate to Award Categories (Priority: P1)

As a Sun* employee, I want to browse the award categories displayed on the homepage so that I can understand the different awards and navigate to detailed information about each one.

**Why this priority**: Understanding the award system is a core user need. The award cards are the primary content section and drive engagement with the awards program.

**Independent Test**: Verify all 6 award cards render correctly in a 3-column grid and each card navigates to the correct Awards Information section.

**Acceptance Scenarios**:

1. **Given** the user is on the homepage, **When** they scroll to the awards section, **Then** they see the section header with caption "Sun* annual awards 2025", title "He thong giai thuong", description "Cac hang muc se duoc trao giai theo TOP nhung nguoi xuat sac nhat.", followed by 6 award cards in a 3-column grid (desktop).
2. **Given** the awards section is visible, **When** the user views the cards, **Then** each card displays: a thumbnail image with golden glow effect, the award title, a short description (max 2 lines with ellipsis), and a "Chi tiet" link.
3. **Given** the user hovers over an award card, **When** they hover, **Then** the card elevates slightly with a highlighted border/glow effect.
4. **Given** the user clicks on a card's image, title, or "Chi tiet" link, **When** they click, **Then** they are navigated to the "Awards Information" page with the URL hash set to the award's slug, causing the browser to auto-scroll to that award's detail section.

**Award Categories**:
| # | Award Name | Description |
|---|-----------|-------------|
| 1 | Top Talent | Vinh danh top ca nhan xuat sac tren moi phuong dien |
| 2 | Top Project | Vinh danh du an xuat sac tren moi phuong dien, du an co doanh thu noi |
| 3 | Top Project Leader | Vinh danh nguoi quan ly truyen cam hung va dan dat du an but pha |
| 4 | Best Manager | Vinh danh nguoi quan ly co nang luc quan ly tot, dan dat doi nhom |
| 5 | Signature 2025 - Creator | Vinh danh nguoi co nang luc quan ly tot, dan dat doi nhom |
| 6 | MVP (Most Valuable Person) | Vinh danh nguoi co nang luc quan ly tot, dan dat doi nhom |

---

### User Story 3 - Navigate via Header & CTA Buttons (Priority: P1)

As a Sun* employee, I want to navigate between the main sections of the application (About SAA, Awards Information, Sun* Kudos) using the header navigation and CTA buttons so that I can access all parts of the platform efficiently.

**Why this priority**: Navigation is fundamental to the application's usability. Without working navigation, users cannot access any other features.

**Independent Test**: Verify header nav links, CTA buttons, and footer links all navigate to the correct pages with correct active states.

**Acceptance Scenarios**:

1. **Given** the user is on the homepage, **When** they view the header, **Then** they see the SAA logo, nav links ("About SAA 2025" [active/selected], "Awards Information", "Sun* Kudos"), notification bell, language selector ("VN"), and user avatar.
2. **Given** the "About SAA 2025" nav link is in selected state, **When** the user clicks it, **Then** the page scrolls to the top.
3. **Given** the user clicks "Awards Information" or "Sun* Kudos" in the header, **When** they click, **Then** they navigate to the respective page.
4. **Given** the user hovers over a nav link, **When** they hover, **Then** the link shows a highlighted/hover state with background change.
5. **Given** the user clicks "ABOUT AWARDS" CTA button in the hero section, **When** they click, **Then** they navigate to the Awards Information page.
6. **Given** the user clicks "ABOUT KUDOS" CTA button in the hero section, **When** they click, **Then** they navigate to the Sun* Kudos page.
7. **Given** the user scrolls to the footer, **When** they view it, **Then** they see the same navigation links plus "Tieu chuan chung" and copyright text. Footer links function identically to header links.

---

### User Story 4 - View Sun* Kudos Promotion Section (Priority: P2)

As a Sun* employee, I want to see the Sun* Kudos promotion section on the homepage so that I can learn about the recognition initiative and navigate to participate.

**Why this priority**: The Kudos section drives engagement with the recognition program but is secondary to the core awards information.

**Independent Test**: Verify the Kudos section renders with correct content and the "Chi tiet" button navigates to the Sun* Kudos page.

**Acceptance Scenarios**:

1. **Given** the user scrolls past the awards section, **When** they reach the Kudos section, **Then** they see a card with "DIEM MOI CUA SAA 2025" badge label, "Phong trao ghi nhan" subtitle, "Sun* Kudos" title, a description paragraph, a "Chi tiet" button, and a decorative "KUDOS" text with illustration on the right.
2. **Given** the user clicks the "Chi tiet" button in the Kudos section, **When** they click, **Then** they navigate to the Sun* Kudos page.

---

### User Story 5 - Use Account & Utility Features (Priority: P2)

As a Sun* employee, I want to access my profile, notifications, and language settings from the header so that I can manage my account and preferences.

**Why this priority**: Account management and utility features enhance the user experience but are not the primary purpose of the homepage.

**Independent Test**: Verify each utility button in the header opens its respective dropdown/panel.

**Acceptance Scenarios**:

1. **Given** the user clicks the notification bell icon, **When** they click, **Then** a notification panel opens. If there are unread notifications, a red badge dot is visible on the bell icon.
2. **Given** the user clicks the language selector ("VN"), **When** they click, **Then** a dropdown opens with options "VN" and "EN". Selecting a language changes the interface language.
3. **Given** the user clicks their avatar icon, **When** they click, **Then** a dropdown menu appears with options: "Profile", "Sign out", and "Admin Dashboard" (for admin role users only).
4. **Given** the user clicks the SAA logo in the header, **When** they click, **Then** they navigate to the homepage (scroll to top if already on homepage).

---

### User Story 6 - Use Widget Quick Action Button (Priority: P3)

As a Sun* employee, I want to use the floating widget button to quickly access common actions so that I can perform frequent tasks without navigating away.

**Why this priority**: The widget button is a convenience feature that enhances workflow but is not essential for the homepage's core purpose.

**Independent Test**: Verify the floating button is visible and opens a quick action menu on click.

**Acceptance Scenarios**:

1. **Given** the user is on the homepage, **When** they view the page, **Then** a floating pill-shaped button (gold background, pen + SAA icon) is fixed at the bottom-right corner of the viewport.
2. **Given** the user clicks the widget button, **When** they click, **Then** a quick action menu opens with available shortcuts.

---

### User Story 7 - Responsive Layout Across Devices (Priority: P2)

As a Sun* employee using a mobile or tablet device, I want the homepage to adapt to my screen size so that I can browse comfortably on any device.

**Why this priority**: Mobile responsiveness is required by the constitution (Principle III) and ensures accessibility for all users.

**Independent Test**: Verify the page layout adapts correctly at mobile (<640px), tablet (640-1023px), and desktop (>=1024px) breakpoints.

**Acceptance Scenarios**:

1. **Given** the user views the homepage on mobile (<640px), **When** the page loads, **Then** the header collapses to a mobile-friendly layout, hero content stacks vertically, CTA buttons stack, and award cards display in a 2-column grid.
2. **Given** the user views the homepage on tablet (640-1023px), **When** the page loads, **Then** the award cards display in a 2-column grid with appropriate spacing.
3. **Given** the user views the homepage on desktop (>=1024px), **When** the page loads, **Then** the award cards display in a 3-column grid with full-width hero section.
4. **Given** any viewport width, **When** the user views the page, **Then** all text remains readable, touch targets are at least 44x44px on mobile, and no horizontal scrolling occurs.

---

### Edge Cases

- What happens when the countdown target date is not configured? Display "00" for all units and hide "Coming soon" label.
- What happens when the countdown exceeds 99 days? The design specifies exactly 2 digit cards per unit. Display only the last 2 digits in the cards (e.g., 253 days → show "53" in cards) but add the full value in an `aria-label` for accessibility. Alternatively, add a 3rd digit card dynamically — **clarify with design team**.
- What happens when the user's session expires while on the homepage? Redirect to login page via Supabase auth middleware.
- What happens when award card descriptions exceed 2 lines? Truncate with ellipsis ("...") via CSS `line-clamp: 2`.
- What happens when the award data API returns an empty array? Display the section header without cards. Do NOT hide the entire awards section.
- What happens when the user has no network? Show cached content or appropriate offline state.
- What happens when images fail to load? Show a dark placeholder with the award name text for thumbnails; use a solid gradient fallback for the hero background.
- What happens when the user navigates via keyboard? All interactive elements (nav links, CTA buttons, award cards, "Chi tiet" links, widget button) MUST be reachable via Tab and activatable via Enter/Space.
- What happens when the user has no profile image? Display a default avatar icon in the header profile button.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Header | `2167:9091` | Sticky navigation bar with logo, nav links, notification, language, profile | Click nav links, hover states, dropdown menus |
| Logo | `I2167:9091;178:1033` | SAA brand logo (64x60px) | Click to go home |
| Nav - About SAA 2025 | `I2167:9091;186:1579` | Selected state nav link | Click to scroll to top |
| Nav - Awards Information | `I2167:9091;186:1587` | Hover state nav link | Click to navigate |
| Nav - Sun* Kudos | `I2167:9091;186:1593` | Normal state nav link | Click to navigate |
| Notification Bell | `I2167:9091;186:2101` | Notification icon with badge | Click to open panel |
| Language Selector | `I2167:9091;186:1696` | "VN" dropdown | Click to switch VN/EN |
| User Avatar | `I2167:9091;186:1597` | Profile icon button | Click to open profile dropdown |
| Hero/Keyvisual | `2167:9027` | Full-width banner with background image, gradient overlay | Static display |
| Countdown Timer | `2167:9035` | Days/Hours/Minutes countdown | Auto-updates real-time |
| "Coming soon" Label | `2167:9036` | Subtitle above countdown | Hidden when event passed |
| Event Info | `2167:9053` | Date, venue, livestream note | Static display |
| CTA - About Awards | `2167:9063` | Primary gold button | Click to navigate |
| CTA - About Kudos | `2167:9064` | Secondary outline button | Click to navigate |
| About Content | `5001:14827` | "Root Further" description block | Static display |
| Awards Section Header | `2167:9069` | Section title and caption | Static display |
| Award Card Grid | `5005:14974` | 3-column grid of 6 award cards | Scroll, hover, click |
| Award Card (x6) | `2167:9075-9081` | Thumbnail + title + description + link | Hover lift, click to navigate |
| Sun* Kudos Section | `3390:10349` | Promotion card with CTA | Click "Chi tiet" to navigate |
| Widget Button | `5022:15169` | Floating action button (bottom-right) | Click to open menu |
| Footer | `5001:14800` | Logo, nav links, copyright | Click links to navigate |

### Navigation Flow

- **From**: Login page (after authentication)
- **To**: Awards Information, Sun* Kudos, Profile, Notification panel, Admin Dashboard (admin only)
- **Triggers**: Header nav links, CTA buttons, award card clicks, Kudos "Chi tiet" button, footer links, widget button

### Visual Requirements

- **Responsive breakpoints**: Mobile (<640px), Tablet (640-1023px), Desktop (>=1024px) per constitution Principle III
- **Animations/Transitions**: Award card hover (lift + glow), button hover states, countdown digit transitions
- **Accessibility (WCAG AA)**:
  - Minimum 44x44px touch targets on mobile for all interactive elements
  - Proper `alt` text for all images (hero background, award thumbnails, logos)
  - Keyboard navigation: all interactive elements reachable via Tab, activatable via Enter/Space
  - Focus visible: all focusable elements MUST have a visible focus indicator (2px outline in `#FFEA9E` with 2px offset)
  - Skip navigation link: hidden link at page top to skip to main content
  - Countdown timer: use `aria-live="polite"` with `aria-label` describing remaining time (e.g., "25 days, 12 hours, 30 minutes until event")
  - Award cards: use `role="link"` or semantic `<a>` wrapping, with `aria-label` including award name
  - Color contrast: gold `#FFEA9E` on dark `#00101A` passes WCAG AA (ratio ~13.5:1); white `#FFFFFF` on dark passes (ratio ~18.1:1)
  - Language: `lang` attribute on `<html>` MUST update when language is switched

> **See [design-style.md](./design-style.md) for complete visual specifications including colors, typography, spacing, and component states.**

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a real-time countdown timer (days, hours, minutes) counting down to the configured event datetime. The target datetime MUST be configurable via environment variable in ISO-8601 format.
- **FR-002**: System MUST hide the "Coming soon" label when the countdown reaches zero (event has started).
- **FR-003**: System MUST display 6 award category cards in a responsive grid (3 columns desktop, 2 columns mobile/tablet).
- **FR-004**: System MUST navigate to Awards Information page with hash-based anchor (`#award-slug`) when any part of an award card is clicked (image, title, or "Chi tiet" link).
- **FR-005**: System MUST display the Header component with navigation links that reflect the current active page via selected state styling.
- **FR-006**: System MUST support language switching between Vietnamese (VN) and English (EN) via the header language selector.
- **FR-007**: System MUST display a notification badge (red dot) on the bell icon when unread notifications exist.
- **FR-008**: System MUST display a profile dropdown with "Profile", "Sign out" options, and "Admin Dashboard" option for admin-role users.
- **FR-009**: System MUST display a floating widget button fixed at the bottom-right corner that opens a quick action menu.
- **FR-010**: Award card descriptions MUST truncate at 2 lines with ellipsis if content exceeds available space.

### Technical Requirements

- **TR-001**: Countdown timer MUST update every minute without full page reload. Use client-side interval with `setInterval`.
- **TR-002**: Page MUST be rendered as a Server Component by default, with countdown timer and interactive elements (dropdowns, widget) as Client Components per constitution Principle II.
- **TR-003**: All images MUST use `next/image` for automatic optimization per constitution.
- **TR-004**: Header MUST be a shared component in the `(main)` layout as it appears on all authenticated pages.
- **TR-005**: Event date/time MUST be configurable via `NEXT_PUBLIC_EVENT_DATETIME` environment variable (ISO-8601 format).
- **TR-006**: Event venue, address, and livestream note MUST be configurable via environment variables (`EVENT_VENUE`, `EVENT_LIVESTREAM_NOTE`) or fetched from `/api/event-config`.
- **TR-007**: Award data (titles, descriptions, slugs, thumbnail images) SHOULD be fetched from the API. Static fallback data MAY be used for initial implementation.

### State Management

**Client-side State (requires `"use client"`):**
- `countdownRemaining` — `{ days: number, hours: number, minutes: number }` updated every 60s via `setInterval`. Derived from `NEXT_PUBLIC_EVENT_DATETIME` env var.
- `isEventPassed` — `boolean` derived from countdown reaching zero. Controls "Coming soon" label visibility.
- `isNotificationOpen` — `boolean` toggle for notification panel overlay.
- `isLanguageDropdownOpen` — `boolean` toggle for language selector dropdown.
- `isProfileDropdownOpen` — `boolean` toggle for profile menu dropdown.
- `isWidgetMenuOpen` — `boolean` toggle for floating action button menu.
- `currentLanguage` — `'vi' | 'en'` persisted to cookie/localStorage.

**Server-side State (fetched in Server Components):**
- Award categories list — fetched from API, passed as props to `AwardCardGrid`.
- User session and role — from Supabase auth, determines admin visibility in profile dropdown.
- Unread notification count — fetched from API, passed to `NotificationBell`.

**Loading States:**
- Hero section: Render layout immediately with skeleton/placeholder for background image. Countdown starts as "00:00:00" until hydrated.
- Award cards: Show 6 skeleton cards in grid while data loads (shimmer effect on dark background).
- Images: Use `next/image` `placeholder="blur"` with a low-quality dark placeholder for progressive loading.

**Error States:**
- API failure for awards: Display section header with a "Could not load awards" message and retry button.
- API failure for notifications: Hide the badge dot (fail silently — non-critical).
- Image load failure: Display dark fallback with award name text overlay.

### Key Entities *(if feature involves data)*

- **Award Category**: Represents a single award type (id, name, slug, description, thumbnail_url, display_order)
- **Event Config**: Event date/time (`datetime`, ISO-8601), venue name (`string`), venue address (`string`, optional), livestream note (`string`). All fields configurable via env vars or admin settings. The Figma design and screenshot show different values for these fields, confirming they are dynamic content.
- **Notification**: User notifications with read/unread status (id, user_id, message, is_read, created_at)

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| /api/awards | GET | Fetch list of award categories with names, descriptions, slugs, thumbnails | Predicted |
| /api/notifications/unread-count | GET | Get count of unread notifications for badge display | Predicted |
| /api/event-config | GET | Fetch event configuration (date, venue, livestream) | Predicted |
| /api/auth/session | GET | Verify user session and get user role | Exists (Supabase) |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Homepage loads within 3 seconds on 3G connection (LCP < 3s).
- **SC-002**: All 6 award cards render correctly and navigate to the correct Awards Information section with proper hash anchors.
- **SC-003**: Countdown timer displays accurate time remaining and updates in real-time.
- **SC-004**: Page passes Lighthouse accessibility audit with score >= 90.
- **SC-005**: Layout renders correctly without horizontal scroll at all responsive breakpoints (320px to 1920px).

---

## Out of Scope

- Admin management of award categories (handled by Admin pages)
- Notification panel content and interaction details (separate spec)
- Language selector dropdown UI details (separate component spec)
- Profile dropdown and profile page (separate spec)
- Widget button menu options and actions (separate spec)
- Detailed hero background image/animation specifications

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- **Typo in design**: The Figma design shows "Comming soon" (double 'm'). Implementation MUST use the correct spelling "Coming soon".
- The hero section background uses a large artistic image with a gradient overlay. The "ROOT FURTHER" logo is a custom graphic (not text), so it should be rendered as an optimized image.
- The countdown target datetime should default to `2025-12-26T18:30:00+07:00` based on the event info shown in the design.
- Font "Digital Numbers" is used specifically for countdown digits. This is a specialty font that needs to be loaded separately.
- The award card data shown in the design may be placeholder. Implementation should support dynamic data from the API with the same visual layout.
- The header is shared across all authenticated pages and should be implemented as part of the `(main)` route group layout.
- The Sun* Kudos section has a small label "DIEM MOI CUA SAA 2025" above the "Phong trao ghi nhan" subtitle. This label serves as a badge/tag for the feature highlight.
- The About Content section text is static marketing copy. If i18n is needed, the content should be stored in locale files rather than an API.
- Footer contains 4 navigation links (not 3 like header): "About SAA 2025", "Awards Information", "Sun* Kudos", and "Tieu chuan chung". The 4th link navigates to the community standards page.
