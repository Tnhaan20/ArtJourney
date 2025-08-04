import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { ChevronRight, Heart, Users, Palette } from "lucide-react";
import RightImage from "@/assets/about-us-circle3.png";
import MiddleImage from "@/assets/about-us-circle2.png";
import LeftImage from "@/assets/about-us-circle1.png";

export default function AboutHero() {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-[#ECD2AA] via-[#F5E6C8] to-[#E8D5B7] text-black py-16 md:py-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DDA853]/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-32 -translate-x-32" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-sm">
              <div className="w-2 h-2 bg-[#DDA853] rounded-full animate-pulse" />
              <span className="text-[#DDA853] font-semibold text-sm uppercase tracking-wider">
                {t("about.hero.badge")}
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-[#DDA853] relative">
                  {t("about.hero.title.about")}
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#DDA853]/30 rounded-full" />
                </span>
                <br />
                <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {t("about.hero.title.artJourney")}
                </span>
              </h1>

              <div className="w-24 h-1 bg-gradient-to-r from-[#DDA853] to-blue-500 rounded-full" />
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-gray-700 text-xl md:text-2xl leading-relaxed font-light max-w-2xl">
                {t("about.hero.description.main")}{" "}
                <span className="font-semibold text-[#DDA853]">
                  {t("about.hero.description.highlight")}
                </span>
                {t("about.hero.description.ending")}
              </p>

              <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                {t("about.hero.description.secondary")}
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#DDA853]/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#DDA853]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {t("about.hero.stats.artLovers.count")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t("about.hero.stats.artLovers.label")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Palette className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {t("about.hero.stats.artworks.count")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t("about.hero.stats.artworks.label")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {t("about.hero.stats.rating.count")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t("about.hero.stats.rating.label")}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                to="/learn"
                className="group inline-flex items-center justify-center gap-2 bg-[#DDA853] hover:bg-[#DDA853]/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <span>{t("about.hero.buttons.startJourney")}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              
            </div>
          </div>

          {/* Right Visual - Zigzag Layout */}
          <div className="lg:w-1/2 flex justify-center relative">
            <div className="relative w-full h-80 md:h-96 lg:h-[500px] max-w-lg">
              {/* Background Circle */}
              <div className="absolute right-0 top-0 transform -translate-y-8 translate-x-8">
                <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-blue-400/30 to-blue-600/30 rounded-full blur-sm animate-pulse" />
              </div>

              {/* Top Right Image - Zigzag Position 1 */}
              <div className="absolute top-0 right-0 z-20 transform hover:scale-105 transition-transform duration-700">
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white/50">
                  <img
                    loading="lazy"
                    src={RightImage}
                    alt={t("about.hero.images.contemporary")}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-3 -right-3 bg-white rounded-full shadow-lg p-3 animate-bounce">
                  <Palette className="w-6 h-6 text-[#DDA853]" />
                </div>
              </div>

              {/* Middle Left Image - Zigzag Position 2 */}
              <div className="absolute top-16 left-8 z-30 transform hover:scale-105 transition-transform duration-700">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-xl border-4 border-white/70">
                  <img
                    loading="lazy"
                    src={MiddleImage}
                    alt={t("about.hero.images.classical")}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-3 -left-3 bg-white rounded-full shadow-lg p-2 animate-bounce delay-300">
                  <Heart className="w-5 h-5 text-pink-500" />
                </div>
              </div>

              {/* Bottom Right Image - Zigzag Position 3 */}
              <div className="absolute bottom-8 right-12 z-20 transform hover:scale-105 transition-transform duration-700">
                <div className="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden shadow-xl border-4 border-white/50">
                  <img
                    loading="lazy"
                    src={LeftImage}
                    alt={t("about.hero.images.ancient")}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full shadow-lg p-2 animate-bounce delay-700">
                  <Users className="w-4 h-4 text-blue-500" />
                </div>
              </div>

              {/* Connecting Lines - Updated for Zigzag */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 400 400"
              >
                {/* Line from top-right to middle-left */}
                <path
                  d="M320 80 Q200 120 80 160"
                  stroke="#DDA853"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.3"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
                {/* Line from middle-left to bottom-right */}
                <path
                  d="M80 160 Q200 240 320 320"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.3"
                  strokeDasharray="5,5"
                  className="animate-pulse delay-500"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-16 pt-12 border-t border-white/30">
          <p className="text-gray-600 text-lg italic max-w-4xl mx-auto leading-relaxed">
            "{t("about.hero.quote.text")}
          </p>
          <div className="mt-4 text-[#DDA853] font-semibold">
            {t("about.hero.quote.author")}
          </div>
        </div>
      </div>
    </div>
  );
}