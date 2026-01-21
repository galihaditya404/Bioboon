export default function Analytics() {
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-6 text-center animate-pulse-slow">
            <div className="w-24 h-24 rounded-full border border-bio-500/30 flex items-center justify-center relative">
                <div className="absolute inset-0 border-t border-bio-400 animate-spin-slow rounded-full" />
                <span className="font-mono text-4xl text-bio-glow opacity-50">DATA</span>
            </div>
            <div>
                <h2 className="font-serif text-3xl italic text-white">Data Stream Offline</h2>
                <p className="font-mono text-xs text-bio-400 mt-2 tracking-widest uppercase">Initializing Historical modules...</p>
            </div>
        </div>
    );
}
