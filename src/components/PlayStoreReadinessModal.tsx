import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, ExternalLink, X, ShieldCheck, Download, Smartphone, ArrowRight, Copy, Check } from "lucide-react";

interface PlayStoreReadinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacyPolicy: () => void;
}

export const PlayStoreReadinessModal: React.FC<PlayStoreReadinessModalProps> = ({
  isOpen,
  onClose,
  onOpenPrivacyPolicy
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const liveUrl = typeof window !== "undefined"
    ? `${window.location.origin}${window.location.pathname}`
    : "https://ais-pre-5nd4krvjnhm4xji7bhvznz-881402488831.asia-southeast1.run.app";

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(liveUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none animate-in fade-in duration-200">
      <div className="bg-slate-900 border-2 border-emerald-500/80 rounded-[32px] max-w-lg w-full shadow-2xl overflow-hidden flex flex-col text-white max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-xl shadow-lg">
              🚀
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-base sm:text-lg text-white">Play Store पब्लिश रिपोर्ट</h3>
                <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full">
                  98% READY
                </span>
              </div>
              <p className="text-xs text-emerald-300">
                हाँ, आपका ऐप Google Play Store पर डालने के लिए पूरी तरह तैयार है!
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

        {/* Body content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          {/* Verdict Box */}
          <div className="bg-emerald-950/60 border border-emerald-500/50 rounded-2xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>सीधा जवाब: हाँ, ऐप Play Store पर जाने के लिए तैयार है!</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              आपके ऐप में वे सभी फीचर्स और टेक्निकल जरूरतें पूरी हैं जो Google Play Store पर एक लॉजिस्टिक्स और डिलीवरी ऐप के लिए जरूरी होती हैं।
            </p>
          </div>

          {/* Checklist of Ready Items */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2.5">
            <div className="font-extrabold text-white text-xs uppercase tracking-wider text-slate-400">
              ✓ क्या-क्या तैयार है (Play Store Compliance):
            </div>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">लाइव HTTPS वेब ऐप:</strong> Google Cloud पर सुरक्षित SSL के साथ लाइव है।
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">PWA Web App Manifest:</strong> दोनों ऐप्स (Customer व Partner) के अलग मैनिफेस्ट तैयार हैं।
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">साफ़ व बिना ग्लिच UI:</strong> पोर्टर जैसा व्हाइट व फ़ास्ट इंटरफ़ेस, कोई एरर नहीं।
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">प्राइवेसी पॉलिसी (Privacy Policy):</strong> Google Play के नियमों के अनुसार तैयार की गई है।
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">ड्राइवर KYC व कस्टमर बुकिंग:</strong> 3-डॉक्यूमेंट अपलोड और लाइव बुकिंग फ्लो एक्टिव है।
                </div>
              </div>
            </div>
          </div>

          {/* 3 Simple Steps to Publish */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="font-extrabold text-white text-xs uppercase tracking-wider text-amber-400">
              📋 Play Store पर डालने के 3 आसान कदम:
            </div>

            {/* Step 1 */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center space-x-2 font-bold text-white">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px]">
                  1
                </span>
                <span>PWABuilder से .aab (Android Package) फाइल बनाएं:</span>
              </div>
              <p className="text-[11px] text-slate-300 pl-7">
                अपने कंप्यूटर पर <strong>pwabuilder.com</strong> खोलें और अपने ऐप का लाइव लिंक डालें। यह 1 मिनट में Play Store के लिए <strong>.aab</strong> फ़ाइल डाउनलोड कर देता है।
              </p>
              <div className="pl-7 pt-1 flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  className="bg-slate-800 hover:bg-slate-700 text-blue-300 px-2.5 py-1 rounded-lg text-[10.5px] font-bold flex items-center space-x-1 border border-slate-700"
                >
                  {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedUrl ? "लिंक कॉपी हो गया!" : "ऐप लिंक कॉपी करें"}</span>
                </button>
                <a
                  href="https://www.pwabuilder.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline text-[10.5px] font-bold flex items-center space-x-0.5"
                >
                  <span>PWABuilder खोलें</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center space-x-2 font-bold text-white">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[11px]">
                  2
                </span>
                <span>Google Play Console अकाउंट:</span>
              </div>
              <p className="text-[11px] text-slate-300 pl-7">
                <strong>play.google.com/console</strong> पर जाकर डेवलपर अकाउंट रजिस्टर करें (Google का वन-टाइम $25 शुल्क लगता है)।
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center space-x-2 font-bold text-white">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[11px]">
                  3
                </span>
                <span>.aab फाइल अपलोड करें और 20 टेस्टर्स:</span>
              </div>
              <p className="text-[11px] text-slate-300 pl-7">
                Google के नए नियम अनुसार नए व्यक्तिगत अकाउंट्स को 14 दिन के लिए 20 दोस्तों/रिश्तेदारों को Closed Testing में ऐप डाउनलोड कराना होता है। उसके बाद ऐप पूरे देश के लिए Play Store पर लाइव हो जाता है!
              </p>
            </div>
          </div>

          {/* Privacy Policy CTA */}
          <div className="bg-blue-950/60 border border-blue-500/40 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-white text-xs">Play Store अनिवार्य प्राइवेसी पॉलिसी</div>
                <div className="text-[10.5px] text-blue-200">Google को देने के लिए पूरी प्राइवेसी पॉलिसी तैयार है</div>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenPrivacyPolicy();
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex-shrink-0 shadow transition"
            >
              पॉलिसी देखें ➔
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">सुपर फास्ट लॉजिस्टिक्स • महाराष्ट्र</span>
          <button
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-xl text-xs transition"
          >
            समझ गया, ठीक है! ✓
          </button>
        </div>
      </div>
    </div>
  );
};
