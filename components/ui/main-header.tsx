import Image from 'next/image';
import Link from 'next/link';
import { NavLinks } from '@/components/ui/nav-links';
import { LanguageSelector } from '@/components/ui/language-selector';
import { NotificationBell } from '@/components/ui/notification-bell';
import { ProfileDropdown } from '@/components/ui/profile-dropdown';

interface MainHeaderProps {
  userEmail?: string;
  isAdmin?: boolean;
  unreadCount?: number;
}

export function MainHeader({ userEmail, isAdmin = false, unreadCount = 0 }: MainHeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full h-20 px-4 sm:px-12 lg:px-36 py-3 flex items-center justify-between"
      style={{ background: 'rgba(16, 20, 23, 0.80)' }}
      role="banner"
    >
      <div className="flex items-center gap-16">
        <Link href="/" aria-label="SAA 2025 Homepage">
          <Image
            src="/images/saa-logo.png"
            alt="SAA 2025 Logo"
            width={52}
            height={48}
            className="w-[52px] h-12 object-contain"
            priority
          />
        </Link>
        <NavLinks />
      </div>

      <div className="flex items-center gap-4">
        <LanguageSelector />
        <NotificationBell unreadCount={unreadCount} />
        <ProfileDropdown userEmail={userEmail} isAdmin={isAdmin} />
      </div>
    </header>
  );
}
