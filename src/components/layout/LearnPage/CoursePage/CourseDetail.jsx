import React from "react";
import { useParams } from "react-router-dom";
import CourseAuth from "./CourseAuth";
import CourseDetailGuest from "./CoursePublic";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { useCourse } from "@/hooks/Courses/use-course";
import { Loader2 } from "lucide-react";

export default function CourseDetail() {
  const { courseId } = useParams();
  const { user, isAuthenticated } = useAuthStore();
  const { getUserLearningProgress } = useCourse();

  // Get user learning progress
  const {
    data: learningProgress,
    isLoading,
    error,
  } = getUserLearningProgress(user?.id, courseId);

  console.log("User ID:", user?.id);
  console.log("Learning Progress Data:", learningProgress);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-primary-yellow pr-3" />
        <div className="text-lg">Loading course information...</div>
      </div>
    );
  }

  // Handle errors - if API fails, treat as guest
  if (error) {
    console.error("Error fetching learning progress:", error);
    return (
      <CourseDetailGuest
        courseId={courseId}
        isAuthenticated={isAuthenticated}
      />
    );
  }

  // Check if user is enrolled (learningStatus === 1)
  const isEnrolled = learningProgress?.data?.learningStatus === 1;

  // Render component based on authentication and enrollment status
  if (isAuthenticated && isEnrolled) {
    // User is authenticated and enrolled in the course
    return (
      <CourseAuth
        courseId={courseId}
        learningProgress={learningProgress?.data}
      />
    );
  } else {
    // Guest or user not enrolled in course
    return (
      <CourseDetailGuest
        courseId={courseId}
        isAuthenticated={isAuthenticated}
      />
    );
  }
}
