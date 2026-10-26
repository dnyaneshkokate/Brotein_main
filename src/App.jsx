import { useState } from 'react';
import { BicepsFlexed } from 'lucide-react';
import UserInputForm from './components/UserInputForm';
import MacroDashboard from './components/MacroDashboard';
import WorkoutPlan from './components/WorkoutPlan';

// Using a guaranteed pixel-perfect icon from Lucide React
const BicepLogo = () => (
  <div className="flex items-center justify-center w-12 h-12 bg-wpPurple/15 rounded-xl mr-3 border border-wpPurple/20 shadow-inner shrink-0">
    <BicepsFlexed strokeWidth={1.5} className="w-7 h-7 text-wpPurple" />
  </div>
);

export default function App() {
  const [userData, setUserData] = useState(null);

  return (
    <div className="min-h-screen bg-wpNavy flex flex-col font-sans">
      
      {/* Dark Navy Header */}
      <header className="px-6 pt-10 pb-12 flex items-center justify-center max-w-2xl mx-auto w-full">
        <BicepLogo />
        <h1 className="text-3xl font-bold text-white tracking-wide">Brotein</h1>
      </header>

      {/* Overlapping White Main Card */}
      <main className="flex-grow bg-wpBg rounded-t-[40px] px-6 pt-10 pb-12 shadow-2xl mt-2 border-t border-gray-800/50">
        <div className="max-w-xl mx-auto space-y-8">
          
          {!userData && (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-wpText">Macro Architect</h2>
              <p className="text-wpMuted mt-2 text-sm">Enter your stats to generate a blueprint.</p>
            </div>
          )}

          <UserInputForm onCalculate={(data) => setUserData(data)} />

          {userData && (
            <div className="space-y-6 animate-fade-in mt-4">
              <MacroDashboard data={userData} />
              <WorkoutPlan data={userData} />
              
              {/* Hollow Reset Button */}
              <button 
                onClick={() => setUserData(null)}
                className="mt-8 w-full border-2 border-wpPurple text-wpPurple font-bold py-4 rounded-full hover:bg-wpPurple hover:text-white transition-all shadow-sm"
              >
                Reset Blueprint
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}