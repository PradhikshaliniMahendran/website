import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useEvents } from './contexts/EventContext';
import { Navbar } from './components/layout/Navbar';
import { EventCard } from './components/events/EventCard';
import { CreateEventModal } from './components/events/CreateEventModal';
import { AttendanceScannerModal } from './components/registration/AttendanceScannerModal';
import { ApprovalQueueModal } from './components/venues/ApprovalQueueModal';
import { QRCodeModal } from './components/registration/QRCodeModal';
import { ClubFeedView } from './components/clubs/ClubFeedView';
import { VenuesView } from './components/venues/VenuesView';
import { MyTicketsView } from './components/registration/MyTicketsView';
import { CertificatesView } from './components/certificates/CertificatesView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { ProfileView } from './components/auth/ProfileView';
import { Search, Filter, Sparkles, AlertCircle, CheckCircle2, Ticket } from 'lucide-react';

export function App() {
  const { currentUser } = useAuth();
  const { events, registerForEvent, toastMessage } = useEvents();

  const [activeTab, setActiveTab] = useState('events');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);
  const [selectedTicketModal, setSelectedTicketModal] = useState(null);

  // Filter events
  const filteredEvents = events.filter(evt => {
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.organizerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || evt.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-campus-bg text-campus-navy flex flex-col font-body">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateEvent={() => setIsCreateOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenApprovalQueue={() => setIsApprovalOpen(true)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className={`px-5 py-3 rounded-2xl shadow-nexus border text-xs font-bold flex items-center gap-2 text-white ${
            toastMessage.type === 'success' ? 'bg-emerald-600 border-emerald-400' :
            toastMessage.type === 'warning' ? 'bg-amber-600 border-amber-400' : 'bg-campus-royal border-campus-teal'
          }`}>
            {toastMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{toastMessage.msg}</span>
          </div>
        </div>
      )}

      {/* Main Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* EVENTS TAB */}
        {activeTab === 'events' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Hero Welcome Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-nexus-gradient p-8 md:p-10 text-white shadow-nexus">
              <div className="max-w-2xl space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-campus-gold">
                  <Sparkles className="w-3.5 h-3.5" /> Welcome back, {currentUser.name}
                </div>
                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl leading-tight">
                  Discover & Engage in Campus Events
                </h1>
                <p className="text-sm text-blue-100 leading-relaxed">
                  Real-time ticket registration, instant QR check-in passes, verified certificates, and active club societies.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsCreateOpen(true)}
                    className="bg-campus-gold hover:bg-amber-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-gold transition-all"
                  >
                    + Submit Event Proposal
                  </button>
                  <button
                    onClick={() => setActiveTab('my-tickets')}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-3 rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
                  >
                    <Ticket className="w-4 h-4 text-campus-teal" /> My Tickets
                  </button>
                </div>
              </div>

              {/* Background Glow Overlay */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-campus-teal/20 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Search & Filter Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search events by title, description or club..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-10 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-campus-royal"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                {['ALL', 'WORKSHOP', 'CULTURAL', 'SPORTS', 'SEMINAR'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-campus-royal text-white shadow-nexus'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

            </div>

            {/* Events Grid */}
            {filteredEvents.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border space-y-2">
                <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-heading font-bold text-slate-800">No Matching Events Found</h3>
                <p className="text-xs text-slate-500">Try adjusting your search terms or category filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(evt => (
                  <EventCard
                    key={evt.id}
                    event={evt}
                    onSelectEvent={(e) => setSelectedTicketModal(e)}
                    onRegister={(e) => registerForEvent(e, currentUser)}
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* OTHER TABS */}
        {activeTab === 'clubs' && <ClubFeedView />}
        {activeTab === 'venues' && <VenuesView />}
        {activeTab === 'my-tickets' && <MyTicketsView />}
        {activeTab === 'certificates' && <CertificatesView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'profile' && <ProfileView />}

      </main>

      {/* Footer */}
      <footer className="bg-campus-royal text-white border-t border-white/10 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2 text-xs text-blue-200">
          <p className="font-heading font-bold text-sm text-white">Campus Connect Ecosystem &copy; 2026</p>
          <p>Full-Stack Java 17 + Spring Boot 3.1 + MongoDB + React 18 Platform</p>
          <div className="flex justify-center gap-4 pt-2 text-white/70">
            <span>Member 1: User & JWT</span>
            <span>Member 2: Event CRUD</span>
            <span>Member 3: Venue Approval</span>
            <span>Member 4: QR Attendance</span>
            <span>Member 5: Clubs & Feed</span>
            <span>Member 6: Analytics & Certs</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CreateEventModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      <AttendanceScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
      <ApprovalQueueModal isOpen={isApprovalOpen} onClose={() => setIsApprovalOpen(false)} />

    </div>
  );
}
