import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vidula-backend/',
});

export default api;
