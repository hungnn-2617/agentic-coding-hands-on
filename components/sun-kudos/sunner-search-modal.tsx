'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from '@/components/icons/search-icon';
import { CloseIcon } from '@/components/icons/close-icon';
import { useUserSearch } from '@/hooks/use-user-search';
import { useLanguage } from '@/hooks/use-language';
import type { KudoUser } from '@/types/kudo';

interface SunnerSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SunnerSearchModal({ isOpen, onClose }: SunnerSearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const { results, isLoading } = useUserSearch(query);
  const { t } = useLanguage();
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      setTimeout(() => inputRef.current?.focus(), 0);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  function handleClose() {
    setQuery('');
    setActiveIndex(-1);
    onClose();
    triggerRef.current?.focus();
  }

  function handleSelect(user: KudoUser) {
    // Navigate to kudos filtered by this user as receiver
    router.push(`/sun-kudos?receiver=${user.id}`);
    handleClose();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && results[activeIndex]) {
          handleSelect(results[activeIndex]);
        }
        break;
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-black/60"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sunner-search-title"
        className="w-full max-w-[600px] mx-4 bg-[#00101A] border border-[#998C5F] rounded-2xl shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#998C5F]/30">
          <h2 id="sunner-search-title" className="text-lg font-bold text-[#FFEA9E]">
            {t('liveBoard.cta.search')}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center text-white hover:text-[#FFEA9E] transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative px-6 py-4">
          <SearchIcon className="absolute left-10 top-1/2 -translate-y-1/2 w-5 h-5 text-[#998C5F]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            placeholder={t('liveBoard.searchPlaceholder')}
            className="w-full pl-12 pr-4 py-3 bg-[rgba(255,234,158,0.1)] border border-[#998C5F] rounded-lg text-base font-medium text-white placeholder:text-[#998C5F] outline-none focus:border-[#FFEA9E] transition-colors"
          />
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {isLoading && (
            <div className="px-6 py-4 text-center text-[#998C5F]">...</div>
          )}

          {!isLoading && query.trim().length > 0 && results.length === 0 && (
            <div className="px-6 py-4 text-center text-[#998C5F]">
              {t('liveBoard.noSearchResults')}
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <ul role="listbox" className="pb-2">
              {results.map((user, index) => (
                <li
                  key={user.id}
                  role="option"
                  aria-selected={index === activeIndex}
                  onClick={() => handleSelect(user)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-colors ${
                    index === activeIndex
                      ? 'bg-[rgba(255,234,158,0.2)]'
                      : 'hover:bg-[rgba(255,234,158,0.1)]'
                  }`}
                >
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover border border-[#998C5F]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#998C5F] flex items-center justify-center text-white font-bold">
                      {user.full_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-white truncate">
                      {user.full_name}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {!isLoading && query.trim().length === 0 && (
            <div className="px-6 py-8 text-center text-[#998C5F]">
              {t('liveBoard.searchHint')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
