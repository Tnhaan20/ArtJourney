import axiosInstance from "@/configs/axios.config";

export const AuthServices = {
  loginWithGoogle: async () => {
    try {
      const response = await axiosInstance.get("/auth/google/login");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (payload) => {
    try {
      const response = await axiosInstance.post(
        "/Authentication/sign-in",
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post(
        "/Authentication/logout"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (payload) => {
    try {
      const response = await axiosInstance.post(
        "/Authentication/register",
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  validate: async () => {
    try {
      const response = await axiosInstance.post("/auth/validate");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  refreshToken: async (refreshToken) => {
    try {
      const response = await axiosInstance.post("/auth/refresh-token", {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
