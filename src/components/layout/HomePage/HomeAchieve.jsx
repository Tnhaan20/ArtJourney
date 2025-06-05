import React from "react";
import { useTranslation } from "react-i18next";
import Carousel from "@/components/elements/carousel/Carousel"; // Import Carousel component

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

  // Get testimonials from translation và format cho Carousel
  const testimonials = t("home.achievements.testimonials.users", {
    returnObjects: true,
  }).map((user, index) => ({
    id: index,
    image: [commentUser1, commentUser2, commentUser3, commentUser4][index],
    title: user.name,
    description: user.text,
  }));

  // Custom render cho testimonial slides
  const renderTestimonialSlide = (slide, index) => (
    <div
      key={`testimonial-${slide.id}-${index}`}
      className="relative h-full w-full flex-shrink-0 flex items-center justify-center gap-8 px-8"
    >
      {/* Image block */}
      <div className="w-110 h-74 overflow-hidden">
        <img
          loading="lazy"
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text block */}
      <div className="text-center max-w-md">
        <h3 className="text-2xl font-bold mb-2 text-black">{slide.title}</h3>
        <p className="text-base text-gray-700 leading-relaxed">
          {slide.description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-[#f8f8f8] py-30 text-black min-h-screen pb-5">
      {/* Top 3 Users Section - Giữ nguyên */}
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

      {/* Join the challenge - Giữ nguyên */}
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

      {/* Meet Our Learners Section - Thay thế bằng Carousel */}
      <div className="text-center py-12">
        <h3 className="text-center text-3xl font-extrabold mb-8 ">
          {t("home.achievements.testimonials.title")}
        </h3>

        {/* Sử dụng Carousel thay cho sliding code cũ */}
        <Carousel
          slides={testimonials}
          autoPlay={true}
          interval={4000}
          width="max-w-6xl"
          height="h-[300px]"
          rounded="rounded-none"
          showTitle={false}
          showDots={false}
          showArrows={true}
          renderSlide={renderTestimonialSlide}
          className="bg-transparent"
        />
      </div>
    </div>
  );
}
