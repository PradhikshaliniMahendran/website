import React from 'react';
import { X, Award, Download, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export const CertificatePreviewModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-nexus-lg border border-slate-200 overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-slate-400 hover:text-slate-700 bg-white/80 p-2 rounded-xl border shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Graphic Viewport */}
        <div className="p-8 sm:p-10 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 border-8 border-double border-campus-gold/40 m-4 rounded-2xl text-center relative shadow-inner">
          
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-campus-gold" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-campus-gold" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-campus-gold" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-campus-gold" />

          {/* Crest / Header */}
          <div className="w-16 h-16 bg-gradient-to-tr from-campus-gold to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-gold border-2 border-white">
            <Award className="w-9 h-9 text-white" />
          </div>

          <h4 className="font-heading font-extrabold text-xs tracking-widest text-campus-royal uppercase">
            University Campus Connect System
          </h4>
          <h2 className="font-accent font-extrabold text-2xl text-slate-900 mt-1 uppercase tracking-wider">
            Certificate of {certificate.type}
          </h2>

          <p className="text-xs text-slate-500 mt-4 italic">This official credential certifies that</p>
          
          <h3 className="font-heading font-bold text-2xl text-campus-royal my-2 border-b-2 border-campus-gold/30 inline-block px-8 py-1">
            {certificate.recipientName}
          </h3>

          <p className="text-xs text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
            has successfully participated and completed all requirements for the university event:
          </p>

          <p className="font-heading font-bold text-base text-slate-800 my-2">
            "{certificate.eventTitle}"
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto text-left pt-6 mt-6 border-t border-slate-200/80 text-[11px]">
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">Issued Date</span>
              <span className="font-bold text-slate-700">{certificate.issuedDate}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">Verification ID</span>
              <span className="font-mono font-bold text-campus-teal">{certificate.verificationCode}</span>
            </div>
          </div>

          {/* Gold Seal Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-xl px-4 py-2 text-xs font-semibold max-w-fit mx-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Cryptographically Verified Credential</span>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-500">{certificate.certificateNumber}</span>
          <button
            onClick={() => alert(`Certificate (${certificate.certificateNumber}) downloaded!`)}
            className="bg-campus-gold hover:bg-amber-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-gold flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download PDF Credential
          </button>
        </div>

      </div>
    </div>
  );
};
