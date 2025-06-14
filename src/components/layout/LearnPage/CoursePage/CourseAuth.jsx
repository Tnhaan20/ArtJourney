import React from "react";
import { useParams, Link } from "react-router-dom";
import teamMember1 from "@/assets/team-member-1.png";
import courseHeaderBg from "@/assets/course/course-header.png";
import CompletedBox from "@/components/elements/completedbox/Completed";
import { useCourse } from "@/hooks/Courses/use-course";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { Loader2 } from "lucide-react";
import { TailwindStyle } from "@/utils/Enum";
import Timer from "@/lib/timer";

export default function CourseAuth({ learningProgress, courseId }) {
  const { getCoursesById } = useCourse();
  const { getCurrentUser } = useAuthStore();

  const { data: courseDetail, isLoading, error } = getCoursesById(courseId);
  const { user } = getCurrentUser();

  // Helper function to get progress status
  const getProgressStatus = (status) => {
    switch (status) {
      case 0:
        return "Not Started";
      case 1:
        return "In Progress";
      case 2:
        return "Completed";
      default:
        return "Not Started";
    }
  };

  // Helper function to check if item is completed
  const isCompleted = (status) => status === 2;

  // Calculate overall progress
  const calculateProgress = () => {
    if (!courseDetail?.data?.moduleCourseDetailScreenResponseDTOs) return 0;

    let totalItems = 0;
    let completedItems = 0;

    courseDetail.data.moduleCourseDetailScreenResponseDTOs.forEach((module) => {
      module.subModuleCourseDetailScreenResponseDTOs.forEach((subModule) => {
        subModule.learningContentDetailScreenResponseDTOs.forEach((content) => {
          totalItems++;
          if (content.userLearningProgressStatus === 2) {
            completedItems++;
          }
        });
      });
    });

    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };

  // Default learning outcomes if not provided
  const defaultLearningOutcomes = [
    "Master fundamental art concepts and techniques",
    "Develop critical thinking skills in art analysis",
    "Understand historical and cultural contexts of artworks",
    "Create your own artistic interpretations",
    "Build a comprehensive art vocabulary",
    "Appreciate diverse artistic styles and movements",
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-yellow border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading your course...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-8 rounded-2xl shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            {error.message || "Unable to load course details"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const course = courseDetail?.data;
  const progressPercentage =
    course?.courseCompletionPercentage || calculateProgress();

  // Use course cover image or fallback to default
  const courseImage = course?.coverImageUrl || courseHeaderBg;

  const userName = user?.name || "Student";
  const userAvatar = user?.avatar || teamMember1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex py-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-3">
              <li>
                <Link
                  to="/learn"
                  className="text-primary-yellow hover:text-secondary-yellow font-medium transition-colors"
                >
                  Learn
                </Link>
              </li>

              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-gray-400 mx-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 font-medium">
                  {course?.title || "Course Detail"}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Course Header Section with Background Image */}
      <div className="relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${courseImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* Content Overlay */}
        <div className="relative z-10  backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column - Course Info */}
              <div className="lg:col-span-2 flex flex-col items-start justify-center">
                {/* Course Title */}
                <h1 className="text-4xl font-bold  mb-6 leading-tight text-left">
                  {course?.title || "Course Title"}
                </h1>

                {/* Course Description */}
                <p className="text-lg  mb-8 leading-relaxed text-left max-w-2xl">
                  {course?.description ||
                    "Kickstart your career in art. Build job-ready skills in art techniques, art history, and creative expression and learn to create beautiful artworks in just 6 months"}
                </p>

                
              </div>

              {/* Right Column - Learning Outcomes */}
              <div className="lg:col-span-1">
                {/* Learning Outcomes */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 mb-6 shadow-lg">
                  <h4 className="font-bold text-lg mb-6">What You'll Learn</h4>

                  <ul className="space-y-4">
                    {(course?.learningOutcomes || defaultLearningOutcomes).map(
                      (outcome, index) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                            ✓
                          </div>
                          <span className="text-gray-700 text-sm leading-relaxed">
                            {outcome}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Statistics Section - Outside the overlay */}
      <div className="w-full py-8 border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Course Statistics - Horizontal Layout */}
          <div className="grid grid-cols-4 gap-6 w-full mx-auto">
            {/* Course Modules */}
            <div className={`${TailwindStyle.HIGHLIGHT_FRAME} p-4 text-center`}>
              <h4 className="text-xl font-bold mb-1">
                {course?.totalModule || 10}
              </h4>
              <p className="text-lg font-medium">Module(s)</p>
            </div>

            {/* Course Level */}
            <div className={`${TailwindStyle.HIGHLIGHT_FRAME} p-4 text-center`}>
              <h4 className="text-md font-bold mb-2">
                {course?.courseLevel === 1
                  ? "Beginner"
                  : course?.courseLevel === 2
                  ? "Intermediate"
                  : course?.courseLevel === 3
                  ? "Advanced"
                  : "Beginner"}
              </h4>
              <p className="text-lg font-medium">Level</p>
            </div>

            {/* Remaining Time */}
            <div className={`${TailwindStyle.HIGHLIGHT_FRAME} p-4 text-center`}>
              <h4 className="text-md font-bold  mb-1">
                {Timer().formatHoursToDays(course?.remainingTime) || "6 weeks"}
              </h4>
              <p className="text-lg font-medium">Estimate Duration</p>
            </div>

            <div className={`${TailwindStyle.HIGHLIGHT_FRAME} p-4 text-center`}>
              <div className="flex items-center justify-center mb-1">
                <h4 className="text-xl font-bold mr-1">4.6</h4>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-lg font-medium">Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Modules Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div id="course-modules-container" className="space-y-8">
            {/* Progress Section - Replaces "Already know this?" */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Your Progress
                </h3>
                <h4 className="text-4xl font-bold text-primary-yellow mb-2">
                  {progressPercentage}%
                </h4>
                <p className="text-gray-600">Complete</p>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-6 rounded-full transition-all duration-500 relative overflow-hidden"
                  style={{ width: `${progressPercentage}%` }}
                >
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-500 mb-6">
                <span>Started</span>
                <span className="font-medium">
                  {progressPercentage === 100 ? "Completed!" : "In Progress"}
                </span>
                <span>Complete</span>
              </div>

              {/* Progress Details */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {Math.round(
                      (progressPercentage / 100) * (course?.totalModule || 10)
                    )}{" "}
                    / {course?.totalModule || 10}
                  </div>
                  <p className="text-sm text-gray-600">Lessons completed</p>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-yellow mb-1">
                    {progressPercentage === 100
                      ? "Done!"
                      : `${Math.max(
                          1,
                          Math.round(((100 - progressPercentage) / 100) * 6)
                        )} weeks`}
                  </div>
                  <p className="text-sm text-gray-600">Time remaining</p>
                </div>
              </div>
            </div>

            {/* Course Modules */}
            {course?.moduleCourseDetailScreenResponseDTOs?.map(
              (module, moduleIndex) => (
                <div
                  key={module.moduleId}
                  className="bg-white rounded-2xl border border-gray-200 p-8"
                >
                  <div className="flex items-center mb-6">
                    <div
                      className={`px-4 py-2 rounded-lg font-bold mr-4 ${TailwindStyle.HIGHLIGHT_FRAME}`}
                    >
                      MODULE {moduleIndex + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {module.moduleTitle}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {module.subModuleCourseDetailScreenResponseDTOs?.map(
                      (subModule, subIndex) => (
                        <div
                          key={subIndex}
                          className="border-l-4 border-third-yellow pl-6"
                        >
                          <h5 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="bg-secondary-yellow text-primary-blue rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                              {subIndex + 1}
                            </span>
                            {subModule.subModuleTitle}
                          </h5>

                          <div className="space-y-3">
                            {subModule.learningContentDetailScreenResponseDTOs?.map(
                              (content, contentIndex) => (
                                <Link
                                  key={contentIndex}
                                  to={`/learn/course/${courseId}/module/${module.moduleId}/content/${contentIndex}`}
                                  className="block group"
                                >
                                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center">
                                        <CompletedBox
                                          isCompleted={isCompleted(
                                            content.userLearningProgressStatus
                                          )}
                                          className="mr-4"
                                          size={20}
                                        />
                                        <div>
                                          <span className="font-medium text-gray-900 group-hover:text-blue-700">
                                            {content.learningContentTitle}
                                          </span>
                                          <div className="flex items-center mt-1">
                                            <span
                                              className={`text-sm px-2 py-1 rounded-full font-medium ${
                                                content.userLearningProgressStatus ===
                                                2
                                                  ? "bg-green-100 text-green-700"
                                                  : content.userLearningProgressStatus ===
                                                    1
                                                  ? "bg-yellow-100 text-yellow-700"
                                                  : "bg-gray-100 text-gray-600"
                                              }`}
                                            >
                                              {getProgressStatus(
                                                content.userLearningProgressStatus
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="group-hover:translate-x-1 transition-transform">
                                        <svg
                                          className="h-5 w-5 text-gray-400 group-hover:text-primary-yellow"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            )}

            {/* No modules message */}
            {(!course?.moduleCourseDetailScreenResponseDTOs ||
              course.moduleCourseDetailScreenResponseDTOs.length === 0) && (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  Course Modules Coming Soon!
                </h3>
                <p className="text-gray-600">
                  We're preparing amazing content for you. Stay tuned!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

