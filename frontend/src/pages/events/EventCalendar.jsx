import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const EventCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState('August 2026');

  const calendarEvents = [
    { day: 12, title: 'AI Hackathon 2026', venue: 'Grand Auditorium', color: 'bg-brand-500/20 text-brand-300 border-brand-500/30' },
    { day: 20, title: 'Robotics Expo', venue: 'AI Lab Complex', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    { day: 28, title: 'Paper Presentation', venue: 'Hall B', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Interactive Event Calendar</h1>
          <p className="text-xs text-slate-400">Monthly schedule overview of campus events</p>
        </div>
        <div className="flex items-center space-x-3 glass-card px-4 py-2 rounded-xl border border-slate-800">
          <button className="p-1 hover:text-white text-slate-400"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-xs font-bold text-white">{currentMonth}</span>
          <button className="p-1 hover:text-white text-slate-400"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800">
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-400 mb-4 pb-2 border-b border-slate-800">
          <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
            const evt = calendarEvents.find((e) => e.day === day);
            return (
              <div
                key={day}
                className={`min-h-[90px] p-2 rounded-xl border border-slate-800/60 bg-slate-900/40 flex flex-col justify-between ${
                  evt ? 'border-brand-500/30' : ''
                }`}
              >
                <span className="text-xs font-bold text-slate-400">{day}</span>
                {evt && (
                  <div className={`p-1.5 rounded-lg border text-[10px] font-semibold truncate ${evt.color}`}>
                    <p className="truncate">{evt.title}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
