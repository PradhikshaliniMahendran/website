import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Calendar, MapPin, Users, Sparkles, Layers, Tag, Eye } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const EventList = () => {
  const [events, setEvents] = useState([
    {
      id: 'evt-1',
      eventCode: 'EVT-2026-X781',
      title: 'Global AI & Developer Hackathon 2026',
      description: '36-Hour continuous hackathon bringing together students, faculty, and industry mentors to build cutting-edge generative AI apps.',
      category: 'Technology & Coding',
      venue: 'Grand Innovation Auditorium',
      startDate: '2026-08-12T09:00:00Z',
      endDate: '2026-08-14T18:00:00Z',
      capacity: 350,
      registeredCount: 184,
      isFree: true,
      isFeatured: true,
      status: 'PUBLISHED',
      bannerUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
    },
    {
      id: 'evt-2',
      eventCode: 'EVT-2026-N492',
      title: 'Annual Robotics & Embedded Systems Expo',
      description: 'Exhibition of autonomous rovers, drones, and micro-controller hardware designed by engineering student teams.',
      category: 'Technology & Coding',
      venue: 'Cybersecurity & AI Complex Lab',
      startDate: '2026-08-20T10:00:00Z',
      endDate: '2026-08-20T16:00:00Z',
      capacity: 120,
      registeredCount: 95,
      isFree: true,
      isFeatured: false,
      status: 'PENDING_APPROVAL',
      bannerUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    },
    {
      id: 'evt-3',
      eventCode: 'EVT-2026-C109',
      title: 'Symphony of Lights Cultural Concert',
      description: 'Annual flagship music and dance festival featuring student bands and special guest performances.',
      category: 'Cultural & Arts',
      venue: 'Central Campus Amphitheater',
      startDate: '2026-09-05T18:00:00Z',
      endDate: '2026-09-05T22:00:00Z',
      capacity: 1500,
      registeredCount: 820,
      isFree: true,
      isFeatured: true,
      status: 'PUBLISHED',
      bannerUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
    },
    {
      id: 'evt-4',
      eventCode: 'EVT-2026-A305',
      title: 'Quantum Computing Research Symposium',
      description: 'Academic paper presentations and keynote lectures on quantum entanglement algorithms.',
      category: 'Academic & Research',
      venue: 'Grand Innovation Auditorium',
      startDate: '2026-09-18T09:30:00Z',
      endDate: '2026-09-18T15:00:00Z',
      capacity: 200,
      registeredCount: 45,
      isFree: true,
      isFeatured: false,
      status: 'DRAFT',
      bannerUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.eventCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || e.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Event Explorer & Catalog</h1>
          <p className="text-xs text-slate-400">Discover upcoming university events, fests, and workshops</p>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/events/calendar"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Calendar View</span>
          </Link>
          <Link
            to="/events/create"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-500/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Event</span>
          </Link>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by event title, code, or category..."
            className="w-full bg-slate-900 text-xs text-white placeholder-slate-500 pl-9 pr-4 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center space-x-3">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-900 text-xs text-slate-300 py-2 px-3 rounded-xl border border-slate-800 focus:outline-none focus:border-brand-500"
          >
            <option value="ALL">All Event Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="PENDING_APPROVAL">Pending Approval</option>
            <option value="DRAFT">Draft</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          const remaining = Math.max(0, evt.capacity - evt.registeredCount);
          const percentFull = Math.min(100, Math.round((evt.registeredCount / evt.capacity) * 100));

          return (
            <div
              key={evt.id}
              className="glass-card rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                {/* Banner Header */}
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={evt.bannerUrl}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950/80 text-brand-300 border border-brand-500/30">
                      {evt.eventCode}
                    </span>
                    {evt.isFeatured && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <Sparkles className="w-3 h-3" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3">
                    <Badge variant={evt.status}>{evt.status}</Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <span className="text-[11px] font-semibold text-brand-400 uppercase tracking-wider">
                    {evt.category}
                  </span>
                  <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-brand-300 transition-colors">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{evt.description}</p>

                  <div className="space-y-1.5 pt-2 text-xs text-slate-300">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{evt.venue}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{new Date(evt.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Capacity & Actions Footer */}
              <div className="p-5 border-t border-slate-800 bg-slate-900/40 space-y-3">
                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-slate-400">Live Seat Meter</span>
                    <span className="text-emerald-400">{remaining} seats left</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-brand-500 to-emerald-400 h-full rounded-full"
                      style={{ width: `${percentFull}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-bold text-white">{evt.isFree ? 'FREE Entry' : '$15.00'}</span>
                  <Link
                    to={`/events/${evt.id}`}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-brand-400 hover:text-brand-300"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
