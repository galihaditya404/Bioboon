import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

// Standard icon fix (we will style it with CSS filters or replace it later)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    className: 'invert opacity-80 hue-rotate-180' // CSS Filter to make standard marker look "tech"
});

L.Marker.prototype.options.icon = DefaultIcon;

const HOUSES = [
    { id: 1, name: "Unit_01", coords: [-7.085525, 110.450117] },
    { id: 2, name: "Unit_02", coords: [-7.085453, 110.449984] },
    { id: 3, name: "Unit_03", coords: [-7.085546, 110.449848] },
    { id: 4, name: "Unit_04", coords: [-7.085588, 110.449680] },
    { id: 5, name: "Unit_05", coords: [-7.085289, 110.449601] }
];

export default function BioMap({ liveData }) {
    const mapRef = useRef(null);
    const center = [-7.085525, 110.450117];

    return (
        <div className="h-full w-full relative group">
            {/* Tech Overlays */}
            <div className="absolute top-4 left-4 z-[400] text-[10px] font-mono text-bio-400 opacity-60 pointer-events-none">
                COORD: {center.join(', ')} <br />
                MODE: SATELLITE_LINK
            </div>

            <MapContainer
                center={center}
                zoom={18}
                scrollWheelZoom={false}
                className="h-full w-full bg-void z-0"
                ref={mapRef}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {HOUSES.map((house) => (
                    <Marker key={house.id} position={house.coords}>
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

            {/* Vignette Overlay - Smoother Gradient */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,#050907_100%)] z-[400]" />

            {/* Decorative corners - Thinner, more elegant */}
            <div className="absolute bottom-6 right-6 z-[400] flex gap-1.5 opacity-60">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`w-[2px] h-4 bg-bio-500/40 ${i === 3 ? 'animate-pulse' : ''}`} />
                ))}
            </div>
        </div>
    );
}
