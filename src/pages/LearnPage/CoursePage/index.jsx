import React from 'react';
import { useParams } from 'react-router-dom';
import CourseHeader from '@/components/layout/LearnPage/CoursePage/CourseHeader';
import CoursePath from '@/components/layout/LearnPage/CoursePage/CoursePath';

export default function CoursePage() {
  // Get course ID from URL parameters
  const { courseId } = useParams();

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <CourseHeader courseId={courseId} />
        <CoursePath courseId={courseId} />
      </div>
    </div>
  );
}