export type GeminiResponse = {
  improved: string;
  explanations: string[];
};

export async function improveTextWithGemini(
  input: string,
): Promise<GeminiResponse> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const endpoint =
    'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-lite:generateContent';

  const body = {
    contents: [
      {
        parts: [
          {
            text: `Improve the following text and explain each change. Respond strictly in this format: a) improved text: <the improved text>; b) explanation: <the explanation(s)>.\n\nText: ${input}`,
          },
        ],
      },
    ],
  };

  const res = await fetch(`${endpoint}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch from Gemini API');
  }

  const data = await res.json();

  // New parsing logic for strict structure
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  // Improved regex: allow for missing semicolon, extra whitespace, or newlines
  const match = text.match(
    /a\) improved text:\s*([\s\S]*?)(?:\s*;\s*|\n+)b\) explanation:\s*([\s\S]*)/i,
  );
  let improved = '';
  let explanations: string[] = [];

  if (match) {
    improved = match[1].trim();
    explanations = [match[2].trim()];
  } else {
    // Fallback: return the whole text as improved, no explanations
    improved = text.trim();
    explanations = ['No explanations found.'];
  }

  return {
    improved,
    explanations,
  };
}
