import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetRateLimiter } from '@/lib/rate-limiter';
import { POST } from './route';

vi.mock('server-only', () => ({}));

const fetchMock = vi.fn<typeof fetch>();

function createRequest(body: unknown, ip?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (ip) headers['x-forwarded-for'] = ip;
  return new Request('http://localhost/api/text-improvements', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
}

async function readJson(response: Response) {
  return (await response.json()) as unknown;
}

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
  resetRateLimiter();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
});

describe('POST /api/text-improvements', () => {
  it('returns 400 when input is blank', async () => {
    vi.stubEnv('GROQ_API_KEY', 'test-api-key');

    const response = await POST(createRequest({ input: '   ' }));

    expect(response.status).toBe(400);
    expect(await readJson(response)).toEqual({
      error: 'Please provide text to improve.',
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns a controlled 500 when the API key is missing', async () => {
    vi.stubEnv('GROQ_API_KEY', '');

    const response = await POST(createRequest({ input: 'Improve this text.' }));

    expect(response.status).toBe(500);
    expect(await readJson(response)).toEqual({
      error: 'Groq API key is not configured.',
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns controlled error JSON when Groq fails upstream', async () => {
    vi.stubEnv('GROQ_API_KEY', 'test-api-key');
    fetchMock.mockResolvedValueOnce({
      ok: false,
      text: async () => '{"error":"upstream error"}',
      status: 500,
      statusText: 'Internal Server Error',
    } as Response);

    const response = await POST(createRequest({ input: 'Improve this text.' }));

    expect(response.status).toBe(502);
    expect(await readJson(response)).toEqual({
      error: 'Unable to improve text right now.',
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('returns 429 when the per-IP rate limit is exceeded', async () => {
    vi.stubEnv('GROQ_API_KEY', 'test-api-key');
    const ip = '9.9.9.9';
    for (let i = 0; i < 30; i++) {
      await POST(createRequest({ input: '' }, ip));
    }

    const response = await POST(createRequest({ input: 'Improve this.' }, ip));

    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).not.toBeNull();
    expect(await readJson(response)).toEqual({
      error: 'Too many requests. Try again later.',
    });
  });

  it('returns parsed improved text and explanations on success', async () => {
    vi.stubEnv('GROQ_API_KEY', 'test-api-key');
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              role: 'assistant',
              content:
                'a) improved text: Clearer copy;\nb) explanations: - More direct tone.',
            },
          },
        ],
      }),
    } as Response);

    const response = await POST(createRequest({ input: 'Improve this text.' }));

    expect(response.status).toBe(200);
    expect(await readJson(response)).toEqual({
      improved: 'Clearer copy',
      explanations: ['More direct tone.'],
      isNotEnglish: false,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
