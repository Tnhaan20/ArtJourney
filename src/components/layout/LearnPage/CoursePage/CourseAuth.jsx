import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import teamMember1 from "@/assets/team-member-1.png";
import courseHeaderBg from "@/assets/course/course-header.png";
import CompletedBox from "@/components/elements/completedbox/Completed";
import { useCourse } from "@/hooks/Courses/use-course";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { useGamification } from "@/hooks/Gamification/use-gamification";
import { useLeaderboard } from "@/hooks/Leaderboard/use-leaderboard";
import { parseLearningOutcomes } from "@/utils/learningOutcome";
import { useReviewCourseForm } from "@/hooks/Courses/use-course-form";

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
  Trophy,
  Timer,
  Gamepad2,
  Zap,
  Medal,
  Crown,
  TrendingUp,
  User,
  Calendar as CalendarIcon,
  MessageSquare,
  Send,
} from "lucide-react";
import { TailwindStyle } from "@/utils/Enum";
import TimerUtil from "@/lib/timer";

export default function CourseAuth({ learningProgress, courseId }) {
  const { getCoursesById } = useCourse();
  const { getChallengeByCourse } = useGamification();
  const { getLeaderboardByChallengeId } = useLeaderboard();
  const { getCurrentUser } = useAuthStore();
  const [expandedModules, setExpandedModules] = useState({});
  const [activeTab, setActiveTab] = useState("course"); // New state for tabs
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);

  const { data: courseDetail, isLoading, error } = getCoursesById(courseId);
  const {
    data: challengeData,
    isLoading: challengeLoading,
    error: challengeError,
  } = getChallengeByCourse(courseId);

  // Get leaderboard data for selected challenge
  const {
    data: leaderboardData,
    isLoading: leaderboardLoading,
    error: leaderboardError,
  } = getLeaderboardByChallengeId(selectedChallengeId);

  const { user } = getCurrentUser();

  const {
    form: reviewForm,
    onSubmit: submitReview,
    isLoading: isSubmittingReview,
  } = useReviewCourseForm();

  const { getReviewedCourse } = useCourse();
  const { data: courseReviews, isLoading: reviewsLoading } =
    getReviewedCourse(courseId);

  // Toggle module expansion
  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // Toggle challenges section
  const toggleChallenges = () => {
    setExpandedChallenges((prev) => !prev);
  };

  // Helper function to get challenge type icon
  const getChallengeTypeIcon = (challengeType) => {
    switch (challengeType) {
      case "Drag&Drop":
        return <Gamepad2 size={20} className="text-blue-500" />;
      case "Quiz":
        return <FileText size={20} className="text-green-500" />;
      case "Drawing":
        return <PenLine size={20} className="text-purple-500" />;
      default:
        return <Trophy size={20} className="text-amber-500" />;
    }
  };

  // Helper function to format duration
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Add this style tag in the component
  const reviewStyles = `
.radio {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-direction: row-reverse;
}

.radio > input {
  position: absolute;
  appearance: none;
}

.radio > label {
  cursor: pointer;
  font-size: 30px;
  position: relative;
  display: inline-block;
  transition: transform 0.3s ease;
}

.radio > label > svg {
  fill: #666;
  transition: fill 0.3s ease;
}

.radio > label::before,
.radio > label::after {
  content: "";
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: #ff9e0b;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0);
  transition: transform 0.4s ease, opacity 0.4s ease;
  animation: particle-explosion 1s ease-out;
}

.radio > label::before {
  top: -15px;
  left: 50%;
  transform: translateX(-50%) scale(0);
}

.radio > label::after {
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%) scale(0);
}

.radio > label:hover::before,
.radio > label:hover::after {
  opacity: 1;
  transform: translateX(-50%) scale(1.5);
}

.radio > label:hover {
  transform: scale(1.2);
  animation: pulse 0.6s infinite alternate;
}

.radio > label:hover > svg,
.radio > label:hover ~ label > svg {
  fill: #ff9e0b;
  filter: drop-shadow(0 0 15px rgba(255, 158, 11, 0.9));
  animation: shimmer 1s ease infinite alternate;
}

.radio > input:checked + label > svg,
.radio > input:checked + label ~ label > svg {
  fill: #ff9e0b;
  filter: drop-shadow(0 0 15px rgba(255, 158, 11, 0.9));
  animation: pulse 0.8s infinite alternate;
}

@keyframes pulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}

@keyframes particle-explosion {
  0% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0; transform: scale(0.5); }
}

@keyframes shimmer {
  0% { filter: drop-shadow(0 0 10px rgba(255, 158, 11, 0.5)); }
  100% { filter: drop-shadow(0 0 20px rgba(255, 158, 11, 1)); }
}

.radio > input:checked + label:hover > svg,
.radio > input:checked + label:hover ~ label > svg {
  fill: #e58e09;
}

.radio > label:hover > svg,
.radio > label:hover ~ label > svg {
  fill: #ff9e0b;
}

.radio input:checked ~ label svg {
  fill: #ffa723;
}
`;


  const handleReviewSubmit = async (data) => {
    try {
      const reviewData = {
        ...data,
        courseId: parseInt(courseId), // Thêm courseId vào payload
        rating: parseInt(data.rating), // Chuyển đổi rating thành integer
      };


      await submitReview(reviewData);
      reviewForm.reset();
    } catch (error) {
      console.error("Review submission error:", error);
    }
  };

  // Get star display for existing reviews - Updated to show number rating
  const getStarDisplay = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        <div className="ml-2 flex">
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              className={`w-4 h-4 ${
                index < rating ? "text-amber-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    );
  };

  // Debug: Watch form state
  const watchedValues = reviewForm.watch();
 

  // Format review date
  const formatReviewDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to get challenge status
  const getChallengeStatus = (challenge) => {
    if (challenge.challengeSessions && challenge.challengeSessions.length > 0) {
      return {
        text: "Completed",
        color: "green",
        icon: <Medal size={16} className="text-green-600" />,
      };
    }
    return {
      text: "Not Started",
      color: "gray",
      icon: <Clock size={16} className="text-gray-500" />,
    };
  };

  // Helper function to get highest score
  const getHighestScore = (challenge) => {
    if (
      challenge.userChallengeHighestScores &&
      challenge.userChallengeHighestScores.length > 0
    ) {
      return Math.max(
        ...challenge.userChallengeHighestScores.map((score) => score.score)
      );
    }
    return null;
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
    return parseLearningOutcomes(
      courseLearningOutcomes,
      defaultLearningOutcomes
    );
  };

  // Format date for leaderboard
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get rank display
  const getRankDisplay = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
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
  const challenges = challengeData?.data || [];
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

                <h1 className="text-5xl mongro-bold font-bold mb-6 leading-tight">
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
                      {TimerUtil().formatHoursToDays(course?.remainingTime) ||
                        "6 weeks"}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold">Your Progress</span>
                    <span className="text-2xl mongro-bold font-bold text-primary-yellow">
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
                    <h3 className="text-xl mongro-bold font-bold text-gray-800">
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

      {/* Tab Navigation */}
      <div className="w-7xl mx-auto px-4 pt-5 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("course")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 ${
                activeTab === "course"
                  ? `${TailwindStyle.HIGHLIGHT_FRAME}`
                  : "text-gray-600 hover:text-primary-yellow hover:bg-amber-50"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <BookOpen size={20} />
                <span>Course Content</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("challenges")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 ${
                activeTab === "challenges"
                  ? `${TailwindStyle.HIGHLIGHT_FRAME}`
                  : "text-gray-600 hover:text-primary-yellow hover:bg-amber-50"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Trophy size={20} />
                <span>Challenges</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 ${
                activeTab === "leaderboard"
                  ? `${TailwindStyle.HIGHLIGHT_FRAME}`
                  : "text-gray-600 hover:text-primary-yellow hover:bg-amber-50"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Crown size={20} />
                <span>Leaderboard</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 ${
                activeTab === "reviews"
                  ? `${TailwindStyle.HIGHLIGHT_FRAME}`
                  : "text-gray-600 hover:text-primary-yellow hover:bg-amber-50"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <MessageSquare size={20} />
                <span>Reviews</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Course Content Tab */}
        {activeTab === "course" && (
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
                            <h3 className="text-xl mongro-bold font-bold text-gray-900 mb-1">
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
        )}

        {/* Challenges Tab */}
        {activeTab === "challenges" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Trophy className="w-8 h-8 text-amber-500" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Course Challenges
                    </h3>
                    <p className="text-gray-600">
                      Test your knowledge and compete with others
                    </p>
                  </div>
                </div>
                <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                  {challenges.length} Challenge
                  {challenges.length > 1 ? "s" : ""}
                </div>
              </div>

              {challengeLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="animate-spin w-8 h-8 text-amber-500 mr-3" />
                  <span className="text-gray-600">Loading challenges...</span>
                </div>
              ) : challengeError ? (
                <div className="text-center py-12 text-red-600">
                  <Trophy className="w-16 h-16 mx-auto mb-4 text-red-400" />
                  <p>Unable to load challenges</p>
                </div>
              ) : challenges.length === 0 ? (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    No Challenges Yet
                  </h3>
                  <p className="text-gray-600">
                    Challenges will be available soon!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {challenges.map((challenge) => {
                    const status = getChallengeStatus(challenge);
                    const highestScore = getHighestScore(challenge);

                    return (
                      <div
                        key={challenge.id}
                        className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6 hover:shadow-lg transition-all duration-300"
                      >
                        {/* Challenge Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            {getChallengeTypeIcon(challenge.challengeType)}
                            <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                              {challenge.challengeType}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {status.icon}
                            <span
                              className={`text-xs font-medium ${
                                status.color === "green"
                                  ? "text-green-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {status.text}
                            </span>
                          </div>
                        </div>

                        {/* Challenge Info */}
                        <div className="mb-4">
                          <h4 className="font-bold text-gray-900 mb-2">
                            {challenge.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {challenge.description}
                          </p>

                          {/* Challenge Stats */}
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <div className="flex items-center space-x-1">
                              <Timer size={14} />
                              <span>
                                {formatDuration(challenge.durationSeconds)}
                              </span>
                            </div>
                            {highestScore !== null && (
                              <div className="flex items-center space-x-1">
                                <Zap size={14} />
                                <span className="font-medium text-amber-600">
                                  Best: {highestScore}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Challenge Actions */}
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            {challenge.challengeSessions.length > 0 ? (
                              <span>
                                Played {challenge.challengeSessions.length} time
                                {challenge.challengeSessions.length > 1
                                  ? "s"
                                  : ""}
                              </span>
                            ) : (
                              <span>Ready to play</span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                setSelectedChallengeId(challenge.id)
                              }
                              className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center space-x-1"
                            >
                              <TrendingUp size={12} />
                              <span>Leaderboard</span>
                            </button>
                            <Link
                              to={`/course/${courseId}/challenge/${challenge.id}`}
                              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-200 flex items-center space-x-1"
                            >
                              <Play size={12} />
                              <span>
                                {challenge.challengeSessions.length > 0
                                  ? "Play"
                                  : "Start"}
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Crown className="w-8 h-8 text-amber-500" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Challenge Leaderboard
                    </h3>
                    <p className="text-gray-600">
                      See how you rank against other players
                    </p>
                  </div>
                </div>
              </div>

              {/* Challenge Selection */}
              {challenges.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Challenge
                  </label>
                  <select
                    value={selectedChallengeId || ""}
                    onChange={(e) => setSelectedChallengeId(e.target.value)}
                    className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">Choose a challenge...</option>
                    {challenges.map((challenge) => (
                      <option key={challenge.id} value={challenge.id}>
                        {challenge.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Leaderboard Content */}
              {!selectedChallengeId ? (
                <div className="text-center py-12">
                  <Crown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    Select a Challenge
                  </h3>
                  <p className="text-gray-600">
                    Choose a challenge to view its leaderboard
                  </p>
                </div>
              ) : leaderboardLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="animate-spin w-8 h-8 text-amber-500 mr-3" />
                  <span className="text-gray-600">Loading leaderboard...</span>
                </div>
              ) : leaderboardError ? (
                <div className="text-center py-12 text-red-600">
                  <Crown className="w-16 h-16 mx-auto mb-4 text-red-400" />
                  <p>Unable to load leaderboard</p>
                </div>
              ) : !leaderboardData?.data?.leaderboard?.length ? (
                <div className="text-center py-12">
                  <Crown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    No Rankings Yet
                  </h3>
                  <p className="text-gray-600">
                    Be the first to complete this challenge!
                  </p>
                </div>
              ) : (
                <div>
                  {/* Leaderboard Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            Rank
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            Player
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            Score
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            Time
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboardData.data.leaderboard.map(
                          (player, index) => (
                            <tr
                              key={player.userId}
                              className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                                player.userId === user?.id ? "bg-amber-50" : ""
                              }`}
                            >
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-2">
                                  <span className="text-2xl">
                                    {getRankDisplay(player.rank)}
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    {player.rank}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {player.username}
                                      {player.userId === user?.id && (
                                        <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                                          You
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-2">
                                  <Zap className="w-4 h-4 text-amber-500" />
                                  <span className="font-bold text-amber-600">
                                    {player.highestScore}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-2">
                                  <Timer className="w-4 h-4 text-blue-500" />
                                  <span className="text-gray-700">
                                    {formatDuration(player.timeTaken)}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-2">
                                  <CalendarIcon className="w-4 h-4 text-gray-500" />
                                  <span className="text-gray-600 text-sm">
                                    {formatDate(player.attemptedAt)}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <style>{reviewStyles}</style>

            {/* Review Form - Updated */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <MessageSquare className="w-8 h-8 text-amber-500" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Share Your Review
                    </h3>
                    <p className="text-gray-600">
                      Help others by sharing your experience with this course
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={reviewForm.handleSubmit(handleReviewSubmit)}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Rate this course *
                    </label>
                    <div className="radio">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <React.Fragment key={rating}>
                          <input
                            id={`rating-${rating}`}
                            type="radio"
                            name="rating"
                            value={rating.toString()}
                            {...reviewForm.register("rating", {
                              required: "Please select a rating",
                              transform: {
                                input: (value) => value?.toString(),
                                output: (e) => parseInt(e.target.value),
                              },
                            })}
                          />
                          <label
                            htmlFor={`rating-${rating}`}
                            title={`${rating} stars`}
                          >
                            <svg
                              viewBox="0 0 576 512"
                              height="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                            </svg>
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                    {reviewForm.formState.errors.rating && (
                      <p className="mt-2 text-sm text-red-600">
                        {reviewForm.formState.errors.rating.message}
                      </p>
                    )}
                  </div>

                  {/* Feedback Section - Updated */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review *
                    </label>
                    <textarea
                      {...reviewForm.register("feedBack")}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                      placeholder="Share your thoughts about this course..."
                    />
                    {reviewForm.formState.errors.feedBack && (
                      <p className="mt-2 text-sm text-red-600">
                        {reviewForm.formState.errors.feedBack.message}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      {watchedValues.feedBack?.length || 0} characters
                    </p>
                  </div>
                  {/* Submit Button - Updated */}
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-6 ${
                      TailwindStyle.HIGHLIGHT_FRAME
                    } text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg ${
                      isSubmittingReview
                        ? "opacity-75 cursor-not-allowed"
                        : "hover:scale-105"
                    }`}
                  >
                    {isSubmittingReview ? (
                      <>
                        <div className="cursor-not-allowed">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting...</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit Review</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Existing Reviews - Updated display */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-6 h-6 text-amber-500" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Course Reviews
                    </h3>
                  </div>
                  {courseReviews?.data?.length > 0 && (
                    <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                      {courseReviews.data.length} Review
                      {courseReviews.data.length > 1 ? "s" : ""}
                    </div>
                  )}
                </div>

                {reviewsLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="animate-spin w-8 h-8 text-amber-500 mr-3" />
                    <span className="text-gray-600">Loading reviews...</span>
                  </div>
                ) : !courseReviews?.data?.length ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                      No Reviews Yet
                    </h3>
                    <p className="text-gray-600">
                      Be the first to review this course!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {courseReviews.data.map((review) => (
                      <div
                        key={review.courseReviewId}
                        className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img
                                src={
                                  review.avatarUrl ||
                                  "https://www.svgrepo.com/show/452030/avatar-default.svg"
                                }
                                alt={review.fullName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {review.fullName}
                                {review.userId === user?.id && (
                                  <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                                    You
                                  </span>
                                )}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {formatReviewDate(review.createdAt)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {getStarDisplay(review.rating)}
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {review.feedback}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
