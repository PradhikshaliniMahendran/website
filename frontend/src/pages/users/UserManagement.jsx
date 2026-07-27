import React, { useState } from 'react';
import { Search, UserPlus, Shield, CheckCircle, XCircle, Filter, Edit, Key } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 'usr-1',
      username: 'admin',
      fullName: 'Dr. Eleanor Vance',
      email: 'admin@university.edu',
      department: 'Computer Science & Engineering',
      roles: ['ADMIN'],
      active: true,
    },
    {
      id: 'usr-2',
      username: 'faculty_admin',
      fullName: 'Prof. Robert Sterling',
      email: 'faculty@university.edu',
      department: 'Academic Affairs',
      roles: ['FACULTY_ADMINISTRATOR'],
      active: true,
    },
    {
      id: 'usr-3',
      username: 'affairs_manager',
      fullName: 'Marcus Aurelius Chen',
      email: 'affairs@university.edu',
      department: 'Student Affairs Division',
      roles: ['STUDENT_AFFAIRS_MANAGER'],
      active: true,
    },
    {
      id: 'usr-4',
      username: 'student1',
      fullName: 'Sophia Martinez',
      email: 'student1@university.edu',
      department: 'Software Engineering',
      roles: ['STUDENT', 'CLUB_PRESIDENT'],
      active: true,
    },
    {
      id: 'usr-5',
      username: 'coord_tech',
      fullName: 'David Miller',
      email: 'david.m@university.edu',
      department: 'IEEE Student Branch',
      roles: ['EVENT_COORDINATOR'],
      active: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', email: '', fullName: '', department: '', role: 'STUDENT' });

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.roles.includes(roleFilter);
    return matchesSearch && matchesRole;
  });

  const toggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u))
    );
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    const created = {
      id: `usr-${Date.now()}`,
      username: newUser.username,
      fullName: newUser.fullName,
      email: newUser.email,
      department: newUser.department,
      roles: [newUser.role],
      active: true,
    };
    setUsers([created, ...users]);
    setIsModalOpen(false);
    setNewUser({ username: '', email: '', fullName: '', department: '', role: 'STUDENT' });
  };

  const columns = [
    {
      header: 'User Details',
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 font-bold flex items-center justify-center text-xs">
            {row.fullName.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-white">{row.fullName}</p>
            <p className="text-[11px] text-slate-400">@{row.username}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Email & Dept',
      cell: (row) => (
        <div>
          <p className="text-xs text-slate-300">{row.email}</p>
          <p className="text-[11px] text-slate-500">{row.department}</p>
        </div>
      ),
    },
    {
      header: 'Assigned Roles',
      cell: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.roles.map((r, idx) => (
            <Badge key={idx} variant="info">
              {r.replace('ROLE_', '')}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      header: 'Account Status',
      cell: (row) => (
        <Badge variant={row.active ? 'approved' : 'rejected'}>
          {row.active ? 'Active' : 'Deactivated'}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleUserStatus(row.id)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
              row.active
                ? 'border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'
                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
            }`}
          >
            {row.active ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">User Directory & Security</h1>
          <p className="text-xs text-slate-400">Manage user accounts, activation status, and security roles</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-500/20 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register New User</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or department..."
            className="w-full bg-slate-900 text-xs text-white placeholder-slate-500 pl-9 pr-4 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center space-x-3">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-900 text-xs text-slate-300 py-2 px-3 rounded-xl border border-slate-800 focus:outline-none focus:border-brand-500"
          >
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY_ADMINISTRATOR">Faculty Administrator</option>
            <option value="STUDENT_AFFAIRS_MANAGER">Student Affairs Manager</option>
            <option value="EVENT_COORDINATOR">Event Coordinator</option>
            <option value="CLUB_PRESIDENT">Club President</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <DataTable columns={columns} data={filteredUsers} page={0} totalPages={1} />

      {/* Register User Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register University User">
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              required
              type="text"
              value={newUser.fullName}
              onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
              className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-800 focus:border-brand-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Username</label>
              <input
                required
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-800 focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                required
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-800 focus:border-brand-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
            <input
              type="text"
              value={newUser.department}
              onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
              className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-800 focus:border-brand-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Security Role</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full bg-slate-900 text-xs text-slate-300 p-2.5 rounded-xl border border-slate-800 focus:border-brand-500"
            >
              <option value="STUDENT">Student</option>
              <option value="CLUB_PRESIDENT">Club President</option>
              <option value="EVENT_COORDINATOR">Event Coordinator</option>
              <option value="FACULTY_ADMINISTRATOR">Faculty Administrator</option>
              <option value="STUDENT_AFFAIRS_MANAGER">Student Affairs Manager</option>
              <option value="ADMIN">System Administrator</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-500"
            >
              Save & Register
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
