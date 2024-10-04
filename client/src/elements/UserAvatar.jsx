// components/UserAvatar.js
import React from 'react';
import { Avatar, Box } from '@chakra-ui/react';

export const UserAvatar = ({ isOpen, name, src }) => (
    <Box>
        <Avatar size="sm" name={name} src={src} />
    </Box>
);


