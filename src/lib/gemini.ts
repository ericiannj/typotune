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
            text: `Improve the following text while preserving its original formatting structure (paragraphs, line breaks, bullet points, numbering, etc.). Only improve the content, grammar, and clarity while maintaining the exact same formatting. 

For the explanation, provide a well-structured response with clear paragraphs and topics. Use proper headings and organize the content logically. Format technical terms like variable names, function names, and API parameters with backticks.

Respond strictly in this format: 
a) improved text: <the improved text>; 
b) explanation: <the structured explanation with paragraphs and topics>

Text: ${input}`,
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
