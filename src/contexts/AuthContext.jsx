import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (on app load)
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        // Get token from localStorage
        const token = localStorage.getItem("authToken");

        if (!token) {
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        // Verify token with backend
        const response = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          // Token invalid or expired
          localStorage.removeItem("authToken");
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        setUser(null);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/auth/login", { email, password });

      const { token, user } = response.data;

      // Save token to localStorage
      localStorage.setItem("authToken", token);

      // Update state
      setUser(user);
      setIsAuthenticated(true);
      setError(null);

      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call logout API if needed
      // await axios.post('/api/auth/logout');

      // Clear local storage
      localStorage.removeItem("authToken");

      // Update state
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/auth/register", userData);

      const { token, user } = response.data;

      // Save token to localStorage
      localStorage.setItem("authToken", token);

      // Update state
      setUser(user);
      setIsAuthenticated(true);
      setError(null);

      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      return {
        success: false,
        error: err.response?.data?.message || "Registration failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
