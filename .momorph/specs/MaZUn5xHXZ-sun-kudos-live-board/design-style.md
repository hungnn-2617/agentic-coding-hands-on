# Design Style: Sun* Kudos - Live Board

**Frame ID**: `MaZUn5xHXZ`
**Frame Name**: `Sun* Kudos - Live board`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/MaZUn5xHXZ
**Extracted At**: 2026-04-20

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|---|---|---|---|
| --color-bg-page | #00101A | 100% | Page background (dark theme) `rgba(0, 16, 26, 1)` |
| --color-bg-header | #101417 | 80% | Header background (semi-transparent) `rgba(16, 20, 23, 0.8)` |
| --color-bg-card | #FFF8E1 | 100% | Kudo card backgrounds (warm cream) `rgba(255, 248, 225, 1)` |
| --color-bg-card-highlight | #FFF8E1 | 100% | Highlight Kudo card background (warm cream) |
| --color-bg-sidebar | #00070C | 100% | Sidebar card backgrounds `rgba(0, 7, 12, 1)` |
| --color-bg-spotlight | #00101A | 70% overlay | Spotlight Board canvas (dark bg + 70% black overlay) |
| --color-bg-kv-gradient | linear-gradient(25deg, #00101A 14.74%, rgba(0,19,32,0) 47.8%) | - | KV Banner gradient overlay on image |
| --color-accent-gold | #FFEA9E | 100% | Active nav, gold accents, primary CTA, star rating, stat values `rgba(255, 234, 158, 1)` |
| --color-accent-gold-10 | #FFEA9E | 10% | Secondary button backgrounds `rgba(255, 234, 158, 0.10)` |
| --color-accent-gold-40 | #FFEA9E | 40% | Content quote box background `rgba(255, 234, 158, 0.40)` |
| --color-text-primary | #FFFFFF | 100% | Headings on dark background, nav text |
| --color-text-dark | #00101A | 100% | Text on light card backgrounds (names, content, buttons) |
| --color-text-secondary | #999999 | 100% | Muted text: badge levels, timestamps, pagination `rgba(153, 153, 153, 1)` |
| --color-text-heading | #FFEA9E | 100% | Section headings (HIGHLIGHT KUDOS, ALL KUDOS, SPOTLIGHT BOARD) - gold |
| --color-text-subtitle | #FFFFFF | 100% | Section subtitles ("Sun* Annual Awards 2025") |
| --color-text-hashtag | #D4271D | 100% | Hashtag text on cards (red) `rgba(212, 39, 29, 1)` |
| --color-text-kudo-content | #00101A | 100% | Kudo message text on card |
| --color-text-kv-title | #FFEA9E | 100% | KV Banner title text (gold) |
| --color-text-kudos-logo | #DBD1C1 | 100% | "KUDOS" logo text (warm beige) `rgba(219, 209, 193, 1)` |
| --color-heart-inactive | #999999 | 100% | Heart icon when not liked (grey) |
| --color-heart-active | #FF4D4D | 100% | Heart icon when liked (red) |
| --color-border | #998C5F | 100% | Standard card borders, button borders, dropdown borders |
| --color-border-highlight | #FFEA9E | 100% | Highlight card thick gold border, content quote box, image borders |
| --color-border-card | #2E3940 | 100% | Divider lines, footer top border `rgba(46, 57, 64, 1)` |
| --color-divider-gold | #FFEA9E | 100% | Gold divider lines within cards |
| --color-nav-active | #FFEA9E | 100% | Active nav text and border underline |
| --color-nav-glow | #FAE287 | 100% | Active nav text-shadow glow |
| --color-badge-hero | #FFF3C6 | 100% | Hero badge background `rgba(255, 243, 198, 1)` |
| --color-name-highlight | #F17676 | 100% | Highlighted person name (pink-red) `rgba(241, 118, 118, 1)` |
| --color-error-badge | #D4271D | 100% | Notification dot `rgba(212, 39, 29, 1)` |
| --color-overlay-spotlight | rgba(0,0,0,0.7) | 70% | Dark overlay on Spotlight Board image |
| --color-avatar-fallback | #EEEEEE | 100% | Avatar placeholder background |

### CSS Variable Tokens (Figma Design System)

| Variable | Fallback | Usage |
|---|---|---|
| --Details-Background | #00101A | Page background, fade gradients |
| --Details-Container-2 | #00070C | Sidebar card backgrounds |
| --Details-Text-Primary-1 | #FFEA9E | Primary gold text, borders on highlight cards, active nav |
| --Details-Text-Secondary-1 | #FFF | White text, avatar borders |
| --Details-Text-Secondary-2 | #999 | Muted text (pagination, timestamps, badge levels) |
| --Details-Border | #998C5F | General card/button borders (muted gold) |
| --Details-Divider | #2E3940 | Section dividers, footer top border |
| --Details-PrimaryButton-Hover | #FFF8E1 | Kudo card background (cream) |
| --Details-SecondaryButton-Normal | rgba(255, 234, 158, 0.10) | Button backgrounds (10% gold) |
| --Details-ButtonSecondary-Hover | rgba(255, 234, 158, 0.40) | Content quote box background (40% gold) |
| --Details-TextButton-Normal | rgba(0, 0, 0, 0.00) | Transparent icon button background |

### Typography

All text uses **Montserrat** font family (weight 700 Bold is the default) unless noted otherwise.

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|---|
| --text-section-title | Montserrat | 57px | 700 | 64px | -0.25px | Section headings: "HIGHLIGHT KUDOS", "SPOTLIGHT BOARD", "ALL KUDOS" (gold #FFEA9E) |
| --text-kv-title | Montserrat | 36px | 700 | 44px | 0px | KV Banner subtitle "He thong ghi nhan va cam on" (gold #FFEA9E) |
| --text-kv-logo | SVN-Gotham | 139.78px | 400 | 34.95px | -13% | "KUDOS" logo text (warm beige #DBD1C1) |
| --text-spotlight-count | Montserrat | 36px | 700 | 44px | 0px | "388 KUDOS" count on Spotlight (white) |
| --text-sidebar-value | Montserrat | 32px | 700 | 40px | 0px | Sidebar stat values "25" (gold #FFEA9E) |
| --text-carousel-page | Montserrat | 28px | 700 | 36px | 0px | "2/5" carousel page indicator (#999) |
| --text-section-subtitle | Montserrat | 24px | 700 | 32px | 0px | "Sun* Annual Awards 2025" above each section (white) |
| --text-highlight-heart | Montserrat | 24px | 700 | 32px | 0px | Heart like count on highlight cards (#00101A) |
| --text-sidebar-label | Montserrat | 22px | 700 | 28px | 0px | Sidebar stat labels "So Kudos ban nhan duoc:" (white) |
| --text-sidebar-heading | Montserrat | 22px | 700 | 28px | 0px | "10 SUNNER NHAN QUA MOI NHAT" (gold #FFEA9E) |
| --text-sidebar-name | Montserrat | 22px | 700 | 28px | 0px | Leaderboard member names (gold #FFEA9E) |
| --text-btn-open-gift | Montserrat | 22px | 700 | 28px | 0px | "Mo Secret Box" button text (#00101A) |
| --text-card-content | Montserrat | 20px | 700 | 32px | 0px | Kudo message body text (justified, #00101A) |
| --text-card-name | Montserrat | 16px | 700 | 24px | 0.15px | Sender/receiver names on cards (#00101A) |
| --text-card-timestamp | Montserrat | 16px | 700 | 24px | 0.5px | "10:00 - 10/30/2025" (#999) |
| --text-card-hashtag-label | Montserrat | 16px | 700 | 24px | 0.5px | "IDOL GIOI TRE" category label (#00101A) |
| --text-cta-placeholder | Montserrat | 16px | 700 | 24px | 0.15px | CTA field placeholder text (white) |
| --text-nav | Montserrat | 16px | 700 | 24px | 0.15px | Header nav text (white / gold active) |
| --text-sidebar-prize | Montserrat | 16px | 700 | 24px | 0.15px | Prize description text (white) |
| --text-card-hashtag | Montserrat | 16px | 700 | 24px | 0.5px | "#Dedicated #Inspiring..." hashtag list (#D4271D red) |
| --text-card-action | Montserrat | 16px | 700 | 24px | 0.15px | "Copy Link", "Xem chi tiet" (#00101A) |
| --text-card-dept | Montserrat | 14px | 700 | 20px | 0.1px | Badge level codes "CECV2" (#999) |
| --text-filter-btn | Montserrat | 14px | 700 | 20px | 0.1px | Filter dropdown button labels, ticker text (white) |
| --text-footer | Montserrat Alternates | 16px | 700 | 24px | 0px | Footer copyright text (white) |

#### Special Font: SVN-Gotham
The "KUDOS" logo uses SVN-Gotham at 139.78px, weight 400, with letter-spacing -13% and line-height 34.95px. Color is warm beige `#DBD1C1`.

#### Hero Badge Typography (Scaled)
| Badge | Font Size | Line-Height | Letter-Spacing | Text Shadow |
|---|---|---|---|---|
| Rising Hero | 11.365px | 16.235px | 0.081px | `0 0.386px 1.543px #000` |
| Super Hero | 11.639px | 16.627px | 0.083px | `0 0.395px 1.58px #000` |
| Legend Hero | 12.821px | 17px | 0.092px | `0 0 1.3px #FFF` (glow) |
| New Hero | 11.404px | 16.292px | 0.081px | none |

### Text Effects

| Effect | Value | Usage |
|---|---|---|
| Active nav glow | `text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Active navigation text (golden glow) |
| Hero badge shadow | `text-shadow: 0 0.386px 1.543px #000` | Hero badge text on cards |
| Legend badge glow | `text-shadow: 0 0 1.3px #FFF` | Legend Hero badge (white glow) |
| Heart multiplier | `-webkit-text-stroke: 1.04px #000` | "x2" special day indicator (17.538px/23.385px, white) |

### Spacing

#### Gap Values
| Token Name | Value | Usage |
|---|---|---|
| --spacing-section-gap | 120px | Between major Bia (main content) sections |
| --spacing-section-header-to-content | 40px | Section header to content gap |
| --spacing-carousel-gap | 24px | Gap between carousel cards |
| --spacing-card-inner-gap | 16px | Gap between elements within a card |
| --spacing-card-list-gap | 24px | Gap between Kudo cards in the feed |
| --spacing-sidebar-gap | 24px | Gap between sidebar sections |
| --spacing-sidebar-stat-gap | 8px | Gap between stat rows within stats card |
| --spacing-sidebar-stat-row-h | 40px | Height of each stat row |
| --spacing-sidebar-sunner-gap | 8px | Gap between leaderboard Sunner items |
| --spacing-user-info-gap | 24px | Gap between sender/arrow/receiver in card header |
| --spacing-user-info-inner | 13px | Gap between avatar and name column |
| --spacing-name-badge-gap | 2px | Gap between name and badge info |
| --spacing-action-bar-gap | 24px | Gap between action buttons in highlight cards |
| --spacing-btn-icon-text-gap | 4px | Gap between icon and text in buttons |
| --spacing-pagination-gap | 32px | Gap between pagination controls (arrows + number) |
| --spacing-logo-nav-gap | 64px | Gap between logo and nav links in header |
| --spacing-footer-links-gap | 80px | Gap between footer nav link groups |
| --spacing-two-column-gap | 80px | Gap between All Kudos feed and sidebar |
| --spacing-hashtag-gap | 8px | Gap between hashtag tags |
| --spacing-image-gap | 16px | Gap between image thumbnails on cards |

#### Padding Values
| Token Name | Value | Usage |
|---|---|---|
| --spacing-page-padding-x | 144px | Page horizontal padding (content max-width via `0 144px`) |
| --spacing-header-padding | 12px 144px | Header internal padding |
| --spacing-bia-padding | 96px 0 120px 0 | Main content wrapper (Bia) padding |
| --spacing-highlight-card-padding | 24px 24px 16px 24px | Highlight Kudo card (top right bottom left) |
| --spacing-allkudo-card-padding | 40px 40px 16px 40px | All Kudos post card (top right bottom left) |
| --spacing-content-quote-padding | 16px 24px | Content quote box padding |
| --spacing-cta-padding | 24px 16px | CTA button (recognition, search) padding |
| --spacing-sidebar-stats-padding | 24px | Sidebar stats card padding (all sides) |
| --spacing-sidebar-sunner-padding | 24px 16px 24px 24px | Sidebar Sunner list card padding |
| --spacing-btn-padding | 16px | Standard button padding |
| --spacing-icon-btn-padding | 10px | Icon button padding (pagination arrows) |
| --spacing-footer-padding | 40px 90px | Footer padding |

#### Key Dimensions
| Dimension | Value | Usage |
|---|---|---|
| --avatar-size | 64px | User avatar circle on cards |
| --avatar-border | 1.869px | Avatar border width (solid white) |
| --pagination-arrow-size | 48px | Pagination arrow button size |
| --image-thumb-size | 88px | Image thumbnail on All Kudos cards |
| --hero-badge-size | 109px x 19px | Hero badge pill dimensions |

### Border & Radius

| Token Name | Value | Usage |
|---|---|---|
| --radius-allkudo-card | 24px | All Kudos post card |
| --radius-highlight-card | 16px | Highlight Kudo card |
| --radius-sidebar-card | 17px | Sidebar stats and Sunner list cards |
| --radius-content-quote | 12px | Content quote box in cards |
| --radius-btn | 8px | Open gift button, scrollbar track |
| --radius-btn-standard | 4px | Standard buttons, pagination, image inner fill |
| --radius-cta | 68px | CTA pill buttons (recognition, search) |
| --radius-avatar | 64px | User avatar circles (fully round) |
| --radius-spotlight | 47.14px | Spotlight Board container |
| --radius-image-thumb | 18px | Image thumbnail container |
| --radius-image-inner | 4px | Image thumbnail inner fill |
| --radius-hero-badge | 48px | Hero badge pill shape |
| --radius-notification | 100px | Notification dot |
| --radius-spotlight-search | 46.404px | Spotlight mini search input (pill) |
| --border-highlight | 4px solid #FFEA9E | Highlight card thick gold border |
| --border-standard | 1px solid #998C5F | Standard card borders, buttons, sidebar, spotlight frame |
| --border-content-quote | 1px solid #FFEA9E | Content quote box gold border |
| --border-image-sample | 1px solid #FFEA9E | Image sample inner gold border |
| --border-avatar | 1.869px solid #FFF | Avatar circle white border |
| --border-hero-badge | 0.5px solid #FFEA9E | Hero badge pill thin gold border |
| --border-spotlight-search | 0.682px solid #998C5F | Spotlight search input (scaled) |
| --border-divider | 1px solid #2E3940 | Divider lines, footer top border |
| --border-nav-active | 1px solid #FFEA9E (bottom) | Active nav link underline |
| --border-user-menu | 1px solid #998C5F | Profile/user menu button border |

### Shadows

The design relies on **borders and background color contrast** rather than box shadows. No box-shadow values were found in the frame styles.

| Token Name | Value | Usage |
|---|---|---|
| --shadow-none | none | All elements (no box-shadow in design) |

> **Note**: Elevation is achieved through thick borders (4px gold on highlight cards), background color contrast (#FFF8E1 cards on #00101A page), and opacity overlays rather than traditional box-shadows.

---

## Layout Specifications

### Container

| Property | Value | Notes |
|---|---|---|
| Page width | 1440px | Desktop design width |
| Page height | 5862px | Full page height (scrollable) |
| Page max-width | 100vw | Full viewport width |
| Content max-width | 1152px | 1440 - (144 * 2) content area |
| Two-column left (feed) | 680px | All Kudos feed column |
| Two-column right (sidebar) | 422px | Stats + leaderboard sidebar |
| Two-column gap | 80px | Gap between feed and sidebar |
| Two-column total | 1182px | 680 + 80 + 422 (exceeds 1152 content area by 30px — Figma measures; the All Kudos section may use narrower horizontal padding or flex-shrink to fit) |

### Section Dimensions

| Section | Width | Height | Notes |
|---|---|---|---|
| Header | 1440px | 80px | Fixed top, semi-transparent bg |
| Keyvisual (KV) | 1440px | 512px | Full-width hero image with gradient |
| A_KV Kudos | 1152px | 160px | Title + CTA area |
| Action Buttons Row | 1440px | 72px | Recognition + Search CTAs |
| B_Highlight | 1440px | 786px | Carousel section |
| B.7 Spotlight | 1157px | 548px | Interactive word cloud |
| C_All Kudos | 1440px | 3237px | Feed + sidebar section |
| Highlight Card | 528px | auto | Individual carousel card |
| Kudo Post Card | 680px | auto | Individual feed card |
| Content Area (in card) | 600px | auto | Inner content width (680 - 40*2 padding) |

### Page Structure

| Property | Value | Notes |
|---|---|---|
| display | flex | Main page layout |
| flex-direction | column | Vertical stack of sections |
| background | #00101A | Dark page background `rgba(0, 16, 26, 1)` |
| color | #FFFFFF | Default text color on dark |
| Bia (main wrapper) | flex column, center, gap: 120px | Main content wrapper padding: 96px 0 120px 0 |

### Layout Structure (ASCII)

```
+======================================================================+
|  Header (w: 100%, h: 80px, bg: #101417/80%, p: 12px 144px)          |
|  [Logo] [About SAA 2025] [Award Info] [Sun* Kudos*] ... [VN v] [Av] |
+======================================================================+
|                                                                       |
|  +================================================================+  |
|  |  A: KV Banner (w: 100%, h: ~280px, bg: decorative gradient)    |  |
|  |  +----------------------------------------------------------+  |  |
|  |  |  "He thong ghi nhan va cam on" (36px, #FFEA9E gold)        |  |  |
|  |  |  [KUDOS LOGO] (SVN-Gotham 139.78px, #DBD1C1 beige)        |  |  |
|  |  +----------------------------------------------------------+  |  |
|  |  +----------------------------------------------------------+  |  |
|  |  |  A.1: CTA Field (pill, placeholder, pen icon)             |  |  |
|  |  +----------------------------------------------------------+  |  |
|  |  +----------------------------------------------------------+  |  |
|  |  |  Search Sunner (search field, magnifying glass)           |  |  |
|  |  +----------------------------------------------------------+  |  |
|  +================================================================+  |
|                           48px                                        |
|  +================================================================+  |
|  |  B.1: Header ("Sun* Annual Awards 2025" / "HIGHLIGHT KUDOS")  |  |
|  |  [Hashtag v] [Phong ban v]                    (filter buttons) |  |
|  +================================================================+  |
|                           16px                                        |
|  +================================================================+  |
|  |  B.2: Highlight Carousel (w: 100%, h: ~400px)                 |  |
|  |  [<]  [Card dim] [===ACTIVE CARD===] [Card dim]  [>]          |  |
|  |                                                                 |  |
|  |  B.3: Active Highlight Card:                                   |  |
|  |  +----------------------------------------------------------+  |  |
|  |  | [Avatar] Name  ->  [Avatar] Name                          |  |  |
|  |  |          Dept          Dept                                |  |  |
|  |  | 10:00 - 10/30/2025    [IDOL GIOI TRE]                     |  |  |
|  |  | Message content (max 3 lines)...                          |  |  |
|  |  | #Dedicated #Inspiring #Dedicated #Inspiring...             |  |  |
|  |  | [10 heart] [Copy Link] [Xem chi tiet]                     |  |  |
|  |  +----------------------------------------------------------+  |  |
|  |                                                                 |  |
|  |  B.5: [<] 2/5 [>]  (pagination)                               |  |
|  +================================================================+  |
|                           48px                                        |
|  +================================================================+  |
|  |  B.6: Header ("Sun* Annual Awards 2025" / "SPOTLIGHT BOARD")  |  |
|  +================================================================+  |
|                           16px                                        |
|  +================================================================+  |
|  |  B.7: Spotlight Board (w: 100%, h: ~300px, bg: dark)          |  |
|  |  +----------------------------------------------------------+  |  |
|  |  | [B.7.1: "388 KUDOS"]  [B.7.3: Search] [B.7.2: Pan/Zoom] |  |  |
|  |  | +------------------------------------------------------+ |  |  |
|  |  | |  Interactive word-cloud / name diagram                | |  |  |
|  |  | |  (names in varying sizes, interactive nodes)          | |  |  |
|  |  | +------------------------------------------------------+ |  |  |
|  |  +----------------------------------------------------------+  |  |
|  +================================================================+  |
|                           48px                                        |
|  +================================================================+  |
|  |  C.1: Header ("Sun* Annual Awards 2025" / "ALL KUDOS")        |  |
|  +================================================================+  |
|                           16px                                        |
|  +=================================+  80px  +====================+   |
|  |  C.2: Kudos Feed List (680px)   |        |  D: Sidebar (422px)|   |
|  |  +---------------------------+  |        |  +==============+  |   |
|  |  | C.3: Kudo Post Card       |  |        |  | D.1: Stats   |  |   |
|  |  | [Sender] -> [Receiver]    |  |        |  | Kudos: 25    |  |   |
|  |  | 10:00 - 10/30/2025        |  |        |  | Sent: 25     |  |   |
|  |  | [IDOL GIOI TRE]           |  |        |  | Hearts: 25   |  |   |
|  |  | Message (max 5 lines)...  |  |        |  | --------     |  |   |
|  |  | [img][img][img]           |  |        |  | SB Open: 25  |  |   |
|  |  | #tags #tags...            |  |        |  | SB Left: 25  |  |   |
|  |  | [10 heart] [Copy Link]    |  |        |  | [Mo Secret]  |  |   |
|  |  +---------------------------+  |        |  +==============+  |   |
|  |            24px                  |        |       24px         |   |
|  |  +---------------------------+  |        |  +==============+  |   |
|  |  | C.5: Kudo Post Card       |  |        |  | D.3: 10      |  |   |
|  |  | ...                       |  |        |  | SUNNER NHAN  |  |   |
|  |  +---------------------------+  |        |  | QUA MOI NHAT |  |   |
|  |            24px                  |        |  | [Av] Name    |  |   |
|  |  +---------------------------+  |        |  | [Av] Name    |  |   |
|  |  | C.6: Kudo Post Card       |  |        |  | [Av] Name    |  |   |
|  |  | ...                       |  |        |  | ...          |  |   |
|  |  +---------------------------+  |        |  +==============+  |   |
|  |  (infinite scroll)              |        |  (independent      |   |
|  +=================================+        |   scroll)          |   |
|                                              +====================+   |
|                           48px                                        |
+======================================================================+
|  Footer (w: 100%, links, copyright)                                   |
+======================================================================+
```

---

## Component Style Details

### KV Banner (A)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | 2940:13437 | - |
| width | 100% | `width: 100%` |
| height | auto (~280px) | `height: auto` |
| background | Decorative gradient/image | `background: url(kv-bg.png) center/cover no-repeat` |
| padding | 40px 144px | `padding: 40px var(--spacing-page-padding-x)` |
| display | flex | `display: flex; flex-direction: column; align-items: center; gap: 24px` |

---

### CTA Buttons (A.1 "Gui loi cam on" + Search "Tim kiem sunner")

| Property | Value | CSS |
|---|---|---|
| **Node ID** | 2940:13449 (recognition), search button | - |
| width (recognition) | 738px | `width: 738px; max-width: 100%` |
| width (search) | 381px | `width: 381px; max-width: 100%` |
| height | 72px | `height: 72px` |
| padding | 24px 16px | `padding: 24px 16px` |
| background | rgba(255, 234, 158, 0.10) | `background: var(--Details-SecondaryButton-Normal)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border)` |
| border-radius | 68px | `border-radius: 68px` (pill shape) |
| display | flex | `display: flex; align-items: center; gap: 8px` |
| cursor | pointer | `cursor: pointer` |

**Button Text:**
| Property | Value | CSS |
|---|---|---|
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #FFFFFF | `color: white` |

**Icon:** 24x24, white

**States:**
| State | Changes |
|---|---|
| Default | bg: rgba(255, 234, 158, 0.10), border: 1px solid #998C5F |
| Hover | bg: rgba(255, 234, 158, 0.20) |
| Focus | outline: 2px solid #FFEA9E |

---

### Section Header (B.1, B.6, C.1)

| Property | Value | CSS |
|---|---|---|
| **Node IDs** | B.1: 2940:13452, B.6: 2940:13476, C.1: 2940:14221 | - |
| width | 100% | `width: 100%` |
| display | flex | `display: flex; flex-direction: column; gap: 8px` |
| padding | 0 | - |

**Subtitle ("Sun* Annual Awards 2025"):**
| Property | Value | CSS |
|---|---|---|
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| letter-spacing | 0px | `letter-spacing: 0` |
| color | #FFFFFF | `color: white` |

**Title ("HIGHLIGHT KUDOS" / "SPOTLIGHT BOARD" / "ALL KUDOS"):**
| Property | Value | CSS |
|---|---|---|
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 57px | `font-size: 57px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 64px | `line-height: 64px` |
| letter-spacing | -0.25px | `letter-spacing: -0.25px` |
| color | #FFEA9E | `color: var(--Details-Text-Primary-1, #FFEA9E)` (gold) |

---

### Filter Dropdown Button (B.1.1, B.1.2)

| Property | Value | CSS |
|---|---|---|
| **Node IDs** | B.1.1: 2940:13459, B.1.2: 2940:13460 | - |
| height | 36px | `height: 36px` |
| padding | 8px 16px | `padding: 8px 16px` |
| background | rgba(255,255,255,0.1) | `background: rgba(255,255,255,0.1)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border)` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex; align-items: center; gap: 8px` |
| cursor | pointer | `cursor: pointer` |

**Button Text:**
| Property | Value | CSS |
|---|---|---|
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 700 | `font-weight: 700` |
| color | #FFFFFF | `color: white` |

**Dropdown Arrow Icon:**
| Property | Value |
|---|---|
| size | 16x16 |
| color | #FFFFFF |

**States:**
| State | Changes |
|---|---|
| Default | bg: rgba(255,255,255,0.1) |
| Hover | bg: rgba(255,255,255,0.2) |
| Active (filter selected) | bg: #FFEA9E, color: #00101A, border: 1px solid #FFEA9E |
| Focus | outline: 2px solid #FFEA9E |

---

### Highlight Kudo Card (B.3)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | 2940:13465 | - |
| width | 528px | `width: 528px` |
| height | auto | `height: auto` |
| padding | 24px 24px 16px 24px | `padding: 24px 24px 16px 24px` |
| background | #FFF8E1 | `background: var(--Details-PrimaryButton-Hover, #FFF8E1)` (warm cream) |
| border | 4px solid #FFEA9E | `border: 4px solid var(--Details-Text-Primary-1, #FFEA9E)` (thick gold) |
| border-radius | 16px | `border-radius: 16px` |
| display | flex | `display: flex; flex-direction: column; gap: 16px` |

**Card Inner Content Width:** 480px (528 - 24*2 padding)

**Gold Divider Line (within card):**
| Property | Value |
|---|---|
| width | 480px (full inner width) |
| height | 1px |
| background | #FFEA9E |

**Content Quote Box (within card):**
| Property | Value | CSS |
|---|---|---|
| border | 1px solid #FFEA9E | `border: 1px solid var(--Details-Text-Primary-1)` |
| background | rgba(255, 234, 158, 0.40) | `background: var(--Details-ButtonSecondary-Hover)` |
| border-radius | 12px | `border-radius: 12px` |
| padding | 16px 24px | `padding: 16px 24px` |

**Active (Center) Card State:**
| Property | Value |
|---|---|
| opacity | 1 |
| transform | scale(1) |
| z-index | 2 |
| pointer-events | all |

**Inactive (Side) Card State:**
| Property | Value |
|---|---|
| opacity | 0.5 |
| transform | scale(0.9) |
| z-index | 1 |
| pointer-events | none |

---

### Carousel Navigation Arrows (B.2.1, B.2.2)

| Property | Value | CSS |
|---|---|---|
| **Node IDs** | B.2.1: 2940:13470, B.2.2: 2940:13468 | - |
| width | 48px | `width: 48px` |
| height | 48px | `height: 48px` |
| background | rgba(255,255,255,0.15) | `background: rgba(255,255,255,0.15)` |
| border-radius | 50% | `border-radius: 50%` |
| display | flex | `display: flex; align-items: center; justify-content: center` |
| cursor | pointer | `cursor: pointer` |

**Icon:**
| Property | Value |
|---|---|
| size | 24x24 |
| color | #FFFFFF |

**States:**
| State | Changes |
|---|---|
| Default | bg: rgba(255,255,255,0.15) |
| Hover | bg: rgba(255,255,255,0.3) |
| Disabled | opacity: 0.3, cursor: not-allowed, pointer-events: none |

---

### Page Indicator (B.5)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | 2940:13471 | - |
| display | flex | `display: flex; align-items: center; gap: 32px; justify-content: center` |

**Page Number Text (B.5.2):**
| Property | Value | CSS |
|---|---|---|
| **Node ID** | 2940:13473 | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 28px | `font-size: 28px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 36px | `line-height: 36px` |
| color | #999999 | `color: var(--Details-Text-Secondary-2, #999)` |

**Page Nav Arrows (B.5.1, B.5.3):**
| Property | Value |
|---|---|
| size | 24x24 |
| color | #FFFFFF |
| disabled-color | rgba(255,255,255,0.3) |

---

### Sender/Receiver Info Block (B.3.1-B.3.6, C.3.1, C.3.3)

| Property | Value | CSS |
|---|---|---|
| display | flex | `display: flex; align-items: center; gap: 12px` |

**Avatar (B.3.1, B.3.5):**
| Property | Value | CSS |
|---|---|---|
| **Node IDs** | B.3.1: I2940:13465;335:9443;256:4734, B.3.5: I2940:13465;335:9446;256:4734 | - |
| width | 64px | `width: 64px` |
| height | 64px | `height: 64px` |
| border | 1.869px solid #FFF | `border: 1.869px solid var(--Details-Text-Secondary-1, #FFF)` |
| border-radius | 64px | `border-radius: 64px` (fully round) |
| background | #EEE (fallback) | `background: #EEE` |
| object-fit | cover | `object-fit: cover` |

**Name + Department (B.3.2, B.3.6):**
| Property | Value | CSS |
|---|---|---|
| display | flex | `display: flex; flex-direction: column; gap: 2px` |

**Name:**
| Property | Value |
|---|---|
| font-family | Montserrat |
| font-size | 16px |
| font-weight | 700 |
| line-height | 24px |
| letter-spacing | 0.15px |
| color | #00101A |

**Department / Badge Level:**
| Property | Value |
|---|---|
| font-family | Montserrat |
| font-size | 14px |
| font-weight | 700 |
| line-height | 20px |
| letter-spacing | 0.1px |
| color | #999999 |

**Star Rating (Hoa thi):**
| Property | Value |
|---|---|
| icon-size | 12x12 |
| color | #FFEA9E (gold) |
| gap | 2px |

**Arrow Icon between sender and receiver (B.3.4):**
| Property | Value |
|---|---|
| **Node ID** | I2940:13465;335:9444 |
| size | 24x24 |
| color | #999999 |
| interaction | none (decorative) |

---

### Kudo Content Area (B.4, C.3.5)

**Timestamp (B.4.1, C.3.4):**
| Property | Value | CSS |
|---|---|---|
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #999999 | `color: var(--Details-Text-Secondary-2, #999)` |
| format | HH:mm - MM/DD/YYYY | - |

**Hashtag Label / Category Tag (D.4 - e.g., "IDOL GIOI TRE"):**
| Property | Value | CSS |
|---|---|---|
| **Node ID** | I3127:21871;2234:33038 | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #00101A | `color: #00101A` |

**Message Content (B.4.2, C.3.5):**
| Property | Value | CSS |
|---|---|---|
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 20px | `font-size: 20px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #00101A | `color: #00101A` |
| text-align | justify | `text-align: justify` |
| overflow | hidden | `overflow: hidden; text-overflow: ellipsis` |
| display | -webkit-box | `-webkit-line-clamp: 5` (All Kudos) / `3` (Highlight) |

> **Note**: In Highlight cards, message content is rendered inside a **Content Quote Box** (bg: #FFEA9E/40%, border: 1px #FFEA9E, radius: 12px, padding: 16px 24px).

**Hashtag Tags (B.4.3, C.3.7):**
| Property | Value | CSS |
|---|---|---|
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #D4271D | `color: #D4271D` (red) |
| display | flex | `display: flex; gap: 8px; flex-wrap: nowrap; overflow: hidden` |
| max-lines | 1 | Overflow with "..." |
| cursor | pointer | `cursor: pointer` |

---

### Action Bar (B.4.4, C.4)

| Property | Value | CSS |
|---|---|---|
| **Node IDs** | B.4.4: I2940:13465;335:9461, C.4: I3127:21871;256:5194 | - |
| display | flex | `display: flex; align-items: center; justify-content: space-between` |
| width | 100% | `width: 100%` |

**Heart Button (C.4.1):**
| Property | Value | CSS |
|---|---|---|
| **Node ID** | I3127:21871;256:5175 | - |
| display | flex | `display: flex; align-items: center; gap: 4px` |
| cursor | pointer | `cursor: pointer` |

**Heart Icon:**
| State | Color | Size |
|---|---|---|
| Inactive | #999999 (grey) | 20x20 |
| Active | #FF4D4D (red) | 20x20 |
| Disabled (own Kudo) | #CCCCCC | 20x20, cursor: not-allowed |

**Like Count:**
| Property | Value |
|---|---|
| font-family | Montserrat |
| font-size | 24px (Highlight cards) / 16px (All Kudos cards) |
| font-weight | 700 |
| line-height | 32px / 24px |
| color | #00101A |

**Copy Link Button (C.4.2):**
| Property | Value | CSS |
|---|---|---|
| **Node ID** | I3127:21871;256:5216 | - |
| display | flex | `display: flex; align-items: center; gap: 4px` |
| cursor | pointer | `cursor: pointer` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #00101A | `color: #00101A` |

**States (Copy Link):**
| State | Changes |
|---|---|
| Default | color: #00101A |
| Hover | color: #FFEA9E, text-decoration: underline |

**"Xem chi tiet" Button (Highlight cards only — NOT present in All Kudos cards):**
| Property | Value | CSS |
|---|---|---|
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #00101A | `color: #00101A` |
| cursor | pointer | `cursor: pointer` |

> **Note**: The "Xem chi tiet" action button only appears on Highlight Kudo cards (B.4.4). All Kudos feed cards (C.4) only have Heart + Copy Link.

---

### Attached Images (C.3.6)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | I3127:21871;256:5176 | - |
| display | flex | `display: flex; gap: 16px; flex-wrap: wrap` |

**Individual Thumbnail:**
| Property | Value | CSS |
|---|---|---|
| width | 88px | `width: 88px` |
| height | 88px | `height: 88px` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border)` |
| border-radius | 18px | `border-radius: 18px` |
| overflow | hidden | `overflow: hidden` |
| object-fit | cover | `object-fit: cover` |
| cursor | pointer | `cursor: pointer` |

> **Note**: Image thumbnails match the C.3.6 specifications (88x88, radius 18px, border 1px #998C5F).

**States:**
| State | Changes |
|---|---|
| Hover | opacity: 0.8, transform: scale(1.05) |

---

### Spotlight Board (B.7)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | 2940:14174 | - |
| width | 1157px | `width: 100%` |
| height | 548px | `height: 548px` |
| background | image + overlay | Background image with `linear-gradient(0deg, rgba(0, 0, 0, 0.70) ...)` overlay |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border, #998C5F)` |
| border-radius | 47.14px | `border-radius: 47.14px` |
| overflow | hidden | `overflow: hidden` |
| position | relative | `position: relative` |

**Spotlight Count (B.7.1):**
| Property | Value | CSS |
|---|---|---|
| **Node ID** | 3007:17482 | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 44px | `line-height: 44px` |
| color | #FFFFFF | `color: white` |

**User Names on Board:**
| Property | Value |
|---|---|
| font-size | ~6.66px (scaled) |
| font-weight | 700 |
| color | #FFFFFF |
| opacity | varies (0.1 to 1.0 for fading rows) |

**Pan/Zoom Button (B.7.2):**
| Property | Value | CSS |
|---|---|---|
| **Node ID** | 3007:17479 | - |
| width | 36px | `width: 36px` |
| height | 36px | `height: 36px` |
| background | rgba(255,255,255,0.1) | `background: rgba(255,255,255,0.1)` |
| border-radius | 8px | `border-radius: 8px` |
| cursor | pointer | `cursor: pointer` |

**Search Field (B.7.3):**
| Property | Value | CSS |
|---|---|---|
| **Node ID** | 2940:14833 | - |
| width | 219px | `width: 219px` |
| height | 39px | `height: 39px` |
| border | 0.682px solid #998C5F | `border: 0.682px solid var(--Details-Border)` (scaled) |
| border-radius | 46.404px | `border-radius: 46.404px` (pill shape) |
| color | #FFFFFF | `color: white` |

**Notification Ticker (Spotlight board overlay text):**
| Property | Value |
|---|---|
| font-size | 14px |
| font-weight | 700 |
| line-height | 20px |
| letter-spacing | 0.1px |
| color | #FFF |
| row-opacity | 0.1, 0.3, 0.5, 0.7, 1.0 (top to bottom fading) |

---

### All Kudos Post Card (C.3)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | 3127:21871 | - |
| width | 680px | `width: 680px` / `width: 100%` |
| padding | 40px 40px 16px 40px | `padding: 40px 40px 16px 40px` |
| background | #FFF8E1 | `background: var(--Details-PrimaryButton-Hover, #FFF8E1)` (warm cream) |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border, #998C5F)` |
| border-radius | 24px | `border-radius: 24px` |
| display | flex | `display: flex; flex-direction: column; gap: 16px` |

**Card Inner Content Width:** 600px (680 - 40*2 padding)

**Card Header (Sender -> Receiver):**
| Property | Value | CSS |
|---|---|---|
| width | 600px | `width: 100%` |
| display | flex | `display: flex; align-items: center; justify-content: space-between; gap: 24px` |

**Gold Divider Line (within card):**
| Property | Value |
|---|---|
| width | 600px (full inner width) |
| height | 1px |
| background | #FFEA9E |

**Sent Icon (C.3.2):**
| Property | Value | CSS |
|---|---|---|
| **Node ID** | I3127:21871;256:5161 | - |
| position | relative | Between sender/receiver info |
| size | 32px | Arrow icon |
| interaction | none | decorative |

**Image Attachments (C.3.6):**
| Property | Value | CSS |
|---|---|---|
| thumbnail-size | 88x88px | `width: 88px; height: 88px` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border)` |
| border-radius | 18px (outer) | `border-radius: 18px` |
| inner-radius | 4px | Inner image fill radius |
| gap | 16px | Between thumbnails |

---

### Stats Sidebar (D.1)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | 2940:13489 | - |
| width | 422px | `width: 422px` / `width: 100%` |
| padding | 24px | `padding: 24px` |
| background | #00070C | `background: var(--Details-Container-2, #00070C)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border, #998C5F)` |
| border-radius | 17px | `border-radius: 17px` |
| display | flex | `display: flex; flex-direction: column; gap: 8px` |

**Inner Content Width:** 374px (422 - 24*2 padding)

**Stat Row (D.1.2 - D.1.7):**
| Property | Value | CSS |
|---|---|---|
| width | 374px | `width: 100%` |
| height | 40px | `height: 40px` |
| display | flex | `display: flex; justify-content: space-between; align-items: center; gap: 8px` |

**Stat Label:**
| Property | Value |
|---|---|
| font-family | Montserrat |
| font-size | 22px |
| font-weight | 700 |
| line-height | 28px |
| color | #FFFFFF |

**Stat Value:**
| Property | Value |
|---|---|
| font-family | Montserrat |
| font-size | 32px |
| font-weight | 700 |
| line-height | 40px |
| color | #FFEA9E (gold) |

**Heart Multiplier Badge (Special Day "x2"):**
| Property | Value |
|---|---|
| font-size | 17.538px |
| line-height | 23.385px |
| color | #FFFFFF |
| text-stroke | -webkit-text-stroke: 1.04px #000 |

**Divider (D.1.5):**
| Property | Value | CSS |
|---|---|---|
| **Node ID** | 2940:13494 | - |
| width | 374px | `width: 100%` |
| height | 1px | `height: 1px` |
| background | #2E3940 | `background: var(--Details-Divider, #2E3940)` |

**Open Gift Button (D.1.8):**
| Property | Value | CSS |
|---|---|---|
| **Node ID** | 2940:13497 | - |
| width | 374px | `width: 100%` |
| height | 60px | `height: 60px` |
| padding | 16px | `padding: 16px` |
| background | #FFEA9E | `background: var(--Details-Text-Primary-1, #FFEA9E)` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex; align-items: center; justify-content: center; gap: 8px` |
| cursor | pointer | `cursor: pointer` |

**Open Gift Button Text:**
| Property | Value |
|---|---|
| font-family | Montserrat |
| font-size | 22px |
| font-weight | 700 |
| line-height | 28px |
| color | #00101A |

**Open Gift Button States:**
| State | Changes |
|---|---|
| Default | bg: #FFEA9E |
| Hover | bg: #F5E088, transform: translateY(-1px) |
| Disabled | bg: #D4CCA8, color: #999, cursor: not-allowed |
| Focus | outline: 2px solid #998C5F |

---

### Leaderboard List (D.3 - "10 SUNNER NHAN QUA MOI NHAT")

| Property | Value | CSS |
|---|---|---|
| **Node ID** | 2940:13510 | - |
| width | 422px | `width: 100%` |
| background | #00070C | `background: var(--Details-Container-2, #00070C)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border)` |
| border-radius | 17px | `border-radius: 17px` |
| padding | 24px 16px 24px 24px | `padding: 24px 16px 24px 24px` |
| display | flex | `display: flex; flex-direction: column; gap: 8px` |

**Leaderboard Title (D.3.1):**
| Property | Value | CSS |
|---|---|---|
| **Node ID** | 2940:13513 | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #FFEA9E | `color: var(--Details-Text-Primary-1)` |

**Leaderboard Item (D.3.2):**
| Property | Value | CSS |
|---|---|---|
| **Node ID** | 2940:13516 | - |
| width | 364px | `width: 100%` |
| display | flex | `display: flex; align-items: center; gap: 8px` |
| cursor | pointer | `cursor: pointer` |

**Item Avatar:**
| Property | Value |
|---|---|
| width | 64px |
| height | 64px |
| border-radius | 64px (fully round) |
| border | 1.869px solid #FFF |

**Item Name:**
| Property | Value |
|---|---|
| font-family | Montserrat |
| font-size | 22px |
| font-weight | 700 |
| line-height | 28px |
| color | #FFEA9E (gold) |

**Item Description (Prize):**
| Property | Value |
|---|---|
| font-family | Montserrat |
| font-size | 16px |
| font-weight | 700 |
| line-height | 24px |
| letter-spacing | 0.15px |
| color | #FFFFFF |

**Scrollbar (within leaderboard):**
| Property | Value |
|---|---|
| width | 2px |
| height | 245px |
| border-radius | 8px |
| color | #999 |

**States:**
| State | Changes |
|---|---|
| Hover | background: rgba(255,255,255,0.05), border-radius: 8px |

---

## Component Hierarchy with Styles

```
Page (w: 1440px, bg: #00101A, color: #FFF)
├── Header (w: 100%, h: 80px, bg: #101417/80%, p: 12px 144px, flex, center, between)
│   ├── Logo (52x48)
│   ├── Nav (flex, gap: 24px, buttons p: 16px r: 4px)
│   │   ├── NavItem (16px/700, #FFF)
│   │   └── NavItem.active (color: #FFEA9E, border-bottom: 1px solid #FFEA9E, text-shadow glow)
│   └── Right (flex, gap: 16px)
│       ├── LangSwitch (108px, 14px/700, #FFF)
│       ├── NotificationBell (40px, red dot 8px #D4271D)
│       └── ProfileIcon (40x40, r: 50%, border: 1px #998C5F)
│
├── Keyvisual (w: 1440px, h: 512px, bg: image + gradient overlay)
│
├── Bia (main wrapper, flex, col, center, gap: 120px, p: 96px 0 120px 0)
│   │
│   ├── A: KV Kudos (w: 1152px, h: 160px, flex, col, gap: 10px)
│   │   ├── Title "He thong ghi nhan va cam on" (36px/700, #FFEA9E)
│   │   └── Logo "KUDOS" (SVN-Gotham 139.78px/400, #DBD1C1, ls: -13%)
│   │
│   ├── Action Buttons Row (w: 1440px, h: 72px, flex, row, gap: 24px)
│   │   ├── A.1: Recognition CTA (738px, h: 72, r: 68px, bg: #FFEA9E/10%, border: 1px #998C5F)
│   │   │   ├── PenIcon (24x24, #FFF)
│   │   │   └── Placeholder (16px/700, #FFF)
│   │   └── Search CTA (381px, h: 72, r: 68px, bg: #FFEA9E/10%, border: 1px #998C5F)
│   │       ├── SearchIcon (24x24, #FFF)
│   │       └── Placeholder (16px/700, #FFF)
│   │
│   ├── B: Highlight Section (w: 1440px, flex, col, gap: 40px)
│   │   ├── B.1: Header (flex, between, p: 0 144px)
│   │   │   ├── Titles (flex, col, gap: 8px)
│   │   │   │   ├── Subtitle "Sun* Annual Awards 2025" (24px/700, #FFF)
│   │   │   │   └── Title "HIGHLIGHT KUDOS" (57px/700, #FFEA9E, ls: -0.25px)
│   │   │   └── Filters (flex, gap: 12px)
│   │   │       ├── B.1.1: Hashtag Btn (h: 36, p: 8px 16px, r: 8px, bg: #FFF/10%)
│   │   │       └── B.1.2: Dept Btn (same style)
│   │   │
│   │   ├── B.2: Carousel (w: 100%, flex, center, gap: 24px)
│   │   │   ├── B.2.1: Back Arrow (48x48, r: 50%, bg: #FFF/15%)
│   │   │   ├── Cards Container (flex, center, overflow: hidden)
│   │   │   │   └── B.3: Card (528px, p: 24px 24px 16px 24px, r: 16px, bg: #FFF8E1,
│   │   │   │       │       border: 4px solid #FFEA9E, flex, col, gap: 16px)
│   │   │   │       ├── Users Row (flex, between, gap: 24px)
│   │   │   │       │   ├── Sender (avatar 64px + name 16px/700 + dept 14px/700 #999 + stars)
│   │   │   │       │   ├── Arrow (32px, #999)
│   │   │   │       │   └── Receiver (same as sender)
│   │   │   │       ├── Gold Divider (480px x 1px, #FFEA9E)
│   │   │   │       ├── B.4: Content (flex, col, gap: 16px)
│   │   │   │       │   ├── B.4.1: Time (16px/700, #999, ls: 0.5px)
│   │   │   │       │   ├── Category Label "IDOL GIOI TRE" (16px/700, #00101A, ls: 0.5px)
│   │   │   │       │   ├── Content Quote Box (bg: #FFEA9E/40%, border: 1px #FFEA9E, r: 12px, p: 16px 24px)
│   │   │   │       │   │   └── B.4.2: Message (20px/700, #00101A, justified, 3-line clamp)
│   │   │   │       │   └── B.4.3: Hashtags (16px/700, #D4271D, flex, gap: 8px, 1-line)
│   │   │   │       └── B.4.4: Actions (flex, between, gap: 24px)
│   │   │   │           ├── Heart (20x20, count 24px/700 #00101A)
│   │   │   │           ├── CopyLink (16px/700, #00101A)
│   │   │   │           └── XemChiTiet (16px/700, #00101A)
│   │   │   └── B.2.2: Forward Arrow (48x48, r: 50%)
│   │   │
│   │   └── B.5: Pagination (flex, center, gap: 32px)
│   │       ├── B.5.1: Back (24x24)
│   │       ├── B.5.2: "2/5" (28px/700, #999)
│   │       └── B.5.3: Forward (24x24)
│   │
│   ├── B.6: Spotlight Header (flex, col, gap: 8px, p: 0 144px)
│   │   ├── Subtitle (24px/700, #FFF)
│   │   └── Title "SPOTLIGHT BOARD" (57px/700, #FFEA9E, ls: -0.25px)
│   │
│   ├── B.7: Spotlight Board (w: 1157px, h: 548px, r: 47.14px, bg: image + 70% black overlay,
│   │         border: 1px #998C5F)
│   │   ├── Header Bar (flex, between, p: 16px)
│   │   │   ├── B.7.1: "388 KUDOS" (36px/700, #FFF)
│   │   │   ├── B.7.3: Search (219px, h: 39, r: 46.404px, border: 0.682px #998C5F)
│   │   │   └── B.7.2: Pan/Zoom Btn (36x36, r: 8px, bg: #FFF/10%)
│   │   └── Canvas (flex-1, interactive word cloud, names ~6.66px, opacity rows 0.1-1.0)
│   │
│   ├── C+D: All Kudos + Sidebar (flex, row, gap: 80px, p: 0 144px)
│   │   │
│   │   ├── Left Column (w: 680px)
│   │   │   ├── C.1: Header (flex, col, gap: 8px)
│   │   │   │   ├── Subtitle (24px/700, #FFF)
│   │   │   │   └── Title "ALL KUDOS" (57px/700, #FFEA9E, ls: -0.25px)
│   │   │   │
│   │   │   └── C.2: Feed (flex, col, gap: 24px)
│   │   │       └── C.3: Kudo Card (w: 680px, p: 40px 40px 16px 40px, r: 24px,
│   │   │           │   bg: #FFF8E1, border: 1px #998C5F, flex, col, gap: 16px)
│   │   │           ├── Header (flex, between, gap: 24px)
│   │   │           │   ├── C.3.1: Sender (avatar 64px + name 16px/700 + dept 14px/700 #999)
│   │   │           │   ├── C.3.2: Sent Arrow (32px, decorative)
│   │   │           │   └── C.3.3: Receiver (same as sender)
│   │   │           ├── Gold Divider (600px x 1px, #FFEA9E)
│   │   │           ├── C.3.4: Time (16px/700, #999, ls: 0.5px)
│   │   │           ├── D.4: Category Label (16px/700, #00101A, ls: 0.5px)
│   │   │           ├── C.3.5: Content (20px/700, #00101A, justified, 5-line clamp)
│   │   │           ├── C.3.6: Images (flex, gap: 16px, max 5 thumbnails 88x88 r: 18px)
│   │   │           ├── C.3.7: Hashtags (16px/700, #D4271D, flex, gap: 8px, 1-line)
│   │   │           └── C.4: Actions (flex, between)
│   │   │               ├── C.4.1: Heart (icon 20x20 + count 16px/700 #00101A)
│   │   │               └── C.4.2: CopyLink (16px/700, #00101A, link icon)
│   │   │
│   │   └── Right Column (w: 422px, sticky top: 100px)
│   │       ├── D.1: Stats (p: 24px, r: 17px, bg: #00070C, border: 1px #998C5F,
│   │       │         flex, col, gap: 8px)
│   │       │   ├── D.1.2: "So Kudos ban nhan duoc" (22px/700, #FFF) : "25" (32px/700, #FFEA9E)
│   │       │   ├── D.1.3: "So Kudos ban da gui" : "25"
│   │       │   ├── D.1.4: "So tim ban nhan duoc" : "25"
│   │       │   ├── D.1.5: Divider (1px, #2E3940)
│   │       │   ├── D.1.6: "So Secret Box ban da mo" : "25"
│   │       │   ├── D.1.7: "So Secret Box chua mo" : "25"
│   │       │   └── D.1.8: Open Gift Btn (w: 100%, h: 60, r: 8px, bg: #FFEA9E, 22px/700 #00101A)
│   │       │
│   │       └── D.3: Leaderboard (r: 17px, bg: #00070C, border: 1px #998C5F,
│   │                 p: 24px 16px 24px 24px, flex, col, gap: 8px)
│   │           ├── D.3.1: Title "10 SUNNER NHAN QUA MOI NHAT" (22px/700, #FFEA9E)
│   │           └── Items (flex, col, gap: 8px, scrollbar: 2px #999)
│   │               └── D.3.2: Item (flex, center, gap: 8px)
│   │                   ├── Avatar (64x64, r: 64px, border: 1.869px #FFF)
│   │                   ├── Name (22px/700, #FFEA9E)
│   │                   └── Desc (16px/700, #FFF, ls: 0.15px)
│   │
│   └── Footer (w: 1440px, p: 40px 90px, border-top: 1px #2E3940, flex, between)
│       ├── Logo + Nav Links (gap: 80px)
│       └── Copyright (Montserrat Alternates 16px/700, #FFF)
```

---

## Responsive Specifications

### Breakpoints (per Constitution)

| Name | Min Width | Max Width |
|---|---|---|
| Mobile | 0 | 639px |
| Tablet (sm) | 640px | 767px |
| Tablet (md) | 768px | 1023px |
| Desktop (lg) | 1024px | 1279px |
| Desktop (xl) | 1280px | infinity |

### Responsive Changes

#### Mobile (< 640px)

| Component | Changes |
|---|---|
| Page padding | 16px (from 144px) |
| KV Banner | padding: 24px 16px, logo text: 40px |
| CTA Field | width: 100% |
| Section titles | font-size: 28px (from 57px) |
| Section subtitles | font-size: 16px (from 24px) |
| Highlight Carousel | Single card, full width, no side cards visible |
| Carousel arrows | 36x36 (from 48x48) |
| Filter buttons | Full width, stack vertically |
| Spotlight Board | height: 200px, search hidden, simplified controls |
| All Kudos layout | Single column (feed only), sidebar moves below feed |
| Kudo cards | padding: 16px |
| Card avatars | 32x32 (from 64x64) |
| Image thumbnails | 60x60 (from 88x88) |
| Stats sidebar | Full width, below feed |
| Leaderboard | Full width, below stats |
| Open Gift button | Full width |
| Two-column gap | 0 (stacked) |
| Footer | flex-wrap, padding: 16px |

#### Tablet (640px - 1023px)

| Component | Changes |
|---|---|
| Page padding | 48px (from 144px) |
| CTA Field | width: 400px |
| Highlight Carousel | Show active card + partial side cards |
| Spotlight Board | height: 250px |
| All Kudos layout | Single column, sidebar below at md; two-column at lg |
| Card content | 4-line clamp (from 5) |
| Image thumbnails | 64x64 |

#### Desktop (>= 1024px)

| Component | Changes |
|---|---|
| All components | Match Figma design specs exactly |
| Two-column layout | Feed (65%) + Sidebar (35%) |
| Sidebar | position: sticky, top: 100px, independent scroll |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|---|---|---|---|
| Pen/Edit | 24x24 | #FFF | CTA recognition field prefix icon |
| Search/Magnifying Glass | 24x24 | #FFF | CTA search field, Spotlight search |
| Chevron Left | 24x24 | #FFF | Carousel back arrows, pagination back |
| Chevron Right | 24x24 | #FFF | Carousel forward arrows, pagination forward |
| Dropdown Arrow | 16x16 | #FFF | Filter dropdown buttons |
| Heart (outline) | 20x20 | #999 | Like button (inactive) |
| Heart (filled) | 20x20 | #FF4D4D | Like button (active) |
| Link/Chain | 16x16 | #00101A | Copy Link button icon |
| External/Edit | 16x16 | #00101A | "Xem chi tiet" button icon (Highlight cards only) |
| Arrow Right | 24x24 | #999 | Sender -> Receiver direction arrow |
| Pan/Zoom | 20x20 | #FFF | Spotlight Board pan/zoom toggle |
| Star (filled) | 12x12 | #FFEA9E | User star rating (hoa thi) |
| Gift/Box | 20x20 | #00101A | Open Gift button icon |
| Globe | 16x16 | #FFF | Language switcher |
| User | 20x20 | #FFF | Profile icon |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---|---|---|---|---|
| Carousel slide | transform, opacity | 400ms | ease-in-out | Arrow click |
| Carousel card scale | transform (scale) | 300ms | ease-out | Slide change (active/inactive) |
| Heart toggle | color, transform (scale bounce) | 200ms | ease-out | Click |
| Heart count | opacity | 150ms | ease-in-out | Count change |
| Filter dropdown open | opacity, transform (translateY) | 200ms | ease-out | Click |
| Filter dropdown close | opacity, transform (translateY) | 150ms | ease-in | Click outside |
| Toast notification | opacity, transform (translateY) | 200ms | ease-out | Copy link success |
| Toast dismiss | opacity | 150ms | ease-in | Auto-dismiss (3s) |
| Card hover | box-shadow | 150ms | ease-in-out | Hover |
| Copy Link hover | color | 100ms | ease-in-out | Hover |
| Image thumbnail hover | opacity, transform (scale) | 150ms | ease-out | Hover |
| Infinite scroll load | opacity | 200ms | ease-in | New items loaded |
| Profile preview | opacity, transform (scale) | 200ms | ease-out | Hover (300ms delay) |
| Spotlight zoom | transform (scale) | 300ms | ease-in-out | Pan/Zoom interaction |
| Page indicator update | opacity | 100ms | ease-in-out | Slide change |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|---|---|---|---|
| Page container | 2940:13431 | `min-h-screen bg-[#00101A] text-white` | `<KudosLiveBoardPage />` |
| KV Banner | 2940:13437 | `w-full bg-cover bg-center` | `<KVBanner />` |
| CTA Field (recognition) | 2940:13449 | `w-[738px] max-w-full h-[72px] px-4 py-6 bg-[#FFEA9E]/10 border border-[#998C5F] rounded-[68px] flex items-center gap-2 cursor-pointer` | `<KudoCTAField />` |
| CTA Field (search) | - | `w-[381px] max-w-full h-[72px] px-4 py-6 bg-[#FFEA9E]/10 border border-[#998C5F] rounded-[68px] flex items-center gap-2 cursor-pointer` | `<SunnerSearchField />` |
| Section Header | 2940:13452 | `flex justify-between items-end px-[144px]` | `<SectionHeader />` |
| Section subtitle | - | `text-2xl font-bold text-white` | `<span>` |
| Section title | - | `text-[57px] font-bold leading-[64px] tracking-[-0.25px] text-[#FFEA9E]` | `<h2>` |
| Filter button | 2940:13459 | `h-9 px-4 py-2 bg-white/10 border border-[#998C5F] rounded-lg flex items-center gap-2 cursor-pointer` | `<FilterDropdownButton />` |
| Highlight carousel | 2940:13461 | `w-full flex items-center gap-6 relative overflow-hidden` | `<HighlightCarousel />` |
| Carousel arrow | 2940:13470 | `w-12 h-12 rounded-full bg-white/15 flex items-center justify-center cursor-pointer disabled:opacity-30` | `<CarouselArrow />` |
| Highlight card | 2940:13465 | `w-[528px] pt-6 px-6 pb-4 bg-[#FFF8E1] border-4 border-[#FFEA9E] rounded-2xl flex flex-col gap-4 transition-all` | `<HighlightKudoCard />` |
| Content quote box | - | `bg-[#FFEA9E]/40 border border-[#FFEA9E] rounded-xl px-6 py-4` | `<ContentQuoteBox />` |
| Page indicator | 2940:13471 | `flex items-center gap-8 justify-center` | `<PageIndicator />` |
| Page number | 2940:13473 | `text-[28px] font-bold text-[#999]` | `<span>` |
| Spotlight Board | 2940:14174 | `w-full h-[548px] rounded-[47px] border border-[#998C5F] overflow-hidden relative` | `<SpotlightBoard />` |
| Spotlight count | 3007:17482 | `text-4xl font-bold text-white` | `<span>` |
| Spotlight search | 2940:14833 | `w-[219px] h-[39px] rounded-[46px] border-[0.682px] border-[#998C5F] text-white` | `<SpotlightSearch />` |
| Two-column layout | - | `flex gap-20 px-[144px]` | `<AllKudosSection />` |
| Kudo feed | 2940:13482 | `w-[680px] flex flex-col gap-6` | `<KudosFeed />` |
| Kudo post card | 3127:21871 | `w-[680px] pt-10 px-10 pb-4 bg-[#FFF8E1] border border-[#998C5F] rounded-3xl flex flex-col gap-4` | `<KudoPostCard />` |
| User info block | I3127:21871;256:4858 | `flex items-center gap-[13px]` | `<UserInfo />` |
| Avatar | - | `w-16 h-16 rounded-full border-[1.869px] border-white object-cover` | `<Avatar />` |
| Timestamp | I3127:21871;256:5229 | `text-base font-bold tracking-[0.5px] text-[#999]` | `<time>` |
| Hashtag label | I3127:21871;2234:33038 | `text-base font-bold tracking-[0.5px] text-[#00101A]` | `<HashtagLabel />` |
| Message content | I3127:21871;256:5155 | `text-xl font-bold leading-8 text-[#00101A] text-justify line-clamp-5` | `<KudoContent />` |
| Image thumbnails | I3127:21871;256:5176 | `flex gap-4` | `<ImageGallery />` |
| Image thumb | - | `w-[88px] h-[88px] rounded-[18px] border border-[#998C5F] overflow-hidden` | `<ImageThumbnail />` |
| Hashtag tags | I3127:21871;256:5158 | `flex gap-2 text-base font-bold tracking-[0.5px] text-[#D4271D] overflow-hidden` | `<HashtagList />` |
| Action bar | I3127:21871;256:5194 | `flex items-center justify-between` | `<KudoActions />` |
| Heart button | I3127:21871;256:5175 | `flex items-center gap-1 cursor-pointer` | `<HeartButton />` |
| Heart count | - | `text-2xl font-bold text-[#00101A]` | `<span>` |
| Copy link button | I3127:21871;256:5216 | `flex items-center gap-1 text-base font-bold text-[#00101A] cursor-pointer` | `<CopyLinkButton />` |
| Gold divider | - | `w-full h-px bg-[#FFEA9E]` | `<hr />` |
| Sidebar container | 2940:13488 | `w-[422px] sticky top-[100px] flex flex-col gap-6 max-h-[calc(100vh-120px)] overflow-y-auto` | `<KudosSidebar />` |
| Stats panel | 2940:13489 | `p-6 bg-[#00070C] border border-[#998C5F] rounded-[17px] flex flex-col gap-2` | `<StatsPanel />` |
| Stat row | 2940:13491 | `h-10 flex justify-between items-center gap-2` | `<StatRow />` |
| Stat label | - | `text-[22px] font-bold text-white` | `<span>` |
| Stat value | - | `text-[32px] font-bold text-[#FFEA9E]` | `<span>` |
| Divider | 2940:13494 | `w-full h-px bg-[#2E3940]` | `<hr />` |
| Open gift button | 2940:13497 | `w-full h-[60px] bg-[#FFEA9E] rounded-lg flex items-center justify-center gap-2 text-[22px] font-bold text-[#00101A] cursor-pointer hover:bg-[#F5E088]` | `<Button variant="primary" />` |
| Leaderboard card | 2940:13510 | `bg-[#00070C] border border-[#998C5F] rounded-[17px] pt-6 pr-4 pb-6 pl-6 flex flex-col gap-2` | `<Leaderboard />` |
| Leaderboard title | 2940:13513 | `text-[22px] font-bold text-[#FFEA9E]` | `<h3>` |
| Leaderboard item | 2940:13516 | `flex items-center gap-2 cursor-pointer hover:bg-white/5 rounded-lg` | `<LeaderboardItem />` |
| Leaderboard avatar | - | `w-16 h-16 rounded-full border-[1.869px] border-white object-cover` | `<Avatar />` |
| Leaderboard name | - | `text-[22px] font-bold text-[#FFEA9E]` | `<span>` |
| Leaderboard desc | - | `text-base font-bold tracking-[0.15px] text-white` | `<span>` |

---

## Notes

- All colors should use CSS variables / Tailwind config for theming support — the Figma design system uses `--Details-*` CSS variable tokens
- **Montserrat** font must be loaded via Google Fonts (weight: **700 Bold** is the primary weight used throughout)
- **SVN-Gotham** font is needed for the "KUDOS" logo text only (139.78px, weight 400, letter-spacing -13%)
- **Montserrat Alternates** font is used for footer copyright text only
- The page uses a **dark theme** (#00101A background) — section headings use gold (#FFEA9E), not white
- All Kudo cards (both Highlight and Feed) use **warm cream (#FFF8E1)** background, NOT white
- Highlight cards have a **thick 4px gold border** (#FFEA9E), while Feed cards have a standard 1px #998C5F border
- The Highlight Carousel uses a **center-focused** layout with CSS transforms (scale + opacity) for inactive cards
- Cards contain internal **gold divider lines** (#FFEA9E) and **content quote boxes** (bg: #FFEA9E/40%, border: #FFEA9E, radius: 12px)
- The **two-column layout** (680px feed + 80px gap + 422px sidebar) only applies at desktop (>= 1024px). On mobile/tablet, sections stack vertically
- Sidebar cards use **#00070C** background (very dark navy), NOT transparent or white/5%
- The **Spotlight Board** uses a large border-radius (47.14px) and has a dark overlay (70% black) on the background image
- The sidebar uses **position: sticky** on desktop to remain visible while scrolling the feed
- Hero badges have **scaled typography** (11-13px range) with specific text shadows per badge type
- The notification ticker in Spotlight uses **opacity rows** (0.1, 0.3, 0.5, 0.7, 1.0) for a fade-in effect
- The design uses **no box-shadows** — elevation is achieved through borders, background contrast, and opacity
- Avatar circles use a **1.869px white border** at 64px size throughout
- Heart/like business logic includes special day multiplier ("x2" with `-webkit-text-stroke: 1.04px #000`)
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags
- Ensure color contrast meets WCAG AA: white #FFF on dark #00101A = ~18:1 (AAA). Gold #FFEA9E on dark #00101A = ~13:1 (AAA)
- Frame image reference: ![Sun* Kudos - Live Board](assets/frame.png)
- Frame image URL: https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/2940:13431/7c1bdfe017f253ebc155a2c8d0cd949c.png
