import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserInputForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ age: '', weight: '', height: '', gender: 'male', goal: 'maintain' });
  const [errors, setErrors] = useState({});

  const validateForm = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.age || formData.age < 15 || formData.age > 80) newErrors.age = "15 - 80 years";
    if (!formData.height || formData.height < 100 || formData.height > 250) newErrors.height = "100 - 250 cm";
    if (!formData.weight || formData.weight < 30 || formData.weight > 200) newErrors.weight = "30 - 200 kg";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      // Save to browser memory so the Dashboard layout can use it globally
      localStorage.setItem('broteinUser', JSON.stringify(formData));
      navigate('/dashboard');
    }
  };

  const inputClass = "w-full bg-wpGray border-none rounded-2xl p-4 text-wpText focus:ring-2 focus:ring-wpPurple outline-none transition-all font-medium";

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-wpText">Macro Architect</h2>
        <p className="text-wpMuted mt-2 text-sm">Enter your stats to generate a blueprint.</p>
      </div>

      <form onSubmit={validateForm} className="bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-wpText mb-2 ml-1">Age</label>
            <input type="number" className={inputClass} value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} placeholder="Years" />
            {errors.age && <p className="text-red-500 text-xs mt-2 ml-2 font-medium">{errors.age}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-wpText mb-2 ml-1">Height</label>
            <input type="number" className={inputClass} value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} placeholder="cm" />
            {errors.height && <p className="text-red-500 text-xs mt-2 ml-2 font-medium">{errors.height}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-wpText mb-2 ml-1">Weight</label>
            <input type="number" className={inputClass} value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} placeholder="kg" />
            {errors.weight && <p className="text-red-500 text-xs mt-2 ml-2 font-medium">{errors.weight}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-wpText mb-2 ml-1">Goal</label>
            <select className={inputClass} value={formData.goal} onChange={(e) => setFormData({...formData, goal: e.target.value})}>
              <option value="cut">Cut Fat</option>
              <option value="maintain">Maintain</option>
              <option value="bulk">Build Muscle</option>
            </select>
          </div>
        </div>
        <button type="submit" className="mt-8 w-full bg-wpPurple text-white font-bold py-4 rounded-full shadow-lg shadow-wpPurple/25 hover:opacity-90 transition-all">
          Proceed
        </button>
      </form>
    </div>
  );
}