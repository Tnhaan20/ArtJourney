import { useCourse } from "./use-course";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCourseSchema } from "@/domains/schema/Courses/courses.schema";

export const useCourseForm = () => {
  const form = useForm({
    resolver: zodResolver(useCourseSchema),
    defaultValues: {
      Title: "",
      ThumbnailImage: null,
      Description: "",
      Level: "",
      Status: "",
      HistoricalPeriodId: "",
      RegionId: "",
      LearningOutcomes: "",
      EstimatedDuration: "",
      IsPremium: "",
      CoverImage: null,
    },
    mode: "onChange",
  });

  // Define success callback to reset form
  const handleSuccess = () => {
    console.log("🧹 Clearing form data...");
    form.reset();
  };

  const { createCourseMutation } = useCourse({ onSuccess: handleSuccess });

  const onSubmit = async (data) => {
    console.log("📝 Form onSubmit with VALIDATED data:", data);
    try {
      // Convert all values to correct types for API
      const submitData = {
        ...data,
        Level: parseInt(data.Level),
        Status: parseInt(data.Status),
        // Convert IsPremium to boolean
        IsPremium: data.IsPremium === "1" || data.IsPremium === "true" || data.IsPremium === true,
        // HistoricalPeriodId và RegionId đã được transform trong schema
      };

      console.log("📝 Transformed submit data:", submitData);
      console.log("📝 IsPremium type:", typeof submitData.IsPremium, submitData.IsPremium);
      
      await createCourseMutation.mutateAsync(submitData);
      console.log("📝 Form submission completed");
    } catch (error) {
      console.error("📝 Form submission error:", error);
    }
  };

  return {
    form,
    onSubmit,
    isLoading: createCourseMutation.isPending,
  };
};
