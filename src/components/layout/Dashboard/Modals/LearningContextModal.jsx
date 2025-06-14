import { useState, useEffect } from "react";
import { X, Upload, Clock, FileText, Video } from "lucide-react";
import { useLearningForm } from "@/hooks/LearningContent/use-learning-form";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
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

export const LearningContextModal = ({
  isOpen,
  onClose,
  subModuleId,
  courseId,
}) => {
  const [timeLimitEnabled, setTimeLimitEnabled] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  const { form, onSubmit, isLoading } = useLearningForm({ 
    subModuleId,
    courseId 
  });

  // Set default values when component mounts
  useEffect(() => {
    if (form && subModuleId && courseId) {
      form.setValue('subModuleId', parseInt(subModuleId));
      form.setValue('courseId', parseInt(courseId));
      form.setValue('displayOrder', 1);
      form.setValue('timeLimit', null); // Initialize timeLimit
    }
  }, [form, subModuleId, courseId]);

  if (!isOpen) return null;

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(file);
      form.setValue('video', file);
    }
  };

  const handleTimeLimitToggle = (checked) => {
    setTimeLimitEnabled(checked);
    if (!checked) {
      // Clear the time limit when disabled
      form.setValue('timeLimit', null);
    } else {
      // Set a default value when enabled (30 minutes)
      form.setValue('timeLimit', '00:30');
    }
  };

  const handleSubmit = async (data) => {
    try {
      // Get all form values including timeLimit
      const formValues = form.getValues();
      
      console.log("All form values:", formValues);
      console.log("Time limit enabled:", timeLimitEnabled);
      console.log("Form timeLimit value:", formValues.timeLimit);
      
      // Prepare the final data with timeLimit as string
      const submitData = {
        title: data.title,
        content: data.content || null,
        timeLimit: timeLimitEnabled && formValues.timeLimit ? formValues.timeLimit : null,
        displayOrder: data.displayOrder || 1,
        subModuleId: parseInt(subModuleId),
        courseId: parseInt(courseId),
        video: selectedVideo,
      };
        
      console.log("Submitting Learning Context Data:", submitData);
      
      await onSubmit(submitData);
      onClose();
      form.reset();
      setSelectedVideo(null);
      setTimeLimitEnabled(false);
    } catch (error) {
      console.error('Error creating learning context:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Create Learning Context
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Sub-Module ID: {subModuleId} | Course ID: {courseId}
            </p>
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
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Title *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter learning context title..."
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content - Rich Text Editor */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Content</span>
                  </FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Enter your learning content here... Use the toolbar to format text, add lists, quotes, and more."
                      minHeight="300px"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Video Upload */}
            <FormField
              control={form.control}
              name="video"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Video className="w-4 h-4" />
                    <span>Video (Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <div className="text-center">
                        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <div className="text-sm text-gray-600 mb-2">
                          {selectedVideo ? (
                            <div>
                              <p className="font-medium">{selectedVideo.name}</p>
                              <p className="text-xs text-gray-500">
                                {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                          ) : (
                            <>
                              <p>Drop your video file here, or</p>
                              <label className="cursor-pointer text-blue-600 hover:text-blue-700">
                                browse to upload
                                <input
                                  type="file"
                                  accept="video/*"
                                  onChange={handleVideoChange}
                                  className="hidden"
                                />
                              </label>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          Supported formats: MP4, AVI, MOV, WMV, WebM (Max: 100MB)
                        </p>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Limit */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={timeLimitEnabled}
                  onCheckedChange={handleTimeLimitToggle}
                />
                <FormLabel className="flex items-center space-x-2 cursor-pointer">
                  <Clock className="w-4 h-4" />
                  <span>Set Time Limit</span>
                </FormLabel>
              </div>

              {timeLimitEnabled && (
                <FormField
                  control={form.control}
                  name="timeLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Time Limit (HH:MM)</span>
                      </FormLabel>
                      <FormControl>
                        <div className="max-w-xs space-y-2">
                          <Input
                            type="time"
                            placeholder="02:00"
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value || null);
                            }}
                            className="text-lg font-mono"
                            step="60"
                          />
                          <p className="text-xs text-gray-500">
                            Set the time limit for this learning context (e.g., 02:30 for 2 hours 30 minutes)
                          </p>
                          {/* Debug info */}
                          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                            Current timeLimit: {JSON.stringify(field.value)}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Display Order */}
            <FormField
              control={form.control}
              name="displayOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="1"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hidden Fields */}
            <FormField
              control={form.control}
              name="subModuleId"
              render={({ field }) => (
                <input type="hidden" {...field} value={parseInt(subModuleId)} />
              )}
            />
            
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <input type="hidden" {...field} value={parseInt(courseId)} />
              )}
            />

            {/* Debug Button - Remove in production */}
            <div className="border-t pt-4">
              <Button
                type="button"
                onClick={() => {
                  console.log("Current form values:", form.getValues());
                  console.log("Form errors:", form.formState.errors);
                  console.log("Time limit enabled:", timeLimitEnabled);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Debug Form Values
              </Button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
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
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Creating..." : "Create Learning Context"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};