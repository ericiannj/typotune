import { describe, expect, it } from 'vitest';
import { parseResponse } from '@/lib/llm/parseResponse';

const groqData = (text: string) => ({
  choices: [
    {
      message: {
        role: 'assistant',
        content: text,
      },
    },
  ],
});

describe('parseResponse', () => {
  it('parses improved text and bullet point explanations', () => {
    expect(
      parseResponse(
        groqData(
          'a) improved text: Clearer copy;\nb) explanations: - Improved tone.\n- Fixed grammar.',
        ),
      ),
    ).toEqual({
      improved: 'Clearer copy',
      explanations: ['Improved tone.', 'Fixed grammar.'],
      isNotEnglish: false,
    });
  });

  it('tolerates missing semicolons between sections', () => {
    expect(
      parseResponse(
        groqData(
          'a) improved text: Clearer copy\nb) explanations: - Better tone.',
        ),
      ),
    ).toEqual({
      improved: 'Clearer copy',
      explanations: ['Better tone.'],
      isNotEnglish: false,
    });
  });

  it('tolerates missing newlines between sections', () => {
    expect(
      parseResponse(
        groqData(
          'a) improved text: Clearer copy; b) explanations: - Better tone.',
        ),
      ),
    ).toEqual({
      improved: 'Clearer copy',
      explanations: ['Better tone.'],
      isNotEnglish: false,
    });
  });

  it('returns isNotEnglish when NOT_ENGLISH markers are present', () => {
    expect(
      parseResponse(
        groqData(
          'a) improved text: NOT_ENGLISH;\nb) explanations: NOT_ENGLISH',
        ),
      ),
    ).toEqual({
      improved: '',
      explanations: [],
      isNotEnglish: true,
    });
  });

  it('returns empty explanations when NO_IMPROVEMENTS marker is present', () => {
    expect(
      parseResponse(
        groqData(
          'a) improved text: Already correct text;\nb) explanations: NO_IMPROVEMENTS',
        ),
      ),
    ).toEqual({
      improved: 'Already correct text',
      explanations: [],
      isNotEnglish: false,
    });
  });

  it('falls back to raw text when the expected sections are missing', () => {
    expect(parseResponse(groqData('Just improved copy.'))).toEqual({
      improved: 'Just improved copy.',
      explanations: [],
      isNotEnglish: false,
    });
  });
});
