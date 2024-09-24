// client/src/elements/Profile.jsx
// client/src/elements/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/axiosTokenInterceptor';
import { Box, Text, Spinner, Heading, Stack, Alert, AlertIcon } from '@chakra-ui/react';

export const Profile = () => {
    const [user, setUser] = useState(null); // State to hold user data
    const [error, setError] = useState(null); // State to hold any error message
    const navigate = useNavigate(); // For navigation redirection

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await authApi.get('/profile');
                setUser(data); // Set the user data in state
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/login'); // Redirect to login if not authorized
                } else {
                    setError('Error fetching profile');
                }
            }
        };

        fetchProfile(); // Fetch user profile data on component mount
    }, [authApi, navigate]);

    return (
        <Box maxW="sm" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg" bg="gray.500" color="gray.100">
            <Heading size="lg" mb={6} color="purple.300">Profile</Heading>
            {error && (
                <Alert status="error" mb={4}>
                    <AlertIcon />
                    {error}
                </Alert>
            )}
            {user ? (
                <Stack spacing={3}>
                    <Text fontSize="lg">
                        <strong>Username:</strong> {user.username}
                    </Text>
                    <Text fontSize="lg">
                        <strong>Email:</strong> {user.email}
                    </Text>
                </Stack>
            ) : (
                <Spinner size="lg" color="purple.300" />
            )}
        </Box>
    );
};
