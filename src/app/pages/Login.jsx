import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Mail, Lock, User, ArrowRight, Menu, X, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, getUrlSafeName, getUrlSafeEmail } = useAuth();
  
  const [activeTab, setActiveTab] = useState('user');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // FIXED: Removed hardcoded /Zyndex/ to prevent redirect loops.
  // React Router handles the /ZYNDEX-FULLSTACK-PROJECT/ prefix via 'basename'.
  useEffect(() => {
    const path = location.pathname;
    
    let targetPath;
    if (activeTab === 'user') {
      targetPath = isLogin ? '/User/Log-In' : '/User/Sign-Up';
    } else {
      targetPath = isLogin ? '/Admin/Log-In' : '/Admin/Sign-Up';
    }
    
    // Only navigate if the current path is different.
    if (path !== targetPath && (
      path.includes('/Log-In') || 
      path.includes('/Sign-In') || 
      path.includes('/Sign-Up')
    )) {
      navigate(targetPath, { replace: true });
    }
  }, [activeTab, isLogin, navigate, location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const authData = {
      email: email.trim(),
      password: password,
      role: activeTab.toUpperCase()
    };

    try {
      if (isLogin) {
        const res = await login(authData); 
        
        // Use context helpers for consistent URL formatting
        const safeName = getUrlSafeName();
        const safeEmail = getUrlSafeEmail();
        const resRole = res.role || activeTab;

        // FIXED: Navigation paths are now relative to the root/basename
        if (resRole.toString().toUpperCase().includes('ADMIN')) {
          navigate(`/Admin/${safeName}/${safeEmail}/Dashboard`);
        } else {
          navigate(`/User/${safeName}/${safeEmail}/Home`);
        }
        
      } else {
        await register({ ...authData, name: name.trim() });
        alert("Registration successful! Now try logging in.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Login Error:", error);
      const message = error.response?.data?.message || "Authentication failed.";
      alert(message);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[size:32px_32px]" />
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-red-400/20 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header - CLEAN PATHS */}
      <motion.header 
        className="relative z-10 py-6 px-8 backdrop-blur-sm border-b border-orange-200/50 depth-3d-elevated glass-3d"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative bg-gradient-to-br from-orange-600 to-red-600 p-2.5 rounded-xl shadow-lg">
              <BookOpen className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Zyndex</h1>
              <p className="text-xs text-slate-500 font-medium">Educational Excellence</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 flex-wrap">
            <Link to="/About/About-Us" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all">About Us</Link>
            <Link to="/About/Contact" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all">Contact</Link>
            <span className="text-slate-300">|</span>
            <Link to="/Resources/Browse" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all">Browse</Link>
            <Link to="/Support/Help-Center" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all">Help Center</Link>
          </nav>

          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="lg:hidden p-2">
            {showMobileMenu ? <X className="size-6 text-slate-600" /> : <Menu className="size-6 text-slate-600" />}
          </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-200px)]">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Unlock the Power of <br />
              <span className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">Shared Knowledge</span>
            </h1>
            <p className="text-xl text-slate-600">Access curated resources and transform your experience.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="relative">
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 p-8 lg:p-10 depth-3d-float glass-3d">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{isLogin ? 'Welcome Back' : 'Get Started'}</h2>
              <p className="text-slate-600 mb-8">{isLogin ? 'Enter credentials' : 'Create account'}</p>

              {/* Role Tabs */}
              <div className="relative mb-8 p-1 bg-slate-100 rounded-2xl flex gap-2">
                <button
                  onClick={() => setActiveTab('user')}
                  className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all z-10 flex items-center justify-center gap-2 ${
                    activeTab === 'user' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-600'
                  }`}
                >
                  <User className="size-4" /> User
                </button>
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all z-10 flex items-center justify-center gap-2 ${
                    activeTab === 'admin' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600'
                  }`}
                >
                  <Shield className="size-4" /> Admin
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <input
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name" required
                    className="w-full p-3.5 bg-slate-50 border rounded-xl outline-none focus:border-orange-600"
                  />
                )}
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email" required
                  className="w-full p-3.5 bg-slate-50 border rounded-xl outline-none focus:border-orange-600"
                />
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" required
                    className="w-full p-3.5 bg-slate-50 border rounded-xl outline-none focus:border-orange-600"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4">
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-xl shadow-lg"
                >
                  {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="inline ml-2" />
                </motion.button>

                <div className="text-center pt-4">
                  <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-orange-600 font-semibold">
                    {isLogin ? "Sign Up" : "Sign In"}
                  </button>
                  {isLogin && (
                    <div className="mt-2 text-xs">
                      <Link to="/Auth/Forgot-Password" strokeWidth={1} className="text-slate-500 hover:text-orange-600">Forgot password?</Link>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="relative z-10 border-t border-orange-200/50 py-8 px-6 text-center text-slate-600 text-sm">
        © 2026 Zyndex. All rights reserved.
      </footer>
    </div>
  );
}