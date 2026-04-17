'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { BellIcon } from '@/components/icons';

interface NotificationBellProps {
  unreadCount?: number;
}

export function NotificationBell({ unreadCount = 0 }: NotificationBellProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`${t('notification.ariaLabel')}${unreadCount > 0 ? ` ${t('notification.unread', { count: unreadCount })}` : ''}`}
        className="
          relative w-10 h-10 flex items-center justify-center
          rounded text-white cursor-pointer
          transition-colors duration-150
          hover:bg-white/10
          focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2
        "
      >
        <BellIcon className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#D4271D] rounded-full" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#0B0F12] border border-white/10 rounded-lg shadow-lg p-4">
          <p className="text-white/50 text-sm text-center">{t('notification.empty')}</p>
        </div>
      )}
    </div>
  );
}
