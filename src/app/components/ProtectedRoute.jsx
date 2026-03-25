import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, isAdmin, isUser, isLoggingOut } = useAuth();

  // If we are logging out, don't redirect (avoids the loop)
  if (isLoggingOut) return null;

  if (!isAuthenticated) {
    return <Navigate to="/User/Log-In" replace />;
  }

  if (role === 'admin' && !isAdmin) {
    return <Navigate to="/User/Log-In" replace />;
  }

  if (role === 'user' && !isUser) {
    return <Navigate to="/User/Log-In" replace />;
  }

  return children;
}