import { TailwindStyle } from "@/utils/Enum";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check, Star, Crown, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { usePaymentForm } from "@/hooks/Payment/use-payment-form";

export default function HomePrice() {
  const { t } = useTranslation();
  const { onSubmit: createPayment, isLoading: isCreatingPayment } =
    usePaymentForm();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Separate loading states for each plan
  const [loadingStates, setLoadingStates] = useState({
    monthly: false,
    yearly: false,
  });

  const handlePayment = async (billingType) => {
    if (!isAuthenticated) {
      navigate("/signin", {
        replace: true,
        state: {
          from: "/home",
          action: "payment",
          plan: billingType,
        },
      });
      return;
    }

    // Set loading state for specific plan
    setLoadingStates((prev) => ({
      ...prev,
      [billingType]: true,
    }));

    try {
      if (billingType === "monthly") {
        const paymentData = {
          buyerName: user?.name || user?.firstName || "Student",
          buyerEmail: user?.email || "",
          buyerPhone: user?.phone || "0354545454",
          description: `thanh toan premium`,
          items: [
            {
              name: "premium 1 thang",
              quantity: 1,
              price: 99000,
            },
          ],
        };

        await createPayment(paymentData);
      } else if (billingType === "yearly") {
        const paymentData = {
          buyerName: user?.name || user?.firstName || "Student",
          buyerEmail: user?.email || "",
          buyerPhone: user?.phone || "0354545454",
          description: `thanh toan premium`,
          items: [
            {
              name: "premium 12 thang",
              quantity: 1,
              price: 990000,
            },
          ],
        };

        await createPayment(paymentData);
      }

      // Loading will be cleared automatically on redirect
    } catch (error) {
      console.error("Payment creation failed:", error);

      // Clear loading state on error
      setLoadingStates((prev) => ({
        ...prev,
        [billingType]: false,
      }));
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      {/* Page heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-black to-gray-700 bg-clip-text text-transparent">
          {t("home.pricing.title")}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan to unlock your artistic journey
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Add padding and margin to accommodate the scaled card and badge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 pt-8 pb-4">
          {/* ---------- CARD #1 - Per Course ---------- */}
          <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden">
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-primary-black">
                  {t("home.pricing.plans.perCourse.title")}
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  {t("home.pricing.plans.perCourse.subtitle")}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-primary-black">
                    {t("home.pricing.plans.perCourse.price")}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {t("home.pricing.plans.perCourse.period")}
                </p>
              </div>

              {/* Description */}
              <div className="text-center mb-6">
                <p className="text-gray-600 text-sm">
                  {t("home.pricing.plans.perCourse.description")}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {t("home.pricing.plans.perCourse.features", {
                  returnObjects: true,
                }).map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- CARD #2 - Monthly (HIGHLIGHTED) ---------- */}
          <div className="relative">
            {/* Popular Badge - positioned outside the card to avoid clipping */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-white text-primary-yellow px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                <Crown className="w-4 h-4 mr-2" />
                MOST POPULAR
              </div>
            </div>

            <div className="bg-primary-yellow rounded-2xl shadow-2xl transform scale-105 border-4 border-third-yellow overflow-hidden mt-4">
              <div className="p-8 pt-12">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-third-yellow bg-opacity-20 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-primary-blue" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {t("home.pricing.plans.monthly.title")}
                  </h2>
                  <p className="text-yellow-100 text-sm mt-2">
                    {t("home.pricing.plans.monthly.subtitle")}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-6 pb-6 border-b border-secondary-yellow border-opacity-30">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">
                      {t("home.pricing.plans.monthly.price")}
                    </span>
                  </div>
                  <p className="text-sm text-yellow-100 mt-1">
                    {t("home.pricing.plans.monthly.period")}
                  </p>
                  <div
                    className={`mt-2 inline-block ${TailwindStyle.HIGHLIGHT_FRAME} text-xs px-3 py-1 rounded-full`}
                  >
                    Best Value!
                  </div>
                </div>

                {/* Description */}
                <div className="text-center mb-6">
                  <p className="text-yellow-100 text-sm">
                    {t("home.pricing.plans.monthly.description")}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {t("home.pricing.plans.monthly.features", {
                    returnObjects: true,
                  }).map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  onClick={() => handlePayment("monthly")}
                  disabled={loadingStates.monthly}
                  className={` w-full py-4 ${
                    TailwindStyle.HIGHLIGHT_FRAME
                  } text-white rounded-full text-lg font-bold 
                                    transition-all duration-300 hover:-translate-y-1 hover:shadow-lg inline-block text-center
                                    ${
                                      loadingStates.monthly
                                        ? "opacity-30 cursor-not-allowed"
                                        : ""
                                    }
                                    `}
                >
                  {loadingStates.monthly
                    ? "Processing..."
                    : t("home.pricing.plans.monthly.button")}
                </button>
              </div>
            </div>
          </div>

          {/* ---------- CARD #3 - Annual ---------- */}
          <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden">
            {/* Savings Badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                Save 17%
              </div>
            </div>

            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Crown className="w-8 h-8 text-primary-blue" />
                </div>
                <h2 className="text-2xl font-bold text-primary-black">
                  {t("home.pricing.plans.annual.title")}
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  {t("home.pricing.plans.annual.subtitle")}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-primary-black">
                    {t("home.pricing.plans.annual.price")}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {t("home.pricing.plans.annual.period")}
                </p>
              </div>

              {/* Description */}
              <div className="text-center mb-6">
                <p className="text-gray-600 text-sm">
                  {t("home.pricing.plans.annual.description")}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {t("home.pricing.plans.annual.features", {
                  returnObjects: true,
                }).map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                onClick={() => handlePayment("yearly")}
                disabled={loadingStates.yearly}
                className={` w-full py-4 ${
                  TailwindStyle.HIGHLIGHT_FRAME
                } text-white rounded-full text-lg font-bold 
                                    transition-all duration-300 hover:-translate-y-1 hover:shadow-lg inline-block text-center
                                    ${
                                      loadingStates.yearly
                                        ? "opacity-70 cursor-not-allowed"
                                        : "cursor-pointer"
                                    }
                                    `}
              >
                {loadingStates.yearly
                  ? "Processing..."
                  : t("home.pricing.plans.annual.button")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Full Plans Button */}
      <div className="w-full flex justify-center mt-12">
        <Link
          to="/pricing"
          className={`inline-flex items-center px-8 py-4 ${TailwindStyle.HIGHLIGHT_FRAME} font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
        >
          {t("home.pricing.viewFullPlans")}
          <svg
            className="ml-2 w-5 h-5"
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
