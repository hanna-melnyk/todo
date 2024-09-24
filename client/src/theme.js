//client/src/theme.js
// 1. Import `extendTheme` from Chakra UI
import { extendTheme } from '@chakra-ui/react';

// 2. Add color mode configuration
const config = {
    initialColorMode: 'dark', // Can be 'light', 'dark', or 'system'
    useSystemColorMode: false, // Set to true if you want to follow system preference
};

// 3. Extend the theme with the config
const theme = extendTheme({ config });

export default theme;
