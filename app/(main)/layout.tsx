import { MainHeader } from '@/components/ui/main-header';
import { MainFooter } from '@/components/ui/main-footer';
import { createClient } from '@/lib/supabase/server';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  let userEmail: string | undefined;
  let isAdmin = false;

  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    userEmail = user?.email ?? undefined;
    // TODO: Check admin role from profiles table when available
    isAdmin = false;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#FFEA9E] focus:text-[#00101A] focus:rounded focus:font-bold"
      >
        Skip to main content
      </a>
      <MainHeader userEmail={userEmail} isAdmin={isAdmin} unreadCount={0} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <MainFooter />
    </>
  );
}
