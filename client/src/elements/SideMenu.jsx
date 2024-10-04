// client/src/components/SideMenu.jsx
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    Link,
    VStack,
    Avatar,
    Text,
    useDisclosure,
    IconButton,
    Tooltip,
    Box,
    useColorMode
} from '@chakra-ui/react';
import { FiSidebar } from 'react-icons/fi'; // Import the single icon
import { FiHome, FiUser, FiLogOut, FiLogIn, FiUserPlus  } from 'react-icons/fi';
import { useLogin } from '../contexts/LoginContext';
import authApi from '../api/axiosTokenInterceptor';
import {MoonIcon, SunIcon} from "@chakra-ui/icons";


// Links for unauthorized users
const GuestLinks = () => {
    const { colorMode } = useColorMode(); // Get color mode for styling

    return (
        <VStack spacing={4} p={"5"}>
            <Tooltip label="Login" placement="right">
            <IconButton
                as={RouterLink}
                to="/login"
                icon={<FiLogIn />}
                aria-label={"Login"} />
            </Tooltip>
            <Tooltip label="Register" placement="right">
                <IconButton
                    as={RouterLink}
                    to="/register"
                    icon={<FiUserPlus />}
                    aria-label={"register"} />
            </Tooltip>
            {/*<Button as={RouterLink} to="/login" {...getTransparentContainerStyle(colorMode)}>*/}
            {/*    Login*/}
            {/*</Button>*/}
            {/*<Button as={RouterLink} to="/register" {...getTransparentContainerStyle(colorMode)}>*/}
            {/*    Register*/}
            {/*</Button>*/}
        </VStack>
    );
};


// Links for authorized users
const CustomerLinks = ({ handleLogout }) => {
    console.log("CustomerLinks received handleLogout:", handleLogout);
    const { colorMode } = useColorMode(); // Get color mode for styling

    return (
        <VStack spacing={4} p={"5"}>
            <Tooltip label="Home" placement="right">
                <IconButton
                    as={RouterLink}
                    to="/"
                    icon={<FiHome />}
                    aria-label="Home"
                    bg={"#611FEA"}
                    _hover={{ bg: "#5316C4" }}
                    color="white"
                />
            </Tooltip>
            <Tooltip label="Profile" placement="right">
                <IconButton
                    as={RouterLink}
                    to="/profile"
                    icon={<FiUser />}
                    aria-label="Profile"
                    bg={"#611FEA"}
                    _hover={{ bg: "#5316C4" }}
                    color="white"
                />
            </Tooltip>

            <Tooltip label="Logout" placement="right">
                <IconButton
                    icon={<FiLogOut />}
                    aria-label="Logout"
                    onClick={handleLogout}
                    bg={colorMode === 'light' ? '#D9534F' : '#C53030'}
                    color="white"
                    _hover={{ bg: colorMode === 'light' ? '#C9302C' : '#9B2C2C' }}
                />
            </Tooltip>
        </VStack>
    );
};

export const SideMenu = () => {
    const { colorMode, toggleColorMode } = useColorMode(); // Get color mode and toggle function
    const icon = colorMode === 'light' ? <MoonIcon /> : <SunIcon />;

    const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI hook to manage the Drawer state
    const { isLoggedIn, logout } = useLogin(); // Get isLoggedIn state and logout function from LoginContext
    console.log('Is Logged In:', isLoggedIn);
    const navigate = useNavigate(); // Initialize useNavigate hook

    // State to hold user data including avatar and name
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        profileImage: '',
    });

    // Fetch user profile data including the avatar link
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data } = await authApi.get('/profile'); // Fetch profile data from backend
                setUser(data); // Set the user data in state
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        fetchUserProfile();
    }, []);


    // Handle logout and redirect to login page
    const handleLogout = async () => {
        console.log("Logging out...");
        await logout(); // Call the logout function from the context
        console.log("Logout successful!");
        navigate('/login'); // Redirect to login page after logout
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
        <>
            <Box
                as="aside"
                height="100vh"
                width="60px"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                position="fixed"
                bg={'#611FEA'}
                color="white"
                zIndex="10"
                py={4}
            >
            {/* Vertical Navigation Buttons Outside the Drawer */}
            <VStack spacing={4} mt={4}>
                <Tooltip label="Show menu" placement="right">
                    {/* Sidebar Toggle Button with a Single Icon */}
                    <IconButton
                        icon={<FiSidebar />} // Use FiSidebar for the button icon
                        aria-label="Toggle Sidebar"
                        onClick={onOpen}
                        bg={"#611FEA"}
                        _hover={{ bg: "#5316C4" }}
                        _active={{ bg: "#4a13b3" }}
                        color={"white"}
                        variant="solid"
                    />
                </Tooltip>


                {isLoggedIn ? <CustomerLinks handleLogout={handleLogout} /> : <GuestLinks />}

            </VStack>


                {/* Avatar at the bottom of the Sidebar */}
                <Box as="footer" mb={4} display="flex" flexDirection="column" alignItems="center">
                    <Avatar
                        name={`${user.firstName} ${user.lastName}`}
                        size="md"
                        mb={2}
                        src={user.profileImage ? `http://localhost:5000/${user.profileImage.replace(/\\/g, '/')}` : ''} // Set avatar image
                    />
                    <IconButton
                        aria-label={`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'} Mode`}
                        icon={icon}
                        onClick={toggleColorMode}
                        bg={"#611FEA"}
                        _hover={{ bg: "#5316C4" }}
                    />
                </Box>
            </Box>


            {/* Drawer Component for the Full Menu */}
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg={colorMode === 'dark' ? "#1A202C" : "#ffffff"}>
                    <DrawerHeader borderBottomWidth="1px">
                        {/* Header Content */}
                        <VStack>
                            <Avatar name="User Name" />
                            <Text>User Name</Text>
                            <Text color="gray.500" fontSize="sm">
                                user@example.com
                            </Text>
                        </VStack>
                    </DrawerHeader>

                    <DrawerBody>
                        {/* Drawer Body Links */}
                        <VStack spacing={4}>
                            <Link as={RouterLink} to="/">
                                <Button w="full" colorScheme="purple" variant="ghost">
                                    Home
                                </Button>
                            </Link>
                            <Link as={RouterLink} to="/profile">
                                <Button w="full" colorScheme="purple" variant="ghost">
                                    Profile
                                </Button>
                            </Link>
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Button w="full" colorScheme="red" variant="outline" onClick={handleLogout}>
                            Logout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};
