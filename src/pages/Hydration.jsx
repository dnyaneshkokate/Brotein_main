import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { Droplet, Zap, Plus, Info, RefreshCcw, CupSoda, GlassWater, Clock, CheckCircle2, History } from 'lucide-react';

export default function Hydration() {
  const savedData = localStorage.getItem('broteinUser');
  if (!savedData) return <Navigate to="/" />;
  
  let userData;
  try { userData = JSON.parse(savedData); } 
  catch (e) { return <Navigate to="/" />; }

  const weight = Number(userData?.weight) || 70;

  // Baseline calculation: ~35ml per kg of body weight
  const baseTarget = Math.round(weight * 35);
  const creatineBonus = 1000;

  const [intake, setIntake] = useState(0);
  const [creatineMode, setCreatineMode] = useState(false);
  const [intakeHistory, setIntakeHistory] = useState([]);

  const currentTarget = baseTarget + (creatineMode ? creatineBonus : 0);
  const fillPercentage = Math.min((intake / currentTarget) * 100, 100);
  
  const handleAddWater = (amount) => {
    setIntake(prev => prev + amount);
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setIntakeHistory(prev => [{ id: Date.now(), amount, time: timeString }, ...prev]);
  };

  const handleReset = () => {
    setIntake(0);
    setIntakeHistory([]);
  };

  const themeBg = creatineMode ? 'bg-orange-50' : 'bg-blue-50';
  const themeText = creatineMode ? 'text-orange-500' : 'text-blue-500';
  const themeBorder = creatineMode ? 'border-orange-100' : 'border-blue-100';
  const themeButton = creatineMode ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600';
  const themeGradient = creatineMode ? 'from-orange-500 to-orange-300' : 'from-blue-500 to-blue-300';

  return (
    <div className="space-y-6 animate-fade-in p-2 pb-20 max-w-5xl mx-auto">
      
      {/* HEADER & MASTER TOGGLE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-wpText">Hydration Tracker</h2>
          <p className="text-wpMuted mt-1">Monitor fluid intake and optimize for supplementation.</p>
        </div>
        
        <motion.div 
          whileTap={{ scale: 0.95 }}
          onClick={() => setCreatineMode(!creatineMode)}
          className={`mt-4 md:mt-0 flex items-center p-2 pl-4 pr-3 rounded-full cursor-pointer transition-all border-2 shadow-sm ${
            creatineMode ? 'bg-orange-50 border-orange-500' : 'bg-gray-50 border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className={`font-bold mr-4 transition-colors ${creatineMode ? 'text-orange-600' : 'text-wpMuted'}`}>
            <Zap className="inline-block w-4 h-4 mr-1.5 mb-0.5" />
            Creatine Mode
          </span>
          <div className={`w-12 h-6 rounded-full p-1 transition-colors ${creatineMode ? 'bg-orange-500' : 'bg-gray-300'}`}>
            <motion.div 
              className="w-4 h-4 bg-white rounded-full shadow-sm"
              animate={{ x: creatineMode ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </motion.div>
      </div>

      {/* TOP TIP BANNER */}
      <motion.div 
        layout
        className={`w-full ${themeBg} border ${themeBorder} p-4 rounded-2xl flex items-center shadow-sm transition-colors duration-500`}
      >
        <div className={`bg-white p-2 rounded-xl mr-4 shrink-0 shadow-sm`}>
          <Info className={`w-5 h-5 ${themeText}`} />
        </div>
        <p className={`text-sm font-semibold transition-colors duration-500 ${creatineMode ? 'text-orange-800' : 'text-blue-800'}`}>
          Drink 0.25L - 0.5L of water each time to stay well-hydrated. Gulping too much at once reduces cellular absorption.
        </p>
      </motion.div>

      {/* HORIZONTAL MASTER TRACKER PANEL */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 relative">
        
        <AnimatePresence>
          {intake > 0 && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleReset}
              className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 p-2 rounded-full border border-gray-100 z-20"
              title="Reset Tracker"
            >
              <RefreshCcw className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Custom Structural Sports Bottle Assembly */}
        <motion.div 
          animate={creatineMode ? { 
            x: [0, -10, 10, -10, 10, 0], 
            rotate: [0, -4, 4, -4, 4, 0],
            scale: [1, 1.05, 1] 
          } : { x: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative flex flex-col items-center shrink-0 pr-8 mt-4"
        >
          {/* Side Loop */}
          <div className="absolute top-5 -right-1 w-16 h-12 border-[5px] border-slate-700 rounded-full z-0 rotate-[15deg]"></div>
          
          {/* Small Top Nozzle */}
          <div className="w-14 h-4 bg-slate-800 rounded-t-md z-10"></div>
          
          {/* Main Ribbed Lid */}
          <div className="w-28 h-10 bg-slate-700 rounded-lg z-10 flex justify-evenly items-center overflow-hidden border-b-[3px] border-slate-900 shadow-sm">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-1 h-full bg-slate-800/50"></div>
            ))}
          </div>
          
          {/* Neck Rim */}
          <div className="w-32 h-3 bg-gray-200 rounded-full -mt-1 z-10 border border-gray-300 shadow-sm"></div>

          {/* Main Bottle Body */}
          <div className="relative w-56 h-80 bg-[#f8f9fc] border-[6px] border-gray-200 rounded-[2.5rem] mt-1 overflow-hidden shadow-inner flex justify-center items-end z-10">
            
            {/* Gloss / Light Reflection Highlights */}
            <div className="absolute left-4 top-12 bottom-20 w-1.5 bg-white/70 rounded-full z-20"></div>
            <div className="absolute right-5 bottom-12 w-1.5 h-32 bg-white/70 rounded-full z-20"></div>

            {/* Measurement Lines */}
            <div className="absolute inset-0 flex flex-col justify-between py-12 px-4 opacity-20 pointer-events-none z-20">
              <div className="w-6 h-1 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-1 bg-gray-500 rounded-full"></div>
              <div className="w-6 h-1 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-1 bg-gray-500 rounded-full"></div>
              <div className="w-6 h-1 bg-gray-500 rounded-full"></div>
            </div>

            {/* Dynamic Water Fill */}
            <motion.div 
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${themeGradient} w-full transition-colors duration-500 z-10`}
              initial={{ height: "0%" }}
              animate={{ height: `${fillPercentage}%` }}
              transition={{ type: "spring", stiffness: 40, damping: 12 }}
            >
              <div className="absolute top-0 left-0 right-0 h-4 bg-white/30 rounded-t-[50%] -translate-y-1/2"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Data & Controls */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left w-full max-w-md">
          <motion.div 
            layout
            className={`flex items-center ${themeBg} ${themeText} px-4 py-2 rounded-full text-xs font-bold mb-6 shadow-sm transition-colors duration-500`}
          >
            <Droplet className={`w-4 h-4 mr-2 fill-current`} />
            {creatineMode ? 'Creatine Target' : 'Base Target'}
          </motion.div>

          <div className="flex items-baseline gap-2 mb-8">
            <h1 className="text-7xl lg:text-8xl font-black text-wpText tracking-tighter tabular-nums">
              {(intake / 1000).toFixed(2)}
            </h1>
            <span className="text-3xl font-bold text-wpMuted">/ {(currentTarget / 1000).toFixed(2)} L</span>
          </div>

          <div className="w-full mb-10">
            <div className="flex justify-between text-xs font-bold text-wpMuted mb-2">
              <span>Base: {(baseTarget / 1000).toFixed(1)}L</span>
              <AnimatePresence>
                {creatineMode && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-orange-500">
                    + Creatine: 1.0L
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-300 transition-all duration-500" style={{ width: `${(baseTarget/currentTarget)*100}%` }}></div>
              <div className={`h-full ${creatineMode ? 'bg-orange-400' : 'bg-transparent'} transition-all duration-500`} style={{ width: `${(creatineBonus/currentTarget)*100}%` }}></div>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full">
            <button 
              onClick={() => handleAddWater(250)}
              className={`w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 text-wpMuted flex flex-col items-center justify-center transition-all shadow-sm hover:bg-white hover:shadow-md hover:border-gray-300 hover:${themeText}`}
              title="Add 250ml (Glass)"
            >
              <GlassWater className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-bold">+250ml</span>
            </button>

            <button 
              onClick={() => handleAddWater(500)}
              className={`flex-1 h-16 rounded-2xl ${themeButton} text-white font-black text-lg flex items-center justify-center transition-all shadow-lg active:scale-95`}
            >
              <Plus className="w-6 h-6 mr-2" strokeWidth={3} />
              DRINK 500ml
            </button>

            <button 
              onClick={() => handleAddWater(1000)}
              className={`w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 text-wpMuted flex flex-col items-center justify-center transition-all shadow-sm hover:bg-white hover:shadow-md hover:border-gray-300 hover:${themeText}`}
              title="Add 1L (Big Bottle)"
            >
              <CupSoda className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-bold">+1L</span>
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PANEL A: Daily Hydration Schedule */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
          <div className="flex items-center mb-6">
            <div className={`bg-gray-100 p-2.5 rounded-xl mr-4`}>
              <Clock className="w-6 h-6 text-wpText" />
            </div>
            <div>
              <h3 className="font-bold text-wpText text-lg">Optimal Timing Schedule</h3>
              <p className="text-xs text-wpMuted">When to consume your {(currentTarget / 1000).toFixed(1)}L target</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start p-4 rounded-2xl bg-[#f8f9fc] border border-gray-100">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center font-bold text-sm mr-4 shrink-0">1</div>
              <div>
                <h4 className="font-bold text-wpText text-sm mb-1">Morning Wake-Up</h4>
                <p className="text-xs text-wpMuted">Drink 500ml immediately upon waking to rehydrate from sleep and kickstart metabolism.</p>
              </div>
            </div>
            
            <div className="flex items-start p-4 rounded-2xl bg-[#f8f9fc] border border-gray-100">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center font-bold text-sm mr-4 shrink-0">2</div>
              <div>
                <h4 className="font-bold text-wpText text-sm mb-1">Pre-Workout & Intra-Workout</h4>
                <p className="text-xs text-wpMuted">Consume 500ml 2 hours before training. Sip 250ml every 20 minutes during your workout.</p>
              </div>
            </div>

            <div className="flex items-start p-4 rounded-2xl bg-[#f8f9fc] border border-gray-100">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-4 shrink-0 transition-colors ${creatineMode ? 'bg-orange-100 text-orange-500' : 'bg-wpPurple/10 text-wpPurple'}`}>3</div>
              <div>
                <h4 className="font-bold text-wpText text-sm mb-1">Post-Workout {creatineMode && "(Creatine Window)"}</h4>
                <p className="text-xs text-wpMuted">Drink 500ml after training. {creatineMode && "Mix your creatine scoop here to ensure maximum cellular hydration and recovery."}</p>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL B: Live Intake Log */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col">
          <div className="flex items-center mb-6">
            <div className={`bg-gray-100 p-2.5 rounded-xl mr-4`}>
              <History className="w-6 h-6 text-wpText" />
            </div>
            <div className="flex-1 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-wpText text-lg">Today's Log</h3>
                <p className="text-xs text-wpMuted">Your recent hydration entries</p>
              </div>
              <div className="text-2xl font-black text-wpText">
                {intakeHistory.length} <span className="text-sm font-bold text-wpMuted">entries</span>
              </div>
            </div>
          </div>

          <div className="flex-1 rounded-2xl border border-gray-100 overflow-hidden bg-[#f8f9fc] relative">
            {intakeHistory.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                <GlassWater className="w-10 h-10 mb-3 opacity-20" />
                <p className="text-sm font-bold">No water logged yet today.</p>
                <p className="text-xs mt-1">Tap a button above to track your intake.</p>
              </div>
            ) : (
              <div className="h-64 overflow-y-auto p-4 space-y-3 scrollbar-hide">
                <AnimatePresence>
                  {intakeHistory.map((log) => (
                    <motion.div 
                      key={log.id}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: 'auto' }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white p-3 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm"
                    >
                      <div className="flex items-center">
                        <CheckCircle2 className={`w-5 h-5 mr-3 ${themeText} transition-colors`} />
                        <span className="font-bold text-wpText">+{log.amount} ml</span>
                      </div>
                      <span className="text-xs font-bold text-wpMuted">{log.time}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}