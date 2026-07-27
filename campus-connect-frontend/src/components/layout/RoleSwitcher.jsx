import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ShieldCheck, GraduationCap, Users, UserCheck } from 'lucide-react';

export const RoleSwitcher = () => {
  const { currentUser, switchUserRole, allAvailableUsers } = useAuth();

  const getRoleIcon = (role) => {
    switch (role) {
      case 'ADMIN': return <ShieldCheck className="w-4 h-4 text-purple-400" />;
      case 'STUDENT': return <GraduationCap className="w-4 h-4 text-emerald-400" />;
      case 'CLUB_HEAD': return <Users className="w-4 h-4 text-amber-400" />;
      case 'FACULTY': return <UserCheck className="w-4 h-4 text-blue-400" />;
      default: return null;
    }
  };

  return (
    <div className="flex items-center gap-2 bg-campus-royal/80 border border-white/20 rounded-full px-3 py-1.5 shadow-md">
      <span className="text-xs text-white/70 font-medium hidden md:inline">Role View:</span>
      <select
        value={currentUser.id}
        onChange={(e) => switchUserRole(e.target.value)}
        className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer pr-1"
      >
        {allAvailableUsers.map((u) => (
          <option key={u.id} value={u.id} className="bg-campus-navy text-white">
            {u.name} ({u.role})
          </option>
        ))}
      </select>
      {getRoleIcon(currentUser.role)}
    </div>
  );
};
