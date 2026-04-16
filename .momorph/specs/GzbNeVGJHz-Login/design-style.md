# Design Style: Login

**Frame ID**: `GzbNeVGJHz`
**Frame Name**: `Login`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-04-16

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-page | #00101A | 100% | Page background (very dark navy) |
| --color-bg-header | #0B0F12 | 80% | Header bar background |
| --color-bg-button-primary | #FFEA9E | 100% | Login button background (golden) |
| --color-text-primary | #FFFFFF | 100% | Body text, labels, footer text |
| --color-text-button | #00101A | 100% | Login button text (dark on gold) |
| --color-border-footer | #2E3940 | 100% | Footer top border |
| --color-gradient-left | #00101A | 100% | Left-side gradient overlay (solid) |
| --color-gradient-bottom | #00101A | 100% | Bottom gradient overlay |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-hero-content | Montserrat | 20px | 700 | 40px | 0.5px |
| --text-button-login | Montserrat | 22px | 700 | 28px | 0px |
| --text-lang-selector | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-footer | Montserrat Alternates | 16px | 700 | 24px | 0% |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-px | 144px | Horizontal page padding (hero, header) |
| --spacing-page-py | 96px | Vertical hero padding |
| --spacing-header-py | 12px | Header vertical padding |
| --spacing-hero-gap | 80px | Gap between key visual and content |
| --spacing-content-gap | 24px | Gap between text and button in content area |
| --spacing-button-px | 24px | Login button horizontal padding |
| --spacing-button-py | 16px | Login button vertical padding |
| --spacing-button-inner-gap | 8px | Gap between text and icon in button |
| --spacing-footer-px | 90px | Footer horizontal padding |
| --spacing-footer-py | 40px | Footer vertical padding |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-button | 8px | Login button |
| --radius-lang | 4px | Language selector |
| --border-footer | 1px solid #2E3940 | Footer top border |

### Shadows

No explicit box-shadows defined in this frame. Interactive states (hover) should use subtle elevation.

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px | Desktop design width |
| height | 1024px | Desktop design height |
| background | #00101A | Dark navy page background |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Page (1440x1024, bg: #00101A)                                       │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  Header (w:1440, h:80, px:144, py:12, bg:#0B0F12/80%)          ││
│  │  ┌────────┐                                      ┌────────────┐││
│  │  │ Logo   │         (flex space-between)          │ VN ▼       │││
│  │  │ 52x48  │                                      │ 108x56     │││
│  │  └────────┘                                      └────────────┘││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  Keyvisual Background (1441x1022, absolute, z:1)                ││
│  │  ┌──────────────────────────────────────────────────────────────┐││
│  │  │  Background image (cover, cropped center)                    │││
│  │  └──────────────────────────────────────────────────────────────┘││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  Gradient Left (90deg: #00101A 0-25%, transparent 100%)         ││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  Hero Cover (w:1440, h:845, px:144, py:96, flex-col, gap:120)  ││
│  │                                                                  ││
│  │  ┌──────────────────────────────────────────────────────────┐   ││
│  │  │  Inner (w:1152, h:653, flex-col, gap:80, justify:center) │   ││
│  │  │                                                          │   ││
│  │  │  ┌──────────────────────────────────────┐                │   ││
│  │  │  │  Key Visual (w:1152, h:200)           │                │   ││
│  │  │  │  ROOT FURTHER logo (451x200)          │                │   ││
│  │  │  └──────────────────────────────────────┘                │   ││
│  │  │                  gap: 80px                               │   ││
│  │  │  ┌──────────────────────────────────────┐                │   ││
│  │  │  │  Content (w:496, h:164, pl:16)        │                │   ││
│  │  │  │                                       │                │   ││
│  │  │  │  Text (w:480, h:80)                   │                │   ││
│  │  │  │  "Bắt đầu hành trình..."              │                │   ││
│  │  │  │  "Đăng nhập để khám phá!"             │                │   ││
│  │  │  │             gap: 24px                  │                │   ││
│  │  │  │  Login Button (w:305, h:60)            │                │   ││
│  │  │  │  ┌─────────────────────────────┐       │                │   ││
│  │  │  │  │ LOGIN With Google  [G]      │       │                │   ││
│  │  │  │  │ bg:#FFEA9E, r:8px           │       │                │   ││
│  │  │  │  └─────────────────────────────┘       │                │   ││
│  │  │  └──────────────────────────────────────┘                │   ││
│  │  └──────────────────────────────────────────────────────────┘   ││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  Gradient Bottom (0deg: #00101A 22%, transparent 52%)           ││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  Footer (w:1440, px:90, py:40, border-top: 1px #2E3940)        ││
│  │                  "Bản quyền thuộc về Sun* © 2025"               ││
│  └──────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Header (A_Header)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14391 | - |
| width | 1440px (full) | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | #0B0F12 / 80% | `background-color: rgba(11, 15, 18, 0.8)` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| position | fixed (top) | `position: fixed; top: 0; z-index: 50` |

### Logo (A.1_Logo)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I662:14391;186:2166 | - |
| width | 52px | `width: 52px` |
| height | 56px | `height: 56px` |
| content | Image (cover) | `next/image` component |

### Language Selector (A.2_Language)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I662:14391;186:1601 | - |
| width | 108px | `width: auto` |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| gap | 2px (inner) | `gap: 2px` |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| color | #FFFFFF | `color: white` |

**States:**
| State | Changes |
|-------|---------|
| Default | transparent background |
| Hover | highlight background, cursor: pointer |
| Active (dropdown open) | background slightly lighter |

### Hero Content Text (B.2_content)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14753 | - |
| width | 480px | `max-width: 480px` |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 20px | `font-size: 20px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 40px | `line-height: 40px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #FFFFFF | `color: white` |

### Login Button (B.3_Login)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14425 (container), 662:14426 (button) | - |
| width | 305px | `width: auto; min-width: 305px` |
| height | 60px | `height: 60px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border-radius | 8px | `border-radius: 8px` |
| gap | 8px | `gap: 8px` |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #00101A | `color: #00101A` |
| cursor | pointer | `cursor: pointer` |
| icon | Google logo (24x24) | Icon component |

**States:**
| State | Changes |
|-------|---------|
| Default | background: #FFEA9E |
| Hover | slight elevation, shadow, brightness increase |
| Active | background slightly darker |
| Loading | opacity: 0.7, cursor: wait, spinner visible |
| Disabled | opacity: 0.5, cursor: not-allowed |

### Footer (D_Footer)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14447 | - |
| width | 1440px (full) | `width: 100%` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid #2E3940` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| font-family | Montserrat Alternates | `font-family: 'Montserrat Alternates'` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| color | #FFFFFF | `color: white` |

---

## Component Hierarchy with Styles

```
Page (bg: #00101A, w: 100vw, h: 100vh, relative, overflow: hidden)
├── Keyvisual (absolute, inset: 0, z: 1)
│   └── BackgroundImage (object-fit: cover, object-position: center)
│
├── GradientLeft (absolute, inset: 0, z: 2)
│   └── linear-gradient(90deg, #00101A 0%, #00101A 25.41%, transparent 100%)
│
├── GradientBottom (absolute, inset: 0, z: 3)
│   └── linear-gradient(0deg, #00101A 22.48%, transparent 51.74%)
│
├── Header (fixed, top: 0, z: 50, w: 100%, h: 80px, px: 144px, py: 12px)
│   │  bg: rgba(11,15,18,0.8), flex, items-center, justify-between
│   ├── Logo (w: 52px, h: 48px, next/image)
│   └── LanguageSelector (flex, items-center, gap: 2px, px: 16px, r: 4px)
│       ├── FlagIcon (w: 24px, h: 24px)
│       ├── Text "VN" (Montserrat 16/700, white)
│       └── ChevronDown (w: 24px, h: 24px)
│
├── HeroCover (relative, z: 10, px: 144px, py: 96px, flex-col)
│   └── Inner (flex-col, gap: 80px, justify-center)
│       ├── KeyVisual (w: 100%, max-w: 1152px)
│       │   └── RootFurtherLogo (w: 451px, h: 200px, next/image)
│       │
│       └── ContentArea (pl: 16px, flex-col, gap: 24px, max-w: 496px)
│           ├── HeroText (Montserrat 20/700, lh: 40px, ls: 0.5px, white)
│           │   ├── "Bắt đầu hành trình của bạn cùng SAA 2025."
│           │   └── "Đăng nhập để khám phá!"
│           │
│           └── LoginButton (w: 305px, h: 60px, px: 24px, py: 16px)
│               │  bg: #FFEA9E, r: 8px, flex, items-center, gap: 8px
│               ├── Text "LOGIN With Google" (Montserrat 22/700, #00101A)
│               └── GoogleIcon (w: 24px, h: 24px)
│
└── Footer (fixed, bottom: 0, z: 50, w: 100%, px: 90px, py: 40px)
    │  border-top: 1px solid #2E3940, flex, items-center, justify-between
    └── CopyrightText (Montserrat Alternates 16/700, white)
        └── "Bản quyền thuộc về Sun* © 2025"
```

---

## Responsive Specifications

### Breakpoints (per Constitution)

| Name | Min Width | Tailwind |
|------|-----------|----------|
| Mobile | 0 | base |
| Tablet SM | 640px | `sm:` |
| Tablet MD | 768px | `md:` |
| Desktop | 1024px | `lg:` |
| Desktop XL | 1280px | `xl:` |

### Responsive Changes

#### Mobile (< 640px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 16px; height: auto |
| Hero Cover | padding: 48px 16px |
| Key Visual | ROOT FURTHER logo scales to ~80% width |
| Content Text | font-size: 16px; line-height: 32px; max-width: 100% |
| Login Button | width: 100%; font-size: 18px |
| Footer | padding: 24px 16px; text-align: center |

#### Tablet (640px - 1023px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 48px |
| Hero Cover | padding: 64px 48px |
| Content Text | font-size: 18px |
| Login Button | width: auto; min-width: 280px |
| Footer | padding: 32px 48px |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| All | Design as specified (1440px reference) |
| Container | max-width scales with viewport |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| SAA Logo | 52x48 | (image) | Header top-left |
| VN Flag | 20x15 | (image) | Language selector flag |
| Chevron Down | 24x24 | #FFFFFF | Language dropdown arrow |
| Google Logo | 24x24 | (original colors) | Login button icon |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Login Button | background-color, box-shadow | 150ms | ease-in-out | Hover |
| Login Button | opacity | 200ms | ease-in-out | Loading state |
| Language Selector | background-color | 150ms | ease-in-out | Hover |
| Language Dropdown | opacity, transform | 150ms | ease-out | Toggle |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Page | 662:14387 | `relative min-h-screen bg-[#00101A] overflow-hidden` | `<LoginPage>` |
| Keyvisual BG | 662:14388 | `absolute inset-0 z-[1]` | `<Image>` (next/image, fill, cover) |
| Gradient Left | 662:14392 | `absolute inset-0 z-[2] bg-gradient-to-r from-[#00101A] via-[#00101A] to-transparent` | `<div>` |
| Gradient Bottom | 662:14390 | `absolute inset-0 z-[3] bg-gradient-to-t from-[#00101A] to-transparent` | `<div>` |
| Header | 662:14391 | `fixed top-0 z-50 w-full h-20 px-36 py-3 bg-[#0B0F12]/80 flex items-center justify-between` | `<Header>` |
| Logo | I662:14391;186:2166 | `w-[52px] h-12` | `<Image>` |
| Language Toggle | I662:14391;186:1601 | `flex items-center gap-0.5 px-4 rounded cursor-pointer` | `<LanguageSelector>` |
| Hero Cover | 662:14393 | `relative z-10 px-36 py-24 flex flex-col` | `<section>` |
| Key Visual | 662:14395 | `w-full max-w-[1152px]` | `<Image>` |
| Hero Text | 662:14753 | `max-w-[480px] font-montserrat text-xl font-bold leading-[40px] tracking-[0.5px] text-white` | `<p>` |
| Login Button | 662:14426 | `flex items-center gap-2 px-6 py-4 bg-[#FFEA9E] rounded-lg` | `<LoginButton>` |
| Button Text | I662:14426;186:1568 | `font-montserrat text-[22px] font-bold leading-7 text-[#00101A]` | `<span>` |
| Google Icon | I662:14426;186:1766 | `w-6 h-6` | `<GoogleIcon>` |
| Footer | 662:14447 | `fixed bottom-0 z-50 w-full px-[90px] py-10 border-t border-[#2E3940] flex items-center justify-between` | `<Footer>` |
| Copyright | I662:14447;342:1413 | `font-['Montserrat_Alternates'] text-base font-bold text-white` | `<span>` |

---

## Notes

- Fonts required: **Montserrat** (700) and **Montserrat Alternates** (700) — load via Google Fonts
- Background image for key visual should use `next/image` with `fill` and `priority` for LCP
- Gradient overlays use CSS gradients layered with `z-index` — no additional images needed
- All colors use custom hex values — define as Tailwind theme extensions or CSS variables
- The header should use `backdrop-blur` for a glass-morphism effect to complement the 80% opacity background
