import axiosInstance from "@/configs/axios.config";

export const learningContextServices = {
  post: {
    createLearningContext: async (data) => {
      const res = await axiosInstance.post("/learning-contents", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
  },
  get: {
    getLearningContent: async (subModuleId) => {
      const res = await axiosInstance.get(`/learning-contents/sub-module/${subModuleId}`);
      return res.data;
    },

    getLearningItem: async (learningItemId) => {
      const res = await axiosInstance.get(
        `/learning-contents/${learningItemId}/challenge-items`
      );
      return res.data;
    }
  },
  put: {},
  delete: {},
};
