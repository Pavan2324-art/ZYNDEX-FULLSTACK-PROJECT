import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PageTransitionWrapper from './components/PageTransitionWrapper';
import ErrorBoundary from './components/ErrorBoundary';
import RootLayout from './components/RootLayout';

// User & Auth Pages
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import AdminRequest from './pages/AdminRequest';
import UserAuthenticator from './pages/UserAuthenticator';
import AdminAuthenticator from './pages/AdminAuthenticator';

// General Pages
import About from './pages/About';
import Contact from './pages/Contact';
import Browse from './pages/Browse';
import BrowseCategory from './pages/BrowseCategory';
import HelpCenter from './pages/HelpCenter';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UploadResource from './pages/admin/UploadResource';
import ResourceManagement from './pages/admin/ResourceManagement';
import UserAccessManagement from './pages/admin/UserAccessManagement';
import FeedbackReview from './pages/admin/FeedbackReview';
import AdminProfile from './pages/admin/AdminProfile';

// User Pages
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
      // --- AUTHENTICATION ROUTES ---
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
      {
        path: "/Zyndex/Admin/Log-In",
        element: <PageTransitionWrapper duration={500}><Login /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/Admin/Sign-Up",
        element: <PageTransitionWrapper duration={500}><AdminRequest /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/Auth/Forgot-Password",
        element: <PageTransitionWrapper duration={500}><ForgotPassword /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/User/authenticator-page",
        element: <PageTransitionWrapper duration={500}><UserAuthenticator /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/Admin/authenticator-page",
        element: <PageTransitionWrapper duration={500}><AdminAuthenticator /></PageTransitionWrapper>
      },

      // --- GENERAL / INFO ROUTES ---
      {
        path: "/Zyndex/About/About-Us",
        element: <PageTransitionWrapper duration={500}><About /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/About/Contact",
        element: <PageTransitionWrapper duration={500}><Contact /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/Contact/Contact-Us",
        element: <PageTransitionWrapper duration={500}><Contact /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/Resources/Browse",
        element: <PageTransitionWrapper duration={500}><Browse /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/Resources/Categories",
        element: <PageTransitionWrapper duration={500}><BrowseCategory /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/Browse-Category/:category",
        element: <PageTransitionWrapper duration={500}><BrowseCategory /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/Help-Center",
        element: <PageTransitionWrapper duration={500}><HelpCenter /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/Support/Help-Center",
        element: <PageTransitionWrapper duration={500}><HelpCenter /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/FAQ",
        element: <PageTransitionWrapper duration={500}><FAQ /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/Support/FAQ",
        element: <PageTransitionWrapper duration={500}><FAQ /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/Privacy-Policy",
        element: <PageTransitionWrapper duration={500}><Privacy /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/Legal/Privacy",
        element: <PageTransitionWrapper duration={500}><Privacy /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/Terms-of-Service",
        element: <PageTransitionWrapper duration={500}><Terms /></PageTransitionWrapper>
      },
      {
        path: "/Zyndex/Legal/Terms",
        element: <PageTransitionWrapper duration={500}><Terms /></PageTransitionWrapper>
      },

      // --- PROTECTED ADMIN ROUTES ---
      {
        path: "/Zyndex/Admin/:name/:email/Dashboard",
        element: <ProtectedRoute role="admin"><PageTransitionWrapper duration={500}><AdminDashboard /></PageTransitionWrapper></ProtectedRoute>
      },
      {
        path: "/Zyndex/Admin/:name/:email/Upload-Resource",
        element: <ProtectedRoute role="admin"><PageTransitionWrapper duration={500}><UploadResource /></PageTransitionWrapper></ProtectedRoute>
      },
      {
        path: "/Zyndex/Admin/:name/:email/Resource-Management",
        element: <ProtectedRoute role="admin"><PageTransitionWrapper duration={500}><ResourceManagement /></PageTransitionWrapper></ProtectedRoute>
      },
      {
        path: "/Zyndex/Admin/:name/:email/User-Access",
        element: <ProtectedRoute role="admin"><PageTransitionWrapper duration={500}><UserAccessManagement /></PageTransitionWrapper></ProtectedRoute>
      },
      {
        path: "/Zyndex/Admin/:name/:email/Feedback-Review",
        element: <ProtectedRoute role="admin"><PageTransitionWrapper duration={500}><FeedbackReview /></PageTransitionWrapper></ProtectedRoute>
      },
      {
        path: "/Zyndex/Admin/:name/:email/Profile",
        element: <ProtectedRoute role="admin"><PageTransitionWrapper duration={500}><AdminProfile /></PageTransitionWrapper></ProtectedRoute>
      },

      // --- PROTECTED USER ROUTES ---
      {
        path: "/Zyndex/User/:name/:email/Home",
        element: <ProtectedRoute role="user"><PageTransitionWrapper duration={500}><UserHome /></PageTransitionWrapper></ProtectedRoute>
      },
      {
        path: "/Zyndex/User/:name/:email/Search",
        element: <ProtectedRoute role="user"><PageTransitionWrapper duration={500}><SearchResults /></PageTransitionWrapper></ProtectedRoute>
      },
      {
        path: "/Zyndex/User/:name/:email/Resource/:id",
        element: <ProtectedRoute role="user"><PageTransitionWrapper duration={500}><ResourceDetail /></PageTransitionWrapper></ProtectedRoute>
      },
      {
        path: "/Zyndex/User/:name/:email/Profile",
        element: <ProtectedRoute role="user"><PageTransitionWrapper duration={500}><UserProfile /></PageTransitionWrapper></ProtectedRoute>
      },

      // --- LEGACY / REDIRECTS ---
      {
        path: "/Zyndex/Log-In",
        element: <Navigate to="/Zyndex/User/Log-In" replace />
      },
      {
        path: "/admin-request",
        element: <Navigate to="/Zyndex/Admin/Sign-Up" replace />
      },
      {
        path: "*",
        element: <Navigate to="/" replace />
      }
    ]
  }
]);