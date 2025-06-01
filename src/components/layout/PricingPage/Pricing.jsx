import { TailwindStyle } from "@/utils/Enum";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Pricing() {
  const { t } = useTranslation();
  const [billingType, setBillingType] = useState("monthly");

  const toggleBilling = (type) => {
    setBillingType(type);
  };

  return (
    <div className="min-h-screen py-10 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            {t("pricing.title")}
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            {t("pricing.subtitle")}
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center items-center gap-4 mb-12">
            <div className="flex bg-white rounded-full p-2 shadow-lg border border-gray-200">
              <button
                onClick={() => toggleBilling("monthly")}
                className={`px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 ${
                  billingType === "monthly"
                    ? `{ ${TailwindStyle.HIGHLIGHT_FRAME} text-white shadow-md}`
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {t("pricing.billing.monthly")}
              </button>
              <button
                onClick={() => toggleBilling("yearly")}
                className={`px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 flex items-center gap-2 ${
                  billingType === "yearly"
                    ? `{ ${TailwindStyle.HIGHLIGHT_FRAME} text-white shadow-md}`
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {t("pricing.billing.yearly")}
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {t("pricing.billing.discount")}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Pricing Grid */}
        <div className="flex justify-center mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl w-full">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center relative transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {t("pricing.plans.free.title")}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t("pricing.plans.free.subtitle")}
                </p>
              </div>

              <div className="text-5xl font-bold text-gray-800 mb-3">
                {t("pricing.plans.free.price")}
              </div>
              <div className="text-gray-500 mb-8">
                {t("pricing.plans.free.currency")}{" "}
                {t("pricing.plans.free.period")}
              </div>

              <div className="text-gray-500 text-sm mb-8 h-12 flex items-center justify-center">
                {t("pricing.plans.free.description")}
              </div>

              <div className="text-left mb-8 space-y-4">
                {t("pricing.plans.free.features", { returnObjects: true }).map(
                  (feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  )
                )}
              </div>

              <Link
                to="/signup"
                className="w-full py-4 bg-gray-100 text-gray-800 border-2 border-gray-200 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-gray-200 hover:-translate-y-1 inline-block text-center"
              >
                {t("pricing.plans.free.button")}
              </Link>
            </div>

            {/* Monthly Plan */}
            {billingType === "monthly" && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-xl border-2 border-amber-200 text-center relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform scale-105">
                <div
                  className={` ${TailwindStyle.HIGHLIGHT_FRAME} absolute -top-4 left-1/2 transform -translate-x-1/2 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg `}
                >
                  {t("pricing.plans.monthly.badge")}
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {t("pricing.plans.monthly.title")}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t("pricing.plans.monthly.subtitle")}
                  </p>
                </div>

                <div className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-3">
                  {t("pricing.plans.monthly.price")}
                </div>
                <div className="text-gray-500 mb-8">
                  {t("pricing.plans.monthly.currency")}{" "}
                  {t("pricing.plans.monthly.period")}
                </div>

                <div className="text-gray-500 text-sm mb-8 h-12 flex items-center justify-center">
                  {t("pricing.plans.monthly.description")}
                </div>

                <div className="text-left mb-8 space-y-4">
                  {t("pricing.plans.monthly.features", {
                    returnObjects: true,
                  }).map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/pay/monthly"
                  className={` w-full py-4 ${TailwindStyle.HIGHLIGHT_FRAME} text-white rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg inline-block text-center `}
                >
                  {t("pricing.plans.monthly.button")}
                </Link>
                <div className="text-green-600 text-sm mt-4 font-medium">
                  {t("pricing.plans.monthly.guarantee")}
                </div>
              </div>
            )}

            {/* Yearly Plan */}
            {billingType === "yearly" && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-xl border-2 border-amber-200 text-center relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform scale-105">
                <div
                  className={` ${TailwindStyle.HIGHLIGHT_FRAME} absolute -top-4 left-1/2 transform -translate-x-1/2 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg `}
                >
                  {t("pricing.plans.yearly.badge")}
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {t("pricing.plans.yearly.title")}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t("pricing.plans.yearly.subtitle")}
                  </p>
                </div>

                <div className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-3">
                  {t("pricing.plans.yearly.price")}
                </div>
                <div className="text-gray-500 mb-8">
                  {t("pricing.plans.yearly.currency")}{" "}
                  {t("pricing.plans.yearly.period")}
                </div>

                <div className="text-gray-500 text-sm mb-8 h-12 flex items-center justify-center">
                  {t("pricing.plans.yearly.description")}
                </div>

                <div className="text-left mb-8 space-y-4">
                  {t("pricing.plans.yearly.features", {
                    returnObjects: true,
                  }).map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/pay/annual"
                  className={` w-full py-4 ${TailwindStyle.HIGHLIGHT_FRAME} text-white rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg inline-block text-center `}
                >
                  {t("pricing.plans.yearly.button")}
                </Link>
                <div className="text-green-600 text-sm mt-4 font-medium">
                  {t("pricing.plans.yearly.guarantee")}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pay-per-course Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {t("pricing.payPerCourse.title")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("pricing.payPerCourse.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Course */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center relative transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {t("pricing.payPerCourse.basic.title")}
                </h3>
                <p className="text-gray-600">
                  {t("pricing.payPerCourse.basic.subtitle")}
                </p>
              </div>

              <div className="text-4xl font-bold text-gray-800 mb-3">
                {t("pricing.payPerCourse.basic.price")}
              </div>
              <div className="text-gray-500 mb-6">
                {t("pricing.payPerCourse.basic.currency")}{" "}
                {t("pricing.payPerCourse.basic.period")}
              </div>

              <div className="text-gray-500 text-sm mb-6 h-8 flex items-center justify-center">
                {t("pricing.payPerCourse.basic.description")}
              </div>

              <div className="text-left mb-6 space-y-3">
                {t("pricing.payPerCourse.basic.features", {
                  returnObjects: true,
                }).map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/pay/per-course-basic"
                className="w-full py-3 bg-gray-100 text-gray-800 border-2 border-gray-200 rounded-full text-base font-semibold transition-all duration-300 hover:bg-gray-200 hover:-translate-y-1 inline-block text-center"
              >
                {t("pricing.payPerCourse.basic.button")}
              </Link>
            </div>

            {/* Advanced Course */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center relative transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {t("pricing.payPerCourse.advanced.title")}
                </h3>
                <p className="text-gray-600">
                  {t("pricing.payPerCourse.advanced.subtitle")}
                </p>
              </div>

              <div className="text-4xl font-bold text-gray-800 mb-3">
                {t("pricing.payPerCourse.advanced.price")}
              </div>
              <div className="text-gray-500 mb-6">
                {t("pricing.payPerCourse.advanced.currency")}{" "}
                {t("pricing.payPerCourse.advanced.period")}
              </div>

              <div className="text-gray-500 text-sm mb-6 h-8 flex items-center justify-center">
                {t("pricing.payPerCourse.advanced.description")}
              </div>

              <div className="text-left mb-6 space-y-3">
                {t("pricing.payPerCourse.advanced.features", {
                  returnObjects: true,
                }).map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/pay/per-course-advanced"
                className={` w-full py-4 ${TailwindStyle.HIGHLIGHT_FRAME} text-white rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg inline-block text-center `}
              >
                {t("pricing.payPerCourse.advanced.button")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
