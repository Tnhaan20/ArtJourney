import { useAppTranslation } from "@/contexts/TranslationContext";
import { Trophy, User, Star } from "lucide-react";

export default function RankingTable({
  users,
  loading,
  startRank = 4,
  currentUser,
}) {
  const { t } = useAppTranslation();

  if (loading) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <Trophy className="w-6 h-6 text-amber-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">
              {t("ranking.leaderboard", "Global Leaderboard")}
            </h2>
          </div>
          <div className="space-y-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-6 p-6 animate-pulse bg-gray-50 rounded-2xl"
              >
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden">
        <div className="p-8 text-center">
          <Trophy className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-700 mb-4">
            {t("ranking.noData", "No Rankings Available")}
          </h3>
          <p className="text-gray-600 text-lg">
            {t(
              "ranking.noDataDesc",
              "Be the first to complete challenges and appear on the leaderboard!"
            )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Trophy className="w-6 h-6 text-amber-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">
              {t("ranking.leaderboard", "Global Leaderboard")}
            </h2>
          </div>
          <div className="text-gray-600">
            {t("ranking.showingRanks", "Showing ranks")} {startRank}-
            {startRank + users.length - 1}
          </div>
        </div>

        {/* Enhanced Table Header */}
        <div className="grid grid-cols-12 gap-6 text-sm font-bold text-gray-700 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-6 border border-amber-200/50">
          <div className="col-span-1 flex items-center">
            <Star className="w-4 h-4 mr-2 text-amber-500" />
            {t("ranking.table.rank", "Rank")}
          </div>
          <div className="col-span-5 flex items-center">
            <User className="w-4 h-4 mr-2 text-amber-500" />
            {t("ranking.table.player", "Player")}
          </div>
          <div className="col-span-3 text-center flex items-center justify-center">
            <Trophy className="w-4 h-4 mr-2 text-amber-500" />
            {t("ranking.table.totalScore", "Total Score")}
          </div>
          <div className="col-span-3 text-center flex items-center justify-center">
            <Star className="w-4 h-4 mr-2 text-amber-500" />
            {t("ranking.table.challengesCompleted", "Challenges Completed")}
          </div>
        </div>

        {/* Table Rows */}
        <div className="space-y-3">
          {users.map((user, index) => (
            <div
              key={user.id}
              className={`grid grid-cols-12 gap-6 items-center p-6 rounded-2xl transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] ${
                user.isCurrentUser
                  ? "bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 shadow-lg"
                  : "bg-gradient-to-r from-gray-50 to-white hover:from-amber-50 hover:to-orange-50 border border-gray-200 hover:border-amber-200"
              }`}
            >
              {/* Rank */}
              <div className="col-span-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    user.isCurrentUser
                      ? "bg-gradient-to-r from-orange-400 to-amber-400 text-white"
                      : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700"
                  }`}
                >
                  {startRank + index}
                </div>
              </div>

              {/* User Info */}
              <div className="col-span-5 flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={user.avatar || "/api/placeholder/50/50"}
                    alt={user.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
                  />
                  {user.isCurrentUser && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">
                    {user.name || user.username}
                    {user.isCurrentUser && (
                      <span className="ml-3 text-sm bg-gradient-to-r from-orange-400 to-amber-400 text-white px-3 py-1 rounded-full">
                        {t("ranking.you", "You")}
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t("ranking.table.playerId", "Player ID")}: {user.userId}
                  </p>
                </div>
              </div>

              {/* Total Score */}
              <div className="col-span-3 text-center">
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl px-4 py-3">
                  <div className="font-bold text-xl text-amber-700">
                    {user.totalScore?.toLocaleString() || "0"}
                  </div>
                  <div className="text-xs text-amber-600 mt-1">
                    {t("ranking.table.points", "points")}
                  </div>
                </div>
              </div>

              {/* Challenges Completed */}
              <div className="col-span-3 text-center">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl px-4 py-3">
                  <div className="font-bold text-xl text-blue-700">
                    {user.challengesCompleted || 0}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    {t("ranking.table.challenges", "challenges")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button (if needed) */}
        {users.length >= 10 && (
          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-orange-400 to-amber-400 text-white px-8 py-3 rounded-2xl font-semibold hover:from-orange-500 hover:to-amber-500 transition-all duration-300 transform hover:scale-105">
              {t("ranking.loadMore", "Load More Players")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
