import React, { useState, useEffect } from "react";
import {
  Smartphone,
  Truck,
  ShieldCheck,
  Zap,
  Info,
  Layers,
  Sparkles,
  MapPin,
  CheckCircle2,
  Volume2,
  RefreshCw,
  ExternalLink,
  Share2,
  Download
} from "lucide-react";
import { CustomerApp } from "./components/CustomerApp";
import { PartnerApp } from "./components/PartnerApp";
import { HomeScreenLauncher } from "./components/HomeScreenLauncher";
import { InstallAppsModal } from "./components/InstallAppsModal";
import { PlayStoreReadinessModal } from "./components/PlayStoreReadinessModal";
import { PrivacyPolicyModal } from "./components/PrivacyPolicyModal";
import { SecurityAuditModal } from "./components/SecurityAuditModal";
import { ActiveRide, VEHICLES_DATA } from "./data/logisticsData";
import { Language, translations } from "./data/translations";
import { soundEffects } from "./utils/audio";

export default function App() {
  // Navigation mode: "CUSTOMER" | "PARTNER" | "PHONE_LAUNCHER" | "SPLIT_VIEW"
  const [activeScreen, setActiveScreen] = useState<"CUSTOMER" | "PARTNER" | "PHONE_LAUNCHER" | "SPLIT_VIEW">(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const app = params.get("app");
      if (app === "partner") return "PARTNER";
      if (app === "customer") return "CUSTOMER";
      if (app === "split" || app === "dual") return "SPLIT_VIEW";
      if (app === "launcher" || app === "phone") return "PHONE_LAUNCHER";
    }
    return "CUSTOMER"; // Default to Super Fast Customer App directly!
  });

  const [language, setLanguage] = useState<Language>("hi");
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showPlayStoreModal, setShowPlayStoreModal] = useState(false);
  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  // Sync PWA manifest and document title based on current active app
  useEffect(() => {
    if (typeof document !== "undefined") {
      let link = document.querySelector<HTMLLinkElement>("link[rel='manifest']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "manifest";
        document.head.appendChild(link);
      }
      if (activeScreen === "PARTNER") {
        link.href = "/manifest-partner.json";
        document.title = "Super Fast Partner - Driver App";
      } else {
        link.href = "/manifest-customer.json";
        document.title = "Super Fast Logistics - Customer App";
      }
    }
  }, [activeScreen]);

  // Sync activeScreen with browser URL for direct access to both apps
  const switchScreen = (screen: "CUSTOMER" | "PARTNER" | "PHONE_LAUNCHER" | "SPLIT_VIEW") => {
    setActiveScreen(screen);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (screen === "CUSTOMER") params.set("app", "customer");
      else if (screen === "PARTNER") params.set("app", "partner");
      else if (screen === "SPLIT_VIEW") params.set("app", "dual");
      else if (screen === "PHONE_LAUNCHER") params.set("app", "launcher");
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
  };

  // Global Active Rides State
  const [activeRides, setActiveRides] = useState<ActiveRide[]>(() => {
    // Initial seeded sample ride in Maharashtra for instant responsiveness
    return [
      {
        id: "SF-849201",
        orderNumber: "SF-MH-7521",
        vehicle: VEHICLES_DATA[1], // Tata Ace
        pickupLocation: "Buwapada, Deepak Nagar, Ambernath, Maharashtra 421501",
        dropLocation: "Kalyan Station East, Kalyan, Maharashtra 421301",
        receiverName: "Pankaj Suresh Yadav",
        receiverPhone: "7521869140",
        senderPhone: "7521869140",
        goodsType: "Commercial inventory cartons",
        marketPrice: 580,
        porterPrice: 580,
        superFastPrice: 480, // Tata Ace ₹100 discount (scaled down from max ₹200)
        savings: 100,
        paymentMethod: "CASH",
        status: "SEARCHING", // Available for partner app to accept!
        otp: "6248",
        driverName: "Suresh P. Yadav",
        driverPhone: "9820194821",
        vehicleNumber: "MH 05 BJ 4821",
        driverRating: 4.9,
        driverPhotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        timestamp: "Just now"
      }
    ];
  });

  // Floating notification toast for cross-app events
  const [notificationToast, setNotificationToast] = useState<{
    title: string;
    message: string;
    targetApp: "CUSTOMER" | "PARTNER";
  } | null>(null);

  const handleBookRide = (newRide: ActiveRide) => {
    setActiveRides(prev => [newRide, ...prev]);
    // Notify partner
    setNotificationToast({
      title: "🚨 New Ride Request in Super Fast Partner!",
      message: `${newRide.pickupLocation.split(",")[0]} → ${newRide.dropLocation.split(",")[0]} (Earn ₹${newRide.superFastPrice})`,
      targetApp: "PARTNER"
    });
    soundEffects.playPartnerAlert();
  };

  const handleCancelRide = (rideId: string) => {
    setActiveRides(prev => prev.filter(r => r.id !== rideId));
  };

  const handleAcceptRide = (rideId: string) => {
    setActiveRides(prev =>
      prev.map(r => (r.id === rideId ? { ...r, status: "ACCEPTED" } : r))
    );
    setNotificationToast({
      title: "✅ Driver Assigned in Super Fast!",
      message: "Suresh Yadav (MH 05 BJ 4821) accepted the ride. OTP: 6248",
      targetApp: "CUSTOMER"
    });
  };

  const handleAdvanceRideStatus = (rideId: string, newStatus: ActiveRide["status"]) => {
    setActiveRides(prev =>
      prev.map(r => (r.id === rideId ? { ...r, status: newStatus } : r))
    );
  };

  const pendingPartnerCount = activeRides.filter(r => r.status === "SEARCHING").length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Universal App Control Bar */}
      <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-3 py-2 sm:px-4 sm:py-2.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Logo & Value Proposition */}
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-amber-400 text-xs">
                SF
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5 flex-wrap">
                <span className="font-black text-sm sm:text-base tracking-tight text-white">SUPER FAST</span>
                <span className="text-[10px] sm:text-xs bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase shadow-xs">
                  गाड़ी अनुसार स्मार्ट छूट
                </span>
                <span className="hidden md:inline-block text-[11px] bg-blue-900/80 text-blue-200 border border-blue-700/50 px-2 py-0.5 rounded-full font-medium">
                  📍 All Maharashtra (Ambernath, Kalyan, Thane, Mumbai, Pune)
                </span>
              </div>
              <p className="text-[10.5px] text-slate-400 hidden sm:block">
                दो अलग-अलग ऐप्स: App 1 (कस्टमर डिलीवरी बुकिंग) + App 2 (ड्राइवर पार्टनर कंसोल)
              </p>
            </div>
          </div>

          {/* Dual-App Switcher Buttons */}
          <div className="flex items-center bg-slate-950/80 p-1 rounded-2xl border border-slate-800 shadow-inner flex-wrap gap-1">
            {/* Customer App Button */}
            <button
              onClick={() => switchScreen("CUSTOMER")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeScreen === "CUSTOMER"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-900/50 border border-blue-400/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>📱 App 1: Customer (कस्टमर)</span>
            </button>

            {/* Partner Driver App Button */}
            <button
              onClick={() => switchScreen("PARTNER")}
              className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeScreen === "PARTNER"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-900/50 border border-indigo-400/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>🚛 App 2: Partner (ड्राइवर)</span>
              {pendingPartnerCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              )}
            </button>

            {/* Split View (Desktop) */}
            <button
              onClick={() => switchScreen("SPLIT_VIEW")}
              className={`hidden lg:flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeScreen === "SPLIT_VIEW"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
              title="View Customer App & Partner App together side-by-side"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>🖥️ दोनों ऐप साथ में (Side-by-Side)</span>
            </button>

            {/* Phone Home Screen Launcher button */}
            <button
              onClick={() => switchScreen("PHONE_LAUNCHER")}
              className={`hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition ${
                activeScreen === "PHONE_LAUNCHER"
                  ? "bg-slate-700 text-white shadow"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
              title="Phone Launcher with Watchtower Wallpaper"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>📲 फोन स्क्रीन (Launcher)</span>
            </button>

            {/* High-Level Security Shield Button */}
            <button
              onClick={() => setShowSecurityModal(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-2.5 py-1.5 rounded-xl shadow-md flex items-center space-x-1.5 active:scale-95 transition"
              title="एंटी-हैक सुरक्षा शील्ड व GitHub गाइड"
            >
              <ShieldCheck className="w-3.5 h-3.5 stroke-[3]" />
              <span>🛡️ 100% सुरक्षित (Anti-Hack)</span>
            </button>

            {/* Play Store Readiness Button */}
            <button
              onClick={() => setShowPlayStoreModal(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs px-2.5 py-1.5 rounded-xl shadow-md flex items-center space-x-1.5 active:scale-95 transition"
              title="Play Store पब्लिश रिपोर्ट व गाइड"
            >
              <span>🚀 Play Store (Ready)</span>
            </button>

            {/* 2 Apps Dedicated Installer Button */}
            <button
              onClick={() => setShowInstallModal(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-xl shadow-md flex items-center space-x-1.5 active:scale-95 transition"
              title="दोनों ऐप अपने फोन पर अलग-अलग इंस्टॉल करें"
            >
              <Download className="w-3.5 h-3.5 stroke-[3]" />
              <span>📲 2 Apps Install</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Notification Toast */}
      {notificationToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] bg-blue-600 text-white p-3 rounded-2xl shadow-2xl border-2 border-amber-300 flex items-center justify-between animate-bounce">
          <div className="flex items-center space-x-2.5 truncate">
            <Zap className="w-5 h-5 text-amber-300 fill-amber-300 flex-shrink-0" />
            <div className="truncate text-left">
              <div className="text-xs font-black">{notificationToast.title}</div>
              <div className="text-[11px] text-blue-100 truncate">{notificationToast.message}</div>
            </div>
          </div>
          <button
            onClick={() => {
              switchScreen(notificationToast.targetApp);
              setNotificationToast(null);
            }}
            className="ml-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-2.5 py-1 rounded-xl text-xs font-black flex-shrink-0"
          >
            Switch →
          </button>
        </div>
      )}

      {/* Main Workspace Frame */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-0 md:p-6 flex flex-col items-center justify-center">
        {/* VIEW 1: Customer App (Single Phone View) */}
        {activeScreen === "CUSTOMER" && (
          <div className="w-full md:max-w-[430px] flex flex-col items-center">
            <div className="hidden md:flex text-xs text-slate-400 mb-2 items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>📱 <strong>App 1: Super Fast</strong> (Customer Delivery & Truck Booking)</span>
            </div>
            <CustomerApp
              language={language}
              onLanguageChange={setLanguage}
              activeRides={activeRides}
              onBookRide={handleBookRide}
              onCancelRide={handleCancelRide}
              onOpenPartnerApp={() => switchScreen("PARTNER")}
              onOpenPhoneLauncher={() => switchScreen("PHONE_LAUNCHER")}
              onOpenInstallModal={() => setShowInstallModal(true)}
              onOpenPlayStoreModal={() => setShowPlayStoreModal(true)}
              onOpenPrivacyPolicy={() => setShowPrivacyPolicyModal(true)}
              onOpenSecurityModal={() => setShowSecurityModal(true)}
            />
          </div>
        )}

        {/* VIEW 2: Partner Driver App (Single Phone View) */}
        {activeScreen === "PARTNER" && (
          <div className="w-full md:max-w-[430px] flex flex-col items-center">
            <div className="hidden md:flex text-xs text-slate-400 mb-2 items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>🚗 <strong>App 2: Super Fast Partner</strong> (Driver & Fleet Owner Onboarding + Live Duty)</span>
            </div>
            <PartnerApp
              language={language}
              onLanguageChange={setLanguage}
              activeRides={activeRides}
              onAcceptRide={handleAcceptRide}
              onAdvanceRideStatus={handleAdvanceRideStatus}
              onOpenCustomerApp={() => switchScreen("CUSTOMER")}
              onOpenPhoneLauncher={() => switchScreen("PHONE_LAUNCHER")}
              onOpenInstallModal={() => setShowInstallModal(true)}
              onOpenPlayStoreModal={() => setShowPlayStoreModal(true)}
              onOpenPrivacyPolicy={() => setShowPrivacyPolicyModal(true)}
              onOpenSecurityModal={() => setShowSecurityModal(true)}
            />
          </div>
        )}

        {/* VIEW 3: Phone Home Screen Launcher (matching the user's phone in video!) */}
        {activeScreen === "PHONE_LAUNCHER" && (
          <div className="w-full md:max-w-[430px] flex flex-col items-center">
            <div className="text-xs text-slate-400 mb-2 flex items-center space-x-2">
              <span>📱 Tap any app icon below to launch (Recreated from your phone screen!)</span>
            </div>
            <HomeScreenLauncher
              onOpenApp={app => switchScreen(app === "customer" ? "CUSTOMER" : "PARTNER")}
              activeOrdersCount={activeRides.length}
              partnerPendingOrdersCount={pendingPartnerCount}
            />
          </div>
        )}

        {/* VIEW 4: Split View (Side-by-Side Live Ecosystem on Desktop) */}
        {activeScreen === "SPLIT_VIEW" && (
          <div className="w-full flex flex-col items-center px-4 py-2">
            <div className="text-xs text-slate-400 mb-4 text-center max-w-xl">
              ⚡ <strong>Live Interactive Dual-App Simulator</strong>: Book a truck on the left (Customer App), and immediately see the ride alert pop up on the right (Super Fast Partner Driver App)!
            </div>
            <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8">
              {/* Left Phone: Customer */}
              <div className="w-full max-w-[420px]">
                <div className="text-center text-xs font-bold text-blue-400 mb-2 flex items-center justify-center space-x-1.5">
                  <Truck className="w-4 h-4" />
                  <span>App 1: Super Fast (Customer Booking)</span>
                </div>
                <CustomerApp
                  language={language}
                  onLanguageChange={setLanguage}
                  activeRides={activeRides}
                  onBookRide={handleBookRide}
                  onCancelRide={handleCancelRide}
                  onOpenPartnerApp={() => switchScreen("PARTNER")}
                  onOpenInstallModal={() => setShowInstallModal(true)}
                />
              </div>

              {/* Right Phone: Partner */}
              <div className="w-full max-w-[420px]">
                <div className="text-center text-xs font-bold text-amber-400 mb-2 flex items-center justify-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>App 2: Super Fast Partner (Driver Console)</span>
                </div>
                <PartnerApp
                  language={language}
                  onLanguageChange={setLanguage}
                  activeRides={activeRides}
                  onAcceptRide={handleAcceptRide}
                  onAdvanceRideStatus={handleAdvanceRideStatus}
                  onOpenCustomerApp={() => switchScreen("CUSTOMER")}
                  onOpenInstallModal={() => setShowInstallModal(true)}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Quick Switcher Pill for Mobile */}
      <div className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center bg-slate-900/95 backdrop-blur-md p-1.5 rounded-full border border-slate-700 shadow-2xl space-x-1">
        <button
          onClick={() => switchScreen("CUSTOMER")}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition ${
            activeScreen === "CUSTOMER"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/40"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>App 1: ग्राहक</span>
        </button>

        <button
          onClick={() => switchScreen("PARTNER")}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition ${
            activeScreen === "PARTNER"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/40"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
          <span>App 2: ड्राइवर</span>
          {pendingPartnerCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          )}
        </button>
      </div>

      {/* Maharashtra District Coverage Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-xs text-slate-400 py-3 px-4 text-center mt-auto">
        <div className="max-w-4xl mx-auto space-y-1.5">
          <div className="flex flex-wrap items-center justify-center gap-2 text-slate-300 font-semibold text-[11px]">
            <span>📍 All Maharashtra Network:</span>
            <span className="text-blue-400 font-bold">Ambernath</span> •
            <span className="text-blue-400 font-bold">Kalyan</span> •
            <span className="text-blue-400">Thane</span> •
            <span className="text-blue-400">Mumbai</span> •
            <span className="text-blue-400">Pune</span> •
            <span className="text-blue-400">Nashik</span> •
            <span className="text-blue-400">Nagpur</span> •
            <span className="text-blue-400">Chhatrapati Sambhaji Nagar</span> •
            <span className="text-blue-400">Kolhapur</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Super Fast Logistics & Driver Partner Network © 2026. पूरे महाराष्ट्र में गाड़ी के अनुसार सबसे बड़ी छूट और 0% ड्राइवर कमीशन!
          </p>
        </div>
      </footer>

      {/* Dedicated Dual Apps Install Modal */}
      <InstallAppsModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        onSelectApp={switchScreen}
        currentApp={activeScreen}
      />

      {/* Google Play Store Publishing Report & Guide Modal */}
      <PlayStoreReadinessModal
        isOpen={showPlayStoreModal}
        onClose={() => setShowPlayStoreModal(false)}
        onOpenPrivacyPolicy={() => setShowPrivacyPolicyModal(true)}
      />

      {/* Play Store Required Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={showPrivacyPolicyModal}
        onClose={() => setShowPrivacyPolicyModal(false)}
      />

      {/* Anti-Hack High-Level Security Modal */}
      <SecurityAuditModal
        isOpen={showSecurityModal}
        onClose={() => setShowSecurityModal(false)}
      />
    </div>
  );
}
