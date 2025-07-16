import { useState } from "react";
import { X, BookOpen, HelpCircle } from "lucide-react";
import { LearningContextModal } from "./Learn&Quiz/LearningContextModal";
import { QuizTitleModal } from "./Learn&Quiz/QuizTitleModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const CombineModal = ({
  isOpen,
  onClose,
  subModuleId,
  courseId,
}) => {
  const [modalType, setModalType] = useState(null); // 'learning' or 'quizTitle'

  if (!isOpen) return null;

  const handleTypeSelection = (type) => {
    setModalType(type);
  };

  const handleBack = () => {
    setModalType(null);
  };

  const handleModalClose = () => {
    setModalType(null);
    onClose();
  };

  // Selection Screen
  if (!modalType) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Create Content
              </h2>
              <p className="text-gray-600 mt-2">
                Choose what type of content you want to create
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Learning Content Option */}
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-300"
              onClick={() => handleTypeSelection('learning')}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Learning Content</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Create educational content with text, rich media, and video materials for students to learn from.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  • Rich text content
                  • Video uploads
                  • Time limits
                  • Custom ordering
                </div>
              </CardContent>
            </Card>

            {/* Quiz Title Option */}
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-300"
              onClick={() => handleTypeSelection('quizTitle')}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Quiz Title</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Create a quiz title and setup with time limits and display settings.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  • Quiz title setup
                  • Time limit configuration
                  • Display order
                  • Content type settings
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Render selected modal
  if (modalType === 'learning') {
    return (
      <LearningContextModal
        isOpen={true}
        onClose={handleModalClose}
        onBack={handleBack}
        subModuleId={subModuleId}
        courseId={courseId}
      />
    );
  }

  if (modalType === 'quizTitle') {
    return (
      <QuizTitleModal
        isOpen={true}
        onClose={handleModalClose}
        onBack={handleBack}
        subModuleId={subModuleId}
        courseId={courseId}
      />
    );
  }

  return null;
};