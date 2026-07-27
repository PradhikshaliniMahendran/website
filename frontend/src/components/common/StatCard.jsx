import React from 'react';
import { motion } from 'framer-motion';

export const StatCard = ({ title, value, change, trend = 'up', icon: Icon, color = 'brand' }) => {
  const colorMap = {
    brand: 'text-brand-400 bg-brand-500/10 border-brand-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  };

  const badgeStyle = colorMap[color] || colorMap.brand;

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="glass-card rounded-2xl p-5 border border-slate-800/80 shadow-lg relative overflow-hidden group"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-xl border ${badgeStyle}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-3xl font-bold tracking-tight text-white">{value}</span>
        {change && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-md ${
              trend === 'up' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
            }`}
          >
            {change}
          </span>
        )}
      </div>
    </motion.div>
  );
};
