// client/src/components/Navigation.jsx
import React, {useContext, useEffect} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {Box, Button, HStack, VStack, Link, useColorMode, IconButton} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useLogin } from '../contexts/LoginContext';
import {SideMenu} from "./SideMenu.jsx";
import {getTransparentContainerStyle} from "../theme-helper.js";


// Links for unauthorized users
const GuestLinks = () => {
    const { colorMode } = useColorMode(); // Get color mode for styling

    return (
        <HStack spacing={4} p={"5"}>
            <Button as={RouterLink} to="/login" {...getTransparentContainerStyle(colorMode)}>
                Login
            </Button>
            <Button as={RouterLink} to="/register" {...getTransparentContainerStyle(colorMode)}>
                Register
            </Button>
        </HStack>
    );
};


export const Navigation = () => {
    const { colorMode, toggleColorMode } = useColorMode(); // Get color mode and toggle function
    const icon = colorMode === 'light' ? <MoonIcon /> : <SunIcon />;

    const { isLoggedIn, logout } = useLogin(); // Get isLoggedIn state and logout function from LoginContext

    console.log('Is Logged In:', isLoggedIn);

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect after logout
    };


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
        <Box
            as="nav"
            position="fixed"
            top="0"
            left="0"
            height="100vh"
            width="60px" // Adjust the width as per your preference
            bg={"#611FEA"} // Sidebar background
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            flexDirection="column"
            boxShadow="lg"
            zIndex="10"
        >
            <VStack justifyContent="space-between">
                <VStack >
                    {isLoggedIn ? <SideMenu /> : <GuestLinks />} {/* Show SideMenu if logged in, else GuestLinks */}
                </VStack>
                <IconButton
                    aria-label={`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'} Mode`}
                    icon={icon}
                    onClick={toggleColorMode}
                    bg={"#611FEA"}
                    _hover={{ bg: "#5316C4" }}
                />
            </VStack>
        </Box>
    );
};
