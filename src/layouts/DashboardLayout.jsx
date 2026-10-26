import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  BicepsFlexed, LayoutDashboard, Utensils, PieChart, 
  Dumbbell, TrendingUp, Settings, Bell 
} from 'lucide-react';

export default function DashboardLayout() {
  const navigate = useNavigate();

  // Helper function to replicate the WorkPulse active sidebar link styling
  const navLinkStyle = ({ isActive }) => 
    `flex items-center px-6 py-3 my-1 mx-2 rounded-lg font-medium transition-colors ${
      isActive 
        ? 'bg-wpPurple/10 text-wpPurple border-l-4 border-wpPurple' 
        : 'text-wpMuted hover:bg-wpGray hover:text-wpText border-l-4 border-transparent'
    }`;

  const handleLogout = () => {
    localStorage.removeItem('broteinUser');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc] font-sans">
      
      {/* Sidebar - Matching the WorkPulse white sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex shrink-0">
        
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
          <div className="bg-wpPurple p-1.5 rounded-lg mr-3">
            <BicepsFlexed className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <span className="text-xl font-bold text-wpText">Brotein</span>
        </div>

        {/* Navigation Links Grouped like WorkPulse */}
        <nav className="flex-1 overflow-y-auto py-4">
          
          <div className="px-6 mb-2 mt-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Overview</p>
          </div>
          <NavLink to="/dashboard" end className={navLinkStyle}>
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </NavLink>

          <div className="px-6 mb-2 mt-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nutrition</p>
          </div>
          <NavLink to="/dashboard/diet" className={navLinkStyle}>
            <Utensils className="w-5 h-5 mr-3" /> Diet
          </NavLink>
          <NavLink to="/dashboard/macros" className={navLinkStyle}>
            <PieChart className="w-5 h-5 mr-3" /> Macros
          </NavLink>
          <NavLink to="/dashboard/hydration" className={navLinkStyle}>
            <DropletsIcon className="w-5 h-5 mr-3" /> Hydration
          </NavLink>

          <div className="px-6 mb-2 mt-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Training</p>
          </div>
          <NavLink to="/dashboard/exercise" className={navLinkStyle}>
            <Dumbbell className="w-5 h-5 mr-3" /> Exercise
          </NavLink>
          <NavLink to="/dashboard/progress" className={navLinkStyle}>
            <TrendingUp className="w-5 h-5 mr-3" /> Progress
          </NavLink>

          <div className="px-6 mb-2 mt-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Admin</p>
          </div>
          <NavLink to="/dashboard/settings" className={navLinkStyle}>
            <Settings className="w-5 h-5 mr-3" /> Settings
          </NavLink>

        </nav>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header - Matching WorkPulse topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8 shrink-0">
          <div className="flex items-center space-x-6">
            <button className="text-gray-400 hover:text-wpPurple transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80" onClick={handleLogout}>
              <div className="w-8 h-8 bg-wpPurple/10 rounded-full flex items-center justify-center text-wpPurple font-bold">
                U
              </div>
              <span className="text-sm font-medium text-wpText">Sign Out</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
             {/* This Outlet renders whatever page is clicked in the sidebar */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

// Quick fallback icon for Hydration to avoid missing import errors
const DropletsIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7 16.3c0 2.6 2.2 4.7 5 4.7s5-2.1 5-4.7c0-2-1.3-3.8-3.1-4.5-.9-.3-1.9-.3-2.8 0-1.8.7-3.1 2.5-3.1 4.5z"/><path d="M12 2v9"/>
  </svg>
);