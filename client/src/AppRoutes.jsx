// client/src/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './elements/Login';
import { Register } from './elements/Register';
import { Profile } from './elements/Profile';
import {TodoPage} from "./elements/TodoPage.jsx";
import {AboutPage} from "./elements/AboutPage.jsx";
import { useLogin } from './contexts/LoginContext'; // Import useLogin hook

const AppRoutes = () => {
    const { isLoggedIn } = useLogin(); // Get the isLoggedIn state from LoginContext

    return (
        <Routes>
            {/* Conditional route for the root '/' */}
            <Route
                path="/"
                element={isLoggedIn ? <Navigate to="/dashboard" /> : <AboutPage />}
            />
            <Route path="/dashboard" element={<TodoPage />} />      {/* Home route displaying Todo List */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />


        </Routes>
    );
};

export default AppRoutes;
