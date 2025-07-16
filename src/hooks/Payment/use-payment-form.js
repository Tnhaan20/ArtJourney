import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePayment } from "./use-payment";
import { PaymentSchema } from "@/domains/schema/Payment/payment.schema";


export const usePaymentForm = () => { 

    const { createPaymentMutation } = usePayment();
    
    const form = useForm({
        resolver: zodResolver(PaymentSchema), 
        defaultValues: {
                buyerName: "",
                buyerEmail: "",
                buyerPhone: "0365666666",
                description: "thanh toan khoa hoc",
                items: [
                  {
                    courseId: 0,
                    name: "",
                    quantity: 1,
                    price: 0
                  }
                ]
              
        },
    });
    
    const onSubmit = async (data) => { 
        await createPaymentMutation.mutateAsync(data);
        form.reset();
    };
    
    return {
      form,
      onSubmit,
      isLoading: createPaymentMutation.isPending,
    };
}