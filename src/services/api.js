import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vidula-backend.tk/',
});

export default api;
