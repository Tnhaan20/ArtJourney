import { useAppTranslation } from "@/contexts/TranslationContext";
import { TailwindStyle } from "@/utils/Enum";

export default function RankingTabs({ activeTab, setActiveTab }) {
  const { t } = useAppTranslation();

  const tabs = [
    { id: "today", label: t("ranking.tabs.today", "Today") },
    { id: "week", label: t("ranking.tabs.week", "Week") },
    { id: "allTime", label: t("ranking.tabs.allTime", "All time") },
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? `{${TailwindStyle.HIGHLIGHT_FRAME}}`
                : "text-gray-600 hover:text-primary-yellow"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
