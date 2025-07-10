import { useState, useEffect } from "react";
import RankingHeader from "@/components/layout/RankingPage/RankingHeader";
import RankingTabs from "@/components/layout/RankingPage/RankingTabs";
import RankingTable from "@/components/layout/RankingPage/RankingTable";
import TopThreeRanking from "@/components/layout/RankingPage/TopThreeRanking";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { useAppTranslation } from "@/contexts/TranslationContext";
import { useLeaderboard } from "@/hooks/Leaderboard/use-leaderboard";

export default function RankingPage() {
  const { t } = useAppTranslation();
  const { user } = useAuthStore();
  const { getGlobalLeaderboard } = useLeaderboard();
  const [activeTab, setActiveTab] = useState("allTime");

  // Fetch global leaderboard data
  const {
    data: leaderboardData,
    isLoading: loading,
    error: leaderboardError,
  } = getGlobalLeaderboard();

  // Process leaderboard data
  const rankingData = leaderboardData?.leaderboard || [];

  // Add current user info and process data
  const processedRankingData = rankingData.map((player) => ({
    id: player.userId,
    userId: player.userId,
    name: player.username,
    username: player.username,
    avatar: `/api/placeholder/40/40`, // Default avatar since not provided in API
    score: player.totalScore,
    totalScore: player.totalScore,
    completedChallenges: player.challengesCompleted,
    challengesCompleted: player.challengesCompleted,
    rank: player.rank,
    isCurrentUser: player.userId === user?.id,
  }));

  // Get current user's rank and stats
  const currentUserRank = processedRankingData.find(
    (player) => player.userId === user?.id
  );

  const topThree = processedRankingData.slice(0, 3);
  const remainingUsers = processedRankingData.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <RankingHeader
          user={user}
          currentUserRank={currentUserRank}
          totalPlayers={processedRankingData.length}
          loading={loading}
        />

        {/* Tabs */}
        <RankingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Error State */}
        {leaderboardError && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                {t("ranking.error.title", "Unable to load leaderboard")}
              </h3>
              <p className="text-red-600">
                {t("ranking.error.message", "Please try again later.")}
              </p>
            </div>
          </div>
        )}

        {/* Top 3 Podium */}
        <TopThreeRanking topThree={topThree} loading={loading} />

        {/* Ranking Table */}
        <RankingTable
          users={remainingUsers}
          loading={loading}
          startRank={4}
          currentUser={user}
        />
      </div>
    </div>
  );
}
