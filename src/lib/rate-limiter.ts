const WINDOW_MS = 60 * 60 * 1000;
const IP_LIMIT = 30;
const GLOBAL_LIMIT = 200;

let ipStore = new Map<string, number[]>();
let globalStore: number[] = [];

export function resetRateLimiter() {
  ipStore = new Map();
  globalStore = [];
}

export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const ipTimestamps = (ipStore.get(ip) ?? []).filter((t) => t > windowStart);
  const filtered = globalStore.filter((t) => t > windowStart);

  if (ipTimestamps.length >= IP_LIMIT) {
    const retryAfter = Math.ceil((ipTimestamps[0] + WINDOW_MS - now) / 1000);
    ipStore.set(ip, ipTimestamps);
    globalStore = filtered;
    return { allowed: false, retryAfter };
  }

  if (filtered.length >= GLOBAL_LIMIT) {
    ipStore.set(ip, ipTimestamps);
    globalStore = filtered;
    return { allowed: false, retryAfter: Math.ceil((filtered[0] + WINDOW_MS - now) / 1000) };
  }

  ipTimestamps.push(now);
  filtered.push(now);
  ipStore.set(ip, ipTimestamps);
  globalStore = filtered;

  return { allowed: true };
}
