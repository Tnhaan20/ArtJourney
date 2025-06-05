import { z } from "zod";

export const useRegionSchema = z.object({
  regionName: z
    .string()
    .min(4, "Region name must be at least 4 characters long"),
  description: z.string().max(500, "Description cannot exceed 500 characters"),
});
