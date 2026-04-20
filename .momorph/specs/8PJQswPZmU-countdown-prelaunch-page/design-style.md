# Design Style: Countdown - Prelaunch Page

**Frame ID**: `2268:35127`
**Screen ID**: `8PJQswPZmU`
**Frame Name**: `Countdown - Prelaunch page`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-04-17

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background |
| --color-bg-overlay-start | #00101A | 100% | Gradient overlay start (15.48%) |
| --color-bg-overlay-mid | #00121D | 46% | Gradient overlay mid (52.13%) |
| --color-bg-overlay-end | #001320 | 0% | Gradient overlay end (63.41%) |
| --color-text-primary | #FFFFFF | 100% | Title text, digit numbers, unit labels |
| --color-accent-gold | #FFEA9E | 100% | Digit card border (Figma var: --Details-Text-Primary-1) |
| --color-card-bg-start | #FFFFFF | 100% | Digit card gradient start |
| --color-card-bg-end | #FFFFFF | 10% | Digit card gradient end |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-title | Montserrat | 36px | 700 (Bold) | 48px | 0px |
| --text-digit | Digital Numbers | 73.73px | 400 (Regular) | auto | 0% |
| --text-unit-label | Montserrat | 36px | 700 (Bold) | 48px | 0px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-section-padding-x | 144px | Main content horizontal padding |
| --spacing-section-padding-y | 96px | Main content vertical padding |
| --spacing-section-gap | 120px | Gap between content sections |
| --spacing-title-content-gap | 24px | Gap between title and countdown |
| --spacing-unit-gap | 60px | Gap between Days/Hours/Minutes units |
| --spacing-digit-gap | 21px | Gap between digit cards within a unit |
| --spacing-digit-label-gap | 21px | Gap between digit row and unit label |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-digit-card | 12px | Digit card corners |
| --border-digit-card | 0.75px solid #FFEA9E | Digit card border |

### Shadows & Effects

| Token Name | Value | Usage |
|------------|-------|-------|
| --blur-digit-card | blur(24.96px) | Digit card backdrop blur (glassmorphism) |
| --opacity-digit-card | 0.5 | Digit card background opacity |
| --gradient-overlay | linear-gradient(18deg, #00101A 15.48%, rgba(0, 18, 29, 0.46) 52.13%, rgba(0, 19, 32, 0.00) 63.41%) | Background overlay gradient |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1512px | Full frame width (design reference — use `w-full` for responsive) |
| height | 1077px | Full frame height (design reference — use `min-h-screen` for responsive) |
| background | #00101A | Dark navy background |
| position | relative | Layered content (bg image, overlay, content) |
| overflow | hidden | Prevent background image bleed |

### Background Layers

| Layer | Type | Properties |
|-------|------|------------|
| 1 - BG Image | Image | Full-screen cover, artistic colorful wave pattern |
| 2 - Cover | Gradient Overlay | `linear-gradient(18deg, #00101A 15.48%, rgba(0, 18, 29, 0.46) 52.13%, rgba(0, 19, 32, 0.00) 63.41%)` |
| 3 - Content | Flex Container | Centered countdown content |

### Content Container ("Bia")

| Property | Value | Notes |
|----------|-------|-------|
| width | 1512px | Full width |
| height | 456px | Content area |
| padding | 96px 144px | Vertical / Horizontal |
| display | flex | Flex layout |
| flex-direction | column | Vertical stack |
| align-items | center | Horizontally centered |
| justify-content | center | Vertically centered |
| gap | 120px | Between sections |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Page (1512 x 1077, bg: #00101A)                                     │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  BG Image Layer (absolute, full-screen cover)                    ││
│  └──────────────────────────────────────────────────────────────────┘│
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  Gradient Overlay (absolute, 18deg gradient)                     ││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  Content Container (padding: 96px 144px, flex col, center)       ││
│  │                                                                  ││
│  │           "Sự kiện sẽ bắt đầu sau"                              ││
│  │         (Montserrat Bold 36px, white, center)                    ││
│  │                        ↕ 24px gap                                ││
│  │  ┌──────────────────────────────────────────────────────────────┐││
│  │  │  Time Container (644px, flex row, gap: 60px, centered)       │││
│  │  │                                                              │││
│  │  │  ┌─────────┐   ┌─────────┐   ┌─────────┐                   │││
│  │  │  │ 1_Days  │   │ 2_Hours │   │3_Minutes│                   │││
│  │  │  │ 175x192 │   │ 175x192 │   │ 175x192 │                   │││
│  │  │  │         │   │         │   │         │                   │││
│  │  │  │ ┌──┐┌──┐│   │ ┌──┐┌──┐│   │ ┌──┐┌──┐│                   │││
│  │  │  │ │00││00││   │ │00││05││   │ │02││00││                   │││
│  │  │  │ └──┘└──┘│   │ └──┘└──┘│   │ └──┘└──┘│                   │││
│  │  │  │  ↕21px  │   │  ↕21px  │   │  ↕21px  │                   │││
│  │  │  │  DAYS   │   │  HOURS  │   │ MINUTES │                   │││
│  │  │  └─────────┘   └─────────┘   └─────────┘                   │││
│  │  │       ↔ 60px        ↔ 60px                                  │││
│  │  └──────────────────────────────────────────────────────────────┘││
│  └──────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Title Text - "Sự kiện sẽ bắt đầu sau"

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35137 | - |
| width | 1512px (full width) | `width: 100%` |
| height | 48px | `height: 48px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 48px | `line-height: 48px` |
| letter-spacing | 0px | `letter-spacing: 0` |
| color | #FFFFFF | `color: white` |
| text-align | center | `text-align: center` |

---

### Time Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35138 | - |
| width | 644px | `width: 644px` |
| height | 192px | `height: 192px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 60px | `gap: 60px` |
| align-items | center | `align-items: center` |

---

### Countdown Unit (1_Days / 2_Hours / 3_Minutes)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID (Days)** | 2268:35139 | - |
| **Node ID (Hours)** | 2268:35144 | - |
| **Node ID (Minutes)** | 2268:35149 | - |
| width | 175px | `width: 175px` |
| height | 192px | `height: 192px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 21px | `gap: 21px` |
| align-items | flex-start | `align-items: flex-start` |
| justify-content | center | `justify-content: center` |

---

### Digit Row (Frame 485)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID (Days)** | 2268:35140 | - |
| **Node ID (Hours)** | 2268:35145 | - |
| **Node ID (Minutes)** | 2268:35150 | - |
| width | 175px | `width: 175px` |
| height | 123px | `height: 123px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 21px | `gap: 21px` |
| align-items | center | `align-items: center` |

---

### Digit Card (Glassmorphism Component)

| Property | Value | CSS |
|----------|-------|-----|
| **Component ID** | 186:2619 | - |
| **Instance IDs** | 2268:35141, 2268:35142, 2268:35146, 2268:35147, 2268:35151, 2268:35152 | - |
| width | 77px (outer) / 76.8px (inner) | `width: 77px` |
| height | 123px (outer) / 122.88px (inner) | `height: 123px` |
| border-radius | 12px | `border-radius: 12px` |
| border | 0.75px solid #FFEA9E | `border: 0.75px solid #FFEA9E` |
| opacity | 0.5 | Applied to the inner `Rectangle 1` background only — NOT the entire card. Implement via a `::before` pseudo-element or inner `<div>` with `opacity-50` so that digit text remains at full opacity. |
| background | linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%) | `background: linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%)` |
| backdrop-filter | blur(24.96px) | `backdrop-filter: blur(25px)` |
| **CSS fallback** | - | For browsers without `backdrop-filter` support, use `@supports not (backdrop-filter: blur(1px))` to apply a solid `background: rgba(255, 255, 255, 0.15)` instead of the glassmorphism effect. |
| position | relative | Contains centered digit text |

#### Digit Text (inside card)

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | I2268:35141;186:2617, I2268:35142;186:2617, etc. | - |
| width | 59px | `width: auto` |
| height | 95px | `height: auto` |
| font-family | Digital Numbers | `font-family: 'Digital Numbers', monospace` |
| font-size | 73.73px | `font-size: 73.73px` |
| font-weight | 400 | `font-weight: 400` |
| color | #FFFFFF | `color: white` |
| text-align | left (Figma) | N/A — centered via absolute positioning |
| position | absolute | `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)` |

> **Note**: Figma reports `textAlign: left` on the text node, but the digit is visually centered within the card via absolute positioning offsets, not via `text-align`.

---

### Unit Label (DAYS / HOURS / MINUTES)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID (DAYS)** | 2268:35143 | - |
| **Node ID (HOURS)** | 2268:35148 | - |
| **Node ID (MINUTES)** | 2268:35153 | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 48px | `line-height: 48px` |
| letter-spacing | 0px | `letter-spacing: 0` |
| color | #FFFFFF | `color: white` |
| text-transform | uppercase | `text-transform: uppercase` |

**Label Dimensions:**

| Label | Width | Height |
|-------|-------|--------|
| DAYS | 103px | 48px |
| HOURS | 138px | 48px |
| MINUTES | 173px | 48px |

---

### Background Image Layer

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35129 | - |
| width | 1512px | `width: 100%` |
| height | 1077px | `height: 100%` |
| position | absolute | `position: absolute; inset: 0` |
| background | Artistic colorful wave image | `background: url(...) lightgray -142px -790px / 109.4% 216% no-repeat` |
| z-index | 1 | Behind overlay and content |

> **Note**: The Figma design positions the background image with offsets (`-142px, -790px`) and scales it to `109.4% x 216%`. For responsive implementation, use `object-fit: cover` with `next/image` component which handles positioning automatically. The image asset must be exported from Figma or provided by the design team.

---

### Gradient Overlay Layer

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35130 | - |
| width | 1512px | `width: 100%` |
| height | 1077px | `height: 100%` |
| position | absolute | `position: absolute; inset: 0` |
| background | `linear-gradient(18deg, #00101A 15.48%, rgba(0, 18, 29, 0.46) 52.13%, rgba(0, 19, 32, 0.00) 63.41%)` | Full gradient value |
| z-index | 2 | Above image, below content |

---

## Component Hierarchy with Styles

```
Countdown - Prelaunch page (1512x1077, bg: #00101A, relative)
├── BG Image (absolute, inset: 0, cover, z-1)
├── Cover Overlay (absolute, inset: 0, gradient 18deg, z-2)
└── Bìa - Content (1512x456, px: 144, py: 96, flex col, center, gap: 120px, z-3)
    └── Frame 487 (1512x264, flex col)
        └── Frame 523 (1512x264, flex col)
            └── Countdown time (1512x264, flex col, center, gap: 24px)
                ├── Title "Sự kiện sẽ bắt đầu sau" (Montserrat Bold 36px, white, center)
                └── Time (644x192, flex row, gap: 60px, center)
                    ├── 1_Days (175x192, flex col, gap: 21px)
                    │   ├── Frame 485 (175x123, flex row, gap: 21px)
                    │   │   ├── Digit Card [0] (77x123, glassmorphism, Digital Numbers 73.73px)
                    │   │   └── Digit Card [0] (77x123, glassmorphism, Digital Numbers 73.73px)
                    │   └── "DAYS" (Montserrat Bold 36px, white)
                    ├── 2_Hours (175x192, flex col, gap: 21px)
                    │   ├── Frame 485 (175x123, flex row, gap: 21px)
                    │   │   ├── Digit Card [0] (77x123, glassmorphism, Digital Numbers 73.73px)
                    │   │   └── Digit Card [5] (77x123, glassmorphism, Digital Numbers 73.73px)
                    │   └── "HOURS" (Montserrat Bold 36px, white)
                    └── 3_Minutes (175x192, flex col, gap: 21px)
                        ├── Frame 485 (175x123, flex row, gap: 21px)
                        │   ├── Digit Card [2] (77x123, glassmorphism, Digital Numbers 73.73px)
                        │   └── Digit Card [0] (77x123, glassmorphism, Digital Numbers 73.73px)
                        └── "MINUTES" (Montserrat Bold 36px, white)
```

---

## Responsive Specifications

### Breakpoints (aligned with Constitution — Tailwind v4 defaults)

| Name | Tailwind | Min Width | Notes |
|------|----------|-----------|-------|
| Mobile (base) | - | 0 | Base styles, mobile-first |
| Small | `sm:` | 640px | Large phones / small tablets |
| Medium | `md:` | 768px | Tablets |
| Large | `lg:` | 1024px | Desktops |
| Extra Large | `xl:` | 1280px | Large desktops |

### Responsive Changes

#### Mobile (base, < 640px)

| Component | Changes | Tailwind |
|-----------|---------|----------|
| Content padding | 24px horizontal, 48px vertical | `px-6 py-12` |
| Title | font-size: 20px, line-height: 28px | `text-xl` |
| Time container | flex-direction: row, gap: 16px, width: 100% | `flex-row gap-4 w-full` |
| Digit card | width: 48px, height: 77px | `w-12 h-[77px]` |
| Digit text | font-size: 40px | `text-[40px]` |
| Unit label | font-size: 14px, line-height: 20px | `text-sm` |
| Unit gap | 16px between units | `gap-4` |
| Digit gap | 8px between digit cards | `gap-2` |
| Digit-label gap | 8px between digit row and label | `gap-2` (override column gap) |

#### Small Tablet (`sm:` 640px - 767px)

| Component | Changes | Tailwind |
|-----------|---------|----------|
| Content padding | 36px horizontal, 60px vertical | `sm:px-9 sm:py-15` |
| Title | font-size: 24px, line-height: 32px | `sm:text-2xl` |
| Digit card | width: 54px, height: 86px | `sm:w-[54px] sm:h-[86px]` |
| Digit text | font-size: 48px | `sm:text-[48px]` |
| Unit label | font-size: 18px, line-height: 24px | `sm:text-lg` |
| Unit gap | 28px between units | `sm:gap-7` |
| Digit gap | 12px between digit cards | `sm:gap-3` |
| Digit-label gap | 12px between digit row and label | `sm:gap-3` (column gap) |

#### Tablet (`md:` 768px - 1023px)

| Component | Changes | Tailwind |
|-----------|---------|----------|
| Content padding | 48px horizontal, 72px vertical | `md:px-12 md:py-18` |
| Title | font-size: 28px, line-height: 36px | `md:text-[28px] md:leading-9` |
| Digit card | width: 60px, height: 96px | `md:w-15 md:h-24` |
| Digit text | font-size: 56px | `md:text-[56px]` |
| Unit label | font-size: 24px, line-height: 32px | `md:text-2xl` |
| Unit gap | 40px between units | `md:gap-10` |
| Digit gap | 14px between digit cards | `md:gap-3.5` |
| Digit-label gap | 16px between digit row and label | `md:gap-4` (column gap) |

#### Desktop (`lg:` >= 1024px)

| Component | Changes | Tailwind |
|-----------|---------|----------|
| All values | Match Figma design specs exactly (as documented above) | See Implementation Mapping table |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Digit card | transform (flip) | 300ms | ease-in-out | Digit value change |
| Digit text | opacity | 150ms | ease-in | Number transition |
| Background image | transform (parallax) | - | - | Scroll (optional) |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Page background | 2268:35127 | `bg-[#00101A] relative min-h-screen flex items-center justify-center overflow-hidden` | `<CountdownPage>` |
| BG Image | 2268:35129 | `absolute inset-0 object-cover` | `<Image>` (next/image) |
| Gradient Overlay | 2268:35130 | `absolute inset-0` + custom gradient | `<div>` with inline gradient |
| Content Container | 2268:35131 | `relative z-10 flex flex-col items-center justify-center px-36 py-24 gap-30` | `<section>` |
| Title | 2268:35137 | `text-4xl font-bold text-white text-center font-montserrat` | `<h1>` |
| Time Container | 2268:35138 | `flex flex-row gap-15 items-center` | `<div>` |
| Countdown Unit | 2268:35139/44/49 | `flex flex-col gap-[21px] items-start` | `<CountdownUnit>` |
| Digit Row | 2268:35140/45/50 | `flex flex-row gap-[21px] items-center` | `<div>` |
| Digit Card | 186:2619 (component) | Custom glassmorphism styles | `<DigitCard>` |
| Digit Text | Inner text nodes | `font-['Digital_Numbers'] text-[73.73px] text-white` | `<span>` |
| Unit Label | 2268:35143/48/53 | `text-4xl font-bold text-white uppercase font-montserrat` | `<span>` |

---

## Notes

- **Fonts**: Two font families are required — **Montserrat** (Google Fonts) and **Digital Numbers** (specialized LED/digital display font)
- **Glassmorphism**: Digit cards use a glassmorphism effect with `backdrop-filter: blur(25px)`, semi-transparent white gradient, and gold (#FFEA9E) border
- **Background**: The artistic wave image should be provided as a static asset or fetched from Figma media. The gradient overlay creates the dark bottom-left to transparent top-right effect
- **Color contrast**: White text (#FFF) on dark background (#00101A) exceeds WCAG AAA ratio
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags
