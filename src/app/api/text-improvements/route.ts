import { GroqConfigurationError, improveTextWithGroq } from '@/lib/llm/groq';

const INVALID_INPUT_MESSAGE = 'Please provide text to improve.';
const UPSTREAM_ERROR_MESSAGE = 'Unable to improve text right now.';

export async function POST(request: Request) {
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
