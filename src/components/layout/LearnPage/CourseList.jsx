import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, Sparkles, TrendingUp, Clock } from "lucide-react";
import { TailwindStyle } from "@/utils/Enum";
import { useCourse } from "@/hooks/Courses/use-course";

export default function CourseList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRegion, setActiveRegion] = useState("all");
  const [activePeriods, setActivePeriods] = useState({});
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  // Get data from API
  const { getAllCoursesQuery } = useCourse();
  const { data: coursesResponse, isLoading, error } = getAllCoursesQuery;

  // Extract regions data from API response
  const regions = coursesResponse?.data || [];

  // Filter regions based on active region
  const filteredRegions = regions.filter(
    (region) =>
      activeRegion === "all" || region.regionId.toString() === activeRegion
  );

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

  // Popular search suggestions
  const popularSearches = [
    "Roman Art",
    "Greek",
    "Ancient",
    "India",
    ,
  ];

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading courses...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Error loading courses</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 equila-bold">
        COURSES
      </h1>

      {/* Enhanced Search Section */}
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
                      isSearchFocused ? "text-primary-yellow" : "text-gray-400"
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
                      navigate(`/learn/search?q=${encodeURIComponent(search)}`)
                    }
                    className="px-3 py-1.5 bg-gray-100 hover:bg-primary-yellow hover:text-white text-gray-700 text-sm rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>
                  {regions.reduce(
                    (acc, region) => acc + region.courses.length,
                    0
                  )}{" "}
                  courses available
                </span>
              </div>
              
            </div>
          </div>
        )}
      </div>

      {/* Region tabs */}
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

      {/* Course listings by region */}
      <div className="space-y-16">
        {filteredRegions.map((region) => {
          // Filter by active periods if any are selected
          const regionActivePeriods = activePeriods[region.regionId] || [];
          const periodFilteredCourses =
            regionActivePeriods.length > 0
              ? region.courses.filter((course) =>
                  regionActivePeriods.includes(course.historicalPeriodId)
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

                          {/* Hover overlay for full text */}
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

        {/* Empty state when no regions found */}
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
    </div>
  );
}
