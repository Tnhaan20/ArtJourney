import React from 'react';
import { Link } from 'react-router-dom';
import RightImage from "@/assets/about-us-circle3.png";
import MiddleImage from "@/assets/about-us-circle2.png";
import LeftImage from "@/assets/about-us-circle1.png";

export default function AboutHero() {
  return (
    <div className="bg-[#ECD2AA] text-black py-14 md:py-20">
      <div className="max-w-none px-6 sm:px-12 md:px-16 lg:px-24 xl:px-36 2xl:px-48">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pl-0 lg:pl-0">
            <h1 className="text-5xl md:text-2xl lg:text-4xl font-bold mb-8">
              <span className="text-[#DDA853]">ABOUT</span> ART JOURNEY
            </h1>
            <p className="text-[#0A0A0A] mb-10 text-xl md:text-2xl max-w-lg leading-relaxed">
              "There is no one who loves pain itself, who seeks after it and
              wants to have it, simply because it is pain..."
            </p>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center bg-[#DDA853] hover:bg-[#e8ba70] transition-colors duration-300 text-white px-6 py-4 rounded text-xl uppercase font-bold"
              >
                CONTACT US
                <svg
                  className="ml-3"
                  width="24"
                  height="24"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 9L1 1L3 9M17 9L1 17L3 9M17 9H3"
                    stroke="#F7F7F7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-end">
            <div className="relative w-full h-80 md:h-96 lg:h-[400px]">
              <div className="absolute right-0 top-0 md:-top-16 md:right-8 lg:right-26">
                <svg
                  width="380"
                  height="380"
                  viewBox="0 0 330 330"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.4"
                    cx="165"
                    cy="165"
                    r="165"
                    fill="#3F8499"
                  />
                </svg>
              </div>

              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden absolute -top-20 right-0 md:-top-16 md:right-8 lg:right-12 z-20">
                <img
                  loading="lazy"
                  src={RightImage}
                  alt="Art Gallery"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-48 h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden absolute top-10 md:top-2 md:right-40 lg:right-90 z-30">
                <img
                  loading="lazy"
                  src={MiddleImage}
                  alt="Historical Painting"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-40 h-40 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden absolute top-24 md:top-28 left-16 md:-left-10 z-20">
                <img
                  loading="lazy"
                  src={LeftImage}
                  alt="Sculpture"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 