import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';

import { Dashboard } from './pages/Dashboard';
import { UserManagement } from './pages/users/UserManagement';
import { RoleManagement } from './pages/users/RoleManagement';
import { UserProfile } from './pages/users/UserProfile';

import { EventList } from './pages/events/EventList';
import { EventForm } from './pages/events/EventForm';
import { EventDetail } from './pages/events/EventDetail';
import { EventCalendar } from './pages/events/EventCalendar';
import { CategoryManagement } from './pages/events/CategoryManagement';

import { VenueManagement } from './pages/venues/VenueManagement';
import { VenueSchedule } from './pages/venues/VenueSchedule';
import { ApprovalInbox } from './pages/approvals/ApprovalInbox';

const AppLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 selection:bg-brand-500 selection:text-white font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppLayout>
            <Routes>
              {/* Dashboard Home */}
              <Route path="/" element={<Dashboard />} />

              {/* Module 1: User & Security Management */}
              <Route path="/users" element={<UserManagement />} />
              <Route path="/roles" element={<RoleManagement />} />
              <Route path="/profile" element={<UserProfile />} />

              {/* Module 2: Event Management */}
              <Route path="/events" element={<EventList />} />
              <Route path="/events/create" element={<EventForm />} />
              <Route path="/events/calendar" element={<EventCalendar />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/categories" element={<CategoryManagement />} />

              {/* Module 3: Venue & Approval Management */}
              <Route path="/venues" element={<VenueManagement />} />
              <Route path="/venues/schedule" element={<VenueSchedule />} />
              <Route path="/approvals" element={<ApprovalInbox />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppLayout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
