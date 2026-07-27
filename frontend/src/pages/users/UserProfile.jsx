import React, { useState } from 'react';
import { User, Mail, Shield, Phone, Building, Key, Upload, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    fullName: user?.fullName || 'Dr. Eleanor Vance',
    email: user?.email || 'admin@university.edu',
    phone: '+1 (555) 234-5678',
    department: user?.department || 'Computer Science & Engineering',
  });

  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleProfileSave = (e) => {
    e.preventDefault();
    setSuccessMessage('Profile details updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    setSuccessMessage('Password changed successfully');
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Account & Profile Settings</h1>
        <p className="text-xs text-slate-400">Manage your profile details, avatar image, and password credentials</p>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Avatar Header Card */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center space-x-6">
        <div className="relative group">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt="Profile Avatar"
            className="w-20 h-20 rounded-2xl object-cover border-2 border-brand-500/40"
          />
          <button className="absolute inset-0 bg-slate-950/60 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
            <Upload className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-bold text-white">{profile.fullName}</h2>
          <p className="text-xs text-slate-400">{profile.department}</p>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
            {user?.roles?.[0] || 'ADMIN'}
          </span>
        </div>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <User className="w-4 h-4 text-brand-400" />
            <span>Personal Information</span>
          </h3>

          <form onSubmit={handleProfileSave} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-800 focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-800 focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Phone Number</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-800 focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Department</label>
              <input
                type="text"
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-800 focus:border-brand-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg transition-colors"
            >
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Key className="w-4 h-4 text-amber-400" />
            <span>Security & Password</span>
          </h3>

          <form onSubmit={handlePasswordChange} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Current Password</label>
              <input
                required
                type="password"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-800 focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">New Password</label>
              <input
                required
                type="password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-800 focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Confirm New Password</label>
              <input
                required
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-800 focus:border-brand-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-lg transition-colors"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
