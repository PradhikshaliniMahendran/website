import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ShieldCheck, UserCheck, GraduationCap, Users, Plus, Mail, Lock, CheckCircle2 } from 'lucide-react';

export const UserRoleManagementView = () => {
  const { allAvailableUsers } = useAuth();
  const [userList, setUserList] = useState(allAvailableUsers);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('ALL');

  const filteredUsers = userList.filter(u => selectedRoleFilter === 'ALL' || u.role === selectedRoleFilter);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="bg-nexus-gradient rounded-3xl p-8 text-white shadow-nexus flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-white/10 text-campus-gold border border-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Midhurshan Module 1 Integration
          </span>
          <h1 className="font-heading font-extrabold text-3xl mt-2">User & Role Permission Management</h1>
          <p className="text-sm text-blue-100 mt-1">Manage user accounts, assign roles (ADMIN, STUDENT, CLUB_HEAD, FACULTY), and configure permissions.</p>
        </div>
      </div>

      {/* Role Filter & User Roster */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-nexus space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pb-4 border-b border-slate-100">
          <h3 className="font-heading font-bold text-lg text-slate-900">Registered Platform Stakeholders</h3>
          
          <div className="flex items-center gap-2">
            {['ALL', 'ADMIN', 'STUDENT', 'CLUB_HEAD', 'FACULTY'].map(role => (
              <button
                key={role}
                onClick={() => setSelectedRoleFilter(role)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedRoleFilter === role
                    ? 'bg-campus-royal text-white shadow-nexus'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-3.5">User</th>
                <th className="p-3.5">Email</th>
                <th className="p-3.5">Role Permission</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">ID / Code</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredUsers.map((usr) => (
                <tr key={usr.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 flex items-center gap-3">
                    <img src={usr.profile.avatar} alt={usr.name} className="w-8 h-8 rounded-full object-cover border" />
                    <span className="font-bold text-slate-900">{usr.name}</span>
                  </td>
                  <td className="p-3.5 text-slate-600 font-mono">{usr.email}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                      usr.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                      usr.role === 'FACULTY' ? 'bg-blue-100 text-blue-800' :
                      usr.role === 'CLUB_HEAD' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {usr.role}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600">{usr.profile.department}</td>
                  <td className="p-3.5 font-mono text-slate-500">{usr.profile.studentId}</td>
                  <td className="p-3.5 text-right">
                    <span className="text-emerald-600 font-bold flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
