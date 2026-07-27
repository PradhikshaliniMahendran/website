import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useEvents } from '../../contexts/EventContext';
import { QRCodeModal } from './QRCodeModal';
import { QrCode, Ticket, CheckCircle2, Calendar, MapPin } from 'lucide-react';

export const MyTicketsView = () => {
  const { currentUser } = useAuth();
  const { registrations } = useEvents();
  const [selectedTicket, setSelectedTicket] = useState(null);

  const myRegs = registrations.filter(r => r.userId === currentUser.id);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="bg-nexus-gradient rounded-3xl p-8 text-white shadow-nexus">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-white/10 text-campus-gold border border-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Member 4 Engine
          </span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl">My Event Tickets & QR Passes</h1>
        <p className="text-sm text-blue-100 mt-1">Access your confirmed event registrations and digital entry passes.</p>
      </div>

      {myRegs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border text-center space-y-3">
          <Ticket className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-heading font-bold text-lg text-slate-800">No Active Tickets Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">Explore upcoming campus events and click 'Register Now' to generate your digital QR entry pass!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myRegs.map((reg) => (
            <div key={reg.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-nexus p-6 space-y-4 flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {reg.status}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-400">
                    {new Date(reg.registrationDate).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-slate-900">{reg.eventTitle}</h3>
                
                <div className="bg-slate-50 p-3 rounded-2xl border text-xs space-y-1 text-slate-600">
                  <p>Check-In Status: <strong className={reg.checkInStatus === 'ATTENDED' ? 'text-emerald-600' : 'text-amber-600'}>{reg.checkInStatus}</strong></p>
                  <p className="font-mono text-[11px] text-slate-500">QR Hash: {reg.qrCode}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedTicket(reg)}
                className="w-full bg-campus-royal hover:bg-campus-ocean text-white font-bold text-xs py-3 rounded-xl shadow-nexus flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4 text-campus-gold" /> Display Digital QR Pass
              </button>

            </div>
          ))}
        </div>
      )}

      {selectedTicket && (
        <QRCodeModal registration={selectedTicket} onClose={() => setSelectedTicket(null)} />
      )}

    </div>
  );
};
