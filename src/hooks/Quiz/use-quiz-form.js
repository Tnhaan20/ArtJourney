import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionSchema, quizTitleSchema, submitQuizSchema } from "@/domains/schema/Quiz/quiz.schema";
import { useQuiz } from "./use-quiz";

export const useCreateQuizTitleForm = () => {
  const { createQuizTitleMutation } = useQuiz();

  const form = useForm({
    resolver: zodResolver(quizTitleSchema),
    defaultValues: {
      contentType: 2,
      title: "",
      timeLimit: "00:00:00",
      displayOrder: 0,
      subModuleId: 0,
      courseId: 0,
    },
  });

  const onSubmit = async (data) => {
    console.log("🔥 Quiz title form submission:", data);
    await createQuizTitleMutation.mutateAsync(data);
    form.reset();
  };

  return {
    form,
    onSubmit,
    isLoading: createQuizTitleMutation.isPending,
  };
};

export const useQuizForm = () => {
  const { createQuizMutation } = useQuiz();

  const form = useForm({
    // No resolver since we're handling validation manually
    defaultValues: [], // Default to empty array, not object with questions
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log("🔥 Quiz form submission:", data);
    console.log("📊 Raw data received:", JSON.stringify(data, null, 2));
    
    try {
      // FORCE extract only the questions array - ignore the wrapper
      let questionsArray = [];
      
      if (Array.isArray(data)) {
        // If data is already an array, use it directly
        questionsArray = data;
      } else if (data && data.questions && Array.isArray(data.questions)) {
        // If data has a questions property, extract ONLY the array
        questionsArray = data.questions;
      } else if (typeof data === 'object' && data !== null) {
        // Convert form object values to array
        questionsArray = Object.values(data).filter(item => 
          item && typeof item === 'object' && item.questionText
        );
      }
      
      
      // Validate with schema - questionsArray should be just the array
      const validatedQuestions = questionSchema.parse(questionsArray);
      
      // Submit ONLY the questions array - NOT wrapped in any object
      await createQuizMutation.mutateAsync(validatedQuestions);
      form.reset([]);
    } catch (validationError) {
      console.error("❌ Validation failed:", validationError);
      throw validationError;
    }
  };

  return {
    form,
    onSubmit,
    isLoading: createQuizMutation.isPending,
  };
};
export const useStartQuiz = () => {
  const { startQuizMutation } = useQuiz();

  const startQuiz = async (learningContentId, userId) => {
    try {
      // Since the API uses URL parameters, pass them as separate arguments
      // The mutation should handle the URL construction: /api/quiz/learning-content/{learningContentId}/user/{userId}
      const result = await startQuizMutation.mutateAsync({
        learningContentId,
        userId,
      });

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error("❌ Failed to start quiz:", error);
      return {
        success: false,
        error: error,
      };
    }
  };

  return {
    startQuiz,
  };
};

  // New useSubmitQuizForm hook
  export const useSubmitQuizForm = () => {
    const { submitQuizMutation } = useQuiz();

    const form = useForm({
      resolver: zodResolver(submitQuizSchema),
      defaultValues: {
        learningContentId: 0,
        quizAttemptId: 0,
        userAnswers: [],
      },
    });

    const onSubmit = async (data) => {
      console.log("🔥 Quiz submission form data:", data);
      console.log("📊 Raw submission data:", JSON.stringify(data, null, 2));

      try {
        // Validate with schema
        const validatedData = submitQuizSchema.parse(data);
        console.log("✅ Validated submission data:", validatedData);

        // Submit to API
        await submitQuizMutation.mutateAsync(validatedData);
        form.reset();
      } catch (validationError) {
        console.error("❌ Quiz submission validation failed:", validationError);
        throw validationError;
      }
    };

    // Helper function to submit quiz without form (for direct usage)
    const submitQuiz = async (
      learningContentId,
      quizAttemptId,
      userAnswers
    ) => {
      try {
        const submissionData = {
          learningContentId,
          quizAttemptId,
          userAnswers,
        };

        console.log("🚀 Direct quiz submission:", submissionData);

        // Validate with schema
        const validatedData = submitQuizSchema.parse(submissionData);

        // Submit to API
        const result = await submitQuizMutation.mutateAsync(validatedData);

        return {
          success: true,
          data: result,
        };
      } catch (error) {
        console.error("❌ Failed to submit quiz:", error);
        return {
          success: false,
          error: error,
        };
      }
    };

    // Helper function to format answers from Zustand store
    const formatAnswersForSubmission = (
      selectedAnswers,
      quizAttemptId,
      questions
    ) => {
      const userAnswers = [];

      Object.entries(selectedAnswers).forEach(
        ([questionIndex, selectedOptionId]) => {
          const question = questions[parseInt(questionIndex)];
          if (question && selectedOptionId) {
            userAnswers.push({
              quizAttemptId: parseInt(quizAttemptId),
              questionId: question.id,
              selectedOptionId: selectedOptionId,
            });
          }
        }
      );

      return userAnswers;
    };

    return {
      form,
      onSubmit,
      submitQuiz,
      formatAnswersForSubmission,
      isLoading: submitQuizMutation.isPending,
    };
  };