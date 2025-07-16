import { useCourse } from "./use-course";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  courseReviewSchema,
  useCourseSchema,
  userEnrollCourse,
} from "@/domains/schema/Courses/courses.schema";

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
        IsPremium:
          data.IsPremium === "1" ||
          data.IsPremium === "true" ||
          data.IsPremium === true,
        // HistoricalPeriodId và RegionId đã được transform trong schema
      };

      console.log("📝 Transformed submit data:", submitData);
      console.log(
        "📝 IsPremium type:",
        typeof submitData.IsPremium,
        submitData.IsPremium
      );

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

export const useReviewCourseForm = () => {
  const form = useForm({
    resolver: zodResolver(courseReviewSchema),
    defaultValues: {
  courseId: 0,
  rating: "",
  feedBack: ""
},
    mode: "onChange",
  });

  const { createCourseReview } = useCourse();

   const onSubmit = async (data) => {
     await createCourseReview.mutateAsync(data);
     form.reset();
   };

   return {
     form,
     onSubmit,
     isLoading: createCourseReview.isPending,
   };
};

export const useUserEnrollForm = () => {
  const form = useForm({
    resolver: zodResolver(userEnrollCourse),
    defaultValues: {
      enrollmentStatus: 0,
      learningStatus: 1,
      userId: 0,
      courseId: 0,
    },
    mode: "onChange",
  });

  // Define success callback
  const handleSuccess = () => {
    console.log("✅ User enrollment successful!");
    form.reset();
  };

  const { createUserEnroll } = useCourse({ onSuccess: handleSuccess });

  const onSubmit = async (data) => {
    console.log("🎓 Enrollment onSubmit with VALIDATED data:", data);
    try {
      // Ensure data types are correct
      const submitData = {
        enrollmentStatus: parseInt(data.enrollmentStatus) || 0,
        learningStatus: parseInt(data.learningStatus) || 1,
        userId: parseInt(data.userId),
        courseId: parseInt(data.courseId),
      };

      console.log("🎓 Transformed enrollment data:", submitData);

      await createUserEnroll.mutateAsync(submitData);
      console.log("🎓 Enrollment submission completed");

      return submitData; // Return data for further processing
    } catch (error) {
      console.error("🎓 Enrollment submission error:", error);
      throw error; // Re-throw for component handling
    }
  };

  // Helper function to enroll user with specific data
  const enrollUser = async (userId, courseId) => {
    console.log(`🎓 Enrolling user ${userId} in course ${courseId}`);

    // Set form values
    form.setValue("enrollmentStatus", 0);
    form.setValue("learningStatus", 1);
    form.setValue("userId", parseInt(userId));
    form.setValue("courseId", parseInt(courseId));

    // Submit the form
    const formData = form.getValues();
    return await onSubmit(formData);
  };

  return {
    form,
    onSubmit,
    enrollUser,
    isLoading: createUserEnroll.isPending,
    isSuccess: createUserEnroll.isSuccess,
    error: createUserEnroll.error,
  };
};