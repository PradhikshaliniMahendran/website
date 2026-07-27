import React from 'react';
import { useEvents } from '../../contexts/EventContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { BarChart3, TrendingUp, Users, Calendar, Award, Download } from 'lucide-react';

export const AnalyticsView = () => {
  const { analytics } = useEvents();

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-nexus-gradient rounded-3xl p-8 text-white shadow-nexus flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/10 text-campus-gold border border-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Member 6 Engine
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl">Campus Engagement Analytics</h1>
          <p className="text-sm text-blue-100 mt-1">Real-time attendance trends, club rankings, and student participation metrics.</p>
        </div>
        <button
          onClick={() => alert("Analytics report exported to PDF and Excel!")}
          className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-sm transition-all"
        >
          <Download className="w-4 h-4 text-campus-gold" /> Export PDF / Excel
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-nexus flex items-center gap-4">
          <div className="p-3.5 bg-campus-royal/10 text-campus-royal rounded-2xl">
            <Calendar className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Campus Events</p>
            <h3 className="font-heading font-extrabold text-2xl text-slate-900">{analytics.totalEvents}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> +18% from last term
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-nexus flex items-center gap-4">
          <div className="p-3.5 bg-campus-gold/10 text-campus-gold rounded-2xl">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Student Users</p>
            <h3 className="font-heading font-extrabold text-2xl text-slate-900">{analytics.registeredStudents}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> 84% active participation
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-nexus flex items-center gap-4">
          <div className="p-3.5 bg-campus-teal/10 text-campus-teal rounded-2xl">
            <BarChart3 className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Societies</p>
            <h3 className="font-heading font-extrabold text-2xl text-slate-900">{analytics.activeClubs} Clubs</h3>
            <span className="text-[11px] text-blue-600 font-semibold mt-0.5 block">100% faculty approved</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-nexus flex items-center gap-4">
          <div className="p-3.5 bg-campus-orange/10 text-campus-orange rounded-2xl">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Overall Engagement</p>
            <h3 className="font-heading font-extrabold text-2xl text-slate-900">{analytics.overallEngagementRate}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">Top 5% university score</span>
          </div>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Attendance Trend Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-nexus space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-heading font-bold text-lg text-slate-900">Monthly Attendance Growth</h3>
              <p className="text-xs text-slate-500">Student check-in count via QR scanner per month</p>
            </div>
            <span className="text-xs font-bold text-campus-royal bg-campus-royal/10 px-3 py-1 rounded-full">
              2026 Term Data
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.monthlyAttendance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A237E', color: '#fff', borderRadius: '12px', border: 'none' }}
                />
                <Bar dataKey="attendance" fill="#1A237E" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Pie Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-nexus space-y-4">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">Events by Category</h3>
            <p className="text-xs text-slate-500">Distribution across workshops, sports & cultural</p>
          </div>

          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {analytics.categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            {analytics.categoryBreakdown.map((cat, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-2 text-slate-700 font-medium">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.category}
                </span>
                <span className="font-bold text-slate-900">{cat.count} events</span>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
