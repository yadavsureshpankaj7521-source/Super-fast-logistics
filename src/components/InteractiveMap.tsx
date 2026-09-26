import React from "react";
import { Navigation, MapPin, Truck } from "lucide-react";

interface InteractiveMapProps {
  pickup: string;
  drop: string;
  status: "SEARCHING" | "ACCEPTED" | "ARRIVED" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED";
  vehicleType?: string;
  driverName?: string;
  vehicleNumber?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  pickup,
  drop,
  status,
  vehicleNumber = "MH 05 BJ 4821"
}) => {
  // Calculate simulated position along the route
  let progressPercent = 15;
  if (status === "ACCEPTED") progressPercent = 25;
  if (status === "ARRIVED") progressPercent = 35;
  if (status === "IN_TRANSIT") progressPercent = 70;
  if (status === "COMPLETED") progressPercent = 100;

  return (
    <div className="relative w-full h-56 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
      {/* Map Graphic Canvas Simulation */}
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#E2E8F0" strokeWidth="1" />
          </pattern>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Map grid background */}
        <rect width="100%" height="100%" fill="#F8FAFC" />
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Realistic road networks */}
        <path d="M -10 140 Q 80 130 180 110 T 360 90 T 500 130" fill="none" stroke="#CBD5E1" strokeWidth="10" strokeLinecap="round" />
        <path d="M 120 -10 Q 150 90 220 160 T 300 240" fill="none" stroke="#E2E8F0" strokeWidth="8" />
        <path d="M 30 40 L 400 190" fill="none" stroke="#E2E8F0" strokeWidth="6" />

        {/* Highlighted Live Route Path */}
        <path
          d="M 50 140 C 120 70, 240 180, 360 80"
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="6 4"
        />

        {/* Pickup Pin */}
        <circle cx="50" cy="140" r="14" fill="#2563EB" fillOpacity="0.2" />
        <circle cx="50" cy="140" r="7" fill="#2563EB" />
        <circle cx="50" cy="140" r="3" fill="#FFFFFF" />

        {/* Drop Pin */}
        <circle cx="360" cy="80" r="16" fill="#059669" fillOpacity="0.2" />
        <circle cx="360" cy="80" r="8" fill="#059669" />
        <circle cx="360" cy="80" r="3" fill="#FFFFFF" />
      </svg>

      {/* Floating Pickup Badge */}
      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-sm border border-slate-200 flex items-center space-x-1.5 text-xs max-w-[45%] truncate">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 flex-shrink-0" />
        <span className="font-semibold text-slate-800 truncate">{pickup.split(",")[0] || "Pickup"}</span>
      </div>

      {/* Floating Drop Badge */}
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-sm border border-slate-200 flex items-center space-x-1.5 text-xs max-w-[45%] truncate">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 flex-shrink-0" />
        <span className="font-semibold text-slate-800 truncate">{drop.split(",")[0] || "Drop"}</span>
      </div>

      {/* Moving Vehicle Marker */}
      <div
        className="absolute transition-all duration-1000 ease-out transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          left: `${Math.min(progressPercent, 92)}%`,
          top: `${140 - (progressPercent / 100) * 60 + Math.sin(progressPercent * 0.1) * 15}px`
        }}
      >
        <div className="relative">
          <div className="absolute -inset-2 bg-blue-500/30 rounded-full animate-ping" />
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
            <Truck className="w-5 h-5 animate-car" />
          </div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow font-medium">
            {vehicleNumber}
          </div>
        </div>
      </div>

      {/* Map status overlay footer */}
      <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-700">
            {status === "SEARCHING" && "Assigning nearest Maharashtra Super Fast driver..."}
            {status === "ACCEPTED" && "Driver accepted! Heading to pickup"}
            {status === "ARRIVED" && "Driver arrived at Deepak Nagar, Ambernath"}
            {status === "IN_TRANSIT" && "On route via Kalyan-Shilphata Road"}
            {status === "COMPLETED" && "Successfully delivered at destination!"}
          </span>
        </div>
        <div className="flex items-center text-blue-600 font-bold space-x-1">
          <Navigation className="w-3.5 h-3.5" />
          <span>Live GPS</span>
        </div>
      </div>
    </div>
  );
};
