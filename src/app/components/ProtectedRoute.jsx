import { Navigate } from 'react-router-dom'; // Ensure you use react-router-dom
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, isAdmin, isUser } = useAuth();

  // If not logged in, send them to the Log-In page relative to the basename
  if (!isAuthenticated) {
    return <Navigate to="/User/Log-In" replace />;
  }

  // If they are logged in but have the wrong role, 
  // you might want to send them to their specific Home instead of Log-In
  if (role === 'admin' && !isAdmin) {
    return <Navigate to="/User/Log-In" replace />;
  }

  if (role === 'user' && !isUser) {
    return <Navigate to="/User/Log-In" replace />;
  }

  return children;
}