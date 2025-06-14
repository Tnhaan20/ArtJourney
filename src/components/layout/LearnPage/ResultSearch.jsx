import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Search, Filter, BookOpen, Clock, Star, ArrowLeft, Loader2 } from 'lucide-react';
import { useCourse } from '@/hooks/Courses/use-course';
import { assets } from '@/assets/assets';
import { TailwindStyle } from '@/utils/Enum';

export default function ResultSearch() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('q') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [sortBy, setSortBy] = useState('relevance');
  const [filterLevel, setFilterLevel] = useState('all');

  const { useSearchCourses } = useCourse();
  const { data: searchResults, isLoading, error } = useSearchCourses(searchQuery, currentPage, pageSize);

  // Reset page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Extract courses from search results
  const courses = searchResults?.data?.items || [];
  const totalResults = searchResults?.data?.totalCount || 0;
  const totalPages = Math.ceil(totalResults / pageSize);

  // Filter courses based on level filter
  const filteredCourses = courses.filter(course => {
    if (filterLevel === 'all') return true;
    const level = course.level === 0 ? 'beginner' : course.level === 1 ? 'intermediate' : 'advanced';
    return level === filterLevel;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'newest':
        return new Date(b.createdDate) - new Date(a.createdDate);
      case 'level':
        return a.level - b.level;
      case 'rating':
        return (b.averageRating || 0) - (a.averageRating || 0);
      default: // relevance
        return 0;
    }
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const getLevelText = (level) => {
    switch (level) {
      case 0: return 'Beginner';
      case 1: return 'Intermediate';
      case 2: return 'Advanced';
      default: return 'Unknown';
    }
  };

  const getPremiumText = (isPremium) => {
    return isPremium ? 'Premium' : 'Free';
  };

  // Component to render star rating
  const StarRating = ({ rating, totalFeedbacks }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }
    
    // Add empty stars to make 5 total
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }
    
    return (
      <div className="flex items-center space-x-1">
        <div className="flex items-center space-x-0.5">
          {stars}
        </div>
        <span className="text-sm font-medium text-gray-700">
          {rating > 0 ? rating.toFixed(1) : '0.0'}
        </span>
        <span className="text-sm text-gray-500">
          ({totalFeedbacks} review{totalFeedbacks !== 1 ? 's' : ''})
        </span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-3">
            <Loader2 className="w-6 h-6 animate-spin text-primary-yellow" />
            <span className="text-lg">Searching courses...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-lg text-red-600 mb-4">Error searching courses</div>
            <button 
              onClick={() => navigate('/learn')}
              className="px-4 py-2 bg-primary-yellow text-white rounded-lg hover:bg-yellow-600"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/learn')}
          className="flex items-center text-primary-yellow hover:text-yellow-600 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Courses
        </button>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Search Results
            </h1>
            <p className="text-gray-600">
              {totalResults > 0 ? (
                <>
                  Found <span className="font-semibold">{totalResults}</span> courses for "
                  <span className="font-semibold text-primary-yellow">{searchQuery}</span>"
                </>
              ) : (
                <>
                  No courses found for "
                  <span className="font-semibold text-primary-yellow">{searchQuery}</span>"
                </>
              )}
            </p>
          </div>
          
          {/* Search input */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              defaultValue={searchQuery}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
              placeholder="Search courses..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/learn/search?q=${encodeURIComponent(e.target.value)}`);
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      {totalResults > 0 && (
        <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            {/* Level Filter */}
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
            >
              <option value="relevance">Relevance</option>
              <option value="title">Title A-Z</option>
              <option value="newest">Newest First</option>
              <option value="level">Difficulty Level</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      )}

      {/* Results */}
      {sortedCourses.length > 0 ? (
        <>
          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {sortedCourses.map((course) => (
              <Link
                key={course.courseId}
                to={`/learn/course/${course.courseId}`}
                className="group block"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg">
                  {/* Course Image */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={
                        course.thumbnailUrl ||
                        course.coverImageUrl ||
                        assets.courses.africa
                      }
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(
                          course.title
                        )}`;
                      }}
                    />
                  </div>

                  {/* Course Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        course.level === 0 
                          ? 'bg-green-100 text-green-800'
                          : course.level === 1
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {getLevelText(course.level)}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        course.isPremium
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {getPremiumText(course.isPremium)}
                      </span>
                    </div>

                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-yellow transition-colors">
                      {course.title}
                    </h3>

                    {course.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {course.description}
                      </p>
                    )}

                    {/* Rating Section */}
                    <div className="mb-3">
                      <StarRating 
                        rating={course.averageRating || 0} 
                        totalFeedbacks={course.totalFeedbacks || 0} 
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        <span>Course</span>
                      </div>
                      {course.estimatedDuration && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{course.estimatedDuration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 border rounded-md text-sm font-medium ${
                      currentPage === page
                        ? 'bg-primary-yellow text-white border-primary-yellow'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        /* No Results */
        <div className="text-center py-16">
          <div className="mb-4">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters
            </p>
          </div>
          
          <div className="max-w-sm mx-auto text-left space-y-2 text-sm text-gray-500">
            <p className="font-medium">Suggestions:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Check your spelling</li>
              <li>Try more general terms</li>
              <li>Remove filters to see more results</li>
              <li>Browse all courses instead</li>
            </ul>
          </div>
          
          <Link
            to="/learn"
            className={`inline-block mt-6 px-6 py-3 cursor-pointer ${TailwindStyle.HIGHLIGHT_FRAME} transition-colors`}
          >
            Browse All Courses
          </Link>
        </div>
      )}
    </div>
  );
}