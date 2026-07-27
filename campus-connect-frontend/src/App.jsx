import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useEvents } from './contexts/EventContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { EventCard } from './components/events/EventCard';
import { CreateEventModal } from './components/events/CreateEventModal';
import { AttendanceScannerModal } from './components/registration/AttendanceScannerModal';
import { ApprovalQueueModal } from './components/venues/ApprovalQueueModal';
import { QRCodeModal } from './components/registration/QRCodeModal';
import { LoginModal } from './components/auth/LoginModal';
import { EventCalendarView } from './components/events/EventCalendarView';
import { UserRoleManagementView } from './components/admin/UserRoleManagementView';
import { ClubFeedView } from './components/clubs/ClubFeedView';
import { VenuesView } from './components/venues/VenuesView';
import { MyTicketsView } from './components/registration/MyTicketsView';
import { CertificatesView } from './components/certificates/CertificatesView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { ProfileView } from './components/auth/ProfileView';
import { Search, Sparkles, AlertCircle, CheckCircle2, Ticket, Database, ShieldCheck } from 'lucide-react';

export function App() {
  const { currentUser, isLoginModalOpen, setIsLoginModalOpen, mongoConnected } = useAuth();
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
    <div className="min-h-screen bg-campus-bg text-campus-navy flex flex-col font-body antialiased selection:bg-campus-gold selection:text-white">
      
      {/* Sleek Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateEvent={() => setIsCreateOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenApprovalQueue={() => setIsApprovalOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
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

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* MongoDB Connection Status Bar */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
          mongoConnected
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-slate-100 border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center gap-2.5">
            <Database className={`w-5 h-5 shrink-0 ${mongoConnected ? 'text-emerald-600' : 'text-slate-500'}`} />
            <div>
              <span className="font-bold">
                {mongoConnected ? 'Connected to Spring Boot & MongoDB Backend' : 'Running in Interactive Event Engine Mode'}
              </span>
              <p className="text-[11px] opacity-80">
                {mongoConnected
                  ? 'All registrations, event creations, and certificates are synced with MongoDB 6.0.'
                  : 'Full state engine active. Midhurshan & Shalini modules combined. Connect Spring Boot backend for DB sync.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="bg-white border text-[11px] font-bold px-3 py-1 rounded-xl shadow-xs flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-campus-royal" /> {currentUser?.name} ({currentUser?.role})
            </span>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-campus-royal text-white font-bold text-[11px] px-3 py-1 rounded-xl shadow-xs hover:bg-campus-ocean transition-colors"
            >
              Authenticate Account
            </button>
          </div>
        </div>

        {/* EVENTS TAB */}
        {activeTab === 'events' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Hero Event Planning Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-nexus-gradient p-8 md:p-10 text-white shadow-nexus">
              <div className="max-w-2xl space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-campus-gold">
                  <Sparkles className="w-3.5 h-3.5" /> Integrated University Event Management Platform
                </div>
                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl leading-tight">
                  Plan, Organize & Join Campus Events
                </h1>
                <p className="text-sm text-blue-100 leading-relaxed">
                  The centralized platform for event proposals, venue slot allocation, ticket registration, live QR attendance check-ins, master calendar, and verified credentials.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsCreateOpen(true)}
                    className="bg-campus-gold hover:bg-amber-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-gold transition-all"
                  >
                    + Plan & Propose New Event
                  </button>
                  <button
                    onClick={() => setActiveTab('my-tickets')}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-3 rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
                  >
                    <Ticket className="w-4 h-4 text-campus-teal" /> My Event Tickets
                  </button>
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-campus-teal/20 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Search & Filter Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              
              {/* Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search campus events by title, description, speaker or club..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-10 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-campus-royal"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {['ALL', 'WORKSHOP', 'CULTURAL', 'SPORTS', 'SEMINAR'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
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
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-2">
                <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-heading font-bold text-slate-800">No Matching Events Found</h3>
                <p className="text-xs text-slate-500">Try adjusting your search terms or category filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
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

        {/* OTHER INTEGRATED TABS */}
        {activeTab === 'calendar' && <EventCalendarView onOpenCreateEvent={() => setIsCreateOpen(true)} />}
        {activeTab === 'clubs' && <ClubFeedView />}
        {activeTab === 'venues' && <VenuesView />}
        {activeTab === 'my-tickets' && <MyTicketsView />}
        {activeTab === 'certificates' && <CertificatesView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'users' && <UserRoleManagementView />}
        {activeTab === 'profile' && <ProfileView />}

      </main>

      {/* Professional Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Modals */}
      <CreateEventModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      <AttendanceScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
      <ApprovalQueueModal isOpen={isApprovalOpen} onClose={() => setIsApprovalOpen(false)} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

    </div>
  );
}
