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



// Schema for user answers
const userAnswerSchema = z.object({
  quizAttemptId: z.number().positive("Quiz attempt ID must be a positive number"),
  questionId: z.number().positive("Question ID must be a positive number"),
  selectedOptionId: z.number().positive("Selected option ID must be a positive number")
});

// Submit quiz schema
export const submitQuizSchema = z.object({
  learningContentId: z
    .number()
    .positive("Learning content ID must be a positive number"),
  quizAttemptId: z
    .number()
    .positive("Quiz attempt ID must be a positive number"),
  userAnswers: z
    .array(userAnswerSchema)
    .min(1, "At least one answer is required")
    .refine(
      (answers) => {
        // Check that all answers have the same quizAttemptId
        const attemptIds = answers.map((answer) => answer.quizAttemptId);
        return attemptIds.every((id) => id === attemptIds[0]);
      },
      {
        message: "All user answers must have the same quiz attempt ID",
      }
    )
    .refine(
      (answers) => {
        // Check that there are no duplicate questionId entries
        const questionIds = answers.map((answer) => answer.questionId);
        return questionIds.length === new Set(questionIds).size;
      },
      {
        message: "Each question can only be answered once",
      }
    ),
});