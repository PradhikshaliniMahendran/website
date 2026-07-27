import React from 'react';
import { Calendar, ShieldCheck, Mail, MapPin, Sparkles, Heart } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  return (
    <footer className="bg-campus-navy text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-campus-gold via-campus-orange to-campus-teal flex items-center justify-center shadow-gold">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                CAMPUS CONNECT
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The enterprise university event planning ecosystem. Streamlining campus activities, club management, venue bookings, real-time QR check-ins, and verified certificates.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-campus-teal" /> Verified University System
            </div>
          </div>

          {/* Col 2: Event Planning Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Event Planning</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('events')} className="hover:text-campus-gold transition-colors">
                  Explore Upcoming Events
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('events')} className="hover:text-campus-gold transition-colors">
                  Propose New Event
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('venues')} className="hover:text-campus-gold transition-colors">
                  Campus Venue Availability
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('clubs')} className="hover:text-campus-gold transition-colors">
                  Student Club Societies
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Credentials */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Passes & Verification</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('my-tickets')} className="hover:text-campus-gold transition-colors">
                  My Entry Passes & QR Code
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('certificates')} className="hover:text-campus-gold transition-colors">
                  Participation Certificates
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('analytics')} className="hover:text-campus-gold transition-colors">
                  Campus Engagement Metrics
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('profile')} className="hover:text-campus-gold transition-colors">
                  Student Profile & Badges
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Support */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Campus Event Office</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-campus-gold shrink-0" /> Student Union Affairs - Block A
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-campus-teal shrink-0" /> events@university.edu
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-campus-orange shrink-0" /> Mon - Fri: 8:00 AM - 6:00 PM
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; 2026 Campus Connect Event Management Ecosystem. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Campus Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
