import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CommunityBackground from "@/assets/community-background.png";
import { Search, TrendingUp, Users, MessageCircle, Award } from "lucide-react";

export default function CommunitySearch() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const communityStats = [
    { label: "Active Members", value: "12.5K", icon: Users },
    { label: "Daily Posts", value: "847", icon: MessageCircle },
    { label: "Art Experts", value: "156", icon: Award },
    { label: "Weekly Discussions", value: "2.1K", icon: TrendingUp },
  ];

  const quickSearches = [
    "Van Gogh techniques",
    "Art history",
    "Museum tours",
    "Renaissance art",
    "Color theory",
  ];

  return (
    <div className="relative w-full h-full overflow-hidden py-10">
      {/* Enhanced Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transform scale-105"
        style={{ backgroundImage: `url(${CommunityBackground})` }}
      />

      {/* Enhanced Overlay with Gradient */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#DDA853]/80 via-[#DDA853]/60 to-blue-600/70" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-32 -translate-x-32" />

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Community Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
          <Users className="w-4 h-4 text-white" />
          <span className="text-white font-semibold text-sm uppercase tracking-wider">
            {t("community.search.badge")}
          </span>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4 leading-tight">
            <span className="drop-shadow-lg">
              {t("community.search.title.welcome")}
            </span>
            <br />
            <span className="text-white/90 text-3xl md:text-5xl">
              {t("community.search.title.artJourney")}
            </span>
          </h1>

          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t("community.search.subtitle")}
          </p>
        </div>

        {/* Enhanced Search Bar */}
        <div className="w-full max-w-4xl mb-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400 group-focus-within:text-[#DDA853] transition-colors" />
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full py-4 pl-12 pr-6 text-lg text-gray-900 bg-white/95 backdrop-blur-sm border-2 border-white/20 rounded-2xl focus:ring-4 focus:ring-white/30 focus:border-white focus:outline-none placeholder-gray-500 shadow-xl transition-all duration-300"
              placeholder={t("community.search.placeholder")}
            />

            {/* Search Button */}
            <button className="absolute inset-y-0 right-0 flex items-center pr-3">
              <div className="bg-[#DDA853] hover:bg-[#DDA853]/90 text-white px-6 py-2 rounded-xl font-semibold transition-colors duration-300 shadow-lg">
                {t("community.search.button")}
              </div>
            </button>
          </div>

          {/* Quick Search Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="text-white/80 text-sm mr-2">
              {t("community.search.quickSearch")}:
            </span>
            {quickSearches.map((tag, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(tag)}
                className="bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-1 rounded-full transition-colors duration-300 backdrop-blur-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          {communityStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30 hover:bg-white/25 transition-all duration-300"
              >
                <div className="flex justify-center mb-2">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
