# Items Analysis - Login

## Screen Context
- **Screen Purpose**: Login screen for the Sun Annual Awards 2025 (SAA 2025) web application. Displays a hero visual with a single Google OAuth login button.
- **Target User Type**: Sun* employee (internal company event participant)

---

### Item C: C_Keyvisual (`662:14388`)

- hasChildren: true
- Name JP: キービジュアル
- Name Trans: Key Visual
- Item Type: others
- Item Subtype: hero_banner
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Decorative background group containing the key visual artwork for the login screen.

Display Elements:
  - Background: Abstract colorful wave artwork covering the full frame

Function & Logic:
  - No interaction. Purely decorative container.

Candidate QA:

---

### Item A: A_Header (`662:14391`)

- hasChildren: true
- Name JP: ヘッダー
- Name Trans: Header
- Item Type: others
- Item Subtype: navigation
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Top navigation header containing the application logo and language selector.

Display Elements:
  - Logo: SAA 2025 icon/image at the top-left corner
  - Language Selector: 'VN' text with flag icon and chevron at the top-right corner

Function & Logic:
  - Logo: No interaction
  - Click Language Selector: Opens a dropdown to select language

Candidate QA:

---

### Item B: B_Bìa (`662:14393`)

- hasChildren: true
- Name JP: ヒーローカバー
- Name Trans: Hero Cover
- Item Type: others
- Item Subtype: hero
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Hero cover section introducing SAA 2025 with a login call-to-action.

Display Elements:
  - Background: Key visual artwork
  - Title: 'ROOT FURTHER'
  - Description Line 1: 'Bắt đầu hành trình của bạn cùng SAA 2025.'
  - Description Line 2: 'Đăng nhập để khám phá!'
  - Button: 'LOGIN With Google' with Google icon

Function & Logic:
  - Click Button: Initiates Google OAuth login flow
  - Hover Button: Slight elevation / shadow effect
  - State: Button disabled and shows loading indicator while processing

Candidate QA:

---

### Item B.1: B.1_Key Visual (`662:14395`)

- hasChildren: false
- Name JP: キービジュアル
- Name Trans: Key Visual
- Item Type: others
- Item Subtype: hero_banner
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Hero key visual on the login page displaying the main artwork and title.

Display Elements:
  - Background: Decorative artwork pattern
  - Title: 'ROOT FURTHER'

Function & Logic:
  - No interaction. Static display element.

Candidate QA:

---

### Item B.2: B.2_content (`662:14753`)

- hasChildren: false
- Name JP: 紹介コンテンツ
- Name Trans: Introduction Content
- Item Type: others
- Item Subtype: info_block
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Short descriptive text in the hero area encouraging users to log in and explore SAA 2025.

Display Elements:
  - Line 1: Label - 'Bắt đầu hành trình của bạn cùng SAA 2025.'
  - Line 2: Label - 'Đăng nhập để khám phá!'

Function & Logic:
  - Display only. Communicates the value proposition and directs user toward the 'LOGIN With Google' button.

Candidate QA:

---

### Item B.3: B.3_Login (`662:14425`)

- hasChildren: false
- Name JP: ログイン
- Name Trans: Login with Google Button
- Item Type: button
- Item Subtype:
- Button Type: icon_text
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Initiates Google OAuth authentication flow and redirects to the homepage upon success
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Primary action button for logging in via Google account.

Display Elements:
  - Icon: Google logo on the left
  - Text: 'LOGIN With Google'

Function & Logic:
  - Click: Opens Google OAuth authentication flow and returns user info upon success
  - State: When processing; button is disabled and displays a loading spinner
  - State: When disabled; button appears dimmed and does not respond to click
  - Double-click prevention: Button disables immediately after first click to prevent duplicate auth requests

Candidate QA:
- What is the behavior when Google authentication fails (e.g. user cancels or network error)?
- Is there a specific error message displayed for authentication failure?
- Where does the user redirect to upon successful login (homepage or last visited page)?

---

### Item D: D_Footer (`662:14447`)

- hasChildren: false
- Name JP: フッター
- Name Trans: Footer
- Item Type: label
- Item Subtype:
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Copyright notice displayed at the bottom of the page.

Display Elements:
  - Text: 'Bản quyền thuộc về Sun* © 2025'

Function & Logic:
  - Display only. Always fixed at the bottom of the page. No interaction.

Candidate QA:

---

### Item A.2: A.2_Language (`I662:14391;186:1601`)

- hasChildren: false
- Name JP: 言語
- Name Trans: Language Selector
- Item Type: button
- Item Subtype:
- Button Type: toggle
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value: VN
- User Action: on_click
- Transition Note: Opens language dropdown menu to switch display language
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Language selector button displaying the current language and opening a dropdown to change language.

Display Elements:
  - Flag: Small country flag icon on the left
  - Text: 'VN'
  - Chevron: Small downward arrow on the right

Function & Logic:
  - Click: Opens dropdown to select language
  - Hover: Highlight effect and cursor change

Candidate QA:
- What languages are available in the dropdown (e.g. VN; EN; JP)?
- Does the language selection persist across sessions (stored in cookie or user profile)?

---

### Item A.1: A.1_Logo (`I662:14391;186:2166`)

- hasChildren: false
- Name JP: ロゴ
- Name Trans: Logo
- Item Type: others
- Item Subtype: logo
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Sun Annual Awards 2025 logo displayed at the top-left corner of the header.

Display Elements:
  - Image: SAA 2025 logo

Function & Logic:
  - No interaction.

Candidate QA:
