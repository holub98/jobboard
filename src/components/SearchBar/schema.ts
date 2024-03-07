import { z } from "zod";

export const filterSchema = z.object({
  name: z.string().optional(),
  requirements: z.string().array().optional(),
  workDirection: z.string().optional(),
  localization: z.string().optional(),
});

export type FilterType = z.infer<typeof filterSchema>;
