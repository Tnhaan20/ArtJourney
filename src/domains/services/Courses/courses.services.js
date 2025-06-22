import axiosInstance from "@/configs/axios.config";
import { userEnrollCourse } from "@/domains/schema/Courses/courses.schema";

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

    userEnrollCourse: async (data) => {
      const res = await axiosInstance.post(
        `/user-course-infos`, data
      );
      return res.data;
    }
  },
  get: {
    getCourse: async (page, size) => {
      const res = await axiosInstance.get(`/courses?page=${page}&size=${size}`);
      return res.data;
    },
    getCourseByIdGuest: async (id) => {
      const res = await axiosInstance.get(`/courses/${id}/guest`);
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
    searchCourses: async (input, page, size) => {
      const res = await axiosInstance.get(`/courses/search`, {
        params: { input, page, size },
      });
      return res.data;
    },

    getEnrolledCourses: async (userId) => {
      const res = await axiosInstance.get(`/courses/enrolled/user/${userId}`);
      return res.data;
    },

    getUserLearningProgress: async (userId, courseId) => {
      const res = await axiosInstance.get(
        `/user-course-infos/userId${userId}/courseId/${courseId}`
      );
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
