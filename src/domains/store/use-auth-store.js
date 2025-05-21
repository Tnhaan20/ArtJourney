import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthServices } from "@/domains/services/Auth/auth.services";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      role: null,

      login: async (userData) => {
        try {
          set({
            isAuthenticated: true,
            user: {
              id: userData.userId,
              email: userData.email,
              name: userData.fullName || "",
              avatar: userData.avatarUrl,
              status: userData.status,
              gender: userData.gender,
              birthday: userData.birthday,
              status: userData.status,
            },
            role: userData.role,
          });
        } catch (error) {
          console.error("Login error", error);
        }
      },

      getCurrentUser: () => {
        const state = get();
        return {
          isAuthenticated: state.isAuthenticated,
          user: state.user,
          role: state.role,
        };
      },

      checkAuth: async () => {
        try {
          // Validate the current session
          const response = await AuthServices.get.me();
          console.log("checkAuth response:", response);

          // Based on the API response structure where user data is in the data field
          const userData = response?.data;

          if (userData) {
            set({
              user: {
                id: userData.userId,
                email: userData.email,
                name: userData.fullName || "",
                avatar: userData.avatarUrl,
                status: userData.status,
                gender: userData.gender,
                birthday: userData.birthday,
                status: userData.status,
              },
              role: userData.role,
              isAuthenticated: true,
            });
            console.log("User authenticated:", userData);
          }
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
          await AuthServices.post.logout();
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
