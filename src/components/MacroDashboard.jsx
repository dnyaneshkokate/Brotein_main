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
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-7 rounded-[30px] border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
        <div>
          <p className="text-sm font-semibold text-wpMuted uppercase tracking-wider mb-1">Daily Target</p>
          <p className="text-4xl font-extrabold text-wpText">{tdee} <span className="text-lg text-wpMuted font-medium">kcal</span></p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-wpGray p-5 rounded-2xl">
          <p className="text-wpMuted text-xs font-bold uppercase tracking-wider mb-2">Protein</p>
          <p className="text-2xl font-black text-wpPurple">{protein}g</p>
        </div>
        <div className="bg-wpGray p-5 rounded-2xl">
          <p className="text-wpMuted text-xs font-bold uppercase tracking-wider mb-2">Carbs</p>
          <p className="text-2xl font-black text-wpText">{carbs}g</p>
        </div>
        <div className="bg-wpGray p-5 rounded-2xl">
          <p className="text-wpMuted text-xs font-bold uppercase tracking-wider mb-2">Fats</p>
          <p className="text-2xl font-black text-wpText">{fats}g</p>
        </div>
      </div>
    </motion.div>
  );
}