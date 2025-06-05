import { z } from "zod";

// File validation schema
const fileSchema = z.instanceof(File).optional();

export const useCourseSchema = z.object({
  Title: z
    .string()
    .min(1, "Course name is required")
    .min(3, "Course name must be at least 3 characters long")
    .max(200, "Course name must be less than 200 characters"),

  ThumbnailImage: fileSchema,

  Description: z
    .string()
    .min(1, "Course description is required")
    .max(1000, "Description cannot exceed 1000 characters"),

  Level: z.string().min(1, "Course level is required"),

  Status: z.string().min(1, "Course status is required"),

  HistoricalPeriodId: z
    .string()
    .min(1, "Please select a Historical Period")
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, {
      message: "Please select a Historical Period",
    }),

  RegionId: z
    .string()
    .min(1, "Please select a Region")
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, {
      message: "Please select a Region",
    }),

  LearningOutcomes: z.string().min(1, "Learning outcomes are required"),

  EstimatedDuration: z
    .string()
    .min(1, "Estimated duration is required")
    .regex(
      /^\d{2}:\d{2}:\d{2}$/,
      "Duration must be in format HH:mm:ss (e.g., 03:00:00)"
    ),

  // Keep IsPremium as string for validation, transform in onSubmit
  IsPremium: z
    .string()
    .min(1, "Premium status is required")
    .refine((val) => val === "0" || val === "1", {
      message: "Premium status must be 0 or 1",
    }),

  CoverImage: fileSchema,
});
