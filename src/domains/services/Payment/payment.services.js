import axiosInstance from "@/configs/axios.config";

export const paymentServices = {
  post: {
    createPayment: async (data) => {
      const res = await axiosInstance.post("/Payment/create-payment-link", data);
      return res.data;
    },
  },
  get: {
    
  },
  put: {},
  delete: {},
};
