import { aiService } from "@/domains/services/AI/ai.services";
import { QueryKey } from "@/domains/store/query-key";
import { useToast } from "@/utils/Toast";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const useAI = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();

  // Mutation for sending chat message
  const sendMessageMutation = useMutation({
    mutationKey: [QueryKey.AI.SEND_MESSAGE],
    mutationFn: async (messageData) =>
      await aiService.post.sendMessage(messageData),

    onSuccess: (data) => {
      toast({
        title: "Message sent successfully",
        description: data.message,
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.response?.data?.title || "Something went wrong",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.AI.GET_SESSIONS],
      });
    },
  });

  // Mutation for creating chat session
  const createSessionMutation = useMutation({
    mutationKey: [QueryKey.AI.CREATE_SESSION],
    mutationFn: async (sessionData) =>
      await aiService.post.createSession(sessionData),

    onSuccess: (data) => {
      toast({
        title: "Chat session created successfully",
        description: data.message,
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create session",
        description: error.response?.data?.title || "Something went wrong",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.AI.GET_SESSIONS],
      });
    },
  });

  // Mutation for deleting chat session
  const deleteSessionMutation = useMutation({
    mutationKey: [QueryKey.AI.DELETE_SESSION],
    mutationFn: async (sessionId) =>
      await aiService.delete.deleteSession(sessionId),

    onSuccess: (data) => {
      toast({
        title: "Session deleted successfully",
        description: data.message,
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete session",
        description: error.response?.data?.title || "Something went wrong",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.AI.GET_SESSIONS],
      });
    },
  });

  // Query for getting learning analytics
  const getLearningAnalyticsQuery = useQuery({
    queryKey: [QueryKey.AI.GET_LEARNING_ANALYTICS],
    queryFn: async () => await aiService.get.getLearningAnalytics(),
  });

  // Query for getting all chat sessions
  const getSessionsQuery = useQuery({
    queryKey: [QueryKey.AI.GET_SESSIONS],
    queryFn: async () => await aiService.get.getSessions(),
  });

  // Query for getting specific session by ID
  const getSessionById = (sessionId) => {
    return useQuery({
      queryKey: [QueryKey.AI.GET_SESSION_BY_ID, sessionId],
      queryFn: async () => await aiService.get.getSessionById(sessionId),
      enabled: !!sessionId,
    });
  };

  return {
    sendMessageMutation,
    createSessionMutation,
    deleteSessionMutation,
    getLearningAnalyticsQuery,
    getSessionsQuery,
    getSessionById,
  };
};
