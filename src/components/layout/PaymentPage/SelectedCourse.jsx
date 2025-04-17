import React from 'react';

// Mock course data based on payment type
const courseData = {
  'monthly': {
    title: 'Monthly Subscription',
    description: 'Access to all courses with monthly billing',
    details: 'Complete multiple courses and get certified in a short time',
    lessons: '100+ lessons',
    duration: 'Unlimited access',
    image: '/path/to/subscription-image.jpg' // Replace with actual path
  },
  'annual': {
    title: 'Annual Subscription',
    description: 'Our best value plan with yearly access',
    details: 'Save 25% compared to monthly billing with annual payment',
    lessons: '100+ lessons',
    duration: 'Unlimited access',
    image: '/path/to/subscription-image.jpg' // Replace with actual path
  },
  'per-course': {
    title: 'European Art History',
    description: 'Full course with lifetime access',
    details: 'Comprehensive course covering European art from prehistoric to modern',
    lessons: '24 lessons',
    duration: '12 hours total',
    image: '/path/to/europe-course.jpg' // Replace with actual path
  }
};

export default function SelectedCourse({ paymentType = 'monthly' }) {
  const course = courseData[paymentType];

  return (
    <div className="selected-course-container bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Selected Course</h2>
      
      <div className="course-content flex flex-col md:flex-row items-start gap-6">
        {/* Course Image */}
        <div className="course-image-container w-full md:w-1/3 mb-4 md:mb-0">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
            {/* Replace with actual image */}
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
              Course Image
            </div>
          </div>
        </div>
        
        {/* Course Details */}
        <div className="course-details w-full md:w-2/3">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{course.description}</p>
          <p className="text-sm text-gray-700 mb-4">{course.details}</p>
          
          <div className="course-meta-info grid grid-cols-2 gap-4">
            <div className="lesson-count">
              <span className="block text-xs text-gray-500">Lessons</span>
              <span className="block text-sm font-medium text-gray-800">{course.lessons}</span>
            </div>
            <div className="duration">
              <span className="block text-xs text-gray-500">Duration</span>
              <span className="block text-sm font-medium text-gray-800">{course.duration}</span>
            </div>
          </div>
          
          {/* Additional information for subscription plans */}
          {(paymentType === 'monthly' || paymentType === 'annual') && (
            <div className="subscription-info mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
              <p className="text-sm text-blue-700">
                {paymentType === 'monthly' 
                  ? 'Access all courses with this subscription. Cancel anytime.'
                  : 'Save 25% with annual billing. Full access to all courses.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 