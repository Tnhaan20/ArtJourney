import { courseService } from "@/domains/services/Courses/courses.services";
import { QueryKey } from "@/domains/store/query-key";
import { useToast } from "@/utils/Toast";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const useCourse = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();

  const createCourseMutation = useMutation({
    mutationKey: [QueryKey.COURSES.CREATE_COURSE],
    mutationFn: async (payload) => await courseService.post.createCourse(payload),

    onSuccess: (data) => {
      toast({
        title: "Course created successfully",
        description: data.message,
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Course creation failed",
        description: error.response?.data?.title,
        variant: "destructive",
      });
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COURSES.GET_ALL_COURSES],
      });
    },
  });

  const createUserEnroll = useMutation({
      mutationKey: [QueryKey.COURSES.USER.ENROLL_USER_COURSE],
      mutationFn: async (payload) =>
        await courseService.post.userEnrollCourse(payload),

      onSuccess: async (data) => {
        toast({
          title: "User enrolled successfully",
          description: data.message,
          variant: "success",
        });
      },
      onError: async (error) => {
        toast({
          title: "User enrollment failed",
          description: error.response?.data?.errors?.[0].message,
          variant: "destructive",
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [QueryKey.COURSES.GET_COURSE_BY_ID],
        });
      },
    });

  const createCourseReview = useMutation({
    mutationKey: [QueryKey.COURSES.REVIEW_COURSE],
    mutationFn: async (payload) => {
      return await courseService.post.reviewCourse(payload);
    },

    onSuccess: async (data) => {
      toast({
        title: "Course reviewed successfully",
        description: data.message,
        variant: "success",
      });
    },

    onError: async (error) => {
      toast({
        title: "Course review failed",
        description: error.response?.data?.errors?.[0].message,
        variant: "destructive",
      });
    },

    onSettled: (variables) => {
      // Lấy courseId từ variables (payload đã truyền vào)
      const { courseId } = variables;

      console.log(courseId);
      
      // Invalidate course detail cache với courseId cụ thể
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COURSES.GET_COURSE_BY_ID, courseId],
      });
    },
  });

  const deleteCourse = (courseId) => {
    return useMutation({
      mutationKey: [QueryKey.COURSES.DELETE_COURSE, courseId],
      mutationFn: async (courseId) =>
        await courseService.delete.removeCourse(courseId),

      onSuccess: async (data) => {
        toast({
          title: "Course deleted successfully",
          description: data.message,
          variant: "success",
        });
      },

      onError: async (error) => {
        toast({
          title: "Course review failed",
          description: error.response?.data?.errors?.[0].message,
          variant: "destructive",
        });
      },

      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [QueryKey.COURSES.GET_ALL_COURSES],
        });
      },
    });
  };


  const getReviewedCourse = (courseId) => {
    return useQuery({
      queryKey: [QueryKey.COURSES.GET_COURSE_REVIEW, courseId],
      queryFn: async () => await courseService.get.getReviewedCourse(courseId),
    });
  };

  const getCourseQuery = useQuery({
    queryKey: [QueryKey.COURSES.GET_COURSE],
    queryFn: async () => await courseService.get.getCourse(1, 10),
  });

  const getAllCoursesQuery = useQuery({
    queryKey: [QueryKey.COURSES.GET_ALL_COURSES],
    queryFn: async () => await courseService.get.getAllCourses(),
  });

  const getCoursesById = (id) => {
    return useQuery({
      queryKey: [QueryKey.COURSES.GET_COURSE_BY_ID, id],
      queryFn: async () => await courseService.get.getCourseById(id),
    });
    
  };

  const useGetCoursePublic = (id) => {
    return useQuery({
      queryKey: [QueryKey.COURSES.GET_COURSE_BY_ID_GUEST, id],
      queryFn: async () => await courseService.get.getCourseByIdGuest(id),
    });
  };

  const useSearchCourses = (searchTerm, page = 1, size = 10) => {
    return useQuery({
      queryKey: [QueryKey.COURSES.SEARCH_COURSES, searchTerm, page, size],
      queryFn: async () => await courseService.get.searchCourses(searchTerm, page, size),
      enabled: !!searchTerm && searchTerm.length > 0, // Only run query if search term exists
    });
  };

  const useGetEnrolledCousreOfUser = (userId) => {
    return useQuery({
      queryKey: [QueryKey.COURSES.USER.ENROLLED_COURSES, userId],
      queryFn: async () => await courseService.get.getEnrolledCourses(userId),
    });
  };

  const getUserLearningProgress = (userId, courseId) => {
    return useQuery({
      queryKey: [QueryKey.COURSES.USER.GET_USER_COURSE_INFO, userId, courseId],
      queryFn: async () => await courseService.get.getUserLearningProgress(userId, courseId),
      enabled: !!userId && !!courseId,
    });
  };

  
  
  return {
    createCourseMutation,
    getCourseQuery,
    getAllCoursesQuery,
    createUserEnroll,
    useSearchCourses,
    getCoursesById,
    useGetCoursePublic,
    getUserLearningProgress,
    useGetEnrolledCousreOfUser,
    createCourseReview,
    getReviewedCourse,
    deleteCourse,
  };
};
