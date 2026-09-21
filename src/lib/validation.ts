import { z } from "zod";

export const EVENT_TYPES = [
  "Wedding",
  "Walima",
  "Nikah",
  "Mehndi",
  "Birthday",
  "Eid",
  "Baby shower",
  "Corporate event",
  "Bazaar / Festival",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "Not sure yet",
  "Under £300",
  "£300–£600",
  "£600–£1000",
  "£1000+",
] as const;

export const ROLL_OPTIONS = ["Dubai Roll", "Tiramisu Roll", "Chocoberry Roll", "Not sure yet"] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email."),
  phone: z.string().trim().min(7, "Please enter a valid phone number."),
  eventType: z.enum(EVENT_TYPES, { errorMap: () => ({ message: "Please choose an event type." }) }),
  date: z.string().trim().optional().or(z.literal("")),
  venue: z.string().trim().max(200).optional().or(z.literal("")),
  guestCount: z.string().trim().max(20).optional().or(z.literal("")),
  rollsWanted: z.array(z.enum(ROLL_OPTIONS)).default([]),
  budgetRange: z.enum(BUDGET_RANGES).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  // Honeypot field — real users never fill this in.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
