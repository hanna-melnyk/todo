// client/src/api/axiosTokenInterceptor.js
import axios from 'axios';
import React, { useContext } from 'react';

// Create an Axios instance
const authApi  = axios.create({
    baseURL: '/api', // Set the base URL for your API
});


// Attach the interceptor that appends the token to all requests
authApi.interceptors.request.use(
    (config) => {
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = storedUserInfo && storedUserInfo.token; // Get token from localStorage

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Attach token if it exists
            console.log(`Token used in request: ${token}`);
        } else {
            console.warn('No valid token found for request');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default authApi;