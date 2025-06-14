import { z } from "zod";


// Base Learning Context Schema
export const useLearningContextSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters")
    .trim(),

  content: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val || null),

  video: z
    .any() // For binary file data
    .optional()
    .nullable()
    .refine(
      (file) => {
        if (!file) return true; // Optional field
        return (
          file instanceof File ||
          Buffer.isBuffer(file) ||
          typeof file === "string"
        );
      },
      {
        message: "Video must be a valid file",
      }
    ),

  timeLimit: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => {
        if (!val) return true; // Optional field
        // Validate HH:MM format
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return timeRegex.test(val);
      },
      {
        message: "Time limit must be in HH:MM format (e.g., 02:30)",
      }
    )
    .transform((val) => val || null),

  displayOrder: z
    .number()
    .int()
    .min(1, "Display order must be at least 1")
    .max(2147483647, "Display order exceeds maximum value"), // int32 max

  subModuleId: z
    .number()
    .int()
    .positive("Sub-module ID must be positive")
    .max(9223372036854775807n, "Sub-module ID exceeds maximum value"), // int64 max (using BigInt)

  courseId: z
    .number()
    .int()
    .positive("Course ID must be positive")
    .max(9223372036854775807n, "Course ID exceeds maximum value"), // int64 max (using BigInt)
});
