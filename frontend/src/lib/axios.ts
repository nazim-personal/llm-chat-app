import axios from 'axios';

const axiosInstance = axios.create({
  // In a real application, you would set your API base URL here
  // For example:
  // baseURL: 'https://api.example.com/v1',
});

// You can also add interceptors for handling requests and responses globally
// For example, to add an authorization token to every request:
/*
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
*/

export default axiosInstance;
