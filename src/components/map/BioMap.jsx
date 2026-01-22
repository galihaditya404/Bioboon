import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../utils/ThemeContext';

// We no longer need the default icon image fix, as we are using DivIcon
// but keeping imports just in case of fallback, though we won't use them for the main markers.

const createTechIcon = (theme) => {
    return L.divIcon({
        className: theme === 'dark' ? 'custom-marker' : 'custom-marker light-marker',
        html: `<div class="marker-pin"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10], // Center it
        popupAnchor: [0, -15]
    });
};

const HOUSES = [
    { id: 1, name: "Unit_01", coords: [-7.085525, 110.450117] },
    { id: 2, name: "Unit_02", coords: [-7.085453, 110.449984] },
    { id: 3, name: "Unit_03", coords: [-7.085546, 110.449848] },
    { id: 4, name: "Unit_04", coords: [-7.085588, 110.449680] },
    { id: 5, name: "Unit_05", coords: [-7.085289, 110.449601] }
];

export default function BioMap({ liveData }) {
    const mapRef = useRef(null);
    const { theme } = useTheme();
    const center = [-7.085525, 110.450117];

    return (
        <div className="h-full w-full relative group overflow-hidden">
            {/* Tech Overlays - Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none z-[300] opacity-10 dark:opacity-20"
                style={{
                    backgroundImage: `linear-gradient(${theme === 'dark' ? '#4ade80' : '#15803d'} 1px, transparent 1px), linear-gradient(90deg, ${theme === 'dark' ? '#4ade80' : '#15803d'} 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Radar Scan Effect */}
            <div className="absolute inset-[-50%] w-[200%] h-[200%] pointer-events-none z-[300] opacity-10 dark:opacity-10 animate-[radar-spin_10s_linear_infinite]"
                style={{
                    background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 300deg, ${theme === 'dark' ? '#4ade80' : '#15803d'} 360deg)`
                }}
            />

            {/* Info Overlay */}
            <div className="absolute top-4 left-4 z-[400] text-[10px] font-mono text-day-text dark:text-bio-400 opacity-60 pointer-events-none transition-colors">
                COORD: {center.join(', ')} <br />
                MODE: {theme === 'dark' ? 'SATELLITE_LINK' : 'STANDARD_VIEW'}
            </div>

            <MapContainer
                center={center}
                zoom={18}
                scrollWheelZoom={false}
                className="h-full w-full bg-day-bg dark:bg-void z-0 transition-colors"
                ref={mapRef}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url={theme === 'dark'
                        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    }
                />

                {HOUSES.map((house) => (
                    <Marker
                        key={house.id}
                        position={house.coords}
                        icon={createTechIcon(theme)}
                    >
                        <Popup className="tech-popup">
                            <div className="font-mono text-xs">
                                <strong className="block mb-1 text-void text-sm">{house.name}</strong>
                                <div className="space-y-1">
                                    <div className="flex justify-between gap-4">
                                        <span>CH4:</span>
                                        <span className={cn("font-bold", liveData ? "text-emerald-600" : "text-gray-400")}>
                                            {liveData ? parseFloat(liveData.field1).toFixed(2) : '---'} ppm
                                        </span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span>CO2:</span>
                                        <span className={cn("font-bold", liveData ? "text-amber-600" : "text-gray-400")}>
                                            {liveData ? parseFloat(liveData.field2).toFixed(2) : '---'} ppm
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,#f0fdf4_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_30%,#050907_100%)] z-[400] transition-colors duration-500" />

            {/* Decorative corners */}
            <div className="absolute bottom-6 right-6 z-[400] flex gap-1.5 opacity-60">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`w-[2px] h-4 bg-day-text dark:bg-bio-500/40 ${i === 3 ? 'animate-pulse' : ''} transition-colors`} />
                ))}
            </div>
        </div>
    );
}
