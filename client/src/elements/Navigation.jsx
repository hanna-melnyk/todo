// client/src/components/Navigation.jsx
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext.jsx";

// Links for authorized users
/* Use logout function from context */
const AuthLinks = ({handleLogout}) => (
    <>
        <Link to="/profile">Profile</Link>
        <button onClick={handleLogout}>Logout</button>
    </>
);

//Links for unauthorized users
const GuestLinks = () => (
    <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
    </>
);

export const Navigation = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);

    return (
        <nav>
            <Link to="/">Home</Link>
            {isLoggedIn ? <AuthLinks handleLogout={logout} /> : <GuestLinks />}
        </nav>
    );
};
