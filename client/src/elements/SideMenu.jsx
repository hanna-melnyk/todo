// client/src/components/SideMenu.jsx
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { FiHome, FiUser, FiLogOut } from 'react-icons/fi';
import { useLogin } from '../contexts/LoginContext';

export const SideMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI hook to manage the Drawer state
    const { logout } = useLogin();
    const navigate = useNavigate(); // Initialize useNavigate hook
    const {colorMode} = useColorMode();

    // Toggle function to open or close the Drawer
    // const toggleMenu = () => {
    //     if (isOpen) {
    //         onClose();
    //     } else {
    //         onOpen();
    //     }
    // };

    // Handle logout and redirect to login page
    const handleLogout = () => {
        logout(); // Call the logout function from the context
        navigate('/login'); // Redirect to login page after logout
    };

    // return (
    //     <>
    //         {/* Sidebar Toggle Button with a Single Icon */}
    //         <IconButton
    //             icon={<FiSidebar />} // Use FiSidebar for the button icon
    //             aria-label="Toggle Sidebar"
    //             onClick={toggleMenu}
    //             bg={"#611FEA"}
    //             _hover={{ bg: "#5316C4" }}
    //             _active={{ bg: "#4a13b3" }}
    //             color={"white"}
    //             variant="solid"
    //         />

    //         {/* Drawer for the Side Menu */}
    //         <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
    //             <DrawerOverlay />
    //             <DrawerContent bg={colorMode === "dark" ? "#000000" : "#EFEFEF"}>
    //                 <DrawerHeader borderBottomWidth="1px">
    //                     <VStack>
    //                         <Avatar name="User Name" />
    //                         <Text>User Name</Text>
    //                         <Text color="gray.500" fontSize="sm">
    //                             user@example.com
    //                         </Text>
    //                     </VStack>
    //                 </DrawerHeader>
    //                 <DrawerBody>
    //                     <VStack spacing={4}>
    //                         <Link as={RouterLink} to="/">
    //                             <Button w="full" colorScheme="purple" variant="ghost">
    //                                 Home
    //                             </Button>
    //                         </Link>
    //                         <Link as={RouterLink} to="/profile">
    //                             <Button w="full" colorScheme="purple" variant="ghost">
    //                                 Profile
    //                             </Button>
    //                         </Link>
    //                     </VStack>
    //                 </DrawerBody>
    //                 <DrawerFooter borderTopWidth="1px">
    //                     <Button w="full" colorScheme="red" variant="outline" onClick={handleLogout}>
    //                         Logout
    //                     </Button>
    //                 </DrawerFooter>
    //             </DrawerContent>
    //         </Drawer>
    //     </>
    // );


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
                bg={colorMode === 'light' ? '#611FEA' : '#2D3748'}
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


                {/* Avatar at the bottom of the Sidebar */}
                <Box as="footer" mb={4} display="flex" flexDirection="column" alignItems="center">
                    <Avatar name="User Name" size="md" mb={2} />
                    <Text fontSize="sm">User Name</Text>
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
