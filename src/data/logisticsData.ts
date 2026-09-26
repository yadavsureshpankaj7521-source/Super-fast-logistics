// Super Fast Logistics & Fleet Network Data - Maharashtra
// Ultra-Premium Logistics Engine

export interface CityHub {
  id: string;
  name: string;
  marathiName: string;
  district: string;
  popularPickupPoints: string[];
  pincodeSample: string;
}

export const MAHARASHTRA_HUBS: CityHub[] = [
  {
    id: "ambernath",
    name: "Ambernath",
    marathiName: "अंबरनाथ",
    district: "Thane",
    popularPickupPoints: [
      "Buwapada, Deepak Nagar",
      "Ambernath MIDC East",
      "Morivali MIDC",
      "Kailash Nagar, Ambernath West",
      "Shiv Mandir Road",
      "Station Road, Ambernath East"
    ],
    pincodeSample: "421501"
  },
  {
    id: "kalyan",
    name: "Kalyan",
    marathiName: "कल्याण",
    district: "Thane",
    popularPickupPoints: [
      "Kalyan Station East (APMC Market)",
      "Khadakpada, Kalyan West",
      "Patri Pul, Kalyan",
      "Gandhar Nagar, Kalyan West",
      "Kolsewadi, Kalyan East"
    ],
    pincodeSample: "421301"
  },
  {
    id: "ulhasnagar",
    name: "Ulhasnagar",
    marathiName: "उल्हासनगर",
    district: "Thane",
    popularPickupPoints: [
      "Ulhasnagar Camp 3 (Cloth Market)",
      "Camp 4, Gol Maidan",
      "Camp 1 Furniture Market",
      "Camp 5 Subhash Nagar"
    ],
    pincodeSample: "421003"
  },
  {
    id: "thane",
    name: "Thane",
    marathiName: "ठाणे",
    district: "Thane",
    popularPickupPoints: [
      "Wagle Industrial Estate MIDC",
      "Majiwada Junction",
      "Ghopbunder Road, Kasarvadavali",
      "Naupada / Station Area",
      "Kolshet Road"
    ],
    pincodeSample: "400604"
  },
  {
    id: "mumbai",
    name: "Mumbai",
    marathiName: "मुंबई",
    district: "Mumbai Suburban",
    popularPickupPoints: [
      "Bandra Kurla Complex (BKC)",
      "Andheri MIDC / Sakinaka",
      "Dadar TT Circle / Market",
      "Vashi APMC Market (Navi Mumbai)",
      "Crawford Market / Masjid Bunder",
      "Kurla West Industrial Estate"
    ],
    pincodeSample: "400051"
  },
  {
    id: "navi_mumbai",
    name: "Navi Mumbai",
    marathiName: "नवी मुंबई",
    district: "Thane",
    popularPickupPoints: [
      "Vashi APMC Fruit & Grain Market",
      "Taloja MIDC",
      "Turbhe MIDC Truck Terminal",
      "Mahape Millennium Business Park",
      "Panvel New Station"
    ],
    pincodeSample: "400705"
  },
  {
    id: "bhiwandi",
    name: "Bhiwandi Logistics Hub",
    marathiName: "भिवंडी लॉजिस्टिक्स हब",
    district: "Thane",
    popularPickupPoints: [
      "Mankoli Naka Warehouse Cluster",
      "Dapoda Road Logistics Park",
      "Sonale Godown Complex",
      "Bhilare Industrial Zone"
    ],
    pincodeSample: "421302"
  },
  {
    id: "pune",
    name: "Pune",
    marathiName: "पुणे",
    district: "Pune",
    popularPickupPoints: [
      "Bhosari MIDC Industrial Area",
      "Chakan Auto Cluster",
      "Hadapsar Industrial Estate",
      "Hinjawadi IT Phase 1-3",
      "Market Yard, Gultekdi"
    ],
    pincodeSample: "411026"
  },
  {
    id: "nashik",
    name: "Nashik",
    marathiName: "नाशिक",
    district: "Nashik",
    popularPickupPoints: [
      "Ambad MIDC Area",
      "Satpur MIDC Estate",
      "Dwarka Circle",
      "Nashik Road Station"
    ],
    pincodeSample: "422010"
  },
  {
    id: "nagpur",
    name: "Nagpur",
    marathiName: "नागपूर",
    district: "Nagpur",
    popularPickupPoints: [
      "Butibori Industrial Area",
      "Hingna MIDC",
      "Kalamna Market Yard",
      "MIHAN SEZ Logistics"
    ],
    pincodeSample: "440028"
  },
  {
    id: "aurangabad",
    name: "Chhatrapati Sambhaji Nagar",
    marathiName: "छत्रपती संभाजीनगर",
    district: "Chhatrapati Sambhaji Nagar",
    popularPickupPoints: [
      "Waluj MIDC Industrial Area",
      "Shendra DMIC Area",
      "Chikalthana MIDC",
      "Jalna Road Transport Nagar"
    ],
    pincodeSample: "431136"
  },
  {
    id: "kolhapur",
    name: "Kolhapur",
    marathiName: "कोल्हापूर",
    district: "Kolhapur",
    popularPickupPoints: [
      "Shiroli MIDC",
      "Gokul Shirgaon MIDC",
      "Shahupuri Market Yard",
      "Laxmipuri"
    ],
    pincodeSample: "416122"
  },
  {
    id: "solapur",
    name: "Solapur",
    marathiName: "सोलापूर",
    district: "Solapur",
    popularPickupPoints: [
      "Chincholi MIDC",
      "Hotgi Road Industrial Area",
      "Akkalkot Road Textile Market"
    ],
    pincodeSample: "413006"
  },
  {
    id: "amravati",
    name: "Amravati",
    marathiName: "अमरावती",
    district: "Amravati",
    popularPickupPoints: [
      "Nandgaon Peth Textile Park",
      "Badnera Station Road",
      "Rajapeth Bus Terminal"
    ],
    pincodeSample: "444601"
  }
];

export const MAHARASHTRA_CITIES = [
  {
    city: "Ambernath",
    marathiName: "अंबरनाथ",
    popularAreas: ["Buwapada, Deepak Nagar", "Ambernath MIDC East", "Morivali MIDC", "Kailash Nagar", "Shiv Mandir Road", "Station East"]
  },
  {
    city: "Kalyan",
    marathiName: "कल्याण",
    popularAreas: ["Kalyan Station East", "Khadakpada", "Patri Pul", "Gandhar Nagar", "Kolsewadi", "APMC Market Kalyan"]
  },
  {
    city: "Ulhasnagar",
    marathiName: "उल्हासनगर",
    popularAreas: ["Camp 3 Cloth Market", "Gol Maidan Camp 4", "Furniture Bazaar Camp 1", "Subhash Nagar Camp 5"]
  },
  {
    city: "Thane",
    marathiName: "ठाणे",
    popularAreas: ["Wagle Estate MIDC", "Majiwada Junction", "Ghodbunder Road", "Naupada Station", "Kolshet Road"]
  },
  {
    city: "Mumbai",
    marathiName: "मुंबई",
    popularAreas: ["Bandra Kurla Complex (BKC)", "Andheri East MIDC", "Dadar TT Circle", "Vashi APMC", "Crawford Market"]
  },
  {
    city: "Pune",
    marathiName: "पुणे",
    popularAreas: ["Bhosari MIDC", "Chakan Auto Cluster", "Hinjawadi IT Park", "Hadapsar Industrial", "Market Yard Gultekdi"]
  },
  {
    city: "Nashik",
    marathiName: "नाशिक",
    popularAreas: ["Ambad MIDC", "Satpur Industrial Area", "Dwarka Circle", "Nashik Road Station"]
  },
  {
    city: "Nagpur",
    marathiName: "नागपूर",
    popularAreas: ["Butibori MIDC", "Hingna Industrial", "Kalamna Market Yard", "MIHAN Logistics"]
  },
  {
    city: "Chhatrapati Sambhaji Nagar",
    marathiName: "छत्रपती संभाजीनगर",
    popularAreas: ["Waluj MIDC", "Shendra DMIC", "Chikalthana MIDC", "Transport Nagar"]
  }
];

export interface VehicleType {
  id: string;
  name: string;
  category: "truck" | "2wheeler" | "packers";
  capacity: string;
  dimensions: string;
  eta: string;
  marketPrice: number; // Regular standard market rate
  porterPrice: number; // Kept as alias for marketPrice to ensure zero build errors
  superFastPrice: number; // Discounted Super Fast customer fare
  discount: number; // Vehicle-proportional custom discount
  discountPercent: number; // Savings percentage
  tag?: string;
  isPopular?: boolean;
  idealFor: string;
  iconType: "3wheeler" | "tata_ace" | "pickup" | "tata_407" | "truck_large" | "scooter" | "bike" | "packers_truck";
}

// Vehicle-based discounts: Capped at maximum ₹200 on big vehicles, scaled down for smaller vehicles
export const VEHICLES_DATA: VehicleType[] = [
  {
    id: "3wheeler",
    name: "3 Wheeler (Piaggio / Bajaj / Champion)",
    category: "truck",
    capacity: "500 kg",
    dimensions: "5.5 x 4.5 ft",
    eta: "4-7 mins",
    marketPrice: 399,
    porterPrice: 399,
    superFastPrice: 339,
    discount: 60,
    discountPercent: 15,
    tag: "QUICK CITY TRIPS",
    isPopular: false,
    idealFor: "Small furniture, retail cartons, appliances, market goods",
    iconType: "3wheeler"
  },
  {
    id: "tata_ace",
    name: "Tata Ace (Chhota Hathi - Chota Truck)",
    category: "truck",
    capacity: "750 kg",
    dimensions: "7 x 4.5 ft",
    eta: "3-5 mins",
    marketPrice: 580,
    porterPrice: 580,
    superFastPrice: 480,
    discount: 100, // ₹100 discount for Chota Truck!
    discountPercent: 17,
    tag: "MOST POPULAR TRUCK",
    isPopular: true,
    idealFor: "Plywood, industrial goods, shop inventory, 1 room shifting",
    iconType: "tata_ace"
  },
  {
    id: "pickup_8ft_1ton",
    name: "8ft 1 Ton (Bolero Pickup)",
    category: "truck",
    capacity: "1000 kg",
    dimensions: "8 x 5 ft",
    eta: "5-8 mins",
    marketPrice: 890,
    porterPrice: 890,
    superFastPrice: 750,
    discount: 140, // Scaled discount for 1 ton pickup
    discountPercent: 16,
    tag: "BEST FOR HEAVY CARGO",
    idealFor: "Steel pipes, heavy cartons, tiles, ceramic, timber",
    iconType: "pickup"
  },
  {
    id: "pickup_8ft",
    name: "8ft Pickup (Flatbed)",
    category: "truck",
    capacity: "1250 kg",
    dimensions: "8.5 x 5.2 ft",
    eta: "8-10 mins",
    marketPrice: 980,
    porterPrice: 980,
    superFastPrice: 820,
    discount: 160,
    discountPercent: 16,
    idealFor: "Heavy machinery, agricultural produce, drums, industrial goods",
    iconType: "pickup"
  },
  {
    id: "pickup_9ft",
    name: "Pickup 9ft (Large Deck)",
    category: "truck",
    capacity: "1700 kg",
    dimensions: "9 x 5.5 ft",
    eta: "10-12 mins",
    marketPrice: 1150,
    porterPrice: 1150,
    superFastPrice: 970,
    discount: 180,
    discountPercent: 16,
    idealFor: "Factory dispatch, glass panels, long pipes, scaffolding",
    iconType: "pickup"
  },
  {
    id: "tata_407",
    name: "Tata 407 (Open / Closed Container)",
    category: "truck",
    capacity: "2500 kg",
    dimensions: "10 x 6 ft",
    eta: "12-15 mins",
    marketPrice: 2100,
    porterPrice: 2100,
    superFastPrice: 1900,
    discount: 200, // Maximum ₹200 discount on big vehicles!
    discountPercent: 10,
    tag: "COMMERCIAL LOADS",
    idealFor: "Warehouse transfers, 2-3 BHK home shifting, factory parts",
    iconType: "tata_407"
  },
  {
    id: "truck_14ft",
    name: "14ft Eicher Truck",
    category: "truck",
    capacity: "3500 kg",
    dimensions: "14 x 6.5 ft",
    eta: "15-20 mins",
    marketPrice: 2800,
    porterPrice: 2800,
    superFastPrice: 2600,
    discount: 200, // Maximum ₹200 discount
    discountPercent: 7,
    idealFor: "B2B inter-city transport across Maharashtra",
    iconType: "truck_large"
  },
  {
    id: "truck_17ft",
    name: "17ft Multi-Axle Truck",
    category: "truck",
    capacity: "4500 kg",
    dimensions: "17 x 7 ft",
    eta: "20-25 mins",
    marketPrice: 3500,
    porterPrice: 3500,
    superFastPrice: 3300,
    discount: 200, // Maximum ₹200 discount
    discountPercent: 6,
    idealFor: "Heavy commercial consignments & bulk textile shipments",
    iconType: "truck_large"
  },
  {
    id: "bike_delivery",
    name: "2 Wheeler Bike (Instant Courier)",
    category: "2wheeler",
    capacity: "20 kg",
    dimensions: "Delivery Carrier / Bag",
    eta: "1-2 mins",
    marketPrice: 89,
    porterPrice: 89,
    superFastPrice: 69,
    discount: 20, // Scaled down ₹20 discount for small bike ride
    discountPercent: 22,
    tag: "SUPER SAVER",
    isPopular: true,
    idealFor: "Small packets, food, documents, keys, medicines",
    iconType: "bike"
  },
  {
    id: "scooter_delivery",
    name: "Super Fast Scooter (Express Parcel)",
    category: "2wheeler",
    capacity: "25 kg",
    dimensions: "Footboard & Carrier",
    eta: "2-4 mins",
    marketPrice: 119,
    porterPrice: 119,
    superFastPrice: 89,
    discount: 30, // Scaled down ₹30 discount for scooter delivery
    discountPercent: 25,
    tag: "EXPRESS DELIVERY",
    idealFor: "Urgent boxes, tiffins, courier parcels, spare parts",
    iconType: "scooter"
  },
  {
    id: "packers_movers_1bhk",
    name: "Packers & Movers (1 BHK / Room)",
    category: "packers",
    capacity: "Full Household Shift",
    dimensions: "Dedicated Crew + Truck",
    eta: "Same Day / Scheduled",
    marketPrice: 4200,
    porterPrice: 4200,
    superFastPrice: 4000,
    discount: 200, // Maximum ₹200 discount
    discountPercent: 5,
    tag: "COMPLETE PACK & MOVE",
    idealFor: "Packing, bubble wrap, loading, unloading & transport across Maharashtra",
    iconType: "packers_truck"
  }
];

export interface ActiveRide {
  id: string;
  orderNumber: string;
  vehicle: VehicleType;
  pickupLocation: string;
  dropLocation: string;
  receiverName: string;
  receiverPhone: string;
  senderPhone: string;
  goodsType: string;
  marketPrice: number;
  porterPrice?: number; // Alias to prevent build error
  superFastPrice: number;
  savings: number;
  paymentMethod: "CASH" | "UPI" | "WALLET";
  status: "SEARCHING" | "ACCEPTED" | "ARRIVED" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED";
  otp: string;
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  driverRating: number;
  driverPhotoUrl: string;
  timestamp: string;
}
