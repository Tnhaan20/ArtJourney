import axiosInstance from "@/configs/axios.config";

export const courseService = {
  post: {
    createCourse: async (data) => {
const res = await axiosInstance.post("/courses", data, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});          
        return res.data;
      
    },
  },
  get: {
    getCourse: async (page, size) => {
      const res = await axiosInstance.get(`/courses?page=${page}&size=${size}`);
      return res.data;
    },
    getAllCourses: async () => {
      const res = await axiosInstance.get("/courses");
      return res.data;
    },
    getCourseById: async (id) => {
      const res = await axiosInstance.get(`/courses/${id}`);
      return res.data;
    },
  },
  put: {
    updateCourse: async (id, data) => {
      const res = await axiosInstance.put(`/courses/${id}`, data);
      return res.data;
    },
  },
  delete: {
    removeCourse: async (id) => {
      const res = await axiosInstance.delete(`/courses/${id}`);
      return res.data;
    },
  },
};
