import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, UploadCloud, CheckCircle2 } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function Settings() {
  const savedData = localStorage.getItem('broteinUser');
  
  if (!savedData) return <Navigate to="/" />;
  
  let initialUserData = {};
  try { 
    initialUserData = JSON.parse(savedData); 
  } catch (e) { 
    return <Navigate to="/" />; 
  }

  // Real, functional state tied to the form inputs
  const [formData, setFormData] = useState({
    name: initialUserData.name || '',
    email: initialUserData.email || '',
    weight: initialUserData.weight || 70,
    height: initialUserData.height || 175,
    age: initialUserData.age || 25,
    gender: initialUserData.gender || 'male',
    goal: initialUserData.goal || 'maintain'
  });

  const [isSaving, setIsSaving] = useState(false);

  // Handle actual data saving and global app update
  const handleSave = () => {
    setIsSaving(true);
    
    // Save to local storage
    localStorage.setItem('broteinUser', JSON.stringify(formData));
    
    // Slight delay for the success animation, then refresh to recalculate all app formulas
    setTimeout(() => {
      setIsSaving(false);
      window.location.reload();
    }, 800);
  };

  const handleSignOut = () => {
    localStorage.removeItem('broteinUser');
    window.location.href = '/';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'weight' || name === 'height' || name === 'age') ? Number(value) : value
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in p-2 pb-24 max-w-4xl mx-auto">
      
      {/* HEADER WITH SIGN OUT BUTTON */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-wpText">Settings</h2>
          <p className="text-wpMuted mt-1">Manage your physical metrics to keep calculations accurate.</p>
        </div>
        <button 
          onClick={handleSignOut}
          className="flex items-center px-5 py-2.5 rounded-xl font-bold text-sm text-red-500 bg-red-50 hover:bg-red-100 transition-colors shadow-sm"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </button>
      </div>

      {/* SINGLE MASTER FORM CARD */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-8 md:p-10">
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-wpText mb-1">Public Profile</h3>
            <p className="text-sm text-wpMuted">This is how others will see you on the platform.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-wpPurple/10 flex items-center justify-center text-wpPurple text-3xl font-black shadow-inner uppercase">
              {formData.name ? formData.name.charAt(0) : 'U'}
            </div>
            <div>
              <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-wpText shadow-sm hover:bg-gray-50 mb-2 transition-colors">
                <UploadCloud className="w-4 h-4 mr-2" /> Change Avatar
              </button>
              <p className="text-xs text-wpMuted">JPG, GIF or PNG. Max size of 800K</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-wpMuted uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#f8f9fc] border border-gray-200 text-wpText rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-wpPurple/20 focus:border-wpPurple transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-wpMuted uppercase tracking-wider">Email Address (Optional)</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@brotein.app"
                className="w-full bg-[#f8f9fc] border border-gray-200 text-wpText rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-wpPurple/20 focus:border-wpPurple transition-all" 
              />
            </div>
          </div>

          <div className="pt-8 mt-4 border-t border-gray-100">
            <h3 className="text-xl font-bold text-wpText mb-6">Physical Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-wpMuted uppercase tracking-wider">Weight (kg)</label>
                <input 
                  type="number" 
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full bg-[#f8f9fc] border border-gray-200 text-wpText font-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-wpPurple/20 focus:border-wpPurple transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-wpMuted uppercase tracking-wider">Height (cm)</label>
                <input 
                  type="number" 
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full bg-[#f8f9fc] border border-gray-200 text-wpText font-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-wpPurple/20 focus:border-wpPurple transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-wpMuted uppercase tracking-wider">Age</label>
                <input 
                  type="number" 
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full bg-[#f8f9fc] border border-gray-200 text-wpText font-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-wpPurple/20 focus:border-wpPurple transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-wpMuted uppercase tracking-wider">Primary Goal</label>
                <select 
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full bg-[#f8f9fc] border border-gray-200 text-wpText font-bold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-wpPurple/20 focus:border-wpPurple transition-all cursor-pointer"
                >
                  <option value="cut">Cut</option>
                  <option value="maintain">Maintain</option>
                  <option value="bulk">Bulk</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Centered Functional Save Button */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center justify-center px-12 py-4 rounded-full text-white font-black text-lg transition-all w-full md:w-auto shadow-xl ${
              isSaving ? 'bg-emerald-500 scale-95' : 'bg-wpPurple hover:bg-indigo-600 hover:scale-105 active:scale-95 shadow-wpPurple/30 hover:shadow-wpPurple/50'
            }`}
          >
            {isSaving ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center">
                <CheckCircle2 className="w-6 h-6 mr-2" /> Data Saved!
              </motion.div>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>

      </div>
    </div>
  );
}