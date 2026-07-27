import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const DataTable = ({ columns, data, loading, page = 0, totalPages = 1, onPageChange }) => {
  if (loading) {
    return (
      <div className="w-full space-y-3 p-4">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-12 bg-slate-800/50 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-800/80 glass-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-5 py-3.5 font-semibold">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {data && data.length > 0 ? (
              data.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-slate-800/40 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-5 py-4 whitespace-nowrap">
                      {col.cell ? col.cell(row) : row[col.accessorKey]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-slate-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-slate-900/40">
          <span className="text-xs text-slate-400">
            Page <span className="font-semibold text-white">{page + 1}</span> of{' '}
            <span className="font-semibold text-white">{totalPages}</span>
          </span>
          <div className="flex space-x-2">
            <button
              disabled={page === 0}
              onClick={() => onPageChange && onPageChange(page - 1)}
              className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => onPageChange && onPageChange(page + 1)}
              className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
