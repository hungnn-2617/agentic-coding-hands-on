'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PenIcon, SaaSmallIcon, CloseIcon } from '@/components/icons';
import { useClickOutside } from '@/hooks/use-click-outside';

interface FloatingActionButtonProps {
  onWriteKudo: () => void;
}

export function FloatingActionButton({ onWriteKudo }: FloatingActionButtonProps) {
  const [expanded, setExpanded] = useState(false);
  const [closing, setClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  // Collapse on route change
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      setExpanded(false);
      setClosing(false);
    }
    prevPathnameRef.current = pathname;
  }, [pathname]);

  // Escape key dismiss
  useEffect(() => {
    if (!expanded) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleCollapse();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  // Auto-focus first button when expanded
  useEffect(() => {
    if (expanded && !closing) {
      firstButtonRef.current?.focus();
    }
  }, [expanded, closing]);

  // Outside click dismiss
  useClickOutside(containerRef, useCallback(() => {
    if (expanded && !closing) {
      handleCollapse();
    }
  }, [expanded, closing]));

  function handleCollapse() {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setExpanded(false);
      setClosing(false);
    }, 250);
  }

  function handleExpand() {
    if (closing) return;
    setExpanded(true);
  }

  function handleWriteKudo() {
    onWriteKudo();
    setExpanded(false);
    setClosing(false);
  }

  function handleTheLe() {
    router.push('/the-le');
    setExpanded(false);
    setClosing(false);
  }

  // Focus-out collapse (FR-010)
  function handleBlurCapture(e: React.FocusEvent) {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      handleCollapse();
    }
  }

  if (expanded) {
    return (
      <div
        ref={containerRef}
        role="menu"
        aria-label="Quick actions"
        onBlurCapture={handleBlurCapture}
        className={`fixed bottom-20 right-4 sm:bottom-[100px] sm:right-4 lg:bottom-[120px] lg:right-[19px] z-50 flex w-[214px] flex-col items-end gap-5 ${
          closing ? 'animate-[fab-slide-out_250ms_ease-out_forwards]' : 'animate-[fab-slide-in_250ms_ease-out]'
        }`}
      >
        {/* Thể lệ button */}
        <button
          ref={firstButtonRef}
          role="menuitem"
          onClick={handleTheLe}
          className="flex h-16 w-[149px] cursor-pointer items-center gap-2 rounded bg-[var(--color-bg-button-primary)] p-4 transition-all duration-150 ease-in-out hover:shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:brightness-105 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#00101A] focus-visible:outline-offset-2"
          style={{
            animation: closing
              ? 'fab-slide-out 200ms ease-out forwards'
              : 'fab-slide-in 200ms ease-out both',
            animationDelay: closing ? '100ms' : '0ms',
          }}
        >
          <SaaSmallIcon className="h-6 w-6 text-[#00101A]" />
          <span className="font-montserrat text-2xl font-bold leading-8 text-[#00101A]">
            Thể lệ
          </span>
        </button>

        {/* Viết KUDOS button */}
        <button
          role="menuitem"
          onClick={handleWriteKudo}
          className="flex h-16 w-[214px] cursor-pointer items-center gap-2 rounded bg-[var(--color-bg-button-primary)] p-4 transition-all duration-150 ease-in-out hover:shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:brightness-105 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#00101A] focus-visible:outline-offset-2"
          style={{
            animation: closing
              ? 'fab-slide-out 200ms ease-out forwards'
              : 'fab-slide-in 200ms ease-out both',
            animationDelay: closing ? '50ms' : '50ms',
          }}
        >
          <PenIcon className="h-6 w-6 text-[#00101A]" />
          <span className="font-montserrat text-2xl font-bold leading-8 text-[#00101A]">
            Viết KUDOS
          </span>
        </button>

        {/* Close button */}
        <button
          role="menuitem"
          aria-label="Close menu"
          onClick={handleCollapse}
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#D4271D] transition-all duration-150 ease-in-out hover:bg-[#B8221A] hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)] active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-[#D4271D] focus-visible:outline-offset-2"
          style={{
            animation: closing
              ? 'fab-slide-out 200ms ease-out forwards'
              : 'fab-slide-in 200ms ease-out both',
            animationDelay: closing ? '0ms' : '100ms',
          }}
        >
          <CloseIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label="Quick actions"
      aria-expanded={expanded}
      onClick={handleExpand}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleExpand();
        }
      }}
      className="fixed bottom-20 right-4 z-50 flex h-16 w-[106px] cursor-pointer items-center gap-2 rounded-full bg-[var(--color-bg-button-primary)] p-4 shadow-[var(--shadow-golden-glow)] transition-all duration-200 ease-in-out hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.35),0_0_10px_0_#FAE287] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 sm:bottom-[100px] sm:right-4 lg:bottom-[120px] lg:right-[19px]"
    >
      <PenIcon className="h-6 w-6 text-[#00101A]" />
      <span className="font-montserrat text-2xl font-bold leading-8 text-[#00101A]">
        /
      </span>
      <SaaSmallIcon className="h-6 w-6 text-[#00101A]" />
    </div>
  );
}
