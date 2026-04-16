# Login - Specification

## 1. Screen Overview
- **Screen Name:** Login
- **Purpose:** Landing page for the Sun Annual Awards 2025 (SAA 2025) web application. Displays a hero visual and provides a single Google OAuth login button for authentication.
- **User Access:** Any user (Sun* employee) can access this page. Unauthenticated users see the login screen. Authenticated users should be redirected away from this page.
- **Navigation:** Users reach this screen via the root URL of the application or by being redirected here when accessing a protected page while unauthenticated.

## 2. UI Elements

### 2.1 A_Header (Navigation Bar)
- **Type:** Navigation container (INSTANCE)
- **Label:** N/A
- **Description:** Top navigation header containing the application logo and language selector. Contains child items A.1_Logo and A.2_Language.
- **Placeholder:** N/A
- **Default Value:** N/A
- **Position:** Top of the screen, full width

### 2.2 A.1_Logo
- **Type:** Image/Logo
- **Label:** N/A (SAA 2025 logo image)
- **Description:** Sun Annual Awards 2025 logo displayed at the top-left corner. No interaction.
- **Placeholder:** N/A
- **Default Value:** N/A
- **Position:** Top-left corner within the header

### 2.3 A.2_Language (Language Selector)
- **Type:** Toggle button
- **Label:** "VN"
- **Description:** Language selector button showing current language with a country flag icon and downward chevron. Click opens a dropdown to select language. Hover shows highlight effect and cursor change.
- **Placeholder:** N/A
- **Default Value:** VN (Vietnamese)
- **Position:** Top-right corner within the header

### 2.4 B_Bìa (Hero Cover)
- **Type:** Container/Hero section (FRAME)
- **Label:** N/A
- **Description:** Hero cover section introducing SAA 2025 with a login call-to-action. Contains child items B.1_Key Visual, B.2_content, and B.3_Login. Background features key visual artwork. Includes title, description text, and login button.
- **Placeholder:** N/A
- **Default Value:** N/A
- **Position:** Center/main area of the screen

### 2.5 B.1_Key Visual
- **Type:** Image/Hero banner
- **Label:** N/A
- **Description:** Hero key visual on the login page displaying decorative artwork pattern and the title 'ROOT FURTHER'. No interaction. Static display element.
- **Placeholder:** N/A
- **Default Value:** N/A
- **Position:** Background of the hero section

### 2.6 B.2_content (Introduction Content)
- **Type:** Text/Info block
- **Label:** N/A
- **Description:** Short descriptive text in the hero area encouraging users to log in. Displays two lines: 'Bắt đầu hành trình của bạn cùng SAA 2025.' and 'Đăng nhập để khám phá!'. Display only, no interaction.
- **Placeholder:** N/A
- **Default Value:** N/A
- **Position:** Center of the hero section, above the login button

### 2.7 B.3_Login (Login with Google Button)
- **Type:** Button (icon_text)
- **Label:** "LOGIN With Google"
- **Description:** Primary action button for logging in via Google account. Displays Google logo icon on the left and text 'LOGIN With Google'. Click opens Google OAuth authentication flow and returns user info upon success. When processing, button is disabled and displays a loading spinner. When disabled, button appears dimmed and does not respond to click. Double-click prevention: button disables immediately after first click to prevent duplicate auth requests.
- **Placeholder:** N/A
- **Default Value:** N/A
- **Position:** Center of the hero section, below the description text

### 2.8 C_Keyvisual (Background Key Visual)
- **Type:** Group/Decorative container
- **Label:** N/A
- **Description:** Decorative background group containing the key visual abstract colorful wave artwork for the login screen. No interaction. Purely decorative.
- **Placeholder:** N/A
- **Default Value:** N/A
- **Position:** Full-screen background

### 2.9 D_Footer
- **Type:** Label/Text
- **Label:** "Bản quyền thuộc về Sun* © 2025"
- **Description:** Copyright notice displayed at the bottom of the page. Shows 'Bản quyền thuộc về Sun* © 2025'. Display only. Always fixed at the bottom of the page. No interaction.
- **Placeholder:** N/A
- **Default Value:** N/A
- **Position:** Bottom of the screen, fixed

## 3. Validation Rules

### 3.1 Login Button (B.3_Login)
- **Required:** N/A (not an input field)
- **Format:** N/A
- **Min Length:** N/A
- **Max Length:** N/A
- **Error Message:** Not explicitly defined in design specs

## 4. User Interactions

### 4.1 Click Login with Google Button (B.3_Login)
- **Element:** B.3_Login button
- **Trigger:** Click
- **Expected Behavior:** Opens Google OAuth authentication flow
- **Success State:** User authenticated and redirected to homepage
- **Error Handling:** Not explicitly defined in design specs

### 4.2 Click Language Selector (A.2_Language)
- **Element:** A.2_Language toggle button
- **Trigger:** Click
- **Expected Behavior:** Opens language dropdown menu to switch display language
- **Success State:** Dropdown displayed with language options
- **Error Handling:** N/A

### 4.3 Hover Language Selector (A.2_Language)
- **Element:** A.2_Language toggle button
- **Trigger:** Hover
- **Expected Behavior:** Highlight effect and cursor change
- **Success State:** Button visually highlighted
- **Error Handling:** N/A

### 4.4 Login Button Loading State (B.3_Login)
- **Element:** B.3_Login button
- **Trigger:** After click (during processing)
- **Expected Behavior:** Button becomes disabled and displays loading spinner. Double-click prevention: button disables immediately after first click.
- **Success State:** Button shows loading state while auth is processing
- **Error Handling:** N/A

## 5. Security Considerations
- Authentication is handled via Google OAuth (third-party authentication)
- Unauthenticated users can access the login page
- Authenticated users should be redirected away from the login page (to homepage or dashboard)
- Double-click prevention on login button to prevent duplicate authentication requests
