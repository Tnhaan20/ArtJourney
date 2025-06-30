import axiosInstance from "@/configs/axios.config";

export const aiService = {
  post: {
    // Send message to chat
    sendMessage: async (messageData) => {
          const response = await axiosInstance.post("/Chat/message", messageData, {
          timeout: 120000,
      });
      return response.data;
    },

    // Create new chat session
    createSession: async (sessionData) => {
      const response = await axiosInstance.post("/Chat/session", sessionData);
      return response.data;
    },
  },
  
  get: {
    // Get learning analytics
    getLearningAnalytics: async () => {
      const response = await axiosInstance.get("/Chat/learning-analytics");
      return response.data;
    },

    // Get all chat sessions
    getSessions: async () => {
      const response = await axiosInstance.get("/Chat/sessions");
      return response.data;
    },

    // Get specific chat session by ID
    getSessionById: async (sessionId) => {
      const response = await axiosInstance.get(`/Chat/session/${sessionId}`);
      return response.data;
    },
  },
  
  put: {
    
  },
  
  delete: {
    // Delete chat session by ID
    deleteSession: async (sessionId) => {
      const response = await axiosInstance.delete(`/Chat/session/${sessionId}`);
      return response.data;
    },
  },
};
