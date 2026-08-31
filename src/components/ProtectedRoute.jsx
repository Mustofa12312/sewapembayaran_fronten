import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

/**
 * Protects customer-only routes.
 * Redirects to /login if not authenticated.
 */
export default function ProtectedRoute({ children }) {
  const customerToken = useAuthStore((s) => s.customerToken);
  const location = useLocation();

  if (!customerToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
