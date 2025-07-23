import { useState, useEffect } from "react";
import { X, Plus, Trash2, Image as ImageIcon, Save, ArrowRight } from "lucide-react";
import { useGamificationForm } from "@/hooks/Gamification/use-gamification-form";
import { useGamification } from "@/hooks/Gamification/use-gamification";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TailwindStyle } from "@/utils/Enum";
import ImageUploader from "@/components/elements/image-uploader/img-upload";

export const MatchingModal = ({ isOpen, onClose, selectedChallenge = null }) => {
  // Use the gamification form hooks
  const { useArtworkForm, useArtworkDetailForm } = useGamificationForm();
  const { form: artworkForm, onSubmit: submitArtwork, isLoading: artworkLoading } = useArtworkForm();
  const { form: detailForm, onSubmit: submitDetails, isLoading: detailLoading } = useArtworkDetailForm();

  // Use gamification hooks
  const { getArtworkByChallenge } = useGamification();

  // Local states
  const [currentStep, setCurrentStep] = useState("artwork");
  const [artworkCount, setArtworkCount] = useState(1);
  const [detailCount, setDetailCount] = useState(1);
  const [selectedImages, setSelectedImages] = useState({});

  // Fetch artworks when in details step
  const challengeId = selectedChallenge?.id || selectedChallenge?.challengeId || 0;
  const { 
    data: artworksResponse, 
    isLoading: artworksLoading, 
    error: artworksError,
    refetch: refetchArtworks 
  } = getArtworkByChallenge(challengeId);

  const artworks = artworksResponse?.data || [];

  // Watch form values
  const artworkValues = artworkForm.watch();
  const detailValues = detailForm.watch();

  // Helper function to create a new artwork object
  const createNewArtwork = () => ({
    image: "",
    title: "",
    challengeId: challengeId,
  });

  // Helper function to create a new artwork detail object
  const createNewArtworkDetail = () => ({
    artist: "",
    period: "",
    year: "",
    artworkId: 0,
  });

  // Reset forms when modal opens
  useEffect(() => {
    if (isOpen && selectedChallenge) {
      setCurrentStep("artwork");
      setArtworkCount(1);
      setDetailCount(1);
      setSelectedImages({});
      
      // Reset artwork form
      artworkForm.reset([createNewArtwork()]);

      // Reset detail form
      detailForm.reset([createNewArtworkDetail()]);
    }
  }, [isOpen, selectedChallenge, artworkForm, detailForm]);

  // Add artwork
  const addArtwork = () => {
    const currentValues = artworkForm.getValues();
    
    // Ensure currentValues is an array
    const safeCurrentValues = Array.isArray(currentValues) ? currentValues : [];
    
    const newValues = [
      ...safeCurrentValues,
      createNewArtwork()
    ];
    
    setArtworkCount(prev => prev + 1);
    artworkForm.reset(newValues);
  };

  // Remove artwork
  const removeArtwork = (index) => {
    const currentValues = artworkForm.getValues();
    
    // Ensure currentValues is an array
    const safeCurrentValues = Array.isArray(currentValues) ? currentValues : [];
    
    if (safeCurrentValues.length > 1) {
      const newValues = safeCurrentValues.filter((_, i) => i !== index);
      setArtworkCount(prev => prev - 1);
      artworkForm.reset(newValues);
      
      // Remove associated image
      const newImages = { ...selectedImages };
      delete newImages[index];
      // Reindex remaining images
      const reindexedImages = {};
      Object.keys(newImages).forEach((key) => {
        const keyIndex = parseInt(key);
        if (keyIndex > index) {
          reindexedImages[keyIndex - 1] = newImages[key];
        } else if (keyIndex < index) {
          reindexedImages[key] = newImages[key];
        }
      });
      setSelectedImages(reindexedImages);
    }
  };

  // Add artwork detail
  const addDetail = () => {
    const currentValues = detailForm.getValues();
    
    // Ensure currentValues is an array
    const safeCurrentValues = Array.isArray(currentValues) ? currentValues : [];
    
    const newValues = [
      ...safeCurrentValues,
      createNewArtworkDetail()
    ];
    
    setDetailCount(prev => prev + 1);
    detailForm.reset(newValues);
  };

  // Remove artwork detail
  const removeDetail = (index) => {
    const currentValues = detailForm.getValues();
    
    // Ensure currentValues is an array
    const safeCurrentValues = Array.isArray(currentValues) ? currentValues : [];
    
    if (safeCurrentValues.length > 1) {
      const newValues = safeCurrentValues.filter((_, i) => i !== index);
      setDetailCount(prev => prev - 1);
      detailForm.reset(newValues);
    }
  };

  // Handle image selection for specific artwork
  const handleImageSelect = (index, images) => {
    if (images.length > 0) {
      const imageUrl = images[0].preview;
      setSelectedImages(prev => ({
        ...prev,
        [index]: images[0]
      }));
      
      // Update form value
      artworkForm.setValue(`${index}.image`, imageUrl);
    } else {
      // Handle image clearing
      setSelectedImages(prev => {
        const newImages = { ...prev };
        delete newImages[index];
        return newImages;
      });
      
      // Update form value
      artworkForm.setValue(`${index}.image`, "");
    }
  };

  // Handle artwork submission
  const handleArtworkSubmit = async (data) => {
    try {
      console.log("Submitting artwork data:", data);
      
      // Process data with images and ensure challengeId is present
      const processedData = data.map((artwork, index) => ({
        ...artwork,
        image: selectedImages[index]?.preview || artwork.image,
        challengeId: artwork.challengeId || challengeId
      }));
      
      console.log("Processed artwork data:", processedData);
      
      const result = await submitArtwork(processedData);
      console.log("Artwork creation result:", result);
      
      // Move to details step and refetch artworks
      setCurrentStep("details");
      await refetchArtworks();
    } catch (error) {
      console.error("Failed to create artworks:", error);
    }
  };

  // Handle detail submission
  const handleDetailSubmit = async (data) => {
    try {
      console.log("Submitting detail data:", data);
      
      const result = await submitDetails(data);
      console.log("Detail creation result:", result);
      
      onClose();
    } catch (error) {
      console.error("Failed to create artwork details:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                  Challenge: <span className="font-medium">{selectedChallenge.name}</span>
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

        {/* Debug Panel */}
        <div className="mb-4 p-3 bg-gray-100 rounded text-xs">
          <p><strong>Debug Info:</strong></p>
          <p>Current Step: {currentStep}</p>
          <p>Challenge ID: {challengeId}</p>
          <p>Artwork count: {artworkCount}</p>
          <p>Detail count: {detailCount}</p>
          <p>Fetched artworks count: {artworks.length}</p>
          <p>Artworks loading: {artworksLoading ? "Yes" : "No"}</p>
          <p>Selected images count: {Object.keys(selectedImages).length}</p>
          <p>Artwork form values: {JSON.stringify(artworkValues)}</p>
          <p>Detail form values: {JSON.stringify(detailValues)}</p>
          <p>Fetched artworks: {JSON.stringify(artworks.map(art => ({ id: art.id || art.artworkId, title: art.title })))}</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentStep === "artwork" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
            }`}>
              <span className="font-medium">1. Create Artworks ({artworkCount})</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentStep === "details" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
            }`}>
              <span className="font-medium">2. Add Details ({detailCount})</span>
            </div>
          </div>
        </div>

        {/* Artwork Step */}
        {currentStep === "artwork" && (
          <form onSubmit={artworkForm.handleSubmit(handleArtworkSubmit)} className="space-y-6">
            <div className="space-y-6">
              {Array.from({ length: artworkCount }, (_, index) => (
                <div
                  key={`artwork-${index}`}
                  className="border border-gray-200 rounded-lg p-6 bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Artwork {index + 1}
                    </h3>
                    {artworkCount > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArtwork(index)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Artwork Image *
                      </label>
                      <ImageUploader
                        onImageSelect={(images) => handleImageSelect(index, images)}
                        maxFiles={1}
                        compact={true}
                        gridCols="grid-cols-1"
                        className="mb-4"
                      />
                      <input
                        type="hidden"
                        {...artworkForm.register(`${index}.image`, { required: "Image is required" })}
                      />
                      {artworkForm.formState.errors?.[index]?.image && (
                        <p className="text-red-500 text-xs mt-1">
                          {artworkForm.formState.errors[index].image.message}
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
                        {...artworkForm.register(`${index}.title`, { required: "Title is required" })}
                        className={artworkForm.formState.errors?.[index]?.title ? "border-red-500" : ""}
                      />
                      {artworkForm.formState.errors?.[index]?.title && (
                        <p className="text-red-500 text-xs mt-1">
                          {artworkForm.formState.errors[index].title.message}
                        </p>
                      )}

                      {/* Challenge ID (hidden) */}
                      <input
                        type="hidden"
                        {...artworkForm.register(`${index}.challengeId`, { valueAsNumber: true })}
                        value={challengeId}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Artwork Button */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={addArtwork}
                className="flex items-center space-x-2 border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Artwork</span>
              </Button>
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
                disabled={artworkLoading || !artworkForm.formState.isValid}
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

        {/* Details Step */}
        {currentStep === "details" && (
          <div className="space-y-6">
            {/* Loading state for artworks */}
            {artworksLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span>Loading artworks...</span>
                </div>
              </div>
            )}

            {/* Error state for artworks */}
            {artworksError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">Failed to load artworks. Please try again.</p>
                <button
                  onClick={() => refetchArtworks()}
                  className="mt-2 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Show form only if artworks are loaded */}
            {!artworksLoading && !artworksError && artworks.length > 0 && (
              <form onSubmit={detailForm.handleSubmit(handleDetailSubmit)} className="space-y-6">
                <div className="space-y-6">
                  {Array.from({ length: detailCount }, (_, index) => (
                    <div
                      key={`detail-${index}`}
                      className="border border-gray-200 rounded-lg p-6 bg-gray-50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Artwork Detail {index + 1}
                        </h3>
                        {detailCount > 1 && (
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
                        {/* Artist */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Artist *
                          </label>
                          <Input
                            placeholder="Enter artist name"
                            {...detailForm.register(`${index}.artist`, { required: "Artist is required" })}
                            className={detailForm.formState.errors?.[index]?.artist ? "border-red-500" : ""}
                          />
                          {detailForm.formState.errors?.[index]?.artist && (
                            <p className="text-red-500 text-xs mt-1">
                              {detailForm.formState.errors[index].artist.message}
                            </p>
                          )}
                        </div>

                        {/* Period */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Period *
                          </label>
                          <Input
                            placeholder="Enter period (e.g., Renaissance)"
                            {...detailForm.register(`${index}.period`, { required: "Period is required" })}
                            className={detailForm.formState.errors?.[index]?.period ? "border-red-500" : ""}
                          />
                          {detailForm.formState.errors?.[index]?.period && (
                            <p className="text-red-500 text-xs mt-1">
                              {detailForm.formState.errors[index].period.message}
                            </p>
                          )}
                        </div>

                        {/* Year */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Year *
                          </label>
                          <Input
                            placeholder="Enter year (e.g., 1503)"
                            {...detailForm.register(`${index}.year`, { required: "Year is required" })}
                            className={detailForm.formState.errors?.[index]?.year ? "border-red-500" : ""}
                          />
                          {detailForm.formState.errors?.[index]?.year && (
                            <p className="text-red-500 text-xs mt-1">
                              {detailForm.formState.errors[index].year.message}
                            </p>
                          )}
                        </div>

                        {/* Artwork ID Selector */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select Artwork *
                          </label>
                          <select
                            {...detailForm.register(`${index}.artworkId`, { 
                              required: "Artwork selection is required",
                              valueAsNumber: true 
                            })}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              detailForm.formState.errors?.[index]?.artworkId ? "border-red-500" : "border-gray-300"
                            }`}
                          >
                            <option value="">Select artwork</option>
                            {artworks.map((artwork) => (
                              <option 
                                key={artwork.id || artwork.artworkId} 
                                value={artwork.id || artwork.artworkId}
                              >
                                {artwork.title} (ID: {artwork.id || artwork.artworkId})
                              </option>
                            ))}
                          </select>
                          {detailForm.formState.errors?.[index]?.artworkId && (
                            <p className="text-red-500 text-xs mt-1">
                              {detailForm.formState.errors[index].artworkId.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Detail Button */}
                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addDetail}
                    className="flex items-center space-x-2 border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Another Detail</span>
                  </Button>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep("artwork")}
                    disabled={detailLoading}
                  >
                    Back to Artworks
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

            {/* No artworks state */}
            {!artworksLoading && !artworksError && artworks.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-500 text-lg mb-4">
                  No artworks found for this challenge.
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  You need to create artworks first before adding details.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep("artwork")}
                >
                  Back to Create Artworks
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};