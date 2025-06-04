import React, { useState, useEffect, useRef } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

// Carousel component with better reusability
const Carousel = ({
  // Slides data
  slides = [],
  // Autoplay options
  autoPlay = true,
  interval = 3000,
  // Appearance
  width = 'max-w-4xl',
  height = 'h-96',
  rounded = 'rounded-lg',
  imageSize = 'cover',
  // Controls
  showArrows = true,
  showDots = true,
  showTitle = true,
  // Custom renders
  renderSlide,
  renderArrows,
  renderDots,
  // Events
  onSlideChange,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  
  const slideWidth = 100;
  const transitionDuration = 400;

  // Add clone slides for infinite effect
  const extendedSlides = [
    ...slides.slice(-1),
    ...slides,
    ...slides.slice(0, 1)
  ];

  const getTransformX = (index) => -(index + 1) * slideWidth;
  const [transformX, setTransformX] = useState(getTransformX(0));

  const resetPosition = () => {
    const container = containerRef.current;
    if (!container) return;

    if (currentIndex === -1) {
      container.style.transition = 'none';
      setCurrentIndex(slides.length - 1);
      setTransformX(getTransformX(slides.length - 1));
      container.offsetHeight; // Force reflow
    } else if (currentIndex === slides.length) {
      container.style.transition = 'none';
      setCurrentIndex(0);
      setTransformX(getTransformX(0));
      container.offsetHeight; // Force reflow
    }
    
    setTimeout(() => {
      container.style.transition = `transform ${transitionDuration}ms ease-out`;
      setIsTransitioning(false);
    }, 20);
  };

  // Handle autoplay
  useEffect(() => {
    let timeoutId;
    if (autoPlay && !isTransitioning && slides.length > 1) {
      timeoutId = setTimeout(() => {
        navigate('next');
      }, interval);
    }
    return () => clearTimeout(timeoutId);
  }, [autoPlay, interval, currentIndex, isTransitioning, slides.length]);

  // Handle transition end
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTransitionEnd = () => {
      if (currentIndex === -1 || currentIndex === slides.length) {
        resetPosition();
      } else {
        setIsTransitioning(false);
      }
    };

    container.addEventListener('transitionend', handleTransitionEnd);
    return () => container.removeEventListener('transitionend', handleTransitionEnd);
  }, [currentIndex, slides.length]);

  // Handle slide change callback
  useEffect(() => {
    if (onSlideChange && currentIndex >= 0 && currentIndex < slides.length) {
      onSlideChange(currentIndex);
    }
  }, [currentIndex, onSlideChange, slides.length]);

  const navigate = (direction) => {
    if (isTransitioning || slides.length <= 1) return;
    
    setIsTransitioning(true);
    if (direction === 'prev') {
      setCurrentIndex(prev => prev - 1);
      setTransformX(prev => prev + slideWidth);
    } else {
      setCurrentIndex(prev => prev + 1);
      setTransformX(prev => prev - slideWidth);
    }
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex || slides.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTransformX(getTransformX(index));
  };

  // Default slide renderer
  const defaultSlideRender = (slide, index) => (
    <div
      key={`${slide.id}-${index}`}
      className="relative h-full w-full flex-shrink-0"
    >
      <LazyImage
        src={slide.image}
        alt={slide.title || ""}
        className={`h-full w-full object-${imageSize}`}
        loading={index <= 2 ? "eager" : "lazy"}
      />
      {showTitle && slide.title && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <h3 className="text-xl font-semibold">{slide.title}</h3>
          {slide.description && (
            <p className="mt-2 text-sm text-gray-200">{slide.description}</p>
          )}
        </div>
      )}
      {slide.overlay && <div className="absolute inset-0">{slide.overlay}</div>}
      {slide.link && (
        <a
          href={slide.link}
          className="absolute inset-0 z-20"
          aria-label={`Go to ${slide.title || "slide destination"}`}
        />
      )}
    </div>
  );

  // Default arrows renderer
  const defaultArrowsRender = () => (
    <>
      <button
        onClick={() => navigate('prev')}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => navigate('next')}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </>
  );

  // Default dots renderer
  const defaultDotsRender = () => (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`h-2 w-2 rounded-full transition-colors ${
            index === currentIndex ? 'bg-[#47663B]' : 'bg-gray-99'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );

  if (!slides.length) {
    return null;
  }

  return (
    <div className={`relative w-full ${width} mx-auto ${className}`}>
      <div className={`relative ${height} overflow-hidden ${rounded}`}>
        <div 
          ref={containerRef}
          className="absolute h-full w-full flex"
          style={{ 
            transform: `translateX(${transformX}%)`,
            transition: `transform ${transitionDuration}ms ease-out`,
          }}
        >
          {extendedSlides.map((slide, idx) => (
            renderSlide ? renderSlide(slide, idx) : defaultSlideRender(slide, idx)
          ))}
        </div>

        {slides.length > 1 && (
          <>
            {showArrows && (renderArrows?.() || defaultArrowsRender())}
            {showDots && (renderDots?.() || defaultDotsRender())}
          </>
        )}
      </div>
    </div>
  );
};

export default Carousel;