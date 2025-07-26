import axiosInstance from "@/configs/axios.config";
import { create } from "zustand";

export const subModuleService = {
  post: {
    createSubModule: async (data) => {
      const res = await axiosInstance.post("/modules/sub-modules", data);
      return res.data;
    },
  },
  get: {
    getSubModule: async (subModuleId) => {
      const res = await axiosInstance.get(
        `/modules/${subModuleId}/sub-modules`
      );
      return res.data;
    },
  },
  put: {},
  delete: {
    deleteSubModule: async (subModuleId) => {
      const res = await axiosInstance.delete(
        `/submodule/${subModuleId}`
      );
      return res.data;
    },
  },
};
