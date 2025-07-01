import { useState, useEffect } from "react";
import { X, HelpCircle, Clock, Hash, BookOpen } from "lucide-react";
import { useCreateQuizTitleForm } from "@/hooks/Quiz/use-quiz-form";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const QuizTitleModal = ({
  isOpen,
  onClose,
  onBack,
  onNext, // Function to proceed to quiz questions
  subModuleId,
  courseId,
}) => {
  const [timeLimitEnabled, setTimeLimitEnabled] = useState(false);
  const { form, onSubmit, isLoading } = useCreateQuizTitleForm();

  // Set default values when component mounts
  useEffect(() => {
    if (form && subModuleId && courseId) {
      form.setValue('subModuleId', parseInt(subModuleId));
      form.setValue('courseId', parseInt(courseId));
      form.setValue('contentType', 2); // Always 2 for quizzes
      form.setValue('displayOrder', 1);
    }
  }, [form, subModuleId, courseId]);

  if (!isOpen) return null;

  const handleTimeLimitToggle = (checked) => {
    setTimeLimitEnabled(checked);
    if (!checked) {
      form.setValue('timeLimit', "00:00:00");
    } else {
      form.setValue('timeLimit', "00:30:00"); // Default 30 minutes
    }
  };

  const handleSubmit = async (data) => {
    try {
      const submitData = {
        ...data,
        contentType: 2, // Always 2 for quizzes
        timeLimit: timeLimitEnabled ? data.timeLimit : "00:00:00",
        subModuleId: parseInt(subModuleId),
        courseId: parseInt(courseId),
      };
      
      console.log("Submitting Quiz Title Data:", submitData);
      
      // Submit quiz title first
      await onSubmit(submitData);
      
      // Then proceed to quiz questions if onNext is provided
      if (onNext) {
        onNext(submitData);
      } else {
        onClose();
      }
      
    } catch (error) {
      console.error('Error creating quiz title:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
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
                Create Quiz Title
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Set up your quiz details and settings
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

        {/* Content */}
        <div className="p-6">
          {/* Info Card */}
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <HelpCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-900 mb-1">Quiz Setup</h3>
                  <p className="text-sm text-green-700">
                    Configure your quiz title and basic settings. After this step, you'll be able to add questions and answers.
                  </p>
                  <div className="mt-2 text-xs text-green-600">
                    Sub-Module ID: {subModuleId} | Course ID: {courseId} | Content Type: Quiz (2)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Quiz Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-gray-600" />
                      <span>Quiz Title *</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter quiz title (e.g., 'Renaissance Art Knowledge Check')"
                        {...field}
                        className="text-lg py-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Display Order */}
              <FormField
                control={form.control}
                name="displayOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex items-center space-x-2">
                      <Hash className="w-4 h-4 text-gray-600" />
                      <span>Display Order</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        className="w-32"
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-gray-500">
                      Order in which this quiz appears in the sub-module
                    </p>
                  </FormItem>
                )}
              />

              {/* Time Limit Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="timeLimitEnabled"
                    checked={timeLimitEnabled}
                    onCheckedChange={handleTimeLimitToggle}
                    className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="timeLimitEnabled"
                    className="text-base font-medium flex items-center space-x-2 cursor-pointer"
                  >
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span>Set Time Limit</span>
                  </label>
                </div>

                {timeLimitEnabled && (
                  <FormField
                    control={form.control}
                    name="timeLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Limit (HH:MM:SS)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="00:30:00"
                            {...field}
                            className="w-48"
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-sm text-gray-500">
                          Format: Hours:Minutes:Seconds (e.g., 00:30:00 for 30 minutes)
                        </p>
                      </FormItem>
                    )}
                  />
                )}

                {!timeLimitEnabled && (
                  <div className="ml-6 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                    No time limit - students can take as much time as needed
                  </div>
                )}
              </div>

              {/* Summary Card */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-900">Quiz Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Content Type:</span>
                      <span className="ml-2 text-gray-600">Quiz (2)</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Course ID:</span>
                      <span className="ml-2 text-gray-600">{courseId}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Sub-Module ID:</span>
                      <span className="ml-2 text-gray-600">{subModuleId}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Time Limit:</span>
                      <span className="ml-2 text-gray-600">
                        {timeLimitEnabled ? form.watch('timeLimit') || '00:30:00' : 'No limit'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                  {isLoading ? "Creating..." : onNext ? "Next: Add Questions" : "Create Quiz Title"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};