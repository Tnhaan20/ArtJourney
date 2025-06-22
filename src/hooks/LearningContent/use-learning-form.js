import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLearning } from "./use-learning";
import { useLearningContextSchema } from "@/domains/schema/LearningContent/learningcontent.schema";

export const useLearningForm = ({ subModuleId, courseId }) => {
  const { createLearningMutation } = useLearning();

  const form = useForm({
    resolver: zodResolver(useLearningContextSchema),
    defaultValues: {
      title: "",
      content: "",
      video: null,
      timeLimit: "",
      displayOrder: 1,
      subModuleId: subModuleId ? parseInt(subModuleId) : 0,
      courseId: courseId ? parseInt(courseId) : 0,
    },
  });

  const onSubmit = async (data) => {
    

    await createLearningMutation.mutateAsync(data);
    form.reset();
  };

  return {
    form,
    onSubmit,
    isLoading: createLearningMutation.isPending,
  };
};


export const useMarkAsComplete = () => {
  const { createMarkAsComplete } = useLearning();

  const markAsComplete = async (learningContentId) => {
    try {
      await createMarkAsComplete.mutateAsync(learningContentId);
      return { success: true };
    } catch (error) {
      console.error("Error marking as complete:", error);
      return { success: false, error };
    }
  };

  return {
    markAsComplete,
    isLoading: createMarkAsComplete.isPending,
    isError: createMarkAsComplete.isError,
    error: createMarkAsComplete.error,
  };
};
