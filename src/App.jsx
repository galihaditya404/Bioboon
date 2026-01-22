import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Analytics from "./pages/Analytics";
import { ThemeProvider } from "./utils/ThemeContext";
import ParticleBackground from "./components/ui/ParticleBackground";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-day-bg text-day-text dark:bg-void dark:text-pale font-sans selection:bg-bio-glow selection:text-void relative overflow-x-hidden transition-colors duration-500">
          {/* Global Noise Overlay */}
          <div className="noise-overlay opacity-30 dark:opacity-50" />

          {/* Ambient Organic Glows */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-bio-500/10 rounded-full blur-[100px] animate-[float-slow_15s_ease-in-out_infinite]" />
            <div className="absolute top-[40%] right-[-20%] w-[50%] h-[50%] bg-moss/20 rounded-full blur-[120px] animate-[float-slow_20s_ease-in-out_infinite_reverse]" />
            <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-bio-glow/5 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />
          </div>

          <Navbar />

          <main className="relative z-10 pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>

          <footer className="relative z-10 py-6 text-center text-day-text/40 dark:text-moss text-xs font-mono uppercase tracking-widest opacity-60 dark:opacity-40 transition-colors">
            <p>Bioboon System v2.0 // Organic Intelligence Network</p>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
