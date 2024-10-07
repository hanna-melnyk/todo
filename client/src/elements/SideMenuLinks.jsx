// client/src/components/SideMenuLinks.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { VStack, IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { FiHome, FiUser, FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { SideMenuButton } from './SideMenuButton';

/**
 * @function GuestLinks
 * Renders a set of navigation links for guest users (unauthorized users).
 * @returns {JSX.Element} A set of buttons for login and registration.
 */
export const GuestLinks = () => {
    return (
        <VStack spacing={4} p={5}>
            <Tooltip label="Login" placement="right">
                <IconButton
                    as={RouterLink}
                    to="/login"
                    icon={<FiLogIn />}
                    aria-label="Login"
                    bg={"transparent"}
                    _hover={{ bg: "#5316C4" }}
                />
            </Tooltip>
            <Tooltip label="Register" placement="right">
                <IconButton
                    as={RouterLink}
                    to="/register"
                    icon={<FiUserPlus />}
                    aria-label="Register"
                    bg={"transparent"}
                    _hover={{ bg: "#5316C4" }}
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
export const CustomerLinks = ({ buttonVariant = "icon", handleLogout }) => {
    return (
        <VStack spacing={4} my={4}>
            <SideMenuButton to="/" icon={<FiHome />} text="Home" buttonVariant={buttonVariant} />
            <SideMenuButton to="/profile" icon={<FiUser />} text="Profile" buttonVariant={buttonVariant} />
            <SideMenuButton onClick={handleLogout} icon={<FiLogOut />} text="Logout" buttonVariant={buttonVariant} />
        </VStack>
    );
};
