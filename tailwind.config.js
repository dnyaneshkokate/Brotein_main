/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wpNavy: '#0f1225',    // Header background
        wpPurple: '#5542f6',  // Accent buttons
        wpBg: '#ffffff',      // Main card background
        wpGray: '#f4f5f9',    // Input fields background
        wpText: '#111827',    // Main dark text
        wpMuted: '#6b7280'    // Subtitles & icons
      }
    },
  },
  plugins: [],
}