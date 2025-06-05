
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHistoricalPeriods } from "./use-historical";
import { useHistoricalSchema } from "@/domains/schema/Historical/historical.schema";


export const useHistoricalPeriodsForm = () => { 

    const { createHistoricalMutation } = useHistoricalPeriods();
    
    const form = useForm({
      resolver: zodResolver(useHistoricalSchema),
      defaultValues: {
        HistoricalPeriodName: "",
        Description: "",
        StartYear: "",
        EndYear: "",
        CreateRequestRegionIds: [],
      },
    });
    
    const onSubmit = async (data) => { 
        await createHistoricalMutation.mutateAsync(data);
        form.reset();
    };
    
    return {
      form,
      onSubmit,
      isLoading: createHistoricalMutation.isPending,
    };
}