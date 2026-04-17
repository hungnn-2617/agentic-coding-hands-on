# Design Style: Homepage SAA

**Frame ID**: `i87tDx10uM`
**Frame Name**: `Homepage SAA`
**Figma Link**: MoMorph Screen i87tDx10uM
**Extracted At**: 2026-04-17

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-page-bg | #00101A | 100% | Page background, primary CTA text |
| --color-text-primary | #FFEA9E | 100% | Gold accent: section titles, award titles, event values, CTA bg |
| --color-text-secondary | #FFFFFF | 100% | Body text, nav links, countdown labels, descriptions |
| --color-header-bg | #101417 | 80% | Header background (semi-transparent dark) |
| --color-divider | #2E3940 | 100% | Divider lines, footer top border |
| --color-border | #998C5F | 100% | Outline button borders, profile button border |
| --color-secondary-btn-bg | #FFEA9E | 10% | Secondary/outline button background |
| --color-notification-badge | #D4271D | 100% | Notification red dot |
| --color-kudos-card-bg | #0F0F0F | 100% | Sun* Kudos card dark background |
| --color-kudos-decorative | #DBD1C1 | 100% | Decorative "KUDOS" text |
| --color-glow | #FAE287 | 100% | Golden glow in shadows and text-shadows |
| --color-transparent | transparent | 0% | Transparent button backgrounds |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| --gradient-cover | `linear-gradient(12deg, #00101A 23.7%, rgba(0, 18, 29, 0.46) 38.34%, rgba(0, 19, 32, 0.00) 48.92%)` | Hero image overlay |
| --gradient-countdown-digit | `linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.10) 100%)` | Countdown digit card bg |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-hero-title | Custom Graphic | - | - | - | - |
| --text-section-title | Montserrat | 57px | 700 | 64px | -0.25px |
| --text-countdown-digit | Digital Numbers | 49.15px | 400 | auto | 0 |
| --text-countdown-label | Montserrat | 24px | 700 | 32px | 0 |
| --text-event-value | Montserrat | 24px | 700 | 32px | 0 |
| --text-award-title | Montserrat | 24px | 400 | 32px | 0 |
| --text-section-subtitle | Montserrat | 24px | 700 | 32px | 0 |
| --text-cta-button | Montserrat | 22px | 700 | 28px | 0 |
| --text-quote | Montserrat | 20px | 700 | 32px | 0 |
| --text-body | Montserrat | 16px | 400 | 24px | 0.5px |
| --text-body-bold | Montserrat | 16px | 700 | 24px | 0.5px |
| --text-nav-link | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-detail-link | Montserrat | 16px | 500 | 24px | 0.15px |
| --text-nav-selected | Montserrat | 14px | 700 | 20px | 0.1px |
| --text-copyright | Montserrat Alternates | 16px | 700 | 24px | 0 |
| --text-kudos-decorative | SVN-Gotham | 96.16px | 400 | 24.04px | -13% |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Main content horizontal padding |
| --spacing-page-y | 96px | Main content vertical padding |
| --spacing-section-gap | 120px | Between major page sections |
| --spacing-about-padding | 120px 104px | About content card inner padding |
| --spacing-header-x | 144px | Header horizontal padding |
| --spacing-header-y | 12px | Header vertical padding |
| --spacing-footer | 40px 90px | Footer padding |
| --spacing-cta-padding | 16px 24px | CTA button internal padding |
| --spacing-nav-padding | 16px | Nav button/link padding |
| --spacing-section-header | 80px | Awards section header-to-grid gap |
| --spacing-card-grid-gap | 80px | Between award cards (horizontal) |
| --spacing-card-internal | 24px | Card image-to-text gap |
| --spacing-cta-gap | 40px | Between CTA buttons |
| --spacing-countdown-gap | 40px | Between countdown units |
| --spacing-about-gap | 32px | About section inner gap |
| --spacing-sm | 16px | Small general gaps |
| --spacing-xs | 8px | Tight gaps (icon gaps, event info label) |
| --spacing-xxs | 4px | Micro gaps (nav text-icon) |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-xs | 4px | Nav buttons, Kudos CTA, profile button, footer link bg |
| --radius-sm | 8px | CTA buttons, about card, countdown digit cards |
| --radius-md | 16px | Sun* Kudos card |
| --radius-lg | 24px | Award card image |
| --radius-full | 100px | Notification badge, widget button (pill) |
| --border-countdown | 0.5px solid #FFEA9E | Countdown digit card |
| --border-award-image | 0.955px solid #FFEA9E | Award thumbnail image |
| --border-outline-btn | 1px solid #998C5F | Secondary CTA, profile button |
| --border-divider | 1px solid #2E3940 | Footer top, section dividers |
| --border-nav-selected | 1px solid #FFEA9E | Header nav selected bottom border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-golden-glow | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | Award card images, widget button |
| --text-shadow-golden | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Active nav link text, footer active link |

### Effects

| Token Name | Value | Usage |
|------------|-------|-------|
| --blur-frosted | backdrop-filter: blur(16.64px) | Countdown digit card backgrounds |
| --opacity-countdown | 0.5 | Countdown digit card backgrounds |
| --blend-award-image | mix-blend-mode: screen | Award card image containers |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1512px (design) | Full viewport width |
| max-width | 1512px | Desktop max |
| background | #00101A | Dark navy page bg |

### Page Sections (Vertical Stack)

| Section | Height | Padding | Notes |
|---------|--------|---------|-------|
| Header | 80px | 12px 144px | Fixed/absolute over hero |
| Hero/Keyvisual | 1392px | - | Full-width bg image + overlay |
| About Content | 1219px | 120px 104px | Within 1152px container |
| Awards Section | auto | 96px 144px | 1224px inner container |
| Sun* Kudos | 500px | centered | 1120px card |
| Footer | auto | 40px 90px | Full-width |

### Layout Structure (ASCII)

```
┌─────────────────────────────────────────────────────────────────┐
│  Page (w: 1512px, bg: #00101A)                                  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Header (h: 80px, px: 144px, py: 12px)                    │  │
│  │  bg: rgba(16,20,23,0.80) - positioned over hero            │  │
│  │  ┌──────┐ ┌─────────────────────────┐  ┌──────────────┐   │  │
│  │  │ Logo │ │ Nav Links (gap: 64px)    │  │ VN | Bell |Av│   │  │
│  │  │52x48 │ │ About|Awards|Kudos      │  │  (gap: 16px) │   │  │
│  │  └──────┘ └─────────────────────────┘  └──────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Hero/Keyvisual (w: 1512px, h: 1392px)                    │  │
│  │  bg: cover image + gradient overlay                        │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────┐                          │  │
│  │  │  ROOT FURTHER Logo (451x200) │                          │  │
│  │  └──────────────────────────────┘                          │  │
│  │  "Coming soon"                                             │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐                    │  │
│  │  │ DD | DD │  │ HH | HH │  │ MM | MM │  (gap: 40px)      │  │
│  │  │  DAYS   │  │  HOURS  │  │ MINUTES │                    │  │
│  │  └─────────┘  └─────────┘  └─────────┘                    │  │
│  │  Date: 26/12/2025    Venue: Au Co Art Center               │  │
│  │  Livestream note                                           │  │
│  │  ┌──────────────┐  ┌──────────────┐  (gap: 40px)          │  │
│  │  │ ABOUT AWARDS │  │ ABOUT KUDOS  │                        │  │
│  │  └──────────────┘  └──────────────┘                        │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  About Content (w: 1152px, p: 120px 104px, r: 8px)        │  │
│  │  ROOT FURTHER logo + body text + quote                     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                          (gap: 120px)           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Awards Section (w: 1224px)                                │  │
│  │  ─────────── divider ───────────                           │  │
│  │  "Sun* annual awards 2025"                                 │  │
│  │  "He thong giai thuong" (57px title)                       │  │
│  │                                      (gap: 80px)           │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │  │
│  │  │Top Talent│  │Top Proj  │  │Top PL    │  (gap: 80px)    │  │
│  │  │ 336px    │  │ 336px    │  │ 336px    │                  │  │
│  │  └──────────┘  └──────────┘  └──────────┘                 │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │  │
│  │  │Best Mgr  │  │Sig 2025  │  │MVP       │  (gap: 80px)    │  │
│  │  │ 336px    │  │ 336px    │  │ 336px    │                  │  │
│  │  └──────────┘  └──────────┘  └──────────┘                 │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                          (gap: 120px)           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Sun* Kudos (w: 1120px, h: 500px, r: 16px, bg: #0F0F0F)  │  │
│  │  ┌─────────────────┐  ┌───────────────────────────────┐   │  │
│  │  │ Content (457px)  │  │  Decorative "KUDOS" + Image  │   │  │
│  │  │ Title + Desc     │  │                              │   │  │
│  │  │ [Chi tiet] btn   │  │                              │   │  │
│  │  └─────────────────┘  └───────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Footer (w: 1512px, p: 40px 90px, border-top: divider)    │  │
│  │  ┌──────┐  ┌──────────────────────┐  ┌────────────────┐  │  │
│  │  │ Logo │  │ Nav Links (gap: 48px)│  │ Copyright      │  │  │
│  │  │69x64 │  │ About|Awards|Kudos|  │  │ Sun* (c) 2025  │  │  │
│  │  └──────┘  └──────────────────────┘  └────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  [Widget Button] (fixed, bottom-right, 106x64px, r: 100px)     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Header (`A1_Header`)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9091` | - |
| width | 100% (1512px design) | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(16, 20, 23, 0.80) | `background: rgba(16, 20, 23, 0.80)` |
| display | flex | `display: flex` |
| justify-content | space-between | `justify-content: space-between` |
| align-items | center | `align-items: center` |
| position | sticky/fixed | `position: sticky; top: 0; z-index: 50` |
| gap (left group) | 64px (logo to nav) | `gap: 64px` |
| gap (right group) | 16px | `gap: 16px` |

**Nav Link States:**
| State | Property | Value |
|-------|----------|-------|
| Normal | color | #FFFFFF |
| Normal | background | transparent |
| Normal | border-radius | 4px |
| Normal | font | Montserrat 16px/24px 700 |
| Hover | background | rgba(255, 255, 255, 0.10) |
| Hover | border-radius | 4px |
| Selected | color | #FFEA9E |
| Selected | border-bottom | 1px solid #FFEA9E |
| Selected | text-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |
| Focus | outline | 2px solid #FFEA9E, offset: 2px |

**Notification Bell (`A1.6`):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I2167:9091;186:2101` | - |
| width | 40px | `width: 40px` |
| height | 40px | `height: 40px` |
| icon-size | 24x24 | `width: 24px; height: 24px` |

**Notification Bell States:**
| State | Property | Value |
|-------|----------|-------|
| Default | color | #FFFFFF |
| Hover | background | rgba(255, 255, 255, 0.10) |
| Hover | border-radius | 4px |
| Focus | outline | 2px solid #FFEA9E, offset: 2px |
| With badge | badge | 8px circle #D4271D, positioned top-right |

**Language Selector States:**
| State | Property | Value |
|-------|----------|-------|
| Default | color | #FFFFFF |
| Hover | background | rgba(255, 255, 255, 0.10) |
| Focus | outline | 2px solid #FFEA9E, offset: 2px |

**Profile Button (`A1.8`):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I2167:9091;186:1597` | - |
| width | 40px | `width: 40px` |
| height | 40px | `height: 40px` |

**Profile Button States:**
| State | Property | Value |
|-------|----------|-------|
| Default | border | 1px solid #998C5F |
| Default | border-radius | 4px |
| Hover | border-color | #FFEA9E |
| Focus | outline | 2px solid #FFEA9E, offset: 2px |

---

### Hero/Keyvisual (`3.5_Keyvisual`)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9027` | - |
| width | 100% (1512px design) | `width: 100%` |
| height | 1392px | `min-height: 100vh` (approximate) |
| background | cover image | `background: url(...) 50% / cover no-repeat` |
| overlay | gradient | `linear-gradient(12deg, #00101A 23.7%, rgba(0, 18, 29, 0.46) 38.34%, rgba(0, 19, 32, 0.00) 48.92%)` |
| content-gap | 40px | `gap: 40px` |

---

### Countdown Timer (`B1_Countdown time`)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9035` | - |
| container width | 1224px | `max-width: 1224px` |
| flex-direction | column | `flex-direction: column` |
| gap | 16px | `gap: 16px` |

**"Coming soon" Label (`B1.2`):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9036` | - |
| font | Montserrat 24px/32px 700 | `font: 700 24px/32px 'Montserrat'` |
| color | #FFEA9E | `color: var(--color-text-primary)` |

**Timer Row (`B1.3`):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9037` | - |
| display | flex | `display: flex` |
| gap | 40px | `gap: 40px` |
| width | 429px | `width: 429px` |
| height | 128px | `height: 128px` |

**Individual Countdown Unit (Days/Hours/Minutes):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | `2167:9038`, `2167:9043`, `2167:9048` | - |
| width | 116px | `width: 116px` |
| height | 128px | `height: 128px` |
| flex-direction | column | `flex-direction: column` |
| gap | 14px | `gap: 14px` |
| justify-content | center | `justify-content: center` |

**Digit Card:**
| Property | Value | CSS |
|----------|-------|-----|
| width | 51.2px | `width: 51.2px` |
| height | 81.92px | `height: 81.92px` |
| border-radius | 8px | `border-radius: 8px` |
| border | 0.5px solid #FFEA9E | `border: 0.5px solid var(--color-text-primary)` |
| background | gradient | `background: linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%)` |
| opacity | 0.5 | `opacity: 0.5` |
| backdrop-filter | blur(16.64px) | `backdrop-filter: blur(16.64px)` |

**Digit Text:**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Digital Numbers | `font-family: 'Digital Numbers', monospace` |
| font-size | 49.15px | `font-size: 49.15px` |
| font-weight | 400 | `font-weight: 400` |
| color | #FFFFFF | `color: white` |

**Unit Label (DAYS/HOURS/MINUTES):**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 24px/32px 700 | `font: 700 24px/32px 'Montserrat'` |
| color | #FFFFFF | `color: white` |
| text-transform | uppercase | `text-transform: uppercase` |

---

### Event Info (`B2_Thong tin su kien`)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9053` | - |
| flex-direction | column | `flex-direction: column` |
| gap | 8px | `gap: 8px` |
| width | 637px | `max-width: 637px` |

**Info Row:**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| gap | 60px | `gap: 60px` |

**Labels** ("Thoi gian:", "Dia diem:"):
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 16px/24px 700 | `font: 700 16px/24px 'Montserrat'` |
| color | #FFFFFF | `color: white` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |

**Values** ("26/12/2025", "Au Co Art Center"):
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 24px/32px 700 | `font: 700 24px/32px 'Montserrat'` |
| color | #FFEA9E | `color: var(--color-text-primary)` |

---

### CTA Buttons (`B3_Call-To-Action`)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9062` | - |
| display | flex | `display: flex` |
| gap | 40px | `gap: 40px` |
| width | 570px | `max-width: 570px` |

**Primary Button ("ABOUT AWARDS") (`B3.1`):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9063` | - |
| width | 276px | `min-width: 276px` |
| height | 60px | `height: 60px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFEA9E | `background: var(--color-text-primary)` |
| border | none | `border: none` |
| border-radius | 8px | `border-radius: 8px` |
| font | Montserrat 22px/28px 700 | `font: 700 22px/28px 'Montserrat'` |
| color | #00101A | `color: var(--color-page-bg)` |
| gap | 8px | `gap: 8px` (text + icon) |
| cursor | pointer | `cursor: pointer` |

**States (Primary):**
| State | Changes |
|-------|---------|
| Default | As described above (gold background) |
| Hover | Same as secondary button style (outline) — buttons swap appearance on hover |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |
| Active | background: #E6D48E (slightly darker gold) |

**Secondary Button ("ABOUT KUDOS") (`B3.2`):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9064` | - |
| width | auto | `min-width: 254px` |
| height | 60px | `height: 60px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | rgba(255, 234, 158, 0.10) | `background: var(--color-secondary-btn-bg)` |
| border | 1px solid #998C5F | `border: 1px solid var(--color-border)` |
| border-radius | 8px | `border-radius: 8px` |
| font | Montserrat 22px/28px 700 | `font: 700 22px/28px 'Montserrat'` |
| color | #FFFFFF | `color: white` |
| gap | 8px | `gap: 8px` (text + icon) |
| cursor | pointer | `cursor: pointer` |

**States (Secondary):**
| State | Changes |
|-------|---------|
| Default | As described above (outline) |
| Hover | Same as primary button style (gold filled) — buttons swap appearance on hover |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |
| Active | background: rgba(255, 234, 158, 0.20) (slightly more opaque) |

---

### About Content Section (`B4_content`)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `5001:14827` | - |
| width | 1152px | `max-width: 1152px` |
| height | 1219px | `height: auto` |
| padding | 120px 104px | `padding: 120px 104px` |
| border-radius | 8px | `border-radius: 8px` |
| flex-direction | column | `flex-direction: column` |
| gap | 32px | `gap: 32px` |
| align-items | center | `align-items: center` |

**Body Text:**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 24px/32px 700 | `font: 700 24px/32px 'Montserrat'` |
| color | #FFFFFF | `color: white` |
| text-align | justify | `text-align: justify` |

**Quote Text:**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 20px/32px 700 italic | `font: italic 700 20px/32px 'Montserrat'` |
| color | #FFFFFF | `color: white` |
| text-align | center | `text-align: center` |

---

### Awards Section Header (`C1_Header Giai thuong`)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9069` | - |
| width | 1224px | `max-width: 1224px` |
| flex-direction | column | `flex-direction: column` |
| gap | 16px | `gap: 16px` |

**Divider:**
| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | `width: 100%` |
| height | 1px | `height: 1px` |
| background | #2E3940 | `background: var(--color-divider)` |

**Caption** ("Sun* annual awards 2025"):
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 24px/32px 700 | `font: 700 24px/32px 'Montserrat'` |
| color | #FFFFFF | `color: white` |

**Section Title** ("He thong giai thuong"):
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 57px/64px 700 | `font: 700 57px/64px 'Montserrat'` |
| color | #FFEA9E | `color: var(--color-text-primary)` |
| letter-spacing | -0.25px | `letter-spacing: -0.25px` |

**Section Description** ("Cac hang muc se duoc trao giai theo TOP nhung nguoi xuat sac nhat."):
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 16px/24px 400 | `font: 400 16px/24px 'Montserrat'` |
| color | #FFFFFF | `color: white` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |

---

### Award Card Grid (`C2_Award list`)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `5005:14974` | - |
| display | grid | `display: grid` |
| grid-template-columns | repeat(3, 336px) | `grid-template-columns: repeat(3, 1fr)` |
| gap | 80px | `gap: 80px` |

---

### Award Card (e.g., `C2.1_Top Talent Award`)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9075` (Top Talent) | - |
| width | 336px | `width: 100%` (in grid context) |
| flex-direction | column | `flex-direction: column` |
| gap | 24px | `gap: 24px` |
| cursor | pointer | `cursor: pointer` |

**Award Thumbnail (`Picture-Award`):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I2167:9075;214:1019` | - |
| width | 336px | `width: 100%; aspect-ratio: 1/1` |
| height | 336px | `height: auto` |
| border-radius | 24px | `border-radius: 24px` |
| border | 0.955px solid #FFEA9E | `border: 1px solid var(--color-text-primary)` |
| box-shadow | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | `box-shadow: var(--shadow-golden-glow)` |
| mix-blend-mode | screen | `mix-blend-mode: screen` |

**Award Title:**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I2167:9075;214:1021` | - |
| font | Montserrat 24px/32px 400 | `font: 400 24px/32px 'Montserrat'` |
| color | #FFEA9E | `color: var(--color-text-primary)` |

**Award Description:**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I2167:9075;214:1022` | - |
| font | Montserrat 16px/24px 400 | `font: 400 16px/24px 'Montserrat'` |
| color | #FFFFFF | `color: white` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| overflow | ellipsis at 2 lines | `display: -webkit-box; -webkit-line-clamp: 2; overflow: hidden` |

**"Chi tiet" Link:**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I2167:9075;214:1023` | - |
| font | Montserrat 16px/24px 500 | `font: 500 16px/24px 'Montserrat'` |
| color | #FFFFFF | `color: white` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| padding | 16px 0 | `padding: 16px 0` |
| gap | 8px | `gap: 8px` (text + arrow icon) |
| icon-size | 24x24 | `width: 24px; height: 24px` |

**"Chi tiet" Link States:**
| State | Changes |
|-------|---------|
| Default | color: #FFFFFF |
| Hover | color: #FFEA9E, text-decoration: underline |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

**Card States:**
| State | Changes |
|-------|---------|
| Default | As described |
| Hover | transform: translateY(-4px); box-shadow: 0 8px 12px 0 rgba(0,0,0,0.3), 0 0 12px 0 #FAE287 |
| Focus-within | outline: 2px solid #FFEA9E, outline-offset: 4px (when any child is focused) |

---

### Sun* Kudos Section (`D1_Sunkudos`)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `3390:10349` | - |
| width | 1224px | `max-width: 1224px` |
| height | 500px | `height: 500px` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |

**Card Background:**
| Property | Value | CSS |
|----------|-------|-----|
| width | 1120px | `max-width: 1120px; width: 100%` |
| height | 500px | `height: 500px` |
| border-radius | 16px | `border-radius: 16px` |
| background | #0F0F0F + bg image | `background: url(...), #0F0F0F` |
| overflow | hidden | `overflow: hidden` |

**Content Area (`D2_Content`):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I3390:10349;313:8419` | - |
| width | 457px | `max-width: 457px` |
| gap | 32px | `gap: 32px` |
| flex-direction | column | `flex-direction: column` |

**Badge Label** ("DIEM MOI CUA SAA 2025"):
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 14px/20px 700 | `font: 700 14px/20px 'Montserrat'` |
| color | #FFFFFF | `color: white` |
| text-transform | uppercase | `text-transform: uppercase` |
| letter-spacing | 0.1px | `letter-spacing: 0.1px` |

**Subtitle** ("Phong trao ghi nhan"):
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 24px/32px 700 | `font: 700 24px/32px 'Montserrat'` |
| color | #FFFFFF | `color: white` |

**Title** ("Sun* Kudos"):
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 57px/64px 700 | `font: 700 57px/64px 'Montserrat'` |
| color | #FFEA9E | `color: var(--color-text-primary)` |
| letter-spacing | -0.25px | `letter-spacing: -0.25px` |

**Body:**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 16px/24px 700 | `font: 700 16px/24px 'Montserrat'` |
| color | #FFFFFF | `color: white` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| text-align | justify | `text-align: justify` |

**CTA Button (`D2.1_Button-IC`):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I3390:10349;313:8426` | - |
| width | 127px | `min-width: 127px` |
| height | 56px | `height: 56px` |
| background | #FFEA9E | `background: var(--color-text-primary)` |
| border-radius | 4px | `border-radius: 4px` |
| padding | 16px | `padding: 16px` |
| gap | 8px | `gap: 8px` |
| font | Montserrat 16px/24px 700 | `font: 700 16px/24px 'Montserrat'` |
| color | #00101A | `color: var(--color-page-bg)` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |

**Kudos CTA Button States:**
| State | Changes |
|-------|---------|
| Default | As described (gold bg, dark text) |
| Hover | background: #E6D48E (slightly darker gold) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |
| Active | background: #D4C47C |

**Decorative "KUDOS" Text:**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | SVN-Gotham | `font-family: 'SVN-Gotham'` |
| font-size | 96.16px | `font-size: 96.16px` |
| line-height | 24.04px | `line-height: 24.04px` |
| font-weight | 400 | `font-weight: 400` |
| color | #DBD1C1 | `color: var(--color-kudos-decorative)` |
| letter-spacing | -13% | `letter-spacing: -0.13em` |

---

### Widget Floating Button (`6_Widget Button`)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `5022:15169` | - |
| width | 106px | `width: 106px` |
| height | 64px | `height: 64px` |
| border-radius | 100px | `border-radius: 100px` |
| background | #FFEA9E | `background: var(--color-text-primary)` |
| padding | 16px | `padding: 16px` |
| gap | 8px | `gap: 8px` |
| position | fixed | `position: fixed; bottom: 24px; right: 19px` |
| box-shadow | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | `box-shadow: var(--shadow-golden-glow)` |
| z-index | 50 | `z-index: 50` |
| cursor | pointer | `cursor: pointer` |

**Widget Button States:**
| State | Changes |
|-------|---------|
| Default | As described |
| Hover | transform: scale(1.05); box-shadow: 0 6px 8px 0 rgba(0,0,0,0.3), 0 0 10px 0 #FAE287 |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 4px |
| Active | transform: scale(0.98) |

---

### Footer (`7_Footer`)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `5001:14800` | - |
| width | 100% (1512px design) | `width: 100%` |
| padding | 40px 90px | `padding: 40px 90px` |
| display | flex | `display: flex` |
| justify-content | space-between | `justify-content: space-between` |
| align-items | center | `align-items: center` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid var(--color-divider)` |

**Logo:**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I5001:14800;342:1408` | - |
| width | 69px | `width: 69px` |
| height | 64px | `height: 64px` |

**Nav Links Row:**
| Property | Value | CSS |
|----------|-------|-----|
| gap | 48px | `gap: 48px` |

**Each Footer Link:**
| Property | Value | CSS |
|----------|-------|-----|
| padding | 16px | `padding: 16px` |
| font | Montserrat 16px/24px 700 | `font: 700 16px/24px 'Montserrat'` |
| color | #FFFFFF | `color: white` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| border-radius | 4px | `border-radius: 4px` |

**Footer Link States:**
| State | Property | Value |
|-------|----------|-------|
| Normal | color | #FFFFFF |
| Normal | background | transparent |
| Hover | background | rgba(255, 255, 255, 0.10) |
| Hover | border-radius | 4px |
| Active/Current | background | rgba(255, 234, 158, 0.10) |
| Active/Current | text-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |
| Focus | outline | 2px solid #FFEA9E, offset: 2px |

**Note:** Footer contains 4 nav links (vs. 3 in header): "About SAA 2025", "Awards Information", "Sun* Kudos", and "Tieu chuan chung". All share the same styling.

**Copyright:**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat Alternates 16px/24px 700 | `font: 700 16px/24px 'Montserrat Alternates'` |
| color | #FFFFFF | `color: white` |
| text-align | center | `text-align: center` |

---

## Component Hierarchy with Styles

```
Page (bg: #00101A, min-h: 100vh)
├── Header (h: 80px, bg: rgba(16,20,23,0.80), px: 144px, sticky, z-50)
│   ├── LeftGroup (flex, gap: 64px, items-center)
│   │   ├── Logo (52x48px, cursor: pointer)
│   │   └── NavLinks (flex, gap: 24px)
│   │       ├── NavLink-Selected (Montserrat 14px/20px 700, #FFEA9E, border-bottom, text-shadow)
│   │       ├── NavLink-Hover (Montserrat 14px/20px 700, #FFF, bg highlight, r: 4px)
│   │       └── NavLink-Normal (Montserrat 16px/24px 700, #FFF, r: 4px)
│   └── RightGroup (flex, gap: 16px, items-center)
│       ├── LanguageBtn ("VN", Montserrat 16px 700, gap: 2px)
│       ├── NotificationBtn (40x40px, bell icon, red badge: 8px circle #D4271D)
│       └── ProfileBtn (40x40px, border: 1px #998C5F, r: 4px)
│
├── HeroSection (w: 100%, h: 1392px, relative)
│   ├── BackgroundImage (cover, absolute)
│   ├── GradientOverlay (linear-gradient, absolute)
│   └── Content (relative, px: 144px, py: 96px, gap: 40px)
│       ├── RootFurtherLogo (451x200px, img)
│       ├── CountdownSection (gap: 16px)
│       │   ├── ComingSoon (Montserrat 24px/32px 700, #FFEA9E)
│       │   └── TimerRow (flex, gap: 40px, w: 429px)
│       │       ├── Unit-Days (w: 116px, h: 128px, flex-col, gap: 14px)
│       │       │   ├── DigitPair (flex, gap: 14px)
│       │       │   │   ├── DigitCard (51.2x81.92, r: 8px, border: 0.5px #FFEA9E, glass bg)
│       │       │   │   └── DigitCard (same)
│       │       │   └── Label "DAYS" (Montserrat 24px/32px 700, #FFF)
│       │       ├── Unit-Hours (same structure)
│       │       └── Unit-Minutes (same structure)
│       ├── EventInfo (flex-col, gap: 8px, w: 637px)
│       │   ├── InfoRow (flex, gap: 60px)
│       │   │   ├── DateGroup: label (16px 700 #FFF) + value (24px 700 #FFEA9E)
│       │   │   └── VenueGroup: label (16px 700 #FFF) + value (24px 700 #FFEA9E)
│       │   └── LivestreamNote (16px 700 #FFF)
│       └── CTAButtons (flex, gap: 40px)
│           ├── PrimaryBtn (276x60, bg: #FFEA9E, r: 8px, 22px 700 #00101A)
│           └── SecondaryBtn (auto x60, bg: rgba(#FFEA9E, 0.1), border: 1px #998C5F, r: 8px, 22px 700 #FFF)
│
├── AboutSection (w: 1152px, p: 120px 104px, r: 8px, gap: 32px, mx: auto)
│   ├── RootFurtherLogo (small version)
│   ├── BodyText (24px/32px 700, #FFF, text-justify)
│   └── QuoteText (20px/32px 700 italic, #FFF, text-center)
│
├── AwardsSection (w: 1224px, mx: auto, gap: 80px)
│   ├── SectionHeader (flex-col, gap: 16px)
│   │   ├── Divider (h: 1px, bg: #2E3940)
│   │   ├── Caption (24px/32px 700, #FFF)
│   │   └── Title (57px/64px 700, #FFEA9E, ls: -0.25px)
│   └── CardGrid (grid, 3-col, gap: 80px)
│       └── AwardCard (w: 336px, flex-col, gap: 24px) x6
│           ├── Thumbnail (336x336, r: 24px, border: 1px #FFEA9E, golden-glow shadow)
│           ├── TextGroup (flex-col, gap: 4px)
│           │   ├── Title (24px/32px 400, #FFEA9E)
│           │   └── Description (16px/24px 400, #FFF, line-clamp-2)
│           └── DetailLink (16px/24px 500, #FFF, flex, gap: 8px, py: 16px)
│
├── KudosSection (w: 1224px, mx: auto)
│   └── Card (w: 1120px, h: 500px, r: 16px, bg: #0F0F0F + image)
│       ├── Content (w: 457px, gap: 32px, flex-col)
│       │   ├── Subtitle (24px/32px 700, #FFF)
│       │   ├── Title (57px/64px 700, #FFEA9E)
│       │   ├── Body (16px/24px 700, #FFF, text-justify)
│       │   └── CTABtn (127x56, bg: #FFEA9E, r: 4px, 16px 700 #00101A)
│       └── Decorative ("KUDOS" SVN-Gotham 96px, #DBD1C1 + illustration)
│
├── Footer (w: 100%, p: 40px 90px, border-top: 1px #2E3940, flex, between)
│   ├── LeftGroup (flex, gap: 80px, items-center)
│   │   ├── Logo (69x64px)
│   │   └── NavLinks (flex, gap: 48px)
│   │       └── Link (p: 16px, 16px/24px 700, #FFF, r: 4px)
│   └── Copyright (Montserrat Alternates 16px/24px 700, #FFF)
│
└── WidgetButton (fixed, bottom-right, 106x64px, r: 100px, bg: #FFEA9E, golden-glow shadow, z-50)
    ├── PenIcon (24x24)
    ├── Separator "/"
    └── SAAIcon (20x18)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 639px |
| Tablet | 640px | 1023px |
| Desktop | 1024px | ∞ |

### Responsive Changes

#### Mobile (< 640px)

| Component | Property | Value |
|-----------|----------|-------|
| Header | padding | 12px 16px |
| Header | nav links | Hidden; show hamburger menu icon (24x24) |
| Header | logo | 40x37px |
| Hero | min-height | auto (content-driven) |
| Hero | padding | 48px 16px |
| Hero | ROOT FURTHER logo | max-width: 280px |
| Countdown | gap between units | 16px |
| Countdown | digit card size | 38px x 60px |
| Countdown | digit font-size | 36px |
| CTA Buttons | flex-direction | column |
| CTA Buttons | width | 100% each |
| CTA Buttons | gap | 16px |
| Event Info | flex-direction | column (stacked) |
| Event Info | gap | 4px |
| About Content | padding | 48px 16px |
| About Content | body font-size | 16px/24px |
| Award Grid | grid-template-columns | repeat(2, 1fr) |
| Award Grid | gap | 24px |
| Award Card | thumbnail | aspect-ratio: 1/1, width: 100% |
| Section Title | font-size | 32px/40px |
| Kudos Section | flex-direction | column |
| Kudos Section | height | auto |
| Kudos Section | card width | 100% |
| Footer | flex-direction | column |
| Footer | padding | 24px 16px |
| Footer | text-align | center |
| Footer | gap | 24px |
| Widget Button | width | 80px |
| Widget Button | height | 48px |

#### Tablet (640px - 1023px)

| Component | Property | Value |
|-----------|----------|-------|
| Header | padding | 12px 48px |
| Header | nav links | Visible (smaller gap: 24px) |
| Hero | padding | 64px 48px |
| Award Grid | grid-template-columns | repeat(2, 1fr) |
| Award Grid | gap | 40px |
| Section Title | font-size | 40px/48px |
| Kudos Section | card width | 100% |
| Kudos Section | content width | 50% |
| Footer | padding | 32px 48px |

#### Desktop (>= 1024px)

| Component | Property | Value |
|-----------|----------|-------|
| All | - | Full design specifications as documented above |
| Container | max-width | 1512px, centered |
| Header | padding | 12px 144px |
| Award Grid | grid-template-columns | repeat(3, 1fr) |
| Award Grid | gap | 80px |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| icon-bell | 24x24 | #FFFFFF | Notification button |
| icon-chevron-down | 16x16 | #FFFFFF | Language dropdown indicator |
| icon-user | 24x24 | #FFFFFF | Profile button |
| icon-arrow-right | 24x24 | varies | CTA buttons, "Chi tiet" links |
| icon-pen | 24x24 | #00101A | Widget button |
| icon-saa-logo | 20x18 | #00101A | Widget button |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Nav Link | background-color, border-bottom | 150ms | ease-in-out | Hover/Select |
| CTA Button | background-color, border, color | 200ms | ease-in-out | Hover |
| Award Card | transform (translateY), box-shadow | 200ms | ease-out | Hover |
| Countdown Digit | content change | instant | - | Timer tick |
| Widget Button | transform (scale) | 150ms | ease-out | Hover |
| Dropdown | opacity, transform | 150ms | ease-out | Open/Close |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Header | 2167:9091 | `sticky top-0 z-50 flex items-center justify-between h-20 bg-[rgba(16,20,23,0.8)]` | `<Header />` |
| Nav Link (Selected) | I2167:9091;186:1579 | `text-[#FFEA9E] border-b border-[#FFEA9E]` | `<NavLink active />` |
| Nav Link (Normal) | I2167:9091;186:1593 | `text-white hover:bg-white/10 rounded` | `<NavLink />` |
| Hero Section | 2167:9027 | `relative w-full min-h-screen bg-cover bg-center` | `<HeroSection />` |
| Countdown | 2167:9037 | `flex gap-10` | `<CountdownTimer />` |
| Digit Card | - | `w-[51px] h-[82px] rounded-lg border-[0.5px] border-[#FFEA9E] backdrop-blur-[16px]` | `<DigitCard />` |
| CTA Primary | 2167:9063 | `bg-[#FFEA9E] text-[#00101A] rounded-lg px-6 py-4 font-bold` | `<Button variant="primary" />` |
| CTA Secondary | 2167:9064 | `bg-[#FFEA9E]/10 border border-[#998C5F] text-white rounded-lg px-6 py-4 font-bold` | `<Button variant="outline" />` |
| Award Card | 2167:9075 | `flex flex-col gap-6 cursor-pointer group` | `<AwardCard />` |
| Award Image | I2167:9075;214:1019 | `aspect-square rounded-3xl border border-[#FFEA9E] shadow-[golden-glow]` | `<AwardCard.Image />` |
| Kudos Section | 3390:10349 | `max-w-[1120px] h-[500px] rounded-2xl bg-[#0F0F0F]` | `<KudosSection />` |
| Widget Button | 5022:15169 | `fixed bottom-6 right-5 w-[106px] h-16 rounded-full bg-[#FFEA9E] shadow-[golden-glow] z-50` | `<WidgetButton />` |
| Footer | 5001:14800 | `w-full px-[90px] py-10 border-t border-[#2E3940] flex justify-between items-center` | `<Footer />` |
| Section Title | 2167:9069 | `text-[57px] leading-[64px] font-bold text-[#FFEA9E] tracking-[-0.25px]` | `<SectionTitle />` |

---

## Notes

- **Typo in design**: The Figma design shows "Comming soon" (double 'm'). Implementation MUST use the correct spelling "Coming soon".
- All colors should use CSS variables for theming support and potential dark/light mode
- Prefer Tailwind utility classes as the project uses Tailwind CSS v4
- Fonts required: Montserrat (primary), Digital Numbers (countdown), Montserrat Alternates (copyright), SVN-Gotham (decorative)
- Montserrat and Montserrat Alternates can be loaded via Google Fonts; Digital Numbers and SVN-Gotham need local font files
- Ensure color contrast meets WCAG AA (4.5:1 for normal text) — gold (#FFEA9E) on dark (#00101A) passes at ~13.5:1; white (#FFFFFF) on dark at ~18.1:1
- **Global focus style**: All interactive elements MUST have a visible focus indicator: `outline: 2px solid #FFEA9E; outline-offset: 2px`. This applies to nav links, buttons, cards, and all clickable elements.
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags
- The hero background image and award thumbnails should be served via `next/image` for optimization
- The frosted glass effect on countdown digits uses `backdrop-filter: blur()` which is well-supported in modern browsers
- The Sun* Kudos section has an additional "DIEM MOI CUA SAA 2025" badge label not present in all Figma item descriptions but visible in the screenshot
