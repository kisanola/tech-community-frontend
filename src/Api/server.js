import axios from 'axios';

const token = localStorage.getItem('token') || undefined;
const server = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: token && `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

server.interceptors.request.use(
  async config => {
    const token = await localStorage.getItem('token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default server;