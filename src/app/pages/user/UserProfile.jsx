import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Settings, Save, Heart, Edit, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router'; // 1. Added useParams
import UserLayout from '@/app/components/UserLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { useAuth } from '@/app/context/AuthContext';

export default function UserProfile() {
  const navigate = useNavigate();
  
  // 2. Extract name and email directly from the URL parameters
  const { name: urlName, email: urlEmail } = useParams();
  const { user, updateProfile } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);

  // Helper to format URL strings (e.g., "Pavan" or "pavan2%40gmail.com")
  const formatValue = (val) => val ? decodeURIComponent(val).replace(/-/g, ' ') : '';

  // 3. Initialize state directly from the URL values
  const [profileData, setProfileData] = useState({
    name: formatValue(urlName) || 'User Name',
    email: formatValue(urlEmail) || 'user@email.com',
    bio: user?.bio || '',
  });

  // Keep bio in sync if it loads from AuthContext, 
  // but keep name/email synced with the URL
  useEffect(() => {
    setProfileData(prev => ({
      ...prev,
      name: formatValue(urlName) || prev.name,
      email: formatValue(urlEmail) || prev.email,
      bio: user?.bio || prev.bio,
    }));
  }, [urlName, urlEmail, user?.bio]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileData);
      
      // Update URL to match new data if name/email changed
      const safeName = encodeURIComponent(profileData.name.replace(/\s+/g, '-'));
      const safeEmail = encodeURIComponent(profileData.email);
      
      alert('Profile updated successfully!');
      setIsEditing(false);
      
      // Navigate to the new URL to keep the data consistent
      navigate(`/Zyndex/User/${safeName}/${safeEmail}/Profile`, { replace: true });
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData({
      name: formatValue(urlName),
      email: formatValue(urlEmail),
      bio: user?.bio || '',
    });
  };

  const favourites = [];

  return (
    <UserLayout>
      <div className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">My Profile</h1>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Profile Card - Reading from URL-based state */}
            <motion.div className="lg:col-span-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100">
                <div className="size-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-semibold mx-auto mb-4">
                  {profileData.name.charAt(0).toUpperCase()}
                </div>
                {/* Correctly displays the name from URL */}
                <h3 className="font-semibold text-gray-900 mb-1">{profileData.name}</h3>
                {/* Correctly displays the email from URL */}
                <p className="text-sm text-gray-500 mb-4">{profileData.email}</p>
                <div className="text-xs text-gray-500">
                  <p>Member since</p>
                  <p className="font-medium">January 2026</p>
                </div>
              </div>
            </motion.div>

            {/* Content Area */}
            <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <Tabs defaultValue="settings" className="w-full">
                  <TabsList className="w-full justify-start border-b px-6 bg-gray-50/50">
                    <TabsTrigger value="favourites" className="gap-2">
                      <Heart className="size-4" /> My Favourites
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="gap-2">
                      <Settings className="size-4" /> Account Settings
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="settings" className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-lg font-bold text-gray-900">Account Settings</h2>
                      <button 
                        onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
                        className={`p-2 rounded-lg transition-colors ${isEditing ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}
                      >
                        {isEditing ? <X className="size-5" /> : <Edit className="size-5" />}
                      </button>
                    </div>
                    
                    <form onSubmit={handleSave} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <input
                              name="name"
                              value={profileData.name}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full pl-10 pr-4 py-2.5 border rounded-xl disabled:bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <input
                              name="email"
                              value={profileData.email}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full pl-10 pr-4 py-2.5 border rounded-xl disabled:bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Bio</label>
                        <textarea
                          name="bio"
                          value={profileData.bio}
                          onChange={handleChange}
                          disabled={!isEditing}
                          rows={4}
                          className="w-full px-4 py-2.5 border rounded-xl disabled:bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                        />
                      </div>

                      {isEditing && (
                        <button type="submit" className="px-8 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 shadow-lg flex items-center gap-2">
                          <Save className="size-4" /> Save Profile
                        </button>
                      )}
                    </form>
                  </TabsContent>
                  
                  {/* Favourites Tab remains as per your original logic */}
                  <TabsContent value="favourites" className="p-16 text-center text-gray-400">
                    <Heart className="size-16 mx-auto mb-4 text-orange-200" />
                    <p className="text-lg font-medium">No favourites yet</p>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}