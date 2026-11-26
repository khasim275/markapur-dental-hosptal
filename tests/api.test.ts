import { describe, expect, it } from "vitest";
import { POST } from "../app/api/appointment-enquiries/route";

function request(body: unknown, key = crypto.randomUUID(), ip = crypto.randomUUID()) {
  return new Request("http://localhost/api/appointment-enquiries", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "idempotency-key": key,
      "x-forwarded-for": ip
    },
    body: JSON.stringify(body)
  }) as never;
}

const validEnquiry = {
  name: "Synthetic Test",
  phone: "9876543210",
  preferredDate: "",
  preferredTime: "",
  consent: true
};

describe("appointment enquiry endpoint", () => {
  it("accepts a valid synthetic enquiry and returns a reference", async () => {
    const response = await POST(request(validEnquiry));
    const result = await response.json();
    expect(response.status).toBe(201);
    expect(result.ok).toBe(true);
    expect(result.reference).toMatch(/^MKP-[A-F0-9]{8}$/);
  });

  it("returns the same result for a repeated idempotency key", async () => {
    const key = crypto.randomUUID();
    const first = await POST(request(validEnquiry, key));
    const second = await POST(request(validEnquiry, key));
    const firstResult = await first.json();
    const secondResult = await second.json();
    expect(first.status).toBe(201);
    expect(second.status).toBe(200);
    expect(secondResult.duplicate).toBe(true);
    expect(secondResult.reference).toBe(firstResult.reference);
  });

  it("rejects an invalid phone number", async () => {
    const response = await POST(request({ ...validEnquiry, phone: "123" }));
    expect(response.status).toBe(422);
  });

  it("rejects non-JSON content", async () => {
    const response = await POST(new Request("http://localhost/api/appointment-enquiries", {
      method: "POST",
      headers: { "content-type": "text/plain" },
      body: "not json"
    }) as never);
    expect(response.status).toBe(415);
  });

  it("does not accept production submissions without approved storage", async () => {
    const original = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    try {
      const response = await POST(request(validEnquiry));
      expect(response.status).toBe(503);
      expect((await response.json()).code).toBe("STORAGE_NOT_CONFIGURED");
    } finally {
      process.env.NODE_ENV = original;
    }
  });
});