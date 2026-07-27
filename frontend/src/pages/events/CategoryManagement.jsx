import React, { useState } from 'react';
import { Layers, Plus, Code2, Sparkles, Trophy, BookOpen, Edit2, Trash2 } from 'lucide-react';

export const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: 'cat-1', name: 'Technology & Coding', slug: 'technology-coding', icon: Code2, count: 18, color: '#3b82f6' },
    { id: 'cat-2', name: 'Cultural & Arts', slug: 'cultural-arts', icon: Sparkles, count: 12, color: '#ec4899' },
    { id: 'cat-3', name: 'Sports & Athletics', slug: 'sports-athletics', icon: Trophy, count: 9, color: '#10b981' },
    { id: 'cat-4', name: 'Academic & Research', slug: 'academic-research', icon: BookOpen, count: 15, color: '#8b5cf6' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Category Management</h1>
          <p className="text-xs text-slate-400">Classify events into domain categories, badges, and icons</p>
        </div>
        <button className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-500/20">
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800" style={{ color: cat.color }}>
                <cat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400">{cat.count} Events</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{cat.name}</h3>
              <p className="text-[11px] font-mono text-slate-500">/{cat.slug}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
