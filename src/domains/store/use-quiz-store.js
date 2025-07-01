import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useQuizStore = create(
  persist(
    (set, get) => ({
      // Quiz attempt state - following API response structure
      currentQuizAttempt: null,
      quizAttemptId: null,
      attemptData: null, // Store the full attempt data from API
      timeLimit: null,
      learningContentId: null,
      
      // Actions
      setQuizAttempt: (attemptData) => {
        set({
          currentQuizAttempt: attemptData,
          quizAttemptId: attemptData?.id, // The main attempt ID from API
          attemptData: attemptData, // Store full attempt data
          timeLimit: attemptData?.timeLimit,
          learningContentId: attemptData?.learningContentId,
        });
      },
      
      updateQuizAttemptId: (attemptId) => {
        set({ quizAttemptId: attemptId });
      },
      
      setTimeLimit: (timeLimit) => {
        set({ timeLimit });
      },
      
      setLearningContentId: (learningContentId) => {
        set({ learningContentId });
      },
      
      // Update attempt data (for things like totalScore, isCompleted, etc.)
      updateAttemptData: (updates) => {
        set((state) => ({
          attemptData: {
            ...state.attemptData,
            ...updates,
          },
        }));
      },
      
      // Quiz progress state
      selectedAnswers: {},
      currentQuestionIndex: 0,
      isQuizComplete: false,
      
      // Progress actions
      setSelectedAnswers: (answers) => {
        set({ selectedAnswers: answers });
      },
      
      updateSelectedAnswer: (questionIndex, answerId) => {
        set((state) => ({
          selectedAnswers: {
            ...state.selectedAnswers,
            [questionIndex]: answerId,
          },
        }));
      },
      
      setCurrentQuestionIndex: (index) => {
        set({ currentQuestionIndex: index });
      },
      
      setIsQuizComplete: (isComplete) => {
        set({ isQuizComplete: isComplete });
        
        // Update attempt data when quiz is completed
        if (isComplete) {
          set((state) => ({
            attemptData: {
              ...state.attemptData,
              isCompleted: true,
              completedAt: new Date().toISOString(),
            },
          }));
        }
      },
      
      // Reset quiz state
      resetQuizState: () => {
        set({
          currentQuizAttempt: null,
          quizAttemptId: null,
          attemptData: null,
          timeLimit: null,
          learningContentId: null,
          selectedAnswers: {},
          currentQuestionIndex: 0,
          isQuizComplete: false,
        });
      },
      
      // Clear only attempt data (keep progress for resume)
      clearQuizAttempt: () => {
        set({
          currentQuizAttempt: null,
          quizAttemptId: null,
          attemptData: null,
          timeLimit: null,
          learningContentId: null,
        });
      },
      
      // Get quiz attempt summary
      getAttemptSummary: () => {
        const state = get();
        return {
          attemptId: state.quizAttemptId,
          learningContentId: state.learningContentId,
          startedAt: state.attemptData?.startedAt,
          isCompleted: state.attemptData?.isCompleted || state.isQuizComplete,
          totalScore: state.attemptData?.totalScore,
          totalPossibleScore: state.attemptData?.totalPossibleScore,
          answeredQuestions: Object.keys(state.selectedAnswers).length,
        };
      },
    }),
    {
      name: 'quiz-storage', // localStorage key
      partialize: (state) => ({
        // Only persist essential data
        quizAttemptId: state.quizAttemptId,
        attemptData: state.attemptData,
        timeLimit: state.timeLimit,
        learningContentId: state.learningContentId,
        selectedAnswers: state.selectedAnswers,
        currentQuestionIndex: state.currentQuestionIndex,
        isQuizComplete: state.isQuizComplete,
      }),
    }
  )
);

export default useQuizStore;