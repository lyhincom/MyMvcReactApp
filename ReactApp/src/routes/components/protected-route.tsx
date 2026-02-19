import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthStore } from 'src/store/auth-store';
import { authService } from 'src/services/auth-service';

// ----------------------------------------------------------------------

type ProtectedRouteProps = {
  children: React.ReactNode;
};

/**
 * ProtectedRoute component that checks authentication before rendering children.
 * If not authenticated, redirects to 'hello-world' page.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  // Check authentication status on mount and when location changes
  useEffect(() => {
    checkAuth();
  }, [checkAuth, location.pathname]);

  // Verify authentication status from service (source of truth)
  const authenticated = authService.isAuthenticated();

  // Sync store with service if they differ
  useEffect(() => {
    if (authenticated !== isAuthenticated) {
      useAuthStore.getState().setAuthenticated(authenticated);
    }
  }, [authenticated, isAuthenticated]);

  // If not authenticated, redirect to hello-world
  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}

