import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000
});

// Attach JWT token to requests if present
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('campus_connect_jwt');
  if (token) {
    config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

export const apiService = {
  // Check backend health / MongoDB connection
  checkHealth: async () => {
    try {
      const res = await apiClient.get('/analytics/dashboard');
      return { connected: true, data: res.data };
    } catch (err) {
      return { connected: false, error: err.message };
    }
  },

  // Auth
  login: async (email, password) => {
    return await apiClient.post('/auth/login', { email, password });
  },

  register: async (userData) => {
    return await apiClient.post('/auth/register', userData);
  },

  // Events
  getEvents: async () => {
    return await apiClient.get('/events');
  },

  createEvent: async (eventData) => {
    return await apiClient.post('/events', eventData);
  },

  updateEventStatus: async (eventId, status, comments) => {
    return await apiClient.put(`/events/${eventId}/status?status=${status}&comments=${encodeURIComponent(comments || '')}`);
  },

  // Registrations
  getUserRegistrations: async (userId) => {
    return await apiClient.get(`/registrations/user/${userId}`);
  },

  registerForEvent: async (regData) => {
    return await apiClient.post('/registrations', regData);
  },

  scanCheckIn: async (qrCode) => {
    return await apiClient.post(`/registrations/scan?qrCode=${encodeURIComponent(qrCode)}`);
  },

  // Certificates
  getUserCertificates: async (userId) => {
    return await apiClient.get(`/certificates/user/${userId}`);
  }
};
