import axios from 'axios';

const api = axios.create({
  baseURL: 'http://190.180.171.49:8080/',
});

export default api;
