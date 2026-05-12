import { describe, expect, it } from 'vitest';
import { formatExplanations, formatTechnicalTerms } from '@/lib/formatHtml';

describe('formatTechnicalTerms', () => {
  it('wraps backtick-delimited terms with the technical term style', () => {
    expect(formatTechnicalTerms('Use `React` with `Next.js`.')).toContain(
      '>React</span>',
    );
    expect(formatTechnicalTerms('Use `React` with `Next.js`.')).toContain(
      '>Next.js</span>',
    );
  });
});

describe('formatExplanations', () => {
  it('formats markdown headings and paragraphs as HTML', () => {
    const result = formatExplanations('## Structure\n\nImprove `clarity`.');

    expect(result).toContain(
      '<h2 class="text-xl font-semibold text-gray-800 mt-4 mb-2">Structure</h2>',
    );
    expect(result).toContain('</p><p class="mb-3 text-gray-700">Improve');
    expect(result).toContain('>clarity</span>');
  });

  it('trims model wrapper characters and leading bullet markers', () => {
    expect(formatExplanations('<* Better flow>')).toBe(
      '<p class="mb-3 text-gray-700">Better flow</p>',
    );
  });
});
