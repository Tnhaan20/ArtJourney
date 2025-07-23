import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useCourseForm } from "@/hooks/Courses/use-course-form";
import { useHistoricalPeriods } from "@/hooks/Historical/use-historical";
import { useRegion } from "@/hooks/Regions/use-regions";
import { TailwindStyle } from "@/utils/Enum";
import { X, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import ImageUploader from "@/components/elements/image-uploader/img-upload";

export default function CourseModal({
  course,
  onClose,
  onCreateHistoricalPeriod,
}) {
  const { form, onSubmit, isLoading } = useCourseForm();
  const { getRegionQuery } = useRegion();
  const { getAllHistoricalPeriodsQuery } = useHistoricalPeriods();

  // State for images
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  // State for learning outcomes
  const [learningOutcomes, setLearningOutcomes] = useState([
    { id: 1, value: "" },
  ]);

  // Safe data extraction
  const regions = getRegionQuery?.data?.data?.items || [];
  const isLoadingRegions = getRegionQuery?.isLoading;

  const historicalPeriods =
    getAllHistoricalPeriodsQuery?.data?.data?.items || [];
  const isLoadingHistoricalPeriods = getAllHistoricalPeriodsQuery?.isLoading;

  // Updated options according to API spec
  const levelOptions = [
    { value: 0, label: "Beginner" },
    { value: 1, label: "Intermediate" },
    { value: 2, label: "Advanced" },
  ];

  const statusOptions = [
    { value: "0", label: "Draft" },
    { value: "1", label: "Published" },
    { value: "2", label: "Archived" },
  ];

  const premiumOptions = [
    { value: "0", label: "Free" },
    { value: "1", label: "Premium" },
  ];

  // Handle thumbnail image selection
  const handleThumbnailSelect = (images) => {
    if (images.length > 0) {
      setThumbnailImage(images[0]);
      form.setValue("ThumbnailImage", images[0].file);
    }
  };

  // Handle cover image selection
  const handleCoverSelect = (images) => {
    if (images.length > 0) {
      setCoverImage(images[0]);
      form.setValue("CoverImage", images[0].file);
    }
  };

  // Learning Outcomes handlers
  const addLearningOutcome = () => {
    const newId = Math.max(...learningOutcomes.map((lo) => lo.id)) + 1;
    setLearningOutcomes([...learningOutcomes, { id: newId, value: "" }]);
  };

  const removeLearningOutcome = (id) => {
    if (learningOutcomes.length > 1) {
      setLearningOutcomes(learningOutcomes.filter((lo) => lo.id !== id));
      updateLearningOutcomesFormValue(
        learningOutcomes.filter((lo) => lo.id !== id)
      );
    }
  };

  const updateLearningOutcome = (id, value) => {
    const updated = learningOutcomes.map((lo) =>
      lo.id === id ? { ...lo, value } : lo
    );
    setLearningOutcomes(updated);
    updateLearningOutcomesFormValue(updated);
  };

  const updateLearningOutcomesFormValue = (outcomes) => {
    // Convert to JSON string format as required by API
    const outcomeObject = {};
    outcomes.forEach((outcome, index) => {
      if (outcome.value.trim()) {
        outcomeObject[`oc${index + 1}`] = outcome.value.trim();
      }
    });
    form.setValue("LearningOutcomes", JSON.stringify(outcomeObject));
  };

  // Handle form submit
  const handleFormSubmit = async (data) => {
   
    const isValid = await form.trigger();

    if (!isValid) {
      return;
    }

    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
    }
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();


    const formData = form.getValues();
    await handleFormSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-[#1b1919b9] bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Make modal scrollable when content overflows */}
      <div className="bg-primary-white rounded-xl w-full max-w-7xl max-h-[95vh] flex flex-col overflow-hidden">
        {/* Header - Always visible */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-primary-black">
            {course ? "Edit Course" : "Create New Course"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-primary-black"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content - Scrollable when needed */}
        <div className="flex-1 overflow-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="h-full"
            >
              {/* Content Area */}
              <div className="p-6">
                {/* Responsive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Images */}
                  <div className="order-2 lg:order-1">
                    <div className="space-y-6">
                      {/* Thumbnail Image */}
                      <div>
                        <h3 className="text-lg font-semibold text-primary-black mb-4">
                          Thumbnail Image{" "}
                          <span className="text-red-500">*</span>
                        </h3>
                        <ImageUploader
                          onImageSelect={handleThumbnailSelect}
                          maxFiles={1}
                          maxSize={5 * 1024 * 1024}
                          acceptedTypes={[
                            "image/jpeg",
                            "image/png",
                            "image/gif",
                            "image/webp",
                          ]}
                          gridCols="grid-cols-1"
                          compact={true}
                        />
                      </div>

                      {/* Cover Image */}
                      <div>
                        <h3 className="text-lg font-semibold text-primary-black mb-4">
                          Cover Image
                        </h3>
                        <ImageUploader
                          onImageSelect={handleCoverSelect}
                          maxFiles={1}
                          maxSize={5 * 1024 * 1024}
                          acceptedTypes={[
                            "image/jpeg",
                            "image/png",
                            "image/gif",
                            "image/webp",
                          ]}
                          gridCols="grid-cols-1"
                          compact={true}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Form Fields */}
                  <div className="order-1 lg:order-2">
                    <div className="space-y-6">
                      {/* Title */}
                      <div>
                        <label className="block text-sm font-medium text-primary-black mb-2">
                          Course Name <span className="text-red-500">*</span>
                        </label>
                        <FormField
                          control={form.control}
                          name="Title"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <input
                                  type="text"
                                  placeholder="e.g., Leang Karampuang Art"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-primary-black mb-2">
                          Course Description{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <FormField
                          control={form.control}
                          name="Description"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <textarea
                                  placeholder="This is Leang Karampuang Art course"
                                  rows={4}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Level and Status */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-primary-black mb-2">
                            Course Level <span className="text-red-500">*</span>
                          </label>
                          <FormField
                            control={form.control}
                            name="Level"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                                    {...field}
                                  >
                                    <option value="">Select Level</option>
                                    {levelOptions.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-primary-black mb-2">
                            Course Status{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <FormField
                            control={form.control}
                            name="Status"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                                    {...field}
                                  >
                                    <option value="">Select Status</option>
                                    {statusOptions.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Historical Period and Region */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-primary-black">
                              Historical Period{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onCreateHistoricalPeriod();
                              }}
                              className="text-primary-yellow hover:text-secondary-yellow text-sm flex items-center gap-1"
                            >
                              <Plus className="w-4 h-4" />
                              Add New
                            </button>
                          </div>
                          <FormField
                            control={form.control}
                            name="HistoricalPeriodId"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                                    disabled={isLoadingHistoricalPeriods}
                                    {...field}
                                  >
                                    <option value="">
                                      {isLoadingHistoricalPeriods
                                        ? "Loading..."
                                        : "Select Historical Period"}
                                    </option>
                                    {Array.isArray(historicalPeriods) &&
                                      historicalPeriods.map((period) => (
                                        <option
                                          key={period.historicalPeriodId}
                                          value={period.historicalPeriodId.toString()}
                                        >
                                          {period.historicalPeriodName} (
                                          {period.startYear} - {period.endYear})
                                        </option>
                                      ))}
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-primary-black mb-2">
                            Region <span className="text-red-500">*</span>
                          </label>
                          <FormField
                            control={form.control}
                            name="RegionId"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                                    disabled={isLoadingRegions}
                                    {...field}
                                  >
                                    <option value="">
                                      {isLoadingRegions
                                        ? "Loading regions..."
                                        : "Select Region"}
                                    </option>
                                    {Array.isArray(regions) &&
                                      regions.map((region) => (
                                        <option
                                          key={region.regionId}
                                          value={region.regionId.toString()}
                                        >
                                          {region.regionName}
                                        </option>
                                      ))}
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Learning Outcomes - Dynamic */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <label className="block text-sm font-medium text-primary-black">
                            Learning Outcomes{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <button
                            type="button"
                            onClick={addLearningOutcome}
                            className="text-primary-yellow hover:text-secondary-yellow text-sm flex items-center gap-1"
                          >
                            <Plus className="w-4 h-4" />
                            Add Learning Outcome
                          </button>
                        </div>

                        <div className="space-y-3">
                          {learningOutcomes.map((outcome, index) => (
                            <div
                              key={outcome.id}
                              className="flex items-start gap-3"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-medium text-gray-500">
                                    Outcome {index + 1}
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  placeholder={`Enter learning outcome ${
                                    index + 1
                                  }`}
                                  value={outcome.value}
                                  onChange={(e) =>
                                    updateLearningOutcome(
                                      outcome.id,
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow text-sm"
                                />
                              </div>

                              {learningOutcomes.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeLearningOutcome(outcome.id)
                                  }
                                  className="mt-6 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Remove this learning outcome"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>

                        <p className="text-xs text-gray-500 mt-2">
                          Add multiple learning outcomes to describe what
                          students will achieve
                        </p>

                        {/* Hidden FormField for LearningOutcomes */}
                        <FormField
                          control={form.control}
                          name="LearningOutcomes"
                          render={({ field }) => (
                            <FormItem className="hidden">
                              <FormControl>
                                <input type="hidden" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Duration and Premium Status */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-primary-black mb-2">
                            Estimated Duration{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <FormField
                            control={form.control}
                            name="EstimatedDuration"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <input
                                    type="text"
                                    placeholder="03:00:00"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                                <p className="text-xs text-gray-500 mt-1">
                                  Format: HH:mm:ss
                                </p>
                              </FormItem>
                            )}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-primary-black mb-2">
                            Premium Status{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <FormField
                            control={form.control}
                            name="IsPremium"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                                    {...field}
                                  >
                                    <option value="">Select Type</option>
                                    {premiumOptions.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Add bottom padding to ensure buttons are not hidden */}
                      <div className="pb-20 lg:pb-0"></div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>

        {/* Footer - Sticky at bottom */}
        <div className="sticky bottom-0 bg-primary-white border-t border-gray-200 p-6 flex-shrink-0">
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg transition-colors hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={isLoading}
              onClick={handleSubmitClick}
              className={`px-4 py-2 transition-colors cursor-pointer z-50 ${TailwindStyle.HIGHLIGHT_FRAME} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? "Saving..." : "Save Course"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
