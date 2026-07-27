import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, XCircle } from 'lucide-react';

export const VenueSchedule = () => {
  const [selectedVenue, setSelectedVenue] = useState('Grand Innovation Auditorium');

  const slots = [
    { time: '08:00 AM - 09:00 AM', available: true },
    { time: '09:00 AM - 10:00 AM', available: false, event: 'Global AI & Developer Hackathon 2026' },
    { time: '10:00 AM - 11:00 AM', available: false, event: 'Global AI & Developer Hackathon 2026' },
    { time: '11:00 AM - 12:00 PM', available: false, event: 'Global AI & Developer Hackathon 2026' },
    { time: '12:00 PM - 01:00 PM', available: true },
    { time: '01:00 PM - 02:00 PM', available: true },
    { time: '02:00 PM - 03:00 PM', available: false, event: 'Faculty Senate Meeting' },
    { time: '03:00 PM - 04:00 PM', available: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Interactive Venue Slot Schedule</h1>
        <p className="text-xs text-slate-400">Hourly reservation matrix for conflict prevention</p>
      </div>

      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
        <select
          value={selectedVenue}
          onChange={(e) => setSelectedVenue(e.target.value)}
          className="bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-800"
        >
          <option>Grand Innovation Auditorium</option>
          <option>Cybersecurity & AI Complex Lab</option>
          <option>Central Campus Amphitheater</option>
        </select>
        <span className="text-xs text-slate-400 font-semibold">Date: Today (Aug 12, 2026)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slots.map((slot, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border flex items-center justify-between ${
              slot.available
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4" />
              <div>
                <p className="text-xs font-bold">{slot.time}</p>
                <p className="text-[11px] opacity-80">{slot.available ? 'Available Slot' : `Booked: ${slot.event}`}</p>
              </div>
            </div>
            {slot.available ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />}
          </div>
        ))}
      </div>
    </div>
  );
};
