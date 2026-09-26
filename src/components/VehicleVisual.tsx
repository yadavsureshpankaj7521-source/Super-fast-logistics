import React from "react";

interface VehicleVisualProps {
  type: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const VehicleVisual: React.FC<VehicleVisualProps> = ({ type, className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "w-12 h-10",
    md: "w-20 h-14",
    lg: "w-28 h-20"
  }[size];

  switch (type) {
    case "3wheeler":
      return (
        <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
          {/* Custom SVG of Indian 3 Wheeler Auto Goods Carrier (Piaggio Ape style) */}
          <svg viewBox="0 0 100 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Cargo Box */}
            <rect x="2" y="16" width="54" height="28" rx="2" fill="#2563EB" />
            <rect x="5" y="19" width="48" height="12" rx="1" fill="#1D4ED8" />
            <line x1="2" y1="28" x2="56" y2="28" stroke="#1E40AF" strokeWidth="1.5" />
            <rect x="6" y="22" width="12" height="4" fill="#93C5FD" opacity="0.6" />
            <rect x="22" y="22" width="12" height="4" fill="#93C5FD" opacity="0.6" />
            <rect x="38" y="22" width="12" height="4" fill="#93C5FD" opacity="0.6" />
            
            {/* Cabin */}
            <path d="M56 22 L72 22 L86 36 L86 44 L56 44 Z" fill="#3B82F6" />
            {/* Windshield */}
            <path d="M68 25 L78 25 L84 34 L68 34 Z" fill="#DBEAFE" />
            <circle cx="83" cy="39" r="2" fill="#FBBF24" /> {/* Headlight */}
            <rect x="85" y="38" width="3" height="4" fill="#9CA3AF" /> {/* Bumper */}
            <line x1="56" y1="16" x2="56" y2="44" stroke="#1D4ED8" strokeWidth="2" />
            {/* Mudguard & Wheels */}
            <circle cx="20" cy="48" r="9" fill="#1F2937" />
            <circle cx="20" cy="48" r="4.5" fill="#E5E7EB" />
            <circle cx="76" cy="48" r="8" fill="#1F2937" />
            <circle cx="76" cy="48" r="4" fill="#E5E7EB" />
            {/* Super Fast Decal */}
            <text x="14" y="36" fill="#FFFFFF" fontSize="6" fontWeight="bold" fontFamily="sans-serif">SUPER FAST</text>
          </svg>
        </div>
      );

    case "tata_ace":
      return (
        <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
          {/* Tata Ace 'Chhota Hathi' mini truck */}
          <svg viewBox="0 0 100 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Cargo Deck */}
            <rect x="2" y="14" width="58" height="30" rx="3" fill="#0284C7" />
            <line x1="2" y1="28" x2="60" y2="28" stroke="#0369A1" strokeWidth="2" />
            <line x1="20" y1="14" x2="20" y2="44" stroke="#0369A1" strokeWidth="1.5" />
            <line x1="40" y1="14" x2="40" y2="44" stroke="#0369A1" strokeWidth="1.5" />
            <rect x="6" y="18" width="48" height="6" fill="#BAE6FD" opacity="0.4" />

            {/* Cabin */}
            <path d="M60 12 L78 12 L92 30 L92 44 L60 44 Z" fill="#0284C7" />
            {/* Windshield & Side Window */}
            <path d="M63 16 L74 16 L74 29 L63 29 Z" fill="#E0F2FE" />
            <path d="M77 16 L88 30 L77 30 Z" fill="#E0F2FE" />
            <circle cx="90" cy="38" r="2.5" fill="#FDE047" /> {/* Headlight */}
            <rect x="91" y="39" width="3" height="4" fill="#374151" /> {/* Front Bumper */}
            
            {/* Wheels */}
            <circle cx="22" cy="48" r="9.5" fill="#111827" />
            <circle cx="22" cy="48" r="4.5" fill="#9CA3AF" />
            <circle cx="78" cy="48" r="9.5" fill="#111827" />
            <circle cx="78" cy="48" r="4.5" fill="#9CA3AF" />
            {/* Brand Logo text */}
            <text x="12" y="24" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">TATA ACE</text>
            <text x="14" y="38" fill="#FDE047" fontSize="5" fontWeight="bold">₹200 OFF</text>
          </svg>
        </div>
      );

    case "pickup":
      return (
        <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
          {/* Bolero 8ft Pickup Truck */}
          <svg viewBox="0 0 100 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Pickup Bed */}
            <rect x="2" y="18" width="56" height="26" rx="2" fill="#0D9488" />
            <line x1="2" y1="22" x2="58" y2="22" stroke="#115E59" strokeWidth="2" />
            <rect x="6" y="25" width="46" height="15" fill="#CCFBF1" opacity="0.3" />
            {/* Cabin */}
            <path d="M58 12 L76 12 L86 24 L94 28 L94 44 L58 44 Z" fill="#0F766E" />
            <path d="M62 16 L74 16 L74 27 L62 27 Z" fill="#F0FDFA" />
            <path d="M77 16 L84 25 L77 25 Z" fill="#F0FDFA" />
            <circle cx="92" cy="36" r="2.5" fill="#FEF08A" />
            <rect x="93" y="38" width="4" height="5" fill="#1F2937" />
            {/* Wheels */}
            <circle cx="24" cy="48" r="10" fill="#111827" />
            <circle cx="24" cy="48" r="5" fill="#CBD5E1" />
            <circle cx="80" cy="48" r="10" fill="#111827" />
            <circle cx="80" cy="48" r="5" fill="#CBD5E1" />
            <text x="12" y="34" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">PICKUP 8FT</text>
          </svg>
        </div>
      );

    case "tata_407":
    case "truck_large":
      return (
        <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
          {/* Tata 407 / Eicher Large Truck */}
          <svg viewBox="0 0 100 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Container Body */}
            <rect x="2" y="8" width="62" height="36" rx="3" fill="#4338CA" />
            <line x1="15" y1="8" x2="15" y2="44" stroke="#3730A3" strokeWidth="1.5" />
            <line x1="30" y1="8" x2="30" y2="44" stroke="#3730A3" strokeWidth="1.5" />
            <line x1="45" y1="8" x2="45" y2="44" stroke="#3730A3" strokeWidth="1.5" />
            <rect x="6" y="14" width="52" height="12" fill="#E0E7FF" opacity="0.25" />
            {/* Truck Cabin */}
            <path d="M64 12 L82 12 L92 24 L94 44 L64 44 Z" fill="#4F46E5" />
            <path d="M68 16 L80 16 L80 28 L68 28 Z" fill="#EEF2FF" />
            <path d="M83 16 L90 26 L83 26 Z" fill="#EEF2FF" />
            <circle cx="92" cy="36" r="2.5" fill="#FBBF24" />
            <rect x="93" y="38" width="4" height="6" fill="#1E1B4B" />
            {/* Wheels */}
            <circle cx="20" cy="48" r="10" fill="#0F172A" />
            <circle cx="20" cy="48" r="5" fill="#94A3B8" />
            <circle cx="38" cy="48" r="10" fill="#0F172A" />
            <circle cx="38" cy="48" r="5" fill="#94A3B8" />
            <circle cx="80" cy="48" r="10" fill="#0F172A" />
            <circle cx="80" cy="48" r="5" fill="#94A3B8" />
            <text x="10" y="24" fill="#FFFFFF" fontSize="6.5" fontWeight="bold">SUPER FAST</text>
            <text x="14" y="34" fill="#A5B4FC" fontSize="5">MAHARASHTRA</text>
          </svg>
        </div>
      );

    case "scooter":
    case "bike":
      return (
        <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
          {/* 2 Wheeler Scooter with Delivery Box */}
          <svg viewBox="0 0 100 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Delivery Box at Rear */}
            <rect x="12" y="16" width="24" height="22" rx="3" fill="#2563EB" />
            <rect x="15" y="19" width="18" height="8" rx="1" fill="#60A5FA" />
            <text x="16" y="25" fill="#FFFFFF" fontSize="5" fontWeight="bold">SF</text>
            
            {/* Scooter Frame */}
            <path d="M28 38 L45 38 L52 26 L65 24 L70 38 L58 42 L34 42 Z" fill="#DC2626" />
            {/* Handlebar & Windshield */}
            <line x1="65" y1="24" x2="68" y2="14" stroke="#4B5563" strokeWidth="2.5" />
            <circle cx="68" cy="14" r="2.5" fill="#1F2937" />
            <circle cx="72" cy="24" r="2.5" fill="#FBBF24" /> {/* Headlight */}
            
            {/* Seat */}
            <path d="M30 30 Q40 28 48 30 L46 36 L30 36 Z" fill="#1F2937" />
            
            {/* Wheels */}
            <circle cx="24" cy="48" r="8" fill="#111827" />
            <circle cx="24" cy="48" r="3.5" fill="#E5E7EB" />
            <circle cx="68" cy="48" r="8" fill="#111827" />
            <circle cx="68" cy="48" r="3.5" fill="#E5E7EB" />
            <text x="14" y="34" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">EXPRESS</text>
          </svg>
        </div>
      );

    case "packers_truck":
    default:
      return (
        <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
          {/* Packers & Movers large truck with furniture icons */}
          <svg viewBox="0 0 100 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            <rect x="2" y="8" width="60" height="36" rx="2" fill="#D97706" />
            <line x1="2" y1="26" x2="62" y2="26" stroke="#B45309" strokeWidth="1.5" />
            {/* House / Sofa icon decal */}
            <path d="M12 20 L22 12 L32 20 L30 20 L30 25 L14 25 L14 20 Z" fill="#FEF3C7" />
            <path d="M62 14 L78 14 L88 26 L90 44 L62 44 Z" fill="#F59E0B" />
            <path d="M66 18 L76 18 L76 28 L66 28 Z" fill="#FEF3C7" />
            <circle cx="88" cy="36" r="2.5" fill="#FEF08A" />
            <circle cx="22" cy="48" r="9.5" fill="#18181B" />
            <circle cx="22" cy="48" r="4.5" fill="#D4D4D8" />
            <circle cx="76" cy="48" r="9.5" fill="#18181B" />
            <circle cx="76" cy="48" r="4.5" fill="#D4D4D8" />
            <text x="8" y="34" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">PACKERS & MOVERS</text>
          </svg>
        </div>
      );
  }
};
