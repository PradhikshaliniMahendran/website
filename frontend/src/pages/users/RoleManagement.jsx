import React, { useState } from 'react';
import { Shield, Plus, Check, Lock, Edit3 } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const RoleManagement = () => {
  const [roles, setRoles] = useState([
    {
      id: 'rol-1',
      name: 'ROLE_ADMIN',
      displayName: 'System Administrator',
      description: 'Full root access to all system modules, configurations, user activation, and security role matrix.',
      permissions: ['READ', 'WRITE', 'DELETE', 'MANAGE_USERS', 'MANAGE_ROLES', 'MANAGE_EVENTS', 'MANAGE_VENUES', 'APPROVE_LEVEL_2'],
    },
    {
      id: 'rol-2',
      name: 'ROLE_FACULTY_ADMINISTRATOR',
      displayName: 'Faculty Administrator',
      description: 'Reviews Level 1 event approval submissions, venue schedule allocations, and department event scheduling.',
      permissions: ['READ', 'WRITE', 'MANAGE_EVENTS', 'MANAGE_VENUES', 'APPROVE_LEVEL_1'],
    },
    {
      id: 'rol-3',
      name: 'ROLE_STUDENT_AFFAIRS_MANAGER',
      displayName: 'Student Affairs Manager',
      description: 'Final Level 2 event approval authority, campus venue policy governance, and activity compliance.',
      permissions: ['READ', 'WRITE', 'MANAGE_EVENTS', 'APPROVE_LEVEL_2'],
    },
    {
      id: 'rol-4',
      name: 'ROLE_EVENT_COORDINATOR',
      displayName: 'Event Coordinator',
      description: 'Creates and manages events, checks smart venue conflict detection, and submits for approvals.',
      permissions: ['READ', 'WRITE', 'CREATE_EVENT', 'EDIT_EVENT'],
    },
    {
      id: 'rol-5',
      name: 'ROLE_CLUB_PRESIDENT',
      displayName: 'Club President',
      description: 'Submits student club event proposals, requests venue bookings, and manages event galleries.',
      permissions: ['READ', 'CREATE_EVENT'],
    },
    {
      id: 'rol-6',
      name: 'ROLE_STUDENT',
      displayName: 'Student',
      description: 'Standard campus member. Explores published events, registers for tickets, and views venue schedules.',
      permissions: ['READ'],
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Role Based Access Control (RBAC)</h1>
        <p className="text-xs text-slate-400">Configure security roles and fine-grained permission assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
                  <Shield className="w-5 h-5" />
                </div>
                <Badge variant="info">{role.permissions.length} Permissions</Badge>
              </div>

              <h3 className="text-base font-bold text-white mt-4">{role.displayName}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{role.description}</p>
            </div>

            <div>
              <h4 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Granted Permissions</h4>
              <div className="flex flex-wrap gap-1">
                {role.permissions.map((p, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
