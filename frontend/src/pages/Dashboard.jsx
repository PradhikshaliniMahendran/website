import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, CheckSquare, MapPin, Sparkles, TrendingUp, ArrowRight, Clock } from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { Link } from 'react-router-dom';
import api from '../services/api';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    users: { total: 1710, active: 1640 },
    events: { total: 48, published: 24, pending: 6 },
    approvals: { pending: 6, approved: 22 },
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard/summary');
        if (res && res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.warn('Using initial dashboard state');
      }
    };
    fetchStats();
  }, []);

  const sampleEvents = [
    {
      id: 'evt-1',
      eventCode: 'EVT-2026-X781',
      title: 'Global AI & Developer Hackathon 2026',
      venue: 'Grand Innovation Auditorium',
      date: 'Aug 12 - Aug 14, 2026',
      status: 'PUBLISHED',
      capacity: '184 / 350 seats',
    },
    {
      id: 'evt-2',
      eventCode: 'EVT-2026-N492',
      title: 'Annual Robotics & Embedded Systems Expo',
      venue: 'Cybersecurity & AI Complex Lab',
      date: 'Aug 20, 2026',
      status: 'PENDING_APPROVAL',
      capacity: '95 / 120 seats',
    },
    {
      id: 'evt-3',
      eventCode: 'EVT-2026-C109',
      title: 'Symphony of Lights Cultural Concert',
      venue: 'Central Campus Amphitheater',
      date: 'Sep 05, 2026',
      status: 'PUBLISHED',
      capacity: '820 / 1500 seats',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-card rounded-3xl p-8 border border-brand-500/20 relative overflow-hidden bg-gradient-to-r from-brand-900/40 via-slate-900 to-slate-950">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>University Event Planning & Management Suite</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Welcome back to the Command Center
          </h1>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Monitor live events, review multi-level approval queues, eliminate venue booking conflicts, and manage university security roles seamlessly.
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Registered Users"
          value={stats.users?.total || 1710}
          change="+12% this month"
          trend="up"
          icon={Users}
          color="brand"
        />
        <StatCard
          title="Published Events"
          value={stats.events?.published || 24}
          change="+8 active"
          trend="up"
          icon={Calendar}
          color="emerald"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.approvals?.pending || 6}
          change="Requires review"
          trend="down"
          icon={CheckSquare}
          color="amber"
        />
        <StatCard
          title="Campus Venues"
          value={12}
          change="100% operational"
          trend="up"
          icon={MapPin}
          color="purple"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Live Event Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Active Event Pipeline</h2>
              <p className="text-xs text-slate-400">Recent events across university departments</p>
            </div>
            <Link
              to="/events"
              className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center space-x-1"
            >
              <span>View All Events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {sampleEvents.map((evt) => (
              <motion.div
                key={evt.id}
                whileHover={{ scale: 1.01 }}
                className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[11px] text-brand-400 font-bold">{evt.eventCode}</span>
                    <Badge variant={evt.status}>{evt.status}</Badge>
                  </div>
                  <h3 className="font-bold text-sm text-white">{evt.title}</h3>
                  <div className="flex items-center space-x-4 text-xs text-slate-400">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{evt.venue}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{evt.date}</span>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-300">{evt.capacity}</span>
                  <p className="text-[10px] text-slate-500 mt-1">Live Registration</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Multi-Level Approval Quick Widget */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Approval Workflow Status</h2>
            <p className="text-xs text-slate-400">Pending reviews needing authorization</p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Level 1: Faculty Review</span>
              <span className="text-xs font-bold text-amber-400">4 Pending</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Level 2: Student Affairs</span>
              <span className="text-xs font-bold text-amber-400">2 Pending</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Approval Rate</span>
              <span className="text-xs font-bold text-emerald-400">92.4%</span>
            </div>

            <Link
              to="/approvals"
              className="w-full mt-2 inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-500 transition-colors shadow-lg shadow-brand-500/20"
            >
              Open Approval Inbox
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
