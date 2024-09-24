// client/src/components/Navigation.jsx
import React, {useContext} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext.jsx";
import {Box, Button, HStack, Link, useColorMode, useColorModeValue} from '@chakra-ui/react';

// Links for authorized users
/* Use logout function from context */
const AuthLinks = ({ handleLogout }) => (
    <HStack spacing={4}>
        <Link as={RouterLink} to="/profile">
            Profile
        </Link>
        <Button colorScheme="teal" variant="outline" onClick={handleLogout}>
            Logout
        </Button>
    </HStack>
);


// Links for unauthorized users
const GuestLinks = () => (
    <HStack spacing={4}>
        <Link as={RouterLink} to="/login">
            Login
        </Link>
        <Link as={RouterLink} to="/register">
            Register
        </Link>
    </HStack>
);


export const Navigation = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const { colorMode, toggleColorMode } = useColorMode(); // Get color mode and toggle function
    const colorModeLabel = colorMode === 'light' ? 'Dark' : 'Light'; // Determine label for the toggle button

    return (
        <Box as="nav" bg={useColorModeValue('gray.100', 'gray.900')} p={4}>
            <HStack spacing={6} justifyContent="space-between">
                <HStack spacing={6}>
                    <Link as={RouterLink} to="/">
                        Home
                    </Link>
                    {isLoggedIn ? <AuthLinks handleLogout={logout} /> : <GuestLinks />}
                </HStack>
                <Button onClick={toggleColorMode} colorScheme="teal">
                    Toggle {colorModeLabel} Mode
                </Button>
            </HStack>
        </Box>
    );
};
