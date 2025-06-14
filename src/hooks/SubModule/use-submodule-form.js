
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSubModule } from "./use-submodule";
import { useSubModuleSchema } from "@/domains/schema/Sub-Module/submodule.schema";

export const useSubModuleForm = ({moduleId}) => {
  const { createSubModuleMutation } = useSubModule();

  const form = useForm({
    resolver: zodResolver(useSubModuleSchema),
    defaultValues: {
      subModuleTitle: "",
        description: "",
        displayOrder: 0,
        moduleId: moduleId ? parseInt(moduleId) : 0,
    },
  });

  const onSubmit = async (data) => {
    await createSubModuleMutation.mutateAsync(data);
    form.reset();
  };

  return {
    form,
    onSubmit,
    isLoading: createSubModuleMutation.isPending,
  };
};
