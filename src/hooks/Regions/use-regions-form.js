import { useRegionSchema } from "@/domains/schema/Region/region.schema";
import { useRegion } from "./use-regions"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


export const useRegionsForm = () => { 

    const { createRegionMutation } = useRegion();
    
    const form = useForm({
        resolver: zodResolver(useRegionSchema), 
        defaultValues: {
            regionName: "", 
            description: "",
        },
    });
    
    const onSubmit = async (data) => { 
        await createRegionMutation.mutateAsync(data);
        form.reset();
    };
    
    return {
        form,
        onSubmit,
        isLoading: createRegionMutation.isPending,
    };
}