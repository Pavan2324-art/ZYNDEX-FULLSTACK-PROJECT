import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useParams } from 'react-router'; // Added useParams
import { Search, FlaskConical, Calculator, BookOpen, Landmark, Sparkles, TrendingUp } from 'lucide-react';
import UserLayout from '@/app/components/UserLayout';
import { useAuth } from '@/app/context/AuthContext';

export default function UserHome() {
  const navigate = useNavigate();
  
  // 1. Get the dynamic data directly from the URL
  const { name, email } = useParams(); 
  
  const [searchQuery, setSearchQuery] = useState('');
  const { getUrlSafeName, getUrlSafeEmail, user } = useAuth();

  // 2. Format the name for the UI: replace hyphens with spaces and decode URL characters
  const displayName = name 
    ? decodeURIComponent(name).replace(/-/g, ' ') 
    : (user?.name || 'User');

  const handleCategoryClick = (category) => {
    // Using parameters from URL to ensure navigation stays within this user's scope
    navigate(`/Zyndex/User/${name}/${email}/Search?category=${category.toLowerCase()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/Zyndex/User/${name}/${email}/Search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    { title: 'Science', description: 'Explore physics, chemistry, biology, and more', icon: FlaskConical, gradient: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-100', count: '0 resources' },
    { title: 'Mathematics', description: 'From algebra to calculus and beyond', icon: Calculator, gradient: 'from-green-500 to-emerald-500', bgColor: 'bg-green-100', count: '0 resources' },
    { title: 'Literature', description: 'Classic and contemporary literary works', icon: BookOpen, gradient: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-100', count: '0 resources' },
    { title: 'History', description: 'Discover the past and its impact on today', icon: Landmark, gradient: 'from-orange-500 to-red-500', bgColor: 'bg-orange-100', count: '0 resources' },
  ];

  const resources = [];

  return (
    <UserLayout>
      <div className="py-12 px-6 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-orange-50">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="size-4" />
              Your Learning Hub
            </motion.div>
            
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {/* 3. Personalized Welcome using the URL name */}
                Welcome {displayName}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Explore our comprehensive collection of educational materials
            </p>
          </motion.div>

          {/* Categories Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <TrendingUp className="size-8 text-orange-600" />
              </motion.div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={index}
                    onClick={() => handleCategoryClick(category.title)}
                    className="group relative bg-white rounded-2xl shadow-lg p-6 cursor-pointer overflow-hidden border border-gray-100"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${category.bgColor} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                    <div className="relative">
                      <motion.div 
                        className={`size-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}
                      >
                        <Icon className="size-8 text-white" />
                      </motion.div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">{category.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500 font-medium">{category.count}</p>
                        <div className="text-orange-600 font-semibold text-sm">Explore →</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Empty State / Resources Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Resources</h2>
            <div className="relative bg-white rounded-3xl shadow-xl p-20 text-center border border-gray-100">
              <div className="relative">
                <motion.div className="size-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="size-10 text-orange-600" />
                </motion.div>
                <p className="text-xl font-bold text-gray-900 mb-2">No resources available yet</p>
                <p className="text-gray-600">Check back later for updates for {decodeURIComponent(email)}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </UserLayout>
  );
}