import { useEffect, useState } from "react";
import { X, Plus, Trash2, Trophy } from "lucide-react";
import { useGamificationForm } from "@/hooks/Gamification/use-gamification-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TailwindStyle } from "@/utils/Enum";

export const ChallengeModal = ({ isOpen, onClose, selectedCourse = null }) => {
  // Use the hook's challenge form directly
  const { useChallengeForm } = useGamificationForm();
  const { form, onSubmit, isLoading } = useChallengeForm();

  // Local state to manage challenge count
  const [challengeCount, setChallengeCount] = useState(1);

  // Watch the form values
  const formValues = form.watch();

  // Helper function to create a new challenge object
  const createNewChallenge = () => ({
    name: "",
    description: "",
    challengeType: "",
    durationSeconds: 300,
    courseId: selectedCourse?.id || 0,
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setChallengeCount(1);
      form.reset([createNewChallenge()]);
    }
  }, [isOpen, selectedCourse?.id, form]);

  // Add challenge
  const addChallenge = () => {
    const currentValues = form.getValues();
    
    // Ensure currentValues is an array
    const safeCurrentValues = Array.isArray(currentValues) ? currentValues : [];
    
    const newValues = [
      ...safeCurrentValues,
      createNewChallenge()
    ];
    
    setChallengeCount(prev => prev + 1);
    form.reset(newValues);
  };

  // Remove challenge
  const removeChallenge = (index) => {
    const currentValues = form.getValues();
    
    // Ensure currentValues is an array
    const safeCurrentValues = Array.isArray(currentValues) ? currentValues : [];
    
    if (safeCurrentValues.length > 1) {
      const newValues = safeCurrentValues.filter((_, i) => i !== index);
      setChallengeCount(prev => prev - 1);
      form.reset(newValues);
    }
  };

  // Challenge type options
  const challengeTypes = [
    { value: "Matching", label: "Matching Challenge" },
  ];

  // Duration options in seconds
  const durationOptions = [
    { value: 300, label: "5 minutes" },
    { value: 600, label: "10 minutes" },
    { value: 900, label: "15 minutes" },
    { value: 1800, label: "30 minutes" },
    { value: 3600, label: "1 hour" },
    { value: 7200, label: "2 hours" },
    { value: 86400, label: "24 hours" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1b1919b9] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Trophy className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Create Challenge{challengeCount > 1 ? "s" : ""}
              </h2>
              {selectedCourse && (
                <p className="text-sm text-gray-600">
                  Course:{" "}
                  <span className="font-medium">{selectedCourse.title}</span>
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Debug Panel
        <div className="mb-4 p-3 bg-gray-100 rounded text-xs">
          <p><strong>Debug Info:</strong></p>
          <p>Challenge count: {challengeCount}</p>
          <p>Form valid: {form.formState.isValid ? "Yes" : "No"}</p>
          <p>Form errors: {JSON.stringify(form.formState.errors)}</p>
          <p>Form values: {JSON.stringify(formValues)}</p>
          <p>Form values type: {Array.isArray(formValues) ? "Array" : typeof formValues}</p>
        </div> */}

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Challenge Cards */}
          <div className="space-y-6">
            {Array.from({ length: challengeCount }, (_, index) => (
              <div
                key={`challenge-${index}`}
                className="border border-gray-200 rounded-lg p-6 bg-gray-50"
              >
                {/* Challenge Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Challenge {index + 1}
                  </h3>
                  {challengeCount > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChallenge(index)}
                      className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Challenge Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Challenge Name *
                    </label>
                    <Input
                      placeholder="Enter challenge name"
                      {...form.register(`${index}.name`, {
                        required: "Challenge name is required",
                      })}
                      className={
                        form.formState.errors?.[index]?.name
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {form.formState.errors?.[index]?.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {form.formState.errors[index].name.message}
                      </p>
                    )}
                  </div>

                  {/* Challenge Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Challenge Type *
                    </label>
                    <select
                      {...form.register(`${index}.challengeType`, {
                        required: "Challenge type is required",
                      })}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        form.formState.errors?.[index]?.challengeType
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select challenge type</option>
                      {challengeTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {form.formState.errors?.[index]?.challengeType && (
                      <p className="text-red-500 text-xs mt-1">
                        {form.formState.errors[index].challengeType.message}
                      </p>
                    )}
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration *
                    </label>
                    <select
                      {...form.register(`${index}.durationSeconds`, {
                        required: "Duration is required",
                        valueAsNumber: true,
                      })}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        form.formState.errors?.[index]?.durationSeconds
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select duration</option>
                      {durationOptions.map((duration) => (
                        <option key={duration.value} value={duration.value}>
                          {duration.label}
                        </option>
                      ))}
                    </select>
                    {form.formState.errors?.[index]?.durationSeconds && (
                      <p className="text-red-500 text-xs mt-1">
                        {form.formState.errors[index].durationSeconds.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <Textarea
                    placeholder="Enter challenge description"
                    className={`min-h-[100px] ${
                      form.formState.errors?.[index]?.description
                        ? "border-red-500"
                        : ""
                    }`}
                    {...form.register(`${index}.description`, {
                      required: "Description is required",
                    })}
                  />
                  {form.formState.errors?.[index]?.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors[index].description.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Challenge Button */}
          <div className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={addChallenge}
              className="flex items-center space-x-2 border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Challenge</span>
            </Button>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
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
              className={TailwindStyle.HIGHLIGHT_FRAME}
              disabled={isLoading || !form.formState.isValid}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>Create Challenge{challengeCount > 1 ? "s" : ""}</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
