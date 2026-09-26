import React, { useState, useEffect } from "react";
import { Phone, PhoneOff, Mic, MicOff, Volume2, ShieldCheck, User } from "lucide-react";

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  calleeName: string;
  calleeRole: "Driver" | "Customer" | "Support";
  calleePhone: string;
  vehicleNumber?: string;
}

export const CallModal: React.FC<CallModalProps> = ({
  isOpen,
  onClose,
  calleeName,
  calleeRole,
  calleePhone,
  vehicleNumber
}) => {
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState<"Ringing..." | "Connected (HD Voice)">("Ringing...");
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setCallDuration(0);
      setCallStatus("Ringing...");
      return;
    }

    const connectTimeout = setTimeout(() => {
      setCallStatus("Connected (HD Voice)");
    }, 1800);

    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(connectTimeout);
      clearInterval(interval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${rem.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white rounded-3xl p-6 border border-slate-700/80 shadow-2xl flex flex-col items-center justify-between min-h-[460px] relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Background ambient glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex flex-col items-center text-center space-y-1 z-10">
          <div className="flex items-center space-x-1.5 text-xs text-blue-400 font-semibold bg-blue-950/70 border border-blue-800/60 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Super Fast Free In-App Call</span>
          </div>
          <span className="text-[11px] text-slate-400">Maharashtra Secure Line</span>
        </div>

        {/* Avatar & Callee Details */}
        <div className="flex flex-col items-center space-y-3 z-10 my-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-3xl font-black text-white shadow-2xl border-4 border-slate-800">
              {calleeName.charAt(0) || <User className="w-12 h-12" />}
            </div>
            {callStatus === "Connected (HD Voice)" && (
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              </span>
            )}
          </div>

          <div className="text-center">
            <h3 className="text-xl font-extrabold text-white tracking-tight">{calleeName}</h3>
            <p className="text-xs text-amber-300 font-bold mt-0.5">
              {calleeRole === "Driver" ? "🚗 Super Fast Verified Partner" : "📦 Verified Customer"}
            </p>
            {vehicleNumber && (
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">{vehicleNumber}</p>
            )}
            <p className="text-xs text-slate-400 mt-1 font-mono">{calleePhone}</p>
          </div>

          <div className="text-center mt-2">
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full">
              {callStatus === "Ringing..." ? "Connecting to Ambernath/Kalyan..." : formatTime(callDuration)}
            </span>
          </div>
        </div>

        {/* Call Controls */}
        <div className="w-full space-y-5 z-10">
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                isMuted ? "bg-amber-400 text-slate-950" : "bg-slate-800 text-slate-300 hover:text-white"
              }`}
              title="Mute"
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsSpeaker(!isSpeaker)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                isSpeaker ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:text-white"
              }`}
              title="Speaker"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* End Call Button */}
          <button
            onClick={onClose}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-extrabold py-3.5 rounded-2xl flex items-center justify-center space-x-2 shadow-lg shadow-red-900/40 transition active:scale-95"
          >
            <PhoneOff className="w-5 h-5" />
            <span className="text-sm">End Call (कॉल काटें)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
