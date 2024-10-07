// client/src/api/axiosTokenInterceptor.js
import axios from 'axios';

// Create an Axios instance
const authApi = axios.create({
    baseURL: '/api', // Set the base URL for your API
});

// Attach the interceptor that appends the token to all requests
authApi.interceptors.request.use(
    (config) => {
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = storedUserInfo && storedUserInfo.token; // Get token from localStorage

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Attach token if it exists
        } else {
            console.warn(`[TokenInterceptor] - No valid token found for request in component: 'Axios Instance', function: 'authApi.interceptors.request.use'`);
        }
        return config;
    },
    (error) => {
        console.error(`[TokenInterceptor] - Error in request interceptor in component: 'Axios Instance', function: 'authApi.interceptors.request.use'`, error);
        return Promise.reject(error);
    }
);

export default authApi;
