'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/use-language';
import { UserIcon } from '@/components/icons';
import { useClickOutside } from '@/hooks/use-click-outside';
import { createClient } from '@/lib/supabase/client';

interface ProfileDropdownProps {
  userEmail?: string;
  avatarUrl?: string;
  isAdmin?: boolean;
}

export function ProfileDropdown({ userEmail, avatarUrl, isAdmin = false }: ProfileDropdownProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useClickOutside(dropdownRef, useCallback(() => setIsOpen(false), []));

  async function handleSignOut() {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push('/login');
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('profile.ariaLabel')}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={`
          w-10 h-10 flex items-center justify-center
          ${avatarUrl ? 'rounded-full overflow-hidden' : 'border border-[#998C5F] rounded'}
          cursor-pointer transition-colors duration-150
          hover:border-[#FFEA9E]
          focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2
        `}
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <UserIcon className="w-6 h-6 text-white" />
        )}
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 min-w-[180px] bg-[#0B0F12] border border-white/10 rounded-lg shadow-lg overflow-hidden"
        >
          {userEmail && (
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-white/70 text-xs truncate">{userEmail}</p>
            </div>
          )}
          <button
            role="menuitem"
            onClick={() => { setIsOpen(false); router.push('/profile'); }}
            className="w-full text-left px-4 py-3 text-white text-sm font-bold hover:bg-white/10 cursor-pointer transition-colors"
          >
            {t('profile.profile')}
          </button>
          {isAdmin && (
            <button
              role="menuitem"
              onClick={() => { setIsOpen(false); router.push('/admin'); }}
              className="w-full text-left px-4 py-3 text-white text-sm font-bold hover:bg-white/10 cursor-pointer transition-colors"
            >
              {t('profile.adminDashboard')}
            </button>
          )}
          <button
            role="menuitem"
            onClick={handleSignOut}
            className="w-full text-left px-4 py-3 text-white text-sm font-bold hover:bg-white/10 cursor-pointer transition-colors border-t border-white/10"
          >
            {t('profile.signOut')}
          </button>
        </div>
      )}
    </div>
  );
}
