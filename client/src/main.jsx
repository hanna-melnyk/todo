import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import App from './App.jsx';
import './index.css';
import theme from './theme'; // for custom theme in chakraui

createRoot(document.getElementById('root')).render(
    <>
    {/* <StrictMode> */}
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    {/* </StrictMode> */}
    </>
)
