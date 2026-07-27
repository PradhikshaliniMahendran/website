import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Calendar,
  Layers,
  MapPin,
  CheckSquare,
  User,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
  const { user } = useAuth();

  const navigationSections = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
      ],
    },
    {
      title: 'MODULE 1: SECURITY & USERS',
      items: [
        { name: 'User Directory', path: '/users', icon: Users },
        { name: 'Role Management', path: '/roles', icon: ShieldCheck },
        { name: 'My Profile', path: '/profile', icon: User },
      ],
    },
    {
      title: 'MODULE 2: EVENT MANAGEMENT',
      items: [
        { name: 'Event Explorer', path: '/events', icon: Calendar },
        { name: 'Event Categories', path: '/categories', icon: Layers },
      ],
    },
    {
      title: 'MODULE 3: VENUE & APPROVALS',
      items: [
        { name: 'Venue Directory', path: '/venues', icon: MapPin },
        { name: 'Approval Inbox', path: '/approvals', icon: CheckSquare, badge: 'Workflow' },
      ],
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 min-h-screen border-r border-slate-800/80 bg-slate-950/90 backdrop-blur-xl flex flex-col justify-between p-4 selection:bg-brand-500">
      <div>
        {/* Brand Header */}
        <div className="flex items-center space-x-3 px-3 py-4 mb-6 border-b border-slate-800/80">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-white tracking-wide">UniEvent Pro</h1>
            <p className="text-[11px] font-medium text-slate-400">Enterprise Event System</p>
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="space-y-6">
          {navigationSections.map((section, sIdx) => (
            <div key={sIdx}>
              <h2 className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-brand-500/15 text-brand-400 font-semibold border border-brand-500/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                      }`
                    }
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded bg-brand-500/20 text-brand-300">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Footer Card */}
      {user && (
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between mt-6">
          <div className="flex items-center space-x-3 overflow-hidden">
            <img
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={user.fullName}
              className="w-8 h-8 rounded-full object-cover border border-slate-700"
            />
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">{user.fullName}</p>
              <p className="text-[10px] text-slate-400 truncate">{user.roles?.[0] || 'User'}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </div>
      )}
    </aside>
  );
};
