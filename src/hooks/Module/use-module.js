import { moduleService } from "@/domains/services/Module/module.services";
import { QueryKey } from "@/domains/store/query-key";
import { useToast } from "@/utils/Toast";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const useModule = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();

  const createModuleMutation = useMutation({
    mutationKey: [QueryKey.MODULE.CREATE_MODULE],
    mutationFn: async (payload) =>
      await moduleService.post.createModule(payload),

    onSuccess: async (data) => {
      toast({
        title: "Module created successfully",
        description: data.message,
        variant: "success",
      });
    },
    onError: async (error) => {
      toast({
        title: "Region creation failed",
        description: error.response?.data?.errors?.[0].message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.MODULE.GET_MODULE],
      });
    },
  });

  const deleteModuleMutation = useMutation({
    mutationKey: [QueryKey.MODULE.DELETE_MODULE],
    mutationFn: async (moduleId) =>
      await moduleService.delete.deleteModule(moduleId),

    onSuccess: async (data) => {
      toast({
        title: "Module deleted successfully",
        description: data.message,
        variant: "success",
      });
    },
    onError: async (error) => {
      toast({
        title: "Module deleted failed",
        description: error.response?.data?.errors?.[0].message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.MODULE.GET_MODULE],
      });
    },
  });

  const getModuleQuery = (courseId) => { 
    return useQuery({
      queryKey: [QueryKey.MODULE.GET_MODULE, courseId],
      queryFn: async () => await moduleService.get.getModule(courseId),
      enabled: !!courseId,
      refetchOnWindowFocus: false,
      retry: false,
    });
  }


  return {
    createModuleMutation,
    getModuleQuery,
    deleteModuleMutation,
  };
};
