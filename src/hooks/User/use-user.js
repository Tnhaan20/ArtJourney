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

  const getUserProfileQuery = useQuery({
    queryKey: [QueryKey.USER.GET_USER_PROFILE],
    queryFn: async () => await userService.get.getProfile(),
  });

  const updateUserProfile = useMutation({
    mutationKey: [QueryKey.USER.UPDATE_PROFILE],
    mutationFn: async (profileData) => {
      return await userService.put.updateProfile(profileData);
    },
    onSuccess: async (data) => {
      toast({
        title: "Update successfully",
        description: data?.message || "Profile updated successfully",
        variant: "success",
      });
    },
    onError: async (error) => {
      toast({
        title: "Update failed",
        description:
          error?.response?.data?.errors?.[0]?.message ||
          error?.message ||
          "Failed to update profile",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.USER.GET_USER_PROFILE],
      });
    },
  });

  return {
    getPremiumStatusQuery,
    getUserProfileQuery,
    updateUserProfile,
  };
};
