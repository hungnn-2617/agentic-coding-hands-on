'use client';

import type { Editor } from '@tiptap/react';
import { BoldIcon } from '@/components/icons/bold-icon';
import { ItalicIcon } from '@/components/icons/italic-icon';
import { StrikethroughIcon } from '@/components/icons/strikethrough-icon';
import { NumberedListIcon } from '@/components/icons/numbered-list-icon';
import { LinkIcon } from '@/components/icons/link-icon';
import { QuoteIcon } from '@/components/icons/quote-icon';
import { KUDO_CONTENT_MAX_LENGTH, KUDO_CHAR_WARNING_THRESHOLD } from '@/types/kudo';

interface EditorToolbarProps {
  editor: Editor | null;
  charCount: number;
  labels: {
    bold: string;
    italic: string;
    strikethrough: string;
    numberedList: string;
    link: string;
    quote: string;
    communityStandards: string;
  };
}

export function EditorToolbar({ editor, charCount, labels }: EditorToolbarProps) {
  if (!editor) return null;

  function handleLink() {
    const previousUrl = editor!.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor!.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    // Validate URL — only allow http: and https: protocols
    try {
      const parsed = new URL(url);
      if (!['http:', 'https:'].includes(parsed.protocol)) return;
    } catch {
      return; // invalid URL
    }
    editor!.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run();
  }

  const isWarning = charCount >= KUDO_CHAR_WARNING_THRESHOLD;

  const buttons = [
    { key: 'bold', icon: <BoldIcon className="w-6 h-6" />, label: labels.bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold'), first: true },
    { key: 'italic', icon: <ItalicIcon className="w-6 h-6" />, label: labels.italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic'), first: false },
    { key: 'strike', icon: <StrikethroughIcon className="w-6 h-6" />, label: labels.strikethrough, action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive('strike'), first: false },
    { key: 'orderedList', icon: <NumberedListIcon className="w-6 h-6" />, label: labels.numberedList, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList'), first: false },
    { key: 'link', icon: <LinkIcon className="w-6 h-6" />, label: labels.link, action: handleLink, active: editor.isActive('link'), first: false },
    { key: 'blockquote', icon: <QuoteIcon className="w-6 h-6" />, label: labels.quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote'), first: false },
  ];

  return (
    <div className="flex items-center w-full max-sm:overflow-x-auto">
      {buttons.map((btn) => (
        <button
          key={btn.key}
          type="button"
          onClick={btn.action}
          aria-label={btn.label}
          aria-pressed={btn.active}
          className={`h-10 px-4 py-2.5 border border-[#998C5F] flex items-center justify-center gap-2 text-[#00101A] transition-colors focus:outline-2 focus:outline-[#FFEA9E] ${
            btn.first ? 'rounded-tl-lg' : '-ml-px'
          } ${
            btn.active ? 'bg-[rgba(153,140,95,0.2)]' : 'bg-transparent hover:bg-[rgba(0,0,0,0.05)]'
          }`}
        >
          {btn.icon}
        </button>
      ))}

      {/* Right section: community standards link + char count */}
      <div className="flex-1 h-10 px-4 py-2.5 border border-[#998C5F] -ml-px rounded-tr-lg flex items-center justify-end gap-3">
        <a
          href="https://saa.sun-asterisk.vn/community-standards"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-bold leading-6 tracking-[0.15px] text-[#E46060] hover:underline whitespace-nowrap"
        >
          {labels.communityStandards}
        </a>
        <span className={`text-base font-bold leading-6 tracking-[0.15px] tabular-nums ${isWarning ? 'text-[#E46060]' : 'text-[#999]'}`}>
          {charCount}/{KUDO_CONTENT_MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
