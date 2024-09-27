// client/src/elements/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import { useLogin } from '../contexts/LoginContext';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useLogin(); // Use the login function from the context

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`[LoginComponent] - Login form submitted with email: ${email} in component: 'Login', function: 'handleSubmit'`);

        try {
            const response = await axios.post('/api/login', { email, password });

            // Store the new token and user info in localStorage
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            console.log(`[LoginComponent] - Token received and stored: '${response.data.token}' for user: ${email} in component: 'Login', function: 'handleSubmit'`);

            // Call the login function from the context to set isLoggedIn to true
            login();

            setError(null);  // Clear any previous errors
            navigate('/');  // Redirect to home page on success
        } catch (error) {
            console.error(`[LoginComponent] - Login error in component: 'Login', function: 'handleSubmit'`, error);
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
                <Button colorScheme="purple" type="submit" width="full" mt={4}>
                    Login
                </Button>
            </form>
        </Box>
    );
};
