import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AchivedImage from "@/assets/aboout-achieved.png";
import { ChevronRight, Users, Award, TrendingUp, Heart } from "lucide-react";

export default function AboutStories() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    // Auto-progress through milestones
    const interval = setInterval(() => {
      setCurrentMilestone((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const milestones = [
    {
      id: 1,
      year: "2025",
      titleKey: "about.stories.milestones.beginning.title",
      descriptionKey: "about.stories.milestones.beginning.description",
      achievementKey: "about.stories.milestones.beginning.achievement",
      icon: Heart,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
    },
    {
      id: 2,
      year: "2026",
      titleKey: "about.stories.milestones.community.title",
      descriptionKey: "about.stories.milestones.community.description",
      achievementKey: "about.stories.milestones.community.achievement",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      year: "2027",
      titleKey: "about.stories.milestones.recognition.title",
      descriptionKey: "about.stories.milestones.recognition.description",
      achievementKey: "about.stories.milestones.recognition.achievement",
      icon: Award,
      color: "text-[#DDA853]",
      bgColor: "bg-yellow-50",
    },
    {
      id: 4,
      year: "2028",
      titleKey: "about.stories.milestones.milestone.title",
      descriptionKey: "about.stories.milestones.milestone.description",
      achievementKey: "about.stories.milestones.milestone.achievement",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 text-black py-16 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#DDA853]/5 rounded-full blur-3xl -translate-y-32 -translate-x-32" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-32 translate-x-32" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side - Enhanced Image Section */}
          <div className="lg:w-1/2 flex justify-center relative">
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#DDA853]/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000" />

            <div className="relative group">
              {/* Main Image Container */}
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden bg-gradient-to-br from-[#DDA853]/20 to-blue-500/20 shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-2">
                <img
                  loading="lazy"
                  src={AchivedImage}
                  alt={t("about.stories.image.alt")}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay with stats */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                    <p className="text-sm font-medium opacity-90">
                      {t("about.stories.image.overlay.subtitle")}
                    </p>
                    <p className="text-2xl font-bold text-[#DDA853]">
                      {t("about.stories.image.overlay.years")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Achievement Badges */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-lg p-3 transform animate-bounce">
                <Award className="w-8 h-8 text-[#DDA853]" />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-3 transform animate-bounce delay-500">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Right side - Enhanced Story Content */}
          <div className="lg:w-1/2 space-y-8">
            {/* Section Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DDA853]/10 rounded-full">
                <div className="w-2 h-2 bg-[#DDA853] rounded-full animate-pulse" />
                <span className="text-[#DDA853] font-semibold text-sm uppercase tracking-wider">
                  {t("about.stories.badge")}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-800">
                  {t("about.stories.title.from")}
                </span>{" "}
                <span className="text-[#DDA853] relative">
                  {t("about.stories.title.dreams")}
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#DDA853]/30 rounded-full" />
                </span>
                <br />
                <span className="text-gray-800">
                  {t("about.stories.title.to")}
                </span>{" "}
                <span className="text-blue-600">
                  {t("about.stories.title.reality")}
                </span>
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                {t("about.stories.description")}
              </p>
            </div>

            {/* Interactive Timeline */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {t("about.stories.timeline.title")}
              </h3>

              {/* Timeline Container */}
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div
                  className="absolute left-8 top-0 w-0.5 bg-[#DDA853] transition-all duration-1000 ease-out"
                  style={{
                    height: `${
                      ((currentMilestone + 1) / milestones.length) * 100
                    }%`,
                  }}
                />

                {/* Milestone Items */}
                <div className="space-y-8">
                  {milestones.map((milestone, index) => {
                    const Icon = milestone.icon;
                    const isActive = index <= currentMilestone;
                    const isCurrent = index === currentMilestone;

                    return (
                      <div
                        key={milestone.id}
                        className={`relative flex items-start gap-6 transition-all duration-700 ${
                          isActive
                            ? "opacity-100 translate-x-0"
                            : "opacity-50 translate-x-4"
                        }`}
                        style={{ transitionDelay: `${index * 200}ms` }}
                      >
                        {/* Timeline Node */}
                        <div
                          className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 transition-all duration-500 ${
                            isActive
                              ? "bg-white border-[#DDA853] shadow-lg scale-110"
                              : "bg-gray-100 border-gray-300"
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 transition-colors duration-500 ${
                              isActive ? milestone.color : "text-gray-400"
                            }`}
                          />

                          {/* Pulse effect for current milestone */}
                          {isCurrent && (
                            <div className="absolute inset-0 rounded-full border-2 border-[#DDA853] animate-ping" />
                          )}
                        </div>

                        {/* Content */}
                        <div
                          className={`flex-1 ${
                            milestone.bgColor
                          } p-6 rounded-2xl shadow-sm transition-all duration-500 ${
                            isCurrent
                              ? "shadow-lg transform -translate-y-1"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <span
                              className={`px-3 py-1 text-sm font-bold rounded-full ${
                                isActive
                                  ? "bg-[#DDA853] text-white"
                                  : "bg-gray-200 text-gray-500"
                              }`}
                            >
                              {milestone.year}
                            </span>
                            <h4 className="text-xl font-bold text-gray-800">
                              {t(milestone.titleKey)}
                            </h4>
                          </div>

                          <p className="text-gray-600 mb-3 leading-relaxed">
                            {t(milestone.descriptionKey)}
                          </p>

                          <div className="flex items-center gap-2 text-[#DDA853] font-semibold">
                            <TrendingUp className="w-4 h-4" />
                            <span>{t(milestone.achievementKey)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}
