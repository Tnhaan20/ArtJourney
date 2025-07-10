import { QueryKey } from "@/domains/store/query-key";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/utils/Toast";
import { gamificationService } from "@/domains/services/Gamification/gamification.services";

export const useGamification = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();

  const createChallengeMutation = useMutation({
    mutationKey: [QueryKey.CHALLENGE.CREATE_CHALLENGE],
    mutationFn: async (payload) =>
      await gamificationService.post.createChallenge(payload),

    onSuccess: async (data) => {
      toast({
        title: "Challenge created successfully",
        description: data.message,
        variant: "success",
      });
    },
    onError: async (error) => {
      toast({
        title: "Region creation failed",
        description: error.response?.data?.errors?.[0].message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.CHALLENGE.GET_ALL_CHALLENGES],
      });
    },
  });
    
    const createSession = useMutation({
        mutationKey: [QueryKey.CHALLENGE.CREATE_CHALLENGE_SESSION],
        mutationFn: async (payload) =>
            await gamificationService.post.createChallengeSession(payload),
    
        onSuccess: async (data) => {
            toast({
            title: "Session created successfully",
            description: data.message,
            variant: "success",
            });
        },
        onError: async (error) => {
            toast({
            title: "Session creation failed",
            description: error.response?.data?.errors?.[0].message,
            variant: "destructive",
            });
        },
        
    });

    const createArtwork = useMutation({
        mutationKey: [QueryKey.CHALLENGE.CREATE_ARTWORKS],
        mutationFn: async (payload) =>
            await gamificationService.post.createArtworks(payload),
        onSuccess: async (data) => {
            toast({
            title: "Artwork created successfully",
            description: data.message,
            variant: "success",
            });
        },
        onError: async (error) => {
            toast({
            title: "Artwork creation failed",
            description: error.response?.data?.errors?.[0].message,
            variant: "destructive",
            });
        },
    });

    const createArtworkDetail = useMutation({
        mutationKey: [QueryKey.CHALLENGE.CREATE_ARTWORK_DETAIL],
        mutationFn: async (payload) =>
            await gamificationService.post.createArtworkDetail(payload),
        onSuccess: async (data) => {
            toast({
                title: "Artwork detail created successfully",
                description: data.message,
                variant: "success",
            });
        },
        onError: async (error) => {
            toast({
                title: "Artwork detail creation failed",
                description: error.response?.data?.errors?.[0].message,
                variant: "destructive",
            });
        },
    })

    const getChallengeByCourse = (courseId) => {
        return useQuery({
          queryKey: [QueryKey.CHALLENGE.GET_CHALLENGE_BY_COURSE, courseId],
          queryFn: async () =>
            await gamificationService.get.getChallengeByCourse(courseId),
          enabled: !!courseId,
          refetchOnWindowFocus: false,
          retry: false,
        });
      };

     const getChallengeById = (challengeId) => {
        return useQuery({
          queryKey: [QueryKey.CHALLENGE.GET_CHALLENGE_BY_ID, challengeId],
          queryFn: async () =>
            await gamificationService.get.getChallengeById(challengeId),
          enabled: !!challengeId,
          refetchOnWindowFocus: false,
          retry: false,
        });
      };

  return {
    createChallengeMutation,
    getChallengeById,
    getChallengeByCourse,
      createSession,
    createArtwork,
    createArtworkDetail,    
  };
};
