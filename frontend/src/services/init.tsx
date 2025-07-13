import axios from 'axios';

const axiosInstance_private = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosInstance_public = axios.create({
  baseURL: "http://localhost:3000/api", 

  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance_private.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('jwt');
      if (token) {
        const parsedToken = JSON.parse(token);
        console.log('Token:', parsedToken);
        config.headers.Authorization = `Bearer ${parsedToken}`; // Added Bearer prefix
      }
    } catch (error) {
      console.error('Error parsing JWT token:', error);
      localStorage.removeItem('jwt'); // Remove invalid token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle auth errors
axiosInstance_private.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwt');
      // Optionally redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { axiosInstance_private, axiosInstance_public };