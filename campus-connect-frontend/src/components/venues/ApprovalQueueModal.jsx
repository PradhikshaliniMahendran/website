import React, { useState } from 'react';
import { useEvents } from '../../contexts/EventContext';
import { X, CheckSquare, CheckCircle2, XCircle, Clock, MapPin, Building2 } from 'lucide-react';

export const ApprovalQueueModal = ({ isOpen, onClose }) => {
  const { events, approveEventWithVenue, rejectEventWithReason } = useEvents();
  const [commentInput, setCommentInput] = useState({});

  if (!isOpen) return null;

  const pendingEvents = events.filter(e => e.status === 'PENDING');

  const handleApprove = (eventId) => {
    approveEventWithVenue(eventId, commentInput[eventId] || "Venue allocation verified and approved.");
  };

  const handleReject = (eventId) => {
    rejectEventWithReason(eventId, commentInput[eventId] || "Schedule conflict with academic timetable.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-nexus-lg border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-campus-royal p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-xl border border-amber-500/40">
              <CheckSquare className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg">Faculty & Admin Approval Queue</h3>
              <p className="text-xs text-blue-200">Member 3: Venue Reservation & Workflow Control</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {pendingEvents.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto opacity-80" />
              <p className="font-heading font-bold text-base text-slate-800">All Queue Items Processed!</p>
              <p className="text-xs text-slate-500">There are currently no pending event venue approval requests.</p>
            </div>
          ) : (
            pendingEvents.map((evt) => (
              <div key={evt.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                      Pending Approval
                    </span>
                    <h4 className="font-heading font-bold text-base text-slate-900 mt-1">{evt.title}</h4>
                    <p className="text-xs text-slate-500">Organized by: <span className="font-semibold text-slate-700">{evt.organizerName}</span></p>
                  </div>
                  <span className="text-xs font-bold text-campus-royal bg-campus-royal/10 px-3 py-1 rounded-lg">
                    {evt.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-white p-3 rounded-xl border border-slate-200/80">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-campus-teal shrink-0" />
                    <span><strong>Requested Venue:</strong> {evt.venueName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-campus-gold shrink-0" />
                    <span><strong>Time:</strong> {new Date(evt.startDate).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 italic">"{evt.description}"</p>

                {/* Comment & Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center">
                  <input
                    type="text"
                    placeholder="Add approval comment or rejection reason..."
                    value={commentInput[evt.id] || ''}
                    onChange={e => setCommentInput({ ...commentInput, [evt.id]: e.target.value })}
                    className="flex-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-campus-royal"
                  />

                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleReject(evt.id)}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 transition-all"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                    <button
                      onClick={() => handleApprove(evt.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 shadow-sm transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve Event
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
};
