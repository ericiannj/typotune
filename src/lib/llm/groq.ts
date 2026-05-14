import 'server-only';

import { parseResponse, type LLMResponse } from './parseResponse';
import { TEXT_IMPROVEMENT_PROMPT } from './prompt';

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

export class GroqConfigurationError extends Error {
  constructor() {
    super('Groq API key is not configured.');
    this.name = 'GroqConfigurationError';
  }
}

export class GroqUpstreamError extends Error {
  constructor() {
    super('Failed to fetch from Groq API.');
    this.name = 'GroqUpstreamError';
  }
}

export async function improveTextWithGroq(input: string): Promise<LLMResponse> {
  const apiKey = process.env.GROQ_API_KEY?.trim();

  if (!apiKey) {
    throw new GroqConfigurationError();
  }

  const body = {
    model: GROQ_MODEL,
    messages: [
      {
        role: 'user',
        content: `${TEXT_IMPROVEMENT_PROMPT}\n\nText: ${input}`,
      },
    ],
  };

  const response = await fetch(GROQ_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '(unreadable)');
    console.error(`[Groq] ${response.status} ${response.statusText}:`, errorBody);
    throw new GroqUpstreamError();
  }

  let data: unknown;

  try {
    data = await response.json();
  } catch {
    throw new GroqUpstreamError();
  }

  const result = parseResponse(data);

  if (!result.improved && !result.isNotEnglish) {
    throw new GroqUpstreamError();
  }

  return result;
}
