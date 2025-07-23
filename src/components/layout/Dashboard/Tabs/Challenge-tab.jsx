import {
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Trophy,
  Users,
  Calendar,
  Award,
  Settings, // Add Settings icon for challenge details
} from "lucide-react";
import { useState } from "react";
import { useGamification } from "@/hooks/Gamification/use-gamification";
import { TailwindStyle } from "@/utils/Enum";
import { ChallengeModal } from "../Modals/ChallengeModal";
import { MatchingModal } from "../Modals/MatchingModal"; // Import MatchingModal

export const ChallengesTab = ({
  selectedCourse = null,
  onBackToCourses = () => {},
}) => {
  const { getChallengeByCourse } = useGamification();

  // Local state for modals
  const [showCreateChallengeModal, setShowCreateChallengeModal] =
    useState(false);
  const [showMatchingModal, setShowMatchingModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  // Get challenges for the specific course
  const {
    data: challengesResponse,
    isLoading,
    error,
    refetch,
  } = getChallengeByCourse(selectedCourse?.id);

  const challenges = challengesResponse?.data || [];

  // Handle modal close and refetch data
  const handleModalClose = () => {
    setShowCreateChallengeModal(false);
    // Refetch challenges after modal closes to show newly created challenges
    if (selectedCourse?.id) {
      refetch();
    }
  };

  // Handle matching modal close
  const handleMatchingModalClose = () => {
    setShowMatchingModal(false);
    setSelectedChallenge(null);
  };

  // Handle challenge detail click
  const handleChallengeDetail = (challenge) => {
    if (challenge.challengeType === "Matching") {
      setSelectedChallenge(challenge);
      setShowMatchingModal(true);
    } else {
      // Handle other challenge types here in the future
      console.log(
        `Challenge type ${challenge.challengeType} not implemented yet`
      );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />
            <div className="text-lg">Loading challenges...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-lg text-red-600 mb-2">
              Error loading challenges
            </div>
            <button
              onClick={() => refetch()}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header with back button and course info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToCourses}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Courses</span>
            </button>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Challenge Management
              </h3>
              {selectedCourse && (
                <p className="text-sm text-gray-600">
                  Course:{" "}
                  <span className="font-medium">{selectedCourse.title}</span>
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowCreateChallengeModal(true)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${TailwindStyle.HIGHLIGHT_FRAME} hover:shadow-md transition-all`}
          >
            <Plus className="w-4 h-4" />
            <span>Create Challenge</span>
          </button>
        </div>

        {/* Challenge Statistics */}
        {selectedCourse && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Challenges</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {challenges.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Challenges</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {challenges.filter((c) => c.status === "Active").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {challenges.filter((c) => c.status === "Completed").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {challenges.filter((c) => c.status === "Upcoming").length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Challenge List */}
        <div className="space-y-4">
          {challenges.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {challenges.map((challenge, index) => (
                <div
                  key={challenge.id || challenge.challengeId || index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-yellow-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-gray-900 mb-3">
                      {challenge.title ||
                        challenge.challengeName ||
                        challenge.name ||
                        `Challenge ${index + 1}`}
                    </span>
                    <div className="flex space-x-1">
                      {/* Challenge Detail Button - only show for matching challenges */}
                      {challenge.challengeType === "Matching" && (
                        <button
                          onClick={() => handleChallengeDetail(challenge)}
                          className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                          title="Configure Challenge Details"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        className="text-gray-400 hover:text-yellow-600 transition-colors p-1"
                        title="Edit Challenge"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                        title="Delete Challenge"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium text-gray-900">
                        {challenge.challengeType || "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium text-gray-900">
                        {challenge.durationSeconds
                          ? `${Math.floor(
                              challenge.durationSeconds / 60
                            )} minutes`
                          : "Not set"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Description:</span>
                      <span className="font-medium text-gray-900 text-right max-w-[200px] truncate">
                        {challenge.description || "No description"}
                      </span>
                    </div>
                    {challenge.startDate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Start Date:</span>
                        <span className="font-medium text-gray-900">
                          {new Date(challenge.startDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {challenge.endDate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">End Date:</span>
                        <span className="font-medium text-gray-900">
                          {new Date(challenge.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mb-6">
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <div className="text-gray-500 text-lg mb-2">
                  No challenges found for this course
                </div>
                <p className="text-gray-400 text-sm">
                  Create your first challenge to engage students with
                  interactive content
                </p>
              </div>
              <button
                onClick={() => setShowCreateChallengeModal(true)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl mx-auto ${TailwindStyle.HIGHLIGHT_FRAME} hover:shadow-md transition-all`}
              >
                <Plus className="w-4 h-4" />
                <span>Create First Challenge</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Challenge Modal */}
      <ChallengeModal
        isOpen={showCreateChallengeModal}
        onClose={handleModalClose}
        selectedCourse={selectedCourse}
      />

      {/* Matching Modal */}
      <MatchingModal
        isOpen={showMatchingModal}
        onClose={handleMatchingModalClose}
        selectedChallenge={selectedChallenge}
      />
    </>
  );
};
