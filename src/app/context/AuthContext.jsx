import { createContext, useContext, useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { TransitionLoader } from '@/app/components/PageTransitionWrapper';
import axios from 'axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage if available
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('zyndex_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [role, setRole] = useState(() => {
    const savedRole = localStorage.getItem('zyndex_role');
    return savedRole || null;
  });

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Persist to localStorage whenever user or role changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('zyndex_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('zyndex_user');
    }
  }, [user]);

  useEffect(() => {
    if (role) {
      localStorage.setItem('zyndex_role', role);
    } else {
      localStorage.removeItem('zyndex_role');
    }
  }, [role]);

  const login = async (authData) => {
  try {
    const response = await axios.post("http://localhost:8080/api/auth/login", authData);
    const { name, email, role: rawRole, token } = response.data;

    // 1. Safe Token Storage
    localStorage.setItem('zyndex_token', token);

    // 2. Resilient Role Cleaning (Prevents crashes if role is null/different)
    const cleanRole = (rawRole || 'USER').toString().replace('ROLE_', '').toLowerCase();
    
    // 3. Update States
    setUser({ name, email });
    setRole(cleanRole);

    // 4. Verification Logging
    console.log("State updated for:", name);
    
    return response.data;
  } catch (error) {
    console.error("Context Login Error:", error);
    throw error; // This triggers the 'Oops' page in your Login component
  }
};

  const logout = () => {
  setIsLoggingOut(true);
  setTimeout(() => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('zyndex_user');
    localStorage.removeItem('zyndex_role');
    localStorage.removeItem('zyndex_token'); // Don't forget this!
    setIsLoggingOut(false);
    window.location.href = '/Zyndex/User/Log-In';
  }, 10000);
};

  const register = async (regData) => {
  try {
    const response = await axios.post("http://localhost:8080/api/auth/register", regData);
    return response.data;
  } catch (error) {
    console.error("Registration API Error:", error);
    throw error;
  }
};

  const updateProfile = (updatedData) => {
    // Update user profile data
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    return updatedUser;
  };

  // Helper function to generate URL-safe strings
  const getUrlSafeName = () => {
    return user?.name ? encodeURIComponent(user.name.replace(/\s+/g, '-')) : 'user';
  };

  const getUrlSafeEmail = () => {
    return user?.email ? encodeURIComponent(user.email) : 'email';
  };

  const value = {
    user,
    role,
    login,
    logout,
    register,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: role === 'admin',
    isUser: role === 'user',
    isLoggingOut,
    getUrlSafeName,
    getUrlSafeEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {isLoggingOut && (
          <TransitionLoader 
            duration={2000} // Changed from 10000 for better DX
            message={`Logging out ${user?.name || 'user'}...`} 
          />
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
