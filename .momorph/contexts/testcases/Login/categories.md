# Test Cases: Login

## 1. ACCESSING
| Category | Sub Category | Sub Sub Category |
| -------- | ------------ | ---------------- |
| Check access permission | Direct URL access | Unauthenticated user |
| Check access permission | Direct URL access | Authenticated user |
| Check authentication | Google OAuth | Redirect to login when unauthenticated |

## 2. GUI
| Category | Sub Category | Sub Sub Category |
| -------- | ------------ | ---------------- |
| Check layout | Screen-wide layout | Overall structure |
| Initialize | A.2_Language | Default value/state |

## 3. FUNCTION
| Category | Sub Category | Sub Sub Category |
| -------- | ------------ | ---------------- |
| Check component interaction | B.3_Login button | Click |
| Check state transition | B.3_Login button | Enabled -> Disabled (loading) |
| Check component interaction | A.2_Language selector | Click |
| Check component interaction | A.2_Language selector | Hover |
| Check navigation behavior | B.3_Login button | Google OAuth flow |
| Check navigation behavior | B.3_Login button | Redirect after successful login |
