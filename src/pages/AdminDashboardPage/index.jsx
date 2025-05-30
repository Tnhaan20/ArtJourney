
import { useState } from "react";
import { Sidebar } from "@/components/layout/Dashboard/Sidebar";
import { Header } from "@/components/layout/Dashboard/Header";
import { CourseModal } from "@/components/layout/Dashboard/Modals/CourseModal";
import { ModuleModal } from "@/components/layout/Dashboard/Modals/ModuleModal";
import { OverviewTab } from "@/components/layout/Dashboard/Tabs/Overview-tab";
import { FinancialTab } from "@/components/layout/Dashboard/Tabs/Financial-tab";
import { UsersTab } from "@/components/layout/Dashboard/Tabs/Users-tab";
import { CoursesTab } from "@/components/layout/Dashboard/Tabs/Courses-tab";
import { QuizzesTab } from "@/components/layout/Dashboard/Tabs/Quizzes-tab";
import { ChallengesTab } from "@/components/layout/Dashboard/Tabs/Challenge-tab";
import { ContentTab } from "@/components/layout/Dashboard/Tabs/Content-tab";
import { SettingsTab } from "@/components/layout/Dashboard/Tabs/Settings-tab";


const ArtJourneyAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [expandedCourses, setExpandedCourses] = useState(new Set());

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
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>

      {showCourseModal && (
        <CourseModal
          course={selectedCourse}
          onClose={() => {
            setShowCourseModal(false);
            setSelectedCourse(null);
          }}
          onSave={() => {
            setShowCourseModal(false);
            setSelectedCourse(null);
          }}
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
