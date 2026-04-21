import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';
import type { CookieOptions } from '@supabase/ssr';

/**
 * OAuth callback route handler.
 * Exchanges the auth code for a session and redirects to the homepage.
 */
// Allowed redirect paths (whitelist)
const ALLOWED_REDIRECT_PATHS = ['/', '/sun-kudos', '/awards-information', '/the-le'];

function isValidRedirectPath(path: string): boolean {
  // Must start with / and not contain protocol or external references
  if (!path.startsWith('/')) return false;
  if (path.startsWith('//')) return false; // Prevent protocol-relative URLs
  if (path.includes('://')) return false; // Prevent absolute URLs
  if (path.includes('\\')) return false; // Prevent backslash tricks

  // Extract just the pathname (without query string)
  const pathname = path.split('?')[0];

  // Check against whitelist or allow any path starting with /
  // For more security, use: return ALLOWED_REDIRECT_PATHS.includes(pathname);
  return pathname.startsWith('/');
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const rawNext = searchParams.get('next') ?? '/';

  // Validate redirect path to prevent open redirect attacks
  const next = isValidRedirectPath(rawNext) ? rawNext : '/';

  if (code) {
    const cookieStore = await cookies();

    // Track cookies to set in the response
    const cookiesToSetInResponse: { name: string; value: string; options: CookieOptions }[] = [];

    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
                cookiesToSetInResponse.push({ name, value, options });
              });
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing user sessions.
            }
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.session) {
      // Successful authentication - redirect to the intended destination
      const response = NextResponse.redirect(`${origin}${next}`);

      // Set cookies in the response as well
      cookiesToSetInResponse.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, options);
      });

      return response;
    }

    console.error('Auth callback error:', error?.message || 'No session returned');
    console.error('Error details:', JSON.stringify(error, null, 2));
  }

  // If there's no code or an error occurred, redirect to login with an error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}
