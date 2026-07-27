import React, { useState } from 'react';
import { useEvents } from '../../contexts/EventContext';
import { Calendar, Clock, MapPin, Tag, ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';

export const EventCalendarView = ({ onOpenCreateEvent }) => {
  const { events } = useEvents();
  const [currentMonth, setCurrentMonth] = useState('August 2026');

  // Days in month simulation
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="bg-nexus-gradient rounded-3xl p-8 text-white shadow-nexus flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-white/10 text-campus-gold border border-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Campus Master Timetable
          </span>
          <h1 className="font-heading font-extrabold text-3xl mt-2">University Event Calendar</h1>
          <p className="text-sm text-blue-100 mt-1">Interactive schedule view for all university events, venue bookings, and conflict detection.</p>
        </div>
        <button
          onClick={onOpenCreateEvent}
          className="bg-campus-gold hover:bg-amber-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-gold flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> Schedule New Event
        </button>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-nexus space-y-6">
        
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <h3 className="font-heading font-extrabold text-xl text-slate-900">{currentMonth}</h3>
            <span className="bg-campus-royal/10 text-campus-royal text-xs font-bold px-3 py-1 rounded-full">
              {events.length} Scheduled Events
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days Grid Header */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Month Days Matrix */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const dayEvents = events.filter(e => new Date(e.startDate).getDate() === (day % 28 + 1));
            return (
              <div 
                key={day} 
                className={`min-h-[90px] p-2 rounded-2xl border transition-all text-xs flex flex-col justify-between ${
                  dayEvents.length > 0
                    ? 'bg-amber-50/50 border-amber-200/80 hover:border-campus-gold'
                    : 'bg-slate-50/50 border-slate-100 hover:bg-white'
                }`}
              >
                <span className="font-bold text-slate-700">{day}</span>
                
                {dayEvents.length > 0 && (
                  <div className="space-y-1">
                    {dayEvents.map(evt => (
                      <div 
                        key={evt.id} 
                        className="bg-campus-royal text-white p-1.5 rounded-lg text-[10px] font-semibold truncate shadow-xs cursor-pointer"
                        title={`${evt.title} (${evt.venueName})`}
                      >
                        {evt.title}
                      </div>
                    ))}
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
