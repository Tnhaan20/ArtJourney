import { useState } from "react";
import { Sidebar } from "@/components/layout/Dashboard/Sidebar";
import { Header } from "@/components/layout/Dashboard/Header";
import  CourseModal from "@/components/layout/Dashboard/Modals/CourseModal";
import { ModuleModal } from "@/components/layout/Dashboard/Modals/ModuleModal";
import { CombineModal } from "@/components/layout/Dashboard/Modals/CombineModal";
import { OverviewTab } from "@/components/layout/Dashboard/Tabs/Overview-tab";
import { FinancialTab } from "@/components/layout/Dashboard/Tabs/Financial-tab";
import { UsersTab } from "@/components/layout/Dashboard/Tabs/Users-tab";
import { CoursesTab } from "@/components/layout/Dashboard/Tabs/Courses-tab";
import { QuizzesTab } from "@/components/layout/Dashboard/Tabs/Quizzes-tab";
import { ChallengesTab } from "@/components/layout/Dashboard/Tabs/Challenge-tab";
import { ContentTab } from "@/components/layout/Dashboard/Tabs/Content-tab";
import { SettingsTab } from "@/components/layout/Dashboard/Tabs/Settings-tab";
import HistoricalPeriodModal from "@/components/layout/Dashboard/Modals/HistoricalPeriodModal";
import { SubModuleModal } from "@/components/layout/Dashboard/Modals/SubModuleModal";
import { QuizModal } from "@/components/layout/Dashboard/Modals/Learn&Quiz/QuizModal";
import { ChallengeModal } from "@/components/layout/Dashboard/Modals/ChallengeModal";

const ArtJourneyAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [showSubModuleModal, setShowSubModuleModal] = useState(false);
  const [showCombineModal, setShowCombineModal] = useState(false);
  const [expandedCourses, setExpandedCourses] = useState(new Set());
  const [expandedModules, setExpandedModules] = useState(new Set());
  const [showHistoricalPeriodModal, setShowHistoricalPeriodModal] =
    useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showChallengeTab, setShowChallengeTab] = useState(false);
  const [showCreateChallengeModal, setShowCreateChallengeModal] =
    useState(false);

  // State for IDs
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [selectedSubModuleId, setSelectedSubModuleId] = useState(null);
  const [selectedLearningContentId, setSelectedLearningContentId] =
    useState(null);
  const [selectedCourseForChallenge, setSelectedCourseForChallenge] =
    useState(null);

  // Quiz Modal state
  const [showQuizModal, setShowQuizModal] = useState(false);

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

  // Function to handle navigation back to courses from challenge tab
  const handleBackToCourses = () => {
    setShowChallengeTab(false);
    setSelectedCourseForChallenge(null);
  };

  const renderContent = () => {
    if (showChallengeTab && selectedCourseForChallenge) {
      return (
        <ChallengesTab
          selectedCourse={selectedCourseForChallenge}
          onBackToCourses={handleBackToCourses}
        />
      );
    }

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
            expandedModules={expandedModules}
            setExpandedModules={setExpandedModules}
            setShowCourseModal={setShowCourseModal}
            setShowModuleModal={setShowModuleModal}
            setShowSubModuleModal={setShowSubModuleModal}
            setShowCombineModal={setShowCombineModal} // ← Đảm bảo prop này được truyền
            setSelectedCourseId={setSelectedCourseId}
            setSelectedModuleId={setSelectedModuleId}
            setSelectedSubModuleId={setSelectedSubModuleId}
            setSelectedLearningContentId={setSelectedLearningContentId}
            setShowQuizModal={setShowQuizModal}
            setShowChallengeTab={setShowChallengeTab}
            setSelectedCourseForChallenge={setSelectedCourseForChallenge}
          />
        );
      case "quizzes":
        return <QuizzesTab />;
      case "challenges":
        return (
          <ChallengesTab
            setShowChallengeTab={setShowChallengeTab}
            selectedCourse={selectedCourseForChallenge}
            onBackToCourses={() => {
              setShowChallengeTab(false);
              setSelectedCourseForChallenge(null);
            }}
          />
        );
      case "content":
        return <ContentTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
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
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
            onCreateHistoricalPeriod={handleCreateHistoricalPeriod}
            onCreateRegion={handleCreateRegion}
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

      {showModuleModal && (
        <ModuleModal
          courseId={selectedCourseId}
          onClose={() => {
            setShowModuleModal(false);
            setSelectedCourseId(null);
          }}
        />
      )}

      {showSubModuleModal && (
        <SubModuleModal
          moduleId={selectedModuleId}
          onClose={() => {
            setShowSubModuleModal(false);
            setSelectedModuleId(null);
          }}
        />
      )}

      {showCombineModal && (
        <CombineModal
          isOpen={showCombineModal}
          onClose={() => {
            setShowCombineModal(false);
            setSelectedSubModuleId(null);
            setSelectedCourseId(null);
            setSelectedLearningContentId(null);
          }}
          subModuleId={selectedSubModuleId}
          courseId={selectedCourseId}
          learningContentId={selectedLearningContentId}
        />
      )}

      {showHistoricalPeriodModal && (
        <HistoricalPeriodModal
          onClose={() => setShowHistoricalPeriodModal(false)}
          onSave={handleSaveHistoricalPeriod}
        />
      )}

      {/* Quiz Modal */}
      {showQuizModal && (
        <QuizModal
          isOpen={showQuizModal}
          onClose={() => {
            console.log("Closing QuizModal");
            setShowQuizModal(false);
            setSelectedLearningContentId(null);
          }}
          learningContentId={selectedLearningContentId}
        />
      )}

      {/* Challenge Modal */}
      {showCreateChallengeModal && (
        <ChallengeModal
          isOpen={showCreateChallengeModal}
          onClose={() => setShowCreateChallengeModal(false)}
          selectedCourse={selectedCourseForChallenge}
        />
      )}
    </div>
  );
};

export default ArtJourneyAdminDashboard;
