import { createContext, useContext, useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { TransitionLoader } from '@/app/components/PageTransitionWrapper';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Your "Golden Link" from the ngrok terminal
  const NGROK_BASE_URL = "https://leggy-brentley-lipotropic.ngrok-free.dev";

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('zyndex_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [role, setRole] = useState(() => {
    const savedRole = localStorage.getItem('zyndex_role');
    return savedRole || null;
  });

  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
      // Updated to use NGROK_BASE_URL and skip-browser-warning header
      const response = await axios.post(`${NGROK_BASE_URL}/api/auth/login`, authData, {
        headers: {
          'ngrok-skip-browser-warning': '69420'
        }
      });

      const { user, role: rawRole, token } = response.data;
      const { name, email } = user;

      localStorage.setItem('zyndex_token', token);

      const cleanRole = (rawRole || 'USER').toString().replace('ROLE_', '').toLowerCase();
      
      setUser({ name, email });
      setRole(cleanRole);

      console.log("State updated for:", name);
      return response.data;
    } catch (error) {
      console.error("Context Login Error:", error);
      throw error;
    }
  };

  const register = async (regData) => {
    try {
      // Updated to use NGROK_BASE_URL and skip-browser-warning header
      const response = await axios.post(`${NGROK_BASE_URL}/api/auth/register`, regData, {
        headers: {
          'ngrok-skip-browser-warning': '69420'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Registration API Error:", error);
      throw error;
    }
  };

  const logout = (navigate) => { // Accept navigate as an argument
    setIsLoggingOut(true);
    setTimeout(() => {
      setUser(null);
      setRole(null);
      localStorage.removeItem('zyndex_user');
      localStorage.removeItem('zyndex_role');
      localStorage.removeItem('zyndex_token');
      setIsLoggingOut(false);
      
      // Use navigate instead of window.location
      if (navigate) {
        navigate('/User/Log-In'); 
      }
    }, 2000);
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    return updatedUser;
  };

  const getUrlSafeName = () => user?.name ? encodeURIComponent(user.name.replace(/\s+/g, '-')) : 'user';
  const getUrlSafeEmail = () => user?.email ? encodeURIComponent(user.email) : 'email';

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
            duration={2000} 
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