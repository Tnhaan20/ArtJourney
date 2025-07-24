import React from "react";
import { useParams } from "react-router-dom";
import CourseAuth from "./CourseAuth";
import CourseDetailGuest from "./CoursePublic";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { useCourse } from "@/hooks/Courses/use-course";
import { Loader2, BookOpen, User } from "lucide-react";

export default function CourseDetail() {
  const { courseId } = useParams();
  const { user, isAuthenticated } = useAuthStore();
  const { getUserLearningProgress } = useCourse();

  // Get user learning progress
  const {
    data: learningProgress,
    isLoading,
    error,
  } = getUserLearningProgress(user?.userId, courseId);

  console.log("User ID:", user?.userId);
  console.log("Learning Progress Data:", learningProgress);

  // Enhanced loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4">
          {/* Animated spinner */}
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-yellow border-t-transparent mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary-yellow" />
            </div>
          </div>

          {/* Loading text */}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Loading Course Information
          </h3>
          <p className="text-gray-600 mb-4">
            {isAuthenticated
              ? "Checking your enrollment status..."
              : "Preparing course details..."}
          </p>

          {/* Progress dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary-yellow rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary-yellow rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-primary-yellow rounded-full animate-pulse delay-150"></div>
          </div>

          {/* User info if authenticated */}
          {isAuthenticated && user && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-2" />
                <span>Welcome back, {user.name || user.email}!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Enhanced error state
  if (error) {
    console.error("Error fetching learning progress:", error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
          <div className="text-red-500 text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Unable to Load Course Data
          </h2>
          <p className="text-gray-600 mb-6">
            There was an issue checking your enrollment status. We'll show you
            the course as a guest.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              Redirecting to guest view...
            </p>
          </div>
        </div>
      </div>
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
