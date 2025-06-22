// Main payment schema

import { z } from "zod";

// Item schema for individual course items
const PaymentItemSchema = z.object({
    courseId: z.number()
      .positive("Course ID must be a positive number")
      .int("Course ID must be an integer"),
    
    name: z.string()
      .min(1, "Course name is required")
      .max(200, "Course name must not exceed 200 characters")
      .trim(),
    
    quantity: z.number()
      .min(1, "Quantity must be at least 1")
      .max(10, "Maximum quantity is 10")
      .int("Quantity must be an integer"),
    
    price: z.number()
      .min(0, "Price must be 0 or greater")
      .max(100000000, "Price exceeds maximum limit") // 100M VND limit
  });

export const PaymentSchema = z.object({
  buyerName: z
    .string()
    .min(2, "Buyer name must be at least 2 characters")
    .max(100, "Buyer name must not exceed 100 characters")
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, "Buyer name can only contain letters and spaces")
    .trim(),

  buyerEmail: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .max(254, "Email address is too long")
    .toLowerCase()
    .trim(),

  buyerPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, "Please enter a valid phone number")
    .trim(),

  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must not exceed 500 characters")
    .trim(),

  items: z
    .array(PaymentItemSchema)
    .min(1, "At least one item is required")
    .max(10, "Maximum 10 items allowed")
    .refine((items) => {
      const courseIds = items.map((item) => item.courseId);
      return courseIds.length === new Set(courseIds).size;
    }, "Duplicate courses are not allowed"),
});
