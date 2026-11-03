// Sliding-window rate limiter — prevents API abuse from anonymous users.
// Stores request timestamps per IP in memory (resets on cold start, fine for serverless).

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5;   // max 5 briefs per minute per IP

// Map<ip, timestamp[]>
const store = new Map<string, number[]>();

export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const timestamps = (store.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    const oldest = timestamps[0];
    const retryAfter = Math.ceil((oldest + WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfter };
  }

  timestamps.push(now);
  store.set(ip, timestamps);
  return { allowed: true };
}
