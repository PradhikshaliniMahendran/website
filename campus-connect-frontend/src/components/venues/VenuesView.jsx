import React from 'react';
import { useEvents } from '../../contexts/EventContext';
import { Building2, MapPin, Users, CheckCircle, Clock, ShieldCheck } from 'lucide-react';

export const VenuesView = () => {
  const { venues } = useEvents();

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="bg-nexus-gradient rounded-3xl p-8 text-white shadow-nexus flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/10 text-campus-gold border border-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Member 3 Engine
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl">Campus Venue & Resource Directory</h1>
          <p className="text-sm text-blue-100 mt-1">Real-time room availability, technical resources, and conflict resolution matrix.</p>
        </div>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {venues.map((venue) => (
          <div key={venue.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-nexus space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-heading font-bold text-xl text-slate-900">{venue.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-campus-teal" /> {venue.location}
                  </p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                  {venue.status}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium">Max Hall Capacity</span>
                <span className="font-heading font-extrabold text-lg text-campus-royal flex items-center gap-1">
                  <Users className="w-4 h-4 text-campus-gold" /> {venue.capacity} Persons
                </span>
              </div>

              {/* Resources Available */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Allocated Equipment & Resources</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {venue.resources.map((res, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200/80 text-xs flex items-center justify-between">
                      <span className="text-slate-700 font-medium">{res.name}</span>
                      <span className="bg-campus-royal/10 text-campus-royal font-bold text-[10px] px-2 py-0.5 rounded">
                        x{res.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-campus-teal" /> Verified Faculty Venue
              </span>
              <button
                onClick={() => alert(`Slot reservation request sent for ${venue.name}`)}
                className="bg-campus-royal hover:bg-campus-ocean text-white font-bold px-4 py-2 rounded-xl shadow-nexus"
              >
                Reserve Slot
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
