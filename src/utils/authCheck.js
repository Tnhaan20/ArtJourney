import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/utils/Toast";

export const useAuthCheck = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const checkAuth = (targetPath) => {
    if (!isAuthenticated) {
      // Show a toast notification
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue",
        variant: "warning",
      });
      
      // Redirect to sign-in with the return path
      navigate("/signin", { 
        state: { from: targetPath || location.pathname } 
      });
      return false;
    }
    return true;
  };

  return checkAuth;
};