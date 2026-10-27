import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { PieChart, TrendingUp, Activity, Target, Flame } from 'lucide-react';

export default function Macros() {
  const savedData = localStorage.getItem('broteinUser');
  if (!savedData) return <Navigate to="/" />;
  
  let userData;
  try { userData = JSON.parse(savedData); } 
  catch (e) { return <Navigate to="/" />; }

  const weight = Number(userData?.weight) || 70;
  const height = Number(userData?.height) || 175;
  const age = Number(userData?.age) || 25;
  const gender = userData?.gender || 'male';
  const goal = userData?.goal || 'maintain';

  // 1. Core Macro Math
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;
  
  const maintenanceCalories = Math.round(bmr * 1.55);
  
  let targetCalories = maintenanceCalories;
  if (goal === 'cut') targetCalories -= 500;
  if (goal === 'bulk') targetCalories += 500;

  const protein = Math.round(weight * 2.2);
  const fats = Math.round(weight * 0.8);
  const carbs = Math.round((targetCalories - (protein * 4) - (fats * 9)) / 4);

  const pCals = protein * 4;
  const cCals = carbs * 4;
  const fCals = fats * 9;
  const totalCals = pCals + cCals + fCals;
  
  const pPct = Math.round((pCals / totalCals) * 100);
  const cPct = Math.round((cCals / totalCals) * 100);
  const fPct = Math.round((fCals / totalCals) * 100);

  // 2. Interactive Trajectory Math
  const [forecastWeeks, setForecastWeeks] = useState(12);
  const parsedWeeks = Number(forecastWeeks) || 12;

  let weeklyChange = 0;
  if (goal === 'cut') weeklyChange = -0.5;
  if (goal === 'bulk') weeklyChange = 0.25;

  const weeksArray = Array.from({ length: parsedWeeks + 1 }, (_, i) => i);
  const projectionData = weeksArray.map(w => ({
    week: w,
    weight: Number((weight + (weeklyChange * w)).toFixed(1))
  }));

  const projectedWeight = projectionData[parsedWeeks]?.weight || weight;

  const minWeight = Math.min(...projectionData.map(d => d.weight)) - 2;
  const maxWeight = Math.max(...projectionData.map(d => d.weight)) + 2;
  const range = maxWeight - minWeight || 1; 
  
  const points = projectionData.map((d, i) => {
    const x = (i / parsedWeeks) * 800;
    const y = 200 - ((d.weight - minWeight) / range) * 200;
    return `${x},${y}`;
  }).join(" ");
  const fillPoints = `${points} 800,200 0,200`;

  // 3. Zigzag Diet Math
  const zigzagMild = maintenanceCalories - 350;
  const zigzagAggressive = maintenanceCalories - 700;

  const zigzagSchedule = [
    { day: "Sunday", mild: maintenanceCalories, aggressive: maintenanceCalories },
    { day: "Monday", mild: zigzagMild, aggressive: zigzagAggressive },
    { day: "Tuesday", mild: zigzagMild, aggressive: zigzagAggressive },
    { day: "Wednesday", mild: zigzagMild, aggressive: zigzagAggressive },
    { day: "Thursday", mild: zigzagMild, aggressive: zigzagAggressive },
    { day: "Friday", mild: zigzagMild, aggressive: zigzagAggressive },
    { day: "Saturday", mild: maintenanceCalories, aggressive: maintenanceCalories },
  ];

  return (
    <div className="space-y-8 animate-fade-in p-2 pb-20 max-w-6xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold text-wpText">Macro Analytics</h2>
        <p className="text-wpMuted mt-1">Insights, distribution, and trajectory forecasting.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CARD 1: Macro Distribution */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center mb-8">
            <div className="bg-wpPurple/10 p-2.5 rounded-xl mr-4">
              <PieChart className="w-6 h-6 text-wpPurple" />
            </div>
            <div>
              <h3 className="font-bold text-wpText text-lg">Caloric Distribution</h3>
              <p className="text-xs text-wpMuted">Macronutrient split by calorie weight</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex h-5 rounded-full overflow-hidden shadow-inner mb-4 bg-gray-100">
              <motion.div initial={{ width: 0 }} animate={{ width: `${pPct}%` }} transition={{ duration: 1, delay: 0.2 }} className="bg-wpPurple h-full" title="Protein" />
              <motion.div initial={{ width: 0 }} animate={{ width: `${cPct}%` }} transition={{ duration: 1, delay: 0.4 }} className="bg-amber-500 h-full" title="Carbs" />
              <motion.div initial={{ width: 0 }} animate={{ width: `${fPct}%` }} transition={{ duration: 1, delay: 0.6 }} className="bg-blue-400 h-full" title="Fats" />
            </div>
            
            <div className="flex justify-between text-xs font-bold text-wpMuted px-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-wpGray p-4 rounded-2xl">
              <div className="flex items-center mb-2">
                <span className="w-3 h-3 rounded-full bg-wpPurple mr-2 shrink-0 shadow-sm"></span>
                <p className="text-xs font-bold text-wpMuted uppercase">Protein</p>
              </div>
              <p className="text-2xl font-black text-wpText">{pPct}%</p>
              <p className="text-xs font-semibold text-wpPurple">{protein}g / day</p>
            </div>
            <div className="bg-wpGray p-4 rounded-2xl">
              <div className="flex items-center mb-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 mr-2 shrink-0 shadow-sm"></span>
                <p className="text-xs font-bold text-wpMuted uppercase">Carbs</p>
              </div>
              <p className="text-2xl font-black text-wpText">{cPct}%</p>
              <p className="text-xs font-semibold text-amber-600">{carbs}g / day</p>
            </div>
            <div className="bg-wpGray p-4 rounded-2xl">
              <div className="flex items-center mb-2">
                <span className="w-3 h-3 rounded-full bg-blue-400 mr-2 shrink-0 shadow-sm"></span>
                <p className="text-xs font-bold text-wpMuted uppercase">Fats</p>
              </div>
              <p className="text-2xl font-black text-wpText">{fPct}%</p>
              <p className="text-xs font-semibold text-blue-600">{fats}g / day</p>
            </div>
          </div>
        </motion.div>

        {/* CARD 2: Interactive Trajectory Forecast */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <div className="bg-emerald-500/10 p-2.5 rounded-xl mr-4">
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="font-bold text-wpText text-lg">Forecast</h3>
                <p className="text-xs text-wpMuted font-medium">Trajectory based on {targetCalories} kcal</p>
              </div>
            </div>
            
            <div className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 flex items-center shadow-sm">
              <label htmlFor="forecastWeeks" className="text-xs font-bold text-emerald-600 uppercase tracking-wide mr-2 cursor-pointer">
                Weeks:
              </label>
              <input
                id="forecastWeeks"
                type="number"
                min="1"
                max="52"
                value={forecastWeeks}
                onChange={(e) => setForecastWeeks(e.target.value)}
                className="w-12 bg-transparent border-none text-emerald-600 font-black p-0 outline-none focus:ring-0 text-right"
              />
            </div>
          </div>

          <div className="flex items-end mb-4">
            <div>
              <p className="text-xs font-bold text-wpMuted uppercase tracking-wider mb-1">Projected Weight</p>
              <p className="text-4xl font-black text-emerald-600 tracking-tight">{projectedWeight} <span className="text-lg">kg</span></p>
            </div>
          </div>

          <div className="relative w-full h-32 mt-auto bg-[#f8f9fc] rounded-xl border border-gray-100 overflow-hidden group">
            <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-full h-full">
              <line x1="0" y1="50" x2="800" y2="50" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="5,5" />
              <line x1="0" y1="100" x2="800" y2="100" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="5,5" />
              <line x1="0" y1="150" x2="800" y2="150" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="5,5" />
              
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points={fillPoints} fill="url(#chartGradient)" className="transition-all duration-300" />
              
              <polyline 
                points={points} 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="drop-shadow-sm transition-all duration-300"
              />
              
              {projectionData.map((d, i) => {
                const x = (i / parsedWeeks) * 800;
                const y = 200 - ((d.weight - minWeight) / range) * 200;
                return (
                  <circle key={i} cx={x} cy={y} r="5" fill="white" stroke="#10b981" strokeWidth="3" className="transition-all duration-300 group-hover:scale-125 origin-center" />
                );
              })}
            </svg>
            
            <div className="absolute bottom-2 left-3 text-[10px] font-bold text-gray-400">Week 1 ({weight} kg)</div>
            <div className="absolute bottom-2 right-3 text-[10px] font-bold text-gray-400">Week {parsedWeeks}</div>
          </div>
        </motion.div>
      </div>

      {/* CARD 3 & 4: Activity Levels & Zigzag Diet Cycling side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* On-Theme Activity Level Reference Table */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col">
          <div className="flex items-center mb-6">
            <div className="bg-blue-500/10 p-2.5 rounded-xl mr-4">
              <Activity className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-bold text-wpText text-lg">Activity Impact</h3>
              <p className="text-xs text-wpMuted">Estimated weight lost per week based on intensity</p>
            </div>
          </div>

          <div className="flex-1 rounded-2xl border border-gray-100 overflow-hidden bg-white">
            <table className="w-full text-left">
              <thead className="bg-[#f8f9fc] border-b border-gray-100">
                <tr>
                  <th className="py-3 px-5 text-[10px] font-bold text-wpMuted uppercase tracking-wider">Activity Level</th>
                  <th className="py-3 px-5 text-[10px] font-bold text-wpMuted uppercase tracking-wider text-right">Weekly Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-5 text-sm font-semibold text-wpText">Intense exercise 3-4 times per week</td>
                  <td className="py-4 px-5 text-right">
                    <span className="bg-blue-500/10 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold">0.2 kg</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-5 text-sm font-semibold text-wpText">Intense exercise 6-7 times per week</td>
                  <td className="py-4 px-5 text-right">
                    <span className="bg-blue-500/10 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold">0.6 kg</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-5 text-sm font-semibold text-wpText pr-2">Very intense exercise daily, or highly physical job</td>
                  <td className="py-4 px-5 text-right">
                    <span className="bg-blue-500/10 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold">1.1 kg</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* On-Theme Zigzag Calorie Cycling Table */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col">
          <div className="flex items-center mb-4">
            <div className="bg-wpPurple/10 p-2.5 rounded-xl mr-4">
              <Target className="w-6 h-6 text-wpPurple" />
            </div>
            <div>
              <h3 className="font-bold text-wpText text-lg">Zigzag Calorie Cycling</h3>
              <p className="text-xs text-wpMuted">Prevent metabolic adaptation and plateauing</p>
            </div>
          </div>
          
          <p className="text-xs text-wpMuted mb-6 leading-relaxed">
            As you keep a low-calorie diet, your body will likely adapt to the lower energy intake. Zigzag calorie cycling alternates calorie intake to keep your metabolism active.
          </p>

          <div className="flex-1 rounded-2xl border border-gray-100 overflow-hidden bg-white">
            <table className="w-full text-left">
              <thead className="bg-[#f8f9fc] border-b border-gray-100">
                <tr>
                  <th className="py-3 px-5 text-[10px] font-bold text-wpMuted uppercase tracking-wider">Day</th>
                  <th className="py-3 px-5 text-[10px] font-bold text-wpMuted uppercase tracking-wider">Mild Loss</th>
                  <th className="py-3 px-5 text-[10px] font-bold text-wpMuted uppercase tracking-wider">Weight Loss</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {zigzagSchedule.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-5 text-sm font-bold text-wpText">{row.day}</td>
                    <td className="py-3.5 px-5">
                      <div className="inline-flex items-center bg-wpPurple/10 text-wpPurple px-2 py-1 rounded-md text-xs font-bold">
                        <Flame className="w-3 h-3 mr-1" />{row.mild}
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="inline-flex items-center bg-amber-500/10 text-amber-600 px-2 py-1 rounded-md text-xs font-bold">
                        <Flame className="w-3 h-3 mr-1" />{row.aggressive}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}