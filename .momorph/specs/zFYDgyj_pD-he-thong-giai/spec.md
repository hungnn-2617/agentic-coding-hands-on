# Feature Specification: Hệ thống giải (Prize System)

**Frame ID**: `zFYDgyj_pD`
**Frame Name**: `Hệ thống giải`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-17
**Status**: Reviewed (3 passes — 2026-04-17)

---

## Overview

The **Prize System** page ("Hệ thống giải thưởng SAA 2025") is the main awards information page for Sun* Annual Awards 2025. It showcases all 6 award categories with detailed descriptions, prize quantities, and monetary values. The page features a hero keyvisual banner, a sticky sidebar navigation for quick access to each award category, alternating-layout award cards with glassmorphism effects, and a promotional section for the Sun* Kudos recognition program.

This is a **read-only informational page** — there are no forms, inputs, or data mutations. The primary interactions are sidebar navigation (smooth scroll to sections) and a single CTA button linking to the Sun* Kudos detail page.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Award Categories Overview (Priority: P1)

A Sun* employee visits the prize system page to understand all available award categories for SAA 2025, including the number of prizes and their monetary values.

**Why this priority**: This is the core purpose of the page — displaying award information. Without this, the page has no value.

**Independent Test**: Load the page and verify all 6 award categories are displayed with correct names, descriptions, prize counts, and values.

**Acceptance Scenarios**:

1. **Given** the user navigates to the Prize System page, **When** the page loads, **Then** a hero keyvisual banner is displayed with the "ROOT FURTHER" artwork and "Sun* Annual Awards 2025" branding.
2. **Given** the page has loaded, **When** the user scrolls down past the keyvisual, **Then** the page title "Hệ thống giải thưởng SAA 2025" is displayed in gold text.
3. **Given** the user is in the award section, **When** viewing the award cards, **Then** all 6 award categories are displayed in order: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP.
4. **Given** an award card is visible, **When** the user reads the card, **Then** the card displays: award image, title, description paragraph, prize count with unit type (Cá nhân/Đơn vị/Tập thể), and prize value in VNĐ.

---

### User Story 2 - Navigate Between Award Categories via Sidebar (Priority: P1)

A user wants to quickly jump to a specific award category without scrolling through the entire page.

**Why this priority**: With 6 award categories spanning a long page (~6400px), sidebar navigation is essential for usability.

**Independent Test**: Click each sidebar menu item and verify smooth scroll to the corresponding award section.

**Acceptance Scenarios**:

1. **Given** the user is on the Prize System page, **When** the award section is visible, **Then** a sidebar menu appears on the left with 6 items: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP.
2. **Given** the sidebar menu is visible, **When** the user clicks "Best Manager", **Then** the page smoothly scrolls to the Best Manager award card section.
3. **Given** the user has scrolled to an award section, **When** the corresponding section is in viewport, **Then** the sidebar menu highlights the active item with gold color (#FFEA9E) and a gold underline.
4. **Given** the user scrolls past different award sections, **When** a new section enters the viewport, **Then** the sidebar active indicator updates to reflect the current section.

---

### User Story 3 - Navigate to Sun* Kudos Detail Page (Priority: P2)

A user is interested in the Sun* Kudos recognition program and wants to learn more.

**Why this priority**: The Sun* Kudos CTA is a secondary action — the primary purpose is award information display.

**Independent Test**: Click the "Chi tiết" button in the Sun* Kudos section and verify navigation.

**Acceptance Scenarios**:

1. **Given** the user scrolls to the bottom of the award categories, **When** the Sun* Kudos section is visible, **Then** a promotional card is displayed with title "Sun* Kudos", description text, illustration, and a "Chi tiết" CTA button.
2. **Given** the Sun* Kudos card is visible, **When** the user clicks the "Chi tiết" button, **Then** the user is navigated to the Sun* Kudos detail page.
3. **Given** the user hovers over the "Chi tiết" button, **When** hovering, **Then** the button shows a subtle hover effect.

---

### User Story 4 - Responsive Viewing on Mobile/Tablet (Priority: P2)

A user accesses the Prize System page from a mobile or tablet device.

**Why this priority**: Mobile-first is a constitution requirement, but the page is primarily informational so layout adjustments are the main concern.

**Independent Test**: Resize the viewport to mobile (< 640px) and tablet (640px-1023px) and verify all content is accessible and readable.

**Acceptance Scenarios**:

1. **Given** the user views the page on mobile (< 640px), **When** the page loads, **Then** the sidebar menu is replaced by horizontal tabs or hidden behind a toggle, and award cards stack vertically (picture on top, content below).
2. **Given** the user views the page on tablet (640px-1023px), **When** the page loads, **Then** the sidebar menu becomes a horizontal tab bar above the award cards, and the layout adjusts proportionally.
3. **Given** any viewport width, **When** viewing award cards, **Then** all text remains readable without horizontal scrolling, and all images scale appropriately.

---

### User Story 5 - Header and Footer Navigation (Priority: P3)

A user uses the shared header or footer navigation to move between main sections of the SAA 2025 site.

**Why this priority**: Header/footer are shared components — this story ensures they function correctly on this page.

**Independent Test**: Verify header and footer nav items are displayed and link to correct pages.

**Acceptance Scenarios**:

1. **Given** the user is on the Prize System page, **When** viewing the header, **Then** the "Award Information" nav item is highlighted as active with gold color and glow effect.
2. **Given** the header is visible, **When** the user clicks "About SAA 2025", **Then** the user is navigated to the About page.
3. **Given** the footer is visible, **When** viewing the footer, **Then** navigation links (About SAA 2025, Award Information, Sun* Kudos, Tiêu chuẩn chung) and copyright text are displayed.

---

### User Story 6 - Keyboard & Screen Reader Navigation (Priority: P2)

A user with assistive technology navigates the Prize System page using keyboard only or a screen reader.

**Why this priority**: Constitution requires WCAG compliance, and the sidebar scroll-spy is the primary interaction pattern.

**Independent Test**: Tab through the page using keyboard only and verify all interactive elements are reachable and operable.

**Acceptance Scenarios**:

1. **Given** a keyboard user is on the page, **When** they press Tab, **Then** focus moves sequentially through header nav items, sidebar menu items, the "Chi tiết" CTA button, and footer nav items with a visible focus indicator.
2. **Given** a keyboard user focuses a sidebar menu item, **When** they press Enter, **Then** the page smooth-scrolls to the corresponding award section and the sidebar active state updates.
3. **Given** a screen reader user enters the award section, **When** the sidebar navigation is announced, **Then** it is identified as a `nav` landmark with an accessible label (e.g., "Danh mục giải thưởng").
4. **Given** a user has `prefers-reduced-motion: reduce` enabled, **When** they click a sidebar menu item, **Then** the page jumps instantly to the section instead of smooth-scrolling.

---

### Edge Cases

- **URL hash deep linking**: When the page loads with a URL hash (e.g., `#best-manager`), it should auto-scroll to that section and set the sidebar active state accordingly.
- **Missing award data**: If an award category has no data, the sidebar item should still be visible but the card should show a graceful empty state or be hidden with the sidebar adjusted.
- **Image load failure**: If an award image fails to load, display a themed fallback placeholder (dark background with gold border, award name text) maintaining the 336x336px dimensions.
- **Sidebar boundary behavior**: The sticky sidebar should stop following the viewport when the user scrolls past the last award card (D.6 MVP) — it should not overlap the SunKudos section.
- **JavaScript disabled**: The page should still render all content correctly via SSR. Sidebar links should use anchor `href` attributes (e.g., `#top-talent`) as a fallback for scroll-spy behavior.
- **Window resize**: If the user resizes the browser window across breakpoints, the layout should adapt without requiring a page reload.
- **Print stylesheet**: Award content should be readable when printed (remove glassmorphism effects, ensure black text on white background).

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|---|---|---|---|
| Hero Keyvisual | 313:8437 | Full-width banner with "ROOT FURTHER" artwork (1440x547px) | Display only |
| Section Title | 313:8453 | "Sun* Annual Awards 2025" subtitle + "Hệ thống giải thưởng SAA 2025" heading | Display only |
| Sidebar Menu | 313:8459 | Left navigation with 6 award category links (178px wide) | Click: smooth scroll to section. Scroll spy: active state updates |
| Menu Item - Top Talent | 313:8460 | Sidebar nav item with leading icon indicator | Click → scroll to D.1, Hover → highlight, Active → gold text + underline + icon |
| Menu Item - Top Project | 313:8461 | Sidebar nav item | Click → scroll to D.2, Hover → highlight |
| Menu Item - Top Project Leader | 313:8462 | Sidebar nav item | Click → scroll to D.3, Hover → highlight |
| Menu Item - Best Manager | 313:8463 | Sidebar nav item | Click → scroll to D.4, Hover → highlight |
| Menu Item - Signature 2025 | 313:8464 | Sidebar nav item | Click → scroll to D.5, Hover → highlight |
| Menu Item - MVP | 313:8465 | Sidebar nav item | Click → scroll to D.6, Hover → highlight |
| Award Card - Top Talent | 313:8467 | Image + content card (856x631px), picture-left layout. Title has decorative icon/bullet prefix. | Display only |
| Award Card - Top Project | 313:8468 | Image + content card (856x679px), picture-right layout | Display only |
| Award Card - Top Project Leader | 313:8469 | Image + content card (856x679px), picture-left layout | Display only |
| Award Card - Best Manager | 313:8470 | Image + content card (856x667px), picture-right layout | Display only |
| Award Card - Signature 2025 | 313:8471 | Image + content card (856x1047px), picture-left layout, dual prize values | Display only |
| Award Card - MVP | 313:8510 | Image + content card (856x730px), picture-right layout | Display only |
| SunKudos Promo Card | 335:12023 | Promotional block (1152x500px) with title, description, illustration, CTA | Click "Chi tiết" → navigate to Kudos page |
| CTA Button "Chi tiết" | I335:12023;313:8426 | Gold button (127x56px) | Click → navigate, Hover → elevation effect |

### Navigation Flow

- **From**: Homepage, Header "Award Information" link, Footer "Award Information" link
- **To**: Sun* Kudos page (via "Chi tiết" CTA), other pages via header/footer nav
- **Internal**: Sidebar menu items smooth-scroll to corresponding award card sections

### Visual Requirements

- **Responsive breakpoints**: Mobile (<640px), Tablet (640-1023px), Desktop (>=1024px) — per Constitution
- **Key visual effects**: Glassmorphism (backdrop-blur) on award content panels, golden glow shadow on award images
- **Alternating layout**: Odd cards (1,3,5) = picture-left, Even cards (2,4,6) = picture-right
- **Sticky header**: Header is fixed at top of viewport with semi-transparent background
- **Sticky sidebar**: Menu follows viewport scroll within the award section bounds (stops before SunKudos section)
- **Scroll spy**: Active sidebar item updates based on viewport intersection
- **Signature 2025 dual values**: The Signature 2025 - Creator card has two prize values separated by an "Hoặc" (Or) divider line with text between them

> **See `design-style.md` for complete visual specifications including colors, typography, spacing, and component dimensions.**

### Accessibility Requirements

- **Landmarks**: Page MUST use semantic HTML5 landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`)
- **Sidebar nav**: MUST be wrapped in a `<nav>` element with `aria-label="Danh mục giải thưởng"` (Award categories)
- **Active state**: Active sidebar item MUST have `aria-current="true"` attribute
- **Award sections**: Each award card section MUST have an `id` attribute matching the sidebar anchor (e.g., `id="top-talent"`)
- **Focus indicators**: All interactive elements MUST have a visible focus indicator (gold outline, 2px, offset 2px)
- **Skip navigation**: Page SHOULD include a skip-to-content link that jumps past header to the main content area
- **Images**: All award images MUST have descriptive `alt` text (e.g., `alt="Top Talent award badge"`)
- **Reduced motion**: Smooth-scroll behavior MUST respect `prefers-reduced-motion: reduce` media query
- **Color contrast**: All text MUST meet WCAG AA contrast ratio (>=4.5:1 for normal text, >=3:1 for large text). Gold #FFEA9E on dark #00101A = ~13:1 (passes AAA)
- **Keyboard**: All interactive elements (sidebar items, CTA button, nav links) MUST be operable via keyboard (Tab, Enter, Space)

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display all 6 award categories (Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP) with their complete information.
- **FR-002**: System MUST provide a sticky sidebar navigation that lists all award categories and enables smooth-scroll navigation to each section.
- **FR-003**: System MUST implement scroll-spy behavior to highlight the active sidebar menu item based on the currently visible award section.
- **FR-004**: System MUST display the Sun* Kudos promotional card with a functional "Chi tiết" CTA button that navigates to the Kudos detail page.
- **FR-005**: System MUST display the hero keyvisual banner with the "ROOT FURTHER" artwork at the top of the page.
- **FR-006**: System MUST render award cards with alternating layouts (odd: picture-left, even: picture-right).
- **FR-007**: System MUST support URL hash-based deep linking to specific award sections (e.g., `#top-talent`).
- **FR-008**: System MUST display a fixed/sticky header at the top of the viewport with semi-transparent background.
- **FR-009**: The Signature 2025 - Creator award card MUST display dual prize values separated by an "Hoặc" (Or) divider, distinguishing individual (5.000.000 VNĐ) and team (8.000.000 VNĐ) prizes.

### Technical Requirements

- **TR-001**: Page MUST achieve Lighthouse Performance score >= 90. Images must use `next/image` for optimization.
- **TR-002**: Award data (names, descriptions, counts, values) SHOULD be externalized (e.g., JSON/CMS) rather than hardcoded, to support future updates without code changes.
- **TR-003**: Page MUST be rendered as a React Server Component (RSC) by default — no client-side data fetching needed for static content.
- **TR-004**: Sidebar scroll-spy and smooth-scroll behavior MUST use a `"use client"` component with `IntersectionObserver` API.
- **TR-005**: All images MUST have descriptive `alt` attributes for accessibility.
- **TR-006**: Page MUST support all constitution-defined breakpoints (mobile-first approach with sm/md/lg/xl Tailwind breakpoints).

### Key Entities *(data structure)*

- **AwardCategory**: Represents a single award type
  - `id`: string (slug, e.g., "top-talent")
  - `title`: string (e.g., "Top Talent")
  - `description`: string (paragraph text)
  - `image`: string (image URL/path)
  - `prizeCount`: number (e.g., 10)
  - `prizeUnit`: string (e.g., "Đơn vị", "Cá nhân", "Tập thể")
  - `prizeValues`: Array<{ amount: string, label: string }> (e.g., [{ amount: "7.000.000 VNĐ", label: "cho mỗi giải thưởng" }])
  - `order`: number (display order)

### State Management

| State | Type | Description |
|---|---|---|
| `activeSectionId` | Local (client) | Currently visible award section ID, tracked via IntersectionObserver. Updates sidebar active state and URL hash. |
| `scrollTarget` | Local (client) | Target section ID when user clicks a sidebar item. Cleared after scroll completes. |
| Award data | Server (static) | Award categories array. Loaded at build time or via RSC — no client-side fetching. |
| URL hash | Browser | Reflects the active award section (e.g., `#top-talent`). Synced bidirectionally with `activeSectionId`. |

**Loading states**: Not applicable — page content is static and rendered server-side. No loading spinners needed.

**Error states**: Image load errors should trigger a CSS fallback (see Edge Cases). No API error handling needed if data is static.

### Award Categories Data

| # | Award | Count | Unit | Prize Value | Note |
|---|---|---|---|---|---|
| 1 | Top Talent | 10 | Đơn vị | 7.000.000 VNĐ | cho mỗi giải thưởng |
| 2 | Top Project | 02 | Tập thể | 15.000.000 VNĐ | cho mỗi giải thưởng |
| 3 | Top Project Leader | 03 | Cá nhân | 7.000.000 VNĐ | cho mỗi giải thưởng |
| 4 | Best Manager | 01 | Cá nhân | 10.000.000 VNĐ | - |
| 5 | Signature 2025 - Creator | 01 | Cá nhân hoặc Tập thể | 5.000.000 VNĐ (cá nhân) / 8.000.000 VNĐ (tập thể) | Dual prize values |
| 6 | MVP (Most Valuable Person) | 01 | Cá nhân | 15.000.000 VNĐ | - |

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|---|---|---|---|
| /api/awards | GET | Fetch award categories with descriptions and prize info | Predicted (may be static data) |
| /api/awards/[id] | GET | Fetch single award category detail | Predicted |
| /api/media/[id] | GET | Serve award images | Predicted (may use static assets) |

> **Note**: This page may not require API endpoints if all award data is static/hardcoded or sourced from a CMS at build time. Server-side rendering with static data is the recommended approach per the constitution (RSC by default).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 6 award categories are displayed correctly with accurate prize counts and values matching the Figma design.
- **SC-002**: Sidebar navigation smooth-scrolls to the correct section within 300ms, and scroll-spy correctly identifies the active section.
- **SC-003**: Page achieves Lighthouse Performance >= 90, Accessibility >= 90 on desktop.
- **SC-004**: Page is fully functional and readable across all breakpoints (mobile, tablet, desktop).
- **SC-005**: "Chi tiết" CTA button correctly navigates to the Sun* Kudos page.
- **SC-006**: All images load with proper optimization (next/image), alt text, and golden glow visual effect.

---

## Out of Scope

- Award voting or nomination functionality (this is a display-only page)
- User authentication or personalization on this page
- Award submission forms or data entry
- Real-time updates or live data feeds
- Award winner announcements (separate feature/page)
- Admin management of award categories
- Multi-language content (i18n) for award descriptions — **now IN SCOPE** (see plan.md i18n Strategy)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`) — may not be needed for static content
- [ ] Database design completed (`.momorph/database.sql`) — may not be needed for static content
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)
- [x] Design style documented (`.momorph/specs/zFYDgyj_pD-he-thong-giai/design-style.md`)
- [ ] Shared Header component implemented
- [ ] Shared Footer component implemented

---

## Notes

- The page is designed at **1440px fixed width** — must be made responsive per constitution requirements (mobile-first).
- All typography uses **Montserrat** font (weight 700 bold) — ensure this is loaded via Google Fonts.
- The decorative "KUDOS" text uses **SVN-Gotham** — this is a local/custom font that needs to be included in the project.
- Award cards use a visually striking **glassmorphism effect** (backdrop-filter: blur(32px)) — ensure browser compatibility or provide a fallback for unsupported browsers.
- The **golden glow shadow** on award images uses `mix-blend-mode: screen` — this works best on dark backgrounds.
- Award card layout **alternates** between picture-left (odd: 1,3,5) and picture-right (even: 2,4,6) — implement with a conditional flex-direction or order swap.
- The sidebar menu should be **sticky** within the award section and use **IntersectionObserver** for scroll-spy behavior.
- Frame image reference: ![Hệ thống giải](https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/313:8436/bd17cac24871c9513f259333a5431530.png)
