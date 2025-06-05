import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { TailwindStyle } from "@/utils/Enum";
import { useCourse } from "@/hooks/Courses/use-course";

export default function CourseList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRegion, setActiveRegion] = useState("all");
  const [activePeriods, setActivePeriods] = useState({});

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

  const togglePeriod = (regionId, period) => {
    setActivePeriods((prev) => {
      const regionPeriods = prev[regionId] || [];
      if (regionPeriods.includes(period)) {
        return {
          ...prev,
          [regionId]: regionPeriods.filter((p) => p !== period),
        };
      } else {
        return {
          ...prev,
          [regionId]: [...regionPeriods, period],
        };
      }
    });
  };

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

      {/* Search bar */}
      <div className="max-w-md mx-auto mb-10 relative">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full p-2 pl-4 pr-10 rounded-md bg-gray-100 border-none focus:ring-2 focus:ring-primary-yellow"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </div>
      </div>

      {/* Region tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded-md ${
            activeRegion === "all"
              ? "bg-primary-yellow text-white"
              : "bg-gray-100"
          }`}
          onClick={() => setActiveRegion("all")}
        >
          All Regions
        </button>
        {regions.map((region) => (
          <button
            key={region.regionId}
            className={`px-4 py-2 rounded-md ${
              activeRegion === region.regionId.toString()
                ? "bg-primary-yellow text-white"
                : "bg-gray-100"
            }`}
            onClick={() => setActiveRegion(region.regionId.toString())}
          >
            {region.regionName}
          </button>
        ))}
      </div>

      {/* Course listings by region */}
      <div className="space-y-16">
        {filteredRegions.map((region) => {
          // Filter courses by search term if one exists
          const filteredCourses = searchTerm
            ? region.courses.filter((course) =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : region.courses;

          // Filter by active periods if any are selected
          const regionActivePeriods = activePeriods[region.regionId] || [];
          const periodFilteredCourses =
            regionActivePeriods.length > 0
              ? filteredCourses.filter((course) => {
                  // Find the historical period for this course
                  const coursePeriod = region.historicalPeriodDTOs.find(
                    (period) =>
                      period.historicalPeriodId === course.historicalPeriodId
                  );
                  return (
                    coursePeriod &&
                    regionActivePeriods.includes(
                      coursePeriod.historicalPeriodName
                    )
                  );
                })
              : filteredCourses;

          // Only show regions with matching courses when searching
          if (
            (searchTerm || regionActivePeriods.length > 0) &&
            periodFilteredCourses.length === 0
          )
            return null;

          return (
            <div key={region.regionId} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                {region.regionName} Art History
              </h2>

              {/* Period filters */}
              {region.historicalPeriodDTOs.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {region.historicalPeriodDTOs.map((period) => {
                    const isActive = (
                      activePeriods[region.regionId] || []
                    ).includes(period.historicalPeriodName);
                    return (
                      <span
                        key={period.historicalPeriodId}
                        className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-all duration-300 ${
                          isActive
                            ? TailwindStyle.HIGHLIGHT_FRAME
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() =>
                          togglePeriod(
                            region.regionId,
                            period.historicalPeriodName
                          )
                        }
                      >
                        {period.historicalPeriodName}
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
                            src={
                              course.thumbnailImageUrl ||
                              course.coverImageUrl ||
                              `https://via.placeholder.com/300x200?text=${encodeURIComponent(
                                course.title
                              )}`
                            }
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(
                                course.title
                              )}`;
                            }}
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
                  No courses available in this region yet.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty state when no regions found */}
      {filteredRegions.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-500 text-lg">
            No courses found matching your criteria.
          </div>
        </div>
      )}
    </div>
  );
}
