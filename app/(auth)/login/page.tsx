import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { LoginHero } from '@/components/login/login-hero';
import { LoginButton } from '@/components/login/login-button';
import { LanguageSelector } from '@/components/ui/language-selector';

export const metadata = {
  title: 'Login | SAA 2025',
  description: 'Đăng nhập Sun Annual Awards 2025',
};

/**
 * Login page - Entry point to the SAA 2025 application.
 * Server Component that checks auth state and redirects if already authenticated.
 */
export default async function LoginPage() {
  const supabase = await createClient();

  // Only check auth if Supabase is configured
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Redirect authenticated users to home
    if (user) {
      redirect('/');
    }
  }

  return (
    <div className="relative min-h-screen bg-[#00101A] overflow-hidden">
      {/* Header - fixed at top */}
      <Header>
        <LanguageSelector />
      </Header>

      {/* Background, gradients, and hero content */}
      <LoginHero>
        <LoginButton />
      </LoginHero>

      {/* Footer - fixed at bottom */}
      <Footer />
    </div>
  );
}
