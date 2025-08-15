// import axios from 'axios';

//#const axiosInstance = axios.create({
// baseURL: 'http://localhost:5001', // local
  //baseURL: 'http://3.107.178.255:5001', // live
  //headers: { 'Content-Type': 'application/json' },

//});

//export default axiosInstance;

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || '/api',
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;

axiosInstance.interceptors.request.use((config) => {
  // Log the final URL the browser will call
  const finalUrl = (config.baseURL || '') + (config.url || '');
  console.log('[axios request]', finalUrl);
  return config;
});