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
} from "lucide-react";
import { StatCard } from "@/components/layout/Dashboard/Stat-card";
import { TailwindStyle } from "@/utils/Enum";
import { useCourse } from "@/hooks/Courses/use-course";
import { assets } from "@/assets/assets";
import { useModule } from "@/hooks/Module/use-module";
import { ModuleTab } from "./Module-tab";
import { useState, useEffect, useMemo } from "react";

export const CoursesTab = ({
  expandedCourses,
  setExpandedCourses,
  expandedModules = new Set(),
  setExpandedModules = () => {},
  setShowCourseModal,
  setShowModuleModal,
  setShowSubModuleModal,
  setShowCombineModal, // ← Đảm bảo prop này được nhận
  setSelectedCourseId,
  setSelectedModuleId,
  setSelectedSubModuleId,
  setSelectedLearningContentId,
  setShowQuizModal,
}) => {
  // Get data from API
  const { getAllCoursesQuery } = useCourse();
  const { data: coursesResponse, isLoading, error } = getAllCoursesQuery;

  // State to track which course is showing modules
  const [showModuleView, setShowModuleView] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

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
      instructor: "Admin", // Mock data
      level:
        course.level === 0
          ? "Beginner"
          : course.level === 1
          ? "Intermediate"
          : "Advanced",
      duration: course.estimatedDuration || "2h 30m", // Mock fallback
      price: course.isPremium ? "Premium" : "Free",
      enrolled: Math.floor(Math.random() * 5000), // Mock data
      rating: (4.0 + Math.random() * 1.0).toFixed(1), // Mock data
      regionName: course.regionName,
    }));
  }, [allCourses]);

  // Function to handle arrow click - show module view
  const handleArrowClick = (course) => {
    setSelectedCourse(course);
    setShowModuleView(true);
  };

  // Function to go back to courses view
  const handleBackToCourses = () => {
    setShowModuleView(false);
    setSelectedCourse(null);
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
        setShowCombineModal={setShowCombineModal} // ← Đảm bảo prop này được truyền xuống
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
                    {/* Modified arrow button to show ModuleTab */}
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
                    <button className="p-2 text-gray-400 hover:red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Simplified Course Footer - removed Add Module button */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-sm text-gray-600 text-center">
                    Click arrow to view and manage modules for this course.
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
