import { Routes, Route } from 'react-router-dom';
import { BicepsFlexed } from 'lucide-react';
import UserInputForm from './components/UserInputForm';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/Overview';
import Diet from './pages/Diet';
import Macros from './pages/Macros';
import Hydration from './pages/Hydration';
import Exercise from './pages/Exercise';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';

const LandingHeader = () => (
  <header className="px-6 pt-10 pb-12 flex items-center justify-center max-w-2xl mx-auto w-full">
    <div className="flex items-center justify-center w-12 h-12 bg-wpPurple/15 rounded-xl mr-3 border border-wpPurple/20 shadow-inner shrink-0">
      <BicepsFlexed strokeWidth={1.5} className="w-7 h-7 text-wpPurple" />
    </div>
    <h1 className="text-3xl font-bold text-white tracking-wide">Brotein</h1>
  </header>
);

const Placeholder = ({ title }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center mt-4">
    <h2 className="text-2xl font-bold text-wpText mb-2">{title}</h2>
    <p className="text-wpMuted">This module is under development.</p>
  </div>
);

export default function App() {
  return (
    <Routes>
      {/* 1. Public Landing & Form Route */}
      <Route path="/" element={
        <div className="min-h-screen bg-wpNavy flex flex-col font-sans">
          <LandingHeader />
          <main className="flex-grow bg-wpBg rounded-t-[40px] px-6 pt-10 pb-12 shadow-2xl mt-2 border-t border-gray-800/50">
            <div className="max-w-xl mx-auto space-y-8">
              <UserInputForm />
            </div>
          </main>
        </div>
      } />

      {/* 2. Restored the missing DashboardLayout wrapper so your Sidebar renders */}
      <Route path="/app" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="diet" element={<Diet />} />
        <Route path="macros" element={<Macros />} />
        <Route path="hydration" element={<Hydration />} />
        <Route path="exercise" element={<Exercise />} />
        <Route path="progress" element={<Progress />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 3. Safety Fallback: Just in case your Sidebar links use /dashboard instead of /app */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="diet" element={<Diet />} />
        <Route path="macros" element={<Macros />} />
        <Route path="hydration" element={<Hydration />} />
        <Route path="exercise" element={<Exercise />} />
        <Route path="progress" element={<Progress />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
    </Routes>
  );
}