import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\\+91[ -]?)?[6-9]\\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  preferredDate: z.string().optional().default(""),
  preferredTime: z.enum(["", "morning", "afternoon", "evening"]).optional().default(""),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree before sending your enquiry" }) })
});

export type AppointmentEnquiryInput = z.infer<typeof enquirySchema>;

export type StoredEnquiry = {
  reference: string;
  receivedAt: string;
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
};