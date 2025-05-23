import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/Auth/use-auth";
import { Check, AlertCircle, Loader2, ArrowRight, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";
import { useAppTranslation } from "@/contexts/TranslationContext";
import { use } from "i18next";

const EmailVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const verifyToken = searchParams.get("v");
  const { getVerifyEmail, useSendVerifyEmail } = useAuth();
  const { t } = useAppTranslation();
  
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");
  const resendEmailMutation = useSendVerifyEmail();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!verifyToken) {
        setStatus("error");
        setMessage(t("emailVerify.error.invalidToken"));
        return;
      }

      try {
        const dataVerify = await getVerifyEmail(verifyToken);
        console.log(dataVerify.data);
        
        if (dataVerify.code === 200) {
          setStatus("success");
          setMessage(dataVerify.message || t("emailVerify.success.message"));
        } else {
          setStatus("error");
          setMessage(
            dataVerify.error?.message || t("emailVerify.error.expiredToken")
          );
        }
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.message || t("emailVerify.error.generalError")
        );
      }
    };

  }, [verifyToken, t]);

  const handleResendEmail = async () => {
    await useSendVerifyEmail();
  };

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
              <h1 className="text-2xl font-bold text-center text-gray-800">{t("emailVerify.title")}</h1>
            </CardHeader>
            <CardContent className="bg-white px-6 pt-4 pb-6">
              {status === "loading" && (
                <div className="text-center py-10">
                  <div className="flex justify-center mb-4">
                    <Loader2 className="h-12 w-12 animate-spin text-amber-500" />
                  </div>
                  <p className="text-gray-600">{t("emailVerify.verifying")}</p>
                </div>
              )}

              {status === "success" && (
                <motion.div
                  className="text-center py-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative mx-auto w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full bg-green-100 animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="h-12 w-12 text-green-600" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-green-600 mb-2">
                    {t("emailVerify.success.title")}
                  </h2>
                  <p className="text-gray-600 mb-6">{message}</p>
                  <p className="text-gray-500 text-sm">
                    {t("emailVerify.success.fullAccess")}
                  </p>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  className="text-center py-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative mx-auto w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full bg-red-100 animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <AlertCircle className="h-12 w-12 text-red-600" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-red-600 mb-2">
                    {t("emailVerify.error.title")}
                  </h2>
                  <p className="text-gray-600 mb-4">{message}</p>
                </motion.div>
              )}
            </CardContent>
            <CardFooter className="bg-gray-50 px-6 py-4 flex flex-col gap-3">
              <Button
                onClick={() => navigate("/profile")}
                className="w-full bg-primary-yellow hover:bg-amber-600 transition-all duration-300"
                disabled={status === "loading"}
              >
                {status === "success" ? (
                  <span className="flex items-center">
                    {t("emailVerify.buttons.goToProfile")} <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                ) : (
                  t("emailVerify.buttons.backToProfile")
                )}
              </Button>
              
              {status === "error" && (
                <Button
                  variant="outline"
                  onClick={handleResendEmail}
                  disabled={resendEmailMutation.isLoading}
                  className="w-full border-amber-500 text-amber-600 hover:bg-amber-50"
                >
                  {resendEmailMutation.isLoading ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("emailVerify.buttons.sending")}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      {t("emailVerify.buttons.resendEmail")}
                    </span>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 text-sm text-gray-500"
        >
          <p>
            {t("emailVerify.help.problem")} <Link to="/help" className="text-primary-black hover:underline">{t("emailVerify.help.supportCenter")}</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default EmailVerify;