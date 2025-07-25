import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TailwindStyle } from "@/utils/Enum";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { useToast } from "@/utils/Toast";
import { useSurvey } from "@/hooks/Survey/use-survey";

export default function MySurvey() {
  const [showRetakeModal, setShowRetakeModal] = useState(false);
  const [groupedQuestions, setGroupedQuestions] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getCurrentUser, updateSurveyStatus } = useAuthStore();
  const { user } = getCurrentUser();
  
  const { getMySurveyQuery } = useSurvey();
  const { data: mySurveyData, isLoading, error, refetch } = getMySurveyQuery;

  // Group questions by surveyQuestionId and combine their options
  useEffect(() => {
    if (mySurveyData?.data) {
      const questionsMap = new Map();
      
      mySurveyData.data.forEach(item => {
        const questionId = item.surveyQuestionId;
        
        if (questionsMap.has(questionId)) {
          // Add option to existing question
          const existingQuestion = questionsMap.get(questionId);
          existingQuestion.options.push(...item.options);
        } else {
          // Create new question entry
          questionsMap.set(questionId, {
            surveyQuestionId: item.surveyQuestionId,
            surveyQuestionContent: item.surveyQuestionContent,
            isActive: item.isActive,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            createdBy: item.createdBy,
            createdByName: item.createdByName,
            options: [...item.options]
          });
        }
      });
      
      // Convert map to array and sort by question ID
      const groupedData = Array.from(questionsMap.values()).sort(
        (a, b) => a.surveyQuestionId - b.surveyQuestionId
      );
      
      setGroupedQuestions(groupedData);
    }
  }, [mySurveyData]);

  const handleRetakeSurvey = () => {
    // Mark as not surveyed temporarily to allow retaking
    updateSurveyStatus(false);
    setShowRetakeModal(false);
    navigate('/survey');
    toast({
      title: "Survey Reset",
      description: "You can now retake the survey with your updated preferences.",
      variant: "default",
    });
  };

 

  // Check if question allows multiple answers
  const isMultipleChoice = (questionContent) => {
    return questionContent?.toLowerCase().includes('select all that apply') ||
           questionContent?.toLowerCase().includes('(select multiple)');
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-yellow mr-3"></div>
            <span className="text-gray-600">Loading your survey responses...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center py-12">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load Survey</h3>
            <p className="text-red-600 mb-4">Unable to retrieve your survey responses.</p>
            <button
              onClick={() => refetch()}
              className={`${TailwindStyle.HIGHLIGHT_FRAME} px-4 py-2 rounded-md font-medium`}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">My Survey Responses</h2>
            <p className="text-gray-600 mt-1">Your personalized art history preferences</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/survey"
              onClick={() => updateSurveyStatus(false)}
              className="px-4 py-2 border border-primary-yellow text-primary-yellow rounded-md font-medium hover:bg-amber-50 transition-colors"
            >
              Retake Survey
            </Link>
            <button
              onClick={() => setShowRetakeModal(true)}
              className={`${TailwindStyle.HIGHLIGHT_FRAME} px-4 py-2 rounded-md font-medium`}
            >
              Update Preferences
            </button>
          </div>
        </div>

        {/* Survey Status */}
        {!user?.isSurveyed || !mySurveyData?.data || groupedQuestions.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Survey Responses Found</h3>
            <p className="text-gray-600 mb-4">You haven't completed a survey yet or your responses are not available.</p>
            <Link
              to="/survey"
              className={`${TailwindStyle.HIGHLIGHT_FRAME} px-6 py-2 rounded-md font-medium inline-block`}
            >
              Take Survey Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            

            {/* Survey Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-amber-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-amber-600">{groupedQuestions.length}</div>
                <div className="text-amber-700 text-sm">Questions Answered</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {groupedQuestions.reduce((total, q) => total + q.options.length, 0)}
                </div>
                <div className="text-blue-700 text-sm">Preferences Selected</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">100%</div>
                <div className="text-purple-700 text-sm">Profile Complete</div>
              </div>
            </div>

            {/* Survey Responses */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Your Responses</h4>
              <div className="space-y-6">
                {groupedQuestions.map((question, index) => (
                  <div key={question.surveyQuestionId} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="bg-primary-yellow text-white text-xs font-medium px-2 py-1 rounded-full mr-3">
                            Q{index + 1}
                          </span>
                          {isMultipleChoice(question.surveyQuestionContent) && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                              Multiple Choice
                            </span>
                          )}
                        </div>
                        <h5 className="font-medium text-gray-800 text-lg leading-relaxed">
                          {question.surveyQuestionContent}
                        </h5>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-3">
                        Your {question.options.length > 1 ? 'answers' : 'answer'}:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {question.options.map((option, optionIndex) => (
                          <span
                            key={`${option.surveyOptionId}-${optionIndex}`}
                            className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium border border-amber-200 hover:bg-amber-200 transition-colors"
                          >
                            {option.surveyOptionContent}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center pt-6 border-t border-gray-200">
              <Link
                to="/survey"
                onClick={() => updateSurveyStatus(false)}
                className={`${TailwindStyle.HIGHLIGHT_FRAME} px-8 py-3 rounded-md font-medium text-center`}
              >
                Update My Preferences
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Retake Survey Confirmation Modal */}
      {showRetakeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Update Survey Preferences
              </h3>
              <p className="text-gray-600">
                Are you sure you want to retake the survey? This will allow you to update your current preferences and personalize your Art Journey experience.
              </p>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-amber-800 text-sm">Your current responses will be replaced with new ones.</span>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRetakeModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRetakeSurvey}
                className={`${TailwindStyle.HIGHLIGHT_FRAME} px-4 py-2 rounded-md font-medium`}
              >
                Update Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}