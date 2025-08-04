import axiosInstance from "@/configs/axios.config";
import { create } from "canvas-confetti";
import { get } from "react-scroll/modules/mixins/scroller";

export const gamificationService = {
  post: {
    createChallenge: async (data) => {
      const res = await axiosInstance.post("/Challenge/api/challenges", data);
      return res.data;
    },

    createChallengeSession: async (data) => {
      const res = await axiosInstance.post(
        "/game/sessions",
        data
      );
      return res.data;
    },

    createArtworks: async (data) => {
      const res = await axiosInstance.post("/challenge/artwork", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    createArtworkDetail: async (data) => {
      const res = await axiosInstance.post(
        "/challenge/artwork-details",
        data
      );
      return res.data;
    }
  },
  get: {
    getChallengeByCourse: async (courseId) => {
      const res = await axiosInstance.get(
        `/Challenge/api/challenges/course/${courseId}`
      );
      return res.data;
    },

    getChallengeById: async (challengeId) => {
      const res = await axiosInstance.get(
        `/Challenge/${challengeId}`
      );
      return res.data;
    },
    getArtworkByChallenge: async (challengeId) => {
      const res = await axiosInstance.get(`/challenge/${challengeId}/artworks`);
      return res.data;
    }
    
  },
  put: {},
  delete: {},
};
