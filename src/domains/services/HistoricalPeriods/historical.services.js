import axiosInstance from "@/configs/axios.config";

export const historicalPeriodServices = {
  post: {
    createHisoricalPeriod: async (data) => {
      const res = await axiosInstance.post("/historical-periods", data);
      return res.data;
    },
  },
  get: {
    // getHistorical: async (page, size) => {
    //   const res = await axiosInstance.get(`/regions?page=${page}&size=${size}`);
    //   return res.data;
    // },
    getAllHisoricalPeriod: async () => {
      const res = await axiosInstance.get(
        `/historical-periods??page=${1}&size=${1000}`
      );
      return res.data;
    },
  },
  put: {},
  delete: {},
};
