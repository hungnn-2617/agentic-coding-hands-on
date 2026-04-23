# Design Style: Open Secret Box (Unopened State)

**Frame ID**: `J3-4YFIpMM`
**Frame Name**: `Open secret box- chưa mở`
**Figma Link**: https://www.figma.com/file/9ypp4enmFmdK3YAFJLIu6C?node-id=1466:7676
**Extracted At**: 2026-04-22

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-modal-bg | #00101A | 100% | Modal background (Details-Background) |
| --color-title | #FFEA9E | 100% | Title text, count number |
| --color-text-white | #FFFFFF | 100% | Instruction text, label text |
| --color-divider | #2E3940 | 100% | Horizontal line separators |
| --color-transparent | transparent | - | Close button background |
| --color-backdrop | #000000 | 60% | Modal backdrop overlay |
| --color-focus-ring | #FFEA9E | 100% | Focus indicator for accessibility |
| --color-error | #FF6B6B | 100% | Error state text/border |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-title | Montserrat | 25.46px | 700 | 31.82px | 0px |
| --text-instruction | Montserrat | 12.73px | 700 | 19.09px | 0.4px |
| --text-count-number | Montserrat | 28.64px | 700 | 35px | 0px |
| --text-count-label | Montserrat | 12.73px | 700 | 19.09px | 0.4px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-modal-padding-x | 12.73px | Modal horizontal padding |
| --spacing-modal-padding-y | 23.87px | Modal vertical padding |
| --spacing-section-gap | 22.28px | Gap between modal sections |
| --spacing-count-gap | 6.36px | Gap between count number and label |
| --spacing-frame-gap | 7.96px | Gap in instruction frame |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-modal | 12.73px | Modal container border radius |
| --radius-none | 0px | Internal elements |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-none | none | Modal has no shadow (relies on overlay) |

### Z-Index Layers

| Token Name | Value | Usage |
|------------|-------|-------|
| --z-backdrop | 50 | Modal backdrop overlay |
| --z-modal | 51 | Modal container |
| --z-modal-close | 52 | Close button (above modal content) |

---

## Layout Specifications

### Backdrop Overlay

| Property | Value | CSS |
|----------|-------|-----|
| position | fixed | `position: fixed` |
| inset | 0 | `inset: 0` |
| background | rgba(0, 0, 0, 0.6) | `background: rgba(0, 0, 0, 0.6)` |
| z-index | 50 | `z-index: 50` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |

### Container (Modal)

| Property | Value | Notes |
|----------|-------|-------|
| width | 651.55px | Modal fixed width |
| height | 822.59px | Modal auto height |
| padding | 23.87px 12.73px | Vertical / Horizontal |
| background | #00101A | Dark theme |
| border-radius | 12.73px | Rounded corners |
| display | flex | Flexbox layout |
| flex-direction | column | Vertical stacking |
| align-items | center | Centered content |
| justify-content | center | Vertically centered |
| gap | 22.28px | Between sections |

### Layout Structure (ASCII)

```
┌─────────────────────────────────────────────────────────────────┐
│  Modal Container (651.55px × 822.59px, p: 23.87px 12.73px)      │
│  bg: #00101A, radius: 12.73px                                   │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  A_Title Row (626px × 31px)                               │  │
│  │  ┌─────────────────────────────────────────────┐ ┌─────┐  │  │
│  │  │  "KHÁM PHÁ SECRET BOX CỦA BẠN"              │ │  X  │  │  │
│  │  │  font: Montserrat 25.46px/700               │ │19×19│  │  │
│  │  │  color: #FFEA9E, text-align: center         │ └─────┘  │  │
│  │  └─────────────────────────────────────────────┘          │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│  Divider (626px × 1px, bg: #2E3940)                             │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  B_Instruction (142px × 20px, centered)                   │  │
│  │  "Click vào box để mở"                                    │  │
│  │  font: Montserrat 12.73px/700, color: #FFFFFF             │  │
│  │  letter-spacing: 0.4px                                    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  C_Box Image Container (557px × 557px)                    │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │                                                     │  │  │
│  │  │           [Gift Box Image 558.47px²]                │  │  │
│  │  │             with glow effect overlay                │  │  │
│  │  │              (546.54px² effect layer)               │  │  │
│  │  │                                                     │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│  Divider (626px × 1px, bg: #2E3940)                             │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  D_Count Section (174px × 35px)                           │  │
│  │  display: flex, gap: 6.36px, align-items: center          │  │
│  │  ┌──────────────────────────────────────────┐  ┌──────┐   │  │
│  │  │  Secretbox chưa mở                       │  │  05  │   │  │
│  │  │  136px × 20px                            │  │37×35 │   │  │
│  │  │  #FFFFFF, 12.73px/700                    │  │#FFEA9E   │  │
│  │  └──────────────────────────────────────────┘  └──────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│  NOTE: Per screenshot, label appears LEFT of count number      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A_Title - Modal Header

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `1466:7678` | - |
| width | 626px | `width: 626px` |
| height | 31px | `height: 31px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 25.46px | `font-size: 25.46px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 31.82px | `line-height: 31.82px` |
| letter-spacing | 0px | `letter-spacing: 0` |
| text-align | center | `text-align: center` |
| color | #FFEA9E | `color: #FFEA9E` |

**Content**: "KHÁM PHÁ SECRET BOX CỦA BẠN"

---

### MM_MEDIA_Close - Close Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `1466:7679` | - |
| **Component ID** | `214:3851` | - |
| **Component Set ID** | `178:1020` | - |
| width | 19px | `width: 19px` |
| height | 19px | `height: 19px` |
| position | absolute | `position: absolute` |
| right | 12px | `right: 12px` |
| top | ~center of title | - |

**States:**
| State | Changes |
|-------|---------|
| Default | opacity: 1 |
| Hover | opacity: 0.8, cursor: pointer |
| Active | opacity: 0.6 |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

**Accessibility:**
- `aria-label`: "Đóng" / "Close"
- `role`: button
- Keyboard: Enter/Space to activate

---

### B_Group 396 - Instruction Text

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `1466:7681` | - |
| width | 142px | `width: 142px` |
| height | 20px | `height: 20px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| gap | 7.96px | `gap: 7.96px` |

**Inner Text** (`1466:7683`):
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 12.73px | `font-size: 12.73px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 19.09px | `line-height: 19.09px` |
| letter-spacing | 0.4px | `letter-spacing: 0.4px` |
| color | #FFFFFF | `color: white` |
| text-align | right | `text-align: right` |

**Content**: "Click vào box để mở"

**Conditional Display**:
- Hide when `unopened_count === 0`

---

### C_Box Image - Gift Box Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `1466:7684` | - |
| width | 557px | `width: 557px` |
| height | 557px | `height: 557px` |
| position | relative | `position: relative` |
| cursor | pointer | `cursor: pointer` |

**Child: Gift Box Image** (`1466:7686`):
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `1466:7686` | - |
| width | 558.47px | `width: 558.47px` |
| height | 558.47px | `height: 558.47px` |
| aspect-ratio | 1/1 | `aspect-ratio: 1/1` |

**Child: Glow Effect** (`1466:7685`):
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `1466:7685` | - |
| width | 546.54px | `width: 546.54px` |
| height | 546.54px | `height: 546.54px` |
| aspect-ratio | 1/1 | `aspect-ratio: 1/1` |
| background | image with lightgray | Complex gradient/image overlay |
| background-size | 138.53% 138.53% | Creates glow larger than box |
| background-position | -102.94px -102.49px | Offset for centered glow |

**States:**
| State | Changes |
|-------|---------|
| Default | cursor: pointer |
| Hover | transform: scale(1.02), glow intensifies |
| Active | transform: scale(0.98) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 4px |
| Disabled (0 boxes) | cursor: not-allowed, opacity: 0.6, filter: grayscale(30%) |
| Loading (opening) | cursor: wait, pointer-events: none, animation: shake 0.5s |

**Accessibility:**
- `role`: button
- `aria-label`: "Mở Secret Box" / "Open Secret Box"
- `aria-disabled`: true when boxes = 0 or opening in progress
- Keyboard: Enter/Space to activate

---

### Rectangle Dividers

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | `1466:7680`, `1466:7688` | - |
| width | 626px | `width: 626px` |
| height | 1px | `height: 1px` |
| background | #2E3940 | `background-color: #2E3940` |

---

### D_Số box chưa mở - Count Section

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `1466:7689` | - |
| width | 174px | `width: 174px` |
| height | 35px | `height: 35px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 6.36px | `gap: 6.36px` |

**Child: Count Number** (`1466:7693`):
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `1466:7693` | - |
| width | 37px | `width: 37px` |
| height | 35px | `height: 35px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 28.64px | `font-size: 28.64px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 35px | `line-height: 35px` |
| color | #FFEA9E | `color: #FFEA9E` |
| text-align | right | `text-align: right` |

**Content**: "05" (dynamic, zero-padded)
- Format: "01" to "99" (two-digit zero-padded)
- Overflow: "99+" when count exceeds 99

**Child: Count Label** (`1466:7692`):
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `1466:7692` | - |
| width | 136px | `width: 136px` |
| height | 20px | `height: 20px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 12.73px | `font-size: 12.73px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 19.09px | `line-height: 19.09px` |
| letter-spacing | 0.4px | `letter-spacing: 0.4px` |
| color | #FFFFFF | `color: white` |
| text-align | right | `text-align: right` |

**Content**: "Secretbox chưa mở"

---

## Component Hierarchy with Styles

```
Modal (bg: #00101A, p: 23.87px 12.73px, radius: 12.73px, flex col center, gap: 22.28px)
├── Frame 551 (w: 626px, h: 31px, relative)
│   ├── A_Title (w: 626px, text: Montserrat 25.46px/700, color: #FFEA9E, text-center)
│   └── MM_MEDIA_Close (w: 19px, h: 19px, absolute right)
│
├── Rectangle 16 (w: 626px, h: 1px, bg: #2E3940)
│
├── B_Group 396 (w: 142px, h: 20px, flex center, gap: 7.96px)
│   └── Text "Click vào box để mở" (Montserrat 12.73px/700, color: white, letter-spacing: 0.4px)
│
├── C_Box image (w: 557px, h: 557px, relative, cursor: pointer)
│   ├── MM_MEDIA_box quà chưa mở (w: 558.47px, aspect: 1/1)
│   ├── about link (w: 457px, h: 14px, hidden/empty)
│   └── MM_MEDIA_hiệu ứng box quà (w: 546.54px, glow effect overlay)
│
├── Rectangle 18 (w: 626px, h: 1px, bg: #2E3940)
│
└── D_Số box chưa mở (w: 174px, h: 35px, flex row center, gap: 6.36px)
    ├── Count Number "05" (w: 37px, Montserrat 28.64px/700, color: #FFEA9E)
    └── Group 396
        └── Label "Secretbox chưa mở" (w: 136px, Montserrat 12.73px/700, color: white)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | infinity |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Modal | width: 95vw, max-width: 651px |
| Modal padding | padding: 16px 12px |
| Title | font-size: 20px |
| Box image | width: 100%, max-width: 400px |
| Count number | font-size: 24px |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Modal | width: 651px (fixed) |
| All other | Same as desktop |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| Modal | width: 651.55px, centered with overlay |
| All other | As designed in Figma |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| Close (X) | 19×19 | white/light | Modal close button |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Backdrop | opacity | 200ms | ease-out | Modal open/close |
| Modal | opacity, transform | 200ms | ease-out | Open/Close |
| Close button | opacity | 150ms | ease-in-out | Hover |
| Gift box | transform (scale) | 200ms | ease-out | Hover |
| Gift box glow | opacity, filter | 300ms | ease-in-out | Continuous pulse |
| Box opening | transform, opacity | 500ms | cubic-bezier(0.4, 0, 0.2, 1) | Click |
| Box shake | transform (rotate) | 100ms | ease-in-out | Loading state |
| Count update | transform (scale pop) | 200ms | ease-out | After box opens |

### Keyframe Animations

```css
@keyframes glow-pulse {
  0%, 100% { opacity: 0.8; filter: brightness(1); }
  50% { opacity: 1; filter: brightness(1.2); }
}

@keyframes box-shake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
}

@keyframes modal-enter {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes modal-exit {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
}
```

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Backdrop Overlay | N/A | `fixed inset-0 bg-black/60 z-50 flex items-center justify-center` | `<ModalBackdrop>` |
| Modal Container | `1466:7676` | `bg-[#00101A] rounded-[12.73px] p-6 flex flex-col items-center gap-5 z-[51]` | `<SecretBoxModal>` |
| Title | `1466:7678` | `font-montserrat text-[25.46px] font-bold text-[#FFEA9E] text-center` | `<ModalTitle>` |
| Close Button | `1466:7679` | `w-[19px] h-[19px] absolute right-3 cursor-pointer` | `<CloseButton>` |
| Instruction | `1466:7683` | `font-montserrat text-[12.73px] font-bold text-white tracking-[0.4px]` | `<InstructionText>` |
| Gift Box | `1466:7684` | `w-[557px] h-[557px] relative cursor-pointer` | `<GiftBox>` |
| Divider | `1466:7680` | `w-full h-px bg-[#2E3940]` | `<Divider>` |
| Count Number | `1466:7693` | `font-montserrat text-[28.64px] font-bold text-[#FFEA9E]` | `<CountDisplay>` |
| Count Label | `1466:7692` | `font-montserrat text-[12.73px] font-bold text-white tracking-[0.4px]` | Part of `<CountDisplay>` |

---

## Notes

- All colors should use CSS variables for theming support
- Font Montserrat must be loaded via Google Fonts
- Gift box image and glow effect are separate layers for animation flexibility
- The glow effect uses a background image that extends beyond the box boundaries
- Ensure color contrast meets WCAG AA (gold #FFEA9E on dark #00101A passes)
- All interactive elements must have visible focus states for accessibility
- The close icon **MUST BE** in **Icon Component** (from component set `178:1020`)
