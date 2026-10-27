import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { CheckCircle2, Circle, Droplet, Dumbbell, Flame, Calendar as CalIcon, ChevronLeft, ChevronRight, Activity } from 'lucide-react';

export default function Progress() {
  const savedData = localStorage.getItem('broteinUser');
  if (!savedData) return <Navigate to="/" />;

  // --- 1. DATE SLIDER & DAILY GOALS LOGIC ---
  const [selectedDate, setSelectedDate] = useState('2026-10-27');
  
  const sliderDates = [
    { id: '2026-10-24', day: 'SAT', num: '24' },
    { id: '2026-10-25', day: 'SUN', num: '25' },
    { id: '2026-10-26', day: 'MON', num: '26' },
    { id: '2026-10-27', day: 'TUE', num: '27' },
    { id: '2026-10-28', day: 'WED', num: '28' },
    { id: '2026-10-29', day: 'THU', num: '29' },
    { id: '2026-10-30', day: 'FRI', num: '30' },
  ];

  const [progressData, setProgressData] = useState(() => {
    const saved = localStorage.getItem('broteinDailyProgress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('broteinDailyProgress', JSON.stringify(progressData));
  }, [progressData]);

  const toggleGoal = (goalKey) => {
    setProgressData(prev => {
      const dayData = prev[selectedDate] || { macros: false, hydration: false, exercise: false };
      return {
        ...prev,
        [selectedDate]: { ...dayData, [goalKey]: !dayData[goalKey] }
      };
    });
  };

  const currentDayProgress = progressData[selectedDate] || { macros: false, hydration: false, exercise: false };
  const goalsCompletedToday = Object.values(currentDayProgress).filter(Boolean).length;
  const totalGoals = 3;

  // --- 2. GLOBAL MONTHLY ANALYTICS ENGINE ---
  const [monthIdx, setMonthIdx] = useState(2); // Default to Oct 2026

  const monthlyAnalytics = [
    {
      month: "Aug 2026",
      days: 31,
      hydrationTotal: "24.8 L",
      hydrationAvg: "0.80 L",
      waterData: [ {day: 2, val: 1.2}, {day: 5, val: 2.1}, {day: 12, val: 1.8}, {day: 22, val: 2.5}, {day: 28, val: 1.5} ],
      activeDays: [2, 5, 8, 12, 15, 18, 22, 25, 28, 30]
    },
    {
      month: "Sep 2026",
      days: 30,
      hydrationTotal: "42.5 L",
      hydrationAvg: "1.41 L",
      waterData: [ {day: 1, val: 2.2}, {day: 3, val: 1.5}, {day: 10, val: 3.1}, {day: 15, val: 2.8}, {day: 19, val: 1.8}, {day: 25, val: 2.0}, {day: 29, val: 3.5} ],
      activeDays: [1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26, 29]
    },
    {
      month: "Oct 2026",
      days: 31,
      hydrationTotal: "10.4 L",
      hydrationAvg: "1.15 L",
      // Maps exactly to the provided screenshot spikes
      waterData: [ {day: 4, val: 1.8}, {day: 5, val: 0.9}, {day: 9, val: 1.1}, {day: 13, val: 1.7}, {day: 14, val: 1.7}, {day: 15, val: 0.8}, {day: 16, val: 0.8}, {day: 18, val: 0.8}, {day: 21, val: 0.8} ],
      activeDays: [8, 14, 15]
    }
  ];

  const currentMonth = monthlyAnalytics[monthIdx];

  const handleNextMonth = () => setMonthIdx(p => Math.min(p + 1, monthlyAnalytics.length - 1));
  const handlePrevMonth = () => setMonthIdx(p => Math.max(p - 1, 0));

  // Generate full 31-day array for the hydration graph
  const hydrationChartData = Array.from({ length: currentMonth.days }, (_, i) => {
    const day = i + 1;
    const found = currentMonth.waterData.find(d => d.day === day);
    return { day, val: found ? found.val : 0 };
  });
  const maxHydration = 5.63;

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const bubbleData = [
    [0.3, 0.5, 0.2, 0.0, 0.0, 0.0, 0.8],
    [0.6, 0.8, 0.5, 0.3, 0.2, 0.6, 0.4],
    [0.2, 0.9, 0.7, 0.0, 0.0, 0.4, 0.0],
    [0.0, 1.0, 0.2, 0.4, 0.2, 0.0, 0.0],
    [0.4, 0.3, 0.8, 0.0, 0.0, 0.2, 0.0],
    [0.2, 0.5, 0.4, 0.0, 0.0, 0.6, 0.0],
    [0.0, 0.2, 0.6, 0.2, 0.2, 0.2, 0.0] 
  ];

  return (
    <div className="space-y-8 animate-fade-in p-2 pb-24 max-w-6xl mx-auto">
      
      <div>
        <h2 className="text-3xl font-bold text-wpText">Progress & Analytics</h2>
        <p className="text-wpMuted mt-1">Track your daily habits and analyze long-term consistency.</p>
      </div>

      {/* PANEL 1: DAILY HABIT SLIDER */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="bg-[#f8f9fc] border-b border-gray-100 p-4 flex items-center justify-between overflow-x-auto scrollbar-hide">
          <button className="p-2 text-gray-400 hover:text-wpText transition-colors shrink-0"><ChevronLeft className="w-5 h-5" /></button>
          
          <div className="flex space-x-2 md:space-x-6 px-4">
            {sliderDates.map((date) => {
              const isSelected = selectedDate === date.id;
              return (
                <button
                  key={date.id}
                  onClick={() => setSelectedDate(date.id)}
                  className={`flex flex-col items-center justify-center w-14 h-16 rounded-2xl transition-all shrink-0 ${
                    isSelected ? 'bg-wpText text-white shadow-md scale-110' : 'bg-transparent text-wpMuted hover:bg-gray-100'
                  }`}
                >
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>{date.day}</span>
                  <span className="text-xl font-black mt-0.5">{date.num}</span>
                </button>
              );
            })}
          </div>
          
          <button className="p-2 text-gray-400 hover:text-wpText transition-colors shrink-0"><ChevronRight className="w-5 h-5" /></button>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-wpText text-xl flex items-center">
              <CalIcon className="w-5 h-5 mr-2 text-wpPurple" />
              Daily Check-In
            </h3>
            <div className="text-sm font-bold bg-wpPurple/10 text-wpPurple px-3 py-1.5 rounded-lg">
              {goalsCompletedToday} / {totalGoals} Completed
            </div>
          </div>

          <div className="space-y-4">
            <motion.div 
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleGoal('macros')}
              className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                currentDayProgress.macros ? 'bg-emerald-50 border-emerald-400 shadow-sm' : 'bg-white border-gray-100 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-xl mr-4 ${currentDayProgress.macros ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-500/10 text-orange-500'}`}>
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={`font-bold text-lg ${currentDayProgress.macros ? 'text-emerald-700' : 'text-wpText'}`}>Hit Macro Targets</h4>
                  <p className="text-xs font-semibold text-wpMuted">Caloric breakdown & protein goal</p>
                </div>
              </div>
              <div className={currentDayProgress.macros ? 'text-emerald-500' : 'text-gray-300'}>
                {currentDayProgress.macros ? <CheckCircle2 className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
              </div>
            </motion.div>

            <motion.div 
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleGoal('hydration')}
              className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                currentDayProgress.hydration ? 'bg-emerald-50 border-emerald-400 shadow-sm' : 'bg-white border-gray-100 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-xl mr-4 ${currentDayProgress.hydration ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-500/10 text-blue-500'}`}>
                  <Droplet className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={`font-bold text-lg ${currentDayProgress.hydration ? 'text-emerald-700' : 'text-wpText'}`}>Hydration Protocol</h4>
                  <p className="text-xs font-semibold text-wpMuted">Meet base daily water intake</p>
                </div>
              </div>
              <div className={currentDayProgress.hydration ? 'text-emerald-500' : 'text-gray-300'}>
                {currentDayProgress.hydration ? <CheckCircle2 className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
              </div>
            </motion.div>

            <motion.div 
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleGoal('exercise')}
              className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                currentDayProgress.exercise ? 'bg-emerald-50 border-emerald-400 shadow-sm' : 'bg-white border-gray-100 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-xl mr-4 ${currentDayProgress.exercise ? 'bg-emerald-100 text-emerald-600' : 'bg-wpPurple/10 text-wpPurple'}`}>
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={`font-bold text-lg ${currentDayProgress.exercise ? 'text-emerald-700' : 'text-wpText'}`}>Complete Workout</h4>
                  <p className="text-xs font-semibold text-wpMuted">Finish daily training split & cardio</p>
                </div>
              </div>
              <div className={currentDayProgress.exercise ? 'text-emerald-500' : 'text-gray-300'}>
                {currentDayProgress.exercise ? <CheckCircle2 className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* PANEL 2: SCALED HYDRATION ANALYTICS */}
        <div className="bg-[#1e40af] text-white p-8 md:p-10 rounded-3xl shadow-md flex flex-col relative overflow-hidden min-h-[550px]">
          
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl -mt-20 -mr-20 pointer-events-none"></div>

          <div className="flex justify-between items-center mb-10 relative z-10">
            <button 
              onClick={handlePrevMonth} 
              disabled={monthIdx === 0}
              className={`p-1 transition-colors ${monthIdx === 0 ? 'text-blue-400/50 cursor-not-allowed' : 'text-blue-200 hover:text-white'}`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h3 className="font-bold text-lg tracking-wide">{currentMonth.month}</h3>
            <button 
              onClick={handleNextMonth} 
              disabled={monthIdx === monthlyAnalytics.length - 1}
              className={`p-1 transition-colors ${monthIdx === monthlyAnalytics.length - 1 ? 'text-blue-400/50 cursor-not-allowed' : 'text-blue-200 hover:text-white'}`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-between items-start mb-12 relative z-10">
            <div>
              <p className="text-sm font-semibold text-blue-200 mb-1">Total</p>
              <motion.p 
                key={currentMonth.hydrationTotal}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-7xl font-black tracking-tighter"
              >
                {currentMonth.hydrationTotal}
              </motion.p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-blue-200 mb-1">Average</p>
              <motion.p 
                key={currentMonth.hydrationAvg}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold"
              >
                {currentMonth.hydrationAvg}
              </motion.p>
            </div>
          </div>

          {/* Scaled Bar Chart translating Source 16 */}
          <div className="relative w-full flex-1 flex items-end justify-between z-10 pt-10 pb-6">
            
            <div className="absolute inset-y-0 left-0 right-0 flex flex-col justify-between pointer-events-none pb-6 pt-10">
              <div className="w-full border-t border-blue-300/20 flex justify-between relative"><span className="absolute -top-5 left-1 text-[11px] font-medium text-blue-200">{maxHydration}</span></div>
              <div className="w-full border-t border-blue-300/20 border-dashed relative"><span className="absolute -top-5 left-1 text-[11px] font-medium text-blue-200">4.22</span></div>
              <div className="w-full border-t border-blue-300/20 relative"><span className="absolute -top-5 left-1 text-[11px] font-medium text-blue-200">2.81</span></div>
              <div className="w-full border-t border-blue-300/20 relative"><span className="absolute -top-5 left-1 text-[11px] font-medium text-blue-200">1.41</span></div>
              <div className="w-full border-t border-blue-300/20 relative"><span className="absolute -top-5 left-1 text-[11px] font-medium text-blue-200">0</span></div>
            </div>

            <div className="w-full h-full flex items-end justify-between px-2 pt-10 relative z-10">
              {hydrationChartData.map((data, idx) => {
                const heightPct = (data.val / maxHydration) * 100;
                return (
                  <motion.div 
                    key={`${monthIdx}-${idx}`} 
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    className="w-2 md:w-3 bg-white rounded-t-sm group relative" 
                    style={{ opacity: data.val > 0 ? 1 : 0 }}
                  >
                    {data.val > 0 && (
                      <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20 shadow-xl">
                        Day {data.day}<br/><span className="font-black text-xs text-blue-400">{data.val} L</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
            
            <div className="absolute bottom-0 w-full flex justify-between px-2 text-[11px] font-bold text-blue-200">
              <span>1</span><span>6</span><span>11</span><span>16</span><span>21</span><span>26</span><span>31</span>
            </div>
          </div>
        </div>

        {/* PANEL 3: CONSISTENCY HEATMAP & FREQUENCY */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full min-h-[550px]">
          
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-wpText text-xl flex items-center">
              <Activity className="w-6 h-6 mr-2 text-wpPurple" />
              Consistency Map
            </h3>
            
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1">
              <button onClick={handlePrevMonth} disabled={monthIdx === 0} className="p-1 hover:text-wpText text-gray-400 disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
              <span className="text-xs font-bold text-wpText px-2 min-w-[70px] text-center">{currentMonth.month}</span>
              <button onClick={handleNextMonth} disabled={monthIdx === monthlyAnalytics.length - 1} className="p-1 hover:text-wpText text-gray-400 disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="mb-10">
            <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
              {['S','M','T','W','T','F','S'].map((d, i) => (
                <div key={i} className="text-center text-[10px] font-bold text-wpMuted">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {Array.from({ length: currentMonth.days }, (_, i) => i + 1).map((day) => {
                const isActive = currentMonth.activeDays.includes(day);
                return (
                  <motion.div 
                    key={`${monthIdx}-${day}`} 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`aspect-square rounded-md md:rounded-xl flex items-center justify-center text-xs font-bold transition-colors ${
                      isActive ? 'bg-blue-400 text-white shadow-sm' : 'bg-gray-50 text-gray-300 border border-gray-100'
                    }`}
                  >
                    {day}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-auto border-t border-gray-100 pt-8">
            <h4 className="font-bold text-wpText text-sm mb-6">Training Frequency Pattern</h4>
            <div className="flex w-full">
              <div className="flex flex-col justify-between text-[10px] font-bold text-wpMuted pr-4 py-1">
                {daysOfWeek.map(d => <span key={d} className="h-4 flex items-center">{d}</span>)}
              </div>
              
              <div className="flex-1 grid grid-rows-7 gap-y-2">
                {bubbleData.map((row, rowIdx) => (
                  <div key={rowIdx} className="flex justify-between items-center h-4 px-2">
                    {row.map((val, colIdx) => {
                      const size = val === 0 ? 4 : 4 + (val * 12);
                      const opacity = val === 0 ? 0.2 : 0.4 + (val * 0.6);
                      return (
                        <div key={colIdx} className="flex items-center justify-center w-4 h-4">
                          <motion.div 
                            key={monthIdx}
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            transition={{ delay: (rowIdx + colIdx) * 0.02 }}
                            className="bg-blue-400 rounded-full" 
                            style={{ width: `${size}px`, height: `${size}px`, opacity: opacity }}
                          />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between pl-10 pr-2 mt-4 text-[10px] font-bold text-wpMuted">
              <span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}