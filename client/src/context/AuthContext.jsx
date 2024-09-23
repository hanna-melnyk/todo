// client/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component to provide the token to the entire app
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Load token from localStorage when the component mounts
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.token) {
            setToken(userInfo.token); // Set the token in the state if it exists in localStorage
            setIsLoggedIn(true);  // Set the logged in status to true
        }
    }, []);


    // Function to log out and clear the token
    const logout = () => {
        localStorage.removeItem('userInfo');
        setToken(null);
        setIsLoggedIn(false); // Set the logged-in status to false on logout
    };

    // Provide the token and a function to update it
    return (
        <AuthContext.Provider value={{ token, isLoggedIn, setToken, setIsLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
