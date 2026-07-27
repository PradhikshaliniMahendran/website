import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Sparkles, Clock, CheckCircle2, History, ArrowLeft, Send } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const EventDetail = () => {
  const { id } = useParams();
  const [showHistory, setShowHistory] = useState(false);

  const event = {
    id: id || 'evt-1',
    eventCode: 'EVT-2026-X781',
    title: 'Global AI & Developer Hackathon 2026',
    description: '36-Hour continuous hackathon bringing together students, faculty, and industry mentors to build cutting-edge generative AI apps.',
    category: 'Technology & Coding',
    venue: 'Grand Innovation Auditorium',
    organizer: 'Dr. Eleanor Vance (Computer Science)',
    startDate: '2026-08-12T09:00:00Z',
    endDate: '2026-08-14T18:00:00Z',
    capacity: 350,
    registeredCount: 184,
    isFree: true,
    isFeatured: true,
    status: 'PUBLISHED',
    version: 2,
    bannerUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200',
    tags: ['Hackathon', 'AI', 'Software', 'Innovation'],
  };

  const versions = [
    { version: 2, summary: 'Updated venue equipment requirements & capacity limit', modifiedBy: 'Dr. Eleanor Vance', date: '2026-07-26' },
    { version: 1, summary: 'Initial creation & draft submission', modifiedBy: 'Dr. Eleanor Vance', date: '2026-07-20' },
  ];

  return (
    <div className="space-y-8">
      <Link to="/events" className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events</span>
      </Link>

      {/* Hero Banner */}
      <div className="relative h-80 rounded-3xl overflow-hidden glass-card border border-slate-800">
        <img src={event.bannerUrl} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-950/80 text-brand-300 border border-brand-500/30">
                {event.eventCode}
              </span>
              <Badge variant={event.status}>{event.status}</Badge>
            </div>
            <h1 className="text-3xl font-extrabold text-white">{event.title}</h1>
          </div>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-xs font-semibold text-slate-300 border border-slate-700 hover:text-white"
          >
            <History className="w-4 h-4" />
            <span>Version History (v{event.version})</span>
          </button>
        </div>
      </div>

      {/* Version Drawer */}
      {showHistory && (
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Event Version Revision Log</h3>
          <div className="space-y-2">
            {versions.map((v) => (
              <div key={v.version} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-brand-400">Version {v.version}</span> - <span className="text-slate-300">{v.summary}</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">By {v.modifiedBy} on {v.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">About This Event</h2>
            <p className="text-xs text-slate-300 leading-relaxed">{event.description}</p>

            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-xs font-semibold text-slate-400 mb-2">Event Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {event.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Event Metadata</h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-center space-x-3 text-slate-300">
                <MapPin className="w-4 h-4 text-brand-400" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <Calendar className="w-4 h-4 text-brand-400" />
                <span>{new Date(event.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <Users className="w-4 h-4 text-brand-400" />
                <span>{event.registeredCount} / {event.capacity} Registered Seats</span>
              </div>
            </div>

            <button className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg transition-colors">
              Register for Event Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
