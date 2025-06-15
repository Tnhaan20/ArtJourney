import { learningContextServices } from "@/domains/services/LearningContent/learning.services";
import { moduleService } from "@/domains/services/Module/module.services";
import { QueryKey } from "@/domains/store/query-key";
import { useToast } from "@/utils/Toast";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const useLearning = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();

  const createLearningMutation = useMutation({
    mutationKey: [QueryKey.LEARNING_CONTEXT.CREATE_LEARNING_CONTEXT],
    mutationFn: async (payload) =>
      await learningContextServices.post.createLearningContext(payload),

    onSuccess: async (data) => {
      toast({
        title: "Learning context created successfully",
        description: data.message,
        variant: "success",
      });
    },
    onError: async (error) => {
      toast({
        title: "Learning context creation failed",
        description: error.response?.data?.errors?.[0].message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.LEARNING_CONTEXT.GET_LEARNING_CONTEXT],
      });
    },
  });

  const getLearningContent = (subModuleId) => {
    return useQuery({
      queryKey: [QueryKey.LEARNING_CONTEXT.GET_LEARNING_CONTEXT, subModuleId],
      queryFn: async () => await learningContextServices.get.getLearningContent(subModuleId),
      enabled: !!subModuleId,
      refetchOnWindowFocus: false,
      retry: false,
    });
  };

  const getLearningItem = (learningItemId) => {
    return useQuery({
      queryKey: [QueryKey.LEARNING_CONTEXT.GET_LEARNING_ITEM, learningItemId],
      queryFn: async () =>
        await learningContextServices.get.getLearningItem(learningItemId),
      enabled: !!learningItemId,
      refetchOnWindowFocus: false,
      retry: false,
    });
  };

  return {
    createLearningMutation,
    getLearningContent,
    getLearningItem,
  };
};
