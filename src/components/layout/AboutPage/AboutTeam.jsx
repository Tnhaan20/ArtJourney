import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import TeamMember1 from "@/assets/team-member-1.png";
import TeamMember2 from "@/assets/team-member-2.png";
import TeamMember3 from "@/assets/team-member-3.png";
import TeamMember4 from "@/assets/team-member-4.png";
import TeamMember5 from "@/assets/team-member-5.png";
import TeamMember6 from "@/assets/team-member-6.png";
import { Link } from 'react-router-dom';

export default function AboutTeam() {
  const { t } = useTranslation();
  const teamScrollerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const teamMembers = [
    {
      id: 1,
      nameKey: "about.team.members.thi.name",
      roleKey: "about.team.members.thi.role",
      image: TeamMember1,
    },
    {
      id: 2,
      nameKey: "about.team.members.quoc.name",
      roleKey: "about.team.members.quoc.role",
      image: TeamMember2,
    },
    {
      id: 3,
      nameKey: "about.team.members.nhan.name",
      roleKey: "about.team.members.nhan.role",
      image: TeamMember3,
    },
    {
      id: 4,
      nameKey: "about.team.members.khang.name",
      roleKey: "about.team.members.khang.role",
      image: TeamMember4,
    },
    {
      id: 5,
      nameKey: "about.team.members.giap.name",
      roleKey: "about.team.members.giap.role",
      image: TeamMember5,
    },
    {
      id: 6,
      nameKey: "about.team.members.hieu.name",
      roleKey: "about.team.members.hieu.role",
      image: TeamMember6,
    },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - teamScrollerRef.current.offsetLeft);
    setScrollLeft(teamScrollerRef.current.scrollLeft);
    e.preventDefault();
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - teamScrollerRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    teamScrollerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="bg-white text-black overflow-hidden py-10 mt-0">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <h3 className="text-2xl uppercase font-bold mb-10 text-left pl-4 md:pl-0">
          <span className="text-[#DDA853]">{t("about.team.title.who")}</span>{" "}
          {t("about.team.title.weAre")}
        </h3>

        {/* Desktop Grid Layout - 2 rows x 3 columns */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:grid-rows-2">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="group relative overflow-hidden rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                loading="lazy"
                src={member.image}
                alt={t(member.nameKey)}
                className="w-full h-64 lg:h-72 object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h4 className="font-bold text-xl md:text-2xl mb-1 drop-shadow-lg">
                  {t(member.nameKey)}
                </h4>
                <p className="text-gray-200 text-base md:text-lg drop-shadow-md">
                  {t(member.roleKey)}
                </p>

                {/* Animated underline */}
                <div className="w-0 group-hover:w-full h-0.5 bg-[#DDA853] mt-2 transition-all duration-500" />
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#DDA853]/50 rounded-lg transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Horizontal Scroll */}
        <div className="relative lg:hidden">
          <div className="mx-0 overflow-hidden">
            <div
              ref={teamScrollerRef}
              className={`flex overflow-x-auto pb-6 gap-4 md:gap-6 scrollbar-hide select-none touch-pan-x ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex-shrink-0 w-full max-w-[calc(22.5%-12px)] sm:max-w-[calc(45%-10px)] md:max-w-[calc(30%-12px)] snap-start"
                >
                  <div className="mb-0 overflow-hidden rounded-lg relative group hover:shadow-lg transition-shadow duration-300">
                    <img
                      loading="lazy"
                      src={member.image}
                      alt={t(member.nameKey)}
                      className="w-full h-56 md:h-64 object-cover object-center pointer-events-none select-none transition-transform duration-300 group-hover:scale-105"
                      draggable="false"
                    />

                    {/* Mobile overlay with better contrast */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 backdrop-blur-sm">
                      <h4 className="font-bold text-xl md:text-2xl text-white drop-shadow-lg">
                        {t(member.nameKey)}
                      </h4>
                      <p className="text-gray-200 text-base md:text-lg drop-shadow-md">
                        {t(member.roleKey)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section with CTA */}
        <div className="text-center mt-16 pt-12 border-t border-gray-200">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-[#DDA853]" />
            <span className="text-[#DDA853] font-semibold uppercase tracking-wider text-sm">
              {t("about.team.cta.badge")}
            </span>
            <div className="w-8 h-0.5 bg-[#DDA853]" />
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {t("about.team.cta.title")}
          </h3>

          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("about.team.cta.description")}
          </p>
          <Link to="/contact" className="inline-block">
          <button className="inline-flex items-center gap-2 bg-[#DDA853] hover:bg-[#DDA853]/90 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 group">
            <span>{t("about.team.cta.button")}</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
            </svg>
          </button>
                </Link>
        </div>
      </div>
    </div>
  );
}