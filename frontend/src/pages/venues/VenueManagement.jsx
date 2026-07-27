import React, { useState } from 'react';
import { MapPin, Plus, Wifi, Tv, Volume2, ShieldCheck, Settings, Calendar, AlertCircle } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Link } from 'react-router-dom';

export const VenueManagement = () => {
  const [venues, setVenues] = useState([
    {
      id: 'ven-1',
      code: 'AUD-A101',
      name: 'Grand Innovation Auditorium',
      building: 'Turing Science & Tech Center',
      floor: '1st Floor',
      capacity: 500,
      status: 'AVAILABLE',
      facilities: ['4K Dual Projectors', 'Dolby Atmos Audio', 'Stage Lighting', 'High-speed Wi-Fi', 'Central AC'],
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800',
    },
    {
      id: 'ven-2',
      code: 'LAB-B204',
      name: 'Cybersecurity & AI Complex Lab',
      building: 'Lovelace Computing Building',
      floor: '2nd Floor',
      capacity: 120,
      status: 'AVAILABLE',
      facilities: ['NVIDIA Workstations', 'Gigabit Ethernet', 'Smart Whiteboards'],
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    },
    {
      id: 'ven-3',
      code: 'OUT-Q01',
      name: 'Central Campus Amphitheater',
      building: 'Main Campus Plaza',
      floor: 'Ground Outdoor',
      capacity: 1500,
      status: 'AVAILABLE',
      facilities: ['Outdoor Concert Stage', 'PA System', 'Green Room'],
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Campus Venues & Facilities</h1>
          <p className="text-xs text-slate-400">Manage auditorium halls, labs, outdoor grounds, and equipment</p>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/venues/schedule"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 text-xs font-semibold hover:bg-slate-800"
          >
            <Calendar className="w-4 h-4" />
            <span>Slot Availability Grid</span>
          </Link>
          <button className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-500/20">
            <Plus className="w-4 h-4" />
            <span>Add Venue</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div key={venue.id} className="glass-card rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative h-44 bg-slate-900">
                <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950/80 text-brand-300 border border-brand-500/30">
                    {venue.code}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant={venue.status}>{venue.status}</Badge>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-base font-bold text-white">{venue.name}</h3>
                <p className="text-xs text-slate-400">{venue.building} • {venue.floor}</p>

                <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 pt-1">
                  <span>Capacity: {venue.capacity} Persons</span>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <h4 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Available Facilities</h4>
                  <div className="flex flex-wrap gap-1">
                    {venue.facilities.map((fac, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                        {fac}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900/40 flex justify-between items-center">
              <Link to={`/venues/schedule?venue=${venue.id}`} className="text-xs font-semibold text-brand-400 hover:text-brand-300">
                View Schedule Matrix
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
