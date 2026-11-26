import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry";
import { saveEnquiry } from "@/lib/enquiry-store";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();
const idempotency = new Map<string, { reference: string; receivedAt: string }>();

function jsonError(status: number, code: string, message: string) {
  return NextResponse.json({ ok: false, code, message }, { status });
}

export async function POST(request: NextRequest) {
  // A real durable destination must be approved and configured before
  // production submissions can be accepted. Never return a false success.
  if (process.env.NODE_ENV === "production") {
    return jsonError(
      503,
      "STORAGE_NOT_CONFIGURED",
      "Appointment enquiries are temporarily unavailable. Please contact the clinic directly."
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return jsonError(415, "UNSUPPORTED_MEDIA_TYPE", "Send the enquiry as JSON.");
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return jsonError(413, "PAYLOAD_TOO_LARGE", "The enquiry is too large.");
  }

  const clientKey = (request.headers.get("x-forwarded-for") ?? "local")
    .split(",")[0]
    .trim()
    .slice(0, 80);
  const now = Date.now();
  const bucket = rateBuckets.get(clientKey);
  if (bucket && bucket.resetAt > now && bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return jsonError(429, "RATE_LIMITED", "Too many attempts. Please try again later.");
  }
  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(clientKey, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    bucket.count += 1;
  }

  let raw: unknown;
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) {
      return jsonError(413, "PAYLOAD_TOO_LARGE", "The enquiry is too large.");
    }
    raw = JSON.parse(text);
  } catch {
    return jsonError(400, "INVALID_JSON", "The enquiry could not be read. Please try again.");
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return jsonError(400, "INVALID_BODY", "Check the enquiry details and try again.");
  }

  // Honeypot: bots fill the visually hidden company field; silently reject.
  if (typeof (raw as Record<string, unknown>).companyWebsite === "string" &&
      (raw as Record<string, unknown>).companyWebsite !== "") {
    return NextResponse.json({ ok: true, reference: "received" }, { status: 202 });
  }

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        message: "Please check the highlighted fields.",
        fields: parsed.error.flatten().fieldErrors
      },
      { status: 422 }
    );
  }

  const key = request.headers.get("idempotency-key") ?? "";
  if (!/^[0-9a-f-]{36}$/i.test(key)) {
    return jsonError(400, "IDEMPOTENCY_KEY_REQUIRED", "Refresh the form and try again.");
  }

  const existing = idempotency.get(key);
  if (existing) {
    return NextResponse.json({ ok: true, ...existing, duplicate: true }, { status: 200 });
  }

  const reference = `MKP-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const saved = await saveEnquiry(parsed.data, reference);
  if (!saved) {
    return jsonError(503, "STORAGE_NOT_CONFIGURED", "The enquiry could not be saved. Please try again later.");
  }

  const result = { reference, receivedAt: saved.receivedAt };
  idempotency.set(key, result);
  return NextResponse.json({ ok: true, ...result }, { status: 201 });
}