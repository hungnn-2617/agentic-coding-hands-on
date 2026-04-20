# Design Style: Floating Action Button (Collapsed State)

**Frame ID**: `313:9137`
**Frame Name**: `Floating Action Button - phim nổi chức năng`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=313:9137
**Image**: [frame.png](./assets/frame.png)
**Extracted At**: 2026-04-20

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-fab-bg | #FFEA9E | 100% | FAB pill background (golden yellow) |
| --color-fab-text | #00101A | 100% | Divider "/" text color |
| --color-fab-icon | #00101A | 100% | Icon fills (dark on golden bg) |
| --color-page-bg | #00101A | 100% | Page background (dark theme) |
| --color-fab-shadow-dark | rgba(0, 0, 0, 0.25) | 25% | Primary drop shadow |
| --color-fab-glow | #FAE287 | 100% | Golden glow shadow |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-fab-divider | Montserrat | 24px | 700 | 32px | 0px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --fab-padding | 16px | Internal padding of FAB pill |
| --fab-icon-gap | 8px | Gap between icons and divider |
| --fab-position-right | 19px | Distance from right edge of viewport |
| --fab-position-bottom | 120px | Distance from bottom of viewport (frame 1024px - endY 904px = 120px) |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --fab-radius | 100px | Pill/capsule shape (fully rounded) |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --fab-shadow | 0 4px 4px 0 rgba(0, 0, 0, 0.25), 0 0 6px 0 #FAE287 | FAB default shadow with golden glow |

---

## Layout Specifications

### FAB Container (A_Widget Button)

| Property | Value | Notes |
|----------|-------|-------|
| position | fixed | Stays in viewport during scroll |
| bottom | 120px | From bottom of viewport |
| right | 19px | From right edge of viewport |
| z-index | 50 | Above page content, below modals |

### FAB Pill (Button Instance)

| Property | Value | Notes |
|----------|-------|-------|
| width | 106px | Fixed width |
| height | 64px | Fixed height |
| display | flex | Horizontal layout |
| flex-direction | row | Icons arranged horizontally |
| align-items | center | Vertically centered |
| justify-content | flex-start | Content aligned to start |
| padding | 16px | All sides |
| gap | 8px | Between icon elements |

### Layout Structure (ASCII)

```
┌─────────────────────────────────────────────────────────────┐
│  Page (bg: #00101A, full viewport)                          │
│                                                             │
│                                                             │
│                                                             │
│                              ┌──────────────────────────┐   │
│                              │  FAB (position: fixed)   │   │
│                              │  bottom: 120px           │   │
│                              │  right: 19px             │   │
│                              │  ┌────────────────────┐  │   │
│                              │  │ Pill (106x64px)    │  │   │
│                              │  │ bg: #FFEA9E        │  │   │
│                              │  │ radius: 100px      │  │   │
│                              │  │ shadow: golden glow│  │   │
│                              │  │                    │  │   │
│                              │  │ [Pen] / [Rules]    │  │   │
│                              │  │ 24px  10px  24px   │  │   │
│                              │  │  (icon gap=8px)    │  │   │
│                              │  └────────────────────┘  │   │
│                              └──────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A_Widget Button — FAB Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:9138 | - |
| **Component ID** | 214:3908 (variant of 214:3916) | - |
| position | fixed | `position: fixed` |
| bottom | 120px | `bottom: 120px` |
| right | 19px | `right: 19px` |
| z-index | 50 | `z-index: 50` |
| box-shadow | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | `box-shadow: 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Default | box-shadow: 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 |
| Hover | box-shadow: 0 4px 8px 0 rgba(0,0,0,0.35), 0 0 10px 0 #FAE287 (increased glow) |
| Active | transform: scale(0.97) (subtle press effect) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Button (FAB Pill)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9138;214:3839 | - |
| **Component ID** | 186:1567 (variant of 186:1426) | - |
| width | 106px | `width: 106px` |
| height | 64px | `height: 64px` |
| padding | 16px | `padding: 16px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 8px | `gap: 8px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border-radius | 100px | `border-radius: 100px` |

---

### A.1_icon viết kudos — Pen Icon Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9138;214:3839;186:1935 | - |
| width | 42px | `width: 42px` |
| height | 32px | `height: 32px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 8px | `gap: 8px` |

#### Pen Icon (MM_MEDIA_Pen)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9138;214:3839;186:1763 | - |
| **Component ID** | 214:3812 (variant of 178:1020) | - |
| width | 24px | `width: 24px` |
| height | 24px | `height: 24px` |
| color | #00101A | `color: #00101A` (icon fill) |

#### "/" Divider Text

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9138;214:3839;186:1568 | - |
| width | 10px | `width: 10px` |
| height | 32px | `height: 32px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| text-align | center | `text-align: center` |
| color | #00101A | `color: #00101A` |
| letter-spacing | 0px | `letter-spacing: 0` |
| content | "/" | Static text |

---

### A.2_icon thể lệ saa — Rules Icon

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9138;214:3839;186:1766 | - |
| **Component ID** | 214:3752 (variant of 178:1020) | - |
| width | 24px | `width: 24px` |
| height | 24px | `height: 24px` |
| color | #00101A | `color: #00101A` (icon fill) |

Inner Group (actual icon SVG bounds):

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9138;214:3839;186:1766;214:3762 | - |
| width | 20px | `width: 20px` |
| height | 18px | `height: 18px` |

---

## Component Hierarchy with Styles

```
Page (bg: #00101A)
└── FAB Container (position: fixed, right: 19px, bottom: 120px, z-index: 50)
    │   shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287
    │   cursor: pointer
    │
    └── Pill Button (106x64px, bg: #FFEA9E, radius: 100px, p: 16px, flex row, gap: 8px)
        ├── Icon Container (42x32px, flex row, gap: 8px, items-center)
        │   ├── Pen Icon (24x24px, color: #00101A)  — MM_MEDIA_Pen
        │   └── "/" Divider (10x32px, Montserrat 700 24px, color: #00101A)
        │
        └── Rules Icon (24x24px, color: #00101A)  — MM_MEDIA_LOGO variant
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 639px |
| Tablet | 640px | 1023px |
| Desktop | 1024px | infinity |

### Responsive Changes

#### Mobile (< 640px)

| Component | Changes |
|-----------|---------|
| FAB Container | right: 16px, bottom: 80px |
| FAB Pill | Same dimensions (106x64px) — meets 44x44px touch target |

#### Tablet (640px - 1023px)

| Component | Changes |
|-----------|---------|
| FAB Container | right: 16px, bottom: 100px |
| FAB Pill | No changes |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| FAB Container | right: 19px, bottom: 120px (as per Figma) |
| FAB Pill | No changes |

---

## Icon Specifications

| Icon Name | Size | Color | Component ID | Usage |
|-----------|------|-------|--------------|-------|
| MM_MEDIA_Pen | 24x24 | #00101A | 214:3812 | Write Kudos icon |
| MM_MEDIA_LOGO (rules) | 24x24 (inner 20x18) | #00101A | 214:3752 | Thể lệ SAA icon |

All icons **MUST BE** in **Icon Component** instead of svg files or img tags.

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| FAB Container | box-shadow | 200ms | ease-in-out | Hover |
| FAB Container | transform | 150ms | ease-in-out | Active (press) |
| FAB Container | opacity, transform | 300ms | ease-out | Expand to state 2 |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| FAB Container | 313:9138 | `fixed bottom-[120px] right-[19px] z-50 cursor-pointer` | `<FloatingActionButton />` |
| FAB Pill | I313:9138;214:3839 | `flex items-center gap-2 px-4 py-4 bg-[#FFEA9E] rounded-full w-[106px] h-16` | Inner element of FAB |
| Pen Icon | I313:9138;214:3839;186:1763 | `w-6 h-6 text-[#00101A]` | `<PenIcon />` (Icon Component) |
| "/" Divider | I313:9138;214:3839;186:1568 | `font-montserrat font-bold text-2xl text-[#00101A] leading-8` | `<span>` with text |
| Rules Icon | I313:9138;214:3839;186:1766 | `w-6 h-6 text-[#00101A]` | `<RulesIcon />` (Icon Component) |

---

## Notes

- All colors should use CSS variables for theming support
- Prefer Tailwind utility classes as per project constitution (Tailwind CSS v4)
- Icons should be SVG wrapped in Icon Components for scalability
- Font (Montserrat) should be loaded via Google Fonts or Next.js font optimization
- Ensure color contrast meets WCAG AA — dark icons (#00101A) on golden background (#FFEA9E) provides excellent contrast
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags.
