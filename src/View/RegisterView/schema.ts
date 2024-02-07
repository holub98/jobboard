import { z } from "zod";

const localizationSchema = z.object({
  country: z.string().min(1),
  city: z.string().min(1),
  street: z.string().min(1),
  number: z.string().min(1),
  zipCode: z.string().min(1),
});

export const registerSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  name: z.string().min(1),
  localization: localizationSchema,
});

export type RegisterType = z.infer<typeof registerSchema>;
