import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Calendar, MapPin, AlertTriangle, CheckCircle, ArrowRight, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const EventForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [hasConflict, setHasConflict] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technology & Coding',
    venue: 'Grand Innovation Auditorium',
    startDate: '',
    endDate: '',
    capacity: 250,
    isFree: true,
    bannerUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
  });

  const checkConflictSimulation = (venue, start) => {
    // If venue is Grand Innovation Auditorium and date matches sample conflict date, flag conflict alert
    if (venue === 'Grand Innovation Auditorium' && start.includes('2026-08-12')) {
      setHasConflict(true);
    } else {
      setHasConflict(false);
    }
  };

  const handleVenueChange = (e) => {
    const venue = e.target.value;
    setFormData({ ...formData, venue });
    checkConflictSimulation(venue, formData.startDate);
  };

  const handleDateChange = (e) => {
    const startDate = e.target.value;
    setFormData({ ...formData, startDate });
    checkConflictSimulation(formData.venue, startDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Event created successfully with auto code EVT-2026-X892!');
    navigate('/events');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Smart Event Creation Wizard</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Propose New Campus Event</h1>
        <p className="text-xs text-slate-400">Auto code generation, smart venue conflict check, and approval submission</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className={`flex items-center space-x-2 text-xs font-semibold ${step >= 1 ? 'text-brand-400' : 'text-slate-500'}`}>
          <span className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center border border-brand-500/30">1</span>
          <span>Basic Details</span>
        </div>
        <div className={`flex items-center space-x-2 text-xs font-semibold ${step >= 2 ? 'text-brand-400' : 'text-slate-500'}`}>
          <span className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center border border-brand-500/30">2</span>
          <span>Venue & Schedule</span>
        </div>
        <div className={`flex items-center space-x-2 text-xs font-semibold ${step >= 3 ? 'text-brand-400' : 'text-slate-500'}`}>
          <span className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center border border-brand-500/30">3</span>
          <span>Media & Capacity</span>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 border border-slate-800 space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Event Title</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. National Hackathon 2026"
                className="w-full bg-slate-900 text-xs text-white p-3 rounded-xl border border-slate-800 focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-900 text-xs text-slate-300 p-3 rounded-xl border border-slate-800 focus:border-brand-500"
              >
                <option>Technology & Coding</option>
                <option>Cultural & Arts</option>
                <option>Sports & Athletics</option>
                <option>Academic & Research</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed outline of event schedule, speakers, and objectives..."
                className="w-full bg-slate-900 text-xs text-white p-3 rounded-xl border border-slate-800 focus:border-brand-500"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Select Campus Venue</label>
              <select
                value={formData.venue}
                onChange={handleVenueChange}
                className="w-full bg-slate-900 text-xs text-slate-300 p-3 rounded-xl border border-slate-800 focus:border-brand-500"
              >
                <option>Grand Innovation Auditorium</option>
                <option>Cybersecurity & AI Complex Lab</option>
                <option>Central Campus Amphitheater</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date & Time</label>
                <input
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={handleDateChange}
                  className="w-full bg-slate-900 text-xs text-white p-3 rounded-xl border border-slate-800 focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">End Date & Time</label>
                <input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full bg-slate-900 text-xs text-white p-3 rounded-xl border border-slate-800 focus:border-brand-500"
                />
              </div>
            </div>

            {/* Smart Venue Conflict Detector Banner Alert */}
            {hasConflict ? (
              <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Smart Venue Conflict Detected!</p>
                  <p className="text-[11px] text-rose-300/80 mt-0.5">
                    "Global AI & Developer Hackathon 2026" is already booked at {formData.venue} for this time slot. Please pick another venue or date.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Venue availability check passed! No schedule conflicts detected.</span>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Event Banner Image URL</label>
              <input
                type="text"
                value={formData.bannerUrl}
                onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                className="w-full bg-slate-900 text-xs text-white p-3 rounded-xl border border-slate-800 focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Max Capacity Seats</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                className="w-full bg-slate-900 text-xs text-white p-3 rounded-xl border border-slate-800 focus:border-brand-500"
              />
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              type="button"
              disabled={hasConflict}
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white text-xs font-semibold"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Live Preview
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-500/20"
              >
                Submit Event Proposal
              </button>
            </div>
          )}
        </div>
      </form>

      {/* Preview Modal */}
      <Modal isOpen={showPreview} onClose={() => setShowPreview(false)} title="Event Card Live Preview">
        <div className="space-y-4">
          <div className="h-40 rounded-xl overflow-hidden bg-slate-900">
            <img src={formData.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-lg font-bold text-white">{formData.title || 'Untitled Event'}</h3>
          <p className="text-xs text-slate-400">{formData.description || 'No description provided.'}</p>
          <div className="flex items-center space-x-4 text-xs text-slate-300">
            <span>Venue: {formData.venue}</span>
            <span>Capacity: {formData.capacity} seats</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};
