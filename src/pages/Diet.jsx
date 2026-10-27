import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { Flame, Coffee, Sun, Moon, Apple, Plus, Minus, Beef, Wheat, Droplet } from 'lucide-react';

// Custom Crash-Proof YouTube Icon
const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-red-500 hover:text-red-600 transition-colors">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Diet() {
  const savedData = localStorage.getItem('broteinUser');
  if (!savedData) return <Navigate to="/" />;
  
  let userData;
  try {
    userData = JSON.parse(savedData);
  } catch (e) {
    localStorage.removeItem('broteinUser');
    return <Navigate to="/" />;
  }

  const weight = Number(userData?.weight) || 70;
  const height = Number(userData?.height) || 175;
  const age = Number(userData?.age) || 25;
  const gender = userData?.gender || 'male';
  const goal = userData?.goal || 'maintain';

  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;
  let targetCalories = Math.round(bmr * 1.55);
  if (goal === 'cut') targetCalories -= 500;
  if (goal === 'bulk') targetCalories += 500;

  const targetProtein = Math.round(weight * 2.2);
  const targetFats = Math.round(weight * 0.8);
  const targetCarbs = Math.round((targetCalories - (targetProtein * 4) - (targetFats * 9)) / 4);

  // Tabbed Navigation State
  const [activeTab, setActiveTab] = useState("Breakfast");
  const [selectedPortions, setSelectedPortions] = useState({});

  const handleAddPortion = (mealName) => {
    setSelectedPortions(prev => ({ ...prev, [mealName]: (prev[mealName] || 0) + 1 }));
  };

  const handleRemovePortion = (mealName) => {
    setSelectedPortions(prev => {
      const current = prev[mealName] || 0;
      if (current <= 1) {
        const newState = { ...prev };
        delete newState[mealName];
        return newState;
      }
      return { ...prev, [mealName]: current - 1 };
    });
  };

  // Database with YOUR custom images and added YouTube search queries
  const mealPlan = [
    {
      category: "Breakfast",
      Icon: Coffee,
      color: "text-amber-500",
      items: [
        { name: "Pro-Oats & Berries", yt: "high+protein+oats+recipe", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmgQLHH36hWnVi-6ROK1r-Tbzo3lI7acB-8CpxTISVTszaulw28tQQ-byX&s=10", desc: "Rolled oats, whey protein, chia seeds, & berries.", p: 35, c: 45, f: 8, cal: 390 },
        { name: "Boiled Eggs", yt: "perfect+boiled+eggs+prep", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJRw9ATC8aNcKZAyTokqexPDJRm8nM-lT93dX8H51cV5MXxvBZE1bJ_lw&s=10", desc: "2 whole eggs, 2 egg whites. Salt and pepper.", p: 20, c: 1, f: 10, cal: 175 },
        { name: "Paneer Bhurji", yt: "healthy+paneer+bhurji+recipe", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4eUPIxCrX2W6nU4DQy_1_oB2LA33u_OZslv2-Z7IxH2M5pP_kBFvqcdc&s=10", desc: "Crumbled paneer with onions, tomatoes, and 2 rotis.", p: 18, c: 30, f: 14, cal: 320 },
        { name: "Egg White Scramble", yt: "egg+white+scramble+healthy", img: "https://www.budgetbytes.com/wp-content/uploads/2024/09/Scrambled-Eggs-Close.jpg", desc: "4 egg whites, 1 whole egg, spinach, whole wheat toast.", p: 28, c: 22, f: 12, cal: 310 },
        { name: "Poha & Peanuts", yt: "healthy+kanda+poha+recipe", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3cDziWheCFOIo4icBJjedz2lWT5DdN8W6vqbXQ8mqOKWFkRy4uagg58lz&s=10", desc: "Flattened rice cooked with turmeric, onions, and peanuts.", p: 8, c: 45, f: 12, cal: 320 },
        { name: "Greek Yogurt Bowl", yt: "greek+yogurt+breakfast+bowl", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80", desc: "0% Fat Greek yogurt, honey, and sliced almonds.", p: 22, c: 18, f: 7, cal: 220 }
      ]
    },
    {
      category: "Lunch",
      Icon: Sun,
      color: "text-orange-500",
      items: [
        { name: "Chicken & Rice", yt: "healthy+chicken+and+rice+meal+prep", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80", desc: "Grilled chicken breast, jasmine rice, steamed broccoli.", p: 45, c: 50, f: 6, cal: 450 },
        { name: "Soya Chunk Curry", yt: "soya+chunks+curry+healthy+recipe", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "High-protein soya chunks in a tomato-onion gravy with rice.", p: 28, c: 45, f: 6, cal: 360 },
        { name: "Dal Tadka & Rice", yt: "restaurant+style+dal+tadka+recipe", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80", desc: "Yellow lentils tempered with ghee and spices, with cumin rice.", p: 15, c: 55, f: 8, cal: 350 },
        { name: "Tuna Pasta Salad", yt: "tuna+pasta+salad+high+protein", img: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&q=80", desc: "Canned tuna, whole grain pasta, greek yogurt mayo.", p: 38, c: 42, f: 10, cal: 410 }
      ]
    },
    {
      category: "Dinner",
      Icon: Moon,
      color: "text-indigo-500",
      items: [
        { name: "Tandoori Chicken", yt: "healthy+tandoori+chicken+air+fryer", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&q=80", desc: "Yogurt-marinated chicken breast with mint chutney and salad.", p: 45, c: 8, f: 12, cal: 320 },
        { name: "Palak Paneer", yt: "healthy+palak+paneer+recipe", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhxRIb1lntN34hkDOz3OYtuDq69dYfQ1oV2xTUSGsGo_VhVSuuKXIoLbg-&s=10", desc: "Paneer cubes in a spinach gravy, served with 2 whole wheat rotis.", p: 20, c: 35, f: 16, cal: 360 },
        { name: "Wild Salmon", yt: "baked+salmon+recipe+healthy", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80", desc: "Baked wild salmon fillet, roasted sweet potatoes.", p: 32, c: 30, f: 15, cal: 420 },
        { name: "Beef Stir-Fry", yt: "healthy+beef+stir+fry+recipe", img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80", desc: "93% lean ground beef, bell peppers, soy sauce.", p: 40, c: 35, f: 14, cal: 460 }
      ]
    },
    {
      category: "Snacks",
      Icon: Apple,
      color: "text-emerald-500",
      items: [
        { name: "Whey Protein", yt: "best+way+to+drink+whey+protein", img: "https://t3.ftcdn.net/jpg/05/20/96/26/360_F_520962669_NT3js1nveAmXHkSjrmAYtfkwssFLJ6Df.jpg", desc: "1 scoop of whey isolate mixed with water or skim milk.", p: 24, c: 3, f: 1, cal: 120 },
        { name: "Roasted Makhana", yt: "roasted+makhana+healthy+snack", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToEo3X8izL4f65FeZxMTel9yCmQGPjHnRFKTeebdUMiTGdZeMj4wm4XUuD&s=10", desc: "Fox nuts dry-roasted with a pinch of salt and turmeric.", p: 3, c: 20, f: 4, cal: 130 },
        { name: "Rice Cakes", yt: "rice+cakes+snack+ideas", img: "https://www.quakeroats.com/sites/quakeroats.com/files/styles/big_608_608/public/Spicy%20Cottage%20Cheese%20Chili%20Crunch%20Rice%20Cake-017-16x9.jpg?itok=FXPdNN1S", desc: "2 lightly salted rice cakes.", p: 2, c: 14, f: 1, cal: 70 },
        { name: "Almonds & Apple", yt: "healthy+apple+snack+ideas", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmASsads5quMhw4udGhRO1MslWX9k9FkiZ357g5hIE_ibHoHQntVvcTUI&s=10", desc: "Handful of raw almonds and a crisp green apple.", p: 6, c: 25, f: 14, cal: 240 },
        { name: "Berry Smoothie", yt: "high+protein+berry+smoothie", img: "https://simplegraytshirt.com/wp-content/uploads/2024/10/mixed-berry-smoothie-08.jpg", desc: "Mixed berries, whey protein, almond milk.", p: 25, c: 20, f: 4, cal: 220 }
      ]
    }
  ];

  const consumed = mealPlan.flatMap(s => s.items).reduce((acc, meal) => {
    const portions = selectedPortions[meal.name] || 0;
    return {
      cal: acc.cal + (meal.cal * portions),
      p: acc.p + (meal.p * portions),
      c: acc.c + (meal.c * portions),
      f: acc.f + (meal.f * portions)
    };
  }, { cal: 0, p: 0, c: 0, f: 0 });

  const remCal = targetCalories - consumed.cal;
  const remP = targetProtein - consumed.p;
  const remC = targetCarbs - consumed.c;
  const remF = targetFats - consumed.f;

  const activeCategoryData = mealPlan.find(section => section.category === activeTab) || mealPlan[0];

  return (
    <div className="space-y-6 animate-fade-in p-2 pb-20">
      <div>
        <h2 className="text-3xl font-bold text-wpText">Interactive Diet Builder</h2>
        <p className="text-wpMuted mt-1">Adjust portions to fit your daily macro targets.</p>
      </div>

      {/* Sticky Macro Tracker Dashboard */}
      <div className="sticky top-0 z-20 bg-[#f8f9fc] pt-4 pb-6 -mx-8 px-8 border-b border-gray-200/40 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.02)] mb-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-center gap-6 max-w-5xl mx-auto">
          <div className="text-center md:text-left min-w-[150px]">
            <p className="text-xs font-bold text-wpMuted uppercase tracking-wider mb-1">Remaining Calories</p>
            <p className={`text-4xl font-black tracking-tight transition-colors ${remCal < 0 ? 'text-red-500' : 'text-wpText'}`}>
              {remCal}
            </p>
          </div>
          <div className="flex gap-4 md:gap-8 w-full md:w-auto">
            <div className="flex-1 bg-wpGray px-4 py-3 rounded-2xl text-center">
              <p className="text-[10px] font-bold text-wpMuted uppercase tracking-wider mb-1">Protein</p>
              <p className={`text-xl font-black transition-colors ${remP < 0 ? 'text-red-500' : 'text-wpPurple'}`}>{remP}g</p>
            </div>
            <div className="flex-1 bg-wpGray px-4 py-3 rounded-2xl text-center">
              <p className="text-[10px] font-bold text-wpMuted uppercase tracking-wider mb-1">Carbs</p>
              <p className={`text-xl font-black transition-colors ${remC < 0 ? 'text-red-500' : 'text-wpText'}`}>{remC}g</p>
            </div>
            <div className="flex-1 bg-wpGray px-4 py-3 rounded-2xl text-center">
              <p className="text-[10px] font-bold text-wpMuted uppercase tracking-wider mb-1">Fats</p>
              <p className={`text-xl font-black transition-colors ${remF < 0 ? 'text-red-500' : 'text-wpText'}`}>{remF}g</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Button Navigation */}
      <div className="flex space-x-3 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {mealPlan.map((section) => {
          const SectionIcon = section.Icon;
          const isActive = activeTab === section.category;
          return (
            <button
              key={section.category}
              onClick={() => setActiveTab(section.category)}
              className={`flex items-center px-5 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap shrink-0 ${
                isActive 
                  ? 'bg-wpPurple text-white shadow-md shadow-wpPurple/20' 
                  : 'bg-white text-wpMuted border border-gray-200 hover:bg-gray-50 hover:border-wpPurple/30'
              }`}
            >
              <SectionIcon className={`w-4 h-4 mr-2 ${isActive ? 'text-white' : section.color}`} strokeWidth={2.5} />
              {section.category}
            </button>
          );
        })}
      </div>

      {/* Dynamic Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-5"
        >
          {activeCategoryData.items.map((meal, mealIdx) => {
            const portions = selectedPortions[meal.name] || 0;
            const isSelected = portions > 0;

            return (
              <div 
                key={mealIdx}
                className={`flex overflow-hidden rounded-2xl border transition-all duration-200 min-h-[160px] ${
                  isSelected ? 'bg-wpPurple/5 border-wpPurple shadow-md' : 'bg-white border-gray-200 shadow-sm hover:border-wpPurple/40'
                }`}
              >
                {/* Fixed Image Container */}
                <div className="w-1/3 min-w-[120px] max-w-[160px] relative shrink-0 bg-gray-100">
                  <img 
                    src={meal.img} 
                    alt={meal.name} 
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10"></div>
                </div>
                
                {/* Content & Controls */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-wpText text-base sm:text-lg leading-tight">{meal.name}</h4>
                        {/* Custom YouTube SVG - Won't Crash! */}
                        <a 
                          href={`https://www.youtube.com/results?search_query=${meal.yt}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          title="Watch Recipe on YouTube"
                          className="mt-0.5"
                        >
                          <YoutubeIcon />
                        </a>
                      </div>
                      <div className="flex items-center text-wpPurple bg-wpPurple/10 px-2 py-1 rounded-md text-[10px] font-black shrink-0">
                        <Flame className="w-3 h-3 mr-1" />
                        {meal.cal}
                      </div>
                    </div>
                    <p className="text-xs text-wpMuted mt-1 mb-4 line-clamp-2">
                      {meal.desc}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto gap-3">
                    {/* Macro Icons */}
                    <div className="flex gap-2">
                      <div className="flex items-center text-[11px] font-bold text-wpText bg-gray-100 px-2 py-1 rounded-md">
                        <Beef className="w-3 h-3 mr-1 text-red-400" />{meal.p}g
                      </div>
                      <div className="flex items-center text-[11px] font-bold text-wpText bg-gray-100 px-2 py-1 rounded-md">
                        <Wheat className="w-3 h-3 mr-1 text-amber-500" />{meal.c}g
                      </div>
                      <div className="flex items-center text-[11px] font-bold text-wpText bg-gray-100 px-2 py-1 rounded-md">
                        <Droplet className="w-3 h-3 mr-1 text-blue-400" />{meal.f}g
                      </div>
                    </div>

                    {/* Portion Controls */}
                    <div className="ml-auto sm:ml-0">
                      {portions === 0 ? (
                        <button 
                          onClick={() => handleAddPortion(meal.name)}
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-wpGray hover:bg-wpPurple hover:text-white text-wpText transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      ) : (
                        <div className="flex items-center bg-wpPurple text-white rounded-full h-8 shadow-sm">
                          <button onClick={() => handleRemovePortion(meal.name)} className="w-8 h-full flex items-center justify-center hover:bg-black/20 rounded-l-full">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-sm px-1 min-w-[20px] text-center">{portions}</span>
                          <button onClick={() => handleAddPortion(meal.name)} className="w-8 h-full flex items-center justify-center hover:bg-black/20 rounded-r-full">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}