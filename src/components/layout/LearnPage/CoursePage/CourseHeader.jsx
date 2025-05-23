import React, { useState, useEffect } from 'react';
import teamMember1 from '@/assets/team-member-1.png';
import fireIcon from '@/assets/icons/Fire.png';
import courseHeaderBg from '@/assets/course/course-header.png';
import { Link } from 'react-router-dom';
import LazyImage from "@/components/elements/LazyImg/LazyImg";


export default function CourseHeader({ courseId }) {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch course data based on courseId
    // This is a placeholder that simulates loading course data
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        // Simulated API call - replace with actual API call
        // const response = await fetch(`/api/courses/${courseId}`);
        // const data = await response.json();
        
        // Simulated data for now
        const mockData = {
          title: `Early Christian & Byzantine Art`,
          progress: 70,
          track: "Europe Art History",
          streak: 999,
          modules: 2,
          difficulty: "Nightmare",
          timeToGo: 300,
          completionPercentage: 12
        };
        
        setCourseData(mockData);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (loading) {
    return <div className="bg-gray-50 rounded-lg p-6">Loading course details...</div>;
  }

  return (
    <div>
      {/* Header section with user info and streak side by side but separate divs */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* User info card - using imported courseHeaderBg */}
        <div
          className="overflow-hidden shadow-md flex-1 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(221, 168, 83, 0.3), rgba(221, 168, 83, 0.3)), url(${courseHeaderBg})`,
            backgroundColor: "#8B4513", // Fallback color in case image doesn't load
          }}
        >
          <div className="p-6 flex items-center gap-4 bg-opacity-40">
            <img
              loading="lazy"
              src={teamMember1}
              alt="User Avatar"
              className="w-20 h-20 rounded-full object-cover border-2 border-white"
            />
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-white">Hey, Thi!</h2>
              <p className="text-xl font-semibold text-white">
                Portfolio {courseData.progress}% complete
              </p>
              <div className="w-full h-4 bg-[#ffffff] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#e5c289] rounded-full"
                  style={{ width: `${courseData.progress}%` }}
                ></div>
              </div>
              <p className="text-base text-white">
                You're enrolled in the {courseData.track} track.
              </p>
            </div>
          </div>
        </div>

        {/* Daily Streak card */}
        <div className="bg-[#f5e5cc] p-6 md:w-58 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-full gap-2 font-semibold text-[#ecb476] mb-5">
            <img
              src={fireIcon}
              alt="Fire icon"
              width="50"
              height="50"
              loading="lazy"
            />
            <span className="text-2xl font-bold whitespace-nowrap">
              Daily Streak
            </span>
          </div>
          <div className="text-6xl font-semibold text-[#ecb476]">
            {courseData.streak}
          </div>
        </div>
      </div>

      {/* Course info section with Learning Path and Why Learn */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        {/* LEARNING PATH section */}
        <div className="bg-[#F8E7CE] p-6 shadow-md flex-1">
          <p className="text-[#DDA853] uppercase font-semibold text-xl mb-2">
            LEARNING PATH
          </p>
          <div className="flex items-center mb-1">
            <h2
              className="text-2xl font-bold text-gray-800 cursor-pointer flex items-center"
              onClick={() =>
                document
                  .getElementById("course-path-container")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              {courseData.title}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </h2>
          </div>

          <p className="font-bold text-gray-700 mb-4">Introduction</p>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="bg-[#E8BA70] bg-opacity-50 rounded-md p-3 flex flex-col items-center w-40">
              <p className="text-gray-700 text-lg font-bold mb-1">Modules</p>
              <p className="text-2xl font-bold">{courseData.modules}</p>
            </div>
            <div className="bg-[#ecd2aa] bg-opacity-50 rounded-md p-3 flex flex-col items-center w-40">
              <p className="text-gray-700 text-lg font-bold mb-1">
                Difficulty level
              </p>
              <p className="text-2xl font-bold">{courseData.difficulty}</p>
            </div>
            <div className="flex-1 max-w-sm">
              <div className="w-full bg-[#F7DBA7] rounded-full h-3 mb-1">
                <div
                  className="bg-[#F59E0B] h-3 rounded-full"
                  style={{ width: `${courseData.completionPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-lg text-gray-600">
                <span>{courseData.completionPercentage}%</span>
                <span>{courseData.timeToGo} hours to go</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-lg mb-6">
            Early Christian and Byzantine art blended Roman influences with
            Christian symbolism, focusing on spirituality over realism. Iconic
            mosaics, frescoes, and grand architecture like Hagia Sophia continue
            to shape religious and artistic traditions.
          </p>
        </div>

        {/* WHY you should learn section */}
        <div className="bg-[#f9f9f9] p-6 shadow-md md:w-1/3">
          <p className="text-[#DDA853] uppercase font-semibold text-sm mb-4">
            WHY YOU SHOULD LEARN?
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
            <li>Unlimited access to this course in the Certificate</li>
            <li>Cancel anytime</li>
            <li>
              No invisible fees; you can cancel before the time ends if it's not
              right for you
            </li>
            <li>
              40,000 USD per month to continue learning and grow your skills
            </li>
            <li>
              Go as fast as you can - the faster you go, the more you save
            </li>
            <li>Certificate when you complete after your trial ends</li>
            <li>Share on your resume, LinkedIn, and CV</li>
          </ul>

          <Link
            to="#enroll"
            className="bg-[#e8ba70] text-black font-bold px-8 py-2 inline-flex items-center hover:bg-amber-600 transition-colors mt-6 w-full justify-center"
          >
            Enroll in path
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}