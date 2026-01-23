import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Globe, Sun, Moon, Home, Users, Activity } from "lucide-react";
import { cn } from "../../utils/cn";
import { useTheme } from "../../utils/ThemeContext";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Live_Monitor", path: "/", icon: <Home className="w-5 h-5" /> },
        { name: "Unit_Personnel", path: "/about", icon: <Users className="w-5 h-5" /> },
    ];

    return (
        <>
            {/* --- DESKTOP NAVBAR (Top) --- */}
            <nav
                className={cn(
                    "hidden md:block fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 transition-all duration-500 rounded-full border box-border overflow-hidden",
                    scrolled
                        ? "bg-day-surface/80 dark:bg-void/80 backdrop-blur-md border-day-border dark:border-white/10 shadow-2xl py-3 px-6"
                        : "bg-transparent border-transparent py-4 px-4"
                )}
            >
                {/* Cybernetic Border Effect */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-bio-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-between relative z-10">
                    {/* Logo - Restored Image */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-day-bg dark:bg-moss/50 border border-day-border dark:border-white/10 group-hover:border-bio-glow/50 transition-colors overflow-hidden p-1">
                            <img src="/assets/bioboon-img.png" alt="Bioboon Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-serif text-2xl leading-none italic text-day-text dark:text-bio-glow tracking-wide">Bioboon</span>
                            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-day-text/60 dark:text-bio-400 opacity-60">Organic Network</span>
                        </div>
                    </Link>

                    {/* Desktop Nav Items */}
                    <div className="flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={cn(
                                    "px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 relative overflow-hidden group",
                                    location.pathname === link.path
                                        ? "text-day-bg bg-day-text dark:text-void dark:bg-bio-glow font-bold"
                                        : "text-day-text/70 dark:text-pale/70 hover:text-day-text hover:bg-day-surface dark:hover:text-bio-glow dark:hover:bg-white/5"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="ml-2 p-2 rounded-full text-day-text dark:text-bio-glow hover:bg-day-surface dark:hover:bg-white/10 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- MOBILE NAVBAR (Top - Branding Only) --- */}
            <div className="md:hidden fixed top-0 w-full z-40 p-4 flex justify-center pointer-events-none">
                <div className="px-4 py-2 bg-day-surface/80 dark:bg-void/80 backdrop-blur-md border border-day-border dark:border-white/10 rounded-full shadow-lg pointer-events-auto">
                    <Link to="/" className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-day-text dark:text-bio-400" />
                        <span className="font-serif text-lg italic text-day-text dark:text-bio-glow">Bioboon</span>
                    </Link>
                </div>
            </div>

            {/* --- MOBILE BOTTOM DOCK (Navigation) --- */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
                <div className="bg-day-surface/90 dark:bg-black/80 backdrop-blur-xl border border-day-border dark:border-white/10 rounded-2xl shadow-2xl p-2 flex justify-around items-center">

                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={cn(
                                "flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-300",
                                location.pathname === link.path
                                    ? "bg-day-text text-day-bg dark:bg-bio-glow dark:text-void shadow-[0_0_15px_rgba(74,222,128,0.3)] translate-y-[-5px]"
                                    : "text-day-text/50 dark:text-white/40 hover:text-day-text dark:hover:text-white"
                            )}
                        >
                            {link.icon}
                            <span className="text-[9px] font-mono mt-1 opacity-80 decoration-none">{link.name === "Live_Monitor" ? "LIVE" : "TEA"}</span>
                        </Link>
                    ))}

                    <div className="w-[1px] h-8 bg-day-text/10 dark:bg-white/10 mx-2" />

                    <button
                        onClick={toggleTheme}
                        className="flex flex-col items-center justify-center w-14 h-14 rounded-xl text-day-text/50 dark:text-white/40 hover:bg-day-bg/50 dark:hover:bg-white/5 transition-colors"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        {/* <span className="text-[9px] font-mono mt-1">THEME</span> */}
                    </button>
                </div>
            </div>
        </>
    );
}
