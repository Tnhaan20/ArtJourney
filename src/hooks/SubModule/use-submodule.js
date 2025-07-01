import { subModuleService } from "@/domains/services/SubModule/submodule.services";
import { QueryKey } from "@/domains/store/query-key";
import { useToast } from "@/utils/Toast";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const useSubModule = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();

  const createSubModuleMutation = useMutation({
    mutationKey: [QueryKey.SUB_MODULE.CREATE_SUB_MODULE],
    mutationFn: async (payload) =>
      await subModuleService.post.createSubModule(payload),

    onSuccess: async (data) => {
      toast({
        title: "Sub-module created successfully",
        description: data.message,
        variant: "success",
      });
    },
    onError: async (error) => {
      toast({
        title: "Sub-module creation failed",
        description: error.response?.data?.errors?.[0].message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.SUB_MODULE.GET_SUB_MODULE],
      });
    },
  });

  const getSubModuleQuery = (moduleId) => {
    return useQuery({
      queryKey: [QueryKey.SUB_MODULE.GET_SUB_MODULE, moduleId],
      queryFn: async () => await subModuleService.get.getSubModule(moduleId),
      enabled: !!moduleId,
      refetchOnWindowFocus: false,
      retry: false,
    });
  };


  

  return {
    createSubModuleMutation,
    getSubModuleQuery,
  };
};
