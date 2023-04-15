import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://new-todos.site/api' : 'http://localhost:4000/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
