import { useModuleSchema } from "@/domains/schema/Module/module.schema";
import { useModule } from "./use-module";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useModuleForm = ({courseId}) => {
  const { createModuleMutation } = useModule();

  const form = useForm({
    resolver: zodResolver(useModuleSchema),
    defaultValues: {
      moduleTitle: "",
      description: "",
      courseId: courseId ? parseInt(courseId) : 0,
    },
  });

  const onSubmit = async (data) => {
    await createModuleMutation.mutateAsync(data);
    form.reset();
  };

  return {
    form,
    onSubmit,
    isLoading: createModuleMutation.isPending,
  };
};
