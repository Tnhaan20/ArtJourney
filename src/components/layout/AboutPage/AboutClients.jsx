import React, { useState, useEffect, useRef } from 'react';

export default function AboutClients() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);
  
  const testimonials = [
    {
      name: "Leslie Alexander",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      quote: "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
    },
    {
      name: "Mayor Danloy",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
    },
    {
      name: "Sarah Johnson",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      quote: "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
    }
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const slider = sliderRef.current;
    if (!slider) return;

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    let newScrollLeft = scrollLeft - walk;

    // Calculate the correct maximum scroll position
    const testimonialsContainer = slider.querySelector('.w-max'); // Find the flex container
    const lastTestimonial = testimonialsContainer?.lastElementChild;
    let maxScrollLeft = 0; // Default to 0 if calculation fails

    if (lastTestimonial && slider.clientWidth) {
      // Calculate the position where the right edge of the last card aligns with the right edge of the container
      const lastCardRightEdge = lastTestimonial.offsetLeft + lastTestimonial.offsetWidth;
      maxScrollLeft = lastCardRightEdge - slider.clientWidth;

      // It's possible we need to account for the gap as well. 
      // If the cards have a gap-6, the effective right edge for alignment might be slightly different.
      // Let's try adding half the gap to the calculation for potentially better alignment.
      // Assuming gap-6 corresponds to 1.5rem (24px), we add 12px.
      // This part might need fine-tuning based on exact styling.
      const gap = parseFloat(getComputedStyle(testimonialsContainer).gap) || 24; // Get gap or default
      maxScrollLeft += gap / 2; // Adjust slightly for gap - Experiment if needed

      // Ensure maxScrollLeft is not negative (happens if content is narrower than container)
      maxScrollLeft = Math.max(0, maxScrollLeft);
      
      // Also ensure it doesn't exceed the absolute maximum possible scroll
      const absoluteMaxScroll = slider.scrollWidth - slider.clientWidth;
      maxScrollLeft = Math.min(maxScrollLeft, absoluteMaxScroll);
    }
    
    // Clamp the newScrollLeft value between 0 and the calculated maxScrollLeft
    if (newScrollLeft < 0) {
      newScrollLeft = 0;
    } else if (newScrollLeft > maxScrollLeft) {
      newScrollLeft = maxScrollLeft;
    }

    slider.scrollLeft = newScrollLeft;
  };

  return (
    <div className="bg-white text-black pt-0 mt-0 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-6 mt-10">
          <h3 className="text-xl font-medium text-left">
            <span className="text-[#DDA853]">HOW</span>{" "}
            <span className="font-bold text-black">CLIENTS SAID</span>
          </h3>
        </div>

        <div className="relative">
          <div
            ref={sliderRef}
            className="overflow-x-auto hide-scrollbar"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{
              cursor: isDragging ? "grabbing" : "grab",
              userSelect: "none",
            }}
          >
            <div className="flex gap-6 w-max">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-[calc(30%-1rem)] min-w-[280px] flex-shrink-0"
                >
                  <div className="bg-[#F7F7F7] p-6 rounded-lg shadow-sm h-full">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          draggable="false"
                          onDragStart={(e) => e.preventDefault()}
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-2xl">
                          {testimonial.name}
                        </h4>
                        <p className="text-[#0A0A0A] text-xl">
                          "{testimonial.quote}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add this to your global CSS file
const style = document.createElement('style');
style.textContent = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style); 