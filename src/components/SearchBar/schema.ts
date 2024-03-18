import { z } from "zod";

export const filterSchema = z.object({
  name: z.string(),
  requirements: z.string().array(),
  workDirection: z.string(),
  localization: z.string(),
});

export type FilterType = z.infer<typeof filterSchema>;
