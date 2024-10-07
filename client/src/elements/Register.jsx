// client/src/elements/Register.jsx
import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, FormControl, FormLabel, Input, Button, Text, useColorMode } from '@chakra-ui/react';
import { getTransparentWhiteContainerStyle } from '../theme-helper';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { colorMode} = useColorMode(); // Get color mode

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            /* changed path from '/api/register', because useAxiosInterceptor sets /api as a base url*/
            const response = await axios.post('/api/register', { username, email, password });
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            setError(null);  // Clear any previous errors
            navigate('/profile');  // Redirect to profile page on success
        } catch (error) {
            setError('Error registering user');
        }
    };

    return (
        <Box maxW="sm" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg" {...getTransparentWhiteContainerStyle(colorMode)}>
            <Text fontSize="2xl" mb={4}>Register</Text>
            {error && <Text color="red.500" mb={4}>{error}</Text>}
            <form onSubmit={handleSubmit}>
                <FormControl id="username" mb={4} isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </FormControl>
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
                <Button type="submit" bg="#611FEA" _hover={{ bg: "#5316C4" }} width="full" mt={4}>
                    Register
                </Button>
            </form>
        </Box>
    );
};
