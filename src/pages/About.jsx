import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Mail, Phone, MapPin, Hash, QrCode } from 'lucide-react';

const TEAM = [
    {
        name: "Dr. Noer Abyor Handayani",
        role: "Lead Supervisor",
        dept: "Chemical Engineering",
        id: "SUP-001",
        img: "/personImg/dosbing.png"
    },
    {
        name: "Refah Hakam Muhammad",
        role: "Process Engineer",
        dept: "Chemical Engineering",
        id: "ENG-042",
        img: "/personImg/Refah Hakam Muhammad.png"
    },
    {
        name: "St. Nur Rifqah Aliyah",
        role: "Process Engineer",
        dept: "Chemical Engineering",
        id: "ENG-043",
        img: "/personImg/St. Nur Rifqah Aliyah.png"
    },
    {
        name: "Alan Tajri Akbar",
        role: "Geospatial Specialist",
        dept: "Geodesy Engineering",
        id: "GEO-088",
        img: "/personImg/Alan Tajri Akbar.png"
    },
    {
        name: "Aufa Fadhil Islami",
        role: "Geospatial Specialist",
        dept: "Geodesy Engineering",
        id: "GEO-089",
        img: "/personImg/Aufa Fadhil Islami.png"
    },
    {
        name: "Galih Aditya Fernanda",
        role: "Systems Architect",
        dept: "Computer Engineering",
        id: "SYS-101",
        img: "/personImg/Galih Aditya Fernanda.png"
    },
];

export default function About() {
    // The specific text requested by the user
    const toRotate = ["Pemanfaatan Kotoran Ternak sebagai Biogas dan Bio-slurry Menggunakan Katalis EM4 Berbasis IOT di Jabungan Semarang Guna Mencapai Kemandirian Energi"];
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [delta, setDelta] = useState(100 - Math.random() * 50); // Faster start
    const period = 2000; // Time to wait before deleting

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => clearInterval(ticker);
    }, [text, delta]);

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        } else {
            // Random typing speed variation - Faster (30ms - 80ms)
            setDelta(80 - Math.random() * 50);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-20 pt-8">

            <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6 mb-8">
                <div className="w-full">
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-tight">Bioboon Teams</h1>
                    <div className="font-mono text-xs md:text-sm text-bio-400 tracking-wide uppercase opacity-90 min-h-[4em] leading-relaxed">
                        <span className="border-r-2 border-bio-400 pr-1">
                            {text}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEAM.map((member) => (
                    <div key={member.name} className="group relative">
                        {/* Tech Card */}
                        <Card noPadding className="h-full flex flex-col p-0 overflow-hidden border border-white/5 hover:border-bio-400/30 transition-colors bg-void/50">
                            {/* ID Header */}
                            <div className="bg-moss/20 p-3 flex justify-between items-center border-b border-white/5">
                                <span className="font-mono text-[10px] text-bio-400 tracking-widest">ID: {member.id}</span>
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-bio-500 animate-pulse"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 md:p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center h-full">
                                {/* Photo - Significantly Larger */}
                                <div className="w-full sm:w-32 h-48 sm:h-40 shrink-0 rounded bg-moss/20 border border-white/10 overflow-hidden relative shadow-lg">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                                    />
                                    {/* Overlay scanline effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bio-500/10 opacity-50"></div>
                                </div>

                                {/* Info */}
                                <div className="flex flex-col min-w-0 w-full">
                                    <h3 className="font-sans font-bold text-white text-base md:text-lg leading-snug mb-1 group-hover:text-bio-glow transition-colors">
                                        {member.name}
                                    </h3>
                                    <p className="font-mono text-xs text-bio-400 mb-0.5">{member.role}</p>
                                    <p className="text-[10px] text-pale/50 uppercase tracking-wide">{member.dept}</p>

                                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
                                        <QrCode className="w-4 h-4 text-white/20" />
                                        <span className="text-[9px] text-white/20 font-mono">VERIFIED_PERSONNEL</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

            <div className="mt-12 p-6 rounded-lg border border-white/5 bg-moss/10 flex flex-col items-center text-center">
                <p className="font-mono text-xs text-bio-400 tracking-widest mb-2">PROJECT HEADQUARTERS</p>
                <h2 className="font-serif text-2xl text-white italic">Jabungan, Semarang, Indonesia</h2>
                <div className="mt-4 flex gap-4 text-xs text-pale/60 font-mono">
                    <span>LAT: -7.0855</span>
                    <span>LONG: 110.4501</span>
                </div>
            </div>

        </div>
    );
}
