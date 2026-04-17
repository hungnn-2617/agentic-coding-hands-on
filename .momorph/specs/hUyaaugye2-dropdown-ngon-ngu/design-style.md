# Design Style: Language Dropdown

**Frame ID**: `721:4942`
**Frame Name**: `Dropdown-ngôn ngữ`
**Screen ID**: `hUyaaugye2`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/hUyaaugye2
**Extracted At**: 2026-04-17

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-dropdown-bg | #00070C | 100% | Dropdown container background |
| --color-dropdown-border | #998C5F | 100% | Dropdown border (gold/bronze) |
| --color-item-selected-bg | #FFEA9E | 20% | Selected language item background |
| --color-item-default-bg | transparent | - | Unselected language item background |
| --color-text-label | #FFFFFF | 100% | Language code text (VN, EN) |
| --color-frame-bg | #696969 | 100% | Outer frame background (design context only) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-lang-code | Montserrat | 16px | 700 (Bold) | 24px | 0.15px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-dropdown-padding | 6px | Dropdown container inner padding |
| --spacing-item-padding | 16px | Language item inner padding (all sides) |
| --spacing-icon-text-gap | 4px | Gap between flag icon and language code text |
| --spacing-item-gap | 2px | Gap between icon-text group elements |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-dropdown | 8px | Dropdown container border radius |
| --radius-item | 4px | Language item border radius |
| --radius-item-selected | 2px (outer) / 4px (inner) | Selected item border radius |
| --border-dropdown | 1px solid #998C5F | Dropdown container border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-dropdown | none | No shadow in current design |

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

### Language Item

| Property | Value | Notes |
|----------|-------|-------|
| display | flex | Horizontal layout |
| flex-direction | row | Icon + text side by side |
| align-items | center | Vertically centered |
| justify-content | space-between | Content spread across width |
| padding | 16px | All-around padding |
| border-radius | 4px | Slightly rounded |
| width | ~108-110px | Content-driven width |
| height | 56px | Fixed height |

### Layout Structure (ASCII)

```
┌─────────────────────────────────────────────┐
│  Dropdown Container                          │
│  (border: 1px solid #998C5F, radius: 8px)    │
│  (bg: #00070C, padding: 6px)                 │
│                                              │
│  ┌─────────────────────────────────────────┐ │
│  │  Selected Item (VN)                      │ │
│  │  (bg: rgba(255,234,158,0.2), r: 2px)    │ │
│  │  ┌──────────────────────────────────┐    │ │
│  │  │  Inner (padding: 16px, r: 4px)   │    │ │
│  │  │  ┌──────┐  ┌────────────┐        │    │ │
│  │  │  │ Flag │  │ "VN"       │        │    │ │
│  │  │  │ 24x24│  │ Mont. 16px │        │    │ │
│  │  │  │      │  │ Bold White │        │    │ │
│  │  │  └──────┘  └────────────┘        │    │ │
│  │  │  (gap: 4px between icon & text)  │    │ │
│  │  └──────────────────────────────────┘    │ │
│  └─────────────────────────────────────────┘ │
│                                              │
│  ┌─────────────────────────────────────────┐ │
│  │  Unselected Item (EN)                    │ │
│  │  (bg: transparent, r: 0px)               │ │
│  │  ┌──────────────────────────────────┐    │ │
│  │  │  Inner (padding: 16px, r: 4px)   │    │ │
│  │  │  ┌──────┐  ┌────────────┐        │    │ │
│  │  │  │ Flag │  │ "EN"       │        │    │ │
│  │  │  │ 24x24│  │ Mont. 16px │        │    │ │
│  │  │  │      │  │ Bold White │        │    │ │
│  │  │  └──────┘  └────────────┘        │    │ │
│  │  │  (gap: 4px between icon & text)  │    │ │
│  │  └──────────────────────────────────┘    │ │
│  └─────────────────────────────────────────┘ │
│                                              │
└─────────────────────────────────────────────┘
```

---

## Component Style Details

### Dropdown Trigger Button (Closed State)

> **Note**: The Figma frame `hUyaaugye2` only shows the **opened dropdown panel**. The trigger button's appearance is defined by the header design context. The following is extracted from the existing `LanguageSelector` implementation and header design.

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| display | flex | `flex` |
| align-items | center | `items-center` |
| gap | 2px | `gap-0.5` |
| padding | 8px 16px | `px-4 py-2` |
| border-radius | 4px | `rounded` |
| background | transparent | `bg-transparent` |
| cursor | pointer | `cursor-pointer` |

**Content**: `[Flag Icon] [Language Code] [Chevron Down Icon]`

**States:**

| State | Changes |
|-------|---------|
| Default | background: transparent |
| Hover | background: `rgba(255, 255, 255, 0.1)` / `bg-white/10` |
| Open | background: `rgba(255, 255, 255, 0.1)` / `bg-white/10`, chevron rotated 180deg |
| Focus | outline: 2px solid `rgba(255, 255, 255, 0.5)` with 2px offset |

---

### Dropdown Panel Positioning

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| position | absolute | `absolute` |
| right | 0 | `right-0` |
| top | calc(100% + 8px) | `mt-2` (from trigger bottom) |
| z-index | 50 | `z-50` |
| min-width | 122px | Content-driven (padding + item width) |

---

### Dropdown Container (`A_Dropdown-List`)

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `525:11713` | - |
| display | flex | `flex` |
| flex-direction | column | `flex-col` |
| align-items | flex-start | `items-start` |
| padding | 6px | `p-1.5` |
| background | #00070C | `bg-[#00070C]` |
| border | 1px solid #998C5F | `border border-[#998C5F]` |
| border-radius | 8px | `rounded-lg` |

---

### Selected Language Item (`A.1_tiếng Việt`)

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `I525:11713;362:6085` | - |
| width | 108px | `w-[108px]` |
| height | 56px | `h-14` |
| display | flex | `flex` |
| align-items | center | `items-center` |
| border-radius | 2px (outer) | `rounded-sm` |
| background | rgba(255, 234, 158, 0.2) | `bg-[rgba(255,234,158,0.2)]` |

**Inner Button:**

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `I525:11713;362:6085;186:1821` | - |
| width | 108px | `w-[108px]` |
| height | 56px | `h-14` |
| display | flex | `flex` |
| flex-direction | row | `flex-row` |
| align-items | center | `items-center` |
| justify-content | space-between | `justify-between` |
| padding | 16px | `p-4` |
| border-radius | 4px | `rounded` |
| gap | 2px | `gap-0.5` |

**Content Group (Icon + Text):**

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `I525:11713;362:6085;186:1821;186:1937` | - |
| display | flex | `flex` |
| flex-direction | row | `flex-row` |
| align-items | center | `items-center` |
| gap | 4px | `gap-1` |
| width | 53px | auto |
| height | 24px | `h-6` |

---

### Unselected Language Item (`A.2_tiếng Anh`)

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `I525:11713;362:6128` | - |
| width | 110px | `w-[110px]` |
| height | 56px | `h-14` |
| display | flex | `flex` |
| align-items | center | `items-center` |
| justify-content | center | `justify-center` |
| border-radius | 0px | `rounded-none` |
| background | transparent | `bg-transparent` |

**Inner Button:**

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `I525:11713;362:6128;186:1903` | - |
| width | 110px | `w-[110px]` |
| height | 56px | `h-14` |
| display | flex | `flex` |
| flex-direction | row | `flex-row` |
| align-items | center | `items-center` |
| justify-content | space-between | `justify-between` |
| padding | 16px | `p-4` |
| border-radius | 4px | `rounded` |

**Content Group (Icon + Text):**

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `I525:11713;362:6128;186:1903;186:1937` | - |
| display | flex | `flex` |
| flex-direction | row | `flex-row` |
| align-items | center | `items-center` |
| gap | 4px | `gap-1` |
| width | 52px | auto |
| height | 24px | `h-6` |

---

### Flag Icon

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID (VN)** | `I525:11713;362:6085;186:1821;186:1709` | - |
| **Node ID (EN)** | `I525:11713;362:6128;186:1903;186:1709` | - |
| width | 24px | `w-6` |
| height | 24px | `h-6` |
| inner flag size | 20x15px | Contained within 24x24 frame |

---

### Language Code Text

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID (VN)** | `I525:11713;362:6085;186:1821;186:1439` | - |
| **Node ID (EN)** | `I525:11713;362:6128;186:1903;186:1439` | - |
| font-family | Montserrat | `font-montserrat` |
| font-size | 16px | `text-base` |
| font-weight | 700 | `font-bold` |
| line-height | 24px | `leading-6` |
| letter-spacing | 0.15px | `tracking-[0.15px]` |
| color | #FFFFFF | `text-white` |
| text-align | center | `text-center` |
| width (VN) | 25px | auto |
| width (EN) | 24px | auto |

**Interactive States (applied to the parent language item, not the text itself):**

| State | Property | Value | CSS / Tailwind |
|-------|----------|-------|----------------|
| Default (unselected) | background | transparent | `bg-transparent` |
| Selected | background | `rgba(255, 234, 158, 0.2)` | `bg-[rgba(255,234,158,0.2)]` |
| Hover (unselected) | background | `rgba(255, 255, 255, 0.1)` | `hover:bg-white/10` |
| Hover (selected) | background | `rgba(255, 234, 158, 0.3)` | `hover:bg-[rgba(255,234,158,0.3)]` |
| Active / Pressed | background | `rgba(255, 234, 158, 0.4)` | `active:bg-[rgba(255,234,158,0.4)]` |
| Focus | outline | 2px solid `#FFEA9E`, offset 2px | `focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2` |

---

## Component Hierarchy with Styles

```
Dropdown Container (525:11713)
│  bg: #00070C, border: 1px solid #998C5F, rounded-lg, p-1.5, flex flex-col items-start
│
├── Selected Item - VN (I525:11713;362:6085)
│   │  w-[108px], h-14, flex items-center, rounded-sm
│   │  bg: rgba(255,234,158,0.2)
│   │
│   └── Button Inner (I525:11713;362:6085;186:1821)
│       │  w-[108px], h-14, flex items-center justify-between, p-4, rounded, gap-0.5
│       │
│       └── Content Group (I525:11713;362:6085;186:1821;186:1937)
│           │  flex items-center, gap-1
│           │
│           ├── Flag Icon VN (I525:11713;362:6085;186:1821;186:1709)
│           │   w-6, h-6 (inner flag: 20x15px)
│           │
│           └── Text "VN" (I525:11713;362:6085;186:1821;186:1439)
│               font-montserrat, text-base, font-bold, leading-6, text-white
│
└── Unselected Item - EN (I525:11713;362:6128)
    │  w-[110px], h-14, flex items-center justify-center, rounded-none
    │  bg: transparent
    │
    └── Button Inner (I525:11713;362:6128;186:1903)
        │  w-[110px], h-14, flex items-center justify-between, p-4, rounded
        │
        └── Content Group (I525:11713;362:6128;186:1903;186:1937)
            │  flex items-center, gap-1
            │
            ├── Flag Icon EN (I525:11713;362:6128;186:1903;186:1709)
            │   w-6, h-6 (inner flag: 20x15px)
            │
            └── Text "EN" (I525:11713;362:6128;186:1903;186:1439)
                font-montserrat, text-base, font-bold, leading-6, text-white
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | - |

### Responsive Changes

The language dropdown is a compact, fixed-size component. It maintains the same dimensions across all breakpoints as it is designed to fit within the header navigation area.

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Dropdown Container | Same dimensions, positioned in mobile header/hamburger menu |
| Touch target | Minimum 44x44px ensured by 56px item height |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Dropdown Container | No changes — same size and position in header |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| Dropdown Container | No changes — positioned in header navigation area |

---

## Icon Specifications

| Icon Name | Size | Source | Usage |
|-----------|------|--------|-------|
| Flag VN (Vietnam) | 20x15px (in 24x24 frame) | Flag icon component | Vietnamese language option |
| Flag EN (GB/Northern Ireland) | 20x15px (in 24x24 frame) | Flag icon component | English language option |
| Chevron Down | 24x24px | `ChevronDownIcon` component | Trigger button — indicates dropdown can be opened. Rotates 180deg when open. |

> **Note**: All icons (flags and chevron) MUST be rendered as Icon Components per constitution standards. Do not use `<img>` tags or inline SVGs.

---

## Animation & Transitions

| Element | Property | From → To | Duration | Easing | Trigger |
|---------|----------|-----------|----------|--------|---------|
| Dropdown Panel (open) | opacity | 0 → 1 | 150ms | ease-out | Toggle open |
| Dropdown Panel (open) | transform | translateY(-4px) → translateY(0) | 150ms | ease-out | Toggle open |
| Dropdown Panel (close) | opacity | 1 → 0 | 100ms | ease-in | Toggle close |
| Language Item | background-color | current → hover value | 150ms | ease-in-out | Mouse enter/leave |
| Language Item | background-color | current → active value | 100ms | ease-in-out | Mouse down |
| Chevron Icon | transform (rotate) | 0deg → 180deg | 150ms | ease-in-out | Dropdown open/close |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Dropdown Container | `525:11713` | `flex flex-col items-start p-1.5 bg-[#00070C] border border-[#998C5F] rounded-lg` | `<LanguageDropdown />` |
| Selected Language Item | `I525:11713;362:6085` | `flex items-center w-[108px] h-14 rounded-sm bg-[rgba(255,234,158,0.2)]` | `<LanguageOption selected />` |
| Unselected Language Item | `I525:11713;362:6128` | `flex items-center justify-center w-[110px] h-14 bg-transparent` | `<LanguageOption />` |
| Item Button Inner | `*;186:1821` / `*;186:1903` | `flex items-center justify-between p-4 rounded` | Part of `<LanguageOption />` |
| Content Group | `*;186:1937` | `flex items-center gap-1` | Part of `<LanguageOption />` |
| Flag Icon | `*;186:1709` | `w-6 h-6` | `<FlagIcon country="VN" />` / `<FlagIcon country="EN" />` |
| Language Code Text | `*;186:1439` | `font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white text-center` | Text node within `<LanguageOption />` |

---

## Notes

- All colors should use CSS variables for theming support where applicable.
- Prefer Tailwind utility classes as the project uses Tailwind CSS v4.
- Flag icons should be implemented as React Icon Components per constitution guidelines.
- Font (Montserrat) must be loaded via Google Fonts or `next/font`.
- The golden border (#998C5F) and dark background (#00070C) are consistent with the application's dark theme design system.
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags.
