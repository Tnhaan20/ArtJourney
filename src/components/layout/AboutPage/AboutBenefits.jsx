import React from 'react';
import { useTranslation } from "react-i18next";
import { Check, Clock, Users, Award, BookOpen } from "lucide-react";
import BestChoiceImage from "@/assets/aboutus-bestchoice.png";

export default function AboutBenefits() {
  const { t } = useTranslation();

  const benefits = [
    {
      id: 1,
      icon: Clock,
      titleKey: "about.benefits.items.flexible.title",
      descriptionKey: "about.benefits.items.flexible.description",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      icon: Award,
      titleKey: "about.benefits.items.quality.title",
      descriptionKey: "about.benefits.items.quality.description",
      color: "text-[#DDA853]",
      bgColor: "bg-yellow-50",
    },
    {
      id: 3,
      icon: BookOpen,
      titleKey: "about.benefits.items.support.title",
      descriptionKey: "about.benefits.items.support.description",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      id: 4,
      icon: Users,
      titleKey: "about.benefits.items.community.title",
      descriptionKey: "about.benefits.items.community.description",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 text-black relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DDA853]/5 rounded-full blur-3xl -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-32 -translate-x-32" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side - Enhanced Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:-rotate-1">
                <img
                  src={BestChoiceImage}
                  alt={t("about.benefits.image.alt")}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-lg font-semibold">
                      {t("about.benefits.image.overlay.title")}
                    </p>
                    <p className="text-sm opacity-90">
                      {t("about.benefits.image.overlay.subtitle")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-lg p-4 transform animate-bounce">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#DDA853]">
                    {t("about.benefits.floatingStats.satisfaction.value")}
                  </p>
                  <p className="text-xs text-gray-600">
                    {t("about.benefits.floatingStats.satisfaction.label")}
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 transform animate-bounce delay-500">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-500">
                    {t("about.benefits.floatingStats.available.value")}
                  </p>
                  <p className="text-xs text-gray-600">
                    {t("about.benefits.floatingStats.available.label")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Benefits Content */}
          <div className="lg:w-1/2 space-y-8">
            {/* Section Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DDA853]/10 rounded-full">
                <Check className="w-4 h-4 text-[#DDA853]" />
                <span className="text-[#DDA853] font-semibold text-sm uppercase tracking-wider">
                  {t("about.benefits.badge")}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="text-gray-800">
                  {t("about.benefits.title.main")}
                </span>
                <br />
                <span className="text-[#DDA853] relative">
                  {t("about.benefits.title.highlight")}
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#DDA853]/30 rounded-full" />
                </span>
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                {t("about.benefits.description")}
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.id}
                    className={`group p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${benefit.bgColor}`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className={`w-6 h-6 ${benefit.color}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <h4 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                          {t(benefit.titleKey)}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {t(benefit.descriptionKey)}
                        </p>

                        {/* Animated underline */}
                        <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[#DDA853] to-blue-500 transition-all duration-500 delay-100" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Call to Action */}
            <div className="pt-6">
              <button className="group inline-flex items-center gap-3 bg-[#DDA853] hover:bg-[#DDA853]/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105">
                <span>{t("about.benefits.cta.button")}</span>
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Check className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section with Additional Info */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-3xl font-bold text-[#DDA853]">
                {t("about.benefits.bottomStats.learners.value")}
              </p>
              <p className="text-gray-600">
                {t("about.benefits.bottomStats.learners.label")}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-blue-500">
                {t("about.benefits.bottomStats.courses.value")}
              </p>
              <p className="text-gray-600">
                {t("about.benefits.bottomStats.courses.label")}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-green-500">
                {t("about.benefits.bottomStats.success.value")}
              </p>
              <p className="text-gray-600">
                {t("about.benefits.bottomStats.success.label")}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-purple-500">
                {t("about.benefits.bottomStats.support.value")}
              </p>
              <p className="text-gray-600">
                {t("about.benefits.bottomStats.support.label")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}