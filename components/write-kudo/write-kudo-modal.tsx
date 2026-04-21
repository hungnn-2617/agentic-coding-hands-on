'use client';

import { useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import { useLanguage } from '@/hooks/use-language';
import { useWriteKudo } from '@/hooks/use-write-kudo';
import { RecipientField } from './recipient-field';
import { DanhHieuField } from './danh-hieu-field';
import { HashtagField } from './hashtag-field';
import { ImageUploadField } from './image-upload-field';
import { AnonymousCheckbox } from './anonymous-checkbox';
import { ActionBar } from './action-bar';
import { deleteImage } from '@/lib/utils/image-upload';

const KudoEditor = dynamic(
  () => import('./kudo-editor').then((mod) => ({ default: mod.KudoEditor })),
  { ssr: false }
);

interface WriteKudoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  userId: string;
}

export function WriteKudoModal({ isOpen, onClose, onSuccess, userId }: WriteKudoModalProps) {
  const { t } = useLanguage();
  const { state, dispatch, validate, getPayload, isFormValid } = useWriteKudo();
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const handleCloseRef = useRef<() => void>(() => {});
  const titleId = 'write-kudo-title';

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const modal = modalRef.current;
    if (!modal) return;

    const firstFocusable = modal.querySelector<HTMLElement>(
      'input, button, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    document.body.style.overflow = 'hidden';

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleCloseRef.current();
        return;
      }
      if (e.key === 'Tab' && modal) {
        const focusableEls = modal.querySelectorAll<HTMLElement>(
          'input, button, textarea, select, a[href], [tabindex]:not([tabindex="-1"]), .ProseMirror'
        );
        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const cleanupImages = useCallback(async (deleteRemote = true) => {
    for (const img of state.images) {
      if (img.previewUrl) URL.revokeObjectURL(img.previewUrl);
      if (deleteRemote && img.uploadedUrl) {
        await deleteImage(img.uploadedUrl, userId).catch(() => {});
      }
    }
  }, [state.images, userId]);

  const handleClose = useCallback(() => {
    cleanupImages();
    dispatch({ type: 'RESET' });
    onClose();
    triggerRef.current?.focus();
  }, [cleanupImages, dispatch, onClose]);

  // Keep ref in sync so the Escape handler always uses the latest version
  handleCloseRef.current = handleClose;

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  }, [handleClose]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;
    dispatch({ type: 'SET_SUBMITTING', payload: true });

    try {
      const payload = getPayload();
      const res = await fetch('/api/kudos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Submit failed');
      }
      toast.success(t('writeKudo.success'));
      await cleanupImages(false); // revoke blob URLs but keep remote uploads (they belong to the kudo now)
      dispatch({ type: 'RESET' });
      onClose();
      onSuccess?.();
    } catch {
      toast.error(t('writeKudo.error'));
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  }, [validate, getPayload, dispatch, onClose, onSuccess, t]);

  const fetchHashtagOptions = useCallback(async () => {
    if (state.hashtagOptions.length > 0) return;
    try {
      const res = await fetch('/api/hashtags');
      const json = await res.json();
      const names = (json.data ?? []).map((h: { name: string }) => h.name);
      dispatch({ type: 'SET_HASHTAG_OPTIONS', payload: names });
    } catch { /* ignore */ }
  }, [state.hashtagOptions.length, dispatch]);

  const createHashtag = useCallback(async (name: string) => {
    try {
      const normalised = name.trim().toLowerCase();
      const res = await fetch('/api/hashtags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: normalised }),
      });
      if (!res.ok && res.status !== 409) return; // 409 = duplicate, treat as success
      dispatch({ type: 'SET_HASHTAG_OPTIONS', payload: [...state.hashtagOptions, normalised] });
    } catch { /* ignore */ }
  }, [state.hashtagOptions, dispatch]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,16,26,0.8)]"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-[775px] max-w-full max-h-[calc(100vh-40px)] overflow-y-auto bg-[#FFF8E1] rounded-3xl p-10 flex flex-col gap-8 max-sm:w-full max-sm:h-full max-sm:max-h-full max-sm:rounded-none max-sm:p-4 sm:max-lg:w-[90vw] sm:max-lg:max-w-[775px] sm:max-lg:p-6"
      >
        {/* A: Title */}
        <h2
          id={titleId}
          className="text-[32px] font-bold leading-10 text-[#00101A] text-center w-full max-sm:text-2xl max-sm:leading-8"
        >
          {t('writeKudo.title')}
        </h2>

        {/* B: Recipient */}
        <RecipientField
          value={state.recipient}
          onSelect={(user) => dispatch({ type: 'SET_RECIPIENT', payload: user })}
          error={state.errors.recipient ? t(state.errors.recipient as 'writeKudo.validation.recipientRequired') : undefined}
          labels={{
            label: t('writeKudo.recipient.label'),
            placeholder: t('writeKudo.recipient.placeholder'),
            noResults: t('writeKudo.recipient.noResults'),
          }}
        />

        {/* Danh hiệu */}
        <DanhHieuField
          value={state.title}
          onChange={(val) => dispatch({ type: 'SET_TITLE', payload: val })}
          error={state.errors.title ? t(state.errors.title as 'writeKudo.validation.titleRequired') : undefined}
          labels={{
            label: t('writeKudo.danhHieu.label'),
            placeholder: t('writeKudo.danhHieu.placeholder'),
            helperExample: t('writeKudo.danhHieu.helperExample'),
            helperDisplay: t('writeKudo.danhHieu.helperDisplay'),
          }}
        />

        {/* C+D: Rich Text Editor */}
        <div className="flex flex-col gap-6 w-full">
          <KudoEditor
            onUpdate={(html, charCount) =>
              dispatch({ type: 'SET_CONTENT', payload: { html, charCount } })
            }
            error={state.errors.content ? t(state.errors.content as 'writeKudo.validation.contentRequired') : undefined}
            labels={{
              placeholder: t('writeKudo.content.placeholder'),
              bold: t('writeKudo.toolbar.bold'),
              italic: t('writeKudo.toolbar.italic'),
              strikethrough: t('writeKudo.toolbar.strikethrough'),
              numberedList: t('writeKudo.toolbar.numberedList'),
              link: t('writeKudo.toolbar.link'),
              quote: t('writeKudo.toolbar.quote'),
              communityStandards: t('writeKudo.content.communityStandards'),
            }}
          />
          {/* D.1: Hint */}
          <p className="text-base font-bold leading-6 tracking-[0.5px] text-[#00101A]">
            {t('writeKudo.content.mentionHint')}
          </p>
        </div>

        {/* E: Hashtags */}
        <HashtagField
          hashtags={state.hashtags}
          options={state.hashtagOptions}
          onAdd={(tag) => dispatch({ type: 'ADD_HASHTAG', payload: tag })}
          onRemove={(tag) => dispatch({ type: 'REMOVE_HASHTAG', payload: tag })}
          onFetchOptions={fetchHashtagOptions}
          onCreateNew={createHashtag}
          error={state.errors.hashtags ? t(state.errors.hashtags as 'writeKudo.validation.hashtagRequired') : undefined}
          labels={{
            label: t('writeKudo.hashtag.label'),
            add: t('writeKudo.hashtag.add'),
            max: t('writeKudo.hashtag.max'),
            createNew: t('writeKudo.hashtag.createNew'),
          }}
        />

        {/* F: Images */}
        <ImageUploadField
          images={state.images}
          dispatch={dispatch}
          userId={userId}
          labels={{
            label: t('writeKudo.image.label'),
            add: t('writeKudo.image.add'),
            max: t('writeKudo.image.max'),
          }}
        />

        {/* G: Anonymous */}
        <AnonymousCheckbox
          isChecked={state.isAnonymous}
          anonymousName={state.anonymousName}
          onToggle={(checked) => dispatch({ type: 'SET_ANONYMOUS', payload: checked })}
          onNameChange={(name) => dispatch({ type: 'SET_ANONYMOUS_NAME', payload: name })}
          labels={{
            label: t('writeKudo.anonymous.label'),
            namePlaceholder: t('writeKudo.anonymous.namePlaceholder'),
          }}
        />

        {/* H: Action bar */}
        <ActionBar
          onCancel={handleClose}
          onSubmit={handleSubmit}
          isSubmitting={state.isSubmitting}
          isDisabled={!isFormValid}
          labels={{
            cancel: t('writeKudo.cancel'),
            submit: t('writeKudo.submit'),
            submitting: t('writeKudo.submitting'),
          }}
        />
      </div>
    </div>
  );
}
