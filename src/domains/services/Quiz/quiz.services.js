import axiosInstance from "@/configs/axios.config";
import { create } from "canvas-confetti";

export const quizService = {
  post: {
    createQuizTitle: async (data) => {
      const res = await axiosInstance.post("/quizs", data);
      return res.data;
    },

    createQuiz: async (data) => {
      const res = await axiosInstance.post("/questions", data);
      return res.data;
    },

    submitQuiz: async (data) => {
      const res = await axiosInstance.post("/quiz/submit", data);
      return res.data;
    },

    startQuiz: async (learningContentId, userId, data) => {
      const res = await axiosInstance.post(
        `/quiz/learning-content/${learningContentId}/user/${userId}`,
        data
      );
      return res.data;
    },
  },
  get: {
    getQuizByLearningContent: async (learningContentId, page, pageSize) => {
      const res = await axiosInstance.get(
        `/questions/learning-content/${learningContentId}?page=${page}&pageSize=${pageSize}`
      );
      return res.data;
    },
  },
  put: {},
  delete: {},
};
