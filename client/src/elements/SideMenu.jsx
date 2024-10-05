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
import { SideMenuButton } from "./SideMenuButton";

/**
 * @function GuestLinks
 * Renders a set of navigation links for guest users (unauthorized users).
 * @returns {JSX.Element} A set of buttons for login and registration.
 */
const GuestLinks = () => {
    const { colorMode } = useColorMode();

    return (
        <VStack spacing={4} p={5}>
            <Tooltip label="Login" placement="right">
                <IconButton
                    as={RouterLink}
                    to="/login"
                    icon={<FiLogIn />}
                    aria-label="Login"
                />
            </Tooltip>
            <Tooltip label="Register" placement="right">
                <IconButton
                    as={RouterLink}
                    to="/register"
                    icon={<FiUserPlus />}
                    aria-label="Register"
                />
            </Tooltip>
        </VStack>
    );
};

/**
 * @function CustomerLinks
 * Renders a set of navigation links for logged-in (authorized) users.
 * @param {Object} props - Component properties.
 * @param {string} [props.buttonVariant="icon"] - Variant style for the button.
 * @param {Function} props.handleLogout - Function to handle the logout process.
 * @returns {JSX.Element} A set of buttons for navigating home, profile, and logout.
 */
const CustomerLinks = ({ buttonVariant = "icon", handleLogout }) => {
    const { colorMode } = useColorMode();

    return (
        <VStack spacing={4} my={4}>
            <SideMenuButton to="/" icon={<FiHome />} text="Home" buttonVariant={buttonVariant} />
            <SideMenuButton to="/profile" icon={<FiUser />} text="Profile" buttonVariant={buttonVariant} />
            <SideMenuButton onClick={handleLogout} icon={<FiLogOut />} text="Logout" buttonVariant={buttonVariant} />
        </VStack>
    );
};

/**
 * @function SideMenu
 * Renders the side navigation menu, including both the minimized version and a drawer for the full menu.
 * Manages user state and handles profile fetching, logout functionality, and color mode toggling.
 * @returns {JSX.Element} The sidebar component with navigation links and profile information.
 */
export const SideMenu = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isLoggedIn, logout } = useLogin();
    const navigate = useNavigate();

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
            }
        };
        fetchUserProfile();
    }, []);

    // Handle user logout and redirect to login page
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    // Update body class based on color mode
    useEffect(() => {
        const body = document.body;
        if (colorMode === 'light') {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        } else {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        }
    }, [colorMode]);

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
                    <Avatar
                        name={`${user.firstName} ${user.lastName}`}
                        size="md"
                        mb={2}
                        src={user.profileImage ? `http://localhost:5000/${user.profileImage.replace(/\\/g, '/')}` : ''}
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
                            <Avatar
                                name={`${user.firstName} ${user.lastName}`}
                                size="md"
                                mb={2}
                                src={user.profileImage ? `http://localhost:5000/${user.profileImage.replace(/\\/g, '/')}` : ''}
                            />
                            <ToggleColorModeButton buttonVariant="wide" />
                        </VStack>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};
