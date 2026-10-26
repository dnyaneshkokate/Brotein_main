import { motion } from 'framer-motion';

export default function MacroDashboard({ data }) {
  const { weight, height, age, gender, goal } = data;

  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;
  let tdee = Math.round(bmr * 1.55);
  
  if (goal === 'cut') tdee -= 500;
  if (goal === 'bulk') tdee += 500;

  const protein = Math.round(weight * 2.2);
  const fats = Math.round(weight * 0.8);
  const carbs = Math.round((tdee - (protein * 4) - (fats * 9)) / 4);

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col justify-between">
      
      {/* Top Section: Daily Target */}
      <div className="mb-8">
        <p className="text-xs font-bold text-wpMuted uppercase tracking-wider mb-2">Daily Target</p>
        <div className="flex items-baseline gap-2">
          <p className="text-5xl font-black text-wpText tracking-tight">{tdee}</p>
          <span className="text-lg font-bold text-wpMuted">kcal</span>
        </div>
      </div>

      {/* Bottom Section: The 3 Macro Boxes */}
      <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
        <div className="bg-wpGray p-5 rounded-2xl text-center flex flex-col justify-center">
          <p className="text-wpMuted text-[10px] font-bold uppercase tracking-wider mb-3">Protein</p>
          <p className="text-2xl font-black text-wpPurple">{protein}g</p>
        </div>
        <div className="bg-wpGray p-5 rounded-2xl text-center flex flex-col justify-center">
          <p className="text-wpMuted text-[10px] font-bold uppercase tracking-wider mb-3">Carbs</p>
          <p className="text-2xl font-black text-wpText">{carbs}g</p>
        </div>
        <div className="bg-wpGray p-5 rounded-2xl text-center flex flex-col justify-center">
          <p className="text-wpMuted text-[10px] font-bold uppercase tracking-wider mb-3">Fats</p>
          <p className="text-2xl font-black text-wpText">{fats}g</p>
        </div>
      </div>

    </motion.div>
  );
}