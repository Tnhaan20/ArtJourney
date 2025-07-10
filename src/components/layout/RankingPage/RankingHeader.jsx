import { useAppTranslation } from "@/contexts/TranslationContext";
import { Crown, Trophy, Users } from "lucide-react";

export default function RankingHeader({
  user,
  currentUserRank,
  totalPlayers,
  loading,
}) {
  const { t } = useAppTranslation();

  return (
    <div className="relative bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl p-8 mb-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-white p-1">
            <img
              src={user?.avatar || "/api/placeholder/80/80"}
              alt={user?.name || "User"}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">
              {user?.name || t("ranking.defaultUser", "Art Journey Student")}
            </h1>
            <p className="text-white/90 text-lg">
              {t("ranking.subtitle", "Global Leaderboard Champion")}
            </p>
            {currentUserRank && (
              <div className="flex items-center space-x-2 mt-2">
                <Crown className="w-5 h-5 text-yellow-300" />
                <span className="text-white/90">
                  {t("ranking.currentRank", "Current Rank")}: #
                  {currentUserRank.rank}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-6 text-white">
          {/* Total Score */}
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[120px]">
            <div className="flex items-center justify-center mb-1">
              <Trophy className="w-4 h-4 mr-1" />
              <span className="text-sm opacity-90">
                {t("ranking.totalScore", "Total Score")}
              </span>
            </div>
            <div className="text-2xl font-bold">
              {loading ? (
                <div className="w-12 h-8 bg-white/20 rounded animate-pulse"></div>
              ) : (
                currentUserRank?.totalScore?.toLocaleString() || "0"
              )}
            </div>
          </div>

          {/* Challenges Completed */}
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[120px]">
            <div className="flex items-center justify-center mb-1">
              <Trophy className="w-4 h-4 mr-1" />
              <span className="text-sm opacity-90">
                {t("ranking.challengesCompleted", "Challenges")}
              </span>
            </div>
            <div className="text-2xl font-bold">
              {loading ? (
                <div className="w-12 h-8 bg-white/20 rounded animate-pulse"></div>
              ) : (
                currentUserRank?.challengesCompleted || 0
              )}
            </div>
          </div>

          {/* Total Players */}
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[120px]">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 mr-1" />
              <span className="text-sm opacity-90">
                {t("ranking.totalPlayers", "Total Players")}
              </span>
            </div>
            <div className="text-2xl font-bold">
              {loading ? (
                <div className="w-12 h-8 bg-white/20 rounded animate-pulse"></div>
              ) : (
                totalPlayers?.toLocaleString() || "0"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
