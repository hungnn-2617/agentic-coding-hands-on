'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/use-language';
import { UserIcon, ChevronRightIcon } from '@/components/icons';
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
  const [focusIndex, setFocusIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const router = useRouter();

  useClickOutside(dropdownRef, useCallback(() => setIsOpen(false), []));

  // Focus management when dropdown opens/closes
  useEffect(() => {
    if (isOpen) {
      setFocusIndex(0);
      // Defer focus to after render
      requestAnimationFrame(() => {
        itemRefs.current[0]?.focus();
      });
    } else {
      setFocusIndex(-1);
    }
  }, [isOpen]);

  async function handleSignOut() {
    setIsOpen(false);
    const supabase = createClient();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch {
        // Silently proceed — redirect to login regardless
      }
    }
    router.push('/login');
  }

  function handleProfileClick() {
    setIsOpen(false);
    router.push('/profile');
  }

  function handleAdminClick() {
    setIsOpen(false);
    router.push('/admin');
  }

  // Build menu items dynamically based on role
  const menuItems = [
    { key: 'profile', action: handleProfileClick },
    ...(isAdmin ? [{ key: 'admin', action: handleAdminClick }] : []),
    { key: 'logout', action: handleSignOut },
  ];

  function handleTriggerKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = (focusIndex + 1) % menuItems.length;
      setFocusIndex(next);
      itemRefs.current[next]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prev = (focusIndex - 1 + menuItems.length) % menuItems.length;
      setFocusIndex(prev);
      itemRefs.current[prev]?.focus();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (focusIndex >= 0) {
        menuItems[focusIndex].action();
      }
    } else if (event.key === 'Escape') {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  }

  // Render the appropriate content for each menu item
  function renderMenuItem(item: { key: string }, index: number) {
    const isProfile = item.key === 'profile';
    const isLogout = item.key === 'logout';

    const baseClasses =
      'w-full h-14 flex items-center gap-1 p-4 rounded transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2';

    const itemClasses = isProfile
      ? `${baseClasses} bg-[rgba(255,234,158,0.1)] hover:bg-[rgba(255,234,158,0.2)] active:bg-[rgba(255,234,158,0.3)]`
      : `${baseClasses} bg-transparent hover:bg-white/10 active:bg-[rgba(255,234,158,0.3)]`;

    const textStyle = isProfile
      ? { textShadow: 'var(--text-shadow-golden)' }
      : undefined;

    const label = isProfile
      ? t('profile.profile')
      : isLogout
        ? t('profile.signOut')
        : t('profile.adminDashboard');

    return (
      <button
        key={item.key}
        ref={(el) => { itemRefs.current[index] = el; }}
        role="menuitem"
        tabIndex={focusIndex === index ? 0 : -1}
        onClick={() => menuItems[index].action()}
        className={itemClasses}
      >
        <span
          className="font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white whitespace-nowrap text-center"
          style={textStyle}
        >
          {label}
        </span>
        {isProfile && <UserIcon className="w-6 h-6 text-white" />}
        {isLogout && <ChevronRightIcon className="w-6 h-6 text-white" />}
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
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
            alt={userEmail ?? ''}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <UserIcon className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          role="menu"
          aria-label={t('profile.ariaLabel')}
          onKeyDown={handleListKeyDown}
          className="absolute right-0 mt-2 z-50 flex flex-col items-start gap-1 p-1.5 bg-[#00070C] border border-[#998C5F] rounded-lg animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </div>
      )}
    </div>
  );
}
