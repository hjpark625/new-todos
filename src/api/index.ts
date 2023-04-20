import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost/api' : 'http://0.0.0.0/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
