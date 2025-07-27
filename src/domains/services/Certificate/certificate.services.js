import axiosInstance from "@/configs/axios.config";
import { create } from "canvas-confetti";

export const certificateService = {
  post: {
    createCertificateAward: async (userId, courseId) => {
      // Use query parameters as shown in your endpoint example
      const res = await axiosInstance.post(`/Certificate/award?userId=${userId}&courseId=${courseId}`);
      return res.data;
    },

    createCertificate: async (data) => {
      const res = await axiosInstance.post(`/Certificate`, data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    }
  },
  get: {
    getUserCertificates: async () => {
      const res = await axiosInstance.get(`/Certificate/user`);
      return res.data;
    },
    // Add method to get specific certificate by ID if needed
    getCertificateById: async (certificateId) => {
      const res = await axiosInstance.get(`/Certificate/${certificateId}`);
      return res.data;
    },


    getCertificateByCourseId: async (courseId) => {
      const res = await axiosInstance.get(`/Certificate/course/${courseId}`);
      return res.data;
    },


    getAllCertificates: async () => {
      const res = await axiosInstance.get(`/Certificate/all`);
      return res.data;
    }


  },
  put: {
    // Add update methods if needed in the future
  },
  delete: {
    deleteCertificate: async (certificateId) => {
      const res = await axiosInstance.delete(`/Certificate/${certificateId}`);
      return res.data;
    }
  },
};
