// client/src/components/SideMenu.jsx
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Drawer,
    Flex,
    DrawerOverlay,
    DrawerContent,
    DrawerBody,
    DrawerFooter,
    Button,
    VStack,
    Avatar,
    Box,
    useDisclosure,
    IconButton,
    Tooltip,
    useColorMode,
} from '@chakra-ui/react';
import { FiSidebar, FiHome, FiUser, FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { useLogin } from '../contexts/LoginContext';
import authApi from '../api/axiosTokenInterceptor';
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { ToggleColorModeButton } from "./ToggleColorModeButton";
import { GuestLinks, CustomerLinks } from './SideMenuLinks'; // Import from SideMenuLinks
import {useColorModeSync} from "../hooks/useColorModeSync.js";
import {UserAvatar} from "./UserAvatar.jsx";

/**
 * @function SideMenu
 * Renders the side navigation menu, including both the minimized version and a drawer for the full menu.
 * Manages user state and handles profile fetching, logout functionality, and color mode toggling.
 * @returns {JSX.Element} The sidebar component with navigation links and profile information.
 */
export const SideMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isLoggedIn, logout } = useLogin();
    const navigate = useNavigate();
    const colorMode = useColorModeSync(); // Get colorMode from custom hook
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        profileImage: '',
    });

    // Fetch user profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data } = await authApi.get('/profile');
                setUser(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);  // Set loading to false once data is fetched
            }
        };
        fetchUserProfile();
    }, []);


    // Dynamically construct image path based on environment
    const baseURL = process.env.NODE_ENV === 'production'
        ? ''  // Use relative path in production
        : 'http://localhost:5000';  // Use absolute URL in development

    const [imagePath, setImagePath] = useState('');

    // UseEffect to update and log image path when user.profileImage changes
    useEffect(() => {
        if (user.profileImage) {
            // If profileImage already starts with 'uploads/', do not add '/uploads/' again
            const profileImagePath = user.profileImage.startsWith('uploads')
                ? user.profileImage  // Use as-is if it already includes 'uploads'
                : `uploads/${user.profileImage}`;  // Add 'uploads' if missing

            const constructedPath = `${baseURL}/${profileImagePath.replace(/\\/g, '/')}`;
            setImagePath(constructedPath);
            console.log("Constructed image path:", constructedPath);  // Log the constructed path for debugging
        }
    }, [user.profileImage, baseURL]);


    // Handle user logout and redirect to login page
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };


    return (
        <>
            {/* Sidebar Component */}
            <Box
                as="aside"
                height="100vh"
                width="60px"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                position="fixed"
                bg="#611FEA"
                color="white"
                zIndex="10"
                py={4}
            >
                <VStack spacing={4}>
                    <Tooltip label="Show menu" placement="right">
                        <IconButton
                            icon={<FiSidebar />}
                            aria-label="Toggle Sidebar"
                            onClick={onOpen}
                            bg="#611FEA"
                            _hover={{ bg: "#5316C4" }}
                            _active={{ bg: "#4a13b3" }}
                            color="white"
                            variant="solid"
                        />
                    </Tooltip>
                    {isLoggedIn ? <CustomerLinks handleLogout={handleLogout} /> : <GuestLinks />}
                </VStack>

                {/* User Avatar and Color Toggle Button */}
                <Box as="footer" mb={4} display="flex" flexDirection="column" alignItems="center">
                    <UserAvatar
                        mb={2}
                        isShown={isLoggedIn}
                        name={`${user.firstName} ${user.lastName}`}
                        src={imagePath}
                    />

                    <ToggleColorModeButton />
                </Box>
            </Box>

            {/* Drawer Component for Full Menu */}
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg={colorMode === 'dark' ? "#1A202C" : "#EDEDED"}>
                    <DrawerBody>
                        <Flex justifyContent="flex-end">
                            <IconButton
                                my={4}
                                icon={<FiSidebar />}
                                aria-label="Toggle Sidebar"
                                onClick={onClose}
                                bg="transparent" // Default transparent background
                                color={colorMode === 'light' ? 'black' : 'white'} // Text color based on color mode
                                _hover={{
                                    bg: colorMode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)', // Hover effect based on color mode
                                    color: colorMode === 'light' ? 'black' : 'white',
                                }}
                                _active={{
                                    bg: colorMode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.4)', // Active state with higher opacity
                                }}
                                variant="solid"
                            />

                        </Flex>
                        {isLoggedIn ? <CustomerLinks buttonVariant="wide" handleLogout={handleLogout} /> : <GuestLinks />}
                    </DrawerBody>
                    <DrawerFooter display="flex" justifyContent="center">
                        <VStack>
                            <UserAvatar
                                mb={2}
                                isShown={isLoggedIn}
                                name={`${user.firstName} ${user.lastName}`}
                                src={imagePath}
                            />
                            <ToggleColorModeButton buttonVariant="wide" />
                        </VStack>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};
