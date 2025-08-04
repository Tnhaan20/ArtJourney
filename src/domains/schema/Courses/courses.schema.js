import { z } from "zod";

// File validation schema
const fileSchema = z.instanceof(File).optional();

export const useCourseSchema = z
  .object({
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

    Level: z
      .string()
      .min(1, "Please select a level")
      .transform((val) => parseInt(val, 10))
      .refine((val) => [0, 1, 2].includes(val), {
        message: "Invalid level selected",
      }),

    Status: z
      .string()
      .min(1, "Please select a status")
      .transform((val) => parseInt(val, 10))
      .refine((val) => [0, 1, 2].includes(val), {
        message: "Invalid status selected",
      }),

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

    IsPremium: z
      .string()
      .min(1, "Please select premium status")
      .transform((val) => val === "true"), // Convert string to boolean

    Price: z.number().min(0, "Price cannot be negative"),

    CoverImage: fileSchema,
  })
  .refine(
    (data) => {
      if (data.IsPremium && (data.Price < 20000 || data.Price > 40000)) {
        return false;
      }
      return true;
    },
    {
      message: "Premium courses must have a price of at least 20,000 VND and at most 40,000 VND",
      path: ["Price"], // This associates the error with the Price field
    }
  );

export const userEnrollCourse = z.object({
  enrollmentStatus: z.number(),

  learningStatus: z.number(),

  userId: z
    .number()
    .int("User ID must be an integer")
    .positive("User ID must be a positive number")
    .max(9223372036854775807n, "User ID exceeds maximum value"), // int64 max

  courseId: z
    .number()
    .int("Course ID must be an integer")
    .positive("Course ID must be a positive number")
    .max(9223372036854775807n, "Course ID exceeds maximum value"), // int64 max
});

export const courseReviewSchema = z.object({
  courseId: z.number(),

  rating: z.string().min(1, "Rating is required"),

  feedBack: z
    .string()
    .min(1, "Feedback is required")
    .min(10, "Feedback must be at least 10 characters")
    .max(1000, "Feedback cannot exceed 1000 characters"),
});
