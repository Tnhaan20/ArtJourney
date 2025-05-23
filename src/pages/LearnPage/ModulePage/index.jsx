import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseDetailContent from '@/components/layout/LearnPage/ModulePage/ModuleContent';

export default function CourseDetailPage() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(`/learn/course/${courseId}`);
  };

  return (
    <div className="w-full px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <CourseDetailContent
          moduleId={parseInt(moduleId)}
          courseId={courseId}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}