import React, { useState, useEffect } from "react";
import {
  X,
  Loader2,
  Award,
  AlertCircle,
} from "lucide-react";
import { useCertificate } from "@/hooks/Certificate/use-certificate";
import { Button } from "@/components/ui/button";
import { useToast } from "@/utils/Toast";
import ImageUploader from "@/components/elements/image-uploader/img-upload";

export default function CertificateModal({
  isOpen,
  onClose,
  selectedCourseId,
}) {
  const { createCustomCertificate, isCreatingCustomCertificate } = useCertificate();
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    CertificateImage: null,
    CourseId: selectedCourseId || null,
  });
  
  // UI state
  const [errors, setErrors] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);

  // Update course ID when prop changes
  useEffect(() => {
    if (selectedCourseId) {
      setFormData(prev => ({
        ...prev,
        CourseId: selectedCourseId
      }));
    }
  }, [selectedCourseId]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        CertificateImage: null,
        CourseId: selectedCourseId || null,
      });
      setSelectedImages([]);
      setErrors({});
    }
  }, [isOpen, selectedCourseId]);

  // Handle image selection from ImageUploader
  const handleImageSelect = (images) => {
    console.log("📸 Images selected:", images);
    setSelectedImages(images);
    
    // Update form data with the first (and only) image file
    if (images.length > 0) {
      setFormData(prev => ({
        ...prev,
        CertificateImage: images[0].file // Use the actual File object
      }));
      setErrors(prev => ({ ...prev, image: null })); // Clear image error
    } else {
      setFormData(prev => ({
        ...prev,
        CertificateImage: null
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.CertificateImage) {
      newErrors.image = 'Certificate image is required';
    }
    
    if (!formData.CourseId) {
      newErrors.courseId = 'Course ID is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("📜 Creating certificate with data:", {
        CertificateImage: formData.CertificateImage?.name,
        CourseId: formData.CourseId,
        FileSize: formData.CertificateImage?.size,
        FileType: formData.CertificateImage?.type
      });
      
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('CertificateImage', formData.CertificateImage);
      submitData.append('CourseId', formData.CourseId);

      // Log FormData contents
      for (let [key, value] of submitData.entries()) {
        console.log("📄 FormData:", key, value);
      }
      
      const result = await createCustomCertificate(submitData);
      
      console.log("✅ Certificate created successfully:", result);
      
      toast({
        title: "🎉 Certificate Created!",
        description: "The certificate has been created successfully.",
        variant: "success",
      });
      
      onClose();
    } catch (error) {
      console.error("❌ Failed to create certificate:", error);
      
      toast({
        title: "Creation Failed",
        description: error.response?.data?.message || "Failed to create certificate. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Create Certificate
                  </h3>
                  <p className="text-sm text-gray-600">
                    Course ID: {selectedCourseId}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white px-6 py-4">
            {/* Course ID Field (Read-only) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course ID
              </label>
              <input
                type="text"
                value={formData.CourseId || ''}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                placeholder="Course ID will be set automatically"
              />
              {errors.courseId && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.courseId}
                </p>
              )}
            </div>

            {/* Certificate Image Upload using ImageUploader */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificate Image <span className="text-red-500">*</span>
              </label>
              
              <ImageUploader
                onImageSelect={handleImageSelect}
                maxFiles={1} // Only allow 1 image
                maxSize={5 * 1024 * 1024} // 5MB
                acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
                gridCols="grid-cols-1" // Single column since we only allow 1 image
                compact={true} // Use compact mode for modal
                className="w-full"
              />
              
              {errors.image && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.image}
                </p>
              )}
            </div>

            {/* Selected Image Info */}
            {selectedImages.length > 0 && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-green-700">
                  <Award className="w-4 h-4" />
                  <span className="font-medium">Selected Certificate:</span>
                  <span>{selectedImages[0].name}</span>
                  <span className="text-green-600">
                    ({(selectedImages[0].size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isCreatingCustomCertificate}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isCreatingCustomCertificate || !formData.CertificateImage}
                className="flex-1 bg-primary-yellow hover:bg-secondary-yellow text-white"
              >
                {isCreatingCustomCertificate ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4 mr-2" />
                    Create Certificate
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}