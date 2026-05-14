import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route';

vi.mock('server-only', () => ({}));

const fetchMock = vi.fn<typeof fetch>();

function createRequest(body: unknown) {
  return new Request('http://localhost/api/text-improvements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function readJson(response: Response) {
  return (await response.json()) as unknown;
}

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
});

describe('POST /api/text-improvements', () => {
  it('returns 400 when input is blank', async () => {
    vi.stubEnv('GEMINI_API_KEY', 'test-api-key');

    const response = await POST(createRequest({ input: '   ' }));

    expect(response.status).toBe(400);
    expect(await readJson(response)).toEqual({
      error: 'Please provide text to improve.',
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns a controlled 500 when the API key is missing', async () => {
    vi.stubEnv('GEMINI_API_KEY', '');

    const response = await POST(createRequest({ input: 'Improve this text.' }));

    expect(response.status).toBe(500);
    expect(await readJson(response)).toEqual({
      error: 'Gemini API key is not configured.',
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns controlled error JSON when Gemini fails upstream', async () => {
    vi.stubEnv('GEMINI_API_KEY', 'test-api-key');
    fetchMock.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as Response);

    const response = await POST(createRequest({ input: 'Improve this text.' }));

    expect(response.status).toBe(502);
    expect(await readJson(response)).toEqual({
      error: 'Unable to improve text right now.',
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('returns parsed improved text and explanations on success', async () => {
    vi.stubEnv('GEMINI_API_KEY', 'test-api-key');
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        candidates: [
          {
            content: {
              parts: [
                {
                  text: 'a) improved text: Clearer copy;\nb) explanation: More direct tone.',
                },
              ],
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
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
