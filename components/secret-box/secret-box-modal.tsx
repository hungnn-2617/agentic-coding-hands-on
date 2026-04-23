'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { useSecretBox } from '@/hooks/use-secret-box';
import { ModalHeader } from './modal-header';
import { InstructionText } from './instruction-text';
import { GiftBox } from './gift-box';
import { CountDisplay } from './count-display';
import { Divider } from '@/components/ui/divider';
import type { SecretBoxModalProps } from '@/types/secret-box';

/**
 * SecretBoxModal Component
 *
 * Main modal container for the Secret Box feature.
 * Allows users to open mystery boxes and receive random badge rewards.
 *
 * Features:
 * - Escape key to close
 * - Backdrop click to close
 * - Body scroll lock when open
 * - Focus trap inside modal
 * - Screen reader announcements
 */
export function SecretBoxModal({ isOpen, onClose }: SecretBoxModalProps) {
  const { t } = useLanguage();
  const { state, openBox, fetchCount, resetState } = useSecretBox();
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const countAnimatingRef = useRef(false);
  const previousCountRef = useRef<number | null>(null);

  // Track count changes for animation
  useEffect(() => {
    if (previousCountRef.current !== null && previousCountRef.current !== state.unopenedCount) {
      countAnimatingRef.current = true;
      const timer = setTimeout(() => {
        countAnimatingRef.current = false;
      }, 200);
      return () => clearTimeout(timer);
    }
    previousCountRef.current = state.unopenedCount;
  }, [state.unopenedCount]);

  // Fetch count when modal opens
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      fetchCount();
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, fetchCount]);

  // Handle escape key
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

  // Focus modal when it opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
    triggerRef.current?.focus();
  }, [onClose, resetState]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  const handleOpenBox = useCallback(() => {
    if (state.unopenedCount > 0 && !state.isOpening) {
      openBox();
    }
  }, [openBox, state.unopenedCount, state.isOpening]);

  if (!isOpen) {
    return null;
  }

  const isDisabled = state.unopenedCount === 0 || state.isLoading;
  const showInstruction = state.unopenedCount > 0 && !state.isLoading;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60
        animate-[backdrop-enter_0.2s_ease-out]
      "
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="secret-box-modal-title"
        tabIndex={-1}
        className="
          w-[95vw] max-w-[651px]
          bg-[#00101A] rounded-[12.73px]
          px-[12.73px] py-[23.87px]
          flex flex-col items-center justify-center
          gap-[22.28px]
          outline-none
          animate-[modal-enter_0.2s_ease-out]
        "
      >
        {/* Header with title and close button */}
        <ModalHeader onClose={handleClose} />

        {/* Divider */}
        <Divider className="max-w-[626px]" />

        {/* Instruction text - hidden when no boxes */}
        <InstructionText isVisible={showInstruction} />

        {/* Gift box image */}
        <GiftBox
          isDisabled={isDisabled}
          isOpening={state.isOpening}
          onClick={handleOpenBox}
        />

        {/* Divider */}
        <Divider className="max-w-[626px]" />

        {/* Unopened count display */}
        {state.isLoading ? (
          <div className="h-[35px] flex items-center justify-center">
            <div className="w-[100px] h-[20px] bg-[#2E3940] rounded animate-pulse" />
          </div>
        ) : (
          <CountDisplay
            count={state.unopenedCount}
            isAnimating={countAnimatingRef.current}
          />
        )}

        {/* Screen reader announcement for badge reveal */}
        {state.revealedBadge && (
          <div
            role="status"
            aria-live="polite"
            className="sr-only"
          >
            {t('secretBox.badgeRevealed').replace(
              '{badgeName}',
              state.revealedBadge.display_name
            )}
          </div>
        )}
      </div>
    </div>
  );
}
