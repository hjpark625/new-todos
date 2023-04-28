import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost/api' : 'http://0.0.0.0/api';

const token = localStorage.getItem('access_token');

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
