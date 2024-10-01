// client/src/components/Navigation.jsx
import React, {useContext, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {Box, Button, HStack, Link, useColorMode, useColorModeValue, IconButton, Text, Avatar, VStack } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { LuSparkles } from "react-icons/lu";
import { useLogin } from '../contexts/LoginContext';

// Links for authorized users
/* Use logout function from context */
const AuthLinks = ({ handleLogout }) => (
    <HStack spacing={4}>
        <Link as={RouterLink} to="/profile">
            <Text fontSize="2xl" fontWeight="bold">Profile</Text>
        </Link>
        <Button colorScheme="purple" variant="outline" onClick={handleLogout}>
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
    // const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    // const isLoggedIn = !!storedUserInfo && !!storedUserInfo.token; // Determine if logged in based on localStorage

    const { isLoggedIn, logout } = useLogin(); // Get isLoggedIn state and logout function from LoginContext

    console.log('Is Logged In:', isLoggedIn);

    // const handleLogout = () => {
    //     localStorage.removeItem('userInfo');
    //     window.location.reload();
    // };


    // Use useEffect to update body class based on color mode
    useEffect(() => {
        const body = document.body;

        if (colorMode === 'light') {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        } else {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        }
    }, [colorMode]); // Re-run effect whenever `colorMode` changes

    return (
        <Box as="nav" bg="transparent" p={4} w="100vw">
            <HStack spacing={6} justifyContent="space-between" maxW="container.lg" mx="auto">
                <HStack spacing={6}>
                    <Link as={RouterLink} to="/">
                        <HStack spacing={2}>
                            <LuSparkles />
                            <Text fontSize="2xl" fontWeight="bold">Home</Text>
                        </HStack>
                    </Link>
                    {isLoggedIn ? <AuthLinks handleLogout={logout} /> : <GuestLinks />}
                </HStack>
                <IconButton
                    aria-label={`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'} Mode`}
                    icon={icon}
                    onClick={toggleColorMode}
                />
            </HStack>
        </Box>
    );
};
