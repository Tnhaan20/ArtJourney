import { useAppTranslation } from "@/contexts/TranslationContext";

export default function TopThreeRanking({ topThree, loading }) {
  const { t } = useAppTranslation();

  if (loading) {
    return (
      <div className="flex justify-center items-end space-x-4 mb-12">
        {[2, 1, 3].map((position) => (
          <div key={position} className="text-center animate-pulse">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-20 mx-auto mb-2"></div>
            <div
              className={`w-32 bg-gray-300 rounded-t-2xl ${
                position === 1 ? "h-32" : position === 2 ? "h-24" : "h-20"
              }`}
            ></div>
          </div>
        ))}
      </div>
    );
  }

  const getPodiumHeight = (position) => {
    switch (position) {
      case 1:
        return "h-32";
      case 2:
        return "h-24";
      case 3:
        return "h-20";
      default:
        return "h-20";
    }
  };

  const getPodiumColor = (position) => {
    switch (position) {
      case 1:
        return "bg-gradient-to-t from-yellow-400 to-yellow-300";
      case 2:
        return "bg-gradient-to-t from-gray-400 to-gray-300";
      case 3:
        return "bg-gradient-to-t from-orange-400 to-orange-300";
      default:
        return "bg-gray-300";
    }
  };

  const getCrown = (position) => {
    if (position === 1) return "👑";
    return "";
  };

  // Reorder for podium display: 2nd, 1st, 3rd
  const podiumOrder = [
    topThree[1], // 2nd place
    topThree[0], // 1st place
    topThree[2], // 3rd place
  ];

  const positions = [2, 1, 3];

  return (
    <div className="flex justify-center items-end space-x-4 mb-12">
      {podiumOrder.map((user, index) => {
        const position = positions[index];
        if (!user) return null;

        return (
          <div key={user.id} className="text-center">
            {/* Crown for 1st place */}
            {position === 1 && (
              <div className="text-4xl mb-2 animate-bounce">👑</div>
            )}

            {/* User Avatar */}
            <div className="relative mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
              />
              <div
                className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  position === 1
                    ? "bg-yellow-500"
                    : position === 2
                    ? "bg-gray-500"
                    : "bg-orange-500"
                }`}
              >
                {position}
              </div>
            </div>

            {/* User Name */}
            <h3 className="font-semibold text-gray-800 mb-2 max-w-[120px] truncate">
              {user.name}
            </h3>

            {/* Score */}
            <p className="text-sm text-gray-600 mb-4">
              {user.score.toLocaleString()}
            </p>

            {/* Podium */}
            <div
              className={`w-32 ${getPodiumHeight(position)} ${getPodiumColor(
                position
              )} rounded-t-2xl flex items-center justify-center text-white font-bold text-6xl shadow-lg`}
            >
              {position}
            </div>
          </div>
        );
      })}
    </div>
  );
}
