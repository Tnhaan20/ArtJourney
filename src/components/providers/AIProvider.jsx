import React from "react";
import { useLocation } from "react-router-dom";
import { AIChat } from "@/components/layout/AIAssistant/AIChat";

export const AIProvider = ({ children }) => {
  const location = useLocation();

  // Pages where chat should be hidden
  const excludedPaths = [
    "/signin",
    "/signup",
    "/admin",
    "/dashboard",
    "/quiz",
    "/email-verify",
    "/server-error", // 500 error page
    "/unauthorized", // 404-like error page
    "/payment-callback", // Payment callback pages
    "/challenge", // Challenge pages (legacy)
    "/course/challenge/", // Challenge pages (legacy)
    "course/", // This will match any course-related route including challenges
    "/survey"
  ];

  const shouldHideChat = excludedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // Additional specific check for challenge routes
  const isChallengeRoute = /^\/course\/\d+\/challenge\/\d+/.test(
    location.pathname
  );

  return (
    <>
      {children}
      {!shouldHideChat && !isChallengeRoute && <AIChat />}
    </>
  );
};
