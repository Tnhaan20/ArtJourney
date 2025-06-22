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
  };
};
