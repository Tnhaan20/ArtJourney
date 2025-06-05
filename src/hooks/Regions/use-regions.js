import { QueryKey } from "@/domains/store/query-key";
import { regionService } from "@/domains/services/Regions/region.services"; // Add this import
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { useToast } from "@/utils/Toast";


export const useRegion = () => {
    const { toast } = useToast();
    const queryClient = new QueryClient();

    const createRegionMutation = useMutation({
      mutationKey: [QueryKey.REGIONS.CREATE_REGION],
      mutationFn: async (payload) =>
        await regionService.post.createRegion(payload),

      onSuccess: async (data) => {
        toast({
          title: "Region created successfully",
          description: data.message,
          variant: "success",
        });
      },
      onError: (error) => {
        toast({
          title: "Region creation failed",
          description:
            error.response?.data?.message || "Failed to create region",
          variant: "destructive",
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [QueryKey.REGIONS.GET_ALL_REGIONS],
        });
      },
    });

    const getRegionQuery = useQuery({
      queryKey: [QueryKey.REGIONS.GET_REGION],
      queryFn: async () => await regionService.get.getRegion(1, 10), 
    });

    const getAllRegionQuery = useQuery({
        queryKey: [QueryKey.REGIONS.GET_ALL_REGIONS],
        queryFn: async () => await regionService.get.getAllRegions(),
    })

    return {
        createRegionMutation,
        getRegionQuery,
        getAllRegionQuery
    };
}