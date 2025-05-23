import { AuthServices } from "@/domains/services/Auth/auth.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/utils/Toast";
import { QueryKey } from "@/domains/store/query-key";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { useRoleStore, USER_ROLES } from "@/domains/store/use-role-store";

export const useAuth = () => {
  const { toast } = useToast();
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const push = (path) => navigate(path);

  const loginMutation = useMutation({
    mutationKey: [QueryKey.LOGIN],
    mutationFn: async (payload) => await AuthServices.post.login(payload),
    onSuccess: async (data) => {
      const successMessage = data?.message;

      toast({
        title: "Login success",
        description: successMessage,
        variant: "success",
      });

      try {
        // Get user data from response
        const userData = data?.data?.userDTO;
        if (!userData) {
          throw new Error("User data not found in response");
        }

        // Store user data in auth store
        login(userData);

        // Check for redirect path from location state
        const redirectPath = location.state?.from;

        // Get role name using our new role store
        const roleName = useRoleStore.getState().getRoleName(userData.role);
        console.log("User role:", roleName);

        // Handle role-based redirects using the role store
        if (useRoleStore.getState().hasRole(userData, USER_ROLES.ADMIN)) {
          push("/dashboard");
          return;
        } else if (useRoleStore.getState().hasRole(userData, USER_ROLES.INSTRUCTOR)) {
          push("/dashboard"); // Instructors also go to dashboard
          return;
        } else if (redirectPath) {
          // Redirect to the page the user was trying to access
          push(redirectPath);
          return;
        }

        // Default redirect to home
        push("/");
      } catch (error) {
        console.error("Authentication error:", error);
        toast({
          title: "Authentication error",
          description:
            error.message || "There was a problem with your authentication",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      // More detailed error message based on the error response
      let errorMessage =
        "Invalid email, password or your account is not active";

      if (error.response) {
        if (error.response.status === 401) {
          errorMessage =
            "Invalid credentials. Please check your email and password.";
        } else if (error.response.status === 403) {
          errorMessage = "Your account is not active or has been suspended.";
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      }

      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationKey: [QueryKey.REGISTER],
    mutationFn: async (payload) => {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = payload;
      return await AuthServices.post.register(registerData);
    },
    onSuccess: (data) => {
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please sign in.",
        variant: "success",
      });

      // Navigate to signin page after successful registration
      push("/signin");
    },
    onError: (error) => {
      toast({
        title: "Registration failed",
        description:
          error.response?.data || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Google login implementation
  const googleLogin = () => {
    const initiateGoogleLogin = () => {
      try {
        const callbackUrl = `${window.location.origin}/signin-google`;
        const redirectUri = encodeURIComponent(callbackUrl);

        const googleAuthUrl = `${
          import.meta.env.VITE_PUBLIC_API_URL
          }/Authentication/google-signin?redirect_uri=${redirectUri}&issignin=true`;
        
        window.location.href = googleAuthUrl;
      } catch (error) {
        window.location.href = "/signin";
      }
    };

    return { initiateGoogleLogin };
  };

  // Google callback implementation
  const useGoogleCallback = () => {
    return useQuery({
      queryKey: [QueryKey.GOOGLE_CALLBACK],
      queryFn: async () => {
        return await AuthServices.get.googleCallback();
      },
      enabled: false,
      onSuccess: async (response) => {
        try {
          const successMessage = response?.message || "Google login successful";

          // Extract user data from response
          const userData = response?.data;

          // If we don't have user data, try to fetch it
          if (!userData) {
            console.error("No user data found in response", response);
            throw new Error("User data not found in response");
          }


          console.log("Setting user data in auth store:", userData);
          // Store user data in auth store
          login(userData);

          // Get role name using our role store
          const roleName = useRoleStore.getState().getRoleName(userData.role);
          console.log("User role:", roleName);

          if (useRoleStore.getState().hasRole(userData, USER_ROLES.ADMIN)) {
            push("/dashboard");
          } else if (useRoleStore.getState().hasRole(userData, USER_ROLES.INSTRUCTOR)) {
            push("/dashboard");
          } else {
            push("/");
          }
        } catch (error) {
          console.error("Authentication error:", error);
          toast({
            title: "Authentication error",
            description:
              error.message || "There was a problem with your authentication",
            variant: "destructive",
          });
        }
      },
      onError: (error) => {
        toast({
          title: "Google login failed",
          description:
            error.message || "Failed to complete Google authentication",
          variant: "destructive",
        });
        push("/signin");
      },
    });
  };

  const useSendVerifyEmail = () => {
    return useQuery({
      queryKey: [QueryKey.VERIFY.SEND],
      queryFn: async () => {
        return await AuthServices.get.sendVerifyEmail();
      },
      
      enabled: false,
      onSuccess: (data) => {
        toast({
          title: "Verification email sent",
          description: data?.message || "Please check your inbox.",
          variant: "success",
        });
      },
      onError: (error) => {
        toast({
          title: "Failed to send verification email",
          description:
            error.response?.data || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      },
    });
  }
   
  const useVerifyEmail = (token, options = {}) => {
    return useQuery({
      queryKey: [QueryKey.VERIFY.GET, token],
      queryFn: async () => {
        if (!token) {
          throw new Error("No verification token provided");
        }
        return await AuthServices.get.getVerifyEmail(token);
      },
      enabled: !!token && options.enabled !== false,
      retry: options.retry ?? 0,
      refetchOnWindowFocus: options.refetchOnWindowFocus ?? false,
      ...options,
    });
  };

  // Make sure to include this in your return sta tement
  return {
    loginMutation,
    registerMutation,
    googleLogin,
    useGoogleCallback,
    useSendVerifyEmail,
    useVerifyEmail,
  };
};
