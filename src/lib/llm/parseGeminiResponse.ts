export type GeminiResponse = {
  improved: string;
  explanations: string[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const extractCandidateText = (data: unknown) => {
  if (!isRecord(data) || !Array.isArray(data.candidates)) {
    return '';
  }

  const [candidate] = data.candidates;

  if (!isRecord(candidate) || !isRecord(candidate.content)) {
    return '';
  }

  const { parts } = candidate.content;

  if (!Array.isArray(parts)) {
    return '';
  }

  const [part] = parts;

  if (!isRecord(part) || typeof part.text !== 'string') {
    return '';
  }

  return part.text;
};

export function parseGeminiResponse(data: unknown): GeminiResponse {
  const text = extractCandidateText(data);
  const match = text.match(
    /a\) improved text:\s*([\s\S]*?)(?:\s*;\s*|\n+)b\) explanation:\s*([\s\S]*)/i,
  );

  if (!match) {
    return {
      improved: text.trim(),
      explanations: ['No explanations found.'],
    };
  }

  return {
    improved: match[1].trim(),
    explanations: [match[2].trim()],
  };
}
