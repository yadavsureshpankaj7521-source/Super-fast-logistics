import React, { useState } from "react";
import { Download, Smartphone, Truck, ShieldCheck, X, CheckCircle, ExternalLink, ArrowRight, Sparkles } from "lucide-react";

interface InstallAppsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectApp: (app: "CUSTOMER" | "PARTNER") => void;
  currentApp: "CUSTOMER" | "PARTNER" | "PHONE_LAUNCHER" | "SPLIT_VIEW";
}

export const InstallAppsModal: React.FC<InstallAppsModalProps> = ({
  isOpen,
  onClose,
  onSelectApp,
  currentApp
}) => {
  const [activeTab, setActiveTab] = useState<"BOTH" | "CUSTOMER" | "PARTNER">("BOTH");
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyLink = (url: string, key: string) => {
    navigator.clipboard?.writeText?.(url);
    setCopiedLink(key);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const customerAppUrl = typeof window !== "undefined"
    ? `${window.location.origin}${window.location.pathname}?app=customer`
    : "";

  const partnerAppUrl = typeof window !== "undefined"
    ? `${window.location.origin}${window.location.pathname}?app=partner`
    : "";

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200 select-none">
      <div className="bg-slate-900 border-2 border-blue-500/80 rounded-[32px] max-w-lg w-full shadow-2xl overflow-hidden flex flex-col text-white max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-xl shadow-lg">
              📲
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-white tracking-tight">
                दोनों ऐप अलग-अलग इंस्टॉल करें
              </h3>
              <p className="text-xs text-blue-300">
                अपने मोबाइल स्क्रीन पर 2 अलग-अलग ऐप रखें (जैसा आपके वीडियो में है)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="p-2 bg-slate-950 flex border-b border-slate-800">
          <button
            onClick={() => setActiveTab("BOTH")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === "BOTH" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            📱 दोनों ऐप एक साथ
          </button>
          <button
            onClick={() => setActiveTab("CUSTOMER")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === "CUSTOMER" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            📦 App 1 (कस्टमर)
          </button>
          <button
            onClick={() => setActiveTab("PARTNER")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === "PARTNER" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            🚛 App 2 (ड्राइवर पार्टनर)
          </button>
        </div>

        {/* Body content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          {/* Phone wallpaper preview simulation */}
          <div className="bg-slate-950 rounded-2xl p-3 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📱</span>
              <div>
                <div className="font-extrabold text-white text-xs">फोन होम स्क्रीन पर 2 ऐप्स</div>
                <div className="text-[11px] text-slate-400">
                  आपके वीडियो की तरह 2 अलग-अलग ऐप आइकॉन बनेंगे:
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-md">
                  SF
                </div>
                <span className="text-[9px] text-slate-300 mt-1">Super Fast</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-2xl bg-indigo-700 flex items-center justify-center text-amber-300 font-black text-xs shadow-md border border-amber-300/40">
                  SFP
                </div>
                <span className="text-[9px] text-amber-300 mt-1 font-bold">Partner</span>
              </div>
            </div>
          </div>

          {/* APP 1: CUSTOMER APP BOX */}
          {(activeTab === "BOTH" || activeTab === "CUSTOMER") && (
            <div className="bg-gradient-to-br from-blue-950/60 to-slate-900 border-2 border-blue-500/60 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-white text-sm shadow-md">
                    SF
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-black text-sm text-white">1. Super Fast (Customer App)</span>
                      <span className="bg-blue-600/60 text-blue-200 text-[10px] font-bold px-1.5 py-0.2 rounded">
                        App 1
                      </span>
                    </div>
                    <p className="text-[11px] text-blue-300">
                      गाड़ी, छोटा हाथी व 2-व्हीलर बुक करने के लिए (₹200 तक की बचत)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/90 rounded-xl p-3 border border-blue-500/30 space-y-1.5 text-slate-300">
                <div className="font-bold text-white flex items-center space-x-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>फोन में इंस्टॉल करने का तरीका:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300 pl-1">
                  <li>नीचे दिए <strong>"App 1 खोलें"</strong> बटन को दबाएं।</li>
                  <li>अपने मोबाइल के Chrome ब्राउज़र में ऊपर 3-बिंदु <strong>(⋮)</strong> पर क्लिक करें।</li>
                  <li><strong>"Add to Home screen"</strong> या <strong>"Install app"</strong> चुनें।</li>
                </ol>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={() => {
                    onSelectApp("CUSTOMER");
                    onClose();
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-md active:scale-97 transition"
                >
                  <Truck className="w-4 h-4" />
                  <span>App 1 खोलें व इंस्टॉल करें →</span>
                </button>
                <button
                  onClick={() => handleCopyLink(customerAppUrl, "cust")}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2.5 rounded-xl text-xs font-bold border border-slate-700"
                  title="Copy App 1 Direct Link"
                >
                  {copiedLink === "cust" ? "✓ लिंक कॉपी!" : "🔗 लिंक कॉपी"}
                </button>
              </div>
            </div>
          )}

          {/* APP 2: PARTNER DRIVER APP BOX */}
          {(activeTab === "BOTH" || activeTab === "PARTNER") && (
            <div className="bg-gradient-to-br from-indigo-950/70 to-slate-900 border-2 border-indigo-500/60 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center font-black text-amber-300 text-sm shadow-md border border-amber-300/30">
                    SFP
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-black text-sm text-white">2. Super Fast Partner (Driver App)</span>
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded">
                        App 2
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-200">
                      ड्राइवर ड्यूटी ऑन करने व 100% बिना कमीशन कमाई के लिए
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/90 rounded-xl p-3 border border-indigo-500/30 space-y-1.5 text-slate-300">
                <div className="font-bold text-white flex items-center space-x-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>पार्टनर ऐप को अलग से इंस्टॉल करने का तरीका:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300 pl-1">
                  <li>नीचे दिए <strong>"App 2 पार्टनर ऐप खोलें"</strong> बटन को दबाएं।</li>
                  <li>Chrome मेनू में ऊपर 3-बिंदु <strong>(⋮)</strong> दबाएं।</li>
                  <li><strong>"Add to Home screen"</strong> पर क्लिक करें। इसका नाम "SF Partner" आएगा।</li>
                </ol>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={() => {
                    onSelectApp("PARTNER");
                    onClose();
                  }}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-md active:scale-97 transition"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>App 2 पार्टनर ऐप खोलें व इंस्टॉल करें →</span>
                </button>
                <button
                  onClick={() => handleCopyLink(partnerAppUrl, "part")}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2.5 rounded-xl text-xs font-bold border border-slate-700"
                  title="Copy App 2 Direct Link"
                >
                  {copiedLink === "part" ? "✓ लिंक कॉपी!" : "🔗 लिंक कॉपी"}
                </button>
              </div>
            </div>
          )}

          {/* Android / iPhone Direct Step Guidance */}
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="font-bold text-slate-300 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>खास बात (Important):</span>
            </div>
            <p>
              दोनों ऐप्स का अलग-अलग वेब एड्रेस है (<code>?app=customer</code> और <code>?app=partner</code>)। दोनों को एक बार <strong>"Add to Home screen"</strong> करने के बाद, आपके फोन पर दो स्वतंत्र ऐप्स बन जाएंगे और आप जब चाहें किसी भी ऐप को सीधे ओपन कर सकते हैं!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs transition"
          >
            समझ गया, बंद करें (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
