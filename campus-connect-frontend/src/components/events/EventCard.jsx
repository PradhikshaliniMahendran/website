import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useEvents } from '../../contexts/EventContext';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Tag, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles,
  QrCode
} from 'lucide-react';

export const EventCard = ({ event, onSelectEvent, onRegister }) => {
  const { currentUser } = useAuth();
  const { registrations } = useEvents();

  const userReg = registrations.find(r => r.eventId === event.id && r.userId === currentUser.id);
  const isRegistered = !!userReg;

  const capacityPercent = Math.min(Math.round((event.registeredCount / event.capacity) * 100), 100);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'APPROVED':
        return <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Confirmed Event</span>;
      case 'PENDING':
        return <span className="bg-amber-500/10 text-amber-600 border border-amber-500/30 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Pending Faculty Approval</span>;
      case 'REJECTED':
        return <span className="bg-rose-500/10 text-rose-600 border border-rose-500/30 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> Declined</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-nexus hover:shadow-nexus-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group">
      
      <div>
        {/* Banner Media Container */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
          <img
            src={event.banner}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Category Pill */}
          <div className="absolute top-4 left-4">
            <span className="bg-campus-royal/90 text-white backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Tag className="w-3 h-3 text-campus-gold" /> {event.category}
            </span>
          </div>

          {/* Featured Badge */}
          {event.isFeatured && (
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-campus-gold to-campus-orange text-white text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-gold">
                <Sparkles className="w-3 h-3" /> Featured
              </span>
            </div>
          )}

          {/* Organizer overlay */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <p className="text-xs text-blue-200 font-medium">{event.organizerName}</p>
            <h3 className="font-heading font-bold text-lg leading-tight line-clamp-1 group-hover:text-campus-gold transition-colors">
              {event.title}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          <div className="space-y-2 text-xs text-slate-700 font-medium">
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-4 h-4 text-campus-royal shrink-0" />
              <span>{new Date(event.startDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-4 h-4 text-campus-teal shrink-0" />
              <span className="truncate">{event.venueName}</span>
            </div>
          </div>

          {/* Tags */}
          {event.tags && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {event.tags.map((tag, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2.5 py-0.5 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Capacity Progress Bar */}
          <div className="pt-2 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-600 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" /> Seats Registered
              </span>
              <span className={capacityPercent >= 90 ? 'text-campus-orange font-bold' : 'text-slate-800'}>
                {event.registeredCount} / {event.capacity} ({capacityPercent}%)
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  capacityPercent >= 90
                    ? 'bg-gradient-to-r from-amber-500 to-campus-orange'
                    : 'bg-gradient-to-r from-campus-royal to-campus-teal'
                }`}
                style={{ width: `${capacityPercent}%` }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-3 mt-4">
        <div>
          {getStatusBadge(event.status)}
        </div>

        {event.status === 'APPROVED' && (
          isRegistered ? (
            <button
              onClick={() => onSelectEvent(event)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
            >
              <QrCode className="w-4 h-4 text-emerald-200" /> View Ticket
            </button>
          ) : (
            <button
              onClick={() => onRegister(event)}
              className="bg-campus-royal hover:bg-campus-ocean text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-nexus hover:shadow-nexus-lg transition-all"
            >
              Register Now
            </button>
          )
        )}
      </div>

    </div>
  );
};
