// Add this import
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/utils/Toast";
import { surveyService } from "@/domains/services/Survey/survey.service";
import { QueryKey } from "@/domains/store/query-key";

export const useSurvey = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();

  const createSurveySubmission = useMutation({
    mutationKey: [QueryKey.SURVEY.CREATE_SUBMISSION],
    mutationFn: async (payload) =>
      await surveyService.post.submitService(payload),

    onSuccess: async (data) => {
      toast({
        title: "Survey submitted successfully",
        description: data.message,
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Survey submission failed",
        description: error.response?.data?.message || "Failed to submit survey",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.REGIONS.GET_ALL_REGIONS],
      });
    },
  });

  const getSurveyQuestionsQuery = useQuery({
    queryKey: [QueryKey.SURVEY.GET_QUESTIONS],
    queryFn: async () => await surveyService.get.getSurveyQuestions(),
  });

  const getMySurveyQuery = useQuery({
    queryKey: [QueryKey.SURVEY.GET_MY_SURVEY],
    queryFn: async () => await surveyService.get.getMySurvey(),
  });

  return {
    createSurveySubmission,
    getSurveyQuestionsQuery,
    getMySurveyQuery,
  };
};
