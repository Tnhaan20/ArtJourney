
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/utils/Toast";
import { quizService } from "@/domains/services/Quiz/quiz.services";
import { QueryKey } from "@/domains/store/query-key";

export const useQuiz = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();

  const createQuizTitleMutation = useMutation({
    mutationKey: [QueryKey.QUIZ.CREATE_QUIZ_TITLE],
    mutationFn: async (payload) => await quizService.post.createQuizTitle(payload),

    onSuccess: async (data) => {
      toast({
        title: "Quiz title created successfully",
        description: data.message,
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Quiz creation failed",
        description: error.response?.data?.message || "Failed to create quiz",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.LEARNING_CONTEXT.GET_LEARNING_CONTEXT],
      });
    },
  });

  const createQuizMutation = useMutation({
    mutationKey: [QueryKey.QUIZ.CREATE_QUIZ],
    mutationFn: async (payload) =>
      await quizService.post.createQuiz(payload),

    onSuccess: async (data) => {
      toast({
        title: "Quiz created successfully",
        description: data.message,
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Quiz creation failed",
        description: error.response?.data?.message || "Failed to create quiz",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.QUIZ.GET_QUIZ_BY_CONTENT_ID],
      });
    },
  });

  const startQuizMutation = useMutation({
      mutationKey: [QueryKey.QUIZ.START_QUIZ],
      mutationFn: async ({ learningContentId, userId }) =>
        await quizService.post.startQuiz(learningContentId, userId),

      onError: (error) => {
        toast({
          title: "Quiz creation failed",
          description: error.response?.data?.message || "Failed to create quiz",
          variant: "destructive",
        });
      },
    });
  

  const submitQuizMutation = useMutation({
    mutationKey: [QueryKey.QUIZ.SUBMIT_QUIZ],
    mutationFn: async (payload) => await quizService.post.submitQuiz(payload),

    onSuccess: async (data) => {
      toast({
        title: "Quiz submitted successfully",
        description: data.message,
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Quiz submission failed",
        description: error.response?.data?.message || "Failed to submit quiz",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.LEARNING_CONTEXT.GET_LEARNING_CONTEXT],
      });
    },
  });



  const getQuizByLearningContent = (learningContentId, page, pageSize) => {

   return useQuery({
     queryKey: [QueryKey.QUIZ.GET_QUIZ_BY_CONTENT_ID
      , learningContentId
      ],
      queryFn: async () => await quizService.get.getQuizByLearningContent(learningContentId, page, pageSize),
    });
  }
  

  return {
    createQuizTitleMutation,
    createQuizMutation,
    submitQuizMutation,
    startQuizMutation,
    getQuizByLearningContent
  };
};
