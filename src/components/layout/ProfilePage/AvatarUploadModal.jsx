import React, { useState } from 'react';
import { X, Camera } from 'lucide-react';
import ImageUploader from '@/components/elements/image-uploader/img-upload';
import { Button } from '@/components/ui/button';
import { TailwindStyle } from '@/utils/Enum';

export default function AvatarUploadModal({ 
  isOpen, 
  onClose, 
  onSave, 
  isLoading = false,
  currentAvatarUrl = null 
}) {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageSelect = (images) => {
    setSelectedImages(images);
  };

  const handleSave = async () => {
    if (selectedImages.length > 0) {
      await onSave(selectedImages[0].file); // Pass the file object
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedImages([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000056] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4 text-yellow-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Update Profile Picture
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Current Avatar Preview */}
          {currentAvatarUrl && selectedImages.length === 0 && (
            <div className="text-center mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Current Avatar</h3>
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-100">
                <img
                  src={currentAvatarUrl}
                  alt="Current avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Image Uploader */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">
              {selectedImages.length > 0 ? 'New Avatar Preview' : 'Choose New Avatar'}
            </h3>
            
            <ImageUploader
              onImageSelect={handleImageSelect}
              maxFiles={1}
              maxSize={5 * 1024 * 1024} // 5MB
              acceptedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
              gridCols="grid-cols-1"
              compact={true}
              showUploadArea={selectedImages.length === 0}
            />
          </div>

          {/* Instructions */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>Tips:</strong> For best results, use a square image (1:1 ratio) with a minimum size of 200x200 pixels. 
              Supported formats: JPEG, PNG, GIF, WebP. Maximum file size: 5MB.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="px-4 py-2"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isLoading || selectedImages.length === 0}
            className={`px-4 py-2 ${TailwindStyle.HIGHLIGHT_FRAME} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? "Updating..." : "Update Avatar"}
          </Button>
        </div>
      </div>
    </div>
  );
}