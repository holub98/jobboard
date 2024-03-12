import { z } from "zod";

const experienceSchema = z.object({
  companyName: z.string(),
  job: z.string(),
  dateFrom: z.date(),
  dateTo: z.date().optional(),
});
const educationSchema = z.object({
  schoolName: z.string(),
  dateFrom: z.string(),
  dateTo: z.string().optional(),
  faculty: z.string(),
});
const languageSchema = z.object({
  name: z.string(),
  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2", "Fluent"]),
});
export const applySchema = z.object({
  offerId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  experience: experienceSchema.array().optional(),
  education: educationSchema.array(),
  languages: languageSchema.array(),
  stack: z.string().array(),
  another: z.string(),
});

export type ApplyType = z.infer<typeof applySchema>;
