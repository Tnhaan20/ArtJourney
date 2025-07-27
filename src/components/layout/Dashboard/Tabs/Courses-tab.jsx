import {
  Filter,
  Plus,
  ChevronRight,
  ChevronDown,
  Edit,
  Trash2,
  Video,
  PlayCircle,
  FileText,
  Clock,
  GraduationCap,
  CheckCircle,
  Users,
  Star,
  BookOpen,
  Trophy,
  Medal, // ✅ Add Medal icon
} from "lucide-react";
import { StatCard } from "@/components/layout/Dashboard/Stat-card";
import { TailwindStyle } from "@/utils/Enum";
import { useCourse } from "@/hooks/Courses/use-course";
import { assets } from "@/assets/assets";
import { useModule } from "@/hooks/Module/use-module";
import { ModuleTab } from "./Module-tab";
import { CertificateTab } from "./Certificate-tab"; // ✅ Add Certificate tab import
import { useState, useEffect, useMemo } from "react";

export const CoursesTab = ({
  expandedCourses,
  setExpandedCourses,
  expandedModules = new Set(),
  setExpandedModules = () => {},
  setShowCourseModal,
  setShowModuleModal,
  setShowSubModuleModal,
  setShowCombineModal,
  setSelectedCourseId,
  setSelectedModuleId,
  setSelectedSubModuleId,
  setSelectedLearningContentId,
  setShowQuizModal,
  setShowChallengeTab,
  setSelectedCourseForChallenge,
  setShowCertificateModal, // ✅ Add certificate modal prop
}) => {
  // Get data from API
  const { getAllCoursesQuery, deleteCourse } = useCourse();
  const { data: coursesResponse, isLoading, error } = getAllCoursesQuery;

  // State to track which course is showing modules/certificates
  const [showModuleView, setShowModuleView] = useState(false);
  const [showCertificateView, setShowCertificateView] = useState(false); // ✅ Add certificate view state
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Create delete mutation
  const deleteMutation = deleteCourse();

  // Extract and flatten all courses from all regions
  const allCourses = useMemo(() => {
    return (
      coursesResponse?.data?.reduce((acc, region) => {
        return acc.concat(
          region.courses.map((course) => ({
            ...course,
            regionName: region.regionName,
            regionId: region.regionId,
          }))
        );
      }, []) || []
    );
  }, [coursesResponse]);

  // Calculate statistics
  const totalCourses = allCourses.length;
  const publishedCourses = allCourses.filter(
    (course) => course.status === 1
  ).length;
  const draftCourses = allCourses.filter(
    (course) => course.status === 0
  ).length;
  const premiumCourses = allCourses.filter(
    (course) => course.isPremium === true
  ).length;

  // Format courses for display
  const formattedCourses = useMemo(() => {
    return allCourses.map((course) => ({
      id: course.courseId,
      title: course.title,
      description: course.description || "No description available",
      thumbnail: course.thumbnailImageUrl || course.coverImageUrl,
      status:
        course.status === 1
          ? "Published"
          : course.status === 0
          ? "Draft"
          : "Archived",
      instructor: "Admin",
      level:
        course.level === 0
          ? "Beginner"
          : course.level === 1
          ? "Intermediate"
          : "Advanced",
      duration: course.estimatedDuration || "2h 30m",
      price: course.isPremium ? "Premium" : "Free",
      enrolled: Math.floor(Math.random() * 5000),
      rating: (4.0 + Math.random() * 1.0).toFixed(1),
      regionName: course.regionName,
    }));
  }, [allCourses]);

  // Function to handle arrow click - show module view
  const handleArrowClick = (course) => {
    setSelectedCourse(course);
    setShowModuleView(true);
    setShowCertificateView(false); // ✅ Reset certificate view
  };

  // ✅ Function to handle medal click - show certificate view
  const handleMedalClick = (course) => {
    setSelectedCourse(course);
    setShowCertificateView(true);
    setShowModuleView(false); // Reset module view
  };

  // Function to go back to courses view
  const handleBackToCourses = () => {
    setShowModuleView(false);
    setShowCertificateView(false); // ✅ Reset certificate view
    setSelectedCourse(null);
  };

  // Function to handle gamification click
  const handleGamificationClick = (course) => {
    setSelectedCourseForChallenge(course);
    setShowChallengeTab(true);
  };

  // Function to handle delete course
  const handleDeleteCourse = async (courseId, courseTitle) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${courseTitle}"? This action cannot be undone.`
      )
    ) {
      try {
        await deleteMutation.mutateAsync(courseId);
      } catch (error) {
        console.error("Failed to delete course:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading courses...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">Error loading courses</div>
        </div>
      </div>
    );
  }

  // ✅ If showing certificate view, render CertificateTab
  if (showCertificateView && selectedCourse) {
    return (
      <CertificateTab
        courseId={selectedCourse.id}
        courseTitle={selectedCourse.title}
        setShowCertificateModal={setShowCertificateModal} // ✅ Pass this prop
        setSelectedCourseId={setSelectedCourseId}
        onBackToCourses={handleBackToCourses}
      />
    );
  }

  // If showing module view, render ModuleTab
  if (showModuleView && selectedCourse) {
    return (
      <ModuleTab
        courseId={selectedCourse.id}
        courseTitle={selectedCourse.title}
        expandedModules={expandedModules}
        setExpandedModules={setExpandedModules}
        setShowSubModuleModal={setShowSubModuleModal}
        setSelectedModuleId={setSelectedModuleId}
        setShowModuleModal={setShowModuleModal}
        setSelectedCourseId={setSelectedCourseId}
        setShowCombineModal={setShowCombineModal}
        setSelectedSubModuleId={setSelectedSubModuleId}
        setSelectedLearningContentId={setSelectedLearningContentId}
        setShowQuizModal={setShowQuizModal}
        onBackToCourses={handleBackToCourses}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Course Management
        </h3>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button
            onClick={() => setShowCourseModal(true)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${TailwindStyle.HIGHLIGHT_FRAME}`}
          >
            <Plus className="w-4 h-4" />
            <span>Create Course</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Courses"
          value={totalCourses.toString()}
          change={0}
          icon={GraduationCap}
          color="bg-purple-500"
        />
        <StatCard
          title="Total Modules"
          value="0"
          change={0}
          icon={BookOpen}
          color="bg-green-500"
        />
        <StatCard
          title="Published Courses"
          value={publishedCourses.toString()}
          change={0}
          icon={CheckCircle}
          color="bg-blue-500"
        />
        <StatCard
          title="Premium Courses"
          value={premiumCourses.toString()}
          change={0}
          icon={Star}
          color="bg-yellow-500"
        />
      </div>

      <div className="space-y-4">
        {formattedCourses.length > 0 ? (
          formattedCourses.map((course) => {
            return (
              <div
                key={course.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex space-x-4">
                    <img
                      src={course.thumbnail || assets.courses.africa}
                      alt={course.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {course.title}
                        </h4>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            course.status === "Published"
                              ? "bg-green-100 text-green-800"
                              : course.status === "Draft"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {course.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>By {course.instructor}</span>
                        <span>•</span>
                        <span>{course.level}</span>
                        <span>•</span>
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span>{course.price}</span>
                        <span>•</span>
                        <span className="text-blue-600">
                          {course.regionName}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* ✅ Certificate/Medal button */}
                    <button
                      onClick={() => handleMedalClick(course)}
                      className="p-2 text-gray-400 hover:text-yellow-600 transition-colors"
                      title="Manage Certificates"
                    >
                      <Medal className="w-4 h-4" />
                    </button>
                    {/* Gamification/Challenge button */}
                    <button
                      onClick={() => handleGamificationClick(course)}
                      className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                      title="Manage Challenges"
                    >
                      <Trophy className="w-4 h-4" />
                    </button>
                    {/* Arrow button to show ModuleTab */}
                    <button
                      onClick={() => handleArrowClick(course)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      title="View Modules"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteCourse(course.id, course.title)
                      }
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      disabled={deleteMutation.isPending}
                      title="Delete Course"
                    >
                      <Trash2
                        className={`w-4 h-4 ${
                          deleteMutation.isPending ? "animate-pulse" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Course Footer */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-sm text-gray-600 text-center">
                    <span className="text-yellow-600 font-medium">Medal:</span>{" "}
                    Manage certificates •
                    <span className="text-orange-600 font-medium ml-2">
                      Trophy:
                    </span>{" "}
                    Manage challenges •
                    <span className="text-gray-600 font-medium ml-2">
                      Arrow:
                    </span>{" "}
                    View modules
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg mb-4">
              No courses available yet.
            </div>
            <button
              onClick={() => setShowCourseModal(true)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl mx-auto ${TailwindStyle.HIGHLIGHT_FRAME}`}
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Course</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
