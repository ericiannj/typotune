import 'server-only';

import { parseGeminiResponse, type GeminiResponse } from './parseGeminiResponse';
import { TEXT_IMPROVEMENT_PROMPT } from './prompt';

const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-lite:generateContent';

export class GeminiConfigurationError extends Error {
  constructor() {
    super('Gemini API key is not configured.');
    this.name = 'GeminiConfigurationError';
  }
}

export class GeminiUpstreamError extends Error {
  constructor() {
    super('Failed to fetch from Gemini API.');
    this.name = 'GeminiUpstreamError';
  }
}

export async function improveTextWithGemini(
  input: string,
): Promise<GeminiResponse> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    throw new GeminiConfigurationError();
  }

  const body = {
    contents: [
      {
        parts: [
          {
            text: `${TEXT_IMPROVEMENT_PROMPT}

Text: ${input}`,
          },
        ],
      },
    ],
  };

  const response = await fetch(
    `${GEMINI_ENDPOINT}?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new GeminiUpstreamError();
  }

  let data: unknown;

  try {
    data = await response.json();
  } catch {
    throw new GeminiUpstreamError();
  }

  const result = parseGeminiResponse(data);

  if (!result.improved) {
    throw new GeminiUpstreamError();
  }

  return result;
}
