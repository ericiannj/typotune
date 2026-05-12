import { describe, expect, it } from 'vitest';
import { parseGeminiResponse } from '@/lib/llm/parseGeminiResponse';

const geminiData = (text: string) => ({
  candidates: [
    {
      content: {
        parts: [{ text }],
      },
    },
  ],
});

describe('parseGeminiResponse', () => {
  it('parses the strict improved text and explanation format', () => {
    expect(
      parseGeminiResponse(
        geminiData('a) improved text: Clearer copy;\nb) explanation: Better tone.'),
      ),
    ).toEqual({
      improved: 'Clearer copy',
      explanations: ['Better tone.'],
    });
  });

  it('tolerates missing semicolons between sections', () => {
    expect(
      parseGeminiResponse(
        geminiData('a) improved text: Clearer copy\nb) explanation: Better tone.'),
      ),
    ).toEqual({
      improved: 'Clearer copy',
      explanations: ['Better tone.'],
    });
  });

  it('tolerates missing newlines between sections', () => {
    expect(
      parseGeminiResponse(
        geminiData('a) improved text: Clearer copy; b) explanation: Better tone.'),
      ),
    ).toEqual({
      improved: 'Clearer copy',
      explanations: ['Better tone.'],
    });
  });

  it('falls back to raw text when the expected sections are missing', () => {
    expect(parseGeminiResponse(geminiData('Just improved copy.'))).toEqual({
      improved: 'Just improved copy.',
      explanations: ['No explanations found.'],
    });
  });
});
