'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { FlagVnIcon, FlagEnIcon, ChevronDownIcon } from '@/components/icons';
import type { Locale } from '@/lib/i18n/types';

interface Language {
  code: Locale;
  label: string;
  Flag: typeof FlagVnIcon;
}

const languages: Language[] = [
  { code: 'vi', label: 'VN', Flag: FlagVnIcon },
  { code: 'en', label: 'EN', Flag: FlagEnIcon },
];

export function LanguageSelector() {
  const { locale, t, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentLanguage = languages.find((lang) => lang.code === locale)!;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus management when dropdown opens
  useEffect(() => {
    if (isOpen) {
      const currentIndex = languages.findIndex((l) => l.code === locale);
      setFocusIndex(currentIndex);
      optionRefs.current[currentIndex]?.focus();
    } else {
      setFocusIndex(-1);
    }
  }, [isOpen, locale]);

  const handleSelect = useCallback(
    (code: Locale) => {
      setLocale(code);
      setIsOpen(false);
    },
    [setLocale],
  );

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
      const next = (focusIndex + 1) % languages.length;
      setFocusIndex(next);
      optionRefs.current[next]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prev = (focusIndex - 1 + languages.length) % languages.length;
      setFocusIndex(prev);
      optionRefs.current[prev]?.focus();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (focusIndex >= 0) {
        handleSelect(languages[focusIndex].code);
      }
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
        aria-label={t('common.languageSelector.ariaLabel')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`
          flex items-center gap-0.5 px-4 py-2 rounded
          font-bold text-base text-white cursor-pointer
          transition-colors duration-150
          hover:bg-white/10
          focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
          ${isOpen ? 'bg-white/10' : ''}
        `}
      >
        <currentLanguage.Flag className="w-5 h-5" />
        <span className="ml-1">{currentLanguage.label}</span>
        <ChevronDownIcon
          className={`w-6 h-6 transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          role="listbox"
          aria-label={t('common.languageSelector.listAriaLabel')}
          onKeyDown={handleListKeyDown}
          className="absolute right-0 mt-2 z-50 flex flex-col items-start p-1.5 bg-[#00070C] border border-[#998C5F] rounded-lg animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {languages.map((language, index) => {
            const isSelected = language.code === locale;
            return (
              <button
                key={language.code}
                ref={(el) => { optionRefs.current[index] = el; }}
                role="option"
                aria-selected={isSelected}
                tabIndex={focusIndex === index ? 0 : -1}
                onClick={() => handleSelect(language.code)}
                className={`
                  w-full h-14 flex items-center rounded transition-colors duration-150 cursor-pointer
                  focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2
                  ${
                    isSelected
                      ? 'bg-[rgba(255,234,158,0.2)] rounded-sm hover:bg-[rgba(255,234,158,0.3)] active:bg-[rgba(255,234,158,0.4)]'
                      : 'bg-transparent hover:bg-white/10 active:bg-[rgba(255,234,158,0.4)]'
                  }
                `}
              >
                <span className="flex items-center gap-1 p-4 rounded">
                  <language.Flag className="w-6 h-6" />
                  <span className="font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white text-center">
                    {language.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
