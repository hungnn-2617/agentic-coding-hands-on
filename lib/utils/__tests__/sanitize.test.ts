import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from '../sanitize';

describe('sanitizeHtml', () => {
  describe('basic sanitization', () => {
    it('returns empty string for null input', () => {
      expect(sanitizeHtml(null as unknown as string)).toBe('');
    });

    it('returns empty string for undefined input', () => {
      expect(sanitizeHtml(undefined as unknown as string)).toBe('');
    });

    it('returns empty string for empty string input', () => {
      expect(sanitizeHtml('')).toBe('');
    });

    it('returns empty string for non-string input', () => {
      expect(sanitizeHtml(123 as unknown as string)).toBe('');
    });

    it('preserves plain text', () => {
      expect(sanitizeHtml('Hello World')).toBe('Hello World');
    });
  });

  describe('allowed tags', () => {
    it('allows paragraph tags', () => {
      expect(sanitizeHtml('<p>Hello</p>')).toBe('<p>Hello</p>');
    });

    it('allows br tags', () => {
      expect(sanitizeHtml('Line 1<br>Line 2')).toBe('Line 1<br>Line 2');
    });

    it('allows strong tags', () => {
      expect(sanitizeHtml('<strong>Bold</strong>')).toBe('<strong>Bold</strong>');
    });

    it('allows b tags', () => {
      expect(sanitizeHtml('<b>Bold</b>')).toBe('<b>Bold</b>');
    });

    it('allows em tags', () => {
      expect(sanitizeHtml('<em>Italic</em>')).toBe('<em>Italic</em>');
    });

    it('allows i tags', () => {
      expect(sanitizeHtml('<i>Italic</i>')).toBe('<i>Italic</i>');
    });

    it('allows s tags', () => {
      expect(sanitizeHtml('<s>Strike</s>')).toBe('<s>Strike</s>');
    });

    it('allows del tags', () => {
      expect(sanitizeHtml('<del>Deleted</del>')).toBe('<del>Deleted</del>');
    });

    it('allows ol tags', () => {
      expect(sanitizeHtml('<ol><li>Item</li></ol>')).toBe('<ol><li>Item</li></ol>');
    });

    it('allows ul tags', () => {
      expect(sanitizeHtml('<ul><li>Item</li></ul>')).toBe('<ul><li>Item</li></ul>');
    });

    it('allows li tags', () => {
      expect(sanitizeHtml('<li>Item</li>')).toBe('<li>Item</li>');
    });

    it('allows blockquote tags', () => {
      expect(sanitizeHtml('<blockquote>Quote</blockquote>')).toBe('<blockquote>Quote</blockquote>');
    });

    it('allows span tags', () => {
      expect(sanitizeHtml('<span>Text</span>')).toBe('<span>Text</span>');
    });

    it('allows div tags', () => {
      expect(sanitizeHtml('<div>Content</div>')).toBe('<div>Content</div>');
    });
  });

  describe('anchor tags with href', () => {
    it('allows anchor tags with relative href', () => {
      const result = sanitizeHtml('<a href="/page">Link</a>');
      expect(result).toContain('<a');
      expect(result).toContain('href="/page"');
      expect(result).toContain('Link</a>');
    });

    it('adds target and rel for external https links', () => {
      const result = sanitizeHtml('<a href="https://example.com">Link</a>');
      expect(result).toContain('target="_blank"');
      expect(result).toContain('rel="noopener noreferrer"');
    });

    it('adds target and rel for external http links', () => {
      const result = sanitizeHtml('<a href="http://example.com">Link</a>');
      expect(result).toContain('target="_blank"');
      expect(result).toContain('rel="noopener noreferrer"');
    });

    it('does not add target and rel for relative links', () => {
      const result = sanitizeHtml('<a href="/page">Link</a>');
      expect(result).not.toContain('target="_blank"');
    });
  });

  describe('dangerous URL schemes', () => {
    it('removes javascript: URLs', () => {
      const result = sanitizeHtml('<a href="javascript:alert(1)">Click</a>');
      expect(result).not.toContain('javascript:');
      expect(result).not.toContain('href');
    });

    it('removes data: URLs', () => {
      const result = sanitizeHtml('<a href="data:text/html,<script>alert(1)</script>">Click</a>');
      expect(result).not.toContain('data:');
    });

    it('removes vbscript: URLs', () => {
      const result = sanitizeHtml('<a href="vbscript:msgbox(1)">Click</a>');
      expect(result).not.toContain('vbscript:');
    });

    it('handles case insensitive dangerous URLs', () => {
      const result = sanitizeHtml('<a href="JAVASCRIPT:alert(1)">Click</a>');
      expect(result).not.toContain('JAVASCRIPT:');
    });
  });

  describe('dangerous tags removal', () => {
    it('removes script tags completely', () => {
      const result = sanitizeHtml('<script>alert(1)</script>');
      expect(result).not.toContain('script');
      expect(result).not.toContain('alert');
    });

    it('removes style tags completely', () => {
      const result = sanitizeHtml('<style>body{color:red}</style>');
      expect(result).not.toContain('style');
      expect(result).not.toContain('color');
    });

    it('removes iframe tags completely', () => {
      const result = sanitizeHtml('<iframe src="evil.com"></iframe>');
      expect(result).not.toContain('iframe');
      expect(result).not.toContain('evil.com');
    });

    it('removes object tags completely', () => {
      const result = sanitizeHtml('<object data="evil.swf"></object>');
      expect(result).not.toContain('object');
      expect(result).not.toContain('evil.swf');
    });

    it('removes embed tags', () => {
      const result = sanitizeHtml('<embed src="evil.swf">');
      expect(result).not.toContain('embed');
    });

    it('removes form tags completely', () => {
      const result = sanitizeHtml('<form action="/submit"><input></form>');
      expect(result).not.toContain('form');
    });

    it('removes input tags', () => {
      const result = sanitizeHtml('<input type="text" value="test">');
      expect(result).not.toContain('input');
    });

    it('removes textarea tags completely', () => {
      const result = sanitizeHtml('<textarea>Content</textarea>');
      expect(result).not.toContain('textarea');
    });

    it('removes button tags completely', () => {
      const result = sanitizeHtml('<button>Click</button>');
      expect(result).not.toContain('button');
    });
  });

  describe('disallowed tags', () => {
    it('removes img tags but keeps content', () => {
      const result = sanitizeHtml('Before<img src="test.jpg" alt="test">After');
      expect(result).not.toContain('img');
      expect(result).toContain('Before');
      expect(result).toContain('After');
    });

    it('removes h1 tags but keeps content', () => {
      const result = sanitizeHtml('<h1>Heading</h1>');
      expect(result).not.toContain('h1');
      expect(result).toContain('Heading');
    });

    it('removes table tags but keeps content', () => {
      const result = sanitizeHtml('<table><tr><td>Cell</td></tr></table>');
      expect(result).not.toContain('table');
      expect(result).not.toContain('tr');
      expect(result).not.toContain('td');
      expect(result).toContain('Cell');
    });
  });

  describe('event handlers removal', () => {
    it('removes onclick handlers', () => {
      const result = sanitizeHtml('<p onclick="alert(1)">Text</p>');
      expect(result).not.toContain('onclick');
    });

    it('removes onerror handlers', () => {
      const result = sanitizeHtml('<p onerror="alert(1)">Text</p>');
      expect(result).not.toContain('onerror');
    });

    it('removes onload handlers', () => {
      const result = sanitizeHtml('<p onload="alert(1)">Text</p>');
      expect(result).not.toContain('onload');
    });

    it('removes onmouseover handlers', () => {
      const result = sanitizeHtml('<p onmouseover="alert(1)">Text</p>');
      expect(result).not.toContain('onmouseover');
    });

    it('removes onfocus handlers', () => {
      const result = sanitizeHtml('<p onfocus="alert(1)">Text</p>');
      expect(result).not.toContain('onfocus');
    });
  });

  describe('allowed attributes', () => {
    it('preserves class attribute', () => {
      const result = sanitizeHtml('<p class="highlight">Text</p>');
      expect(result).toContain('class="highlight"');
    });

    it('preserves data-type attribute', () => {
      const result = sanitizeHtml('<span data-type="mention">@user</span>');
      expect(result).toContain('data-type="mention"');
    });

    it('preserves data-id attribute', () => {
      const result = sanitizeHtml('<span data-id="123">@user</span>');
      expect(result).toContain('data-id="123"');
    });

    it('removes disallowed attributes', () => {
      const result = sanitizeHtml('<p style="color:red" id="test">Text</p>');
      expect(result).not.toContain('style');
      expect(result).not.toContain('id=');
    });
  });

  describe('attribute value escaping', () => {
    it('escapes HTML entities in attribute values', () => {
      const result = sanitizeHtml('<p class="test&test">Text</p>');
      expect(result).toContain('&amp;');
    });

    it('escapes quotes in attribute values', () => {
      const result = sanitizeHtml('<p class="test&quot;test">Text</p>');
      expect(result).toContain('&amp;quot;');
    });
  });

  describe('complex HTML', () => {
    it('handles nested allowed tags', () => {
      const input = '<p><strong>Bold <em>and italic</em></strong></p>';
      expect(sanitizeHtml(input)).toBe(input);
    });

    it('handles mixed allowed and disallowed tags', () => {
      const input = '<div><h1>Title</h1><p>Content</p></div>';
      const result = sanitizeHtml(input);
      expect(result).toContain('<div>');
      expect(result).toContain('<p>Content</p>');
      expect(result).not.toContain('<h1>');
      expect(result).toContain('Title');
    });

    it('handles script injection attempts in nested content', () => {
      const input = '<p>Hello <script>alert(1)</script> World</p>';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('script');
      expect(result).not.toContain('alert');
      expect(result).toContain('Hello');
      expect(result).toContain('World');
    });

    it('handles multiple dangerous tags', () => {
      const input = '<script>bad1</script><style>bad2</style><iframe>bad3</iframe><p>Good</p>';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('bad1');
      expect(result).not.toContain('bad2');
      expect(result).not.toContain('bad3');
      expect(result).toContain('<p>Good</p>');
    });
  });

  describe('edge cases', () => {
    it('handles self-closing br tags', () => {
      const result = sanitizeHtml('<br/>');
      expect(result).toBe('<br>');
    });

    it('handles uppercase tags', () => {
      const result = sanitizeHtml('<P>Text</P>');
      expect(result).toBe('<p>Text</p>');
    });

    it('handles tags with multiple attributes', () => {
      const result = sanitizeHtml('<a href="https://test.com" class="link" data-type="external">Link</a>');
      expect(result).toContain('href=');
      expect(result).toContain('class="link"');
      expect(result).toContain('data-type="external"');
    });

    it('handles malformed HTML gracefully', () => {
      const result = sanitizeHtml('<p>Unclosed paragraph');
      expect(result).toContain('<p>Unclosed paragraph');
    });

    it('handles attributes without quotes', () => {
      const result = sanitizeHtml('<p class=highlight>Text</p>');
      expect(result).toContain('class="highlight"');
    });

    it('handles attributes with single quotes', () => {
      const result = sanitizeHtml("<p class='highlight'>Text</p>");
      expect(result).toContain('class="highlight"');
    });

    it('handles empty tags', () => {
      const result = sanitizeHtml('<p></p>');
      expect(result).toBe('<p></p>');
    });

    it('preserves whitespace in content', () => {
      const result = sanitizeHtml('<p>Hello   World</p>');
      expect(result).toContain('Hello   World');
    });
  });

  describe('XSS prevention', () => {
    it('prevents basic XSS via script tag', () => {
      const result = sanitizeHtml('<script>document.cookie</script>');
      expect(result).not.toContain('script');
      expect(result).not.toContain('document.cookie');
    });

    it('prevents XSS via event handler', () => {
      const result = sanitizeHtml('<img src="x" onerror="alert(1)">');
      expect(result).not.toContain('onerror');
      expect(result).not.toContain('alert');
    });

    it('prevents XSS via javascript: URL', () => {
      const result = sanitizeHtml('<a href="javascript:alert(document.domain)">Click</a>');
      expect(result).not.toContain('javascript:');
    });

    it('prevents XSS via data: URL', () => {
      const result = sanitizeHtml('<a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">Click</a>');
      expect(result).not.toContain('data:');
    });

    it('prevents XSS via SVG with script', () => {
      const result = sanitizeHtml('<svg onload="alert(1)"><script>alert(1)</script></svg>');
      expect(result).not.toContain('svg');
      expect(result).not.toContain('script');
      expect(result).not.toContain('alert');
    });

    it('prevents XSS via style injection', () => {
      const result = sanitizeHtml('<style>@import "http://evil.com/evil.css";</style>');
      expect(result).not.toContain('style');
      expect(result).not.toContain('@import');
    });
  });
});
