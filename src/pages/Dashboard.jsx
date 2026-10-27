import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Flame, Droplet, Dumbbell, Activity, ChevronRight, CheckCircle2, Utensils, Zap, TrendingUp, Scale, Circle } from 'lucide-react';

export default function Dashboard() {
  const savedData = localStorage.getItem('broteinUser');
  if (!savedData) return <Navigate to="/app/settings" />;
  
  let userData;
  try { userData = JSON.parse(savedData); } 
  catch (e) { return <Navigate to="/app/settings" />; }

  const weight = Number(userData?.weight) || 70;
  const height = Number(userData?.height) || 175;
  const age = Number(userData?.age) || 25;
  const gender = userData?.gender || 'male';
  const goal = userData?.goal || 'maintain';
  const firstName = userData?.name ? userData.name.split(' ')[0] : 'Athlete';

  // 1. Calculations
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;
  let targetCalories = Math.round(bmr * 1.55);
  if (goal === 'cut') targetCalories -= 500;
  if (goal === 'bulk') targetCalories += 500;

  const baseWater = Math.round(weight * 35) / 1000;
  const bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);

  // 2. Fetch Live Daily Progress (using the Oct 27 date we set in Progress.jsx)
  const [todayProgress, setTodayProgress] = useState({ macros: false, hydration: false, exercise: false });
  
  useEffect(() => {
    const savedProgress = localStorage.getItem('broteinDailyProgress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      if (parsed['2026-10-27']) {
        setTodayProgress(parsed['2026-10-27']);
      }
    }
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="space-y-12 p-2 pb-24 max-w-6xl mx-auto overflow-x-hidden">
      
      {/* HERO SECTION: Seamless background, no animations, hollow icons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 md:py-10 relative">

        <div className="relative z-10 max-w-xl">
          <p className="text-wpPurple font-bold tracking-wider uppercase mb-2 flex items-center">
            <Zap className="w-4 h-4 mr-2" /> {greeting}, {firstName}
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-wpText leading-[1.1] tracking-tight mb-6">
            Track Your Progress<br />With Just a Glance.
          </h1>
          <p className="text-lg text-wpMuted mb-8 leading-relaxed max-w-md">
            Your personalized hub for macro distribution, hydration tracking, and intense training protocols.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link to="/app/progress" className="inline-flex items-center justify-center px-8 py-4 bg-wpText text-white rounded-full font-bold text-sm hover:bg-black transition-all shadow-lg">
              Log Today's Check-In <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
            
            {/* NEW: Live Daily Status Strip */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center px-3 py-1.5 rounded-lg border ${todayProgress.macros ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                {todayProgress.macros ? <CheckCircle2 className="w-4 h-4 mr-1.5" /> : <Circle className="w-4 h-4 mr-1.5" />}
                <span className="text-xs font-bold uppercase tracking-wide">Food</span>
              </div>
              <div className={`flex items-center px-3 py-1.5 rounded-lg border ${todayProgress.hydration ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                {todayProgress.hydration ? <CheckCircle2 className="w-4 h-4 mr-1.5" /> : <Circle className="w-4 h-4 mr-1.5" />}
                <span className="text-xs font-bold uppercase tracking-wide">Water</span>
              </div>
              <div className={`flex items-center px-3 py-1.5 rounded-lg border ${todayProgress.exercise ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                {todayProgress.exercise ? <CheckCircle2 className="w-4 h-4 mr-1.5" /> : <Circle className="w-4 h-4 mr-1.5" />}
                <span className="text-xs font-bold uppercase tracking-wide">Lift</span>
              </div>
            </div>
          </div>
        </div>

        {/* Static Hero Graphic */}
        <div className="hidden lg:block relative w-72 h-72 z-10 mt-10 md:mt-0 mr-8">
          {/* Main Circle Outline */}
          <div className="absolute inset-0 rounded-full border-[3px] border-gray-300 border-dashed"></div>
          
          {/* Overlapping Summary Card 1 (Hollow Icon) */}
          <div className="absolute -left-16 top-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 w-64 flex items-center">
            <div className="w-12 h-12 rounded-full border-2 border-wpPurple flex items-center justify-center mr-4 shrink-0 bg-transparent">
              <Flame className="w-6 h-6 text-wpPurple" />
            </div>
            <div>
              <p className="text-xs font-bold text-wpMuted uppercase">Daily Target</p>
              <p className="text-xl font-black text-wpText">{targetCalories} <span className="text-sm">kcal</span></p>
            </div>
          </div>

          {/* NEW: Overlapping Summary Card 2 (BMI Widget) */}
          <div className="absolute -right-12 bottom-16 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center">
            <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center mr-3 shrink-0 bg-transparent">
              <Scale className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-wpMuted uppercase">Current BMI</p>
              <p className="text-lg font-black text-wpText">{bmi}</p>
            </div>
          </div>
        </div>
      </div>


      {/* BENTO GRID MODULES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">

        {/* 1. NUTRITION & MACROS */}
        <Link to="/app/macros" className="group">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:border-wpPurple/30 transition-all h-full relative overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full border-2 border-wpPurple flex items-center justify-center mr-4 bg-transparent">
                  <Utensils className="w-5 h-5 text-wpPurple" />
                </div>
                <h3 className="text-2xl font-bold text-wpText">Nutrition</h3>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-wpPurple transition-colors" />
            </div>

            <div className="mt-auto relative z-10">
              <div className="bg-[#f8f9fc] p-5 rounded-2xl border border-gray-100 mb-4 flex justify-between items-center group-hover:bg-white group-hover:shadow-sm transition-all">
                <div>
                  <p className="text-xs font-bold text-wpMuted uppercase tracking-wider mb-1">Target Intake</p>
                  <p className="text-2xl font-black text-wpText">{targetCalories} <span className="text-sm">kcal</span></p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-wpMuted uppercase tracking-wider mb-1">Protein Goal</p>
                  <p className="text-xl font-bold text-wpPurple">{Math.round(weight * 2.2)}g</p>
                </div>
              </div>
              
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden flex">
                <div className="h-full bg-wpPurple w-[40%]"></div>
                <div className="h-full bg-amber-500 w-[35%]"></div>
                <div className="h-full bg-blue-400 w-[25%]"></div>
              </div>
            </div>
          </div>
        </Link>


        {/* 2. HYDRATION TRACKER */}
        <Link to="/app/hydration" className="group">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-500/30 transition-all h-full relative overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full border-2 border-blue-500 flex items-center justify-center mr-4 bg-transparent">
                  <Droplet className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-wpText">Hydration</h3>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-blue-500 transition-colors" />
            </div>

            <div className="mt-auto relative z-10 flex items-end justify-between">
              <div>
                <p className="text-sm font-bold text-wpMuted uppercase tracking-wider mb-2">Daily Base Target</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-wpText">{baseWater}</span>
                  <span className="text-2xl font-bold text-wpMuted">Liters</span>
                </div>
              </div>
              
              <div className="w-12 h-20 border-4 border-gray-200 rounded-b-xl rounded-t-sm relative overflow-hidden group-hover:border-blue-200 transition-colors">
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-blue-400 group-hover:h-3/4 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </Link>


        {/* 3. EXERCISE & PROTOCOLS */}
        <Link to="/app/exercise" className="group">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:border-emerald-500/30 transition-all h-full relative overflow-hidden flex flex-col">
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full border-2 border-emerald-500 flex items-center justify-center mr-4 bg-transparent">
                  <Dumbbell className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-wpText">Training</h3>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-emerald-500 transition-colors" />
            </div>

            <div className="mt-auto relative z-10">
              <div className="flex gap-3 mb-4">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase rounded-lg border border-emerald-200">Hypertrophy</span>
                <span className="px-3 py-1 bg-rose-50 text-rose-600 text-xs font-bold uppercase rounded-lg border border-rose-200">Cardio</span>
              </div>
              
              <div className="bg-[#f8f9fc] p-4 rounded-xl border border-gray-100 group-hover:shadow-md transition-shadow relative">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-wpText text-lg">Push / Pull / Legs</p>
                    <p className="text-xs text-wpMuted font-medium mt-1">4-5 Exercises • Progressive Overload</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-200 group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>


        {/* 4. ANALYTICS & PROGRESS */}
        <Link to="/app/progress" className="group">
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-sm hover:shadow-lg hover:border-blue-500/50 transition-all h-full relative overflow-hidden flex flex-col">
            
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50 group-hover:scale-105 transition-transform duration-700"></div>

            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full border-2 border-blue-400 flex items-center justify-center mr-4 bg-transparent">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Analytics</h3>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-blue-400 transition-colors" />
            </div>

            <div className="mt-auto relative z-10">
              <div className="flex items-end gap-4 mb-2">
                <div className="flex items-end gap-1 h-12">
                  <div className="w-2 bg-blue-500/30 rounded-t-sm h-[30%]"></div>
                  <div className="w-2 bg-blue-500/50 rounded-t-sm h-[50%]"></div>
                  <div className="w-2 bg-blue-500/70 rounded-t-sm h-[40%]"></div>
                  <div className="w-2 bg-blue-400 rounded-t-sm h-[80%] group-hover:h-[100%] transition-all"></div>
                  <div className="w-2 bg-blue-300 rounded-t-sm h-[60%]"></div>
                </div>
                <div className="mb-1">
                  <p className="text-3xl font-black text-white flex items-center">
                    +14% <TrendingUp className="w-5 h-5 text-emerald-400 ml-2" />
                  </p>
                  <p className="text-xs text-blue-300/70 font-bold uppercase tracking-wider mt-1">Consistency Trend</p>
                </div>
              </div>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}