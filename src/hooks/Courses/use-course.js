import { courseService } from "@/domains/services/Courses/courses.services";
import { QueryKey } from "@/domains/store/query-key";
import { useToast } from "@/utils/Toast";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCourse = () => {
  const { toast } = useToast();
  
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

  const getCourseQuery = useQuery({
    queryKey: [QueryKey.COURSES.GET_COURSE],
    queryFn: async () => await courseService.get.getCourse(1, 10),
  });

  const getAllCoursesQuery = useQuery({
    queryKey: [QueryKey.COURSES.GET_ALL_COURSES],
    queryFn: async () => await courseService.get.getAllCourses(),
  });

  const useSearchCourses = (searchTerm, page = 1, size = 10) => {
    return useQuery({
      queryKey: [QueryKey.COURSES.SEARCH_COURSES, searchTerm, page, size],
      queryFn: async () => await courseService.get.searchCourses(searchTerm, page, size),
      enabled: !!searchTerm && searchTerm.length > 0, // Only run query if search term exists
    });
  };
  
  return {
    createCourseMutation,
    getCourseQuery,
    getAllCoursesQuery,
    useSearchCourses,
  };
};
