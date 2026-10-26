import { Navigate } from 'react-router-dom';
import MacroDashboard from '../components/MacroDashboard';
import WorkoutPlan from '../components/WorkoutPlan';

export default function Overview() {
  const savedData = localStorage.getItem('broteinUser');
  
  if (!savedData) {
    return <Navigate to="/" />;
  }

  const userData = JSON.parse(savedData);

  return (
    <div className="space-y-6 animate-fade-in p-2">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-wpText">Welcome back</h2>
        <p className="text-wpMuted mt-1">Here is your active blueprint.</p>
      </div>

      {/* The grid that holds the two WorkPulse-style white cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MacroDashboard data={userData} />
        <WorkoutPlan data={userData} />
      </div>
    </div>
  );
}