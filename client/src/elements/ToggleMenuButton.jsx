// components/ToggleMenuButton.js
import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { FiSidebar } from 'react-icons/fi';

export const ToggleMenuButton = ({ isOpen, onOpen }) => (
    <IconButton
        aria-label="Toggle menu"
        icon={<FiSidebar />}
        onClick={onOpen}
        variant="outline"
    />
);

