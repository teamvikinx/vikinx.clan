// ratelimit.ts
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { headers } from "next/headers";

const ratelimit = new Ratelimit({
  redis: kv,
  // Configure rate limits (e.g., 5 requests from the same IP in 10 seconds)
  limiter: Ratelimit.slidingWindow(5, "120 s"),
});

export async function rateLimitMiddleware(request: NextRequest) {
  const ip = headers().get('x-forwarded-for') ?? request.ip ?? "127.0.0.1";

  const { success } = await ratelimit.limit(ip);
  console.log(success, ip);

  return Boolean(success);
}
