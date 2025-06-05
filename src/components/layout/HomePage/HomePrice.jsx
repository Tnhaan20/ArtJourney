import { TailwindStyle } from '@/utils/Enum';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function HomePrice() {
  const { t } = useTranslation();

  return (
    <div className="py-16">
      {/* Page heading */}
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-black mb-4 ">
          {t("home.pricing.title")}
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-primary-black border-opacity-20 rounded-lg overflow-hidden">
          {/* ---------- CARD #1 - Per Course ---------- */}
          <div className="bg-white p-8 flex flex-col border-r border-primary-black border-opacity-20">
            {/* Top section */}
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-primary-black">
                {t("home.pricing.plans.perCourse.title")}
              </h2>
              <p className="text-gray-600 text-sm mt-2 h-12 flex items-center justify-center">
                {t("home.pricing.plans.perCourse.subtitle")}
              </p>
            </div>

            <div className="text-center py-6 border-t border-b border-gray-200 border-opacity-50">
              <p className="text-2xl font-bold text-primary-black">
                {t("home.pricing.plans.perCourse.price")}
              </p>
              <p className="text-sm text-gray-600">
                {t("home.pricing.plans.perCourse.period")}
              </p>
            </div>

            <div className="text-center py-4">
              <p className="text-gray-600 text-sm">
                {t("home.pricing.plans.perCourse.description")}
              </p>
            </div>

            <div className="flex-grow">
              {t("home.pricing.plans.perCourse.features", {
                returnObjects: true,
              }).map((feature, index) => (
                <div
                  key={index}
                  className={`py-3 flex items-start ${
                    index > 0 ? "border-t border-gray-200" : ""
                  }`}
                >
                  <span className="text-primary-black mr-2">✓</span>
                  <span className="text-sm text-primary-black">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/pay/per-course"
                className="w-full py-2 border border-primary-yellow text-primary-yellow rounded font-medium hover:bg-primary-yellow hover:text-white transition-colors duration-300 inline-flex items-center justify-center"
              >
                {t("home.pricing.plans.perCourse.button")}
              </Link>
            </div>
          </div>

          {/* ---------- CARD #2 - Monthly ---------- */}
          <div className="bg-white p-8 flex flex-col border-r border-primary-black">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-primary-black">
                {t("home.pricing.plans.monthly.title")}
              </h2>
              <p className="text-gray-600 text-sm mt-2 h-12 flex items-center justify-center">
                {t("home.pricing.plans.monthly.subtitle")}
              </p>
            </div>

            <div className="text-center py-6 border-t border-b border-gray-200">
              <p className="text-2xl font-bold text-primary-black">
                {t("home.pricing.plans.monthly.price")}
              </p>
              <p className="text-sm text-gray-600">
                {t("home.pricing.plans.monthly.period")}
              </p>
            </div>

            <div className="text-center py-4">
              <p className="text-gray-600 text-sm">
                {t("home.pricing.plans.monthly.description")}
              </p>
            </div>

            <div className="flex-grow">
              {t("home.pricing.plans.monthly.features", {
                returnObjects: true,
              }).map((feature, index) => (
                <div
                  key={index}
                  className={`py-3 flex items-start ${
                    index > 0 ? "border-t border-gray-200" : ""
                  }`}
                >
                  <span className="text-primary-black mr-2">✓</span>
                  <span className="text-sm text-primary-black">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/pay/monthly"
                className="w-full py-2 border border-primary-yellow text-primary-yellow rounded font-medium hover:bg-primary-yellow hover:text-white transition-colors duration-300 inline-flex items-center justify-center"
              >
                {t("home.pricing.plans.monthly.button")}
              </Link>
            </div>
          </div>

          {/* ---------- CARD #3 - Annual ---------- */}
          <div className="bg-white p-8 flex flex-col">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-primary-black">
                {t("home.pricing.plans.annual.title")}
              </h2>
              <p className="text-gray-600 text-sm mt-2 h-12 flex items-center justify-center">
                {t("home.pricing.plans.annual.subtitle")}
              </p>
            </div>

            <div className="text-center py-6 border-t border-b border-gray-200">
              <p className="text-2xl font-bold text-primary-black">
                {t("home.pricing.plans.annual.price")}
              </p>
              <p className="text-sm text-gray-600">
                {t("home.pricing.plans.annual.period")}
              </p>
            </div>

            <div className="text-center py-4">
              <p className="text-gray-600 text-sm">
                {t("home.pricing.plans.annual.description")}
              </p>
            </div>

            <div className="flex-grow">
              {t("home.pricing.plans.annual.features", {
                returnObjects: true,
              }).map((feature, index) => (
                <div
                  key={index}
                  className={`py-3 flex items-start ${
                    index > 0 ? "border-t border-gray-200" : ""
                  }`}
                >
                  <span className="text-primary-black mr-2">✓</span>
                  <span className="text-sm text-primary-black">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/pay/annual"
                className="w-full py-2 border border-primary-yellow text-primary-yellow rounded font-medium hover:bg-primary-yellow hover:text-white transition-colors duration-300 inline-flex items-center justify-center"
              >
                {t("home.pricing.plans.annual.button")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* View Full Plans Button */}
      <div className="w-full flex justify-center mt-8">
        <Link
          to="/pricing"
          className={`inline-flex items-center px-6 py-3 bg-primary-yellow text-primary-white font-medium rounded-lg ${TailwindStyle.HIGHLIGHT_FRAME} hover:bg-primary-yellow/90 transition-colors duration-300`}
        >
          {t("home.pricing.viewFullPlans")}
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
