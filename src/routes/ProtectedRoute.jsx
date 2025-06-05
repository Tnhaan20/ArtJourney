import { useAuthStore } from "@/domains/store/use-auth-store";
import { useRoleStore, USER_ROLES, ROLE_NAMES } from "@/domains/store/use-role-store";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
  adminOnly = false,
  restrictAdmin = false,
  requireAuth = true,
}) {
  const { user, role, isAuthenticated, isLoading } = useAuthStore();
  const { hasRole } = useRoleStore();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Check if user is admin (role = 2)
  const isAdmin = isAuthenticated && role === USER_ROLES.ADMIN ;
  console.log(`User role: ${role}, Is Admin: ${isAdmin}`);
  
  // If this route restricts admin access and user is admin, redirect to admin dashboard
  if (restrictAdmin && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  // If authentication is not required, allow access (for public routes)
  if (!requireAuth) {
    return children;
  }

  // If user is not authenticated and auth is required, redirect to login page
  if (!isAuthenticated) {
    return (
      <Navigate to="/signin" state={{ from: location.pathname }} replace />
    );
  }

  // If this route is admin-only and user is not admin, deny access
  if (adminOnly && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If specific roles are specified, check if user has required role
  if (allowedRoles.length > 0) {
    const hasRequiredRole = allowedRoles.some((allowedRole) => {
      if (typeof allowedRole === "string") {
        return hasRole({ role }, allowedRole);
      }
      return role === allowedRole;
    });

    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // If authenticated and authorized, render the children
  return children;
}
