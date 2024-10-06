//client/src/hooks/useColorModeSync.js
import { useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';

/**
 * Custom hook to synchronize the body class with the color mode and return colorMode value.
 * @returns {string} The current color mode ("light" or "dark").
 */
export const useColorModeSync = () => {
    const { colorMode } = useColorMode();

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

    // Return colorMode to be used in the component if needed
    return colorMode;
};
