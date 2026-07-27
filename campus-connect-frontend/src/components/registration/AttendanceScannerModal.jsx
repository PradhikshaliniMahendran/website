import React, { useState } from 'react';
import { useEvents } from '../../contexts/EventContext';
import { X, ScanLine, QrCode, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';

export const AttendanceScannerModal = ({ isOpen, onClose }) => {
  const { registrations, scanCheckInQR } = useEvents();
  const [manualCode, setManualCode] = useState('');
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleSimulateScan = (qrCode) => {
    const res = scanCheckInQR(qrCode);
    setResult(res);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    const res = scanCheckInQR(manualCode.trim());
    setResult(res);
    setManualCode('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-nexus-lg border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-campus-royal p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-campus-teal/20 rounded-xl border border-campus-teal/40">
              <ScanLine className="w-6 h-6 text-campus-teal animate-pulse" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg">Real-Time QR Attendance Scanner</h3>
              <p className="text-xs text-blue-200">Member 4: Registration & Attendance Engine</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scanner View & Controls */}
        <div className="p-6 space-y-5 text-center">
          
          {/* Simulated Camera Viewfinder */}
          <div className="relative w-full h-52 bg-slate-950 rounded-2xl overflow-hidden border-2 border-campus-royal flex flex-col items-center justify-center p-4">
            
            {/* Animated Laser Scanning Line */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-campus-teal to-transparent shadow-[0_0_15px_#00BFA5] animate-[bounce_2s_infinite]" />

            <QrCode className="w-16 h-16 text-white/20 mb-2" />
            <p className="text-xs font-semibold text-white/60">Position Student QR Ticket within camera viewfinder</p>

            {/* Quick Simulate Buttons from Active Registrations */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center z-10">
              {registrations.slice(0, 3).map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleSimulateScan(r.qrCode)}
                  className="bg-white/10 hover:bg-campus-gold/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border border-white/20 transition-all"
                >
                  Scan {r.userName.split(' ')[0]}'s Ticket
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Result Alert */}
          {result && (
            <div className={`p-4 rounded-2xl text-left border flex items-start gap-3 ${
              result.success ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <p className="font-bold">{result.success ? "Check-in Confirmed!" : "Check-in Error"}</p>
                <p className="mt-0.5">{result.message}</p>
              </div>
            </div>
          )}

          {/* Manual Entry Form */}
          <form onSubmit={handleManualSubmit} className="pt-2 border-t border-slate-100 text-left">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Manual Ticket QR Code Input
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. CAMPUS-REG-EVT101-USR002-8841"
                value={manualCode}
                onChange={e => setManualCode(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-semibold focus:outline-none focus:border-campus-royal"
              />
              <button
                type="submit"
                className="bg-campus-royal hover:bg-campus-ocean text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-nexus"
              >
                Verify & Check-In
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
