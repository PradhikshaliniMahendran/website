import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useEvents } from '../../contexts/EventContext';
import { RoleSwitcher } from './RoleSwitcher';
import { 
  Calendar, 
  Users, 
  Building2, 
  BarChart3, 
  QrCode, 
  Award, 
  Bell, 
  PlusCircle, 
  ScanLine, 
  CheckSquare,
  Sparkles
} from 'lucide-react';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  onOpenCreateEvent, 
  onOpenScanner,
  onOpenApprovalQueue 
}) => {
  const { currentUser, isAdmin, isFaculty, isClubHead } = useAuth();
  const { events, announcements } = useEvents();

  const pendingApprovalsCount = events.filter(e => e.status === 'PENDING').length;

  return (
    <header className="sticky top-0 z-40 bg-campus-royal/95 backdrop-blur-md border-b border-white/10 text-white shadow-nexus">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('events')}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-campus-gold via-campus-orange to-campus-teal flex items-center justify-center shadow-gold animate-pulse">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-campus-gold">
                  CAMPUS CONNECT
                </span>
                <span className="bg-campus-gold/20 text-campus-gold border border-campus-gold/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Nexus 2.0
                </span>
              </div>
              <p className="text-[11px] text-blue-200 font-medium tracking-wide">University Event Intelligence Ecosystem</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-2xl p-1.5 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'events' ? 'bg-campus-gold text-white shadow-gold' : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" /> Events
            </button>

            <button
              onClick={() => setActiveTab('clubs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'clubs' ? 'bg-campus-gold text-white shadow-gold' : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" /> Clubs & Feed
            </button>

            <button
              onClick={() => setActiveTab('venues')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'venues' ? 'bg-campus-gold text-white shadow-gold' : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" /> Venues
            </button>

            <button
              onClick={() => setActiveTab('my-tickets')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'my-tickets' ? 'bg-campus-gold text-white shadow-gold' : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <QrCode className="w-4 h-4" /> My Tickets
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'certificates' ? 'bg-campus-gold text-white shadow-gold' : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" /> Certificates
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'analytics' ? 'bg-campus-gold text-white shadow-gold' : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Analytics
            </button>
          </nav>

          {/* Action Buttons & Profile Controls */}
          <div className="flex items-center gap-3">
            
            {/* QR Attendance Scanner Button */}
            {(isAdmin || isFaculty || isClubHead) && (
              <button
                onClick={onOpenScanner}
                className="hidden sm:flex items-center gap-1.5 bg-campus-teal/20 hover:bg-campus-teal/30 border border-campus-teal/50 text-campus-teal text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-sm"
                title="Scan QR Tickets for Check-in"
              >
                <ScanLine className="w-4 h-4 animate-pulse" />
                <span>QR Scanner</span>
              </button>
            )}

            {/* Faculty / Admin Approval Queue Badge */}
            {(isAdmin || isFaculty) && (
              <button
                onClick={onOpenApprovalQueue}
                className="relative flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all"
                title="Faculty & Admin Venue Approval Queue"
              >
                <CheckSquare className="w-4 h-4 text-amber-400" />
                <span className="hidden md:inline">Approvals</span>
                {pendingApprovalsCount > 0 && (
                  <span className="bg-campus-orange text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                    {pendingApprovalsCount}
                  </span>
                )}
              </button>
            )}

            {/* Create Event Button */}
            <button
              onClick={onOpenCreateEvent}
              className="flex items-center gap-2 bg-gradient-to-r from-campus-gold to-campus-orange hover:from-amber-600 hover:to-orange-600 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-gold hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle className="w-4.5 h-4.5" />
              <span>Create Event</span>
            </button>

            {/* Persona Switcher */}
            <RoleSwitcher />

            {/* User Avatar */}
            <img
              src={currentUser.profile.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full border-2 border-campus-gold object-cover shadow-sm cursor-pointer"
              title={`${currentUser.name} (${currentUser.role})`}
              onClick={() => setActiveTab('profile')}
            />
          </div>

        </div>
      </div>
    </header>
  );
};
