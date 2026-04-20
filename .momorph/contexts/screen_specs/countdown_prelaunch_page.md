# Screen: Countdown - Prelaunch page

## Screen Info

| Property | Value |
|----------|-------|
| **Figma Frame ID** | 2268:35127 |
| **Screen ID** | 8PJQswPZmU |
| **Figma Link** | [MoMorph](https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/8PJQswPZmU) |
| **Image** | [Preview](https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/2268:35127/488626317569a3c31c7bd5caf890174c.png) |
| **Screen Group** | Main Application |
| **Status** | discovered |
| **Discovered At** | 2026-04-17 |
| **Last Updated** | 2026-04-17 |

---

## Description

A full-screen pre-launch countdown page for the Sun*Kudos Awards event. This screen is displayed before the awards ceremony or campaign officially begins, building anticipation with a visually impactful countdown timer. The page features a large background image with a dark overlay, and a centered countdown timer displaying remaining time in Days, Hours, and Minutes using an LED-style digit display. A title/heading ("Awards Information Navigation Links" text node) is shown above the timer. The screen has no interactive elements -- it serves as a landing/waiting page until the event launches, at which point users are redirected to the main application (Homepage SAA).

---

## Navigation Analysis

### Incoming Navigations (From)

| Source Screen | Trigger | Condition |
|---------------|---------|-----------|
| Direct URL / App launch | Direct navigation or redirect | Event has not started yet (pre-launch state) |
| Login | Auto-redirect after authentication | User is authenticated but event has not started |
| Homepage SAA | Redirect | If campaign/event reverts to pre-launch state |

### Outgoing Navigations (To)

| Target Screen | Trigger Element | Node ID | Confidence | Notes |
|---------------|-----------------|---------|------------|-------|
| Homepage SAA | Automatic redirect (countdown reaches 0) | - | medium | When countdown expires, auto-redirect to main application. No visible button/link for this transition. |
| Login | - | - | low | If user session expires during countdown, may redirect to login. Inferred from auth flow pattern. |

### Navigation Rules
- **Back behavior**: No back navigation -- this is a standalone landing page
- **Deep link support**: Yes - `/countdown` or `/prelaunch` (direct URL access)
- **Auth required**: Likely Yes -- only authenticated users see the countdown; unauthenticated users go to Login

---

## Component Schema

### Layout Structure

```
┌─────────────────────────────────────────────┐
│        MM_MEDIA_BG Image (full-screen)       │
│  ┌─────────────────────────────────────────┐ │
│  │          Cover (dark overlay)            │ │
│  │  ┌───────────────────────────────────┐  │ │
│  │  │            Bia (Banner)            │  │ │
│  │  │                                    │  │ │
│  │  │   [Title / Awards Info Text]       │  │ │
│  │  │                                    │  │ │
│  │  │   ┌──────┐  ┌──────┐  ┌──────┐   │  │ │
│  │  │   │  22  │  │  22  │  │  22  │   │  │ │
│  │  │   │ DAYS │  │HOURS │  │ MIN  │   │  │ │
│  │  │   └──────┘  └──────┘  └──────┘   │  │ │
│  │  │                                    │  │ │
│  │  └───────────────────────────────────┘  │ │
│  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### Component Hierarchy

```
Countdown - Prelaunch page (FRAME)
├── MM_MEDIA_BG Image (RECTANGLE) - Full-screen background image
├── Cover (RECTANGLE) - Dark overlay / gradient cover
└── Bia (FRAME) - Banner / content container
    └── Frame 487 (FRAME) - Inner content wrapper
        └── Frame 523 (FRAME) - Countdown section wrapper
            └── Countdown time (FRAME) - Countdown timer container
                ├── Awards Information Navigation Links (TEXT) - Title/heading text
                └── Time (FRAME) - Timer display container
                    ├── 1_Days (FRAME) - Days countdown unit
                    │   ├── Frame 485 (FRAME) - Digit container
                    │   │   ├── Group 5 (INSTANCE) - First digit box
                    │   │   │   ├── Rectangle 1 (RECTANGLE) - Digit background
                    │   │   │   └── 2 (TEXT) - Digit value
                    │   │   └── Group 4 (INSTANCE) - Second digit box
                    │   │       ├── Rectangle 1 (RECTANGLE) - Digit background
                    │   │       └── 2 (TEXT) - Digit value
                    │   └── DAYS (TEXT) - Unit label
                    ├── 2_Hours (FRAME) - Hours countdown unit
                    │   ├── Frame 485 (FRAME) - Digit container
                    │   │   ├── Group 5 (INSTANCE) - First digit box
                    │   │   │   ├── Rectangle 1 (RECTANGLE) - Digit background
                    │   │   │   └── 2 (TEXT) - Digit value
                    │   │   └── Group 4 (INSTANCE) - Second digit box
                    │   │       ├── Rectangle 1 (RECTANGLE) - Digit background
                    │   │       └── 2 (TEXT) - Digit value
                    │   └── HOURS (TEXT) - Unit label
                    └── 3_Minutes (FRAME) - Minutes countdown unit
                        ├── Frame 485 (FRAME) - Digit container
                        │   ├── Group 5 (INSTANCE) - First digit box
                        │   │   ├── Rectangle 1 (RECTANGLE) - Digit background
                        │   │   └── 2 (TEXT) - Digit value
                        │   └── Group 4 (INSTANCE) - Second digit box
                        │       ├── Rectangle 1 (RECTANGLE) - Digit background
                        │       └── 2 (TEXT) - Digit value
                        └── MINUTES (TEXT) - Unit label
```

### Main Components

| Component | Type | Node ID | Description | Reusable |
|-----------|------|---------|-------------|----------|
| MM_MEDIA_BG Image | Atom | 2268:35129 | Full-screen background image for the prelaunch page | No |
| Cover | Atom | 2268:35130 | Dark overlay on top of background image | No |
| Bia (Banner) | Organism | 2268:35131 | Main content banner containing countdown timer | No |
| Countdown time | Organism | 2268:35136 | Complete countdown timer with title and time units | No |
| Awards Information Navigation Links | Atom | 2268:35137 | Title/heading text above the countdown | No |
| Time | Molecule | 2268:35138 | Container for all three time unit blocks | No |
| 1_Days | Molecule | 2268:35139 | Days countdown unit (2 LED digits + label) | Yes |
| 2_Hours | Molecule | 2268:35144 | Hours countdown unit (2 LED digits + label) | Yes |
| 3_Minutes | Molecule | 2268:35149 | Minutes countdown unit (2 LED digits + label) | Yes |
| Digit Box (Group 5/Group 4) | Atom | Instance | Individual LED-style digit display box | Yes |

---

## Form Fields (If Applicable)

N/A - This is a display-only countdown page with no user input.

---

## API Mapping

### On Screen Load

| API | Method | Purpose | Response Usage |
|-----|--------|---------|----------------|
| /prelaunch | GET | Fetch prelaunch/countdown target datetime and event info | Set countdown target time, display event title |
| /prelaunch/status | GET | Check if event has launched | If launched, redirect to Homepage SAA |

### On User Action

| Action | API | Method | Request Body | Response |
|--------|-----|--------|--------------|----------|
| Countdown reaches 0 | /prelaunch/status | GET | - | `{ launched: true }` - redirect to Homepage SAA |
| Page refresh / polling | /prelaunch | GET | - | Updated countdown target, event status |

### Error Handling

| Error Code | Message | UI Action |
|------------|---------|-----------|
| 401 | Session expired | Redirect to Login page |
| 404 | No prelaunch event | Redirect to Homepage SAA (event may have already launched) |
| 500 | Server error | Show error state, retry fetching countdown data |
| Network error | Connection failed | Keep displaying last known countdown, retry in background |

---

## State Management

### Local State

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| targetDate | Date/string | null | Target datetime for the countdown (from API) |
| days | number | 0 | Remaining days to display |
| hours | number | 0 | Remaining hours to display (0-23) |
| minutes | number | 0 | Remaining minutes to display (0-59) |
| isLoading | boolean | true | Loading state while fetching prelaunch data |
| hasLaunched | boolean | false | Whether the event has launched (countdown reached 0) |

### Global State (If Applicable)

| State | Store | Read/Write | Purpose |
|-------|-------|------------|---------|
| user | authStore | Read | Check if user is authenticated |
| token | authStore | Read | Auth token for API calls |
| eventStatus | appStore | Write | Store event launch status for other screens |

---

## UI States

### Loading State
- Show skeleton or placeholder for countdown digits while fetching target date
- Background image may load progressively

### Error State
- If API fails, show fallback countdown or "Coming Soon" message
- Retry button or automatic retry mechanism

### Success State
- Countdown timer running with real-time updates every second (client-side interval)
- LED-style digits animate/update as time decreases
- When countdown reaches 00:00:00, trigger redirect to Homepage SAA

### Empty State
- If no prelaunch event is configured, redirect to Homepage SAA
- Display "00" in all digit boxes if countdown data is unavailable

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Focus management | N/A - no interactive elements on page |
| Keyboard navigation | N/A - display-only page |
| Screen reader | ARIA live region for countdown updates, announce time periodically (not every second) |
| Error announcement | Live region for any error messages |
| Color contrast | White text on dark background overlay (WCAG AA compliant) |

---

## Responsive Behavior

| Breakpoint | Layout Changes |
|------------|----------------|
| Mobile (<768px) | Countdown digits scale down, stacked vertically if needed, smaller font sizes |
| Tablet (768-1024px) | Centered layout, medium digit sizes |
| Desktop (>1024px) | Full-screen background, large LED-style digits horizontally aligned |

---

## Analytics Events (Optional)

| Event | Trigger | Properties |
|-------|---------|------------|
| prelaunch_view | On page mount | `{ event_id, remaining_time }` |
| prelaunch_countdown_complete | Countdown reaches 0 | `{ event_id, user_id }` |
| prelaunch_redirect | Auto-redirect to Homepage | `{ event_id, destination }` |

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| --prelaunch-bg-overlay | rgba(0,0,0,0.5-0.7) | Dark overlay on background image |
| --countdown-digit-bg | Dark/black with border | LED-style digit box background |
| --countdown-digit-text | White (#FFF) | Digit number color |
| --countdown-label-text | White (#FFF) | Unit label text color (DAYS, HOURS, MINUTES) |
| --countdown-label-font | Uppercase, bold | Font style for unit labels |
| --countdown-digit-size | Large (responsive) | Font size for countdown numbers |
| --countdown-spacing | 16-24px | Gap between countdown units |

---

## Implementation Notes

### Dependencies
- Client-side timer (setInterval or requestAnimationFrame) for countdown
- Date/time utility library (date-fns or dayjs) for time calculations
- Image optimization for background (next/image or similar)
- Router for auto-redirect when countdown completes

### Special Considerations
- The countdown timer uses LED-style digit boxes (Group 5 / Group 4 instances) -- each digit is displayed in its own box, creating a flip-clock or digital display aesthetic
- Each time unit (Days, Hours, Minutes) has exactly 2 digit boxes for two-digit display (e.g., "22", "09", "00")
- The countdown should update every second on the client side, but may poll the server periodically (every 30-60s) to sync
- The background image (`MM_MEDIA_BG Image`) is a full-screen visual tied to the specific awards event/campaign
- The `Cover` layer provides a dark semi-transparent overlay to ensure text readability
- When the countdown reaches zero, the page should auto-redirect to Homepage SAA without user interaction
- The page should handle edge cases: negative time (event already started), very long countdowns, timezone differences
- No Seconds unit is displayed in the design -- only Days, Hours, Minutes
- The title text node is named "Awards Information Navigation Links" which suggests it displays award/event information, not actual navigation links
- The page has no header, footer, or navigation -- it is a full-screen standalone experience
- Consider adding a subtle animation (pulse, glow) to countdown digits for visual engagement

---

## Analysis Metadata

| Property | Value |
|----------|-------|
| Analyzed By | Screen Flow Discovery |
| Analysis Date | 2026-04-17 |
| Needs Deep Analysis | No |
| Confidence Score | High |

### Next Steps
- [ ] Get detailed design items via list_frame_design_items
- [ ] Extract styles via list_frame_styles
- [ ] Confirm background image asset and overlay opacity
- [ ] Define API contract for /prelaunch endpoint with backend team
- [ ] Determine event launch trigger logic (server-side vs client-side)
- [ ] Clarify if the page should also display event name/description beyond the countdown
- [ ] Verify timezone handling for countdown calculation
