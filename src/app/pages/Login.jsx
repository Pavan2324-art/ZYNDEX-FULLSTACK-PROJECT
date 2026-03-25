import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Mail, Lock, User, ArrowRight, Menu, X, Eye, EyeOff, Shield, Loader2 } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  
  // UI States
  const [activeTab, setActiveTab] = useState('user');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New Loading State

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Update URL when activeTab or isLogin changes
  useEffect(() => {
    const path = location.pathname;
    let targetPath;
    
    if (activeTab === 'user') {
      targetPath = isLogin ? '/Zyndex/User/Log-In' : '/Zyndex/User/Sign-Up';
    } else {
      targetPath = isLogin ? '/Zyndex/Admin/Log-In' : '/Zyndex/Admin/Sign-Up';
    }
    
    if (path !== targetPath && (
      path.includes('/Log-In') || 
      path.includes('/Sign-In') || 
      path.includes('/Sign-Up') ||
      path === '/Zyndex/User/Log-In' ||
      path === '/Zyndex/Admin/Log-In'
    )) {
      navigate(targetPath, { replace: true });
    }
  }, [activeTab, isLogin, navigate, location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading animation
    
    const authData = {
      email: email.trim(),
      password: password,
      role: activeTab.toUpperCase()
    };

    try {
      if (isLogin) {
        const res = await login(authData); 
        const userData = res.user || res; 
        const resName = userData.name || "User";
        const resEmail = userData.email || email;
        const resRole = res.role || activeTab;

        const safeName = encodeURIComponent(resName.replace(/\s+/g, '-'));
        const safeEmail = encodeURIComponent(resEmail);

        if (resRole.toString().toUpperCase().includes('ADMIN')) {
          navigate(`/Zyndex/Admin/${safeName}/${safeEmail}/Dashboard`);
        } else {
          navigate(`/Zyndex/User/${safeName}/${safeEmail}/Home`);
        }
      } else {
        await register({ ...authData, name: name.trim() });
        alert("Registration successful! Now try logging in.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Login Error:", error);
      const message = error.response?.data?.message || "Authentication failed. Check console.";
      alert(message);
    } finally {
      setIsLoading(false); // Stop loading regardless of success/failure
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
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

      {/* Header */}
      <motion.header 
        className="relative z-10 py-6 px-8 backdrop-blur-sm border-b border-orange-200/50 glass-3d"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
            <div className="relative bg-gradient-to-br from-orange-600 to-red-600 p-2.5 rounded-xl shadow-lg">
              <BookOpen className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Zyndex</h1>
              <p className="text-xs text-slate-500 font-medium">Educational Excellence</p>
            </div>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/Zyndex/About/About-Us" className="px-3 py-2 text-sm text-slate-600 hover:text-orange-600 rounded-lg">About Us</Link>
            <Link to="/Zyndex/Support/Help-Center" className="px-3 py-2 text-sm text-slate-600 hover:text-orange-600 rounded-lg">Help Center</Link>
          </nav>

          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="lg:hidden p-2">
            {showMobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 flex-grow">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-250px)]">
          <motion.div className="space-y-8" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
              Unlock the Power of <br />
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Shared Knowledge</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">Access a curated library of educational resources and transform your teaching experience.</p>
          </motion.div>

          <motion.div className="relative" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl blur-3xl opacity-10" />
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 p-8 lg:p-10 depth-3d-float glass-3d">
              
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{isLogin ? 'Welcome Back' : 'Get Started'}</h2>
              <p className="text-slate-600 mb-8">{isLogin ? 'Enter your credentials' : 'Create your account'}</p>

              {/* Role Tabs */}
              <div className="relative mb-8 p-1 bg-slate-100 rounded-2xl flex gap-2">
                <button onClick={() => setActiveTab('user')} className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold z-10 flex items-center justify-center gap-2 transition-colors ${activeTab === 'user' ? 'text-white bg-orange-600 shadow-md' : 'text-slate-600'}`}>
                  <User className="size-4" /> User
                </button>
                <button onClick={() => setActiveTab('admin')} className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold z-10 flex items-center justify-center gap-2 transition-colors ${activeTab === 'admin' ? 'text-white bg-blue-600 shadow-md' : 'text-slate-600'}`}>
                  <Shield className="size-4" /> Admin
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div className="relative flex items-center">
                    <User className="absolute left-4 size-5 text-slate-400" />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl outline-none focus:border-orange-600" required />
                  </div>
                )}

                <div className="relative flex items-center">
                  <Mail className="absolute left-4 size-5 text-slate-400" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl outline-none focus:border-orange-600" required />
                </div>

                <div className="relative flex items-center">
                  <Lock className="absolute left-4 size-5 text-slate-400" />
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border rounded-xl outline-none focus:border-orange-600" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-slate-400">
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full relative group ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                >
                  <div className="relative flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl shadow-lg">
                    {isLoading ? (
                      <>
                        <Loader2 className="size-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {isLogin ? 'Sign In' : 'Create Account'}
                        <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </motion.button>

                <div className="text-center pt-4">
                  <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-sm text-slate-600">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span className="text-orange-600 font-semibold">{isLogin ? 'Sign Up' : 'Sign In'}</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="relative z-10 border-t border-orange-200/50 py-8 px-6 text-center text-sm text-slate-600 backdrop-blur-sm">
        © 2026 Zyndex. All rights reserved.
      </footer>
    </div>
  );
}