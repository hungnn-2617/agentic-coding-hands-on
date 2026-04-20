'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { useEffect } from 'react';
import { EditorToolbar } from './editor-toolbar';
import { KUDO_CONTENT_MAX_LENGTH } from '@/types/kudo';

interface KudoEditorProps {
  onUpdate: (html: string, charCount: number) => void;
  error?: string;
  labels: {
    placeholder: string;
    bold: string;
    italic: string;
    strikethrough: string;
    numberedList: string;
    link: string;
    quote: string;
    communityStandards: string;
  };
}

export function KudoEditor({ onUpdate, error, labels }: KudoEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        code: false,
        horizontalRule: false,
        link: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' },
      }),
      Placeholder.configure({
        placeholder: labels.placeholder,
      }),
      CharacterCount.configure({
        limit: KUDO_CONTENT_MAX_LENGTH,
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose-sm outline-none min-h-[120px] h-[200px] overflow-y-auto px-6 py-4',
        role: 'textbox',
        'aria-multiline': 'true',
        'aria-label': labels.placeholder,
      },
    },
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      const chars = ed.storage.characterCount.characters();
      onUpdate(html, chars);
    },
  });

  // Sync error state
  useEffect(() => {
    if (!editor) return;
    const el = editor.view.dom;
    if (error) {
      el.setAttribute('aria-invalid', 'true');
    } else {
      el.removeAttribute('aria-invalid');
    }
  }, [editor, error]);

  const charCount = editor?.storage.characterCount.characters() ?? 0;

  return (
    <div className="flex flex-col w-full">
      <EditorToolbar
        editor={editor}
        charCount={charCount}
        labels={{
          bold: labels.bold,
          italic: labels.italic,
          strikethrough: labels.strikethrough,
          numberedList: labels.numberedList,
          link: labels.link,
          quote: labels.quote,
          communityStandards: labels.communityStandards,
        }}
      />
      <div
        className={`bg-white border-x border-b rounded-b-lg transition-colors ${
          error ? 'border-[#CF1322]' : 'border-[#998C5F]'
        }`}
      >
        <EditorContent editor={editor} />
      </div>
      {error && (
        <p role="alert" className="mt-1 text-sm font-bold text-[#CF1322]">
          {error}
        </p>
      )}
    </div>
  );
}
