// client/src/elements/Login.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext.jsx";
import { useAxiosInterceptor } from '../api/axiosTokenInterceptor';
import { Box, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setToken, setIsLoggedIn } = useContext(AuthContext); // Get context functions
    const authApi = useAxiosInterceptor();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authApi.post('/login', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            // Set token and login status in AuthContext
            setToken(response.data.token);
            setIsLoggedIn(true);


            setError(null);  // Clear any previous errors
            navigate('/');  // Redirect to profile page on success
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <Box maxW="sm" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg">
            <Text fontSize="2xl" mb={4}>Login</Text>
            {error && <Text color="red.500" mb={4}>{error}</Text>}
            <form onSubmit={handleSubmit}>
                <FormControl id="email" mb={4} isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </FormControl>
                <FormControl id="password" mb={4} isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </FormControl>
                <Button type="submit" colorScheme="teal" width="full" mt={4}>
                    Login
                </Button>
            </form>
        </Box>
    );
};
