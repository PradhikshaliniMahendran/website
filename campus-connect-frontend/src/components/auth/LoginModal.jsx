import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, Key, GraduationCap, Building2 } from 'lucide-react';

export const LoginModal = ({ isOpen, onClose }) => {
  const { login, register, authError } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register state
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT',
    department: 'Computer Science & Engineering',
    studentId: `STU-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300'
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      onClose();
    } else {
      setErrorMsg(res.message || 'Invalid authentication credentials!');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const res = await register({
      name: regData.name,
      email: regData.email,
      password: regData.password,
      role: regData.role,
      profile: {
        studentId: regData.studentId,
        department: regData.department,
        year: 3,
        avatar: regData.avatar,
        bio: 'Campus Connect Member',
        interests: ['Campus Events', 'Innovation']
      }
    });
    setLoading(false);
    if (res.success) {
      onClose();
    } else {
      setErrorMsg(res.message || 'Registration failed.');
    }
  };

  // Quick Demo Authenticated Logins
  const demoFill = (demoUser) => {
    if (demoUser === 'STUDENT') {
      setEmail('shalini@student.university.edu');
      setPassword('password123');
    } else if (demoUser === 'ADMIN') {
      setEmail('robert.vance@university.edu');
      setPassword('adminpass123');
    } else if (demoUser === 'CLUB_HEAD') {
      setEmail('midhurshan@student.university.edu');
      setPassword('headpass123');
    } else if (demoUser === 'FACULTY') {
      setEmail('sarah.jenkins@faculty.university.edu');
      setPassword('facpass123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-nexus-lg border border-slate-200 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-nexus-gradient p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <ShieldCheck className="w-7 h-7 text-campus-gold" />
          </div>

          <h3 className="font-heading font-extrabold text-xl">
            {isRegisterMode ? 'Create Authenticated Account' : 'Campus Nexus Security Login'}
          </h3>
          <p className="text-xs text-blue-100 mt-1">
            JWT Encrypted Role Authentication & Confidentiality Gate
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">

          {/* Quick Authenticated Demo Fill Options */}
          {!isRegisterMode && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                🔑 Quick Demo Authenticated Logins (Enforces Confidentiality):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => demoFill('STUDENT')}
                  className="bg-emerald-50 text-emerald-700 border border-emerald-200 py-1.5 rounded-lg hover:bg-emerald-100"
                >
                  Student (Shalini)
                </button>
                <button
                  type="button"
                  onClick={() => demoFill('CLUB_HEAD')}
                  className="bg-amber-50 text-amber-700 border border-amber-200 py-1.5 rounded-lg hover:bg-amber-100"
                >
                  Club Head (Midhurshan)
                </button>
                <button
                  type="button"
                  onClick={() => demoFill('FACULTY')}
                  className="bg-blue-50 text-blue-700 border border-blue-200 py-1.5 rounded-lg hover:bg-blue-100"
                >
                  Faculty Advisor
                </button>
                <button
                  type="button"
                  onClick={() => demoFill('ADMIN')}
                  className="bg-purple-50 text-purple-700 border border-purple-200 py-1.5 rounded-lg hover:bg-purple-100"
                >
                  System Admin
                </button>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {!isRegisterMode ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. student@university.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-campus-royal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-campus-royal"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-campus-royal hover:bg-campus-ocean text-white font-bold text-xs py-3 rounded-xl shadow-nexus flex items-center justify-center gap-2"
              >
                {loading ? 'Authenticating Token...' : 'Sign In with Confidential JWT'}
              </button>

              <div className="text-center pt-2 text-xs">
                <span className="text-slate-500">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(true)}
                  className="font-bold text-campus-royal hover:underline"
                >
                  Register Account
                </button>
              </div>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={regData.name}
                  onChange={e => setRegData({ ...regData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@university.edu"
                    value={regData.email}
                    onChange={e => setRegData({ ...regData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={regData.password}
                    onChange={e => setRegData({ ...regData, password: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Role Permission</label>
                  <select
                    value={regData.role}
                    onChange={e => setRegData({ ...regData, role: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    <option value="STUDENT">STUDENT</option>
                    <option value="CLUB_HEAD">CLUB_HEAD</option>
                    <option value="FACULTY">FACULTY</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={regData.department}
                    onChange={e => setRegData({ ...regData, department: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-campus-gold hover:bg-amber-600 text-white font-bold text-xs py-3 rounded-xl shadow-gold mt-2"
              >
                {loading ? 'Creating User...' : 'Complete Registration'}
              </button>

              <div className="text-center pt-2 text-xs">
                <span className="text-slate-500">Already registered? </span>
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(false)}
                  className="font-bold text-campus-royal hover:underline"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
