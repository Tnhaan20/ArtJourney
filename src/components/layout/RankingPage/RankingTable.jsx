import { useAppTranslation } from "@/contexts/TranslationContext";

export default function RankingTable({ users, loading, startRank = 4 }) {
  const { t } = useAppTranslation();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {t("ranking.leaderboard", "Leaderboard")}
          </h2>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 animate-pulse"
              >
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          {t("ranking.leaderboard", "Leaderboard")}
        </h2>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 border-b pb-4 mb-4">
          <div className="col-span-1">#</div>
          <div className="col-span-4">{t("ranking.table.name", "Name")}</div>
          <div className="col-span-2 text-center">
            {t("ranking.table.score", "Score")}
          </div>
          <div className="col-span-2 text-center">
            {t("ranking.table.completed", "Completed courses")}
          </div>
          <div className="col-span-2 text-center">
            {t("ranking.table.learningTime", "Learning time")}
          </div>
          <div className="col-span-1 text-center">
            {t("ranking.table.correct", "Correct answer")}
          </div>
        </div>

        {/* Table Rows */}
        <div className="space-y-2">
          {users.map((user, index) => (
            <div
              key={user.id}
              className={`grid grid-cols-12 gap-4 items-center p-4 rounded-xl transition-all duration-200 hover:bg-gray-50 ${
                user.isCurrentUser
                  ? "bg-orange-50 border-2 border-orange-200"
                  : ""
              }`}
            >
              {/* Rank */}
              <div className="col-span-1">
                <span className="font-semibold text-gray-700">
                  {startRank + index}
                </span>
              </div>

              {/* User Info */}
              <div className="col-span-4 flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {user.name}
                    {user.isCurrentUser && (
                      <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                        {t("ranking.you", "You")}
                      </span>
                    )}
                  </h3>
                </div>
              </div>

              {/* Score */}
              <div className="col-span-2 text-center">
                <span className="font-semibold text-gray-800">
                  {user.score.toLocaleString()}
                </span>
              </div>

              {/* Completed Courses */}
              <div className="col-span-2 text-center">
                <span className="text-gray-600">{user.completedCourses}</span>
              </div>

              {/* Learning Time */}
              <div className="col-span-2 text-center">
                <span className="text-gray-600">{user.learningTime}</span>
              </div>

              {/* Correct Answers */}
              <div className="col-span-1 text-center">
                <span className="text-gray-600">{user.correctAnswers}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
