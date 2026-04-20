'use client';

import { useReducer, useCallback } from 'react';
import {
  type KudoFormState,
  type KudoFormAction,
  type CreateKudoPayload,
  initialKudoFormState,
  KUDO_TITLE_MAX_LENGTH,
  KUDO_MAX_HASHTAGS,
  KUDO_MAX_IMAGES,
} from '@/types/kudo';

function kudoFormReducer(state: KudoFormState, action: KudoFormAction): KudoFormState {
  switch (action.type) {
    case 'SET_RECIPIENT':
      return { ...state, recipient: action.payload, searchQuery: '', errors: { ...state.errors, recipient: undefined } };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    case 'SET_TITLE':
      return {
        ...state,
        title: action.payload.slice(0, KUDO_TITLE_MAX_LENGTH),
        errors: { ...state.errors, title: undefined },
      };
    case 'SET_CONTENT':
      return {
        ...state,
        content: action.payload.html,
        charCount: action.payload.charCount,
        errors: { ...state.errors, content: undefined },
      };
    case 'ADD_HASHTAG':
      if (state.hashtags.length >= KUDO_MAX_HASHTAGS) return state;
      if (state.hashtags.includes(action.payload)) return state;
      return {
        ...state,
        hashtags: [...state.hashtags, action.payload],
        errors: { ...state.errors, hashtags: undefined },
      };
    case 'REMOVE_HASHTAG':
      return { ...state, hashtags: state.hashtags.filter((h) => h !== action.payload) };
    case 'SET_HASHTAG_OPTIONS':
      return { ...state, hashtagOptions: action.payload };
    case 'ADD_IMAGE':
      if (state.images.length >= KUDO_MAX_IMAGES) return state;
      return { ...state, images: [...state.images, action.payload] };
    case 'UPDATE_IMAGE':
      return {
        ...state,
        images: state.images.map((img) =>
          img.id === action.payload.id ? { ...img, ...action.payload.updates } : img
        ),
      };
    case 'REMOVE_IMAGE':
      return { ...state, images: state.images.filter((img) => img.id !== action.payload) };
    case 'SET_ANONYMOUS':
      return { ...state, isAnonymous: action.payload };
    case 'SET_ANONYMOUS_NAME':
      return { ...state, anonymousName: action.payload };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'RESET':
      return initialKudoFormState;
    default:
      return state;
  }
}

export function useWriteKudo() {
  const [state, dispatch] = useReducer(kudoFormReducer, initialKudoFormState);

  const validate = useCallback((): boolean => {
    const errors: KudoFormState['errors'] = {};
    if (!state.recipient) errors.recipient = 'writeKudo.validation.recipientRequired';
    if (!state.title.trim()) errors.title = 'writeKudo.validation.titleRequired';
    if (state.charCount === 0) errors.content = 'writeKudo.validation.contentRequired';
    if (state.hashtags.length === 0) errors.hashtags = 'writeKudo.validation.hashtagRequired';

    dispatch({ type: 'SET_ERRORS', payload: errors });
    return Object.keys(errors).length === 0;
  }, [state.recipient, state.title, state.content, state.hashtags]);

  const getPayload = useCallback((): CreateKudoPayload => ({
    recipient_id: state.recipient!.id,
    title: state.title.trim(),
    content: state.content,
    hashtags: state.hashtags,
    images: state.images
      .filter((img) => img.uploadedUrl)
      .map((img) => img.uploadedUrl!),
    is_anonymous: state.isAnonymous,
    anonymous_name: state.isAnonymous
      ? (state.anonymousName.trim() || 'Ẩn danh')
      : null,
  }), [state]);

  const isFormValid = !!(
    state.recipient &&
    state.title.trim() &&
    state.charCount > 0 &&
    state.hashtags.length > 0 &&
    !state.images.some((img) => img.isUploading)
  );

  return { state, dispatch, validate, getPayload, isFormValid };
}
