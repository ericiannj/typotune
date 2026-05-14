import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useTextImprovement from '@/hooks/useTextImprovement';

const mockFetch = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal('fetch', mockFetch);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  mockFetch.mockReset();
});

async function runDebounce() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1000);
  });
}

describe('useTextImprovement', () => {
  it('resets state without calling the API for blank input', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        improved: 'Existing copy',
        explanations: ['Existing explanation.'],
        isNotEnglish: false,
      }),
    } as Response);

    const { result } = renderHook(() => useTextImprovement());

    act(() => {
      result.current.improveText('Original copy');
    });
    await runDebounce();
    expect(result.current.apiState.improved).toBe('Existing copy');

    act(() => {
      result.current.improveText('   ');
    });
    await runDebounce();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result.current.apiState).toEqual({
      improved: '',
      explanations: [],
      isNotEnglish: false,
      loading: false,
      error: null,
    });
  });

  it('stores improved text and explanations after a successful response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        improved: 'Improved copy',
        explanations: ['Clearer and more concise.'],
        isNotEnglish: false,
      }),
    } as Response);

    const { result } = renderHook(() => useTextImprovement());

    act(() => {
      result.current.improveText('Original copy');
    });
    await runDebounce();

    expect(result.current.apiState).toEqual({
      improved: 'Improved copy',
      explanations: ['Clearer and more concise.'],
      isNotEnglish: false,
      loading: false,
      error: null,
    });
    expect(mockFetch).toHaveBeenCalledWith('/api/text-improvements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: 'Original copy' }),
    });
  });

  it('stores API errors and clears previous results', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          improved: 'Existing copy',
          explanations: ['Existing explanation.'],
          isNotEnglish: false,
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Unable to improve text right now.' }),
      } as Response);

    const { result } = renderHook(() => useTextImprovement());

    act(() => {
      result.current.improveText('Original copy');
    });
    await runDebounce();
    expect(result.current.apiState.improved).toBe('Existing copy');

    act(() => {
      result.current.improveText('Second copy');
    });
    await runDebounce();

    expect(result.current.apiState).toEqual({
      improved: '',
      explanations: [],
      isNotEnglish: false,
      loading: false,
      error: 'Unable to improve text right now.',
    });
  });

  it('debounces API requests', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ improved: 'Final copy', explanations: [] }),
    } as Response);

    const { result } = renderHook(() => useTextImprovement());

    await act(async () => {
      result.current.improveText('First');
      await vi.advanceTimersByTimeAsync(500);
      result.current.improveText('Final');
    });
    expect(mockFetch).not.toHaveBeenCalled();

    await runDebounce();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/text-improvements',
      expect.objectContaining({
        body: JSON.stringify({ input: 'Final' }),
      }),
    );
  });
});
