import { QueryKey } from "@/domains/store/query-key";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/utils/Toast";
import { historicalPeriodServices } from "@/domains/services/HistoricalPeriods/historical.services";

export const useHistoricalPeriods = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();

  const createHistoricalMutation = useMutation({
    mutationKey: [QueryKey.HISTORICAL_PERIODS.CREATE_HISTORICAL_PERIOD],
    mutationFn: async (payload) => await historicalPeriodServices.post.createHisoricalPeriod(payload),
    

    onSuccess: async (data) => {
      toast({
        title: "Period created successfully",
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
        queryKey: [QueryKey.HISTORICAL_PERIODS.GET_ALL_HISTORICAL_PERIODS],
      });
    },
  });

  const getAllHistoricalPeriodsQuery = useQuery({
    queryKey: [QueryKey.HISTORICAL_PERIODS.GET_ALL_HISTORICAL_PERIODS],
    queryFn: async () =>
      await historicalPeriodServices.get.getAllHisoricalPeriod(),
  });

  
  return {
    createHistoricalMutation,
    getAllHistoricalPeriodsQuery,
  };
};
