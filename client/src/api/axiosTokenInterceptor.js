// client/src/api/axiosTokenInterceptor.js
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';
import React, { useContext } from 'react';

// Create an Axios instance
const authApi  = axios.create({
    baseURL: '/api', // Set the base URL for your API
});

// Create a hook that sets up the interceptor
export const useAxiosInterceptor = () => {
    const { token } = useContext(AuthContext); // Get the token from AuthContext

    // Attach the interceptor that appends the token to all requests
    authApi.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`; // Attach token if it exists
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return authApi; // Return the Axios instance with the interceptor
};
