import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import crown and users' images
import crownImage from "../../../assets/crown.png";
import user1 from "../../../assets/user1.png";
import user2 from "../../../assets/user2.png";
import user3 from "../../../assets/user3.png";

// Import testimonial images
import commentUser1 from "../../../assets/comment-user1.png";
import commentUser2 from "../../../assets/comment-user2.png";
import commentUser3 from "../../../assets/comment-user3.png";
import commentUser4 from "../../../assets/comment-user4.png";
import { TailwindStyle } from "../../../utils/Enum";

const testimonials = [
  {
    name: "Nguyen Thi Van Anh",
    image: commentUser1,
    text: "As an aspiring artist, I find ArtJourney incredibly inspiring. It not only teaches art history but also encourages creativity. The seamless navigation and visually stunning presentations make it a joy to use. I absolutely love it!",
  },
  {
    name: "Doan Thai Minh Khang",
    image: commentUser2,
    text: "ArtJourney is a great platform for art lovers! It’s easy to use, interactive, and makes learning about art history fun and personal.",
  },
  {
    name: "Hoang Minh Quoc",
    image: commentUser3,
    text: "ArtJourney offers an amazing art experience! The user-friendly interface and rich content make it easy for me to explore and create unique artworks. The customer service is attentive and responds quickly. Definitely worth trying!",
  },
  {
    name: "Ta Thi Kieu Thi",
    image: commentUser4,
    text: "I was amazed by the depth of knowledge ArtJourney provides. From classic masterpieces to contemporary works, every detail is well-explained. The platform is smooth, visually appealing, and engaging. It's a must-have for anyone passionate about art!",
  },
];

export default function HomeAchieve() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const [direction, setDirection] = useState("");
  
    // ---- handlePrev: Slide current out to right, then load previous
    const handlePrev = () => {
      if (isSliding) return;
      setDirection("prev");   // Just a label; helps us track direction
      setIsSliding(true);
  
      // Stage 1: Slide out
      setTimeout(() => {
        setDirection("out-right"); // Current slides out to the right
  
        // Stage 2: Switch testimonial index
        setTimeout(() => {
          setCurrentIndex((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
          );
          setDirection("reset"); // Slide new item in from left
  
          // Stage 3: End animation
          setTimeout(() => {
            setIsSliding(false);
          }, 300);
        }, 300);
      }, 0);
    };
  
    // ---- handleNext: Slide current out to left, then load next
    const handleNext = () => {
      if (isSliding) return;
      setDirection("next");
      setIsSliding(true);
  
      // Stage 1: Slide out
      setTimeout(() => {
        setDirection("out-left"); // Current slides out to the left
  
        // Stage 2: Switch testimonial index
        setTimeout(() => {
          setCurrentIndex((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1
          );
          setDirection("in-right"); // Slide new item in from right
  
          // Stage 3: End animation
          setTimeout(() => {
            setIsSliding(false);
          }, 300);
        }, 300);
      }, 0);
    };
  
    // Determine CSS class for sliding container
    let slideClass = "translate-x-0 opacity-100";
    if (direction === "next") {
      slideClass = "-translate-x-full opacity-0"; // Current out left
    } else if (direction === "prev") {
      slideClass = "translate-x-full opacity-0";  // Current out right
    } else if (direction === "out-left") {
      slideClass = "-translate-x-full opacity-0"; // new item in from right
    } else if (direction === "out-right") {
      slideClass = "translate-x-full opacity-0";  // new item in from left
    } else if (direction === "in-right") {
      // after out-left: new slides from right
      slideClass = "translate-x-0 opacity-100";
    } else if (direction === "reset") {
      slideClass = "translate-x-0 opacity-100";
    }

  return (
    <div className="w-full bg-[#f8f8f8] py-30 text-black min-h-screen pb-5">
      {/* Top 3 Users Section */}
      <div className="text-center py-12">
        {/* User Images Container */}
        <div className="flex justify-center relative">
          {/* Left User (Top 2) - slightly behind/lower */}
          <div className="relative w-80 h-70 mx-[-35px] z-0 bottom-[-220px] overflow-hidden">
            <img
              src={user2}
              alt="User 2"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center User (Top 1) - crown above */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Crown Positioned on Top */}
            <img
              src={crownImage}
              alt="Crown"
              className="absolute top-[-75px] right-[-65px] w-48 z-20"
            />
            <div className="relative w-110 h-80 z-10 overflow-hidden">
              <img
                src={user1}
                alt="Top User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right User (Top 3) - slightly behind/lower */}
          <div className="relative w-80 h-70 mx-[-35px] z-0 bottom-[-220px] overflow-hidden">
            <img
              src={user3}
              alt="User 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Join the challenge */}
      <div className="text-center mt-[155px]">
        <h2 className="text-2xl font-extrabold">
          Top 3 Users with the Highest Achievements
        </h2>
        <button
          className={`inline-block bg-primary-yellow text-white px-6 py-3 rounded-md text-lg font-semibold mt-5 cursor-pointer ${TailwindStyle.HIGHLIGHT_FRAME}`}>
          Join the Challenge
        </button>
      </div>

      {/* Meet Our Learners Section */}
      <div className="text-center py-12">
        <h3 className="text-center text-3xl font-extrabold mb-8">
          Meet Our Learners and Hear Their Stories
        </h3>

        <div className="flex items-center justify-center">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="p-4 mx-6 rounded-full hover:bg-gray-200 transition cursor-pointer active:scale-95"
          >
            <ChevronLeft size={32} strokeWidth={2} />
          </button>

          {/* SLIDER WRAPPER with fixed width and overflow hidden */}
          <div className="relative w-[900px] h-[300px] overflow-hidden">
            {/* Sliding container referencing slideClass */}
            <div
              className={`absolute w-full h-full flex items-center justify-center gap-8
              transition-all duration-300 ease-in-out ${slideClass}`}
            >
              {/* Image block */}
              <div className="w-110 h-74 overflow-hidden">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text block */}
              <div className="text-center max-w-md">
                <h3 className="text-2xl font-bold mb-2">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  {testimonials[currentIndex].text}
                </p>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="p-4 mx-6 rounded-full hover:bg-gray-200 transition cursor-pointer active:scale-95"
          >
            <ChevronRight size={32} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
