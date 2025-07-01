import { z } from "zod";

// Schema for question options
const questionOptionSchema = z.object({
  optionText: z.string().min(1, "Option text is required"),
  isCorrect: z.boolean(),
  orderIndex: z.number()
});

// Schema for individual questions
export const questionSchema = z.array(
  z.object({
    questionText: z.string().min(1, "Question text is required"),
    questionType: z.enum(["SingleChoice", "MultipleChoice"], {
      required_error: "Question type is required"
    }),
    points: z.number().min(1, "Points must be at least 1"),
    orderIndex: z.number(),
    learningContentId: z.number(),
    questionOptions: z.array(questionOptionSchema)
      .min(2, "At least 2 options are required")
      .refine((options) => options.some(opt => opt.isCorrect), {
        message: "At least one option must be marked as correct"
      })
  })

);



// Quiz title schema (for creating learning content)
export const quizTitleSchema = z.object({
  contentType: z.number(),
  title: z.string().min(1, "Title is required"),
  timeLimit: z.string(),
  displayOrder: z.number(),
  subModuleId: z.number(),
  courseId: z.number(),
});



