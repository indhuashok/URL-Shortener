import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (email, password) => api.post('/auth/signup', { email, password }),
  login: (email, password) => api.post('/auth/login', { email, password }),
};

export const urlAPI = {
  create: (originalURL) => api.post('/urls/create', { originalURL }),
  getMyURLs: () => api.get('/urls/my-urls'),
  delete: (shortCode) => api.delete(`/urls/${shortCode}`),
};

export const analyticsAPI = {
  getAnalytics: (shortCode) => api.get(`/analytics/${shortCode}`),
};

export default api;