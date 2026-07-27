import React from 'react';
import { X, QrCode, CheckCircle, Download, ShieldCheck } from 'lucide-react';

export const QRCodeModal = ({ registration, onClose }) => {
  if (!registration) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-nexus-lg border border-slate-200 overflow-hidden text-center relative">
        
        {/* Top Header */}
        <div className="bg-nexus-gradient p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <QrCode className="w-8 h-8 text-campus-gold" />
          </div>

          <h3 className="font-heading font-extrabold text-lg">Official Entry Ticket</h3>
          <p className="text-xs text-blue-200">Campus Connect Digital Pass</p>
        </div>

        {/* Ticket Details */}
        <div className="p-6 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Event Title</p>
            <h4 className="font-heading font-bold text-sm text-campus-navy">{registration.eventTitle}</h4>
            
            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200/80 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Attendee Name</span>
                <span className="font-semibold text-slate-800">{registration.userName}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Status</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> {registration.status}
                </span>
              </div>
            </div>
          </div>

          {/* QR Code Container Simulation */}
          <div className="bg-white border-2 border-dashed border-campus-royal/30 rounded-2xl p-5 inline-block shadow-inner relative group">
            <div className="w-48 h-48 mx-auto bg-slate-900 rounded-xl p-3 flex flex-col items-center justify-center relative overflow-hidden">
              {/* Generated QR Matrix Simulation */}
              <div className="w-full h-full bg-white p-2 rounded-lg flex flex-col items-center justify-center space-y-1">
                <div className="grid grid-cols-5 gap-1.5 w-full h-full p-2 bg-slate-900 rounded">
                  {Array.from({ length: 25 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xs ${
                        idx % 2 === 0 || idx % 7 === 0 ? 'bg-campus-gold' : 'bg-white'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <p className="font-mono text-[11px] font-bold text-slate-600 tracking-wider mt-3">
              {registration.qrCode}
            </p>
          </div>

          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-campus-teal" /> Present this QR at entry for attendance check-in.
          </p>

          <button
            onClick={() => alert(`Ticket QR (${registration.qrCode}) downloaded!`)}
            className="w-full bg-campus-royal hover:bg-campus-ocean text-white font-bold text-xs py-3 rounded-xl shadow-nexus flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download QR Ticket
          </button>
        </div>

      </div>
    </div>
  );
};
