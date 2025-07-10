import { useAppTranslation } from "@/contexts/TranslationContext";
import { Trophy, Star, Crown } from "lucide-react";

export default function TopThreeRanking({ topThree, loading }) {
  const { t } = useAppTranslation();

  if (loading) {
    return (
      <div className="flex justify-center items-end space-x-8 mb-16">
        {[2, 1, 3].map((position) => (
          <div key={position} className="text-center animate-pulse">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6"></div>
            <div className="h-6 bg-gray-300 rounded w-28 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-20 mx-auto mb-4"></div>
            <div
              className={`w-40 bg-gray-300 rounded-t-3xl ${
                position === 1 ? "h-40" : position === 2 ? "h-32" : "h-24"
              }`}
            ></div>
          </div>
        ))}
      </div>
    );
  }

  // Handle case where we don't have 3 players
  if (!topThree || topThree.length === 0) {
    return (
      <div className="text-center py-16 mb-16">
        <Trophy className="w-20 h-20 text-gray-400 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-gray-700 mb-4">
          {t("ranking.noTopPlayers", "No Top Players Yet")}
        </h3>
        <p className="text-gray-600 text-lg">
          {t(
            "ranking.noTopPlayersDesc",
            "Complete challenges to appear on the podium!"
          )}
        </p>
      </div>
    );
  }

  const getPodiumHeight = (position) => {
    switch (position) {
      case 1:
        return "h-40";
      case 2:
        return "h-32";
      case 3:
        return "h-24";
      default:
        return "h-24";
    }
  };

  const getPodiumColor = (position) => {
    switch (position) {
      case 1:
        return "bg-gradient-to-t from-yellow-400 via-yellow-300 to-yellow-200";
      case 2:
        return "bg-gradient-to-t from-gray-400 via-gray-300 to-gray-200";
      case 3:
        return "bg-gradient-to-t from-orange-400 via-orange-300 to-orange-200";
      default:
        return "bg-gray-300";
    }
  };

  const getPodiumRing = (position) => {
    switch (position) {
      case 1:
        return "ring-4 ring-yellow-300 ring-opacity-50";
      case 2:
        return "ring-4 ring-gray-300 ring-opacity-50";
      case 3:
        return "ring-4 ring-orange-300 ring-opacity-50";
      default:
        return "";
    }
  };

  const getBorderColor = (position) => {
    switch (position) {
      case 1:
        return "border-yellow-400";
      case 2:
        return "border-gray-400";
      case 3:
        return "border-orange-400";
      default:
        return "border-gray-300";
    }
  };

  // Ensure we have at least empty slots for missing players
  const paddedTopThree = [...topThree];
  while (paddedTopThree.length < 3) {
    paddedTopThree.push(null);
  }

  // Reorder for podium display: 2nd, 1st, 3rd
  const podiumOrder = [
    paddedTopThree[1], // 2nd place
    paddedTopThree[0], // 1st place
    paddedTopThree[2], // 3rd place
  ];

  const positions = [2, 1, 3];

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Crown className="w-8 h-8 text-yellow-500 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">
            {t("ranking.topThree", "Top 3 Champions")}
          </h2>
          <Crown className="w-8 h-8 text-yellow-500 ml-3" />
        </div>
        <p className="text-gray-600 text-lg">
          {t("ranking.topThreeDesc", "The ultimate challenge masters")}
        </p>
      </div>

      <div className="flex justify-center items-end space-x-8">
        {podiumOrder.map((user, index) => {
          const position = positions[index];

          // Empty slot for missing players
          if (!user) {
            return (
              <div key={`empty-${position}`} className="text-center opacity-50">
                <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-gray-300 mx-auto mb-6 flex items-center justify-center">
                  <Trophy className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-bold text-gray-400 mb-2 text-lg">
                  {t("ranking.emptySlot", "Available")}
                </h3>
                <p className="text-gray-400 mb-6">
                  {t("ranking.emptySlotDesc", "Compete to claim this spot!")}
                </p>
                <div
                  className={`w-40 ${getPodiumHeight(
                    position
                  )} bg-gray-200 rounded-t-3xl flex items-center justify-center shadow-lg`}
                >
                  <span className="text-4xl font-bold text-gray-400">
                    {position}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div key={user.id} className="text-center">
              {/* Crown for 1st place */}
              {position === 1 && (
                <div className="text-6xl mb-4 animate-bounce">👑</div>
              )}

              {/* User Avatar */}
              <div className="relative mb-6">
                <img
                  src={user.avatar || "/api/placeholder/120/120"}
                  alt={user.name || user.username}
                  className={`w-32 h-32 rounded-full object-cover border-4 ${getBorderColor(
                    position
                  )} shadow-2xl mx-auto ${getPodiumRing(position)}`}
                />
                {/* Position Badge */}
                <div
                  className={`absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                    position === 1
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                      : position === 2
                      ? "bg-gradient-to-r from-gray-400 to-gray-500"
                      : "bg-gradient-to-r from-orange-400 to-orange-500"
                  }`}
                >
                  {position}
                </div>
                {/* Star for current user */}
                {user.isCurrentUser && (
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* User Name */}
              <h3 className="font-bold text-gray-800 mb-2 text-lg max-w-[160px] truncate">
                {user.name || user.username}
                {user.isCurrentUser && (
                  <span className="block text-sm text-blue-600 mt-1">
                    {t("ranking.you", "You")}
                  </span>
                )}
              </h3>

              {/* Score */}
              <div className="mb-2">
                <p className="text-2xl font-bold text-gray-800 mb-1">
                  {user.totalScore?.toLocaleString() || "0"}
                </p>
                <p className="text-sm text-gray-600">
                  {t("ranking.totalPoints", "Total Points")}
                </p>
              </div>

              {/* Challenges Completed */}
              <div className="mb-6">
                <p className="text-lg font-semibold text-gray-700">
                  {user.challengesCompleted || 0}{" "}
                  {t("ranking.challenges", "challenges")}
                </p>
              </div>

              {/* Podium */}
              <div
                className={`w-40 ${getPodiumHeight(position)} ${getPodiumColor(
                  position
                )} rounded-t-3xl flex items-center justify-center text-white font-bold shadow-2xl border-t-4 ${getBorderColor(
                  position
                )}`}
              >
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">{position}</div>
                  <div className="text-sm opacity-90">
                    {position === 1
                      ? t("ranking.first", "FIRST")
                      : position === 2
                      ? t("ranking.second", "SECOND")
                      : t("ranking.third", "THIRD")}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
