import { QueryKey } from "@/domains/store/query-key";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/utils/Toast";
import { userService } from "@/domains/services/User/user.services";

export const useUser = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();


  const getPremiumStatusQuery = useQuery({
    queryKey: [QueryKey.GET_PREMIUM_STATUS],
    queryFn: async () => await userService.get.getPremium(),
  });

 
  return {
    getPremiumStatusQuery
  };
};
