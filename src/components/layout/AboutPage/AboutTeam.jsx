import React, { useState, useRef } from 'react';
import TeamMember1 from "@/assets/team-member-1.png";
import TeamMember2 from "@/assets/team-member-2.png";
import TeamMember3 from "@/assets/team-member-3.png";
import TeamMember4 from "@/assets/team-member-4.png";
import TeamMember5 from "@/assets/team-member-5.png";
import TeamMember6 from "@/assets/team-member-6.png";
import LazyImage from "@/components/elements/LazyImg/LazyImg";

export default function AboutTeam() {
  const teamScrollerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    teamScrollerRef.current.classList.add('cursor-grabbing');
    setStartX(e.pageX - teamScrollerRef.current.offsetLeft);
    setScrollLeft(teamScrollerRef.current.scrollLeft);
    e.preventDefault(); // Prevent default drag behavior
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    teamScrollerRef.current.classList.remove('cursor-grabbing');
  };

  const handleMouseLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    teamScrollerRef.current.classList.remove('cursor-grabbing');
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - teamScrollerRef.current.offsetLeft;
    const walk = (x - startX) * 1.2; // Increase multiplier to match AboutClients
    teamScrollerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="bg-white text-black overflow-hidden pt-0 mt-0">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h3 className="text-2xl uppercase font-bold mb-10 text-left pl-4 md:pl-0">
          <span className="text-[#DDA853]">WHO</span> WE ARE?
        </h3>

        <div className="relative">
          <div className="mx-0 overflow-hidden">
            <div
              ref={teamScrollerRef}
              className="flex overflow-x-auto pb-6 gap-4 md:gap-6 hide-scrollbar no-select"
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-x", // Keep touch action for mobile
                userSelect: "none",
                cursor: isDragging ? "grabbing" : "grab", // Add dynamic cursor
              }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <div
                className="flex-shrink-0 w-full max-w-[calc(22.5%-12px)] sm:max-w-[calc(45%-10px)] md:max-w-[calc(30%-12px)] lg:max-w-[calc(22.5%-12px)]"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="mb-0 overflow-hidden rounded-lg relative">
                  <img
                    loading="lazy"
                    src={TeamMember1}
                    alt="Team Member"
                    className="w-full h-56 md:h-64 lg:h-72 object-cover object-center pointer-events-none"
                    draggable="false"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-3"
                    style={{ backgroundColor: "rgba(220, 220, 220, 0.8)" }}
                  >
                    <h4 className="font-bold text-xl md:text-2xl text-black">
                      Tạ Thị Kiều Thi
                    </h4>
                    <p className="text-gray-700 text-base md:text-lg">
                      Team Lead
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="flex-shrink-0 w-full max-w-[calc(22.5%-12px)] sm:max-w-[calc(45%-10px)] md:max-w-[calc(30%-12px)] lg:max-w-[calc(22.5%-12px)]"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="mb-0 overflow-hidden rounded-lg relative">
                  <img
                    loading="lazy"
                    src={TeamMember2}
                    alt="Team Member"
                    className="w-full h-56 md:h-64 lg:h-72 object-cover object-center pointer-events-none"
                    draggable="false"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-3"
                    style={{ backgroundColor: "rgba(220, 220, 220, 0.8)" }}
                  >
                    <h4 className="font-bold text-xl md:text-2xl text-black">
                      Nguyễn Minh Quốc
                    </h4>
                    <p className="text-gray-700 text-base md:text-lg">
                      UX/UI Designer
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="flex-shrink-0 w-full max-w-[calc(22.5%-12px)] sm:max-w-[calc(45%-10px)] md:max-w-[calc(30%-12px)] lg:max-w-[calc(22.5%-12px)]"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="mb-0 overflow-hidden rounded-lg relative">
                  <img
                    loading="lazy"
                    src={TeamMember3}
                    alt="Team Member"
                    className="w-full h-56 md:h-64 lg:h-72 object-cover object-center pointer-events-none"
                    draggable="false"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-3"
                    style={{ backgroundColor: "rgba(220, 220, 220, 0.8)" }}
                  >
                    <h4 className="font-bold text-xl md:text-2xl text-black">
                      Võ Thành Nhân
                    </h4>
                    <p className="text-gray-700 text-base md:text-lg">
                      Frontend Developer
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="flex-shrink-0 w-full max-w-[calc(22.5%-12px)] sm:max-w-[calc(45%-10px)] md:max-w-[calc(30%-12px)] lg:max-w-[calc(22.5%-12px)]"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="mb-0 overflow-hidden rounded-lg relative">
                  <img
                    loading="lazy"
                    src={TeamMember4}
                    alt="Team Member"
                    className="w-full h-56 md:h-64 lg:h-72 object-cover object-center pointer-events-none"
                    draggable="false"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-3"
                    style={{ backgroundColor: "rgba(220, 220, 220, 0.8)" }}
                  >
                    <h4 className="font-bold text-xl md:text-2xl text-black">
                      Đoàn Thái Minh Khang
                    </h4>
                    <p className="text-gray-700 text-base md:text-lg">
                      Frontend Developer
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="flex-shrink-0 w-full max-w-[calc(22.5%-12px)] sm:max-w-[calc(45%-10px)] md:max-w-[calc(30%-12px)] lg:max-w-[calc(22.5%-12px)]"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="mb-0 overflow-hidden rounded-lg relative">
                  <img
                    loading="lazy"
                    src={TeamMember5}
                    alt="Team Member"
                    className="w-full h-56 md:h-64 lg:h-72 object-cover object-center pointer-events-none"
                    draggable="false"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-3"
                    style={{ backgroundColor: "rgba(220, 220, 220, 0.8)" }}
                  >
                    <h4 className="font-bold text-xl md:text-2xl text-black">
                      Hoàng Duy Giáp
                    </h4>
                    <p className="text-gray-700 text-base md:text-lg">
                      Backend Developer
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="flex-shrink-0 w-full max-w-[calc(22.5%-12px)] sm:max-w-[calc(45%-10px)] md:max-w-[calc(30%-12px)] lg:max-w-[calc(22.5%-12px)]"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="mb-0 overflow-hidden rounded-lg relative">
                  <img
                    loading="lazy"
                    src={TeamMember6}
                    alt="Team Member"
                    className="w-full h-56 md:h-64 lg:h-72 object-cover object-center pointer-events-none"
                    draggable="false"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-3"
                    style={{ backgroundColor: "rgba(220, 220, 220, 0.8)" }}
                  >
                    <h4 className="font-bold text-xl md:text-2xl text-black">
                      Đoàn Phúc Hiếu
                    </h4>
                    <p className="text-gray-700 text-base md:text-lg">
                      Backend Developer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .no-select {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        /* Remove cursor-grabbing if no longer needed due to inline style */
        /* .cursor-grabbing { cursor: grabbing; } */
      `}</style>
    </div>
  );
} 