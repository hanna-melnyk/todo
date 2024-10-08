// client/src/elements/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, FormControl, FormLabel, Input, Button, Text, useColorMode } from '@chakra-ui/react';
import { useLogin } from '../contexts/LoginContext';
import { getTransparentWhiteContainerStyle } from '../theme-helper';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useLogin(); // Use the login function from the context
    const { colorMode} = useColorMode(); // Get color mode

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', { email, password });

            // Store the new token and user info in localStorage
            localStorage.setItem('userInfo', JSON.stringify(response.data));

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
        <Box maxW="sm" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg" {...getTransparentWhiteContainerStyle(colorMode)} >
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
                <Button bg="#611FEA" _hover={{ bg: "#5316C4" }} type="submit" width="full" mt={4}>
                    Login
                </Button>
            </form>
        </Box>
    );
};
