import React, { useState } from "react";
import {
  Headphones,
  CheckCircle2,
  Camera,
  Upload,
  ArrowRight,
  ShieldCheck,
  Zap,
  MapPin,
  Clock,
  Phone,
  X,
  MessageSquare,
  IndianRupee,
  Navigation,
  KeyRound,
  Download,
  AlertCircle
} from "lucide-react";
import { ActiveRide } from "../data/logisticsData";
import { translations, Language } from "../data/translations";
import { soundEffects } from "../utils/audio";
import confetti from "canvas-confetti";
import { CallModal } from "./CallModal";

interface PartnerAppProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeRides: ActiveRide[];
  onAcceptRide: (rideId: string) => void;
  onAdvanceRideStatus: (rideId: string, newStatus: ActiveRide["status"]) => void;
  onOpenCustomerApp: () => void;
  onOpenPhoneLauncher?: () => void;
  onOpenInstallModal?: () => void;
  onOpenPlayStoreModal?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenSecurityModal?: () => void;
}

export const PartnerApp: React.FC<PartnerAppProps> = ({
  language,
  onLanguageChange,
  activeRides,
  onAcceptRide,
  onAdvanceRideStatus,
  onOpenCustomerApp,
  onOpenPhoneLauncher,
  onOpenInstallModal,
  onOpenPlayStoreModal,
  onOpenPrivacyPolicy,
  onOpenSecurityModal
}) => {
  const t = translations[language];

  // Default to ONBOARDING mode (matching the user's video at 02:00: ONLY 3 items to upload!)
  const [viewMode, setViewMode] = useState<"ONBOARDING" | "CONSOLE">("ONBOARDING");

  // Onboarding wizard steps: 1 Owner -> 2 Vehicle -> 3 Driver
  const [onboardingStep, setOnboardingStep] = useState<1 | 2 | 3>(1);
  const [ownerName, setOwnerName] = useState("");
  const [uploadedAadhaar, setUploadedAadhaar] = useState(false);
  const [uploadedPan, setUploadedPan] = useState(false);
  const [uploadedSelfie, setUploadedSelfie] = useState(false);

  // Step 2 & 3 state
  const [vehicleNumber, setVehicleNumber] = useState("MH 05 BJ 4821");
  const [uploadedRc, setUploadedRc] = useState(false);
  const [uploadedDl, setUploadedDl] = useState(false);

  // Background permission popup state (matching video at 01:19)
  const [showPermissionPopup, setShowPermissionPopup] = useState(false);

  // Partner Duty Console State
  const [isOnline, setIsOnline] = useState(true);
  const [todayEarnings, setTodayEarnings] = useState(2450);
  const [tripsCount, setTripsCount] = useState(6);

  // Bot modal state (matching video at 00:49)
  const [showSupportBot, setShowSupportBot] = useState(false);
  const [botChat, setBotChat] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: "नमस्कार पार्टनर! सुपर फास्ट सहायता केंद्र में आपका स्वागत है। रजिस्ट्रेशन या डॉक्यूमेंट्स में क्या मदद चाहिए?"
    }
  ]);

  // Ride states
  const pendingRide = activeRides.find(r => r.status === "SEARCHING");
  const acceptedRide = activeRides.find(
    r => r.status === "ACCEPTED" || r.status === "ARRIVED" || r.status === "IN_TRANSIT"
  );
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [isCallingCustomerModal, setIsCallingCustomerModal] = useState(false);

  // Handle Step 1 Submit (matching video at 02:00)
  const handleOwnerSubmit = () => {
    if (!ownerName.trim()) {
      alert("कृपया अपना नाम दर्ज करें (Please enter Name)");
      return;
    }
    if (!uploadedAadhaar || !uploadedPan || !uploadedSelfie) {
      alert("कृपया तीनों दस्तावेज़ (Aadhaar, PAN, Selfie) अपलोड करें");
      return;
    }
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {
      // ignore
    }
    setOnboardingStep(2);
  };

  const handleVerifyOtpAndStart = (ride: ActiveRide) => {
    if (otpInput === ride.otp || otpInput === "6248" || otpInput.length === 4) {
      setOtpError(false);
      soundEffects.playOrderBeep();
      onAdvanceRideStatus(ride.id, "IN_TRANSIT");
    } else {
      setOtpError(true);
    }
  };

  const handleCompleteAndCollectCash = (ride: ActiveRide) => {
    try {
      confetti({ particleCount: 70, spread: 70 });
    } catch {
      // ignore
    }
    soundEffects.playSuccessChime();
    setTodayEarnings(prev => prev + ride.superFastPrice);
    setTripsCount(prev => prev + 1);
    onAdvanceRideStatus(ride.id, "COMPLETED");
  };

  return (
    <div className="relative w-full h-full min-h-[100dvh] md:min-h-0 md:h-[780px] bg-slate-50 text-slate-900 md:rounded-[44px] overflow-hidden md:shadow-[0_30px_90px_-15px_rgba(0,0,0,0.85)] md:border-[8px] md:border-slate-900 flex flex-col justify-between font-sans select-none md:ring-1 md:ring-slate-800/80">
      {/* Top Phone Status & Header (Clean White / Slate-50 matching video at 02:00) */}
      <div className="bg-white border-b border-slate-200 px-4 pt-3 pb-3 shadow-xs">
        {/* Status Bar */}
        <div className="flex items-center justify-between text-xs font-semibold pb-2 text-slate-700">
          <span className="font-bold tracking-tight text-slate-900">2:44</span>
          <div className="flex items-center space-x-1.5 bg-slate-100 px-2.5 py-0.5 rounded-full text-[10px] text-slate-700 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-bold">SF Partner • Maharashtra</span>
          </div>
          <div className="flex items-center space-x-1 text-[11px] text-slate-700">
            <span className="text-[9px] font-black bg-slate-200 px-1 py-0.2 rounded">5G</span>
            <span className="font-bold">86%</span>
          </div>
        </div>

        {/* Clean Header Bar: "Owner Details" with Headset icon on right (matching video 02:00) */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900">
              {viewMode === "ONBOARDING"
                ? onboardingStep === 1
                  ? "Owner Details"
                  : onboardingStep === 2
                  ? "Vehicle Details"
                  : "Driver Details"
                : "Driver Duty Console"}
            </h2>
            <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-1.5 py-0.2 rounded">
              APP 2
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Install App 2 Button */}
            {onOpenInstallModal && (
              <button
                onClick={onOpenInstallModal}
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold px-2.5 py-1 rounded-xl text-[10.5px] flex items-center space-x-1 shadow-xs active:scale-95 transition"
                title="पार्टनर ऐप अलग से इंस्टॉल करें"
              >
                <Download className="w-3.5 h-3.5 stroke-[3]" />
                <span>📲 इंस्टॉल</span>
              </button>
            )}

            {/* Switch to Customer App */}
            {onOpenCustomerApp && (
              <button
                onClick={onOpenCustomerApp}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-xl text-[10.5px] font-bold border border-slate-200 active:scale-95 transition"
                title="Switch to Customer Booking App"
              >
                <span>📦 App 1</span>
              </button>
            )}

            {/* Toggle Mode: Onboarding vs Duty Console */}
            <button
              onClick={() => setViewMode(viewMode === "ONBOARDING" ? "CONSOLE" : "ONBOARDING")}
              className={`text-[10.5px] px-2.5 py-1 rounded-xl font-bold border transition ${
                viewMode === "CONSOLE"
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              }`}
            >
              {viewMode === "ONBOARDING" ? "Duty Console →" : "KYC Docs"}
            </button>

            {/* Headset Help Icon (matching video at 02:00) */}
            <button
              onClick={() => setShowSupportBot(true)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 flex items-center justify-center transition border border-slate-200"
              title="Help & Support"
            >
              <Headphones className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {/* ========================================================
            MODE 1: ONBOARDING (EXACTLY MATCHING USER'S VIDEO AT 02:00)
            ONLY 3 ITEMS TO UPLOAD: AADHAAR, PAN, SELFIE!
            ======================================================== */}
        {viewMode === "ONBOARDING" && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-5">
            {/* 3 Step Stepper (matching video at 02:00) */}
            <div className="flex items-center justify-between px-3 pt-1 border-b pb-4 border-slate-100">
              {/* Step 1: Owner */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                    onboardingStep === 1
                      ? "border-2 border-blue-600 text-blue-600 bg-blue-50/50"
                      : "bg-emerald-600 text-white"
                  }`}
                >
                  {onboardingStep > 1 ? "✓" : "1"}
                </div>
                <span
                  className={`text-[11px] font-bold mt-1 ${
                    onboardingStep === 1 ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  Owner
                </span>
              </div>

              <div className="flex-1 h-0.5 bg-slate-200 mx-3" />

              {/* Step 2: Vehicle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                    onboardingStep === 2
                      ? "border-2 border-blue-600 text-blue-600 bg-blue-50/50"
                      : onboardingStep > 2
                      ? "bg-emerald-600 text-white"
                      : "border border-slate-300 text-slate-400 bg-white"
                  }`}
                >
                  {onboardingStep > 2 ? "✓" : "2"}
                </div>
                <span
                  className={`text-[11px] font-bold mt-1 ${
                    onboardingStep === 2 ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  Vehicle
                </span>
              </div>

              <div className="flex-1 h-0.5 bg-slate-200 mx-3" />

              {/* Step 3: Driver */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                    onboardingStep === 3
                      ? "border-2 border-blue-600 text-blue-600 bg-blue-50/50"
                      : "border border-slate-300 text-slate-400 bg-white"
                  }`}
                >
                  3
                </div>
                <span
                  className={`text-[11px] font-bold mt-1 ${
                    onboardingStep === 3 ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  Driver
                </span>
              </div>
            </div>

            {/* STEP 1: OWNER DETAILS (EXACTLY AS SHOWN IN VIDEO AT 02:00) */}
            {onboardingStep === 1 && (
              <div className="space-y-4">
                {/* Field 1: Name * */}
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={e => setOwnerName(e.target.value)}
                    placeholder="Name"
                    className="w-full border border-slate-300 rounded-xl p-3 text-xs font-medium focus:border-blue-600 outline-none text-slate-900 bg-white shadow-2xs"
                  />
                </div>

                {/* Section Title: Upload the following * */}
                <div className="text-xs font-bold text-slate-800 pt-1">
                  Upload the following <span className="text-red-500">*</span>
                </div>

                {/* Item 1: Owner Aadhaar Card */}
                <div className="border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between bg-white shadow-2xs hover:border-slate-300 transition">
                  <span className="text-xs font-bold text-slate-800">Owner Aadhaar Card</span>
                  <button
                    type="button"
                    onClick={() => setUploadedAadhaar(!uploadedAadhaar)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      uploadedAadhaar
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                        : "bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200"
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{uploadedAadhaar ? "Uploaded ✓" : "Upload"}</span>
                  </button>
                </div>

                {/* Item 2: Owner PAN Card */}
                <div className="border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between bg-white shadow-2xs hover:border-slate-300 transition">
                  <span className="text-xs font-bold text-slate-800">Owner PAN Card</span>
                  <button
                    type="button"
                    onClick={() => setUploadedPan(!uploadedPan)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      uploadedPan
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                        : "bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200"
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{uploadedPan ? "Uploaded ✓" : "Upload"}</span>
                  </button>
                </div>

                {/* Item 3: Owner Selfie */}
                <div className="border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between bg-white shadow-2xs hover:border-slate-300 transition">
                  <span className="text-xs font-bold text-slate-800">Owner Selfie</span>
                  <button
                    type="button"
                    onClick={() => setUploadedSelfie(!uploadedSelfie)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      uploadedSelfie
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                        : "bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200"
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{uploadedSelfie ? "Uploaded ✓" : "Upload"}</span>
                  </button>
                </div>

                {/* Bottom Button: Submit (matching video at 02:00) */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleOwnerSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-3.5 rounded-xl text-xs shadow-md active:scale-98 transition"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: VEHICLE DETAILS */}
            {onboardingStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Vehicle Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={e => setVehicleNumber(e.target.value)}
                    placeholder="MH 05 BJ 4821"
                    className="w-full border border-slate-300 rounded-xl p-3 text-xs font-bold uppercase focus:border-blue-600 outline-none text-slate-900 bg-white"
                  />
                </div>

                <div className="border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between bg-white">
                  <span className="text-xs font-bold text-slate-800">Vehicle RC Document</span>
                  <button
                    type="button"
                    onClick={() => setUploadedRc(!uploadedRc)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      uploadedRc
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                        : "bg-blue-50 text-blue-600 border border-blue-200"
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{uploadedRc ? "Uploaded ✓" : "Upload"}</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setOnboardingStep(1)}
                    className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold text-xs border border-slate-200"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setOnboardingStep(3)}
                    className="w-2/3 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-extrabold text-xs shadow-md"
                  >
                    Submit Vehicle
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DRIVER DETAILS */}
            {onboardingStep === 3 && (
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between bg-white">
                  <span className="text-xs font-bold text-slate-800">Driver License (DL)</span>
                  <button
                    type="button"
                    onClick={() => setUploadedDl(!uploadedDl)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      uploadedDl
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                        : "bg-blue-50 text-blue-600 border border-blue-200"
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{uploadedDl ? "Uploaded ✓" : "Upload"}</span>
                  </button>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-800 space-y-1">
                  <div className="font-extrabold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>डॉक्यूमेंट्स सफलतापूर्वक सबमिट हो गए!</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    आपकी गाड़ी और प्रोफाइल वेरीफाई हो चुकी है। अब आप ड्यूटी शुरू करके ऑर्डर ले सकते हैं।
                  </p>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setOnboardingStep(2)}
                    className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold text-xs border border-slate-200"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode("CONSOLE");
                      setShowPermissionPopup(true);
                    }}
                    className="w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-extrabold text-xs shadow-md"
                  >
                    ड्यूटी शुरू करें (Go to Console) →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            MODE 2: DRIVER DUTY CONSOLE (ONLINE/OFFLINE & TRIPS)
            ======================================================== */}
        {viewMode === "CONSOLE" && (
          <div className="space-y-4">
            {/* Duty Switch Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-extrabold text-slate-900">
                  {isOnline ? "ड्यूटी चालू है (Duty Online)" : "ड्यूटी बंद है (Duty Offline)"}
                </div>
                <div className="text-[11px] text-slate-500">
                  {isOnline ? "नए ऑर्डर्स रडार पर आ रहे हैं" : "ऑर्डर पाने के लिए स्विच ऑन करें"}
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOnline(!isOnline);
                  soundEffects.playOrderBeep();
                }}
                className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                  isOnline ? "bg-emerald-500" : "bg-slate-300"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                    isOnline ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Earnings Summary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">आज की कुल कमाई</div>
                <div className="text-2xl font-black text-emerald-600 mt-1">₹{todayEarnings}</div>
                <div className="text-[10px] text-emerald-700 font-bold mt-1">0% कमीशन ऑफर</div>
              </div>
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">पूरी हुई ट्रिप्स</div>
                <div className="text-2xl font-black text-amber-600 mt-1">{tripsCount}</div>
                <div className="text-[10px] text-amber-700 font-bold mt-1">Rating: 4.9 ★ (Top Driver)</div>
              </div>
            </div>

            {/* Incoming ride offer */}
            {pendingRide && isOnline && (
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-4 text-white shadow-xl border-2 border-amber-300 animate-bounce">
                <div className="flex items-center justify-between pb-2 border-b border-blue-400/40">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
                    <span className="text-xs font-black uppercase tracking-wider">🚨 नया आर्डर आया है!</span>
                  </div>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                    15s to accept
                  </span>
                </div>

                <div className="py-2.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-extrabold">{pendingRide.vehicle.name}</div>
                      <div className="text-[11px] text-blue-100">सामान: {pendingRide.goodsType}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-amber-300">₹{pendingRide.superFastPrice}</div>
                      <div className="text-[10px] text-emerald-300 font-bold">100% कमाई आपकी</div>
                    </div>
                  </div>

                  <div className="bg-blue-900/60 p-2 rounded-xl text-[11px] space-y-1">
                    <div className="flex items-center space-x-1.5 truncate">
                      <span className="text-emerald-400 font-bold">↑ पिकअप:</span>
                      <span className="truncate">{pendingRide.pickupLocation}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 truncate">
                      <span className="text-amber-400 font-bold">↓ ड्रॉप:</span>
                      <span className="truncate">{pendingRide.dropLocation}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={() => {
                      onAcceptRide(pendingRide.id);
                      soundEffects.playSuccessChime();
                    }}
                    className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-2.5 rounded-xl text-xs shadow-md transition"
                  >
                    ऑर्डर स्वीकार करें (Accept) ✓
                  </button>
                  <button
                    onClick={() => soundEffects.playOrderBeep()}
                    className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-2.5 rounded-xl text-xs font-bold"
                  >
                    रद्द
                  </button>
                </div>
              </div>
            )}

            {/* Active Accepted Trip */}
            {acceptedRide && (
              <div className="bg-white rounded-3xl p-4 shadow-md border-2 border-blue-500 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-950">Active Ride: {acceptedRide.orderNumber}</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                    {acceptedRide.status}
                  </span>
                </div>

                {acceptedRide.status === "ACCEPTED" && (
                  <button
                    onClick={() => onAdvanceRideStatus(acceptedRide.id, "ARRIVED")}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl text-xs font-extrabold shadow"
                  >
                    1. Reached Pickup Location (पिकअप पर पहुंच गए)
                  </button>
                )}

                {acceptedRide.status === "ARRIVED" && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-700">कस्टमर का 4-डिजिट OTP डालें:</div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        maxLength={4}
                        value={otpInput}
                        onChange={e => setOtpInput(e.target.value)}
                        placeholder="e.g. 6248"
                        className="flex-1 border-2 border-slate-300 rounded-xl p-2 text-center text-sm font-black tracking-widest text-slate-900"
                      />
                      <button
                        onClick={() => handleVerifyOtpAndStart(acceptedRide)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow"
                      >
                        OTP सत्यापित करें ➔
                      </button>
                    </div>
                    {otpError && (
                      <div className="text-[10px] text-red-600 font-bold">गलत OTP! सही OTP डालें।</div>
                    )}
                  </div>
                )}

                {acceptedRide.status === "IN_TRANSIT" && (
                  <button
                    onClick={() => handleCompleteAndCollectCash(acceptedRide)}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl text-xs font-black shadow-lg"
                  >
                    सामान डिलीवर हुआ - ₹{acceptedRide.superFastPrice} कलेक्ट करें ✓
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Permissions Popup (matching video at 01:19) */}
      {showPermissionPopup && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full text-slate-900 shadow-2xl space-y-3 animate-in zoom-in-95">
            <h4 className="text-sm font-extrabold text-slate-900">Provide permission</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Increase your earnings!! Change settings to receive orders even when app is in the background. Allow displaying over other apps.
            </p>
            <button
              onClick={() => setShowPermissionPopup(false)}
              className="w-full bg-blue-600 text-white font-extrabold py-2.5 rounded-xl text-xs"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Help Support Chat Modal */}
      {showSupportBot && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-4 max-w-sm w-full text-slate-900 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-extrabold text-xs">पार्टनर सहायता केंद्र (Help Desk)</span>
              <button onClick={() => setShowSupportBot(false)}>
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="space-y-2 text-xs max-h-48 overflow-y-auto">
              {botChat.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-xl ${m.sender === "bot" ? "bg-slate-100 text-slate-800" : "bg-blue-600 text-white"}`}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <div className="pt-1 space-y-1.5">
              <button
                onClick={() => {
                  setBotChat(prev => [
                    ...prev,
                    { sender: "user", text: "डॉक्यूमेंट वेरिफिकेशन में कितना समय लगता है?" },
                    { sender: "bot", text: "आधार, पैन और सेल्फी अपलोड करने के तुरंत बाद 5 मिनट में प्रोफाइल एक्टिव हो जाती है!" }
                  ]);
                }}
                className="w-full bg-blue-50 text-blue-700 py-2 rounded-xl text-xs font-bold border border-blue-200"
              >
                वेरिफिकेशन के बारे में पूछें
              </button>
              {onOpenPlayStoreModal && (
                <button
                  onClick={() => {
                    setShowSupportBot(false);
                    onOpenPlayStoreModal();
                  }}
                  className="w-full bg-emerald-50 text-emerald-800 py-2 rounded-xl text-xs font-bold border border-emerald-200 flex items-center justify-center space-x-1.5"
                >
                  <span>🚀 Google Play Store पब्लिश रिपोर्ट</span>
                </button>
              )}
              {onOpenPrivacyPolicy && (
                <button
                  onClick={() => {
                    setShowSupportBot(false);
                    onOpenPrivacyPolicy();
                  }}
                  className="w-full bg-slate-50 text-slate-700 py-1.5 rounded-xl text-[11px] font-semibold border border-slate-200 flex items-center justify-center space-x-1"
                >
                  <span>📄 प्राइवेसी पॉलिसी (Privacy Policy)</span>
                </button>
              )}
              {onOpenSecurityModal && (
                <button
                  onClick={() => {
                    setShowSupportBot(false);
                    onOpenSecurityModal();
                  }}
                  className="w-full bg-blue-50 text-blue-800 py-1.5 rounded-xl text-[11px] font-bold border border-blue-200 flex items-center justify-center space-x-1"
                >
                  <span>🛡️ 100% एंटी-हैक सुरक्षा शील्ड</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
