import axiosInstance from "@/configs/axios.config";

export const userService = {
    post: {
      
    },
    get: {
        
      getAll: async () => {
        const res = await axiosInstance.get(`/users`);
        return res.data;
      },

      getPremium: async () => {
        const res = await axiosInstance.get(`/users/premium-status`);
        return res.data;
      }
    },
    put:{

    },
    delete:{
    },
};
