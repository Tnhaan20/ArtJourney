import { TailwindStyle } from "@/utils/Enum";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePaymentForm } from "@/hooks/Payment/use-payment-form";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { Loader2 } from "lucide-react";

export default function Pricing() {
  const { t } = useTranslation();
  const [billingType, setBillingType] = useState("monthly");
  const { user, isAuthenticated } = useAuthStore();
  const { onSubmit: createPayment, isLoading: isCreatingPayment } =
    usePaymentForm();
  const navigate = useNavigate();
  const toggleBilling = (type) => {
    setBillingType(type);
  };

  const handlePayment = async (billingType) => {
    if (!isAuthenticated) {
      navigate("/signin", { replace: true });
    }

    if (billingType === "monthly") {
      try {
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
      } catch (error) {
        console.error("Payment creation failed:", error);
      }
    } else if (billingType === "yearly") {
      try {
        const paymentData = {
          buyerName: user?.name || user?.firstName || "Student",
          buyerEmail: user?.email || "",
          buyerPhone: user?.phone || "0354545454",
          description: `thanh toan premium`,
          items: [
            {
              name: "premium 12 thang",
              quantity: 12,
              price: 990000,
            },
          ],
        };

        await createPayment(paymentData);
      } catch (error) {
        console.error("Payment creation failed:", error);
      }
    }
  };

  // Helper function để render button content
  const renderButtonContent = (planType, defaultText) => {
    if (isCreatingPayment && billingType === planType) {
        return (
          <div className="flex items-center justify-center space-x-2 cursor-not-allowed opacity-50">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{t("pricing.processing", "Processing...")}</span>
          </div>
        );
    }
    

    if (!isAuthenticated) {
      return t("pricing.signInToPurchase", "Sign In to Purchase");
    }

    return defaultText;
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

                <button
                  type="submit"
                  onClick={() => handlePayment(billingType)}
                  disabled={isCreatingPayment}
                  className={` w-full py-4 ${
                    TailwindStyle.HIGHLIGHT_FRAME
                  } text-white rounded-full text-lg font-bold 
                    transition-all duration-300 hover:-translate-y-1 hover:shadow-lg inline-block text-center
                    ${
                      isCreatingPayment
                        ? "opacity-70 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    `}
                >
                  {isCreatingPayment
                    ? "Processing..."
                    : t("pricing.plans.monthly.button")}
                </button>

                
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

                <button
                  type="submit"
                  onClick={() => handlePayment(billingType)}
                  disabled={isCreatingPayment}
                  className={` w-full py-4 ${
                    TailwindStyle.HIGHLIGHT_FRAME
                  } text-white rounded-full text-lg font-bold 
                    transition-all duration-300 hover:-translate-y-1 hover:shadow-lg inline-block text-center
                    ${
                      isCreatingPayment
                        ? "opacity-70 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    `}
                >
                  {isCreatingPayment
                    ? "Processing..."
                    : t("pricing.plans.yearly.button")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
