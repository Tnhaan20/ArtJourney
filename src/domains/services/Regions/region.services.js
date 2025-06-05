import axiosInstance from "@/configs/axios.config";

export const regionService = {
    post: {
      createRegion: async (data) => {
        const res = await axiosInstance.post('/regions', data);
        return res.data;
      },
  },
  get: {
    getRegion: async (page, size) => {
      const res = await axiosInstance.get(`/regions?page=${page}&size=${size}`);
      return res.data;
    },
    getAllRegions: async () => {
      const res = await axiosInstance.get(
        `/regions?page=${1}&size=${1000}`);
      return res.data;
    },
  },
  put: {},
  delete: {},
};
