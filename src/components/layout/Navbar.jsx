import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { cn } from "../../utils/cn";
import { useTheme } from "../../utils/ThemeContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
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
        { name: "Live_Monitor", path: "/" },
        { name: "Data_Stream", path: "/analytics" },
        { name: "Unit_Personnel", path: "/about" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 transition-all duration-500 rounded-full border box-border",
                scrolled || isOpen
                    ? "bg-day-surface/80 dark:bg-void/80 backdrop-blur-md border-day-border dark:border-white/10 shadow-2xl py-3 px-6"
                    : "bg-transparent border-transparent py-4 px-4"
            )}
        >
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-day-bg dark:bg-moss/50 border border-day-border dark:border-white/10 group-hover:border-bio-glow/50 transition-colors">
                        <Globe className="h-5 w-5 text-day-text dark:text-bio-400 animate-pulse-slow" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif text-2xl leading-none italic text-day-text dark:text-bio-glow tracking-wide">Bioboon</span>
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-day-text/60 dark:text-bio-400 opacity-60">Program Kreativitas Mahasiswa - Pengabdian Masyarakat</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
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

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-pale hover:text-bio-glow transition-colors p-2"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "block px-4 py-3 rounded-xl text-sm font-mono tracking-wider",
                                location.pathname === link.path
                                    ? "text-void bg-bio-glow"
                                    : "text-pale/70 hover:bg-white/5"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
