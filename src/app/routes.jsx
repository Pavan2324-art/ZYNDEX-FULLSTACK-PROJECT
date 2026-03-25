import { createBrowserRouter, Navigate } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import PageTransitionWrapper from './components/PageTransitionWrapper';
import ErrorBoundary from './components/ErrorBoundary';
import RootLayout from './components/RootLayout';

// Route configuration for Zyndex application
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import AdminRequest from './pages/AdminRequest';
import UserAuthenticator from './pages/UserAuthenticator';
import AdminAuthenticator from './pages/AdminAuthenticator';
import About from './pages/About';
import Contact from './pages/Contact';
import Browse from './pages/Browse';
import BrowseCategory from './pages/BrowseCategory';
import HelpCenter from './pages/HelpCenter';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import AdminDashboard from './pages/admin/AdminDashboard';
import UploadResource from './pages/admin/UploadResource';
import ResourceManagement from './pages/admin/ResourceManagement';
import UserAccessManagement from './pages/admin/UserAccessManagement';
import FeedbackReview from './pages/admin/FeedbackReview';
import AdminProfile from './pages/admin/AdminProfile';
import UserHome from './pages/user/UserHome';
import SearchResults from './pages/user/SearchResults';
import ResourceDetail from './pages/user/ResourceDetail';
import UserProfile from './pages/user/UserProfile';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/Zyndex/User/Log-In" replace />
      },
      // User Login/Sign-Up Routes (Added leading slashes)
      {
        path: "/Zyndex/User/Log-In",
        element: <PageTransitionWrapper duration={500}><Login /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/User/Sign-In",
        element: <PageTransitionWrapper duration={500}><Login /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/User/Sign-Up",
        element: <PageTransitionWrapper duration={500}><Login /></PageTransitionWrapper>
      },
      // Admin Login/Sign-Up Routes
      {
        path: "/Zyndex/Admin/Log-In",
        element: <PageTransitionWrapper duration={500}><Login /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/Admin/Sign-Up",
        element: <PageTransitionWrapper duration={500}><AdminRequest /></PageTransitionWrapper>
      },
      // Forgot Password Route
      {
        path: "/Zyndex/Auth/Forgot-Password",
        element: <PageTransitionWrapper duration={500}><ForgotPassword /></PageTransitionWrapper>
      },
      // Legacy routes
      {
        path: "/Zyndex/Log-In",
        element: <Navigate to="/Zyndex/User/Log-In" replace />
      },
      {
        path: "/admin-request",
        element: <Navigate to="/Zyndex/Admin/Sign-Up" replace />
      },
      // User Profile & Home (Note: make sure to pass :name and :email when navigating)
      {
        path: "/Zyndex/User/:name/:email/Home",
        element: <ProtectedRoute role="user"><PageTransitionWrapper duration={500}><UserHome /></PageTransitionWrapper></ProtectedRoute>
      },
      {
        path: "/Zyndex/User/:name/:email/Profile",
        element: <ProtectedRoute role="user"><PageTransitionWrapper duration={500}><UserProfile /></PageTransitionWrapper></ProtectedRoute>
      },
      // Resource Routes
      {
        path: "/Zyndex/Resources/Browse",
        element: <PageTransitionWrapper duration={500}><Browse /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/Resources/Categories",
        element: <PageTransitionWrapper duration={500}><BrowseCategory /></PageTransitionWrapper>
      },
      // Catch-all route to prevent white screen
      {
        path: "*",
        element: <Navigate to="/" replace />
      }
    ]
  }
]);