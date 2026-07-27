import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, LogOut, Shield, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = () => {
  const { user, logout, switchDemoRole } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const rolesList = [
    { label: 'Admin', role: 'ADMIN' },
    { label: 'Student', role: 'STUDENT' },
    { label: 'Club President', role: 'CLUB_PRESIDENT' },
    { label: 'Event Coordinator', role: 'EVENT_COORDINATOR' },
    { label: 'Faculty Administrator', role: 'FACULTY_ADMINISTRATOR' },
    { label: 'Student Affairs Manager', role: 'STUDENT_AFFAIRS_MANAGER' },
  ];

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between">
      {/* Search Bar */}
      <div className="relative w-80">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search events, venues, requests..."
          className="w-full bg-slate-900/90 text-xs text-white placeholder-slate-500 pl-9 pr-4 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-brand-500 transition-all"
        />
      </div>

      {/* Action Controls */}
      <div className="flex items-center space-x-3">
        {/* Quick Role Switcher Pill (For easy testing during review!) */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-semibold hover:bg-brand-500/20 transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Role: {user?.roles?.[0]?.replace('ROLE_', '') || 'ADMIN'}</span>
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-56 glass-panel rounded-xl shadow-2xl p-1.5 border border-slate-800 z-50">
              <div className="px-2 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Switch Role Context
              </div>
              {rolesList.map((r) => (
                <button
                  key={r.role}
                  onClick={() => {
                    switchDemoRole(r.role);
                    setShowRoleMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between transition-colors"
                >
                  <span>{r.label}</span>
                  {user?.roles?.includes(`ROLE_${r.role}`) && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
          title="Toggle Theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Bell */}
        <button className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="p-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
