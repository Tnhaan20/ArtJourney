import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TailwindStyle } from "@/utils/Enum";
import SideBG from "@/assets/SideBGSignIn.jpg";
import confetti from 'canvas-confetti';
import Checkbox from "@/components/elements/checkbox/Checkbox";
import LazyImage from '@/components/elements/LazyImg/LazyImg';
import { useAuthStore } from "@/domains/store/use-auth-store";
import { useToast } from "@/utils/Toast";
import { useSurvey } from "@/hooks/Survey/use-survey";
import { useSurveyForm } from "@/hooks/Survey/use-survey-form";

export default function Survey() {
  const [step, setStep] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getCurrentUser, login, updateSurveyStatus } = useAuthStore();
  const { user } = getCurrentUser();

  // Use survey hooks
  const { getSurveyQuestionsQuery } = useSurvey();
  const { onSubmit: submitSurvey, isLoading: isSubmitting } = useSurveyForm();

  const {
    data: surveyData,
    isLoading: isLoadingQuestions,
    error: questionsError,
  } = getSurveyQuestionsQuery;

  const surveyQuestions = surveyData?.data || [];
  const totalQuestions = surveyQuestions.length;
  const currentQuestion = surveyQuestions[currentQuestionIndex];

  // Check if it's first time user .loginCount === 1)
  const isFirstTimeUser = user?.loginCount === 1;

  // Prevent navigation away from survey if it's first time user and not completed
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isFirstTimeUser && !user?.isSurveyed && step < 4) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    const handlePopState = (e) => {
      if (isFirstTimeUser && !user?.isSurveyed && step < 4) {
        e.preventDefault();
        window.history.pushState(null, "", window.location.pathname);
        toast({
          title: "Survey Required",
          description:
            "Please complete the survey or skip it to continue using Art Journey.",
          variant: "destructive",
        });
      }
    };

    // Add event listeners only for first time users
    if (isFirstTimeUser) {
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("popstate", handlePopState);

      // Push current state to prevent back navigation
      if (!user?.isSurveyed && step < 4) {
        window.history.pushState(null, "", window.location.pathname);
      }
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [user, step, toast, isFirstTimeUser]);

  // Handle countdown and redirect for success screen
  useEffect(() => {
    if (step === 4) {
      // Trigger confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Set up countdown timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step, navigate]);

  const handleNext = () => {
    if (step === 1) {
      // Go to first question
      setStep(2);
    } else if (step === 2 && currentQuestionIndex < totalQuestions - 1) {
      // Go to next question
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (step === 2 && currentQuestionIndex === totalQuestions - 1) {
      // Go to summary/completion step
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 3) {
      // Go back to last question
      setStep(2);
      setCurrentQuestionIndex(totalQuestions - 1);
    } else if (step === 2 && currentQuestionIndex > 0) {
      // Go to previous question
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (step === 2 && currentQuestionIndex === 0) {
      // Go back to welcome screen
      setStep(1);
    }
  };

  const handleSkip = () => {
    if (user) {
      // Mark as surveyed (skipped) and navigate to home
      updateSurveyStatus(true);
      toast({
        title: "Survey Skipped",
        description: "You can retake the survey anytime from your profile.",
        variant: "default",
      });
      navigate("/");
    }
  };

  const handleOptionSelect = (
    questionId,
    optionId,
    isMultipleChoice = false
  ) => {
    setAnswers((prev) => {
      if (isMultipleChoice) {
        // Handle multiple choice questions
        const currentAnswers = prev[questionId] || [];
        if (currentAnswers.includes(optionId)) {
          // Remove if already selected
          return {
            ...prev,
            [questionId]: currentAnswers.filter((id) => id !== optionId),
          };
        } else {
          // Add to selection
          return {
            ...prev,
            [questionId]: [...currentAnswers, optionId],
          };
        }
      } else {
        // Handle single choice questions
        return {
          ...prev,
          [questionId]: [optionId],
        };
      }
    });
  };

  const isQuestionAnswered = (questionId) => {
    const answer = answers[questionId];
    return answer && answer.length > 0;
  };

  const isCurrentQuestionAnswered = () => {
    return (
      currentQuestion && isQuestionAnswered(currentQuestion.surveyQuestionId)
    );
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    try {
      // Format answers for API submission
      const formattedAnswers = Object.entries(answers).flatMap(
        ([questionId, optionIds]) =>
          optionIds.map((optionId) => ({
            surveyQuestionId: parseInt(questionId),
            surveyOptionId: parseInt(optionId),
          }))
      );

      // Submit using the form hook
      await submitSurvey({
        answers: formattedAnswers,
      });

      // Update user state to mark survey as completed
      updateSurveyStatus(true);

      toast({
        title: "Survey Completed!",
        description:
          "Thank you for completing the survey. Welcome to Art Journey!",
        variant: "success",
      });

      // Move to success screen
      setStep(4);
    } catch (error) {
      console.error("Survey submission error:", error);

      // Check if it's a validation error
      if (error.name === "ZodError") {
        toast({
          title: "Invalid Survey Data",
          description: "Please check your answers and try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Submission Failed",
          description:
            error?.response?.data?.message ||
            "Failed to submit survey. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Check if question allows multiple answers (based on content or could be a field from API)
  const isMultipleChoice = (question) => {
    return (
      question?.surveyQuestionContent
        ?.toLowerCase()
        .includes("select all that apply") ||
      question?.surveyQuestionContent
        ?.toLowerCase()
        .includes("(select multiple)")
    );
  };

  // Progress step bar component - Progress increases when moving to next question
  const ProgressSteps = () => {
    let progress = 0;

    if (step === 1) {
      progress = 0;
    } else if (step === 2) {
      // Progress based on current question index (moving through questions)
      if (totalQuestions > 0) {
        progress = ((currentQuestionIndex + 1) / totalQuestions) * 90; // 90% max for questions phase
      }
    } else if (step === 3) {
      progress = 95; // Review step
    } else if (step === 4) {
      progress = 100; // Complete
    }

    return (
      <div className="w-full mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            {step === 1
              ? "Welcome"
              : step === 2
              ? `Question ${currentQuestionIndex + 1} of ${totalQuestions}`
              : step === 3
              ? "Review Your Answers"
              : "Complete"}
          </span>
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {step === 2 && (
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Current: {currentQuestionIndex + 1}</span>
            <span>Remaining: {totalQuestions - currentQuestionIndex - 1}</span>
          </div>
        )}
      </div>
    );
  };

  // Calculate answered questions for validation
  const answeredQuestionsCount = Object.keys(answers).filter((questionId) => {
    const answer = answers[questionId];
    return answer && answer.length > 0;
  }).length;

  // Check if all questions are answered for enabling review
  const allQuestionsAnswered = answeredQuestionsCount === totalQuestions;

  // Loading state
  if (isLoadingQuestions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-yellow mx-auto mb-4"></div>
          <p className="text-gray-600">Loading survey questions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (questionsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load survey questions.</p>
          <button
            onClick={() => getSurveyQuestionsQuery.refetch()}
            className={`${TailwindStyle.HIGHLIGHT_FRAME} px-6 py-2 rounded-md`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Survey completion notice - only for first time users */}
      {isFirstTimeUser && !user?.isSurveyed && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-amber-100 border border-amber-400 text-amber-700 px-4 py-2 rounded-lg shadow-lg z-50">
          <p className="text-sm font-medium">
            Welcome! Please complete the survey to personalize your experience
            or skip it to continue.
          </p>
        </div>
      )}

      {/* Step 1: Welcome Screen */}
      {step === 1 && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0">
            <LazyImage
              loading="lazy"
              src={SideBG}
              alt="Art Journey Welcome"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-60"></div>
          </div>

          <div className="relative z-10 text-center p-8">
            <h1 className="text-4xl font-bold text-primary-yellow mb-8">
              WELCOME TO ART JOURNEY
            </h1>
            <p className="text-white text-lg mb-8">
              Let's personalize your art history learning experience
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleNext}
                className={`${TailwindStyle.HIGHLIGHT_FRAME} px-12 py-3 text-lg font-semibold rounded-md cursor-pointer`}
              >
                START SURVEY
              </button>
              <button
                onClick={handleSkip}
                className="px-12 py-3 text-lg font-semibold rounded-md border border-white text-white hover:bg-white hover:text-gray-800 transition-colors"
              >
                SKIP SURVEY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Dynamic Questions */}
      {step === 2 && currentQuestion && (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full mx-4">
          <ProgressSteps />

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {currentQuestion.surveyQuestionContent}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[
                currentQuestion.surveyQuestionId
              ]?.includes(option.surveyOptionId);
              const isMultiple = isMultipleChoice(currentQuestion);

              return (
                <div
                  key={option.surveyOptionId}
                  className="flex items-center p-2"
                >
                  {isMultiple ? (
                    <Checkbox
                      checked={isSelected}
                      onChange={() =>
                        handleOptionSelect(
                          currentQuestion.surveyQuestionId,
                          option.surveyOptionId,
                          true
                        )
                      }
                      color="primary-yellow"
                    >
                      <span
                        className={
                          isSelected ? "text-primary-yellow" : "text-gray-700"
                        }
                      >
                        {option.surveyOptionContent}
                      </span>
                    </Checkbox>
                  ) : (
                    <div
                      className={`w-full p-4 border rounded-lg cursor-pointer flex items-center gap-4 ${
                        isSelected
                          ? "border-primary-yellow bg-amber-100"
                          : "border-gray-300 hover:border-amber-300"
                      }`}
                      onClick={() =>
                        handleOptionSelect(
                          currentQuestion.surveyQuestionId,
                          option.surveyOptionId,
                          false
                        )
                      }
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? "border-primary-yellow"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-primary-yellow"></div>
                        )}
                      </div>
                      <span
                        className={
                          isSelected
                            ? "text-primary-yellow font-medium"
                            : "text-gray-700"
                        }
                      >
                        {option.surveyOptionContent}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between">
            <div className="flex gap-2">
              <button
                onClick={handleBack}
                className="px-8 py-2 text-base font-semibold rounded-md border border-primary-yellow text-primary-yellow hover:bg-amber-50"
              >
                BACK
              </button>
              <button
                onClick={handleSkip}
                className="px-8 py-2 text-base font-semibold rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                SKIP SURVEY
              </button>
            </div>

            <button
              onClick={handleNext}
              className={`${TailwindStyle.HIGHLIGHT_FRAME} px-8 py-2 text-base font-semibold rounded-md`}
            >
              {currentQuestionIndex === totalQuestions - 1 ? "REVIEW" : "NEXT"}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Submit */}
      {step === 3 && (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full mx-4">
          <ProgressSteps />

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Review Your Answers
          </h2>

          <div className="space-y-6 max-h-96 overflow-y-auto">
            {surveyQuestions.map((question) => {
              const selectedOptions = answers[question.surveyQuestionId] || [];
              const selectedOptionTexts = question.options
                .filter((option) =>
                  selectedOptions.includes(option.surveyOptionId)
                )
                .map((option) => option.surveyOptionContent);

              const isAnswered = selectedOptions.length > 0;

              return (
                <div
                  key={question.surveyQuestionId}
                  className={`border-b pb-4 ${
                    !isAnswered ? "bg-gray-50 p-4 rounded-lg" : ""
                  }`}
                >
                  <h3 className="font-medium text-gray-800 mb-2">
                    {question.surveyQuestionContent}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {isAnswered ? (
                      selectedOptionTexts.map((text, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                        >
                          {text}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm italic">
                        No answer selected
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between">
            <div className="flex gap-2">
              <button
                onClick={handleBack}
                className="px-8 py-2 text-base font-semibold rounded-md border border-primary-yellow text-primary-yellow hover:bg-amber-50"
              >
                BACK TO QUESTIONS
              </button>
              <button
                onClick={handleSkip}
                className="px-8 py-2 text-base font-semibold rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                SKIP SURVEY
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || answeredQuestionsCount === 0}
              className={`${
                TailwindStyle.HIGHLIGHT_FRAME
              } px-8 py-2 text-base font-semibold rounded-md ${
                isSubmitting || answeredQuestionsCount === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT SURVEY"}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Success Screen */}
      {step === 4 && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-amber-100 to-amber-200">
          <div className="bg-white rounded-xl shadow-2xl p-10 max-w-4xl w-full mx-4 text-center relative overflow-hidden">
            <ProgressSteps />

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary-yellow opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary-yellow opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>

            {/* Success icon */}
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Art Journey Begins Now!
            </h2>

            <p className="text-lg text-gray-600 mb-6">
              Thank you for completing the survey. We've personalized your
              experience based on your preferences.
            </p>

            <div className="text-center mb-6">
              <p className="text-gray-500">
                Redirecting to homepage in{" "}
                <span className="text-primary-yellow font-bold">
                  {countdown}
                </span>{" "}
                seconds...
              </p>
            </div>

            <Link
              to="/"
              className="inline-block px-8 py-3 bg-primary-yellow text-white rounded-md font-semibold hover:bg-amber-600 transition-colors"
            >
              Go to Homepage Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}