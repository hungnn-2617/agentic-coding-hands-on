# Design Style: Profile Dropdown

**Frame ID**: `721:5223`
**Frame Name**: `Dropdown-profile`
**Screen ID**: `z4sCl3_Qtk`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/z4sCl3_Qtk
**Extracted At**: 2026-04-17

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-dropdown-bg | #00070C | 100% | Dropdown container background |
| --color-dropdown-border | #998C5F | 100% | Dropdown border (gold/bronze) |
| --color-profile-item-bg | #FFEA9E | 10% | Profile item background (golden tint) |
| --color-logout-item-bg | transparent | - | Logout item background |
| --color-text-primary | #FFFFFF | 100% | Menu item text |
| --color-text-glow | #FAE287 | - | Text shadow glow on Profile item |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-menu-item | Montserrat | 16px | 700 (Bold) | 24px | 0.15px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-dropdown-padding | 6px | Dropdown container inner padding |
| --spacing-item-padding | 16px | Menu item inner padding (all sides) |
| --spacing-icon-text-gap | 4px | Gap between text and icon |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-dropdown | 8px | Dropdown container border radius |
| --radius-item | 4px | Menu item border radius |
| --border-dropdown | 1px solid #998C5F | Dropdown container border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-profile-text | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Golden glow on "Profile" text |

---

## Layout Specifications

### Dropdown Container

| Property | Value | Notes |
|----------|-------|-------|
| display | flex | Vertical stack of items |
| flex-direction | column | Items stacked vertically |
| padding | 6px | Inner padding around items |
| border | 1px solid #998C5F | Gold/bronze border |
| border-radius | 8px | Rounded corners |
| background | #00070C | Very dark blue-black |
| align-items | flex-start | Items left-aligned |

### Menu Item

| Property | Value | Notes |
|----------|-------|-------|
| display | flex | Horizontal layout |
| flex-direction | row | Text + icon side by side |
| align-items | center | Vertically centered |
| justify-content | flex-start | Content left-aligned |
| padding | 16px | All-around padding |
| border-radius | 4px | Slightly rounded |
| gap | 4px | Between text group and icon |
| height | 56px | Fixed height |

### Layout Structure (ASCII)

```
┌───────────────────────────────────────────┐
│  Dropdown Container                        │
│  (border: 1px solid #998C5F, radius: 8px)  │
│  (bg: #00070C, padding: 6px)               │
│                                            │
│  ┌───────────────────────────────────────┐ │
│  │  Profile Item (A.1)                    │ │
│  │  (bg: rgba(255,234,158,0.1), r: 4px)  │ │
│  │  ┌──────────┐  ┌──────┐               │ │
│  │  │ "Profile"│  │ User │               │ │
│  │  │ 16px     │  │ Icon │               │ │
│  │  │ Bold     │  │24x24 │               │ │
│  │  │ Glow✨   │  │      │               │ │
│  │  └──────────┘  └──────┘               │ │
│  │  (gap: 4px, padding: 16px)            │ │
│  └───────────────────────────────────────┘ │
│                                            │
│  ┌───────────────────────────────────────┐ │
│  │  Logout Item (A.2)                     │ │
│  │  (bg: transparent, r: 4px)             │ │
│  │  ┌──────────┐  ┌──────┐               │ │
│  │  │ "Logout" │  │  ›   │               │ │
│  │  │ 16px     │  │24x24 │               │ │
│  │  │ Bold     │  │      │               │ │
│  │  │ White    │  │      │               │ │
│  │  └──────────┘  └──────┘               │ │
│  │  (gap: 4px, padding: 16px)            │ │
│  └───────────────────────────────────────┘ │
│                                            │
└───────────────────────────────────────────┘
```

---

## Component Style Details

### Dropdown Trigger Button (Avatar)

> **Note**: The trigger button is the user avatar in the header. When the user has a Google avatar, it shows as a rounded-full image. When no avatar, it shows a `UserIcon` in a bordered square button. See existing `ProfileDropdown` component.

---

### Dropdown Panel Positioning

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| position | absolute | `absolute` |
| right | 0 | `right-0` |
| top | calc(100% + 8px) | `mt-2` |
| z-index | 50 | `z-50` |
| min-width | 133px | Content-driven |

---

### Dropdown Container (`A_Dropdown-List`)

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `666:9601` | - |
| display | flex | `flex` |
| flex-direction | column | `flex-col` |
| align-items | flex-start | `items-start` |
| padding | 6px | `p-1.5` |
| background | #00070C | `bg-[#00070C]` |
| border | 1px solid #998C5F | `border border-[#998C5F]` |
| border-radius | 8px | `rounded-lg` |

---

### Profile Item (`A.1_Profile`)

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `I666:9601;563:7844` | - |
| width | 119px | auto (content-driven) |
| height | 56px | `h-14` |
| display | flex | `flex` |
| flex-direction | row | `flex-row` |
| align-items | center | `items-center` |
| justify-content | flex-start | `justify-start` |
| padding | 16px | `p-4` |
| gap | 4px | `gap-1` |
| border-radius | 4px | `rounded` |
| background | rgba(255, 234, 158, 0.1) | `bg-[rgba(255,234,158,0.1)]` |

**Profile Text:**

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `I666:9601;563:7844;186:1497` | - |
| font-family | Montserrat | `font-montserrat` |
| font-size | 16px | `text-base` |
| font-weight | 700 | `font-bold` |
| line-height | 24px | `leading-6` |
| letter-spacing | 0.15px | `tracking-[0.15px]` |
| color | #FFFFFF | `text-white` |
| text-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | `style={{ textShadow: '...' }}` |
| text-align | center | `text-center` |

**Profile Icon (User):**

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `I666:9601;563:7844;186:1498` | - |
| width | 24px | `w-6` |
| height | 24px | `h-6` |
| position | after text | Icon placed right of text |

---

### Logout Item (`A.2_Logout`)

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `I666:9601;563:7868` | - |
| width | 121px | auto (content-driven) |
| height | 56px | `h-14` |
| display | flex | `flex` |
| flex-direction | row | `flex-row` |
| align-items | center | `items-center` |
| justify-content | flex-start | `justify-start` |
| padding | 16px | `p-4` |
| gap | 4px | `gap-1` |
| border-radius | 4px | `rounded` |
| background | transparent | `bg-transparent` |

**Logout Text:**

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `I666:9601;563:7868;186:1439` | - |
| font-family | Montserrat | `font-montserrat` |
| font-size | 16px | `text-base` |
| font-weight | 700 | `font-bold` |
| line-height | 24px | `leading-6` |
| letter-spacing | 0.15px | `tracking-[0.15px]` |
| color | #FFFFFF | `text-white` |
| text-align | center | `text-center` |

**Logout Icon (Chevron Right):**

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `I666:9601;563:7868;186:1441` | - |
| width | 24px | `w-6` |
| height | 24px | `h-6` |
| position | after text | Icon placed right of text |

---

### Interactive States

| State | Property | Value | CSS / Tailwind |
|-------|----------|-------|----------------|
| Profile Default | background | `rgba(255, 234, 158, 0.1)` | `bg-[rgba(255,234,158,0.1)]` |
| Profile Hover | background | `rgba(255, 234, 158, 0.2)` | `hover:bg-[rgba(255,234,158,0.2)]` |
| Logout Default | background | transparent | `bg-transparent` |
| Logout Hover | background | `rgba(255, 255, 255, 0.1)` | `hover:bg-white/10` |
| Any Active | background | `rgba(255, 234, 158, 0.3)` | `active:bg-[rgba(255,234,158,0.3)]` |
| Focus | outline | 2px solid `#FFEA9E`, offset 2px | `focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2` |

---

## Icon Specifications

| Icon Name | Size | Source | Usage |
|-----------|------|--------|-------|
| User Icon | 24x24px | `UserIcon` component | Profile menu item (right of text) |
| Chevron Right | 24x24px | `ChevronRightIcon` or `ArrowRightIcon` component | Logout menu item (right of text) |

> **Note**: Icons MUST be rendered as Icon Components per constitution.

---

## Animation & Transitions

| Element | Property | From -> To | Duration | Easing | Trigger |
|---------|----------|-----------|----------|--------|---------|
| Dropdown Panel (open) | opacity | 0 -> 1 | 150ms | ease-out | Toggle open |
| Dropdown Panel (open) | transform | translateY(-4px) -> translateY(0) | 150ms | ease-out | Toggle open |
| Dropdown Panel (close) | opacity | 1 -> 0 | 100ms | ease-in | Toggle close |
| Menu Item | background-color | current -> hover value | 150ms | ease-in-out | Mouse enter/leave |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Dropdown Container | `666:9601` | `flex flex-col items-start p-1.5 bg-[#00070C] border border-[#998C5F] rounded-lg` | `<ProfileDropdown />` (panel) |
| Profile Item | `I666:9601;563:7844` | `flex items-center gap-1 h-14 p-4 rounded bg-[rgba(255,234,158,0.1)]` | Menu item inside `<ProfileDropdown />` |
| Logout Item | `I666:9601;563:7868` | `flex items-center gap-1 h-14 p-4 rounded bg-transparent` | Menu item inside `<ProfileDropdown />` |
| Menu Item Text | `*;186:1497` / `*;186:1439` | `font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white` | Text node within menu item |
| User Icon | `*;186:1498` | `w-6 h-6` | `<UserIcon />` |
| Chevron Right Icon | `*;186:1441` | `w-6 h-6` | `<ChevronRightIcon />` or `<ArrowRightIcon />` |

---

## Comparison with Existing Implementation

The existing `ProfileDropdown` component uses a generic dark style (`bg-[#0B0F12] border-white/10`). The Figma design requires restyling to match the gold-themed dropdown pattern:

| Property | Current Code | Figma Design |
|----------|-------------|--------------|
| Container bg | `bg-[#0B0F12]` | `bg-[#00070C]` |
| Container border | `border-white/10` | `border-[#998C5F]` |
| Container radius | `rounded-lg` | `rounded-lg` (same) |
| Container padding | implicit | `p-1.5` |
| Profile item bg | none | `bg-[rgba(255,234,158,0.1)]` |
| Profile text effect | none | `text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` |
| Profile icon | none | `UserIcon` 24x24 right of text |
| Logout icon | none | Chevron-right 24x24 right of text |
| Item height | auto | `h-14` (56px) |
| Item padding | `px-4 py-3` | `p-4` (16px all sides) |
| Hover | `hover:bg-white/10` | Profile: `hover:bg-[rgba(255,234,158,0.2)]`, Logout: `hover:bg-white/10` |
| EN label | "Sign out" | "Logout" |

---

## Notes

- The dropdown uses the exact same container component (`A_Dropdown-List`) as the language dropdown — same border, background, padding, radius.
- The "Profile" item's golden glow effect (text-shadow + background tint) visually distinguishes it as the primary action.
- The Figma shows "Logout" but the current i18n EN translation says "Sign out". The EN translation should be updated to "Logout" to match Figma.
- All icons MUST be Icon Components per constitution.
