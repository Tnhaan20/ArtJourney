import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  AlertCircle,
  Check,
  X,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TailwindStyle } from "@/utils/Enum";
import { toast } from "@/utils/Toast";
import { useQuiz } from "@/hooks/Quiz/use-quiz";
import { useSubmitQuizForm } from "@/hooks/Quiz/use-quiz-form"; // Import the submit quiz hook
import useQuizStore from "@/domains/store/use-quiz-store";

// Helper function to convert time format (HH:MM:SS) to seconds - moved outside component
const parseTimeToSeconds = (timeString) => {
  if (!timeString) return 600; // Default 10 minutes

  const parts = timeString.split(":");
  if (parts.length === 3) {
    // HH:MM:SS format
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    const seconds = parseInt(parts[2], 10) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  } else if (parts.length === 2) {
    // MM:SS format
    const minutes = parseInt(parts[0], 10) || 0;
    const seconds = parseInt(parts[1], 10) || 0;
    return minutes * 60 + seconds;
  }

  return 600; // Default fallback
};

// Helper function to format date in dd/MM/yyyy format
const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

// Helper function to format date and time in dd/MM/yyyy HH:mm format
const formatDateTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export default function Quiz() {
  const { courseId, moduleId, subModuleId, learningContentId } = useParams();
  const navigate = useNavigate();

  // Use Zustand store
  const {
    quizAttemptId,
    attemptData,
    timeLimit,
    selectedAnswers,
    currentQuestionIndex,
    isQuizComplete,
    updateSelectedAnswer,
    setCurrentQuestionIndex,
    setIsQuizComplete,
    updateAttemptData,
    resetQuizState,
    clearQuizAttempt,
    getAttemptSummary,
  } = useQuizStore();

  // Use the submit quiz form hook
  const {
    submitQuiz,
    formatAnswersForSubmission,
    isLoading: isSubmitting,
  } = useSubmitQuizForm();

  // Convert time limit to seconds
  const initialTimeInSeconds = timeLimit ? parseTimeToSeconds(timeLimit) : 600;

  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);

  // Use the real API hook
  const { getQuizByLearningContent } = useQuiz();
  const {
    data: quizResponse,
    isLoading,
    error,
  } = getQuizByLearningContent(learningContentId, 1, 10);

  // Log quiz attempt information
  useEffect(() => {
    if (quizAttemptId && attemptData) {
      console.log("Quiz Attempt Details:", {
        attemptId: quizAttemptId,
        startedAt: attemptData.startedAt,
        learningContentId: attemptData.learningContentId,
        userId: attemptData.userId,
        totalPossibleScore: attemptData.totalPossibleScore,
        isCompleted: attemptData.isCompleted,
        timeLimit: timeLimit,
      });
    } else {
      console.warn("No quiz attempt data found in Zustand store");
    }
  }, [quizAttemptId, attemptData, timeLimit]);

  // Transform API data to match component expectations
  const quizData = React.useMemo(() => {
    if (!quizResponse?.data?.items) return null;

    const questions = quizResponse.data.items.map((item) => ({
      id: item.questionId,
      question: item.questionText,
      type: item.questionType,
      points: item.points,
      orderIndex: item.orderIndex,
      options: item.questionOptions
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .map((option) => ({
          id: option.questionOptionId,
          text: option.optionText,
          orderIndex: option.orderIndex,
        })),
      // For now, we'll set the first option as correct since API doesn't return correct answers
      // In a real quiz, this would come from a separate API call during quiz creation
      correctAnswer: item.questionOptions[0]?.questionOptionId,
      explanation: `This is the explanation for question: ${item.questionText}`,
    }));

    return {
      title: `Quiz Assessment`,
      description: "Test your knowledge and understanding.",
      timeLimit: initialTimeInSeconds,
      passingScore: 70,
      questions: questions.sort((a, b) => a.orderIndex - b.orderIndex),
      totalQuestions: quizResponse.data.totalCount,
      attemptId: quizAttemptId,
      attemptData: attemptData,
      totalPossibleScore: attemptData?.totalPossibleScore || questions.length,
    };
  }, [
    quizResponse,
    learningContentId,
    initialTimeInSeconds,
    quizAttemptId,
    attemptData,
  ]);

  // Timer countdown logic
  useEffect(() => {
    if (isLoading || isQuizComplete || !quizData) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleQuizComplete();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoading, isQuizComplete, quizData]);

  const handleAnswerSelect = (answerId) => {
    // Update Zustand store with the selected answer
    updateSelectedAnswer(currentQuestionIndex, answerId);

    // Log the answer selection for debugging
    console.log("Answer selected:", {
      attemptId: quizAttemptId,
      questionId: quizData.questions[currentQuestionIndex].id,
      questionIndex: currentQuestionIndex,
      selectedOptionId: answerId,
      questionText: quizData.questions[currentQuestionIndex].question,
    });

    // Optional: Auto-save answer to backend here if needed
    // You can implement real-time saving by calling the submit API for individual answers
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleQuizComplete = async () => {
    setIsQuizComplete(true);

    // Calculate final score
    let correctAnswers = 0;
    quizData.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    // Update attempt data in store
    updateAttemptData({
      totalScore: correctAnswers,
      isCompleted: true,
      completedAt: new Date().toISOString(),
      timeTaken: quizData.timeLimit - timeLeft,
    });

    // Format answers for API submission
    const userAnswers = formatAnswersForSubmission(
      selectedAnswers,
      quizAttemptId,
      quizData.questions
    );

    console.log("Quiz completion data:", {
      learningContentId: parseInt(learningContentId),
      quizAttemptId: quizAttemptId,
      userAnswers: userAnswers,
      finalScore: correctAnswers,
      totalPossible: quizData.questions.length,
      timeTaken: quizData.timeLimit - timeLeft,
    });

    // Submit quiz results to backend
    if (quizAttemptId && userAnswers.length > 0) {
      try {
        const result = await submitQuiz(
          parseInt(learningContentId),
          quizAttemptId,
          userAnswers
        );

        if (result.success) {
          console.log("✅ Quiz submitted successfully:", result.data);

          toast({
            title: "Quiz Completed!",
            description: `Your quiz has been submitted successfully.`,
            variant: "success",
          });

          // Auto-redirect after successful submission (optional)
          setTimeout(() => {
            handleBackToModule();
          }, 3000); // Redirect after 3 seconds
        } else {
          console.error("❌ Quiz submission failed:", result.error);

          toast({
            title: "Submission Failed",
            description:
              result.error?.message ||
              "Failed to submit quiz. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("❌ Error during quiz submission:", error);

        toast({
          title: "Submission Error",
          description:
            "An unexpected error occurred while submitting the quiz.",
          variant: "destructive",
        });
      }
    } else {
      console.warn("No answers to submit or missing attempt ID");

      toast({
        title: "No Answers",
        description: "No answers found to submit.",
        variant: "destructive",
      });
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quizData.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  const calculatePercentage = (score, total) => {
    return (score / total) * 100;
  };

  const handleBackToModule = () => {
    // Clear quiz attempt data when leaving
    clearQuizAttempt();
    navigate(
      `/learn/course/${courseId}/module/${moduleId}/submodule/${subModuleId}`
    );
  };

  const canProceedToNext = () => {
    return selectedAnswers[currentQuestionIndex] !== undefined;
  };

  const isQuizCompleteCheck = () => {
    return quizData?.questions.every(
      (_, index) => selectedAnswers[index] !== undefined
    );
  };

  // Check if quiz attempt ID is missing
  if (!quizAttemptId && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Invalid Quiz Session
            </h2>
            <p className="text-gray-600 mb-4">
              No valid quiz attempt found. Please start the quiz again.
            </p>
            <Button
              onClick={handleBackToModule}
              className="bg-primary-yellow hover:bg-amber-600 text-white"
            >
              Back to Module
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary-yellow mb-4" />
            <p className="text-gray-600">Loading quiz questions...</p>
            {quizAttemptId && (
              <p className="text-sm text-gray-500 mt-2">
                Attempt ID: {quizAttemptId}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Failed to Load Quiz
            </h2>
            <p className="text-gray-600 mb-4">
              {error.message ||
                "There was an error loading the quiz questions."}
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-primary-yellow hover:bg-amber-600 text-white"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // No questions found
  if (!quizData || quizData.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center text-center">
            <HelpCircle className="h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No Quiz Questions Found
            </h2>
            <p className="text-gray-600 mb-4">
              This learning content doesn't have any quiz questions yet.
            </p>
            <Button
              onClick={handleBackToModule}
              className="bg-primary-yellow hover:bg-amber-600 text-white"
            >
              Back to Module
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        {!isQuizComplete ? (
          <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Quiz Header */}
            <div className="bg-amber-50 p-6 border-b border-amber-100">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handleBackToModule}
                  className="flex items-center text-primary-yellow hover:text-amber-600"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  <span>Back to Module</span>
                </button>
                <div className="flex items-center text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                  <Clock size={16} className="mr-2" />
                  <span className="font-medium">{formatTime(timeLeft)}</span>
                </div>
              </div>
              <h1 className="text-xl font-bold text-gray-800">
                {quizData.title}
              </h1>
              <p className="text-gray-600 mt-1">{quizData.description}</p>
              {quizAttemptId && (
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                  <p>Attempt ID: {quizAttemptId}</p>
                  {attemptData?.startedAt && (
                    <p>Started: {formatDateTime(attemptData.startedAt)}</p>
                  )}
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="p-4 bg-white border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of{" "}
                  {quizData.questions.length}
                </span>
                <span className="text-sm text-gray-600">
                  {Object.keys(selectedAnswers).length} of{" "}
                  {quizData.questions.length} answered
                </span>
              </div>
              <Progress
                value={
                  ((currentQuestionIndex + 1) / quizData.questions.length) * 100
                }
                className="h-2 bg-gray-200"
              >
                <div
                  className="h-full bg-primary-yellow rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) / quizData.questions.length) *
                      100
                    }%`,
                  }}
                ></div>
              </Progress>
            </div>

            {/* Question Content */}
            <div className="p-6">
              <div className="mb-2">
                <span className="text-sm text-gray-500">
                  {quizData.questions[currentQuestionIndex].type} •{" "}
                  {quizData.questions[currentQuestionIndex].points} point(s)
                </span>
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                {quizData.questions[currentQuestionIndex].question}
              </h2>

              {/* Answer Options */}
              <div className="space-y-3 mb-8">
                {quizData.questions[currentQuestionIndex].options.map(
                  (option) => (
                    <div
                      key={option.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedAnswers[currentQuestionIndex] === option.id
                          ? "bg-amber-50 border-amber-300 shadow-sm"
                          : "border-gray-200 hover:border-amber-300 hover:bg-amber-25"
                      }`}
                      onClick={() => handleAnswerSelect(option.id)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <div
                            className={`h-5 w-5 border rounded-full flex items-center justify-center transition-all duration-200 ${
                              selectedAnswers[currentQuestionIndex] ===
                              option.id
                                ? "border-primary-yellow bg-primary-yellow"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedAnswers[currentQuestionIndex] ===
                            option.id ? (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            ) : (
                              <span className="text-xs font-medium text-gray-700">
                                {String.fromCharCode(65 + option.orderIndex)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">
                            {option.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between">
                <Button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                  className="flex items-center px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Previous
                </Button>

                <div className="flex space-x-3">
                  {currentQuestionIndex < quizData.questions.length - 1 ? (
                    <Button
                      onClick={handleNextQuestion}
                      disabled={!canProceedToNext()}
                      className={`${TailwindStyle.HIGHLIGHT_FRAME} px-6 py-2 flex items-center`}
                    >
                      Next
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleQuizComplete}
                      disabled={!isQuizCompleteCheck() || isSubmitting}
                      className={`${TailwindStyle.HIGHLIGHT_FRAME} px-6 py-2`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Complete Quiz"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Quiz Results
          <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-amber-50 p-6 border-b border-amber-100">
              <h1 className="text-xl font-bold text-gray-800">Quiz Complete</h1>
              <p className="text-gray-600 mt-1">Here's how you did!</p>
              {attemptData && (
                <div className="mt-2 text-xs text-gray-500">
                  <p>
                    Attempt #{quizAttemptId} completed at{" "}
                    {formatDateTime(new Date().toISOString())}
                  </p>
                  {attemptData.startedAt && (
                    <p>Started: {formatDateTime(attemptData.startedAt)}</p>
                  )}
                </div>
              )}
            </div>

            <div className="p-8">
              <div className="mb-6 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-amber-100 mb-4">
                  <span className="text-3xl font-bold text-amber-700">
                    {calculatePercentage(
                      calculateScore(),
                      quizData.questions.length
                    ).toFixed(0)}
                    %
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {calculatePercentage(
                    calculateScore(),
                    quizData.questions.length
                  ) >= quizData.passingScore
                    ? "Congratulations!"
                    : "Almost there!"}
                </h2>
                <p className="text-gray-600">
                  {calculatePercentage(
                    calculateScore(),
                    quizData.questions.length
                  ) >= quizData.passingScore
                    ? "You passed the quiz successfully."
                    : "You didn't quite reach the passing score. Consider reviewing the material and trying again."}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700">Your Score</span>
                  <span className="font-medium text-gray-700">
                    {calculateScore()}/{quizData.questions.length} questions
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700">
                    Passing Score
                  </span>
                  <span className="font-medium text-gray-700">
                    {quizData.passingScore}%
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700">Time Spent</span>
                  <span className="font-medium text-gray-700">
                    {formatTime(quizData.timeLimit - timeLeft)}
                  </span>
                </div>
                {attemptData?.startedAt && (
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">Started</span>
                    <span className="font-medium text-gray-700">
                      {formatDateTime(attemptData.startedAt)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Completed</span>
                  <span className="font-medium text-gray-700">
                    {formatDateTime(new Date().toISOString())}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleBackToModule}
                  className={`${TailwindStyle.HIGHLIGHT_FRAME} px-6 py-2`}
                  disabled={isSubmitting}
                >
                  Return to Module
                </Button>
                {calculatePercentage(
                  calculateScore(),
                  quizData.questions.length
                ) < quizData.passingScore && (
                  <Button
                    onClick={() => {
                      // Reset quiz state in Zustand store
                      resetQuizState();
                      // Redirect back to module to start again
                      navigate(
                        `/learn/course/${courseId}/module/${moduleId}/submodule/${subModuleId}`
                      );
                    }}
                    variant="outline"
                    className="border-primary-yellow text-primary-yellow hover:bg-amber-50"
                    disabled={isSubmitting}
                  >
                    Try Again
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
