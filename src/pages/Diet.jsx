import { motion } from 'framer-motion';
import { Flame, Coffee, Sun, Moon, Apple } from 'lucide-react';

export default function Diet() {
  // Meal-based database with minimalist icons and macros
  const mealPlan = [
    {
      category: "Breakfast",
      Icon: Coffee,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      items: [
        { name: "Pro-Oats & Berries", desc: "Rolled oats mixed with whey protein, chia seeds, and blueberries.", macros: "35g P | 45g C | 8g F", calories: 390 },
        { name: "Egg White Scramble", desc: "4 egg whites, 1 whole egg, spinach, alongside whole wheat toast.", macros: "28g P | 22g C | 12g F", calories: 310 }
      ]
    },
    {
      category: "Lunch",
      Icon: Sun,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      items: [
        { name: "Chicken & Rice Bowl", desc: "Grilled chicken breast, jasmine rice, and steamed broccoli.", macros: "45g P | 50g C | 6g F", calories: 450 },
        { name: "Tuna Pasta Salad", desc: "Canned tuna, whole grain pasta, greek yogurt mayo, and celery.", macros: "38g P | 42g C | 10g F", calories: 410 }
      ]
    },
    {
      category: "Dinner",
      Icon: Moon,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      items: [
        { name: "Wild Salmon & Sweet Potato", desc: "Baked wild salmon fillet, roasted sweet potatoes, and asparagus.", macros: "32g P | 30g C | 15g F", calories: 420 },
        { name: "Lean Beef Stir-Fry", desc: "93% lean ground beef, bell peppers, soy sauce, and quinoa.", macros: "40g P | 35g C | 14g F", calories: 460 }
      ]
    },
    {
      category: "Snacks",
      Icon: Apple,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      items: [
        { name: "Greek Yogurt Parfait", desc: "0% Fat Greek yogurt, a touch of honey, and sliced almonds.", macros: "20g P | 15g C | 5g F", calories: 180 },
        { name: "Protein & Rice Cakes", desc: "1 scoop whey isolate with water, 2 lightly salted rice cakes.", macros: "25g P | 14g C | 1g F", calories: 160 }
      ]
    }
  ];

  return (
    <div className="space-y-10 animate-fade-in p-2">
      <div>
        <h2 className="text-3xl font-bold text-wpText">Diet Blueprint</h2>
        <p className="text-wpMuted mt-1">Select from these optimal meals to hit your daily macro targets.</p>
      </div>

      {mealPlan.map((section, idx) => {
        const SectionIcon = section.Icon;
        
        return (
          <div key={idx} className="space-y-4">
            <h3 className="text-lg font-bold text-wpText uppercase tracking-wide flex items-center border-b border-gray-200 pb-2">
              <SectionIcon className={`w-5 h-5 mr-3 ${section.color}`} strokeWidth={2.5} />
              {section.category}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {section.items.map((meal, mealIdx) => (
                <motion.div 
                  key={mealIdx}
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      {/* Minimalist Image Box */}
                      <div className={`p-3 rounded-xl ${section.bg} ${section.color} border border-white/50 shadow-sm shrink-0`}>
                        <SectionIcon className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                      
                      {/* Calorie Badge */}
                      <div className="flex items-center text-wpPurple bg-wpPurple/10 px-3 py-1.5 rounded-lg text-sm font-bold">
                        <Flame className="w-4 h-4 mr-1.5" />
                        {meal.calories} kcal
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-wpText text-xl">{meal.name}</h4>
                    <p className="text-sm text-wpMuted mt-2 mb-6 leading-relaxed">
                      {meal.desc}
                    </p>
                  </div>

                  {/* Macros Display */}
                  <div className="mt-auto bg-[#f8f9fc] p-3.5 rounded-xl border border-gray-100 text-center">
                    <p className="text-sm font-black text-wpText tracking-widest">{meal.macros}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}