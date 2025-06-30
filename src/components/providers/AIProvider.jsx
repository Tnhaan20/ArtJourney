import React from "react";
import { useLocation } from "react-router-dom";
import { AIChat } from "@/components/layout/AIAssistant/AIChat";

export const AIProvider = ({ children }) => {
  const location = useLocation();

  // Pages where chat should be hidden
  const excludedPaths = ["/signin", "/signup", "/admin", "/dashboard", "/email-verify"];
  const shouldHideChat = excludedPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {children}
      {!shouldHideChat && <AIChat />}
    </>
  );
};
