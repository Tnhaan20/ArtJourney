import { z } from "zod";

const REGEX_PHONE =
  /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"), 
  password: z.string().min(6, "Password must be at least 6 characters long"), 
});

export const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
  role: z.number().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Remove TypeScript type declarations
// Instead, export the schemas directly for validation
export const authSchemas = {
  loginSchema,
  registerSchema
};
