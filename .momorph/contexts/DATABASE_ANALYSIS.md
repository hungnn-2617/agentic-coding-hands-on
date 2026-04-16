# Database Analysis

## Screen Analysis

### Screen: Login (GzbNeVGJHz)

**Entities Identified**: Profile (extends Supabase auth.users)
**Fields**:
- Google OAuth authentication (handled by Supabase Auth)
- Language preference (locale)
- User role (user, admin)

### Screen: Homepage SAA (i87tDx10uM)

**Entities Identified**: AwardCategory, Campaign (event config)
**Fields**:
- Award categories: name, slug, description, quantity, unit_type, prize_value, image_url, display_order
- Event countdown: target datetime (environment variable, not DB)
- Navigation links (About SAA, Awards Information, Sun* Kudos)

### Screen: Award System (zFYDgyj_pD)

**Entities Identified**: AwardCategory
**Fields**:
- name (Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP)
- description (detailed criteria/purpose)
- quantity (01, 02, 03, 10)
- unit_type (individual "Cá nhân" / team "Tập thể" / unit "Đơn vị")
- prize_value (5,000,000 - 15,000,000 VND)
- image_url (award graphic)

### Screen: Sun* Kudos Live Board (MaZUn5xHXZ)

**Entities Identified**: Kudo, KudoLike, Hashtag, Department, SecretBox, Badge, Profile
**Fields**:
- Kudo: sender, receiver, content (rich text), title, hashtags (max 5), images (max 5), is_anonymous, timestamp
- KudoLike (hearts): user_id, kudo_id, is_special_day, heart_value (1 or 2)
  - Rules: 1 like per user per kudo; sender cannot like own kudo; special day = 2 hearts
- Filters: by Hashtag, by Department (Phong ban)
- Sidebar stats: kudos received, kudos sent, hearts received, secret boxes opened/unopened
- Leaderboards: "10 Sunner thang hang moi nhat", "10 Sunner nhan qua moi nhat"
- Spotlight board: total kudos count, word cloud of recipients
- Asterisk logic: 10 kudos = 1 star, 20 = 2 stars, 50 = 3 stars

### Screen: Write Kudo (ihQ26W78P2)

**Entities Identified**: Kudo, KudoHashtag, KudoImage, KudoMention
**Fields**:
- Receiver: search/select user (required)
- Title/Danh hieu: text, displayed as Kudo title (required)
- Content: rich text with formatting (B, I, S, numbered list, link, quote), supports @mentions (required)
- Hashtags: select from dropdown, min 1, max 5 (required)
- Images: upload, max 5 (optional)
- Anonymous: checkbox toggle; if enabled shows anonymous name field
- Actions: Cancel, Submit (disabled until required fields filled)

### Screen: Open Secret Box (J3-4YFIpMM)

**Entities Identified**: SecretBox, Badge
**Fields**:
- Secret box: user_id, is_opened, badge_id, opened_at
- Badge types with drop rates:
  - Stay Gold: 30%
  - Flow to Horizon: 25%
  - Beyond the Boundary: 10%
  - Root Further: 5%
  - Touch of Light: 20%
  - Revival: 10%
- One badge per box opening

### Screen: Admin - Settings (fTCVEC9aV_) [inferred from frame name]

**Entities Identified**: Campaign
**Fields**:
- name, description, start_date, end_date
- heart_multiplier (special day: x2 hearts)
- is_active

### Screen: Admin - User (-u1lKib0JL) [inferred from frame name]

**Entities Identified**: Profile (role management)
**Fields**:
- User role assignment (user, admin)
- User status management

### Screen: Notifications (6-1LRz3vqr) [inferred from frame name]

**Entities Identified**: Notification
**Fields**:
- user_id, type, title, content, reference_type, reference_id, is_read, created_at

## Entity Mapping

| Screen | Entities | Key Fields | Relationships |
| ------ | -------- | ---------- | ------------- |
| Login | Profile | locale, role | Profile -> auth.users |
| Homepage | AwardCategory | name, slug, prize_value | standalone |
| Award System | AwardCategory | name, description, quantity, unit_type, prize_value | standalone |
| Kudos Live Board | Kudo, KudoLike, Hashtag, Department | content, sender, receiver, hearts | Kudo -> Profile (sender/receiver), KudoLike -> Kudo + Profile |
| Write Kudo | Kudo, KudoHashtag, KudoImage, KudoMention | content, hashtags, images, mentions | Kudo -> Hashtag (M2M), Kudo -> Image (1:N), Kudo -> Mention (1:N) |
| Secret Box | SecretBox, Badge | is_opened, badge_id, drop_rate | SecretBox -> Profile, SecretBox -> Badge |
| Admin Settings | Campaign | name, start_date, end_date, heart_multiplier | standalone |
| Admin User | Profile | role | Profile -> auth.users |
| Notifications | Notification | type, content, is_read | Notification -> Profile |

## Data Flow

1. **Authentication**: User logs in via Google OAuth -> Supabase Auth creates `auth.users` record -> trigger creates `profiles` row
2. **Kudo Creation**: User fills form -> creates `kudos` record + `kudo_hashtags` + `kudo_images` + `kudo_mentions` -> notifications sent to receiver and mentioned users -> receiver gains secret boxes
3. **Like/Heart Flow**: User clicks heart on kudo -> creates `kudo_likes` record -> sender's heart count increases by 1 (or 2 on special campaign days)
4. **Secret Box Flow**: User accumulates boxes from receiving kudos -> opens box -> random badge assigned based on drop rates -> `secret_boxes` updated
5. **Admin Flow**: Admin configures campaigns (special days) and manages user roles/content moderation

## Supabase Auth Integration Notes

- `auth.users` is managed by Supabase Auth (Google OAuth provider)
- `profiles` table extends `auth.users` via FK on `id` (UUID)
- A database trigger on `auth.users` INSERT creates the corresponding `profiles` row
- `raw_user_meta_data` in `auth.users` contains Google profile info (full_name, avatar_url)
- Row Level Security (RLS) must be enabled on all public tables
