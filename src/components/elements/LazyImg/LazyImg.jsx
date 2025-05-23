import { useInView } from "react-intersection-observer";
import { useState } from "react";

function LazyImage({
  src,
  alt,
  className = "",
  placeholder = null,
  width,
  height,
  style = {},
  threshold = 0.1,
  rootMargin = "100px", // Start loading 100px before image is visible
  ...props
}) {
  // Intersection observer hook - triggers when image enters viewport
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once, don't re-trigger when scrolling away and back
    threshold, // How much of the image needs to be visible (0.1 = 10%)
    rootMargin, // Load images X pixels before they become visible
  });

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
    console.log(`✅ Image loaded: ${src}`); // You'll see this in console only when scrolled to
  };

  const handleError = () => {
    setError(true);
    console.log(`❌ Image failed: ${src}`);
  };

  // Container styles to prevent layout shift
  const containerStyle = {
    width: width || "100%",
    height: height || "auto",
    display: "block",
    ...style,
  };

  return (
    <div
      ref={ref}
      className={`lazy-image-container ${className}`}
      style={containerStyle}
    >
      {inView ? (
        <>
          {/* Only create img element when in view */}
          <img
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.3s ease",
              display: error ? "none" : "block",
            }}
            {...props}
          />

          {/* Show placeholder while loading */}
          {!loaded &&
            !error &&
            (placeholder || (
              <div
                style={{
                  width: "100%",
                  height: height || "200px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                Loading image...
              </div>
            ))}

          {/* Show error state */}
          {error && (
            <div
              style={{
                width: "100%",
                height: height || "200px",
                backgroundColor: "#fee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#c66",
                fontSize: "14px",
              }}
            >
              Failed to load image
            </div>
          )}
        </>
      ) : (
        /* Show placeholder when NOT in view - no img element created yet */
        placeholder || (
          <div
            style={{
              width: "100%",
              height: height || "200px",
              backgroundColor: "#f8f8f8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999",
              fontSize: "14px",
              border: "1px dashed #ddd",
            }}
          >
            Scroll to load image
          </div>
        )
      )}
    </div>
  );
}

// Enhanced version with skeleton loading
function LazyImageWithSkeleton({
  src,
  alt,
  className = "",
  width,
  height,
  showSkeleton = true,
  ...props
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "50px",
  });

  const [loaded, setLoaded] = useState(false);

  const SkeletonLoader = () => (
    <div
      className="animate-pulse bg-gray-200"
      style={{
        width: width || "100%",
        height: height || "200px",
      }}
    >
      <div className="flex items-center justify-center h-full">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );

  return (
    <div ref={ref} className={className}>
      {inView ? (
        <div style={{ position: "relative" }}>
          <img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            style={{
              width: width || "100%",
              height: height || "auto",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
            {...props}
          />
          {!loaded && showSkeleton && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <SkeletonLoader />
            </div>
          )}
        </div>
      ) : showSkeleton ? (
        <SkeletonLoader />
      ) : (
        <div style={{ height: height || "200px" }} />
      )}
    </div>
  );
}

export default LazyImage;
export { LazyImageWithSkeleton };
