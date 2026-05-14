export type LLMResponse = {
  improved: string;
  explanations: string[];
  isNotEnglish: boolean;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const extractChoiceText = (data: unknown): string => {
  if (!isRecord(data) || !Array.isArray(data.choices)) {
    return '';
  }

  const [choice] = data.choices;

  if (!isRecord(choice) || !isRecord(choice.message)) {
    return '';
  }

  const { content } = choice.message;

  return typeof content === 'string' ? content : '';
};

export function parseResponse(data: unknown): LLMResponse {
  const text = extractChoiceText(data);
  const match = text.match(
    /a\) improved text:\s*([\s\S]*?)(?:\s*;\s*|\n+)b\) explanations:\s*([\s\S]*)/i,
  );

  if (!match) {
    return {
      improved: text.trim(),
      explanations: [],
      isNotEnglish: false,
    };
  }

  const improved = match[1].trim();
  const explanationsRaw = match[2].trim();

  if (improved === 'NOT_ENGLISH' || explanationsRaw === 'NOT_ENGLISH') {
    return {
      improved: '',
      explanations: [],
      isNotEnglish: true,
    };
  }

  if (explanationsRaw === 'NO_IMPROVEMENTS') {
    return {
      improved,
      explanations: [],
      isNotEnglish: false,
    };
  }

  const explanations = explanationsRaw
    .split('\n')
    .map((line) => line.replace(/^-\s*/, '').trim())
    .filter(Boolean);

  return {
    improved,
    explanations,
    isNotEnglish: false,
  };
}
