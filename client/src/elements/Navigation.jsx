// client/src/components/Navigation.jsx
import React, {useContext} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {Box, Button, HStack, Link, useColorMode, useColorModeValue, IconButton} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

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
    const { colorMode, toggleColorMode } = useColorMode(); // Get color mode and toggle function
    const icon = colorMode === 'light' ? <MoonIcon /> : <SunIcon />;
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    const isLoggedIn = !!storedUserInfo && !!storedUserInfo.token; // Determine if logged in based on localStorage

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        window.location.reload();
    };

    return (
        <Box as="nav" bg={useColorModeValue('gray.100', 'gray.900')} p={4}>
            <HStack spacing={6} justifyContent="space-between">
                <HStack spacing={6}>
                    <Link as={RouterLink} to="/">
                        Home
                    </Link>
                    {isLoggedIn ? <AuthLinks handleLogout={handleLogout} /> : <GuestLinks />}
                </HStack>
                <IconButton
                    aria-label={`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'} Mode`}
                    icon={icon}
                    onClick={toggleColorMode}
                    colorScheme="teal"
                />
            </HStack>
        </Box>
    );
};
