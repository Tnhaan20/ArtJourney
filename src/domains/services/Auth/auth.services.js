import axiosInstance from "@/configs/axios.config";

export const AuthServices = {
  get: {
    googleCallback: async() => {
      try {
        const response = await axiosInstance.get(
          `/Authentication/google-callback`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    me: async () => {
      try {
        const response = await axiosInstance.get(
          `/Authentication/me`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  post: {
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
},
}
