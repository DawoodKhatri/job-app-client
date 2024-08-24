import { z } from "zod";

export const ADMIN_JOB_FORM = z.object({
  company: z
    .string({ message: "Company name is required" })
    .min(1, { message: "Company name is required" }),
  position: z
    .string({ message: "Position is required" })
    .min(1, { message: "Position is required" }),
  contract: z
    .string({ message: "Contract is required" })
    .min(1, { message: "Contract is required" }),
  location: z
    .string({ message: "Location is required" })
    .min(1, { message: "Location is required" }),
  description: z.string(),
});
