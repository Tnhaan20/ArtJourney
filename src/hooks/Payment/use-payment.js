import { QueryKey } from "@/domains/store/query-key";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/utils/Toast";
import { paymentServices } from "@/domains/services/Payment/payment.services";

export const usePayment = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();

  const createPaymentMutation = useMutation({
    mutationKey: [QueryKey.PAYMENT.CREATE_PAYMENT_LINK],
    mutationFn: async (payload) =>
      await paymentServices.post.createPayment(payload),

    onSuccess: async (data) => {

      // Check if response contains checkout URL
      if (data?.checkoutUrl) {
        toast({
          title: "Payment link created successfully",
          description: "Redirecting to payment gateway...",
          variant: "success",
        });

        
        // Redirect to checkout URL after short delay
        setTimeout(() => {
          window.location.href = data.checkoutUrl;
        }, 1000);
      } else {
        toast({
          title: "Payment created",
          description: data.message || "Payment processing initiated",
          variant: "success",
        });
      }
    },

    onError: (error) => {
      console.error("Payment creation failed:", error);
      toast({
        title: "Payment creation failed",
        description:
          error.response?.data?.message || "Failed to create payment link",
        variant: "destructive",
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.PAYMENT.CREATE_PAYMENT_LINK],
      });
    },
  });

  

  return {
    createPaymentMutation,
  };
};
