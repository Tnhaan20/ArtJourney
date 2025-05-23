import React from 'react';
import AchivedImage from "@/assets/aboout-achieved.png";
import LazyImage from "@/components/elements/LazyImg/LazyImg";

export default function AboutStories() {
  return (
    <div className="bg-white text-black pt-0 mt-0">
      <div className="container mx-auto px-0 md:px-8 flex flex-col md:flex-row items-start py-8 justify-start">
        {/* Left side - Image */}
        <div className="md:w-[35%] flex justify-start">
          <div
            className="w-[350px] h-[300px] rounded-full overflow-hidden bg-gray-200 shadow-lg"
            style={{ borderRadius: "60%" }}
          >
            <img
              loading="lazy"
              src={AchivedImage}
              alt="Team Success"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="md:w-[65%] -ml-6 md:ml-0">
          {/* Heading */}
          <div className="mb-14">
            <div className="flex items-center">
              <span className="text-2xl uppercase font-bold mr-2">
                OUR STORIES ACHIEVE
              </span>
              <span className="text-2xl font-bold" style={{ color: "#dda853" }}>
                THE SUCCESS WITH ADVENTURES
              </span>
            </div>

            <div className="ml-[-70px] mt-30 relative w-[80%]">
              <div className="relative">
                <div
                  className="absolute mb-8 font-bold"
                  style={{
                    left: "35%",
                    bottom: "100%",
                    transform: "translateX(-50%)",
                    color: "#dda853",
                    whiteSpace: "nowrap",
                  }}
                >
                  Top 3 Education Website
                </div>

                <div
                  className="absolute mb-8 font-bold"
                  style={{
                    left: "70%",
                    bottom: "100%",
                    transform: "translateX(-50%)",
                    color: "#194755",
                    whiteSpace: "nowrap",
                  }}
                >
                  2M+ Customers
                </div>

                <div
                  className="absolute mb-8 font-bold"
                  style={{
                    right: "0%",
                    bottom: "100%",
                    transform: "translateX(30%)",
                    color: "#6a6a6a",
                    whiteSpace: "nowrap",
                  }}
                >
                  10+ Awards
                </div>

                {/* Timeline Bar */}
                <div className="h-2 bg-gray-200 rounded-full relative w-full">
                  <div
                    className="h-2 absolute top-0 left-0 w-[71%] rounded-full"
                    style={{ backgroundColor: "#dda853" }}
                  ></div>

                  <div className="absolute -top-2" style={{ left: "35%" }}>
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: "#dda853" }}
                    ></div>
                  </div>

                  <div className="absolute -top-2" style={{ left: "70%" }}>
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: "#dda853" }}
                    ></div>
                  </div>

                  <div className="absolute -top-2" style={{ right: "0%" }}>
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: "#6a6a6a" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 