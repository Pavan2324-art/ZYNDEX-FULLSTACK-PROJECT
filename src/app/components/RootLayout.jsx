import { Outlet } from 'react-router-dom'; // Changed from 'react-router' to 'react-router-dom'
import { AuthProvider, useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion'; 
import { BookOpen } from 'lucide-react';

/**
 * LogoutAnimation Component
 * Displays a high-fidelity full-screen transition during the logout process.
 */
function LogoutAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>

      {/* Center Content */}
      <div className="relative text-center space-y-6">
        {/* Logo Animation */}
        <motion.div className="flex justify-center">
          <div className="relative">
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur-2xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Icon Container */}
            <div className="relative bg-gradient-to-br from-orange-600 to-red-600 p-6 rounded-2xl shadow-2xl">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <BookOpen className="size-12 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Brand Text */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Zyndex
          </h1>
          <p className="text-slate-600 font-medium text-sm">Logging out...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-56 mx-auto">
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-600 to-red-600 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: 2, // Shortened for better UX during testing
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * LayoutContent Component
 * Handles the conditional rendering of the logout animation and page routes.
 */
function LayoutContent() {
  const { isLoggingOut } = useAuth();

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoggingOut && <LogoutAnimation key="logout" />}
      </AnimatePresence>
      
      {/* CRITICAL: The Outlet component acts as a placeholder. 
          It tells React Router where to render the children routes 
          defined in routes.jsx (like Login or UserHome).
      */}
      <Outlet />
    </>
  );
}

/**
 * RootLayout Component
 * The top-level wrapper for the application providing Auth context.
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <LayoutContent />
    </AuthProvider>
  );
}