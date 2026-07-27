import React from 'react';

const variantStyles = {
  published: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  approved: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  pending: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  pending_approval: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  draft: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  cancelled: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  rejected: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  changes_requested: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  completed: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  available: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  maintenance: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  reserved: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
  info: 'bg-brand-500/15 text-brand-400 border-brand-500/30',
};

export const Badge = ({ children, variant = 'info', className = '' }) => {
  const normalizedVariant = String(variant).toLowerCase();
  const styleClass = variantStyles[normalizedVariant] || variantStyles.info;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styleClass} ${className}`}
    >
      {children}
    </span>
  );
};
