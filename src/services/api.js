import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vidula-backend.herokuapp.com/',
});

export default api;
