import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useEvents } from '../../contexts/EventContext';
import { CertificatePreviewModal } from './CertificatePreviewModal';
import { Award, ShieldCheck, Download, Eye, Sparkles } from 'lucide-react';

export const CertificatesView = () => {
  const { currentUser } = useAuth();
  const { certificates } = useEvents();
  const [selectedCert, setSelectedCert] = useState(null);

  const myCerts = certificates.filter(c => c.userId === currentUser.id);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="bg-nexus-gradient rounded-3xl p-8 text-white shadow-nexus">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-white/10 text-campus-gold border border-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Member 6 Engine
          </span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl">Verified Credentials & Certificate Vault</h1>
        <p className="text-sm text-blue-100 mt-1">Official participation and achievement certificates generated after QR attendance check-in.</p>
      </div>

      {myCerts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border text-center space-y-3">
          <Award className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-heading font-bold text-lg text-slate-800">No Certificates Earned Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">Attend campus events and check in using your QR ticket to automatically unlock official university certificates!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myCerts.map((cert) => (
            <div key={cert.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-nexus p-6 space-y-4 flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-campus-gold" /> {cert.type}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">{cert.issuedDate}</span>
                </div>

                <h3 className="font-heading font-bold text-lg text-slate-900">{cert.eventTitle}</h3>
                
                <div className="bg-slate-50 p-3 rounded-2xl border text-xs space-y-1 text-slate-600">
                  <p>Recipient: <strong className="text-slate-900">{cert.recipientName}</strong></p>
                  <p className="font-mono text-[11px] text-campus-teal font-semibold">Verification: {cert.verificationCode}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="flex-1 bg-campus-royal hover:bg-campus-ocean text-white font-bold text-xs py-3 rounded-xl shadow-nexus flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4 text-campus-gold" /> Preview Credential
                </button>
                <button
                  onClick={() => alert(`Certificate ${cert.certificateNumber} downloaded!`)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-3 rounded-xl flex items-center justify-center"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {selectedCert && (
        <CertificatePreviewModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />
      )}

    </div>
  );
};
