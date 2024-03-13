import { z } from "zod";

export const offerSchema = z.object({
  name: z.string().min(1),
  earnings: z.object({
    from: z.string().min(1),
    to: z.string().min(1),
  }),
  workDirection: z.enum(["Remote", "PartlyRemote", "Office"]),
  requirements: z.string().array().min(1),
  description: z.string().min(1),
});

export type OfferType = z.infer<typeof offerSchema>;
