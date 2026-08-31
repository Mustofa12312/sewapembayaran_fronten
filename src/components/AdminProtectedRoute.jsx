import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

/**
 * Protects admin-only routes.
 * Redirects to /admin/login if not authenticated.
 */
export default function AdminProtectedRoute({ children }) {
  const adminToken = useAuthStore((s) => s.adminToken);
  const location = useLocation();

  if (!adminToken) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
