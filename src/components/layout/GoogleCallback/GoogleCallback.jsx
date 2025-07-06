import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { AuthServices } from "@/domains/services/Auth/auth.services";
import { useToast } from "@/utils/Toast";
import { Loader2, CheckCircle, AlertCircle, User, Shield } from "lucide-react";
import { TailwindStyle } from "@/utils/Enum";
import { Link } from "react-router-dom";

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

          // Remove the pending flag since we're handling it now
          sessionStorage.removeItem("google_auth_pending");

          try {
            // Call the /me endpoint to get the user data

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

        if (user.role === 0) {
          navigate("/");
        } else if (user.role === 1) {
          navigate("/task-designer");
        } else if (user.role === 2) {
          navigate("/admin");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-yellow to-secondary-yellow rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isLoading && "Completing Google Sign In"}
              {isError && "Authentication Failed"}
              {authCheckComplete && "Welcome Back!"}
              {!isLoading &&
                !isError &&
                !authCheckComplete &&
                "Processing Account"}
            </h2>
            <p className="text-gray-600 text-sm">
              {isLoading && "Securely connecting with Google"}
              {isError && "There was an issue with your sign-in"}
              {authCheckComplete && "Successfully authenticated with Google"}
              {!isLoading &&
                !isError &&
                !authCheckComplete &&
                "Setting up your session"}
            </p>
          </div>

          {/* Loading State */}
          {(isLoading || (!isError && !authCheckComplete)) && (
            <div className="flex flex-col items-center space-y-6">
              {/* Enhanced Loading Animation */}
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-yellow border-t-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary-yellow" />
                </div>
              </div>

              {/* Loading Steps */}
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {isLoading
                      ? "Verifying Google account"
                      : "Setting up profile"}
                  </span>
                  
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-yellow to-secondary-yellow h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: isLoading ? "60%" : "90%",
                    }}
                  ></div>
                </div>
              </div>

              {/* Status Messages */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-blue-800">
                      {isLoading
                        ? "Authenticating with Google..."
                        : "Finalizing your session..."}
                    </p>
                    <p className="text-xs text-blue-600">
                      This may take a few moments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="flex flex-col items-center space-y-6">
              {/* Error Icon */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>

              {/* Error Message */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 w-full">
                <p className="text-red-800 text-sm font-medium mb-2">
                  {error?.message || "Authentication failed"}
                </p>
                <p className="text-red-600 text-xs">
                  Please try signing in again or contact support if the issue
                  persists.
                </p>
              </div>

              {/* Action Button */}
              <Link
                to="/signin"
                className="w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Return to Sign In
              </Link>
            </div>
          )}

          {/* Success State */}
          {authCheckComplete && (
            <div className="flex flex-col items-center space-y-6">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>

              {/* Success Message */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 w-full">
                <div className="text-center">
                  <p className="text-green-800 font-medium mb-2">
                    Welcome back{user?.name ? `, ${user.name}` : ""}!
                  </p>
                  <p className="text-green-600 text-sm mb-4">
                    You've been successfully signed in with Google.
                  </p>

                  {/* User Info if available */}
                  {user && (
                    <div className="flex items-center justify-center space-x-3 p-3 bg-white rounded-lg">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-primary-yellow rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-800">
                          {user.name || user.email}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user.role === 0
                            ? "Student"
                            : user.role === 1
                            ? "Task Designer"
                            : user.role === 2
                            ? "Admin"
                            : "User"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Redirect Progress */}
              <div className="w-full">
                <p className="text-sm text-gray-600 mb-3">
                  Redirecting to your dashboard...
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Secured by Google Authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}