import { useAppTranslation } from "@/contexts/TranslationContext";
import { TailwindStyle } from "@/utils/Enum";

export default function RankingTabs({ activeTab, setActiveTab }) {
  const { t } = useAppTranslation();

  const tabs = [
    {
      id: "allTime",
      label: t("ranking.tabs.allTime", "All Time Global"),
      description: t(
        "ranking.tabs.allTimeDesc",
        "Overall performance across all challenges"
      ),
    },
    // Note: API only provides global leaderboard, but keeping tab structure for future expansion
    // { id: "today", label: t("ranking.tabs.today", "Today") },
    // { id: "week", label: t("ranking.tabs.week", "This Week") },
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-2 shadow-2xl border border-gray-200/60">
        <div className="text-center mb-4 px-6 pt-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t("ranking.tabs.title", "Global Leaderboard")}
          </h2>
          <p className="text-gray-600">
            {t("ranking.tabs.subtitle", "Compete with players worldwide")}
          </p>
        </div>

        <div className="flex justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative overflow-hidden rounded-2xl px-8 py-4 font-semibold transition-all duration-500 transform hover:scale-105 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-orange-400 to-amber-400 text-white shadow-xl ring-4 ring-orange-200 ring-opacity-50"
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-xl"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="font-bold text-lg mb-1">{tab.label}</div>
                <div
                  className={`text-xs ${
                    activeTab === tab.id ? "text-white/90" : "text-gray-500"
                  }`}
                >
                  {tab.description}
                </div>
              </div>

              {/* Active Indicator */}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/50 via-white to-white/50 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
