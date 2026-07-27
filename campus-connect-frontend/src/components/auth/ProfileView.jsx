import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, ShieldCheck, Mail, Phone, BookOpen, Key, Lock, CheckCircle2 } from 'lucide-react';

export const ProfileView = () => {
  const { currentUser, jwtToken } = useAuth();

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-nexus p-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={currentUser.profile.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-3xl object-cover border-4 border-campus-gold shadow-nexus shrink-0"
          />
          <div className="text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900">{currentUser.name}</h2>
              <span className="bg-campus-royal text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold">{currentUser.profile.department}</p>
            <p className="text-xs text-slate-600 italic mt-1">"{currentUser.profile.bio}"</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-2xl border flex items-center gap-3">
            <Mail className="w-5 h-5 text-campus-royal shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Official Email</span>
              <span className="font-bold text-slate-800">{currentUser.email}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border flex items-center gap-3">
            <User className="w-5 h-5 text-campus-teal shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">University ID</span>
              <span className="font-bold text-slate-800">{currentUser.profile.studentId}</span>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="space-y-2">
          <h4 className="font-heading font-bold text-xs uppercase text-slate-700 tracking-wider">Interests & Specializations</h4>
          <div className="flex flex-wrap gap-2">
            {currentUser.profile.interests.map((int, idx) => (
              <span key={idx} className="bg-campus-gold/10 text-campus-gold border border-campus-gold/30 text-xs font-bold px-3 py-1 rounded-xl">
                {int}
              </span>
            ))}
          </div>
        </div>

        {/* Security & JWT Token Verification */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h4 className="font-heading font-bold text-xs uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-campus-royal" /> Security & JWT Token Claims (Member 1)
          </h4>

          <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl font-mono text-xs space-y-2 overflow-x-auto">
            <p className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Authenticated via Spring Security JWT Token
            </p>
            <p className="text-slate-400 text-[11px] truncate">Token: {jwtToken}</p>
            <p className="text-slate-400 text-[11px]">Role Granted: ROLE_{currentUser.role}</p>
          </div>
        </div>

      </div>

    </div>
  );
};
