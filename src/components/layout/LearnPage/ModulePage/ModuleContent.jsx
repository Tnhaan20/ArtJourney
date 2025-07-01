import React, { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Video,
  CheckCircle,
  PenLine,
  Award,
  Loader2,
  Play,
  FileText,
  Star,
  Eye,
  Image,
  Type,
  MousePointer,
  Move3D,
  Check,
  AlertCircle,
} from "lucide-react";
import CompletedBox from "@/components/elements/completedbox/Completed";
import { TailwindStyle } from "@/utils/Enum";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useLearning } from "@/hooks/LearningContent/use-learning";
import { useCourse } from "@/hooks/Courses/use-course";
import { useMarkAsComplete } from "@/hooks/LearningContent/use-learning-form";
import { useStartQuiz } from "@/hooks/Quiz/use-quiz-form";
import { useAuthStore } from "@/domains/store/use-auth-store";
import useQuizStore from "@/domains/store/use-quiz-store"; // Import the quiz store
import { toast } from "@/utils/Toast";

export default function SubModuleContent() {
  const [activeSection, setActiveSection] = useState(0);
  const [isStartingQuiz, setIsStartingQuiz] = useState(false);
  const navigate = useNavigate();
  const { courseId, moduleId, subModuleId } = useParams();

  const { getLearningContent, getLearningItem } = useLearning();
  const { getCoursesById } = useCourse();
  const { markAsComplete, isLoading: isMarkingComplete } = useMarkAsComplete();
  const { startQuiz } = useStartQuiz();
  const { user } = useAuthStore();

  // Use the Zustand quiz store
  const { setQuizAttempt, setTimeLimit, setLearningContentId, resetQuizState } =
    useQuizStore();

  // Fetch learning content for this specific submodule
  const {
    data: learningContentData,
    isLoading: isContentLoading,
    error: contentError,
  } = getLearningContent(subModuleId);

  // Fetch course data to get module and submodule info
  const {
    data: courseData,
    isLoading: isCourseLoading,
    error: courseError,
  } = getCoursesById(courseId);

  // Get learning contents from the API response
  const learningContents = learningContentData?.data || [];

  // Get the current active learning content ID
  const activeLearningContentId =
    learningContents[activeSection]?.learningContentId;

  // Fetch detailed content for the currently selected learning item
  const {
    data: learningItemData,
    isLoading: isItemLoading,
    error: itemError,
  } = getLearningItem(activeLearningContentId);

  const handleMarkComplete = async (learningContentId) => {
    const result = await markAsComplete(learningContentId);

    if (result.success) {
      // Show success message or update UI
      console.log("Successfully marked as complete!");
      // You might want to refetch the course data to update completion status
    } else {
      // Show error message
      console.error("Failed to mark as complete:", result.error);
    }
  };

  const handleStartQuizAttempt = async (learningContentId) => {
    if (!user?.id) {
      toast({
        title: "Authentication required",
        description: "Please log in to start the quiz.",
        variant: "destructive",
      });
      return;
    }

    setIsStartingQuiz(true);

    try {
      const result = await startQuiz(learningContentId, user.id);

      if (result.success) {
        // Get the time limit from activeContent
        const timeLimit = activeContent.timeLimit || "00:10:00"; // Default 10 minutes

        // Extract the attempt data from the API response structure
        const attemptData = result.data?.data; // The actual attempt data is nested under 'data'

        // Create quiz attempt data following the API response structure
        const quizAttemptData = {
          // Primary attempt ID (this is what we need for the quiz)
          id: attemptData?.id, // This is the attemptId (137 in your example)
          quizAttemptId: attemptData?.id, // Same as id, for consistency

          // API response fields
          startedAt: attemptData?.startedAt,
          completedAt: attemptData?.completedAt,
          totalScore: attemptData?.totalScore,
          totalPossibleScore: attemptData?.totalPossibleScore,
          isCompleted: attemptData?.isCompleted,
          timeTaken: attemptData?.timeTaken,
          learningContentId:
            attemptData?.learningContentId || learningContentId,
          userId: attemptData?.userId || user.id,
          userAnswers: attemptData?.userAnswers || [],

          // Additional fields for our quiz functionality
          timeLimit: timeLimit,

          // Include the full API response for reference
          apiResponse: result.data,
        };

        // Save to Zustand store
        setQuizAttempt(quizAttemptData);
        setTimeLimit(timeLimit);
        setLearningContentId(learningContentId);

        // Log the attempt data for debugging
        console.log("Quiz Attempt Created:", {
          attemptId: attemptData?.id,
          learningContentId: learningContentId,
          timeLimit: timeLimit,
          fullData: quizAttemptData,
        });

     

        // Navigate to the quiz page
        navigate(
          `/quiz/course/${courseId}/module/${moduleId}/submodule/${subModuleId}/content/${learningContentId}`
        );
      } else {
        toast({
          title: "Failed to start quiz",
          description:
            result.error?.message ||
            result.message ||
            "Unable to create quiz attempt. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error starting quiz:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsStartingQuiz(false);
    }
  };

  const handleStartActivity = (type, learningContentId) => {
    if (type === "quiz") {
      // Reset any previous quiz state before starting new quiz
      resetQuizState();
      handleStartQuizAttempt(learningContentId);
    } else if (type === "challenge") {
      navigate(
        `/challenge/course/${courseId}/module/${moduleId}/submodule/${subModuleId}/content/${learningContentId}`
      );
    }
  };

  const onBack = () => {
    navigate(`/learn/course/${courseId}`);
  };

  // Loading state
  // Loading state
  if (isContentLoading || isCourseLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Loader2 className="w-20 h-20 text-primary-yellow animate-spin" />
          </div>
          <p className="text-lg font-semibold text-gray-700 mt-6">
            Loading submodule content...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Please wait while we prepare your learning materials
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (contentError || courseError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center p-8 rounded-3xl shadow-2xl bg-white border border-red-100">
          <div className="text-red-500 text-6xl mb-6">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6 max-w-md">
            {contentError?.message ||
              courseError?.message ||
              "We're having trouble loading your learning content. Please try again."}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const course = courseData?.data;

  // Find current module and submodule info from course data
  const currentModule = course?.moduleCourseDetailScreenResponseDTOs?.find(
    (module) => module.moduleId === parseInt(moduleId)
  );

  const currentSubModule =
    currentModule?.subModuleCourseDetailScreenResponseDTOs?.find(
      (subModule) => subModule.subModuleId === parseInt(subModuleId)
    );

  // Check if we have learning content
  if (!learningContents.length) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center p-12 rounded-3xl shadow-2xl bg-white">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen size={48} className="text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            No Learning Content Available
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            This submodule "{currentSubModule?.subModuleTitle || "Unknown"}"
            doesn't have any learning content yet. Check back soon!
          </p>
          <Button
            onClick={onBack}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Course
          </Button>
        </div>
      </div>
    );
  }

  const activeContent = learningContents[activeSection];
  const activeItemDetail = learningItemData?.data?.[0]; // Get the first item from the array

  // Helper function to get content type icon based on contentType number
  // Reading 0, Challenge 1, Quiz 2
  const getContentTypeIcon = (contentType, size = 16) => {
    switch (contentType) {
      case 0:
        return <BookOpen size={size} />; // Reading
      case 1:
        return <Award size={size} />; // Challenge
      case 2:
        return <PenLine size={size} />; // Quiz
      default:
        return <BookOpen size={size} />;
    }
  };

  // Helper function to get content type label for activities
  // Reading 0, Challenge 1, Quiz 2
  const getContentTypeLabel = (contentType) => {
    switch (contentType) {
      case 0:
        return "Reading";
      case 1:
        return "Challenge";
      case 2:
        return "Quiz";
      default:
        return "Reading";
    }
  };

  // Helper function to get content format icon based on itemTypes
  // Image 0, Video 1, Text 2, Input 3, Draggable 4
  const getContentFormatIcon = (itemTypes, size = 16) => {
    switch (itemTypes) {
      case 0:
        return <Image size={size} />; // Image
      case 1:
        return <Video size={size} />; // Video
      case 2:
        return <Type size={size} />; // Text
      case 3:
        return <MousePointer size={size} />; // Input
      case 4:
        return <Move3D size={size} />; // Draggable
      default:
        return <Type size={size} />;
    }
  };

  // Helper function to get content format label based on itemTypes
  // Image 0, Video 1, Text 2, Input 3, Draggable 4
  const getContentFormatLabel = (itemTypes) => {
    switch (itemTypes) {
      case 0:
        return "Image";
      case 1:
        return "Video";
      case 2:
        return "Text";
      case 3:
        return "Input";
      case 4:
        return "Draggable";
      default:
        return "Text";
    }
  };

  // Helper function to get content type color
  const getContentTypeColor = (contentType) => {
    switch (contentType) {
      case 0:
        return "from-green-500 to-green-600"; // Reading
      case 1:
        return "from-purple-500 to-purple-600"; // Challenge
      case 2:
        return "from-blue-500 to-blue-600"; // Quiz
      default:
        return "from-green-500 to-green-600";
    }
  };

  // Helper function to determine if content is completed
  const isCompleted = (learningContentId) => {
    // Check from course data if available
    const contentFromCourse =
      currentSubModule?.learningContentDetailScreenResponseDTOs?.find(
        (content) => content.learningContentId === learningContentId
      );
    return contentFromCourse?.userLearningProgressStatus === 2;
  };

  const completedCount = learningContents.filter((content) =>
    isCompleted(content.learningContentId)
  ).length;

  const progressPercentage =
    learningContents.length > 0
      ? (completedCount / learningContents.length) * 100
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Enhanced Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex py-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-3">
              <li>
                <button
                  onClick={() => navigate("/learn")}
                  className="text-primary-yellow hover:text-secondary-yellow font-semibold transition-all duration-200 hover:scale-105"
                >
                  Learn
                </button>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mx-3"></div>
                <button
                  onClick={() => navigate(`/learn/course/${courseId}`)}
                  className="text-primary-yellow hover:text-secondary-yellow font-semibold transition-all duration-200 hover:scale-105"
                >
                  {course?.title || "Course"}
                </button>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mx-3"></div>
                <span className="text-gray-700 font-semibold">
                  {currentModule?.moduleTitle || "Module"}
                </span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mx-3"></div>
                <span className="text-gray-600 font-medium">
                  {currentSubModule?.subModuleTitle || "Submodule"}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Enhanced Sidebar - Navigation */}
          <div className="lg:w-1/3 border-r border-amber-100">
            {/* Enhanced Submodule Header */}
            <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-8 border-b border-amber-200">
              <button
                onClick={onBack}
                className="flex items-center text-primary-yellow hover:text-secondary-yellow mb-6 transition-all duration-200 hover:scale-105 group"
              >
                <div className="p-2 bg-white rounded-xl shadow-md group-hover:shadow-lg transition-all duration-200 mr-3">
                  <ArrowLeft size={18} />
                </div>
                <span className="font-semibold">Back to Course</span>
              </button>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
                  {currentSubModule?.subModuleTitle || "Submodule"}
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  {currentModule?.moduleTitle || "Module"}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-700">
                  <div className="p-2 bg-primary-yellow/20 rounded-lg mr-3">
                    <BookOpen size={16} className="text-primary-yellow" />
                  </div>
                  <span className="font-medium">
                    {learningContents.length} Activities
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1">Progress</div>
                  <div className="text-sm font-bold text-gray-700">
                    {completedCount}/{learningContents.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Progress Overview */}
            <div className="p-6 border-b border-amber-100 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">
                  Overall Progress
                </span>
                <span className="text-sm font-bold text-green-600">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 h-3 rounded-full transition-all duration-500 ease-out relative"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                {completedCount === learningContents.length
                  ? "🎉 Congratulations! All activities completed!"
                  : `${
                      learningContents.length - completedCount
                    } activities remaining`}
              </div>
            </div>

            {/* Enhanced Content Navigation */}
            <div className="p-4">
              <h3 className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">
                Learning Activities
              </h3>
              <nav className="mt-2 space-y-2">
                {learningContents
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((content, index) => (
                    <button
                      key={content.learningContentId}
                      onClick={() => setActiveSection(index)}
                      className={`w-full text-left p-4 flex items-center rounded-2xl mx-2 transition-all duration-300 group ${
                        activeSection === index
                          ? "bg-gradient-to-r from-primary-yellow to-secondary-yellow text-white shadow-lg transform scale-[1.02]"
                          : "text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 hover:shadow-md"
                      }`}
                    >
                      <div className="mr-4">
                        <CompletedBox
                          isCompleted={isCompleted(content.learningContentId)}
                          size={20}
                        />
                      </div>
                      <div
                        className={`mr-4 p-2 rounded-xl ${
                          activeSection === index
                            ? "bg-white/20"
                            : "bg-primary-yellow/10 group-hover:bg-primary-yellow/20"
                        } transition-all duration-200`}
                      >
                        <div
                          className={
                            activeSection === index
                              ? "text-white"
                              : "text-primary-yellow"
                          }
                        >
                          {getContentTypeIcon(content.contentType, 18)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold truncate block mb-1">
                          {content.title}
                        </span>
                        <div className="flex items-center">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              activeSection === index
                                ? "bg-white/20 text-white"
                                : "bg-gray-100 text-gray-600 group-hover:bg-primary-yellow/20 group-hover:text-primary-yellow"
                            } transition-all duration-200`}
                          >
                            {getContentTypeLabel(content.contentType)}
                          </span>
                        </div>
                      </div>
                      {activeSection === index && (
                        <div className="ml-2">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            {activeContent ? (
              <>
                {/* Enhanced Content Header */}
                <div className="bg-gradient-to-r from-white to-gray-50 p-8 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div
                        className={`mr-6 p-4 bg-gradient-to-r ${getContentTypeColor(
                          activeContent.contentType
                        )} rounded-2xl shadow-lg`}
                      >
                        <div className="text-white">
                          {getContentTypeIcon(activeContent.contentType, 24)}
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2 leading-tight">
                          {activeContent.title}
                        </h2>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <span className="bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 rounded-full font-medium">
                            {getContentTypeLabel(activeContent.contentType)}
                          </span>
                          {/* Show content format if available from itemTypes */}
                          {activeItemDetail?.itemTypes !== undefined && (
                            <span className="bg-gradient-to-r from-blue-100 to-blue-200 px-3 py-1 rounded-full font-medium flex items-center">
                              <div className="mr-1">
                                {getContentFormatIcon(
                                  activeItemDetail.itemTypes,
                                  14
                                )}
                              </div>
                              {getContentFormatLabel(
                                activeItemDetail.itemTypes
                              )}
                            </span>
                          )}
                          <div className="flex items-center">
                            <Clock size={16} className="mr-2 text-gray-500" />
                            <span className="font-medium">
                              {activeContent.timeLimit || "30:00"}
                            </span>
                          </div>
                          {activeContent.likesCount > 0 && (
                            <div className="flex items-center">
                              <Star
                                size={16}
                                className="mr-2 text-yellow-500"
                              />
                              <span className="font-medium">
                                {activeContent.likesCount} likes
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">Activity</div>
                      <div className="text-lg font-bold text-gray-700">
                        {activeSection + 1} of {learningContents.length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Loading state for learning item details */}
                {isItemLoading && (
                  <div className="p-12 text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 border-4 border-primary-yellow/20 rounded-full mx-auto"></div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 border-4 border-primary-yellow border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Loading content details...
                    </h3>
                    <p className="text-gray-500">
                      Preparing your learning materials
                    </p>
                  </div>
                )}

                {/* Enhanced Error state for learning item */}
                {itemError && (
                  <div className="p-12 text-center">
                    <div className="text-red-500 text-5xl mb-6">😕</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Content Not Available
                    </h3>
                    <p className="text-red-600 mb-6 max-w-md mx-auto">
                      Error loading content details: {itemError.message}
                    </p>
                  </div>
                )}

                {/* Enhanced Content Section */}
                {!isItemLoading && !itemError && (
                  <div className="p-8">
                    {/* Only show content if itemContent exists and is not null */}
                    {activeItemDetail?.itemContent && (
                      <>
                        {/* Enhanced Video Content */}
                        {activeItemDetail?.itemTypes === 1 && (
                          <div className="mb-10">
                            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-200">
                              <video
                                controls
                                className="w-full h-full object-cover"
                                src={activeItemDetail.itemContent}
                              >
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          </div>
                        )}

                        {/* Enhanced Image Content */}
                        {activeItemDetail?.itemTypes === 0 && (
                          <div className="mb-10">
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-200">
                              <img
                                className="w-full h-auto object-cover"
                                src={activeItemDetail.itemContent}
                                alt={activeContent.title}
                              />
                            </div>
                          </div>
                        )}

                        {/* Text/Reading Content */}
                        {(activeItemDetail?.itemTypes === 2 ||
                          activeItemDetail?.itemTypes === undefined) && (
                          <div className="mb-10">
                            <div className="prose prose-lg max-w-none text-gray-800">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: activeItemDetail.itemContent,
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Input Content */}
                        {activeItemDetail?.itemTypes === 3 && (
                          <div className="mb-10">
                            <div className="prose prose-lg max-w-none text-gray-800">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: activeItemDetail.itemContent,
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Draggable Content */}
                        {activeItemDetail?.itemTypes === 4 && (
                          <div className="mb-10">
                            <div className="prose prose-lg max-w-none text-gray-800">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: activeItemDetail.itemContent,
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Mark as Complete Button - Only show for reading content with actual content */}
                        {activeContent.contentType === 0 &&
                          activeItemDetail?.itemContent && (
                            <div className="flex justify-end mb-10">
                              {!isCompleted(activeContent.learningContentId) ? (
                                <Button
                                  onClick={() =>
                                    handleMarkComplete(
                                      activeContent.learningContentId
                                    )
                                  }
                                  disabled={isMarkingComplete}
                                  className={`${TailwindStyle.HIGHLIGHT_FRAME} px-8 py-3 flex items-center`}
                                >
                                  {isMarkingComplete ? (
                                    <Loader2
                                      size={20}
                                      className="mr-3 animate-spin"
                                    />
                                  ) : (
                                    <Check size={20} className="mr-3" />
                                  )}
                                  {isMarkingComplete
                                    ? "Marking..."
                                    : "Mark as Complete"}
                                </Button>
                              ) : (
                                <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 px-8 py-3 rounded-xl flex items-center shadow-lg">
                                  <CheckCircle size={20} className="mr-3" />
                                  Completed ✓
                                </div>
                              )}
                            </div>
                          )}

                        {/* Enhanced Hint section - only if hint exists */}
                        {activeItemDetail?.hint && (
                          <div className="mb-10">
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100 shadow-lg">
                              <div className="flex items-center mb-6">
                                <div className="p-3 bg-purple-500 rounded-xl mr-4">
                                  <Eye size={24} className="text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-purple-900">
                                  Hint
                                </h4>
                              </div>
                              <div className="text-purple-800 prose max-w-none">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: activeItemDetail.hint,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Enhanced Additional Data section - only if additionalData exists */}
                        {activeItemDetail?.additionalData && (
                          <div className="mb-10">
                            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 border border-indigo-100 shadow-lg">
                              <div className="flex items-center mb-6">
                                <div className="p-3 bg-indigo-500 rounded-xl mr-4">
                                  <FileText size={24} className="text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-indigo-900">
                                  Additional Information
                                </h4>
                              </div>
                              <div className="text-indigo-800 prose max-w-none">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: activeItemDetail.additionalData,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Special handling for Quiz and Challenge content types - Show buttons even if content is null */}
                    {activeContent.contentType === 2 ? (
                      // Enhanced Quiz Content Section
                      <div className="mb-10">
                        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-3xl p-8 border border-amber-200 shadow-xl">
                          <div className="flex items-center mb-8">
                            <div className="p-4 bg-gradient-to-r from-primary-yellow to-secondary-yellow rounded-2xl mr-6 shadow-lg">
                              <PenLine size={32} className="text-white" />
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold text-gray-800 mb-3">
                                Interactive Quiz Assessment
                              </h3>
                              <p className="text-gray-700 text-lg font-medium">
                                Test your knowledge and understanding with this
                                comprehensive quiz
                              </p>
                            </div>
                          </div>

                          {/* Enhanced Quiz Info Cards */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-amber-100 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                              <div className="p-3 bg-gradient-to-r from-primary-yellow to-secondary-yellow rounded-xl w-fit mx-auto mb-3">
                                <Clock size={24} className="text-white" />
                              </div>
                              <div className="text-2xl font-bold text-gray-800 mb-1">
                                {activeContent.timeLimit || "30:00"}
                              </div>
                              <div className="text-sm text-gray-600 font-semibold">
                                Time Limit
                              </div>
                            </div>

                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-amber-100 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                              <div className="p-3 bg-gradient-to-r from-primary-yellow to-secondary-yellow rounded-xl w-fit mx-auto mb-3">
                                <PenLine size={24} className="text-white" />
                              </div>
                              <div className="text-2xl font-bold text-gray-800 mb-1">
                                Multiple
                              </div>
                              <div className="text-sm text-gray-600 font-semibold">
                                Question Types
                              </div>
                            </div>

                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-amber-100 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                              <div className="p-3 bg-gradient-to-r from-primary-yellow to-secondary-yellow rounded-xl w-fit mx-auto mb-3">
                                <CheckCircle size={24} className="text-white" />
                              </div>
                              <div className="text-2xl font-bold text-gray-800 mb-1">
                                Instant
                              </div>
                              <div className="text-sm text-gray-600 font-semibold">
                                Feedback
                              </div>
                            </div>
                          </div>

                          {/* Enhanced Start Quiz Section */}
                          <div className="bg-gradient-to-r from-white to-amber-50 rounded-2xl p-8 border border-amber-200 shadow-inner">
                            <div className="text-center">
                              <div className="mb-6">
                                <h4 className="text-xl font-bold text-gray-800 mb-2">
                                  Ready to Begin?
                                </h4>
                                <p className="text-gray-600">
                                  Take your time and read each question
                                  carefully. You can navigate between questions
                                  freely.
                                </p>
                              </div>

                              <Button
                                onClick={() =>
                                  handleStartActivity(
                                    "quiz",
                                    activeContent.learningContentId
                                  )
                                }
                                disabled={isStartingQuiz || !user}
                                className={`${TailwindStyle.HIGHLIGHT_FRAME} px-10 py-4 text-lg font-bold shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                              >
                                {isStartingQuiz ? (
                                  <>
                                    <Loader2
                                      size={24}
                                      className="mr-3 animate-spin"
                                    />
                                    Creating Quiz Attempt...
                                  </>
                                ) : (
                                  <>
                                    <Play size={24} className="mr-3" />
                                    Start Quiz Assessment
                                  </>
                                )}
                              </Button>

                              {!user && (
                                <div className="mt-6 p-4 bg-amber-100 border border-amber-200 rounded-xl">
                                  <p className="text-amber-800 font-medium flex items-center justify-center">
                                    <AlertCircle size={18} className="mr-2" />
                                    Please log in to start the quiz assessment
                                  </p>
                                </div>
                              )}

                              {user && (
                                <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-600">
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                    <span>
                                      Navigate freely between questions
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 bg-primary-yellow rounded-full mr-2"></div>
                                    <span>Auto-save progress</span>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                    <span>Instant results</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : activeContent.contentType === 1 ? (
                      // Enhanced Challenge Content Section
                      <div className="mb-10">
                        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-3xl p-8 border border-purple-200 shadow-xl">
                          <div className="flex items-center mb-8">
                            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mr-6 shadow-lg">
                              <Award size={32} className="text-white" />
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold text-gray-800 mb-3">
                                Practical Challenge
                              </h3>
                              <p className="text-gray-700 text-lg font-medium">
                                Apply your knowledge in this hands-on challenge
                              </p>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-white to-purple-50 rounded-2xl p-8 border border-purple-200 shadow-inner">
                            <div className="text-center">
                              <Button
                                onClick={() =>
                                  handleStartActivity(
                                    "challenge",
                                    activeContent.learningContentId
                                  )
                                }
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all duration-300 transform hover:scale-105"
                              >
                                <Award size={24} className="mr-3" />
                                Begin Challenge
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // For reading content (contentType 0) - only show "content being prepared" if no itemContent
                      !activeItemDetail?.itemContent && (
                        <div className="mb-10">
                          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200 text-center shadow-lg">
                            <div className="p-4 bg-gray-300 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                              <FileText size={32} className="text-gray-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                              Content is being prepared
                            </h3>
                            <p className="text-gray-600">
                              This content is being prepared and will be
                              available soon. Stay tuned!
                            </p>
                          </div>
                        </div>
                      )
                    )}

                    {/* Navigation buttons - Only show for reading content (contentType 0) */}
                    {activeContent.contentType === 0 && (
                      <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                        {/* Empty div for spacing - no mark as complete button here since it's handled above */}
                        <div></div>

                        {/* Navigation buttons */}
                        <div className="flex space-x-3">
                          <Button
                            onClick={() =>
                              setActiveSection(Math.max(0, activeSection - 1))
                            }
                            disabled={activeSection === 0}
                            variant="outline"
                            className="px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                          >
                            ← Previous
                          </Button>
                          <Button
                            onClick={() =>
                              setActiveSection(
                                Math.min(
                                  learningContents.length - 1,
                                  activeSection + 1
                                )
                              )
                            }
                            disabled={
                              activeSection === learningContents.length - 1
                            }
                            variant="outline"
                            className="px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                          >
                            Next →
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">
                  No learning content selected
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
