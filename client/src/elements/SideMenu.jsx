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
    useColorMode
} from '@chakra-ui/react';
import { FiSidebar } from 'react-icons/fi'; // Import the single icon
import { useLogin } from '../contexts/LoginContext';

export const SideMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI hook to manage the Drawer state
    const { logout } = useLogin();
    const navigate = useNavigate(); // Initialize useNavigate hook
    const {colorMode} = useColorMode();

    // Toggle function to open or close the Drawer
    const toggleMenu = () => {
        if (isOpen) {
            onClose();
        } else {
            onOpen();
        }
    };

    // Handle logout and redirect to login page
    const handleLogout = () => {
        logout(); // Call the logout function from the context
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <>
            {/* Sidebar Toggle Button with a Single Icon */}
            <IconButton
                icon={<FiSidebar />} // Use FiSidebar for the button icon
                aria-label="Toggle Sidebar"
                onClick={toggleMenu}
                bg={"#611FEA"}
                _hover={{ bg: "#5316C4" }}
                _active={{ bg: "#4a13b3" }}
                color={"white"}
                variant="solid"
            />

            {/* Drawer for the Side Menu */}
            <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
                <DrawerOverlay />
                <DrawerContent bg={colorMode === "dark" ? "#000000" : "#EFEFEF"}>
                    <DrawerHeader borderBottomWidth="1px">
                        <VStack>
                            <Avatar name="User Name" />
                            <Text>User Name</Text>
                            <Text color="gray.500" fontSize="sm">
                                user@example.com
                            </Text>
                        </VStack>
                    </DrawerHeader>
                    <DrawerBody>
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
