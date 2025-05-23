import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  AlertCircle,
  Check,
  X,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TailwindStyle } from "@/utils/Enum";
import { toast } from "@/utils/Toast";

export default function Quiz() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock quiz data based on courseId and moduleId
  useEffect(() => {
    // In a real application, this would be an API call
    const fetchQuizData = () => {
      setLoading(true);
      console.log(
        `Fetching quiz data for course: ${courseId}, module: ${moduleId}`
      );

      // Simulating API delay
      setTimeout(() => {
        // Mock data structure based on course and module
        const quizDataMap = {
          // Course 1 (Art History)
          1: {
            // Module 1 (Early Christian Art)
            1: {
              title: "Early Christian Art Quiz",
              description:
                "Test your knowledge about Early Christian Art and its characteristics.",
              timeLimit: 600, // 10 minutes in seconds
              passingScore: 80,
              questions: [
                {
                  id: 1,
                  question:
                    "Which of the following was a common symbol in Early Christian Art?",
                  options: [
                    { id: "a", text: "Fish (Ichthys)" },
                    { id: "b", text: "Eagle" },
                    { id: "c", text: "Lion" },
                    { id: "d", text: "Dragon" },
                  ],
                  correctAnswer: "a",
                  explanation:
                    "The fish (Ichthys) was one of the most important symbols in Early Christian art, representing Christ through the Greek acronym for 'Jesus Christ, Son of God, Savior'.",
                },
                {
                  id: 2,
                  question:
                    "Where can most surviving examples of early Christian art be found?",
                  options: [
                    { id: "a", text: "Constantinople" },
                    { id: "b", text: "The Catacombs of Rome" },
                    { id: "c", text: "Jerusalem" },
                    { id: "d", text: "Athens" },
                  ],
                  correctAnswer: "b",
                  explanation:
                    "The Catacombs of Rome contain most of the surviving examples of early Christian art, as these underground burial chambers were decorated with Christian symbols and scenes.",
                },
                {
                  id: 3,
                  question: "What is the oldest surviving church building?",
                  options: [
                    { id: "a", text: "The Hagia Sophia" },
                    { id: "b", text: "St. Peter's Basilica" },
                    { id: "c", text: "The Dura-Europos church" },
                    { id: "d", text: "The Church of the Holy Sepulchre" },
                  ],
                  correctAnswer: "c",
                  explanation:
                    "The Dura-Europos church in Syria is considered the oldest surviving church building, dating back to the 3rd century CE.",
                },
                {
                  id: 4,
                  question:
                    "What was a key characteristic of Early Christian art?",
                  options: [
                    { id: "a", text: "Detailed portraits of Jesus" },
                    {
                      id: "b",
                      text: "Use of symbolism rather than direct representation",
                    },
                    { id: "c", text: "Extensive use of gold leaf" },
                    { id: "d", text: "3D sculptural elements" },
                  ],
                  correctAnswer: "b",
                  explanation:
                    "Early Christian art often used symbolism rather than direct representation, partly to avoid idolatry concerns and also as a way to convey complex theological ideas.",
                },
                {
                  id: 5,
                  question: "When did Early Christian art primarily develop?",
                  options: [
                    { id: "a", text: "1st-3rd centuries CE" },
                    { id: "b", text: "2nd-6th centuries CE" },
                    { id: "c", text: "7th-10th centuries CE" },
                    { id: "d", text: "11th-13th centuries CE" },
                  ],
                  correctAnswer: "b",
                  explanation:
                    "Early Christian art developed primarily from the 2nd to the early 6th century CE, beginning in the late Roman Empire and continuing into the early Byzantine period.",
                },
              ],
            },
            // Module 2 (Byzantine Art)
            2: {
              title: "Byzantine Art Quiz",
              description:
                "Test your knowledge of Byzantine art forms and history.",
              timeLimit: 600,
              passingScore: 75,
              questions: [
                {
                  id: 1,
                  question:
                    "Which building is considered the greatest achievement of Byzantine architecture?",
                  options: [
                    { id: "a", text: "St. Peter's Basilica" },
                    { id: "b", text: "Hagia Sophia" },
                    { id: "c", text: "Notre Dame Cathedral" },
                    { id: "d", text: "Pantheon" },
                  ],
                  correctAnswer: "b",
                  explanation:
                    "The Hagia Sophia in Constantinople (modern Istanbul) is considered the greatest achievement of Byzantine architecture, known for its massive dome and innovative design.",
                },
                // More Byzantine art questions could be added here
              ],
            },
          },
          // Course 2 (Modern Art)
          2: {
            // Module data for Modern Art course
            1: {
              title: "Impressionism Quiz",
              description:
                "Test your knowledge of Impressionist painters and techniques.",
              timeLimit: 500,
              passingScore: 70,
              questions: [
                {
                  id: 1,
                  question:
                    "Which artist is considered the founder of Impressionism?",
                  options: [
                    { id: "a", text: "Vincent van Gogh" },
                    { id: "b", text: "Claude Monet" },
                    { id: "c", text: "Pablo Picasso" },
                    { id: "d", text: "Salvador Dalí" },
                  ],
                  correctAnswer: "b",
                  explanation:
                    "Claude Monet is widely considered the founder of the Impressionist movement, particularly with his painting 'Impression, Sunrise' which gave the movement its name.",
                },
                // More Impressionism questions could be added here
              ],
            },
          },
        };

        // Try to get data for the specified course and module
        if (quizDataMap[courseId] && quizDataMap[courseId][moduleId]) {
          const data = quizDataMap[courseId][moduleId];
          setQuizData(data);
          setTimeLeft(data.timeLimit); // Set timer based on quiz data
        } else {
          // Fallback to generic quiz if the specific one is not found
          console.log("Specific quiz not found, using generic quiz");
          setQuizData({
            title: `Course ${courseId} - Module ${moduleId} Quiz`,
            description: "Test your knowledge from this module.",
            timeLimit: 600,
            passingScore: 80,
            questions: [
              {
                id: 1,
                question: `Sample question for Course ${courseId}, Module ${moduleId}`,
                options: [
                  { id: "a", text: "Option A" },
                  { id: "b", text: "Option B" },
                  { id: "c", text: "Option C" },
                  { id: "d", text: "Option D" },
                ],
                correctAnswer: "a",
                explanation: "This is an explanation for the correct answer.",
              },
              // Add more generic questions as needed
            ],
          });
          setTimeLeft(600); // Default timer
        }

        setLoading(false);
      }, 1000);
    };

    fetchQuizData();
  }, [courseId, moduleId]);

  // Timer countdown logic (unchanged)
  useEffect(() => {
    if (loading || isQuizComplete) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Auto-submit the quiz when time runs out
          handleQuizComplete();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, isQuizComplete]);

  const handleAnswerSelect = (answerId) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answerId);
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Selection required",
        description: "Please select an answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsAnswerSubmitted(true);
    const currentQuestion = quizData.questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    setIsQuizComplete(true);
    // In a real app, you would submit the result to the server here
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const calculatePercentage = (score, total) => {
    return (score / total) * 100;
  };

  // Updated to navigate back to the correct course/module page
  const handleBackToModule = () => {
    navigate(`/learn/course/${courseId}/module/${moduleId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-yellow mb-4"></div>
            <p className="text-gray-600">
              Loading quiz for Course {courseId}, Module {moduleId}...
            </p>
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
              <div className="text-xs text-gray-500 mt-1">
                Course {courseId} • Module {moduleId}
              </div>
            </div>

            {/* Rest of the component remains the same */}
            {/* Progress Bar */}
            <div className="p-4 bg-white border-b border-gray-100">
              <div className="flex items-center justify-between mb-1 text-sm text-gray-600">
                <span>
                  Question {currentQuestionIndex + 1} of{" "}
                  {quizData.questions.length}
                </span>
                <span>
                  Score: {score}/
                  {currentQuestionIndex + (isAnswerSubmitted ? 1 : 0)}
                </span>
              </div>
              <Progress
                value={(currentQuestionIndex / quizData.questions.length) * 100}
                className="h-2 bg-gray-200"
              >
                <div
                  className="h-full bg-primary-yellow rounded-full"
                  style={{
                    width: `${
                      (currentQuestionIndex / quizData.questions.length) * 100
                    }%`,
                  }}
                ></div>
              </Progress>
            </div>

            {/* Question Content - unchanged */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {quizData.questions[currentQuestionIndex].question}
              </h2>

              {/* Answer Options - unchanged */}
              <div className="space-y-3">
                {quizData.questions[currentQuestionIndex].options.map(
                  (option) => (
                    <div
                      key={option.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAnswer === option.id
                          ? isAnswerSubmitted
                            ? option.id ===
                              quizData.questions[currentQuestionIndex]
                                .correctAnswer
                              ? "bg-green-50 border-green-300"
                              : "bg-red-50 border-red-300"
                            : "bg-amber-50 border-amber-300"
                          : "border-gray-200 hover:border-amber-300"
                      }`}
                      onClick={() => handleAnswerSelect(option.id)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          {isAnswerSubmitted &&
                            option.id ===
                              quizData.questions[currentQuestionIndex]
                                .correctAnswer && (
                              <Check className="h-5 w-5 text-green-600" />
                            )}
                          {isAnswerSubmitted &&
                            selectedAnswer === option.id &&
                            option.id !==
                              quizData.questions[currentQuestionIndex]
                                .correctAnswer && (
                              <X className="h-5 w-5 text-red-600" />
                            )}
                          {(!isAnswerSubmitted ||
                            (isAnswerSubmitted &&
                              option.id !==
                                quizData.questions[currentQuestionIndex]
                                  .correctAnswer &&
                              selectedAnswer !== option.id)) && (
                            <div
                              className={`h-5 w-5 border rounded-full flex items-center justify-center ${
                                selectedAnswer === option.id
                                  ? "border-primary-yellow bg-amber-50"
                                  : "border-gray-300"
                              }`}
                            >
                              <span className="text-sm font-medium text-gray-700">
                                {option.id.toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-3">
                          <p
                            className={`text-sm font-medium ${
                              isAnswerSubmitted
                                ? option.id ===
                                  quizData.questions[currentQuestionIndex]
                                    .correctAnswer
                                  ? "text-green-800"
                                  : selectedAnswer === option.id
                                  ? "text-red-800"
                                  : "text-gray-800"
                                : "text-gray-800"
                            }`}
                          >
                            {option.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Explanation - unchanged */}
              {isAnswerSubmitted && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex">
                    <HelpCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">
                        Explanation
                      </h4>
                      <p className="text-sm text-blue-700">
                        {quizData.questions[currentQuestionIndex].explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons - unchanged */}
              <div className="mt-8 flex justify-end">
                {!isAnswerSubmitted ? (
                  <Button
                    onClick={handleAnswerSubmit}
                    className={`${TailwindStyle.HIGHLIGHT_FRAME} px-6 py-2`}
                    disabled={selectedAnswer === null}
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    className={`${TailwindStyle.HIGHLIGHT_FRAME} px-6 py-2`}
                  >
                    {currentQuestionIndex < quizData.questions.length - 1
                      ? "Next Question"
                      : "Finish Quiz"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Quiz Results - update back button
          <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-amber-50 p-6 border-b border-amber-100">
              <h1 className="text-xl font-bold text-gray-800">Quiz Complete</h1>
              <p className="text-gray-600 mt-1">Here's how you did!</p>
              <div className="text-xs text-gray-500 mt-1">
                Course {courseId} • Module {moduleId}
              </div>
            </div>

            <div className="p-8">
              <div className="mb-6 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-amber-100 mb-4">
                  <span className="text-3xl font-bold text-amber-700">
                    {calculatePercentage(
                      score,
                      quizData.questions.length
                    ).toFixed(0)}
                    %
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {calculatePercentage(score, quizData.questions.length) >=
                  quizData.passingScore
                    ? "Congratulations!"
                    : "Almost there!"}
                </h2>
                <p className="text-gray-600">
                  {calculatePercentage(score, quizData.questions.length) >=
                  quizData.passingScore
                    ? "You passed the quiz successfully."
                    : "You didn't quite reach the passing score. Consider reviewing the material and trying again."}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700">Your Score</span>
                  <span className="font-medium text-gray-700">
                    {score}/{quizData.questions.length} questions
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
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Time Spent</span>
                  <span className="font-medium text-gray-700">
                    {formatTime(quizData.timeLimit - timeLeft)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleBackToModule}
                  className={`${TailwindStyle.HIGHLIGHT_FRAME} px-6 py-2`}
                >
                  Return to Module
                </Button>
                {calculatePercentage(score, quizData.questions.length) <
                  quizData.passingScore && (
                  <Button
                    onClick={() => {
                      // Reset quiz state
                      setCurrentQuestionIndex(0);
                      setSelectedAnswer(null);
                      setIsAnswerSubmitted(false);
                      setScore(0);
                      setTimeLeft(quizData.timeLimit);
                      setIsQuizComplete(false);
                    }}
                    variant="outline"
                    className="border-primary-yellow text-primary-yellow hover:bg-amber-50"
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
