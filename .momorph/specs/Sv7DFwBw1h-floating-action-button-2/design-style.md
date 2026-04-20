# Design Style: Floating Action Button (Expanded State)

**Frame ID**: `313:9139`
**Frame Name**: `Floating Action Button - phim nổi chức năng 2`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=313:9139
**Image**: [frame.png](./assets/frame.png)
**Extracted At**: 2026-04-20

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-fab-bg | #FFEA9E | 100% | Action button background (golden yellow) |
| --color-fab-text | #00101A | 100% | Button label text color |
| --color-fab-icon | #00101A | 100% | Button icon fills |
| --color-fab-close-bg | #D4271D | 100% | Close button background (red) |
| --color-fab-close-icon | #FFFFFF | 100% | Close button icon (white X) |
| --color-page-bg | #00101A | 100% | Page background (dark theme) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-fab-label | Montserrat | 24px | 700 | 32px | 0px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --fab-button-padding | 16px | Internal padding of action buttons |
| --fab-button-gap | 8px | Gap between icon and label within a button |
| --fab-stack-gap | 20px | Gap between stacked buttons in the expanded menu |
| --fab-position-right | 19px | Distance from right edge of viewport |
| --fab-position-bottom | 120px | Distance from bottom of viewport (frame 1024px - endY 904px = 120px) |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --fab-button-radius | 4px | Rectangular action buttons (Thể lệ, Viết KUDOS) |
| --fab-close-radius | 100px | Circular close button (fully rounded) |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --fab-button-shadow-hover | 0 2px 8px rgba(0,0,0,0.2) | Button hover shadow |

---

## Layout Specifications

### FAB Expanded Container (Widget Button)

| Property | Value | Notes |
|----------|-------|-------|
| position | fixed | Stays in viewport during scroll |
| bottom | 120px | From bottom of viewport (aligned with collapsed state) |
| right | 19px | From right edge of viewport |
| z-index | 50 | Above page content, below modals |
| width | 214px | Container width (matches widest button) |
| height | 224px | Total height of expanded menu |

### Stack Layout

| Property | Value | Notes |
|----------|-------|-------|
| display | flex | Vertical stack |
| flex-direction | column | Buttons stacked top to bottom |
| align-items | flex-end | Right-aligned buttons |
| gap | 20px | Space between buttons |

### Layout Structure (ASCII)

```
┌─────────────────────────────────────────────────────────────┐
│  Page (bg: #00101A, full viewport)                          │
│                                                             │
│                                                             │
│                                                             │
│                         ┌─────────────────────────────┐     │
│                         │  FAB Expanded Container     │     │
│                         │  (214x224px, fixed,         │     │
│                         │   flex-col, items-end,      │     │
│                         │   gap: 20px)                │     │
│                         │                             │     │
│                         │  ┌───────────────────────┐  │     │
│                         │  │ A: Thể lệ (149x64px) │  │     │
│                         │  │ bg: #FFEA9E, r: 4px   │  │     │
│                         │  │ [Rules] The le         │  │     │
│                         │  └───────────────────────┘  │     │
│                         │            gap: 20px        │     │
│                         │  ┌───────────────────────┐  │     │
│                         │  │ B: Viết KUDOS         │  │     │
│                         │  │ (214x64px)            │  │     │
│                         │  │ bg: #FFEA9E, r: 4px   │  │     │
│                         │  │ [Pen] Viet KUDOS       │  │     │
│                         │  └───────────────────────┘  │     │
│                         │            gap: 20px        │     │
│                         │          ┌──────────┐       │     │
│                         │          │ C: Close │       │     │
│                         │          │ (56x56px)│       │     │
│                         │          │ bg: #D42 │       │     │
│                         │          │ [X white]│       │     │
│                         │          └──────────┘       │     │
│                         └─────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Widget Button — FAB Expanded Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:9140 | - |
| **Component ID** | 214:3909 (variant of 214:3916) | - |
| width | 214px | `width: 214px` |
| height | 224px | `height: 224px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| align-items | flex-end | `align-items: flex-end` |
| gap | 20px | `gap: 20px` |
| position | fixed | `position: fixed` |
| bottom | 120px | `bottom: 120px` |
| right | 19px | `right: 19px` |
| z-index | 50 | `z-index: 50` |

---

### A_Button thể lệ — Rules Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9140;214:3799 | - |
| **Component ID** | 186:1567 (variant of 186:1426) | - |
| width | 149px | `width: 149px` |
| height | 64px | `height: 64px` |
| padding | 16px | `padding: 16px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 8px | `gap: 8px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border-radius | 4px | `border-radius: 4px` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Default | background: #FFEA9E |
| Hover | box-shadow: 0 2px 8px rgba(0,0,0,0.2), brightness(1.05) |
| Active | transform: scale(0.98) |
| Focus | outline: 2px solid #00101A, outline-offset: 2px |

#### Rules Icon (MM_MEDIA_LOGO)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9140;214:3799;186:1763 | - |
| **Component ID** | 214:3752 (variant of 178:1020) | - |
| width | 24px | `width: 24px` |
| height | 24px | `height: 24px` |
| color | #00101A | `color: #00101A` |

Inner SVG group:
| Property | Value |
|----------|-------|
| **Node ID** | I313:9140;214:3799;186:1763;214:3762 |
| width | 20px |
| height | 18px |

#### "Thể lệ" Label

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9140;214:3799;186:1568 | - |
| width | 76px | `width: auto` |
| height | 32px | `height: 32px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| text-align | center | `text-align: center` |
| color | #00101A | `color: #00101A` |
| letter-spacing | 0px | `letter-spacing: 0` |
| content | "Thể lệ" | Static text |

---

### B_Button viết kudos — Write Kudos Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9140;214:3732 | - |
| **Component ID** | 186:1567 (variant of 186:1426) | - |
| width | 214px | `width: 214px` |
| height | 64px | `height: 64px` |
| padding | 16px | `padding: 16px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 8px | `gap: 8px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border-radius | 4px | `border-radius: 4px` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Default | background: #FFEA9E |
| Hover | box-shadow: 0 2px 8px rgba(0,0,0,0.2), brightness(1.05) |
| Active | transform: scale(0.98) |
| Focus | outline: 2px solid #00101A, outline-offset: 2px |

#### Pen Icon (MM_MEDIA_Pen)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9140;214:3732;186:1763 | - |
| **Component ID** | 214:3812 (variant of 178:1020) | - |
| width | 24px | `width: 24px` |
| height | 24px | `height: 24px` |
| color | #00101A | `color: #00101A` |

#### "Viết KUDOS" Label

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9140;214:3732;186:1568 | - |
| width | 150px | `width: auto` |
| height | 32px | `height: 32px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| text-align | center | `text-align: center` |
| color | #00101A | `color: #00101A` |
| letter-spacing | 0px | `letter-spacing: 0` |
| content | "Viết KUDOS" | Static text |

---

### C_Button huỷ — Close Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9140;214:3827 | - |
| **Component ID** | 186:1567 (variant of 186:1426) | - |
| width | 56px | `width: 56px` |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| background | #D4271D | `background-color: #D4271D` |
| border-radius | 100px | `border-radius: 100px` (circular) |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Default | background: #D4271D |
| Hover | background: #B8221A (darker red), box-shadow: 0 2px 8px rgba(0,0,0,0.3) |
| Active | transform: scale(0.95) |
| Focus | outline: 2px solid #D4271D, outline-offset: 2px |

#### Close Icon (MM_MEDIA_Close)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9140;214:3827;186:1766 | - |
| **Component ID** | 214:3851 (variant of 178:1020) | - |
| width | 24px | `width: 24px` |
| height | 24px | `height: 24px` |
| color | #FFFFFF | `color: white` |

---

## Component Hierarchy with Styles

```
Page (bg: #00101A)
└── FAB Expanded Container (position: fixed, right: 19px, bottom: 120px, z-index: 50)
    │   214x224px, flex column, items-end, gap: 20px
    │
    ├── A: Thể lệ Button (149x64px, bg: #FFEA9E, radius: 4px, p: 16px, flex row, gap: 8px)
    │   ├── Rules Icon (24x24px, color: #00101A) — MM_MEDIA_LOGO
    │   └── "Thể lệ" Label (Montserrat 700 24px, color: #00101A)
    │
    ├── B: Viết KUDOS Button (214x64px, bg: #FFEA9E, radius: 4px, p: 16px, flex row, gap: 8px)
    │   ├── Pen Icon (24x24px, color: #00101A) — MM_MEDIA_Pen
    │   └── "Viết KUDOS" Label (Montserrat 700 24px, color: #00101A)
    │
    └── C: Close Button (56x56px, bg: #D4271D, radius: 100px, p: 16px, flex center)
        └── X Icon (24x24px, color: #FFFFFF) — MM_MEDIA_Close
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
| Thể lệ Button | May reduce font-size to 20px, width auto-adjust |
| Viết KUDOS Button | May reduce font-size to 20px, width auto-adjust |
| Close Button | No changes (56x56px meets touch target) |

#### Tablet (640px - 1023px)

| Component | Changes |
|-----------|---------|
| FAB Container | right: 16px, bottom: 100px |
| Action Buttons | No changes |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| FAB Container | right: 19px, bottom: 120px (as per Figma) |
| Action Buttons | No changes |

---

## Icon Specifications

| Icon Name | Size | Color | Component ID | Usage |
|-----------|------|-------|--------------|-------|
| MM_MEDIA_LOGO (rules) | 24x24 (inner 20x18) | #00101A | 214:3752 | Thể lệ button icon |
| MM_MEDIA_Pen | 24x24 | #00101A | 214:3812 | Viết KUDOS button icon |
| MM_MEDIA_Close | 24x24 | #FFFFFF | 214:3851 | Close button icon |

All icons **MUST BE** in **Icon Component** instead of svg files or img tags.

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| FAB Container | opacity, transform (scale) | 250ms | ease-out | Expand from collapsed state |
| Thể lệ Button | opacity, transform (translateY) | 200ms | ease-out | Stagger: delay 0ms |
| Viết KUDOS Button | opacity, transform (translateY) | 200ms | ease-out | Stagger: delay 50ms |
| Close Button | opacity, transform (translateY) | 200ms | ease-out | Stagger: delay 100ms |
| Action Buttons | background, box-shadow | 150ms | ease-in-out | Hover |
| Close Button | background | 150ms | ease-in-out | Hover |
| All Buttons | transform (scale) | 100ms | ease-in-out | Active (press) |

### Expand Animation Sequence
1. FAB pill morphs/fades — container scales up
2. Buttons slide in from bottom with staggered delay (50ms between each)
3. Total animation duration: ~300ms

### Collapse Animation Sequence
1. Buttons slide out and fade (reverse stagger, close button first)
2. Container scales down to pill shape
3. Total animation duration: ~250ms

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| FAB Container | 313:9140 | `fixed bottom-[120px] right-[19px] z-50 flex flex-col items-end gap-5` | `<FloatingActionButton expanded />` |
| Thể lệ Button | I313:9140;214:3799 | `flex items-center gap-2 px-4 py-4 bg-[#FFEA9E] rounded h-16 w-[149px] cursor-pointer hover:shadow-md` | `<FABActionButton>` |
| Viết KUDOS Button | I313:9140;214:3732 | `flex items-center gap-2 px-4 py-4 bg-[#FFEA9E] rounded h-16 w-[214px] cursor-pointer hover:shadow-md` | `<FABActionButton>` |
| Close Button | I313:9140;214:3827 | `flex items-center justify-center w-14 h-14 bg-[#D4271D] rounded-full cursor-pointer hover:bg-[#B8221A]` | `<FABCloseButton>` |
| Button Labels | I313:9140;*;186:1568 | `font-montserrat font-bold text-2xl text-[#00101A] leading-8` | `<span>` with text |
| Rules Icon | I313:9140;214:3799;186:1763 | `w-6 h-6 text-[#00101A]` | `<RulesIcon />` (Icon Component) |
| Pen Icon | I313:9140;214:3732;186:1763 | `w-6 h-6 text-[#00101A]` | `<PenIcon />` (Icon Component) |
| Close Icon | I313:9140;214:3827;186:1766 | `w-6 h-6 text-white` | `<CloseIcon />` (Icon Component) |

---

## Notes

- All colors should use CSS variables for theming support
- Prefer Tailwind utility classes as per project constitution (Tailwind CSS v4)
- Icons should be SVG wrapped in Icon Components for scalability
- Font (Montserrat) should be loaded via Google Fonts or Next.js font optimization
- Ensure color contrast meets WCAG AA:
  - Dark text (#00101A) on golden background (#FFEA9E) — excellent contrast ratio
  - White icon (#FFFFFF) on red background (#D4271D) — excellent contrast ratio
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags.
