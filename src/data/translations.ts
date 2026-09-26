export type Language = "hi" | "mr" | "en";

export interface TranslationsSchema {
  appName: string;
  partnerAppName: string;
  tagline: string;
  maharashtraBadge: string;
  pickupFrom: string;
  dropAt: string;
  trucks: string;
  twoWheeler: string;
  packersMovers: string;
  withinCity: string;
  outstation: string;
  porterGuaranteeTitle: string; // Kept for interface compatibility
  porterGuaranteeDesc: string; // Kept for interface compatibility
  guaranteeTitle: string;
  guaranteeDesc: string;
  selectVehicle: string;
  proceedWith: string;
  receiverDetails: string;
  receiverName: string;
  receiverPhone: string;
  useMyNumber: string;
  goodsType: string;
  fareBreakdown: string;
  porterMarketRate: string; // Kept for interface compatibility
  marketRate: string;
  superFastFare: string;
  youSave: string;
  cashOnDelivery: string;
  onlineUpi: string;
  confirmBooking: string;
  trackOrder: string;
  otpForDriver: string;
  driverArriving: string;
  driverInTransit: string;
  driverDelivered: string;
  callDriver: string;
  cancelBooking: string;
  home: string;
  orders: string;
  coins: string;
  payments: string;
  account: string;
  partnerTitle: string;
  goOnline: string;
  goOffline: string;
  onlineStatus: string;
  offlineStatus: string;
  todayEarnings: string;
  tripsCompleted: string;
  zeroCommission: string;
  incomingOrder: string;
  acceptOrder: string;
  rejectOrder: string;
  startTrip: string;
  enterOtp: string;
  verifyAndStart: string;
  completeDelivery: string;
  cashCollected: string;
  onboardingStep1: string;
  onboardingStep2: string;
  onboardingStep3: string;
  uploadAadhaar: string;
  uploadPan: string;
  uploadSelfie: string;
  uploadRc: string;
  uploadDl: string;
  submitPartner: string;
  partnerHelpDesk: string;
  phoneScreenSwitch: string;
}

export const translations: Record<Language, TranslationsSchema> = {
  hi: {
    appName: "Super Fast",
    partnerAppName: "Super Fast Partner",
    tagline: "महाराष्ट्र का अपना सबसे तेज़ व किफायती डिलीवरी और ट्रक बुकिंग नेटवर्क",
    maharashtraBadge: "ऑल महाराष्ट्र सर्विस: मुंबई, पुणे, नाशिक, नागपुर और 36 जिले",
    pickupFrom: "पिकअप लोकेशन (कहाँ से उठाना है)",
    dropAt: "कहाँ भेजना है? ड्रॉप लोकेशन",
    trucks: "ट्रक्स (Trucks)",
    twoWheeler: "2-व्हीलर (2 Wheeler)",
    packersMovers: "पैकर्स एंड मूवर्स (Packers)",
    withinCity: "शहर के अंदर (Within City)",
    outstation: "महाराष्ट्र इंटर-सिटी (Outstation)",
    porterGuaranteeTitle: "⚡ सुपर फास्ट गारंटी",
    porterGuaranteeDesc: "बड़ी गाड़ी पर अधिकतम ₹200 तक की छूट, और छोटी गाड़ियों पर उनके अनुसार कम-कम छूट!",
    guaranteeTitle: "⚡ सुपर फास्ट गारंटी",
    guaranteeDesc: "बड़ी गाड़ी पर अधिकतम ₹200 तक की छूट, और छोटी गाड़ियों पर उनके अनुसार कम-कम छूट!",
    selectVehicle: "गाड़ी चुनें (Select Vehicle)",
    proceedWith: "आगे बढ़ें",
    receiverDetails: "सामान लेने वाले की जानकारी",
    receiverName: "रिसीवर का नाम",
    receiverPhone: "रिसीवर का मोबाइल नंबर",
    useMyNumber: "मेरा नंबर इस्तेमाल करें: ",
    goodsType: "सामान का प्रकार (उदा. फर्नीचर, इलेक्ट्रॉनिक्स, बॉक्सेस)",
    fareBreakdown: "किराया विवरण (Fare Summary)",
    porterMarketRate: "सामान्य बाज़ार दर (Market Rate):",
    marketRate: "सामान्य बाज़ार दर (Market Rate):",
    superFastFare: "सुपर फास्ट स्पेशल रेट:",
    youSave: "आपकी कुल बचत:",
    cashOnDelivery: "डिलीवरी पर कैश दें (Cash on Delivery)",
    onlineUpi: "Google Pay / PhonePe / Paytm / UPI",
    confirmBooking: "बुकिंग कन्फर्म करें",
    trackOrder: "ऑर्डर लाइव ट्रैक करें",
    otpForDriver: "ड्राइवर को देने के लिए OTP:",
    driverArriving: "ड्राइवर पिकअप के लिए आ रहा है",
    driverInTransit: "सामान रास्ते में है (In Transit)",
    driverDelivered: "सामान सफलतापूर्वक डिलीवर हो गया!",
    callDriver: "ड्राइवर को कॉल करें",
    cancelBooking: "बुकिंग कैंसिल करें",
    home: "होम",
    orders: "ऑर्डर्स",
    coins: "रिवॉर्ड्स",
    payments: "वॉलेट",
    account: "अकाउंट",
    partnerTitle: "सुपर फास्ट पार्टनर (ड्राइवर ऐप)",
    goOnline: "ऑनलाइन हों (ड्यूटी शुरू)",
    goOffline: "ऑफलाइन हों (ड्यूटी बंद)",
    onlineStatus: "आप ऑनलाइन हैं - नए ऑर्डर्स आ रहे हैं",
    offlineStatus: "आप ऑफलाइन हैं - ऑर्डर्स पाने के लिए ड्यूटी ऑन करें",
    todayEarnings: "आज की कुल कमाई",
    tripsCompleted: "पूरी हुई ट्रिप्स",
    zeroCommission: "महाराष्ट्र ड्राइवर्स के लिए 0% कमीशन - 100% कमाई आपकी!",
    incomingOrder: "🚨 नया ऑर्डर आया है!",
    acceptOrder: "ऑर्डर स्वीकार करें (Accept)",
    rejectOrder: "अस्वीकार (Decline)",
    startTrip: "ट्रिप शुरू करें (Start)",
    enterOtp: "कस्टमर का 4-अंक OTP डालें:",
    verifyAndStart: "सत्यापित करें और निकलें",
    completeDelivery: "डिलीवरी पूरी करें (Collect ₹",
    cashCollected: "कैश प्राप्त हुआ - ट्रिप समाप्त",
    onboardingStep1: "1. मालिक की जानकारी (Owner)",
    onboardingStep2: "2. गाड़ी की जानकारी (Vehicle RC)",
    onboardingStep3: "3. ड्राइवर लाइसेंस (Driver DL)",
    uploadAadhaar: "आधार कार्ड अपलोड करें",
    uploadPan: "पैन कार्ड अपलोड करें",
    uploadSelfie: "ड्राइवर की सेल्फी लें",
    uploadRc: "वाहन RC बुक फोटो",
    uploadDl: "ड्राइविंग लाइसेंस फोटो",
    submitPartner: "पार्टनर रजिस्ट्रेशन सबमिट करें",
    partnerHelpDesk: "पार्टनर सहायता केंद्र (Help Desk)",
    phoneScreenSwitch: "फ़ोन होम स्क्रीन (Phone Switcher)"
  },
  mr: {
    appName: "Super Fast",
    partnerAppName: "Super Fast Partner",
    tagline: "महाराष्ट्राचे स्वतःचे सर्वात वेगवान आणि किफायतशीर डिलिव्हरी व ट्रक बुकिंग नेटवर्क",
    maharashtraBadge: "महाराष्ट्रभर सेवा: मुंबई, पुणे, नाशिक, नागपूर आणि 36 जिल्हे",
    pickupFrom: "पिकअप ठिकाण (कुठून घ्यायचे)",
    dropAt: "कुठे पाठवायचे? ड्रॉप ठिकाण",
    trucks: "ट्रक्स (Trucks)",
    twoWheeler: "2 चाकी (2 Wheeler)",
    packersMovers: "पॅकर्स अँड मूव्हर्स",
    withinCity: "शहरांतर्गत (Within City)",
    outstation: "महाराष्ट्र जिल्हा वाहतूक (Outstation)",
    porterGuaranteeTitle: "⚡ सुपर फास्ट गॅरंटी",
    porterGuaranteeDesc: "मोठ्या वाहनांवर कमाल ₹200 पर्यंत सूट आणि लहान वाहनांवर त्यानुसार योग्य बचत!",
    guaranteeTitle: "⚡ सुपर फास्ट गॅरंटी",
    guaranteeDesc: "मोठ्या वाहनांवर कमाल ₹200 पर्यंत सूट आणि लहान वाहनांवर त्यानुसार योग्य बचत!",
    selectVehicle: "वाहन निवडा (Select Vehicle)",
    proceedWith: "पुढे जा",
    receiverDetails: "प्राप्तकर्त्याचा तपशील",
    receiverName: "नाव",
    receiverPhone: "मोबाईल नंबर",
    useMyNumber: "माझा नंबर वापरा: ",
    goodsType: "मालाचा प्रकार (उदा. फर्निचर, बॉक्स, साहित्य)",
    fareBreakdown: "भाडे तपशील (Fare Summary)",
    porterMarketRate: "सर्वसाधारण बाजार भाव (Market Rate):",
    marketRate: "सर्वसाधारण बाजार भाव (Market Rate):",
    superFastFare: "सुपर फास्ट स्पेशल दर:",
    youSave: "तुमची एकूण बचत:",
    cashOnDelivery: "डिलिव्हरीवर रोख द्या",
    onlineUpi: "Google Pay / PhonePe / Paytm / UPI",
    confirmBooking: "बुकिंग निश्चित करा",
    trackOrder: "ऑर्डर थेट ट्रॅक करा",
    otpForDriver: "चालकासाठी OTP:",
    driverArriving: "चालक पिकअपसाठी येत आहे",
    driverInTransit: "माल मार्गावर आहे",
    driverDelivered: "माल सुरक्षित पोहोचवला गेला!",
    callDriver: "चालकाला कॉल करा",
    cancelBooking: "बुकिंग रद्द करा",
    home: "मुख्यपृष्ठ",
    orders: "ऑर्डर्स",
    coins: "रिवॉर्ड्स",
    payments: "वॉलेट",
    account: "खाते",
    partnerTitle: "सुपर फास्ट पार्टनर (चालक ॲप)",
    goOnline: "ऑनलाइन व्हा (ड्यूटी सुरू)",
    goOffline: "ऑफलाइन व्हा (ड्यूटी बंद)",
    onlineStatus: "तुम्ही ऑनलाइन आहात - नवीन ऑर्डर्स येत आहेत",
    offlineStatus: "तुम्ही ऑफलाइन आहात - ऑर्डर्स मिळवण्यासाठी ऑन करा",
    todayEarnings: "आजची एकूण कमाई",
    tripsCompleted: "पूर्ण केलेल्या फेऱ्या",
    zeroCommission: "महाराष्ट्रातील चालकांसाठी 0% कमिशन - 100% कमाई तुमची!",
    incomingOrder: "🚨 नवीन ऑर्डर आली आहे!",
    acceptOrder: "स्वीकारा (Accept)",
    rejectOrder: "नाकारा (Decline)",
    startTrip: "सुरू करा (Start Trip)",
    enterOtp: "ग्राहकाचा 4-अंकी OTP टाका:",
    verifyAndStart: "सत्यापित करा आणि निघा",
    completeDelivery: "डिलिव्हरी पूर्ण करा (रक्कम ₹",
    cashCollected: "पैसे मिळाले - फेरी पूर्ण",
    onboardingStep1: "1. मालकाचा तपशील",
    onboardingStep2: "2. वाहनाचा तपशील (RC)",
    onboardingStep3: "3. चालकाचा परवाना (DL)",
    uploadAadhaar: "आधार कार्ड अपलोड करा",
    uploadPan: "पॅन कार्ड अपलोड करा",
    uploadSelfie: "चालकाचा सेल्फी घ्या",
    uploadRc: "वाहन RC फोटो",
    uploadDl: "ड्रायव्हिंग लायसन्स फोटो",
    submitPartner: "नोंदणी पूर्ण करा",
    partnerHelpDesk: "पार्टनर मदत केंद्र (Help Desk)",
    phoneScreenSwitch: "फोन स्क्रीन स्विच करा"
  },
  en: {
    appName: "Super Fast",
    partnerAppName: "Super Fast Partner",
    tagline: "Maharashtra's leading on-demand delivery & truck booking platform",
    maharashtraBadge: "All Maharashtra Logistics: Mumbai, Pune, Nashik, Nagpur & all 36 Districts",
    pickupFrom: "Pick up location",
    dropAt: "Where is your drop location?",
    trucks: "Trucks",
    twoWheeler: "2 Wheeler",
    packersMovers: "Packers & Movers",
    withinCity: "Within City",
    outstation: "Maharashtra Outstation",
    porterGuaranteeTitle: "⚡ Super Fast Guarantee",
    porterGuaranteeDesc: "Up to ₹200 max discount on heavy trucks, with tiered lower savings for smaller vehicles!",
    guaranteeTitle: "⚡ Super Fast Guarantee",
    guaranteeDesc: "Up to ₹200 max discount on heavy trucks, with tiered lower savings for smaller vehicles!",
    selectVehicle: "Select Vehicle",
    proceedWith: "Proceed with",
    receiverDetails: "Receiver Details",
    receiverName: "Receiver's Name",
    receiverPhone: "Receiver's Mobile Number",
    useMyNumber: "Use my mobile number: ",
    goodsType: "Type of goods (e.g. Furniture, Electronics, Boxes)",
    fareBreakdown: "Fare Summary",
    porterMarketRate: "Standard Market Rate:",
    marketRate: "Standard Market Rate:",
    superFastFare: "Super Fast Special Fare:",
    youSave: "Total Savings:",
    cashOnDelivery: "Pay on Delivery (Cash)",
    onlineUpi: "UPI / Google Pay / PhonePe / Paytm",
    confirmBooking: "Confirm & Book Now",
    trackOrder: "Track Live Ride",
    otpForDriver: "Share this OTP with driver:",
    driverArriving: "Driver is arriving at pickup",
    driverInTransit: "Goods are in transit to destination",
    driverDelivered: "Goods successfully delivered!",
    callDriver: "Call Driver",
    cancelBooking: "Cancel Ride",
    home: "Home",
    orders: "Orders",
    coins: "Rewards",
    payments: "Wallet",
    account: "Account",
    partnerTitle: "Super Fast Partner (Driver & Fleet App)",
    goOnline: "Go Online (Start Duty)",
    goOffline: "Go Offline (Stop Duty)",
    onlineStatus: "You are Online - Looking for nearby trips",
    offlineStatus: "You are Offline - Turn on to receive orders",
    todayEarnings: "Today's Earnings",
    tripsCompleted: "Trips Completed",
    zeroCommission: "0% Platform Commission Launch Offer in Maharashtra - 100% earnings yours!",
    incomingOrder: "🚨 New Ride Request Alert!",
    acceptOrder: "Accept Order",
    rejectOrder: "Decline",
    startTrip: "Start Trip",
    enterOtp: "Enter customer's 4-digit OTP:",
    verifyAndStart: "Verify OTP & Start",
    completeDelivery: "Complete Delivery (Collect ₹",
    cashCollected: "Cash Collected - Ride Complete",
    onboardingStep1: "1. Owner Details",
    onboardingStep2: "2. Vehicle Details",
    onboardingStep3: "3. Driver Details",
    uploadAadhaar: "Upload Owner Aadhaar Card",
    uploadPan: "Upload Owner PAN Card",
    uploadSelfie: "Upload Driver Photo / Selfie",
    uploadRc: "Upload Vehicle RC Document",
    uploadDl: "Upload Driver's License (DL)",
    submitPartner: "Submit Partner Onboarding",
    partnerHelpDesk: "Partner Help Desk & Support",
    phoneScreenSwitch: "Phone Launcher View"
  }
};
