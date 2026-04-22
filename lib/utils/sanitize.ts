/**
 * HTML Sanitizer compatible with Cloudflare Workers (no DOM dependencies)
 * Uses regex-based sanitization for edge runtime compatibility
 */

const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'b', 'em', 'i', 's', 'del',
  'ol', 'ul', 'li', 'a', 'blockquote',
  'span', 'div',
]);

const ALLOWED_ATTRS = new Set(['href', 'target', 'rel', 'class', 'data-type', 'data-id']);

// SECURITY: Block dangerous URL schemes
const DANGEROUS_URL_PATTERN = /^(javascript|data|vbscript):/i;

// SECURITY: Block event handler attributes
const EVENT_HANDLER_PATTERN = /^on\w+$/i;

/**
 * Escape HTML entities to prevent XSS
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Sanitize an href attribute value
 */
function sanitizeHref(href: string): string | null {
  const trimmed = href.trim();

  // Block dangerous URL schemes
  if (DANGEROUS_URL_PATTERN.test(trimmed)) {
    return null;
  }

  return trimmed;
}

/**
 * Parse and sanitize attributes from a tag string
 */
function sanitizeAttributes(attrString: string, tagName: string): string {
  const attrs: string[] = [];

  // Match attribute patterns: name="value" or name='value' or name=value or just name
  const attrPattern = /(\w[\w-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let match;

  while ((match = attrPattern.exec(attrString)) !== null) {
    const attrName = match[1].toLowerCase();
    const attrValue = match[2] ?? match[3] ?? match[4] ?? '';

    // Skip event handlers (onclick, onerror, etc.)
    if (EVENT_HANDLER_PATTERN.test(attrName)) {
      continue;
    }

    // Only allow whitelisted attributes
    if (!ALLOWED_ATTRS.has(attrName)) {
      continue;
    }

    // Special handling for href
    if (attrName === 'href') {
      const sanitizedHref = sanitizeHref(attrValue);
      if (sanitizedHref === null) {
        continue;
      }
      attrs.push(`href="${escapeHtml(sanitizedHref)}"`);

      // Add security attributes for external links
      if (sanitizedHref.startsWith('http://') || sanitizedHref.startsWith('https://')) {
        attrs.push('target="_blank"');
        attrs.push('rel="noopener noreferrer"');
      }
      continue;
    }

    // Skip target and rel if we're handling an anchor (we add them above)
    if (tagName === 'a' && (attrName === 'target' || attrName === 'rel')) {
      continue;
    }

    attrs.push(`${attrName}="${escapeHtml(attrValue)}"`);
  }

  return attrs.length > 0 ? ' ' + attrs.join(' ') : '';
}

/**
 * Sanitize HTML string - removes disallowed tags and attributes
 * Compatible with Cloudflare Workers (no DOM dependencies)
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty || typeof dirty !== 'string') {
    return '';
  }

  // Remove script, style, and other dangerous tags entirely (including content)
  let html = dirty
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^>]*\/?>/gi, '')
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '')
    .replace(/<input\b[^>]*\/?>/gi, '')
    .replace(/<textarea\b[^<]*(?:(?!<\/textarea>)<[^<]*)*<\/textarea>/gi, '')
    .replace(/<button\b[^<]*(?:(?!<\/button>)<[^<]*)*<\/button>/gi, '');

  // Process remaining tags
  html = html.replace(/<\/?([a-z][a-z0-9]*)\b([^>]*)>/gi, (match, tagName, attrString) => {
    const lowerTagName = tagName.toLowerCase();

    // Remove disallowed tags (but keep their content by returning empty string)
    if (!ALLOWED_TAGS.has(lowerTagName)) {
      return '';
    }

    // Self-closing tag (like <br>)
    if (match.startsWith('</')) {
      return `</${lowerTagName}>`;
    }

    // Opening tag - sanitize attributes
    const sanitizedAttrs = sanitizeAttributes(attrString, lowerTagName);

    // Handle self-closing tags
    if (lowerTagName === 'br') {
      return `<br${sanitizedAttrs}>`;
    }

    return `<${lowerTagName}${sanitizedAttrs}>`;
  });

  return html;
}
