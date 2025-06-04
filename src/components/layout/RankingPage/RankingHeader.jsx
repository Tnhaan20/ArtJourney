import { useAppTranslation } from "@/contexts/TranslationContext";

export default function RankingHeader({ user }) {
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
              alt={user?.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">
              {user?.name || t("ranking.defaultUser", "Tạ Thị Kiều Thi")}
            </h1>
            <p className="text-white/90 text-lg">
              {t("ranking.subtitle", "Student at FPT UNIVERSITY")}
            </p>
          </div>
        </div>

        <div className="flex space-x-6 text-white">
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[100px]">
            <div className="text-sm opacity-90 mb-1">
              {t("ranking.dailyXP", "Daily XP")}
            </div>
            <div className="text-2xl font-bold">67/50</div>
          </div>
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[100px]">
            <div className="text-sm opacity-90 mb-1">
              {t("ranking.totalXP", "Total XP")}
            </div>
            <div className="text-2xl font-bold">1.5K</div>
          </div>
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[100px]">
            <div className="text-sm opacity-90 mb-1">
              {t("ranking.streak", "Streak")}
            </div>
            <div className="text-2xl font-bold">378</div>
          </div>
        </div>
      </div>
    </div>
  );
}
