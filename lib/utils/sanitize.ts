import DOMPurify from 'isomorphic-dompurify';

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'b', 'em', 'i', 's', 'del',
  'ol', 'ul', 'li', 'a', 'blockquote',
  'span', 'div',
];

const ALLOWED_ATTR = ['href', 'target', 'rel', 'class', 'data-type', 'data-id'];

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
  });
}
