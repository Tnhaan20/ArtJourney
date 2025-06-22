import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  X,
  Sparkles,
  TrendingUp,
  Clock,
  Loader2,
  BookOpen,
  GraduationCap,
  Play,
  CheckCircle,
  Circle,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { TailwindStyle } from "@/utils/Enum";
import { useCourse } from "@/hooks/Courses/use-course";
import { useAuthStore } from "@/domains/store/use-auth-store";

export default function CourseList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRegion, setActiveRegion] = useState("all");
  const [activePeriods, setActivePeriods] = useState({});
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [expandedModules, setExpandedModules] = useState({});
  const navigate = useNavigate();

  // Get user data
  const { getCurrentUser } = useAuthStore();
  const { user, isAuthenticated } = getCurrentUser();

  // Get data from API
  const { getAllCoursesQuery, useGetEnrolledCousreOfUser } = useCourse();
  const { data: coursesResponse, isLoading, error } = getAllCoursesQuery;

  // Get enrolled courses for authenticated user
  const {
    data: enrolledCoursesResponse,
    isLoading: isEnrollLoading,
    error: enrollError,
  } = useGetEnrolledCousreOfUser(user?.id);

  // Extract regions data from API response
  const regions = coursesResponse?.data || [];
  const enrolledCourses = enrolledCoursesResponse?.data || [];

  // Process enrolled courses to remove duplicates and calculate progress
  const processedEnrolledCourses = enrolledCourses.reduce((acc, course) => {
    const existingCourse = acc.find((c) => c.courseId === course.courseId);
    if (!existingCourse) {
      // Calculate course completion percentage
      const totalSubModules = course.modules.reduce(
        (total, module) => total + module.subModules.length,
        0
      );
      const completedSubModules = course.modules.reduce(
        (total, module) =>
          total + module.subModules.filter((sub) => sub.isCompleted).length,
        0
      );
      const completionPercentage =
        totalSubModules > 0
          ? Math.round((completedSubModules / totalSubModules) * 100)
          : 0;

      acc.push({
        ...course,
        courseCompletionPercentage: completionPercentage,
        totalSubModules,
        completedSubModules,
      });
    }
    return acc;
  }, []);

  // Auto-open first module for each course on load
  useEffect(() => {
    if (processedEnrolledCourses.length > 0) {
      const defaultExpanded = {};
      processedEnrolledCourses.forEach((course) => {
        if (course.modules.length > 0) {
          const firstModuleKey = `${course.courseId}-${course.modules[0].moduleId}`;
          defaultExpanded[firstModuleKey] = true;
        }
      });
      setExpandedModules(defaultExpanded);
    }
  }, [processedEnrolledCourses.length]);

  // Filter regions based on active region for Home tab
  const filteredRegions = regions.filter(
    (region) =>
      activeRegion === "all" || region.regionId.toString() === activeRegion
  );

  // Create regions structure for enrolled courses (My Learning tab)
  const enrolledRegions = processedEnrolledCourses.reduce((acc, course) => {
    const regionName = course.regionName || "Other";
    const regionId = course.regionName || "other";

    if (!acc[regionId]) {
      acc[regionId] = {
        regionId,
        regionName,
        courses: [],
      };
    }

    acc[regionId].courses.push(course);
    return acc;
  }, {});

  const enrolledRegionsArray = Object.values(enrolledRegions);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/learn/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const togglePeriod = (regionId, periodId) => {
    setActivePeriods((prev) => {
      const regionPeriods = prev[regionId] || [];

      // If clicking the same period that's already active, remove it
      if (regionPeriods.includes(periodId)) {
        return {
          ...prev,
          [regionId]: [],
        };
      } else {
        // Replace with the new period (only one at a time)
        return {
          ...prev,
          [regionId]: [periodId],
        };
      }
    });
  };

  const toggleModule = (courseId, moduleId) => {
    const key = `${courseId}-${moduleId}`;
    setExpandedModules((prev) => {
      // Close all modules for this course
      const newExpanded = { ...prev };
      Object.keys(newExpanded).forEach((k) => {
        if (k.startsWith(`${courseId}-`)) {
          newExpanded[k] = false;
        }
      });
      // Open the selected module
      newExpanded[key] = true;
      return newExpanded;
    });
  };

  // Popular search suggestions
  const popularSearches = ["Roman Art", "Greek", "Ancient", "India"];

  // Loading Component for Content Area
  const LoadingContent = ({ message }) => (
    <div className="flex flex-col justify-center items-center py-32">
      <div className="relative mb-8">
        <div className="w-16 h-16 border-4 border-primary-yellow/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-yellow border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div className="text-lg font-medium text-gray-700 mb-2">{message}</div>
      <div className="text-sm text-gray-500">Please wait a moment...</div>
    </div>
  );

  // Error Component for Content Area
  const ErrorContent = ({ message, onRetry }) => (
    <div className="flex flex-col justify-center items-center py-32">
      <div className="text-red-500 text-6xl mb-6">😞</div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">
        Oops! Something went wrong
      </h3>
      <p className="text-gray-600 mb-6 max-w-md text-center">{message}</p>
      <button
        onClick={onRetry}
        className={`${TailwindStyle.HIGHLIGHT_FRAME} px-6 py-3`}
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 equila-bold">
        {activeTab === "home" ? "Discover Courses" : "My Learning Journey"}
      </h1>

      {/* Tab Navigation - Only show when authenticated */}
      {isAuthenticated && (
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-1 flex">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "home"
                  ? `${TailwindStyle.HIGHLIGHT_FRAME} shadow-md`
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <BookOpen size={20} className="mr-2" />
              Home
            </button>
            <button
              onClick={() => setActiveTab("learning")}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "learning"
                  ? `${TailwindStyle.HIGHLIGHT_FRAME} shadow-md`
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <GraduationCap size={20} className="mr-2" />
              My Learning
              {processedEnrolledCourses.length > 0 && (
                <span className="ml-2 bg-primary-yellow text-white text-xs px-2 py-1 rounded-full">
                  {processedEnrolledCourses.length}
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Search Section - Only show on Home tab or when not authenticated */}
      {(activeTab === "home" || !isAuthenticated) && (
        <div className="max-w-2xl mx-auto mb-12">
          {/* Main Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative mb-6">
            <div
              className={`relative transition-all duration-300 ${
                isSearchFocused ? "transform scale-105" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-yellow/20 to-orange-400/20 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              <div
                className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300 ${
                  isSearchFocused
                    ? "border-primary-yellow shadow-xl shadow-yellow-200/50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <div className="pl-4 pr-2">
                    <Search
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isSearchFocused
                          ? "text-primary-yellow"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="What do you want to learn today?"
                    className="flex-1 py-4 px-2 text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none text-lg"
                    value={searchTerm}
                    onChange={handleSearch}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className={`m-2 px-6 py-2 ${TailwindStyle.HIGHLIGHT_FRAME} cursor-pointer transition-all duration-300 font-medium shadow-md hover:shadow-lg`}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Search Suggestions */}
          {searchTerm ? (
            <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4 animate-fadeIn">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-4 h-4 text-primary-yellow" />
                <span className="text-sm font-medium text-gray-700">
                  Press Enter to search for "{searchTerm}"
                </span>
              </div>
              <div className="text-xs text-gray-500">
                <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-600">
                  Enter
                </kbd>{" "}
                to search
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Popular Searches */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">
                    Popular Searches
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        navigate(
                          `/learn/search?q=${encodeURIComponent(search)}`
                        )
                      }
                      className="px-3 py-1.5 bg-gray-100 hover:bg-primary-yellow hover:text-white text-gray-700 text-sm rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Region tabs - Only show on Home tab or when not authenticated */}
      {(activeTab === "home" || !isAuthenticated) && (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeRegion === "all"
                ? `${TailwindStyle.HIGHLIGHT_FRAME} shadow-lg shadow-yellow-200/50 transform scale-105`
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setActiveRegion("all")}
          >
            All Regions
          </button>
          {regions.map((region) => (
            <button
              key={region.regionId}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeRegion === region.regionId.toString()
                  ? "bg-primary-yellow text-white shadow-lg shadow-yellow-200/50 transform scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setActiveRegion(region.regionId.toString())}
            >
              {region.regionName}
              <span className="ml-2 text-xs opacity-75">
                ({region.courses.length})
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Content Area */}
      <div className="min-h-[400px]">
        {/* Home Tab Content - Show when on home tab OR when not authenticated */}
        {(activeTab === "home" || !isAuthenticated) && (
          <>
            {isLoading ? (
              <LoadingContent message="Loading courses..." />
            ) : error ? (
              <ErrorContent
                message="We're having trouble loading the courses. Please try again."
                onRetry={() => window.location.reload()}
              />
            ) : (
              <div className="space-y-16">
                {filteredRegions.map((region) => {
                  const regionActivePeriods =
                    activePeriods[region.regionId] || [];
                  const periodFilteredCourses =
                    regionActivePeriods.length > 0
                      ? region.courses.filter((course) =>
                          regionActivePeriods.includes(
                            course.historicalPeriodId
                          )
                        )
                      : region.courses;

                  return (
                    <div key={region.regionId} className="mb-12">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {region.regionName} Art History
                        </h2>
                        <div className="text-sm text-gray-500">
                          {periodFilteredCourses.length} course
                          {periodFilteredCourses.length !== 1 ? "s" : ""}
                        </div>
                      </div>

                      {/* Period filters */}
                      {region.historicalPeriodDTOs.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {region.historicalPeriodDTOs.map((period) => {
                            const isActive = (
                              activePeriods[region.regionId] || []
                            ).includes(period.historicalPeriodId);
                            return (
                              <span
                                key={period.historicalPeriodId}
                                className={`px-4 py-2 text-sm rounded-full cursor-pointer transition-all duration-300 flex items-center gap-2 ${
                                  isActive
                                    ? "bg-primary-yellow text-white shadow-md transform scale-105"
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                }`}
                                onClick={() =>
                                  togglePeriod(
                                    region.regionId,
                                    period.historicalPeriodId
                                  )
                                }
                              >
                                <span>{period.historicalPeriodName}</span>
                                {isActive && (
                                  <X
                                    size={14}
                                    className="hover:bg-yellow-600 rounded-full p-0.5 transition-colors"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      togglePeriod(
                                        region.regionId,
                                        period.historicalPeriodId
                                      );
                                    }}
                                  />
                                )}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      {/* Course cards */}
                      {periodFilteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                          {periodFilteredCourses.map((course) => (
                            <Link
                              to={`/learn/course/${course.courseId}`}
                              key={course.courseId}
                              className="group relative block"
                            >
                              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 transform origin-center group-hover:scale-110 group-hover:shadow-2xl group-hover:z-50 relative">
                                <div className="h-48 overflow-hidden">
                                  <img
                                    loading="lazy"
                                    src={course.thumbnailImageUrl}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-300"
                                  />
                                </div>
                                <div className="py-6 px-4 bg-[#f8e7ce] relative">
                                  <h3 className="font-medium text-lg transition-all duration-300 truncate group-hover:opacity-0">
                                    {course.title}
                                  </h3>
                                  {course.description && (
                                    <p className="text-sm text-gray-600 mt-2 line-clamp-2 group-hover:opacity-0">
                                      {course.description}
                                    </p>
                                  )}

                                  {/* Hover overlay */}
                                  <div className="absolute inset-0 bg-[#f8e7ce] p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 rounded-b-lg flex flex-col justify-start">
                                    <h3 className="font-medium text-lg mb-2 whitespace-normal overflow-visible text-wrap">
                                      {course.title}
                                    </h3>
                                    {course.description && (
                                      <p className="text-sm text-gray-600">
                                        {course.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          {regionActivePeriods.length > 0
                            ? `No courses available for the selected period in this region.`
                            : "No courses available in this region yet."}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Empty state for Home tab */}
                {filteredRegions.length === 0 && (
                  <div className="text-center py-16">
                    <div className="text-gray-500 text-lg">
                      No courses found matching your criteria.
                    </div>
                    {searchTerm && (
                      <Link
                        to={`/learn/search?q=${encodeURIComponent(searchTerm)}`}
                        className="inline-block mt-4 px-6 py-3 bg-primary-yellow text-white rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        Search All Courses for "{searchTerm}"
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* My Learning Tab Content - Only show when authenticated and on learning tab */}
        {isAuthenticated && activeTab === "learning" && (
          <>
            {isEnrollLoading ? (
              <LoadingContent message="Loading your learning progress..." />
            ) : enrollError ? (
              <ErrorContent
                message="We're having trouble loading your enrolled courses. Please try again."
                onRetry={() => window.location.reload()}
              />
            ) : processedEnrolledCourses.length > 0 ? (
              <div className="space-y-8">
                {/* Course Count Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Your Learning Progress
                  </h2>
                  <p className="text-gray-600">
                    You are enrolled in {processedEnrolledCourses.length} course
                    {processedEnrolledCourses.length !== 1 ? "s" : ""}
                  </p>
                </div>

                {processedEnrolledCourses.map((course) => (
                  <div
                    key={course.courseId}
                    className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                  >
                    {/* Course Header */}
                    <div className="flex items-start p-6 bg-gradient-to-r from-amber-50 to-yellow-50">
                      <div className="flex-shrink-0 mr-6">
                        <img
                          src={course.thumbnailUrl}
                          alt={course.courseTitle}
                          className="w-24 h-24 rounded-lg object-cover shadow-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {course.courseTitle}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {course.courseDescription}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            {course.completedSubModules} of{" "}
                            {course.totalSubModules} lessons completed
                          </div>
                          <div className="text-sm font-medium text-green-600">
                            {course.courseCompletionPercentage}% Complete
                          </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                          <div
                            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${course.courseCompletionPercentage}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Modules List - Horizontal Layout like Coursera */}
                    <div className="p-6">
                      {/* Module Numbers Row */}
                      <div className="flex items-center space-x-4 mb-6 overflow-x-auto pb-2">
                        {course.modules.map((module, moduleIndex) => {
                          const moduleKey = `${course.courseId}-${module.moduleId}`;
                          const isExpanded = expandedModules[moduleKey];
                          const completedSubModules = module.subModules.filter(
                            (sub) => sub.isCompleted
                          ).length;
                          const totalSubModules = module.subModules.length;
                          const isModuleCompleted =
                            completedSubModules === totalSubModules &&
                            totalSubModules > 0;

                          return (
                            <button
                              key={module.moduleId}
                              onClick={() =>
                                toggleModule(course.courseId, module.moduleId)
                              }
                              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                                isModuleCompleted
                                  ? "bg-green-500 text-white shadow-md"
                                  : isExpanded
                                  ? "border-2 border-primary-yellow text-primary-yellow bg-white"
                                  : "border-2 border-gray-300 text-gray-600 hover:border-primary-yellow hover:text-primary-yellow bg-white"
                              }`}
                            >
                              {moduleIndex + 1}
                            </button>
                          );
                        })}
                      </div>

                      {/* Active Module Details - Only show one at a time */}
                      {course.modules.map((module, moduleIndex) => {
                        const moduleKey = `${course.courseId}-${module.moduleId}`;
                        const isExpanded = expandedModules[moduleKey];
                        const completedSubModules = module.subModules.filter(
                          (sub) => sub.isCompleted
                        ).length;
                        const totalSubModules = module.subModules.length;
                        const moduleProgress =
                          totalSubModules > 0
                            ? (completedSubModules / totalSubModules) * 100
                            : 0;

                        if (!isExpanded) return null;

                        return (
                          <div
                            key={module.moduleId}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200 animate-fadeIn"
                          >
                            {/* Module Info Header */}
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-semibold text-gray-900 text-lg">
                                  Module {moduleIndex + 1}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {completedSubModules} of {totalSubModules}{" "}
                                  lessons completed
                                </p>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="text-sm font-medium text-gray-600">
                                  {Math.round(moduleProgress)}%
                                </div>
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-primary-yellow h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${moduleProgress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>

                            {/* SubModules List */}
                            <div className="space-y-2">
                              {module.subModules.map((subModule, subIndex) => (
                                <Link
                                  key={subModule.subModuleId}
                                  to={`/learn/course/${course.courseId}/module/${module.moduleId}/submodule/${subModule.subModuleId}`}
                                  className="flex items-center p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200 group border border-gray-100"
                                >
                                  <div className="flex items-center space-x-4 flex-1">
                                    <div className="flex-shrink-0">
                                      {subModule.isCompleted ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                      ) : (
                                        <Circle className="w-5 h-5 text-gray-400" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h5 className="text-sm font-medium text-gray-900 group-hover:text-primary-yellow transition-colors">
                                        Lesson {subIndex + 1}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play className="w-4 h-4 text-primary-yellow" />
                                    <span className="text-sm text-primary-yellow font-medium">
                                      {subModule.isCompleted
                                        ? "Review"
                                        : "Start"}
                                    </span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-12 max-w-md mx-auto">
                  <BookOpen size={64} className="mx-auto text-gray-400 mb-6" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    No Enrolled Courses Yet
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Start your learning journey by enrolling in a course from
                    our catalog.
                  </p>
                  <button
                    onClick={() => setActiveTab("home")}
                    className={`${TailwindStyle.HIGHLIGHT_FRAME} px-8 py-3`}
                  >
                    Browse Courses
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
