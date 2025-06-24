import React, { useState, useEffect } from "react";
import {
  useSearchParams,
  useNavigate,
  Link,
  useParams,
} from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
  RefreshCcw,
  Home,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { TailwindStyle } from "@/utils/Enum";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { assets } from "@/assets/assets";

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { amount: urlAmount } = useParams(); // Extract amount from URL path
  const [status, setStatus] = useState("loading");
  const [paymentData, setPaymentData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);

  // Extract payment parameters from URL
  useEffect(() => {
    const processPaymentCallback = async () => {
      try {
        setIsProcessing(true);

        // Get payment parameters from URL based on your example
        const code = searchParams.get("code");
        const paymentId = searchParams.get("id");
        const cancel = searchParams.get("cancel");
        const paymentStatus = searchParams.get("status");
        const orderCode = searchParams.get("orderCode");

        // Extract amount from URL path (e.g., /payment-callback/amount/2000/)
        const amount = urlAmount || "0";

        console.log("Payment callback parameters:", {
          code,
          paymentId,
          cancel,
          paymentStatus,
          orderCode,
          amount,
        });

        // Simulate API call to verify payment status
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Determine payment status based on parameters
        let finalStatus = "success";

        // Check status based on the actual parameters
        if (cancel === "true" || paymentStatus === "CANCELLED") {
          finalStatus = "cancelled";
        } else if (paymentStatus === "PAID") {
          finalStatus = "success";
        } else if (paymentStatus === "PENDING") {
          finalStatus = "pending";
        } else if (paymentStatus === "PROCESSING") {
          finalStatus = "processing";
        } else if (code === "00") {
          // Code 00 means success
          finalStatus = "success";
        } else if (code === "01") {
          // Code 01 means invalid params
          finalStatus = "failed";
        } else {
          // Other cases
          finalStatus = "failed";
        }

        setStatus(finalStatus);
        setPaymentData({
          transactionId: paymentId || "N/A",
          orderId: orderCode || "N/A",
          amount: amount || "0",
          paymentMethod: "PayOS",
          message: getStatusMessage(finalStatus, paymentStatus, code),
          timestamp: new Date().toISOString(),
          code: code,
          rawStatus: paymentStatus,
        });
      } catch (error) {
        console.error("Error processing payment callback:", error);
        setStatus("failed");
        setPaymentData({
          message: "An error occurred while processing your payment",
          timestamp: new Date().toISOString(),
        });
      } finally {
        setIsProcessing(false);
      }
    };

    processPaymentCallback();
  }, [searchParams, urlAmount]);

  // Get status message based on result
  const getStatusMessage = (status, paymentStatus, code) => {
    switch (status) {
      case "success":
        return "Payment completed successfully";
      case "cancelled":
        return "Payment was cancelled by user";
      case "pending":
        return "Payment is pending confirmation";
      case "processing":
        return "Payment is being processed";
      case "failed":
        if (code === "01") {
          return "Invalid payment parameters";
        }
        return "Payment processing failed";
      default:
        return `Payment status: ${paymentStatus || "Unknown"}`;
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount || amount === "0") return "0 VND";
    return new Intl.NumberFormat("vi-VN").format(parseInt(amount)) + " VND";
  };

  // Format payment method name
  const formatPaymentMethod = (method) => {
    switch (method?.toLowerCase()) {
      case "momo":
        return "MoMo";
      case "zalopay":
        return "Zalo PAY";
      case "vnpay":
        return "VNPAY";
      default:
        return method || "Unknown";
    }
  };

  // Loading state
  if (isProcessing || status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-white to-secondary-yellow px-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-8">
              <img
                src={assets.main_logo.artjourney_logo}
                alt="ArtJourney Logo"
                className="h-12"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-none shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary-yellow via-secondary-yellow to-third-yellow"></div>
              <CardHeader className="bg-white pt-6 pb-4">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                  Processing Payment
                </h1>
              </CardHeader>
              <CardContent className="bg-white px-6 pt-4 pb-6">
                <div className="text-center py-10">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-primary-yellow/20 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-yellow border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Verifying your payment...
                  </h3>
                  <p className="text-sm text-gray-500">
                    Please wait while we confirm your transaction
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Success state
  if (status === "success") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-white to-secondary-yellow px-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-8">
              <img
                src={assets.main_logo.artjourney_logo}
                alt="ArtJourney Logo"
                className="h-12"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-none shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>
              <CardHeader className="bg-white pt-6 pb-4">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                  Payment Successful
                </h1>
              </CardHeader>
              <CardContent className="bg-white px-6 pt-4 pb-6">
                <motion.div
                  className="text-center py-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative mx-auto w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full bg-green-100 animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-green-600 mb-2">
                    Payment Completed Successfully!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for your purchase. Your subscription is now
                    active.
                  </p>

                  {/* Payment Details */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Payment Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      {paymentData?.transactionId &&
                        paymentData.transactionId !== "N/A" && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Transaction ID:
                            </span>
                            <span className="font-medium text-gray-800">
                              {paymentData.transactionId}
                            </span>
                          </div>
                        )}
                      {paymentData?.orderId &&
                        paymentData.orderId !== "N/A" && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Order ID:</span>
                            <span className="font-medium text-gray-800">
                              {paymentData.orderId}
                            </span>
                          </div>
                        )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium text-gray-800">
                          {formatCurrency(paymentData?.amount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-medium text-gray-800">
                          {formatPaymentMethod(paymentData?.paymentMethod)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium text-gray-800">
                          {new Date().toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm mb-6">
                    You can now access all course content and features.
                  </p>
                </motion.div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => navigate("/learn")}
                    className={`w-full ${TailwindStyle.HIGHLIGHT_FRAME}`}
                  >
                    <span className="flex items-center justify-center">
                      Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="w-full border-amber-500 text-amber-600 hover:bg-amber-50"
                  >
                    <span className="flex items-center justify-center">
                      <Home className="mr-2 h-4 w-4" />
                      Back to Home
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Failed state
  if (status === "failed") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-white to-secondary-yellow px-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-8">
              <img
                src={assets.main_logo.artjourney_logo}
                alt="ArtJourney Logo"
                className="h-12"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-none shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600"></div>
              <CardHeader className="bg-white pt-6 pb-4">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                  Payment Failed
                </h1>
              </CardHeader>
              <CardContent className="bg-white px-6 pt-4 pb-6">
                <motion.div
                  className="text-center py-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative mx-auto w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full bg-red-100 animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <XCircle className="h-12 w-12 text-red-600" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-red-600 mb-2">
                    Payment Could Not Be Processed
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {paymentData?.message ||
                      "There was an issue processing your payment. Please try again."}
                  </p>

                  {/* Error Details */}
                  {paymentData && (
                    <div className="bg-red-50 rounded-lg p-4 mb-6 text-left border border-red-200">
                      <h3 className="font-semibold text-red-800 mb-3 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Error Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        {paymentData.transactionId &&
                          paymentData.transactionId !== "N/A" && (
                            <div className="flex justify-between">
                              <span className="text-red-600">
                                Transaction ID:
                              </span>
                              <span className="font-medium text-red-800">
                                {paymentData.transactionId}
                              </span>
                            </div>
                          )}
                        {paymentData.orderId &&
                          paymentData.orderId !== "N/A" && (
                            <div className="flex justify-between">
                              <span className="text-red-600">Order ID:</span>
                              <span className="font-medium text-red-800">
                                {paymentData.orderId}
                              </span>
                            </div>
                          )}
                        <div className="flex justify-between">
                          <span className="text-red-600">
                            Attempted Amount:
                          </span>
                          <span className="font-medium text-red-800">
                            {formatCurrency(paymentData.amount)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-red-600">Payment Method:</span>
                          <span className="font-medium text-red-800">
                            {formatPaymentMethod(paymentData.paymentMethod)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-gray-500 text-sm mb-6">
                    No charges have been made to your account. You can try again
                    or contact support.
                  </p>
                </motion.div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => navigate(-1)}
                    className={`w-full ${TailwindStyle.HIGHLIGHT_FRAME}`}
                  >
                    <span className="flex items-center justify-center">
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      Try Again
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="w-full border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    <span className="flex items-center justify-center">
                      <Home className="mr-2 h-4 w-4" />
                      Back to Home
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Cancelled state
  if (status === "cancelled") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-white to-secondary-yellow px-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-8">
              <img
                src={assets.main_logo.artjourney_logo}
                alt="ArtJourney Logo"
                className="h-12"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-none shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></div>
              <CardHeader className="bg-white pt-6 pb-4">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                  Payment Cancelled
                </h1>
              </CardHeader>
              <CardContent className="bg-white px-6 pt-4 pb-6">
                <motion.div
                  className="text-center py-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative mx-auto w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full bg-yellow-100 animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <AlertTriangle className="h-12 w-12 text-yellow-600" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-yellow-600 mb-2">
                    Payment Was Cancelled
                  </h2>
                  <p className="text-gray-600 mb-6">
                    You cancelled the payment process. No charges have been
                    made.
                  </p>

                  <p className="text-gray-500 text-sm mb-6">
                    You can return to complete your purchase anytime.
                  </p>
                </motion.div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => navigate(-1)}
                    className={`w-full ${TailwindStyle.HIGHLIGHT_FRAME}`}
                  >
                    <span className="flex items-center justify-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Complete Payment
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/learn")}
                    className="w-full border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    <span className="flex items-center justify-center">
                      Browse Courses
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="w-full border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    <span className="flex items-center justify-center">
                      <Home className="mr-2 h-4 w-4" />
                      Back to Home
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Pending state
  if (status === "pending") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-white to-secondary-yellow px-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-8">
              <img
                src={assets.main_logo.artjourney_logo}
                alt="ArtJourney Logo"
                className="h-12"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-none shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
              <CardHeader className="bg-white pt-6 pb-4">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                  Payment Pending
                </h1>
              </CardHeader>
              <CardContent className="bg-white px-6 pt-4 pb-6">
                <motion.div
                  className="text-center py-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative mx-auto w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full bg-blue-100 animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-blue-600 mb-2">
                    Payment Pending Confirmation
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your payment is being verified. Please wait for
                    confirmation.
                  </p>

                  {/* Payment Details */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-3">
                      Payment Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      {paymentData?.transactionId &&
                        paymentData.transactionId !== "N/A" && (
                          <div className="flex justify-between">
                            <span className="text-blue-600">
                              Transaction ID:
                            </span>
                            <span className="font-medium text-blue-800">
                              {paymentData.transactionId}
                            </span>
                          </div>
                        )}
                      {paymentData?.orderId &&
                        paymentData.orderId !== "N/A" && (
                          <div className="flex justify-between">
                            <span className="text-blue-600">Order ID:</span>
                            <span className="font-medium text-blue-800">
                              {paymentData.orderId}
                            </span>
                          </div>
                        )}
                      <div className="flex justify-between">
                        <span className="text-blue-600">Amount:</span>
                        <span className="font-medium text-blue-800">
                          {formatCurrency(paymentData?.amount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">Status:</span>
                        <span className="font-medium text-blue-800">
                          {paymentData?.rawStatus || "PENDING"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => window.location.reload()}
                    className={`w-full ${TailwindStyle.HIGHLIGHT_FRAME}`}
                  >
                    <span className="flex items-center justify-center">
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      Refresh Status
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="w-full border-amber-500 text-amber-600 hover:bg-amber-50"
                  >
                    <span className="flex items-center justify-center">
                      <Home className="mr-2 h-4 w-4" />
                      Back to Home
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Processing state
  if (status === "processing") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-white to-secondary-yellow px-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-8">
              <img
                src={assets.main_logo.artjourney_logo}
                alt="ArtJourney Logo"
                className="h-12"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-none shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600"></div>
              <CardHeader className="bg-white pt-6 pb-4">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                  Processing Payment
                </h1>
              </CardHeader>
              <CardContent className="bg-white px-6 pt-4 pb-6">
                <motion.div
                  className="text-center py-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative mx-auto w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full bg-purple-100 animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-12 w-12 text-purple-600 animate-spin" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-purple-600 mb-2">
                    Payment is Being Processed
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Please wait while we process your payment. This may take a
                    few moments.
                  </p>

                  <p className="text-gray-500 text-sm mb-6">
                    Do not close this window or refresh the page.
                  </p>
                </motion.div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => window.location.reload()}
                    className={`w-full ${TailwindStyle.HIGHLIGHT_FRAME}`}
                  >
                    <span className="flex items-center justify-center">
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      Check Status
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
