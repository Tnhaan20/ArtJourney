import { z } from 'zod';

export const updateUserProfileSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters long")
      .max(100, "Full name cannot exceed 100 characters")
      .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces")
      .trim()
      .optional(),

    phoneNumber: z
      .string()
      .regex(/^[+]?[\d\s\-()]+$/, "Phone number format is invalid")
      .min(10, "Phone number must be at least 10 digits")
      .max(10, "Phone number must be at least 10 digits")
      .optional(),

    gender: z
      .number()
      .int("Gender must be an integer")
      .min(0, "Gender must be 0, 1, or 2")
      .max(2, "Gender must be 0, 1, or 2")
      .optional(),

    avatarUrl: z
      .string()
      .url("Avatar URL must be a valid URL")
      .or(z.literal(""))
      .optional(),

    birthday: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Birthday must be in YYYY-MM-DD format")
      .refine(
        (date) => new Date(date) <= new Date(),
        "Birthday cannot be in the future"
      )
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field must be provided for update"
  );


