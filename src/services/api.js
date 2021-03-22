import axios from 'axios';

const api = axios.create({
  baseURL: 'http://179.66.168.58:3001/',
});

export default api;
