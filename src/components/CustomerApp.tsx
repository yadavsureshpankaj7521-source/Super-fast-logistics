import React, { useState } from "react";
import {
  ArrowUp,
  Search,
  Mic,
  ChevronRight,
  ShieldCheck,
  Zap,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  Wallet,
  User,
  Package,
  Phone,
  ArrowRight,
  X,
  CreditCard,
  Gift,
  Building2,
  HelpCircle,
  Globe,
  FileText,
  LogOut,
  IndianRupee,
  Navigation,
  Download
} from "lucide-react";
import {
  MAHARASHTRA_CITIES,
  VEHICLES_DATA,
  VehicleType,
  ActiveRide
} from "../data/logisticsData";
import { translations, Language } from "../data/translations";
import { VehicleVisual } from "./VehicleVisual";
import { InteractiveMap } from "./InteractiveMap";
import { soundEffects } from "../utils/audio";
import confetti from "canvas-confetti";
import { CallModal } from "./CallModal";

interface CustomerAppProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeRides: ActiveRide[];
  onBookRide: (ride: ActiveRide) => void;
  onCancelRide: (id: string) => void;
  onOpenPartnerApp: () => void;
  onOpenPhoneLauncher?: () => void;
  onOpenInstallModal?: () => void;
  onOpenPlayStoreModal?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenSecurityModal?: () => void;
}

export const CustomerApp: React.FC<CustomerAppProps> = ({
  language,
  onLanguageChange,
  activeRides,
  onBookRide,
  onCancelRide,
  onOpenPartnerApp,
  onOpenPhoneLauncher,
  onOpenInstallModal,
  onOpenPlayStoreModal,
  onOpenPrivacyPolicy,
  onOpenSecurityModal
}) => {
  const t = translations[language];

  // Navigation tab
  const [activeTab, setActiveTab] = useState<"home" | "orders" | "coins" | "payments" | "account">("home");

  // Booking Flow Steps:
  // "IDLE" -> "SERVICE_MODAL" -> "SEARCH_DROP" -> "RECEIVER_DETAILS" -> "SELECT_VEHICLE" -> "BOOKING_CONFIRM" -> "TRACKING"
  const [bookingStep, setBookingStep] = useState<
    "IDLE" | "SERVICE_MODAL" | "SEARCH_DROP" | "RECEIVER_DETAILS" | "SELECT_VEHICLE" | "TRACKING"
  >("IDLE");

  // Locations state
  const [pickupLocation, setPickupLocation] = useState("Buwapada, Deepak Nagar, Ambernath, Maharashtra 421501");
  const [isEditingPickup, setIsEditingPickup] = useState(false);
  const [serviceType, setServiceType] = useState<"within_city" | "outstation">("within_city");

  const [dropQuery, setDropQuery] = useState("");
  const [selectedDrop, setSelectedDrop] = useState("Kalyan Station East, Kalyan, Maharashtra, India");

  // Receiver details
  const [receiverName, setReceiverName] = useState("Pankaj Suresh Yadav");
  const [receiverPhone, setReceiverPhone] = useState("7521869140");
  const [useMyNumber, setUseMyNumber] = useState(true);
  const [addressTag, setAddressTag] = useState<"Home" | "Shop" | "Other">("Shop");
  const [goodsDescription, setGoodsDescription] = useState("Commercial cartons & goods");

  // Selected vehicle for booking
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("tata_ace");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<"truck" | "2wheeler" | "packers">("truck");

  // In-app validation and calling states
  const [formError, setFormError] = useState<string | null>(null);
  const [isCallingModalOpen, setIsCallingModalOpen] = useState(false);

  // Active tracking ride
  const [currentTrackingRide, setCurrentTrackingRide] = useState<ActiveRide | null>(
    activeRides.length > 0 ? activeRides[0] : null
  );

  // Available Maharashtra dropdown suggestions
  const filteredAreas = MAHARASHTRA_CITIES.flatMap(city =>
    city.popularAreas.map(area => `${area}, ${city.city}, Maharashtra`)
  ).filter(addr =>
    dropQuery ? addr.toLowerCase().includes(dropQuery.toLowerCase()) : true
  );

  const selectedVehicle = VEHICLES_DATA.find(v => v.id === selectedVehicleId) || VEHICLES_DATA[1];

  const handleStartBooking = (category: "truck" | "2wheeler" | "packers") => {
    setFormError(null);
    setSelectedCategoryFilter(category);
    if (category === "2wheeler") {
      setSelectedVehicleId("scooter_delivery");
    } else if (category === "packers") {
      setSelectedVehicleId("packers_movers_1bhk");
    } else {
      setSelectedVehicleId("tata_ace");
    }
    setBookingStep("SERVICE_MODAL");
  };

  const handleConfirmAndProceed = () => {
    if (!receiverName.trim()) {
      setFormError("कृपया प्राप्तकर्ता का नाम दर्ज करें (Please enter Receiver's Name)");
      return;
    }
    setFormError(null);
    setBookingStep("SELECT_VEHICLE");
  };

  const handleFinalBooking = () => {
    soundEffects.playOrderBeep();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }

    const newRide: ActiveRide = {
      id: "SF-" + Math.floor(100000 + Math.random() * 900000),
      orderNumber: "SF-MH-" + Math.floor(1000 + Math.random() * 9000),
      vehicle: selectedVehicle,
      pickupLocation,
      dropLocation: selectedDrop,
      receiverName,
      receiverPhone: useMyNumber ? "7521869140" : receiverPhone,
      senderPhone: "7521869140",
      goodsType: goodsDescription,
      marketPrice: selectedVehicle.marketPrice,
      porterPrice: selectedVehicle.marketPrice,
      superFastPrice: selectedVehicle.superFastPrice,
      savings: selectedVehicle.discount,
      paymentMethod: "CASH",
      status: "SEARCHING",
      otp: String(Math.floor(1000 + Math.random() * 9000)),
      driverName: "Suresh P. Yadav (Partner)",
      driverPhone: "9820194821",
      vehicleNumber: "MH 05 BJ 4821",
      driverRating: 4.9,
      driverPhotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    onBookRide(newRide);
    setCurrentTrackingRide(newRide);
    setBookingStep("TRACKING");

    // Automatically advance driver status after 3.5 seconds to simulate partner response
    setTimeout(() => {
      newRide.status = "ACCEPTED";
      setCurrentTrackingRide({ ...newRide });
      soundEffects.playSuccessChime();
    }, 3500);
  };

  return (
    <div className="relative w-full h-full min-h-[100dvh] md:min-h-0 md:h-[780px] bg-slate-50 text-slate-900 md:rounded-[44px] overflow-hidden md:shadow-[0_30px_90px_-15px_rgba(0,0,0,0.85)] md:border-[8px] md:border-slate-900 flex flex-col justify-between font-sans md:ring-1 md:ring-slate-800/80">
      {/* Top Phone Status & Header (Clean White matching video 00:00) */}
      <div className="bg-white border-b border-slate-200/90 px-4 pt-3 pb-3 shadow-xs select-none">
        {/* Status Bar info */}
        <div className="flex items-center justify-between text-xs font-semibold pb-2 text-slate-700">
          <span className="font-bold tracking-tight text-slate-900">2:42</span>
          <div className="flex items-center space-x-1.5 bg-slate-100 px-2.5 py-0.5 rounded-full text-[10px] border border-slate-200 text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">Maharashtra Live</span>
          </div>
          <div className="flex items-center space-x-1 text-[11px] text-slate-700">
            <span className="text-[9px] font-black bg-slate-200 px-1 py-0.2 rounded">5G</span>
            <span className="font-bold">86%</span>
          </div>
        </div>

        {/* Clean Brand Line */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
              SF
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-sm text-slate-900 tracking-tight">SUPER FAST</span>
                <span className="text-[9.5px] bg-blue-100 text-blue-700 font-extrabold px-1.5 py-0.2 rounded">
                  APP 1
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            {onOpenInstallModal && (
              <button
                onClick={onOpenInstallModal}
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-2.5 py-1 rounded-xl text-[10.5px] font-extrabold flex items-center space-x-1 shadow-xs active:scale-95 transition"
                title="दोनों ऐप अलग-अलग इंस्टॉल करें"
              >
                <Download className="w-3.5 h-3.5 stroke-[3]" />
                <span>📲 इंस्टॉल</span>
              </button>
            )}
            {onOpenPartnerApp && (
              <button
                onClick={onOpenPartnerApp}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-xl text-[10.5px] font-bold border border-slate-200 active:scale-95 transition"
                title="Switch to Driver Partner App"
              >
                <span>🚛 App 2 Driver</span>
              </button>
            )}

            {/* Language Switcher pill */}
            <div className="flex items-center bg-slate-100 rounded-xl p-0.5 text-xs font-semibold border border-slate-200">
              <button
                onClick={() => onLanguageChange("hi")}
                className={`px-1.5 py-0.5 rounded-lg transition ${language === "hi" ? "bg-white text-blue-700 shadow-xs font-bold" : "text-slate-500"}`}
              >
                हिं
              </button>
              <button
                onClick={() => onLanguageChange("mr")}
                className={`px-1.5 py-0.5 rounded-lg transition ${language === "mr" ? "bg-white text-blue-700 shadow-xs font-bold" : "text-slate-500"}`}
              >
                मरा
              </button>
              <button
                onClick={() => onLanguageChange("en")}
                className={`px-1.5 py-0.5 rounded-lg transition ${language === "en" ? "bg-white text-blue-700 shadow-xs font-bold" : "text-slate-500"}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Pickup address bar (matching video 00:00 exact!) */}
        <div
          onClick={() => setIsEditingPickup(!isEditingPickup)}
          className="mt-3 bg-white text-slate-900 rounded-2xl p-3 shadow-xs flex items-center justify-between cursor-pointer active:scale-98 transition hover:bg-slate-50 border border-slate-200"
        >
          <div className="flex items-center space-x-3 truncate">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <ArrowUp className="w-4 h-4 stroke-[3]" />
            </div>
            <div className="truncate text-left">
              <div className="text-[11px] font-bold text-slate-500">{t.pickupFrom}</div>
              <div className="text-xs font-extrabold text-slate-900 truncate">{pickupLocation}</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 ml-1" />
        </div>

        {/* Quick Location Picker Modal if clicked */}
        {isEditingPickup && (
          <div className="mt-2 bg-white text-slate-900 p-3 rounded-2xl shadow-xl text-xs space-y-2 border border-slate-300 animate-fadeIn">
            <div className="flex items-center justify-between font-bold text-blue-700">
              <span>Select Pickup Location in Maharashtra:</span>
              <button onClick={() => setIsEditingPickup(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-slate-700" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto">
              {MAHARASHTRA_CITIES.map(c => (
                <button
                  key={c.city}
                  onClick={() => {
                    setPickupLocation(`${c.popularAreas[0]}, ${c.city}, Maharashtra`);
                    setIsEditingPickup(false);
                  }}
                  className="p-1.5 bg-slate-50 border border-slate-200 rounded-xl text-left hover:bg-blue-50 transition text-[11px] truncate text-slate-800"
                >
                  📍 {c.city}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area based on Active Tab or Booking Step */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {bookingStep === "IDLE" && (
          <>
            {activeTab === "home" && (
              <>
                {/* Active Ride Banner if ride is in progress */}
                {currentTrackingRide && currentTrackingRide.status !== "COMPLETED" && (
                  <div
                    onClick={() => setBookingStep("TRACKING")}
                    className="bg-blue-600 text-white rounded-2xl p-3 shadow-md flex items-center justify-between cursor-pointer border border-blue-400/40"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <VehicleVisual type={currentTrackingRide.vehicle.iconType} size="sm" />
                      </div>
                      <div>
                        <div className="text-xs font-black flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>Active Delivery: {currentTrackingRide.orderNumber}</span>
                        </div>
                        <div className="text-[11px] text-blue-100">
                          {currentTrackingRide.vehicle.name} • {currentTrackingRide.status}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-amber-300">₹{currentTrackingRide.superFastPrice}</div>
                      <div className="text-[10px] text-emerald-300 font-bold">Track Now →</div>
                    </div>
                  </div>
                )}

                {/* Services Grid (Trucks, 2 Wheeler, Packers & Movers matching video 00:00) */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Service 1: Trucks */}
                  <button
                    onClick={() => handleStartBooking("truck")}
                    className="group bg-white rounded-3xl p-4 shadow-xs border border-slate-200 text-left hover:border-blue-500 hover:shadow-md transition active:scale-97 flex flex-col justify-between h-36"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-16 h-12 flex items-center justify-center">
                        <VehicleVisual type="tata_ace" size="md" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{t.trucks}</div>
                      <p className="text-[11px] text-slate-500 font-medium">छोटा हाथी व ट्रक्स (₹200 तक छूट)</p>
                    </div>
                  </button>

                  {/* Service 2: 2 Wheeler */}
                  <button
                    onClick={() => handleStartBooking("2wheeler")}
                    className="group bg-white rounded-3xl p-4 shadow-xs border border-slate-200 text-left hover:border-blue-500 hover:shadow-md transition active:scale-97 flex flex-col justify-between h-36"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-16 h-12 flex items-center justify-center">
                        <VehicleVisual type="scooter" size="md" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{t.twoWheeler}</div>
                      <p className="text-[11px] text-slate-500 font-medium">बाइक व पार्सल (₹69 से)</p>
                    </div>
                  </button>

                  {/* Service 3: Packers & Movers */}
                  <button
                    onClick={() => handleStartBooking("packers")}
                    className="group bg-white rounded-3xl p-4 shadow-xs border border-slate-200 text-left hover:border-blue-500 hover:shadow-md transition active:scale-97 flex flex-col justify-between h-36"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-16 h-12 flex items-center justify-center">
                        <VehicleVisual type="packers_truck" size="md" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{t.packersMovers}</div>
                      <p className="text-[11px] text-slate-500 font-medium">घर व दुकान शिफ्टिंग</p>
                    </div>
                  </button>
                </div>

                {/* Explore Rewards Card (matching video 00:00) */}
                <div
                  onClick={() => setActiveTab("coins")}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-blue-400 transition"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-xs">
                      <Sparkles className="w-5 h-5 fill-amber-500 text-amber-500" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-slate-900">Explore Super Fast Rewards</div>
                      <div className="text-[11px] text-slate-500">Earn 2 coins for every 100 spent</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>

                {/* Announcements Carousel (matching video 00:01) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-extrabold text-slate-900">Announcements</span>
                    <button
                      onClick={() => handleStartBooking("truck")}
                      className="text-[11px] font-bold text-blue-600 hover:underline"
                    >
                      View all &gt;
                    </button>
                  </div>
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base">
                        📢
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">Professional house shifting</div>
                        <div className="text-[10.5px] text-slate-500">Verified crew, bubble wrap & safe transport</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex justify-center space-x-1.5 pt-0.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                  </div>
                </div>

                {/* Elevated Highway Illustration (matching video 00:01) */}
                <div className="bg-gradient-to-b from-blue-50/60 to-slate-100 rounded-3xl p-4 border border-blue-100 flex flex-col items-center text-center space-y-2">
                  <div className="w-full h-20 relative flex items-center justify-center overflow-hidden">
                    <svg viewBox="0 0 300 80" className="w-full h-full text-blue-200" fill="currentColor">
                      <path d="M0,60 Q75,20 150,45 T300,30 L300,80 L0,80 Z" opacity="0.3" />
                      <path d="M0,50 Q75,30 150,55 T300,40" stroke="#93C5FD" strokeWidth="4" fill="none" />
                      <rect x="60" y="45" width="8" height="35" fill="#BFDBFE" />
                      <rect x="180" y="35" width="8" height="45" fill="#BFDBFE" />
                    </svg>
                    <div className="absolute left-1/3 top-3 animate-pulse">
                      <VehicleVisual type="tata_ace" size="sm" />
                    </div>
                  </div>
                  <div className="text-xs font-bold text-slate-700">
                    महाराष्ट्र का सबसे भरोसेमंद डिलीवरी व लॉजिस्टिक्स नेटवर्क
                  </div>
                  <div className="text-[11px] text-slate-500">
                    मुंबई, ठाणे, कल्याण, अंबरनाथ, पुणे, नाशिक व संपूर्ण 36 जिले
                  </div>
                </div>
              </>
            )}

            {/* TAB: Orders */}
            {activeTab === "orders" && (
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-slate-900">Your Orders</h3>
                {activeRides.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm space-y-3">
                    <Package className="w-12 h-12 text-slate-300 mx-auto" />
                    <div className="text-sm font-bold text-slate-700">No Orders!</div>
                    <p className="text-xs text-slate-500">Order history limited to last 2 years across Maharashtra.</p>
                    <button
                      onClick={() => handleStartBooking("truck")}
                      className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-blue-500"
                    >
                      Book Now
                    </button>
                  </div>
                ) : (
                  activeRides.map(ride => (
                    <div
                      key={ride.id}
                      onClick={() => {
                        setCurrentTrackingRide(ride);
                        setBookingStep("TRACKING");
                      }}
                      className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm space-y-2 cursor-pointer hover:border-blue-500 transition"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-slate-800">{ride.orderNumber}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            ride.status === "COMPLETED"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {ride.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <VehicleVisual type={ride.vehicle.iconType} size="sm" />
                        <div>
                          <div className="font-bold text-slate-900">{ride.vehicle.name}</div>
                          <div className="text-[11px] text-slate-500 truncate max-w-[200px]">
                            To: {ride.dropLocation}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                        <span className="text-emerald-700 font-black">₹{ride.superFastPrice}</span>
                        <span className="text-slate-400 text-[11px]">{ride.timestamp}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB: Coins */}
            {activeTab === "coins" && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-white rounded-3xl p-6 text-center shadow-lg relative overflow-hidden">
                  <Award className="w-16 h-16 mx-auto mb-2 opacity-90" />
                  <div className="text-2xl font-black">250 SF Coins</div>
                  <p className="text-xs text-amber-100 mt-1">Value: ₹250 instant delivery credit</p>
                  <button className="mt-4 bg-slate-950 text-white px-4 py-2 rounded-xl text-xs font-bold">
                    Redeem on Next Truck Ride
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">How Coins Work</h4>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Earn 2 coins for every ₹100 spent on any Maharashtra booking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Use coins to pay for labor helper & waiting charges</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Payments */}
            {activeTab === "payments" && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-500 uppercase">Super Fast Credits Balance</div>
                  <div className="text-3xl font-black text-slate-900">₹500.00</div>
                  <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-bold text-xs shadow hover:bg-blue-500">
                    Add Money via UPI / GPay
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-700">Payment Modes Accepted</div>
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 font-semibold text-slate-800">
                      💵 Cash on Delivery
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 font-semibold text-slate-800">
                      📱 PhonePe / GPay
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 font-semibold text-slate-800">
                      💳 Cards / Netbanking
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Account profile */}
            {activeTab === "account" && (
              <div className="space-y-3 text-xs">
                {/* User card with phone from video: 7521869140 */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">7521869140</h3>
                    <p className="text-[11px] text-slate-500">yadavsureshpankaj7521@gmail.com</p>
                    <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                      ✓ Verified Maharashtra User
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                    SY
                  </div>
                </div>

                {/* Account menu items matching video */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-sm">
                  <button className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50">
                    <div className="flex items-center space-x-2.5">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-800">Saved Addresses (Ambernath, Kalyan)</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50">
                    <div className="flex items-center space-x-2.5">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-800">GST Details for Business</span>
                    </div>
                    <span className="text-[10px] text-blue-600 font-bold">+ Add GSTIN</span>
                  </button>
                  <button
                    onClick={onOpenPartnerApp}
                    className="w-full p-3.5 flex items-center justify-between text-left bg-blue-50/60 hover:bg-blue-100 transition"
                  >
                    <div className="flex items-center space-x-2.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span className="font-bold text-blue-900">Switch to Driver Partner App</span>
                    </div>
                    <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded font-bold">OPEN</span>
                  </button>
                  <button className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50">
                    <div className="flex items-center space-x-2.5">
                      <Gift className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-800">Refer your friends & earn ₹100</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50">
                    <div className="flex items-center space-x-2.5">
                      <HelpCircle className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-800">Help & Support (24x7 Call)</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                  {onOpenPlayStoreModal && (
                    <button
                      onClick={onOpenPlayStoreModal}
                      className="w-full p-3.5 flex items-center justify-between text-left bg-emerald-50/60 hover:bg-emerald-100 transition"
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="text-base">🚀</span>
                        <span className="font-bold text-emerald-950">Google Play Store पब्लिश रिपोर्ट</span>
                      </div>
                      <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-full">
                        READY 98%
                      </span>
                    </button>
                  )}
                  {onOpenPrivacyPolicy && (
                    <button
                      onClick={onOpenPrivacyPolicy}
                      className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50"
                    >
                      <div className="flex items-center space-x-2.5">
                        <ShieldCheck className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-800">Privacy Policy & Play Store Terms</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  )}
                  {onOpenSecurityModal && (
                    <button
                      onClick={onOpenSecurityModal}
                      className="w-full p-3.5 flex items-center justify-between text-left bg-blue-50/50 hover:bg-blue-100 transition"
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="text-base">🛡️</span>
                        <span className="font-bold text-blue-950">हाई-लेवल सुरक्षा शील्ड (Anti-Hack)</span>
                      </div>
                      <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-full">
                        100% SECURE
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* STEP 1 MODAL: "Choose your service" (Within City vs Outstation) - As in video at 00:23 */}
        {bookingStep === "SERVICE_MODAL" && (
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="text-sm font-extrabold text-slate-900">Choose your service</h3>
              <button onClick={() => setBookingStep("IDLE")}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Option 1: Within City */}
              <button
                onClick={() => {
                  setServiceType("within_city");
                  setBookingStep("SEARCH_DROP");
                }}
                className={`w-full p-4 rounded-2xl border-2 text-left flex items-center space-x-3 transition active:scale-98 ${
                  serviceType === "within_city" ? "border-blue-600 bg-blue-50/50" : "border-slate-200"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <VehicleVisual type="tata_ace" size="sm" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{t.withinCity}</div>
                  <div className="text-xs text-slate-500">Local delivery in Ambernath, Kalyan, Mumbai, Pune, etc.</div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-0.5">गाड़ी के अनुसार सबसे बड़ी छूट और तेज़ डिलीवरी</div>
                </div>
              </button>

              {/* Option 2: Outstation */}
              <button
                onClick={() => {
                  setServiceType("outstation");
                  setBookingStep("SEARCH_DROP");
                }}
                className={`w-full p-4 rounded-2xl border-2 text-left flex items-center space-x-3 transition active:scale-98 ${
                  serviceType === "outstation" ? "border-blue-600 bg-blue-50/50" : "border-slate-200"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <VehicleVisual type="truck_large" size="sm" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{t.outstation}</div>
                  <div className="text-xs text-slate-500">Across all 36 Maharashtra districts & highways</div>
                  <div className="text-[10px] text-indigo-600 font-bold mt-0.5">Verified interstate permit trucks</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SEARCH DROP LOCATION (matching video at 00:28 - 00:33) */}
        {bookingStep === "SEARCH_DROP" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm space-y-2">
              {/* Pickup input (static from video: 7521869140 Buwapada Ambernath) */}
              <div className="flex items-center space-x-2 text-xs border-b pb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] font-bold text-slate-400">PICKUP: </span>
                  <span className="font-semibold text-slate-800">{pickupLocation}</span>
                </div>
              </div>

              {/* Drop input */}
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Where is your Drop? (Type Kalyan, Thane, Pune...)"
                  value={dropQuery}
                  onChange={e => setDropQuery(e.target.value)}
                  className="w-full text-xs font-semibold text-slate-800 outline-none bg-transparent placeholder-slate-400"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setDropQuery("Kalyan");
                  }}
                  className="p-1 hover:bg-slate-100 rounded text-slate-400"
                >
                  <Mic className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </div>

            {/* Quick Suggestions list (Matching video with Kalyan, Kalyan Station East, Kalyan West, etc.) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden max-h-72 overflow-y-auto">
              {filteredAreas.slice(0, 7).map((area, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedDrop(area);
                    setBookingStep("RECEIVER_DETAILS");
                  }}
                  className="w-full p-3 text-left hover:bg-blue-50 transition flex items-start space-x-2.5"
                >
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">{area.split(",")[0]}</div>
                    <div className="text-[11px] text-slate-500 truncate">{area}</div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setBookingStep("IDLE")}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              ← Back to Services
            </button>
          </div>
        )}

        {/* STEP 3: RECEIVER'S DETAILS & CONTACT (Matching video at 00:34 - 00:39) */}
        {bookingStep === "RECEIVER_DETAILS" && (
          <div className="space-y-4">
            {/* Map Preview Pin */}
            <div className="relative h-28 bg-slate-200 rounded-2xl overflow-hidden border border-slate-300 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
                <InteractiveMap pickup={pickupLocation} drop={selectedDrop} status="SEARCHING" />
              </div>
              <div className="absolute top-2 bg-white/95 px-3 py-1 rounded-full text-[11px] font-bold shadow text-slate-800 border">
                📍 Your goods will be dropped here
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                <div className="truncate">
                  <div className="font-extrabold text-slate-800">{selectedDrop.split(",")[0]}</div>
                  <div className="text-[10px] text-slate-500 truncate">{selectedDrop}</div>
                </div>
                <button onClick={() => setBookingStep("SEARCH_DROP")} className="text-blue-600 font-bold text-xs ml-2">
                  Change
                </button>
              </div>

              {/* Receiver Name */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  {t.receiverName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={receiverName}
                  onChange={e => setReceiverName(e.target.value)}
                  placeholder="Enter contact person name"
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:border-blue-600 outline-none"
                />
              </div>

              {/* Receiver Mobile */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  {t.receiverPhone} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={receiverPhone}
                  onChange={e => setReceiverPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:border-blue-600 outline-none"
                />
              </div>

              {/* Use My Mobile Number checkbox (video had 7521869140 prefilled) */}
              <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={useMyNumber}
                  onChange={e => {
                    setUseMyNumber(e.target.checked);
                    if (e.target.checked) setReceiverPhone("7521869140");
                  }}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <span>{t.useMyNumber} <strong>7521869140</strong></span>
              </label>

              {/* Save As (Home, Shop, Other) - exactly like video */}
              <div className="pt-2">
                <label className="text-[11px] font-bold text-slate-500 block mb-1.5">Save as (optional):</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Home", "Shop", "Other"] as const).map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setAddressTag(tag)}
                      className={`py-1.5 rounded-xl border text-xs font-bold transition ${
                        addressTag === tag ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600"
                      }`}
                    >
                      {tag === "Home" && "🏠 Home"}
                      {tag === "Shop" && "🏪 Shop"}
                      {tag === "Other" && "📍 Other"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goods Type description */}
              <div className="pt-1">
                <label className="text-[11px] font-bold text-slate-700 block mb-1">{t.goodsType}</label>
                <input
                  type="text"
                  value={goodsDescription}
                  onChange={e => setGoodsDescription(e.target.value)}
                  placeholder="e.g. Household shifting, Steel pipes, Boxes"
                  className="w-full border border-slate-200 rounded-xl p-2 text-xs outline-none"
                />
              </div>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-700 flex items-center space-x-2">
                <span>⚠️</span>
                <span>{formError}</span>
              </div>
            )}

            <button
              onClick={handleConfirmAndProceed}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-2xl font-black text-xs shadow-lg transition active:scale-98"
            >
              Confirm and Proceed →
            </button>
          </div>
        )}

        {/* STEP 4: SELECT VEHICLE (Matching video at 00:40 - 00:43 with prices and ₹200 SAVINGS!) */}
        {bookingStep === "SELECT_VEHICLE" && (
          <div className="space-y-3">
            {/* Route Summary Pill */}
            <div className="bg-white rounded-2xl p-2.5 px-3 border border-slate-200 shadow-sm flex items-center justify-between text-xs">
              <div className="truncate max-w-[80%]">
                <div className="font-bold text-slate-800 truncate">
                  {pickupLocation.split(",")[0]} → {selectedDrop.split(",")[0]}
                </div>
                <div className="text-[10px] text-slate-400">Maharashtra Logistics Route</div>
              </div>
              <button onClick={() => setBookingStep("RECEIVER_DETAILS")} className="text-blue-600 font-bold text-xs">
                Edit
              </button>
            </div>

            {/* Guarantee Highlight Banner */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-xl p-2.5 px-3 text-xs flex items-center justify-between shadow">
              <div className="flex items-center space-x-1.5">
                <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span className="font-extrabold">सुपर फास्ट स्पेशल रेट: गाड़ी के अनुसार भारी छूट!</span>
              </div>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded">
                100% SAVINGS
              </span>
            </div>

            {/* Vehicle List */}
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {VEHICLES_DATA.map(v => {
                const isSelected = selectedVehicleId === v.id;
                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicleId(v.id)}
                    className={`bg-white rounded-2xl p-3 border-2 transition cursor-pointer active:scale-98 relative ${
                      isSelected
                        ? "border-blue-600 shadow-md bg-blue-50/20"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {v.tag && (
                      <span className="absolute -top-2 right-4 bg-amber-400 text-slate-900 font-black text-[9px] px-2 py-0.2 rounded-full uppercase tracking-wider">
                        {v.tag}
                      </span>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-14 h-11 flex items-center justify-center">
                          <VehicleVisual type={v.iconType} size="sm" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-900">{v.name}</div>
                          <div className="text-[10px] text-slate-500 font-medium">
                            {v.capacity} • {v.dimensions} • {v.eta}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[170px]">{v.idealFor}</div>
                        </div>
                      </div>

                      {/* Pricing comparison */}
                      <div className="text-right flex-shrink-0">
                        <div className="text-[11px] text-slate-400 line-through">बाज़ार: ₹{v.marketPrice || v.porterPrice}</div>
                        <div className="text-sm font-black text-slate-900">₹{v.superFastPrice}</div>
                        <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                          बचत ₹{v.discount} ({v.discountPercent}% छूट)
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky proceed CTA */}
            <div className="pt-1">
              <button
                onClick={handleFinalBooking}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center space-x-2 transition active:scale-98"
              >
                <span>Proceed with {selectedVehicle.name.split(" ")[0]}</span>
                <span className="text-amber-300 font-black">• ₹{selectedVehicle.superFastPrice}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: LIVE ORDER TRACKING & MAP */}
        {bookingStep === "TRACKING" && currentTrackingRide && (
          <div className="space-y-3">
            {/* Live Map Component */}
            <InteractiveMap
              pickup={currentTrackingRide.pickupLocation}
              drop={currentTrackingRide.dropLocation}
              status={currentTrackingRide.status}
              vehicleType={currentTrackingRide.vehicle.iconType}
              vehicleNumber={currentTrackingRide.vehicleNumber}
            />

            {/* Driver & Trip Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    ORDER ID: {currentTrackingRide.orderNumber}
                  </div>
                  <div className="text-xs font-black text-slate-800">
                    {currentTrackingRide.status === "SEARCHING" && "Searching nearby Super Fast driver..."}
                    {currentTrackingRide.status === "ACCEPTED" && t.driverArriving}
                    {currentTrackingRide.status === "ARRIVED" && "Driver arrived at Deepak Nagar Ambernath"}
                    {currentTrackingRide.status === "IN_TRANSIT" && t.driverInTransit}
                    {currentTrackingRide.status === "COMPLETED" && t.driverDelivered}
                  </div>
                </div>

                {/* 4-Digit OTP (Highlighted for driver verification) */}
                <div className="text-center bg-amber-50 border border-amber-300 px-3 py-1.5 rounded-xl">
                  <div className="text-[9px] font-bold text-amber-800">DRIVER OTP</div>
                  <div className="text-base font-black text-slate-900 tracking-widest">{currentTrackingRide.otp}</div>
                </div>
              </div>

              {/* Driver info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow">
                    {currentTrackingRide.driverName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900">{currentTrackingRide.driverName}</div>
                    <div className="text-[11px] text-slate-600 font-semibold">
                      {currentTrackingRide.vehicle.name} • {currentTrackingRide.vehicleNumber}
                    </div>
                    <div className="text-[10px] text-amber-600 font-bold flex items-center space-x-0.5">
                      <span>★ 4.9 Rating</span>
                      <span className="text-slate-400">• 1,240 trips in Maharashtra</span>
                    </div>
                  </div>
                </div>

                {/* Call driver */}
                <button
                  onClick={() => setIsCallingModalOpen(true)}
                  className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-md active:scale-95 transition"
                  title="Call Driver"
                >
                  <Phone className="w-5 h-5" />
                </button>
              </div>

              {/* Price summary badge */}
              <div className="bg-slate-50 p-2.5 rounded-xl flex items-center justify-between text-xs border border-slate-200">
                <span className="text-slate-600">कुल किराया (बाज़ार से ₹{currentTrackingRide.savings} की बचत):</span>
                <span className="text-sm font-black text-slate-900">₹{currentTrackingRide.superFastPrice}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onOpenPartnerApp}
                className="bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs font-bold shadow flex items-center justify-center space-x-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Open Partner View</span>
              </button>
              <button
                onClick={() => {
                  onCancelRide(currentTrackingRide.id);
                  setBookingStep("IDLE");
                }}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 py-2.5 rounded-xl text-xs font-bold"
              >
                {t.cancelBooking}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar (5 tabs: Home, Orders, Rewards, Payments, Account) */}
      <div className="bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around select-none shadow-lg">
        {/* Home */}
        <button
          onClick={() => {
            setActiveTab("home");
            setBookingStep("IDLE");
          }}
          className={`flex flex-col items-center py-1 transition ${
            activeTab === "home" && bookingStep === "IDLE" ? "text-blue-600 font-bold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" stroke="none">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </div>
          <span className="text-[10px] mt-0.5">{t.home}</span>
        </button>

        {/* Orders */}
        <button
          onClick={() => {
            setActiveTab("orders");
            setBookingStep("IDLE");
          }}
          className={`flex flex-col items-center py-1 transition relative ${
            activeTab === "orders" ? "text-blue-600 font-bold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Package className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{t.orders}</span>
          {activeRides.length > 0 && (
            <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-blue-600" />
          )}
        </button>

        {/* Coins */}
        <button
          onClick={() => {
            setActiveTab("coins");
            setBookingStep("IDLE");
          }}
          className={`flex flex-col items-center py-1 transition ${
            activeTab === "coins" ? "text-blue-600 font-bold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Award className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{t.coins}</span>
        </button>

        {/* Payments */}
        <button
          onClick={() => {
            setActiveTab("payments");
            setBookingStep("IDLE");
          }}
          className={`flex flex-col items-center py-1 transition ${
            activeTab === "payments" ? "text-blue-600 font-bold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{t.payments}</span>
        </button>

        {/* Account */}
        <button
          onClick={() => {
            setActiveTab("account");
            setBookingStep("IDLE");
          }}
          className={`flex flex-col items-center py-1 transition ${
            activeTab === "account" ? "text-blue-600 font-bold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{t.account}</span>
        </button>
      </div>

      {/* In-app Voice Call Modal */}
      {currentTrackingRide && (
        <CallModal
          isOpen={isCallingModalOpen}
          onClose={() => setIsCallingModalOpen(false)}
          calleeName={currentTrackingRide.driverName}
          calleeRole="Driver"
          calleePhone={currentTrackingRide.driverPhone}
          vehicleNumber={currentTrackingRide.vehicleNumber}
        />
      )}
    </div>
  );
};
