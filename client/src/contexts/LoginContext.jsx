//client/src/context/LoginContext.jsx
import React, { createContext, useState, useEffect, useContext }  from 'react';

// Create the LoginContext
export const LoginContext = createContext();

// LoginProvider that wraps the app and provides the login status
export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    // Check localStorage for user info or token when the app loads
    useEffect(() => {
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (storedUserInfo && storedUserInfo.token) {
            setIsLoggedIn(true); // Set as logged in if token is found
        }
    }, []);

    const login = () => setIsLoggedIn(true);


    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('userInfo'); // Remove from localStorage on logout
    };

    return (
        <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </LoginContext.Provider>
    );
};

// Custom hook to use the LoginContext
export const useLogin = () => useContext(LoginContext);
