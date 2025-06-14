import React from 'react';

import CourseDetail from '@/components/layout/LearnPage/CoursePage/CourseDetail';

export default function CoursePage() {
  // Get course ID from URL parameters

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <CourseDetail/>
      </div>
    </div>
  );
}