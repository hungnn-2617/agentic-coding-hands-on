# Feature Specification: Countdown - Prelaunch Page

**Frame ID**: `2268:35127`
**Screen ID**: `8PJQswPZmU`
**Frame Name**: `Countdown - Prelaunch page`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-17
**Status**: Draft

---

## Overview

The **Countdown - Prelaunch Page** is a full-screen landing page displayed before an event starts. It features a real-time countdown timer showing the remaining time (Days, Hours, Minutes) until the event begins. The page uses a dramatic dark background with an artistic colorful wave image and a glassmorphism-styled countdown timer with LED-style digital numbers.

The Vietnamese title "Sự kiện sẽ bắt đầu sau" translates to "The event will start in", indicating this is a pre-event holding page for Vietnamese-speaking users.

**Target Users**: All visitors to the platform before the event launch date.

**Business Context**: This page serves as a teaser/anticipation builder that keeps visitors engaged and informed about when the event will become available.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Event Countdown (Priority: P1)

A visitor lands on the platform before the event has started. They see a visually engaging countdown timer that clearly shows how much time remains until the event begins, giving them a reason to return.

**Why this priority**: This is the core and only purpose of the page. Without the countdown, the page has no function.

**Independent Test**: Navigate to the prelaunch page and verify the countdown timer is displayed with correct remaining time in Days, Hours, and Minutes.

**Acceptance Scenarios**:

1. **Given** the event start date is in the future, **When** a user visits the prelaunch page, **Then** the countdown timer displays the correct remaining Days, Hours, and Minutes until the event start.
2. **Given** the countdown is active, **When** one minute passes, **Then** the Minutes value decreases by 1 and the display updates in real-time without page refresh.
3. **Given** the Minutes value is "00" and Hours > 0, **When** one more minute passes, **Then** Minutes resets to "59" and Hours decreases by 1.
4. **Given** the Hours value is "00" and Days > 0, **When** one more hour passes, **Then** Hours resets to "23" and Days decreases by 1.

---

### User Story 2 - Countdown Reaches Zero (Priority: P1)

When the countdown timer reaches 00 Days, 00 Hours, 00 Minutes, the user is redirected to the main event page or the page transitions to the active event state.

**Why this priority**: The transition from prelaunch to active event is critical for user experience — users must not be stuck on a "00:00:00" page.

**Independent Test**: Set the event start date to a time in the near past and verify the page redirects or transitions.

**Acceptance Scenarios**:

1. **Given** the countdown reaches 00 Days, 00 Hours, 00 Minutes, **When** the timer expires, **Then** the user is automatically redirected to the main event page.
2. **Given** the event start date is in the past, **When** a user visits the prelaunch page directly, **Then** they are immediately redirected to the main event page (no countdown shown).

---

### User Story 3 - Responsive Countdown Display (Priority: P2)

The countdown page is accessible and readable on all devices — mobile phones, tablets, and desktop screens — maintaining visual integrity across breakpoints.

**Why this priority**: Users may visit from any device. The countdown must be legible and aesthetically pleasing on all screen sizes.

**Independent Test**: Resize the browser from 320px to 1512px and verify the countdown remains centered, readable, and visually correct at each breakpoint.

**Acceptance Scenarios**:

1. **Given** a user visits on a mobile device (< 640px), **When** the page loads, **Then** the countdown timer is scaled appropriately with smaller digit cards and font sizes, remaining centered and readable.
2. **Given** a user visits on a tablet (640px - 1023px), **When** the page loads, **Then** the countdown timer uses medium-sized digit cards and remains centered.
3. **Given** a user visits on a desktop (>= 1024px), **When** the page loads, **Then** the countdown timer matches the Figma design exactly.

---

### User Story 4 - Internationalization Support (Priority: P3)

The countdown page displays the title text in the user's selected language (Vietnamese by default, with support for other languages as configured).

**Why this priority**: The application supports multiple languages. The title "Sự kiện sẽ bắt đầu sau" should be translatable.

**Independent Test**: Switch the language setting and verify the title text updates.

**Acceptance Scenarios**:

1. **Given** the user's language is set to Vietnamese, **When** the page loads, **Then** the title displays "Sự kiện sẽ bắt đầu sau".
2. **Given** the user's language is set to English, **When** the page loads, **Then** the title displays the English equivalent (e.g., "The event will start in").
3. **Given** any language, **When** the page loads, **Then** the unit labels (DAYS, HOURS, MINUTES) display in the selected language.

---

### Edge Cases

- What happens when the user's system clock is significantly different from the server time? The countdown should rely on server-provided event start time, not client-local time.
- How does the system handle if the event start date is not configured? Redirect to Homepage SAA or display a "Coming Soon" fallback message.
- What if the user has JavaScript disabled? The page should show a static message with the event start date/time as a graceful degradation.
- What happens at exactly midnight rollover (e.g., 1 day 0 hours 0 minutes -> 0 days 23 hours 59 minutes)?
- What happens if the network fails while the countdown is running? Keep displaying the last known countdown values and retry fetching in the background.
- What happens if the user's session (auth token) expires during the countdown? Redirect to Login page.
- What happens for very long countdowns (e.g., > 99 days)? Two digit cards can only display 00-99 for days.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Background Image | Full-screen artistic colorful wave pattern | Static display |
| Gradient Overlay | Dark gradient from bottom-left to transparent top-right | Static display |
| Title Text | "Sự kiện sẽ bắt đầu sau" — event countdown heading | Static display (translatable) |
| Days Counter | Two glassmorphism digit cards + "DAYS" label | Real-time countdown update |
| Hours Counter | Two glassmorphism digit cards + "HOURS" label | Real-time countdown update |
| Minutes Counter | Two glassmorphism digit cards + "MINUTES" label | Real-time countdown update |
| Digit Card | Frosted glass card with gold border, LED-style number | Flip/transition animation on value change |

> **Visual specifications**: See [design-style.md](./design-style.md) for complete design tokens, component styles, and layout details.

### Navigation Flow

- **From**:
  - Direct URL access (`/countdown` or `/prelaunch`) when event has not started
  - Login page — auto-redirect after authentication when event is in prelaunch state
  - Homepage SAA — redirect if campaign/event reverts to prelaunch state
- **To**:
  - Homepage SAA — automatic redirect when countdown reaches zero
  - Login page — if user session expires during countdown
- **Triggers**: Automatic redirect on countdown expiry; server-side redirect if event already active
- **Back behavior**: None — this is a standalone full-screen landing page with no header, footer, or navigation
- **Deep link support**: Yes — `/countdown` or `/prelaunch`
- **Auth required**: Yes — only authenticated users see the countdown; unauthenticated users are redirected to Login

### Visual Requirements

- **Responsive breakpoints**: Mobile (< 640px), Tablet (640px - 1023px), Desktop (>= 1024px)
- **Animations/Transitions**: Digit flip/fade animation when countdown values change
- **Accessibility**: WCAG AA compliance — white text on dark background exceeds 4.5:1 contrast ratio; semantic HTML with proper heading structure; `aria-live` region for countdown updates
- **Fonts required**: Montserrat (Google Fonts), Digital Numbers (LED display font)

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a countdown timer showing remaining Days, Hours, and Minutes until the configured event start date/time.
- **FR-002**: System MUST recalculate the countdown every second on the client side (using `setInterval` or `requestAnimationFrame`) to ensure accurate minute-rollover detection. The visible display (Days, Hours, Minutes) updates whenever any unit value changes — no seconds digit is shown (see Out of Scope).
- **FR-003**: System MUST display each time unit (Days, Hours, Minutes) as two separate digit cards (tens and ones place).
- **FR-004**: Days counter MUST display "00" when less than 1 day remains.
- **FR-005**: Hours counter MUST display values in range 00-23.
- **FR-006**: Minutes counter MUST display values in range 00-59.
- **FR-007**: System MUST redirect users to the main event page when the countdown reaches zero.
- **FR-008**: System MUST redirect users who visit the prelaunch page after the event has started to the main event page.
- **FR-009**: System MUST display the title text in the user's selected language.
- **FR-010**: System MUST display the unit labels (DAYS, HOURS, MINUTES) in the user's selected language.

### Technical Requirements

- **TR-001**: Countdown calculation MUST use server-provided `server_time` and `event_start_date` to compute the clock offset (`server_time - Date.now()`), then apply that offset on every tick. This prevents client clock-drift from skewing the displayed countdown.
- **TR-002**: The page MUST be a Server Component with a client-side countdown hook for real-time updates.
- **TR-003**: Background image MUST use `next/image` for automatic optimization.
- **TR-004**: The page MUST load within 3 seconds on a 3G connection (critical rendering path optimized).
- **TR-005**: The "Digital Numbers" font MUST be loaded efficiently (preload or font-display: swap) to avoid FOUT.
- **TR-006**: The glassmorphism effect (backdrop-filter) MUST have a CSS fallback for browsers that do not support it.
- **TR-007**: The page MUST require authentication. Unauthenticated users MUST be redirected to the Login page.
- **TR-008**: The client MUST periodically poll `GET /prelaunch/status` (every 30-60s) to sync countdown and detect launch status changes from the server.

### Key Entities *(if feature involves data)*

- **Event Configuration**: Contains `event_start_date` (timestamp), `event_name` (string — used for page metadata/SEO title and analytics, not displayed in UI), `event_status` (enum: prelaunch | active | ended)

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| /prelaunch | GET | Fetch countdown target datetime and event info | Predicted (New) |
| /prelaunch/status | GET | Check if event has launched (redirect trigger) | Predicted (New) |

**Predicted Response Schemas**:

`GET /prelaunch`:
```json
{
  "event_start_date": "2026-05-01T09:00:00Z",
  "server_time": "2026-04-20T10:00:00Z",
  "event_status": "prelaunch",
  "event_name": "SSA 2025 EX"
}
```

`GET /prelaunch/status`:
```json
{
  "launched": false
}
```

### Error Handling

| Error Code | Message | UI Action |
|------------|---------|-----------|
| 401 | Session expired | Redirect to Login page |
| 404 | No prelaunch event | Redirect to Homepage SAA (event may have already launched) |
| 500 | Server error | Show error state with retry mechanism |
| Network error | Connection failed | Keep displaying last known countdown, retry in background |

---

## State Management

### Local Component State

| State | Type | Default | Purpose |
|-------|------|---------|---------|
| targetDate | Date / string | null | Target datetime for countdown (from API) |
| days | number | 0 | Remaining days to display |
| hours | number | 0 | Remaining hours to display (0-23) |
| minutes | number | 0 | Remaining minutes to display (0-59) |
| isLoading | boolean | true | Loading state while fetching prelaunch data |
| hasLaunched | boolean | false | Whether the event has launched (countdown reached 0) |
| hasError | boolean | false | Whether API fetch failed |

### Global State

| State | Store | Read/Write | Purpose |
|-------|-------|------------|---------|
| user | authStore | Read | Check if user is authenticated |
| token | authStore | Read | Auth token for API calls |
| eventStatus | appStore | Write | Store event launch status for other screens to consume |

### Server State

| Data | Source | Cache Strategy |
|------|--------|---------------|
| Event start date | GET /prelaunch | Revalidate every 60s (ISR) |
| Event launch status | GET /prelaunch/status | Poll every 30-60s client-side to sync |

### UI States

| State | Behavior |
|-------|----------|
| **Loading** | Show skeleton/placeholder for countdown digits while fetching target date. Background image may load progressively. |
| **Success** | Countdown timer running with real-time client-side updates every second. LED-style digits animate on value change. |
| **Error** | If API fails, show "Coming Soon" fallback message. Retry with exponential backoff: 5s → 10s → 20s → 40s, max 4 retries, then stay on fallback until user refreshes or the next poll cycle from TR-008 succeeds. |
| **Empty** | If no prelaunch event is configured, redirect to Homepage SAA. Display "00" in all digit boxes if countdown data is unavailable. |
| **Expired** | Countdown reached 00:00:00 — trigger auto-redirect to Homepage SAA. |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Countdown timer displays correct remaining time (within 1-second accuracy of server time).
- **SC-002**: Page loads and displays countdown within 3 seconds on desktop, 5 seconds on mobile 3G.
- **SC-003**: Users are redirected to Homepage SAA within 5 seconds of countdown expiry.
- **SC-004**: Page renders correctly on all target breakpoints (Mobile, Tablet, Desktop) with no horizontal scrolling.
- **SC-005**: Lighthouse performance score >= 90 for the prelaunch page.
- **SC-006**: Unauthenticated users are redirected to Login page; authenticated users with expired event are redirected to Homepage SAA.

---

## Out of Scope

- Seconds display in the countdown (design only shows Days, Hours, Minutes)
- Email notification or "Remind Me" functionality
- Social sharing buttons
- Event registration from the prelaunch page
- Admin interface for configuring the event start date (assumed to be set via Supabase/backend)

---

## Analytics Events

| Event | Trigger | Properties |
|-------|---------|------------|
| `prelaunch_view` | On page mount | `{ event_id, remaining_time }` |
| `prelaunch_countdown_complete` | Countdown reaches zero | `{ event_id, user_id }` |
| `prelaunch_redirect` | Auto-redirect to Homepage SAA | `{ event_id, destination }` |

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/contexts/SCREENFLOW.md`)
- [ ] Background image asset exported from Figma or provided by design team (artistic abstract wave pattern)
- [ ] "Digital Numbers" LED display font sourced and self-hosted (not available on Google Fonts — may need a font like DS-Digital or Digital-7)

---

## Notes

- The design uses Vietnamese as the primary language ("Sự kiện sẽ bắt đầu sau"). The i18n system should provide translations for the title and unit labels.
- The "Digital Numbers" font is a specialized font that mimics LED/flip clock displays. It needs to be sourced and included in the project (not available on Google Fonts by default — may need self-hosting).
- The glassmorphism digit cards use `backdrop-filter: blur()` which has good browser support but should include a fallback for older browsers.
- The background image is an artistic abstract wave pattern — the actual image asset needs to be exported from Figma or provided by the design team.
- The gradient overlay angle (18deg) creates a subtle directional darkening effect from the bottom-left corner, ensuring text readability.
