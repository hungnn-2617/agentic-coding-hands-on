'use client';

import { useState, useRef, useEffect } from 'react';
import { FieldLabel } from './field-label';
import { ChevronDownIcon } from '@/components/icons/chevron-down-icon';
import { useUserSearch } from '@/hooks/use-user-search';
import type { KudoUser } from '@/types/kudo';

interface RecipientFieldProps {
  value: KudoUser | null;
  onSelect: (user: KudoUser | null) => void;
  error?: string;
  labels: {
    label: string;
    placeholder: string;
    noResults: string;
  };
}

export function RecipientField({ value, onSelect, error, labels }: RecipientFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const { results, isLoading } = useUserSearch(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const inputId = 'kudo-recipient';
  const listId = 'kudo-recipient-list';
  const errorId = 'kudo-recipient-error';

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(user: KudoUser) {
    onSelect(user);
    setQuery('');
    setIsOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen && e.key === 'ArrowDown') {
      setIsOpen(true);
      return;
    }
    if (!isOpen) return;

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
      case 'Escape':
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  }

  return (
    <div className="flex items-center gap-4 w-full max-sm:flex-col max-sm:items-start max-sm:gap-2">
      <FieldLabel label={labels.label} required htmlFor={inputId} />
      <div ref={containerRef} className="relative flex-1 w-full">
        {value ? (
          <button
            type="button"
            onClick={() => {
              onSelect(null);
              setIsOpen(true);
              setTimeout(() => inputRef.current?.focus(), 0);
            }}
            className="w-full flex items-center justify-between px-6 py-4 bg-white border border-[#998C5F] rounded-lg text-base font-bold text-[#00101A]"
          >
            <span>{value.full_name}</span>
            <ChevronDownIcon className="w-6 h-6 text-[#00101A]" />
          </button>
        ) : (
          <div className="relative">
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              role="combobox"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
                setActiveIndex(-1);
              }}
              onFocus={() => query.length > 0 && setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={labels.placeholder}
              aria-required="true"
              aria-expanded={isOpen}
              aria-controls={listId}
              aria-activedescendant={activeIndex >= 0 ? `recipient-option-${activeIndex}` : undefined}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
              className={`w-full px-6 py-4 pr-12 bg-white border rounded-lg text-base font-bold leading-6 tracking-[0.15px] text-[#00101A] placeholder:text-[#666] outline-none transition-colors ${
                error ? 'border-[#CF1322]' : 'border-[#998C5F] focus:border-[#FFEA9E]'
              }`}
            />
            <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#00101A] pointer-events-none" />
          </div>
        )}

        {isOpen && !value && (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-[#998C5F] rounded-lg shadow-lg"
          >
            {isLoading && (
              <li className="px-4 py-3 text-sm text-[#666] text-center">...</li>
            )}
            {!isLoading && results.length === 0 && query.length > 0 && (
              <li className="px-4 py-3 text-sm text-[#666] text-center">{labels.noResults}</li>
            )}
            {!isLoading && results.map((user, index) => (
              <li
                key={user.id}
                id={`recipient-option-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                onClick={() => handleSelect(user)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-sm font-bold text-[#00101A] ${
                  index === activeIndex ? 'bg-[rgba(255,234,158,0.2)]' : 'hover:bg-[rgba(255,234,158,0.1)]'
                }`}
              >
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#998C5F] flex items-center justify-center text-white text-xs">
                    {user.full_name.charAt(0)}
                  </div>
                )}
                <span>{user.full_name}</span>
              </li>
            ))}
          </ul>
        )}

        {error && (
          <p id={errorId} role="alert" className="mt-1 text-sm font-bold text-[#CF1322]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
