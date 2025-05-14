import { createContext, useContext, useState, useEffect } from "react";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { useSearchParams } from "react-router-dom";
import { AuthServices } from "@/domains/services/Auth/auth.services";
import { useToast } from "@/utils/Toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const { checkAuth, isAuthenticated, user, role } = useAuthStore();

  // Check authentication status on app load
  useEffect(() => {
    const verifyAuthStatus = async () => {
      try {
        setIsLoading(true);
        // Check for issignin=true in URL - indicates we're coming from Google login
        const isSignIn = searchParams.get("issignin") === "true";
        const currentPath = window.location.pathname;

        if (currentPath === "/signin-google") {
          setIsLoading(false);
          return;
        }

        // Use the checkAuth method from useAuthStore
        await checkAuth();

        // Only try to handle Google sign-in if we're NOT on the callback route
        // This prevents duplicate handling of the Google flow
        if (isSignIn && currentPath !== "/signin-google") {
          setIsGoogleLoading(true);

          try {
            
            const response = await AuthServices.get.me();

            const userData = response?.data;

            if (userData) {
              await useAuthStore.getState().login(userData);
              
            } else {
              console.error("No user data found in Google sign-in response");
              
            }
          } catch (googleError) {
            console.error(
              "Failed to fetch user data after Google sign-in:",
              googleError
            );
            
          } finally {
            setIsGoogleLoading(false);
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuthStatus();
  }, [checkAuth, searchParams, toast]);

  // Provide authentication state and user information
  const contextValue = {
    isLoading,
    isGoogleLoading,
    error,
    isAuthenticated,
    user,
    role,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
