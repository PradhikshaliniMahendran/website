import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useEvents } from '../../contexts/EventContext';
import { 
  Calendar, 
  Users, 
  Building2, 
  BarChart3, 
  QrCode, 
  Award, 
  PlusCircle, 
  ScanLine, 
  CheckSquare,
  Sparkles,
  LogOut,
  ChevronDown,
  User,
  ShieldCheck
} from 'lucide-react';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  onOpenCreateEvent, 
  onOpenScanner,
  onOpenApprovalQueue,
  onOpenLogin
}) => {
  const { currentUser, isAdmin, isFaculty, isClubHead, logout } = useAuth();
  const { events, registrations } = useEvents();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const pendingApprovalsCount = events.filter(e => e.status === 'PENDING').length;
  const myTicketsCount = registrations.filter(r => r.userId === currentUser?.id).length;

  return (
    <header className="sticky top-0 z-40 bg-campus-navy/95 backdrop-blur-xl border-b border-slate-800 text-white shadow-nexus">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2">
          
          {/* 1. Brand Emblem & Name */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer group shrink-0" 
            onClick={() => setActiveTab('events')}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-campus-gold via-campus-orange to-campus-teal flex items-center justify-center shadow-gold group-hover:scale-105 transition-all">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white leading-none">
                CAMPUS<span className="text-campus-gold">CONNECT</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide mt-1">
                Event Planning Platform
              </span>
            </div>
          </div>

          {/* 2. Main Navigation Bar */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 border border-slate-800 rounded-2xl p-1.5">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'events' ? 'bg-campus-gold text-white shadow-gold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" /> Events
            </button>

            <button
              onClick={() => setActiveTab('clubs')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'clubs' ? 'bg-campus-gold text-white shadow-gold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" /> Clubs
            </button>

            <button
              onClick={() => setActiveTab('venues')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'venues' ? 'bg-campus-gold text-white shadow-gold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" /> Venues
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'analytics' ? 'bg-campus-gold text-white shadow-gold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" /> Analytics
            </button>
          </nav>

          {/* 3. Compact Action Cluster & Profile Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* My Tickets */}
            <button
              onClick={() => setActiveTab('my-tickets')}
              className={`relative p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                activeTab === 'my-tickets'
                  ? 'bg-campus-royal text-white border-campus-teal'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
              title="My Tickets & QR Code"
            >
              <QrCode className="w-4 h-4 text-campus-gold" />
              <span className="hidden xl:inline">Tickets</span>
              {myTicketsCount > 0 && (
                <span className="bg-campus-gold text-white text-[10px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {myTicketsCount}
                </span>
              )}
            </button>

            {/* Faculty Approvals Queue */}
            {(isAdmin || isFaculty) && (
              <button
                onClick={onOpenApprovalQueue}
                className="relative p-2 sm:px-3 sm:py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                title="Faculty Approvals Queue"
              >
                <CheckSquare className="w-4 h-4 text-amber-400" />
                {pendingApprovalsCount > 0 && (
                  <span className="bg-campus-orange text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                    {pendingApprovalsCount}
                  </span>
                )}
              </button>
            )}

            {/* QR Scanner */}
            {(isAdmin || isFaculty || isClubHead) && (
              <button
                onClick={onOpenScanner}
                className="p-2 sm:px-3 sm:py-2 bg-campus-teal/10 hover:bg-campus-teal/20 border border-campus-teal/30 text-campus-teal text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                title="Scan QR Tickets"
              >
                <ScanLine className="w-4 h-4" />
              </button>
            )}

            {/* Primary CTA: + Plan Event */}
            <button
              onClick={onOpenCreateEvent}
              className="flex items-center gap-1 bg-gradient-to-r from-campus-gold to-campus-orange hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl shadow-gold transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="whitespace-nowrap">Plan Event</span>
            </button>

            {/* 4. Completely Self-Contained User Profile Dropdown Pill */}
            <div className="relative shrink-0">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-1.5 pl-2 transition-all shadow-md"
              >
                <img
                  src={currentUser?.profile?.avatar}
                  alt={currentUser?.name}
                  className="w-7 h-7 rounded-full border border-campus-gold object-cover shrink-0"
                />
                <div className="text-left leading-none hidden sm:block pr-1">
                  <p className="font-bold text-xs text-white max-w-[85px] truncate">
                    {currentUser?.name?.split(' ')[0]}
                  </p>
                  <span className="text-[9px] font-extrabold text-campus-gold uppercase mt-0.5 block">
                    {currentUser?.role}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {/* Profile Dropdown Popup Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50 text-xs space-y-2 animate-fade-in">
                  <div className="p-3 bg-slate-800/80 rounded-xl space-y-1">
                    <p className="font-bold text-white text-sm">{currentUser?.name}</p>
                    <p className="text-slate-400 text-[11px] truncate">{currentUser?.email}</p>
                    <span className="inline-block bg-campus-gold/20 text-campus-gold text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase mt-1">
                      Role: {currentUser?.role}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left p-2 hover:bg-slate-800 rounded-xl font-semibold text-slate-200 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-campus-teal" /> My Profile & Badges
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onOpenLogin();
                    }}
                    className="w-full text-left p-2 hover:bg-slate-800 rounded-xl font-semibold text-slate-200 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-campus-gold" /> Switch Authenticated Account
                  </button>

                  <div className="pt-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left p-2 hover:bg-rose-500/10 text-rose-400 rounded-xl font-bold flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
