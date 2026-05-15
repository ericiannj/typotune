import { checkRateLimit } from '@/lib/rate-limiter';
import { GroqConfigurationError, improveTextWithGroq } from '@/lib/llm/groq';

const INVALID_INPUT_MESSAGE = 'Please provide text to improve.';
const INPUT_TOO_LONG_MESSAGE = 'Text is too long. Please keep it under 5,000 characters.';
const UPSTREAM_ERROR_MESSAGE = 'Unable to improve text right now.';
const RATE_LIMIT_MESSAGE = 'Too many requests. Try again later.';

const MAX_INPUT_LENGTH = 5000;

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  const limit = checkRateLimit(ip);

  if (!limit.allowed) {
    return Response.json(
      { error: RATE_LIMIT_MESSAGE },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: INVALID_INPUT_MESSAGE }, { status: 400 });
  }

  const input =
    typeof body === 'object' && body !== null && 'input' in body
      ? body.input
      : undefined;

  if (typeof input !== 'string' || !input.trim()) {
    return Response.json({ error: INVALID_INPUT_MESSAGE }, { status: 400 });
  }

  if (input.length > MAX_INPUT_LENGTH) {
    return Response.json({ error: INPUT_TOO_LONG_MESSAGE }, { status: 400 });
  }

  try {
    const result = await improveTextWithGroq(input);
    return Response.json(result);
  } catch (error) {
    if (error instanceof GroqConfigurationError) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ error: UPSTREAM_ERROR_MESSAGE }, { status: 502 });
  }
}
