import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/domains/store/use-auth-store';

export default function SurveyProtection({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCurrentUser } = useAuthStore();
  const { isAuthenticated, user } = getCurrentUser();

  useEffect(() => {
    // Allow access to auth routes and survey route
    const allowedRoutes = ['/signin', '/signup', '/signin-google', '/survey', '/authentication/verify-email'];
    const isAllowedRoute = allowedRoutes.some(route => location.pathname.startsWith(route));

    // If user is authenticated and it's their first login .loginCount === 1) and hasn't completed survey
    if (isAuthenticated && user && user.loginCount === 1 && !user.isSurveyed && !isAllowedRoute) {
      navigate('/survey', { replace: true });
    }
  }, [isAuthenticated, user, location.pathname, navigate]);

  // If first-time user needs to complete survey and is not on survey page, don't render children
  if (isAuthenticated && user && user.loginCount === 1 && !user.isSurveyed && location.pathname !== '/survey') {
    return null;
  }

  return children;
}