import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import teamMember1 from "@/assets/team-member-1.png";
import courseHeaderBg from "@/assets/course/course-header.png";
import CompletedBox from "@/components/elements/completedbox/Completed";
import { useCourse } from "@/hooks/Courses/use-course";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { parseLearningOutcomes } from "@/utils/learningOutcome"; // Import utility function
import {
  ChevronRight,
  Loader2,
  Play,
  BookOpen,
  Clock,
  Award,
  Star,
  Users,
  Calendar,
  Target,
  ChevronDown,
  ChevronUp,
  PenLine,
  Video,
  FileText,
} from "lucide-react";
import { TailwindStyle } from "@/utils/Enum";
import Timer from "@/lib/timer";

export default function CourseAuth({ learningProgress, courseId }) {
  const { getCoursesById } = useCourse();
  const { getCurrentUser } = useAuthStore();
  const [expandedModules, setExpandedModules] = useState({});

  const { data: courseDetail, isLoading, error } = getCoursesById(courseId);
  const { user } = getCurrentUser();

  // Toggle module expansion
  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // Helper function to get progress status
  const getProgressStatus = (status) => {
    switch (status) {
      case 0:
        return { text: "Not Started", color: "gray" };
      case 1:
        return { text: "In Progress", color: "blue" };
      case 2:
        return { text: "Completed", color: "green" };
      default:
        return { text: "Not Started", color: "gray" };
    }
  };

  // Helper function to get content type icon
  const getContentIcon = (contentType) => {
    switch (contentType) {
      case 1:
        return <BookOpen size={16} className="text-blue-500" />;
      case 2:
        return <PenLine size={16} className="text-amber-500" />;
      case 3:
        return <Video size={16} className="text-green-500" />;
      default:
        return <FileText size={16} className="text-gray-500" />;
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

  // Calculate module progress
  const calculateModuleProgress = (module) => {
    let totalItems = 0;
    let completedItems = 0;

    module.subModuleCourseDetailScreenResponseDTOs.forEach((subModule) => {
      subModule.learningContentDetailScreenResponseDTOs.forEach((content) => {
        totalItems++;
        if (content.userLearningProgressStatus === 2) {
          completedItems++;
        }
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

  // Updated helper function to get learning outcomes array
  const getLearningOutcomes = () => {
    const courseLearningOutcomes = course?.learningOutcomes;

    // Use the utility function to parse learning outcomes
    return parseLearningOutcomes(courseLearningOutcomes, defaultLearningOutcomes);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-yellow border-t-transparent mx-auto mb-6"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Loading Your Course
          </h3>
          <p className="text-gray-600">Preparing your learning journey...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <div className="text-red-500 text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            {error.message || "Unable to load course details"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
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
  const courseImage = course?.coverImageUrl || courseHeaderBg;
  const userName = user?.name || "Student";
  const userAvatar = user?.avatar || teamMember1;
  const learningOutcomes = getLearningOutcomes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Enhanced Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex py-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-3">
              <li>
                <Link
                  to="/learn"
                  className="text-primary-yellow hover:text-secondary-yellow font-medium transition-colors flex items-center"
                >
                  <BookOpen size={16} className="mr-2" />
                  Learn
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <span className="text-gray-700 font-medium truncate max-w-xs">
                  {course?.title || "Course Detail"}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background with overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${courseImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Course Info */}
              <div className="text-white">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-yellow/20 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-yellow/30">
                    <span className="text-primary-yellow font-semibold">
                      {course?.courseLevel === 1
                        ? "Beginner"
                        : course?.courseLevel === 2
                        ? "Intermediate"
                        : course?.courseLevel === 3
                        ? "Advanced"
                        : "Beginner"}
                    </span>
                  </div>
                </div>

                <h1 className="text-5xl font-bold mb-6 leading-tight">
                  {course?.title || "Course Title"}
                </h1>

                <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
                  {course?.description ||
                    "Kickstart your career in art. Build job-ready skills in art techniques, art history, and creative expression and learn to create beautiful artworks in just 6 months"}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                    <BookOpen size={20} className="text-primary-yellow mr-2" />
                    <span className="font-medium">
                      {course?.totalModule || 10} Modules
                    </span>
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                    <Clock size={20} className="text-primary-yellow mr-2" />
                    <span className="font-medium">
                      {Timer().formatHoursToDays(course?.remainingTime) ||
                        "6 weeks"}
                    </span>
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                    <Star size={20} className="text-primary-yellow mr-2" />
                    <span className="font-medium">4.6 Rating</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold">Your Progress</span>
                    <span className="text-2xl font-bold text-primary-yellow">
                      {progressPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                    <div
                      className="bg-gradient-to-r from-primary-yellow to-secondary-yellow h-3 rounded-full transition-all duration-700 relative overflow-hidden"
                      style={{ width: `${progressPercentage}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-200">
                    {progressPercentage === 100
                      ? "Course completed! 🎉"
                      : "Keep going, you're doing great!"}
                  </p>
                </div>
              </div>

              {/* Right Column - Learning Outcomes */}
              <div className="lg:justify-self-end">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-2xl max-w-md">
                  <div className="flex items-center mb-6">
                    <Target size={24} className="text-primary-yellow mr-3" />
                    <h3 className="text-xl font-bold text-gray-800">
                      What You'll Learn
                    </h3>
                  </div>

                  <ul className="space-y-4">
                    {learningOutcomes.slice(0, 6).map((outcome, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                          ✓
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {outcome}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {learningOutcomes.length > 6 && (
                    <p className="text-sm text-gray-500 mt-4 text-center">
                      +{learningOutcomes.length - 6} more learning outcomes
                    </p>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Course Curriculum
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore all modules and lessons in this course. Track your progress
            and continue where you left off.
          </p>
        </div>

        {/* Course Modules */}
        <div className="space-y-6">
          {course?.moduleCourseDetailScreenResponseDTOs?.map(
            (module, moduleIndex) => {
              const moduleProgress = calculateModuleProgress(module);
              const isExpanded = expandedModules[module.moduleId];

              return (
                <div
                  key={module.moduleId}
                  className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Module Header */}
                  <div
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleModule(module.moduleId)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-primary-yellow to-secondary-yellow text-white rounded-xl px-4 py-2 font-bold shadow-lg">
                          {moduleIndex + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {module.moduleTitle}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>
                              {module.subModuleCourseDetailScreenResponseDTOs
                                ?.length || 0}{" "}
                              lessons
                            </span>
                            <span>•</span>
                            <span>{moduleProgress}% complete</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {/* Progress Circle */}
                        <div className="relative w-12 h-12">
                          <svg
                            className="w-12 h-12 transform -rotate-90"
                            viewBox="0 0 36 36"
                          >
                            <path
                              className="text-gray-300"
                              stroke="currentColor"
                              strokeWidth="3"
                              fill="transparent"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-primary-yellow"
                              stroke="currentColor"
                              strokeWidth="3"
                              fill="transparent"
                              strokeDasharray={`${moduleProgress}, 100`}
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-700">
                              {moduleProgress}%
                            </span>
                          </div>
                        </div>

                        {/* Expand/Collapse Icon */}
                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Module Content - Expandable */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50/50">
                      <div className="p-6">
                        <div className="space-y-4">
                          {module.subModuleCourseDetailScreenResponseDTOs?.map(
                            (subModule, subIndex) => (
                              <div
                                key={`${module.moduleId}-${subModule.subModuleId}-${subIndex}`}
                                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-3">
                                    <div className="bg-secondary-yellow text-primary-blue rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                                      {subIndex + 1}
                                    </div>
                                    <Link
                                      to={`/learn/course/${courseId}/module/${module.moduleId}/submodule/${subModule.subModuleId}`}
                                      className="font-semibold text-gray-800 hover:text-primary-yellow transition-colors group flex items-center"
                                    >
                                      <span>{subModule.subModuleTitle}</span>
                                      <ChevronRight className="w-4 h-4 ml-2 text-gray-400 group-hover:text-primary-yellow transition-colors" />
                                    </Link>
                                  </div>
                                </div>

                                {/* Sub-module content */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {subModule.learningContentDetailScreenResponseDTOs?.map(
                                    (content, contentIndex) => {
                                      const status = getProgressStatus(
                                        content.userLearningProgressStatus
                                      );

                                      return (
                                        <div
                                          key={`${module.moduleId}-${subModule.subModuleId}-${content.learningContentId}`}
                                          className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-white hover:shadow-sm transition-all duration-200"
                                        >
                                          <div className="flex items-center space-x-3">
                                            <CompletedBox
                                              isCompleted={isCompleted(
                                                content.userLearningProgressStatus
                                              )}
                                              className="flex-shrink-0"
                                              size={16}
                                            />
                                            {getContentIcon(
                                              content.contentType
                                            )}
                                            <div className="min-w-0 flex-1">
                                              <p className="text-sm font-medium text-gray-900 truncate">
                                                {content.learningContentTitle}
                                              </p>
                                              <span
                                                className={`text-xs px-2 py-1 rounded-full font-medium inline-block mt-1 ${
                                                  status.color === "green"
                                                    ? "bg-green-100 text-green-700"
                                                    : status.color === "blue"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-gray-100 text-gray-600"
                                                }`}
                                              >
                                                {status.text}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          )}

          {/* No modules message */}
          {(!course?.moduleCourseDetailScreenResponseDTOs ||
            course.moduleCourseDetailScreenResponseDTOs.length === 0) && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-lg">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
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
  );
}
