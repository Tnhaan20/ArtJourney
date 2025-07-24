import axiosInstance from "@/configs/axios.config";

export const userService = {
  post: {},
  get: {
    getAll: async () => {
      const res = await axiosInstance.get(`/users`);
      return res.data;
    },

    getProfile: async () => {
      const res = await axiosInstance.get(`/users/profile`);
      return res.data;
    },

    getPremium: async () => {
      const res = await axiosInstance.get(`/users/premium-status`);
      return res.data;
    },
  },
  put: {
    updateProfile: async (data) => {
      const res = await axiosInstance.put(`/users/profile`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
  },
  delete: {},
};
