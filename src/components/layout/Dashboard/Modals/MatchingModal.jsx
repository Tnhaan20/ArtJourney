import { useState, useEffect } from "react";
import {
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  Save,
  ArrowRight,
} from "lucide-react";
import { useGamificationForm } from "@/hooks/Gamification/use-gamification-form";
import { useGamification } from "@/hooks/Gamification/use-gamification";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TailwindStyle } from "@/utils/Enum";
import ImageUploader from "@/components/elements/image-uploader/img-upload";

export const MatchingModal = ({
  isOpen,
  onClose,
  selectedChallenge = null,
}) => {
  // Use the gamification form hooks
  const { useArtworkForm, useArtworkDetailForm } = useGamificationForm();
  const {
    form: artworkForm,
    onSubmit: submitArtwork,
    isLoading: artworkLoading,
  } = useArtworkForm();
  const {
    form: detailForm,
    onSubmit: submitDetails,
    isLoading: detailLoading,
  } = useArtworkDetailForm();

  // Use gamification hooks
  const { getArtworkByChallenge } = useGamification();

  // Helper function to create a new artwork detail object
  const createNewArtworkDetail = () => ({
    artist: "",
    period: "",
    year: "",
    artworkId: 0,
  });

  // Helper function to create a new artwork object
  const createNewArtwork = () => {
    const challengeId = selectedChallenge?.id || selectedChallenge?.challengeId || 0;
    const newArtwork = {
      Image: null,
      Title: "",
      ChallengeId: challengeId,
    };
    return newArtwork;
  };

  // Local states
  const [currentStep, setCurrentStep] = useState("artwork");
  const [detailForms, setDetailForms] = useState([createNewArtworkDetail()]);
  const [selectedImages, setSelectedImages] = useState({});

  // Fetch artworks when in details step
  const challengeId =
    selectedChallenge?.id || selectedChallenge?.challengeId || 0;
  const {
    data: artworksResponse,
    isLoading: artworksLoading,
    error: artworksError,
    refetch: refetchArtworks,
  } = getArtworkByChallenge(challengeId);

  const artworks = artworksResponse?.data || [];

  // Watch form values
  const artworkValues = artworkForm.watch();
  const detailValues = detailForm.watch();

  // Reset forms when modal opens
  useEffect(() => {
    if (isOpen && selectedChallenge) {
      setCurrentStep("artwork");
      setDetailForms([createNewArtworkDetail()]);
      setSelectedImages({});

      // Reset artwork form with single artwork object
      const newArtwork = createNewArtwork();
      artworkForm.reset(newArtwork);

      // Reset detail form with initial detail
      detailForm.reset([createNewArtworkDetail()]);
    }
  }, [isOpen, selectedChallenge, challengeId, artworkForm, detailForm]);

  // Set challenge ID when form resets
  useEffect(() => {
    if (challengeId && artworkForm) {
      artworkForm.setValue("ChallengeId", challengeId, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [challengeId, artworkForm]);

  // Handle image selection for artwork
  const handleImageSelect = (images) => {
    if (images.length > 0) {
      const imageData = images[0]; // This is the image object from ImageUploader
      const imageFile = imageData.file; // Extract the actual File object

      // Validate it's actually a File
      if (!(imageFile instanceof File)) {
        return;
      }

      setSelectedImages({ 0: imageFile });

      // Update form value with the actual file object
      artworkForm.setValue("Image", imageFile, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      // Handle image clearing
      setSelectedImages({});

      // Update form value and trigger validation
      artworkForm.setValue("Image", null, {
        shouldValidate: true,
        shouldDirty: true,
      });
      artworkForm.clearErrors("Image");
    }
  };

  // Add artwork detail
  const addDetail = () => {
    // Get current form values to preserve user input
    const currentValues = detailForm.getValues();
    const safeCurrentValues = Array.isArray(currentValues) ? currentValues : [];
    
    // Add new detail to the existing values
    const newDetail = createNewArtworkDetail();
    const updatedForms = [...safeCurrentValues, newDetail];
    
    setDetailForms(updatedForms);
    detailForm.reset(updatedForms);
  };

  // Remove artwork detail
  const removeDetail = (index) => {
    if (detailForms.length > 1) {
      // Get current form values to preserve user input
      const currentValues = detailForm.getValues();
      const safeCurrentValues = Array.isArray(currentValues) ? currentValues : [];
      
      // Remove the detail at the specified index
      const updatedForms = safeCurrentValues.filter((_, i) => i !== index);
      
      setDetailForms(updatedForms);
      detailForm.reset(updatedForms);
    }
  };

  // Handle artwork submission
  const handleArtworkSubmit = async (data) => {
    try {
      // Get the actual file object
      const imageFile = data.Image || selectedImages[0];
      
      // Process single artwork with actual file and ensure challengeId is present
      const processedData = {
        ...data,
        Image: imageFile, // Use the actual file object
        ChallengeId: Number(data.ChallengeId) || challengeId,
      };

      const result = await submitArtwork(processedData);

      // Move to details step and refetch artworks
      setCurrentStep("details");
      await refetchArtworks();
    } catch (error) {
      console.error("Failed to create artwork:", error);
    }
  };

  // Handle detail submission
  const handleDetailSubmit = async (data) => {
    try {
      const result = await submitDetails(data);
      onClose();
    } catch (error) {
      console.error("Failed to create artwork details:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1b191983] flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ImageIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Configure Matching Challenge
              </h2>
              {selectedChallenge && (
                <p className="text-sm text-gray-600">
                  Challenge:{" "}
                  <span className="font-medium">{selectedChallenge.name}</span>
                  <span className="ml-2 text-xs">ID: {challengeId}</span>
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

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                currentStep === "artwork"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <span className="font-medium">1. Create Artwork</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                currentStep === "details"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <span className="font-medium">
                2. Add Details ({detailForms.length})
              </span>
            </div>
          </div>
        </div>

        {/* Artwork Step */}
        {currentStep === "artwork" && (
          <form
            onSubmit={artworkForm.handleSubmit(handleArtworkSubmit)}
            className="space-y-6"
          >
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Create Artwork
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Artwork Image *
                  </label>
                  <ImageUploader
                    onImageSelect={handleImageSelect}
                    maxFiles={1}
                    compact={true}
                    gridCols="grid-cols-1"
                    className="mb-4"
                  />

                  {/* Hidden input for image validation */}
                  <input
                    type="hidden"
                    {...artworkForm.register("Image", {
                      required: "Image is required",
                      validate: {
                        isFile: (value) => {
                          if (!value) return "Image is required";
                          if (!(value instanceof File)) return "Input not instance of File";
                          return true;
                        }
                      }
                    })}
                  />

                  {artworkForm.formState.errors?.Image && (
                    <p className="text-red-500 text-xs mt-1">
                      {artworkForm.formState.errors.Image.message}
                    </p>
                  )}
                </div>

                {/* Artwork Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Artwork Title *
                  </label>
                  <Input
                    placeholder="Enter artwork title"
                    {...artworkForm.register("Title", {
                      required: "Title is required",
                    })}
                    className={
                      artworkForm.formState.errors?.Title
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {artworkForm.formState.errors?.Title && (
                    <p className="text-red-500 text-xs mt-1">
                      {artworkForm.formState.errors.Title.message}
                    </p>
                  )}

                  {/* Challenge ID (hidden) */}
                  <input
                    type="hidden"
                    {...artworkForm.register("ChallengeId", {
                      valueAsNumber: true,
                      required: "Challenge ID is required",
                    })}
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={artworkLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={TailwindStyle.HIGHLIGHT_FRAME}
                disabled={false}
              >
                {artworkLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4" />
                    <span>Next: Add Details</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        )}

        {/* Details Step - Keep existing code */}
        {currentStep === "details" && (
          <div className="space-y-6">
            {/* ... Rest of the details step code remains the same ... */}
            {artworksLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span>Loading artworks...</span>
                </div>
              </div>
            )}

            {artworksError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">
                  Failed to load artworks. Please try again.
                </p>
                <button
                  onClick={() => refetchArtworks()}
                  className="mt-2 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            )}

            {!artworksLoading && !artworksError && artworks.length > 0 && (
              <form
                onSubmit={detailForm.handleSubmit(handleDetailSubmit)}
                className="space-y-6"
              >
                <div className="space-y-6">
                  {detailForms.map((_, index) => (
                    <div
                      key={`detail-${index}`}
                      className="border border-gray-200 rounded-lg p-6 bg-gray-50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Artwork Detail {index + 1}
                        </h3>
                        {detailForms.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDetail(index)}
                            className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Artist *
                          </label>
                          <Input
                            placeholder="Enter artist name"
                            {...detailForm.register(`${index}.artist`, {
                              required: "Artist is required",
                            })}
                            className={
                              detailForm.formState.errors?.[index]?.artist
                                ? "border-red-500"
                                : ""
                            }
                          />
                          {detailForm.formState.errors?.[index]?.artist && (
                            <p className="text-red-500 text-xs mt-1">
                              {
                                detailForm.formState.errors[index].artist
                                  .message
                              }
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Period *
                          </label>
                          <Input
                            placeholder="Enter period (e.g., Renaissance)"
                            {...detailForm.register(`${index}.period`, {
                              required: "Period is required",
                            })}
                            className={
                              detailForm.formState.errors?.[index]?.period
                                ? "border-red-500"
                                : ""
                            }
                          />
                          {detailForm.formState.errors?.[index]?.period && (
                            <p className="text-red-500 text-xs mt-1">
                              {
                                detailForm.formState.errors[index].period
                                  .message
                              }
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Year *
                          </label>
                          <Input
                            placeholder="Enter year (e.g., 1503)"
                            {...detailForm.register(`${index}.year`, {
                              required: "Year is required",
                            })}
                            className={
                              detailForm.formState.errors?.[index]?.year
                                ? "border-red-500"
                                : ""
                            }
                          />
                          {detailForm.formState.errors?.[index]?.year && (
                            <p className="text-red-500 text-xs mt-1">
                              {detailForm.formState.errors[index].year.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select Artwork *
                          </label>
                          <select
                            {...detailForm.register(`${index}.artworkId`, {
                              required: "Artwork selection is required",
                              valueAsNumber: true,
                            })}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              detailForm.formState.errors?.[index]?.artworkId
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            <option value="">Select artwork</option>
                            {artworks.map((artwork) => (
                              <option
                                key={artwork.id || artwork.artworkId}
                                value={artwork.id || artwork.artworkId}
                              >
                                {artwork.title} (ID:{" "}
                                {artwork.id || artwork.artworkId})
                              </option>
                            ))}
                          </select>
                          {detailForm.formState.errors?.[index]?.artworkId && (
                            <p className="text-red-500 text-xs mt-1">
                              {
                                detailForm.formState.errors[index].artworkId
                                  .message
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep("artwork")}
                    disabled={detailLoading}
                  >
                    Back to Artwork
                  </Button>
                  <Button
                    type="submit"
                    className={TailwindStyle.HIGHLIGHT_FRAME}
                    disabled={detailLoading || !detailForm.formState.isValid}
                  >
                    {detailLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Saving...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Save className="w-4 h-4" />
                        <span>Complete Setup</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {!artworksLoading && !artworksError && artworks.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-500 text-lg mb-4">
                  No artworks found for this challenge.
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  You need to create an artwork first before adding details.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep("artwork")}
                >
                  Back to Create Artwork
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
