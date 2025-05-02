import { AuthServices } from "@/domains/services/Auth/auth.services";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/utils/Toast";
import { QueryKey } from "@/domains/store/query-key";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const useAuth = () => {
  const { toast } = useToast();
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const push = (path) => navigate(path);
  const replace = (path) => navigate(path, { replace: true });

  

  const loginMutation = useMutation({
    mutationKey: [QueryKey.LOGIN],
    mutationFn: async (payload) =>
      await AuthServices.login(payload),
    onSuccess: (data) => {
      // Use the message from the response if available
      const successMessage = data?.message || "Welcome back";
      
      toast({
        title: "Login success",
        description: successMessage,
        variant: "success",
      });
      
      // Try to get the token using our custom function
      const accessToken = Cookies.get("TK");
      
      if (!accessToken) {
        toast({
          title: "Login error",
          description: "Could not retrieve authentication token",
          variant: "destructive",
        });
        return;
      }
      
      try {
        // Decode the token from cookies
        const decoded = jwtDecode(accessToken);

        // Store token in auth store
        login(accessToken);
        
        // Check for redirect path from location state
        const redirectPath = location.state?.from;
        
        // Handle role-based redirects
        if (decoded.role === "ADMIN") {
          push("/dashboard");
          return;
        } else if (decoded.role === "DESIGNER") {
          push("/task-designer");
          return;
        } else if (decoded.role === "MANAGER") {
          push("/dashboard");
          return;
        } else if (redirectPath) {
          // Redirect to the page the user was trying to access
          push(redirectPath);
          return;
        }

        // Default for CUSTOMER
        push("/");
      } catch (error) {
        console.error("Error decoding token:", error);
        toast({
          title: "Authentication error",
          description: "There was a problem with your authentication token",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      // More detailed error message based on the error response
      let errorMessage = "Invalid email, password or your account is not active";
      
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Invalid credentials. Please check your email and password.";
        } else if (error.response.status === 403) {
          errorMessage = "Your account is not active or has been suspended.";
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection and try again.";
      }
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  // Add the registerMutation implementation to navigate to signin after success
  
  const registerMutation = useMutation({
    mutationKey: [QueryKey.REGISTER],
    mutationFn: async (payload) => {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = payload;
      return await AuthServices.register(registerData);
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
        description: error.response?.data || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    loginMutation,
    registerMutation,
  };
};
