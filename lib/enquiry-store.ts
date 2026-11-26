import "server-only";
import type { AppointmentEnquiryInput, StoredEnquiry } from "./enquiry";

const developmentRecords = new Map<string, StoredEnquiry>();

/**
 * Deliberately non-durable development adapter.
 * It is disabled in production so the API cannot claim a submission was saved
 * until an owner-approved persistent destination and retention policy exist.
 */
export async function saveEnquiry(
  input: AppointmentEnquiryInput,
  reference: string
): Promise<StoredEnquiry | null> {
  if (process.env.NODE_ENV === "production") return null;

  const record: StoredEnquiry = {
    reference,
    receivedAt: new Date().toISOString(),
    name: input.name,
    phone: input.phone,
    preferredDate: input.preferredDate ?? "",
    preferredTime: input.preferredTime ?? ""
  };
  developmentRecords.set(reference, record);
  return record;
}

export function getDevelopmentEnquiries(): StoredEnquiry[] {
  if (process.env.NODE_ENV === "production") return [];
  return [...developmentRecords.values()];
}

export function clearDevelopmentEnquiries(): void {
  if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") return;
  developmentRecords.clear();
}