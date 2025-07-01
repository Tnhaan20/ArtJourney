import { useState, useEffect } from "react";
import { X, HelpCircle, Plus, Trash2 } from "lucide-react";
import { useQuizForm } from "@/hooks/Quiz/use-quiz-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const QuizModal = ({
  isOpen,
  onClose,
  onBack,
  learningContentId,
}) => {
  const { form, onSubmit, isLoading } = useQuizForm();

  // Initialize with default question
  useEffect(() => {
    if (form && learningContentId) {
      const defaultQuestion = {
        questionText: "",
        questionType: "SingleChoice",
        points: 1,
        orderIndex: 0,
        learningContentId: parseInt(learningContentId),
        questionOptions: [
          { optionText: "", isCorrect: false, orderIndex: 0 },
          { optionText: "", isCorrect: false, orderIndex: 1 }
        ]
      };
      
      form.reset({ questions: [defaultQuestion] });
    }
  }, [form, learningContentId]);

  const questions = form.watch('questions') || [];

  const addQuestion = () => {
    const currentQuestions = form.getValues('questions') || [];
    const newQuestion = {
      questionText: "",
      questionType: "SingleChoice",
      points: 1,
      orderIndex: currentQuestions.length,
      learningContentId: parseInt(learningContentId),
      questionOptions: [
        { optionText: "", isCorrect: false, orderIndex: 0 },
        { optionText: "", isCorrect: false, orderIndex: 1 }
      ]
    };
    
    const updatedQuestions = [...currentQuestions, newQuestion];
    form.setValue('questions', updatedQuestions);
  };

  const removeQuestion = (index) => {
    const currentQuestions = form.getValues('questions') || [];
    if (currentQuestions.length > 1) {
      const updatedQuestions = currentQuestions
        .filter((_, i) => i !== index)
        .map((q, newIndex) => ({ ...q, orderIndex: newIndex }));
      form.setValue('questions', updatedQuestions);
    }
  };

  const addOption = (questionIndex) => {
    const currentQuestions = [...(form.getValues('questions') || [])];
    const question = currentQuestions[questionIndex];
    if (!question) return;

    const newOption = {
      optionText: "",
      isCorrect: false,
      orderIndex: question.questionOptions?.length || 0
    };
    
    currentQuestions[questionIndex] = {
      ...question,
      questionOptions: [...(question.questionOptions || []), newOption]
    };
    
    form.setValue('questions', currentQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const currentQuestions = [...(form.getValues('questions') || [])];
    const question = currentQuestions[questionIndex];
    
    if (question && question.questionOptions && question.questionOptions.length > 2) {
      const updatedOptions = question.questionOptions
        .filter((_, i) => i !== optionIndex)
        .map((opt, newIndex) => ({ ...opt, orderIndex: newIndex }));
      
      currentQuestions[questionIndex] = {
        ...question,
        questionOptions: updatedOptions
      };
      
      form.setValue('questions', currentQuestions);
    }
  };

  const handleSubmit = async (data) => {
    try {
      const questions = data.questions || [];
      
      if (questions.length === 0) {
        alert("Please add at least one question before submitting.");
        return;
      }

      // Validate each question manually
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        
        if (!question.questionText?.trim()) {
          alert(`Question ${i + 1} is missing question text.`);
          return;
        }
        
        if (!question.questionOptions || question.questionOptions.length < 2) {
          alert(`Question ${i + 1} needs at least 2 options.`);
          return;
        }

        const hasCorrectAnswer = question.questionOptions.some(opt => opt.isCorrect);
        if (!hasCorrectAnswer) {
          alert(`Question ${i + 1} must have at least one correct answer.`);
          return;
        }

        for (let j = 0; j < question.questionOptions.length; j++) {
          if (!question.questionOptions[j].optionText?.trim()) {
            alert(`Question ${i + 1}, Option ${j + 1} is missing text.`);
            return;
          }
        }
      }

      const result = await onSubmit(questions);
      alert("Quiz questions created successfully!");
      onClose();
      
    } catch (error) {
      console.error('Error creating quiz:', error);
      
      if (error.issues) {
        const errorMessages = error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`);
        alert(`Validation errors:\n${errorMessages.join('\n')}`);
      } else if (error.response) {
        alert(`Error: ${error.response.data.message || 'Failed to create quiz questions'}`);
      } else if (error.message) {
        alert(`Error: ${error.message}`);
      } else {
        alert('An unexpected error occurred while creating quiz questions.');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="mr-2"
              >
                ← Back
              </Button>
            )}
            <HelpCircle className="w-6 h-6 text-green-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Create Quiz Questions
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Learning Content ID: {learningContentId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-6">
            {/* Questions */}
            {questions.map((question, questionIndex) => (
              <Card key={`question-${questionIndex}`} className="p-6 border-2 border-gray-200">
                <CardHeader className="p-0 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Question {questionIndex + 1}
                    </CardTitle>
                    {questions.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeQuestion(questionIndex)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-0 space-y-4">
                  {/* Question Text */}
                  <FormField
                    control={form.control}
                    name={`questions.${questionIndex}.questionText`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question Text *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your question..."
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question Type and Points */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`questions.${questionIndex}.questionType`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="SingleChoice">Single Choice</SelectItem>
                              <SelectItem value="MultipleChoice">Multiple Choice</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`questions.${questionIndex}.points`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Points</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              placeholder="1"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-base font-medium">Answer Options</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addOption(questionIndex)}
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Option
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {(question.questionOptions || []).map((option, optionIndex) => (
                        <div key={`option-${questionIndex}-${optionIndex}`} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                          <FormField
                            control={form.control}
                            name={`questions.${questionIndex}.questionOptions.${optionIndex}.isCorrect`}
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                                  />
                                </FormControl>
                                <FormLabel className="text-sm text-gray-600 cursor-pointer">
                                  Correct
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`questions.${questionIndex}.questionOptions.${optionIndex}.optionText`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input
                                    placeholder={`Option ${optionIndex + 1}`}
                                    {...field}
                                    className="w-full"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          {(question.questionOptions || []).length > 2 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeOption(questionIndex, optionIndex)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add Question Button */}
            <div className="text-center">
              <Button
                type="button"
                variant="outline"
                onClick={addQuestion}
                className="w-full border-dashed border-2 py-8 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Another Question
              </Button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
              {onBack && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  disabled={isLoading}
                >
                  Back
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
             
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? "Creating..." : "Create Quiz Questions"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};