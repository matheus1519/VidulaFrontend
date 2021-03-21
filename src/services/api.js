import axios from 'axios';

const api = axios.create({
  baseURL: 'http://179.66.168.58:8080/',
});

export default api;
