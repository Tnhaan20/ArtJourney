import axiosInstance from "@/configs/axios.config";

export const userService = {
    post: {
      
    },
    get: {
        
      getAll: async () => {
        const res = await axiosInstance.get(`/users`);
        return res.data;
      },
    },
    put:{

    },
    delete:{
    },
};
