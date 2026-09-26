import React from "react";
import { X, ShieldCheck, Lock, FileText, CheckCircle2 } from "lucide-react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] max-w-lg w-full shadow-2xl overflow-hidden flex flex-col text-slate-900 max-h-[92vh] border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Privacy Policy & Play Store Terms
              </h3>
              <p className="text-[11px] text-slate-500">
                Super Fast Logistics & Partner • Last updated: September 2026
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Policy Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-[11px] text-blue-900">
            <strong>Google Play Store Compliance Statement:</strong> This Privacy Policy discloses how Super Fast Logistics and Super Fast Partner ("we", "our") collect, store, and process user information for goods transportation services in Maharashtra, India.
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
              <span>1. Application & Developer Information</span>
            </h4>
            <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1 text-[11px]">
              <li><strong>App Name:</strong> Super Fast Logistics & Partner</li>
              <li><strong>Developer / Lead:</strong> Suresh Pankaj Yadav</li>
              <li><strong>Support Email:</strong> yadavsureshpankaj7521@gmail.com</li>
              <li><strong>Support Phone:</strong> +91 7521869140</li>
              <li><strong>Headquarters:</strong> Buwapada, Deepak Nagar, Ambernath, Maharashtra 421501</li>
            </ul>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
              <span>2. Information We Collect</span>
            </h4>
            <p className="text-slate-600 text-[11px]">
              We only collect data necessary to provide safe transportation and transparent logistics services:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1 text-[11px]">
              <li><strong>Location Data:</strong> We access device location (foreground and background for drivers on duty) to calculate trip distances, calculate transparent vehicle fares, assign nearest drivers, and provide live delivery tracking to customers.</li>
              <li><strong>Contact Information:</strong> Phone number and receiver name to coordinate parcel pickup, drop-off, and SMS/OTP verification.</li>
              <li><strong>Driver Partner Documents (App 2 only):</strong> Aadhaar Card, PAN Card, Selfie, Vehicle RC, and Driving License for identity verification and anti-fraud passenger/cargo security.</li>
            </ul>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
              <span>3. Data Storage & Security</span>
            </h4>
            <p className="text-slate-600 text-[11px]">
              All communication between your device and our servers is encrypted using 256-bit SSL (HTTPS). We do not sell, rent, or trade your personal information or uploaded KYC documents to third parties or marketing brokers.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
              <span>4. User Rights & Data Deletion</span>
            </h4>
            <p className="text-slate-600 text-[11px]">
              Users and driver partners have the right to request deletion of their account, uploaded documents, and ride history at any time by contacting our support team at <strong>yadavsureshpankaj7521@gmail.com</strong>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Google Play Policy Compliant ✓</span>
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2 rounded-xl text-xs transition"
          >
            बंद करें (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
