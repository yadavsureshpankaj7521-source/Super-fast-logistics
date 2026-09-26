import React, { useState } from "react";
import { Phone, Search, Zap, ShieldCheck, Sparkles, ArrowRight, ExternalLink } from "lucide-react";

interface HomeScreenLauncherProps {
  onOpenApp: (app: "customer" | "partner") => void;
  activeOrdersCount: number;
  partnerPendingOrdersCount: number;
}

export const HomeScreenLauncher: React.FC<HomeScreenLauncherProps> = ({
  onOpenApp,
  activeOrdersCount,
  partnerPendingOrdersCount
}) => {
  const [selectedAppModal, setSelectedAppModal] = useState<"customer" | "partner" | null>(null);

  return (
    <div className="relative w-full h-full min-h-[100dvh] md:min-h-0 md:h-[760px] md:rounded-[44px] overflow-hidden md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] md:border-[6px] md:border-slate-800/90 bg-slate-950 select-none flex flex-col justify-between p-6">
      {/* Ultra-realistic Wallpaper (Watchtower, Dramatic Sky & Lush Trees from video) */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            background: "linear-gradient(180deg, #172554 0%, #1e40af 20%, #38bdf8 52%, #1e3a5f 70%, #064e3b 85%, #022c22 100%)"
          }}
        />
        {/* Soft volumetric light & cloud overlay */}
        <div className="absolute inset-0 bg-radial-[at_50%_25%] from-sky-200/30 via-transparent to-black/60 pointer-events-none" />

        {/* Watchtower Silhouette from user's video */}
        <svg className="absolute bottom-20 left-1/2 -translate-x-1/2 w-88 h-[420px] opacity-75 pointer-events-none" viewBox="0 0 200 320" fill="none">
          {/* Main 4 Tower Pillars */}
          <line x1="38" y1="310" x2="82" y2="70" stroke="#041610" strokeWidth="4.5" />
          <line x1="162" y1="310" x2="118" y2="70" stroke="#041610" strokeWidth="4.5" />
          
          {/* Cross Girders & Safety Decks */}
          <line x1="48" y1="250" x2="152" y2="250" stroke="#041610" strokeWidth="3" />
          <line x1="56" y1="190" x2="144" y2="190" stroke="#041610" strokeWidth="3" />
          <line x1="68" y1="130" x2="132" y2="130" stroke="#041610" strokeWidth="3" />

          {/* Diagonal Trusses */}
          <line x1="48" y1="250" x2="144" y2="190" stroke="#064e3b" strokeWidth="2" opacity="0.9" />
          <line x1="152" y1="250" x2="56" y2="190" stroke="#064e3b" strokeWidth="2" opacity="0.9" />
          <line x1="56" y1="190" x2="132" y2="130" stroke="#064e3b" strokeWidth="2" opacity="0.9" />
          <line x1="144" y1="190" x2="68" y2="130" stroke="#064e3b" strokeWidth="2" opacity="0.9" />

          {/* Observation Cabin & Slanted Roof */}
          <rect x="74" y="65" width="52" height="38" rx="4" fill="#041610" />
          <rect x="80" y="72" width="12" height="12" rx="1.5" fill="#34d399" opacity="0.4" />
          <rect x="108" y="72" width="12" height="12" rx="1.5" fill="#34d399" opacity="0.4" />
          <polygon points="62,65 138,65 100,32" fill="#020d0a" />

          {/* Foreground Forest Silhouette */}
          <path d="M-20 320 Q20 230 50 320 T110 320 T170 320 T230 320" fill="#022c22" opacity="0.95" />
          <path d="M10 320 Q60 210 110 320 T210 320" fill="#041610" opacity="0.85" />
        </svg>
      </div>

      {/* Dynamic Island / Top Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-white text-xs font-semibold px-2">
        <span className="font-bold tracking-tight">1:52</span>
        <div className="w-24 h-5 bg-black/70 backdrop-blur-xl rounded-full flex items-center justify-center space-x-1.5 px-2.5 border border-white/10 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-white font-medium">Maharashtra</span>
        </div>
        <div className="flex items-center space-x-1.5 text-[11px]">
          <span className="text-[9px] font-black bg-white/20 px-1 py-0.2 rounded">5G</span>
          <span className="tracking-tighter font-semibold">VoLTE</span>
          <span className="font-bold">100%</span>
        </div>
      </div>

      {/* 2 Apps Grid matching user's phone video */}
      <div className="relative z-10 mt-6 grid grid-cols-4 gap-4 px-2">
        {/* App 1: Super Fast (Customer Booking) */}
        <button
          onClick={() => onOpenApp("customer")}
          className="group flex flex-col items-center focus:outline-none transition-transform active:scale-90 text-center"
        >
          <div className="relative w-16 h-16 rounded-[22px] bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 shadow-[0_10px_25px_-5px_rgba(37,99,235,0.6)] border-2 border-white/30 flex flex-col items-center justify-center p-1.5 transition-all group-hover:scale-105 group-hover:shadow-blue-500/80">
            {/* Top Shine */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-[20px] pointer-events-none" />
            
            <div className="flex flex-col items-center leading-none">
              <span className="text-[12px] font-black tracking-tight text-white font-sans drop-shadow-sm">SUPER</span>
              <span className="text-[13px] font-black text-amber-300 drop-shadow-sm">FAST</span>
            </div>
            <div className="mt-1 bg-black/40 backdrop-blur-xs px-1.5 py-0.2 rounded-full text-[7.5px] font-black text-emerald-300 border border-emerald-400/40">
              -₹200
            </div>

            {/* Active notification badge */}
            {activeOrdersCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                {activeOrdersCount}
              </span>
            )}
          </div>
          <span className="mt-1.5 text-xs text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-tight">
            Super Fast
          </span>
        </button>

        {/* App 2: Super Fast Partner (Driver & Fleet App) */}
        <button
          onClick={() => onOpenApp("partner")}
          className="group flex flex-col items-center focus:outline-none transition-transform active:scale-90 text-center"
        >
          <div className="relative w-16 h-16 rounded-[22px] bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900 shadow-[0_10px_25px_-5px_rgba(67,56,202,0.6)] border-2 border-amber-300/40 flex flex-col items-center justify-center p-1.5 transition-all group-hover:scale-105 group-hover:shadow-indigo-500/80">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-t-[20px] pointer-events-none" />

            {/* Cap & Driver Avatar glyph */}
            <div className="w-7 h-7 rounded-full bg-blue-500/90 flex items-center justify-center border border-white/40 shadow-inner">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <path d="M12 2C8 2 5 4 4 6L20 6C19 4 16 2 12 2Z" fill="#FBBF24" />
                <circle cx="12" cy="11" r="4" fill="#FFFFFF" />
                <path d="M6 20C6 16.7 8.7 14 12 14C15.3 14 18 16.7 18 20Z" fill="#93C5FD" />
              </svg>
            </div>
            <span className="text-[8px] font-black text-amber-300 tracking-wider mt-0.5 drop-shadow-sm">PARTNER</span>

            {partnerPendingOrdersCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                {partnerPendingOrdersCount}
              </span>
            )}
          </div>
          <span className="mt-1.5 text-xs text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-tight truncate max-w-[70px]">
            SF Partner
          </span>
        </button>
      </div>

      {/* Premium Maharashtra Logistics Guarantee Card */}
      <div className="relative z-10 bg-black/45 backdrop-blur-xl rounded-3xl p-4.5 border border-white/15 text-white shadow-2xl mx-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs border border-amber-400/30">
              ⚡
            </div>
            <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
              2 APPS IN 1 ECOSYSTEM
            </span>
          </div>
          <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded-full">
            ₹200 SASTA
          </span>
        </div>

        <h3 className="text-sm font-black text-white leading-tight">
          Super Fast & Super Fast Partner
        </h3>
        <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
          ऊपर दिए गए दोनों ऐप में से जिसे चाहें खोलें: कस्टमर के लिए बुकिंग ऐप और ड्राइवर के लिए पार्टनर ऐप। दोनों आपस में लाइव जुड़े हैं!
        </p>

        {/* Quick Launch Buttons */}
        <div className="mt-3.5 grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs font-bold">
          <button
            onClick={() => onOpenApp("customer")}
            className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white flex items-center justify-center space-x-1.5 shadow-md active:scale-95 transition"
          >
            <span>Open Customer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onOpenApp("partner")}
            className="py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-amber-300 border border-amber-400/30 flex items-center justify-center space-x-1.5 shadow-md active:scale-95 transition"
          >
            <span>Open Partner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Search & Glassmorphic Phone Dock */}
      <div className="relative z-10 flex flex-col space-y-4 items-center">
        {/* Search Pill */}
        <div className="w-52 bg-black/40 backdrop-blur-xl rounded-full py-2 px-4 flex items-center justify-center space-x-2 border border-white/20 text-white/90 text-xs shadow-lg">
          <Search className="w-3.5 h-3.5 text-sky-300" />
          <span className="font-medium text-slate-200">Search Maharashtra</span>
        </div>

        {/* Dock with Call & App Shortcuts */}
        <div className="w-full bg-white/25 backdrop-blur-2xl rounded-3xl p-3 flex items-center justify-around border border-white/30 shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
          <button
            onClick={() => onOpenApp("customer")}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-md flex items-center justify-center text-white active:scale-90 transition font-black text-xs"
            title="Super Fast Customer"
          >
            SF
          </button>

          <button
            onClick={() => onOpenApp("customer")}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-green-600 shadow-xl flex items-center justify-center text-white active:scale-95 transition-transform border border-white/40"
            title="Fast Call / Booking"
          >
            <Phone className="w-6 h-6" />
          </button>

          <button
            onClick={() => onOpenApp("partner")}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-700 to-slate-900 shadow-md flex items-center justify-center text-amber-300 active:scale-90 transition font-black text-xs border border-amber-400/30"
            title="Super Fast Partner"
          >
            SFP
          </button>
        </div>
      </div>
    </div>
  );
};
