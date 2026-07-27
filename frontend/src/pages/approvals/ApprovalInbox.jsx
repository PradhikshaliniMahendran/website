import React, { useState } from 'react';
import { CheckSquare, CheckCircle, XCircle, AlertCircle, History, MessageSquare, User, Clock } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const ApprovalInbox = () => {
  const [requests, setRequests] = useState([
    {
      id: 'app-1',
      eventCode: 'EVT-2026-N492',
      eventTitle: 'Annual Robotics & Embedded Systems Expo',
      requester: 'Sophia Martinez (Club President)',
      venue: 'Cybersecurity & AI Complex Lab',
      date: 'Aug 20, 2026',
      currentLevel: 1,
      levelLabel: 'Level 1: Faculty Review',
      status: 'PENDING',
      submittedDate: '2026-07-25',
    },
    {
      id: 'app-2',
      eventCode: 'EVT-2026-A305',
      eventTitle: 'Quantum Computing Research Symposium',
      requester: 'Prof. Robert Sterling',
      venue: 'Grand Innovation Auditorium',
      date: 'Sep 18, 2026',
      currentLevel: 2,
      levelLabel: 'Level 2: Student Affairs Manager',
      status: 'PENDING',
      submittedDate: '2026-07-24',
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState('APPROVE');
  const [comment, setComment] = useState('');

  const [auditLogs, setAuditLogs] = useState([
    { id: 'log-1', actionBy: 'Prof. Robert Sterling', role: 'FACULTY_ADMINISTRATOR', action: 'APPROVED', level: 1, comment: 'Level 1 faculty approval granted', timestamp: '2026-07-24 14:30' },
    { id: 'log-2', actionBy: 'Sophia Martinez', role: 'CLUB_PRESIDENT', action: 'SUBMITTED', level: 1, comment: 'Submitted proposal for approval', timestamp: '2026-07-24 10:15' },
  ]);

  const handleActionSubmit = (e) => {
    e.preventDefault();
    if (!selectedRequest) return;

    let newStatus = 'APPROVED';
    if (actionType === 'REJECT') newStatus = 'REJECTED';
    if (actionType === 'REQUEST_CHANGES') newStatus = 'CHANGES_REQUESTED';

    setRequests((prev) =>
      prev.map((r) => (r.id === selectedRequest.id ? { ...r, status: newStatus } : r))
    );

    const newLog = {
      id: `log-${Date.now()}`,
      actionBy: 'Current User',
      role: 'REVIEWER',
      action: actionType,
      level: selectedRequest.currentLevel,
      comment: comment || 'Action recorded',
      timestamp: new Date().toLocaleString(),
    };
    setAuditLogs([newLog, ...auditLogs]);

    setSelectedRequest(null);
    setComment('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Multi-Level Approval Inbox</h1>
        <p className="text-xs text-slate-400">Review pending event submissions, inspect audit trails, and manage compliance</p>
      </div>

      {/* Review Cards List */}
      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs font-bold text-brand-300">{req.eventCode}</span>
                <Badge variant={req.status}>{req.status}</Badge>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-500/10 text-brand-300 border border-brand-500/20">
                  {req.levelLabel}
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{req.eventTitle}</h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span>Submitted by: <strong className="text-slate-300">{req.requester}</strong></span>
                <span>Venue: <strong className="text-slate-300">{req.venue}</strong></span>
                <span>Event Date: <strong className="text-slate-300">{req.date}</strong></span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedRequest(req)}
                className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg transition-colors"
              >
                Review & Authorize
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Audit Logs Section */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <History className="w-4 h-4 text-brand-400" />
          <span>Recent Approval Audit Trail Logs</span>
        </h3>

        <div className="space-y-3">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white">{log.actionBy}</span>
                  <span className="text-[10px] text-slate-500">({log.role})</span>
                  <Badge variant={log.action}>{log.action}</Badge>
                </div>
                <p className="text-slate-400">{log.comment}</p>
              </div>
              <span className="text-[10px] text-slate-500">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Modal */}
      {selectedRequest && (
        <Modal isOpen={true} onClose={() => setSelectedRequest(null)} title={`Review Submission: ${selectedRequest.eventCode}`}>
          <form onSubmit={handleActionSubmit} className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <p><strong className="text-slate-300">Event:</strong> {selectedRequest.eventTitle}</p>
              <p><strong className="text-slate-300">Requester:</strong> {selectedRequest.requester}</p>
              <p><strong className="text-slate-300">Venue:</strong> {selectedRequest.venue}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Decision Action</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setActionType('APPROVE')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                    actionType === 'APPROVE'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => setActionType('REQUEST_CHANGES')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                    actionType === 'REQUEST_CHANGES'
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  Request Changes
                </button>
                <button
                  type="button"
                  onClick={() => setActionType('REJECT')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                    actionType === 'REJECT'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  Reject
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Audit Comments / Feedback</label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter mandatory reviewer notes or change requests..."
                className="w-full bg-slate-900 text-xs text-white p-3 rounded-xl border border-slate-800 focus:border-brand-500"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold"
              >
                Confirm Decision
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
