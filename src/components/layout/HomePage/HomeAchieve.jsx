import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

// Import crown and users' images
import crownImage from "@/assets/crown.png";
import user1 from "@/assets/user1.png";
import user2 from "@/assets/user2.png";
import user3 from "@/assets/user3.png";

// Import testimonial images
import commentUser1 from "@/assets/comment-user1.png";
import commentUser2 from "@/assets/comment-user2.png";
import commentUser3 from "@/assets/comment-user3.png";
import commentUser4 from "@/assets/comment-user4.png";
import { TailwindStyle } from "@/utils/Enum";

export default function HomeAchieve() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [direction, setDirection] = useState("");

  // Get testimonials from translation
  const testimonials = t("home.achievements.testimonials.users", {
    returnObjects: true,
  }).map((user, index) => ({
    ...user,
    image: [commentUser1, commentUser2, commentUser3, commentUser4][index],
  }));

  // ---- handlePrev: Slide current out to right, then load previous
  const handlePrev = () => {
    if (isSliding) return;
    setDirection("prev");
    setIsSliding(true);

    setTimeout(() => {
      setDirection("out-right");

      setTimeout(() => {
        setCurrentIndex((prev) =>
          prev === 0 ? testimonials.length - 1 : prev - 1
        );
        setDirection("reset");

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

    setTimeout(() => {
      setDirection("out-left");

      setTimeout(() => {
        setCurrentIndex((prev) =>
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
        setDirection("in-right");

        setTimeout(() => {
          setIsSliding(false);
        }, 300);
      }, 300);
    }, 0);
  };

  // Determine CSS class for sliding container
  let slideClass = "translate-x-0 opacity-100";
  if (direction === "next") {
    slideClass = "-translate-x-full opacity-0";
  } else if (direction === "prev") {
    slideClass = "translate-x-full opacity-0";
  } else if (direction === "out-left") {
    slideClass = "-translate-x-full opacity-0";
  } else if (direction === "out-right") {
    slideClass = "translate-x-full opacity-0";
  } else if (direction === "in-right") {
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
              loading="lazy"
              src={user2}
              alt="User 2"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center User (Top 1) - crown above */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Crown Positioned on Top */}
            <img
              loading="lazy"
              src={crownImage}
              alt="Crown"
              className="absolute top-[-75px] right-[-65px] w-48 z-20"
            />
            <div className="relative w-110 h-80 z-10 overflow-hidden">
              <img
                loading="lazy"
                src={user1}
                alt="Top User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right User (Top 3) - slightly behind/lower */}
          <div className="relative w-80 h-70 mx-[-35px] z-0 bottom-[-220px] overflow-hidden">
            <img
              loading="lazy"
              src={user3}
              alt="User 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Join the challenge */}
      <div className="text-center mt-[155px]">
        <h2 className="text-2xl font-extrabold ">
          {t("home.achievements.title")}
        </h2>
        <button
          className={`inline-block bg-primary-yellow text-white px-6 py-3 rounded-md text-lg font-semibold mt-5 cursor-pointer ${TailwindStyle.HIGHLIGHT_FRAME}`}
        >
          {t("home.achievements.joinChallenge")}
        </button>
      </div>

      {/* Meet Our Learners Section */}
      <div className="text-center py-12">
        <h3 className="text-center text-3xl font-extrabold mb-8 ">
          {t("home.achievements.testimonials.title")}
        </h3>

        <div className="flex items-center justify-center">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="p-4 mx-6 rounded-full hover:bg-gray-200 transition cursor-pointer active:scale-95"
            aria-label="Previous testimonial"
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
                  loading="lazy"
                  src={testimonials[currentIndex]?.image}
                  alt={testimonials[currentIndex]?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text block */}
              <div className="text-center max-w-md">
                <h3 className="text-2xl font-bold mb-2 ">
                  {testimonials[currentIndex]?.name}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  {testimonials[currentIndex]?.text}
                </p>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="p-4 mx-6 rounded-full hover:bg-gray-200 transition cursor-pointer active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight size={32} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
