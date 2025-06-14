import { z } from "zod";


export const useModuleSchema = z.object({
    moduleTitle: z
    .string()
    .min(1, "Module title is required")
    .max(200, "Module title must be less than 200 characters"),
  
    description: z
    .string()
    .min(1, "Module description is required")
    .max(1000, "Description cannot exceed 1000 characters"),

    courseId: z
    .number()

});
