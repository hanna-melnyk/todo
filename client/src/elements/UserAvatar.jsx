// components/UserAvatar.js
import React from 'react';
import { Avatar, Box } from '@chakra-ui/react';

/**
 * @component UserAvatar
 * Renders the avatar component conditionally based on `isShown` prop.
 *
 * @param {boolean} isShown - Determines if the avatar should be displayed.
 * @param {string} name - The name to be displayed in the avatar tooltip.
 * @param {string} src - Source URL for the avatar image.
 * @returns {JSX.Element|null} - The rendered avatar component or null if `isShown` is false.
 */
export const UserAvatar = ({ isShown, name, src }) => {
    if (!isShown) return null;

    return (
        <Box>
            <Avatar size="md" name={name} src={src} />
        </Box>
    );
};
