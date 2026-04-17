# Screen: Dropdown-profile (Profile Dropdown Menu)

## Screen Info

| Property | Value |
|----------|-------|
| **Figma Frame ID** | 721:5223 |
| **Screen ID** | z4sCl3_Qtk |
| **Figma Link** | [MoMorph](https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/z4sCl3_Qtk) |
| **Image** | [Preview](https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/721:5223/066c677486f180df7d4a18abb3f8450a.png) |
| **Screen Group** | Overlays & Dropdowns |
| **Status** | discovered |
| **Discovered At** | 2026-04-17 |
| **Last Updated** | 2026-04-17 |

---

## Description

Profile dropdown menu that appears when the user clicks on their avatar or profile area in the application header. This compact dropdown provides two primary actions: navigating to the user's profile page ("Profile") and logging out of the application ("Logout"). It is a standard user account menu component used across all authenticated pages. The "Profile" item features a user icon with a glow/highlight effect, while the "Logout" item displays a right-arrow (chevron) icon indicating an exit action.

---

## Navigation Analysis

### Incoming Navigations (From)

| Source Screen | Trigger | Condition |
|---------------|---------|-----------|
| Homepage SAA | Click avatar/profile area in header | User is authenticated |
| Any screen with header | Click avatar/profile area in header | User is authenticated |
| D1_Sunkudos | Click avatar/profile area in header | User is authenticated |
| Sun* Kudos - Live board | Click avatar/profile area in header | User is authenticated |

### Outgoing Navigations (To)

| Target Screen | Trigger Element | Node ID | Confidence | Notes |
|---------------|-----------------|---------|------------|-------|
| Profile ban than | Click: "Profile" button | I666:9601;563:7844 | high | Clear label "Profile" with user icon, navigates to own profile page |
| Login | Click: "Logout" button | I666:9601;563:7868 | high | Clear label "Logout" with chevron right icon, performs logout then redirects to login |
| (Same screen - closes dropdown) | Click outside dropdown | - | high | Standard dropdown dismiss behavior |

### Navigation Rules
- **Back behavior**: Closes dropdown, returns to previous screen state
- **Deep link support**: No - this is an overlay component, not a routable page
- **Auth required**: Yes - only visible to authenticated users

---

## Component Schema

### Layout Structure

```
┌───────────────────────┐
│  A_Dropdown-List      │
│  ┌─────────────────┐  │
│  │ A.1_Profile     │  │  ← Profile option (glow/highlight bg)
│  │ [Text] [IC]     │  │     "Profile" + user icon
│  ├─────────────────┤  │
│  │ A.2_Logout      │  │  ← Logout option
│  │ [Text] [IC]     │  │     "Logout" + chevron right icon
│  └─────────────────┘  │
└───────────────────────┘
```

### Component Hierarchy

```
Dropdown-profile (FRAME)
└── A_Dropdown-List (INSTANCE) - Dropdown container menu
    ├── A.1_Profile (INSTANCE) - Profile navigation item
    │   ├── Frame 486 (FRAME) - Content layout
    │   │   └── Awards Information Navigation Links (TEXT) - "Profile" label
    │   └── IC (INSTANCE) - User icon (person silhouette)
    └── A.2_Logout (INSTANCE) - Logout action item
        ├── Frame 485 (FRAME) - Content layout
        │   └── Awards Information Navigation Links (TEXT) - "Logout" label
        └── IC (INSTANCE) - Chevron right icon (exit indicator)
```

### Main Components

| Component | Type | Node ID | Description | Reusable |
|-----------|------|---------|-------------|----------|
| A_Dropdown-List | Organism | 666:9601 | Dropdown container with profile/logout options | Yes |
| A.1_Profile | Molecule | I666:9601;563:7844 | Profile navigation item with user icon | Yes |
| A.2_Logout | Molecule | I666:9601;563:7868 | Logout action item with chevron icon | Yes |
| Frame 486 (Profile content) | Atom | I666:9601;563:7844;186:2012 | Layout frame for Profile label | No |
| Frame 485 (Logout content) | Atom | I666:9601;563:7868;186:1937 | Layout frame for Logout label | No |
| IC (User icon) | Atom | I666:9601;563:7844;186:1498 | Person/user silhouette icon | Yes |
| IC (Chevron icon) | Atom | I666:9601;563:7868;186:1441 | Right-pointing chevron/arrow icon | Yes |
| Profile Label | Atom | I666:9601;563:7844;186:2012;186:1497 | Text "Profile" | No |
| Logout Label | Atom | I666:9601;563:7868;186:1937;186:1439 | Text "Logout" | No |

---

## Form Fields (If Applicable)

N/A - This is a navigation/action dropdown menu, not a form.

---

## API Mapping

### On Screen Load

| API | Method | Purpose | Response Usage |
|-----|--------|---------|----------------|
| /users/me | GET | Get current user info for profile display | May show user name/avatar in header trigger (not in dropdown itself) |

### On User Action

| Action | API | Method | Request Body | Response |
|--------|-----|--------|--------------|----------|
| Click Profile | - | - | Navigation only | Redirects to `/profile` or `/users/me` page |
| Click Logout | /auth/logout | POST | `{}` or session token | `{ success: true }` - clears session, redirects to Login |
| Click outside | - | - | No API call | Dropdown closes |

### Error Handling

| Error Code | Message | UI Action |
|------------|---------|-----------|
| 401 | Session expired | Redirect to login page |
| 500 | Server error on logout | Show toast error, allow retry |
| Network error | Connection failed | Show toast, keep dropdown open for retry |

---

## State Management

### Local State

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| isOpen | boolean | false | Controls dropdown visibility |
| isLoggingOut | boolean | false | Loading state during logout process |

### Global State (If Applicable)

| State | Store | Read/Write | Purpose |
|-------|-------|------------|---------|
| user | authStore | Read | Display user info in header trigger |
| token | authStore | Write (clear) | Clear JWT token on logout |
| isAuthenticated | authStore | Write (clear) | Set to false on logout |

---

## UI States

### Loading State
- Show spinner or disable "Logout" item during logout API call
- "Profile" navigation is instant (client-side routing)

### Error State
- Toast notification if logout fails
- Dropdown remains open for retry
- If session already expired, redirect to login

### Success State
- Click Profile: Dropdown closes, route changes to profile page
- Click Logout: Dropdown closes, session cleared, redirect to Login screen

### Empty State
- N/A - Always has exactly two items (Profile and Logout)

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Focus management | Focus first item (Profile) when dropdown opens |
| Keyboard navigation | Arrow keys to move between items, Enter to select, Escape to close |
| Screen reader | ARIA role="menu" on container, role="menuitem" on items |
| Error announcement | Live region for logout errors |
| Color contrast | White/light text on dark background (WCAG AA) |

---

## Responsive Behavior

| Breakpoint | Layout Changes |
|------------|----------------|
| Mobile (<768px) | Same component, positioned relative to header avatar |
| Tablet (768-1024px) | Same as desktop |
| Desktop (>1024px) | Fixed width ~119px, positioned below header avatar trigger |

---

## Analytics Events (Optional)

| Event | Trigger | Properties |
|-------|---------|------------|
| profile_dropdown_open | Dropdown opened | `{ user_id }` |
| profile_click | Profile item clicked | `{ user_id }` |
| logout_click | Logout item clicked | `{ user_id }` |
| logout_success | Logout API success | `{ user_id }` |
| logout_error | Logout API error | `{ user_id, error_code }` |

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| --dropdown-bg | Black (#000 approx) | Dropdown container background |
| --dropdown-bg-active | Dark gray with glow | Active/highlighted item background (Profile) |
| --dropdown-text | White (#FFF) | Menu item text color |
| --dropdown-item-height | 56px | Height of each menu item |
| --dropdown-item-width | 119px | Width of each menu item |
| --dropdown-border-radius | 8px | Corner radius of dropdown |
| --dropdown-icon-size | 24px | Icon dimensions |

---

## Implementation Notes

### Dependencies
- Dropdown/Popover component (Radix UI or custom)
- Auth service/store for logout functionality
- Router for profile navigation (Next.js App Router)
- Icon set for user and chevron icons

### Special Considerations
- The dropdown reuses the same `A_Dropdown-List` component pattern as the language dropdown
- Profile item features a "glow" visual effect on active/hover state (bright background with glow)
- Logout item uses a right chevron icon indicating an exit/departure action
- Each item is 119x56px in size
- The dropdown should close on any item click or click outside
- On logout, all client-side state (auth tokens, user data, caches) must be cleared
- Admin users may see a different variant (Dropdown-profile Admin) with additional options
- The component is positioned absolutely below the header avatar trigger element

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
- [ ] Confirm exact color tokens and glow effect from design system
- [ ] Verify logout API endpoint and token invalidation with backend team
- [ ] Determine relationship with Dropdown-profile Admin variant (54rekaCHG1)
