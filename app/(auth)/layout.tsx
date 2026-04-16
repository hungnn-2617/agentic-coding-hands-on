/**
 * Auth route group layout.
 * Minimal wrapper for authentication-related pages (login, callback).
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
