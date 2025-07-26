import axiosInstance from "@/configs/axios.config";
import { create } from "zustand";

export const moduleService = {
  post: {
    createModule: async (data) => {
      const res = await axiosInstance.post("/modules", data);
      return res.data;
    },
  },
  get: {
    getModule: async (courseId) => {
      const res = await axiosInstance.get(`/course/${courseId}/modules`);
      return res.data;
    },
  },
  put: {},
  delete: {
    deleteModule: async (moduleId) => {
      const res = await axiosInstance.delete(`/modules/${moduleId}`);
      return res.data;
    },
  },
};
