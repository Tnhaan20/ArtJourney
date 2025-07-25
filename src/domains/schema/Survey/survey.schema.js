import { z } from "zod";

// Schema for individual survey answer
const surveyAnswerSchema = z.object({
  surveyQuestionId: z
    .number()
    .int("Survey question ID must be an integer")
    .positive("Survey question ID must be positive"),

  surveyOptionId: z
    .number()
    .int("Survey option ID must be an integer")
    .positive("Survey option ID must be positive"),
});

// Schema for survey submission
export const surveySubmissionSchema = z.object({
  answers: z
    .array(surveyAnswerSchema)
    .min(1, "At least one answer is required")
    .max(100, "Maximum 100 answers allowed"),
});
