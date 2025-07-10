import { QueryKey } from "@/domains/store/query-key";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/utils/Toast";
import { leaderboardService } from "@/domains/services/Leaderboard/leaderboard.services";

export const useLeaderboard = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();

  
const getLeaderboardByChallengeId = (challengeId) => {
    return useQuery({
      queryKey: [QueryKey.LEADERBOARD.GET_LEADERBOARD_BY_CHALLENGE, challengeId],
      queryFn: async () =>
        await leaderboardService.get.getLeaderboardByChallenge(challengeId),
      enabled: !!challengeId,
      refetchOnWindowFocus: false,
      retry: false,
    });
};

const getGlobalLeaderboard = () => {
  return useQuery({
    queryKey: [QueryKey.LEADERBOARD.GET_GLOBAL_LEADERBOARD],
    queryFn: async () =>
      await leaderboardService.get.getGlobalLeaderboard(),
    enabled: true,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

  return {
    getLeaderboardByChallengeId,
    getGlobalLeaderboard,
  };
};
