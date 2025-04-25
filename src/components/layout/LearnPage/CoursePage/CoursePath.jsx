import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CoursePath({ courseId }) {
  const [courseParts, setCourseParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch course modules based on courseId
    const fetchCourseParts = async () => {
      try {
        setLoading(true);
        // Simulated API call - replace with actual API call
        // const response = await fetch(`/api/courses/${courseId}/parts`);
        // const data = await response.json();
        
        // Simulated data for now - in the future this will come from an API
        const mockParts = [
          {
            id: 1,
            partNumber: "PART 1",
            title: "Early Christian & Byzantine Art",
            modules: [
              {
                id: 1,
                title: "Early Christian Art",
                completed: true
              },
              {
                id: 2,
                title: "Early Medieval Art",
                completed: true
              }
            ]
          },
          {
            id: 2,
            partNumber: "PART 2",
            title: "Early Medieval Art",
            modules: [
              {
                id: 3,
                title: "The Middle Ages: General",
                completed: false
              },
              {
                id: 4,
                title: "Carolingian Art",
                completed: false
              },
              {
                id: 5,
                title: "Ottonian Art",
                completed: false
              }
            ]
          }
        ];
        
        setCourseParts(mockParts);
      } catch (error) {
        console.error("Error fetching course parts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseParts();
  }, [courseId]);

  // Course item rendering function (formerly CourseItem component)
  const renderCourseItem = (module) => {
    const { title, completed } = module;
    
    return (
      <Link to="#course-content" className="block" key={module.id}>
        <div className="border border-gray-200 rounded-md flex items-center justify-between p-4 hover:bg-gray-50">
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded-full mr-4 flex items-center justify-center ${completed ? 'bg-green-500' : 'border border-gray-300'}`}>
              {completed && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-base font-medium">{title}</span>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    );
  };

  if (loading) {
    return <div className="p-6">Loading course path...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Already know this? section */}
      <div className="bg-amber-50 rounded-lg p-6 shadow-md">
        <h3 className="font-semibold mb-2">Already know this?</h3>
        <p className="text-gray-700 mb-4">Take an assessment to verify your skill level and skip some tasks.</p>
        <Link 
          to="#assessment" 
          className="block text-center w-full bg-white border border-amber-200 rounded-md py-2 px-4 text-amber-700 hover:bg-amber-100 transition-colors"
        >
          Europe Art History
        </Link>
      </div>

      <div id="course-path-container">
        {/* Dynamically render course parts */}
        {courseParts.map((part, index) => (
          <div 
            key={part.id} 
            className="bg-white rounded-lg p-6 shadow-md mb-6 last:mb-0"
          >
            <h3 className="text-lg font-semibold mb-2">{part.partNumber}</h3>
            <h4 className="text-base font-semibold mb-4">{part.title}</h4>
            <div className="flex flex-col gap-2">
              {part.modules.map(module => renderCourseItem(module))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 