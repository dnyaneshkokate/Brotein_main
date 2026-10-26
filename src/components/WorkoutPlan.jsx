import { motion } from 'framer-motion';

export default function WorkoutPlan({ data }) {
  const { weight, height, goal } = data;
  const heightInMeters = height / 100;
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
  
  let category = '';
  let routine = '';
  let details = [];

  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 24.9) category = 'Normal';
  else if (bmi < 29.9) category = 'Overweight';
  else category = 'Obese';

  if (category === 'Obese' || (category === 'Overweight' && goal === 'cut')) {
    routine = 'Full Body + LISS Cardio';
    details = ['Focus on joint-friendly compound lifts', '2x 45 min low-intensity steady state cardio'];
  } else {
    routine = 'Push / Pull / Legs (PPL)';
    details = ['6-day hypertrophy focus', 'Prioritize progressive overload'];
  }

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-7 rounded-[30px] border border-gray-100 shadow-sm mt-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm font-semibold text-wpMuted uppercase tracking-wider mb-2">Suggested Split</p>
          <p className="text-lg font-bold text-wpPurple">{routine}</p>
        </div>
        <div className="bg-wpGray px-5 py-3 rounded-2xl text-right">
          <p className="text-xs font-bold text-wpMuted uppercase tracking-wider mb-1">BMI</p>
          <p className="text-xl font-black text-wpText">{bmi}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        {details.map((detail, idx) => (
          <p key={idx} className="text-sm text-wpMuted font-medium flex items-center">
            <span className="w-1.5 h-1.5 bg-wpPurple rounded-full mr-2"></span>
            {detail}
          </p>
        ))}
      </div>
    </motion.div>
  );
}