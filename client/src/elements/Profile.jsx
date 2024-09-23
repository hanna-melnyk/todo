// client/src/elements/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAxiosInterceptor } from "../api/axiosTokenInterceptor.js"; // Use your custom Axios instance

export const Profile = () => {
    const authApi = useAxiosInterceptor(); // Axios instance with the interceptor that attaches the token
    const [user, setUser] = useState(null); // State to hold user data
    const [error, setError] = useState(null); // State to hold any error message
    const navigate = useNavigate(); // For navigation redirection

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Fetch the profile using the authApi (Axios instance with token automatically attached)
                const { data } = await authApi.get('/api/profile');
                setUser(data); // Set the user data in state
            } catch (error) {
                // Handle any error (e.g., invalid token or network issues)
                if (error.response && error.response.status === 401) {
                    navigate('/login'); // Redirect to login if not authorized (e.g., invalid or missing token)
                } else {
                    setError('Error fetching profile'); // Set a more general error message
                }
            }
        };

        fetchProfile(); // Call the fetchProfile function
    }, [authApi, navigate]); // Include authApi and navigate as dependencies

    return (
        <div>
            <h2>Profile</h2>
            {error && <p>{error}</p>} {/* Display error message if there's an error */}
            {user ? (
                <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>Loading...</p> // Display loading message while fetching profile data
            )}
        </div>
    );
};
