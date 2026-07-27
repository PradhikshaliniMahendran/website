import React, { createContext, useContext, useState } from 'react';
import {
  MOCK_EVENTS,
  MOCK_VENUES,
  MOCK_CLUBS,
  MOCK_ANNOUNCEMENTS,
  MOCK_REGISTRATIONS,
  MOCK_CERTIFICATES,
  MOCK_ANALYTICS
} from '../data/mockData';
import confetti from 'canvas-confetti';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [venues, setVenues] = useState(MOCK_VENUES);
  const [clubs, setClubs] = useState(MOCK_CLUBS);
  const [announcements, setAnnouncements] = useState(MOCK_ANNOUNCEMENTS);
  const [registrations, setRegistrations] = useState(MOCK_REGISTRATIONS);
  const [certificates, setCertificates] = useState(MOCK_CERTIFICATES);
  const [feedbackList, setFeedbackList] = useState([
    {
      id: "fb_1",
      eventId: "evt_102",
      eventTitle: "Annual University Cultural Night 2026",
      userId: "usr_002",
      userName: "Pradhikshalini Mahendran",
      rating: 5,
      comment: "Spectacular lighting and sound system! Best campus cultural night so far.",
      date: "2026-07-24"
    }
  ]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = "success") => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // --- MEMBER 2: Event CRUD Operations ---
  const createEvent = (newEventData) => {
    const newEvent = {
      id: `evt_${Date.now()}`,
      registeredCount: 0,
      status: "PENDING", // Sent to Member 3 Approval Queue
      isFeatured: false,
      waitlistEnabled: true,
      ...newEventData
    };
    setEvents(prev => [newEvent, ...prev]);
    showToast("Event submitted successfully! Sent to Faculty/Admin approval queue.", "info");
  };

  const updateEventStatus = (eventId, newStatus) => {
    setEvents(prev => prev.map(evt => evt.id === eventId ? { ...evt, status: newStatus } : evt));
    showToast(`Event status updated to ${newStatus}`);
  };

  const deleteEvent = (eventId) => {
    setEvents(prev => prev.filter(evt => evt.id !== eventId));
    showToast("Event removed successfully", "warning");
  };

  // --- MEMBER 3: Venue & Approval Management ---
  const approveEventWithVenue = (eventId, comments = "") => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return {
          ...evt,
          status: "APPROVED",
          approval: {
            status: "APPROVED",
            comments: comments || "Approved by Faculty Committee",
            timestamp: new Date().toISOString()
          }
        };
      }
      return evt;
    }));
    showToast("Event Approved & Venue confirmed!", "success");
    confetti({ particleCount: 50, spread: 60 });
  };

  const rejectEventWithReason = (eventId, reason) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return {
          ...evt,
          status: "REJECTED",
          approval: {
            status: "REJECTED",
            comments: reason || "Conflict with academic schedule",
            timestamp: new Date().toISOString()
          }
        };
      }
      return evt;
    }));
    showToast("Event approval rejected.", "warning");
  };

  // --- MEMBER 4: Registration & Attendance (QR Code) ---
  const registerForEvent = (event, user) => {
    const existing = registrations.find(r => r.eventId === event.id && r.userId === user.id);
    if (existing) {
      showToast("You are already registered for this event!", "info");
      return;
    }

    const qrPayload = `CAMPUS-REG-${event.id.toUpperCase()}-${user.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReg = {
      id: `reg_${Date.now()}`,
      eventId: event.id,
      eventTitle: event.title,
      userId: user.id,
      userName: user.name,
      registrationDate: new Date().toISOString(),
      status: "CONFIRMED",
      qrCode: qrPayload,
      checkInStatus: "NOT_CHECKED_IN",
      certificateEligible: true
    };

    setRegistrations(prev => [newReg, ...prev]);
    setEvents(prev => prev.map(e => e.id === event.id ? { ...e, registeredCount: e.registeredCount + 1 } : e));
    
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    showToast(`Registration Confirmed! Ticket with QR Code generated.`, "success");
  };

  const scanCheckInQR = (qrCodeString) => {
    const foundReg = registrations.find(r => r.qrCode === qrCodeString);
    if (!foundReg) {
      return { success: false, message: "Invalid or Unrecognized QR Ticket Code!" };
    }
    if (foundReg.checkInStatus === "ATTENDED") {
      return { success: false, message: `Already Checked-In at ${new Date(foundReg.checkInTime).toLocaleTimeString()}` };
    }

    // Mark checked in
    const checkInTime = new Date().toISOString();
    setRegistrations(prev => prev.map(r => r.id === foundReg.id ? { ...r, checkInStatus: "ATTENDED", checkInTime } : r));

    // Automatically generate participation certificate for Member 6 module!
    const newCert = {
      id: `crt_${Date.now()}`,
      certificateNumber: `CERT-2026-CAMPUS-${Math.floor(1000 + Math.random() * 9000)}`,
      eventId: foundReg.eventId,
      eventTitle: foundReg.eventTitle,
      userId: foundReg.userId,
      recipientName: foundReg.userName,
      type: "PARTICIPATION",
      issuedDate: new Date().toISOString().split('T')[0],
      verificationCode: `VERIFY-${Math.floor(1000 + Math.random() * 9000)}-NEXUS`,
      downloadUrl: "#"
    };

    setCertificates(prev => [newCert, ...prev]);
    showToast(`Attendance Marked for ${foundReg.userName}! Certificate generated.`, "success");
    confetti({ particleCount: 100, spread: 90 });

    return { success: true, message: `Checked In Successfully: ${foundReg.userName} (${foundReg.eventTitle})` };
  };

  // --- MEMBER 5: Club & Announcements ---
  const createAnnouncement = (newAnc) => {
    const anc = {
      id: `anc_${Date.now()}`,
      date: new Date().toISOString(),
      ...newAnc
    };
    setAnnouncements(prev => [anc, ...prev]);
    showToast("Announcement published to student feed!", "success");
  };

  const createClub = (newClubData) => {
    const club = {
      id: `clb_${Date.now()}`,
      membersCount: 1,
      eventsCount: 0,
      socialLinks: {},
      ...newClubData
    };
    setClubs(prev => [...prev, club]);
    showToast("New University Club registered successfully!", "success");
  };

  // --- MEMBER 6: Feedback & Certificates ---
  const submitFeedback = (fbData) => {
    const fb = {
      id: `fb_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...fbData
    };
    setFeedbackList(prev => [fb, ...prev]);
    showToast("Feedback submitted. Thank you for rating!", "success");
  };

  return (
    <EventContext.Provider value={{
      events,
      venues,
      clubs,
      announcements,
      registrations,
      certificates,
      feedbackList,
      analytics: MOCK_ANALYTICS,
      toastMessage,
      showToast,
      createEvent,
      updateEventStatus,
      deleteEvent,
      approveEventWithVenue,
      rejectEventWithReason,
      registerForEvent,
      scanCheckInQR,
      createAnnouncement,
      createClub,
      submitFeedback
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
