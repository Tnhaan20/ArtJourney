import { useState, useEffect } from "react";
import RankingHeader from "@/components/layout/RankingPage/RankingHeader";
import RankingTabs from "@/components/layout/RankingPage/RankingTabs";
import RankingTable from "@/components/layout/RankingPage/RankingTable";
import TopThreeRanking from "@/components/layout/RankingPage/TopThreeRanking";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { useAppTranslation } from "@/contexts/TranslationContext";

export default function RankingPage() {
  const { t } = useAppTranslation();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("today");
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  const mockRankingData = [
    {
      id: 1,
      name: "Tạ Thị Kiều Thi",
      avatar: "/api/placeholder/40/40",
      score: 15500,
      completedCourses: 4,
      learningTime: "4h 10m",
      correctAnswers: 5,
      isCurrentUser: true,
    },
    {
      id: 2,
      name: "Nguyên Minh Quốc",
      avatar: "/api/placeholder/40/40",
      score: 14340,
      completedCourses: 3,
      learningTime: "3h 45m",
      correctAnswers: 7,
    },
    {
      id: 3,
      name: "Vũ Thanh Nhàn",
      avatar: "/api/placeholder/40/40",
      score: 13950,
      completedCourses: 2,
      learningTime: "3h 15m",
      correctAnswers: 6,
    },
    {
      id: 4,
      name: "Nguyên Ngọc Khanh Trang",
      avatar: "/api/placeholder/40/40",
      score: 13890,
      completedCourses: 1,
      learningTime: "2h 45m",
      correctAnswers: 5,
    },
    {
      id: 5,
      name: "Thái Vân Nguyệt Hằng",
      avatar: "/api/placeholder/40/40",
      score: 13500,
      completedCourses: 1,
      learningTime: "1h 30m",
      correctAnswers: 4,
    },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchRankingData = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setRankingData(mockRankingData);
      } catch (error) {
        console.error("Failed to fetch ranking data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankingData();
  }, [activeTab]);

  const topThree = rankingData.slice(0, 3);
  const remainingUsers = rankingData.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <RankingHeader user={user} />

        {/* Tabs */}
        <RankingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Top 3 Podium */}
        <TopThreeRanking topThree={topThree} loading={loading} />

        {/* Ranking Table */}
        <RankingTable users={remainingUsers} loading={loading} startRank={4} />
      </div>
    </div>
  );
}
