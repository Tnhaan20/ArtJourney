import { useState } from "react";
import { Sidebar } from "@/components/layout/Dashboard/Sidebar";
import { Header } from "@/components/layout/Dashboard/Header";
import  CourseModal from "@/components/layout/Dashboard/Modals/CourseModal";
import { ModuleModal } from "@/components/layout/Dashboard/Modals/ModuleModal";
import { OverviewTab } from "@/components/layout/Dashboard/Tabs/Overview-tab";
import { FinancialTab } from "@/components/layout/Dashboard/Tabs/Financial-tab";
import { UsersTab } from "@/components/layout/Dashboard/Tabs/Users-tab";
import { CoursesTab } from "@/components/layout/Dashboard/Tabs/Courses-tab";
import { QuizzesTab } from "@/components/layout/Dashboard/Tabs/Quizzes-tab";
import { ChallengesTab } from "@/components/layout/Dashboard/Tabs/Challenge-tab";
import { ContentTab } from "@/components/layout/Dashboard/Tabs/Content-tab";
import { SettingsTab } from "@/components/layout/Dashboard/Tabs/Settings-tab";
import  HistoricalPeriodModal  from "@/components/layout/Dashboard/Modals/HistoricalPeriodModal";

const ArtJourneyAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [expandedCourses, setExpandedCourses] = useState(new Set());
  const [showHistoricalPeriodModal, setShowHistoricalPeriodModal] =
    useState(false);

  // Mock data - thay thế bằng data thực từ API
  const [historicalPeriods, setHistoricalPeriods] = useState([
    {
      historical_period_id: 1,
      historical_period_name: "Renaissance",
      start_year: "1400",
      end_year: "1600",
    },
    {
      historical_period_id: 2,
      historical_period_name: "Baroque",
      start_year: "1600",
      end_year: "1750",
    },
  ]);

  const [regions, setRegions] = useState([
    {
      region_id: 1,
      region_name: "Western Europe",
    },
    {
      region_id: 2,
      region_name: "East Asia",
    },
  ]);

  // Handler functions
  const handleCreateHistoricalPeriod = () => {
    console.log("Opening Historical Period Modal");
    setShowHistoricalPeriodModal(true);
  };

  const handleCreateRegion = () => {
    console.log("Opening Region Modal");
    setShowRegionModal(true);
  };

  const handleSaveHistoricalPeriod = (data) => {
    console.log("Saving Historical Period:", data);
    setShowHistoricalPeriodModal(false);
  };

  const handleSaveRegion = (data) => {
    console.log("Saving Region:", data);
    setShowRegionModal(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "financial":
        return <FinancialTab />;
      case "users":
        return <UsersTab />;
      case "courses":
        return (
          <CoursesTab
            expandedCourses={expandedCourses}
            setExpandedCourses={setExpandedCourses}
            setShowCourseModal={setShowCourseModal}
            setShowModuleModal={setShowModuleModal}
          />
        );
      case "quizzes":
        return <QuizzesTab />;
      case "challenges":
        return <ChallengesTab />;
      case "content":
        return <ContentTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="flex inset-y-0 left-0 fixed h-screen">
        <Sidebar
          sidebarOpen={sidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={`${
          sidebarOpen ? "ml-64" : "ml-18"
        } transition-all duration-300 h-screen flex flex-col`}
      >
        {/* Fixed Header */}
        <div className="flex-shrink-0">
          <Header
            activeTab={activeTab}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {renderContent()}
        </main>
      </div>

      {/* Modals */}
      {showCourseModal && (
        <CourseModal
          course={selectedCourse}
          onClose={() => {
            setShowCourseModal(false);
            setSelectedCourse(null);
          }}
          onCreateHistoricalPeriod={handleCreateHistoricalPeriod}
        />
      )}

      {showHistoricalPeriodModal && (
        <HistoricalPeriodModal
          historicalPeriod={null}
          onClose={() => setShowHistoricalPeriodModal(false)}
          onSave={handleSaveHistoricalPeriod}
        />
      )}

      

      {showModuleModal && (
        <ModuleModal
          module={null}
          courseId={selectedCourse?.id}
          onClose={() => setShowModuleModal(false)}
          onSave={() => setShowModuleModal(false)}
        />
      )}
    </div>
  );
};

export default ArtJourneyAdminDashboard;
