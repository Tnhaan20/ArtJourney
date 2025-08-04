import React from "react";
import { useParams } from "react-router-dom";
import { useGamification } from "@/hooks/Gamification/use-gamification";
import { Loader2, AlertCircle } from "lucide-react";
import DragDropGame from "@/components/layout/Gamification/DragDropGame";

export default function ChallengePage() {
  const { courseId, challengeId } = useParams();
  const { getChallengeById, getChallengeByCourse } = useGamification();

  // Get challenge data by ID (for game data)
  const {
    data: challengeData,
    isLoading: challengeLoading,
    error: challengeError,
  } = getChallengeById(challengeId);

  // Get challenges by course (to get challenge type)
  const {
    data: challengeCourseData,
    isLoading: courseLoading,
    error: courseError,
  } = getChallengeByCourse(courseId);

  // Find the specific challenge from course challenges list
  const currentChallenge = challengeCourseData?.data?.find(
    (challenge) => challenge.id === parseInt(challengeId)
  );

  const challengeType = currentChallenge?.challengeType;

  // Loading state - wait for both API calls
  if (challengeLoading || courseLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <Loader2 className="animate-spin w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Loading Challenge
          </h3>
          <p className="text-gray-600">Preparing your game...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (challengeError || courseError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Challenge Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {challengeError?.message ||
              courseError?.message ||
              "Unable to load challenge"}
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Challenge not found in course
  if (!currentChallenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Challenge Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            This challenge is not associated with the specified course.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Game data not available yet
  if (!challengeData?.data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Game Data Not Available
          </h2>
          <p className="text-gray-600 mb-6">
            Challenge game data is not available yet.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Route to appropriate component based on challenge type - NO READY STATE
  const renderChallengeComponent = () => {
    switch (challengeType) {
      case "Drag&Drop":
        return (
          <DragDropGame
            courseId={courseId}
            challengeId={challengeId}
            challengeData={challengeData.data}
            challengeInfo={currentChallenge}
            autoStart={true} // Auto start the game
          />
        );
      
      case "Matching":
        return (
          <DragDropGame
            courseId={courseId}
            challengeId={challengeId}
            challengeData={challengeData.data}
            challengeInfo={currentChallenge}
            autoStart={true} // Auto start the game
          />
        );

      case "Quiz":
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Quiz Game
              </h2>
              <p className="text-gray-600 mb-4">
                Quiz component coming soon...
              </p>
              <p className="text-sm text-gray-500">
                Challenge: {currentChallenge.name}
              </p>
            </div>
          </div>
        );

      case "Drawing":
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Drawing Game
              </h2>
              <p className="text-gray-600 mb-4">
                Drawing component coming soon...
              </p>
              <p className="text-sm text-gray-500">
                Challenge: {currentChallenge.name}
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Unknown Challenge Type
              </h2>
              <p className="text-gray-600 mb-4">
                Challenge type "{challengeType}" is not supported yet.
              </p>
              <p className="text-sm text-gray-500">
                Challenge: {currentChallenge.name}
              </p>
            </div>
          </div>
        );
    }
  };

  return renderChallengeComponent();
}
