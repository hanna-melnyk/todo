//client/src/elements/SidemenuElement.jsx
import React from 'react';
import { Button, IconButton } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom'; // Optional: For navigation

export const SidemenuElement = ({ isOpen, link, text, icon, onOpen, ...props }) => {
    return isOpen ? (
        <Button
            as={link ? RouterLink : 'button'}
            to={link}
            leftIcon={icon}
            {...props}
        >
            {text}
        </Button>
    ) : (
        <IconButton
            icon={icon}
            aria-label={text}
            as={link ? RouterLink : 'button'}
            to={link}
            {...props}
        />
    );
};