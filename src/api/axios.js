
import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; 

export const API = axios.create({
  baseURL: BASE_URL, // Base URL
});

export const MoviesAPI = axios.create({
  baseURL: `${BASE_URL}/api/v1`, // <- Now starts from /api/v1
});

export default API;

