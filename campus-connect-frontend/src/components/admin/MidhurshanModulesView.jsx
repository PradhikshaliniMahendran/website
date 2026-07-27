import React, { useState } from 'react';
import { useEvents } from '../../contexts/EventContext';
import { EventCalendarView } from '../events/EventCalendarView';
import { UserRoleManagementView } from './UserRoleManagementView';
import { ApprovalQueueModal } from '../venues/ApprovalQueueModal';
import { 
  CalendarDays, 
  UserCheck, 
  CheckSquare, 
  Tag, 
  Building2, 
  BarChart3, 
  Sparkles,
  Layers
} from 'lucide-react';

export const MidhurshanModulesView = ({ onOpenCreateEvent }) => {
  const { events, venues } = useEvents();
  const [subTab, setSubTab] = useState('calendar');

  const [categories, setCategories] = useState([
    { id: 'cat_1', name: 'WORKSHOP', description: 'Hands-on technical & coding bootcamps', count: 14 },
    { id: 'cat_2', name: 'CULTURAL', description: 'Music, dance, drama & arts performances', count: 12 },
    { id: 'cat_3', name: 'SPORTS', description: 'Athletics, tournaments & fitness leagues', count: 8 },
    { id: 'cat_4', name: 'SEMINAR', description: 'Guest keynotes & research presentations', count: 5 }
  ]);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Integrated Hero Banner */}
      <div className="bg-nexus-gradient rounded-3xl p-8 text-white shadow-nexus">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-white/10 text-campus-gold border border-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Midhurshan Integrated Modules 1, 2 & 3
          </span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl">Midhurshan Feature Hub</h1>
        <p className="text-sm text-blue-100 mt-1">
          Explore User & Role Management (Module 1), Master Event Calendar & Category Management (Module 2), and Venue Schedules & Approval Inbox (Module 3).
        </p>
      </div>

      {/* Sub-Navigation Tabs for Midhurshan Parts */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSubTab('calendar')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            subTab === 'calendar'
              ? 'bg-campus-royal text-white shadow-nexus'
              : 'bg-white text-slate-600 hover:bg-slate-100 border'
          }`}
        >
          <CalendarDays className="w-4 h-4 text-campus-gold" /> Master Event Calendar (Module 2)
        </button>

        <button
          onClick={() => setSubTab('users')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            subTab === 'users'
              ? 'bg-campus-royal text-white shadow-nexus'
              : 'bg-white text-slate-600 hover:bg-slate-100 border'
          }`}
        >
          <UserCheck className="w-4 h-4 text-purple-400" /> User & Role Permissions (Module 1)
        </button>

        <button
          onClick={() => setSubTab('categories')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            subTab === 'categories'
              ? 'bg-campus-royal text-white shadow-nexus'
              : 'bg-white text-slate-600 hover:bg-slate-100 border'
          }`}
        >
          <Tag className="w-4 h-4 text-campus-teal" /> Category Manager (Module 2)
        </button>

        <button
          onClick={() => setSubTab('approvals')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            subTab === 'approvals'
              ? 'bg-campus-royal text-white shadow-nexus'
              : 'bg-white text-slate-600 hover:bg-slate-100 border'
          }`}
        >
          <CheckSquare className="w-4 h-4 text-amber-400" /> Venue Approval Inbox (Module 3)
        </button>
      </div>

      {/* SUB TAB CONTENTS */}
      {subTab === 'calendar' && (
        <EventCalendarView onOpenCreateEvent={onOpenCreateEvent} />
      )}

      {subTab === 'users' && (
        <UserRoleManagementView />
      )}

      {subTab === 'categories' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-nexus space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-heading font-bold text-lg text-slate-900">Event Category Management</h3>
              <p className="text-xs text-slate-500">Configure event classifications and taxonomies (Midhurshan Module 2)</p>
            </div>
            <button
              onClick={() => alert("Category added successfully!")}
              className="bg-campus-royal text-white font-bold text-xs px-4 py-2 rounded-xl shadow-nexus"
            >
              + Add New Category
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex justify-between items-center">
                <div>
                  <span className="font-bold text-sm text-campus-navy">{cat.name}</span>
                  <p className="text-xs text-slate-500">{cat.description}</p>
                </div>
                <span className="bg-campus-gold/20 text-campus-gold font-extrabold text-xs px-3 py-1 rounded-full">
                  {cat.count} Events
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === 'approvals' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-nexus space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-heading font-bold text-lg text-slate-900">Venue Reservation Approval Inbox</h3>
              <p className="text-xs text-slate-500">Faculty/Admin review queue for event venue bookings (Midhurshan Module 3)</p>
            </div>
          </div>

          <div className="space-y-3">
            {events.map((evt) => (
              <div key={evt.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{evt.title}</h4>
                  <p className="text-xs text-slate-500">Venue: <strong>{evt.venueName}</strong> | Organizer: {evt.organizerName}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  evt.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {evt.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
