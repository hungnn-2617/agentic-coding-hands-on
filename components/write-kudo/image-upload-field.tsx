'use client';

import { useRef } from 'react';
import { FieldLabel } from './field-label';
import { PlusIcon } from '@/components/icons/plus-icon';
import { CloseIcon } from '@/components/icons/close-icon';
import { validateImageFile, uploadImage, deleteImage } from '@/lib/utils/image-upload';
import { KUDO_MAX_IMAGES } from '@/types/kudo';
import type { KudoImage, KudoFormAction } from '@/types/kudo';

interface ImageUploadFieldProps {
  images: KudoImage[];
  dispatch: React.Dispatch<KudoFormAction>;
  userId: string;
  labels: {
    label: string;
    add: string;
    max: string;
  };
}

export function ImageUploadField({ images, dispatch, userId, labels }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const atLimit = images.length >= KUDO_MAX_IMAGES;

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';

    let addedCount = 0;
    for (const file of files) {
      if (images.length + addedCount >= KUDO_MAX_IMAGES) break;

      const validationError = validateImageFile(file);
      if (validationError) continue;

      addedCount++;

      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const previewUrl = URL.createObjectURL(file);

      dispatch({
        type: 'ADD_IMAGE',
        payload: { id, file, previewUrl, uploadedUrl: null, isUploading: true, error: null },
      });

      try {
        const uploadedUrl = await uploadImage(file, userId);
        dispatch({
          type: 'UPDATE_IMAGE',
          payload: { id, updates: { uploadedUrl, isUploading: false } },
        });
      } catch {
        dispatch({
          type: 'UPDATE_IMAGE',
          payload: { id, updates: { isUploading: false, error: 'Upload failed' } },
        });
      }
    }
  }

  async function handleRemove(image: KudoImage) {
    if (image.uploadedUrl) {
      await deleteImage(image.uploadedUrl).catch(() => {});
    }
    if (image.previewUrl) {
      URL.revokeObjectURL(image.previewUrl);
    }
    dispatch({ type: 'REMOVE_IMAGE', payload: image.id });
  }

  return (
    <div className="flex items-center gap-4 w-full max-sm:flex-col max-sm:items-start max-sm:gap-2">
      <FieldLabel label={labels.label} />
      <div className="flex flex-wrap items-center gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative w-20 h-20 rounded-[18px] bg-white border border-[#998C5F] overflow-hidden sm:max-lg:w-16 sm:max-lg:h-16">
            <img
              src={img.previewUrl}
              alt=""
              className="w-full h-full object-cover rounded border border-[#FFEA9E]"
            />
            {img.isUploading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-[18px]">
                <svg className="w-6 h-6 animate-spin text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                </svg>
              </div>
            )}
            <button
              type="button"
              onClick={() => handleRemove(img)}
              aria-label="Remove image"
              className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4271D] rounded-full flex items-center justify-center hover:bg-[#B91C1C] hover:scale-110 transition-all focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-1"
            >
              <CloseIcon className="w-3 h-3 text-white" />
            </button>
          </div>
        ))}

        {!atLimit && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="h-12 px-2 py-1 bg-white border border-[#998C5F] rounded-lg flex items-center gap-2 text-[11px] font-bold tracking-[0.5px] text-[#666] cursor-pointer hover:border-[#FFEA9E] transition-colors"
          >
            <PlusIcon className="w-6 h-6" />
            <span className="flex flex-col items-start">
              <span>{labels.add}</span>
              <span>{labels.max}</span>
            </span>
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}
