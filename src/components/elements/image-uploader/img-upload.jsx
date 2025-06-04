import { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { TailwindStyle } from '@/utils/Enum';

export default function ImageUploader({ 
  onImageSelect, 
  maxFiles = 5, 
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  className = "",
  gridCols = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4", // Tùy biến grid columns
  showUploadArea = true, // Cho phép ẩn/hiện upload area
  compact = false // Chế độ compact cho layout nhỏ gọn
}) {
  const [dragActive, setDragActive] = useState(false);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const inputRef = useRef(null);

  const validateFile = (file) => {
    const errors = [];
    
    if (!acceptedTypes.includes(file.type)) {
      errors.push(`${file.name}: Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.`);
    }
    
    if (file.size > maxSize) {
      errors.push(`${file.name}: File too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`);
    }
    
    return errors;
  };

  const processFiles = useCallback((files) => {
    const fileArray = Array.from(files);
    const newErrors = [];
    const validFiles = [];

    if (images.length + fileArray.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} images allowed.`);
      setErrors(newErrors);
      return;
    }

    fileArray.forEach(file => {
      const fileErrors = validateFile(file);
      if (fileErrors.length > 0) {
        newErrors.push(...fileErrors);
      } else {
        validFiles.push(file);
      }
    });

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Process valid files
    const newImages = [];
    let processedCount = 0;
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = {
          id: Date.now() + Math.random(),
          file,
          preview: e.target.result,
          name: file.name,
          size: file.size
        };
        newImages.push(imageData);
        processedCount++;
        
        if (processedCount === validFiles.length) {
          const updatedImages = [...images, ...newImages];
          setImages(updatedImages);
          onImageSelect?.(updatedImages);
          setErrors([]);
        }
      };
      reader.readAsDataURL(file);
    });
  }, [images, maxFiles, maxSize, acceptedTypes, onImageSelect]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const removeImage = (id) => {
    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
    onImageSelect?.(updatedImages);
  };

  const clearAll = () => {
    setImages([]);
    setErrors([]);
    onImageSelect?.([]);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Upload Area - chỉ hiển thị khi showUploadArea = true */}
      {showUploadArea && (
        <div
          className={`
            relative border-2 border-dashed rounded-lg text-center transition-all duration-200
            ${compact ? "p-4" : "p-8"}
            ${
              dragActive
                ? "border-primary-yellow bg-yellow-50"
                : "border-gray-300 hover:border-primary-yellow hover:bg-gray-50"
            }
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(",")}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div
            className={`flex flex-col items-center ${
              compact ? "space-y-2" : "space-y-4"
            }`}
          >
            <div
              className={`${compact ? "p-2" : "p-4"} ${
                TailwindStyle.HIGHLIGHT_FRAME
              } bg-opacity-10 rounded-full`}
            >
              <Upload className={`${compact ? "w-6 h-6" : "w-8 h-8"} `} />
            </div>

            <div>
              <h3
                className={`${
                  compact ? "text-base" : "text-lg"
                } font-medium text-gray-900 mb-2`}
              >
                Drag & drop your images
              </h3>
              <p className="text-sm text-gray-500">
                or{" "}
                <span className="text-primary-yellow font-medium cursor-pointer hover:underline">
                  click to browse
                </span>{" "}
                (max {maxSize / (1024 * 1024)}MB per image)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <div
          className={`${
            showUploadArea ? "mt-4" : "mt-2"
          } p-3 bg-red-50 border border-red-200 rounded-lg`}
        >
          <ul className="text-sm text-red-600 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className={showUploadArea ? "mt-6" : "mt-4"}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-900">
              Selected Images ({images.length}/{maxFiles})
            </h4>
            <button
              type="button"
              onClick={clearAll}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Clear All
            </button>
          </div>

          <div className={`grid ${gridCols} gap-4`}>
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border">
                  <img
                    src={image.preview}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="mt-2 text-xs text-gray-500 truncate">
                  <p className="font-medium">{image.name}</p>
                  <p>{formatFileSize(image.size)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}