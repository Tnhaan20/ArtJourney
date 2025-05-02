import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { AuthServices } from "@/domains/services/Auth/auth.services";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      role: null,
      
      login: async (token) => {
        try {
          // Decode the token to extract user information
          const decoded = jwtDecode(token);
          
          set({
            isAuthenticated: true,
            user: {
              id: decoded.userId,
              email: decoded.email,
              name: decoded.fullname,
              avatar: decoded.avatar,
              status: decoded.status,
              token: token
            },
            role: decoded.role,
          });
        } catch (error) {
          console.error("Login error", error);
        }
      },
      
      // Get current user data
      getCurrentUser: () => {
        const state = get();
        return {
          isAuthenticated: state.isAuthenticated,
          user: state.user,
          role: state.role
        };
      },
      
      checkAuth: async () => {
        try {
          // Validate the current session
          await AuthServices.validate();
         
        } catch (error) {
          // If validation fails, reset auth state
          console.error("Auth validation failed", error);
          set({
            isAuthenticated: false,
            user: null,
            role: null,
          });
        }
      },
      
      logout: async () => {
        try {
          // Call logout API if needed
          await AuthServices.logout();
          // The cookie will be cleared by the server
        } catch (error) {
          console.error("Logout error", error);
        } finally {
          // Reset state regardless of API success
          set({
            isAuthenticated: false,
            user: null,
            role: null,
          });
        }
      },
    }),
    { name: "user-storage" }
  )
);
