import axios from 'axios';

const api = axios.create({
  baseURL: 'http://177.209.77.187:8080/',
});

export default api;
