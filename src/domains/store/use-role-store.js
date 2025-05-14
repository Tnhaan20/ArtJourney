import { create } from "zustand";

/**
 * Role constants mapped to their numeric values from the API
 */
export const USER_ROLES = {
  LEARNER: 0,
  INSTRUCTOR: 1,
  ADMIN: 2,
};

/**
 * Role names mapped to their numeric values for display purposes
 */
export const ROLE_NAMES = {
  0: "Learner",
  1: "Instructor",
  2: "Admin",
};

/**
 * Role store to manage role-related functionality
 */
export const useRoleStore = create((set, get) => ({
  // Store roles related data here if needed
  roles: USER_ROLES,
  roleNames: ROLE_NAMES,
  
  /**
   * Get the role name based on the role number
   * @param {number} roleNumber - The role number from API
   * @returns {string} The role name or 'Unknown' if not found
   */
  getRoleName: (roleNumber) => {
    const { roleNames } = get();
    return roleNames[roleNumber] || "Unknown";
  },
  
  /**
   * Check if the user has the specified role
   * @param {object} user - The user object
   * @param {Array|number|string} requiredRoles - Role or roles to check
   * @returns {boolean} Whether the user has one of the required roles
   */
  hasRole: (user, requiredRoles) => {
    if (!user) return false;
    
    // Convert single role to array for consistent handling
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    
    // Check if user's role is in the required roles array
    return roles.some(role => {
      // If the role is a string (e.g. "ADMIN"), convert it to its numeric value
      if (typeof role === "string") {
        return user.role === USER_ROLES[role.toUpperCase()];
      }
      // Otherwise compare directly
      return user.role === role;
    });
  }
}));
