//client/src/theme.js
// 1. Import `extendTheme` from Chakra UI
import { extendTheme } from '@chakra-ui/react';

// 2. Add color mode configuration
const config = {
    initialColorMode: 'light', // Can be 'light', 'dark', or 'system'
    useSystemColorMode: false, // Set to true if you want to follow system preference
};


// 2. Global styles that don’t conflict with our dynamic styles
const styles = {
    global: {
        body: {
            fontFamily: 'var(--chakra-fonts-body)', // Keep basic font styling
            lineHeight: 'var(--chakra-lineHeights-base)', // Default line height
        },
    },
};


// 3. Extend the theme with the config
const theme = extendTheme({ config, styles  });

export default theme;
