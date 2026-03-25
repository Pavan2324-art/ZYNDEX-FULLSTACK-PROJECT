import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, isAdmin, isUser } = useAuth();

  // Redirect to login using a path relative to the basename
  if (!isAuthenticated) {
    return <Navigate to="/User/Log-In" replace />;
  }

  // Ensure roles match or send back to login
  if ((role === 'admin' && !isAdmin) || (role === 'user' && !isUser)) {
    return <Navigate to="/User/Log-In" replace />;
  }

  return children;
}