/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          royal: "#1A237E",
          ocean: "#0D47A1",
          gold: "#FF6F00",
          teal: "#00BFA5",
          orange: "#FF5722",
          bg: "#F5F7FA",
          navy: "#1A1A2E",
          card: "#FFFFFF",
          success: "#00C853",
          warning: "#FFD600",
          error: "#D32F2F"
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Montserrat', 'sans-serif']
      },
      backgroundImage: {
        'nexus-gradient': 'linear-gradient(135deg, #1A237E 0%, #0D47A1 50%, #00BFA5 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FF6F00 0%, #FF5722 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(245,247,250,0.65) 100%)'
      },
      boxShadow: {
        'nexus': '0 10px 30px -10px rgba(26, 35, 126, 0.25)',
        'nexus-lg': '0 20px 40px -15px rgba(26, 35, 126, 0.35)',
        'gold': '0 10px 25px -5px rgba(255, 111, 0, 0.4)'
      }
    },
  },
  plugins: [],
}
