import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingScreen from '../loading-screen/loading-screen';

const RouteTransition = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Define paths that should skip the loading screen
    const skipLoadingPaths = ['/error', '/404', '/not-found', '/unauthorized', '/forbidden', '/server-error'];
    
    // Check if current path should skip loading
    const shouldSkipLoading = skipLoadingPaths.some(path => 
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
    
    if (shouldSkipLoading) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate loading time - increased to 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return isLoading ? <LoadingScreen /> : children;
};

export default RouteTransition;