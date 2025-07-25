import axiosInstance from "@/configs/axios.config";

export const surveyService = {
  post: {
    submitService: async (data) => {
      const res = await axiosInstance.post("/Survey/submit", data);
      return res.data;
    },
  },
  get: {
    getSurveyQuestions: async () => {
      const res = await axiosInstance.get("/Survey/questions");
      return res.data;
      },
      getMySurvey: async () => {
        const res = await axiosInstance.get(`/Survey/my-survey`);
        return res.data;
      }
  },
  put: {},
  delete: {},
};
