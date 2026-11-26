import { describe, expect, it } from "vitest";
import { enquirySchema } from "../lib/enquiry";

describe("appointment enquiry validation", () => {
  it("accepts the minimum valid enquiry", () => {
    const result = enquirySchema.safeParse({
      name: "Test Patient",
      phone: "9876543210",
      consent: true
    });
    expect(result.success).toBe(true);
  });

  it("accepts an Indian number with country code", () => {
    const result = enquirySchema.safeParse({
      name: "Test Patient",
      phone: "+91 9876543210",
      preferredDate: "2027-01-10",
      preferredTime: "morning",
      consent: true
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid phone numbers", () => {
    const result = enquirySchema.safeParse({
      name: "Test Patient",
      phone: "12345",
      consent: true
    });
    expect(result.success).toBe(false);
  });

  it("requires consent", () => {
    const result = enquirySchema.safeParse({
      name: "Test Patient",
      phone: "9876543210",
      consent: false
    });
    expect(result.success).toBe(false);
  });

  it("rejects names that are too short", () => {
    const result = enquirySchema.safeParse({
      name: "A",
      phone: "9876543210",
      consent: true
    });
    expect(result.success).toBe(false);
  });
});