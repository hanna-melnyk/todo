// client/src/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TodoList } from './elements/TodoList';
import { Login } from './elements/Login';
import { Register } from './elements/Register';
import { Profile } from './elements/Profile';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<TodoList />} />      {/* Home route displaying Todo List */}
            <Route path="/login" element={<Login />} />    {/* Login route */}
            <Route path="/register" element={<Register />} /> {/* Register route */}
            <Route path="/profile" element={<Profile />} /> {/* Profile route */}
        </Routes>
    );
};

export default AppRoutes;
