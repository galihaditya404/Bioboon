import { useEffect, useState } from 'react';
import { fetchBioData } from '../api/thingspeak';
import BioMap from '../components/map/BioMap';
import { Card } from '../components/ui/Card';
import { Wind, Flame, ThermometerSun, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn, formatNumber } from '../utils/cn';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('normal');

    const getData = async () => {
        const result = await fetchBioData();
        if (result) {
            setData(result);
            checkStatus(result);
        }
        setLoading(false);
    };

    useEffect(() => {
        getData();
        const interval = setInterval(getData, 15000);
        return () => clearInterval(interval);
    }, []);

    const checkStatus = (d) => {
        const methane = parseFloat(d.field1);
        const co2 = parseFloat(d.field2);
        if (co2 > 1000) setStatus('warning');
        else if (methane >= 50000 && methane <= 150000) setStatus('optimal');
        else setStatus('normal');
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">

            {/* Cinematic Header */}
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-5xl md:text-7xl font-serif italic text-white mb-3 tracking-tighter opacity-90">System Overview</h1>
                    <div className="flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-bio-400/50"></span>
                        <p className="font-mono text-[10px] text-bio-400 tracking-[0.3em] uppercase opacity-60">
                            Sector 01 // Live Telemetry
                        </p>
                    </div>
                </div>
                <div className="mt-6 md:mt-0 flex items-center gap-4 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
                    <div className={cn(
                        "w-1.5 h-1.5 rounded-full animate-pulse",
                        status === 'optimal' ? "bg-bio-400 shadow-[0_0_10px_#4ade80]" :
                            status === 'warning' ? "bg-alert shadow-[0_0_10px_#ff4d4d]" : "bg-white/50"
                    )} />
                    <span className="font-mono text-xs text-pale">
                        STATUS: {status === 'optimal' ? 'OPTIMAL_FLOW' : status === 'warning' ? 'CRITICAL_ALERT' : 'STANDBY'}
                    </span>
                </div>
            </div>

            {/* Main Grid: Asymmetric Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">

                {/* Map occupies large portion (Cinematic) */}
                <div className="lg:col-span-8 order-2 lg:order-1 h-[400px] lg:h-auto rounded-2xl overflow-hidden border border-white/5 shadow-2xl relative">
                    <BioMap liveData={data} />
                </div>

                {/* Side metrics */}
                <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col gap-4">
                    {/* Status Card */}
                    <Card className="flex-1 min-h-[140px] flex flex-col justify-center items-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20" />
                        {status === 'optimal' ? (
                            <CheckCircle2 className="w-12 h-12 text-bio-400 mb-2 animate-bounce" />
                        ) : status === 'warning' ? (
                            <AlertTriangle className="w-12 h-12 text-alert mb-2 animate-pulse" />
                        ) : (
                            <div className="w-12 h-12 border-2 border-dashed border-white/20 rounded-full animate-spin-slow mb-2" />
                        )}
                        <h2 className="font-serif text-2xl italic text-white z-10">
                            {status === 'optimal' ? 'Distribution Stable' : status === 'warning' ? 'Warning Detected' : 'Analyzing Input'}
                        </h2>
                    </Card>

                    {/* Methane Metric */}
                    <Card className="flex-1 min-h-[180px] flex flex-col justify-between group hover:bg-moss/40 transition-colors">
                        <div className="flex justify-between items-start">
                            <span className="font-mono text-xs text-bio-400 uppercase tracking-widest">Methane (CH4)</span>
                            <Flame className="w-5 h-5 text-bio-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-mono text-white tracking-tighter">
                                {data ? formatNumber(data.field1) : '---'}
                            </span>
                            <span className="text-sm font-serif italic text-white/50">ppm</span>
                        </div>
                        {/* Visual Bar */}
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                            <div
                                className="h-full bg-bio-400 transition-all duration-1000 ease-out"
                                style={{ width: `${data ? Math.min(parseInt(data.field1) / 2000, 100) : 0}%` }}
                            />
                        </div>
                    </Card>

                    {/* CO2 Metric */}
                    <Card className="flex-1 min-h-[180px] flex flex-col justify-between group hover:bg-moss/40 transition-colors">
                        <div className="flex justify-between items-start">
                            <span className="font-mono text-xs text-alert/80 uppercase tracking-widest">Carbon (CO2)</span>
                            <Wind className="w-5 h-5 text-alert opacity-50 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-mono text-white tracking-tighter">
                                {data ? formatNumber(data.field2) : '---'}
                            </span>
                            <span className="text-sm font-serif italic text-white/50">ppm</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                            <div
                                className="h-full bg-alert transition-all duration-1000 ease-out"
                                style={{ width: `${data ? Math.min(parseInt(data.field2) / 50, 100) : 0}%` }}
                            />
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    );
}
