import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useEvents } from '../../contexts/EventContext';
import { Users, Megaphone, PlusCircle, ShieldCheck, Tag, ExternalLink, MessageSquare } from 'lucide-react';

export const ClubFeedView = () => {
  const { currentUser } = useAuth();
  const { clubs, announcements, createAnnouncement, createClub } = useEvents();
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' or 'clubs'

  const [showAncModal, setShowAncModal] = useState(false);
  const [showClubModal, setShowClubModal] = useState(false);

  const [ancForm, setAncForm] = useState({
    clubId: clubs[0]?.id || '',
    title: '',
    content: '',
    type: 'IMPORTANT',
    priority: 'HIGH',
    targetAudience: 'ALL'
  });

  const [clubForm, setClubForm] = useState({
    name: '',
    category: 'TECHNICAL',
    description: '',
    headName: currentUser.name,
    facultyAdvisor: 'Prof. Sarah Jenkins',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=300',
    banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
  });

  const handleAncSubmit = (e) => {
    e.preventDefault();
    const selectedClub = clubs.find(c => c.id === ancForm.clubId);
    createAnnouncement({
      ...ancForm,
      clubName: selectedClub?.name || "University Society"
    });
    setShowAncModal(false);
  };

  const handleClubSubmit = (e) => {
    e.preventDefault();
    createClub({
      ...clubForm,
      headId: currentUser.id
    });
    setShowClubModal(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="bg-nexus-gradient rounded-3xl p-8 text-white shadow-nexus flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/10 text-campus-gold border border-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Member 5 Engine
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl">Campus Clubs & Announcement Feed</h1>
          <p className="text-sm text-blue-100 mt-1">Discover student societies, join organizations, and broadcast real-time campus announcements.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowClubModal(true)}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs px-4 py-3 rounded-xl flex items-center gap-2 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-campus-gold" /> Register New Club
          </button>
          <button
            onClick={() => setShowAncModal(true)}
            className="bg-campus-gold hover:bg-amber-600 text-white font-bold text-xs px-4 py-3 rounded-xl flex items-center gap-2 shadow-gold transition-all"
          >
            <Megaphone className="w-4 h-4" /> Post Announcement
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => setActiveTab('feed')}
          className={`pb-3 font-heading font-bold text-sm flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'feed' ? 'border-campus-royal text-campus-royal' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Megaphone className="w-4 h-4" /> Live Announcement Feed ({announcements.length})
        </button>

        <button
          onClick={() => setActiveTab('clubs')}
          className={`pb-3 font-heading font-bold text-sm flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'clubs' ? 'border-campus-royal text-campus-royal' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" /> Campus Clubs Roster ({clubs.length})
        </button>
      </div>

      {/* FEED TAB CONTENT */}
      {activeTab === 'feed' && (
        <div className="space-y-4 max-w-3xl">
          {announcements.map((anc) => (
            <div key={anc.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-nexus space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-campus-royal bg-campus-royal/10 px-3 py-1 rounded-full">
                  {anc.clubName}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {new Date(anc.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg text-slate-900">{anc.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{anc.content}</p>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold uppercase">Target: {anc.targetAudience}</span>
                <button
                  onClick={() => alert(`Replied to announcement: ${anc.title}`)}
                  className="text-campus-teal font-bold flex items-center gap-1 hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Direct Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CLUBS TAB CONTENT */}
      {activeTab === 'clubs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <div key={club.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-nexus flex flex-col justify-between">
              <div>
                <div className="h-36 w-full relative">
                  <img src={club.banner} alt={club.name} className="w-full h-full object-cover" />
                  <div className="absolute -bottom-6 left-6 w-14 h-14 rounded-2xl border-4 border-white overflow-hidden shadow-md bg-white">
                    <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="p-6 pt-8 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-heading font-bold text-lg text-slate-900 leading-tight">{club.name}</h3>
                    <span className="bg-campus-gold/10 text-campus-gold font-extrabold text-[10px] px-2.5 py-0.5 rounded-full">
                      {club.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{club.description}</p>

                  <div className="pt-2 text-xs space-y-1 text-slate-500 font-medium">
                    <p>Club Head: <strong className="text-slate-800">{club.headName}</strong></p>
                    <p>Faculty Advisor: <strong className="text-slate-800">{club.facultyAdvisor}</strong></p>
                    <p className="text-campus-teal font-bold">{club.membersCount} Active Student Members</p>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                <button
                  onClick={() => alert(`Joined ${club.name}!`)}
                  className="bg-campus-royal hover:bg-campus-ocean text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-nexus"
                >
                  Join Society
                </button>
                <span className="text-xs text-slate-400 font-bold">{club.eventsCount} Events Held</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE ANNOUNCEMENT MODAL */}
      {showAncModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-nexus-lg border space-y-4">
            <h3 className="font-heading font-bold text-lg text-slate-900">Post Club Announcement</h3>
            <form onSubmit={handleAncSubmit} className="space-y-3 text-xs font-bold text-slate-700">
              <div>
                <label className="block uppercase mb-1">Select Club</label>
                <select
                  value={ancForm.clubId}
                  onChange={e => setAncForm({ ...ancForm, clubId: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl"
                >
                  {clubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block uppercase mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hackathon Mentor Applications Open"
                  value={ancForm.title}
                  onChange={e => setAncForm({ ...ancForm, title: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl"
                />
              </div>

              <div>
                <label className="block uppercase mb-1">Content</label>
                <textarea
                  rows={3}
                  required
                  value={ancForm.content}
                  onChange={e => setAncForm({ ...ancForm, content: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAncModal(false)} className="px-4 py-2 border rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-campus-royal text-white rounded-xl font-bold">Publish Announcement</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE CLUB MODAL */}
      {showClubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-nexus-lg border space-y-4">
            <h3 className="font-heading font-bold text-lg text-slate-900">Register New Student Society</h3>
            <form onSubmit={handleClubSubmit} className="space-y-3 text-xs font-bold text-slate-700">
              <div>
                <label className="block uppercase mb-1">Club Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robotics & IoT Innovators"
                  value={clubForm.name}
                  onChange={e => setClubForm({ ...clubForm, name: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl"
                />
              </div>

              <div>
                <label className="block uppercase mb-1">Category</label>
                <select
                  value={clubForm.category}
                  onChange={e => setClubForm({ ...clubForm, category: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl"
                >
                  <option value="TECHNICAL">TECHNICAL</option>
                  <option value="CULTURAL">CULTURAL</option>
                  <option value="SPORTS">SPORTS</option>
                  <option value="ART">ART</option>
                </select>
              </div>

              <div>
                <label className="block uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={clubForm.description}
                  onChange={e => setClubForm({ ...clubForm, description: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowClubModal(false)} className="px-4 py-2 border rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-campus-gold text-white rounded-xl font-bold">Register Society</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
