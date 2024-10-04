// components/ToggleColorModeButton.js
import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export const ToggleColorModeButton = ({ isOpen }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const icon = colorMode === 'light' ? <MoonIcon /> : <SunIcon />;


    return (
        <IconButton
            aria-label="Toggle color mode"
            icon={icon}
            onClick={toggleColorMode}
            variant="outline"
        />
    );
};


