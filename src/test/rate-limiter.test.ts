import { describe, it, expect } from "vitest";
import { checkRateLimit } from "@/lib/rate-limiter";

describe("checkRateLimit", () => {
  it("allows the first request from a new IP", () => {
    const result = checkRateLimit("test-ip-1");
    expect(result.allowed).toBe(true);
  });

  it("allows up to 5 requests within the window", () => {
    const ip = "test-ip-2";
    for (let i = 0; i < 5; i++) {
      const result = checkRateLimit(ip);
      expect(result.allowed).toBe(true);
    }
  });

  it("blocks the 6th request and returns a retryAfter value", () => {
    const ip = "test-ip-3";
    for (let i = 0; i < 5; i++) checkRateLimit(ip);
    const result = checkRateLimit(ip);
    expect(result.allowed).toBe(false);
    expect(result.retryAfter).toBeGreaterThan(0);
    expect(result.retryAfter).toBeLessThanOrEqual(60);
  });

  it("treats different IPs independently", () => {
    // Fill up ip-a
    for (let i = 0; i < 5; i++) checkRateLimit("ip-a");
    expect(checkRateLimit("ip-a").allowed).toBe(false);
    // ip-b is untouched
    expect(checkRateLimit("ip-b").allowed).toBe(true);
  });
});
