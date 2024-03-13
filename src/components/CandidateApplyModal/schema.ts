import { z } from "zod";

const experienceSchema = z.object({
  companyName: z.string(),
  job: z.string(),
  dateFrom: z.string(),
  dateTo: z.string().optional(),
});
const educationSchema = z.object({
  schoolName: z.string(),
  dateFrom: z.string(),
  dateTo: z.string().optional(),
  faculty: z.string(),
});
const languageSchema = z.object({
  name: z.string(),
  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2", "Native"]),
});
export const applySchema = z.object({
  offerId: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
  experience: experienceSchema.array().optional(),
  education: educationSchema.array().min(1),
  languages: languageSchema.array().min(1),
  stack: z.string().array().min(1),
  another: z.string(),
});

export type ApplyType = z.infer<typeof applySchema>;
