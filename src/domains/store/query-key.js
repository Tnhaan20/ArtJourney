export const QueryKey = {
  LOGIN: "login",
  REGISTER: "register",
  GOOGLE_LOGIN: "google-login",
  GOOGLE_CALLBACK: "google-callback",
  VERIFY: {
    SEND: "verify-email-send",
    GET: "verify-email-get",
  },

  REGIONS: {
    CREATE_REGION: "region-create",
    GET_REGION: "region-get",
    GET_ALL_REGIONS: "region-get-all",
  },

  HISTORICAL_PERIODS: {
    CREATE_HISTORICAL_PERIOD: "historical-period-create",
    GET_HISTORICAL_PERIOD: "historical-period-get",
    GET_ALL_HISTORICAL_PERIODS: "historical-period-get-all",
  },

  COURSES: {
    CREATE_COURSE: "course-create",
    GET_COURSE: "course-get",
    GET_ALL_COURSES: "course-get-all",
    UPDATE_COURSE: "course-update",
    DELETE_COURSE: "course-delete",
    SEARCH_COURSES: "course-search",
    GET_COURSE_BY_ID: "course-get-by-id",
    GET_COURSE_BY_ID_GUEST: "course-get-by-id-guest",
    USER: {
      GET_USER_COURSE_INFO: "course-get-user-course-info",
      ENROLL_USER_COURSE: "course-enroll-user-course",
      ENROLLED_COURSES: "enrolled-courses",
    },
  },

  MODULE: {
    CREATE_MODULE: "create-module",
    GET_MODULE: "get-module",
  },
  SUB_MODULE: {
    CREATE_SUB_MODULE: "create-sub-module",
    GET_SUB_MODULE: "get-sub-module",
  },

  LEARNING_CONTEXT: {
    CREATE_LEARNING_CONTEXT: "learning-context-create",
    GET_LEARNING_CONTEXT: "learning-context-get",
    MARK_AS_COMPLETE: "learning-context-mark-as-complete",
    CREATE_QUESTION: "learning-context-create-question",
    GET_QUESTION: "learning-context-get-question",
  },

  AI: {
    SEND_MESSAGE: "ai-send-message",
    CREATE_SESSION: "ai-create-session",
    DELETE_SESSION: "ai-delete-session",
    GET_LEARNING_ANALYTICS: "ai-get-learning-analytics",
    GET_SESSIONS: "ai-get-sessions",
    GET_SESSION_BY_ID: "ai-get-session-by-id",
  },

  PAYMENT: {
    CREATE_PAYMENT_LINK: "payment-create-link",
  },
};
