import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useEvents } from '../../contexts/EventContext';
import { X, Calendar, MapPin, Tag, Users, Sparkles } from 'lucide-react';

export const CreateEventModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { createEvent, venues, clubs } = useEvents();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'WORKSHOP',
    clubId: clubs[0]?.id || '',
    venueId: venues[0]?.id || '',
    startDate: '',
    endDate: '',
    capacity: 100,
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    tagsInput: 'AI, Technology, Campus',
    isFeatured: false,
    waitlistEnabled: true
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedVenue = venues.find(v => v.id === formData.venueId);
    const selectedClub = clubs.find(c => c.id === formData.clubId);

    const tags = formData.tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    createEvent({
      ...formData,
      organizerId: currentUser.id,
      organizerName: selectedClub?.name || currentUser.name,
      venueName: selectedVenue?.name || "Campus Main Hall",
      venueLocation: selectedVenue?.location || "Building A",
      tags
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-nexus-lg border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-campus-royal p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl border border-white/20">
              <Sparkles className="w-6 h-6 text-campus-gold" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl">Propose New Campus Event</h2>
              <p className="text-xs text-blue-200">Member 2: Event CRUD & Venue Conflict Queue</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Event Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. National Hackathon & AI Summit 2026"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-campus-royal"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-campus-royal"
              >
                <option value="WORKSHOP">WORKSHOP</option>
                <option value="CULTURAL">CULTURAL</option>
                <option value="SPORTS">SPORTS</option>
                <option value="ACADEMIC">ACADEMIC</option>
                <option value="SEMINAR">SEMINAR</option>
                <option value="SOCIAL">SOCIAL</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Organizing Club</label>
              <select
                value={formData.clubId}
                onChange={e => setFormData({ ...formData, clubId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-campus-royal"
              >
                {clubs.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Campus Venue</label>
              <select
                value={formData.venueId}
                onChange={e => setFormData({ ...formData, venueId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-campus-royal"
              >
                {venues.map(v => (
                  <option key={v.id} value={v.id}>{v.name} (Cap: {v.capacity})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Maximum Capacity</label>
              <input
                type="number"
                min="10"
                max="2000"
                value={formData.capacity}
                onChange={e => setFormData({ ...formData, capacity: parseInt(e.target.value) || 50 })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-campus-royal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Start Date & Time</label>
              <input
                type="datetime-local"
                required
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-campus-royal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">End Date & Time</label>
              <input
                type="datetime-local"
                required
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-campus-royal"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Event Description</label>
            <textarea
              rows={3}
              required
              placeholder="Provide event details, schedule highlights, and key speakers..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-campus-royal"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tags (Comma separated)</label>
            <input
              type="text"
              value={formData.tagsInput}
              onChange={e => setFormData({ ...formData, tagsInput: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-campus-royal"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 text-campus-gold rounded"
              />
              Mark as Featured Event
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={formData.waitlistEnabled}
                onChange={e => setFormData({ ...formData, waitlistEnabled: e.target.checked })}
                className="w-4 h-4 text-campus-teal rounded"
              />
              Enable Automatic Waitlist
            </label>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-campus-royal text-white font-bold text-xs shadow-nexus hover:bg-campus-ocean transition-all"
            >
              Submit Event Proposal
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
