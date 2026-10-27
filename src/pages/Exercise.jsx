import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { Dumbbell, Activity, Timer, Wind, ChevronDown, ChevronUp, Target, Repeat, CheckCircle2, Circle, Info, Save } from 'lucide-react';

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-red-500 hover:text-red-600 transition-colors">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Exercise() {
  const savedData = localStorage.getItem('broteinUser');
  if (!savedData) return <Navigate to="/" />;
  
  let userData;
  try { userData = JSON.parse(savedData); } 
  catch (e) { return <Navigate to="/" />; }

  const goal = userData?.goal || 'maintain';

  const [completedExercises, setCompletedExercises] = useState(() => {
    const saved = localStorage.getItem('broteinWorkoutProgress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('broteinWorkoutProgress', JSON.stringify(completedExercises));
  }, [completedExercises]);

  const toggleComplete = (exerciseName) => {
    setCompletedExercises(prev => ({ ...prev, [exerciseName]: !prev[exerciseName] }));
  };

  const [isSaving, setIsSaving] = useState(false);
  const handleSaveWorkout = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  const cardioProtocols = {
    cut: { title: "Fat Loss Protocol", treadmill: { speed: "3.2 mph", incline: "12%", time: "30 mins" }, outdoor: { distance: "5 km", pace: "Moderate / Zone 2", time: "35-40 mins" } },
    bulk: { title: "Anabolic Preservation", treadmill: { speed: "2.8 mph", incline: "3%", time: "10 mins" }, outdoor: { distance: "1.5 km", pace: "Brisk Walk", time: "10-15 mins" } },
    maintain: { title: "Cardiovascular Health", treadmill: { speed: "3.5 mph", incline: "5%", time: "20 mins" }, outdoor: { distance: "3 km", pace: "Tempo / Zone 3", time: "20-25 mins" } }
  };
  const cardio = cardioProtocols[goal];
  const isCardioCompleted = completedExercises['Cardio_Session'];

  const [activeSplit, setActiveSplit] = useState("Push / Pull / Legs");
  
  const [openDays, setOpenDays] = useState({ 
    "Push Day": true, "Upper Body": true, "Chest & Back": true, "Chest Day": true, "Push Options": true 
  });

  const toggleDay = (dayName) => setOpenDays(prev => ({ ...prev, [dayName]: !prev[dayName] }));

  const splitInstructions = {
    "Full-Body Split": "Bro, for a true full-body session, pick 6 exercises total: Select 2 from Push, 2 from Pull, and 2 from Legs.",
    "Push / Pull / Legs": "Smash 4-5 exercises for your target muscle group today. Make sure you hit the primary compound lift first!",
    "Arnold Split": "Arnold style! You're hitting antagonist muscles. Aim for 6-8 exercises total, supersetting where possible.",
    "Bro Split": "Focus on maximum isolation. Pick 4-5 exercises and completely destroy that single muscle group today.",
    "Upper / Lower": "Heavy compound focus. Hit 5-6 exercises targeting the entire upper or lower kinetic chain."
  };

  const workoutDatabase = {
    "Full-Body Split": [
      {
        day: "Push Options", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500",
        exercises: [
          { name: "Barbell Bench Press", yt: "bench+press+form", img: "https://images.pexels.com/photos/3838937/pexels-photo-3838937.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Mid Chest", sets: "3 Sets", reps: "8-10 Reps", desc: "Heavy compound press. Focus on progressive overload." },
          { name: "Overhead Press", yt: "strict+overhead+press", img: "https://images.pexels.com/photos/4167175/pexels-photo-4167175.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Shoulders", sets: "3 Sets", reps: "8-10 Reps", desc: "Brace core tight, press barbell straight up in a vertical line." },
          { name: "Incline Dumbbell Press", yt: "incline+dumbbell+press", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3FLIqQeEMinE-aafHwSkXHv1j7L9BABw4TWvXyfqv2yNEN9EnUDW7os&s=10", target: "Upper Chest", sets: "3 Sets", reps: "10-12 Reps", desc: "Set bench to 30 degrees. Keep elbows tucked at 45 degrees." },
          { name: "Dips", yt: "chest+dips+form", img: "https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Lower Chest / Triceps", sets: "3 Sets", reps: "Till Failure", desc: "Lean forward for chest bias, stay upright for triceps." }
        ]
      },
      {
        day: "Pull Options", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500",
        exercises: [
          { name: "Pull-Ups", yt: "perfect+pullups", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3FLIqQeEMinE-aafHwSkXHv1j7L9BABw4TWvXyfqv2yNEN9EnUDW7os&s=10", target: "Lats", sets: "3 Sets", reps: "Till Failure", desc: "Full range of motion. Dead hang at the bottom." },
          { name: "Barbell Row", yt: "barbell+row+properly", img: "https://images.pexels.com/photos/949126/pexels-photo-949126.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Mid Back", sets: "3 Sets", reps: "8-10 Reps", desc: "Hinge at the hips keeping back straight. Pull into belly button." },
          { name: "Lat Pulldown", yt: "lat+pulldown", img: "https://images.pexels.com/photos/791176/pexels-photo-791176.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Lats", sets: "3 Sets", reps: "10-12 Reps", desc: "Use a wide grip. Lean slightly back and drive elbows down." },
          { name: "Face Pulls", yt: "cable+face+pulls", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3FLIqQeEMinE-aafHwSkXHv1j7L9BABw4TWvXyfqv2yNEN9EnUDW7os&s=10", target: "Rear Delts", sets: "3 Sets", reps: "15-20 Reps", desc: "Pull rope towards your face, flaring elbows outwards." }
        ]
      },
      {
        day: "Leg Options", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500",
        exercises: [
          { name: "Barbell Squat", yt: "barbell+squat+form", img: "https://images.pexels.com/photos/791160/pexels-photo-791160.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Quads", sets: "3 Sets", reps: "6-8 Reps", desc: "Take a deep breath, brace core, break parallel at the bottom." },
          { name: "Romanian Deadlift", yt: "romanian+deadlift+RDL", img: "https://images.pexels.com/photos/703012/pexels-photo-703012.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Hamstrings", sets: "3 Sets", reps: "8-10 Reps", desc: "Push hips straight back until you feel a deep hamstring stretch." },
          { name: "Leg Press", yt: "leg+press+proper+foot+placement", img: "https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Quads", sets: "3 Sets", reps: "10-12 Reps", desc: "Place feet low and close for quad bias. Control the negative." },
          { name: "Walking Lunges", yt: "dumbbell+walking+lunges", img: "https://images.pexels.com/photos/4398884/pexels-photo-4398884.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Glutes / Quads", sets: "3 Sets", reps: "12 Steps", desc: "Take long strides to target glutes, shorter strides for quads." }
        ]
      }
    ],
    "Push / Pull / Legs": [
      {
        day: "Push Day", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500",
        exercises: [
          { name: "Bench Press", yt: "bench+press+form", img: "https://images.pexels.com/photos/3838937/pexels-photo-3838937.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Mid Chest", sets: "4 Sets", reps: "8-10 Reps", desc: "Retract scapula, plant feet firmly. Press explosively." },
          { name: "Incline DB Press", yt: "incline+dumbbell+press", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3FLIqQeEMinE-aafHwSkXHv1j7L9BABw4TWvXyfqv2yNEN9EnUDW7os&s=10", target: "Upper Chest", sets: "3 Sets", reps: "10-12 Reps", desc: "Keep elbows tucked at 45 degrees to protect shoulders." },
          { name: "Overhead Press", yt: "strict+overhead+press", img: "https://images.pexels.com/photos/4167175/pexels-photo-4167175.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Shoulders", sets: "3 Sets", reps: "8-10 Reps", desc: "Brace core tight, press barbell straight up in a vertical line." },
          { name: "Tricep Pushdown", yt: "cable+tricep+pushdown", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3FLIqQeEMinE-aafHwSkXHv1j7L9BABw4TWvXyfqv2yNEN9EnUDW7os&s=10", target: "Triceps", sets: "4 Sets", reps: "12-15 Reps", desc: "Lock elbows to your sides. Focus on the squeeze at the bottom." }
        ]
      },
      {
        day: "Pull Day", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500",
        exercises: [
          { name: "Barbell Row", yt: "barbell+row+properly", img: "https://images.pexels.com/photos/949126/pexels-photo-949126.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Mid Back", sets: "4 Sets", reps: "8-10 Reps", desc: "Hinge at the hips keeping back straight. Pull into belly button." },
          { name: "Lat Pulldown", yt: "lat+pulldown", img: "https://images.pexels.com/photos/791176/pexels-photo-791176.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Lats", sets: "3 Sets", reps: "10-12 Reps", desc: "Use a wide grip. Lean slightly back and drive elbows down." },
          { name: "Face Pulls", yt: "cable+face+pulls", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3FLIqQeEMinE-aafHwSkXHv1j7L9BABw4TWvXyfqv2yNEN9EnUDW7os&s=10", target: "Rear Delts", sets: "3 Sets", reps: "15-20 Reps", desc: "Set cable to eye level. Pull rope towards your face." },
          { name: "Incline DB Curl", yt: "incline+dumbbell+curl", img: "https://images.pexels.com/photos/3837142/pexels-photo-3837142.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Bicep Long Head", sets: "4 Sets", reps: "10-12 Reps", desc: "Let arms hang straight down on an incline bench to maximize stretch." }
        ]
      },
      {
        day: "Leg Day", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500",
        exercises: [
          { name: "Back Squat", yt: "barbell+squat+form", img: "https://images.pexels.com/photos/791160/pexels-photo-791160.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Quads", sets: "4 Sets", reps: "6-8 Reps", desc: "Take a deep breath, brace core, break parallel at the bottom." },
          { name: "Romanian Deadlift", yt: "romanian+deadlift+RDL", img: "https://images.pexels.com/photos/703012/pexels-photo-703012.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Hamstrings", sets: "3 Sets", reps: "8-10 Reps", desc: "Push hips straight back until you feel a deep hamstring stretch." },
          { name: "Leg Press", yt: "leg+press+proper+foot+placement", img: "https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Quads", sets: "3 Sets", reps: "10-12 Reps", desc: "Place feet low and close for quad bias. Control the negative." },
          { name: "Calf Raises", yt: "standing+calf+raise", img: "https://images.pexels.com/photos/4058223/pexels-photo-4058223.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Calves", sets: "4 Sets", reps: "15-20 Reps", desc: "Pause for a full second at the deep stretch, then explode up." }
        ]
      }
    ],
    "Arnold Split": [
      {
        day: "Chest & Back", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500",
        exercises: [
          { name: "Bench Press", yt: "bench+press+form", img: "https://images.pexels.com/photos/3838937/pexels-photo-3838937.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Chest", sets: "4 Sets", reps: "8-10 Reps", desc: "Primary chest mass builder." },
          { name: "Barbell Row", yt: "barbell+row+properly", img: "https://images.pexels.com/photos/949126/pexels-photo-949126.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Back", sets: "4 Sets", reps: "8-10 Reps", desc: "Primary back thickness builder. Superset with bench if possible." },
          { name: "Incline DB Press", yt: "incline+dumbbell+press", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3FLIqQeEMinE-aafHwSkXHv1j7L9BABw4TWvXyfqv2yNEN9EnUDW7os&s=10", target: "Upper Chest", sets: "3 Sets", reps: "10-12 Reps", desc: "Builds the upper pectoral shelf." },
          { name: "Pull-Ups", yt: "perfect+pullups", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3FLIqQeEMinE-aafHwSkXHv1j7L9BABw4TWvXyfqv2yNEN9EnUDW7os&s=10", target: "Lats", sets: "3 Sets", reps: "Failure", desc: "Builds back width. Superset with Incline press." }
        ]
      },
      {
        day: "Legs", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500",
        exercises: [
          { name: "Front Squat", yt: "how+to+front+squat", img: "https://images.pexels.com/photos/791160/pexels-photo-791160.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Quads", sets: "4 Sets", reps: "8-10 Reps", desc: "Rest barbell on front delts. Keeps torso vertical." },
          { name: "RDL", yt: "romanian+deadlift+RDL", img: "https://images.pexels.com/photos/703012/pexels-photo-703012.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Hamstrings", sets: "4 Sets", reps: "8-10 Reps", desc: "Hinge movement for posterior chain." },
          { name: "Leg Extensions", yt: "leg+extension+form", img: "https://images.pexels.com/photos/4164770/pexels-photo-4164770.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Quads", sets: "3 Sets", reps: "15 Reps", desc: "Isolation for the quad sweep. Hold at the top." }
        ]
      },
      {
        day: "Shoulders & Arms", color: "text-wpPurple", bg: "bg-wpPurple/10", border: "border-wpPurple",
        exercises: [
          { name: "Seated DB Press", yt: "seated+dumbbell+shoulder+press", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3FLIqQeEMinE-aafHwSkXHv1j7L9BABw4TWvXyfqv2yNEN9EnUDW7os&s=10", target: "Shoulders", sets: "4 Sets", reps: "8-10 Reps", desc: "Keep back flat against pad. Press without clinking." },
          { name: "Lateral Raises", yt: "dumbbell+lateral+raise", img: "https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Side Delts", sets: "4 Sets", reps: "15-20 Reps", desc: "Pour the pitcher at the top to target side delts." },
          { name: "Barbell Curls", yt: "barbell+bicep+curl", img: "https://images.pexels.com/photos/11096089/pexels-photo-11096089.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Biceps", sets: "4 Sets", reps: "10-12 Reps", desc: "Strict form, no swinging back." },
          { name: "Skullcrushers", yt: "ez+bar+skullcrusher", img: "https://images.pexels.com/photos/6009292/pexels-photo-6009292.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Triceps", sets: "4 Sets", reps: "10-12 Reps", desc: "Lower bar to forehead, extend using only triceps." }
        ]
      }
    ],
    "Bro Split": [
      {
        day: "Chest Day", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500",
        exercises: [
          { name: "Bench Press", yt: "bench+press+form", img: "https://images.pexels.com/photos/3838937/pexels-photo-3838937.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Mid Chest", sets: "4 Sets", reps: "8 Reps", desc: "Heavy compound pressing." },
          { name: "Incline DB Press", yt: "incline+dumbbell+press", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3FLIqQeEMinE-aafHwSkXHv1j7L9BABw4TWvXyfqv2yNEN9EnUDW7os&s=10", target: "Upper Chest", sets: "4 Sets", reps: "10 Reps", desc: "Builds the upper shelf." },
          { name: "Pec Deck Flyes", yt: "pec+deck+machine", img: "https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Inner Chest", sets: "3 Sets", reps: "15 Reps", desc: "Focus on the squeeze in the middle." }
        ]
      },
      {
        day: "Back Day", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500",
        exercises: [
          { name: "Deadlifts", yt: "conventional+deadlift+form", img: "https://images.pexels.com/photos/703012/pexels-photo-703012.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Full Back / CNS", sets: "3 Sets", reps: "5 Reps", desc: "The ultimate mass builder. Keep back neutral." },
          { name: "Lat Pulldown", yt: "lat+pulldown", img: "https://images.pexels.com/photos/791176/pexels-photo-791176.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Lats", sets: "4 Sets", reps: "10 Reps", desc: "Wide grip for width." },
          { name: "Seated Cable Row", yt: "seated+cable+row", img: "https://images.pexels.com/photos/4164756/pexels-photo-4164756.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Mid Back", sets: "4 Sets", reps: "12 Reps", desc: "Pinch shoulder blades together at the peak." }
        ]
      },
      {
        day: "Leg Day", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500",
        exercises: [
          { name: "Back Squat", yt: "barbell+squat+form", img: "https://images.pexels.com/photos/791160/pexels-photo-791160.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Quads", sets: "4 Sets", reps: "8 Reps", desc: "Core tight, below parallel." },
          { name: "Leg Press", yt: "leg+press+form", img: "https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Quads", sets: "4 Sets", reps: "12 Reps", desc: "Don't lock knees at the top." },
          { name: "Leg Curls", yt: "lying+leg+curl", img: "https://images.pexels.com/photos/4058145/pexels-photo-4058145.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Hamstrings", sets: "4 Sets", reps: "15 Reps", desc: "Squeeze at the top of the curl." }
        ]
      },
      {
        day: "Arm Day", color: "text-wpPurple", bg: "bg-wpPurple/10", border: "border-wpPurple",
        exercises: [
          { name: "Barbell Curls", yt: "barbell+bicep+curl", img: "https://images.pexels.com/photos/11096089/pexels-photo-11096089.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Biceps", sets: "4 Sets", reps: "10 Reps", desc: "Strict form, elbows pinned." },
          { name: "Tricep Pushdown", yt: "cable+tricep+pushdown", img: "https://images.pexels.com/photos/17154218/pexels-photo-17154218.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Triceps", sets: "4 Sets", reps: "12 Reps", desc: "Use a rope to pull apart at the bottom." },
          { name: "Hammer Curls", yt: "dumbbell+hammer+curl", img: "https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Brachialis", sets: "3 Sets", reps: "12 Reps", desc: "Neutral grip to build arm thickness." }
        ]
      }
    ],
    "Upper / Lower": [
      {
        day: "Upper Body", color: "text-wpPurple", bg: "bg-wpPurple/10", border: "border-wpPurple",
        exercises: [
          { name: "Bench Press", yt: "bench+press+form", img: "https://images.pexels.com/photos/3838937/pexels-photo-3838937.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Chest", sets: "4 Sets", reps: "6-8 Reps", desc: "Heavy compound press." },
          { name: "Pull-Ups", yt: "perfect+pullups", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3FLIqQeEMinE-aafHwSkXHv1j7L9BABw4TWvXyfqv2yNEN9EnUDW7os&s=10", target: "Lats", sets: "3 Sets", reps: "Failure", desc: "Dead hang at the bottom." },
          { name: "Seated DB Press", yt: "seated+dumbbell+shoulder+press", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3FLIqQeEMinE-aafHwSkXHv1j7L9BABw4TWvXyfqv2yNEN9EnUDW7os&s=10", target: "Shoulders", sets: "3 Sets", reps: "10-12 Reps", desc: "Press without clinking." }
        ]
      },
      {
        day: "Lower Body", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500",
        exercises: [
          { name: "Front Squat", yt: "front+squat", img: "https://images.pexels.com/photos/791160/pexels-photo-791160.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Quads", sets: "4 Sets", reps: "8-10 Reps", desc: "Keep elbows high." },
          { name: "Lying Leg Curls", yt: "lying+leg+curl", img: "https://images.pexels.com/photos/4058145/pexels-photo-4058145.jpeg?auto=compress&cs=tinysrgb&w=800", target: "Hamstrings", sets: "3 Sets", reps: "12-15 Reps", desc: "Keep hips driven into pad." }
        ]
      }
    ]
  };

  const activePlanData = workoutDatabase[activeSplit];

  return (
    <div className="space-y-8 animate-fade-in p-2 pb-24 max-w-6xl mx-auto">
      
      <div>
        <h2 className="text-3xl font-bold text-wpText">Training Protocol</h2>
        <p className="text-wpMuted mt-1">Exact cardio parameters and structured workout splits.</p>
      </div>

      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide pt-2">
        {Object.keys(workoutDatabase).map((splitName) => {
          const isActive = activeSplit === splitName;
          return (
            <button
              key={splitName}
              onClick={() => setActiveSplit(splitName)}
              className={`flex items-center px-6 py-3.5 rounded-2xl font-bold text-sm transition-all whitespace-nowrap shrink-0 ${
                isActive 
                  ? 'bg-wpText text-white shadow-md' 
                  : 'bg-white text-wpMuted border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              <Dumbbell className={`w-4 h-4 mr-2 ${isActive ? 'text-white' : 'text-wpMuted'}`} strokeWidth={2.5} />
              {splitName}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeSplit}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-center shadow-sm"
        >
          <div className="bg-blue-100 p-2 rounded-xl mr-4 shrink-0">
            <Info className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-sm font-semibold text-blue-800 leading-relaxed">
            {splitInstructions[activeSplit]}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="space-y-5">
        {activePlanData.map((dayData, idx) => {
          const isOpen = openDays[dayData.day];
          
          return (
            <div key={idx} className={`bg-white rounded-3xl shadow-sm border-2 overflow-hidden transition-colors duration-300 ${isOpen ? dayData.border : 'border-gray-100'}`}>
              
              <button 
                onClick={() => toggleDay(dayData.day)}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors focus:outline-none"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-2xl ${dayData.bg} ${dayData.color} mr-5`}>
                    <Dumbbell className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-black text-wpText uppercase tracking-wide">
                      {dayData.day}
                    </h3>
                  </div>
                </div>
                {isOpen ? (
                  <div className={`${dayData.bg} p-2 rounded-full`}>
                    <ChevronUp className={`w-6 h-6 ${dayData.color}`} />
                  </div>
                ) : (
                  <div className="bg-gray-100 p-2 rounded-full">
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-5 bg-gray-50/50">
                      {dayData.exercises.map((exercise, exIdx) => {
                        const isCompleted = completedExercises[exercise.name];

                        return (
                          <div 
                            key={exIdx}
                            className={`flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-white border-2 shadow-sm transition-all duration-300 min-h-[160px] ${
                              isCompleted ? 'border-emerald-400 shadow-emerald-500/10' : 'border-gray-100 hover:shadow-md hover:border-gray-300'
                            }`}
                          >
                            <div className="w-full sm:w-1/3 min-w-[120px] max-w-full sm:max-w-[160px] relative shrink-0 bg-gray-100 border-r border-gray-100 h-40 sm:h-auto">
                              <img 
                                src={exercise.img} 
                                alt={exercise.name} 
                                className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ${isCompleted ? 'opacity-50 grayscale' : ''}`}
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                              
                              <AnimatePresence>
                                {isCompleted && (
                                  <motion.div 
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                    className="absolute inset-0 flex items-center justify-center bg-emerald-500/20 backdrop-blur-sm"
                                  >
                                    <CheckCircle2 className="w-12 h-12 text-emerald-500 drop-shadow-md bg-white rounded-full" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                            
                            <div className="p-5 flex flex-col justify-between flex-1 relative">
                              <div>
                                <div className="flex justify-between items-start mb-2 gap-2">
                                  <h4 className={`font-bold text-lg leading-tight pr-2 transition-colors ${isCompleted ? 'text-emerald-700' : 'text-wpText'}`}>
                                    {exercise.name}
                                  </h4>
                                  <a 
                                    href={`https://www.youtube.com/results?search_query=${exercise.yt}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    title={`Watch ${exercise.name} tutorial`}
                                    className="mt-0.5 shrink-0"
                                  >
                                    <YoutubeIcon />
                                  </a>
                                </div>
                                
                                <div className="inline-flex items-center bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3">
                                  <Target className="w-3 h-3 mr-1" />
                                  {exercise.target}
                                </div>
                                
                                <p className={`text-xs leading-relaxed line-clamp-2 transition-colors ${isCompleted ? 'text-gray-400' : 'text-wpMuted'}`}>
                                  {exercise.desc}
                                </p>
                              </div>

                              <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                                <div className="flex gap-2">
                                  <div className={`flex items-center text-xs font-black px-3 py-1.5 rounded-lg shadow-sm transition-colors ${isCompleted ? 'bg-emerald-100 text-emerald-700' : `${dayData.bg} ${dayData.color}`}`}>
                                    <Repeat className="w-3.5 h-3.5 mr-1.5" />
                                    {exercise.sets}
                                  </div>
                                  <div className={`flex items-center text-xs font-black px-3 py-1.5 rounded-lg shadow-sm transition-colors ${isCompleted ? 'bg-gray-50 text-gray-400' : 'bg-gray-100 text-wpText'}`}>
                                    {exercise.reps}
                                  </div>
                                </div>

                                <button
                                  onClick={() => toggleComplete(exercise.name)}
                                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wide transition-all ${
                                    isCompleted
                                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600'
                                      : 'bg-gray-100 text-wpMuted hover:bg-gray-200 hover:text-wpText'
                                  }`}
                                >
                                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                                  {isCompleted ? 'Done' : 'Mark Done'}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          );
        })}
      </div>

      {/* PREMIUM SPLIT-PANE CARDIO ENGINE */}
      <div 
        className={`mt-12 w-full rounded-3xl overflow-hidden shadow-sm border-2 flex flex-col md:flex-row transition-all duration-500 ${
          isCardioCompleted ? 'border-emerald-500 shadow-[0_4px_30px_rgba(16,185,129,0.15)]' : 'border-gray-200'
        }`}
      >
        <div className="md:w-3/5 bg-white p-8 md:p-10 flex flex-col justify-center z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-rose-500/10 p-3 rounded-2xl mr-4 border border-rose-500/20">
                <Activity className="w-7 h-7 text-rose-500" />
              </div>
              <div>
                <h3 className="font-black text-wpText text-2xl">Cardio Protocol</h3>
                <p className="text-xs font-bold text-rose-500 uppercase tracking-wider mt-1">{cardio.title}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center mb-4">
                <Timer className="w-5 h-5 text-wpPurple mr-2" />
                <p className="text-xs font-bold text-wpText uppercase tracking-wider">Treadmill</p>
              </div>
              <div className="flex items-end justify-between mt-auto">
                <div>
                  <p className="text-lg font-black text-wpText">{cardio.treadmill.speed}</p>
                  <p className="text-xs font-medium text-wpMuted">{cardio.treadmill.incline}</p>
                </div>
                <span className="text-sm font-black text-wpPurple bg-wpPurple/10 px-3 py-1.5 rounded-lg">{cardio.treadmill.time}</span>
              </div>
            </div>

            <div className="flex flex-col p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center mb-4">
                <Wind className="w-5 h-5 text-blue-500 mr-2" />
                <p className="text-xs font-bold text-wpText uppercase tracking-wider">Outdoor</p>
              </div>
              <div className="flex items-end justify-between mt-auto">
                <div>
                  <p className="text-lg font-black text-wpText">{cardio.outdoor.pace}</p>
                  <p className="text-xs font-medium text-wpMuted">Pace</p>
                </div>
                <span className="text-sm font-black text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-lg">{cardio.outdoor.distance}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/5 relative bg-slate-900 flex flex-col items-center justify-center p-10 overflow-hidden min-h-[250px] md:min-h-full">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
          
          {!isCardioCompleted && (
            <>
              <motion.div 
                className="absolute w-32 h-32 rounded-full border border-rose-500/30"
                animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute w-32 h-32 rounded-full border border-rose-500/30"
                animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 1 }}
              />
            </>
          )}

          <button
            onClick={() => toggleComplete('Cardio_Session')}
            className={`relative z-10 flex flex-col items-center justify-center w-32 h-32 rounded-full transition-all duration-300 ${
              isCardioCompleted
                ? 'bg-emerald-500 text-white shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:bg-emerald-600 scale-105'
                : 'bg-slate-800 text-gray-400 border-2 border-slate-700 hover:border-rose-500 hover:text-rose-500 shadow-xl'
            }`}
          >
            {isCardioCompleted ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                <CheckCircle2 className="w-10 h-10 mb-1" />
                <span className="text-[10px] font-black uppercase tracking-widest">Secured</span>
              </motion.div>
            ) : (
              <motion.div className="flex flex-col items-center">
                <Circle className="w-10 h-10 mb-1" strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Mark Done</span>
              </motion.div>
            )}
          </button>
        </div>
      </div>

      <div className="pt-8 flex justify-center">
        <button
          onClick={handleSaveWorkout}
          disabled={isSaving}
          className={`flex items-center justify-center px-12 py-5 rounded-full text-white font-black text-lg shadow-xl transition-all w-full md:w-auto ${
            isSaving ? 'bg-emerald-500 scale-95' : 'bg-wpPurple hover:bg-indigo-600 hover:scale-105 active:scale-95 shadow-wpPurple/30 hover:shadow-wpPurple/50'
          }`}
        >
          {isSaving ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center">
              <CheckCircle2 className="w-6 h-6 mr-2" />
              WORKOUT SAVED!
            </motion.div>
          ) : (
            <>
              <Save className="w-6 h-6 mr-2" />
              SAVE TODAY'S PROGRESS
            </>
          )}
        </button>
      </div>

    </div>
  );
}