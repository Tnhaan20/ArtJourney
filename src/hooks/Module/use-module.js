import { moduleService } from "@/domains/services/Module/module.services";
import { QueryKey } from "@/domains/store/query-key";
import { useToast } from "@/utils/Toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useModule = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient(); // ✅ Fixed: Use useQueryClient hook instead of new QueryClient()

  const createModuleMutation = useMutation({
    mutationKey: [QueryKey.MODULE.CREATE_MODULE],
    mutationFn: async (payload) => {
      console.log("🔨 Creating module with payload:", payload);
      return await moduleService.post.createModule(payload);
    },

    onSuccess: async (data, variables) => {
      console.log("✅ Module created successfully:", data);
      console.log("📝 Module creation variables:", variables);
      
      // Extract courseId from the payload to invalidate specific course modules
      const courseId = variables?.courseId;
      
      toast({
        title: "✨ Module Created Successfully",
        description: data.message || "Your new module has been added to the course!",
        variant: "success",
      });

      // ✅ Invalidate and refetch specific course modules
      if (courseId) {
        console.log("🔄 Invalidating modules for course:", courseId);
        await queryClient.invalidateQueries({
          queryKey: [QueryKey.MODULE.GET_MODULE, courseId],
        });
        
        // ✅ Optionally refetch immediately to ensure fresh data
        await queryClient.refetchQueries({
          queryKey: [QueryKey.MODULE.GET_MODULE, courseId],
        });
      }
      
      // ✅ Also invalidate general module queries (without courseId)
      await queryClient.invalidateQueries({
        queryKey: [QueryKey.MODULE.GET_MODULE],
      });
    },
    
    onError: async (error) => {
      console.error("❌ Module creation failed:", error);
      
      toast({
        title: "❌ Module Creation Failed",
        description: error.response?.data?.errors?.[0]?.message || error.response?.data?.message || "Failed to create module. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteModuleMutation = useMutation({
    mutationKey: [QueryKey.MODULE.DELETE_MODULE],
    mutationFn: async (moduleId) =>
      await moduleService.delete.deleteModule(moduleId),

    onSuccess: async (data, variables) => {
      console.log("✅ Module deleted successfully:", data);

      // Extract courseId to invalidate specific course modules
      const { courseId } = variables;

      toast({
        title: "🗑️ Module Deleted Successfully",
        description: data.message || "Module has been removed from the course.",
        variant: "success",
      });

      // ✅ Invalidate and refetch specific course modules
      if (courseId) {
        console.log(
          "🔄 Invalidating modules for course after deletion:",
          courseId
        );
        await queryClient.invalidateQueries({
          queryKey: [QueryKey.MODULE.GET_MODULE, courseId],
        });

        // ✅ Refetch to show updated module list
        await queryClient.refetchQueries({
          queryKey: [QueryKey.MODULE.GET_MODULE, courseId],
        });
      }

      // ✅ Also invalidate general module queries
      await queryClient.invalidateQueries({
        queryKey: [QueryKey.MODULE.GET_MODULE],
      });
    },

    onError: async (error) => {
      console.error("❌ Module deletion failed:", error);

      toast({
        title: "❌ Module Deletion Failed",
        description:
          error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message ||
          "Failed to delete module. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getModuleQuery = (courseId) => { 
    return useQuery({
      queryKey: [QueryKey.MODULE.GET_MODULE, courseId],
      queryFn: async () => {
        console.log("📚 Fetching modules for course:", courseId);
        return await moduleService.get.getModule(courseId);
      },
      enabled: !!courseId,
      refetchOnWindowFocus: false,
      retry: 2, // ✅ Changed from false to 2 for better error handling
      staleTime: 2 * 60 * 1000, // ✅ Added 2 minutes stale time for better performance
    });
  };

  // ✅ Helper function to create module with better handling
  const createModule = async (moduleData) => {
    try {
      console.log("🎯 Creating module with data:", moduleData);
      
      if (!moduleData.courseId) {
        throw new Error("Course ID is required to create a module");
      }

      const result = await createModuleMutation.mutateAsync(moduleData);
      return result;
    } catch (error) {
      console.error("❌ Create module helper error:", error);
      throw error;
    }
  };

  // ✅ Helper function to delete module with courseId
  const deleteModule = async (moduleId, courseId) => {
    try {
      console.log("🗑️ Deleting module:", moduleId, "from course:", courseId);
      
      if (!moduleId) {
        throw new Error("Module ID is required");
      }
      
      if (!courseId) {
        throw new Error("Course ID is required to properly refresh the module list");
      }

      const result = await deleteModuleMutation.mutateAsync({ moduleId, courseId });
      return result;
    } catch (error) {
      console.error("❌ Delete module helper error:", error);
      throw error;
    }
  };

  // ✅ Helper function to get modules for a specific course
  const getModulesForCourse = (courseId) => {
    const query = getModuleQuery(courseId);
    return {
      modules: query.data?.data || [],
      isLoading: query.isLoading,
      error: query.error,
      refetch: query.refetch,
    };
  };

  return {
    // ============ MUTATIONS ============
    createModuleMutation,
    deleteModuleMutation,
    
    // ============ QUERIES ============
    getModuleQuery,
    
    
    
    // ============ LOADING STATES ============
    isCreatingModule: createModuleMutation.isPending,
    isDeletingModule: deleteModuleMutation.isPending,
  };
};
