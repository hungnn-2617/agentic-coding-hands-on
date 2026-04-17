# Screen: Dropdown-ngon ngu (Language Dropdown)

## Screen Info

| Property | Value |
|----------|-------|
| **Figma Frame ID** | 721:4942 |
| **Screen ID** | hUyaaugye2 |
| **Figma Link** | [MoMorph](https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/hUyaaugye2) |
| **Image** | [Preview](https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/721:4942/33b849680cdef15298c122effb920fd4.png) |
| **Screen Group** | Overlays & Dropdowns |
| **Status** | discovered |
| **Discovered At** | 2026-04-17 |
| **Last Updated** | 2026-04-17 |

---

## Description

Language selector dropdown component that allows users to switch the application interface between Vietnamese (VN) and English (EN). This dropdown appears in the application header and provides a compact, flag-based language selection UI. When opened, it shows the currently selected language (highlighted) and the alternative language option. Selecting a language updates the entire application interface and closes the dropdown.

---

## Navigation Analysis

### Incoming Navigations (From)

| Source Screen | Trigger | Condition |
|---------------|---------|-----------|
| Homepage SAA | Click language icon/button in header | User is authenticated |
| Login | Click language icon/button in header | Before/during login |
| Any screen with header | Click language button in header | Header is visible |

### Outgoing Navigations (To)

| Target Screen | Trigger Element | Node ID | Confidence | Notes |
|---------------|-----------------|---------|------------|-------|
| (Same screen - closes dropdown) | Click: "VN" option | I525:11713;362:6085 | high | Selects Vietnamese, closes dropdown, reloads UI text |
| (Same screen - closes dropdown) | Click: "EN" option | I525:11713;362:6128 | high | Selects English, closes dropdown, reloads UI text |
| (Same screen - closes dropdown) | Click outside dropdown | - | high | Standard dropdown dismiss behavior |

### Navigation Rules
- **Back behavior**: Closes dropdown, returns to previous screen state
- **Deep link support**: No - this is an overlay component, not a routable page
- **Auth required**: No - language can be changed on login page as well

---

## Component Schema

### Layout Structure

```
┌───────────────────────┐
│  A_Dropdown-List      │
│  ┌─────────────────┐  │
│  │ A.1_tieng Viet  │  │  ← Selected item (dark gray bg)
│  │ [VN Flag] VN    │  │
│  ├─────────────────┤  │
│  │ A.2_tieng Anh   │  │  ← Option item (black bg)
│  │ [EN Flag] EN    │  │
│  └─────────────────┘  │
└───────────────────────┘
```

### Component Hierarchy

```
Dropdown-ngon ngu (FRAME)
└── A_Dropdown-List (INSTANCE) - Dropdown container
    ├── A.1_tieng Viet (INSTANCE) - Vietnamese language option
    │   └── Button (INSTANCE) - Clickable button wrapper
    │       └── Frame 485 (FRAME) - Content layout
    │           ├── IC (INSTANCE) - Flag icon container
    │           │   └── VN - Vietnam (FRAME) - Vietnamese flag
    │           │       └── flag (GROUP) - Flag graphic
    │           └── Awards Information Navigation Links (TEXT) - "VN" label
    └── A.2_tieng Anh (INSTANCE) - English language option
        └── Button (INSTANCE) - Clickable button wrapper
            └── Content (FRAME) - Content layout
                ├── IC (INSTANCE) - Flag icon container
                │   └── GB-NIR - Northern Ireland (FRAME) - English/UK flag
                │       └── flag (GROUP) - Flag graphic
                └── Awards Information Navigation Links (TEXT) - "EN" label
```

### Main Components

| Component | Type | Node ID | Description | Reusable |
|-----------|------|---------|-------------|----------|
| A_Dropdown-List | Organism | 525:11713 | Dropdown container with language options | Yes |
| A.1_tieng Viet | Molecule | I525:11713;362:6085 | Vietnamese language option (VN flag + text) | Yes |
| A.2_tieng Anh | Molecule | I525:11713;362:6128 | English language option (EN flag + text) | Yes |
| Button (VN) | Atom | I525:11713;362:6085;186:1821 | Clickable button for VN selection | Yes |
| Button (EN) | Atom | I525:11713;362:6128;186:1903 | Clickable button for EN selection | Yes |
| IC (VN flag) | Atom | I525:11713;362:6085;186:1821;186:1709 | Vietnam flag icon | Yes |
| IC (EN flag) | Atom | I525:11713;362:6128;186:1903;186:1709 | UK/English flag icon | Yes |
| VN Label | Atom | I525:11713;362:6085;186:1821;186:1439 | Text "VN" | No |
| EN Label | Atom | I525:11713;362:6128;186:1903;186:1439 | Text "EN" | No |

---

## Form Fields (If Applicable)

N/A - This is a selection component, not a form.

---

## API Mapping

### On Screen Load

| API | Method | Purpose | Response Usage |
|-----|--------|---------|----------------|
| - | - | No API call on dropdown open | Current language from user state/cookie |

### On User Action

| Action | API | Method | Request Body | Response |
|--------|-----|--------|--------------|----------|
| Select VN | /users/me/language | PUT | `{ language: "vi" }` | `{ success: true, language: "vi" }` |
| Select EN | /users/me/language | PUT | `{ language: "en" }` | `{ success: true, language: "en" }` |
| Click outside | - | - | No API call | Dropdown closes |

### Error Handling

| Error Code | Message | UI Action |
|------------|---------|-----------|
| 401 | Unauthorized | Redirect to login (if language change requires auth) |
| 500 | Server error | Show toast error, keep current language |
| Network error | Connection failed | Show toast, revert selection |

---

## State Management

### Local State

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| isOpen | boolean | false | Controls dropdown visibility |
| selectedLanguage | string | "vi" | Currently selected language |

### Global State (If Applicable)

| State | Store | Read/Write | Purpose |
|-------|-------|------------|---------|
| locale | i18n/language store | Write | Update application-wide language |
| user.language | userStore | Write | Persist language preference |

---

## UI States

### Loading State
- Brief loading indicator on selected option while API call processes
- Disable both options during language switch

### Error State
- Toast notification if language change fails
- Revert to previous language selection
- Dropdown remains open for retry

### Success State
- Dropdown closes immediately
- Application UI text updates to selected language
- Selected option shows highlighted background on next open

### Empty State
- N/A - Always has exactly two options (VN and EN)

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Focus management | Focus first option when dropdown opens |
| Keyboard navigation | Arrow keys to move between options, Enter to select, Escape to close |
| Screen reader | ARIA role="listbox" on container, role="option" on items, aria-selected for current |
| Error announcement | Live region for language change errors |
| Color contrast | Flag icons + white text on dark background (WCAG AA) |

---

## Responsive Behavior

| Breakpoint | Layout Changes |
|------------|----------------|
| Mobile (<768px) | Same component, positioned relative to header language icon |
| Tablet (768-1024px) | Same as desktop |
| Desktop (>1024px) | Fixed width ~110px, positioned below header language trigger |

---

## Analytics Events (Optional)

| Event | Trigger | Properties |
|-------|---------|------------|
| language_dropdown_open | Dropdown opened | `{ current_language }` |
| language_changed | Language option selected | `{ from_language, to_language }` |
| language_change_error | API error | `{ error_code, attempted_language }` |

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| --dropdown-bg-selected | Dark gray (#333 approx) | Selected language item background |
| --dropdown-bg-option | Black (#000 approx) | Unselected language item background |
| --dropdown-text | White (#FFF) | Language label text color |
| --dropdown-item-height | 56px | Height of each option item |
| --dropdown-width | 110px | Width of dropdown container |
| --dropdown-border-radius | 8px | Corner radius of dropdown |

---

## Implementation Notes

### Dependencies
- i18n library (next-intl or react-i18next)
- Flag icon set or SVG assets
- Dropdown/Popover component (Radix UI or custom)

### Special Considerations
- Language preference should persist across sessions (cookie or user profile API)
- The dropdown uses flag icons (Vietnam flag for VN, UK/Northern Ireland flag for EN)
- Component item size: 110x56px per option
- The selected item appears on top with a lighter (dark gray) background
- The unselected option appears below with a darker (black) background
- The dropdown supports exactly two languages: Vietnamese and English
- On unauthenticated pages (Login), language may be stored in cookie/localStorage instead of API call

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
- [ ] Confirm exact color tokens from design system
- [ ] Verify language API endpoint with backend team
- [ ] Determine if language change triggers full page reload or client-side switch
