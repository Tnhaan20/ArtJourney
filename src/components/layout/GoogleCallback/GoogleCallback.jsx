import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { AuthServices } from "@/domains/services/Auth/auth.services";
import { useToast } from "@/utils/Toast";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

export default function GoogleCallback() {
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, login } = useAuthStore();
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [processingAuth, setProcessingAuth] = useState(true);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const { toast } = useToast();

  useEffect(() => { 
    const isPendingGoogleAuth =
      sessionStorage.getItem("google_auth_pending") === "true";
      const cookie = Cookies.get('TK')
      console.log("Cookie 1 value:", cookie);
      
    // Process the callback as soon as the component mounts
    const handleGoogleCallback = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setError(null);

        // If we're coming from Google auth flow
        if (searchParams.get("issignin") === "true" || isPendingGoogleAuth) {
          console.log(
            "Processing Google sign-in flow with direct user data fetch"
          );
          console.log("Cookie 2 value:", cookie);


          // Remove the pending flag since we're handling it now
          sessionStorage.removeItem("google_auth_pending");

           try {
             // Call the /me endpoint to get the user data

             console.log("Cookie 3 value:", cookie);
             
            console.log(2);
            
            const userResponse = await AuthServices.get.me();
            console.log("User response from /me API:", userResponse);

            // Kiểm tra status code từ user response
            if (userResponse.code !== 200) {
              throw new Error(
                userResponse.message || "Failed to retrieve user profile"
              );
            }

            // Extract user data from response
            const userData = userResponse.data;

            if (userData) {
              // Login with the user data
              await login(userData);
              setAuthCheckComplete(true);
            } else {
              throw new Error("No user data found in response");
            }
          } catch (userErr) {
            console.error("Error getting user data:", userErr);
            setIsError(true);
            setError(userErr);

            toast({
              title: "Profile error",
              description: userErr.message || "Failed to retrieve your profile",
              variant: "destructive",
            });
          }
        } else {
          console.log(
            "No issignin parameter or pending flag, using regular callback flow"
          );
          try {
            // Regular callback flow
            const result = await refetch();

            // Kiểm tra kết quả từ refetch
            if (result.error || !result.data || result.data.code !== 200) {
              throw new Error(
                result.error?.message ||
                  result.data?.message ||
                  "Google authentication failed"
              );
            }
          } catch (refetchErr) {
            console.error("Error in refetch:", refetchErr);
            setIsError(true);
            setError(refetchErr);

            toast({
              title: "Authentication error",
              description:
                refetchErr.message || "Failed to complete Google sign-in",
              variant: "destructive",
            });
          }
        }
      } catch (err) {
        console.error("Unexpected error in Google callback:", err);
        setIsError(true);
        setError(err);

        toast({
          title: "Authentication error",
          description:
            err.message || "An unexpected error occurred during sign-in",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setProcessingAuth(false);
      }
    };

    handleGoogleCallback();
  }, [searchParams, login, toast]);

  // Check if authentication was successful after the Google callback is processed
  useEffect(() => {
    if (isAuthenticated && user && !isLoading && !processingAuth && !isError) {
      setAuthCheckComplete(true);
      console.log(
        "Authentication completed successfully, preparing to redirect"
      );

      // After a short delay, redirect to the appropriate page based on user role
      // This ensures user sees the success message before redirect
      const timer = setTimeout(() => {
        console.log("Redirecting user based on role:", user.role);

        if (user.role === 1) {
          navigate("/dashboard");
        } else if (user.role === 3) {
          navigate("/task-designer");
        } else if (user.role === 2) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }, 2500); // 2.5 second delay for user to see success message

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, isLoading, processingAuth, isError, navigate]);

  // Add logging for component render state
  console.log("GoogleCallback render state:", {
    isLoading,
    isError,
    error,
    authCheckComplete,
    processingAuth,
    user,
    isAuthenticated,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-white">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-yellow mb-4">
            {isLoading ? "Completing Google Sign In..." : ""}
            {isError ? "Sign In Failed" : ""}
            {authCheckComplete ? "Sign In Successful!" : ""}
            {!isLoading && !isError && !authCheckComplete
              ? "Processing..."
              : ""}
          </h2>

          {(isLoading || (!isError && !authCheckComplete)) && (
            <div className="flex flex-col items-center">
              <Loader2 className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-yellow mb-4"></Loader2>
              <p className="text-gray-600 mt-2">
                {isLoading
                  ? "Verifying your Google account..."
                  : "Setting up your profile..."}
              </p>
            </div>
          )}

          {isError && (
            <div className="text-red-600 mt-4">
              <p>
                {error?.message ||
                  googleRefetchErrorData?.message ||
                  "An error occurred during sign in. Please try again."}
              </p>
              <button
                onClick={() => (window.location.href = "/signin")}
                className="mt-4 px-4 py-2 bg-primary-yellow text-white rounded-md hover:bg-secondary-yellow transition-colors"
              >
                Return to Sign In
              </button>
            </div>
          )}

          {authCheckComplete && (
            <div className="text-green-600 mt-4">
              <p className="mb-4">
                You've been successfully signed in with Google!
                <br />
                Redirecting you to dashboard...
              </p>
              <div className="flex justify-center">
                <div className="animate-pulse h-2 w-24 bg-primary-yellow rounded"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}