import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { checkRateLimit, resetRateLimiter } from '../rate-limiter';

const IP_A = '1.2.3.4';
const IP_B = '5.6.7.8';

beforeEach(() => {
  vi.useFakeTimers();
  resetRateLimiter();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('checkRateLimit', () => {
  test('allows first request from a new IP', () => {
    const result = checkRateLimit(IP_A);
    expect(result.allowed).toBe(true);
  });

  test('allows requests up to the per-IP limit', () => {
    for (let i = 0; i < 30; i++) {
      expect(checkRateLimit(IP_A).allowed).toBe(true);
    }
  });

  test('blocks the 31st request from the same IP', () => {
    for (let i = 0; i < 30; i++) checkRateLimit(IP_A);
    const result = checkRateLimit(IP_A);
    expect(result.allowed).toBe(false);
  });

  test('returns retryAfter when IP is blocked', () => {
    for (let i = 0; i < 30; i++) checkRateLimit(IP_A);
    const result = checkRateLimit(IP_A);
    expect(result.retryAfter).toBeGreaterThan(0);
  });

  test('does not block a different IP when one IP is exhausted', () => {
    for (let i = 0; i < 10; i++) checkRateLimit(IP_A);
    expect(checkRateLimit(IP_B).allowed).toBe(true);
  });

  test('blocks all IPs when global limit is reached', () => {
    for (let i = 0; i < 200; i++) {
      checkRateLimit(`10.0.${Math.floor(i / 10)}.${i % 10}`);
    }
    expect(checkRateLimit(IP_A).allowed).toBe(false);
  });

  test('expired timestamps are not counted toward per-IP limit', () => {
    for (let i = 0; i < 30; i++) checkRateLimit(IP_A);
    vi.advanceTimersByTime(60 * 60 * 1000 + 1);
    expect(checkRateLimit(IP_A).allowed).toBe(true);
  });

  test('expired timestamps are not counted toward global limit', () => {
    for (let i = 0; i < 200; i++) {
      checkRateLimit(`10.0.${Math.floor(i / 10)}.${i % 10}`);
    }
    vi.advanceTimersByTime(60 * 60 * 1000 + 1);
    expect(checkRateLimit(IP_A).allowed).toBe(true);
  });
});
