import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-void text-pale font-sans selection:bg-bio-glow selection:text-void relative overflow-x-hidden">
        {/* Global Noise Overlay */}
        <div className="noise-overlay" />

        {/* Ambient Organic Glows */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-bio-500/5 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-moss/20 rounded-full blur-[150px]" />
        </div>

        <Navbar />

        <main className="relative z-10 pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>

        <footer className="relative z-10 py-6 text-center text-moss text-xs font-mono uppercase tracking-widest opacity-40">
          <p>Bioboon System v2.0 // Organic Intelligence Network</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
