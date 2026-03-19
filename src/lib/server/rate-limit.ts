type RateLimitEntry = {
  count: number;
  resetTime: number;
};

export function createInMemoryRateLimiter({
  maxRequests,
  windowMs,
}: {
  maxRequests: number;
  windowMs: number;
}) {
  const store = new Map<string, RateLimitEntry>();

  return {
    check(key: string) {
      const now = Date.now();
      const current = store.get(key);

      if (!current || now > current.resetTime) {
        store.set(key, { count: 1, resetTime: now + windowMs });
        return true;
      }

      if (current.count >= maxRequests) {
        return false;
      }

      current.count += 1;
      return true;
    },
  };
}

export const quoteRateLimiter = createInMemoryRateLimiter({
  maxRequests: 5,
  windowMs: 60 * 1000,
});

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  const realIp = headers.get("x-real-ip");

  return forwarded?.split(",")[0]?.trim() || realIp || "unknown";
}
