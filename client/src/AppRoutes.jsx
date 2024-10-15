// client/src/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './elements/Login';
import { Register } from './elements/Register';
import { Profile } from './elements/Profile';
import {TodoPage} from "./elements/TodoPage.jsx";
import {AboutPage} from "./elements/AboutPage.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<TodoPage />} />      {/* Home route displaying Todo List */}
            <Route path="/" element={<AboutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
};

export default AppRoutes;
