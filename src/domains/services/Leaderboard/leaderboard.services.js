import axiosInstance from "@/configs/axios.config";
import { create } from "canvas-confetti";

export const leaderboardService = {
  post: {
    
  },
  get: {
    getGlobalLeaderboard: async () => {
      const res = await axiosInstance.get(`/leaderboard/global`);
      return res.data;
    },
    getLeaderboardByChallenge: async (challengeId) => {
      const res = await axiosInstance.get(
        `/challenge/leaderboard/${challengeId}`
      );
      return res.data;
    },
  },
  put: {},
  delete: {},
};
